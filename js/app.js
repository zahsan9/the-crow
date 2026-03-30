/* ── Volume data (newest → oldest) ────────────────────────────────────────── */
const VOLUMES = [
  { title: 'Volume Eleven', year: '2026', comingSoon: true,  img: null },
  { title: 'Volume Ten',    year: '2025', comingSoon: false, img: 'assets/cover-v10.jpg', archivePage: 'volumes-html/volume-10.html' },
  { title: 'Volume Nine',   year: '2024', comingSoon: false, img: 'assets/cover-v9.jpg', archivePage: 'volumes-html/volume-9.html' },
  { title: 'Volume Eight',  year: '2023', comingSoon: false, img: 'assets/cover-v8.jpg', archivePage: 'volumes-html/volume-8.html' },
  { title: 'Volume Seven',  year: '2022', comingSoon: false, img: 'assets/cover-v7.jpg', archivePage: 'volumes-html/volume-7.html' },
  { title: 'Volume Six',    year: '2021', comingSoon: false, img: 'assets/cover-v6.jpg', archivePage: 'volumes-html/volume-6.html' },
  { title: 'Volume Five',   year: '2020', comingSoon: false, img: 'assets/cover-v5.jpg', archivePage: 'volumes-html/volume-5.html' },
  { title: 'Volume Four',   year: '2019', comingSoon: false, img: 'assets/cover-v4.jpg', archivePage: 'volumes-html/volume-4.html' },
  { title: 'Volume Three',  year: '2018', comingSoon: false, img: 'assets/cover-v3.jpg', archivePage: 'volumes-html/volume-3.html' },
  { title: 'Volume Two',    year: '2017', comingSoon: false, img: 'assets/cover-v2.jpg', archivePage: 'volumes-html/volume-2.html' },
  { title: 'Volume One',    year: '2016', comingSoon: false, img: 'assets/cover-v1.jpg', archivePage: 'volumes-html/volume-1.html' },
];

const N = VOLUMES.length;

/* ── Carousel state ──────────────────────────────────────────────────────── */
const _saved = parseInt(sessionStorage.getItem('carouselActive'), 10);
let active = (!isNaN(_saved) && _saved >= 0 && _saved < N) ? _saved : 1;
let isAnimating = false;

/*
  5 physical card elements. Each card tracks its current logical position
  in `pos[]`. Positions in order: far-left, left, center, right, far-right.

  On navigate(+1 / next):
    - The card at far-left is invisible → silently update its content,
      teleport it to far-right (off-screen), then shift all other cards
      one step left. CSS transitions animate the move.
  On navigate(-1 / prev): mirror of the above.
*/
const POS_ORDER = ['far-left', 'left', 'center', 'right', 'far-right'];
const cards = [0,1,2,3,4].map(i => document.getElementById('card' + i));

// pos[i] = current position string for cards[i]
let pos = [...POS_ORDER];

/* ── Fill one card slot with volume data ─────────────────────────────────── */
function fillCard(card, vol) {
  const cover   = card.querySelector('.vol-card__cover');
  const titleEl = card.querySelector('.vol-card__title');
  const yearEl  = card.querySelector('.vol-card__year');

  if (vol.comingSoon) {
    cover.innerHTML = '<div class="coming-soon"><p>Coming Soon</p><p>Volume Eleven</p></div>';
    cover.style.backgroundImage = '';
    cover.style.backgroundColor = '#43396d';
    card.dataset.comingSoon = 'true';
  } else {
    cover.innerHTML = '';
    cover.style.backgroundColor = '#43396d';
    cover.style.backgroundImage = vol.img ? `url('${vol.img}')` : '';
    delete card.dataset.comingSoon;
  }

  titleEl.textContent = vol.title;
  yearEl.textContent  = vol.year;
}

/* ── Initialise all 5 cards without triggering transitions ───────────────── */
function init() {
  // Disable transitions for the first paint
  cards.forEach(c => { c.style.transition = 'none'; });

  const offsets = [-2, -1, 0, 1, 2];
  cards.forEach((card, i) => {
    const volIdx = (active + offsets[i] + N) % N;
    fillCard(card, VOLUMES[volIdx]);
    card.dataset.pos = pos[i];
  });

  // Re-enable transitions after the browser has painted
  requestAnimationFrame(() => requestAnimationFrame(() => {
    cards.forEach(c => { c.style.transition = ''; });
  }));
}

/* ── Navigate: delta = +1 (older/right) or -1 (newer/left) ──────────────── */
const track = document.getElementById('carouselTrack');

function navigate(delta) {
  if (isAnimating) return;
  isAnimating = true;

  track.classList.add('navigating');

  const isNext     = delta > 0;
  const exitingPos = isNext ? 'far-left' : 'far-right';   // card leaving the stage
  const enteringPos = isNext ? 'far-right' : 'far-left';  // card entering the stage

  // 1. Find the DOM card currently at the exiting (invisible) position
  const exitIdx  = pos.indexOf(exitingPos);
  const exitCard = cards[exitIdx];

  // 2. Compute the new active and the volume that should enter
  const newActive      = (active + delta + N) % N;
  const enteringOffset = isNext ? 2 : -2;
  const enteringVolIdx = (newActive + enteringOffset + N) % N;

  // 3. Update the exiting card's content while it's invisible — no flicker
  fillCard(exitCard, VOLUMES[enteringVolIdx]);

  // 4. Teleport it to the entering side instantly (no animation)
  exitCard.style.transition = 'none';
  exitCard.dataset.pos = enteringPos;
  pos[exitIdx] = enteringPos;

  // 5. Force a reflow so the browser registers the position before re-enabling transitions
  void exitCard.offsetWidth;
  exitCard.style.transition = '';

  // 6. Update active index
  active = newActive;
  updateDots();

  // 7. Shift every other card one step in the direction of travel
  //    delta=+1 → each card moves one step toward 'far-left' (lower index)
  //    delta=-1 → each card moves one step toward 'far-right' (higher index)
  cards.forEach((card, i) => {
    if (i === exitIdx) return;  // already handled above
    const curPosIdx = POS_ORDER.indexOf(pos[i]);
    const newPosIdx = curPosIdx - delta;  // shift left for +1, right for -1
    pos[i] = POS_ORDER[newPosIdx];
    card.dataset.pos = pos[i];
  });

  // 8. Unlock after the CSS transition completes (0.48s + small buffer).
  //    Keep 'navigating' on the track until the mouse actually moves —
  //    CSS :hover re-evaluates when an element slides under a stationary
  //    cursor, so we can't safely remove the class on a timer alone.
  setTimeout(() => { isAnimating = false; }, 700);
}

// Lift the hover-suppression only once the mouse genuinely moves
document.addEventListener('mousemove', () => {
  track.classList.remove('navigating');
}, { passive: true });

/* ── Wire up controls ────────────────────────────────────────────────────── */
document.getElementById('btnPrev').addEventListener('click', () => navigate(-1));
document.getElementById('btnNext').addEventListener('click', () => navigate(+1));

// Clicking a side card navigates to it; clicking the center card opens its archive page
cards.forEach(card => {
  card.addEventListener('click', () => {
    const p = card.dataset.pos;
    if (p === 'left')  navigate(-1);
    if (p === 'right') navigate(+1);
    if (p === 'center' && VOLUMES[active].archivePage) {
      sessionStorage.setItem('carouselActive', active);
      window.location.href = VOLUMES[active].archivePage;
    }
  });
});

// Make :active work on iOS Safari (requires a touchstart listener on the element)
[document.getElementById('btnPrev'), document.getElementById('btnNext')].forEach(btn => {
  btn.addEventListener('touchstart', () => btn.classList.add('pressed'),    { passive: true });
  btn.addEventListener('touchend',   () => btn.classList.remove('pressed'), { passive: true });
  btn.addEventListener('touchcancel',() => btn.classList.remove('pressed'), { passive: true });
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'ArrowRight') navigate(+1);
});

// Clicking the nav logo resets the carousel to its default state
document.querySelector('.nav__logo').addEventListener('click', () => {
  sessionStorage.removeItem('carouselActive');
  jumpTo(1);
});

/* ── Editors ─────────────────────────────────────────────────────────────── */
const PERSON_ICON_BG     = 'assets/icon-person-bg.svg';
const PERSON_ICON_PERSON = 'assets/icon-person.svg';
const PERSON_ICON_VECTOR = 'assets/icon-person-vector.svg';

const EDITORS = [
  { name: 'Cecelia Negash (she/her)',              role: 'Undergraduate Education' },
  { name: 'Chuck Frickin-Bats (they/them)',         role: 'Graduate Community Health & Social Justice' },
  { name: 'Kaya Schubiger-Lewis (she/her)',         role: 'Undergraduate Health Studies & Arts' },
  { name: 'Layla Youssef (she/her)',                role: 'Graduate Museology' },
  { name: 'Morgan Fu-Mueller (he/they)',            role: 'Undergraduate Psychology' },
  { name: 'Newton (Newt) Austria-Ball (they/them)', role: 'Undergraduate Biology & Creative Writing' },
  { name: 'Rehema Hassani (she/her)',               role: 'Undergraduate Health Education & Promotion & Global Health' },
  { name: 'Sabine Drake (she/her)',                 role: 'Undergraduate Health Studies & Chemistry' },
];

const ADVISORS = [
  { name: 'Andrea Stone PhD.', role: 'Advisor' },
  { name: 'Erik Echols',       role: 'Just some guy, Advisor' },
];

function makeEditorCard(person) {
  const li = document.createElement('li');
  li.className = 'editor-card';
  li.innerHTML = `
    <div class="editor-card__avatar" aria-hidden="true">
      <img class="editor-card__avatar-bg"     src="${PERSON_ICON_BG}"     alt="">
      <div class="editor-card__avatar-person">
        <img class="editor-card__avatar-person-img" src="${PERSON_ICON_PERSON}" alt="">
        <img class="editor-card__avatar-vector"     src="${PERSON_ICON_VECTOR}" alt="">
      </div>
    </div>
    <p class="editor-card__name">${person.name}</p>
    <p class="editor-card__role">${person.role}</p>
  `;
  return li;
}

function buildEditors() {
  const grid = document.getElementById('editorsGrid');
  EDITORS.forEach(ed => grid.appendChild(makeEditorCard(ed)));

  const advisorsGrid = document.getElementById('advisorsGrid');
  ADVISORS.forEach(ad => advisorsGrid.appendChild(makeEditorCard(ad)));
}

/* ── Jump directly to any volume (used by dots) ──────────────────────────── */
function jumpTo(idx) {
  if (idx === active || isAnimating) return;

  const steps = Math.abs(idx - active);

  // Single step — use the normal carousel slide
  if (steps === 1) {
    navigate(idx > active ? 1 : -1);
    return;
  }

  // Multi-step — fade out, snap, fade in
  isAnimating = true;
  active = idx;
  updateDots();

  track.style.transition = 'opacity 0.18s ease';
  track.style.opacity = '0';

  setTimeout(() => {
    cards.forEach(c => { c.style.transition = 'none'; });
    pos = [...POS_ORDER];
    const offsets = [-2, -1, 0, 1, 2];
    cards.forEach((card, i) => {
      fillCard(card, VOLUMES[(active + offsets[i] + N) % N]);
      card.dataset.pos = pos[i];
    });

    requestAnimationFrame(() => requestAnimationFrame(() => {
      cards.forEach(c => { c.style.transition = ''; });
      track.style.transition = 'opacity 0.22s ease';
      track.style.opacity = '1';
      setTimeout(() => {
        isAnimating = false;
        track.style.transition = '';
      }, 220);
    }));
  }, 180);
}

/* ── Carousel dots ───────────────────────────────────────────────────────── */
const dotsContainer = document.getElementById('carouselDots');

function buildDots() {
  VOLUMES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Go to ${VOLUMES[i].title}`);
    dot.dataset.year = `V${N - i} · ${VOLUMES[i].year}`;
    dot.addEventListener('click', () => jumpTo(i));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
    dot.classList.toggle('carousel__dot--active', i === active);
  });
}

/* ── Boot ─────────────────────────────────────────────────────────────────── */
init();
buildEditors();
buildDots();
updateDots();

/* ── "View Volumes" CTA: center the archives section on mobile ───────────── */
const heroCta = document.querySelector('.hero__cta');
if (heroCta) {
  heroCta.addEventListener('click', e => {
    if (window.innerWidth > 768) return; // desktop uses default scrollIntoView
    e.preventDefault();
    e.stopImmediatePropagation(); // prevent transitions.js scrollIntoView handler
    const archives = document.getElementById('archives');
    if (!archives) return;
    const sectionCenter = archives.offsetTop + archives.offsetHeight / 2;
    const scrollTo = sectionCenter - window.innerHeight / 2;
    window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'smooth' });
  });
}

/* ── Instant-jump to #archives when returning from a volume page ─────────── */
if (location.hash === '#archives') {
  const archives = document.getElementById('archives');
  if (archives) {
    document.documentElement.style.scrollBehavior = 'auto';
    archives.scrollIntoView();
    document.documentElement.style.scrollBehavior = '';
  }
}
