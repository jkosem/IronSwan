import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const dataURL = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const kib = 1024;

async function budget(paths, max) {
  const bytes = (await Promise.all(paths.map(read))).reduce((sum, source) => sum + gzipSync(source).length, 0);
  assert.ok(bytes <= max, paths.join(', ') + ': ' + bytes + ' bytes exceeds ' + max);
}

for (const theme of ['ironswan', 'starter']) {
  test(theme + ' CSS stays within 10 KiB gzip', async () => {
    await budget(['css/colors.css', 'css/typography.css', 'css/layout.css', 'css/theme.css', 'css/' + theme + '-theme.css', ...(theme === 'starter' ? ['css/base.css'] : [])], 10 * kib);
  });
}
test('chapter JS stays within 10 KiB gzip', async () => {
  await budget(['js/book.js', 'js/config.js', 'js/chapter.js', 'js/content-loader.js', 'js/markdown-parser.js', 'js/navigation.js', 'js/state-manager.js'], 10 * kib);
});
test('home JS stays within 10 KiB gzip including inline module', async () => {
  const html = await read('index.html');
  const inline = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
  const modules = await Promise.all(['js/book.js', 'js/config.js', 'js/toc-generator.js', 'js/state-manager.js'].map(read));
  assert.ok([...modules, inline].reduce((sum, s) => sum + gzipSync(s).length, 0) <= 10 * kib);
});
test('table of contents renders configured titles without network requests', async () => {
  const originalDocument = globalThis.document;
  const originalFetch = globalThis.fetch;
  function element(tag) {
    return {tag, children: [], append(...nodes) { this.children.push(...nodes); },
      replaceChildren(...nodes) { this.children = nodes; }, setAttribute() {}};
  }
  const list = element('ul');
  try {
    globalThis.document = { querySelector: () => list, createElement: element, createDocumentFragment: () => element('fragment') };
    globalThis.fetch = () => { throw new Error('TOC must not fetch'); };
    const config = dataURL('export const chapterURL = chapter => "chapter-" + chapter.id + ".html"; export default {chapters:[{id:"01",title:"<safe>"}]}');
    const source = (await read('js/toc-generator.js')).replace("'./book.js'", JSON.stringify(config));
    const { default: toc } = await import(dataURL(source));
    await toc.generateTOC();
    const link = list.children[0].children[0].children[0];
    assert.equal(link.href, 'chapter-01.html');
    assert.equal(link.children[1].textContent, '<safe>');
  } finally {
    globalThis.document = originalDocument;
    globalThis.fetch = originalFetch;
  }
});
test('progress uses transform and no per-scroll document height measurement', async () => {
  const source = await read('js/chapter.js');
  const css = await read('css/layout.css');
  assert.match(source, /bar\.style\.transform/);
  assert.doesNotMatch(source.match(/const updateProgress = \(\) => \{([\s\S]*?)\n  \};/)[1], /scrollHeight|clientHeight/);
  assert.match(css, /transition: transform 0\.08s linear/);
});
