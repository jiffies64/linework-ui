#!/usr/bin/env node
/** Minimal static file server for the Linework docs. No dependencies. */
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv[2] || process.env.PORT || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }
    const info = await stat(file).catch(() => null);
    if (!info || info.isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        `<!doctype html><meta name="viewport" content="width=device-width"><body style="font:15px Bahnschrift,system-ui;padding:40px;background:#EEF0EC;color:#23262B">
        <h1 style="font-weight:300;font-size:40px;margin:0 0 12px">404 — sheet not found</h1>
        <p>No drawing at <code>${pathname.replace(/[<>&"]/g, '')}</code>.</p>
        <p><a href="/docs/index.html" style="color:#D0342C">Back to the index</a></p></body>`
      );
      return;
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Content-Length': info.size,
    });
    createReadStream(file).pipe(res);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Server error: ${error.message}`);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\n  Linework preview  →  http://127.0.0.1:${port}/docs/\n`);
  console.log(`  Landing           →  http://127.0.0.1:${port}/docs/index.html`);
  console.log(`  Blocks            →  http://127.0.0.1:${port}/docs/blocks.html`);
  console.log(`  Components        →  http://127.0.0.1:${port}/docs/components.html`);
  console.log(`  Guide             →  http://127.0.0.1:${port}/docs/docs.html`);
  console.log(`  Showroom          →  http://127.0.0.1:${port}/docs/console.html\n`);
});
