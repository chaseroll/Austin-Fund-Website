import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
let rendererSource = await readFile(new URL('../src/components/effects/letter-model.js', import.meta.url), 'utf8');
for (const name of ['letter-motion', 'letter-style']) {
  const source = await readFile(new URL(`../src/components/effects/${name}.js`, import.meta.url), 'utf8');
  rendererSource = rendererSource.replace(`'./${name}'`, JSON.stringify(moduleUrl(source)));
}
const {mountLetterModel} = await import(moduleUrl(rendererSource));

test('a rotating model retains every character and moves continuously; reduced motion and disposal stop it', async () => {
  const keys = ['window','document','innerWidth','innerHeight','devicePixelRatio','matchMedia','ResizeObserver','IntersectionObserver','requestAnimationFrame','cancelAnimationFrame'];
  const previous = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const win = new EventTarget(), doc = new EventTarget(), host = new EventTarget(), media = new EventTarget();
  doc.documentElement = new EventTarget();
  doc.hidden = false;
  media.matches = false;
  let rendered = [], frameId = 0, time = 0;
  const queue = new Map();
  const context = {
    setTransform() {},
    clearRect() { rendered = []; },
    fillText(char, x, y) { rendered.push({char, x, y}); },
  };
  const canvas = {getContext: () => context};
  host.querySelector = () => canvas;
  host.closest = () => null;
  host.classList = {add() {}};
  host.clientWidth = 1000;
  host.clientHeight = 700;
  host.getBoundingClientRect = () => ({left: 0, top: 0, width: 1000, height: 700});
  const observers = [];
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() { this.callback([{isIntersecting: true}]); }
    disconnect() { this.disconnected = true; }
  }
  Object.assign(globalThis, {
    window: win, document: doc, innerWidth: 1000, innerHeight: 700, devicePixelRatio: 2,
    matchMedia: () => media, ResizeObserver: Observer, IntersectionObserver: Observer,
    requestAnimationFrame: callback => { const id = ++frameId; queue.set(id, callback); return id; },
    cancelAnimationFrame: id => queue.delete(id),
  });
  const step = () => {
    time += 1000 / 60;
    const callbacks = [...queue.values()]; queue.clear();
    for (const callback of callbacks) callback(time);
  };
  const pointer = (x, y) => {
    const event = new Event('pointermove');
    Object.assign(event, {pointerType: 'mouse', clientX: x, clientY: y});
    win.dispatchEvent(event);
  };
  let dispose;
  try {
    const points = [];
    for (let x = -180; x <= 180; x += 6) for (let y = -180; y <= 180; y += 6) {
      points.push({x, y, z: 40 * Math.cos(x / 60), fade: 1, dx: 0, dy: 0});
    }
    dispose = mountLetterModel(host, {loadGlyphs: () => points});
    await new Promise(resolve => setImmediate(resolve));
    step();
    const initial = rendered.map(point => ({...point}));
    const identities = initial.map(point => point.char).join('');
    assert.ok(initial.length > 500);
    let maxStep = 0;
    let prior = initial;
    for (let frame = 0; frame < 180; frame++) {
      if (frame % 30 === 0) pointer(frame % 60 ? 980 : 20, frame % 60 ? 100 : 600);
      step();
      assert.equal(rendered.map(point => point.char).join(''), identities, 'rotation must not choose a new set of letters');
      for (let i = 0; i < rendered.length; i++) maxStep = Math.max(maxStep, Math.hypot(rendered[i].x - prior[i].x, rendered[i].y - prior[i].y));
      prior = rendered.map(point => ({...point}));
    }
    assert.ok(maxStep > .01 && maxStep < 3, `expected continuous movement, got ${maxStep}px per frame`);
    media.matches = true;
    media.dispatchEvent(new Event('change'));
    assert.equal(queue.size, 0);
    assert.deepEqual(rendered, initial, 'reduced motion restores the undisturbed drawing');
    pointer(500, 350);
    assert.equal(queue.size, 0);
    dispose();
    assert.ok(observers.every(observer => observer.disconnected));
    assert.equal(queue.size, 0);
    media.matches = false;
    pointer(900, 200);
    assert.equal(queue.size, 0, 'a disposed model must not restart');
  } finally {
    dispose?.();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
