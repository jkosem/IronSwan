import config from './config.js';
import markdownParser from './markdown-parser.js';

class TOCGenerator {
  async generateTOC() {
    const tocList = document.querySelector('.toc-list');
    if (!tocList) return;

    tocList.innerHTML = '<li class="toc-status loading">Loading table of contents...</li>';

    try {
      const chapters = await Promise.all(
        config.chapters.map(async chapter => {
          try {
            const response = await fetch(`markdown/${chapter.file}`);
            if (!response.ok) throw new Error(`Failed to load ${chapter.file}`);
            
            const markdown = await response.text();
            const title = markdownParser.extractTitle(markdown);
            
            return {
              id: chapter.id,
              title: title || chapter.title || `Chapter ${chapter.id}`
            };
          } catch (error) {
            console.warn(`Error loading chapter ${chapter.id}:`, error);
            return {
              id: chapter.id,
              title: chapter.title || `Chapter ${chapter.id}`
            };
          }
        })
      );

      const tocHTML = chapters.map(chapter => `
        <li class="toc-item">
          <a href="chapter-${chapter.id}.html" class="toc-link">
            ${chapter.title}
          </a>
        </li>
      `).join('');

      tocList.innerHTML = tocHTML;
    } catch (error) {
      tocList.innerHTML = `
        <li class="toc-status error">
          Failed to generate table of contents: ${error.message}
        </li>
      `;
    }
  }
}

export default new TOCGenerator(); 