// scroll.js
// Smooth scroll with offset to account for sticky header and mobile nav
(function () {
  const OFFSET = 80; // header height
  const links = Array.from(document.querySelectorAll('a[href^="#"]'));

  function scrollToHash(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href.startsWith('#')) return;
      e.preventDefault();
      scrollToHash(href);
      // close mobile nav if open
      const navList = document.querySelector('.nav-list');
      if (navList && navList.classList.contains('open')) navList.classList.remove('open');
    });
  });

  // On load, if url has hash, scroll to it
  window.addEventListener('load', () => {
    if (location.hash) {
      setTimeout(() => scrollToHash(location.hash), 50);
    }
  });

  // Active link on scroll using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (link) {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, { rootMargin: '-40% 0% -40% 0%', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();
