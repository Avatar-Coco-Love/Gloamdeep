// § torch: lighting an unlit torch with the lantern (D-121 to D-125)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { OIL, burnOil } from '../src/core/oil.js';
import { lightAt } from '../src/core/lights.js';
import { spawn, resetRoom } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
// The unlit torch hangs on the block's face at 7,9; 7,10 is the tile below it.
const at = (x, y, s = start()) => ({ ...s, hero: { x, y } });

test('the first room has an unlit torch at 7,9', () => {
  assert.equal(lightAt(start(), 7, 9).id, 'unlitTorch');
});

test('walking into its wall from below lights it, and passes a turn', () => {
  const n = step(at(7, 10), 'up');
  assert.equal(lightAt(n, 7, 9).id, 'torch');
  assert.deepEqual(n.hero, { x: 7, y: 10 });
  assert.equal(n.turn, 1);
  assert.equal(n.oil, burnOil(OIL.start));
  assert.equal(shownLine(n).text, 'You light the torch.');
});

test('a lit torch stays lit, and bumping it again is just a wall', () => {
  const lit = step(at(7, 10), 'up');
  assert.equal(step(lit, 'up'), lit);
});

test('with the lantern off it does not light and no turn passes', () => {
  const s = switchLantern(at(7, 10)), n = step(s, 'up');
  assert.equal(lightAt(n, 7, 9).id, 'unlitTorch');
  assert.equal(n.turn, 0);
  assert.equal(n.oil, s.oil);
  assert.equal(shownLine(n).text, 'Your lantern is dark.');
});

test('only from the tile it faces: the wall beside it is just a wall', () => {
  const s = at(6, 9);
  assert.equal(step(s, 'right'), s);
});

test('a side torch lights from the open tile beside it', () => {
  const s = at(1, 5, spawn(start(), 'unlitTorch', 0, 5));
  assert.equal(lightAt(step(s, 'left'), 0, 5).id, 'torch');
});

test('lit torches go dark again after a fall and after a reset', () => {
  const lit = step(at(7, 10), 'up');
  const fell = wait({ ...lit, hero: { x: 3, y: 10 }, health: 1 }); // the rat at 2,10 bites
  assert.equal(fell.line.id, 'fall');
  assert.equal(lightAt(fell, 7, 9).id, 'unlitTorch');
  assert.equal(lightAt(resetRoom(lit, room, FIRST_START, FIRST_LIGHTS), 7, 9).id, 'unlitTorch');
});
