// § save: the journey kept on this device (D-238)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unpackJourney, packJourney, journeyText, readJourney, loadJourney, saveJourney, FORMAT, UPGRADES, upgradeState } from '../src/core/save.js';
import { makeWorld, step, DIRS } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';

const roundTrip = (s, jumped = false) => readJourney(journeyText(s, jumped));

test('a journey comes back exactly as it was kept', () => {
  let s = makeWorld('first', 4127);
  for (const d of ['down', 'down', 'right', 'up']) s = step(s, d);
  s = goToDepth(s, 9);
  const back = roundTrip(s, true);
  assert.deepEqual(back.state, s);
  assert.equal(back.jumped, true);
});

test('a kept journey plays on the same as the one it was kept from', () => {
  let s = makeWorld('first', 77);
  for (const d of ['down', 'right']) s = step(s, d);
  let a = s, b = roundTrip(s).state;
  for (const d of Object.keys(DIRS).slice(0, 4)) { a = step(a, d); b = step(b, d); }
  assert.deepEqual(b, a);
});

test('nothing kept, a broken save or one from a newer game gives null (dropped quietly, D-266)', () => {
  const s = makeWorld('first', 1);
  assert.equal(unpackJourney(null), null);
  assert.equal(unpackJourney({ format: FORMAT, state: { hero: 1 } }), null);
  for (const format of [FORMAT + 1, 0, undefined, '1', 1.5]) assert.equal(unpackJourney({ format, state: s }), null);
});

test('every older format has a step up to the next (D-266)', () => {
  for (let f = 1; f < FORMAT; f++) assert.equal(typeof UPGRADES[f], 'function', `step ${f} → ${f + 1}`);
  const s = makeWorld('first', 5);
  assert.deepEqual(upgradeState(FORMAT, s), s); // today's shape is left as it is
});

test('a format 1 save, from before experience and the bag, is upgraded, not dropped', () => {
  const { xp, found, bag, held, ...old } = makeWorld('first', 9);
  const back = unpackJourney({ format: 1, jumped: true, state: old });
  assert.equal(back.jumped, true);
  assert.deepEqual(back.state.found, ['first']);
  assert.equal(back.state.xp, 0);
  assert.deepEqual(back.state.bag, []);
  assert.equal(back.state.held, null);
  assert.deepEqual(back.state, makeWorld('first', 9));
  const now = unpackJourney(packJourney(back.state));
  assert.deepEqual(now.state, back.state);
});

test('saving and loading go through localStorage, and work without it', () => {
  assert.equal(loadJourney(), null); // no localStorage here
  saveJourney(makeWorld('first', 3), false); // does not throw
  const kept = {};
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    const s = makeWorld('first', 3);
    saveJourney(s, false);
    assert.deepEqual(loadJourney().state, s);
  } finally { delete globalThis.localStorage; }
});
