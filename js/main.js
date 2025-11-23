// main.js
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  const y = new Date().getFullYear();
  const yearEls = document.querySelectorAll('#year, #year2, #year3');
  yearEls.forEach(el => { if (el) el.textContent = y; });

  // Mobile nav toggle
  const mobileBtn = document.getElementById('mobileToggle');
  const navList = document.querySelector('.nav-list');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }

  // Theme toggle (dark/light)
  const themeBtn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') root.classList.add('light');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      root.classList.toggle('light');
      if (root.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = '🌙';
      }
    });
    // set initial icon
    themeBtn.textContent = root.classList.contains('light') ? '☀️' : '🌙';
  }

  // Sticky header small elevation toggle (add class when scrolled)
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Reveal on scroll for elements with .fade-in
  const fadeEls = document.querySelectorAll('.fade-in, .skill-card, .project-card, .photo-frame, .about-text');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => revealObserver.observe(el));

  // Simple contact form handling (replace with actual backend)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // basic validation
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }
      // here you would send via fetch to your backend or EmailJS
      alert('Message sent (demo). Thank you, ' + name + '!');
      form.reset();
    });
  }
});
