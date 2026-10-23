// § journal: one book with tabs, Records first (J1, D-262, D-270)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TABS, recordRows, journalWords } from '../src/core/journal.js';
import { counted } from '../src/core/record.js';
import { newProfile } from '../src/core/profile.js';
import { journalAt } from '../src/render/journal.js';
import { BACK_Y } from '../src/render/history.js';

const records = { deepest: 3, beaten: 12, falls: 4, found: 27, steps: 1843, poured: 6, torches: 2 };

test('Records is the one tab for now', () => {
  assert.deepEqual(TABS.map((t) => t.text), ['Records']);
});

test('the Records tab shows the deepest depth, creatures beaten, falls, rooms found, steps, flasks poured and torches lit (D-283, D-285, D-286)', () => {
  assert.deepEqual(recordRows(records).map((r) => [r.text, r.value]), [['Deepest', 'depth 3'], ['Beaten', '12'], ['Falls', '4'], ['Rooms found', '27'], ['Steps', '1843'], ['Flasks poured', '6'], ['Torches lit', '2']]);
  assert.equal(journalWords(records), 'Journal, Records tab. Deepest, depth 3. Beaten, 12. Falls, 4. Rooms found, 27. Steps, 1843. Flasks poured, 6. Torches lit, 2. Back.');
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
  assert.equal(journalAt(BACK_Y + 2), 'back');
  assert.equal(journalAt(60), null);
});
