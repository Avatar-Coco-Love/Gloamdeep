// § turn: stepping, walls and tap directions
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, toward } from '../src/core/turn.js';

test('the hero starts on the study tile, on floor', () => {
  const s = makeState(makeRoom(FIRST_ROOM));
  assert.deepEqual(s.hero, { x: 5, y: 11 });
  assert.equal(s.turn, 0);
});

test('a step onto floor moves one tile and passes one turn', () => {
  const s = makeState(makeRoom(FIRST_ROOM));
  const n = step(s, 'up');
  assert.deepEqual(n.hero, { x: 5, y: 10 });
  assert.equal(n.turn, 1);
  assert.deepEqual(s.hero, { x: 5, y: 11 }, 'the old state is not changed');
});

test('walking into a wall changes nothing and passes no turn', () => {
  const s = makeState(makeRoom(FIRST_ROOM), { x: 1, y: 1 });
  assert.equal(step(s, 'up'), s);
  assert.equal(step(s, 'left'), s);
});

test('a tap points along the farther side', () => {
  assert.equal(toward(5, 5, 9, 6), 'right');
  assert.equal(toward(5, 5, 4, 1), 'up');
  assert.equal(toward(5, 5, 5, 5), null);
});
