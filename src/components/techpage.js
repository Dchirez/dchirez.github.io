/* Tech page — full-screen "arrival" view reached from the galaxy through the
   hyperspace jump: the projects built with one technology. Always dark (it is
   deep space), uses the history so the phone's back button returns to the galaxy. */
import { PORTFOLIO } from '../data.js';
import { Ic, DEV_BASE, STACK_ICON } from '../ui.js';
import { projectCardHTML, openProjectModal } from './projects.js';

// Which projects belong to a tech of the galaxy. Techs absent from p.techs
// are matched on the project's stack description.
const text = (p) => `${p.techDisplay} ${p.detailsFr}`;
const MATCH = {
  html5: (p) => p.techs.includes('web'),
  css3: (p) => p.techs.includes('web'),
  javascript: (p) => /JavaScript|React/.test(p.techDisplay),
  tailwindcss: (p) => /Tailwind/.test(text(p)),
  flask: (p) => /Flask/.test(text(p)),
  gradle: (p) => /Gradle/.test(text(p)),
  git: (p) => !!p.github,
};
export const projectsFor = (tech) =>
  PORTFOLIO.projects.filter((p) => p.techs.includes(tech) || MATCH[tech]?.(p));

let current = null; // { el, onKey }

export function openTechPage(item, lang, t, { onClose } = {}) {
  closeTechPage(true);
  const list = projectsFor(item.tech);
  const count = `${list.length} ${list.length > 1 ? t.techProjects : t.techProject}`;
  const el = document.createElement('div');
  el.className = 'techpage dark';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', item.label);
  el.innerHTML = `
    <div class="techpage-stars" aria-hidden="true"></div>
    <div class="container techpage-inner">
      <button class="btn btn-secondary btn-sm techpage-back" data-techpage-close>
        <span class="btn-i">${Ic.arrowLeft()}</span>${t.techBack}
      </button>
      <header class="techpage-head">
        <span class="techpage-icon"><img src="${DEV_BASE + (STACK_ICON[item.tech] || STACK_ICON.html5)}" alt="" width="64" height="64"></span>
        <div>
          <span class="eyebrow">${Ic.sparkle()} ${t.techEyebrow}</span>
          <h2 class="h-section">${item.label}</h2>
          <p class="techpage-count">${count}</p>
        </div>
      </header>
      ${list.length
        ? `<div class="proj-grid">${list.map((p) => projectCardHTML(p, lang, t)).join('')}</div>`
        : `<p class="proj-empty">// ${t.techEmpty}</p>`}
    </div>`;
  document.body.appendChild(el);
  document.body.style.overflow = 'hidden';

  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-techpage-close]')) { history.state?.pfTech ? history.back() : closeTechPage(); return; }
    const card = e.target.closest('[data-open]');
    if (card) openProjectModal(card.dataset.open, lang, t);
  });
  const onKey = (e) => { if (e.key === 'Escape') (history.state?.pfTech ? history.back() : closeTechPage()); };
  window.addEventListener('keydown', onKey);
  current = { el, onKey, onClose };

  if (!history.state?.pfTech) history.pushState({ pfTech: item.tech }, '');
  el.querySelector('[data-techpage-close]').focus({ preventScroll: true });
}

export function closeTechPage(instant = false) {
  if (!current) return;
  const { el, onKey, onClose } = current;
  current = null;
  window.removeEventListener('keydown', onKey);
  document.body.style.overflow = '';
  onClose?.();
  if (instant) { el.remove(); return; }
  el.classList.add('is-leaving');
  setTimeout(() => el.remove(), 320);
}

// A reload keeps history.state: drop a stale marker so close never leaves the site
if (history.state?.pfTech) history.replaceState(null, '');
// Back button / swipe back closes the page
window.addEventListener('popstate', () => { if (current && !history.state?.pfTech) closeTechPage(); });
