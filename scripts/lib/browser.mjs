/** Minimal Chrome DevTools Protocol driver for the screenshot script. */
import { spawn } from 'node:child_process';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const BROWSER =
  process.env.LW_BROWSER || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForFile(file, timeout = 12000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const value = await readFile(file, 'utf8');
      if (value.trim()) return value;
    } catch {}
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${file}`);
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    this.console = [];
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const entry = this.pending.get(message.id);
        if (!entry) return;
        this.pending.delete(message.id);
        if (message.error) entry.reject(new Error(message.error.message));
        else entry.resolve(message.result);
        return;
      }
      if (message.method === 'Runtime.exceptionThrown') {
        const details = message.params.exceptionDetails;
        this.console.push({
          type: 'exception',
          text:
            details.exception?.description ||
            details.text ||
            'Unknown exception',
        });
      }
      if (message.method === 'Runtime.consoleAPICalled') {
        const text = message.params.args
          .map((arg) => arg.value ?? arg.description ?? '')
          .join(' ');
        if (message.params.type === 'error') {
          this.console.push({ type: 'error', text });
        }
      }
      const handlers = this.events.get(message.method);
      if (handlers) {
        for (const handler of [...handlers]) {
          try {
            handler(message.params);
          } catch {}
        }
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, handler) {
    if (!this.events.has(method)) this.events.set(method, new Set());
    this.events.get(method).add(handler);
    return () => this.events.get(method)?.delete(handler);
  }

  once(method, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        off();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeout);
      const off = this.on(method, (params) => {
        clearTimeout(timer);
        off();
        resolve(params);
      });
    });
  }

  async evaluate(expression, { awaitPromise = true } = {}) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise,
      returnByValue: true,
      userGesture: true,
    });
    if (result.exceptionDetails) {
      throw new Error(
        result.exceptionDetails.exception?.description ||
          result.exceptionDetails.text
      );
    }
    return result.result?.value;
  }

  async wait(ms) {
    await sleep(ms);
  }

  async screenshot({ file, selector = null, fullPage = false }) {
    let clip;
    if (selector) {
      clip = await this.evaluate(`(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
          scale: 1
        };
      })()`);
      if (!clip) throw new Error(`Selector not found for screenshot: ${selector}`);
    } else if (fullPage) {
      await this.evaluate(`document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'))`);
      const size = await this.evaluate(`({
        width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      })`);
      clip = { x: 0, y: 0, width: size.width, height: size.height, scale: 1 };
    }

    const params = { format: 'png', fromSurface: true };
    if (clip) {
      params.clip = clip;
      params.captureBeyondViewport = true;
    } else {
      // Without a clip, capture the current viewport, not the whole document.
      params.captureBeyondViewport = false;
    }
    const result = await this.send('Page.captureScreenshot', params);
    await writeFile(file, Buffer.from(result.data, 'base64'));
    return file;
  }
}

export async function withPage(url, options, callback) {
  const width = options.width || 1440;
  const height = options.height || 1000;
  const profile = await mkdtemp(path.join(os.tmpdir(), 'linework-edge-'));
  const proc = spawn(
    BROWSER,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--mute-audio',
      '--allow-file-access-from-files',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      `--window-size=${width},${height}`,
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let client;
  try {
    const activePort = await waitForFile(path.join(profile, 'DevToolsActivePort'));
    const port = Number(activePort.split(/\r?\n/)[0]);
    let targets = [];
    for (let attempt = 0; attempt < 40; attempt += 1) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/json/list`);
        targets = await response.json();
        if (targets.some((target) => target.type === 'page')) break;
      } catch {}
      await sleep(100);
    }
    const target = targets.find((entry) => entry.type === 'page');
    if (!target) throw new Error('No page target found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', () => reject(new Error('WebSocket failed')), {
        once: true,
      });
    });
    client = new Cdp(ws);
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Log.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const loaded = client.once('Page.loadEventFired', 20000);
    await client.send('Page.navigate', { url });
    await loaded.catch(() => {});
    await client.evaluate('document.fonts ? document.fonts.ready.then(() => true) : true');
    await sleep(options.wait ?? 500);

    return await callback(client, port);
  } finally {
    try {
      client?.ws.close();
    } catch {}
    if (process.platform === 'win32') {
      spawn('taskkill.exe', ['/pid', String(proc.pid), '/T', '/F'], {
        stdio: 'ignore',
      }).on('error', () => {});
    } else {
      proc.kill('SIGKILL');
    }
    await sleep(300);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

export function fileUrl(relative) {
  const split = relative.search(/[?#]/);
  const file = split === -1 ? relative : relative.slice(0, split);
  const suffix = split === -1 ? '' : relative.slice(split);
  return pathToFileURL(path.resolve(file)).href + suffix;
}
