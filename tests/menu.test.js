// § menu: the title screen's and pause menu's lines, and moving between them
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TITLE_MENU, PAUSE_MENU, moveChoice } from '../src/core/menu.js';
import { lineAt, pauseTop, LINE_GAP } from '../src/render/menu.js';
import { SCREEN_H } from '../src/render/screen.js';

test('the title menu offers New journey first', () => {
  assert.equal(TITLE_MENU[0].text, 'New journey');
});

test('Up and Down move the choice and stop at the ends', () => {
  assert.equal(moveChoice(0, 'down', 3), 1);
  assert.equal(moveChoice(2, 'down', 3), 2);
  assert.equal(moveChoice(0, 'up', 3), 0);
  assert.equal(moveChoice(1, 'left', 3), 1);
});

test('the pause menu offers Resume, then Back to title, and nothing that does not work yet', () => {
  assert.deepEqual(PAUSE_MENU.map((l) => l.id), ['resume', 'title']);
});

test('a tap picks the line under it, near it, or none', () => {
  const top = pauseTop(2);
  assert.ok(top > 0 && top + LINE_GAP < SCREEN_H);
  assert.equal(lineAt(top + 2, 2, top), 0);
  assert.equal(lineAt(top + LINE_GAP + 2, 2, top), 1);
  assert.equal(lineAt(0, 2, top), -1);
});
