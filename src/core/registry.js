// § registry: the one list of everything in the game (TECH.md, D-048). Each
// kind keeps its own small file; this gathers them. Menus, the dev spawn tool
// and saves read from here, never from a hand-written list.
import { TILES } from './tiles.js';
import { ITEMS } from './items.js';
import { LIGHTS } from './lights.js';

const KINDS = [TILES, ITEMS, LIGHTS]; // later: enemies, NPCs, each from its own file

export const ALL = KINDS.flatMap((table) => Object.values(table));
const BY_ID = new Map(ALL.map((e) => [e.id, e]));
const BY_LETTER = new Map(Object.values(TILES).map((t) => [t.letter, t]));

// § lookups
export const get = (id) => BY_ID.get(id);
export const byLetter = (ch) => BY_LETTER.get(ch);
export const byKind = (kind) => ALL.filter((e) => e.kind === kind);
