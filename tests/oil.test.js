// § oil: the tank, the burn and the light's reach (src/core/oil.js)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { OIL, burnOil, reach, setOil } from '../src/core/oil.js';

const room = makeRoom(FIRST_ROOM);

test('a new game starts with the tank three quarters full', () => {
  assert.equal(makeState(room).oil, 0.75);
});

test('a step burns oil, a bump into a wall does not', () => {
  const s = makeState(room);
  assert.equal(step(s, 'up').oil, 0.75 - OIL.burn);
  assert.equal(step(makeState(room, { x: 1, y: 1 }), 'up').oil, 0.75);
});

test('80 turns empty a full tank exactly, and it never goes below empty', () => {
  let oil = 1;
  for (let i = 0; i < 79; i++) oil = burnOil(oil);
  assert.equal(oil > 0, true);
  assert.equal(burnOil(oil), 0);
  assert.equal(burnOil(0), 0);
});

test('the reach runs from 5.2 tiles full to 1.6 nearly empty, and an ember at empty', () => {
  assert.equal(reach(1), 5.2 * 16);
  assert.equal(Math.round(reach(0.001) / 16 * 100) / 100, 1.6);
  assert.equal(reach(0), 0.9 * 16);
});

test('the dev buttons set the oil, kept between empty and full', () => {
  const s = makeState(room);
  assert.equal(setOil(s, 1).oil, 1);
  assert.equal(setOil(s, 0).oil, 0);
  assert.equal(setOil(s, 2).oil, 1);
  assert.equal(s.oil, 0.75, 'the old state is not changed');
});
