/* One pointer field for every letter-built object, measured in CSS pixels. */

  const radius = 62, strength = 22, pushTime = .085, returnTime = .24;
  export const letterMotion = Object.freeze({
    scaleFor(width, height) { return Math.max(.25, Math.min(1, Math.min(width, height) / 500)); },
    bindPointer(host, {enabled, move, reset, surface = host}) {
      let activeId = null, direct = false, releaseTimer = 0;
      const controller = new AbortController();
      const passive = {passive:true, signal:controller.signal};
      const clear = () => {
        clearTimeout(releaseTimer); releaseTimer = 0;
        activeId = null; direct = false; reset();
      };
      const update = e => {
        if (!enabled()) return;
        const rect = direct ? surface.getBoundingClientRect() : {left:0, top:0, width:innerWidth, height:innerHeight};
        const clamp = value => Math.max(-.5, Math.min(.5, value));
        move({x:e.clientX, y:e.clientY}, {
          x:clamp((e.clientX - rect.left) / Math.max(rect.width, 1) - .5),
          y:clamp((e.clientY - rect.top) / Math.max(rect.height, 1) - .5)
        });
      };
      host.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse') return;
        // Nested controls keep their own taps. A facility tab is itself the
        // host, so its drawing and normal tab click both work.
        const control = e.target.closest('a, button, input, select, textarea, [role="button"]');
        if (control && control !== host) return;
        if (!enabled() || e.isPrimary === false) { clear(); return; }
        clearTimeout(releaseTimer); releaseTimer = 0;
        activeId = e.pointerId; direct = true; update(e);
      }, passive);
      window.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch' || e.pointerType === 'pen') {
          if (e.pointerId === activeId) update(e);
        } else if (activeId === null) {
          clearTimeout(releaseTimer); releaseTimer = 0;
          direct = false; update(e);
        }
      }, passive);
      window.addEventListener('pointerup', e => {
        if (e.pointerId !== activeId) return;
        update(e); activeId = null;
        // Keep a quick tap visible, then let the existing springs settle.
        releaseTimer = setTimeout(clear, 650);
      }, passive);
      window.addEventListener('pointercancel', e => { if (e.pointerId === activeId) clear(); }, passive);
      // Preserve native scrolling and pinch zoom, without leaving a touch point
      // attached to the viewport when the page starts moving.
      window.addEventListener('scroll', () => { if (direct) clear(); }, passive);
      window.addEventListener('blur', clear, passive);
      document.documentElement.addEventListener('pointerleave', () => { if (!direct) clear(); }, passive);
      document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); }, passive);
      return {reset:clear, dispose:() => { controller.abort(); clearTimeout(releaseTimer); }};
    },
    advance(point, x, y, pointer, dt, scale = 1, intensity = 1) {
      let tx = 0, ty = 0;
      if (pointer) {
        const dx = x - pointer.x, dy = y - pointer.y, distance = Math.hypot(dx, dy);
        const reach = radius * scale;
        if (distance < reach) {
          const force = strength * scale * intensity * Math.pow(1 - distance / reach, 2);
          tx = dx / Math.max(distance, 1) * force;
          ty = dy / Math.max(distance, 1) * force;
        }
      }
      const ease = 1 - Math.exp(-dt / ((tx || ty) ? pushTime : returnTime));
      point.dx += (tx - point.dx) * ease;
      point.dy += (ty - point.dy) * ease;
      const moving = Math.abs(tx - point.dx) + Math.abs(ty - point.dy) > .015;
      if (!moving) { point.dx = tx; point.dy = ty; }
      return moving;
    }
  });
