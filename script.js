gsap.registerPlugin(ScrollTrigger);
// CUSTOM CURSOR
const cursorDot = document.querySelector(".custom-cursor-dot");
const cursorOutline = document.querySelector(".custom-cursor-outline");
if (window.innerWidth > 768) {
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    gsap.to(cursorDot, { x: posX, y: posY, duration: 0 });
    gsap.to(cursorOutline, { x: posX, y: posY, duration: 0.15, ease: "power2.out" });
  });
  const interactiveTargets = document.querySelectorAll(".nav-item, .nav-brand, .story-item, .story-item img, .author-credit");
  interactiveTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => cursorOutline.classList.add("hover-active"));
    target.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover-active"));
  });
}
// MOBILE NAVIGATION
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-item");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("is-active");
  navLinks.classList.toggle("is-open");
});
navItems.forEach(item => {
  item.addEventListener("click", () => {
    menuToggle.classList.remove("is-active");
    navLinks.classList.remove("is-open");
  });
});
// READING PROGRESS BAR
gsap.to(".progress-bar", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});
// HERO ENTRANCE
const heroTimeline = gsap.timeline();
heroTimeline
  .from(".hero-sub", { opacity: 0, y: -20, duration: 1, ease: "power2.out" })
  .from(".hero h1", { opacity: 0, y: 40, duration: 1.2, ease: "power3.out" }, "-=0.6")
  .from(".hero-tagline", { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, "-=0.5");
// SCROLL REVEALS
gsap.utils.toArray(".panel:not(.hero)").forEach((panel) => {
  const elements = panel.querySelectorAll(".eyebrow, h2, h3, p, .story-grid, .about-image-wrap, .epilogue-left, .epilogue-right, .follow-label, .author-credit");
  gsap.from(elements, {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 1.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: panel,
      start: "top 75%",
      end: "top 25%",
      toggleActions: "play none none reverse"
    }
  });
});
// STORY ITEM STAGGER (INDIVIDUAL CARDS)
gsap.utils.toArray(".story-item").forEach((item, i) => {
  gsap.from(item, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: i * 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});
