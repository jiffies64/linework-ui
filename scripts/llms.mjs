import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

/* Builds llms-full.txt from the sources so it always covers every component, class, token, type and block. */

function decode(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedent(text) {
  const lines = text.replace(/\t/g, '  ').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^ */)[0].length));
  return lines.map((line) => line.slice(indent)).join('\n');
}

/* Returns the end index of the element whose start tag begins at `start`, counting nested tags of the same name. */
function elementEnd(html, start, tag) {
  const pattern = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
  pattern.lastIndex = start;
  let depth = 0;
  for (let match = pattern.exec(html); match; match = pattern.exec(html)) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return match.index + match[0].length;
  }
  throw new Error(`Unclosed <${tag}> at ${start}`);
}

function inner(html, start, tag) {
  const end = elementEnd(html, start, tag);
  return html.slice(html.indexOf('>', start) + 1, end - `</${tag}>`.length);
}

function componentSections(html) {
  const sections = [];
  const sectionPattern = /<section class="docs-section" id="([^"]+)">/g;
  for (let match = sectionPattern.exec(html); match; match = sectionPattern.exec(html)) {
    const body = html.slice(match.index, elementEnd(html, match.index, 'section'));
    const title = decode(/<h2 class="docs-section__title">([\s\S]*?)<\/h2>/.exec(body)?.[1] || match[1]);
    const lede = decode(/<p class="docs-section__note">([\s\S]*?)<\/p>/.exec(body)?.[1] || '');
    const plates = [];
    const platePattern = /<div class="demo-plate[ "]/g;
    for (let plate = platePattern.exec(body); plate; plate = platePattern.exec(body)) {
      const markup = body.slice(plate.index, elementEnd(body, plate.index, 'div'));
      platePattern.lastIndex = plate.index + markup.length;
      const bodyStart = markup.search(/<div class="demo-plate__body/);
      plates.push({
        name: decode(/<strong>([\s\S]*?)<\/strong>/.exec(markup)?.[1] || ''),
        tag: decode(/<span class="demo-plate__tag">([\s\S]*?)<\/span>/.exec(markup)?.[1] || ''),
        foot: decode(/<div class="demo-plate__foot">([\s\S]*?)<\/div>/.exec(markup)?.[1] || ''),
        html: bodyStart === -1 ? '' : dedent(inner(markup, bodyStart, 'div')),
      });
    }
    sections.push({ id: match[1], title, lede, plates });
  }
  return sections;
}

async function classIndex(cssDir) {
  const files = (await readdir(cssDir)).filter((file) => file.endsWith('.css') && file !== 'blocks.css').sort();
  const lines = [];
  for (const file of files) {
    const css = (await readFile(path.join(cssDir, file), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
    const classes = [...new Set(css.match(/\.lw-[a-z0-9_-]+/g) || [])].map((name) => name.slice(1)).sort();
    if (classes.length) lines.push(`- \`${file}\`: ${classes.map((name) => `\`${name}\``).join(', ')}`);
  }
  return lines.join('\n');
}

async function blocks(file) {
  const context = { window: {} };
  vm.runInNewContext(await readFile(file, 'utf8'), context);
  return context.window.LINEWORK_BLOCKS;
}

export async function buildLlmsFull(root) {
  const read = (relative) => readFile(path.join(root, relative), 'utf8');
  const index = await read('llms.txt');
  const summary = index.split('\n## ')[0].trim();
  const rules = /\n## Rules[^\n]*\n([\s\S]*?)\n## /.exec(index)?.[1].trim() || '';
  const readme = (await read('README.md'))
    .split('\n')
    .filter((line) => !line.startsWith('!['))
    .join('\n')
    .replace(/^# .*\n/, '')
    .replace(/^#/gm, '##')
    .trim();
  const sections = componentSections(await read('docs/components.html'));
  const tokens = (await read('src/css/tokens.css')).replace(/@font-face\s*\{[\s\S]*?\}\s*/g, '').trim();
  const types = (await read('src/types/linework.d.ts')).trim();
  const reactTypes = (await read('src/react/index.d.ts')).trim();
  const blockList = await blocks(path.join(root, 'docs/assets/js/blocks-data.js'));
  const iconSource = /const ICONS = \{([\s\S]*?)\n\};/.exec(await read('src/js/linework.js'))[1];
  const icons = [...iconSource.matchAll(/^\s*'?([a-z0-9-]+)'?:/gm)].map((match) => match[1]);

  const out = [
    summary.replace(/^# (.*)$/m, '# $1: full reference'),
    'This file is generated from the sources by `npm run build`. It holds every component example, every class, every token, the complete type definitions and every block.',
    '## Rules',
    rules,
    '## Guide',
    readme,
    '## Components',
    'Each example below is the live markup from the component gallery, `docs/components.html`.',
  ];
  for (const section of sections) {
    out.push(`### ${section.title}`);
    if (section.lede) out.push(section.lede);
    for (const plate of section.plates) {
      out.push(`#### ${plate.name}${plate.tag ? ` (\`${plate.tag}\`)` : ''}`);
      if (plate.foot) out.push(plate.foot);
      if (plate.html) out.push('```html\n' + plate.html + '\n```');
    }
  }
  out.push(
    '## Class reference',
    'Every `lw-*` class defined in the stylesheet, by source file. `__` marks a part of a component and `--` a variant.',
    await classIndex(path.join(root, 'src/css')),
    `Icons (${icons.length}), used as \`<svg class="lw-icon" aria-hidden="true"><use href="#lw-i-NAME"></use></svg>\`: ${icons.map((name) => `\`${name}\``).join(', ')}.`,
    '## Design tokens',
    'All custom properties with their values for each theme (`src/css/tokens.css`).',
    '```css\n' + tokens + '\n```',
    '## Types: elements, events and the JavaScript API',
    '```ts\n' + types + '\n```',
    '## Types: React wrappers (`linework-ui/react`)',
    '```ts\n' + reactTypes + '\n```',
    '## Blocks',
    'Each block needs `linework-blocks.css` as well as `linework.css`. Layout classes are `blk-*`; everything else is the component API.'
  );
  for (const block of blockList) {
    out.push(`### ${block.num} ${block.name} (${block.category}, id \`${block.id}\`)`, block.desc, '```html\n' + block.html + '\n```');
  }
  return {
    text: out.join('\n\n') + '\n',
    counts: { plates: sections.reduce((sum, section) => sum + section.plates.length, 0), blocks: blockList.length, icons: icons.length },
  };
}
