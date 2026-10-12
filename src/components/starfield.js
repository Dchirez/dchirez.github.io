/* Starfield — fixed night sky behind the whole portfolio. Three depth layers
   drift at different speeds as the page scrolls (parallax) and twinkle softly,
   with a few faint nebula glows. Mounted once on <body>, independent of
   app re-renders, and reduced-motion aware. */

const LAYERS = [
  { density: 1 / 2600, size: [0.4, 0.9], alpha: [0.25, 0.6], parallax: 0.04 },
  { density: 1 / 7000, size: [0.8, 1.4], alpha: [0.45, 0.85], parallax: 0.1 },
  { density: 1 / 26000, size: [1.3, 2.1], alpha: [0.7, 1], parallax: 0.2 },
];
const COLORS = ['255,255,255', '255,255,255', '210,225,255', '255,228,200'];

function rand(a, b) { return a + Math.random() * (b - a); }

export function mountStarfield() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'starfield';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, dpr = 1, stars = [], nebulas = [];

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    stars = [];
    LAYERS.forEach((L) => {
      const n = Math.round(W * H * L.density);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H, L,
          s: rand(L.size[0], L.size[1]), a: rand(L.alpha[0], L.alpha[1]),
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
          tw: Math.random() < 0.35 ? rand(0.6, 2.2) : 0, ph: Math.random() * 6.28,
        });
      }
    });
    // Faint nebulae, spread over a band taller than the screen so they scroll by
    nebulas = [
      { x: 0.15, y: 0.2, r: 0.45, c: '124,58,237', a: 0.07 },
      { x: 0.85, y: 0.65, r: 0.5, c: '234,88,12', a: 0.05 },
      { x: 0.4, y: 1.25, r: 0.55, c: '59,130,246', a: 0.05 },
      { x: 0.9, y: 1.8, r: 0.45, c: '124,58,237', a: 0.06 },
    ];
  }

  function draw(t) {
    const sy = window.scrollY;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const span = H * 2.2;
    for (const n of nebulas) {
      const y = (((n.y * H - sy * 0.03) % span) + span) % span - H * 0.3;
      const r = n.r * Math.max(W, H);
      const g = ctx.createRadialGradient(n.x * W, y, 0, n.x * W, y, r);
      g.addColorStop(0, `rgba(${n.c},${n.a})`);
      g.addColorStop(1, `rgba(${n.c},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    for (const s of stars) {
      const y = (((s.y - sy * s.L.parallax) % H) + H) % H;
      const a = s.tw ? s.a * (0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.ph)) : s.a;
      ctx.fillStyle = `rgba(${s.c},${a.toFixed(2)})`;
      if (s.s > 1.2) {
        ctx.beginPath(); ctx.arc(s.x, y, s.s / 2, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillRect(s.x, y, s.s, s.s);
      }
    }
  }

  build();
  if (reduce) {
    draw(0);
    window.addEventListener('scroll', () => requestAnimationFrame(() => draw(0)), { passive: true });
  } else {
    const loop = (t) => { draw(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { build(); if (reduce) draw(0); }, 150);
  });
}
