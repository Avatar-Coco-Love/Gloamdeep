// § tones: each mushroom its own slight shift in colour (D-304, D-305). A kind
// with `tone` in the registry gets { hue, light } on every one a room lays out:
// whole degrees of hue and points of lightness, up to the entry's amounts either
// way. Plain data, no drawing. From a random generator of its own, seeded by the
// room's seed and the tile, so the rest of a seed's room stays as it was and the
// same seed gives the same tones.
import { get } from './registry.js';
import { rng } from './rng.js';

const toneSeed = (seed, x, y) => (Math.imul(seed, 0x27d4eb2d) ^ Math.imul(x + 1, 0x165667b1) ^ Math.imul(y + 1, 0x9e3779b1)) >>> 0;
const spread = (r, most) => Math.round((r() * 2 - 1) * most);

// (seed, items) → the items, each kind with a tone given its own
export function toned(seed, items) {
  return items.map((it) => {
    const tone = get(it.id)?.tone;
    if (!tone) return it;
    const r = rng(toneSeed(seed, it.x, it.y));
    return { ...it, tone: { hue: spread(r, tone.hue), light: spread(r, tone.light) } };
  });
}
