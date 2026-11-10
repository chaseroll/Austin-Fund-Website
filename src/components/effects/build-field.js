/* Loose letter ribbons resolve into possibilities, then return to the field. */
import { letterMotion } from './letter-motion';

/** @param {HTMLElement} host */
export function mountBuildField(host) {
  const canvas = host?.querySelector('canvas');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const controller = new AbortController();
  const options = {signal:controller.signal};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const alphabet = 'UniversityofAustinAustinFundResearchBuildCreate';
  const ideas = ['START A COMPANY', 'BUILD A PROTOTYPE', 'MAKE A FILM', 'TEST AN IDEA', 'DESIGN A TOOL', 'EXPLORE A QUESTION'];
  const disruptions = ideas.map(() => ({amount:0, until:0}));
  let width = 1, height = 1, dpr = 1, glyphs = [], visible = false;
  let frame = 0, last = 0, elapsed = 0, pointer = null;
  const paused = false;
  const hash = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const ease = v => v * v * (3 - 2 * v);
  const ideaPositions = () => width <= 760
    ? [[.28,.13,0],[.69,.23,1],[.27,.79,3],[.72,.9,2]]
    : [[.16,.22,0],[.49,.14,1],[.83,.23,2],[.2,.81,3],[.51,.9,4],[.82,.81,5]];
  const hitsIdea = (point, px, py, index) => point &&
    Math.abs(point.x - width * px) < ideas[index].length * (width <= 760 ? 10 : 12) * .66 / 2 + 18 &&
    Math.abs(point.y - height * py) < 25;

  function draw(dt = 0) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = getComputedStyle(host).getPropertyValue('--model-ink').trim() || '#f7f7f1';
    const mobile = width <= 760;
    const still = reduced.matches || paused;
    const t = still ? 0 : elapsed;
    const rect = host.getBoundingClientRect();
    const local = pointer && !still ? {x: pointer.x - rect.left, y: pointer.y - rect.top} : null;
    const motionScale = letterMotion.scaleFor(width, height);
    ctx.font = `${mobile ? 8 : 9}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    for (const g of glyphs) {
      const x = g.u * width + Math.sin(t * .12 + g.row * .25) * 7;
      const wave = Math.sin(g.u * Math.PI * 2 + g.row * .13 + t * .065);
      const y = height * (g.bottom ? .82 : .12) + wave * (mobile ? 24 : 42) + g.row * (mobile ? 8 : 9);
      if (still) { g.dx = 0; g.dy = 0; }
      else letterMotion.advance(g, x, y, local, dt, motionScale);
      const tick = Math.floor(t * 3 + g.seed * 30);
      // Most letters hold their place; small staggered groups change together.
      const char = alphabet[(g.seed + (hash(tick + g.seed) > .82 ? tick : 0)) % alphabet.length];
      const edge = Math.sin(Math.PI * Math.max(0, Math.min(1, g.u))) ** .45;
      ctx.globalAlpha = (.08 + hash(g.seed) * .19) * edge;
      ctx.fillText(char, x + g.dx, y + g.dy);
    }

    // Words are made from the same moving characters, without panels or pills.
    const positions = ideaPositions();
    const size = mobile ? 10 : 12;
    ctx.font = `400 ${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    for (const [px, py, index] of positions) {
      const word = ideas[index];
      const phase = (t + index * 1.37) % 11;
      const cycleGather = still ? 1 : phase < 1.6 ? ease(phase / 1.6) : phase < 8.5 ? 1 : 1 - ease((phase - 8.5) / 2.5);
      const spacing = size * .66;
      const disruption = disruptions[index];
      if (still) disruption.amount = 0;
      const hit = hitsIdea(local, px, py, index);
      if (hit) disruption.until = t + .65;
      const target = !still && (hit || t < disruption.until) ? 1 : 0;
      disruption.amount += (target - disruption.amount) * (1 - Math.exp(-dt / (target ? .09 : .55)));
      const gather = cycleGather * (1 - disruption.amount);
      for (let j = 0; j < word.length; j++) {
        if (word[j] === ' ') continue;
        const seed = index * 100 + j + 7;
        const loose = 1 - gather;
        const x = width * px + (j - (word.length - 1) / 2) * spacing + (hash(seed) - .5) * loose * (95 + disruption.amount * 65);
        const y = height * py + Math.sin(seed + t * .4) * loose * (32 + disruption.amount * 26);
        const resolved = gather > .75 + hash(seed) * .24;
        const char = resolved ? word[j] : alphabet[(seed + Math.floor(t * 9)) % alphabet.length];
        ctx.globalAlpha = .26 + gather * .48;
        ctx.fillText(char, x, y);
      }
    }
    ctx.globalAlpha = 1;
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; last = 0; }
  function tick(time) {
    frame = 0;
    if (!visible || document.hidden || paused || reduced.matches) return;
    if (!last || time - last >= 32) {
      const dt = last ? Math.min((time - last) / 1000, .06) : 1 / 30;
      last = time; elapsed += dt; draw(dt);
    }
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (!frame && visible && !document.hidden && !paused && !reduced.matches) frame = requestAnimationFrame(tick);
  }
  const resizeObserver = new ResizeObserver(() => {
    width = host.clientWidth; height = host.clientHeight; dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    glyphs = [];
    const columns = Math.ceil(width / 12);
    for (let side = 0; side < 2; side++) for (let row = 0; row < 7; row++) for (let col = 0; col <= columns; col++) {
      const seed = side * 10000 + row * (columns + 1) + col;
      if (hash(seed + 100) < .15) continue;
      glyphs.push({u:col / columns, row, bottom:Boolean(side), seed, dx:0, dy:0});
    }
    draw(); schedule();
  });
  resizeObserver.observe(host);
  const input = letterMotion.bindPointer(host, {
    enabled:() => !reduced.matches && !paused,
    move:point => { pointer = point; schedule(); },
    reset:() => { pointer = null; }
  });
  const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); else { input.reset(); stop(); } });
  visibilityObserver.observe(host);
  // A tap has no persistent hover; hold the same disruption long enough to play.
  host.addEventListener('click', e => {
    if (reduced.matches || paused || e.target.closest('a, button')) return;
    const rect = host.getBoundingClientRect();
    const local = {x:e.clientX - rect.left, y:e.clientY - rect.top};
    for (const [px, py, index] of ideaPositions()) {
      if (hitsIdea(local, px, py, index)) disruptions[index].until = elapsed + .65;
    }
    schedule();
  }, options);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else schedule(); }, options);
  reduced.addEventListener('change', () => { input.reset(); stop(); if (reduced.matches) draw(); else schedule(); }, options);
  return () => {
    controller.abort();
    input.dispose();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    stop();
  };
}
