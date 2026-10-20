// § menu: the title screen's lines (D-177). Only what works is listed (D-178);
// Continue, Settings and How to play join as their steps arrive. Plain data, no drawing.
export const TITLE_MENU = [{ id: 'new', text: 'New journey' }];

// § move: Up and Down walk the lines and stop at the ends
export const moveChoice = (i, dir, count) => Math.max(0, Math.min(count - 1, i + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)));
