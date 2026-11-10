import { mountLetterModel } from './letter-model';

/** @param {HTMLElement} host */
export function mountCapitol(host) {
  return mountLetterModel(host, {loadGlyphs: async signal => {
    const response = await fetch('/assets/architecture/capitol.json', {signal});
    if (!response.ok) throw new Error('Drawing unavailable');
    const points = await response.json();
    const glyphs = [];
    const letters = 'AustinFundUniversityofAustinFoundersIdeasResearchEngineeringBuildTheFuture';
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
    return glyphs;
  }});
}
