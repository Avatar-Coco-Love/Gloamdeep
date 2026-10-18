// § noise: the same tile always gets the same noise, inside [0, 1)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hash } from '../src/core/noise.js';

test('hash is repeatable and in range', () => {
  for (let i = 0; i < 200; i++) {
    const v = hash(i % 11, i % 13, i);
    assert.equal(v, hash(i % 11, i % 13, i));
    assert.ok(v >= 0 && v < 1);
  }
});
