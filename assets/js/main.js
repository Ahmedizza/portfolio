/**
 * MOH IZZA ROMADLON — PERSONAL PORTFOLIO
 * Dark Silver × Futuristic × Cosmic Theme Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initCosmicStarfield();
  initProfileModeToggle();
  initCertificateModal();
  initNavigation();
  initScrollReveal();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. COSMIC STARFIELD & STARDUST CANVAS (Performance-Optimized)
   ========================================================================== */
function initCosmicStarfield() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;

  // Star particle definition
  const STARS_COUNT = window.innerWidth < 768 ? 60 : 130;
  const stars = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Color palette for cosmic stars (Silver, White, Cold Blue)
  const starColors = [
    'rgba(248, 250, 252, ', // White
    'rgba(199, 204, 209, ', // Metallic Silver
    'rgba(148, 163, 184, ', // Ice Blue
    'rgba(100, 116, 139, '  // Cold Blue
  ];

  for (let i = 0; i < STARS_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.6 + 0.2,
      alphaSpeed: Math.random() * 0.015 + 0.005,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      angle: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Render each drifting star
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.angle += s.alphaSpeed;
      const alpha = s.baseAlpha + Math.sin(s.angle) * 0.25;
      const currentAlpha = Math.max(0.1, Math.min(1, alpha));

      // Gentle drift
      s.x += s.speedX;
      s.y += s.speedY;

      // Wrap around edges
      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color + currentAlpha + ')';
      ctx.fill();

      // Subtle silver glow on larger stars
      if (s.size > 1.4) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(199, 204, 209, ' + (currentAlpha * 0.15) + ')';
        ctx.fill();
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  // Handle visibility change to conserve battery/GPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      draw();
    }
  });

  draw();
}

/* ==========================================================================
   2. INTERACTIVE PROFILE MODE TOGGLE (REAL WORLD vs COSMIC MODE)
   ========================================================================== */
function initProfileModeToggle() {
  const toggleBtn = document.getElementById('profile-mode-toggle');
  const realImg = document.getElementById('avatar-real');
  const cosmicImg = document.getElementById('avatar-cosmic');
  const modeBadgeText = document.getElementById('mode-badge-text');
  const modeStatusDesc = document.getElementById('avatar-status-desc');

  if (!toggleBtn || !realImg || !cosmicImg) return;

  let isCosmicMode = false;

  toggleBtn.addEventListener('click', () => {
    isCosmicMode = !isCosmicMode;

    if (isCosmicMode) {
      // Switch to Cosmic Mode
      realImg.classList.remove('active');
      realImg.classList.add('inactive');
      cosmicImg.classList.remove('inactive');
      cosmicImg.classList.add('active');

      if (modeBadgeText) modeBadgeText.textContent = 'COSMIC MODE';
      if (modeStatusDesc) modeStatusDesc.textContent = 'STELLAR CULTIVATION MATRIX';
      toggleBtn.innerHTML = `
        <svg class="w-3.5 h-3.5 text-silver-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>SWITCH: REAL WORLD</span>
      `;
    } else {
      // Switch back to Real World
      cosmicImg.classList.remove('active');
      cosmicImg.classList.add('inactive');
      realImg.classList.remove('inactive');
      realImg.classList.add('active');

      if (modeBadgeText) modeBadgeText.textContent = 'REAL WORLD';
      if (modeStatusDesc) modeStatusDesc.textContent = 'EVOLUTION IN PROGRESS';
      toggleBtn.innerHTML = `
        <svg class="w-3.5 h-3.5 text-silver-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>PROFILE MODE: COSMIC</span>
      `;
    }
  });
}

/* ==========================================================================
   3. CERTIFICATE MODAL PREVIEW
   ========================================================================== */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-cert-image');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalIssuer = document.getElementById('modal-cert-issuer');
  const modalYear = document.getElementById('modal-cert-year');
  const modalDesc = document.getElementById('modal-cert-desc');
  const viewButtons = document.querySelectorAll('.btn-view-cert');

  if (!modal) return;

  function openModal(data) {
    if (modalImg) modalImg.src = data.img;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalIssuer) modalIssuer.textContent = data.issuer;
    if (modalYear) modalYear.textContent = data.year;
    if (modalDesc) modalDesc.textContent = data.desc;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.cert-card');
      if (!card) return;

      const certData = {
        img: card.getAttribute('data-cert-img') || '',
        title: card.getAttribute('data-cert-title') || '',
        issuer: card.getAttribute('data-cert-issuer') || '',
        year: card.getAttribute('data-cert-year') || '',
        desc: card.getAttribute('data-cert-desc') || ''
      };

      openModal(certData);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.toggle('hidden');
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   6. CONTACT FORM & WHATSAPP LAUNCHER
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const roleInput = document.getElementById('contact-role');
    const msgInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : 'Rekan';
    const role = roleInput ? roleInput.value.trim() : 'Diskusi Proyek';
    const msg = msgInput ? msgInput.value.trim() : '';

    const text = encodeURIComponent(
      `Halo Moh Izza Romadlon,\n\nNama saya: ${name}\nPerihal: ${role}\n\nPesan:\n${msg}\n\n(Dikirim dari website portfolio mohizzaromadlon.dev)`
    );

    const whatsappUrl = `https://wa.me/6282132068499?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
