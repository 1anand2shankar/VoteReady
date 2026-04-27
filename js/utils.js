// ============================================
// VoteGuide AI — Utilities
// ============================================

// ── Security: HTML Sanitization (XSS Prevention) ──
export function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function escapeHtml(unsafe) {
  return sanitize(unsafe);
}

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

// Format AI responses — convert markdown to clean HTML
export function formatAIResponse(text) {
  if (!text) return '';
  let s = text;
  
  // Headers: ### Title → styled heading
  s = s.replace(/^#{1,6}\s+(.+)$/gm, '<strong style="display:block;font-size:1.1rem;margin:14px 0 8px;color:var(--saffron-400)">$1</strong>');
  
  // Bold: **text** → <strong>
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic: *text* → <em> (safe because bold was replaced above)
  s = s.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
  
  // Markdown links: [text](url) → <a>
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--saffron-400)">$1</a>');
  
  // Horizontal rule: ---
  s = s.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:12px 0">');
  
  // Table rows
  s = s.replace(/^\|(.+)\|$/gm, (m, inner) => {
    const cells = inner.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.every(c => /^[-:]+$/.test(c))) return '';
    return '<div style="display:flex;gap:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.08)">' + cells.map(c => '<span style="flex:1">' + c + '</span>').join('') + '</div>';
  });
  
  // Bullet lists
  s = s.replace(/^[\-\*] (.+)$/gm, '<div style="padding:2px 0 2px 16px">• $1</div>');
  
  // Numbered lists
  s = s.replace(/^(\d+)\. (.+)$/gm, '<div style="padding:2px 0 2px 16px">$1. $2</div>');
  
  // Double newlines → paragraph
  s = s.replace(/\n\n/g, '</p><p style="margin:8px 0">');
  
  // Single newlines → br
  s = s.replace(/\n/g, '<br>');
  
  // Final brute-force cleanup of any leftover markdown symbols
  s = s.replace(/<br>#{1,6}\s*/g, '<br>');
  s = s.replace(/^#{1,6}\s*/g, '');
  s = s.replace(/\*\*/g, ''); // strip any unmatched double asterisks
  s = s.replace(/(^|\s)\*(?=\s|$)/g, ' '); // strip stray single asterisks used as bullets
  s = s.replace(/#/g, ''); // strip any remaining hash symbols
  
  return s;
}
