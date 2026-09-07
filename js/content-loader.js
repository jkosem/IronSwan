import config from './config.js';
import markdownParser from './markdown-parser.js';

class ContentLoader {
  constructor() {
    this.loadingTimeout = null;
    this.loadingDelay = 300; // ms before showing loading indicator
  }

  async loadChapterContent(chapterId) {
    const showLoading = () => {
      const content = document.querySelector('.chapter-content');
      if (content) {
        content.innerHTML = '<div class="loading">Loading chapter...</div>';
      }
    };

    // Set loading timeout
    this.loadingTimeout = setTimeout(showLoading, this.loadingDelay);

    try {
      const chapter = config.chapters.find(c => c.id === chapterId);
      const filePath = chapter ? `markdown/${chapter.file}` : `markdown/chapter-${chapterId}.md`;
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load chapter ${chapterId}`);
      }

      const markdown = await response.text();
      clearTimeout(this.loadingTimeout);

      const title = markdownParser.extractTitle(markdown);
      const content = markdownParser.parse(markdown);

      return { title, content, success: true };
    } catch (error) {
      clearTimeout(this.loadingTimeout);
      return {
        title: 'Error',
        content: `<div class="error">Failed to load chapter: ${error.message}</div>`,
        success: false
      };
    }
  }

  // Update the page content with the loaded chapter
  updateChapterContent(title, content) {
    const contentElement = document.querySelector('.chapter-content');

    if (contentElement) {
      contentElement.innerHTML = content;
    }
  }
}

export default new ContentLoader(); 