import config from './book.js';
import markdownParser from './markdown-parser.js';

class ContentLoader {
  constructor() {
    this.loadingTimeout = null;
    this.loadingDelay = 300; // ms before showing loading indicator
    this.cache = new Map(); // Cache loaded chapter contents
    // Each chapter is a separate HTML document, so in-memory prefetching is not useful.
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
      if (!chapter) {
        clearTimeout(this.loadingTimeout);
        return { title: 'Chapter unavailable', content: '<p>This chapter is unavailable. Return to the contents to choose a chapter.</p>', success: false };
      }
      const filePath = 'markdown/' + (config.usesBookFile ? encodeURIComponent(chapter.file) : chapter.file);
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load chapter ${chapterId}`);
      }

      const markdown = await response.text();
      clearTimeout(this.loadingTimeout);

      const title = config.usesBookFile ? chapter.title : markdownParser.extractTitle(markdown);
      // Books migrated from v1.1 can keep their original leading title line.
      const body = config.usesBookFile ? markdown.trimStart().replace(/^# [^\n]*(?:\n|$)/, '') : markdown;
      const content = markdownParser.parse(body);
      const result = { title, content, success: true };

      // Cache result for instant transitions
      this.cache.set(chapterId, result);

      return result;
    } catch (error) {
      clearTimeout(this.loadingTimeout);
      return {
        title: 'Error',
        content: '<div class="error">Failed to load chapter. Please refresh or try again later.</div>',
        success: false
      };
    }
  }

  // Browser HTTP caching handles chapter resources across document navigations.
  // Update the page content with the loaded chapter
  updateChapterContent(title, content, success) {
    const contentElement = document.querySelector('.chapter-content');

    if (contentElement) {
      contentElement.innerHTML = content;
      if (config.error) contentElement.textContent = config.error;
      if (config.usesBookFile && success) {
        const heading = document.createElement('h1');
        heading.textContent = title;
        contentElement.prepend(heading);
      }
    }
  }
}

export default new ContentLoader(); 