// § fog: which tiles the hero remembers (src/core/fog.js)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { reach } from '../src/core/oil.js';
import { remember, forget } from '../src/core/fog.js';
import { resetRoom } from '../src/core/spawn.js';

const room = makeRoom(FIRST_ROOM);
const at = (tx, ty) => ({ x: tx * 16 + 8, y: ty * 16 + 8, r: reach(1) });
const has = (s, tx, ty) => s.seen[ty * room.cols + tx] === 1;

test('a new game remembers nothing', () => {
  assert.equal(makeState(room).seen.every((v) => v === 0), true);
});

test('tiles the lantern reaches are remembered, and the old state is not changed', () => {
  const s = makeState(room), n = remember(s, at(5, 7));
  assert.equal(has(n, 6, 7), true);
  assert.equal(has(n, 5, 7), true, 'the tile the hero stands on');
  assert.equal(has(s, 6, 7), false);
});

test('tiles behind a wall or past the reach are not remembered', () => {
  const n = remember(makeState(room), at(4, 7));
  assert.equal(has(n, 3, 6), true, 'the pillar itself');
  assert.equal(has(n, 2, 5), false, 'in its shadow');
  assert.equal(has(remember(makeState(room), at(5, 11)), 5, 1), false, 'too far');
});

test('memory is kept, and nothing new gives the same state back', () => {
  const a = remember(makeState(room), at(5, 7));
  const b = remember(a, at(5, 11));
  assert.equal(has(b, 6, 7), true);
  assert.equal(remember(b, at(5, 11)), b);
});

test('forget and reset room give a blank memory', () => {
  const a = remember(makeState(room), at(5, 7));
  assert.equal(forget(a).seen.some((v) => v), false);
  assert.equal(resetRoom(a, room, { x: 5, y: 11 }).seen.some((v) => v), false);
});

test('the first room is a cave: pitch black, with memory a faint grey (D-063)', () => {
  assert.deepEqual(room.dark.unseen, [0, 0, 0]);
  const [r, g, b] = room.dark.remembered;
  assert.equal(r === g && g === b && r > 0 && r < 0.15, true);
});
