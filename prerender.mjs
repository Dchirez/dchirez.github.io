/* Static pre-render for SEO.
   Runs the same pure HTML builders that main.js uses (via Vite SSR, no extra
   deps) and injects the resulting markup into <div id="root"> in index.html.
   At runtime main.js re-renders over it, so users are unaffected — but crawlers
   and link scrapers that don't run JS now get the full content.

   Run with:  npm run prerender   (or: node prerender.mjs)
   Re-run whenever the content in src/data.js or the sections changes.       */
import { createServer } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';

const START = '<!--PRERENDER_START-->';
const END = '<!--PRERENDER_END-->';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' });
try {
  const { PORTFOLIO } = await vite.ssrLoadModule('/src/data.js');
  const { STR } = await vite.ssrLoadModule('/src/i18n.js');
  const S = await vite.ssrLoadModule('/src/components/sections.js');
  const { projectsSectionHTML } = await vite.ssrLoadModule('/src/components/projects.js');

  const lang = 'fr';            // canonical language
  const theme = 'light';        // default theme
  const t = STR[lang];

  // Mirror of render() in src/main.js
  const inner = `
    <div class="kit dir-editorial">
      <div class="scroll-prog" data-progress></div>
      ${S.navHTML(t, lang, theme)}
      ${S.heroHTML(t, lang)}
      ${S.skillsHTML(t)}
      ${S.flagshipHTML(t, lang)}
      ${projectsSectionHTML(t, lang)}
      ${S.formationsHTML(t, lang)}
      ${S.contactHTML(t)}
      ${S.footerHTML(t)}
    </div>`;

  const block = `<div id="root">${START}${inner}${END}</div>`;

  let html = readFileSync('index.html', 'utf8');
  if (html.includes(END)) {
    html = html.replace(/<div id="root">[\s\S]*?<!--PRERENDER_END--><\/div>/, block);
  } else {
    html = html.replace('<div id="root"></div>', block);
  }
  writeFileSync('index.html', html);
  console.log(`✓ Pre-rendered ${inner.length} chars of content into #root (lang=${lang}).`);
} finally {
  await vite.close();
}
