/* ── Nav shadow on scroll ──────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 0);
}, { passive: true });

/* ── Publication search + filter ───────────────────────────────────────────── */
const searchInput = document.getElementById('pubSearch');
const clearBtn    = document.getElementById('pubSearchClear');
const countEl     = document.getElementById('pubCount');
const pubGrid     = document.getElementById('pubGrid');
const filterBtns  = document.querySelectorAll('.filter-pill');

let activeFilter = 'all';

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const cards  = pubGrid.querySelectorAll('.pub-card');
  let visible = 0;
  let filterTotal = 0;

  cards.forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.subject.split(' ').includes(activeFilter);
    if (matchesFilter) filterTotal++;
    const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
    const show = matchesFilter && matchesSearch;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  // Result count
  if (visible === 0) {
    countEl.textContent = 'No publications match your search.';
    countEl.dataset.empty = 'true';
  } else if (!query) {
    countEl.textContent = `${visible} publication${visible !== 1 ? 's' : ''}`;
    delete countEl.dataset.empty;
  } else {
    countEl.textContent = `Showing ${visible} of ${filterTotal} publication${filterTotal !== 1 ? 's' : ''}`;
    delete countEl.dataset.empty;
  }

  // Clear button visibility
  clearBtn.hidden = !query;
}

function clearSearch() {
  searchInput.value = '';
  searchInput.focus();
  applyFilters();
}

searchInput.addEventListener('input', applyFilters);
clearBtn.addEventListener('click', clearSearch);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && searchInput.value) {
    clearSearch();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

// Initialise count on page load
applyFilters();

/* ── Mark unlinked papers ───────────────────────────────────────────────────── */
document.querySelectorAll('a.pub-card__title[href="#"]').forEach(link => {
  link.removeAttribute('href');
  link.setAttribute('role', 'heading');
  link.setAttribute('aria-level', '3');
  link.closest('.pub-card').classList.add('pub-card--pdf-only');
  const note = document.createElement('p');
  note.className = 'pub-card__pdf-note';
  note.textContent = 'Full text available in PDF download.';
  link.insertAdjacentElement('afterend', note);
});
