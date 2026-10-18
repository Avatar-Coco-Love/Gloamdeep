// § flask: walking onto an oil flask pours it into the lantern (D-078)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, itemAt } from '../src/core/turn.js';
import { OIL, setOil } from '../src/core/oil.js';
import { spawn } from '../src/core/spawn.js';

const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so a flask on 5,10 is one step up.
const withFlask = (oil = 0.75) => spawn(setOil(makeState(room), oil), 'flask', 5, 10);

test('a new game has no items', () => {
  assert.deepEqual(makeState(room).items, []);
});

test('stepping on a flask burns the step, adds 45% and the flask is gone', () => {
  const s = withFlask(0.25);
  const n = step(s, 'up');
  assert.equal(n.oil, 0.25 - OIL.burn + 0.45);
  assert.equal(n.turn, 1);
  assert.deepEqual(n.items, []);
  assert.equal(itemAt(s, 5, 10).id, 'flask', 'the old state is not changed');
});

test('a flask is used even when the lantern is full, never above full', () => {
  const n = step(withFlask(1), 'up');
  assert.equal(n.oil, 1);
  assert.deepEqual(n.items, []);
});

test('a flask fills an empty lantern back from the ember', () => {
  assert.equal(step(withFlask(0), 'up').oil, 0.45);
});

test('a flask next to the path is left alone', () => {
  const n = step(withFlask(), 'left');
  assert.equal(n.items.length, 1);
  assert.equal(n.oil, 0.75 - OIL.burn);
});
