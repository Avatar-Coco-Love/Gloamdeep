// § explorer: the Seed Explorer's seeds and its world (D-214)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startSeeds, shownSeed, addSeed, canGoBack, backSeed, explorerWorld } from '../src/core/explorer.js';
import { floorPlan, floorsShown } from '../src/core/map.js';
import { makeWorld } from '../src/core/turn.js';

test('it opens on one seed, with nothing to go back to', () => {
  const s = startSeeds(48213);
  assert.equal(shownSeed(s), 48213);
  assert.equal(canGoBack(s), false);
  assert.deepEqual(backSeed(s), s);
});

test('Back steps through every seed shown, newest first', () => {
  let s = addSeed(addSeed(startSeeds(1), 2), 3);
  assert.equal(shownSeed(s), 3);
  s = backSeed(s); assert.equal(shownSeed(s), 2);
  s = backSeed(s); assert.equal(shownSeed(s), 1);
  assert.equal(canGoBack(s), false);
});

test('the seed already shown is not added twice', () => {
  const s = startSeeds(5);
  assert.equal(addSeed(s, 5), s);
});

test('its map shows the same rooms as the game\'s revealed map, with no hero', () => {
  for (const depth of [0, 1, 2, 7]) {
    const p = floorPlan(explorerWorld(7), true, depth), game = floorPlan(makeWorld('first', 7), true, depth);
    assert.deepEqual(p.rooms.map((r) => [r.id, r.x, r.y]), game.rooms.map((r) => [r.id, r.x, r.y]));
    assert.equal(p.hero, null);
  }
});

test('every floor from the surface down can be turned to', () => {
  assert.deepEqual(floorsShown(null, true).slice(0, 3), [0, 1, 2]);
});
