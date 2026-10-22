// § jab: the knife's stab, half a tile toward the foe and back (D-253)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { jabAt, JAB_MS, JAB_PX } from '../src/render/jab.js';

const jab = { dx: 1, dy: 0, start: 1000 };

test('the jab goes out half a tile at its middle and is back at its end', () => {
  assert.equal(JAB_PX, 8);
  assert.deepEqual(jabAt(jab, 1000), { x: 0, y: 0 });
  assert.deepEqual(jabAt(jab, 1000 + JAB_MS / 2), { x: JAB_PX, y: 0 });
  assert.deepEqual(jabAt(jab, 1000 + JAB_MS), { x: 0, y: 0 });
  assert.ok(jabAt(jab, 1000 + JAB_MS / 4).x > 0 && jabAt(jab, 1000 + JAB_MS / 4).x < JAB_PX);
});

test('the jab follows the direction of the hit, and is nothing with no jab', () => {
  assert.deepEqual(jabAt({ dx: 0, dy: -1, start: 0 }, JAB_MS / 2), { x: 0, y: -JAB_PX });
  assert.deepEqual(jabAt(null, 5), { x: 0, y: 0 });
});
