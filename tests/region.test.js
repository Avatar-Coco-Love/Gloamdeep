// § region: depths 2 to 4 as 2 × 2 grids of rooms joined by openings (D-201),
// their stairs lined up floor to floor (D-202, D-203)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { layoutAt } from '../src/core/region.js';
import { seedFor } from '../src/core/rng.js';
import { placeFor, placeBeside, tileAt, depthOf } from '../src/core/room.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const EDGE = { up: (at) => ({ x: at, y: 0 }), down: (at) => ({ x: at, y: 19 }), left: (at) => ({ x: 0, y: at }), right: (at) => ({ x: 16, y: at }) };
const BACK = { up: 'down', down: 'up', left: 'right', right: 'left' };

test('depths 2 to 4 are three cells of a 2 × 2 grid in an L, one empty; deeper depths are one room', () => {
  for (const depth of [2, 3, 4]) {
    const empties = new Set();
    for (const seed of SEEDS) {
      const { cells } = layoutAt(seed, depth);
      assert.equal(cells.length, 3);
      empties.add([0, 1, 2, 3].find((i) => !cells.some((c) => c.y * 2 + c.x === i)));
      assert.equal(cells.filter((c) => c.up).length, 1);
      assert.equal(cells.filter((c) => c.down).length, 1);
      assert.equal(cells.find((c) => c.up).id, `depth${depth}`);
      assert.notEqual(cells.find((c) => c.up), cells.find((c) => c.down)); // another room (D-203)
      assert.equal(cells.reduce((n, c) => n + c.doors.length, 0), 4); // two joins, both sides
    }
    assert.equal(empties.size, 4);
  }
  assert.equal(layoutAt(1, 5).cells.length, 1);
  assert.equal(layoutAt(1, 1), null);
});

test('stairs down lead to stairs up in the same cell, at the same tile, one floor down', () => {
  const where = (map, ch) => { const y = map.findIndex((row) => row.includes(ch)); return { x: map[y].indexOf(ch), y }; };
  for (const seed of SEEDS.slice(0, 20)) {
    let above = where(placeFor('second', seed).map, '>'), cell = null;
    for (let depth = 2; depth <= 7; depth++) {
      const L = layoutAt(seed, depth), up = L.cells.find((c) => c.up), down = L.cells.find((c) => c.down);
      assert.deepEqual(where(placeFor(up.id, seed).map, '<'), above, `seed ${seed} depth ${depth}`);
      if (cell) assert.deepEqual({ x: up.x, y: up.y }, cell);
      above = where(placeFor(down.id, seed).map, '>'); cell = { x: down.x, y: down.y };
      assert.equal(placeBeside(up.id, 'up', seed), depth === 2 ? 'second' : layoutAt(seed, depth - 1).cells.find((c) => c.down).id);
      assert.equal(placeBeside(down.id, 'down', seed), `depth${depth + 1}`);
    }
  }
});

test('every opening is open on both sides, at the same spot', () => {
  for (const seed of SEEDS) for (const c of layoutAt(seed, 2).cells) {
    const room = placeFor(c.id, seed);
    assert.equal(depthOf(c.id), 2);
    for (const d of c.doors) {
      const p = EDGE[d.dir](d.at), there = placeFor(c.sides[d.dir], seed), q = EDGE[BACK[d.dir]](d.at);
      assert.equal(room.map[p.y][p.x], '.', `seed ${seed} ${c.id} ${d.dir}`);
      assert.equal(there.map[q.y][q.x], '.');
    }
  }
});

test('stairs up and their torch, and stairs down, each in one room; each room has a flask, a rat and a herb', () => {
  for (const seed of SEEDS) for (const c of layoutAt(seed, 2).cells) {
    const p = placeFor(c.id, seed), all = p.map.join('');
    assert.equal(all.includes('<'), !!c.up);
    assert.equal(all.includes('>'), !!c.down);
    assert.equal(p.lights.length, c.up ? 1 : 0);
    assert.deepEqual(p.items.map((it) => it.id), ['flask', 'herb']);
    assert.deepEqual(p.enemies.map((e) => e.id), ['rat']);
  }
});

test('walking out through an opening and back: the room beyond, then the same room as left', () => {
  const s = goToDepth(makeWorld(), 2), c = layoutAt(s.seed, 2).cells.find((x) => x.up), d = c.doors[0];
  const at = EDGE[d.dir](d.at), n = step({ ...s, hero: at, enemies: [] }, d.dir);
  assert.equal(n.place, c.sides[d.dir]);
  assert.deepEqual(n.hero, EDGE[BACK[d.dir]](d.at));
  assert.equal(tileAt(n.room, n.hero.x, n.hero.y).id, 'floor');
  const back = step({ ...n, enemies: [] }, BACK[d.dir]);
  assert.equal(back.place, 'depth2');
  assert.deepEqual(back.hero, at);
  assert.equal(back.turn, 2);
});

test('a seed keeps its rooms as the depths move up one: each takes its old depth\'s numbers (D-213)', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [2, 3, 7]) {
    assert.equal(layoutAt(seed, depth).cells.find((c) => c.up).seed, seedFor(seed, depth + 1));
  }
});
