/* TechGlobe — draggable 3D skills sphere. Vanilla port of TechGlobe.jsx.
   Mounts into a host element and returns a cleanup function. */

const DEVICON_BASE = 'https://raw.githubusercontent.com/devicons/devicon/master/icons/';
const GLOBE_ICONS = {
  java: 'java/java-original.svg', c: 'c/c-original.svg', html5: 'html5/html5-original.svg',
  web: 'html5/html5-original.svg', css3: 'css3/css3-original.svg',
  typescript: 'typescript/typescript-original.svg', javascript: 'javascript/javascript-original.svg',
  kotlin: 'kotlin/kotlin-original.svg', angular: 'angular/angular-original.svg',
  python: 'python/python-original.svg', react: 'react/react-original.svg',
  tailwindcss: 'tailwindcss/tailwindcss-original.svg', flask: 'flask/flask-original.svg',
  git: 'git/git-original.svg', gradle: 'gradle/gradle-original.svg',
};

export function mountGlobe(host, { items, size = 380, iconSize = 48, speed = 0.25 } = {}) {
  if (!host) return () => {};
  const radius = size * 0.42;
  const n = items.length;

  // Scene + sphere
  const scene = document.createElement('div');
  scene.className = 'globe-scene';
  scene.style.width = size + 'px';
  scene.style.height = size + 'px';
  scene.style.perspective = (size * 2.4) + 'px';

  const sphere = document.createElement('div');
  sphere.className = 'globe-sphere';

  // Wireframe: meridians (longitude) + parallels (latitude), children of the
  // sphere so they rotate with it. Mimics the blue grid globe from the design.
  const wire = document.createElement('div');
  wire.className = 'globe-wire';

  const meridians = 8;
  for (let i = 0; i < meridians; i++) {
    const ring = document.createElement('div');
    ring.className = 'globe-ring';
    const d = radius * 2;
    ring.style.width = d + 'px';
    ring.style.height = d + 'px';
    ring.style.marginLeft = (-radius) + 'px';
    ring.style.marginTop = (-radius) + 'px';
    ring.style.transform = `rotateY(${(i / meridians) * 180}deg)`;
    wire.appendChild(ring);
  }

  const parallels = 5; // excludes the poles
  for (let i = 1; i <= parallels; i++) {
    const lat = (i / (parallels + 1)) * Math.PI - Math.PI / 2; // -90..90
    const rr = Math.cos(lat) * radius;
    const yy = Math.sin(lat) * radius;
    const ring = document.createElement('div');
    ring.className = 'globe-ring globe-ring--parallel';
    const d = rr * 2;
    ring.style.width = d + 'px';
    ring.style.height = d + 'px';
    ring.style.marginLeft = (-rr) + 'px';
    ring.style.marginTop = (-rr) + 'px';
    ring.style.transform = `translateY(${yy}px) rotateX(90deg)`;
    wire.appendChild(ring);
  }

  sphere.appendChild(wire);

  const itemEls = [];
  items.forEach((it) => {
    const el = document.createElement('div');
    el.className = 'globe-item';
    el.style.marginLeft = (-iconSize / 2) + 'px';
    el.style.marginTop = (-iconSize / 2) + 'px';
    el.style.width = iconSize + 'px';
    el.style.height = iconSize + 'px';
    el.title = it.label || it.tech;

    const tile = document.createElement('div');
    tile.className = 'globe-tile';
    tile.style.width = iconSize + 'px';
    tile.style.height = iconSize + 'px';

    const img = document.createElement('img');
    img.src = DEVICON_BASE + (GLOBE_ICONS[it.tech] || GLOBE_ICONS.web);
    img.alt = it.label || it.tech;
    img.width = Math.round(iconSize * 0.6);
    img.height = Math.round(iconSize * 0.6);
    img.draggable = false;
    img.loading = 'lazy';

    tile.appendChild(img);
    el.appendChild(tile);
    sphere.appendChild(el);
    itemEls.push(el);
  });

  scene.appendChild(sphere);
  host.appendChild(scene);

  // Fibonacci-sphere positions
  const positions = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }

  const s = { rx: -8, ry: 0, vx: 0, vy: speed, dragging: false, lastX: 0, lastY: 0, raf: 0 };

  function frame() {
    if (!s.dragging) {
      s.ry += s.vy; s.rx += s.vx;
      s.vx *= 0.95; s.vy += (speed - s.vy) * 0.02;
    }
    const rxr = s.rx * Math.PI / 180, ryr = s.ry * Math.PI / 180;
    const cosx = Math.cos(rxr), sinx = Math.sin(rxr), cosy = Math.cos(ryr), siny = Math.sin(ryr);
    for (let i = 0; i < n; i++) {
      const p = positions[i];
      const px = p.x * radius, py = p.y * radius, pz = p.z * radius;
      const z1 = -px * siny + pz * cosy;
      const z2 = py * sinx + z1 * cosx;
      const depth = (z2 + radius) / (2 * radius);
      const el = itemEls[i];
      if (!el) continue;
      el.style.transform = `translate3d(${px}px, ${py}px, ${pz}px) rotateY(${-s.ry}deg) rotateX(${-s.rx}deg)`;
      el.style.opacity = (0.35 + depth * 0.65).toFixed(3);
      const inner = el.firstChild;
      if (inner) inner.style.transform = `scale(${(0.7 + depth * 0.5).toFixed(3)})`;
      el.style.zIndex = String(Math.round(depth * 100));
    }
    sphere.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry}deg)`;
    s.raf = requestAnimationFrame(frame);
  }
  s.raf = requestAnimationFrame(frame);

  // Drag interaction
  const down = (e) => { s.dragging = true; const pt = e.touches ? e.touches[0] : e; s.lastX = pt.clientX; s.lastY = pt.clientY; s.vx = 0; s.vy = 0; scene.style.cursor = 'grabbing'; };
  const move = (e) => {
    if (!s.dragging) return;
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - s.lastX, dy = pt.clientY - s.lastY;
    s.ry += dx * 0.4; s.rx -= dy * 0.4; s.rx = Math.max(-80, Math.min(80, s.rx));
    s.vy = dx * 0.04; s.vx = -dy * 0.04; s.lastX = pt.clientX; s.lastY = pt.clientY;
    if (e.cancelable) e.preventDefault();
  };
  const up = () => { s.dragging = false; scene.style.cursor = 'grab'; };

  scene.addEventListener('mousedown', down);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
  scene.addEventListener('touchstart', down, { passive: false });
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', up);

  return () => {
    cancelAnimationFrame(s.raf);
    scene.removeEventListener('mousedown', down);
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
    scene.removeEventListener('touchstart', down);
    window.removeEventListener('touchmove', move);
    window.removeEventListener('touchend', up);
  };
}
