// § regrow: things picked grow back (D-306, D-307). Each room keeps a `taken` list
// beside its items: the thing just as it lay, its tile and tone, and the turn it
// was taken (`at`). A kind with `regrow` in the registry comes back that many
// turns later, each on its own clock; one without (the knife) never does. It
// comes back only out of the hero's sight, on a tile nothing stands or lies on,
// so nothing appears before their eyes; in a room the hero has just come into,
// what grew while they were away is already there. Plain data, no drawing.
import { get } from './registry.js';
import { litAt } from './sight.js';
import { tileAt } from './room.js';

// (state, item) → the state with the item on its room's taken list, when its kind grows back
export function noteTaken(state, item) {
  if (!get(item.id)?.regrow) return state;
  return { ...state, taken: [...(state.taken || []), { ...item, at: state.turn }] };
}

// (state, came) → the state with every taken thing whose clock has run out back on its
// tile, when the tile is free and out of sight (any tile, when the hero `came` into the
// room just now); the rest wait on the list
export function regrow(state, came = false) {
  const taken = state.taken || [];
  const back = [], wait = [];
  for (const t of taken) (ready(state, t, back, came) ? back : wait).push(t);
  if (!back.length) return state;
  return { ...state, items: [...state.items, ...back.map(({ at, ...item }) => item)], taken: wait };
}

// Its clock has run out, and its tile is free and out of sight
function ready(state, t, back, came) {
  const { x, y } = t;
  if (state.turn - t.at < get(t.id).regrow) return false;
  if (state.hero.x === x && state.hero.y === y) return false;
  if (tileAt(state.room, x, y).solid) return false;
  const on = (list) => list.some((o) => o.x === x && o.y === y);
  if (on(state.enemies) || on(state.items) || on(back)) return false;
  return came || !litAt(state, x, y);
}
