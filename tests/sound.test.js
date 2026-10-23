// § sound: the Sound switch, Off until picked, flips to On and back (D-178, D-255).
// The footstep itself is Web Audio, in render/, so it is heard in the playtest.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { soundText, nextSound, loadSettings } from '../src/core/settings.js';

test('Sound starts Off and flips to On and back', () => {
  assert.equal(soundText(undefined), 'Sound: Off');
  assert.equal(loadSettings().sound, 'off'); // no localStorage here
  assert.equal(nextSound('off'), 'on');
  assert.equal(soundText('on'), 'Sound: On');
  assert.equal(nextSound('on'), 'off');
});
