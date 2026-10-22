// § pour by itself: with Flasks set to By itself, a flask pours once none of it
// would be wasted, free, saying "You pour a flask." (D-248, D-249)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, pourByItself } from '../src/core/turn.js';
import { OIL, setOil } from '../src/core/oil.js';
import { say } from '../src/core/lines.js';
import { flasksText, nextFlasks } from '../src/core/settings.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (oil, n = 2) => ({ ...setOil(makeState(room), oil), bag: [{ id: 'flask', n }] });
const turn = (s) => pourByItself(s, wait(s));

test('Flasks starts By hand and flips to By itself and back', () => {
  assert.equal(flasksText(undefined), 'Flasks: By hand');
  assert.equal(nextFlasks('hand'), 'self');
  assert.equal(flasksText('self'), 'Flasks: By itself');
});

test('above 55% after the turn, nothing pours', () => {
  const n = turn(carrying(0.55 + 2 * OIL.burn));
  assert.deepEqual(n.bag, [{ id: 'flask', n: 2 }]);
});

test('at 55% or lower, one flask pours, free, with its line', () => {
  const s = carrying(0.55 + OIL.burn), n = turn(s);
  assert.equal(n.turn, 1, 'no extra turn');
  assert.ok(Math.abs(n.oil - 1) < 1e-9);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
  assert.equal(n.line.id, 'flaskPour');
});

test('only one a turn, and none with no turn passed or an empty bag', () => {
  assert.equal(turn(carrying(0.05)).bag[0].n, 1);
  const s = carrying(0.3);
  assert.equal(pourByItself(s, s), s);
  const empty = { ...setOil(makeState(room), 0.3), bag: [] }, w = wait(empty);
  assert.equal(pourByItself(empty, w), w);
});

test('another line said this turn stays; an oil line gives way', () => {
  const s = carrying(0.3), w = say(wait(s), 'ratBite');
  assert.equal(pourByItself(s, w).line.id, 'ratBite');
  assert.equal(pourByItself(s, w).bag[0].n, 1, 'it still pours');
  assert.equal(turn(carrying(0.2)).line.id, 'flaskPour');
});
