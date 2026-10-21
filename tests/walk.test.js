// § walk: a held finger walks around walls (src/core/walk.js, D-219, D-220)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { wayStep, cameIntoView } from '../src/core/walk.js';

const room = makeRoom([
  '#######',
  '#..#..#',
  '#..#..#',
  '#.....#',
  '#..>..#',
  '#######',
]);
const all = (s) => ({ ...s, seen: new Uint8Array(s.seen.length).fill(1) });
const at = (x, y, enemies = [], items = []) => all(makeState(room, { x, y }, [], enemies, items));

test('the way goes around a wall', () => {
  assert.equal(wayStep(at(1, 1), 4, 1), 'down', 'the wall at x 3 blocks the straight way');
  assert.equal(wayStep(at(2, 3), 4, 1), 'right');
});

test('the way uses only remembered tiles', () => {
  const s = makeState(room, { x: 1, y: 1 }), seen = s.seen.slice();
  for (const [x, y] of [[1, 1], [1, 2], [1, 3], [2, 3]]) seen[y * room.cols + x] = 1;
  assert.equal(wayStep({ ...s, seen }, 2, 3), 'down');
  assert.equal(wayStep({ ...s, seen }, 4, 1), null, 'nothing remembered leads there');
});

test('no way to a wall, to the hero\'s own tile, or past an enemy filling the gap', () => {
  assert.equal(wayStep(at(1, 1), 3, 1), null);
  assert.equal(wayStep(at(1, 1), 1, 1), null);
  const narrow = makeRoom(['#####', '#.#.#', '#...#', '#####']);
  const s = all(makeState(narrow, { x: 1, y: 1 }, [], [{ id: 'rat', x: 2, y: 2 }]));
  assert.equal(wayStep(s, 3, 1), null);
});

test('stairs are walked onto only as the goal', () => {
  assert.equal(wayStep(at(2, 4), 3, 4), 'right');
  assert.equal(wayStep(at(2, 4), 4, 4), 'up', 'the stairs between are walked around');
});

test('a creature or item coming into view is noticed', () => {
  const s = at(1, 1, [{ id: 'rat', x: 5, y: 4 }], [{ id: 'flask', x: 1, y: 2 }]);
  const dark = { ...s, lit: false, items: [], enemies: [] };
  assert.equal(cameIntoView(s, s), false, 'nothing new');
  assert.equal(cameIntoView(dark, s), true);
});
