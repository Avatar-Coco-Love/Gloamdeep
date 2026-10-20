// § woods: the first outside room (step 48, D-209)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateWoods } from '../src/core/woods.js';
import { COLS, ROWS } from '../src/core/cave.js';
import { makeRoom, tileAt, placeAt, depthOf, beginPlace } from '../src/core/room.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';
import { litAt } from '../src/core/sight.js';
import { rememberAll } from '../src/core/fog.js';
import { floorPlan } from '../src/core/map.js';

const SEEDS = Array.from({ length: 500 }, (_, i) => i + 1);

// Every open tile the hero can walk to from `from`
function walk(room, from) {
  const out = new Set([`${from.x},${from.y}`]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (tileAt(room, n.x, n.y).solid || out.has(`${n.x},${n.y}`)) continue;
      out.add(`${n.x},${n.y}`); queue.push(n);
    }
  }
  return out;
}

test('woods: 17 × 20, trees all round the edge, every open tile joined to the start', () => {
  for (const seed of SEEDS) {
    const w = generateWoods(seed), room = makeRoom(w.map);
    assert.equal(room.cols, COLS); assert.equal(room.rows, ROWS);
    for (let x = 0; x < COLS; x++) assert.ok(w.map[0][x] === 'T' && w.map[ROWS - 1][x] === 'T');
    for (let y = 0; y < ROWS; y++) assert.ok(w.map[y][0] === 'T' && w.map[y][COLS - 1] === 'T');
    const open = w.map.join('').split('.').length - 1;
    assert.ok(open >= 107, `seed ${seed}: ${open} open`);
    assert.equal(walk(room, w.start).size, open, `seed ${seed}`);
    assert.equal(tileAt(room, w.start.x, w.start.y).id, 'floor');
  }
});

test('woods: the same seed gives the same room, and seeds differ', () => {
  assert.deepEqual(generateWoods(42), generateWoods(42));
  assert.notDeepEqual(generateWoods(42).map, generateWoods(43).map);
});

test('woods: depth 0, in daylight, with nothing in it yet', () => {
  assert.equal(placeAt(0), 'woods');
  assert.equal(depthOf('woods'), 0);
  const p = beginPlace('woods', 7);
  assert.equal(p.room.look, 'woods');
  assert.ok(p.room.dark.day);
  assert.deepEqual([p.lights, p.enemies, p.items], [[], [], []]);
});

test('Go outside: the hero stands in the woods, every tile lit; trees block a step', () => {
  const s = goToDepth(makeWorld('first', 7), 0);
  assert.equal(s.place, 'woods');
  assert.equal(tileAt(s.room, s.hero.x, s.hero.y).id, 'floor');
  assert.ok(litAt(s, 1, 1));
  const tree = { ...s, hero: { x: 1, y: 1 } };
  assert.equal(step(tree, 'up'), tree); // the edge row is all trees: no turn passes
});

test('daylight remembers the whole room, and the map shows it as the surface', () => {
  const s = rememberAll(goToDepth(makeWorld('first', 7), 0));
  assert.ok(s.seen.every(Boolean));
  assert.equal(rememberAll(s), s);
  const plan = floorPlan(s);
  assert.equal(plan.depth, 0);
  assert.equal(plan.rooms.length, 1);
});
