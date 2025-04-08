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
      const response = await fetch(`/markdown/chapter-${chapterId}.md`);
      
      if (!response.ok) {
        throw new Error(`Failed to load chapter ${chapterId}`);
      }

      const markdown = await response.text();
      clearTimeout(this.loadingTimeout);

      const title = markdownParser.extractTitle(markdown);
      const content = markdownParser.parse(markdown);

      return { title, content };
    } catch (error) {
      clearTimeout(this.loadingTimeout);
      return {
        title: 'Error',
        content: `<div class="error">Failed to load chapter: ${error.message}</div>`
      };
    }
  }

  // Update the page content with the loaded chapter
  updateChapterContent(title, content) {
    document.title = title;
    const titleElement = document.querySelector('.chapter-title');
    const contentElement = document.querySelector('.chapter-content');

    if (titleElement) {
      titleElement.textContent = title;
    }

    if (contentElement) {
      contentElement.innerHTML = content;
    }
  }
}

export default new ContentLoader(); 