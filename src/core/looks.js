// § looks: what a profile's hero can wear (D-268). For now the cloak's colour, from a
// set of six that fit the palette and clash with nothing that already means something
// (P3). Each colour is the cloak's four shades, light to deepest, as the hero sprite's
// C, c, B and b. registry.js gathers this table. Plain data, no drawing.
import { moveOn } from './seedpad.js';

export const CLOAKS = {
  teal: { id: 'teal', kind: 'cloak', name: 'Teal', shades: ['#a6e0e4', '#58a8b4', '#2f6a7c', '#1c3e4e'] }, // the study's
  moss: { id: 'moss', kind: 'cloak', name: 'Moss', shades: ['#b6dc8e', '#6fb04e', '#3c6e3a', '#223e24'] },
  heather: { id: 'heather', kind: 'cloak', name: 'Heather', shades: ['#e4b8cc', '#b07890', '#6e4660', '#3e2638'] },
  rust: { id: 'rust', kind: 'cloak', name: 'Rust', shades: ['#e8b48c', '#c0744a', '#7a4430', '#46261c'] },
  indigo: { id: 'indigo', kind: 'cloak', name: 'Indigo', shades: ['#b0bcf0', '#6c7ed0', '#3c4890', '#22285a'] },
  sand: { id: 'sand', kind: 'cloak', name: 'Sand', shades: ['#efe6cc', '#b9ab88', '#7a6e52', '#463e2c'] },
};
export const CLOAK_IDS = Object.keys(CLOAKS);
// A profile's cloak: the one it chose, or teal when it has none (profiles from before P3)
export const DEFAULT_CLOAK = 'teal';
export const cloakOf = (p) => (CLOAKS[p?.look?.cloak] ? p.look.cloak : DEFAULT_CLOAK);

// § cloak screen: the six heroes three to a row, then OK and Back, each on its own row;
// walked as the seed pad's keys are
export const CLOAK_COLS = 3;
export const CLOAK_PAD = [
  ...CLOAK_IDS.map((id, i) => ({ id, row: Math.floor(i / CLOAK_COLS), col: i % CLOAK_COLS, span: 1 })),
  { id: 'ok', row: 2, col: 0, span: CLOAK_COLS },
  { id: 'back', row: 3, col: 0, span: CLOAK_COLS },
];
export const moveCloak = (i, dir) => moveOn(CLOAK_PAD, i, dir);
