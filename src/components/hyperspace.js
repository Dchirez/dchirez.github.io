/* Hyperspace jump — full-screen light-speed effect (stars stretching into
   streaks, then a white flash). It starts see-through, so it blends over the
   galaxy dive already under way, and darkens as the streaks build up.
   onPeak runs under the flash so the next view can be swapped in unseen;
   the flash then fades out over it. */

export function hyperspace({ from, onPeak } = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'hyperspace';
  document.body.appendChild(canvas);

  if (reduce) {
    canvas.style.background = '#fff';
    canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, fill: 'forwards' }).onfinish = () => {
      onPeak?.();
      canvas.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' }).onfinish = () => canvas.remove();
    };
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const W = window.innerWidth, H = window.innerHeight;
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const start = from || { x: W / 2, y: H / 2 };
  const maxR = Math.hypot(W, H);
  const stars = Array.from({ length: 700 }, () => ({
    a: Math.random() * Math.PI * 2,
    d: Math.pow(Math.random(), 0.6) * maxR * 0.6 + 4,   // distance from the vanishing point
    v: 0.6 + Math.random() * 0.8,                        // speed factor
    hue: Math.random() < 0.7 ? '200,220,255' : '255,255,255',
  }));

  const T_JUMP = 1300, T_FLASH = 1550, T_END = 2050;
  const smooth = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
  const t0 = performance.now();
  let peaked = false, last = t0;

  function frame(now) {
    const e = now - t0;
    const step = Math.min(3, (now - last) / 16.67); // frame-rate independent motion
    last = now;
    // Vanishing point glides from the clicked tech to the screen centre
    const k = Math.min(1, e / T_JUMP), ease = k * k * (3 - 2 * k);
    const ox = start.x + (W / 2 - start.x) * ease, oy = start.y + (H / 2 - start.y) * ease;

    // Starts see-through over the galaxy dive, then fades to deep space
    const bgA = smooth(150, 800, e);
    const starA = smooth(0, 450, e);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = `rgba(2,3,10,${bgA.toFixed(3)})`;
    ctx.fillRect(0, 0, W, H);

    // One continuous acceleration, from drifting dots to full streaks
    const j = Math.min(1, e / T_JUMP);
    const speed = 0.5 + Math.pow(j, 2.4) * 60;
    const trail = smooth(0.1, 0.85, j);

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for (const s of stars) {
      s.d += speed * s.v * (s.d / 120 + 0.4) * step;
      if (s.d > maxR) { s.d = 4 + Math.random() * 40; }
      const x = ox + Math.cos(s.a) * s.d, y = oy + Math.sin(s.a) * s.d;
      const len = 1 + trail * s.d * 0.55;
      const x0 = ox + Math.cos(s.a) * Math.max(0, s.d - len), y0 = oy + Math.sin(s.a) * Math.max(0, s.d - len);
      const alpha = Math.min(1, 0.25 + s.d / (maxR * 0.35)) * starA;
      ctx.strokeStyle = `rgba(${s.hue},${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.6 + (s.d / maxR) * 2.4;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke();
    }

    // Tunnel glow at the vanishing point
    const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 120 + j * 260);
    g.addColorStop(0, `rgba(190,215,255,${((0.15 + j * 0.5) * starA).toFixed(3)})`);
    g.addColorStop(1, 'rgba(120,160,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // White flash, then fade the whole overlay out
    if (e > T_JUMP) {
      const f = smooth(T_JUMP, T_FLASH, e);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(255,255,255,${f})`;
      ctx.fillRect(0, 0, W, H);
      if (f >= 1 && !peaked) { peaked = true; onPeak?.(); }
    }
    if (e > T_FLASH) canvas.style.opacity = String(1 - smooth(T_FLASH, T_END, e));

    if (e < T_END) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}
