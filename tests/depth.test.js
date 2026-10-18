// § depth: the depth counter and the endless way down (D-144 to D-146)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileAt, depthOf, placeAt, placeBeside, SECOND_ENEMIES, SECOND_ITEMS } from '../src/core/room.js';
import { makeWorld, step, wait, FIRST_START } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { spawn } from '../src/core/spawn.js';
import { itemAt } from '../src/core/turn.js';

// Room 2's stairs down are at 1,11; 2,11 is the tile beside them. Its stairs up at 1,1.
const at = (s, x, y) => ({ ...s, hero: { x, y } });
const down = (s) => step(at(s, 2, 11), 'left');
const second = () => step(at(makeWorld(), 2, 1), 'left');

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

test('down from the second room: a fresh copy of it, depth 3, on its stairs up', () => {
  const s = { ...second(), enemies: [], items: [] }; // its rat and flask gone
  const n = down(s);
  assert.equal(n.place, 'depth3');
  assert.equal(depthOf(n.place), 3);
  assert.deepEqual(n.hero, { x: 1, y: 1 });
  assert.equal(shownLine(n).text, 'You go down the stairs.');
  assert.deepEqual(n.enemies, SECOND_ENEMIES);
  assert.deepEqual(n.items, SECOND_ITEMS);
  assert.ok(n.seen.every((v) => v === 0));
  assert.deepEqual(n.elsewhere.second.enemies, []); // depth 2 stays as left
});

test('the way down never ends', () => {
  let s = second();
  for (let d = 3; d <= 12; d++) { s = down({ ...s, enemies: [] }); assert.equal(depthOf(s.place), d); }
});

test('up from depth 3 arrives on depth 2\'s stairs down, and depth 3 stays as left', () => {
  const s3 = down({ ...second(), enemies: [] });
  const up = step(step({ ...s3, items: [], enemies: [] }, 'right'), 'left');
  assert.equal(up.place, 'second');
  assert.deepEqual(up.hero, { x: 1, y: 11 });
  const again = down({ ...up, enemies: [] });
  assert.equal(again.place, 'depth3');
  assert.equal(itemAt(again, 9, 11), undefined);
});

test('a fall at depth 3 wakes the hero in the first room; depth 3 begins again, its map remembered', () => {
  let s = down({ ...second(), enemies: [] });
  s = spawn(s, 'wall', 3, 3);
  s = { ...s, seen: s.seen.map(() => 1), health: 1, items: [], enemies: [{ id: 'rat', x: 1, y: 2 }] };
  const n = wait(s);
  assert.equal(n.place, 'first');
  assert.deepEqual(n.hero, FIRST_START);
  const d3 = n.elsewhere.depth3;
  assert.equal(tileAt(d3.room, 3, 3).id, 'floor');
  assert.deepEqual(d3.items, SECOND_ITEMS);
  assert.ok(d3.seen.every((v) => v === 1));
});
