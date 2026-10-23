// § registry: the one list of everything in the game (TECH.md, D-048). Each
// kind keeps its own small file; this gathers them. Menus, the dev spawn tool
// and saves read from here, never from a hand-written list.
import { TILES } from './tiles.js';
import { ITEMS } from './items.js';
import { LIGHTS } from './lights.js';
import { ENEMIES } from './enemies.js';
import { CLOAKS as LOOK_CLOAKS, EYES as LOOK_EYES, TRIMS as LOOK_TRIMS } from './looks.js';

const KINDS = [TILES, ITEMS, LIGHTS, ENEMIES]; // later: NPCs, from its own file
// What a hero can wear (P3 to P5): not things in the world, so not in ALL or the dev spawn tool
export const CLOAKS = LOOK_CLOAKS;
export const EYES = LOOK_EYES;
export const TRIMS = LOOK_TRIMS;

export const ALL = KINDS.flatMap((table) => Object.values(table));
const BY_ID = new Map(ALL.map((e) => [e.id, e]));
const BY_LETTER = new Map(Object.values(TILES).map((t) => [t.letter, t]));

// § lookups
export const get = (id) => BY_ID.get(id);
export const byLetter = (ch) => BY_LETTER.get(ch);
export const byKind = (kind) => ALL.filter((e) => e.kind === kind);
