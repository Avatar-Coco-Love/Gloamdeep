// § map: the floor the hero is on, as the map screen shows it (D-176, D-205).
// Plain data, no drawing. Every room of the floor sits on its grid, found by
// walking the side openings from the hero's room; each is shown from the
// tiles the hero remembers, or in full with the dev Reveal map switch, which
// keeps the memory as it is.
import { sidesOf, depthOf, tileAt } from './room.js';
import { fresh } from './stairs.js';

const STEP = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// (state, reveal) → { depth, cols, rows, rooms: [{ id, x, y, room, seen }], hero }.
// A room's x, y is its top-left tile on the whole floor; cols, rows the floor's
// size in tiles. `seen` is null when everything shows (reveal). `hero` is the
// hero's tile on the floor.
export function floorPlan(state, reveal = false) {
  const cells = new Map([[state.place, { x: 0, y: 0 }]]), todo = [state.place];
  while (todo.length) {
    const id = todo.shift(), at = cells.get(id);
    for (const [dir, to] of Object.entries(sidesOf(id, state.seed))) {
      if (!cells.has(to)) { cells.set(to, { x: at.x + STEP[dir][0], y: at.y + STEP[dir][1] }); todo.push(to); }
    }
  }
  const known = (id) => (id === state.place ? state : state.elsewhere[id]) || (reveal && fresh(id, state.seed));
  const all = [...cells].map(([id, at]) => ({ id, at, p: known(id) }));
  // The grid's cell is as big as the floor's biggest room; rooms line up, so they match
  const w = Math.max(...all.filter((r) => r.p).map((r) => r.p.room.cols)), h = Math.max(...all.filter((r) => r.p).map((r) => r.p.room.rows));
  const x0 = Math.min(...all.map((r) => r.at.x)), y0 = Math.min(...all.map((r) => r.at.y));
  const x1 = Math.max(...all.map((r) => r.at.x)), y1 = Math.max(...all.map((r) => r.at.y));
  const rooms = all.filter((r) => r.p).map(({ id, at, p }) => ({ id, x: (at.x - x0) * w, y: (at.y - y0) * h, room: p.room, seen: reveal ? null : p.seen }));
  const here = rooms.find((r) => r.id === state.place);
  return { depth: depthOf(state.place), cols: (x1 - x0 + 1) * w, rows: (y1 - y0 + 1) * h, rooms, hero: { x: here.x + state.hero.x, y: here.y + state.hero.y } };
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
