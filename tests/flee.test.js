// § flee: a hurt rat steps a tile a turn away from the hero, never stopping (D-292)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';

const room = makeRoom(FIRST_ROOM);
const with_ = (hero, enemies) => ({ ...makeState(room, FIRST_START, FIRST_LIGHTS, []), hero, enemies });
const spots = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a hurt rat steps away from the hero, the farther side first', () => {
  const s = with_({ x: 5, y: 11 }, [{ id: 'rat', x: 3, y: 10, health: 1, chasing: true }]); // two across, one up
  assert.deepEqual(spots(wait(s)), [[2, 10]]);
});

test('blocked on the farther side, it tries the other side away', () => {
  const s = with_({ x: 3, y: 11 }, [{ id: 'rat', x: 1, y: 10, health: 1, chasing: true }]); // the wall at 0,10
  assert.deepEqual(spots(wait(s)), [[1, 9]]);
});

test('it keeps fleeing, turn after turn, and never turns back', () => {
  let s = with_({ x: 5, y: 11 }, [{ id: 'rat', x: 5, y: 7, health: 1, chasing: true }]);
  for (let i = 0; i < 3; i++) s = wait(s);
  assert.deepEqual(spots(s), [[5, 5]], 'up two, then the wall at 5,4 stops it');
  assert.equal(s.health, 5);
});

test('an unhurt rat still chases', () => {
  const rat = with_({ x: 5, y: 11 }, [{ id: 'rat', x: 5, y: 7, chasing: true }]);
  assert.deepEqual(spots(wait(rat)), [[5, 8]]);
});
