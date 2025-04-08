import config from './config.js';
import markdownParser from './markdown-parser.js';

class TOCGenerator {
  async generateTOC() {
    const tocList = document.querySelector('.toc-list');
    if (!tocList) return;

    tocList.innerHTML = '<div class="loading">Loading table of contents...</div>';

    try {
      const chapters = await Promise.all(
        config.chapters.map(async chapter => {
          try {
            const response = await fetch(`/markdown/${chapter.file}`);
            if (!response.ok) throw new Error(`Failed to load ${chapter.file}`);
            
            const markdown = await response.text();
            const title = markdownParser.extractTitle(markdown);
            
            return {
              id: chapter.id,
              title
            };
          } catch (error) {
            console.warn(`Error loading chapter ${chapter.id}:`, error);
            return {
              id: chapter.id,
              title: `Chapter ${chapter.id}`
            };
          }
        })
      );

      const tocHTML = chapters.map(chapter => `
        <li class="toc-item">
          <a href="/chapter-${chapter.id}.html" class="toc-link">
            ${chapter.title}
          </a>
        </li>
      `).join('');

      tocList.innerHTML = tocHTML;
    } catch (error) {
      tocList.innerHTML = `
        <div class="error">
          Failed to generate table of contents: ${error.message}
        </div>
      `;
    }
  }
}

export default new TOCGenerator(); 