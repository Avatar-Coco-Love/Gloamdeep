// § menu: the title screen's lines (D-177). Only what works is listed (D-178);
// Continue and How to play join as their steps arrive. Plain data, no drawing.
import { controlsText } from './settings.js';

export const TITLE_MENU = [{ id: 'new', text: 'New journey' }, { id: 'settings', text: 'Settings' }];
// The pause menu during play (D-177, D-187); How to play joins later.
export const PAUSE_MENU = [{ id: 'resume', text: 'Resume' }, { id: 'settings', text: 'Settings' }, { id: 'title', text: 'Back to title' }];
// Settings, from the title or the pause menu (D-189): picking Controls moves it to the next choice
export const settingsMenu = (s) => [{ id: 'controls', text: controlsText(s.controls) }, { id: 'back', text: 'Back' }];

// § move: Up and Down walk the lines and stop at the ends
export const moveChoice = (i, dir, count) => Math.max(0, Math.min(count - 1, i + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)));
