import config from './config.js';
import stateManager from './state-manager.js';

class Navigation {
  constructor() {
    this.chapters = config.chapters;
  }

  getCurrentChapterIndex(chapterId) {
    return this.chapters.findIndex(chapter => chapter.id === chapterId);
  }

  getNextChapter(currentChapterId) {
    const currentIndex = this.getCurrentChapterIndex(currentChapterId);
    return currentIndex < this.chapters.length - 1 ? this.chapters[currentIndex + 1] : null;
  }

  getPreviousChapter(currentChapterId) {
    const currentIndex = this.getCurrentChapterIndex(currentChapterId);
    return currentIndex > 0 ? this.chapters[currentIndex - 1] : null;
  }

  updateNavigationLinks(currentChapterId) {
    const prevChapter = this.getPreviousChapter(currentChapterId);
    const nextChapter = this.getNextChapter(currentChapterId);
    
    const prevLink = document.querySelector('.nav-prev');
    const nextLink = document.querySelector('.nav-next');

    if (prevLink) {
      if (prevChapter) {
        prevLink.href = `/chapter-${prevChapter.id}.html`;
        prevLink.style.display = 'block';
      } else {
        prevLink.style.display = 'none';
      }
    }

    if (nextLink) {
      if (nextChapter) {
        nextLink.href = `/chapter-${nextChapter.id}.html`;
        nextLink.style.display = 'block';
      } else {
        nextLink.style.display = 'none';
      }
    }

    // Save current chapter to state
    stateManager.saveLastChapter(currentChapterId);
  }
}

export default new Navigation(); 