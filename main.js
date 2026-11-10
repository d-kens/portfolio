// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');

function openNav() {
  toggle.classList.add('open');
  navLinks.classList.add('open');
  document.body.classList.add('nav-open');
  toggle.setAttribute('aria-expanded', 'true');
}

function closeNav() {
  toggle.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle?.addEventListener('click', () => {
  toggle.classList.contains('open') ? closeNav() : openNav();
});

overlay?.addEventListener('click', closeNav);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeNav);
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
