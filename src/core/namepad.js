// § name pad: typing a new profile's name (D-272). Letters A to Z, Del and OK on a
// 7-column grid, Back on its own row under them (D-288); up to 12 letters, kept in capitals (D-268). Plain data, no drawing.
import { moveOn } from './seedpad.js';

export const NAME_MAX = 12;
export const NAME_COLS = 7;
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Each key: { id, text, row, col, span }; the letters 7 to a row, then Del and OK, then Back
export const NAME_PAD = [
  ...[...LETTERS].map((l, i) => ({ id: l, text: l, row: Math.floor(i / NAME_COLS), col: i % NAME_COLS, span: 1 })),
  { id: 'del', text: 'Del', row: 4, col: 0, span: 3 },
  { id: 'ok', text: 'OK', row: 4, col: 3, span: 4 },
  { id: 'back', text: 'Back', row: 5, col: 0, span: 7 },
];
export const NAME_ROWS = 6;

// § typing: (entry, key id) → the entry after it; a letter in either case types its capital
export function typeLetter(entry, id) {
  if (id === 'del') return entry.slice(0, -1);
  const l = id.toUpperCase();
  return id.length === 1 && LETTERS.includes(l) && entry.length < NAME_MAX ? entry + l : entry;
}
export const moveName = (i, dir) => moveOn(NAME_PAD, i, dir);
