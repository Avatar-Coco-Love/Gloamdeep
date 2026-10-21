// § mouth: the first cave's mouth on a woods edge, into the crypt and back (step 49, D-211)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mouthOf } from '../src/core/mouth.js';
import { beginPlace, tileAt, PLACES } from '../src/core/room.js';
import { makeWorld, step, followDaylight } from '../src/core/turn.js';
import { floorPlan } from '../src/core/map.js';
import { goToDepth } from '../src/core/stairs.js';
import { COLS, ROWS } from '../src/core/cave.js';

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1);
const AT = { up: [0, 1], down: [0, -1], left: [1, 0], right: [-1, 0] }; // from the mouth into the woods

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

test('the mouth: on the woods edge the seed picks, off the corners, a rock either side, joined to the start', () => {
  const ways = new Set();
  for (const seed of SEEDS) {
    const m = mouthOf(seed), p = beginPlace('woods', seed), { room } = p, { x, y } = m.tile;
    ways.add(m.dir);
    assert.equal(tileAt(room, x, y).id, 'caveMouth');
    const along = m.dir === 'up' || m.dir === 'down' ? x : y, len = m.dir === 'up' || m.dir === 'down' ? COLS : ROWS;
    assert.ok(along >= 2 && along <= len - 3, `seed ${seed}`);
    const [ax, ay] = m.dir === 'up' || m.dir === 'down' ? [1, 0] : [0, 1];
    assert.equal(tileAt(room, x - ax, y - ay).id, 'outcrop'); assert.equal(tileAt(room, x + ax, y + ay).id, 'outcrop');
    const [fx, fy] = AT[m.dir];
    assert.equal(tileAt(room, x + fx, y + fy).id, 'floor');
    assert.ok(walk(room, p.start).has(`${x},${y}`), `seed ${seed}: the mouth is reachable`);
  }
  assert.equal(ways.size, 4);
});

test('walking through the mouth: the crypt\'s facing gap, one turn; and back out onto the mouth', () => {
  for (const seed of [1, 2, 4, 6]) {
    const m = mouthOf(seed), s = { ...makeWorld('woods', seed), hero: { ...m.tile } };
    const into = step(s, m.dir);
    assert.equal(into.place, m.room);
    assert.deepEqual(into.hero, m.gap);
    assert.equal(into.turn, 1);
    assert.equal(tileAt(into.room, m.gap.x, m.gap.y).id, 'floor');
    const back = { up: 'down', down: 'up', left: 'right', right: 'left' }[m.dir];
    const out = step(into, back);
    assert.equal(out.place, 'woods');
    assert.deepEqual(out.hero, m.tile);
  }
});

test('going up into the cave arrives in the south room; the other ways, in the first room', () => {
  for (const seed of SEEDS) {
    const m = mouthOf(seed);
    assert.equal(m.room, m.dir === 'up' ? 'south' : 'first');
    const other = m.room === 'first' ? 'south' : 'first';
    assert.deepEqual(beginPlace(other, seed).room.map, PLACES[other].map, 'the other crypt room keeps its walls');
  }
});

test('the rocks beside the mouth are solid: nothing changes, no turn', () => {
  const m = mouthOf(4), s = { ...makeWorld('woods', 4), hero: { ...m.tile } };
  assert.equal(m.dir, 'up');
  assert.equal(step(s, 'left'), s);
  assert.equal(step(s, 'right'), s);
});

test('the woods and the crypt are both depth 0, and the map shows the part the hero is in (D-212, D-213)', () => {
  for (const seed of [1, 4]) {
    const s = makeWorld('woods', seed);
    assert.deepEqual(floorPlan(s, true).rooms.map((r) => r.id), ['woods']);
    assert.deepEqual(floorPlan(makeWorld('first', seed), true).rooms.map((r) => r.id).sort(), ['first', 'south']);
    assert.deepEqual(floorPlan(goToDepth(s, 1), true, 0).rooms.map((r) => r.id).sort(), ['first', 'south']); // the way the stairs lead
  }
});

test('the lantern by itself lights as the hero walks in from the daylight', () => {
  const m = mouthOf(6), s = { ...makeWorld('woods', 6), hero: { ...m.tile }, lit: false };
  assert.equal(followDaylight(s, step(s, m.dir)).lit, true);
});

// § daylight in (step 51, D-218)
import { mouthLight } from '../src/core/mouth.js';
import { passTime } from '../src/core/daytime.js';
import { litAt } from '../src/core/sight.js';
import { goToPlace } from '../src/core/stairs.js';

test('daylight through the mouth reaches 3 tiles into its crypt room by day, none at night', () => {
  for (const seed of [1, 7, 4127]) {
    const { room, gap } = mouthOf(seed);
    const s = { ...goToPlace(makeWorld('first', seed), room), lit: false };
    const sun = mouthLight(s);
    assert.equal(sun.r, 3 * 16);
    assert.deepEqual([sun.x, sun.y], [gap.x * 16 + 8, gap.y * 16 + 8]);
    assert.ok(litAt(s, gap.x, gap.y));
    assert.equal(mouthLight(passTime(s, 220)), null);
    assert.ok(!litAt(passTime(s, 220), gap.x, gap.y));
    const other = goToPlace(makeWorld('first', seed), room === 'first' ? 'second' : 'first');
    assert.equal(mouthLight(other), null);
  }
});

test('through dusk the light shrinks and warms toward the torch orange', () => {
  const { room } = mouthOf(1), s = goToPlace(makeWorld('first', 1), room);
  const day = mouthLight(s), dusk = mouthLight(passTime(s, 185));
  assert.equal(dusk.r, day.r / 2);
  assert.ok(dusk.cb < day.cb && dusk.cr > day.cr);
});
