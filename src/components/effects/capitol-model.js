import { mountLetterModel } from './letter-model';

/** @param {HTMLElement} host */
export function mountCapitol(host) {
  return mountLetterModel(host, {
    resamplePaths: true,
    fadeStart: .8,
    fadeLength: .18,
    loadGlyphs: async signal => {
      const response = await fetch('/assets/architecture/capitol.json', {signal});
      if (!response.ok) throw new Error('Drawing unavailable');
      const points = await response.json();
      const profile = points.filter(p => p.stage === 1 && p.x >= 250).sort((a,b) => a.y-b.y);
      function domeRadius(y) {
        const hi = profile.findIndex(p => p.y >= y);
        if (hi <= 0) return hi === 0 ? profile[0].x-250 : 50;
        const a=profile[hi-1], b=profile[hi], t=(y-a.y)/(b.y-a.y || 1);
        return a.x+(b.x-a.x)*t-250;
      }
      const glyphs = [];
      let path = -1, previous = null;
      // Preserve the original architectural strokes. A front-facing shell
      // avoids drawing the rear elevation through the visible facade.
      for (const p of points) {
        if (!previous || p.stage !== previous.stage || Math.hypot(p.x-previous.x,p.y-previous.y)>9) path++;
        const x=p.x-250;
        let z=0;
        if (p.stage===1 || p.stage===2) {
          const r=domeRadius(p.y);
          z=Math.sqrt(Math.max(0,r*r-x*x));
        } else if (p.stage===3 || p.stage===4) z=Math.sqrt(Math.max(0,65*65-x*x));
        else if (p.stage===5) z=Math.sqrt(Math.max(0,75*75-x*x));
        else if (p.stage===6 || p.stage===7) z=Math.abs(x)<76 ? 86 : 42;
        else if (p.stage===8) z=86+(p.y-370)*1.6;
        glyphs.push({x,y:250-p.y,z,path,dx:0,dy:0});
        previous=p;
      }
      // Only the visible dome ribs; no rear rings layered over the front.
      for (const angle of [-Math.PI/6, 0, Math.PI/6]) {
        path++;
        for (let y=84;y<=180;y+=2) {
          const r=domeRadius(y);
          glyphs.push({x:r*Math.sin(angle),y:250-y,z:r*Math.cos(angle),path,dx:0,dy:0});
        }
      }
      return glyphs;
    },
  });
}
