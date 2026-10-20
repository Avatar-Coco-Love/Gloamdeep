// § map: the floor the hero is on, from the tiles remembered (D-176, D-205)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { floorPlan, markAt, roomsFound } from '../src/core/map.js';
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
