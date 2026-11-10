/* Shared projection, repulsion, and lifecycle for both architectural drawings. */
import { letterMotion } from './letter-motion';
import { letterStyle } from './letter-style';

/** @param {HTMLElement} host */
export function mountLetterModel(host, {
  loadGlyphs,
  baseWidth = 500,
  baseHeight = 500,
  fitHeight = .98,
  fadeStart = .55,
  fadeLength = .37,
  restYaw = 0,
  restPitch = 0,
}) {
  const canvas = host.querySelector('canvas'), ctx = canvas.getContext('2d');
  if (!ctx) return;
  const controller = new AbortController();
  const options = {signal:controller.signal};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let glyphs=[], width=1, height=1, dpr=1, frame=0, visible=false, last=0;
  const rest={yaw:restYaw,pitch:restPitch};
  let yaw=rest.yaw, pitch=rest.pitch, target={...rest}, follow={...rest};
  let yawVelocity=0, pitchVelocity=0, hasEntered=false, pointer=null;
  let paused=reduced.matches;

  function draw(dt=0) {
    if (!glyphs.length) return;
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,width,height);
    // Keep the original background's footprint, gray ink, and lower-edge fade.
    const scale=Math.min(width*.90/baseWidth,height*fitHeight/baseHeight);
    const cy=Math.cos(yaw), sy=Math.sin(yaw), cp=Math.cos(pitch), sp=Math.sin(pitch);
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.font=letterStyle.font(width);
    ctx.fillStyle=letterStyle.ink;
    const rect=host.getBoundingClientRect();
    const local=pointer&&!reduced.matches&&!paused?{x:(pointer.x-rect.left)*width/rect.width,y:(pointer.y-rect.top)*height/rect.height}:null;
    const motionScale=letterMotion.scaleFor(width,height);
    let lettersMoving=false;
    const projected=glyphs.map(g=>{
      const xx=g.x*cy+g.z*sy, zz=-g.x*sy+g.z*cy;
      const yy=g.y*cp-zz*sp, depth=g.y*sp+zz*cp;
      return {g,xx,yy,depth};
    }).sort((a,b)=>b.depth-a.depth);
    // Reserve screen space for each character. Without this, front and rear
    // surfaces overlap into a dense wireframe unlike the footer's open type.
    const occupied = new Map();
    // Irregular projected points need a smaller exclusion ellipse than a
    // regular grid's pitch; using the full pitch roughly halves its density.
    const column = letterStyle.column * .75;
    const row = (width <= 760 ? 8 : letterStyle.row) * .8;
    const reserve = (x, y) => {
      const cx = Math.floor(x / column), cy = Math.floor(y / row);
      for (let i = cx - 1; i <= cx + 1; i++) for (let j = cy - 1; j <= cy + 1; j++) {
        for (const point of occupied.get(`${i}:${j}`) || []) {
          if (((x - point.x) / column) ** 2 + ((y - point.y) / row) ** 2 < 1) return false;
        }
      }
      const key = `${cx}:${cy}`;
      if (!occupied.has(key)) occupied.set(key, []);
      occupied.get(key).push({x, y});
      return true;
    };
    for (const {g,xx,yy,depth} of projected) {
      const perspective=1400/(1400-depth);
      const x=width/2+xx*scale*perspective,y=height/2-yy*scale*perspective;
      if (!reserve(x,y)) { g.dx=0; g.dy=0; continue; }
      const fadeT=Math.max(0,Math.min(1,(y-height*fadeStart)/(height*fadeLength)));
      const verticalFade=1-fadeT*fadeT*(3-2*fadeT);
      ctx.globalAlpha=letterStyle.alpha(g.seed)*verticalFade;
      if(letterMotion.advance(g,x,y,local,dt,motionScale))lettersMoving=true;
      ctx.fillText(g.char,x+g.dx,y+g.dy);
    }
    ctx.globalAlpha=1;host.classList.add('model-ready');return lettersMoving;
  }
  function tick(time) {
    frame=0;
    if(!visible || document.hidden || paused || reduced.matches)return;
    const dt=last?Math.min((time-last)/1000,.05):1/60;last=time;
    const steps=Math.max(1,Math.ceil(dt*120)),h=dt/steps;
    // A short response lag feeds a damped spring, retaining momentum as the
    // pointer stops or reverses. Substeps keep the same feel at any frame rate.
    for(let i=0;i<steps;i++){
      const ease=1-Math.exp(-h/.20);
      follow.yaw+=(target.yaw-follow.yaw)*ease;
      follow.pitch+=(target.pitch-follow.pitch)*ease;
      yawVelocity+=(30*(follow.yaw-yaw)-11*yawVelocity)*h;
      pitchVelocity+=(30*(follow.pitch-pitch)-11*pitchVelocity)*h;
      yaw+=yawVelocity*h;pitch+=pitchVelocity*h;
    }
    const lettersMoving=draw(dt);
    const unsettled=Math.abs(target.yaw-yaw)+Math.abs(target.pitch-pitch)
      +Math.abs(target.yaw-follow.yaw)+Math.abs(target.pitch-follow.pitch)
      +Math.abs(yawVelocity)+Math.abs(pitchVelocity);
    if(unsettled>.00015||lettersMoving)frame=requestAnimationFrame(tick);
    else{yaw=target.yaw;pitch=target.pitch;follow={...target};yawVelocity=0;pitchVelocity=0;draw();}
  }
  function schedule(){if(!frame && glyphs.length && visible && !document.hidden && !paused && !reduced.matches){last=0;frame=requestAnimationFrame(tick);}}
  function stop(){cancelAnimationFrame(frame);frame=0;}
  const input=letterMotion.bindPointer(host.closest("section") || host,{
    surface:host,
    enabled:()=>visible&&!paused&&!reduced.matches&&hasEntered,
    move:(point,aim)=>{pointer=point;target={yaw:rest.yaw+aim.x*.24,pitch:rest.pitch+aim.y*.08};schedule();},
    reset:()=>{pointer=null;target={...rest};schedule();}
  });
  const resizeObserver = new ResizeObserver(()=>{
    width=host.clientWidth;height=host.clientHeight;dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);draw();
  });
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){hasEntered=true;schedule();}else{input.reset();stop();}},{threshold:.01});
  visibilityObserver.observe(host);
  window.addEventListener('scroll',()=>{if(pointer)schedule();},{...options,passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else schedule();},options);
  reduced.addEventListener('change',()=>{paused=reduced.matches;if(reduced.matches){input.reset();stop();target={...rest};yaw=rest.yaw;pitch=rest.pitch;follow={...rest};yawVelocity=0;pitchVelocity=0;pointer=null;for(const g of glyphs){g.dx=0;g.dy=0;}draw();}else schedule();},options);
  Promise.resolve().then(() => loadGlyphs(controller.signal)).then(points => {
    if (controller.signal.aborted) return;
    glyphs = points.map((point, seed) => ({...point, seed, char: letterStyle.alphabet[seed % letterStyle.alphabet.length]}));
    draw();schedule();
  }).catch(() => { /* The Capitol keeps its static fallback if loading fails. */ });
  return () => {
    controller.abort();
    input.dispose();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    stop();
  };
}
