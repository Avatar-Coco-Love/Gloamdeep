// § looks: the cloak's colours and the cloak screen (P3), the eyes and their screen (P4), the trim (P5), the clothes (P6)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLOAKS, CLOAK_IDS, CLOAK_PAD, DEFAULT_CLOAK, cloakOf, moveCloak, EYES, EYE_IDS, EYES_PAD, DEFAULT_EYES, eyesOf, moveEyes, TRIMS, TRIM_IDS, TRIM_PAD, DEFAULT_TRIM, trimOf, moveTrim, CLOTHES, CLOTHES_IDS, CLOTHES_PAD, DEFAULT_CLOTHES, clothesOf, moveClothes } from '../src/core/looks.js';
import { CLOAKS as REGISTERED, EYES as REGISTERED_EYES, TRIMS as REGISTERED_TRIMS, CLOTHES as REGISTERED_CLOTHES, get } from '../src/core/registry.js';

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

test('six eye colours, bone first; the registry has them; none kept out', () => {
  assert.deepEqual(EYE_IDS, ['bone', 'ice', 'moss', 'sky', 'silver', 'brown']);
  assert.equal(REGISTERED_EYES, EYES);
  assert.equal(EYES.bone.colour, '#efe6cc'); // the study's
  for (const e of Object.values(EYES)) {
    assert.equal(e.kind, 'eyes');
    assert.match(e.colour, /^#[0-9a-f]{6}$/, e.id);
    assert.ok(!['#e8786a', '#ffd66b', '#a58ce0', '#0e0c16'].includes(e.colour), e.id); // enemies, lantern, stairs, outline
  }
});

test('a profile from before P4, or with unknown eyes, has bone eyes', () => {
  assert.equal(DEFAULT_EYES, 'bone');
  assert.equal(eyesOf({ look: { cloak: 'rust' } }), 'bone');
  assert.equal(eyesOf({ look: { eyes: 'plaid' } }), 'bone');
  assert.equal(eyesOf(undefined), 'bone');
  assert.equal(eyesOf({ look: { eyes: 'sky' } }), 'sky');
});

test('the eyes screen has the cloak screen\'s shape, and the arrows walk it the same', () => {
  assert.deepEqual(EYES_PAD.map(({ row, col, span }) => [row, col, span]), CLOAK_PAD.map(({ row, col, span }) => [row, col, span]));
  const at = (id) => EYES_PAD.findIndex((k) => k.id === id);
  assert.equal(moveEyes(at('bone'), 'right'), at('ice'));
  assert.equal(moveEyes(at('ice'), 'down'), at('silver'));
  assert.equal(moveEyes(at('silver'), 'down'), at('ok'));
  assert.equal(moveEyes(at('ok'), 'down'), at('back'));
});

test('six trims, brass first, each a cap and a base shade; the registry has them; none kept out', () => {
  assert.deepEqual(TRIM_IDS, ['brass', 'iron', 'copper', 'silver', 'verdigris', 'blackened']);
  assert.equal(REGISTERED_TRIMS, TRIMS);
  assert.deepEqual(TRIMS.brass.shades, ['#e8d5a0', '#a8642c']); // the study's
  for (const t of Object.values(TRIMS)) {
    assert.equal(t.kind, 'trim');
    assert.equal(t.shades.length, 2, t.id);
    for (const s of t.shades) {
      assert.match(s, /^#[0-9a-f]{6}$/, t.id);
      assert.ok(!['#e8786a', '#ffd66b', '#f39a3b', '#a58ce0', '#0e0c16'].includes(s), t.id); // enemies, flame, stairs, outline
    }
  }
});

test('a profile from before P5, or with an unknown trim, has brass', () => {
  assert.equal(DEFAULT_TRIM, 'brass');
  assert.equal(trimOf({ look: { cloak: 'rust', eyes: 'sky' } }), 'brass');
  assert.equal(trimOf({ look: { trim: 'gold' } }), 'brass');
  assert.equal(trimOf(undefined), 'brass');
  assert.equal(trimOf({ look: { trim: 'verdigris' } }), 'verdigris');
});

test('the trim screen has the cloak screen\'s shape, and the arrows walk it the same', () => {
  assert.deepEqual(TRIM_PAD.map(({ row, col, span }) => [row, col, span]), CLOAK_PAD.map(({ row, col, span }) => [row, col, span]));
  const at = (id) => TRIM_PAD.findIndex((k) => k.id === id);
  assert.equal(moveTrim(at('brass'), 'right'), at('iron'));
  assert.equal(moveTrim(at('iron'), 'down'), at('verdigris'));
  assert.equal(moveTrim(at('verdigris'), 'down'), at('ok'));
  assert.equal(moveTrim(at('ok'), 'down'), at('back'));
});

test('four clothes, the cloak first; the registry has them', () => {
  assert.deepEqual(CLOTHES_IDS, ['cloak', 'belted', 'short', 'tattered']);
  assert.equal(REGISTERED_CLOTHES, CLOTHES);
  for (const k of Object.values(CLOTHES)) assert.equal(k.kind, 'clothes');
  assert.deepEqual(CLOTHES_IDS.map((id) => CLOTHES[id].name), ['Cloak', 'Belted', 'Short', 'Tattered']);
});

test('a profile from before P6, or with unknown clothes, wears the cloak', () => {
  assert.equal(DEFAULT_CLOTHES, 'cloak');
  assert.equal(clothesOf({ look: { cloak: 'rust', eyes: 'sky', trim: 'iron' } }), 'cloak');
  assert.equal(clothesOf({ look: { clothes: 'armour' } }), 'cloak');
  assert.equal(clothesOf(undefined), 'cloak');
  assert.equal(clothesOf({ look: { clothes: 'tattered' } }), 'tattered');
});

test('the clothes screen: two heroes to a row, then OK, then Back; the arrows walk them', () => {
  const at = (id) => CLOTHES_PAD.findIndex((k) => k.id === id);
  assert.deepEqual(CLOTHES_PAD.map(({ row, col }) => [row, col]), [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [3, 0]]);
  assert.equal(moveClothes(at('cloak'), 'right'), at('belted'));
  assert.equal(moveClothes(at('belted'), 'right'), at('belted')); // the row's end
  assert.equal(moveClothes(at('belted'), 'down'), at('tattered'));
  assert.equal(moveClothes(at('tattered'), 'down'), at('ok'));
  assert.equal(moveClothes(at('ok'), 'up'), at('short'));
  assert.equal(moveClothes(at('ok'), 'down'), at('back'));
});
