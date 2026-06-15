/* =============================================
   CODE9 — JAVASCRIPT ENGINE (EDITORIAL EDITION)
   ============================================= */
'use strict';

/* ========================
   1. LOADER
   ======================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initCounters();
    initHeroReveal();
  }, 1400);
});

document.body.style.overflow = 'hidden';

/* ========================
   2. NAVBAR SCROLL
   ======================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ========================
   3. MOBILE MENU
   ======================== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.querySelector('.mobile-close').focus();
}
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.focus();
}

hamburger.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) closeMenu();
  else openMenu();
});

if (mobileClose) mobileClose.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

/* ========================
   4. SMOOTH SCROLL
   ======================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ========================
   5. SCROLL REVEAL
   ======================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.section-reveal').forEach(el => revealObserver.observe(el));

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-card').forEach(el => cardObserver.observe(el));

/* ========================
   6. HERO REVEAL
   ======================== */
function initHeroReveal() {
  // Hero elements with inline transition delays are triggered by adding 'visible'
  document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-sub, .hero-actions, .hero-stats, .hero-right').forEach(el => {
    el.classList.add('visible');
  });

  // Code lines typewriter
  const lines = document.querySelectorAll('.code-line');
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 800 + i * 110);
  });
}

/* ========================
   7. COUNTER ANIMATION
   ======================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = target >= 1000 ? '+' : target >= 100 ? '+' : '';
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      counter.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ========================
   8. MAGNETIC BUTTONS
   ======================== */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 500);
    });
  });
}

/* ========================
   9. CARD TILT
   ======================== */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.bento-card, .project-card, .testi-card, .pillar-card, .benefit-main').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-3px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s';
    });
  });
}

/* ========================
   10. ACTIVE NAV LINK
   ======================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', isActive);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ========================
   11. FORM — VALIDATION
   ======================== */
const form       = document.getElementById('join-form');
const submitBtn  = document.getElementById('submit-btn');
const btnText    = document.getElementById('btn-text');
const successBox = document.getElementById('form-success');

function validateField(field) {
  const val = field.value.trim();
  const errorEl = document.getElementById(field.id + '-error');
  let ok = true;
  let msg = '';

  if (field.required && !val) {
    ok = false;
    msg = 'This field is required.';
  } else if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    ok = false;
    msg = 'Please enter a valid email address.';
  }

  field.classList.toggle('error', !ok);
  if (errorEl) errorEl.textContent = msg;
  if (ok) field.removeAttribute('aria-describedby');
  else if (errorEl) field.setAttribute('aria-describedby', field.id + '-error');

  return ok;
}

form.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.classList.contains('error')) validateField(field);
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll('input[required], select[required]').forEach(f => {
    if (!validateField(f)) valid = false;
  });
  if (!valid) {
    form.querySelector('.error')?.focus();
    return;
  }

  submitBtn.disabled = true;
  btnText.textContent = 'Submitting...';
  submitBtn.style.opacity = '0.7';

  const data = {
    fname:    document.getElementById('fname').value.trim(),
    lname:    document.getElementById('lname').value.trim(),
    email:    document.getElementById('email').value.trim(),
    role:     document.getElementById('role').value,
    interest: document.getElementById('interest').value.trim(),
    joined_at: new Date().toISOString(),
  };

  try {
    // ── BACKEND SUBMISSION ─────────────────────────
    // OPTION A: Formspree
    // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!res.ok) throw new Error('Submission failed');
    //
    // OPTION B: Custom API
    // const res = await fetch('https://api.code9community.com/v1/members', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!res.ok) throw new Error('Submission failed');
    // ───────────────────────────────────────────────

    // DEMO MODE:
    await new Promise(r => setTimeout(r, 1200));

    form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    successBox.classList.add('show');
    btnText.textContent = '✓ You\'re in!';
    submitBtn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';

    if (window.gtag) {
      gtag('event', 'join_submit', { event_category: 'engagement', event_label: data.role });
    }

  } catch (err) {
    console.error('Form error:', err);
    btnText.textContent = 'Try Again';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.style.background = '#DC2626';
    setTimeout(() => {
      btnText.textContent = 'Join the Community →';
      submitBtn.style.background = '';
    }, 3000);
  }
});

/* ========================
   12. SECRET DEV MODE
   ======================== */
let keys = '';
document.addEventListener('keydown', (e) => {
  keys += e.key.toLowerCase();
  if (keys.includes('code9')) {
    document.documentElement.style.setProperty('--amber', '#7c3aed');
    console.log('%c🟣 Developer mode — classic mode restored', 'color: #7c3aed; font-weight: bold;');
    keys = '';
  }
  if (keys.length > 20) keys = keys.slice(-20);
});