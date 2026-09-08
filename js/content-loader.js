import config from './config.js';
import markdownParser from './markdown-parser.js';

class ContentLoader {
  constructor() {
    this.loadingTimeout = null;
    this.loadingDelay = 300; // ms before showing loading indicator
    this.cache = new Map(); // Cache loaded chapter contents
  }

  async loadChapterContent(chapterId) {
    // Check in-memory cache first for instant 0ms load
    if (this.cache.has(chapterId)) {
      return this.cache.get(chapterId);
    }

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
      const result = { title, content, success: true };

      // Cache result for instant transitions
      this.cache.set(chapterId, result);

      return result;
    } catch (error) {
      clearTimeout(this.loadingTimeout);
      return {
        title: 'Error',
        content: `<div class="error">Failed to load chapter: ${error.message}</div>`,
        success: false
      };
    }
  }

  // Background prefetch for instantaneous next/previous chapter loading
  async prefetchChapter(chapterId) {
    if (!chapterId || this.cache.has(chapterId)) return;
    try {
      const chapter = config.chapters.find(c => c.id === chapterId);
      const filePath = chapter ? `markdown/${chapter.file}` : `markdown/chapter-${chapterId}.md`;
      const response = await fetch(filePath);
      if (response.ok) {
        const markdown = await response.text();
        const title = markdownParser.extractTitle(markdown);
        const content = markdownParser.parse(markdown);
        this.cache.set(chapterId, { title, content, success: true });
      }
    } catch (e) {
      // Background prefetch error can be safely ignored
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