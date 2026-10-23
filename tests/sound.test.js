// § sound: the Sound switch, Off until picked, flips to On and back (D-178, D-255).
// The footstep itself is Web Audio, in render/, so it is heard in the playtest.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { soundText, nextSound, loadSettings } from '../src/core/settings.js';
import { biteSound } from '../src/core/enemies.js';

test('Sound starts Off and flips to On and back', () => {
  assert.equal(soundText(undefined), 'Sound: Off');
  assert.equal(loadSettings().sound, 'off'); // no localStorage here
  assert.equal(nextSound('off'), 'on');
  assert.equal(soundText('on'), 'Sound: On');
  assert.equal(nextSound('on'), 'off');
});

// § bite sound: a rat's bite sounds of teeth; the gloamling's is silent for now (D-259)

test("A rat's bite sounds of teeth, a gloamling's of nothing", () => {
  assert.equal(biteSound({ line: { id: 'ratBite' } }, false), 'teeth');
  assert.equal(biteSound({ line: { id: 'gloamlingBite' } }, false), undefined);
  const hero = { x: 3, y: 3 };
  assert.equal(biteSound({ fell: { hero, enemies: [{ id: 'rat', x: 3, y: 4 }] } }, true), 'teeth');
  assert.equal(biteSound({ fell: { hero, enemies: [{ id: 'gloamling', x: 2, y: 3 }, { id: 'rat', x: 5, y: 5 }] } }, true), undefined);
});
