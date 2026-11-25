// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');

function setMenu(open) {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  if (hamburger) hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

if (hamburger && mobileMenu) {
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'mobile-menu');
  hamburger.addEventListener('click', () => setMenu(true));
}
if (closeMenu && mobileMenu) {
  closeMenu.setAttribute('aria-label', 'Close menu');
  closeMenu.addEventListener('click', () => setMenu(false));
}

if (mobileMenu) {
  // Close on backdrop click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) setMenu(false);
  });
  // Close after choosing a link (e.g. "#features" on the same page)
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// "Swipe to see more" hint on tables wider than the screen
const scrollTables = [...document.querySelectorAll('.overflow-x-auto')].filter(el => el.querySelector('table'));
scrollTables.forEach(wrap => {
  const hint = document.createElement('p');
  hint.className = 'table-scroll-hint';
  hint.setAttribute('aria-hidden', 'true');
  hint.textContent = 'Swipe to see more →';
  wrap.parentNode.insertBefore(hint, wrap);
  wrap._hint = hint;
  wrap._marginTop = getComputedStyle(wrap).marginTop;
  hint.style.maxWidth = getComputedStyle(wrap).maxWidth;
  wrap.addEventListener('scroll', () => {
    if (wrap.scrollLeft > 20) hint.classList.add('seen');
  }, { passive: true });
});
function updateTableHints() {
  scrollTables.forEach(wrap => {
    const show = wrap.scrollWidth > wrap.clientWidth + 2;
    wrap._hint.classList.toggle('show', show);
    // Move the table's top spacing above the hint so the hint sits right on the table
    wrap._hint.style.marginTop = show ? wrap._marginTop : '';
    wrap.style.marginTop = show ? '0px' : '';
  });
}
updateTableHints();
window.addEventListener('resize', updateTableHints);
window.addEventListener('load', updateTableHints);
