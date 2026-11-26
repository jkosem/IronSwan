import legacy from './config.js';

export function parseBook(text) {
  const book = { chapters: [], copyright: '' };
  const files = new Set();
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const field = line.match(/^(Title|Author|Copyright):\s*(.*)$/i);
    if (field) {
      book[field[1].toLowerCase()] = field[2];
      continue;
    }
    const divider = line.indexOf('|');
    const file = line.slice(0, divider).trim();
    const title = line.slice(divider + 1).trim();
    if (divider < 0 || !title || !/^[\p{L}\p{N}][\p{L}\p{N} ._-]*\.md$/u.test(file)) {
      throw new Error('Check line ' + (index + 1) + ' in book.txt. Use filename.md | Chapter title.');
    }
    if (files.has(file)) throw new Error('List ' + file + ' only once in book.txt.');
    files.add(file);
    const numbered = file.match(/^chapter-(\d+)\.md$/);
    const id = numbered ? numbered[1] : file;
    book.chapters.push({ id, file, title });
  }
  if (!book.title || !book.author) throw new Error('Add Title: and Author: lines to book.txt.');
  return book;
}

async function loadBook() {
  const response = await fetch(new URL('../book.txt', import.meta.url));
  if (response.status === 404 || response.status === 410) return legacy;
  if (!response.ok) throw new Error('Could not open book.txt. Please try again.');
  return { ...legacy, ...parseBook(await response.text()), usesBookFile: true };
}

let book;
try {
  book = await loadBook();
} catch (error) {
  book = { ...legacy, title: 'Book unavailable', author: '', copyright: '', chapters: [], error: error.message };
}

// Old numbered page URLs and saved positions identify a v1.1 chapter by ID.
export function resolveChapterId(id) {
  if (!book.usesBookFile) return id;
  const oldFile = legacy.chapters.find(chapter => chapter.id === id)?.file;
  return book.chapters.find(chapter => chapter.file === oldFile)?.id ?? id;
}

export function chapterURL(chapter) {
  const id = encodeURIComponent(chapter.id);
  return book.usesBookFile ? 'chapter.html?chapter=' + id : 'chapter-' + id + '.html';
}

export default book;
