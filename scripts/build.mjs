#!/usr/bin/env node
/** Resolve CSS @imports, copy the JS module, emit a global build and report sizes. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const banner = `/*! Linework UI v${pkg.version} | ${pkg.license} | drafting-table design system */\n`;

await mkdir(dist, { recursive: true });

const importRe = /@import\s+(?:url\(\s*)?["']([^"']+)["']\s*\)?\s*;/g;
const seen = new Set();

async function inlineCss(file) {
  const absolute = path.resolve(src, 'css', file);
  if (!seen.has(absolute)) seen.add(absolute);
  const source = await readFile(absolute, 'utf8');
  let out = '';
  let last = 0;
  for (const match of source.matchAll(importRe)) {
    out += source.slice(last, match.index);
    const rel = path.posix.join(path.posix.dirname(file), match[1]);
    out += await inlineCss(rel);
    last = match.index + match[0].length;
  }
  out += source.slice(last);
  return out;
}

const css = banner + (await inlineCss('linework.css')).trim() + '\n';
const tokens = banner + (await readFile(path.join(src, 'css', 'tokens.css'), 'utf8')).trim() + '\n';
const blocksCss = banner + (await readFile(path.join(src, 'css', 'blocks.css'), 'utf8')).trim() + '\n';

/** Conservative whitespace compressor: comments, indentation and blank lines only. */
function compressCss(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s*([{}])\s*/g, '$1')
    .replace(/;+\s*}/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Keep the banner while compressing the rest.
const bannerEnd = css.indexOf('*/') + 2;
const cssMin = css.slice(0, bannerEnd) + compressCss(css.slice(bannerEnd));
const blocksBannerEnd = blocksCss.indexOf('*/') + 2;
const blocksMin =
  blocksCss.slice(0, blocksBannerEnd) + compressCss(blocksCss.slice(blocksBannerEnd));

await writeFile(path.join(dist, 'linework.css'), css, 'utf8');
await writeFile(path.join(dist, 'linework.min.css'), cssMin + '\n', 'utf8');
await writeFile(path.join(dist, 'tokens.css'), tokens, 'utf8');
await writeFile(path.join(dist, 'linework-blocks.css'), blocksCss, 'utf8');
await writeFile(path.join(dist, 'linework-blocks.min.css'), blocksMin + '\n', 'utf8');

const jsSource = await readFile(path.join(src, 'js', 'linework.js'), 'utf8');
const js = banner + jsSource.trim() + '\n';
await writeFile(path.join(dist, 'linework.js'), js, 'utf8');

// The global build is the same source wrapped in an IIFE, with ESM exports stripped.
const body = jsSource.replace(/^export\s+.*$/gm, '').trim();
const global = `${banner}(function () {\n'use strict';\n${body}\n\nwindow.Linework = Linework;\n})();\n`;
await writeFile(path.join(dist, 'linework.global.js'), global, 'utf8');

try {
  const dts = await readFile(path.join(src, 'types', 'linework.d.ts'), 'utf8');
  await writeFile(path.join(dist, 'linework.d.ts'), dts, 'utf8');
} catch {
  console.warn('  ! src/types/linework.d.ts missing, skipped');
}

const rows = [
  ['linework.css', css],
  ['linework.min.css', cssMin],
  ['linework-blocks.css', blocksCss],
  ['linework-blocks.min.css', blocksMin],
  ['linework.js', js],
  ['linework.global.js', global],
];

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
const gz = (text) => kb(gzipSync(Buffer.from(text)).length);

console.log(`\n  Linework v${pkg.version}\n`);
for (const [name, text] of rows) {
  console.log(`  dist/${name.padEnd(22)} ${kb(Buffer.byteLength(text)).padStart(9)}   ${gz(text).padStart(9)} gzip`);
}
console.log('\n  Built. Open docs/index.html through `npm start`.\n');
