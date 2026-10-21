// § dungeon: from depth 8 each floor is six halls in a 3 × 3 grid with one
// loop, in the crypt's bricks (D-228)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom } from '../src/core/cave.js';
import { layoutAt } from '../src/core/region.js';
import { kindAt, placeFor, placeBeside } from '../src/core/room.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const count = (map, ch) => map.join('').split(ch).length - 1;

test('from depth 8 every depth is dungeon halls in the crypt look', () => {
  assert.deepEqual([8, 9, 40].map((d) => kindAt(d)), Array(3).fill({ from: 8, shape: 'halls', look: 'crypt' }));
  assert.equal(kindAt(7).shape, 'burrows');
  assert.equal(placeFor('depth8', 4127).look, 'crypt');
});

// The rooms reachable from `start` through the openings, with how many joins away each is
function away(cells, start) {
  const out = new Map([[start.id, 0]]), todo = [start];
  while (todo.length) {
    const c = todo.shift();
    for (const id of Object.values(c.sides)) if (!out.has(id)) { out.set(id, out.get(c.id) + 1); todo.push(cells.find((x) => x.id === id)); }
  }
  return out;
}

test('a dungeon floor is 6 rooms in a 3 × 3 grid, joined with one loop, the stairs down farthest', () => {
  for (const seed of SEEDS) for (const depth of [8, 9, 12]) {
    const { cells } = layoutAt(seed, depth), up = cells.find((c) => c.up), down = cells.find((c) => c.down);
    assert.equal(cells.length, 6);
    assert.ok(cells.every((c) => c.x >= 0 && c.y >= 0 && c.x < 3 && c.y < 3));
    assert.equal(new Set(cells.map((c) => `${c.x},${c.y}`)).size, 6);
    assert.equal(cells.reduce((n, c) => n + c.doors.length, 0), 12); // six joins, both sides: one loop
    const steps = away(cells, up);
    assert.equal(steps.size, 6, `seed ${seed} depth ${depth}: every room reached`);
    assert.equal(steps.get(down.id), Math.max(...steps.values()));
    assert.equal(up.id, `depth${depth}`);
  }
});

test('every dungeon room is made, not the fallback, and the stairs line up from the warrens', () => {
  const where = (map, ch) => { const y = map.findIndex((row) => row.includes(ch)); return { x: map[y].indexOf(ch), y }; };
  for (const seed of SEEDS.slice(0, 20)) {
    for (const depth of [8, 9]) for (const c of layoutAt(seed, depth).cells) {
      const p = placeFor(c.id, seed);
      assert.equal(p.map.length, 20, `seed ${seed} ${c.id}`);
      assert.equal(count(p.map, '<'), c.up ? 1 : 0);
      assert.equal(count(p.map, '>'), c.down ? 1 : 0);
      assert.deepEqual(p.enemies.map((e) => e.id), ['rat']);
    }
    const above = layoutAt(seed, 7).cells.find((c) => c.down), up = layoutAt(seed, 8).cells.find((c) => c.up);
    assert.deepEqual({ x: up.x, y: up.y }, { x: above.x, y: above.y });
    assert.deepEqual(where(placeFor(up.id, seed).map, '<'), where(placeFor(above.id, seed).map, '>'));
    assert.equal(placeBeside(up.id, 'up', seed), above.id);
  }
});

test('halls: every seed gives one, the same each time, with the usual contents', () => {
  for (let seed = 1; seed <= 300; seed++) {
    const h = generateRoom(seed, 'halls');
    assert.ok(h, `seed ${seed}`);
    assert.deepEqual(h, generateRoom(seed, 'halls'));
    assert.equal(count(h.map, '<'), 1);
    assert.equal(count(h.map, '>'), 1);
    assert.ok(count(h.map, '.') + 2 >= 107, `seed ${seed} is too small`);
    assert.equal(h.lights.length, 1);
  }
});
