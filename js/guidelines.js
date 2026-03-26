/* ── Guidelines dropdown ───────────────────────────────────────────────────── */
const toggle   = document.getElementById('glToggle');
const list     = document.getElementById('glList');
const selected = document.getElementById('glSelected');
const dropdown = document.getElementById('glDropdown');

const ALL_TYPES = ['default', 'abstract', 'argumentative', 'editorial', 'literary', 'paper', 'proposal', 'literature', 'wip'];

const PAPER_MAP = {
  default:       'gpDefault',
  abstract:      'gpAbstract',
  argumentative: 'gpArgumentative',
  editorial:     'gpEditorial',
  literary:      'gpLiterary',
  paper:         'gpPaper',
  proposal:      'gpProposal',
  literature:    'gpLiterature',
  wip:           'gpWip',
};

const CRITERIA_MAP = {
  default:       'gcDefault',
  abstract:      'gcAbstract',
  argumentative: 'gcArgumentative',
  editorial:     'gcEditorial',
  literary:      'gcLiterary',
  paper:         'gcPaper',
  proposal:      'gcProposal',
  literature:    'gcLiterature',
  wip:           'gcWip',
};

const LABELS = {
  default:       'Overview',
  abstract:      'Research abstract',
  argumentative: 'Researched argumentative essay',
  editorial:     'Research editorial',
  literary:      'Researched literary analysis',
  paper:         'Research paper',
  proposal:      'Research proposal',
  literature:    'Literature review',
  wip:           'Work in progress',
};

function openDropdown() {
  list.removeAttribute('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  dropdown.classList.add('gl-dropdown--open');
}

function closeDropdown() {
  list.setAttribute('hidden', '');
  toggle.setAttribute('aria-expanded', 'false');
  dropdown.classList.remove('gl-dropdown--open');
}

const paperContent = document.getElementById('glPaperContent');
const criteriaWrap = document.getElementById('glCriteria');

function selectType(type) {
  // Fade out
  paperContent.classList.add('is-switching');
  criteriaWrap.classList.add('is-switching');

  setTimeout(() => {
    // Swap content at lowest opacity point
    selected.textContent = LABELS[type];

    ALL_TYPES.forEach(t => {
      document.getElementById(PAPER_MAP[t]).hidden    = (t !== type);
      document.getElementById(CRITERIA_MAP[t]).hidden = (t !== type);
    });

    list.querySelectorAll('.gl-dropdown__item').forEach(i => {
      i.classList.toggle('gl-dropdown__item--active', i.dataset.type === type);
    });

    // Fade back in
    paperContent.classList.remove('is-switching');
    criteriaWrap.classList.remove('is-switching');
  }, 160);
}

toggle.addEventListener('click', () => {
  list.hasAttribute('hidden') ? openDropdown() : closeDropdown();
});

document.addEventListener('click', e => {
  if (!dropdown.contains(e.target)) closeDropdown();
});

list.querySelectorAll('.gl-dropdown__item').forEach(item => {
  item.addEventListener('click', () => {
    selectType(item.dataset.type);
    closeDropdown();
  });
});

