/* A Cup of Cafe — page interactions
   Covers: scroll progress bar, mobile menu open/close, and highlighting the
   current section's nav link while scrolling. No custom cursor here on
   purpose — the site uses the normal system cursor. */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Custom cursor (ring + dot follow the mouse) ---------- */
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');
  const isTouchDevice = window.matchMedia('(max-width: 768px)').matches;

  if (cursorDot && cursorRing && !isTouchDevice) {
    // The ring trails slightly behind the dot for a softer feel.
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Grow the ring over anything clickable
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover-active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-active'));
    });
  }

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.querySelector('.progress-bar');

  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = percent + '%';
  }

  window.addEventListener('scroll', updateProgressBar, { passive: true });
  updateProgressBar();

  /* ---------- Mobile menu toggle ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      navLinks.classList.toggle('is-open');
    });

    // Close the mobile menu after tapping a link
    navLinks.querySelectorAll('.nav-item').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* ---------- Highlight the current section in the nav ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function setActiveNav(id) {
    navItems.forEach((item) => {
      const isMatch = item.getAttribute('href') === `#${id}`;
      item.classList.toggle('active', isMatch);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

});
