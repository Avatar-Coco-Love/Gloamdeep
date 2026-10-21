// § map: the floor the hero is on, from the tiles remembered (D-176, D-205)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { floorPlan, wholeSurface, markAt, roomsFound, fitView, panView, zoomView, ZOOM_MAX, floorsShown, turnFrom, stairsNear, stairsIn, centreView, DEEPEST } from '../src/core/map.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToDepth, goToPlace } from '../src/core/stairs.js';
import { remember } from '../src/core/fog.js';
import { layoutAt } from '../src/core/region.js';
import { tileAt, areaAt } from '../src/core/room.js';

const SEED = 7;

test('depth 0: the crypt alone, the first room above the south room, the hero on their tile, until the woods are visited (D-222)', () => {
  const p = floorPlan(makeWorld('first', SEED));
  assert.equal(p.depth, 0);
  assert.deepEqual(p.rooms.map((r) => [r.id, r.x, r.y]), [['first', 0, 0], ['south', 0, 14]]); // a seam tile between them (D-224)
  assert.deepEqual([p.cols, p.rows], [11, 27]);
  assert.deepEqual(p.hero, { x: 5, y: 11 });
});

test('depth 0: the woods and the crypt joined as in the Explorer once both are visited, or with reveal (D-222)', () => {
  const s = makeWorld('first', SEED), whole = wholeSurface(s), at = (p, id) => p.rooms.find((r) => r.id === id);
  const shown = floorPlan(s, true);
  assert.deepEqual(shown.rooms.map((r) => [r.id, r.x, r.y]), whole.rooms.map((r) => [r.id, r.x, r.y]));
  assert.deepEqual(shown.hero, { x: at(whole, 'first').x + 5, y: at(whole, 'first').y + 11 });
  const out = goToPlace({ ...s, seen: s.seen.slice().fill(1) }, 'woods'), p = floorPlan(out);
  assert.ok(at(p, 'woods') && at(p, 'first') && p.rooms.every((r) => r.seen), 'from memory, not revealed');
  assert.deepEqual([at(p, 'woods').x, at(p, 'first').x, at(p, 'first').y], [at(whole, 'woods').x, at(whole, 'first').x, at(whole, 'first').y]);
  assert.deepEqual(p.hero, { x: at(p, 'woods').x + out.hero.x, y: at(p, 'woods').y + out.hero.y });
});

test('the hero in the south room is placed under the first room', () => {
  let s = makeWorld('first', SEED);
  s = step({ ...s, hero: { x: 5, y: 12 } }, 'down');
  assert.deepEqual(floorPlan(s).hero, { x: 5, y: 14 });
});

test('depth 2: every room of the L in its own cell, as the layout has them', () => {
  const s = goToDepth(makeWorld('first', SEED), 2), p = floorPlan(s, true), cells = layoutAt(SEED, 2).cells;
  assert.equal(p.rooms.length, 3);
  const x0 = Math.min(...cells.map((c) => c.x)), y0 = Math.min(...cells.map((c) => c.y));
  for (const c of cells) {
    const r = p.rooms.find((m) => m.id === c.id);
    assert.deepEqual([r.x, r.y], [(c.x - x0) * 18, (c.y - y0) * 21]);
  }
});

test('without reveal, a generated room never reached is left out', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 2));
  assert.deepEqual(p.rooms.map((r) => r.id), ['depth2']);
  assert.equal(p.cols, 35); // the floor's grid still sets the size
});

test('rooms side by side sit a seam tile apart, and a doorway found bridges its seam (D-224)', () => {
  const s = makeWorld('first', SEED);
  assert.deepEqual(floorPlan(s).doors, []); // nothing remembered yet
  const lit = remember(s, { x: 5 * 16 + 8, y: 12 * 16 + 8, r: 200 }), p = floorPlan(lit);
  assert.equal(p.doors.length, 1);
  const [d] = p.doors, first = p.rooms.find((r) => r.id === 'first');
  assert.equal(d.y, first.y + first.room.rows); // in the seam under the first room
  assert.ok(!tileAt(first.room, d.x - first.x, first.room.rows - 1).solid, 'over the doorway in its bottom wall');
  const shown = floorPlan(goToDepth(s, 2), true);
  assert.equal(shown.cols, 35);
  for (const { x, y } of shown.doors) assert.ok(!shown.rooms.some((r) => x >= r.x && y >= r.y && x < r.x + r.room.cols && y < r.y + r.room.rows), 'doors lie in seams');
  assert.ok(shown.doors.length >= 2, 'the L has two doorways');
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
  const { room } = goToDepth(makeWorld('first', SEED), 2);
  let wall = 0, dark = 0;
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    const m = markAt(room, null, x, y);
    if (m === 'wall') wall++; if (m === null) dark++;
  }
  assert.ok(wall > 0 && dark > 0);
});

test('the stairs show as stairs', () => {
  const s = goToDepth(makeWorld('first', SEED), 2);
  assert.equal(markAt(s.room, null, s.hero.x, s.hero.y), 'stairs');
});

test('the map changes nothing: the memory is the same after a revealed plan', () => {
  const s = goToDepth(makeWorld('first', SEED), 2), seen = s.seen;
  floorPlan(s, true);
  assert.equal(s.seen, seen);
  assert.equal(Object.keys(s.elsewhere).some((id) => id.startsWith('depth2:')), false);
});

test('the view opens on the whole floor, centred, and zooms in whole pixels up to its limit', () => {
  const p = floorPlan(makeWorld('first', SEED)), w = 152, h = 185;
  const v = fitView(p, w, h);
  assert.equal(v.k, 6); // 27 rows in 185 pixels
  assert.ok(p.rows * v.k <= h && p.cols * v.k <= w);
  assert.equal(v.x, -Math.floor((w - p.cols * 6) / 2));
  let z = v;
  for (let i = 0; i < 20; i++) z = zoomView(z, p, w, h, 1);
  assert.equal(z.k, ZOOM_MAX);
  assert.deepEqual(zoomView(v, p, w, h, -1), v); // no smaller than the whole floor
});

test('scrolling stops at the floor\'s edges', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 2), true), w = 152, h = 185;
  const z = zoomView(fitView(p, w, h), p, w, h, 6);
  assert.deepEqual([panView(z, p, w, h, -999, -999).x, panView(z, p, w, h, -999, -999).y], [0, 0]);
  const far = panView(z, p, w, h, 9999, 9999);
  assert.deepEqual([far.x, far.y], [p.cols * z.k - w, p.rows * z.k - h]);
});

test('zooming keeps the point under the finger in place', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 2), true), w = 152, h = 185;
  const v = panView(zoomView(fitView(p, w, h), p, w, h, 4), p, w, h, 40, 40), z = zoomView(v, p, w, h, 1, 60, 70);
  assert.ok(Math.abs((v.x + 60) / v.k - (z.x + 60) / z.k) < 0.2);
  assert.ok(Math.abs((v.y + 70) / v.k - (z.y + 70) / z.k) < 0.2);
});

// § turning (D-206): the map shows other floors seen; the hero stays put
test('floors shown: the hero\'s own and every floor with a tile remembered, or the surface to 99 with reveal', () => {
  let s = goToDepth(makeWorld('first', SEED), 2);
  s = goToDepth(remember(s, { x: 8, y: 8, r: 200 }), 8);
  assert.deepEqual(floorsShown(s), [2, 8]); // the first room was never lit
  assert.deepEqual(floorsShown(goToDepth(s, 0)), [0, 2]); // nor depth 8
  assert.deepEqual(floorsShown(goToDepth(remember(s, { x: 8, y: 8, r: 200 }), 0)), [0, 2, 8]);
  assert.deepEqual(floorsShown(s, true).slice(0, 2), [0, 1]); // the crypt and woods are depth 0 (D-212)
  assert.equal(floorsShown(s, true).length, DEEPEST + 1);
});

test('an arrow skips floors never seen, and is greyed out when nothing lies that way', () => {
  const floors = [0, 2, 8];
  assert.equal(turnFrom(floors, 2, 'down'), 8);
  assert.equal(turnFrom(floors, 2, 'up'), 0);
  assert.equal(turnFrom(floors, 0, 'up'), null);
  assert.equal(turnFrom(floors, 8, 'down'), null);
});

test('another floor shows from memory, with no hero dot', () => {
  const s = goToDepth(goToDepth(makeWorld('first', SEED), 2), 3), p = floorPlan(s, false, 2);
  assert.equal(p.depth, 2);
  assert.equal(p.hero, null);
  assert.deepEqual(p.rooms.map((r) => r.id), ['depth2']);
  assert.ok(floorPlan(s).hero);
});

test('a tap near found stairs down turns to the floor below, on the matching stairs up', () => {
  const s = goToDepth(makeWorld('first', SEED), 2), p = floorPlan(s, true), down = layoutAt(SEED, 2).down;
  const room = p.rooms.find((r) => r.id === (layoutAt(SEED, 2).cells.find((c) => c.down).id));
  const at = { x: room.x + down.x, y: room.y + down.y };
  assert.equal(stairsNear(p, at.x + 3, at.y, 1, SEED), null); // too far
  const near = stairsNear(p, at.x + 0.9, at.y + 0.2, 1, SEED);
  assert.deepEqual([near.depth, near.arrive], [3, 'stairsUp']);
  const below = floorPlan(s, true, 3), up = stairsIn(below, near.room, near.arrive), cell = below.rooms.find((r) => r.id === near.room);
  assert.deepEqual([up.x - cell.x, up.y - cell.y], [down.x, down.y]); // lined up (D-202)
});

test('centring a view puts the tile in the window\'s middle, inside the floor\'s edges', () => {
  const p = floorPlan(goToDepth(makeWorld('first', SEED), 2), true), v = centreView(p, 40, 40, 4, 10, 10);
  assert.deepEqual(v, { k: 4, x: 10 * 4 + 2 - 20, y: 10 * 4 + 2 - 20 });
  assert.deepEqual(centreView(p, 40, 40, 4, 0, 0), { k: 4, x: 0, y: 0 });
});

test('each floor below the surface names its area beside its depth (D-233)', () => {
  assert.equal(areaAt(0), null); // the surface: woods and crypt together
  assert.deepEqual([1, 2, 4, 5, 7, 8, 40].map((d) => areaAt(d).area), ['CRYPT', 'CAVE', 'CAVE', 'WARREN', 'WARREN', 'DUNGEON', 'DUNGEON']);
  assert.deepEqual([1, 3, 6, 9].map((d) => areaAt(d).look), ['crypt', 'rock', 'earth', 'dungeon']);
});
