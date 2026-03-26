/* ── Bio dropdown smooth open/close ─────────────────────────────────────────── */
document.querySelectorAll('.bio-dropdown').forEach(details => {
  const summary = details.querySelector('summary');

  summary.addEventListener('click', e => {
    e.preventDefault();

    const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const dur  = 260;

    if (details.open) {
      // — Close —
      const from = details.offsetHeight;
      const to   = summary.offsetHeight;
      details.style.overflow = 'hidden';
      const anim = details.animate(
        [{ height: from + 'px' }, { height: to + 'px' }],
        { duration: dur, easing: ease }
      );
      anim.onfinish = () => {
        details.removeAttribute('open');
        details.style.height   = '';
        details.style.overflow = '';
      };
    } else {
      // — Open —
      details.setAttribute('open', '');
      const to = details.scrollHeight;
      details.style.overflow = 'hidden';
      details.style.height   = summary.offsetHeight + 'px';
      const anim = details.animate(
        [{ height: summary.offsetHeight + 'px' }, { height: to + 'px' }],
        { duration: dur, easing: ease }
      );
      anim.onfinish = () => {
        details.style.height   = '';
        details.style.overflow = '';
      };
    }
  });
});

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
