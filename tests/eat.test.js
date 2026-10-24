// § eat: Eat in the bag eats a heartcap, healing 1 heart, never above full,
// a turn, with lines that take turns; at full health it stays, free (D-308)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat, maxHealth } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, health) => ({ ...makeState(room), bag, health });

test('a heartcap heals 1 heart and passes a turn', () => {
  const n = eat(carrying([{ id: 'heartcap', n: 2 }], 2), 0);
  assert.equal(n.health, 3);
  assert.deepEqual(n.bag, [{ id: 'heartcap', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You eat a heartcap.');
  assert.ok(n.events.some((e) => e.type === 'eat' && e.id === 'heartcap'));
});

test('the last heartcap eaten frees its slot', () => {
  const n = eat(carrying([{ id: 'flask', n: 1 }, { id: 'heartcap', n: 1 }], 1), 1);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
});

test('its lines take turns', () => {
  let s = carrying([{ id: 'heartcap', n: 3 }], 1);
  const said = [];
  for (let i = 0; i < 3; i++) { s = eat(s, 0); said.push(shownLine(s).text); }
  assert.deepEqual(said, ['You eat a heartcap.', 'The heartcap tastes of earth.', 'Warmth spreads through you.']);
  assert.equal(s.health, 4);
});

test('at full health it stays, the line says so and no turn passes', () => {
  const s = makeState(room), bag = [{ id: 'heartcap', n: 1 }];
  const n = eat({ ...s, bag, health: maxHealth(s) }, 0);
  assert.equal(n.bag, bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, "You aren't hurt.");
});

test('a flask, an oilcap or an empty slot eats nothing', () => {
  const s = carrying([{ id: 'flask', n: 1 }, { id: 'oilcap', n: 3 }], 1);
  assert.equal(eat(s, 0), s);
  assert.equal(eat(s, 1), s);
  assert.equal(eat(s, 4), s);
});
