// § depth: the depth counter and the endless way down (D-144 to D-146)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileAt, depthOf, placeAt, placeBeside } from '../src/core/room.js';
import { makeWorld, step, wait, FIRST_START, DIRS } from '../src/core/turn.js';
import { generateRoom } from '../src/core/cave.js';
import { seedFor, nextSeed } from '../src/core/rng.js';
import { shownLine } from '../src/core/lines.js';

// Room 2's stairs down are at 1,11; 2,11 is the tile beside them. Its stairs up at 1,1.
const at = (s, x, y) => ({ ...s, hero: { x, y } });
const down = (s) => step(at(s, 2, 11), 'left');
const second = () => step(at(makeWorld('first', 4127), 2, 1), 'left');

test('the first room is depth 1, the second depth 2, then depth3, depth4…', () => {
  assert.equal(depthOf('first'), 1);
  assert.equal(depthOf('second'), 2);
  assert.equal(placeAt(3), 'depth3');
  assert.equal(depthOf(placeAt(7)), 7);
  assert.equal(placeBeside('first', 'up'), null);
  assert.equal(placeBeside('second', 'down'), 'depth3');
  assert.equal(placeBeside('depth3', 'up'), 'second');
});

test('the second room has stairs down at 1,11', () => {
  assert.equal(tileAt(makeWorld().elsewhere.second.room, 1, 11).id, 'stairsDown');
});

test('down from the second room: a generated room, depth 3, on its stairs up', () => {
  const s = { ...second(), enemies: [], items: [] }; // its rat and flask gone
  const n = down(s);
  assert.equal(n.place, 'depth3');
  assert.equal(depthOf(n.place), 3);
  assert.equal(tileAt(n.room, n.hero.x, n.hero.y).id, 'stairsUp');
  assert.equal(shownLine(n).text, 'You go down the stairs.');
  assert.deepEqual(n.room.map, generateRoom(seedFor(n.seed, 3)).map);
  assert.equal(n.enemies.length, 1);
  assert.deepEqual(n.items.map((it) => it.id), ['flask', 'herb']);
  assert.ok(n.seen.every((v) => v === 0));
  assert.deepEqual(n.elsewhere.second.enemies, []); // depth 2 stays as left
});

// From anywhere in a generated room: onto the tile beside its stairs down, then onto them
function deeper(s) {
  const at2 = find(s.room, 'stairsDown');
  for (const [dir, [dx, dy]] of Object.entries(DIRS)) {
    const x = at2.x - dx, y = at2.y - dy;
    if (!tileAt(s.room, x, y).solid) return step({ ...s, hero: { x, y }, enemies: [], items: [] }, dir);
  }
  throw new Error('no way onto the stairs');
}
const find = (room, id) => {
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (tileAt(room, x, y).id === id) return { x, y };
  return null;
};

test('the way down never ends, each depth its own room', () => {
  let s = second();
  const maps = new Set();
  for (let d = 3; d <= 12; d++) { s = deeper(s); assert.equal(depthOf(s.place), d); maps.add(s.room.map.join()); }
  assert.ok(maps.size >= 9);
});

test('up from depth 3 arrives on depth 2\'s stairs down, and depth 3 stays as left', () => {
  const s3 = down({ ...second(), enemies: [] });
  const map = s3.room.map, up = deeperUp(s3);
  assert.equal(up.place, 'second');
  assert.deepEqual(up.hero, { x: 1, y: 11 });
  const again = down({ ...up, enemies: [] });
  assert.equal(again.place, 'depth3');
  assert.deepEqual(again.room.map, map);
  assert.deepEqual(again.items, []);
});
// Off the stairs up and back on, with the room's flask and rat cleared
function deeperUp(s) {
  const at2 = s.hero;
  for (const [dir, [dx, dy]] of Object.entries(DIRS)) {
    const x = at2.x + dx, y = at2.y + dy;
    if (tileAt(s.room, x, y).solid) continue;
    const back = { up: 'down', down: 'up', left: 'right', right: 'left' }[dir];
    return step(step({ ...s, items: [], enemies: [] }, dir), back);
  }
  throw new Error('stuck on the stairs');
}

test('a fall at depth 3 wakes the hero in the first room with a new seed; depth 3 is new and unmapped', () => {
  let s = down({ ...second(), enemies: [] });
  const seed = s.seed;
  s = { ...s, seen: s.seen.map(() => 1), health: 1, items: [], enemies: [] };
  const h = s.hero, spot = Object.values(DIRS).map(([dx, dy]) => ({ x: h.x + dx, y: h.y + dy })).find((t) => !tileAt(s.room, t.x, t.y).solid);
  const n = wait({ ...s, enemies: [{ id: 'rat', ...spot }] });
  assert.equal(n.place, 'first');
  assert.deepEqual(n.hero, FIRST_START);
  assert.notEqual(n.seed, seed);
  assert.equal(n.seed, nextSeed(seed));
  assert.equal(n.elsewhere.depth3, undefined); // it begins again when reached
  const again = down({ ...step(at(n, 2, 1), 'left'), enemies: [] });
  assert.ok(again.seen.every((v) => v === 0));
  assert.deepEqual(again.room.map, generateRoom(seedFor(n.seed, 3)).map);
});

test('the first two rooms\' maps stay remembered after a fall', () => {
  const s = { ...second(), health: 1 };
  const lit = { ...s, seen: s.seen.map(() => 1), enemies: [{ id: 'rat', x: 1, y: 2 }], items: [] };
  const n = wait(lit);
  assert.ok(n.elsewhere.second.seen.every((v) => v === 1));
});

test('the first rooms are crypt, generated depths grey rock (D-164)', () => {
  assert.equal(makeWorld().room.look, 'crypt');
  assert.equal(makeWorld().elsewhere.second.room.look, 'crypt');
  const s = down({ ...second(), enemies: [], items: [] });
  assert.equal(s.place, 'depth3');
  assert.equal(s.room.look, 'rock');
});
