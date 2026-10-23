// § profile: who plays on this device, three slots (D-268)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOTS, FORMAT, UPGRADES, newProfiles, unpackProfiles, packProfiles, playing, withDeepest, loadProfiles, saveProfiles } from '../src/core/profile.js';
import { journeyKey, loadJourney, saveJourney } from '../src/core/save.js';
import { makeWorld } from '../src/core/turn.js';

// A localStorage made of a plain object, for one test
function withStorage(kept, fn) {
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = String(v); } };
  try { fn(); } finally { delete globalThis.localStorage; }
}

test('at the start: three slots, the first in use, unnamed, with no look and no Records', () => {
  const ps = newProfiles();
  assert.equal(ps.slots.length, SLOTS);
  assert.equal(SLOTS, 3);
  assert.deepEqual(playing(ps), { name: '', look: {}, records: { deepest: 0, beaten: 0, falls: 0, found: 0 } });
  assert.deepEqual(ps.slots.slice(1), [null, null]);
});

test('a new deepest depth changes only the profile in play', () => {
  const ps = { current: 1, slots: [newProfiles(4).slots[0], newProfiles().slots[0], null] };
  const after = withDeepest(ps, 7);
  assert.equal(playing(after).records.deepest, 7);
  assert.equal(after.slots[0].records.deepest, 4);
  assert.equal(ps.slots[1].records.deepest, 0); // the old list is left as it was
});

test('profiles come back as they were kept; broken or newer ones give null', () => {
  const ps = withDeepest(newProfiles(), 5);
  assert.deepEqual(unpackProfiles(JSON.parse(JSON.stringify(packProfiles(ps)))), ps);
  for (const format of [FORMAT + 1, 0, undefined]) assert.equal(unpackProfiles({ format, profiles: ps }), null);
  const broken = [
    { ...ps, current: 1 }, // an empty slot in use
    { ...ps, slots: ps.slots.slice(0, 2) },
    { ...ps, slots: [{ name: 3, look: {}, records: { deepest: 0, beaten: 0, falls: 0, found: 0 } }, null, null] },
    { ...ps, slots: [{ name: '', look: {}, records: { deepest: -1, beaten: 0, falls: 0, found: 0 } }, { name: '', look: {}, records: { deepest: 0, beaten: 1.5, falls: 0, found: 0 } }, null, null] },
  ];
  for (const b of broken) assert.equal(unpackProfiles(packProfiles(b)), null);
  assert.equal(unpackProfiles(null), null);
});

test('every older profile format has a step up to the next (D-266)', () => {
  for (let f = 1; f < FORMAT; f++) assert.equal(typeof UPGRADES[f], 'function', `step ${f} → ${f + 1}`);
});

test('with no storage it starts fresh and saving does not throw', () => {
  assert.deepEqual(loadProfiles(), newProfiles());
  saveProfiles(newProfiles());
});

test('the deepest depth kept before profiles moves into the first slot; nothing is lost', () => {
  const kept = { 'gloamdeep-deepest': '6' };
  withStorage(kept, () => {
    assert.equal(playing(loadProfiles()).records.deepest, 6);
    saveProfiles(withDeepest(loadProfiles(), 8));
    assert.equal(playing(loadProfiles()).records.deepest, 8); // kept profiles win over the old record
    kept['gloamdeep-profiles'] = '{"format":1';
    assert.equal(playing(loadProfiles()).records.deepest, 6); // a broken list falls back quietly
  });
});

test("each slot's journey has its own place; the first is where the one journey was kept", () => {
  assert.equal(journeyKey(0), 'gloamdeep-journey');
  assert.deepEqual([1, 2].map(journeyKey), ['gloamdeep-journey-2', 'gloamdeep-journey-3']);
  withStorage({}, () => {
    const a = makeWorld('first', 3), b = makeWorld('first', 4);
    saveJourney(a, false); saveJourney(b, true, 2);
    assert.deepEqual(loadJourney(0).state, a);
    assert.equal(loadJourney(1), null);
    assert.deepEqual(loadJourney(2), { state: b, jumped: true });
  });
});

test('a first-format profile list comes up with no counts yet, its deepest kept (D-270)', () => {
  const old = { format: 1, profiles: { current: 0, slots: [{ name: '', look: {}, records: { deepest: 4 } }, null, null] } };
  assert.deepEqual(playing(unpackProfiles(old)).records, { deepest: 4, beaten: 0, falls: 0, found: 0 });
});
