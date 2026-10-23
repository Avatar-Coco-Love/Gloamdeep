// § profile: who plays on this device, three slots (D-268)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOTS, FORMAT, UPGRADES, newProfile, newProfiles, unpackProfiles, packProfiles, playing, withDeepest, loadProfiles, saveProfiles, slotName, usingSlot, withoutSlot, renamedSlot, lookedSlot } from '../src/core/profile.js';
import { slotLines, slotsAt, slotsHeading } from '../src/render/slots.js';
import { journeyKey, loadJourney, saveJourney, dropJourney } from '../src/core/save.js';
import { makeWorld } from '../src/core/turn.js';

// A localStorage made of a plain object, for one test
function withStorage(kept, fn) {
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = String(v); }, removeItem: (k) => { delete kept[k]; } };
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

// § slots: the slot screen's rules (D-271)
test('an unnamed profile shows as Profile and its slot number; a named one by its name', () => {
  assert.equal(slotName(newProfile(), 1), 'Profile 2');
  assert.equal(slotName({ ...newProfile(), name: 'Coco' }, 0), 'Coco');
});

test('picking an empty slot makes a new profile there and plays as it; a used one is kept', () => {
  const ps = newProfiles(4);
  const two = usingSlot(ps, 1);
  assert.equal(two.current, 1);
  assert.deepEqual(two.slots[1], newProfile());
  assert.equal(two.slots[0], ps.slots[0]);
  assert.equal(usingSlot(two, 0).slots[1], two.slots[1]); // back to the first, the second stays
});

test('a new profile takes the name typed on the name pad; a used one keeps its own', () => {
  const named = usingSlot(newProfiles(), 2, 'COCO');
  assert.equal(named.slots[2].name, 'COCO');
  assert.equal(slotName(named.slots[2], 2), 'COCO');
  assert.equal(usingSlot(named, 2, 'TOM').slots[2].name, 'COCO');
});

test('renaming changes only the name; nothing typed makes it unnamed; an empty slot stays empty (D-273)', () => {
  const ps = usingSlot(newProfiles(4), 0, 'COCO');
  const tom = renamedSlot(ps, 0, 'TOM');
  assert.deepEqual(tom.slots[0], { ...ps.slots[0], name: 'TOM' });
  assert.equal(tom.current, 0);
  assert.equal(slotName(renamedSlot(tom, 0, '').slots[0], 0), 'Profile 1');
  assert.equal(renamedSlot(ps, 1, 'TOM').slots[1], null);
});

test('the slot screen: Rename, Look, Delete, the one being done reads Cancel, a tap picks the nearest line', () => {
  assert.deepEqual(slotLines(null, true).map((l) => l.text), ['Rename', 'Look', 'Delete', 'Back']);
  assert.deepEqual(slotLines('rename', false).map((l) => l.text), ['Cancel', 'Look', 'Delete']);
  assert.deepEqual(slotLines('look', false).map((l) => l.text), ['Rename', 'Cancel', 'Delete']);
  assert.deepEqual(slotLines('delete', false).map((l) => l.text), ['Rename', 'Look', 'Cancel']);
  assert.equal(slotsHeading('rename'), 'Rename which?');
  assert.equal(slotsHeading('look'), 'Change whose look?');
  assert.equal(slotsHeading(null), 'Profiles');
  const lines = slotLines(null, true), seen = new Set();
  for (let y = 145; y < 225; y++) seen.add(slotsAt(y, lines));
  for (const id of ['rename', 'look', 'delete', 'back']) assert.ok(seen.has(id), id);
  assert.equal(slotsAt(158, lines), 'rename');
  assert.equal(slotsAt(174, lines), 'look');
  assert.equal(slotsAt(190, lines), 'delete');
  assert.equal(slotsAt(210, lines), 'back');
});

test('a new profile wears the cloak chosen after its name; Look changes only the look (P3)', () => {
  const ps = usingSlot(newProfiles(), 1, 'COCO', { cloak: 'moss' });
  assert.deepEqual(ps.slots[1].look, { cloak: 'moss' });
  const rust = lookedSlot(ps, 1, { cloak: 'rust' });
  assert.deepEqual(rust.slots[1], { ...ps.slots[1], look: { cloak: 'rust' } });
  assert.equal(rust.current, 1);
  assert.equal(lookedSlot(ps, 2, { cloak: 'rust' }).slots[2], null); // an Empty box has no look
});

test('deleting a slot empties it; the next profile in use takes over, or none is in use', () => {
  const ps = usingSlot(usingSlot(newProfiles(4), 2), 0); // slots 1 and 3 in use, the first playing
  assert.deepEqual(withoutSlot(ps, 2), { current: 0, slots: [ps.slots[0], null, null] });
  const after = withoutSlot(ps, 0);
  assert.equal(after.current, 2);
  const none = withoutSlot(after, 2);
  assert.deepEqual(none, { current: null, slots: [null, null, null] });
  assert.deepEqual(unpackProfiles(packProfiles(none)), none); // kept and read back, no old record brought back
  assert.equal(unpackProfiles(packProfiles({ current: null, slots: ps.slots })), null); // none in use only when all are empty
});

test('a deleted profile\'s journey goes with it, and the others stay', () => {
  const kept = {};
  withStorage(kept, () => {
    const s = makeWorld('first', 7);
    saveJourney(s, false, 0); saveJourney(s, false, 1);
    dropJourney(1);
    assert.equal(loadJourney(1), null);
    assert.ok(loadJourney(0));
  });
});
