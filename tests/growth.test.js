// § growth: an ember for each level past the first, spent on hearts (D-293)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, wait, maxHealth, HERO_HEALTH } from '../src/core/turn.js';
import { embers, canAddHeart, addHeart, HEARTS_MORE } from '../src/core/growth.js';

const room = makeRoom(FIRST_ROOM);
const at = (xp, more = {}) => ({ ...makeState(room, undefined, FIRST_LIGHTS, []), xp, ...more });

test('level 1 has no embers; each level past it gives one, older journeys too', () => {
  assert.equal(embers(at(0)), 0);
  assert.equal(embers(at(9)), 0);
  assert.equal(embers(at(10)), 1); // level 2
  assert.equal(embers(at(60)), 3); // level 4
});

test('a heart costs an ember, arrives full and stays', () => {
  const s = addHeart({ ...at(10), health: 3 });
  assert.equal(s.hearts, 1);
  assert.equal(s.health, 4);
  assert.equal(maxHealth(s), HERO_HEALTH + 1);
  assert.equal(embers(s), 0);
  assert.equal(s.turn, 0, 'no turn passes');
});

test('no embers, no heart', () => {
  const s = at(9);
  assert.equal(canAddHeart(s), false);
  assert.equal(addHeart(s), s);
});

test('at most 5 more hearts, 10 in all', () => {
  let s = at(100000);
  for (let i = 0; i < 8; i++) s = addHeart(s);
  assert.equal(s.hearts, HEARTS_MORE);
  assert.equal(maxHealth(s), 10);
  assert.equal(canAddHeart(s), false);
});

test('a fall wakes the hero with every heart bought, and keeps them', () => {
  const s = { ...at(10, { hearts: 1 }), health: 1, enemies: [{ id: 'rat', x: 6, y: 11 }] };
  const n = wait({ ...s, hero: { x: 5, y: 11 } });
  assert.equal(n.hearts, 1);
  assert.equal(n.health, 6);
});
