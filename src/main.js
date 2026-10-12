/* App entry — composes the single-page Éditorial portfolio in vanilla JS.
   Handles language, the starfield, the tech galaxy, projects interactivity,
   the contact form (Formspree) and the scroll-progress bar.
   Styles are linked from index.html (no build step required). */
import { PORTFOLIO } from './data.js';
import { STR } from './i18n.js';
import { mountGalaxy } from './components/galaxy.js';
import { hyperspace } from './components/hyperspace.js';
import { openTechPage } from './components/techpage.js';
import { mountCursor } from './components/cursor.js';
import { mountStarfield } from './components/starfield.js';
import { initProjects, projectsSectionHTML } from './components/projects.js';
import {
  navHTML, heroHTML, skillsHTML, flagshipHTML,
  gamesHTML, formationsHTML, contactHTML, footerHTML,
} from './components/sections.js';

const app = document.getElementById('root');

const state = {
  lang: localStorage.getItem('pf-lang') || 'fr',
};

let galaxyCleanups = [];


function teardownGalaxy() {
  galaxyCleanups.forEach((fn) => fn());
  galaxyCleanups = [];
}

// Mount the tech galaxy — sized to its column, clicking a tech jumps to its projects
let galaxyWidth = 0;
function galaxyWidthFor(host) {
  return Math.max(260, Math.min(host.clientWidth || 1100, window.innerWidth - 24));
}
function mountGalaxies() {
  teardownGalaxy();
  app.querySelectorAll('[data-galaxy]').forEach((host) => {
    const width = galaxyWidth = galaxyWidthFor(host);
    galaxyCleanups.push(mountGalaxy(host, {
      items: PORTFOLIO.stack, width,
      height: Math.round(width < 700 ? width * 0.85 : Math.min(620, width * 0.52)),
      iconSize: width < 380 ? 34 : width < 900 ? 42 : 48,
      onSelect: (item, from) => hyperspace({
        from,
        onPeak: () => openTechPage(item, state.lang, STR[state.lang], {
          onClose: () => host.querySelector('.galaxy')?.dispatchEvent(new Event('galaxy:reset')),
        }),
      }),
    }));
  });
}

function render() {
  const t = STR[state.lang];
  const lang = state.lang;
  document.documentElement.lang = lang;

  teardownGalaxy();
  app.innerHTML = `
    <div class="kit dir-editorial">
      <div class="scroll-prog" data-progress></div>
      ${navHTML(t, lang)}
      ${heroHTML(t, lang)}
      ${skillsHTML(t)}
      ${flagshipHTML(t, lang)}
      ${projectsSectionHTML(t, lang)}
      ${gamesHTML(t)}
      ${formationsHTML(t, lang)}
      ${contactHTML(t)}
      ${footerHTML(t)}
    </div>`;

  mountGalaxies();

  initProjects(app, t, lang);
  wireNav();
  wireContactForm(t);
  updateProgress();
}

function wireNav() {
  const langBtns = app.querySelectorAll('[data-action="lang"]');
  const menuBtn = app.querySelector('[data-action="menu"]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  const overlay = document.querySelector('[data-mobile-overlay]');
  const closeBtn = app.querySelector('[data-action="close-drawer"]');

  function openDrawer() {
    drawer?.classList.add('is-open');
    overlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  menuBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Close drawer when clicking any drawer link
  app.querySelectorAll('[data-drawer-link]').forEach((link) =>
    link.addEventListener('click', closeDrawer));
  // Close drawer CTA links too
  drawer?.querySelectorAll('.drawer-cta a').forEach((link) =>
    link.addEventListener('click', closeDrawer));

  langBtns.forEach((btn) => btn.addEventListener('click', () => {
    closeDrawer();
    state.lang = state.lang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('pf-lang', state.lang);
    render();
  }));
}

function wireContactForm(t) {
  const form = app.querySelector('[data-contact-form]');
  const sent = app.querySelector('[data-contact-sent]');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    } catch (_) { /* show confirmation regardless — graceful offline fallback */ }
    form.hidden = true;
    sent.hidden = false;
  });
}

function updateProgress() {
  const bar = app.querySelector('[data-progress]');
  if (!bar) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
// Re-size the galaxy when its column changes width (rotation, window resize)
let galaxyResize = 0;
window.addEventListener('resize', () => {
  clearTimeout(galaxyResize);
  galaxyResize = setTimeout(() => {
    const host = app.querySelector('[data-galaxy]');
    if (host && Math.abs(galaxyWidthFor(host) - galaxyWidth) > 8) mountGalaxies();
  }, 200);
});

// Dark only: the night sky shows behind every section
document.documentElement.classList.add('dark');
mountStarfield();
render();
mountCursor();
