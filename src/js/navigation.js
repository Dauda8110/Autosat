export function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  // Header scroll detection
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !drawer?.classList.contains('open');
    if (isOpen) {
      drawer?.classList.add('open');
      backdrop?.classList.add('open');
      toggle?.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      drawer?.classList.remove('open');
      backdrop?.classList.remove('open');
      toggle?.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  toggle?.addEventListener('click', () => toggleMenu());
  backdrop?.addEventListener('click', () => toggleMenu(false));

  // Close mobile drawer on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  const spyScroll = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        targetNav?.classList.add('active');
      } else {
        targetNav?.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', spyScroll, { passive: true });
}
