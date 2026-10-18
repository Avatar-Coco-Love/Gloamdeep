// § turn: the game state and the turn rules, as plain data (TECH.md,
// "Turn rules are pure functions"). Nothing moves until the player acts (D-016).
import { tileAt, makeRoom, PLACES } from './room.js';
import { blankMemory } from './fog.js';
import { OIL, burnOil } from './oil.js';
import { get } from './registry.js';
import { say, oilLine } from './lines.js';
import { enemyAt, hitEnemy, biters } from './enemies.js';
import { lightAt, openSide } from './lights.js';
import { mountAt } from './mount.js';
import { litAt } from './sight.js';
import { takeStairs } from './stairs.js';

// § directions: four only, no diagonals (D-042)
export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// The hero starts where style study 1 put them (study line 277).
export const FIRST_START = PLACES.first.start;

// The hero's health: 5, and a rat's bite takes 1 (D-115).
export const HERO_HEALTH = 5;

// `home` is where the hero wakes after a fall: the room as it started (D-119).
// One room on its own, as tests use it; makeWorld adds the other places.
export function makeState(room, start = FIRST_START, lights = [], enemies = [], items = []) {
  const home = { place: 'first', room, hero: { x: start.x, y: start.y }, lights, enemies, items };
  return { room, hero: home.hero, turn: 0, seen: blankMemory(room), oil: OIL.start, lit: true, health: HERO_HEALTH, items, lights, enemies, line: null, place: 'first', elsewhere: {}, home };
}

// § world: every place, the hero in the first one. The others wait in
// `elsewhere` as they begin (stairs.js); `home.places` keeps them all as
// they began, for a fall (D-136) and the dev reset.
export function makeWorld(places = PLACES, first = 'first') {
  const begun = {};
  for (const [id, p] of Object.entries(places)) begun[id] = { room: makeRoom(p.map), start: p.start, lights: p.lights, enemies: p.enemies, items: p.items || [] };
  const here = begun[first], state = makeState(here.room, here.start, here.lights, here.enemies, here.items);
  return { ...state, place: first, elsewhere: away(begun, first, {}), home: { ...state.home, place: first, places: begun } };
}

// The places other than `here` as they began, with the memory in `seen` kept (D-021)
function away(begun, here, seen) {
  const out = {};
  for (const [id, p] of Object.entries(begun)) {
    if (id !== here) out[id] = { room: p.room, lights: p.lights, enemies: p.enemies, items: p.items || [], seen: seen[id] || blankMemory(p.room) };
  }
  return out;
}

// § step: (state, direction) → new state. Walking into something solid
// changes nothing and passes no turn, so the same state comes back (D-043).
// A passed turn burns oil while the lantern is lit (D-037, D-026). A flask on the new tile is then poured in,
// never above full, and is gone (D-078). The oil lines look at the oil after
// both (D-096). Walking into an enemy attacks it (D-017), and into an unlit
// torch's wall lights it (D-121). Stepping onto stairs takes them, before the
// enemies left behind can act (D-132). Every passed turn ends with the
// enemies' turn (D-114), in the room the hero ends it in.
export function step(state, dir) {
  const [dx, dy] = DIRS[dir];
  const x = state.hero.x + dx, y = state.hero.y + dy;
  if (tileAt(state.room, x, y).solid) return lightTorch(state, x, y);
  const foe = enemyAt(state, x, y);
  if (foe) return attack(state, foe);
  let next = passTurn({ ...state, hero: { x, y } });
  const found = itemAt(state, x, y);
  if (found) next = { ...next, items: state.items.filter((it) => it !== found), oil: Math.min(1, next.oil + get(found.id).oil) };
  return endTurn(state, takeStairs(next) || next);
}

// § enemies' turn: after the hero's, every enemy next to the hero bites, lit
// or not (D-114). The bite line replaces any other said this turn (D-117).
// At 0 health the hero falls and wakes at the room's start (D-119).
// Then the others come one tile closer (D-126 to D-129).
function enemiesAct(state) {
  const bites = biters(state.enemies, state.hero);
  if (!bites.length) return enemiesMove(state);
  const health = Math.max(0, state.health - bites.reduce((sum, e) => sum + get(e.id).bite, 0));
  const bitten = say({ ...state, health }, get(bites[0].id).bites);
  return health > 0 ? enemiesMove(bitten) : fall(bitten);
}

// § enemies move: an enemy on a lit tile notices the hero (D-126) and keeps
// coming until it dies or the hero falls (D-127). Each turn it steps one tile
// toward them, the farther side first, else the other side, else it stays
// (D-128). One that steps next to the hero bites on the next turn (D-129).
// They move in list order, so one waits behind another.
function enemiesMove(state) {
  let enemies = state.enemies;
  for (const e of state.enemies) {
    const chasing = e.chasing || litAt(state, e.x, e.y);
    if (!chasing) continue;
    const near = Math.abs(e.x - state.hero.x) + Math.abs(e.y - state.hero.y) === 1;
    const to = near ? e : chaseStep({ ...state, enemies }, e) || e;
    enemies = enemies.map((o) => (o === e ? { ...e, x: to.x, y: to.y, chasing: true } : o));
  }
  return enemies === state.enemies ? state : { ...state, enemies };
}

// The tile enemy e steps onto, or null when both ways toward the hero are
// blocked: by something solid, an item, another enemy or the hero.
function chaseStep(state, e) {
  const dx = state.hero.x - e.x, dy = state.hero.y - e.y;
  const across = dx ? [Math.sign(dx), 0] : null, down = dy ? [0, Math.sign(dy)] : null;
  const ways = Math.abs(dx) >= Math.abs(dy) ? [across, down] : [down, across];
  for (const w of ways) {
    if (!w) continue;
    const x = e.x + w[0], y = e.y + w[1];
    const taken = tileAt(state.room, x, y).solid || itemAt(state, x, y) || enemyAt(state, x, y) || (x === state.hero.x && y === state.hero.y);
    if (!taken) return { x, y };
  }
  return null;
}

// § fall: back to the start of the first room, every room as it began, with
// full health and the starting oil. The map stays remembered (D-119, D-136, D-021).
function fall(state) {
  const { place, hero } = state.home, begun = state.home.places || { [place]: state.home };
  const seen = { [state.place]: state.seen };
  for (const [id, p] of Object.entries(state.elsewhere)) seen[id] = p.seen;
  const { room, lights, enemies, items = [] } = begun[place];
  const woke = { room, hero, lights, enemies, items, seen: seen[place] || blankMemory(room), place, elsewhere: away(begun, place, seen) };
  return say({ ...state, ...woke, health: HERO_HEALTH, oil: OIL.start }, 'fall');
}

// § attack: the hero swings the lantern at the foe and stays put (D-109).
// It passes a turn like a step, so oil burns (D-111). The foe's line is
// said, and an oil line said on the same turn replaces it (D-112).
export const LANTERN_HIT = 1; // two hits kill the rat (D-110)
function attack(state, foe) {
  const entry = get(foe.id), enemies = hitEnemy(state.enemies, foe, entry, LANTERN_HIT);
  const dead = enemies.length < state.enemies.length;
  return endTurn(state, say(passTurn({ ...state, enemies }), dead ? entry.die : entry.hurt));
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
// The end of a passed turn: the oil line, if one was crossed, then the enemies' turn.
const endTurn = (before, after) => {
  const id = oilLine(before.oil, after.oil);
  return enemiesAct(id ? say(after, id) : after);
};

// § switch: the lantern on or off, whenever the player likes. It is free:
// no turn passes and no oil burns (D-015, D-080, D-081).
export const switchLantern = (state) => ({ ...state, lit: !state.lit });

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
