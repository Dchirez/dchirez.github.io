/* Projects section: 3D coverflow + context/tech filters + grid + detail modal.
   Ported from projects.jsx to vanilla DOM. */
import { PORTFOLIO, LOGO } from '../data.js';
import { Ic, Badge, Button, TechBadge, DEV_BASE, TECH_ICON, TECH_NAME } from '../ui.js';

const techList = ['java', 'c', 'web', 'typescript', 'kotlin', 'angular', 'python'];

function logoMarkup(p, imgSize, fontSize) {
  return p.logo
    ? `<img src="${LOGO(p.logo)}" alt="" style="width:${imgSize}px;height:${imgSize}px;object-fit:contain" loading="lazy">`
    : `<span style="font-size:${fontSize}px">${p.icon}</span>`;
}

function projectCardHTML(p, lang, t) {
  const isUniv = p.type === 'univ';
  const badge = Badge({ tone: isUniv ? 'accent' : 'violet', size: 'sm', children: isUniv ? t.univShort : t.persoShort });
  return `
    <button class="pcard" data-open="${p.id}">
      <div style="display:flex;align-items:flex-start;gap:14px">
        <span class="pcard-logo">${logoMarkup(p, 40, 26)}</span>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
            <h3>${p.titre}</h3>${badge}
          </div>
          <div class="tech">${p.techDisplay}</div>
        </div>
      </div>
      <p>${lang === 'fr' ? p.descFr : p.descEn}</p>
    </button>`;
}

function coverflowHTML(projects) {
  const n = projects.length;
  const radius = 460;
  const theta = 360 / n;
  const cards = projects.map((p, i) => `
    <div class="cf-card" data-cf-index="${i}" data-id="${p.id}"
         style="transform:rotateY(${i * theta}deg) translateZ(${radius}px)">
      <div class="cf-inner">
        <div class="cf-logo">${logoMarkup(p, 58, 40)}</div>
        <div class="cf-title">${p.titre}</div>
        <div class="cf-tech">${p.techDisplay}</div>
      </div>
    </div>`).join('');
  return `
    <div class="coverflow">
      <button class="icon-btn cf-nav" data-cf="-1" aria-label="prev" style="width:48px;height:48px;flex-shrink:0">${Ic.arrowLeft()}</button>
      <div class="cf-viewport">
        <div class="cf-stage" data-cf-radius="${radius}" data-cf-theta="${theta}" style="transform:translateZ(-${radius}px) rotateY(0deg)">
          ${cards}
        </div>
      </div>
      <button class="icon-btn cf-nav" data-cf="1" aria-label="next" style="width:48px;height:48px;flex-shrink:0">${Ic.arrowRight()}</button>
    </div>`;
}

function filterChipsHTML(t, lang) {
  const ctxChips = [['all', t.all], ['univ', t.univLong], ['perso', t.persoLong]]
    .map(([k, label]) => `<button class="fchip${k === 'all' ? ' active' : ''}" data-ctx="${k}">${label}</button>`).join('');
  const techChips = `<button class="fchip active" data-tech="all">${t.all}</button>` + techList
    .map((tk) => `<button class="fchip" data-tech="${tk}"><img src="${DEV_BASE + TECH_ICON[tk]}" alt="" loading="lazy">${TECH_NAME[tk]}</button>`).join('');
  const labelStyle = 'font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-faint)';
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:14px;margin-bottom:40px">
      <div class="filter-bar" style="justify-content:center" data-filter="ctx">
        <span style="${labelStyle}">${t.context}</span>${ctxChips}
      </div>
      <div class="filter-bar" style="justify-content:center" data-filter="tech">
        <span style="${labelStyle}">${t.techno}</span>${techChips}
      </div>
    </div>`;
}

export function projectsSectionHTML(t, lang) {
  return `
    <section class="section" id="projets">
      <div class="container">
        <div style="text-align:center;max-width:640px;margin:0 auto 18px">
          <span class="eyebrow">${Ic.sparkle()} ${t.projEyebrow}</span>
          <h2 class="h-section">${t.projTitle}</h2>
          <p class="lead" style="margin-top:14px">${t.projLead}</p>
        </div>
        <div style="margin:46px 0 40px">${coverflowHTML(PORTFOLIO.projects)}</div>
        ${filterChipsHTML(t, lang)}
        <div class="proj-grid" data-grid></div>
        <p class="proj-empty" data-empty hidden></p>
      </div>
    </section>`;
}

function modalHTML(p, lang, t) {
  const isUniv = p.type === 'univ';
  const badge = Badge({ tone: isUniv ? 'accent' : 'violet', children: isUniv ? t.univLong : t.persoLong });
  const techs = p.techs.map((tk) => TechBadge(tk)).join('');
  const ghBtn = p.github
    ? `<div style="margin-top:28px">${Button({ variant: 'gradient', href: p.github, target: '_blank', icon: Ic.github(), iconRight: Ic.arrowUpRight(), children: t.viewGithub })}</div>`
    : '';
  return `
    <div class="modal-overlay" data-modal-overlay>
      <div class="modal reveal" role="dialog" aria-modal="true">
        <div class="modal-head">
          <span class="modal-logo">${logoMarkup(p, 62, 46)}</span>
          <div style="flex:1">
            <h2 style="font-size:var(--text-3xl);color:var(--text-strong)">${p.titre}</h2>
            <div style="margin-top:8px">${badge}</div>
          </div>
          <button class="icon-btn" data-modal-close aria-label="close">${Ic.close()}</button>
        </div>
        <div style="padding:40px">
          <div style="display:flex;flex-wrap:wrap;gap:9px;margin-bottom:24px">${techs}</div>
          <p style="font-size:var(--text-base);color:var(--text-body);line-height:1.75">${lang === 'fr' ? p.detailsFr : p.detailsEn}</p>
          ${ghBtn}
        </div>
      </div>
    </div>`;
}

export function initProjects(scope, t, lang) {
  const section = scope.querySelector('#projets');
  if (!section) return;

  /* ---------- filters + grid ---------- */
  let ctx = 'all', tech = 'all';
  const grid = section.querySelector('[data-grid]');
  const empty = section.querySelector('[data-empty]');

  function renderGrid() {
    const shown = PORTFOLIO.projects.filter(
      (p) => (ctx === 'all' || p.type === ctx) && (tech === 'all' || p.techs.includes(tech)));
    grid.innerHTML = shown.map((p) => projectCardHTML(p, lang, t)).join('');
    if (shown.length === 0) { empty.hidden = false; empty.textContent = `// ${t.noResult}`; }
    else empty.hidden = true;
  }
  renderGrid();

  section.querySelectorAll('[data-filter="ctx"] .fchip').forEach((chip) => {
    chip.addEventListener('click', () => {
      ctx = chip.dataset.ctx;
      section.querySelectorAll('[data-filter="ctx"] .fchip').forEach((c) => c.classList.toggle('active', c === chip));
      renderGrid();
    });
  });
  section.querySelectorAll('[data-filter="tech"] .fchip').forEach((chip) => {
    chip.addEventListener('click', () => {
      tech = chip.dataset.tech;
      section.querySelectorAll('[data-filter="tech"] .fchip').forEach((c) => c.classList.toggle('active', c === chip));
      renderGrid();
    });
  });

  /* ---------- coverflow ---------- */
  const stage = section.querySelector('.cf-stage');
  const cards = [...section.querySelectorAll('.cf-card')];
  const n = cards.length;
  const radius = Number(stage.dataset.cfRadius);
  const theta = Number(stage.dataset.cfTheta);
  let idx = 0;

  function renderCover() {
    stage.style.transform = `translateZ(-${radius}px) rotateY(${-idx * theta}deg)`;
    cards.forEach((card, i) => {
      let diff = Math.abs((i - idx + n) % n);
      if (diff > n / 2) diff = n - diff;
      card.style.opacity = diff === 0 ? '1' : '0.32';
      card.style.pointerEvents = diff > 2 ? 'none' : 'auto';
      card.classList.toggle('is-active', i === idx);
    });
  }
  renderCover();
  const go = (d) => { idx = (idx + d + n) % n; renderCover(); };

  section.querySelectorAll('.cf-nav').forEach((btn) =>
    btn.addEventListener('click', () => go(Number(btn.dataset.cf))));
  cards.forEach((card, i) => card.addEventListener('click', () => {
    if (i === idx) openModal(card.dataset.id);
    else { idx = i; renderCover(); }
  }));

  /* ---------- modal ---------- */
  let onKey = null;
  function openModal(id) {
    const p = PORTFOLIO.projects.find((x) => x.id === id);
    if (!p) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = modalHTML(p, lang, t);
    const overlay = wrap.firstElementChild;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    const close = () => {
      overlay.remove();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('[data-modal-close]').addEventListener('click', close);
  }

  // expose grid-card opening via delegation (cards re-render on filter change)
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (btn) openModal(btn.dataset.open);
  });
}
