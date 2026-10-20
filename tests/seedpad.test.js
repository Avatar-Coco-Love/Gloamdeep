// § seed pad: typing a seed (D-191)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PAD, typeKey, entrySeed, moveKey } from '../src/core/seedpad.js';

const at = (id) => PAD.findIndex((k) => k.id === id);

test('digits type up to 5, Del takes the last, a 0 first is skipped', () => {
  let e = '';
  for (const k of ['0', '4', '0', '7', '1', '9', '9']) e = typeKey(e, k);
  assert.equal(e, '40719');
  assert.equal(typeKey(e, 'del'), '4071');
  assert.equal(typeKey('', 'del'), '');
});

test('OK keeps the typed seed, or Random when nothing is typed', () => {
  assert.equal(entrySeed('4071'), 4071);
  assert.equal(entrySeed(''), null);
});

test('arrows walk the grid, keep the column and stop at the edges', () => {
  assert.equal(moveKey(at('1'), 'left'), at('1'));
  assert.equal(moveKey(at('1'), 'up'), at('1'));
  assert.equal(moveKey(at('4'), 'right'), at('4'));
  assert.equal(moveKey(at('3'), 'down'), at('7'));
  assert.equal(moveKey(at('8'), 'down'), at('del')); // the row below is shorter
  assert.equal(moveKey(at('0'), 'down'), at('random'));
  assert.equal(moveKey(at('del'), 'down'), at('ok'));
  assert.equal(moveKey(at('ok'), 'up'), at('del'));
  assert.equal(moveKey(at('random'), 'right'), at('ok'));
  assert.equal(moveKey(at('ok'), 'down'), at('ok'));
});
