// § cave: a generated room, round chambers joined by winding tunnels
// (D-147, D-162) or a digger's burrows (D-165), from one seed (D-148), with a torch by the stairs up, a flask and
// a rat guarding it (D-149), a herb (D-155), an oilcap (D-296) and, in about half the rooms, a heartcap (D-303), each mushroom its own tone (D-305). Plain data, no drawing. Same seed, same room.
import { rng, int, pick } from './rng.js';
import { toned } from './tones.js';

// § sizes: about 1.5 screens, 17 × 20, bigger than the screen, so the camera
// follows the hero (D-195). The chambers (D-162): how many, their half-widths
// and half-heights in tiles, and how far apart their middles are. Counts of
// chambers and open tiles grew with the room's area from the 11 × 13 ones.
export const COLS = 17;
export const ROWS = 20;
const CAVES = [5, 10], CAVE_R = [1.3, 3], CAVE_GAP = 4;
// At least this many open tiles, 45 in an 11 × 13 room (D-147)
const MIN_OPEN = 107;
const TRIES = 200;
// The share of rooms with a heartcap (D-303)
export const HEARTCAP_ODDS = 0.5;

// (seed, shape, ways) → { map, start, lights, enemies, items }, or null if no
// try worked. The shape is 'chambers', 'burrows' (D-165) or 'halls' (D-228). `ways.doors` are
// openings to carve at the edges, as { dir, at } (region.js, D-201).
// `ways.rats` is how many rats the room holds (D-231), and `ways.second` the
// kind of creature that takes the extra ones' place (a gloamling, D-240), and
// `ways.knife` whether the knife lies there (D-252). `ways.up` and `ways.down` are where the stairs must be, as { x, y }, so
// floors line up (D-202); true lets the room pick, null leaves them out.
export function generateRoom(seed, shape = 'chambers', { doors = [], up = true, down = true, rats = 1, second = 'rat', knife = false } = {}) {
  const r = rng(seed), carve = SHAPES[shape], dig = shape === 'halls' ? lane : tunnel;
  for (let i = 0; i < TRIES; i++) {
    const g = carve(r), room = g && fill(r, openStairs(r, openDoors(r, g, doors, dig), up, down, dig), up, down, rats, second, knife);
    if (room) return { ...room, items: toned(seed, room.items) }; // each mushroom its own tone (D-305)
  }
  return null;
}

// § doors: each opening is a gap in the edge, with a tunnel in from it to the
// nearest open tile (D-201), straight in halls (D-228). The tile just inside
// is where the hero comes in.
const EDGE = { up: (at) => [{ x: at, y: 0 }, { x: at, y: 1 }], down: (at) => [{ x: at, y: ROWS - 1 }, { x: at, y: ROWS - 2 }],
  left: (at) => [{ x: 0, y: at }, { x: 1, y: at }], right: (at) => [{ x: COLS - 1, y: at }, { x: COLS - 2, y: at }] };
function openDoors(r, g, doors, dig) {
  const inside = tilesWhere(g, (x, y) => g[y][x] === '.');
  const out = doors.map(({ dir, at }) => {
    const [edge, inner] = EDGE[dir](at), to = inside.reduce((a, b) => (dist(b, inner) < dist(a, inner) ? b : a));
    g[edge.y][edge.x] = '.'; g[inner.y][inner.x] = '.';
    dig(r, g, inner, to);
    return inner;
  });
  g.doors = out;
  return g;
}

// § stairs to fit: each stairs tile set is opened, with a tunnel to the
// nearest open tile, and the stairs up get their wall above (D-143, D-202)
function openStairs(r, g, up, down, dig) {
  for (const t of [up, down]) {
    if (typeof t !== 'object' || !t) continue;
    const inside = tilesWhere(g, (x, y) => g[y][x] === '.' && !same({ x, y }, t));
    g[t.y][t.x] = '.';
    if (inside.length) dig(r, g, t, inside.reduce((a, b) => (dist(b, t) < dist(a, t) ? b : a)));
  }
  if (up && typeof up === 'object') g[up.y - 1][up.x] = '#';
  return g;
}

// Round chambers joined by tunnels, as a grid of '#' and '.', or null
function chambers(r) {
  let g = walls();
  const caves = placeCaves(r);
  if (caves.length < 2) return null;
  for (const c of caves) carveCave(r, g, c);
  g = smooth(g);
  joinCaves(r, g, caves);
  // a tile the smoothing cuts off goes back to wall
  const joined = reach(g, caves[0]);
  for (const f of tilesWhere(g, (x, y) => g[y][x] === '.')) if (!joined.has(key(f))) g[f.y][f.x] = '#';
  return g;
}

// The stairs, torch, flask, rat and herb in a carved grid, or null if they
// don't fit. With no stairs up, the way in through the room's first door
// stands for them (D-201), and there is no torch.
function fill(r, g, up = true, down = true, rats = 1, second = 'rat', knife = false) {
  const floors = tilesWhere(g, (x, y) => g[y][x] === '.');
  if (floors.length < MIN_OPEN) return null;
  const doors = g.doors || [];

  // § stairs: up on a floor tile with wall above, so the steps sink into it
  // (D-143); down as far along the way as can be, unless set. Neither may cut
  // the room in two, so the hero never has to cross a stair to get somewhere.
  const free = (x, y, cut) => reach(g, floors.find((f) => !cut.some((c) => c.x === f.x && c.y === f.y)), cut).size === floors.length - cut.length;
  const canUp = (f) => !onEdge(f) && g[f.y - 1][f.x] === '#' && free(f.x, f.y, [f]);
  let at = null;
  if (up === true) {
    const ups = floors.filter(canUp);
    if (!ups.length) return null;
    at = pick(r, ups);
  } else if (up) {
    if (!canUp(up)) return null;
    at = up;
  }
  const from = at || doors[0], far = reach(g, from), cut = at ? [at] : [];
  let to = null;
  if (down === true) {
    const downs = floors.filter((f) => !onEdge(f) && far.get(key(f)) >= 8 && free(f.x, f.y, [...cut, f]));
    if (!downs.length) return null;
    const most = Math.max(...downs.map((f) => far.get(key(f))));
    to = pick(r, downs.filter((f) => far.get(key(f)) >= most - 2));
  } else if (down) {
    if (!far.has(key(down)) || !free(down.x, down.y, [...cut, down])) return null;
    to = down;
  }
  if (at) g[at.y][at.x] = '<';
  if (to) g[to.y][to.x] = '>';
  if (!at) return finds(r, g, floors, far, from, to, null, doors, rats, second, knife);

  // § torch: on a wall face near the stairs up, not right above them, and
  // not on the top row, where the hearts, depth and oil bar boxes could hide
  // it wherever the camera stands (D-101, D-195)
  const faces = tilesWhere(g, (x, y) => g[y][x] === '#' && y > 0 && y + 1 < ROWS && g[y + 1][x] === '.');
  const near = faces.filter((t) => dist(t, at) <= 3 && !(t.x === at.x && t.y === at.y - 1));
  if (!near.length) return null;
  const torch = pick(r, near);
  return finds(r, g, floors, far, at, to, torch, doors, rats, second, knife);
}

// The flask, rat and herb, `far` steps from `up`, the way in; with `down` and
// `torch` when the room has them, and `count` creatures in all, the extra
// ones of kind `second`; and the knife when `knife` is set
function finds(r, g, floors, far, up, down, torch, doors, count = 1, second = 'rat', knife = false) {
  // § flask and rat: the flask well away from the stairs, the rat beside it,
  // at least 5 steps from the stairs up, and 3 tiles off counting across walls.
  // It starts in the dark, as the second room's does: out of the torch's
  // light (3 tiles, D-098) and the stairs' glow (1.5, D-134).
  const open = floors.filter((f) => !onEdge(f) && !same(f, up) && !(down && same(f, down)) && !doors.some((d) => same(f, d)));
  const flasks = open.filter((f) => far.get(key(f)) >= 5);
  if (!flasks.length) return null;
  const flask = pick(r, flasks);
  const dark = (f) => far.get(key(f)) >= 5 && dist(f, up) >= 3 && (!torch || dist(f, torch) >= 5) && (!down || dist(f, down) >= 3);
  const rats = open.filter((f) => !same(f, flask) && dist(f, flask) <= 2 && dark(f));
  if (!rats.length) return null;
  const rat = pick(r, rats);

  // § herb: anywhere open, at least 3 tiles from the flask and the rat (D-155).
  // Picked last, so the rest of a seed's room is as it was before herbs.
  const herbs = open.filter((f) => dist(f, flask) >= 3 && dist(f, rat) >= 3);
  if (!herbs.length) return null;
  const herb = pick(r, herbs);

  // § more rats deeper: each extra rat anywhere open by the first rat's
  // rules, but not guarding the flask (D-231). Picked after the herb, so the
  // rest of a seed's room stays as it was; one that doesn't fit is left out.
  const enemies = [{ id: 'rat', x: rat.x, y: rat.y }], taken = [flask, herb, rat];
  for (let i = 1; i < count; i++) {
    const spots = open.filter((f) => dark(f) && !taken.some((t) => same(t, f)));
    if (!spots.length) break;
    const at = pick(r, spots);
    taken.push(at); enemies.push({ id: second, x: at.x, y: at.y });
  }

  // § knife: by the flask's rule, at least 5 steps from the stairs up, on a
  // tile nothing else took (D-252). Picked last, so the rest of a seed's room
  // stays as it was; any open tile when none is that far.
  const items = [{ id: 'flask', x: flask.x, y: flask.y }, { id: 'herb', x: herb.x, y: herb.y }];
  if (knife) {
    const free = open.filter((f) => !taken.some((t) => same(t, f))), far5 = free.filter((f) => far.get(key(f)) >= 5);
    const at = (far5.length || free.length) && pick(r, far5.length ? far5 : free);
    if (at) { items.push({ id: 'knife', x: at.x, y: at.y }); taken.push(at); }
  }

  // § oilcap: one on any open tile nothing else took (D-296). Picked last, so
  // the rest of a seed's room stays as it was; none when no tile is free.
  const caps = open.filter((f) => !taken.some((t) => same(t, f)));
  if (caps.length) { const at = pick(r, caps); items.push({ id: 'oilcap', x: at.x, y: at.y }); taken.push(at); }

  // § heartcap: in about 1 in 2 rooms, on any open tile nothing else took
  // (D-303). Picked after the oilcap, so the rest of a seed's room stays as it was.
  const hearts = open.filter((f) => !taken.some((t) => same(t, f)));
  if (r() < HEARTCAP_ODDS && hearts.length) { const at = pick(r, hearts); items.push({ id: 'heartcap', x: at.x, y: at.y }); }

  return {
    map: g.map((row) => row.join('')),
    start: { x: up.x, y: up.y },
    lights: torch ? [{ id: 'torch', x: torch.x, y: torch.y }] : [],
    items,
    enemies,
  };
}

// § chambers: 5 to 10 roundish chambers, their middles well apart (D-162)
function placeCaves(r) {
  const want = int(r, CAVES[0], CAVES[1]), caves = [];
  for (let i = 0; i < 60 && caves.length < want; i++) {
    const c = { x: int(r, 2, COLS - 3), y: int(r, 2, ROWS - 3), rx: size(r), ry: size(r) };
    if (!caves.some((o) => Math.hypot(o.x - c.x, o.y - c.y) < CAVE_GAP)) caves.push(c);
  }
  return caves;
}
const size = (r) => CAVE_R[0] + r() * (CAVE_R[1] - CAVE_R[0]);

// § lumpy: a chamber's oval as floor, each edge tile in or out by chance (D-162)
const LUMPY = 0.9;
function carveCave(r, g, c) {
  for (let y = 1; y < ROWS - 1; y++) for (let x = 1; x < COLS - 1; x++) {
    const d = ((x - c.x) / c.rx) ** 2 + ((y - c.y) / c.ry) ** 2;
    if (d <= 1 + (r() - 0.5) * LUMPY) g[y][x] = '.';
  }
}

// § smooth: one pass that rounds the chambers off, like water on stone: a tile
// is wall when 5 or more of it and its 8 neighbours are wall (D-162). It runs
// before the tunnels, which it would close.
function smooth(g) {
  return g.map((row, y) => row.map((ch, x) => {
    if (x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1) return '#';
    let walls = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (g[y + dy][x + dx] === '#') walls++;
    return walls >= 5 ? '#' : '.';
  }));
}

// § tunnels: each chamber joins the nearest one already joined, by a one-tile
// tunnel that heads there but wanders a step aside now and then (D-162)
const WANDER = 0.3;
function joinCaves(r, g, caves) {
  const joined = [caves[0]], left = caves.slice(1);
  while (left.length) {
    let best = null;
    for (const a of left) for (const b of joined) if (!best || dist(a, b) < best.d) best = { a, b, d: dist(a, b) };
    tunnel(r, g, best.a, best.b);
    joined.push(best.a); left.splice(left.indexOf(best.a), 1);
  }
}

// A one-tile tunnel from `from` to `to`, wandering a step aside now and then
function tunnel(r, g, from, to) {
  let { x, y } = from;
  for (let s = 0; s < 200 && (x !== to.x || y !== to.y); s++) {
    if (r() < WANDER) {
      const [dx, dy] = pick(r, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
      if (x + dx > 0 && x + dx < COLS - 1 && y + dy > 0 && y + dy < ROWS - 1) { x += dx; y += dy; }
    } else if (x !== to.x && (y === to.y || r() < 0.5)) x += Math.sign(to.x - x);
    else y += Math.sign(to.y - y);
    g[y][x] = '.';
  }
}

// § burrows: a digger starts near the middle and wanders, mostly keeping its
// way, carving as it goes until 119 to 138 tiles are open (50 to 58 in an
// 11 × 13 room): twisty tunnels, loops and dead ends (D-163, D-165, D-195).
// Its path is one piece, so all is joined.
const DIG_OPEN = [119, 138], DIG_TURN = 0.35, DIG_STEPS = 4000;
const WAYS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
function burrows(r) {
  const g = walls(), want = int(r, DIG_OPEN[0], DIG_OPEN[1]);
  let x = int(r, 5, 11), y = int(r, 5, 14), [dx, dy] = pick(r, WAYS), open = 0;
  for (let i = 0; i < DIG_STEPS && open < want; i++) {
    if (g[y][x] === '#') { g[y][x] = '.'; open++; }
    if (r() < DIG_TURN) [dx, dy] = pick(r, WAYS);
    if (x + dx > 0 && x + dx < COLS - 1 && y + dy > 0 && y + dy < ROWS - 1) { x += dx; y += dy; } else [dx, dy] = pick(r, WAYS);
  }
  return g;
}

// § halls: 3 or 4 straight-walled halls, 4 to 7 tiles wide and 4 to 6 tall,
// with wall between them, each joined to the one before by a one-tile
// corridor that turns once (D-228). Built stone, so nothing wanders.
const HALLS = [3, 4], HALL_W = [4, 7], HALL_H = [4, 6];
function halls(r) {
  const g = walls(), want = int(r, HALLS[0], HALLS[1]), hs = [];
  for (let i = 0; i < 100 && hs.length < want; i++) {
    const w = int(r, HALL_W[0], HALL_W[1]), h = int(r, HALL_H[0], HALL_H[1]);
    const hall = { x: int(r, 2, COLS - 2 - w), y: int(r, 2, ROWS - 2 - h), w, h };
    if (!hs.some((o) => hall.x <= o.x + o.w && o.x <= hall.x + hall.w && hall.y <= o.y + o.h && o.y <= hall.y + hall.h)) hs.push(hall);
  }
  if (hs.length < HALLS[0]) return null;
  const mid = (h) => ({ x: h.x + (h.w >> 1), y: h.y + (h.h >> 1) });
  hs.forEach((h, i) => {
    for (let y = h.y; y < h.y + h.h; y++) for (let x = h.x; x < h.x + h.w; x++) g[y][x] = '.';
    if (i) lane(r, g, mid(hs[i - 1]), mid(h));
  });
  return g;
}

// A one-tile corridor from `from` to `to`, along one way and then the other
function lane(r, g, from, to) {
  let { x, y } = from;
  const across = r() < 0.5;
  for (const way of across ? ['x', 'y'] : ['y', 'x']) {
    while (way === 'x' ? x !== to.x : y !== to.y) {
      g[y][x] = '.';
      if (way === 'x') x += Math.sign(to.x - x); else y += Math.sign(to.y - y);
    }
  }
  g[y][x] = '.';
}

const SHAPES = { chambers, burrows, halls };

// § helpers
const walls = () => Array.from({ length: ROWS }, () => Array(COLS).fill('#'));
const key = (t) => t.y * COLS + t.x;
const onEdge = (t) => t.x === 0 || t.y === 0 || t.x === COLS - 1 || t.y === ROWS - 1;
const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
function tilesWhere(g, test) {
  const out = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (test(x, y)) out.push({ x, y });
  return out;
}
// Steps from `from` to every floor tile it can walk to, not through `cut`
function reach(g, from, cut = []) {
  const out = new Map([[key(from), 0]]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (g[n.y]?.[n.x] !== '.' || out.has(key(n)) || cut.some((c) => same(c, n))) continue;
      out.set(key(n), out.get(key(t)) + 1); queue.push(n);
    }
  }
  return out;
}
