// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');

const mainEl = document.querySelector('main');
const footerEl = document.querySelector('footer');
const mobileQuery = window.matchMedia('(max-width: 800px)');
const isOpen = () => toggle?.classList.contains('open');

function setBackgroundInert(on) {
  [mainEl, footerEl].forEach(el => { if (el) el.inert = on; });
}

function openNav() {
  toggle.classList.add('open');
  navLinks.classList.add('open');
  document.body.classList.add('nav-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
  setBackgroundInert(true);
  // Focus the first link once the panel is visible
  setTimeout(() => navLinks.querySelector('a')?.focus({ preventScroll: true }), 60);
}

function closeNav({ restoreFocus = false } = {}) {
  if (!isOpen()) return;
  toggle.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  setBackgroundInert(false);
  if (restoreFocus) toggle.focus();
}

toggle?.addEventListener('click', () => {
  isOpen() ? closeNav() : openNav();
});

overlay?.addEventListener('click', () => closeNav());

document.addEventListener('keydown', (e) => {
  if (!isOpen()) return;
  if (e.key === 'Escape') {
    closeNav({ restoreFocus: true });
    return;
  }
  // Keep Tab cycling between the toggle and the menu links
  if (e.key === 'Tab') {
    const items = [toggle, ...navLinks.querySelectorAll('a')];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => closeNav());
});

// Close if the viewport grows past the mobile breakpoint (e.g. rotation)
mobileQuery.addEventListener?.('change', (e) => {
  if (!e.matches) closeNav();
});

// Active nav link
const page = document.body.dataset.page;
navLinks?.querySelectorAll('a[data-page]').forEach(a => {
  if (a.dataset.page === page) a.classList.add('active');
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Animate skill bars
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.w;
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

// ===== COPY TO CLIPBOARD (contact page) =====
const toast = document.getElementById('cToast');
let toastTimer;
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied';
      showToast('Email copied to clipboard');
    } catch {
      showToast(text);
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
  });
});

// ===== PROJECT FILTERS =====
const filters = document.querySelectorAll('.proj-filter');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    document.querySelectorAll('.proj-item').forEach(item => {
      item.hidden = f !== 'all' && item.dataset.kind !== f;
    });
  });
});
