// § events: each turn writes a short list of what happened (D-263, D-267)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, makeWorld, step, wait, pour, pourByItself, switchLantern, followDaylight, FIRST_START } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { setOil } from '../src/core/oil.js';
import { eventsSince } from '../src/core/events.js';
import { goToPlace } from '../src/core/stairs.js';
import { passTime } from '../src/core/daytime.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
const at = (x, y, s = start()) => ({ ...s, hero: { x, y } });
// The rat sits at 2,10, so the hero on 3,10 stands next to it.
const nextToRat = (health) => ({ ...at(3, 10), enemies: [{ id: 'rat', x: 2, y: 10, health }] });
const types = (s) => s.events.map((e) => e.type);

test('a journey starts with no events', () => {
  assert.deepEqual(makeWorld().events, []);
});

test('a step is a step event, and the next turn starts a new list', () => {
  const n = step(start(), 'up');
  assert.deepEqual(n.events, [{ type: 'step' }]);
  assert.deepEqual(wait(n).events, []);
});

test('a bump into a wall changes nothing, so no events (D-043)', () => {
  const s = at(1, 11);
  assert.equal(step(s, 'left'), s);
  assert.deepEqual(eventsSince(s, step(s, 'left')), []);
});

test('a hit names the creature and the item held, and a creature beaten is a beat', () => {
  assert.deepEqual(step(nextToRat(2), 'left').events.slice(0, 1), [{ type: 'hit', id: 'rat', held: null }]);
  const n = step({ ...nextToRat(1), held: 'knife' }, 'left');
  assert.deepEqual(n.events, [{ type: 'hit', id: 'rat', held: 'knife' }, { type: 'beat', id: 'rat' }]);
});

test('a bite names the creature and the hearts taken; at 0 hearts a fall follows', () => {
  assert.deepEqual(wait(nextToRat(2)).events, [{ type: 'bite', id: 'rat', hurt: 1 }]);
  assert.deepEqual(types(wait({ ...nextToRat(2), health: 1 })), ['bite', 'fall']);
});

test('the lantern switched is a lantern event, on a list of its own', () => {
  const n = switchLantern(step(start(), 'up'));
  assert.deepEqual(n.events, [{ type: 'lantern', lit: false }]);
  assert.deepEqual(switchLantern(n).events, [{ type: 'lantern', lit: true }]);
});

test('the lantern by itself adds its event to the turn\'s', () => {
  const woods = { ...goToPlace(makeWorld('first', 4127), 'woods'), lit: false };
  const before = passTime(woods, 185), after = wait(before); // dusk falls
  const n = followDaylight(before, after);
  assert.deepEqual(n.events.at(-1), { type: 'lantern', lit: true });
  assert.deepEqual(eventsSince(after, n), [{ type: 'lantern', lit: true }]);
});

test('another room is an enter event, and a new one a found too', () => {
  const s = makeWorld(), down = step({ ...s, hero: { x: 2, y: 1 } }, 'left');
  assert.deepEqual(down.events.slice(0, 3), [{ type: 'step' }, { type: 'enter', place: down.place }, { type: 'found', place: down.place }]);
  const back = step(step(down, 'right'), 'left');
  assert.deepEqual(types(back).filter((t) => t !== 'step'), ['enter']); // the first room, found long ago
});

test('a level reached is a level event', () => {
  const n = step({ ...nextToRat(1), xp: 9 }, 'left');
  assert.deepEqual(n.events.at(-1), { type: 'level', n: 2 });
});

test('items: a flask or the knife taken, a herb eaten', () => {
  assert.deepEqual(step(spawn(start(), 'flask', 5, 10), 'up').events, [{ type: 'step' }, { type: 'take', id: 'flask' }]);
  assert.deepEqual(step(spawn(start(), 'knife', 5, 10), 'up').events, [{ type: 'step' }, { type: 'take', id: 'knife' }]);
  assert.deepEqual(step(spawn({ ...start(), health: 3 }, 'herb', 5, 10), 'up').events, [{ type: 'step' }, { type: 'eat', id: 'herb' }]);
  assert.deepEqual(step(spawn(start(), 'herb', 5, 10), 'up').events, [{ type: 'step' }]); // at full health it stays
});

test('a flask poured by hand, or by itself after the turn', () => {
  const s = { ...setOil(start(), 0.3), bag: [{ id: 'flask', n: 2 }] };
  assert.deepEqual(pour(s, 0).events, [{ type: 'pour', id: 'flask', by: 'hand' }]);
  const after = step(s, 'up'), n = pourByItself(s, after);
  assert.deepEqual(n.events, [{ type: 'step' }, { type: 'pour', id: 'flask', by: 'self' }]);
  assert.deepEqual(eventsSince(after, n), [{ type: 'pour', id: 'flask', by: 'self' }]);
});

test('a torch lit is a torch event', () => {
  assert.deepEqual(step(at(7, 10), 'up').events, [{ type: 'torch' }]); // the unlit torch at 7,9
});
