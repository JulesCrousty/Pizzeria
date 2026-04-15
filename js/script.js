// BRASA — Pizzeria Artisanale
// JavaScript — Interactions

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // --- Menu tabs ---
  const tabs = document.querySelectorAll('.tab');
  const grids = {
    signatures: document.getElementById('tab-signatures'),
    classiques:  document.getElementById('tab-classiques'),
    veggie:      document.getElementById('tab-veggie'),
    extras:      document.getElementById('tab-extras'),
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const key = tab.dataset.tab;
      Object.entries(grids).forEach(([k, el]) => {
        if (!el) return;
        if (k === key) {
          el.removeAttribute('aria-hidden');
          el.style.animation = 'none';
          el.offsetHeight; // reflow
          el.style.animation = 'fade-up 0.35s ease both';
        } else {
          el.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });

  // --- Contact form (front-end only demo) ---
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.querySelector('#name').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        // Simple shake animation on empty required fields
        [form.querySelector('#name'), form.querySelector('#email'), form.querySelector('#message')].forEach(el => {
          if (!el.value.trim()) {
            el.style.borderColor = '#c0392b';
            setTimeout(() => { el.style.borderColor = ''; }, 2200);
          }
        });
        return;
      }

      // Simulate sending
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Envoi en cours…';

      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Envoyer le message';
        successMsg.classList.remove('hidden');
        setTimeout(() => successMsg.classList.add('hidden'), 5000);
      }, 1200);
    });
  }

  // --- Scroll-reveal (IntersectionObserver) ---
  const revealEls = document.querySelectorAll(
    '.pizza-card, .extra-card, .loc-item, .contact-card, .stat, .split-text, .split-visual'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.04}s, transform 0.55s ease ${i * 0.04}s`;
    observer.observe(el);
  });

  // --- Smooth active nav link highlight ---
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

})();
