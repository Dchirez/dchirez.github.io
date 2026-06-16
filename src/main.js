/* App entry — composes the single-page Éditorial portfolio in vanilla JS.
   Handles language, theme, the tech globes, projects interactivity,
   the contact form (Formspree) and the scroll-progress bar.
   Styles are linked from index.html (no build step required). */
import { PORTFOLIO } from './data.js';
import { STR } from './i18n.js';
import { Ic } from './ui.js';
import { mountGlobe } from './components/globe.js';
import { mountCursor } from './components/cursor.js';
import { initProjects, projectsSectionHTML } from './components/projects.js';
import {
  navHTML, heroHTML, skillsHTML, flagshipHTML,
  formationsHTML, contactHTML, footerHTML,
} from './components/sections.js';

const app = document.getElementById('root');

const state = {
  lang: localStorage.getItem('pf-lang') || 'fr',
  theme: localStorage.getItem('pf-theme') || 'light',
};

let globeCleanups = [];

function applyTheme() {
  document.documentElement.classList.toggle('dark', state.theme === 'dark');
  localStorage.setItem('pf-theme', state.theme);
}

function teardownGlobes() {
  globeCleanups.forEach((fn) => fn());
  globeCleanups = [];
}

function render() {
  const t = STR[state.lang];
  const lang = state.lang;
  document.documentElement.lang = lang;

  teardownGlobes();
  app.innerHTML = `
    <div class="kit dir-editorial">
      <div class="scroll-prog" data-progress></div>
      ${navHTML(t, lang, state.theme)}
      ${heroHTML(t, lang)}
      ${skillsHTML(t)}
      ${flagshipHTML(t, lang)}
      ${projectsSectionHTML(t, lang)}
      ${formationsHTML(t, lang)}
      ${contactHTML(t)}
      ${footerHTML(t)}
    </div>`;

  // Mount the tech globes (hero 400, skills 420) — responsive sizing
  app.querySelectorAll('[data-globe]').forEach((host) => {
    const baseSize = Number(host.dataset.globe);
    const vw = window.innerWidth;
    const scale = vw <= 400 ? 0.55 : vw <= 600 ? 0.65 : vw <= 860 ? 0.8 : 1;
    const size = Math.round(baseSize * scale);
    globeCleanups.push(mountGlobe(host, { items: PORTFOLIO.stack, size }));
  });

  initProjects(app, t, lang);
  wireNav();
  wireContactForm(t);
  updateProgress();
}

function wireNav() {
  const langBtns = app.querySelectorAll('[data-action="lang"]');
  const themeBtns = app.querySelectorAll('[data-action="theme"]');
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
  themeBtns.forEach((btn) => btn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    // Update all theme button icons
    app.querySelectorAll('[data-action="theme"]').forEach((b) => {
      b.innerHTML = state.theme === 'dark' ? Ic.sun() : Ic.moon();
    });
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

applyTheme();
render();
mountCursor();
