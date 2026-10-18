// § lantern: the on/off switch (src/core/turn.js, D-080 to D-082)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, switchLantern } from '../src/core/turn.js';
import { OIL } from '../src/core/oil.js';
import { spawn } from '../src/core/spawn.js';

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
  const s = switchLantern(spawn(makeState(room), 'flask', 5, 10));
  assert.equal(step(s, 'up').oil, Math.min(1, OIL.start + 0.45));
});
