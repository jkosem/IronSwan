import config, { chapterURL, resolveChapterId } from './book.js';
import contentLoader from './content-loader.js';
import stateManager from './state-manager.js';
import navigation from './navigation.js';

/**
 * Auto-detect the current chapter ID from URL path, query params, or fallback to first chapter.
 * Supports: chapter-01.html, chapter-1.html, ?chapter=01, ?ch=1
 */
function detectChapterId() {
  // 1. Check pathname (e.g., chapter-01.html -> "01")
  const pathMatch = window.location.pathname.match(/\/chapter-(\d+)\.html$/i);
  if (pathMatch && pathMatch[1]) {
    return resolveChapterId(pathMatch[1].padStart(2, '0'));
  }

  // 2. Check search params (e.g., ?chapter=01 or ?ch=1)
  const params = new URLSearchParams(window.location.search);
  const queryCh = params.get('chapter') || params.get('ch');
  if (queryCh) {
    return config.chapters.some(chapter => chapter.id === queryCh) ? queryCh : queryCh.padStart(2, '0');
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
  let docHeight = 0;
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    bar.style.transform = `scaleX(${progress / 100})`;
    ticking = false;
  };

  const schedule = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };
  const measure = () => {
    docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    schedule();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(document.body);
  document.fonts?.ready.then(measure);
  document.addEventListener('load', measure, true);
  measure();
  return measure;
}

/**
 * Calculate estimated reading time and display it right below the chapter title.
 */
function setupReadingTime() {
  const contentEl = document.querySelector('.chapter-content');
  if (!contentEl) return;

  // Remove existing indicator if present
  const existing = contentEl.querySelector('.chapter-reading-time');
  if (existing) existing.remove();

  // Calculate word count from chapter content (approx. 220 words per minute)
  const text = Array.from(contentEl.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,pre')).map(el => el.textContent).join(' ') || contentEl.textContent || '';
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  const timeEl = document.createElement('div');
  timeEl.className = 'chapter-reading-time';
  timeEl.textContent = `${minutes} min read`;

  const titleEl = contentEl.querySelector('h1');
  if (titleEl) {
    titleEl.classList.add('has-reading-time');
    titleEl.insertAdjacentElement('afterend', timeEl);
  } else {
    contentEl.prepend(timeEl);
  }
}

// The first paragraph crossing the top reading edge is the reader's place.
// Measure only when saving, never on the animation-frame progress path.
function setupReadingPlace() {
  const paragraphs = Array.from(document.querySelectorAll('.chapter-content p'))
    .filter(paragraph => paragraph.textContent.trim());
  const saved = stateManager.getReadingPlace();
  if (location.hash === '#continue' && saved?.chapterId === CHAPTER_ID && saved.paragraph) {
    const { index, text } = saved.paragraph;
    let target = paragraphs[index];
    if (target?.textContent !== text) {
      const matches = paragraphs.filter(paragraph => paragraph.textContent === text);
      target = matches.length === 1 ? matches[0] : null;
    }
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }

  function save() {
    let place = null;
    if (window.scrollY > 0 && paragraphs.length) {
      let first = 0;
      let last = paragraphs.length - 1;
      while (first < last) {
        const middle = Math.floor((first + last) / 2);
        if (paragraphs[middle].getBoundingClientRect().bottom <= 1) first = middle + 1;
        else last = middle;
      }
      place = { index: first, text: paragraphs[first].textContent };
    }
    stateManager.saveLastChapter(CHAPTER_ID, place);
  }

  let timer;
  function flush() {
    clearTimeout(timer);
    save();
  }
  save();
  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(save, 250);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) flush();
  });
  window.addEventListener('pagehide', () => {
    if (!document.hidden) flush();
  });
}

/**
 * Keyboard navigation for desktop readers.
 * Left Arrow: Previous Chapter
 * Right Arrow: Next Chapter
 * Escape: Back to Table of Contents
 */
function setupKeyboardNavigation(prevChapter, nextChapter) {
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    if (e.key === 'ArrowLeft' && prevChapter) {
      window.location.href = chapterURL(prevChapter);
    } else if (e.key === 'ArrowRight' && nextChapter) {
      window.location.href = chapterURL(nextChapter);
    } else if (e.key === 'Escape') {
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
          window.location.href = chapterURL(nextChapter);
        } else if (deltaX > 0 && prevChapter) {
          window.location.href = chapterURL(prevChapter);
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
  const refreshProgress = setupProgressBar();

  // Load and render chapter markdown
  const { title, content, success } = await contentLoader.loadChapterContent(CHAPTER_ID);
  contentLoader.updateChapterContent(title, content, success);
  if (success) {
    setupReadingTime();
  }
  navigation.updateNavigationLinks(CHAPTER_ID);
  document.querySelector('.chapter-content')?.setAttribute('aria-busy', 'false');
  if (success) setupReadingPlace();
  refreshProgress();
  document.title = `${config.title} - ${title}`;

  // Get neighboring chapters for shortcuts
  const prevChapter = navigation.getPreviousChapter(CHAPTER_ID);
  const nextChapter = navigation.getNextChapter(CHAPTER_ID);

  // Set navigation link labels
  const prevLink = document.querySelector('.nav-prev');
  const nextLink = document.querySelector('.nav-next');
  if (prevLink) {
    prevLink.textContent = '← Previous';
  }
  if (nextLink) {
    nextLink.textContent = 'Next →';
  }

  // Register desktop keyboard & mobile touch navigation
  setupKeyboardNavigation(prevChapter, nextChapter);
  setupSwipeNavigation(prevChapter, nextChapter);

  // Browser HTTP caching, rather than a per-page Map, handles repeat requests.
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChapter);
} else {
  initChapter();
}

export { CHAPTER_ID, initChapter };
