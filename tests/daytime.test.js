// Day and night under the sky (D-025, D-217)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { daylight, inDaylight, darkNow, passTime, DAY_TURNS, MOONLIT } from '../src/core/daytime.js';
import { makeWorld, wait, followDaylight } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { litAt } from '../src/core/sight.js';

test('a day is 300 turns: full day, a 30-turn dusk, night, a 30-turn dawn', () => {
  assert.equal(DAY_TURNS, 300);
  assert.equal(daylight(0), 1);
  assert.equal(daylight(169), 1);
  assert.equal(daylight(185), 0.5);
  assert.equal(daylight(200), 0);
  assert.equal(daylight(269), 0);
  assert.equal(daylight(285), 0.5);
  assert.equal(daylight(300), 1);
});

test('the woods are lit all over by day and not at night; the crypt never is', () => {
  const crypt = makeWorld('first', 4127), woods = goToPlace(crypt, 'woods');
  assert.ok(inDaylight(woods));
  assert.ok(!inDaylight(passTime(woods, 200)));
  assert.ok(!inDaylight(crypt));
  const night = { ...passTime(woods, 220), lit: false };
  const far = { x: (night.hero.x + 8) % night.room.cols, y: night.hero.y };
  assert.equal(litAt(woods, far.x, far.y), true);
  assert.equal(litAt(night, far.x, far.y), false);
});

test('at night under the sky, remembered tiles are moonlit blue and unseen ones black', () => {
  const woods = goToPlace(makeWorld('first', 4127), 'woods');
  assert.deepEqual(darkNow(woods.room, 220), { unseen: [0, 0, 0], remembered: MOONLIT });
  assert.deepEqual(darkNow(woods.room, 0).remembered, [1, 1, 1]);
  const crypt = makeWorld('first', 4127);
  assert.equal(darkNow(crypt.room, 220), crypt.room.dark);
});

test('By itself, the lantern lights as dusk falls and goes out as dawn comes', () => {
  const woods = { ...goToPlace(makeWorld('first', 4127), 'woods'), lit: false };
  const dusk = followDaylight(passTime(woods, 185), wait(passTime(woods, 185)));
  assert.equal(dusk.lit, true);
  const dawn = followDaylight(passTime(dusk, 98), wait(passTime(dusk, 98)));
  assert.equal(dawn.lit, false);
});

test('the dev buttons move the clock only', () => {
  const s = makeWorld('first', 4127), later = passTime(s, 50);
  assert.equal(later.turn, s.turn + 50);
  assert.equal(later.oil, s.oil);
  assert.equal(later.hero, s.hero);
});
