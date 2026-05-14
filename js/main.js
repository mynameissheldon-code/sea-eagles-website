/* ============================================================
   Sea Eagles Group — main.js
   Nav scroll state, mobile menu toggle, scroll-reveal observer,
   current year stamp, dynamic active nav link.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu toggle ---------- */
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Active nav link (by current filename) ---------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href && href === currentPath) {
      link.classList.add('is-active');
    }
  });

  /* ---------- Scroll-reveal via IntersectionObserver ---------- */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback — show everything
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Auto-fill current year in footer ---------- */
  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
