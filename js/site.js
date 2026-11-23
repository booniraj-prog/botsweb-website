// BotsWeb Solutions: small progressive enhancements. Every page works with this file switched off.

// 1. One reveal on scroll (content stays visible without script or under reduced motion).
(() => {
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || !items.length) { items.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
})();

// 2. Services switcher: tabs move with arrow keys; without script every panel shows in order.
document.querySelectorAll('[data-switch]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  const select = (i, focus) => {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    if (focus) tabs[i].focus();
    history.replaceState(null, '', '#' + panels[i].id);
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i, false));
    t.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) { e.preventDefault(); select((i + keys[e.key] + tabs.length) % tabs.length, true); }
      if (e.key === 'Home') { e.preventDefault(); select(0, true); }
      if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1, true); }
    });
  });
  const fromHash = () => panels.findIndex((p) => '#' + p.id === location.hash);
  select(fromHash() >= 0 ? fromHash() : 0, false);
  window.addEventListener('hashchange', () => {
    const i = fromHash();
    if (i >= 0) { select(i, false); root.scrollIntoView({ block: 'start' }); }
  });
});

// 3. Forms. Set data-endpoint="https://..." on a form to make it send; until then it says plainly that nothing was sent.
document.querySelectorAll('form[data-endpoint]').forEach((form) => {
  const help = form.querySelector('[aria-live]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input[required], textarea[required], input[type="email"]')];
    let firstBad = null;
    fields.forEach((f) => {
      const ok = f.checkValidity();
      f.toggleAttribute('aria-invalid', !ok);
      if (!ok && !firstBad) firstBad = f;
    });
    if (firstBad) {
      help.textContent = firstBad.type === 'email'
        ? 'That email looks incomplete. Write it as name@company.com.'
        : 'Please fill in ' + (firstBad.dataset.name || 'the required fields') + '.';
      firstBad.focus();
      return;
    }
    if (!form.dataset.endpoint) { help.textContent = 'Nothing was sent: this form is not connected yet.'; return; }
    const btn = form.querySelector('[type="submit"]');
    btn.setAttribute('aria-busy', 'true');
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then((r) => { help.textContent = r.ok ? 'Thank you. Our team will be in touch shortly.' : 'That did not go through. Please try again in a minute.'; if (r.ok) form.reset(); })
      .catch(() => { help.textContent = 'That did not go through. Please try again in a minute.'; })
      .finally(() => btn.removeAttribute('aria-busy'));
  });
});

// 4. Contact: picking a goal fills in "Service of interest".
(() => {
  const select = document.getElementById('service');
  if (!select) return;
  document.querySelectorAll('input[name="goal"]').forEach((r) => {
    r.addEventListener('change', () => { if (r.checked) select.value = r.dataset.service; });
  });
})();

// 5. Floating WhatsApp button. Put the WhatsApp Business number here: digits only, with country code, no + or spaces (e.g. "919876543210").
const WHATSAPP_NUMBER = '919945788558';
const WHATSAPP_MESSAGE = 'Hello BotsWeb Solutions, I would like to discuss my business marketing requirements.';
document.querySelectorAll('[data-whatsapp]').forEach((a) => {
  if (!WHATSAPP_NUMBER) return; // until a number is set, the button opens the contact form instead
  a.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
  a.target = '_blank';
  a.rel = 'noopener';
});
// On the home page, keep the WhatsApp button out of the way while the hero's own buttons are on screen.
(() => {
  const wa = document.querySelector('.wa-float');
  const heroActions = document.querySelector('.hero-card__actions');
  if (!wa || !heroActions || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([e]) => wa.classList.toggle('is-tucked', e.isIntersecting)).observe(heroActions);
})();
