// § menu: the title screen's and pause menu's lines, and moving between them
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TITLE_MENU, PAUSE_MENU, titleMenu, SURE_MENU, SURE_HEADING, SURE_NOTE, settingsMenu, moveChoice } from '../src/core/menu.js';
import { CONTROLS } from '../src/core/settings.js';
import { lineAt, pauseTop, LINE_GAP } from '../src/render/menu.js';
import { SCREEN_H, W } from '../src/render/screen.js';
import { textWidth } from '../src/render/font.js';

test('the title menu offers New journey first, then How to play, Settings, and the Seed Explorer last (D-214)', () => {
  assert.deepEqual(TITLE_MENU.map((l) => l.id), ['new', 'howto', 'settings', 'explore']);
});

test('Continue shows, first, only while a journey is saved (D-178, D-238)', () => {
  assert.deepEqual(titleMenu(false).map((l) => l.id), ['new', 'howto', 'settings', 'explore']);
  assert.deepEqual(titleMenu(true).map((l) => l.id), ['continue', 'new', 'howto', 'settings', 'explore']);
});

test('Start over? asks Yes or No, and its words fit the picture (D-238)', () => {
  assert.deepEqual(SURE_MENU.map((l) => l.id), ['yes', 'no']);
  for (const words of [SURE_HEADING, SURE_NOTE]) assert.ok(textWidth(words) <= W);
});

test('Up and Down move the choice and stop at the ends', () => {
  assert.equal(moveChoice(0, 'down', 3), 1);
  assert.equal(moveChoice(2, 'down', 3), 2);
  assert.equal(moveChoice(0, 'up', 3), 0);
  assert.equal(moveChoice(1, 'left', 3), 1);
});

test('the pause menu offers Resume, Settings, How to play, then Back to title, and nothing that does not work yet', () => {
  assert.deepEqual(PAUSE_MENU.map((l) => l.id), ['resume', 'settings', 'howto', 'title']);
});

test('Settings shows Controls, Motion, Seed, then Back, and every choice fits the picture with its flame', () => {
  assert.deepEqual(settingsMenu({ controls: 'tap', motion: null, seed: null }).map((l) => l.text), ['Controls: Tap only', 'Motion: Full', 'Seed: Random', 'Lantern: By hand', 'Flasks: By hand', 'Sound: Off', 'Version history', 'Back']);
  assert.equal(settingsMenu({ controls: 'tap', motion: null }, true)[1].text, 'Motion: Reduced');
  assert.ok(textWidth(settingsMenu({ seed: null }, false, 99999)[2].text) + 2 * 8 <= W);
  for (const c of CONTROLS) assert.ok(textWidth(settingsMenu({ controls: c.id })[0].text) + 2 * 8 <= W);
});

test('with a heading, the heading and lines still sit inside the picture', () => {
  const top = pauseTop(6, true); // Settings: Controls, Motion, Seed, Lantern, Flasks, Back
  assert.ok(top - LINE_GAP > 0 && top + 5 * LINE_GAP < SCREEN_H);
});

test('a tap picks the line under it, near it, or none', () => {
  const top = pauseTop(2);
  assert.ok(top > 0 && top + LINE_GAP < SCREEN_H);
  assert.equal(lineAt(top + 2, 2, top), 0);
  assert.equal(lineAt(top + LINE_GAP + 2, 2, top), 1);
  assert.equal(lineAt(0, 2, top), -1);
});
