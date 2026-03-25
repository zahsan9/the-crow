/* ── Nav shadow on scroll ──────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 0);
}, { passive: true });

/* ── Publication search ────────────────────────────────────────────────────── */
const searchInput = document.getElementById('pubSearch');
const pubGrid     = document.getElementById('pubGrid');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  const cards = pubGrid.querySelectorAll('.pub-card');

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
});
