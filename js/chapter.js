import config from './config.js';
import contentLoader from './content-loader.js';
import navigation from './navigation.js';
import stateManager from './state-manager.js';

/**
 * Auto-detect the current chapter ID from URL path, query params, or fallback to first chapter.
 * Supports: chapter-01.html, chapter-1.html, ?chapter=01, ?ch=1
 */
function detectChapterId() {
  // 1. Check pathname (e.g., chapter-01.html -> "01")
  const pathMatch = window.location.pathname.match(/chapter-(\d+)/i);
  if (pathMatch && pathMatch[1]) {
    return pathMatch[1].padStart(2, '0');
  }

  // 2. Check search params (e.g., ?chapter=01 or ?ch=1)
  const params = new URLSearchParams(window.location.search);
  const queryCh = params.get('chapter') || params.get('ch');
  if (queryCh) {
    return queryCh.padStart(2, '0');
  }

  // 3. Fallback to first chapter in config
  return (config.chapters && config.chapters[0]) ? config.chapters[0].id : '01';
}

const CHAPTER_ID = detectChapterId();

/**
 * Setup a non-blocking, smooth reading progress bar across the top of the viewport.
 */
function setupProgressBar() {
  let bar = document.getElementById('reading-progress');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'reading-progress';
    bar.className = 'reading-progress-bar';
    document.body.prepend(bar);
  }

  let ticking = false;
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    bar.style.width = `${progress}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
}

/**
 * Keyboard navigation for desktop readers.
 * Left Arrow or '[': Previous Chapter
 * Right Arrow or ']': Next Chapter
 * Escape or 'H': Back to Table of Contents
 */
function setupKeyboardNavigation(prevChapter, nextChapter) {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    if ((e.key === 'ArrowLeft' || e.key === '[') && prevChapter) {
      window.location.href = `chapter-${prevChapter.id}.html`;
    } else if ((e.key === 'ArrowRight' || e.key === ']') && nextChapter) {
      window.location.href = `chapter-${nextChapter.id}.html`;
    } else if (e.key === 'Escape' || (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey)) {
      window.location.href = 'index.html';
    }
  });
}

/**
 * Touch swipe gestures for mobile browsers.
 * Swipe left: Next Chapter
 * Swipe right: Previous Chapter
 */
function setupSwipeNavigation(prevChapter, nextChapter) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const duration = Date.now() - touchStartTime;

      // Swipe requirements:
      // - Quick gesture (< 450ms)
      // - Horizontal travel > 70px
      // - Horizontal travel is at least 2x the vertical travel (to avoid triggering during normal scrolling)
      if (duration < 450 && Math.abs(deltaX) > 70 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
        if (deltaX < 0 && nextChapter) {
          window.location.href = `chapter-${nextChapter.id}.html`;
        } else if (deltaX > 0 && prevChapter) {
          window.location.href = `chapter-${prevChapter.id}.html`;
        }
      }
    }
  }, { passive: true });
}

/**
 * Main initialization routine for chapter reading view
 */
async function initChapter() {
  // Update header and footer text
  const titleEl = document.getElementById('book-title');
  const copyrightEl = document.getElementById('book-copyright');
  if (titleEl) titleEl.textContent = config.title;
  if (copyrightEl) copyrightEl.textContent = config.copyright;

  // Mount reading progress indicator
  setupProgressBar();

  // Load and render chapter markdown
  const { title, content, success } = await contentLoader.loadChapterContent(CHAPTER_ID);
  contentLoader.updateChapterContent(title, content);
  navigation.updateNavigationLinks(CHAPTER_ID, success);
  document.title = `${config.title} - ${title}`;

  // Get neighboring chapters for shortcuts & prefetching
  const prevChapter = navigation.getPreviousChapter(CHAPTER_ID);
  const nextChapter = navigation.getNextChapter(CHAPTER_ID);

  // Decorate navigation links with desktop keyboard hints
  const prevLink = document.querySelector('.nav-prev');
  const nextLink = document.querySelector('.nav-next');
  if (prevLink && prevChapter) {
    prevLink.innerHTML = `← Previous Chapter<span class="nav-hint">[←]</span>`;
  }
  if (nextLink && nextChapter) {
    nextLink.innerHTML = `Next Chapter →<span class="nav-hint">[→]</span>`;
  }

  // Register desktop keyboard & mobile touch navigation
  setupKeyboardNavigation(prevChapter, nextChapter);
  setupSwipeNavigation(prevChapter, nextChapter);

  // Background prefetch next & previous chapters for instant 0ms transitions
  if (nextChapter) {
    contentLoader.prefetchChapter(nextChapter.id);
  }
  if (prevChapter) {
    contentLoader.prefetchChapter(prevChapter.id);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChapter);
} else {
  initChapter();
}

export { CHAPTER_ID, initChapter };
