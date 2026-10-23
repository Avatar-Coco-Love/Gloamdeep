// § sound: the Sound switch, On until picked, flips to Off and back (D-178, D-255).
// The footstep itself is Web Audio, in render/, so it is heard in the playtest.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { soundText, nextSound, loadSettings } from '../src/core/settings.js';

test('Sound starts On and flips to Off and back', () => {
  assert.equal(soundText(undefined), 'Sound: On');
  assert.equal(loadSettings().sound, 'on'); // no localStorage here
  assert.equal(nextSound('on'), 'off');
  assert.equal(soundText('off'), 'Sound: Off');
  assert.equal(nextSound('off'), 'on');
});
