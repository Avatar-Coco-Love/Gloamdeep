// § map: the floor the hero is on, from the tiles remembered (D-176, D-205)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { floorPlan, markAt, roomsFound, fitView, panView, zoomView, ZOOM_MAX, floorsShown, turnFrom, stairsNear, stairsIn, centreView, DEEPEST } from '../src/core/map.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';
import { remember } from '../src/core/fog.js';
import { layoutAt } from '../src/core/region.js';

const SEED = 7;

test('depth 1: the first room above the south room, the hero on their tile', () => {
  const p = floorPlan(makeWorld('first', SEED), true);
  assert.equal(p.depth, 1);
  assert.deepEqual(p.rooms.map((r) => [r.id, r.x, r.y]), [['first', 0, 0], ['south', 0, 13]]);
  assert.deepEqual([p.cols, p.rows], [11, 26]);
  assert.deepEqual(p.hero, { x: 5, y: 11 });
});

test('the hero in the south room is placed under the first room', () => {
  let s = makeWorld('first', SEED);
  s = step({ ...s, hero: { x: 5, y: 12 } }, 'down');
  assert.deepEqual(floorPlan(s).hero, { x: 5, y: 13 });
});

test('depth 3: every room of the L in its own cell, as the layout has them', () => {
  const s = goToDepth(makeWorld('first', SEED), 3), p = floorPlan(s, true), cells = layoutAt(SEED, 3).cells;
  assert.equal(p.rooms.length, 3);
  const x0 = Math.min(...cells.map((c) => c.x)), y0 = Math.min(...cells.map((c) => c.y));
  for (const c of cells) {
    const r = p.rooms.find((m) => m.id === c.id);
    assert.deepEqual([r.x, r.y], [(c.x - x0) * 17, (c.y - y0) * 20]);
  }
});

test('without reveal, a generated room never reached is left out', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 3));
  assert.deepEqual(p.rooms.map((r) => r.id), ['depth3']);
  assert.equal(p.cols, 34); // the floor's grid still sets the size
});

test('nothing shows until the lantern has reached it; then floors, walls beside them, and stairs', () => {
  const s = makeWorld('first', SEED), { room } = s;
  assert.equal(markAt(room, s.seen, 5, 11), null);
  const lit = remember(s, { x: 5 * 16 + 8, y: 11 * 16 + 8, r: 200 });
  assert.equal(markAt(room, lit.seen, 5, 11), 'floor');
  assert.equal(roomsFound(floorPlan(lit)), 1);
  assert.equal(roomsFound(floorPlan(s)), 0);
});

test('revealed: rock with no floor beside it stays dark, so rooms show as outlines', () => {
  const { room } = goToDepth(makeWorld('first', SEED), 3);
  let wall = 0, dark = 0;
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    const m = markAt(room, null, x, y);
    if (m === 'wall') wall++; if (m === null) dark++;
  }
  assert.ok(wall > 0 && dark > 0);
});

test('the stairs show as stairs', () => {
  const s = goToDepth(makeWorld('first', SEED), 3);
  assert.equal(markAt(s.room, null, s.hero.x, s.hero.y), 'stairs');
});

test('the map changes nothing: the memory is the same after a revealed plan', () => {
  const s = goToDepth(makeWorld('first', SEED), 3), seen = s.seen;
  floorPlan(s, true);
  assert.equal(s.seen, seen);
  assert.equal(Object.keys(s.elsewhere).some((id) => id.startsWith('depth3:')), false);
});

test('the view opens on the whole floor, centred, and zooms in whole pixels up to its limit', () => {
  const p = floorPlan(makeWorld('first', SEED), true), w = 152, h = 185;
  const v = fitView(p, w, h);
  assert.equal(v.k, 7); // 26 rows in 185 pixels
  assert.ok(p.rows * v.k <= h && p.cols * v.k <= w);
  assert.equal(v.x, -Math.floor((w - p.cols * 7) / 2));
  let z = v;
  for (let i = 0; i < 20; i++) z = zoomView(z, p, w, h, 1);
  assert.equal(z.k, ZOOM_MAX);
  assert.deepEqual(zoomView(v, p, w, h, -1), v); // no smaller than the whole floor
});

test('scrolling stops at the floor\'s edges', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 3), true), w = 152, h = 185;
  const z = zoomView(fitView(p, w, h), p, w, h, 6);
  assert.deepEqual([panView(z, p, w, h, -999, -999).x, panView(z, p, w, h, -999, -999).y], [0, 0]);
  const far = panView(z, p, w, h, 9999, 9999);
  assert.deepEqual([far.x, far.y], [p.cols * z.k - w, p.rows * z.k - h]);
});

test('zooming keeps the point under the finger in place', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 3), true), w = 152, h = 185;
  const v = panView(zoomView(fitView(p, w, h), p, w, h, 4), p, w, h, 40, 40), z = zoomView(v, p, w, h, 1, 60, 70);
  assert.ok(Math.abs((v.x + 60) / v.k - (z.x + 60) / z.k) < 0.2);
  assert.ok(Math.abs((v.y + 70) / v.k - (z.y + 70) / z.k) < 0.2);
});

// § turning (D-206): the map shows other floors seen; the hero stays put
test('floors shown: the hero\'s own and every floor with a tile remembered, or the surface to 99 with reveal', () => {
  let s = goToDepth(makeWorld('first', SEED), 3);
  s = goToDepth(remember(s, { x: 8, y: 8, r: 200 }), 9);
  assert.deepEqual(floorsShown(s), [3, 9]); // the first room was never lit
  assert.deepEqual(floorsShown(goToDepth(s, 1)), [1, 3]); // nor depth 9
  assert.deepEqual(floorsShown(goToDepth(remember(s, { x: 8, y: 8, r: 200 }), 1)), [1, 3, 9]);
  assert.deepEqual(floorsShown(s, true).slice(0, 2), [0, 1]); // the woods are depth 0 (D-209)
  assert.equal(floorsShown(s, true).length, DEEPEST + 1);
});

test('an arrow skips floors never seen, and is greyed out when nothing lies that way', () => {
  const floors = [1, 3, 9];
  assert.equal(turnFrom(floors, 3, 'down'), 9);
  assert.equal(turnFrom(floors, 3, 'up'), 1);
  assert.equal(turnFrom(floors, 1, 'up'), null);
  assert.equal(turnFrom(floors, 9, 'down'), null);
});

test('another floor shows from memory, with no hero dot', () => {
  const s = goToDepth(goToDepth(makeWorld('first', SEED), 3), 4), p = floorPlan(s, false, 3);
  assert.equal(p.depth, 3);
  assert.equal(p.hero, null);
  assert.deepEqual(p.rooms.map((r) => r.id), ['depth3']);
  assert.ok(floorPlan(s).hero);
});

test('a tap near found stairs down turns to the floor below, on the matching stairs up', () => {
  const s = goToDepth(makeWorld('first', SEED), 3), p = floorPlan(s, true), down = layoutAt(SEED, 3).down;
  const room = p.rooms.find((r) => r.id === (layoutAt(SEED, 3).cells.find((c) => c.down).id));
  const at = { x: room.x + down.x, y: room.y + down.y };
  assert.equal(stairsNear(p, at.x + 3, at.y, 1, SEED), null); // too far
  const near = stairsNear(p, at.x + 0.9, at.y + 0.2, 1, SEED);
  assert.deepEqual([near.depth, near.arrive], [4, 'stairsUp']);
  const below = floorPlan(s, true, 4), up = stairsIn(below, near.room, near.arrive), cell = below.rooms.find((r) => r.id === near.room);
  assert.deepEqual([up.x - cell.x, up.y - cell.y], [down.x, down.y]); // lined up (D-202)
});

test('centring a view puts the tile in the window\'s middle, inside the floor\'s edges', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 3), true), v = centreView(p, 40, 40, 4, 10, 10);
  assert.deepEqual(v, { k: 4, x: 10 * 4 + 2 - 20, y: 10 * 4 + 2 - 20 });
  assert.deepEqual(centreView(p, 40, 40, 4, 0, 0), { k: 4, x: 0, y: 0 });
});
