/* ── Page transitions ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');
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
    document.body.classList.remove('page-loaded');
    setTimeout(() => { window.location.href = href; }, 280);
  });
});
