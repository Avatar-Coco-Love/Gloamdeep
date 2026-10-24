// § more rats deeper: one rat a room, two from depth 5 (step 34, D-231)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom } from '../src/core/cave.js';
import { placeFor, ratsAt } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';

const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const where = (map, ch) => map.flatMap((row, y) => [...row].map((c, x) => (c === ch ? { x, y } : null))).filter(Boolean);

test('one rat a room at depths 2 to 4, two from depth 5', () => {
  assert.deepEqual([2, 3, 4, 5, 7, 8, 12].map(ratsAt), [1, 1, 1, 2, 2, 2, 2]);
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [2, 4, 5, 8]) for (const c of layoutAt(seed, depth).cells) {
    assert.equal(placeFor(c.id, seed).enemies.length, ratsAt(depth), `seed ${seed} ${c.id}`);
  }
});

test('the extra rat sits by the usual rules and leaves the rest of the room as it was', () => {
  for (const seed of SEEDS) for (const shape of ['chambers', 'burrows', 'halls']) {
    const one = generateRoom(seed, shape), two = generateRoom(seed, shape, { rats: 2 });
    assert.deepEqual(two.map, one.map);
    const before = (items) => items.filter((it) => it.id !== 'oilcap'); // the oilcap is picked after the rats (D-296)
    assert.deepEqual(before(two.items), before(one.items));
    assert.deepEqual(two.enemies[0], one.enemies[0]);
    const [rat, extra] = two.enemies, stairs = [...where(two.map, '<'), ...where(two.map, '>')];
    assert.ok(extra, `seed ${seed} ${shape}`);
    assert.equal(two.map[extra.y][extra.x], '.');
    assert.ok(stairs.every((s) => dist(extra, s) >= 3), `seed ${seed} ${shape} by the stairs`);
    assert.ok([rat, ...two.items].every((t) => dist(extra, t) > 0));
    assert.ok(two.lights.every((t) => dist(extra, t) >= 5), `seed ${seed} ${shape} by the torch`);
  }
});
