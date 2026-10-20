// § settings: the Controls and Motion switches (D-179, D-189, D-190)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextControl, controlsText, swipesWalk, tapsWalk, loadSettings, saveSettings, stillMotion, motionText, nextMotion } from '../src/core/settings.js';

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
  assert.deepEqual(loadSettings(), { controls: 'both', motion: null }); // no localStorage here
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
    assert.deepEqual(loadSettings(), { controls: 'tap', motion: 'reduced' });
  } finally { delete globalThis.localStorage; }
});
