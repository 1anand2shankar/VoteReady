// ============================================
// VoteGuide AI — Utilities
// ============================================

// Toast notification system
export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-message">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Animate number counting up
export function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const suffix = el.dataset.suffix || '';
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Intersection Observer for scroll reveal
export function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Trigger counter animation on self or children
        if (entry.target.dataset.counter) {
          animateCounter(entry.target, parseInt(entry.target.dataset.counter));
        }
        entry.target.querySelectorAll('[data-counter]').forEach(el => {
          if (!el.dataset.counted) {
            el.dataset.counted = '1';
            animateCounter(el, parseInt(el.dataset.counter));
          }
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  return observer;
}

// Smooth page transition
export function pageTransition(renderFn) {
  const app = document.getElementById('app');
  app.style.opacity = '0';
  app.style.transform = 'translateY(10px)';
  setTimeout(() => {
    renderFn();
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
      app.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      app.style.opacity = '1';
      app.style.transform = 'translateY(0)';
    });
    setTimeout(() => initScrollReveal(), 100);
  }, 150);
}

// Debounce utility
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Format date
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Sanitize HTML to prevent XSS
export function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Simple markdown-like formatting for AI responses
export function formatAIResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n- /g, '<br>• ')
    .replace(/\n(\d+)\. /g, '<br>$1. ')
    .replace(/\n/g, '<br>');
}
