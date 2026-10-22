// § flask: walking onto an oil flask puts it in the bag; pouring it from there
// fills the lantern (D-078, D-247)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, pour, itemAt } from '../src/core/turn.js';
import { OIL, setOil } from '../src/core/oil.js';
import { spawn } from '../src/core/spawn.js';
import { BAG_SLOTS } from '../src/core/bag.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so a flask on 5,10 is one step up.
const withFlask = (oil = 0.75) => spawn(setOil(makeState(room), oil), 'flask', 5, 10);
const carrying = (n, oil = 0.25) => ({ ...setOil(makeState(room), oil), bag: [{ id: 'flask', n }] });

test('a new game has no items and an empty bag', () => {
  assert.deepEqual(makeState(room).items, []);
  assert.deepEqual(makeState(room).bag, []);
});

test('stepping on a flask burns the step and puts it in the bag, not the lantern', () => {
  const s = withFlask(0.25);
  const n = step(s, 'up');
  assert.equal(n.oil, 0.25 - OIL.burn);
  assert.equal(n.turn, 1);
  assert.deepEqual(n.items, []);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
  assert.equal(itemAt(s, 5, 10).id, 'flask', 'the old state is not changed');
});

test('flasks stack in one slot', () => {
  const n = step({ ...withFlask(), bag: [{ id: 'flask', n: 2 }] }, 'up');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 3 }]);
});

test('over a full stack of 3 the flask stays on the floor, with its line', () => {
  const n = step({ ...withFlask(), bag: [{ id: 'flask', n: 3 }] }, 'up');
  assert.equal(itemAt(n, 5, 10).id, 'flask');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 3 }], 'no new slot is started');
  assert.equal(n.turn, 1, 'the step still passes a turn');
  assert.equal(shownLine(n).text, "You can't carry more flasks.");
});

test('a flask stays on the floor when the bag has no room', () => {
  const full = Array.from({ length: BAG_SLOTS }, (_, i) => ({ id: 'thing' + i, n: 1 }));
  const n = step({ ...withFlask(), bag: full }, 'up');
  assert.equal(itemAt(n, 5, 10).id, 'flask');
  assert.equal(n.bag, full);
  assert.equal(n.turn, 1, 'the step still passes a turn');
});

test('pouring takes one from the stack, adds 45% and passes a turn', () => {
  const n = pour(carrying(2), 0);
  assert.equal(n.oil, 0.25 - OIL.burn + 0.45);
  assert.equal(n.turn, 1);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
});

test('the last flask poured empties its slot', () => {
  assert.deepEqual(pour(carrying(1), 0).bag, []);
});

test('pouring into a full lantern is allowed, never above full', () => {
  const n = pour(carrying(1, 1), 0);
  assert.equal(n.oil, 1);
  assert.deepEqual(n.bag, []);
});

test('a flask fills an empty lantern back from the ember', () => {
  assert.equal(pour(carrying(1, 0), 0).oil, 0.45);
});

test('pouring from an empty slot changes nothing and passes no turn', () => {
  const s = carrying(1);
  assert.equal(pour(s, 3), s);
});

test('a flask next to the path is left alone', () => {
  const n = step(withFlask(), 'left');
  assert.equal(n.items.length, 1);
  assert.equal(n.oil, 0.75 - OIL.burn);
});
