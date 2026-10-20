// § settings: the Controls, Motion, Seed and Lantern lines (D-179, D-189 to D-191, D-210)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextControl, controlsText, swipesWalk, tapsWalk, loadSettings, saveSettings, stillMotion, motionText, nextMotion, seedText, lanternText, nextLantern } from '../src/core/settings.js';

test('picking Controls goes Tap and swipe, Tap only, Swipe only, and round again; Left goes back', () => {
  assert.equal(nextControl('both'), 'tap');
  assert.equal(nextControl('tap'), 'swipe');
  assert.equal(nextControl('swipe'), 'both');
  assert.equal(nextControl('both', true), 'swipe');
  assert.equal(controlsText('swipe'), 'Controls: Swipe only');
});

test('Tap only stops swipes walking; Swipe only stops taps walking', () => {
  assert.ok(swipesWalk('both') && tapsWalk('both'));
  assert.ok(!swipesWalk('tap') && tapsWalk('tap'));
  assert.ok(swipesWalk('swipe') && !tapsWalk('swipe'));
});

test('with no storage, or a strange value kept, it starts on Tap and swipe', () => {
  assert.deepEqual(loadSettings(), { controls: 'both', motion: null, seed: null, lantern: 'hand' }); // no localStorage here
  saveSettings({ controls: 'tap' }); // does not throw
  const kept = { 'gloamdeep-settings': '{"controls":"fly"}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().controls, 'both');
    saveSettings({ controls: 'swipe' });
    assert.equal(loadSettings().controls, 'swipe');
  } finally { delete globalThis.localStorage; }
});

test('Motion follows the device until picked; then the pick wins, either way', () => {
  assert.equal(stillMotion(null, false), false);
  assert.equal(stillMotion(null, true), true);
  assert.equal(motionText(null, true), 'Motion: Reduced');
  assert.equal(nextMotion(null, true), 'full');
  assert.equal(stillMotion('full', true), false);
  assert.equal(nextMotion(null, false), 'reduced');
  assert.equal(stillMotion('reduced', false), true);
  assert.equal(motionText('full', false), 'Motion: Full');
});

test('a kept Motion choice comes back; a strange one follows the device', () => {
  const kept = { 'gloamdeep-settings': '{"controls":"tap","motion":"wobbly"}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().motion, null);
    saveSettings({ controls: 'tap', motion: 'reduced' });
    assert.deepEqual(loadSettings(), { controls: 'tap', motion: 'reduced', seed: null, lantern: 'hand' });
  } finally { delete globalThis.localStorage; }
});

test('the Seed line reads Random or the typed seed; from the pause menu Random names this journey', () => {
  assert.equal(seedText(null), 'Seed: Random');
  assert.equal(seedText(4071), 'Seed: 4071');
  assert.equal(seedText(null, 4071), 'Seed: Random (this one 4071)');
  assert.equal(seedText(12, 4071), 'Seed: 12');
});

test('a kept seed comes back; one out of 1 to 99999 is Random', () => {
  const kept = { 'gloamdeep-settings': '{"seed":100000}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().seed, null);
    saveSettings({ controls: 'both', motion: null, seed: 4071 });
    assert.equal(loadSettings().seed, 4071);
  } finally { delete globalThis.localStorage; }
});

test('Lantern starts By hand and flips to By itself and back', () => {
  assert.equal(lanternText(undefined), 'Lantern: By hand');
  assert.equal(nextLantern('hand'), 'self');
  assert.equal(lanternText('self'), 'Lantern: By itself');
  assert.equal(nextLantern('self'), 'hand');
});
