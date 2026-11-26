import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const definition = await readFile(new URL('../book.txt', import.meta.url), 'utf8');
const requests = [];
const originalFetch = globalThis.fetch;
let book;
try {
  globalThis.fetch = async url => {
    requests.push(url.pathname);
    return new Response(definition);
  };
  book = await import('../js/book.js');
} finally {
  globalThis.fetch = originalFetch;
}

test('the shipped book loads its list without requesting chapter text', () => {
  assert.equal(requests.length, 1);
  assert.ok(requests[0].endsWith('/book.txt'));
  assert.equal(book.default.chapters.length, 5);
  assert.equal(book.default.chapters[0].id, '01');
});

test('order and titles are independent of stable filenames', () => {
  const { chapters } = book.parseBook('Title: Ice\r\nAuthor: Kim\r\nFirst snow.md | Snow | Ice\r\nchapter-01.md | Old chapter');
  assert.equal(chapters[0].title, 'Snow | Ice');
  assert.equal(book.chapterURL(chapters[0]), 'chapter.html?chapter=First%20snow.md');
  assert.equal(book.chapterURL(chapters[1]), 'chapter.html?chapter=01');
});

test('empty books work and common authoring mistakes give actionable errors', () => {
  const header = 'Title: Ice\nAuthor: Kim\n';
  assert.deepEqual(book.parseBook(header).chapters, []);
  assert.throws(() => book.parseBook(header + 'draft.md'), /line 3/);
  assert.throws(() => book.parseBook(header + '../draft.md | Draft'), /line 3/);
  assert.throws(() => book.parseBook(header + 'ice.md | Ice\nice.md | Again'), /only once/);
});
