// § journal: one book with tabs, Records first (J1, D-262, D-270)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TABS, recordRows, journalWords, growthRows, growthWords } from '../src/core/journal.js';
import { counted } from '../src/core/record.js';
import { newProfile } from '../src/core/profile.js';
import { journalAt, ADD_Y } from '../src/render/journal.js';
import { BACK_Y } from '../src/render/history.js';

const records = { deepest: 3, beaten: 12, falls: 4, found: 27, steps: 1843, poured: 6, torches: 2 };

test('Records is the first tab, Growth the second (D-293)', () => {
  assert.deepEqual(TABS.map((t) => t.text), ['Records', 'Growth']);
});

test('the Growth tab shows the embers left and the hearts in all, then Add a heart (D-293)', () => {
  const s = { xp: 30, hearts: 1, health: 6 }; // level 3: two embers, one spent
  assert.deepEqual(growthRows(s).map((r) => [r.text, r.value]), [['Embers', '1'], ['Hearts', '6 of 10']]);
  assert.equal(growthWords(s), 'Journal, Growth tab. Embers, 1. Hearts, 6 of 10. Add a heart, 1 ember. Back.');
  assert.equal(growthWords({ xp: 0, health: 5 }), 'Journal, Growth tab. Embers, 0. Hearts, 5 of 10. Add a heart, 1 ember, not now. Back.');
});

test('the Records tab shows the deepest depth, creatures beaten, falls, rooms found, steps, flasks poured, torches lit and time played (D-283, D-285, D-286, D-291)', () => {
  assert.deepEqual(recordRows(records, 5025).map((r) => [r.text, r.value]), [['Deepest', 'depth 3'], ['Beaten', '12'], ['Falls', '4'], ['Rooms found', '27'], ['Steps', '1843'], ['Flasks poured', '6'], ['Torches lit', '2'], ['Time played', '1h 23m']]);
  assert.equal(journalWords(records, 1380), 'Journal, Records tab. Deepest, depth 3. Beaten, 12. Falls, 4. Rooms found, 27. Steps, 1843. Flasks poured, 6. Torches lit, 2. Time played, 23m. Back.');
});

test('the counts rise with each beat, fall, found, step, pour and torch event, on any journey', () => {
  const r = newProfile().records;
  const after = counted(r, [{ type: 'hit', id: 'rat' }, { type: 'beat', id: 'rat' }, { type: 'found', place: 'second' }, { type: 'fall' }, { type: 'step' }, { type: 'pour', id: 'flask', by: 'hand' }, { type: 'pour', id: 'flask', by: 'self' }, { type: 'torch' }]);
  assert.deepEqual(after, { deepest: 0, beaten: 1, falls: 1, found: 1, steps: 1, poured: 2, torches: 1 });
  assert.deepEqual(r, { deepest: 0, beaten: 0, falls: 0, found: 0, steps: 0, poured: 0, torches: 0 }); // the old one left as it was
});

test('nothing counted is the same Records, and a dev jump stops the counting (D-232)', () => {
  const r = newProfile().records;
  assert.equal(counted(r, [{ type: 'hit', id: 'rat' }]), r);
  assert.equal(counted(r, [{ type: 'beat', id: 'rat' }], true), r);
});

test('a tap on Back, or near it, goes back; elsewhere does nothing', () => {
  assert.equal(journalAt(80, BACK_Y + 2), 'back');
  assert.equal(journalAt(80, 60), null);
});

test('a tap on a tab turns to it, and on Growth a tap on Add a heart picks it (D-293)', () => {
  assert.equal(journalAt(16, 24), 'records');
  assert.equal(journalAt(60, 24), 'growth');
  assert.equal(journalAt(20, ADD_Y + 2, 'growth'), 'heart');
  assert.equal(journalAt(20, ADD_Y + 2, 'records'), null);
});
