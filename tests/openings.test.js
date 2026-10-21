// § openings: the first room's bottom doorway into the south room, and back (D-197)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileAt, placeFor, SOUTH_LIGHTS } from '../src/core/room.js';
import { makeWorld, step, wait } from '../src/core/turn.js';
import { OIL, burnOil } from '../src/core/oil.js';
import { goToDepth, goToPlace } from '../src/core/stairs.js';

// The doorway is at 5,12 in the first room, and 5,0 in the south room.
const at = (x, y, s = makeWorld()) => ({ ...s, hero: { x, y } });
const out = () => step(at(5, 12), 'down');

test('walking off the first room\'s doorway: the south room, on its doorway, one turn', () => {
  const n = out();
  assert.equal(n.place, 'south');
  assert.deepEqual(n.hero, { x: 5, y: 0 });
  assert.equal(n.turn, 1);
  assert.equal(n.oil, burnOil(OIL.start));
  assert.equal(n.line, null);
  assert.deepEqual(n.lights, SOUTH_LIGHTS);
  assert.ok(n.elsewhere.first);
});

test('standing in the doorway does not take you through; the next step does', () => {
  const s = step(at(5, 11), 'down');
  assert.equal(s.place, 'first');
  assert.deepEqual(s.hero, { x: 5, y: 12 });
  assert.equal(step(s, 'down').place, 'south');
});

test('walking back up out of the south room: the first room, on its doorway, as it was left', () => {
  const s = at(5, 12), seen = s.seen.map((_, i) => i === 0);
  const n = step({ ...s, seen }, 'down'), back = step(n, 'up');
  assert.equal(back.place, 'first');
  assert.deepEqual(back.hero, { x: 5, y: 12 });
  assert.equal(back.turn, 2);
  assert.deepEqual(back.seen, seen);
  assert.equal(step(back, 'down').place, 'south');
});

test('an edge with no opening stays wall: nothing changes, no turn', () => {
  const door = out();
  assert.equal(step(door, 'left'), door);
  const corner = at(1, 11);
  assert.equal(step(corner, 'down'), corner);
  const south = at(1, 11, out());
  assert.equal(step(south, 'left'), south);
});

test('a rat left behind does not follow through the doorway', () => {
  const s = at(5, 12), rat = { id: 'rat', x: 5, y: 11, chasing: true, health: 2 };
  const n = step({ ...s, enemies: [rat] }, 'down');
  assert.equal(n.place, 'south');
  assert.deepEqual(n.elsewhere.first.enemies, [rat]);
  assert.equal(n.health, s.health);
});

test('the south room is at depth 0, and its stairs-free doorway room changes with the seed', () => {
  assert.equal(goToDepth(out(), 0).place, 'first');
  const spots = new Set();
  for (let seed = 1; seed <= 200; seed++) {
    const p = placeFor('south', seed);
    for (const t of [...p.items, ...p.enemies]) assert.equal(tileAt({ cols: 11, rows: 13, map: p.map }, t.x, t.y).id, 'floor');
    spots.add(`${p.items[0].x},${p.items[0].y}`);
  }
  assert.ok(spots.size > 5);
  assert.notDeepEqual(placeFor('south', 7).items, placeFor('first', 7).items);
});

test('waiting in the south room\'s doorway keeps you there', () => {
  assert.equal(wait(out()).place, 'south');
});

test('doorways: the edge tiles that lead to the room beside, the mouth\'s alone on its way (D-225)', async () => {
  const { doorways } = await import('../src/core/openings.js');
  const { mouthOf } = await import('../src/core/mouth.js');
  const s = makeWorld('first', 7);
  const first = doorways('first', s.room, 7);
  assert.ok(first.some((d) => d.x === 5 && d.y === 12 && d.dir === 'down'), 'the bottom doorway into the south room');
  for (const d of first) assert.equal(tileAt(s.room, d.x, d.y).solid, false);
  for (let seed = 1; seed <= 20; seed++) {
    const w = makeWorld('first', seed), out = goToPlace(w, 'woods'), mo = mouthOf(seed);
    assert.deepEqual(doorways('woods', out.room, seed), [{ ...mo.tile, dir: mo.dir }], 'only the mouth in the woods');
  }
  const deep = goToDepth(s, 2), ds = doorways(deep.place, deep.room, 7);
  assert.ok(ds.length >= 1, 'a grid room has a doorway');
  for (const d of ds) assert.ok(step({ ...deep, hero: { x: d.x, y: d.y } }, d.dir).place !== deep.place, 'each one walks off into the next room');
});
