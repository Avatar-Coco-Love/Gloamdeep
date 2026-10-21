// § explorer: the Seed Explorer's seeds and its world (D-214)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mouthOf } from '../src/core/mouth.js';
import { startSeeds, shownSeed, addSeed, canGoBack, backSeed, explorerWorld } from '../src/core/explorer.js';
import { floorPlan, floorsShown, wholeSurface } from '../src/core/map.js';
import { makeWorld } from '../src/core/turn.js';

test('it opens on one seed, with nothing to go back to', () => {
  const s = startSeeds(48213);
  assert.equal(shownSeed(s), 48213);
  assert.equal(canGoBack(s), false);
  assert.deepEqual(backSeed(s), s);
});

test('Back steps through every seed shown, newest first', () => {
  let s = addSeed(addSeed(startSeeds(1), 2), 3);
  assert.equal(shownSeed(s), 3);
  s = backSeed(s); assert.equal(shownSeed(s), 2);
  s = backSeed(s); assert.equal(shownSeed(s), 1);
  assert.equal(canGoBack(s), false);
});

test('the seed already shown is not added twice', () => {
  const s = startSeeds(5);
  assert.equal(addSeed(s, 5), s);
});

test('its map shows the same rooms as the game\'s revealed map, with no hero', () => {
  for (const depth of [0, 1, 2, 7]) {
    const p = floorPlan(explorerWorld(7), true, depth), game = floorPlan(makeWorld('first', 7), true, depth);
    assert.deepEqual(p.rooms.map((r) => [r.id, r.x, r.y]), game.rooms.map((r) => [r.id, r.x, r.y]));
    assert.equal(p.hero, null);
  }
});

test('the whole surface: the woods and the crypt joined at the mouth, for each way it faces (D-216)', () => {
  const STEP = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }, ways = new Set();
  for (let seed = 1; seed <= 40; seed++) {
    const p = wholeSurface(explorerWorld(seed)), m = mouthOf(seed), at = (id) => p.rooms.find((r) => r.id === id);
    ways.add(m.dir);
    assert.deepEqual(p.rooms.map((r) => r.id).sort(), ['first', 'south', 'woods']);
    assert.equal(p.hero, null);
    const w = at('woods'), c = at(m.room);
    const [sx, sy] = STEP[m.dir]; // a seam tile apart, the doorway line on it (D-224)
    assert.deepEqual([w.x + m.tile.x + 2 * sx, w.y + m.tile.y + 2 * sy], [c.x + m.gap.x, c.y + m.gap.y]);
    assert.ok(p.doors.some((d) => d.x === w.x + m.tile.x + sx && d.y === w.y + m.tile.y + sy));
    // every room inside the map, none over another
    for (const r of p.rooms) assert.ok(r.x >= 0 && r.y >= 0 && r.x + r.room.cols <= p.cols && r.y + r.room.rows <= p.rows);
    assert.equal(Math.min(...p.rooms.map((r) => r.x)), 0);
    assert.equal(Math.min(...p.rooms.map((r) => r.y)), 0);
    const over = (a, b) => a.x < b.x + b.room.cols && b.x < a.x + a.room.cols && a.y < b.y + b.room.rows && b.y < a.y + a.room.rows;
    assert.ok(!over(w, at('first')) && !over(w, at('south')));
  }
  assert.equal(ways.size, 4);
});

test('every floor from the surface down can be turned to', () => {
  assert.deepEqual(floorsShown(null, true).slice(0, 3), [0, 1, 2]);
});
