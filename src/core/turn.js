// § turn: the game state and the turn rules, as plain data (TECH.md,
// "Turn rules are pure functions"). Nothing moves until the player acts (D-016).
import { tileAt, beginPlace, isGenerated, PLACES } from './room.js';
import { nextSeed } from './rng.js';
import { blankMemory } from './fog.js';
import { OIL, burnOil } from './oil.js';
import { get } from './registry.js';
import { say, oilLine } from './lines.js';
import { enemyAt, hitEnemy, biters } from './enemies.js';
import { lightAt, openSide } from './lights.js';
import { mountAt } from './mount.js';
import { litAt, clearLine } from './sight.js';
import { inDaylight } from './daytime.js';
import { takeStairs } from './stairs.js';
import { offEdge, walkOff } from './openings.js';
import { XP_FOE, gain, discover, foundAfterFall } from './xp.js';

// § directions: four only, no diagonals (D-042)
export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// The hero starts where style study 1 put them (study line 277).
export const FIRST_START = PLACES.first.start;

// The hero's health: 5, and a rat's bite takes 1 (D-115).
export const HERO_HEALTH = 5;

// `home` is where the hero wakes after a fall: the room as it started (D-119).
// One room on its own, as tests use it; makeWorld adds the other places.
// `seed` sets every generated depth (D-148).
export function makeState(room, start = FIRST_START, lights = [], enemies = [], items = [], seed = 1) {
  const home = { place: 'first', room, hero: { x: start.x, y: start.y }, lights, enemies, items };
  return { room, hero: home.hero, turn: 0, seed, seen: blankMemory(room), oil: OIL.start, lit: true, health: HERO_HEALTH, items, lights, enemies, line: null, place: 'first', elsewhere: {}, home, xp: 0, found: ['first'] };
}

// § world: every place, the hero in the first one. The others wait in
// `elsewhere` as they begin (stairs.js); `home.places` keeps them all as
// they began, for a fall (D-136) and the dev reset. Generated depths begin
// only when first reached (stairs.js, D-147).
export function makeWorld(first = 'first', seed = 1) {
  const begun = beginAll(seed);
  const here = begun[first], state = makeState(here.room, here.start, here.lights, here.enemies, here.items, seed);
  return { ...state, place: first, found: [first], elsewhere: away(begun, first, {}), home: { ...state.home, place: first, places: begun } };
}

// Every hand-made place as it begins with this seed
function beginAll(seed) {
  const begun = {};
  for (const id of Object.keys(PLACES)) begun[id] = beginPlace(id, seed);
  return begun;
}

// The places other than `here` as they began, with the memory in `seen` kept
// (D-021). Generated depths aren't among them: they begin when reached.
function away(begun, here, seen) {
  const out = {};
  for (const [id, p] of Object.entries(begun)) {
    if (id !== here) out[id] = { room: p.room, lights: p.lights, enemies: p.enemies, items: p.items || [], seen: seen[id] || blankMemory(p.room) };
  }
  return out;
}

// § step: (state, direction) → new state. Walking into something solid
// changes nothing and passes no turn, so the same state comes back (D-043).
// A passed turn burns oil while the lantern is lit (D-037, D-026). An item on
// the new tile is then picked up (pickUp). The oil lines look at the oil after
// both (D-096). Walking into an enemy attacks it (D-017), and into an unlit
// torch's wall lights it (D-121). Stepping onto stairs takes them, before the
// enemies left behind can act (D-132). Walking off an edge through an
// opening does the same, into the room beyond (D-197); elsewhere the edge is
// wall. Every passed turn ends with the enemies' turn (D-114), in the room
// the hero ends it in.
export function step(state, dir) {
  const [dx, dy] = DIRS[dir];
  const x = state.hero.x + dx, y = state.hero.y + dy;
  if (offEdge(state.room, x, y)) {
    const out = walkOff(passTurn(state), dir);
    return out ? endTurn(state, out) : state;
  }
  if (tileAt(state.room, x, y).solid) return lightTorch(state, x, y);
  const foe = enemyAt(state, x, y);
  if (foe) return attack(state, foe);
  let next = passTurn({ ...state, hero: { x, y } });
  const found = itemAt(state, x, y);
  if (found) next = pickUp(next, found);
  return endTurn(state, takeStairs(next) || next);
}

// § pick up: a flask is poured in, never above full, and is gone, even into a
// full lantern (D-078). A herb heals, never above full, and is gone with its
// line; at full health it stays on the floor (D-155, D-156).
function pickUp(state, found) {
  const entry = get(found.id), items = state.items.filter((it) => it !== found);
  if (entry.oil) return { ...state, items, oil: Math.min(1, state.oil + entry.oil) };
  if (entry.heal && state.health < HERO_HEALTH) return say({ ...state, items, health: Math.min(HERO_HEALTH, state.health + entry.heal) }, entry.says);
  return state;
}

// § enemies' turn: after the hero's, every enemy next to the hero bites, lit
// or not (D-114). The bite line replaces any other said this turn (D-117).
// A biting enemy has noticed the hero, even in the dark (D-157).
// A light-shy one on a lit tile doesn't bite (D-240).
// At 0 health the hero falls and wakes at the room's start (D-119).
// Then the others come one tile closer (D-126 to D-129).
function enemiesAct(state) {
  const bites = biters(state.enemies, state.hero).filter((e) => !(get(e.id).shy && litAt(state, e.x, e.y)));
  if (!bites.length) return enemiesMove(state);
  const health = Math.max(0, state.health - bites.reduce((sum, e) => sum + get(e.id).bite, 0));
  const enemies = state.enemies.map((e) => (bites.includes(e) ? { ...e, chasing: true } : e));
  const bitten = say({ ...state, health, enemies }, get(bites[0].id).bites);
  return health > 0 ? enemiesMove(bitten) : fall(bitten);
}

// § enemies move: an enemy on a lit tile with a clear line to the hero, no
// wall between, notices them (D-126, D-226) and keeps
// coming until it dies or the hero falls (D-127). Each turn it steps one tile
// toward them, the farther side first, else the other side, else it stays
// (D-128). One that steps next to the hero bites on the next turn (D-129).
// A step left or right turns it to face that way; up or down keeps its
// facing (D-158). They move in list order, so one waits behind another.
// A light-shy one (D-240) notices along a clear line, lit or not, and never
// steps onto a lit tile; caught in light, it backs away, into the dark if it can.
function enemiesMove(state) {
  let enemies = state.enemies;
  for (const e of state.enemies) {
    const shy = get(e.id).shy, lit = litAt(state, e.x, e.y);
    const chasing = e.chasing || ((shy || lit) && clearLine(state.room, e, state.hero));
    if (!chasing && !(shy && lit)) continue;
    const near = Math.abs(e.x - state.hero.x) + Math.abs(e.y - state.hero.y) === 1;
    const now = { ...state, enemies };
    const to = (shy && lit ? backAway(now, e) : near ? e : chaseStep(now, e)) || e;
    const facing = to.x < e.x ? 'left' : to.x > e.x ? 'right' : e.facing;
    enemies = enemies.map((o) => (o === e ? { ...e, x: to.x, y: to.y, ...(chasing && { chasing: true }), ...(facing && { facing }) } : o));
  }
  return enemies === state.enemies ? state : { ...state, enemies };
}

// Whether enemy e may step onto tile x, y: nothing solid, no item, no other
// enemy, not the hero, and no light for a light-shy one unless `lit` (D-240)
function free(state, e, x, y, lit = false) {
  if (tileAt(state.room, x, y).solid || itemAt(state, x, y) || enemyAt(state, x, y) || (x === state.hero.x && y === state.hero.y)) return false;
  return lit || !(get(e.id).shy && litAt(state, x, y));
}

// Where a light-shy enemy caught in light backs to (D-241, D-243): the dark
// tile next to it farthest from the hero, else one farther from them that
// only the lantern lights, never a torch or any other light, else null: it stays
function backAway(state, e) {
  const away = (t) => Math.abs(t.x - state.hero.x) + Math.abs(t.y - state.hero.y);
  const next = Object.values(DIRS).map(([dx, dy]) => ({ x: e.x + dx, y: e.y + dy }));
  const far = (list) => list.reduce((best, t) => (!best || away(t) > away(best) ? t : best), null);
  const unlit = { ...state, lit: false }; // every light but the lantern
  return far(next.filter((t) => free(state, e, t.x, t.y))) ||
    far(next.filter((t) => away(t) > away(e) && free(state, e, t.x, t.y, true) && !litAt(unlit, t.x, t.y)));
}

// The tile enemy e steps onto, or null when both ways toward the hero are
// blocked (see `free`).
function chaseStep(state, e) {
  const dx = state.hero.x - e.x, dy = state.hero.y - e.y;
  const across = dx ? [Math.sign(dx), 0] : null, down = dy ? [0, Math.sign(dy)] : null;
  const ways = Math.abs(dx) >= Math.abs(dy) ? [across, down] : [down, across];
  for (const w of ways) {
    if (!w) continue;
    const x = e.x + w[0], y = e.y + w[1];
    if (free(state, e, x, y)) return { x, y };
  }
  return null;
}

// § fall: back to the start of the first room, every room as it began, with
// full health and the starting oil. The map stays remembered (D-119, D-136,
// D-021), but the depths below the second room get a new seed and new
// layouts, and their maps are forgotten (D-148). The new seed places the
// hand-made rooms' items and rats afresh (D-192). `fell` keeps the room
// as the hero fell in it, for the fall to be shown before they wake (D-234).
function fall(state) {
  const seed = nextSeed(state.seed), { place, hero } = state.home;
  const begun = state.home.places ? beginAll(seed) : { [place]: state.home };
  const seen = { [state.place]: state.seen };
  for (const [id, p] of Object.entries(state.elsewhere)) seen[id] = p.seen;
  for (const id of Object.keys(seen)) if (isGenerated(id)) delete seen[id];
  const { room, lights, enemies, items = [] } = begun[place];
  const woke = { room, hero, lights, enemies, items, seen: seen[place] || blankMemory(room), place, elsewhere: away(begun, place, seen) };
  const home = state.home.places ? { ...state.home, ...begun[place], hero, places: begun } : state.home;
  const { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn } = state;
  const fell = { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn, seed: state.seed, health: 0 };
  return say({ ...state, ...woke, home, seed, fell, health: HERO_HEALTH, oil: OIL.start, found: foundAfterFall(state.found) }, 'fall');
}

// § attack: the hero swings the lantern at the foe and stays put (D-109).
// It passes a turn like a step, so oil burns (D-111). The foe's line is
// said, and an oil line said on the same turn replaces it (D-112). A foe
// beaten is worth experience (D-245).
export const LANTERN_HIT = 1; // two hits kill the rat (D-110)
function attack(state, foe) {
  const entry = get(foe.id), enemies = hitEnemy(state.enemies, foe, entry, LANTERN_HIT);
  const dead = enemies.length < state.enemies.length, next = passTurn({ ...state, enemies });
  return endTurn(state, say(dead ? gain(next, XP_FOE) : next, dead ? entry.die : entry.hurt));
}

// § light a torch: walking into the wall of an unlit torch, from the tile it
// faces, lights it for good (D-121). It passes a turn like a step (D-122);
// the hit's rules for lines apply (D-124). With the lantern off nothing
// happens and no turn passes, but the line says why (D-122).
function lightTorch(state, x, y) {
  const torch = lightAt(state, x, y), entry = torch && get(torch.id);
  if (!entry?.lightsTo) return state;
  const side = openSide(mountAt(state.room, x, y), x, y);
  if (!side || side.x !== state.hero.x || side.y !== state.hero.y) return state;
  if (!state.lit) return say(state, 'lanternDark');
  const lights = state.lights.map((l) => (l === torch ? { ...l, id: entry.lightsTo } : l));
  return endTurn(state, say(passTurn({ ...state, lights }), 'torchLit'));
}

// § wait: stand still for one turn (D-084). It passes a turn like a step,
// so oil burns while the lantern is lit (D-037).
export const wait = (state) => endTurn(state, passTurn(state));
const passTurn = (state) => ({ ...state, turn: state.turn + 1, oil: state.lit ? burnOil(state.oil) : state.oil });
// The end of a passed turn: the oil line, if one was crossed, a new room's
// experience (D-245), then the enemies' turn.
const endTurn = (before, after) => {
  const id = oilLine(before.oil, after.oil);
  return enemiesAct(discover(before, id ? say(after, id) : after));
};

// § switch: the lantern on or off, whenever the player likes. It is free:
// no turn passes and no oil burns (D-015, D-080, D-081).
export const switchLantern = (state) => ({ ...state, lit: !state.lit });
// With the lantern set to By itself (D-210): out as the hero comes into daylight,
// or dawn comes, lit again as they leave it, or dusk falls (D-217); else the state
// as it is. Only at that change, so the player's own switch between holds. It is
// free, like the switch.
export function followDaylight(before, after) {
  const was = inDaylight(before), now = inDaylight(after);
  return was === now || after.lit === was ? after : { ...after, lit: was };
}

// § items: the item lying on tile x, y, or undefined
export const itemAt = (state, x, y) => state.items.find((it) => it.x === x && it.y === y);

// § toward: the direction from one point to another, along whichever side is
// farther (a tap steps toward where it lands, D-042). Null when they match.
export function toward(fromX, fromY, toX, toY) {
  const dx = toX - fromX, dy = toY - fromY;
  if (dx === 0 && dy === 0) return null;
  if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? 'right' : 'left';
  return dy > 0 ? 'down' : 'up';
}
