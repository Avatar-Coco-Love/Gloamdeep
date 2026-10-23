// § looks: what a profile's hero can wear (D-268). For now the cloak's colour and the eyes'
// colour, each from a set of six that fit the palette and clash with nothing that already
// means something (P3, P4). Each cloak is its four shades, light to deepest, as the hero
// sprite's C, c, B and b; each eye colour is the sprite's e. registry.js gathers these
// tables. Plain data, no drawing.
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

// § look screens: the six choices three to a row, then OK and Back, each on its own row;
// walked as the seed pad's keys are. The cloak screen and the eyes screen share the shape.
export const CLOAK_COLS = 3;
const lookPad = (ids) => [
  ...ids.map((id, i) => ({ id, row: Math.floor(i / CLOAK_COLS), col: i % CLOAK_COLS, span: 1 })),
  { id: 'ok', row: 2, col: 0, span: CLOAK_COLS },
  { id: 'back', row: 3, col: 0, span: CLOAK_COLS },
];
export const CLOAK_PAD = lookPad(CLOAK_IDS);
export const EYES_PAD = lookPad(EYE_IDS);
export const moveCloak = (i, dir) => moveOn(CLOAK_PAD, i, dir);
export const moveEyes = (i, dir) => moveOn(EYES_PAD, i, dir);
