import config, { chapterURL } from './book.js';

class Navigation {
  constructor() {
    this.chapters = config.chapters;
  }

  getCurrentChapterIndex(chapterId) {
    return this.chapters.findIndex(chapter => chapter.id === chapterId);
  }

  getNextChapter(currentChapterId) {
    const currentIndex = this.getCurrentChapterIndex(currentChapterId);
    if (currentIndex === -1) return null;
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
        prevLink.href = chapterURL(prevChapter);
        prevLink.style.display = 'inline-flex';
      } else {
        prevLink.style.display = 'none';
      }
    }

    if (nextLink) {
      if (nextChapter) {
        nextLink.href = chapterURL(nextChapter);
        nextLink.style.display = 'inline-flex';
      } else {
        nextLink.style.display = 'none';
      }
    }
  }
}

export default new Navigation(); 