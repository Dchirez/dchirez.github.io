/* Custom cursor — a brand-gradient dot with a soft glow that trails
   the pointer on desktop. On touch devices, only the glow halo is shown
   around the user's finger. Mounted once on <body>, independent of
   app re-renders, and reduced-motion aware. */

const HOVER_SELECTOR = 'a, button, input, textarea, select, label, [role="button"], .btn, [data-action]';
// Elements the halo "locks" onto — it draws a thin light outline around them
// instead of following the pointer. Disabled entirely while a modal is open.
const LOCK_SELECTOR = 'a, button, .btn, .icon-btn, .fchip, .pcard, .cf-nav, [role="button"], [data-action]';
const isModalOpen = () => !!document.querySelector('.modal-overlay');
const TRAIL_LEN = 6; // number of fading halo segments forming the tail

export function mountCursor() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  if (!fine && !hasTouch) return () => {};

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const glow = el('cursor-glow', 'cursor-glow-i');
  const dot = el('cursor-dot', 'cursor-dot-i');

  // Comet tail: a chain of smaller halos that each lag the previous one.
  // Only built for mouse + when motion isn't reduced.
  const trail = (fine && !reduce)
    ? Array.from({ length: TRAIL_LEN }, (_, i) => {
        const seg = el('cursor-trail', 'cursor-trail-i');
        const f = 1 - i / TRAIL_LEN;             // 1 → 0 down the tail
        seg.firstChild.style.opacity = `${0.4 * f * f}`;
        seg.firstChild.style.transform = `translate(-50%, -50%) scale(${0.9 * f + 0.15})`;
        seg.style.transform = 'translate(-100px, -100px)';
        return { el: seg, x: -100, y: -100 };
      })
    : [];

  document.body.append(glow, dot, ...trail.map((t) => t.el));
  if (fine) root.classList.add('has-cursor'); // hides native cursor (mouse only)

  // Start off-screen so nothing flashes at (0,0) before the first move.
  let mx = -100, my = -100;   // live pointer (drives the dot)
  let gx = mx, gy = my;       // eased position (drives the glow)
  let raf = 0;
  let shown = false;

  const glowInner = glow.firstChild;
  let locked = null; // element the halo is currently wrapping, or null

  const place = (node, x, y) => { node.style.transform = `translate(${x}px, ${y}px)`; };
  const show = () => { if (!shown) { shown = true; root.classList.add('cursor-active'); } };
  const hide = () => { shown = false; root.classList.remove('cursor-active'); };

  // Morph the halo onto an element: move to its centre and take its size/shape.
  function positionLock(elm) {
    const r = elm.getBoundingClientRect();
    const pad = 2; // hug the element edge so the glow is just a few px around it
    place(glow, r.left + r.width / 2, r.top + r.height / 2);
    glowInner.style.width = `${r.width + pad}px`;
    glowInner.style.height = `${r.height + pad}px`;
    const br = getComputedStyle(elm).borderRadius;
    glowInner.style.borderRadius = br && br !== '0px' ? br : '12px';
  }
  function setLock(elm) {
    if (elm === locked) { if (elm) positionLock(elm); return; }
    locked = elm;
    if (elm) { root.classList.add('cursor-locked'); positionLock(elm); }
    else {
      root.classList.remove('cursor-locked');
      glowInner.style.width = glowInner.style.height = glowInner.style.borderRadius = '';
      gx = mx; gy = my; // resume following from the cursor, no glide from the lock
    }
  }

  const cleanups = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  // ---- Mouse (desktop) : dot + trailing glow ----
  if (fine) {
    root.classList.add('cursor-mouse');
    // Evaluate hover + lock for whatever element is under the pointer.
    // No locking while a modal is open — the halo just follows the pointer.
    const updateUnder = (elm) => {
      root.classList.toggle('cursor-hover', !!elm?.closest?.(HOVER_SELECTOR));
      setLock(isModalOpen() ? null : elm?.closest?.(LOCK_SELECTOR) || null);
    };
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      place(dot, mx, my);
      show();
      updateUnder(e.target);
      if (reduce && !locked) place(glow, mx, my); // no trailing when motion is reduced
    };
    on(window, 'mousemove', onMove, { passive: true });
    on(window, 'mousedown', () => root.classList.add('cursor-down'));
    on(window, 'mouseup', () => root.classList.remove('cursor-down'));
    on(document, 'mouseleave', () => { setLock(null); hide(); });

    // Scrolling moves the page under a stationary cursor without firing
    // mousemove, so re-check what's under the pointer (and re-anchor the lock
    // outline) on scroll — otherwise it stays frozen where the element was.
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        if (shown) updateUnder(document.elementFromPoint(mx, my));
      });
    };
    on(window, 'scroll', onScroll, { passive: true });

    // A modal can open from a click (which first locks the halo onto the card)
    // without any following mousemove — so clear the lock as soon as a modal
    // appears, otherwise its outline stays frozen over the modal.
    const mo = new MutationObserver(() => { if (locked && isModalOpen()) setLock(null); });
    mo.observe(document.body, { childList: true });
    cleanups.push(() => mo.disconnect());

    if (!reduce) {
      const loop = () => {
        // While locked, the halo stays morphed on the element (positioned by
        // setLock with a CSS transition) — skip the per-frame following.
        if (!locked) {
          gx += (mx - gx) * 0.18;
          gy += (my - gy) * 0.18;
          place(glow, gx, gy);
          // Each tail segment eases toward the one in front of it (the glow
          // leads), producing a smooth comet trail behind the cursor.
          let px = gx, py = gy;
          for (const seg of trail) {
            seg.x += (px - seg.x) * 0.34;
            seg.y += (py - seg.y) * 0.34;
            place(seg.el, seg.x, seg.y);
            px = seg.x; py = seg.y;
          }
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
  }

  // ---- Touch : halo follows the finger (no dot, no trail) ----
  if (hasTouch) {
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      mx = gx = t.clientX;
      my = gy = t.clientY;
      place(glow, mx, my);
      show();
    };
    on(window, 'touchstart', onTouch, { passive: true });
    on(window, 'touchmove', onTouch, { passive: true });
    on(window, 'touchend', hide, { passive: true });
    on(window, 'touchcancel', hide, { passive: true });
  }

  return () => {
    cancelAnimationFrame(raf);
    cleanups.forEach((fn) => fn());
    glow.remove();
    dot.remove();
    trail.forEach((t) => t.el.remove());
    root.classList.remove('has-cursor', 'cursor-mouse', 'cursor-active', 'cursor-hover', 'cursor-down');
  };
}

function el(outerClass, innerClass) {
  const outer = document.createElement('div');
  outer.className = outerClass;
  const inner = document.createElement('div');
  inner.className = innerClass;
  outer.appendChild(inner);
  return outer;
}
