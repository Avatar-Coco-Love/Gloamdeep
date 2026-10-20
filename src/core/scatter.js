// § scatter: a hand-made room's items and enemies placed from the seed (D-192), so
// every room changes with the seed while its shape stays as drawn. The same
// distances as the generated rooms (D-149): items at least 5 steps from the
// start, the rat at least 3 tiles from the start and every stairs, and a rat
// that guards a flask within 2 tiles of it. Plain data, no drawing.
import { rng, pick } from './rng.js';

const ITEM_STEPS = 5, RAT_OFF = 3, GUARD = 2;
const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// (place, seed) → { items, enemies } at new spots; place: { map, start, items, enemies, guard }
export function scatter(place, seed) {
  const r = rng(seed), { map, start } = place;
  const floors = [], stairs = [];
  map.forEach((row, y) => [...row].forEach((ch, x) => {
    if (ch === '.') floors.push({ x, y });
    else if (ch === '<' || ch === '>') stairs.push({ x, y });
  }));
  const steps = reach(map, start), taken = [start];
  const free = (f) => !taken.some((t) => same(t, f));

  const items = (place.items || []).map((it) => {
    const at = pick(r, floors.filter((f) => free(f) && steps.get(f.y * 100 + f.x) >= ITEM_STEPS));
    taken.push(at);
    return { ...it, x: at.x, y: at.y };
  });
  const flask = items.find((it) => it.id === 'flask');
  const enemies = place.enemies.map((e) => {
    const at = pick(r, floors.filter((f) => free(f) && [start, ...stairs].every((s) => dist(f, s) >= RAT_OFF)
      && (!place.guard || !flask || dist(f, flask) <= GUARD)));
    taken.push(at);
    return { ...e, x: at.x, y: at.y };
  });
  return { items, enemies };
}

// Steps from `from` to every tile it can walk to, keyed y * 100 + x
function reach(map, from) {
  const out = new Map([[from.y * 100 + from.x, 0]]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy }, k = n.y * 100 + n.x;
      if (!map[n.y] || map[n.y][n.x] === undefined || map[n.y][n.x] === '#' || out.has(k)) continue;
      out.set(k, out.get(t.y * 100 + t.x) + 1); queue.push(n);
    }
  }
  return out;
}
