/* Nav, Hero, Skills, Flagship, Formations, Contact, Footer — HTML builders. */
import { PORTFOLIO, LOGO } from '../data.js';
import { Ic, Button, StatusPill, TechBadge } from '../ui.js';

const ID = PORTFOLIO.identity;

/* ---------- NAV ---------- */
export function navHTML(t, lang, theme) {
  const tools = `
    <div class="nav-tools">
      <button class="icon-btn lang-btn" data-action="lang">${lang === 'fr' ? 'EN' : 'FR'}</button>
      <button class="icon-btn" data-action="theme" aria-label="theme">${theme === 'dark' ? Ic.sun() : Ic.moon()}</button>
      <a class="icon-btn" href="${ID.github}" target="_blank" rel="noopener" aria-label="GitHub">${Ic.github()}</a>
      <span class="nav-cta">
        ${Button({ size: 'sm', variant: 'secondary', href: ID.cv, target: '_blank', icon: Ic.fileText(), children: t.cv })}
        ${Button({ size: 'sm', variant: 'primary', href: '#contact', children: t.nav.cta })}
      </span>
      <button class="mobile-menu-btn" data-action="menu" aria-label="menu">${Ic.menu()}</button>
    </div>`;
  return `
    <nav class="kit-nav">
      <div class="container inner">
        <a href="#top" class="brand">Damien<b>.Dev</b></a>
        <div class="nav-links">
          <a class="nav-link" href="#projets">${t.nav.projects}</a>
          <a class="nav-link" href="#competences">${t.nav.skills}</a>
          <a class="nav-link" href="#parcours">${t.nav.education}</a>
          <a class="nav-link" href="#contact">${t.nav.contact}</a>
        </div>
        ${tools}
      </div>
    </nav>
    <div class="mobile-nav-overlay" data-mobile-overlay></div>
    <div class="mobile-nav-drawer" data-mobile-drawer>
      <div class="drawer-header">
        <span class="brand">Damien<b>.Dev</b></span>
        <button class="icon-btn" data-action="close-drawer" aria-label="close">${Ic.close()}</button>
      </div>
      <div class="drawer-links">
        <a href="#projets" data-drawer-link>${t.nav.projects}</a>
        <a href="#competences" data-drawer-link>${t.nav.skills}</a>
        <a href="#parcours" data-drawer-link>${t.nav.education}</a>
        <a href="#contact" data-drawer-link>${t.nav.contact}</a>
      </div>
      <div class="drawer-cta">
        ${Button({ size: 'md', variant: 'primary', href: '#contact', full: true, children: t.nav.cta })}
        ${Button({ size: 'md', variant: 'secondary', href: ID.cv, target: '_blank', full: true, icon: Ic.fileText(), children: t.cv })}
        <div class="drawer-tools">
          <button class="icon-btn lang-btn" data-action="lang">${lang === 'fr' ? 'EN' : 'FR'}</button>
          <button class="icon-btn" data-action="theme" aria-label="theme">${theme === 'dark' ? Ic.sun() : Ic.moon()}</button>
          <a class="icon-btn" href="${ID.github}" target="_blank" rel="noopener" aria-label="GitHub">${Ic.github()}</a>
        </div>
      </div>
    </div>`;
}

/* ---------- HERO · EDITORIAL ---------- */
export function heroHTML(t, lang) {
  return `
    <header class="hero" id="top">
      <div class="container hero-grid">
        <div class="reveal">
          <div class="accent-rule"></div>
          <span class="eyebrow">${lang === 'fr' ? ID.roleFr : ID.roleEn} · ${ID.location}</span>
          <h1>${t.heroHi}<br><span style="color:var(--accent)">Damien Chirez.</span></h1>
          <p class="sub">${lang === 'fr' ? ID.pitchFr : ID.pitchEn}</p>
          <div class="cta-row">
            ${Button({ variant: 'primary', size: 'lg', href: '#projets', iconRight: Ic.arrowRight(), children: t.heroCtaPrimary })}
            ${Button({ variant: 'secondary', size: 'lg', href: '#contact', children: t.heroCtaSecondary })}
            ${StatusPill(lang === 'fr' ? ID.statusFr : ID.statusEn)}
          </div>
          <div class="stat-row">
            <div class="stat"><div class="n">12</div><div class="l">${t.statProjects}</div></div>
            <div class="stat"><div class="n">7</div><div class="l">${t.statTech}</div></div>
            <div class="stat"><div class="n grad">2026</div><div class="l">${t.statAvail}</div></div>
          </div>
        </div>
        <div class="hero-stage reveal"><div class="globe-host" data-globe="400"></div></div>
      </div>
    </header>`;
}

/* ---------- SKILLS ---------- */
export function skillsHTML(t) {
  const badges = ['java', 'c', 'typescript', 'angular', 'python', 'kotlin']
    .map((tk) => TechBadge(tk, 'lg', true)).join('');
  return `
    <section class="section" id="competences" style="background:var(--bg-page-alt)">
      <div class="container skills-grid">
        <div>
          <span class="eyebrow">${Ic.sparkle()} ${t.skillsEyebrow}</span>
          <h2 class="h-section">${t.skillsTitle}</h2>
          <p class="lead" style="margin-top:16px">${t.skillsLead}</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:26px">${badges}</div>
        </div>
        <div style="display:flex;justify-content:center"><div class="globe-host" data-globe="420"></div></div>
      </div>
    </section>`;
}

/* ---------- FLAGSHIP (GMB) ---------- */
function scoreRingHTML(value = 92) {
  const r = 78, c = 2 * Math.PI * r, off = c * (1 - value / 100);
  return `
    <svg class="score-ring" viewBox="0 0 180 180">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ea580c"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs>
      <circle cx="90" cy="90" r="${r}" fill="none" stroke="var(--surface-sunken)" stroke-width="14"/>
      <circle cx="90" cy="90" r="${r}" fill="none" stroke="url(#sg)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 90 90)"/>
      <text x="90" y="84" text-anchor="middle" font-family="var(--font-display)" font-size="40" font-weight="700" fill="var(--text-strong)">${value}</text>
      <text x="90" y="108" text-anchor="middle" font-family="var(--font-mono)" font-size="11" letter-spacing="2" fill="var(--text-faint)">SCORE</text>
    </svg>`;
}

export function flagshipHTML(t, lang) {
  const p = PORTFOLIO.projects.find((x) => x.id === 'gmbmanager');
  const techs = p.techs.map((tk) => TechBadge(tk)).join('');
  const stats = [[t.flagStat1, 'OAuth 2.0'], [t.flagStat2, 'Flask API'], [t.flagStat3, 'Angular 21']]
    .map(([l, v]) => `
      <div style="padding:12px 16px;border-radius:var(--radius-md);background:var(--surface-sunken);border:1px solid var(--border)">
        <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-faint)">${l}</div>
        <div style="font-weight:600;color:var(--text-strong);margin-top:3px">${v}</div>
      </div>`).join('');
  return `
    <section class="section" id="flagship">
      <div class="container">
        <div style="text-align:center;margin-bottom:40px">
          <span class="eyebrow">${Ic.sparkle()} ${t.flagEyebrow}</span>
        </div>
        <div class="flagship">
          <div>
            <div style="display:flex;align-items:center;gap:18px;margin-bottom:22px">
              <span class="flagship-logo"><img src="${LOGO(p.logo)}" alt="" loading="lazy"></span>
              <div>
                <h2 style="font-size:var(--text-3xl);color:var(--text-strong)">${p.titre}</h2>
                <div style="font-family:var(--font-mono);font-size:13px;color:var(--accent);margin-top:4px">${p.techDisplay}</div>
              </div>
            </div>
            <p style="font-size:var(--text-base);color:var(--text-body);line-height:1.75">${lang === 'fr' ? p.detailsFr : p.detailsEn}</p>
            <div style="display:flex;flex-wrap:wrap;gap:9px;margin:24px 0 28px">${techs}</div>
            ${Button({ variant: 'gradient', href: p.github, target: '_blank', icon: Ic.github(), iconRight: Ic.arrowUpRight(), children: t.viewGithub })}
          </div>
          <div class="flagship-visual">
            ${scoreRingHTML(92)}
            <div style="display:flex;flex-direction:column;gap:12px">${stats}</div>
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- FORMATIONS ---------- */
export function formationsHTML(t, lang) {
  const items = PORTFOLIO.formations.map((f) => `
    <div class="tl-item${f.current ? ' cur' : ''}">
      <h4>${lang === 'fr' ? f.titreFr : f.titreEn}</h4>
      <div class="meta">${f.org} · ${f.years}</div>
    </div>`).join('');
  return `
    <section class="section" id="parcours" style="background:var(--bg-page-alt)">
      <div class="container container-narrow">
        <div style="text-align:center;margin-bottom:44px">
          <span class="eyebrow">${Ic.sparkle()} ${t.eduEyebrow}</span>
          <h2 class="h-section">${t.eduTitle}</h2>
        </div>
        <div class="timeline">${items}</div>
      </div>
    </section>`;
}

/* ---------- CONTACT ---------- */
export function contactHTML(t) {
  return `
    <section class="section" id="contact">
      <div class="container container-narrow">
        <div style="text-align:center;margin-bottom:36px">
          <span class="eyebrow">${Ic.sparkle()} ${t.contactEyebrow}</span>
          <h2 class="h-section">${t.contactTitle}</h2>
          <p class="lead" style="margin-top:14px">${t.contactLead}</p>
        </div>
        <div class="contact-card">
          <form data-contact-form action="${ID.formspree}" method="POST">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px" class="contact-row">
              <div class="field"><label>${t.fName}</label><input name="name" required placeholder="${t.phName}"></div>
              <div class="field"><label>Email</label><input type="email" name="email" required placeholder="vous@email.com"></div>
            </div>
            <div class="field" style="margin-top:18px"><label>${t.fSubject}</label><input name="subject" required placeholder="${t.phSubject}"></div>
            <div class="field" style="margin-top:18px"><label>Message</label><textarea name="message" required placeholder="${t.phMessage}"></textarea></div>
            <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap">
              ${Button({ type: 'submit', variant: 'gradient', size: 'lg', iconRight: Ic.arrowRight(), children: t.send })}
              ${Button({ variant: 'secondary', size: 'lg', href: `mailto:${ID.email}`, icon: Ic.mail(), children: ID.email })}
            </div>
          </form>
          <div class="contact-sent" data-contact-sent hidden>
            <div style="font-size:44px">✦</div>
            <p style="font-size:var(--text-lg);color:var(--text-strong);margin-top:10px">${t.contactSent}</p>
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- FOOTER ---------- */
export function footerHTML(t) {
  return `
    <footer class="kit-footer">
      <div class="container inner">
        <div class="brand">Damien<b>.Dev</b></div>
        <div style="display:flex;gap:10px">
          <a class="icon-btn" href="${ID.github}" target="_blank" rel="noopener" aria-label="GitHub">${Ic.github()}</a>
          <a class="icon-btn" href="mailto:${ID.email}" aria-label="Email">${Ic.mail()}</a>
        </div>
        <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-faint)">© 2026 Damien Chirez — ${t.rights}</div>
      </div>
    </footer>`;
}
