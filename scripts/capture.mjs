#!/usr/bin/env node
/** Capture the marketing screenshots and preview cards. */
import { withPage, fileUrl } from './lib/browser.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(root, 'docs');
const out = (relative) => path.join(docs, relative);

await mkdir(out('assets/img/blocks'), { recursive: true });
await mkdir(out('assets/img/showroom'), { recursive: true });
await mkdir(out('assets/docs-img'), { recursive: true });

const log = (message) => console.log(`  · ${message}`);

const blocks = [
  ['hero', 'Hero, with proof'],
  ['features', 'Feature grid'],
  ['pricing', 'Pricing'],
  ['faq', 'Questions'],
  ['testimonial', 'Client note'],
  ['cta', 'Closing call'],
  ['dashboard', 'Project dashboard'],
  ['auth', 'Sign in'],
  ['settings', 'Settings'],
  ['footer', 'Footer'],
  ['header', 'Site header'],
  ['logos', 'Logo strip'],
  ['stats', 'Measured band'],
  ['process', 'Three steps'],
  ['comparison', 'Plan comparison'],
  ['team', 'Studio team'],
  ['blog', 'Journal'],
  ['changelog', 'Revision log'],
  ['contact', 'Contact sheet'],
  ['newsletter', 'Monthly sheet'],
  ['onboarding', 'First sheet setup'],
  ['billing', 'Billing'],
  ['members', 'Members'],
  ['inbox', 'Review inbox'],
  ['error', 'Not found'],
];

for (const [id, label] of blocks) {
  await withPage(
    fileUrl(path.join('docs/preview.html')) + `?block=${id}&embed=1`,
    { width: 1280, height: 1000, wait: 900 },
    async (client) => {
      await client.evaluate('window.scrollTo(0, 0)');
      await client.screenshot({
        file: out(`assets/img/blocks/${id}.png`),
        selector: '.blk',
      });
    }
  );
  log(`block preview: ${label}`);
}

console.log('\nShowroom');

await withPage(
  fileUrl(path.join('docs/console.html')),
  { width: 1440, height: 900, wait: 1000 },
  async (client) => {
    await client.screenshot({ file: out('assets/img/showroom/console.png') });
    await client.screenshot({ file: out('assets/docs-img/final-console.png') });

    await client.evaluate(`Linework.open('new-sheet')`);
    await client.wait(450);
    await client.screenshot({ file: out('assets/docs-img/final-console-new-sheet.png') });
    await client.evaluate(`Linework.close('new-sheet')`);
    await client.wait(300);

    await client.evaluate(`document.querySelector('#sheet-rows [data-open-sheet]').click()`);
    await client.wait(450);
    await client.screenshot({ file: out('assets/docs-img/final-console-detail.png') });
    await client.evaluate(`Linework.close('sheet-detail')`);
    await client.wait(300);

    await client.evaluate(`Linework.open('console-settings')`);
    await client.wait(300);
    await client.evaluate(`document.querySelector('[data-cn-theme="blueprint"]').click()`);
    await client.wait(450);
    await client.screenshot({ file: out('assets/docs-img/final-console-blueprint.png') });
  }
);
log('console, new sheet, sheet detail and blueprint paper');

await withPage(
  fileUrl(path.join('docs/console.html')),
  { width: 390, height: 844, wait: 900 },
  async (client) => {
    await client.screenshot({ file: out('assets/docs-img/final-console-mobile.png') });
    const overflow = await client.evaluate(
      'document.documentElement.scrollWidth - window.innerWidth'
    );
    log(`console mobile horizontal overflow: ${overflow}px`);
  }
);

console.log('\nMarketing pages');

await withPage(
  fileUrl(path.join('docs/index.html')),
  { width: 1600, height: 1080, wait: 1300 },
  async (client) => {
    await client.screenshot({ file: out('assets/docs-img/final-home.png') });
    await client.evaluate(`window.scrollTo(0, document.getElementById('blocks').offsetTop - 60)`);
    await client.wait(900);
    await client.screenshot({ file: out('assets/docs-img/final-home-blocks.png') });
    await client.evaluate(`window.scrollTo(0, document.getElementById('papers').offsetTop - 60)`);
    await client.wait(900);
    await client.screenshot({ file: out('assets/docs-img/final-home-papers.png') });
    await client.evaluate(`window.scrollTo(0, document.getElementById('components').offsetTop - 60)`);
    await client.wait(900);
    await client.screenshot({ file: out('assets/docs-img/final-home-components.png') });
    await client.evaluate(`window.scrollTo(0, document.getElementById('showroom').offsetTop - 60)`);
    await client.wait(900);
    await client.screenshot({ file: out('assets/docs-img/final-home-showroom.png') });
    await client.evaluate(`window.scrollTo(0, document.getElementById('install').offsetTop - 60)`);
    await client.wait(900);
    await client.screenshot({ file: out('assets/docs-img/final-home-install.png') });
    await client.evaluate(`window.scrollTo(0, document.getElementById('faq').offsetTop - 60)`);
    await client.wait(900);
    await client.screenshot({ file: out('assets/docs-img/final-home-faq.png') });
    await client.evaluate(`window.scrollTo(0, 0)`);
    await client.evaluate(`Linework.setTheme('blueprint')`);
    await client.wait(450);
    await client.screenshot({ file: out('assets/docs-img/final-home-blueprint.png') });
    await client.evaluate(`Linework.setTheme('vellum')`);
    await client.wait(450);
    await client.screenshot({ file: out('assets/docs-img/final-home-vellum.png') });
    await client.evaluate(`Linework.setTheme('trace')`);
  }
);
log('home, blocks, papers, blueprint, vellum');

await withPage(
  fileUrl(path.join('docs/index.html')),
  { width: 390, height: 844, wait: 1000 },
  async (client) => {
    await client.screenshot({ file: out('assets/docs-img/final-home-mobile.png') });
    const overflow = await client.evaluate(
      'document.documentElement.scrollWidth - window.innerWidth'
    );
    log(`home mobile horizontal overflow: ${overflow}px`);
  }
);

await withPage(
  fileUrl(path.join('docs/blocks.html')),
  { width: 1440, height: 1000, wait: 1100 },
  async (client) => {
    await client.screenshot({ file: out('assets/docs-img/final-blocks.png') });
  }
);
log('blocks gallery');

await withPage(
  fileUrl(path.join('docs/components.html')),
  { width: 1440, height: 1000, wait: 900 },
  async (client) => {
    await client.screenshot({ file: out('assets/docs-img/final-components.png') });
    await client.evaluate(`document.getElementById('buttons').scrollIntoView()`);
    await client.wait(400);
    await client.screenshot({ file: out('assets/docs-img/final-components-buttons.png') });
    await client.evaluate(`document.getElementById('pads').scrollIntoView()`);
    await client.wait(400);
    await client.screenshot({ file: out('assets/docs-img/final-components-pads.png') });
  }
);

await withPage(
  fileUrl(path.join('docs/docs.html')),
  { width: 1440, height: 1000, wait: 900 },
  async (client) => {
    await client.screenshot({ file: out('assets/docs-img/final-guide.png') });
  }
);

await withPage(
  fileUrl(path.join('docs/components.html')),
  { width: 390, height: 844, wait: 900 },
  async (client) => {
    await client.screenshot({ file: out('assets/docs-img/final-components-mobile.png') });
  }
);

console.log('\nCaptured.\n');
