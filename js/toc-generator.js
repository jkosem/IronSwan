import config, { chapterURL } from './book.js';

class TOCGenerator {
  generateTOC() {
    const list = document.querySelector('.toc-list');
    if (!list) return;
    const fragment = document.createDocumentFragment();
    for (const [index, chapter] of config.chapters.entries()) {
      const item = document.createElement('li');
      item.className = 'toc-item';
      const link = document.createElement('a');
      link.className = 'toc-link';
      link.href = chapterURL(chapter);
      for (const [className, value] of [['ch-num', config.usesBookFile ? String(index + 1).padStart(2, '0') : chapter.id], ['ch-title', chapter.title || 'Chapter ' + chapter.id], ['ch-go', '→']]) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = value;
        if (className === 'ch-go') span.setAttribute('aria-hidden', 'true');
        link.append(span);
      }
      item.append(link);
      fragment.append(item);
    }
    list.replaceChildren(fragment);
  }
}
export default new TOCGenerator();
