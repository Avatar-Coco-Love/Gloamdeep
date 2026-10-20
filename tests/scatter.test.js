// § scatter: the hand-made rooms' items and rats placed by the seed (D-192)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, PLACES, makeRoom, tileAt } from '../src/core/room.js';

const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const stairsOf = (map) => map.flatMap((row, y) => [...row].flatMap((ch, x) => ('<>'.includes(ch) ? [{ x, y }] : [])));

test('the same seed places the same; different seeds place differently', () => {
  assert.deepEqual(placeFor('first', 4071), placeFor('first', 4071));
  for (const id of ['first', 'second']) {
    const spots = new Set();
    for (let seed = 1; seed <= 50; seed++) { const p = placeFor(id, seed); spots.add(JSON.stringify([p.items, p.enemies])); }
    assert.ok(spots.size > 30, `${id}: ${spots.size} different layouts in 50 seeds`);
  }
});

test('for every seed: items and rats on open floor, apart, the rat 3 tiles off the start and stairs', () => {
  for (const id of ['first', 'second']) {
    const plan = PLACES[id], room = makeRoom(plan.map), stairs = stairsOf(plan.map);
    for (let seed = 1; seed <= 2000; seed++) {
      const p = placeFor(id, seed), all = [...p.items, ...p.enemies];
      assert.equal(p.map, plan.map); // the shape stays as drawn
      for (const t of all) assert.equal(tileAt(room, t.x, t.y).id, 'floor');
      assert.equal(new Set(all.map((t) => t.x + ',' + t.y).concat(p.start.x + ',' + p.start.y)).size, all.length + 1);
      for (const e of p.enemies) for (const s of [p.start, ...stairs]) assert.ok(dist(e, s) >= 3);
      if (plan.guard) assert.ok(dist(p.enemies[0], p.items[0]) <= 2, 'the second room\'s rat guards its flask');
    }
  }
});
