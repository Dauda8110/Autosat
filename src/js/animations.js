const TESTIMONIALS = [
  {
    quote: "Buying my car from AUTOSAT was very easy and stress-free. The car was delivered straight to my house in Ikoyi with all genuine customs duty papers completely sorted.",
    name: "Dr. Oladipo Adeleke",
    location: "Ikoyi, Lagos",
    vehicle: "Bought: Ferrari Roma"
  },
  {
    quote: "Finding a clean Porsche GT3 Touring in Nigeria used to be difficult. AUTOSAT was transparent, honest about the car condition, and delivered it exactly as promised to Abuja.",
    name: "Engr. Farouk Al-Hassan",
    location: "Maitama, Abuja",
    vehicle: "Bought: Porsche 911 GT3 Touring"
  },
  {
    quote: "I visited their Lagos showroom in Victoria Island. They were friendly, respectful, and did not pressure me at all. The car is in brand new condition and runs great.",
    name: "Somtochukwu Nnamdi",
    location: "Banana Island, Lagos",
    vehicle: "Bought: Aston Martin DBS Superleggera"
  }
];

export function initAnimations() {
  initScrollReveals();
  initTestimonialCarousel();
  initMetricCounters();
}

function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

function initTestimonialCarousel() {
  const quoteEl = document.getElementById('testimonial-quote');
  const authorNameEl = document.getElementById('testimonial-name');
  const authorDetailEl = document.getElementById('testimonial-detail');
  const dotsContainer = document.getElementById('testimonial-dots');
  const stageEl = document.getElementById('testimonial-stage');
  if (!quoteEl || !dotsContainer) return;

  let currentIndex = 0;
  let timer = null;

  // Render dots
  dotsContainer.innerHTML = TESTIMONIALS.map((_, i) => `
    <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to review ${i + 1}"></button>
  `).join('');

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function showSlide(index) {
    currentIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    const item = TESTIMONIALS[currentIndex];

    // Smooth opacity fade only - height is locked so page NEVER jumps or shifts
    quoteEl.style.opacity = '0';
    authorNameEl.style.opacity = '0';
    authorDetailEl.style.opacity = '0';

    setTimeout(() => {
      quoteEl.textContent = `“${item.quote}”`;
      authorNameEl.textContent = item.name;
      authorDetailEl.textContent = `${item.location} • ${item.vehicle}`;

      quoteEl.style.transition = 'opacity 0.35s ease';
      authorNameEl.style.transition = 'opacity 0.35s ease';
      authorDetailEl.style.transition = 'opacity 0.35s ease';

      quoteEl.style.opacity = '1';
      authorNameEl.style.opacity = '1';
      authorDetailEl.style.opacity = '1';
    }, 200);

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      showSlide(idx);
      resetAutoPlay();
    });
  });

  function startAutoPlay() {
    timer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 6000);
  }

  function resetAutoPlay() {
    if (timer) clearInterval(timer);
    startAutoPlay();
  }

  startAutoPlay();
}

function initMetricCounters() {
  const metrics = document.querySelectorAll('.metric-number[data-target]');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function updateNumber(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(ease * target);
          el.textContent = `${prefix}${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateNumber);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  metrics.forEach(el => observer.observe(el));
}
