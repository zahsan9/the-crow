/* ── Submit modal ─────────────────────────────────────────────────────────── */
const FORM_URL = 'https://forms.office.com/pages/responsepage.aspx?id=W9229i_wGkSZoBYqxQYL0rcGpEWBG3VChkqNQdZDg4xURFpORVUzVzdUM1RTSVhPS0hNTVY1RlhYUC4u&route=shorturl';

/* ── Inject HTML ─────────────────────────────────────────────────────────── */
const modalHTML = `
<div class="submit-modal-overlay" id="submitModalOverlay" aria-modal="true" role="dialog" aria-labelledby="submitModalTitle">
  <div class="submit-modal">
    <h2 class="submit-modal__title" id="submitModalTitle">Before you submit!</h2>
    <p class="submit-modal__intro">Please review these reminders before continuing to the submission form.</p>
    <ul class="submit-modal__list">
      <li>
        <span class="submit-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
        <span>You must be a <strong>current UW Bothell student.</strong> All listed authors must also be UWB students.</span>
      </li>
      <li>
        <span class="submit-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
        <span>All submitted work must be <strong>your own writing.</strong> AI-generated content will be flagged and returned for revision.</span>
      </li>
      <li>
        <span class="submit-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
        <span>Make sure your work fits one of our <strong>accepted submission types.</strong> See the <a href="guidelines.html">Guidelines page</a> for details.</span>
      </li>
      <li>
        <span class="submit-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
        <span>Have questions? Reach out at <a href="mailto:publish@uw.edu">publish@uw.edu</a> before submitting.</span>
      </li>
    </ul>
    <div class="submit-modal__actions">
      <button class="submit-modal__cancel" id="submitModalCancel">Cancel</button>
      <a class="submit-modal__proceed" href="${FORM_URL}" target="_blank" rel="noreferrer" id="submitModalProceed">
        Continue to form
        <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalHTML);

const overlay  = document.getElementById('submitModalOverlay');
const cancelBtn = document.getElementById('submitModalCancel');

function openModal() {
  overlay.classList.add('submit-modal-overlay--open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('submit-modal-overlay--open');
  document.body.style.overflow = '';
}

/* Wire all submit buttons */
document.querySelectorAll('.nav__submit').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });
});

cancelBtn.addEventListener('click', closeModal);

/* Close on overlay click (outside modal box) */
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* Close modal then let page transition handle navigation for internal links */
overlay.querySelectorAll('a[href]:not([target="_blank"])').forEach(link => {
  link.addEventListener('click', () => closeModal());
});
