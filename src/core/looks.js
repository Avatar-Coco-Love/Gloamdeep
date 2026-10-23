// § looks: what a profile's hero can wear (D-268): the cloak's colour, the eyes' colour and
// the lantern's trim, each from a set of six that fit the palette and clash with nothing that
// already means something (P3 to P5), and the clothes, four shapes of cloak (P6). Each cloak
// is its four shades, light to deepest, as the hero sprite's C, c, B and b; each eye colour is
// the sprite's e; each trim is the sprite's T and t; each clothes' pixels are in sprites.js.
// registry.js gathers these tables. Plain data, no drawing.
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

// § eyes: two pixels in the hood (P4). Pink-red, gold, violet and black are kept out, as they
// look like enemies, the lantern or stairs, or vanish in the hood's outline.
export const EYES = {
  bone: { id: 'bone', kind: 'eyes', name: 'Bone', colour: '#efe6cc' }, // the study's
  ice: { id: 'ice', kind: 'eyes', name: 'Ice', colour: '#a6e0e4' },
  moss: { id: 'moss', kind: 'eyes', name: 'Moss', colour: '#b6dc8e' },
  sky: { id: 'sky', kind: 'eyes', name: 'Sky', colour: '#b0bcf0' },
  silver: { id: 'silver', kind: 'eyes', name: 'Silver', colour: '#9aa6b4' },
  brown: { id: 'brown', kind: 'eyes', name: 'Brown', colour: '#b07850' },
};
export const EYE_IDS = Object.keys(EYES);
// A profile's eyes: the ones it chose, or bone when it has none (profiles from before P4)
export const DEFAULT_EYES = 'bone';
export const eyesOf = (p) => (EYES[p?.look?.eyes] ? p.look.eyes : DEFAULT_EYES);

// § trims: the lantern's metal, its cap (light) and its base (dark); the flame and its light
// stay the same for everyone (D-268, P5). Gold, red and violet are kept out, as they look like
// the flame, enemies or stairs.
export const TRIMS = {
  brass: { id: 'brass', kind: 'trim', name: 'Brass', shades: ['#e8d5a0', '#a8642c'] }, // the study's
  iron: { id: 'iron', kind: 'trim', name: 'Iron', shades: ['#9aa6b4', '#4a5262'] },
  copper: { id: 'copper', kind: 'trim', name: 'Copper', shades: ['#e8a07a', '#8a4630'] },
  silver: { id: 'silver', kind: 'trim', name: 'Silver', shades: ['#e4e8ee', '#7a8494'] },
  verdigris: { id: 'verdigris', kind: 'trim', name: 'Verdigris', shades: ['#9cd4b8', '#3c6e5a'] },
  blackened: { id: 'blackened', kind: 'trim', name: 'Blackened', shades: ['#6b7686', '#22262f'] },
};
export const TRIM_IDS = Object.keys(TRIMS);
// A profile's trim: the one it chose, or brass when it has none (profiles from before P5)
export const DEFAULT_TRIM = 'brass';
export const trimOf = (p) => (TRIMS[p?.look?.trim] ? p.look.trim : DEFAULT_TRIM);

// § clothes: the shape of what the hero wears (P6); its colours are the cloak's, and the belt
// is the lantern's trim. The long cloak first, as every profile wore it before.
export const CLOTHES = {
  cloak: { id: 'cloak', kind: 'clothes', name: 'Cloak' }, // the study's, hem to the floor
  belted: { id: 'belted', kind: 'clothes', name: 'Belted' }, // cinched at the waist, a buckle
  short: { id: 'short', kind: 'clothes', name: 'Short' }, // to the knee, legs and boots below
  tattered: { id: 'tattered', kind: 'clothes', name: 'Tattered' }, // the hem torn into rags
};
export const CLOTHES_IDS = Object.keys(CLOTHES);
// A profile's clothes: the ones it chose, or the cloak when it has none (profiles from before P6)
export const DEFAULT_CLOTHES = 'cloak';
export const clothesOf = (p) => (CLOTHES[p?.look?.clothes] ? p.look.clothes : DEFAULT_CLOTHES);

// § look screens: the choices three to a row (the clothes two), then OK and Back, each on its
// own row; walked as the seed pad's keys are. The cloak, eyes and trim screens share the shape.
export const CLOAK_COLS = 3;
const lookPad = (ids, cols = CLOAK_COLS) => [
  ...ids.map((id, i) => ({ id, row: Math.floor(i / cols), col: i % cols, span: 1 })),
  { id: 'ok', row: 2, col: 0, span: cols },
  { id: 'back', row: 3, col: 0, span: cols },
];
export const CLOAK_PAD = lookPad(CLOAK_IDS);
export const EYES_PAD = lookPad(EYE_IDS);
export const TRIM_PAD = lookPad(TRIM_IDS);
export const CLOTHES_PAD = lookPad(CLOTHES_IDS, 2);
export const moveCloak = (i, dir) => moveOn(CLOAK_PAD, i, dir);
export const moveEyes = (i, dir) => moveOn(EYES_PAD, i, dir);
export const moveTrim = (i, dir) => moveOn(TRIM_PAD, i, dir);
export const moveClothes = (i, dir) => moveOn(CLOTHES_PAD, i, dir);
