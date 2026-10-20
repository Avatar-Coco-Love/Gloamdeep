// § cave: generated rooms (D-147 to D-149) and the seeded RNG
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom } from '../src/core/cave.js';
import { rng, nextSeed, SEED_MAX } from '../src/core/rng.js';
import { makeRoom, tileAt } from '../src/core/room.js';
import { mountAt } from '../src/core/mount.js';
import { litAt } from '../src/core/sight.js';

const SEEDS = Array.from({ length: 2000 }, (_, i) => i + 1);
const count = (map, ch) => map.join('').split(ch).length - 1;
const near = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// Every floor-like tile the hero can walk to from `from`, never stepping onto
// stairs on the way (stepping onto stairs takes them)
function walk(room, from) {
  const out = new Set([`${from.x},${from.y}`]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    if (tileAt(room, t.x, t.y).leads && t !== from) continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (tileAt(room, n.x, n.y).solid || out.has(`${n.x},${n.y}`)) continue;
      out.add(`${n.x},${n.y}`); queue.push(n);
    }
  }
  return out;
}

test('the RNG: the same seed gives the same numbers, all in [0, 1)', () => {
  const a = rng(42), b = rng(42), c = rng(43);
  const xs = Array.from({ length: 100 }, a);
  assert.deepEqual(xs, Array.from({ length: 100 }, b));
  assert.notDeepEqual(xs, Array.from({ length: 100 }, c));
  assert.ok(xs.every((x) => x >= 0 && x < 1));
  const s = nextSeed(42);
  assert.ok(s >= 1 && s <= SEED_MAX && s === nextSeed(42));
});

test('the same seed gives the same room', () => {
  assert.deepEqual(generateRoom(4127), generateRoom(4127));
  assert.notDeepEqual(generateRoom(4127).map, generateRoom(4128).map);
});

test('every seed gives a 17 × 20 room, bigger than the screen (D-195), with one stairs up and one stairs down', () => {
  for (const seed of SEEDS) {
    const g = generateRoom(seed);
    assert.ok(g, `seed ${seed} gave no room`);
    const room = makeRoom(g.map); // checks the size and the letters
    assert.equal(room.cols, 17); assert.equal(room.rows, 20);
    assert.equal(count(g.map, '<'), 1); assert.equal(count(g.map, '>'), 1);
    assert.equal(tileAt(room, g.start.x, g.start.y).id, 'stairsUp');
    assert.ok(g.map[0].split('').every((ch) => ch === '#') && g.map[19].split('').every((ch) => ch === '#'));
  }
});

test('from the stairs up, the hero reaches every tile without crossing a stair', () => {
  for (const seed of SEEDS) {
    const g = generateRoom(seed), room = makeRoom(g.map), seen = walk(room, g.start);
    const open = count(g.map, '.') + 2;
    assert.equal(seen.size, open, `seed ${seed}`);
  }
});

test('a torch sits by the stairs up; a flask and a rat beside it lie well away, the rat in the dark', () => {
  for (const seed of SEEDS) {
    const g = generateRoom(seed), room = makeRoom(g.map);
    const [torch] = g.lights, [flask] = g.items, [rat] = g.enemies;
    assert.equal(torch.id, 'torch'); assert.equal(mountAt(room, torch.x, torch.y), 'face');
    assert.ok(near(torch, g.start) <= 3);
    assert.equal(flask.id, 'flask'); assert.equal(tileAt(room, flask.x, flask.y).id, 'floor');
    assert.equal(rat.id, 'rat'); assert.equal(tileAt(room, rat.x, rat.y).id, 'floor');
    assert.ok(near(rat, flask) <= 2 && near(rat, flask) >= 1);
    assert.ok(near(rat, g.start) >= 3, `seed ${seed}: the rat starts too close`);
    assert.ok(!litAt({ room, lights: g.lights, lit: false, hero: g.start }, rat.x, rat.y), `seed ${seed}: the rat starts in light`);
  }
});
