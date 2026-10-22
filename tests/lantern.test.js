// § lantern: the on/off switch (src/core/turn.js, D-080 to D-082)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeWorld, step, pour, switchLantern, followDaylight } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { OIL, setOil } from '../src/core/oil.js';

const room = makeRoom(FIRST_ROOM);

test('a new game starts with the lantern lit', () => {
  assert.equal(makeState(room).lit, true);
});

test('switching is free: no turn passes and no oil burns', () => {
  const s = makeState(room);
  const off = switchLantern(s);
  assert.equal(off.lit, false);
  assert.equal(off.turn, s.turn);
  assert.equal(off.oil, s.oil);
  assert.equal(switchLantern(off).lit, true);
  assert.equal(s.lit, true, 'the old state is not changed');
});

test('a step with the lantern off passes a turn but burns no oil', () => {
  const next = step(switchLantern(makeState(room)), 'up');
  assert.equal(next.turn, 1);
  assert.equal(next.oil, OIL.start);
  assert.equal(next.lit, false, 'it stays off');
});

test('a flask still pours in with the lantern off', () => {
  const s = switchLantern({ ...setOil(makeState(room), 0.5), bag: [{ id: 'flask', n: 1 }] });
  assert.equal(pour(s, 0).oil, 0.95);
});

test('By itself, the lantern goes out in daylight and lights again in the dark (D-210)', () => {
  const crypt = makeWorld('first', 4127), woods = followDaylight(crypt, goToPlace(crypt, 'woods'));
  assert.equal(woods.lit, false);
  const back = goToPlace(woods, 'first');
  assert.equal(followDaylight(woods, back).lit, true);
});

test('By itself acts only as the light changes, so the player\'s own switch holds', () => {
  const crypt = makeWorld('first', 4127), woods = followDaylight(crypt, goToPlace(crypt, 'woods'));
  const relit = switchLantern(woods);
  assert.equal(followDaylight(relit, step(relit, 'up')).lit, true); // still in daylight: it stays lit
  const dark = switchLantern(crypt);
  assert.equal(followDaylight(dark, step(dark, 'up')).lit, false); // still in the dark: it stays off
});
