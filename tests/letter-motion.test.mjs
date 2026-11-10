import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const source = await readFile(new URL('../src/components/effects/letter-motion.js', import.meta.url), 'utf8');
const {letterMotion} = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

function advanceFor(point, pointer, seconds, fps = 60) {
  for (let frame = 0; frame < seconds * fps; frame++) {
    letterMotion.advance(point, 20, 0, pointer, 1 / fps);
  }
}

test('letters visibly repel at the original strength and settle back precisely', () => {
  const point = {dx: 0, dy: 0};
  advanceFor(point, {x: 0, y: 0}, .5);
  assert.ok(point.dx > 9 && point.dx < 11, 'repulsion must not be attenuated to the previous quarter strength');
  assert.equal(point.dy, 0);
  advanceFor(point, null, 3);
  assert.deepEqual(point, {dx: 0, dy: 0});
});

test('repulsion has the same timing at 30 and 120 frames per second', () => {
  const slow = {dx: 0, dy: 0}, fast = {dx: 0, dy: 0};
  advanceFor(slow, {x: 0, y: 0}, .2, 30);
  advanceFor(fast, {x: 0, y: 0}, .2, 120);
  assert.ok(Math.abs(slow.dx - fast.dx) < .001);
});

test('outside the radius and reduced-size fields do not overreact', () => {
  const point = {dx: 0, dy: 0};
  letterMotion.advance(point, 200, 0, {x: 0, y: 0}, 1);
  assert.deepEqual(point, {dx: 0, dy: 0});
  assert.equal(letterMotion.scaleFor(250, 800), .5);
  assert.equal(letterMotion.scaleFor(1600, 900), 1);
});

test('touch follows local coordinates, respects links, releases on scroll, and cleans up', () => {
  const previous = new Map(['window','document','innerWidth','innerHeight'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const win = new EventTarget(), doc = new EventTarget(), root = new EventTarget();
  doc.documentElement = root;
  doc.hidden = false;
  Object.assign(globalThis, {window: win, document: doc, innerWidth: 1000, innerHeight: 800});
  const host = new EventTarget();
  let control = null;
  host.closest = () => control;
  host.getBoundingClientRect = () => ({left: 100, top: 200, width: 400, height: 300});
  const moves = [];
  let resets = 0;
  const input = letterMotion.bindPointer(host, {enabled: () => true, move: (point, aim) => moves.push({point, aim}), reset: () => resets++});
  const pointer = (target, type, props = {}) => {
    const event = new Event(type);
    Object.assign(event, {pointerType: 'touch', pointerId: 1, clientX: 300, clientY: 350, ...props});
    target.dispatchEvent(event);
  };
  try {
    pointer(host, 'pointerdown');
    assert.deepEqual(moves.at(-1), {point: {x: 300, y: 350}, aim: {x: 0, y: 0}});
    pointer(win, 'pointermove', {clientX: 400});
    assert.equal(moves.at(-1).aim.x, .25);
    const count = moves.length;
    win.dispatchEvent(new Event('scroll'));
    assert.equal(resets, 1);
    pointer(win, 'pointermove');
    assert.equal(moves.length, count, 'scroll releases the active touch');
    control = {};
    pointer(host, 'pointerdown');
    assert.equal(moves.length, count, 'a link tap must not activate the field');
    control = null;
    pointer(host, 'pointerdown');
    pointer(win, 'pointercancel');
    assert.equal(resets, 2);
    input.dispose();
    const finalCount = moves.length;
    pointer(host, 'pointerdown');
    pointer(win, 'pointermove', {pointerType: 'mouse'});
    win.dispatchEvent(new Event('blur'));
    assert.equal(moves.length, finalCount);
    assert.equal(resets, 2, 'unmounted fields must not retain input handlers');
  } finally {
    input.dispose();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
