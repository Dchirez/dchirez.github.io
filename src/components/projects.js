/* Projects section: 3D coverflow + context/tech filters + grid + detail modal.
   Ported from projects.jsx to vanilla DOM. */
import { PORTFOLIO, LOGO } from '../data.js';
import { Ic, Badge, Button, TechBadge, DEV_BASE, TECH_ICON, TECH_NAME } from '../ui.js';

const techList = ['java', 'c', 'web', 'react', 'typescript', 'kotlin', 'angular', 'python'];

// Single shared resize handler for the coverflow — replaced (not stacked) each
// time the section re-renders on a language/theme switch, so listeners and
// stale-DOM references never accumulate.
let cfResizeHandler = null;

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
  const theta = 360 / n;
  const cards = projects.map((p, i) => `
    <div class="cf-card" data-cf-index="${i}" data-id="${p.id}">
      <div class="cf-inner">
        <div class="cf-logo">${logoMarkup(p, 58, 40)}</div>
        <div class="cf-title">${p.titre}</div>
        <div class="cf-tech">${p.techDisplay}</div>
      </div>
    </div>`).join('');
  return `
    <div class="coverflow">
      <button class="icon-btn cf-nav" data-cf="-1" aria-label="prev">${Ic.arrowLeft()}</button>
      <div class="cf-viewport">
        <div class="cf-stage" data-cf-theta="${theta}">
          ${cards}
        </div>
      </div>
      <button class="icon-btn cf-nav" data-cf="1" aria-label="next">${Ic.arrowRight()}</button>
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
  const demoBtn = p.demo
    ? Button({ variant: 'primary', href: p.demo, target: '_blank', icon: Ic.globe(), iconRight: Ic.arrowUpRight(), children: t.viewDemo })
    : '';
  const ghBtn = (p.github || p.demo)
    ? `<div style="margin-top:28px;display:flex;flex-wrap:wrap;gap:12px">${demoBtn}${p.github ? Button({ variant: 'gradient', href: p.github, target: '_blank', icon: Ic.github(), iconRight: Ic.arrowUpRight(), children: t.viewGithub }) : ''}</div>`
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
  const coverflow = section.querySelector('.coverflow');
  const stage = section.querySelector('.cf-stage');
  const viewport = section.querySelector('.cf-viewport');
  const cards = [...section.querySelectorAll('.cf-card')];
  const n = cards.length;
  const theta = Number(stage.dataset.cfTheta);
  // idx is kept continuous (never wrapped with %) so the stage keeps spinning
  // in the same direction across the first/last boundary — a seamless loop
  // instead of a ~360° back-spin reset. The active card is idx modulo n.
  let idx = 0;
  let radius = 460;
  let peekNeighbors = false; // show side previews only when there's room (desktop)
  const activeIndex = () => ((idx % n) + n) % n;

  // Scale the whole 3D rig to the viewport so the front card always fits.
  // The orbit radius stays proportional to the card width (~2×) so the
  // neighbouring cards sit just beyond the active one instead of overlapping
  // its sides (which read as dark bands in dark mode).
  function applyGeometry() {
    const vw = window.innerWidth;
    const cardW = vw <= 380 ? 200 : vw <= 600 ? 230 : 300;
    const cardH = vw <= 600 ? 196 : 220;
    // Only large screens have enough width to show the side cards as readable
    // previews; below that they'd be clipped to dark bars, so we hide them.
    peekNeighbors = vw > 860;
    radius = Math.round(cardW * 2.05);
    coverflow.style.setProperty('--cf-w', `${cardW}px`);
    coverflow.style.setProperty('--cf-h', `${cardH}px`);
    coverflow.style.setProperty('--cf-vh', `${cardH + 80}px`);
    // Set the critical dimensions inline too: inline styles beat any cached
    // stylesheet, so the card size always matches the radius the JS computes —
    // even if a browser is still serving an older primitives.css.
    viewport.style.height = `${cardH + 80}px`;
    cards.forEach((card, i) => {
      card.style.width = `${cardW}px`;
      card.style.height = `${cardH}px`;
      card.style.marginLeft = `${-cardW / 2}px`;
      card.style.marginTop = `${-cardH / 2}px`;
      card.style.transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
    });
  }

  function renderCover() {
    stage.style.transform = `translateZ(-${radius}px) rotateY(${-idx * theta}deg)`;
    const active = activeIndex();
    cards.forEach((card, i) => {
      let diff = Math.abs(i - active);
      if (diff > n / 2) diff = n - diff;
      // On large screens the immediate neighbours peek at low opacity; on
      // smaller screens they'd be clipped to dark bars, so only the active
      // card is shown and it cross-fades + spins in on navigation.
      const visible = diff === 0 || (diff === 1 && peekNeighbors);
      card.style.opacity = diff === 0 ? '1' : visible ? '0.3' : '0';
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.classList.toggle('is-active', diff === 0);
    });
  }
  applyGeometry();
  renderCover();
  const go = (d) => { idx += d; renderCover(); };

  // Re-scale on resize / orientation change without losing the current card.
  if (cfResizeHandler) window.removeEventListener('resize', cfResizeHandler);
  let resizeRaf = 0;
  cfResizeHandler = () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => { applyGeometry(); renderCover(); });
  };
  window.addEventListener('resize', cfResizeHandler);

  section.querySelectorAll('.cf-nav').forEach((btn) =>
    btn.addEventListener('click', () => go(Number(btn.dataset.cf))));
  cards.forEach((card, i) => card.addEventListener('click', () => {
    const active = activeIndex();
    if (i === active) { openModal(card.dataset.id); return; }
    // rotate by the shortest path to the clicked card, keeping idx continuous
    let delta = i - active;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    go(delta);
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
