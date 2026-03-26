/* ── FAQ Accordion ──────────────────────────────────────────────────────── */
document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item   = trigger.closest('.faq-item');
    const body   = item.querySelector('.faq-item__body');
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // Close all other open items
    document.querySelectorAll('.faq-item--open').forEach(openItem => {
      if (openItem === item) return;
      const otherTrigger = openItem.querySelector('.faq-item__trigger');
      const otherBody    = openItem.querySelector('.faq-item__body');
      otherTrigger.setAttribute('aria-expanded', 'false');
      otherBody.style.maxHeight = '0';
      openItem.classList.remove('faq-item--open');
    });

    if (isOpen) {
      trigger.setAttribute('aria-expanded', 'false');
      body.style.maxHeight = '0';
      item.classList.remove('faq-item--open');
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 'px';
      item.classList.add('faq-item--open');
    }
  });
});

/* ── Nav shadow on scroll ───────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 0);
}, { passive: true });
