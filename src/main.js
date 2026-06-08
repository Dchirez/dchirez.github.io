/* App entry — composes the single-page Éditorial portfolio in vanilla JS.
   Handles language, theme, the tech globes, projects interactivity,
   the contact form (Formspree) and the scroll-progress bar. */
import './styles/styles.css';
import { PORTFOLIO } from './data.js';
import { STR } from './i18n.js';
import { Ic } from './ui.js';
import { mountGlobe } from './components/globe.js';
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

  // Mount the tech globes (hero 400, skills 420)
  app.querySelectorAll('[data-globe]').forEach((host) => {
    const size = Number(host.dataset.globe);
    globeCleanups.push(mountGlobe(host, { items: PORTFOLIO.stack, size }));
  });

  initProjects(app, t, lang);
  wireNav();
  wireContactForm(t);
  updateProgress();
}

function wireNav() {
  const langBtn = app.querySelector('[data-action="lang"]');
  const themeBtn = app.querySelector('[data-action="theme"]');
  langBtn?.addEventListener('click', () => {
    state.lang = state.lang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('pf-lang', state.lang);
    render();
  });
  themeBtn?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    themeBtn.innerHTML = state.theme === 'dark' ? Ic.sun() : Ic.moon();
  });
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
