/* ── Nav shadow on scroll ──────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 0);
}, { passive: true });

/* ── Publication search ────────────────────────────────────────────────────── */
const searchInput  = document.getElementById('pubSearch');
const pubGrid      = document.getElementById('pubGrid');
const noResults    = document.getElementById('pubNoResults');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  const cards = pubGrid.querySelectorAll('.pub-card');
  let visible = 0;

  cards.forEach(card => {
    const match = card.textContent.toLowerCase().includes(query);
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  noResults.hidden = visible > 0;
});
