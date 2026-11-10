/* Original Austin Fund letter silhouette, with a restrained spatial response. */
import { letterMotion } from './letter-motion';

/** @param {HTMLElement} host */
export function mountCapitol(host) {
  const canvas = host.querySelector('canvas'), ctx = canvas.getContext('2d');
  if (!ctx) return;
  const controller = new AbortController();
  const options = {signal:controller.signal};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const letters = 'AustinFundUniversityofAustinFoundersIdeasResearchEngineeringBuildTheFuture';
  let glyphs=[], width=1, height=1, dpr=1, frame=0, visible=false, last=0;
  const rest={yaw:0,pitch:0};
  let yaw=rest.yaw, pitch=rest.pitch, target={...rest}, follow={...rest};
  let yawVelocity=0, pitchVelocity=0, hasEntered=false, pointer=null;
  let paused=reduced.matches;

  function draw(dt=0) {
    if (!glyphs.length) return;
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,width,height);
    // Keep the original background's footprint, gray ink, and lower-edge fade.
    const scale=Math.min(width*.98/500,height*.98/500);
    const cy=Math.cos(yaw), sy=Math.sin(yaw), cp=Math.cos(pitch), sp=Math.sin(pitch);
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.font=`400 ${Math.min(9.6,Math.max(5.7,5.8*scale+1.6))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.fillStyle='#b8b8b8';
    const rect=host.getBoundingClientRect();
    const local=pointer&&!reduced.matches&&!paused?{x:pointer.x-rect.left,y:pointer.y-rect.top}:null;
    const motionScale=letterMotion.scaleFor(width,height);
    let lettersMoving=false;
    const projected=glyphs.map(g=>{
      const xx=g.x*cy+g.z*sy, zz=-g.x*sy+g.z*cy;
      const yy=g.y*cp-zz*sp, depth=g.y*sp+zz*cp;
      return {g,xx,yy,depth};
    }).sort((a,b)=>a.depth-b.depth);
    for (const {g,xx,yy,depth} of projected) {
      const perspective=1400/(1400-depth);
      const x=width/2+xx*scale*perspective,y=height/2-yy*scale*perspective;
      const fadeT=Math.max(0,Math.min(1,(y-height*.55)/(height*.37)));
      const verticalFade=1-fadeT*fadeT*(3-2*fadeT);
      ctx.globalAlpha=g.fade*Math.max(.12,Math.min(.46,.34+depth/800))*verticalFade;
      if(letterMotion.advance(g,x,y,local,dt,motionScale,.25))lettersMoving=true;
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
  fetch('/assets/architecture/capitol.json', options).then(r=>{
    if(!r.ok)throw new Error('Drawing unavailable');return r.json();
  }).then(points=>{
    if (controller.signal.aborted) return;
    const unique=new Set();
    function add(x,y,z,fade=1){
      const key=[x,y,z].map(v=>Math.round(v/1.8)).join(':');
      if(unique.has(key))return;unique.add(key);
      glyphs.push({x:x-250,y:250-y,z,char:letters[glyphs.length%letters.length],fade,dx:0,dy:0});
    }
    function letterLine(a,b,fade=1,spacing=5){
      const steps=Math.ceil(Math.hypot(...a.map((v,i)=>b[i]-v))/spacing);
      for(let i=0;i<=steps;i++)add(...a.map((v,j)=>v+(b[j]-v)*i/Math.max(1,steps)),fade);
    }
    function ring(radius,y,fade=.8){
      const count=Math.ceil(2*Math.PI*radius/5);
      for(let i=0;i<count;i++){
        const a=i/count*Math.PI*2;
        add(250+radius*Math.cos(a),y,radius*Math.sin(a),fade);
      }
    }
    // The original elevation remains the visible front, with real separation
    // between the portico, wings, rear wall and projecting staircase.
    const domeProfile=points.filter(p=>p.stage===1&&p.x>=250).sort((a,b)=>a.y-b.y);
    function domeRadius(y){
      const hi=domeProfile.findIndex(p=>p.y>=y);
      if(hi<=0)return hi===0?domeProfile[0].x-250:50;
      const a=domeProfile[hi-1],b=domeProfile[hi],t=(y-a.y)/(b.y-a.y||1);
      return (a.x+(b.x-a.x)*t)-250;
    }
    for(const p of points){
      const x=p.x-250;
      let z=0;
      if(p.stage===1||p.stage===2){const r=domeRadius(p.y);z=Math.sqrt(Math.max(0,r*r-x*x));}
      else if(p.stage>=3&&p.stage<=4){z=Math.sqrt(Math.max(0,65*65-x*x));}
      else if(p.stage===5){z=Math.sqrt(Math.max(0,75*75-x*x));}
      else if(p.stage===6||p.stage===7){z=Math.abs(x)<76?86:42;}
      else if(p.stage===8){z=86+(p.y-370)*1.6;}
      add(p.x,p.y,z,Math.min(1,Math.max(.15,(439-p.y)/45)));
    }
    // Curved letter meridians wrap fully around the dome, not a second outline.
    for(let a=0;a<Math.PI*2;a+=Math.PI/6){
      for(let y=83;y<=180;y+=4.5){const r=domeRadius(y);add(250+r*Math.cos(a),y,r*Math.sin(a),.85);}
    }
    for(const y of [108,139,163,180])ring(domeRadius(y),y,.6);
    for(const y of [180,189,198])ring(65,y,.8);
    for(const y of [201,251,259])ring(57,y,.7);
    for(let a=0;a<Math.PI*2;a+=Math.PI/8){
      const x=250+57*Math.cos(a),z=57*Math.sin(a);
      letterLine([x,201,z],[x,256,z],.85);
    }
    // Rear elevation and outer walls are deliberately sparser than the front.
    for(let i=0;i<points.length;i+=2){
      const p=points[i];if(p.stage===6||p.stage===7)add(p.x,p.y,-72,.54);
    }
    for(const x of [0,500]){
      for(const y of [296,306,338,370,380])letterLine([x,y,42],[x,y,-72],.85);
      for(const z of [-72,-45,-16,13,42])letterLine([x,306,z],[x,370,z],.75);
    }
    // Roof edges and the central portico create a readable stepped plan.
    for(const [x1,x2] of [[0,175],[325,500]]){
      letterLine([x1,296,-72],[x2,296,-72],.7);
      for(const x of [x1,x2])letterLine([x,296,42],[x,296,-72],.8);
    }
    for(const x of [175,325]){
      for(const y of [270,281,370])letterLine([x,y,86],[x,y,-72],.8);
      letterLine([x,270,-72],[x,380,-72],.7);
    }
    for(const y of [270,281,370])letterLine([175,y,-72],[325,y,-72],.65);
    draw();schedule();
  }).catch(()=>{ /* Preserve the original letter SVG if the data cannot load. */ });
  return () => {
    controller.abort();
    input.dispose();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    stop();
  };
}
