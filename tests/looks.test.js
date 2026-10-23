// § looks: the cloak's colours and the cloak screen (P3)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLOAKS, CLOAK_IDS, CLOAK_PAD, DEFAULT_CLOAK, cloakOf, moveCloak } from '../src/core/looks.js';
import { CLOAKS as REGISTERED, get } from '../src/core/registry.js';

test('six cloaks, teal first, each with four shades; the registry has them', () => {
  assert.deepEqual(CLOAK_IDS, ['teal', 'moss', 'heather', 'rust', 'indigo', 'sand']);
  assert.equal(REGISTERED, CLOAKS);
  for (const k of Object.values(CLOAKS)) {
    assert.equal(k.kind, 'cloak');
    assert.equal(k.shades.length, 4, k.id);
    for (const h of k.shades) assert.match(h, /^#[0-9a-f]{6}$/, k.id);
    assert.equal(get(k.id), undefined, k.id); // not a thing in the world, so no clash with one
  }
  assert.deepEqual(CLOAKS.teal.shades, ['#a6e0e4', '#58a8b4', '#2f6a7c', '#1c3e4e']); // the study's
});

test('a profile from before P3, or with an unknown cloak, wears teal', () => {
  assert.equal(DEFAULT_CLOAK, 'teal');
  assert.equal(cloakOf({ look: {} }), 'teal');
  assert.equal(cloakOf({ look: { cloak: 'plaid' } }), 'teal');
  assert.equal(cloakOf(undefined), 'teal');
  assert.equal(cloakOf({ look: { cloak: 'heather' } }), 'heather');
});

test('the cloak screen: three heroes to a row, then OK, then Back; the arrows walk them', () => {
  const at = (id) => CLOAK_PAD.findIndex((k) => k.id === id);
  assert.equal(moveCloak(at('teal'), 'right'), at('moss'));
  assert.equal(moveCloak(at('heather'), 'right'), at('heather')); // the row's end
  assert.equal(moveCloak(at('moss'), 'down'), at('indigo'));
  assert.equal(moveCloak(at('indigo'), 'down'), at('ok'));
  assert.equal(moveCloak(at('ok'), 'down'), at('back'));
  assert.equal(moveCloak(at('back'), 'down'), at('back'));
  assert.equal(moveCloak(at('ok'), 'up'), at('rust'));
});
