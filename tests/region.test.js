// § region: depth 3 as a 2 × 2 grid of rooms joined by openings (D-201)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { layoutAt } from '../src/core/region.js';
import { placeFor, tileAt, depthOf } from '../src/core/room.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const EDGE = { up: (at) => ({ x: at, y: 0 }), down: (at) => ({ x: at, y: 19 }), left: (at) => ({ x: 0, y: at }), right: (at) => ({ x: 16, y: at }) };
const BACK = { up: 'down', down: 'up', left: 'right', right: 'left' };

test('depth 3 is three cells of a 2 × 2 grid in an L, one empty; other depths are one room', () => {
  const empties = new Set();
  for (const seed of SEEDS) {
    const { cells } = layoutAt(seed, 3);
    assert.equal(cells.length, 3);
    empties.add([0, 1, 2, 3].find((i) => !cells.some((c) => c.y * 2 + c.x === i)));
    assert.equal(cells.filter((c) => c.stairs).length, 1);
    assert.equal(cells.find((c) => c.stairs).id, 'depth3');
    assert.equal(cells.reduce((n, c) => n + c.doors.length, 0), 4); // two joins, both sides
  }
  assert.equal(empties.size, 4);
  assert.equal(layoutAt(1, 4), null);
});

test('every opening is open on both sides, at the same spot', () => {
  for (const seed of SEEDS) for (const c of layoutAt(seed, 3).cells) {
    const room = placeFor(c.id, seed);
    assert.equal(depthOf(c.id), 3);
    for (const d of c.doors) {
      const p = EDGE[d.dir](d.at), there = placeFor(c.sides[d.dir], seed), q = EDGE[BACK[d.dir]](d.at);
      assert.equal(room.map[p.y][p.x], '.', `seed ${seed} ${c.id} ${d.dir}`);
      assert.equal(there.map[q.y][q.x], '.');
    }
  }
});

test('only the stairs room has stairs and a torch; each room has a flask, a rat and a herb', () => {
  for (const seed of SEEDS) for (const c of layoutAt(seed, 3).cells) {
    const p = placeFor(c.id, seed), all = p.map.join('');
    assert.equal(all.includes('<') && all.includes('>'), c.stairs);
    assert.equal(p.lights.length, c.stairs ? 1 : 0);
    assert.deepEqual(p.items.map((it) => it.id), ['flask', 'herb']);
    assert.deepEqual(p.enemies.map((e) => e.id), ['rat']);
  }
});

test('walking out through an opening and back: the room beyond, then the same room as left', () => {
  const s = goToDepth(makeWorld(), 3), c = layoutAt(s.seed, 3).cells.find((x) => x.stairs), d = c.doors[0];
  const at = EDGE[d.dir](d.at), n = step({ ...s, hero: at, enemies: [] }, d.dir);
  assert.equal(n.place, c.sides[d.dir]);
  assert.deepEqual(n.hero, EDGE[BACK[d.dir]](d.at));
  assert.equal(tileAt(n.room, n.hero.x, n.hero.y).id, 'floor');
  const back = step({ ...n, enemies: [] }, BACK[d.dir]);
  assert.equal(back.place, 'depth3');
  assert.deepEqual(back.hero, at);
  assert.equal(back.turn, 2);
});
