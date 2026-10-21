// § map: a floor as the map screen shows it (D-176, D-205), the hero's own
// or another one the map has turned to (D-206). Plain data, no drawing.
// Every room of the floor sits on its grid, found by walking the side
// openings from one of its rooms, but not the cave mouth: the woods and the
// crypt are both depth 0, two parts joined at the mouth as in the Seed
// Explorer once the hero has been in both, else the part they know (D-216,
// D-222). It is shown from the tiles the hero remembers, or in full with the
// dev Reveal map switch, which keeps the memory as it is. Rooms are drawn
// a tile apart, a dark seam between them, and each doorway found bridges
// its seam (D-224).
import { sidesOf, depthOf, tileAt, placeAt, placeBeside } from './room.js';
import { mouthSpot, mouthOf } from './mouth.js';
import { fresh } from './stairs.js';

const STEP = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// (state, reveal, depth) → { depth, cols, rows, rooms: [{ id, x, y, room, seen }], hero, doors }.
// A room's x, y is its top-left tile on the whole floor; cols, rows the floor's
// size in tiles, seams included. `doors` are the seam tiles a found doorway
// bridges, [{ x, y }]. `seen` is null when everything shows (reveal). `hero` is the
// hero's tile on the floor, null on another floor. Depth is the hero's own
// unless given; another floor must have a room shown (floorsShown), and it
// opens on the part its stairs lead to, if seen, else on a part that is.
export function floorPlan(state, reveal = false, depth = depthOf(state.place)) {
  const both = depth === 0 && joinedSurface(state, reveal);
  if (both) return withDoors(both);
  const seen = (id) => reveal || state.elsewhere[id]?.seen.some(Boolean);
  const start = depth === depthOf(state.place) ? state.place
    : [placeAt(depth), ...Object.keys(state.elsewhere)].find((id) => depthOf(id) === depth && seen(id)) || placeAt(depth);
  return withDoors(partPlan(state, reveal, depth, start));
}

// The part of floor `depth` that holds room `start`, laid out on its grid,
// with `seams`: every seam tile between two cells side by side, and the edge
// tile on each side of it, whether those rooms are known or not
function partPlan(state, reveal, depth, start) {
  const cells = new Map([[start, { x: 0, y: 0 }]]), todo = [start];
  while (todo.length) {
    const id = todo.shift(), at = cells.get(id);
    for (const [dir, to] of Object.entries(sidesOf(id, state.seed))) {
      if (depthOf(to) === depth && !cells.has(to) && !mouthSpot(state.seed, id, to)) { cells.set(to, { x: at.x + STEP[dir][0], y: at.y + STEP[dir][1] }); todo.push(to); }
    }
  }
  const known = (id) => (id === state.place ? state : state.elsewhere[id]) || (reveal && fresh(id, state.seed));
  const all = [...cells].map(([id, at]) => ({ id, at, p: known(id) }));
  // The grid's cell is as big as the floor's biggest room; rooms line up, so they match.
  // Cells sit a seam tile apart.
  const w = Math.max(...all.filter((r) => r.p).map((r) => r.p.room.cols)), h = Math.max(...all.filter((r) => r.p).map((r) => r.p.room.rows));
  const x0 = Math.min(...all.map((r) => r.at.x)), y0 = Math.min(...all.map((r) => r.at.y));
  const x1 = Math.max(...all.map((r) => r.at.x)), y1 = Math.max(...all.map((r) => r.at.y));
  const left = (at) => (at.x - x0) * (w + 1), top = (at) => (at.y - y0) * (h + 1);
  const rooms = all.filter((r) => r.p).map(({ id, at, p }) => ({ id, x: left(at), y: top(at), room: p.room, seen: reveal ? null : p.seen }));
  const here = rooms.find((r) => r.id === state.place);
  const seams = [];
  for (const { at } of all) {
    const has = (dx, dy) => all.some((r) => r.at.x === at.x + dx && r.at.y === at.y + dy);
    if (has(1, 0)) for (let y = 0; y < h; y++) seams.push(seam(left(at) + w, top(at) + y, 1, 0));
    if (has(0, 1)) for (let x = 0; x < w; x++) seams.push(seam(left(at) + x, top(at) + h, 0, 1));
  }
  return {
    depth, cols: (x1 - x0 + 1) * (w + 1) - 1, rows: (y1 - y0 + 1) * (h + 1) - 1, rooms, seams,
    hero: here ? { x: here.x + state.hero.x, y: here.y + state.hero.y } : null,
  };
}
// The seam tile x, y, with the edge tiles before and after it the way dx, dy
const seam = (x, y, dx, dy) => ({ x, y, ends: [[x - dx, y - dy], [x + dx, y + dy]] });

// The plan with its `doors`: the seams with a floor shown at either end (D-224)
function withDoors(plan) {
  const shownFloor = ([fx, fy]) => plan.rooms.some(({ x, y, room, seen }) => fx >= x && fy >= y && fx < x + room.cols && fy < y + room.rows && markAt(room, seen, fx - x, fy - y) === 'floor');
  const { seams, ...rest } = plan;
  return { ...rest, doors: seams.filter((s) => s.ends.some(shownFloor)).map(({ x, y }) => ({ x, y })) };
}

// § whole surface: the woods and the crypt on one map, in the Seed Explorer
// only (D-214). The crypt sits where walking through the mouth takes you, the
// mouth's tile a seam apart from the gap in the crypt's wall (D-216, D-224);
// all revealed, no hero.
export function wholeSurface(state) {
  return withDoors(surfaceParts(state));
}
function surfaceParts(state) {
  const m = mouthOf(state.seed), woods = partPlan(state, true, 0, 'woods'), crypt = partPlan(state, true, 0, m.room);
  const at = (plan, id) => plan.rooms.find((r) => r.id === id);
  const [sx, sy] = STEP[m.dir], mx = at(woods, 'woods').x + m.tile.x, my = at(woods, 'woods').y + m.tile.y;
  const dx = mx + 2 * sx - at(crypt, m.room).x - m.gap.x, dy = my + 2 * sy - at(crypt, m.room).y - m.gap.y;
  const all = [...woods.rooms, ...crypt.rooms.map((r) => ({ ...r, x: r.x + dx, y: r.y + dy }))];
  const seams = [...woods.seams, ...crypt.seams.map((s) => move(s, dx, dy)), seam(mx + sx, my + sy, sx, sy)];
  const x0 = Math.min(0, dx), y0 = Math.min(0, dy);
  return {
    depth: 0, hero: null,
    cols: Math.max(woods.cols, dx + crypt.cols) - x0, rows: Math.max(woods.rows, dy + crypt.rows) - y0,
    rooms: all.map((r) => ({ ...r, x: r.x - x0, y: r.y - y0 })), seams: seams.map((s) => move(s, -x0, -y0)),
  };
}
const move = ({ x, y, ends }, dx, dy) => ({ x: x + dx, y: y + dy, ends: ends.map(([ex, ey]) => [ex + dx, ey + dy]) });

// The game's surface map: the whole surface laid out as in the Explorer, with
// only the rooms the hero knows and the hero on it (D-222). Null until the
// hero has been in the woods and the crypt both, unless everything shows.
function joinedSurface(state, reveal) {
  const been = (id) => (id === state.place ? state : state.elsewhere[id]);
  const visited = (id) => id === state.place || state.elsewhere[id]?.seen.some(Boolean);
  const crypt = partPlan(state, true, 0, mouthOf(state.seed).room).rooms.map((r) => r.id);
  if (!reveal && !(visited('woods') && crypt.some(visited))) return null;
  const whole = surfaceParts(state);
  const rooms = whole.rooms.filter((r) => reveal || been(r.id)).map((r) => ({ ...r, seen: reveal ? null : been(r.id).seen }));
  const here = rooms.find((r) => r.id === state.place);
  return { ...whole, rooms, hero: here ? { x: here.x + state.hero.x, y: here.y + state.hero.y } : null };
}

// § floors: the depths the map can turn to (D-206), shallowest first: the
// hero's own and every floor with a room the hero has been in, or every
// floor from the surface, 0, to DEEPEST with dev Reveal map (D-209)
export const DEEPEST = 99; // as deep as the dev Go to depth goes
export function floorsShown(state, reveal = false) {
  if (reveal) return Array.from({ length: DEEPEST + 1 }, (_, i) => i);
  const seen = Object.keys(state.elsewhere).filter((id) => state.elsewhere[id].seen.some(Boolean));
  const all = new Set([state.place, ...seen].map(depthOf));
  return [...all].sort((a, b) => a - b);
}

// The floor the map turns to from `depth`, way 'up' or 'down': the next one
// shown that way, skipping floors never seen, or null (the arrow greyed out)
export function turnFrom(floors, depth, way) {
  return (way === 'up' ? floors.filter((d) => d < depth).pop() : floors.find((d) => d > depth)) ?? null;
}

// § stairs on the map: (plan, x, y, reach) → the found stairs nearest the
// floor tile x, y (fractions allowed), within reach tiles of its centre, as
// { depth, room, arrive }: the floor they lead to, the room there, and the
// kind of the matching stairs in it (D-202). Null when none is that near or
// they lead nowhere.
export function stairsNear(plan, x, y, reach, seed) {
  let best = null, most = reach * reach;
  for (const { id, x: ox, y: oy, room, seen } of plan.rooms) {
    for (let ty = 0; ty < room.rows; ty++) for (let tx = 0; tx < room.cols; tx++) {
      if (markAt(room, seen, tx, ty) !== 'stairs') continue;
      const d = (ox + tx + 0.5 - x) ** 2 + (oy + ty + 0.5 - y) ** 2;
      if (d <= most) { most = d; best = { id, tile: tileAt(room, tx, ty) }; }
    }
  }
  const to = best?.tile.leads && placeBeside(best.id, best.tile.leads, seed);
  return to ? { depth: depthOf(to), room: to, arrive: best.tile.arrive } : null;
}

// Where the stairs of kind `id` are on the plan's floor, in room `roomId`, as a floor tile, or null
export function stairsIn(plan, roomId, id) {
  const r = plan.rooms.find((m) => m.id === roomId);
  if (r) for (let y = 0; y < r.room.rows; y++) for (let x = 0; x < r.room.cols; x++) {
    if (tileAt(r.room, x, y).id === id) return { x: r.x + x, y: r.y + y };
  }
  return null;
}

// § marks: (room, seen, x, y) → what the map shows at that tile: 'stairs' for a
// glowing tile, 'floor', 'wall' for a wall beside a floor (the rock behind it
// stays dark, so rooms show as outlines), or null. Only remembered tiles show,
// unless seen is null.
export function markAt(room, seen, x, y) {
  if (seen && !seen[y * room.cols + x]) return null;
  const t = tileAt(room, x, y);
  if (t.glow) return 'stairs';
  if (!t.solid) return 'floor';
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < room.cols && ny < room.rows && !tileAt(room, nx, ny).solid) return 'wall';
  }
  return null;
}

// How many rooms of the plan show at least one tile, for the screen reader's words
export const roomsFound = (plan) => plan.rooms.filter((r) => !r.seen || r.seen.some(Boolean)).length;

// § view: how the map sits in its window (D-205): k pixels per tile, and
// x, y the map pixel at the window's top-left (below 0 when the map is
// smaller than the window, so it is centred). It opens with the whole floor
// in the window; zoom keeps pixels whole, from that up to ZOOM_MAX; drags
// and arrows scroll it, stopping at the floor's edges.
export const FIT_MAX = 8, ZOOM_MAX = 16;
const fitK = (plan, w, h) => Math.max(1, Math.min(FIT_MAX, Math.floor(w / plan.cols), Math.floor(h / plan.rows)));

// (plan, window width, height) → the view that shows the whole floor
export const fitView = (plan, w, h) => clampView({ k: fitK(plan, w, h), x: 0, y: 0 }, plan, w, h);

// Centred along a side the map doesn't fill, else kept inside the floor's edges
export function clampView(view, plan, w, h) {
  const fit = (at, size, win) => (size <= win ? -Math.floor((win - size) / 2) : Math.max(0, Math.min(size - win, Math.round(at))));
  return { k: view.k, x: fit(view.x, plan.cols * view.k, w), y: fit(view.y, plan.rows * view.k, h) };
}

// The view at zoom k (at least the whole floor's) with tile x, y in the window's middle
export function centreView(plan, w, h, k, x, y) {
  const at = Math.max(fitK(plan, w, h), Math.min(ZOOM_MAX, k));
  return clampView({ k: at, x: (x + 0.5) * at - w / 2, y: (y + 0.5) * at - h / 2 }, plan, w, h);
}

// The view scrolled by dx, dy window pixels
export const panView = (view, plan, w, h, dx, dy) => clampView({ ...view, x: view.x + dx, y: view.y + dy }, plan, w, h);

// The view zoomed `by` steps (one pixel per tile each), the map point under
// window point cx, cy kept there
export function zoomView(view, plan, w, h, by, cx = w / 2, cy = h / 2) {
  const k = Math.max(fitK(plan, w, h), Math.min(ZOOM_MAX, view.k + by));
  if (k === view.k) return view;
  const s = k / view.k;
  return clampView({ k, x: (view.x + cx) * s - cx, y: (view.y + cy) * s - cy }, plan, w, h);
}
