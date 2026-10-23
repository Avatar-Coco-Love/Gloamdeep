// § record: the deepest depth kept (D-021, D-232)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deeper, recordText } from '../src/core/record.js';

test('walking deeper raises the record; going back up keeps it', () => {
  assert.equal(deeper(3, 4), 4);
  assert.equal(deeper(4, 2), 4);
  assert.equal(deeper(0, 0), 0);
});

test('after a dev jump the journey stops counting', () => {
  assert.equal(deeper(3, 40, true), 3);
});

test('the title line shows only below the surface', () => {
  assert.equal(recordText(0), null);
  assert.equal(recordText(7), 'Deepest: depth 7');
});
