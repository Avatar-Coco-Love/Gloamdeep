// § menu: the title screen's lines and moving between them
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TITLE_MENU, moveChoice } from '../src/core/menu.js';

test('the title menu offers New journey first', () => {
  assert.equal(TITLE_MENU[0].text, 'New journey');
});

test('Up and Down move the choice and stop at the ends', () => {
  assert.equal(moveChoice(0, 'down', 3), 1);
  assert.equal(moveChoice(2, 'down', 3), 2);
  assert.equal(moveChoice(0, 'up', 3), 0);
  assert.equal(moveChoice(1, 'left', 3), 1);
});
