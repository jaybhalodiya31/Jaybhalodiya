// Initialize Lucide
lucide.createIcons();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0, ease: 'none' });
  gsap.to(follower, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.15 });
});

const links = document.querySelectorAll('a, button, .project-card');
links.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    gsap.to(follower, { scale: 2, background: 'rgba(255,255,255,0.1)', border: 'none' });
  });

  link.addEventListener('mouseleave', () => {
    gsap.to(follower, { scale: 1, background: 'none', border: '1px solid rgba(255,255,255,0.3)' });
  });
});

// Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Smooth scroll on link click
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      const offset = window.innerWidth > 768 ? 100 : 80;
      lenis.scrollTo(target, {
        offset: -offset,
        duration: 1.5
      });
    }
  });
});

// Nav Scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal
const tl = gsap.timeline();
tl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 1 })
  .from('.hero-title', { y: 40, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=0.8')
  .from('.hero-tagline', { y: 20, opacity: 0, duration: 1 }, '-=0.8')
  .from('.hero-ctas', { y: 20, opacity: 0, duration: 1 }, '-=0.8');

// Section Reveals
const reveals = document.querySelectorAll('section:not(.hero)');
reveals.forEach((sec) => {
  gsap.from(sec.querySelector('.container'), {
    scrollTrigger: {
      trigger: sec,
      start: 'top 80%'
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });
});

// Project Cards Reveal - Individual Trigger for better reliability
gsap.utils.toArray('.project-card').forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// Mobile Menu Toggle
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

const toggleMenu = (state) => {
  mobileMenu.classList.toggle('active', state);
  document.body.style.overflow = state ? 'hidden' : '';
};

menuOpen.addEventListener('click', () => toggleMenu(true));
menuClose.addEventListener('click', () => toggleMenu(false));

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => toggleMenu(false));
});
