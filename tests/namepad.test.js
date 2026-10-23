// § name pad: typing a new profile's name (D-272)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NAME_PAD, NAME_MAX, typeLetter, moveName } from '../src/core/namepad.js';

const at = (id) => NAME_PAD.findIndex((k) => k.id === id);

test('letters type in capitals up to 12, Del takes the last, others are skipped', () => {
  let e = '';
  for (const k of ['c', 'O', '1', ' ', 'c', 'o']) e = typeLetter(e, k);
  assert.equal(e, 'COCO');
  assert.equal(typeLetter(e, 'del'), 'COC');
  assert.equal(typeLetter('', 'del'), '');
  assert.equal(typeLetter('ABCDEFGHIJKL', 'M').length, NAME_MAX);
});

test('the pad holds A to Z, Del and OK', () => {
  assert.equal(NAME_PAD.length, 28);
  assert.equal(NAME_PAD.filter((k) => /^[A-Z]$/.test(k.id)).length, 26);
});

test('arrows walk the grid and stop at its edges', () => {
  assert.equal(moveName(at('A'), 'left'), at('A'));
  assert.equal(moveName(at('A'), 'up'), at('A'));
  assert.equal(moveName(at('G'), 'right'), at('G'));
  assert.equal(moveName(at('C'), 'down'), at('J'));
  assert.equal(moveName(at('T'), 'down'), at('Z')); // the row below is shorter
  assert.equal(moveName(at('Y'), 'down'), at('ok'));
  assert.equal(moveName(at('V'), 'down'), at('del'));
  assert.equal(moveName(at('ok'), 'up'), at('Y'));
  assert.equal(moveName(at('ok'), 'down'), at('ok'));
});
