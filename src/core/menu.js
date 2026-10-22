// § menu: the title screen's lines (D-177). Only what works is listed (D-178):
// Continue only while a journey is saved, first and already picked (D-238). Plain data, no drawing.
import { controlsText, motionText, seedText, lanternText, flasksText } from './settings.js';

// The Seed Explorer, a dev tool, is its last line (D-214)
export const TITLE_MENU = [{ id: 'new', text: 'New journey' }, { id: 'howto', text: 'How to play' }, { id: 'settings', text: 'Settings' }, { id: 'explore', text: 'Seed Explorer' }];
export const titleMenu = (saved) => (saved ? [{ id: 'continue', text: 'Continue' }, ...TITLE_MENU] : TITLE_MENU);
// New journey asks first while a journey is saved (D-238)
export const SURE_MENU = [{ id: 'yes', text: 'Yes' }, { id: 'no', text: 'No' }];
export const SURE_HEADING = 'Start over?';
export const SURE_NOTE = 'The saved journey is lost.';
// The pause menu during play (D-177, D-187, D-193)
export const PAUSE_MENU = [{ id: 'resume', text: 'Resume' }, { id: 'settings', text: 'Settings' }, { id: 'howto', text: 'How to play' }, { id: 'title', text: 'Back to title' }];
// Settings, from the title or the pause menu (D-189, D-190, D-210): picking a switch moves it to the next choice.
// deviceReduced: the device's own reduced-motion setting, which Motion follows until picked;
// journey: this journey's seed, named from the pause menu (D-191), else null
export const settingsMenu = (s, deviceReduced = false, journey = null) => [
  { id: 'controls', text: controlsText(s.controls) },
  { id: 'motion', text: motionText(s.motion, deviceReduced) },
  { id: 'seed', text: seedText(s.seed, journey) },
  { id: 'lantern', text: lanternText(s.lantern) },
  { id: 'flasks', text: flasksText(s.flasks) },
  { id: 'back', text: 'Back' },
];

// § move: Up and Down walk the lines and stop at the ends
export const moveChoice = (i, dir, count) => Math.max(0, Math.min(count - 1, i + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)));
