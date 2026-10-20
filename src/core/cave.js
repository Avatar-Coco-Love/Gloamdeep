// § cave: a generated room, round chambers joined by winding tunnels
// (D-147, D-162) or a digger's burrows (D-165), from one seed (D-148), with a torch by the stairs up, a flask and
// a rat guarding it (D-149), and a herb (D-155). Plain data, no drawing. Same seed, same room.
import { rng, int, pick } from './rng.js';

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

// (seed, shape, ways) → { map, start, lights, enemies, items }, or null if no
// try worked. The shape is 'chambers' or 'burrows' (D-165). `ways.doors` are
// openings to carve at the edges, as { dir, at } (region.js, D-201), and
// `ways.stairs` false leaves the stairs and their torch out.
export function generateRoom(seed, shape = 'chambers', { doors = [], stairs = true } = {}) {
  const r = rng(seed), carve = shape === 'burrows' ? burrows : chambers;
  for (let i = 0; i < TRIES; i++) {
    const g = carve(r), room = g && fill(r, openDoors(r, g, doors), stairs);
    if (room) return room;
  }
  return null;
}

// § doors: each opening is a gap in the edge, with a tunnel in from it to the
// nearest open tile (D-201). The tile just inside is where the hero comes in.
const EDGE = { up: (at) => [{ x: at, y: 0 }, { x: at, y: 1 }], down: (at) => [{ x: at, y: ROWS - 1 }, { x: at, y: ROWS - 2 }],
  left: (at) => [{ x: 0, y: at }, { x: 1, y: at }], right: (at) => [{ x: COLS - 1, y: at }, { x: COLS - 2, y: at }] };
function openDoors(r, g, doors) {
  const inside = tilesWhere(g, (x, y) => g[y][x] === '.');
  const out = doors.map(({ dir, at }) => {
    const [edge, inner] = EDGE[dir](at), to = inside.reduce((a, b) => (dist(b, inner) < dist(a, inner) ? b : a));
    g[edge.y][edge.x] = '.'; g[inner.y][inner.x] = '.';
    tunnel(r, g, inner, to);
    return inner;
  });
  g.doors = out;
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
// don't fit. With no stairs, the room has only the flask, rat and herb, the
// way in through its first door standing for the stairs up (D-201).
function fill(r, g, stairs = true) {
  const floors = tilesWhere(g, (x, y) => g[y][x] === '.');
  if (floors.length < MIN_OPEN) return null;
  const doors = g.doors || [];
  if (!stairs) return finds(r, g, floors, reach(g, doors[0]), doors[0], null, null, doors);

  // § stairs: up on a floor tile with wall above, so the steps sink into it
  // (D-143); down as far along the way as can be. Neither may cut the room
  // in two, so the hero never has to cross a stair to get somewhere.
  const free = (x, y, cut) => reach(g, floors.find((f) => !cut.some((c) => c.x === f.x && c.y === f.y)), cut).size === floors.length - cut.length;
  const ups = floors.filter((f) => !onEdge(f) && g[f.y - 1][f.x] === '#' && free(f.x, f.y, [f]));
  if (!ups.length) return null;
  const up = pick(r, ups);
  const far = reach(g, up);
  const downs = floors.filter((f) => !onEdge(f) && far.get(key(f)) >= 8 && free(f.x, f.y, [up, f]));
  if (!downs.length) return null;
  const most = Math.max(...downs.map((f) => far.get(key(f))));
  const down = pick(r, downs.filter((f) => far.get(key(f)) >= most - 2));
  g[up.y][up.x] = '<'; g[down.y][down.x] = '>';

  // § torch: on a wall face near the stairs up, not right above them, and
  // not on the top row, where the hearts, depth and oil bar boxes could hide
  // it wherever the camera stands (D-101, D-195)
  const faces = tilesWhere(g, (x, y) => g[y][x] === '#' && y > 0 && y + 1 < ROWS && g[y + 1][x] === '.');
  const near = faces.filter((t) => dist(t, up) <= 3 && !(t.x === up.x && t.y === up.y - 1));
  if (!near.length) return null;
  const torch = pick(r, near);
  return finds(r, g, floors, far, up, down, torch, doors);
}

// The flask, rat and herb, `far` steps from `up`, the way in; with `down` and
// `torch` when the room has them
function finds(r, g, floors, far, up, down, torch, doors) {
  // § flask and rat: the flask well away from the stairs, the rat beside it,
  // at least 5 steps from the stairs up, and 3 tiles off counting across walls.
  // It starts in the dark, as the second room's does: out of the torch's
  // light (3 tiles, D-098) and the stairs' glow (1.5, D-134).
  const open = floors.filter((f) => !onEdge(f) && !same(f, up) && !(down && same(f, down)) && !doors.some((d) => same(f, d)));
  const flasks = open.filter((f) => far.get(key(f)) >= 5);
  if (!flasks.length) return null;
  const flask = pick(r, flasks);
  const rats = open.filter((f) => !same(f, flask) && dist(f, flask) <= 2 && far.get(key(f)) >= 5 && dist(f, up) >= 3 && (!torch || dist(f, torch) >= 5) && (!down || dist(f, down) >= 3));
  if (!rats.length) return null;
  const rat = pick(r, rats);

  // § herb: anywhere open, at least 3 tiles from the flask and the rat (D-155).
  // Picked last, so the rest of a seed's room is as it was before herbs.
  const herbs = open.filter((f) => dist(f, flask) >= 3 && dist(f, rat) >= 3);
  if (!herbs.length) return null;
  const herb = pick(r, herbs);

  return {
    map: g.map((row) => row.join('')),
    start: { x: up.x, y: up.y },
    lights: torch ? [{ id: 'torch', x: torch.x, y: torch.y }] : [],
    items: [{ id: 'flask', x: flask.x, y: flask.y }, { id: 'herb', x: herb.x, y: herb.y }],
    enemies: [{ id: 'rat', x: rat.x, y: rat.y }],
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
