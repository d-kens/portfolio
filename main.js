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
