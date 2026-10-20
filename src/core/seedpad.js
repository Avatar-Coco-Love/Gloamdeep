// § seed pad: typing a seed (D-179, D-191). Digits 0 to 9, Del, Random and OK
// on a 4-column grid; up to 5 digits, 1 to 99999 (D-150). Plain data, no drawing.
import { SEED_MAX } from './rng.js';

// Each key: { id, text, row, col, span } on a grid 4 columns wide
const ROWS = [['1', '2', '3', '4'], ['5', '6', '7', '8'], ['9', '0', 'del'], ['random', 'ok']];
const TEXT = { del: 'Del', random: 'Random', ok: 'OK' };
export const PAD_COLS = 4;
export const PAD = ROWS.flatMap((row, r) => {
  const span = row.length === 2 ? 2 : 1;
  return row.map((id, i) => ({ id, text: TEXT[id] || id, row: r, col: i * span, span }));
});
export const PAD_ROWS = ROWS.length;
const DIGITS = String(SEED_MAX).length;

// § typing: (entry, key id) → the entry after it; entry is a string of digits.
// A 0 first is skipped, so the seed is never 0 or led by 0.
export function typeKey(entry, id) {
  if (id === 'del') return entry.slice(0, -1);
  if (/^[0-9]$/.test(id) && entry.length < DIGITS && !(id === '0' && entry === '')) return entry + id;
  return entry;
}
// The seed OK keeps: a number, or null for Random when nothing is typed
export const entrySeed = (entry) => (entry ? Number(entry) : null);

// § move: arrows walk the grid and stop at its edges; Up and Down keep the column
export function moveKey(i, dir) {
  const k = PAD[i];
  if (dir === 'left' || dir === 'right') {
    const next = PAD[i + (dir === 'left' ? -1 : 1)];
    return next && next.row === k.row ? i + (dir === 'left' ? -1 : 1) : i;
  }
  const row = k.row + (dir === 'up' ? -1 : 1);
  if (row < 0 || row >= PAD_ROWS) return i;
  const keys = PAD.filter((p) => p.row === row);
  const under = keys.find((p) => k.col >= p.col && k.col < p.col + p.span) || keys[keys.length - 1];
  return PAD.indexOf(under);
}
