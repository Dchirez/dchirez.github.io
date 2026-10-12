/* TechGalaxy — spiral galaxy around a white/orange black hole. The tech icons
   sit on the spiral arms and orbit slowly with them (rigid rotation, so they
   never drift towards the centre). Clicking a tech dives the camera onto it —
   drawn by the canvas itself, so it stays smooth — while onSelect starts the
   hyperspace jump on top. Mounts into a host element, returns a cleanup. */
import { DEV_BASE, STACK_ICON } from '../ui.js';

const PERIOD = 140;        // seconds per revolution of the galaxy
const ARMS = 2;
const PITCH = 0.28;        // log-spiral tightness (r = r0 · e^(PITCH·θ))
const DIVE_MS = 1100;      // camera dive onto the clicked tech
const DIVE_ZOOM = 7;       // final magnification of the dive
const JUMP_LEAD = 280;     // the hyperspace jump starts this long into the dive

function rand(a, b) { return a + Math.random() * (b - a); }
function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }
const easeOut = (x) => 1 - Math.pow(1 - x, 3);

export function mountGalaxy(host, { items, width = 520, height = 440, iconSize = 42, onSelect } = {}) {
  if (!host) return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = width, H = height, cx = W / 2, cy = H / 2;
  const R = W * 0.46;                     // horizontal radius of the disk
  const TILT = Math.min(0.72, (H * 0.4) / R); // disk seen at an angle: fit its height to the frame
  const rIn = R * 0.34, rOut = R * 0.97;  // band where the arms (and techs) live
  const thetaMax = Math.log(rOut / rIn) / PITCH;
  const unit = R / 244;                   // particle sizes were tuned for R ≈ 244px

  /* ---------- DOM ---------- */
  const root = document.createElement('div');
  root.className = 'galaxy';
  root.style.height = H + 'px';

  const canvas = document.createElement('canvas');
  // Keep the backing store reasonable on wide screens: it is redrawn every frame
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  while (dpr > 1 && W * H * dpr * dpr > 2.4e6) dpr -= 0.25;
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  root.appendChild(canvas);

  const layer = document.createElement('div');
  layer.className = 'galaxy-items';
  root.appendChild(layer);
  host.appendChild(root);

  /* ---------- tech placement: spread along the arms ---------- */
  const perArm = Math.ceil(items.length / ARMS);
  const techs = items.map((it, i) => {
    const arm = i % ARMS, k = Math.floor(i / ARMS);
    const theta = ((k + 0.5) / perArm) * thetaMax;  // position along the arm
    const r = rIn * Math.exp(PITCH * theta);
    const a = theta + (arm * 2 * Math.PI) / ARMS;

    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'galaxy-item';
    el.style.width = el.style.height = iconSize + 'px';
    el.style.marginLeft = el.style.marginTop = (-iconSize / 2) + 'px';
    el.setAttribute('aria-label', it.label);
    el.dataset.tech = it.tech;
    el.innerHTML = `<span class="galaxy-tile"><img src="${DEV_BASE + (STACK_ICON[it.tech] || STACK_ICON.html5)}" alt="" width="${Math.round(iconSize * 0.58)}" height="${Math.round(iconSize * 0.58)}" draggable="false" loading="lazy"></span><span class="galaxy-label">${it.label}</span>`;
    layer.appendChild(el);
    return { it, el, r, a, x: 0, y: 0 };
  });

  /* ---------- particles ---------- */
  const bgStars = Array.from({ length: Math.round(140 * Math.max(1, W * H / 230000)) }, () => ({
    x: Math.random() * W, y: Math.random() * H, s: rand(0.3, 1.1),
  }));

  // Dust + stars of the arms, plus a diffuse halo
  const dust = [];
  const nDust = Math.round(2400 * Math.min(1.6, Math.max(0.8, unit)));
  for (let i = 0; i < nDust; i++) {
    const onArm = Math.random() < 0.78;
    let r, a;
    if (onArm) {
      const theta = Math.random() * thetaMax * 1.08;
      r = rIn * 0.85 * Math.exp(PITCH * theta) * (1 + gauss() * 0.08);
      a = theta + (Math.floor(Math.random() * ARMS) * 2 * Math.PI) / ARMS + gauss() * 0.32;
    } else {
      r = rIn * 0.6 + Math.pow(Math.random(), 0.7) * (R - rIn * 0.6);
      a = Math.random() * Math.PI * 2;
    }
    const heat = 1 - Math.min(1, (r - rIn * 0.5) / (R - rIn * 0.5)); // hotter near the core
    const roll = Math.random();
    const color = roll < 0.12 ? '255,190,120' : roll < 0.35 ? '170,200,255'
      : heat > 0.6 ? '255,220,170' : '225,225,255';
    const o = rand(0.25, 0.95) * (onArm ? 1 : 0.55);
    dust.push({ r, a, s: rand(0.5, onArm ? 1.9 : 1.2), fill: `rgba(${color},${o.toFixed(2)})` });
  }

  // Nebula clouds glowing along the arms (one pre-rendered soft sprite, tinted)
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  const sg = sprite.getContext('2d');
  const sgr = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
  sgr.addColorStop(0, 'rgba(255,255,255,1)'); sgr.addColorStop(0.4, 'rgba(255,255,255,.35)'); sgr.addColorStop(1, 'rgba(255,255,255,0)');
  sg.fillStyle = sgr; sg.fillRect(0, 0, 64, 64);
  const tint = (rgb) => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    g.drawImage(sprite, 0, 0);
    g.globalCompositeOperation = 'source-in';
    g.fillStyle = `rgb(${rgb})`; g.fillRect(0, 0, 64, 64);
    return c;
  };
  const tints = [tint('255,150,90'), tint('150,120,255'), tint('110,170,255'), tint('255,110,170')];
  const clouds = Array.from({ length: Math.round(90 * Math.min(1.6, Math.max(1, unit))) }, () => {
    const theta = Math.random() * thetaMax;
    const r = rIn * 0.9 * Math.exp(PITCH * theta) * (1 + gauss() * 0.05);
    const near = 1 - theta / thetaMax;
    return {
      r, a: theta + (Math.floor(Math.random() * ARMS) * 2 * Math.PI) / ARMS + gauss() * 0.2,
      size: rand(22, 52) * unit, o: rand(0.12, 0.3),
      img: near > 0.65 && Math.random() < 0.7 ? tints[0] : tints[1 + Math.floor(Math.random() * 3)],
    };
  });

  // Accretion disk: fast-spinning hot particles around the hole
  const RH = Math.min(34, Math.max(14, R * 0.085)); // event horizon radius
  const disk = Array.from({ length: 420 }, () => {
    const r = RH * rand(1.35, 3.1);
    const tt = (r / RH - 1.35) / 1.75;
    return { r, a: Math.random() * 6.28, s: rand(0.4, 1.4), w: 2.6 / Math.pow(r / RH, 1.5), rgb: `255,${Math.round(255 - tt * 120)},${Math.round(230 - tt * 210)}` };
  });

  /* ---------- drawing ---------- */
  const proj = (r, a) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r * TILT];
  let rot = 0, time = 0, last = 0;
  // Camera: magnification k around focus point f (galaxy coords → screen centre)
  const cam = { k: 1, fx: cx, fy: cy };
  let dive = null; // { tk, t0, fired }

  function drawDisk(front) {
    // Accretion disk particles (back half before the horizon, front half after)
    for (const p of disk) {
      const a = p.a + time * p.w;
      if ((Math.sin(a) > 0) !== front) continue;
      const [x, y] = proj(p.r, a);
      const dop = 0.55 + 0.45 * Math.cos(a + 0.6);      // approaching side brighter
      ctx.fillStyle = `rgba(${p.rgb},${(0.55 * dop).toFixed(2)})`;
      ctx.fillRect(x, y, p.s * 1.6, p.s);
    }
  }

  function draw() {
    // Transparent canvas: the page's starfield is the backdrop. While diving,
    // extra stars rush past to sell the speed.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);
    if (cam.k > 1.01) {
      const par = Math.sqrt(cam.k), fade = Math.min(1, (cam.k - 1) / 1.5);
      for (const s of bgStars) {
        ctx.fillStyle = `rgba(220,225,255,${(0.6 * fade).toFixed(2)})`;
        ctx.fillRect(cx + (s.x - cx) * par, cy + (s.y - cy) * par, s.s * par, s.s * par);
      }
    }

    // Everything else goes through the camera
    const k = cam.k;
    ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * (cx - cam.fx * k), dpr * (cy - cam.fy * k));

    // Galactic glow
    ctx.globalCompositeOperation = 'lighter';
    ctx.save();
    ctx.translate(cx, cy); ctx.scale(1, TILT);
    const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
    halo.addColorStop(0, 'rgba(255,170,90,.42)');
    halo.addColorStop(0.18, 'rgba(255,120,60,.16)');
    halo.addColorStop(0.5, 'rgba(120,90,200,.08)');
    halo.addColorStop(1, 'rgba(40,40,120,0)');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    for (const c of clouds) {
      const [x, y] = proj(c.r, c.a + rot);
      ctx.globalAlpha = c.o;
      ctx.drawImage(c.img, x - c.size / 2, y - (c.size * TILT) / 2, c.size, c.size * TILT);
    }
    ctx.globalAlpha = 1;

    for (const d of dust) {
      const [x, y] = proj(d.r, d.a + rot);
      ctx.fillStyle = d.fill;
      ctx.fillRect(x, y, d.s, d.s);
    }

    // Core glow (white → orange)
    const core = ctx.createRadialGradient(cx, cy, RH * 0.8, cx, cy, RH * 5);
    core.addColorStop(0, 'rgba(255,245,225,.9)');
    core.addColorStop(0.18, 'rgba(255,190,110,.55)');
    core.addColorStop(0.45, 'rgba(255,110,40,.18)');
    core.addColorStop(1, 'rgba(255,80,20,0)');
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(cx, cy, RH * 5, 0, Math.PI * 2); ctx.fill();

    drawDisk(false);

    // Photon ring + lensed back of the disk arching over the hole
    ctx.shadowColor = 'rgba(255,170,80,.9)'; ctx.shadowBlur = 14 * k;
    ctx.strokeStyle = 'rgba(255,236,205,.95)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, RH * 1.12, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,175,95,.55)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(cx, cy - RH * 0.12, RH * 1.6, RH * 1.42, 0, Math.PI, 0); ctx.stroke();
    ctx.shadowBlur = 0;

    // Event horizon
    ctx.globalCompositeOperation = 'source-over';
    const hole = ctx.createRadialGradient(cx, cy, 0, cx, cy, RH);
    hole.addColorStop(0, '#000'); hole.addColorStop(0.85, '#000'); hole.addColorStop(1, 'rgba(0,0,0,.6)');
    ctx.fillStyle = hole;
    ctx.beginPath(); ctx.arc(cx, cy, RH, 0, Math.PI * 2); ctx.fill();

    ctx.globalCompositeOperation = 'lighter';
    drawDisk(true);

    // Bright front edge of the disk, crossing in front of the horizon
    const edge = ctx.createLinearGradient(cx - RH * 2.6, 0, cx + RH * 2.6, 0);
    edge.addColorStop(0, 'rgba(255,240,220,0)'); edge.addColorStop(0.3, 'rgba(255,240,220,.85)');
    edge.addColorStop(0.7, 'rgba(255,160,70,.6)'); edge.addColorStop(1, 'rgba(255,120,40,0)');
    ctx.strokeStyle = edge; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.ellipse(cx, cy, RH * 2.2, RH * 2.2 * TILT * 0.5, 0, 0, Math.PI); ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

  function placeTechs(diveP) {
    const k = cam.k;
    for (const tk of techs) {
      const a = tk.a + rot;
      const [x, y] = proj(tk.r, a);
      tk.x = x; tk.y = y;
      const depth = (Math.sin(a) + 1) / 2;           // 0 = far side, 1 = near side
      const sx = (x - cam.fx) * k + cx, sy = (y - cam.fy) * k + cy;
      const target = dive && dive.tk === tk;
      const s = (0.78 + depth * 0.32) * (target ? k : Math.sqrt(k));
      tk.el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
      tk.el.style.zIndex = String(target ? 150 : Math.round(depth * 100));
      const base = 0.8 + depth * 0.2;
      // Others scatter away at once; the target fades as the jump takes over
      const fade = !dive ? 1 : target ? 1 - Math.min(1, Math.max(0, (diveP - 0.55) / 0.35)) : Math.max(0, 1 - diveP * 2.5);
      tk.el.style.opacity = (base * fade).toFixed(3);
    }
  }

  let raf = 0, visible = true;
  function frame(now) {
    raf = 0;
    const dt = last ? Math.min(50, now - last) : 16;
    last = now;
    time += dt / 1000;
    if (!reduce) rot += (dt / 1000 / PERIOD) * Math.PI * 2;

    let diveP = 0;
    if (dive) {
      diveP = Math.min(1, (now - dive.t0) / DIVE_MS);
      // The camera first swings towards the tech, then plunges in, accelerating
      const swing = easeOut(Math.min(1, diveP * 1.6));
      const [tx, ty] = proj(dive.tk.r, dive.tk.a + rot);
      cam.fx = cx + (tx - cx) * swing;
      cam.fy = cy + (ty - cy) * swing;
      cam.k = 1 + (DIVE_ZOOM - 1) * Math.pow(diveP, 2.6);
      if (!dive.fired && now - dive.t0 >= JUMP_LEAD) {
        dive.fired = true;
        const b = root.getBoundingClientRect();
        onSelect?.(dive.tk.it, { x: b.left + cx, y: b.top + cy });
      }
    }

    draw();
    placeTechs(diveP);
    // Once the dive is over the jump covers the screen: stop drawing until reset
    if (dive && diveP >= 1) return;
    if (visible) raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
  start();

  // Pause while scrolled out of view
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) start();
  });
  io.observe(root);

  /* ---------- dive onto a tech, then hand over ---------- */
  function diveTo(tk) {
    if (dive) return;
    root.classList.add('is-zooming');
    tk.el.classList.add('is-target');
    if (reduce) {
      const b = root.getBoundingClientRect();
      onSelect?.(tk.it, { x: b.left + cx, y: b.top + cy });
      return;
    }
    dive = { tk, t0: performance.now(), fired: false };
    start();
  }
  function resetZoom() {
    dive = null;
    cam.k = 1; cam.fx = cx; cam.fy = cy;
    root.classList.remove('is-zooming');
    techs.forEach((tk) => tk.el.classList.remove('is-target'));
    start();
  }

  const onClick = (e) => {
    const btn = e.target.closest('.galaxy-item');
    const tk = btn && techs.find((x) => x.el === btn);
    if (tk) diveTo(tk);
  };
  layer.addEventListener('click', onClick);
  root.addEventListener('galaxy:reset', resetZoom);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    layer.removeEventListener('click', onClick);
    root.removeEventListener('galaxy:reset', resetZoom);
    root.remove();
  };
}
