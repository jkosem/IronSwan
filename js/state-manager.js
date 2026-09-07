import config from './config.js';

class StateManager {
  constructor() {
    this.storageKey = config.storage.lastChapterKey;
    this.expiryDays = config.storage.expiryDays;
  }

  saveLastChapter(chapterId) {
    try {
      const data = {
        chapterId,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save reading state:', error);
    }
  }

  getLastChapter() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey));
      
      if (!data) {
        return null;
      }

      // Check if the saved state has expired
      const now = new Date().getTime();
      const expiryTime = data.timestamp + (this.expiryDays * 24 * 60 * 60 * 1000);
      
      if (now > expiryTime) {
        localStorage.removeItem(this.storageKey);
        return null;
      }

      // Verify that the chapter exists in config
      const chapterExists = config.chapters.some(chapter => chapter.id === data.chapterId);
      if (!chapterExists) {
        return null;
      }

      return data.chapterId;
    } catch (error) {
      console.warn('Failed to load reading state:', error);
      return null;
    }
  }

  clearState() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('Failed to clear reading state:', error);
    }
  }
}

export default new StateManager(); 