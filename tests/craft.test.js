// § craft: Make in the bag turns 3 oilcaps into an oil flask, a turn, with
// its line; too few do nothing, and no room for the flask says so (D-299)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, craft } from '../src/core/turn.js';
import { OIL, setOil } from '../src/core/oil.js';
import { BAG_SLOTS } from '../src/core/bag.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag) => ({ ...setOil(makeState(room), 0.5), bag });

test('3 oilcaps make an oil flask in a new slot, passing a turn', () => {
  const n = craft(carrying([{ id: 'oilcap', n: 3 }]), 0);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(n.oil, 0.5 - OIL.burn);
  assert.equal(shownLine(n).text, 'You make an oil flask.');
});

test('the made flask goes on the flasks already carried', () => {
  const n = craft(carrying([{ id: 'flask', n: 1 }, { id: 'oilcap', n: 3 }]), 1);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 2 }]);
});

test('fewer than 3 oilcaps make nothing', () => {
  const s = carrying([{ id: 'oilcap', n: 2 }]);
  assert.equal(craft(s, 0), s);
});

test('with 3 flasks carried the oilcaps stay, the line says so and no turn passes', () => {
  const bag = [{ id: 'flask', n: 3 }, { id: 'oilcap', n: 3 }];
  const n = craft(carrying(bag), 1);
  assert.equal(n.bag, bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, "You can't carry more flasks.");
});

test('a full bag still has room: the oilcaps free their slot', () => {
  const bag = [{ id: 'oilcap', n: 3 }, ...Array.from({ length: BAG_SLOTS - 1 }, (_, i) => ({ id: 'thing' + i, n: 1 }))];
  const n = craft(carrying(bag), 0);
  assert.equal(n.bag.length, BAG_SLOTS);
  assert.deepEqual(n.bag.at(-1), { id: 'flask', n: 1 });
});

test('a flask or an empty slot makes nothing', () => {
  const s = carrying([{ id: 'flask', n: 3 }]);
  assert.equal(craft(s, 0), s);
  assert.equal(craft(s, 4), s);
});
