// § save: the journey kept on this device (D-238)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unpackJourney, journeyText, readJourney, loadJourney, saveJourney, FORMAT } from '../src/core/save.js';
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

test('nothing kept, an older format or a broken save gives null', () => {
  assert.equal(unpackJourney(null), null);
  assert.equal(unpackJourney({ format: FORMAT - 1, state: makeWorld('first', 1) }), null);
  assert.equal(unpackJourney({ format: FORMAT, state: { hero: 1 } }), null);
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
