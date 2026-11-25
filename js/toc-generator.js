const escapeHTML = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
import config from './config.js';


class TOCGenerator {
  async generateTOC() {
    const tocList = document.querySelector('.toc-list');
    if (!tocList) return;

    tocList.innerHTML = '<li class="toc-status loading">Loading table of contents...</li>';

    try {
      const chapters = config.chapters.map(chapter => ({ id: chapter.id, title: chapter.title || `Chapter ${chapter.id}` }));

      const tocHTML = chapters.map(chapter => `
        <li class="toc-item">
          <a href="chapter-${chapter.id}.html" class="toc-link">
            <span class="ch-num">${chapter.id}</span>
            <span class="ch-title">${escapeHTML(chapter.title)}</span>
            <span class="ch-go" aria-hidden="true">→</span>
          </a>
        </li>
      `).join('');

      tocList.innerHTML = tocHTML;
    } catch (error) {
      tocList.innerHTML = `
        <li class="toc-status error">
          Failed to generate table of contents: Unable to load chapter list
        </li>
      `;
    }
  }
}

export default new TOCGenerator(); 