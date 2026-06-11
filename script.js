/* ─────────────────────────────────────────────
   script.js — G.P. Hemachandra Portfolio
───────────────────────────────────────────── */

/* ── Particles (Disabled) ───────────────── */

/* ── Typewriter ─────────────────────────── */
(function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'HND IT Student',
    'PS Module Learner',
    'Aspiring Tech Professional',
    'Professional Skills Graduate',
    'SLIIT City Uni',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (deleting) {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 500);
        return;
      }
      setTimeout(tick, 50);
    } else {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 80);
    }
  }
  tick();
})();

/* ── Navbar scroll behaviour ─────────────── */
(function navbar() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Hamburger toggle
  hamburger && hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close nav on link click (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link on scroll
  const setActive = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 90;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ── Scroll reveal ───────────────────────── */
(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  items.forEach(item => observer.observe(item));
})();

/* ── Skill bars animate on scroll ────────── */
(function skillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        // Small delay so the reveal animation plays first
        setTimeout(() => {
          target.style.width = width + '%';
        }, 300);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
})();



/* ── CSR Slideshow Slider ───────────────── */
(function csrSlider() {
  const container = document.querySelector('.csr-slider-container');
  if (!container) return;

  const slides = container.querySelectorAll('.csr-slide');
  const dots = container.querySelectorAll('.slider-dot');
  const prevBtn = container.querySelector('.prev-btn');
  const nextBtn = container.querySelector('.next-btn');

  let currentIdx = 0;
  let intervalId = null;
  const intervalTime = 5000; // 5 seconds

  function showSlide(index) {
    // Wrap index around
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    currentIdx = index;

    // Update slides classes
    slides.forEach((slide, i) => {
      if (i === currentIdx) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dots classes
    dots.forEach((dot, i) => {
      if (i === currentIdx) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIdx + 1);
  }

  function prevSlide() {
    showSlide(currentIdx - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(nextSlide, intervalTime);
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay(); // Reset timer
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay(); // Reset timer
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      showSlide(idx);
      startAutoPlay(); // Reset timer
    });
  });

  // Pause on hover
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);

  // Initialize
  showSlide(0);
  startAutoPlay();
})();
