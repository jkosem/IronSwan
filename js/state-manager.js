import config, { resolveChapterId } from './book.js';

class StateManager {
  constructor() {
    this.legacyKey = config.storage.lastChapterKey;
    this.storageKey = this.legacyKey + ':' + new URL('../', import.meta.url).pathname;
    this.expiryDays = config.storage.expiryDays;
  }

  saveLastChapter(chapterId, paragraph = null) {
    try {
      const data = {
        chapterId,
        format: 2,
        paragraph,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save reading state:', error);
    }
  }

  getReadingPlace() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) ?? localStorage.getItem(this.legacyKey));
      
      if (!data) {
        return null;
      }

      // Check if the saved state has expired
      const now = new Date().getTime();
      const expiryTime = data.timestamp + (this.expiryDays * 24 * 60 * 60 * 1000);
      
      if (now > expiryTime) {
        return null;
      }

      // Verify that the chapter exists in config
      const id = data.format === 2 ? data.chapterId : resolveChapterId(data.chapterId);
      const chapterExists = config.chapters.some(chapter => chapter.id === id);
      if (!chapterExists) {
        return null;
      }

      return { chapterId: id, paragraph: data.paragraph ?? null };
    } catch (error) {
      console.warn('Failed to load reading state:', error);
      return null;
    }
  }
}

export default new StateManager();
