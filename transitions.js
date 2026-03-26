/* ── Page transitions ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');
});

// Smooth scroll hash links without writing the hash to the URL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('mailto') ||
    link.target === '_blank'
  ) return;

  link.addEventListener('click', e => {
    e.preventDefault();
    if (link.classList.contains('nav__logo')) sessionStorage.removeItem('carouselActive');
    document.body.classList.remove('page-loaded');
    setTimeout(() => { window.location.href = href; }, 280);
  });
});
