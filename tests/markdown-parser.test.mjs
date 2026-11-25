import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../js/markdown-parser.js', import.meta.url), 'utf8');
const { default: parser } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

test('headings and inline emphasis', () => {
  assert.match(parser.parse('# Hello\n\nSome **bold** and *italic*.'), /<h1>Hello<\/h1>/);
  assert.match(parser.parse('**bold** and *italic*'), /<strong>bold<\/strong> and <em>italic<\/em>/);
});
test('ordered and unordered lists', () => {
  assert.match(parser.parse('1. First\n2. Second'), /<ol><li>First<\/li><li>Second<\/li><\/ol>/);
  assert.match(parser.parse('- First\n- Second'), /<ul><li>First<\/li><li>Second<\/li><\/ul>/);
});
test('raw HTML is escaped', () => {
  const html = parser.parse('<script>alert(1)</script>');
  assert.ok(!html.includes('<script>'));
  assert.match(html, /&lt;script&gt;/);
});
test('unsafe URL schemes are not converted to clickable links', () => {
  assert.ok(!parser.parse('[bad](javascript:alert)').includes('<a '));
  assert.ok(!parser.parse('![bad](data:text/html)').includes('<img '));
});
test('quotes in URLs and alt text are escaped', () => {
  const html = parser.parse('![a"b](picture"test.png)');
  assert.ok(!html.includes('alt="a"b"'));
  assert.match(html, /&quot;/);
});
test('fenced code is not interpreted as HTML', () => {
  assert.match(parser.parse('~~~js\n<script>evil</script>\n~~~'), /<pre><code>&lt;script&gt;evil&lt;\/script&gt;<\/code><\/pre>/);
});
test('CRLF, title extraction, and empty content', () => {
  assert.equal(parser.extractTitle('# A title\r\n'), 'A title');
  assert.equal(parser.parse(''), '');
  assert.match(parser.parse('# Title\r\n\r\nBody'), /<p>Body<\/p>/);
});
test('safe relative and HTTPS links remain functional', () => {
  assert.match(parser.parse('[chapter](chapter-02.html)'), /href="chapter-02.html"/);
  assert.match(parser.parse('[site](https:\/\/example.com)'), /href="https:\/\/example.com"/);
});
