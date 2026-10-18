// § wait: standing still for one turn (src/core/turn.js, D-084)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, switchLantern } from '../src/core/turn.js';
import { OIL, burnOil } from '../src/core/oil.js';

const room = makeRoom(FIRST_ROOM);

test('waiting passes one turn and the hero stays put', () => {
  const s = makeState(room);
  const n = wait(s);
  assert.equal(n.turn, 1);
  assert.deepEqual(n.hero, s.hero);
  assert.equal(s.turn, 0, 'the old state is not changed');
});

test('waiting with the lantern lit burns oil like a step', () => {
  assert.equal(wait(makeState(room)).oil, burnOil(OIL.start));
});

test('waiting with the lantern off burns no oil', () => {
  const n = wait(switchLantern(makeState(room)));
  assert.equal(n.turn, 1);
  assert.equal(n.oil, OIL.start);
});
