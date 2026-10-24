// § turn: the game state and the turn rules, as plain data (TECH.md,
// "Turn rules are pure functions"). Nothing moves until the player acts (D-016).
import { tileAt, beginPlace, isGenerated, PLACES } from './room.js';
import { nextSeed, rng, seedFor } from './rng.js';
import { blankMemory } from './fog.js';
import { OIL, burnOil } from './oil.js';
import { get } from './registry.js';
import { say, oilLine } from './lines.js';
import { enemyAt, hitEnemy, biters } from './enemies.js';
import { traits } from './behaviours.js';
import { lightAt, openSide } from './lights.js';
import { mountAt } from './mount.js';
import { litAt, clearLine } from './sight.js';
import { inDaylight } from './daytime.js';
import { takeStairs } from './stairs.js';
import { offEdge, walkOff } from './openings.js';
import { XP_FOE, gain, discover, foundAfterFall, levelOf } from './xp.js';
import { bagAdd, bagTake, stackFull } from './bag.js';
import { note, fresh } from './events.js';
import { noteTaken, regrow } from './regrow.js';

// § directions: four only, no diagonals (D-042)
export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// The hero starts where style study 1 put them (study line 277).
export const FIRST_START = PLACES.first.start;

// The hero's health: 5, and a rat's bite takes 1 (D-115). Hearts bought with
// embers add to it (growth.js, D-293).
export const HERO_HEALTH = 5;
export const maxHealth = (state) => HERO_HEALTH + (state.hearts ?? 0);

// `home` is where the hero wakes after a fall: the room as it started (D-119).
// One room on its own, as tests use it; makeWorld adds the other places.
// `seed` sets every generated depth (D-148).
export function makeState(room, start = FIRST_START, lights = [], enemies = [], items = [], seed = 1) {
  const home = { place: 'first', room, hero: { x: start.x, y: start.y }, lights, enemies, items };
  return { room, hero: home.hero, turn: 0, seed, seen: blankMemory(room), oil: OIL.start, lit: true, health: HERO_HEALTH, items, taken: [], lights, enemies, line: null, place: 'first', elsewhere: {}, home, xp: 0, found: ['first'], bag: [], held: null, events: [], told: {} };
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
    if (id !== here) out[id] = { room: p.room, lights: p.lights, enemies: p.enemies, items: p.items || [], taken: [], seen: seen[id] || blankMemory(p.room) };
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
// the hero ends it in. A tile walked onto is a `step` event (events.js).
export function step(state, dir) {
  const [dx, dy] = DIRS[dir];
  const x = state.hero.x + dx, y = state.hero.y + dy;
  if (offEdge(state.room, x, y)) {
    const out = walkOff(note(passTurn(state), 'step'), dir);
    return out ? endTurn(state, out) : state;
  }
  if (tileAt(state.room, x, y).solid) return lightTorch(state, x, y);
  const foe = enemyAt(state, x, y);
  if (foe) return attack(state, foe);
  let next = note(passTurn({ ...state, hero: { x, y } }), 'step');
  const found = itemAt(state, x, y);
  if (found) next = pickUp(next, found);
  return endTurn(state, takeStairs(next) || next);
}

// § pick up: a flask goes into the bag, and stays on the floor when the bag
// has no room (D-247), or with its full line when its stack is full (D-250);
// an oilcap the same, saying one of its lines as it goes in (D-296, D-297). A herb heals, never above full, and is gone with its
// line; at full health it stays on the floor (D-155, D-156). A weapon goes
// into an empty hand with its line (D-252); with one held it stays for now,
// as only one knife lies in the world. Taken is a `take` event, a herb eaten an `eat`.
// Either way it goes on the room's taken list, to grow back (regrow.js, D-306).
function pickUp(state, found) {
  const entry = get(found.id), id = found.id;
  const gone = { items: state.items.filter((it) => it !== found), taken: noteTaken(state, found).taken };
  if (entry.hold) return state.held ? state : note(say({ ...state, ...gone, held: id }, entry.says), 'take', { id });
  if (entry.bag) {
    const bag = bagAdd(state.bag, id);
    if (bag) return note(entry.says ? say({ ...state, ...gone, bag }, entry.says) : { ...state, ...gone, bag }, 'take', { id });
    return stackFull(state.bag, id) ? say(state, entry.full) : state;
  }
  if (entry.heal && state.health < maxHealth(state)) return note(say({ ...state, ...gone, health: Math.min(maxHealth(state), state.health + entry.heal) }, entry.says), 'eat', { id });
  return state;
}

// § enemies' turn: after the hero's, every enemy next to the hero bites, lit
// or not (D-114). The bite line replaces any other said this turn (D-117).
// A biting enemy has noticed the hero, even in the dark (D-157).
// One that shuns light doesn't bite from a lit tile (D-240, its `bitesLit`).
// One fleeing bites only when it has no tile to flee to (D-292).
// At 0 health the hero falls and wakes at the room's start (D-119).
// Then the others come one tile closer (D-126 to D-129).
// Each bite is a `bite` event, in the order they bite.
function enemiesAct(state) {
  const bites = biters(state.enemies, state.hero)
    .filter((e) => traits(get(e.id)).bitesLit || !litAt(state, e.x, e.y))
    .filter((e) => !fleeing(e) || !fleeStep(state, e));
  if (!bites.length) return enemiesMove(state);
  const health = Math.max(0, state.health - bites.reduce((sum, e) => sum + get(e.id).bite, 0));
  const enemies = state.enemies.map((e) => (bites.includes(e) ? { ...e, chasing: true } : e));
  const stood = state.line?.turn === state.turn && bites.some((e) => get(e.id).stands === state.line.id);
  let bitten = stood ? { ...state, health, enemies } : say({ ...state, health, enemies }, get(bites[0].id).bites);
  for (const e of bites) bitten = note(bitten, 'bite', { id: e.id, hurt: get(e.id).bite });
  return health > 0 ? enemiesMove(bitten) : fall(bitten);
}

// § enemies move: an enemy on a lit tile with a clear line to the hero, no
// wall between, notices them (D-126, D-226) and keeps
// coming until it dies or the hero falls (D-127). Each turn it steps one tile
// toward them, the farther side first, else the other side, else it stays
// (D-128). One that steps next to the hero bites on the next turn (D-129).
// A step left or right turns it to face that way; up or down keeps its
// facing (D-158). They move in list order, so one waits behind another.
// How each acts comes from its ways (behaviours.js, D-269): one that shuns
// light (D-240) notices along a clear line, lit or not, and never steps onto
// a lit tile; caught in light, it backs away, into the dark if it can.
// One fleeing steps away from the hero instead (D-292), for its `flees`
// turns; then it stops and has to notice them again (D-301).
function enemiesMove(state) {
  let enemies = state.enemies;
  for (const e of state.enemies) {
    const t = traits(get(e.id)), lit = litAt(state, e.x, e.y);
    const sees = t.notices === 'anyLine' || (t.notices === 'inLight' && lit);
    const chasing = e.chasing || (sees && clearLine(state.room, e, state.hero));
    const flees = lit && t.whenLit === 'backAway', runs = fleeing(e);
    if (!(chasing && t.moves) && !flees && !runs) continue;
    const near = Math.abs(e.x - state.hero.x) + Math.abs(e.y - state.hero.y) === 1;
    const now = { ...state, enemies };
    const to = (flees ? backAway(now, e) : runs ? fleeStep(now, e) : near ? e : chaseStep(now, e)) || e;
    const facing = to.x < e.x ? 'left' : to.x > e.x ? 'right' : e.facing;
    const moved = { ...e, x: to.x, y: to.y, ...(chasing && { chasing: true }), ...(facing && { facing }) };
    if (runs) Object.assign(moved, e.flees > 1 ? { flees: e.flees - 1 } : { flees: 0, chasing: false });
    enemies = enemies.map((o) => (o === e ? moved : o));
  }
  return enemies === state.enemies ? state : { ...state, enemies };
}

// Whether enemy e may step onto tile x, y: nothing solid, no item, no other
// enemy, not the hero, and no light for one that shuns it unless `lit` (D-240)
function free(state, e, x, y, lit = false) {
  if (tileAt(state.room, x, y).solid || itemAt(state, x, y) || enemyAt(state, x, y) || (x === state.hero.x && y === state.hero.y)) return false;
  return lit || traits(get(e.id)).intoLight || !litAt(state, x, y);
}

// Where an enemy that shuns light, caught in it, backs to (D-241, D-243): the dark
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

// Whether enemy e is fleeing: turns of fleeing left (D-292, D-301)
const fleeing = (e) => e.flees > 0;

// One that may flee when hurt tosses a seeded coin as the hit hurts it: it
// flees for `fleeTurns` turns, or stands its ground and keeps coming (D-301)
function fleeOrStand(state, enemies, foe) {
  const t = traits(get(foe.id)), hurt = enemies.find((e) => e.x === foe.x && e.y === foe.y);
  if (t.whenHurt !== 'flee' || !hurt) return { enemies, stands: false };
  const flees = rng(seedFor(state.seed ^ state.turn, foe.x * 64 + foe.y))() < t.fleeChance;
  return { enemies: flees ? enemies.map((e) => (e === hurt ? { ...e, flees: t.fleeTurns } : e)) : enemies, stands: !flees };
}

// The tile a fleeing enemy steps onto: chaseStep's mirror, away from the hero,
// the farther side first, else the other side, else null: it stays (D-292)
const fleeStep = (state, e) => chaseStep(state, e, -1);

// The tile enemy e steps onto, or null when both ways toward the hero are
// blocked (see `free`). With `sign` -1 it steps away from them instead.
function chaseStep(state, e, sign = 1) {
  const dx = sign * (state.hero.x - e.x), dy = sign * (state.hero.y - e.y);
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
// It is a `fall` event.
function fall(state) {
  const seed = nextSeed(state.seed), { place, hero } = state.home;
  const begun = state.home.places ? beginAll(seed) : { [place]: state.home };
  const seen = { [state.place]: state.seen };
  for (const [id, p] of Object.entries(state.elsewhere)) seen[id] = p.seen;
  for (const id of Object.keys(seen)) if (isGenerated(id)) delete seen[id];
  const { room, lights, enemies, items = [] } = begun[place];
  const woke = { room, hero, lights, enemies, items, taken: [], seen: seen[place] || blankMemory(room), place, elsewhere: away(begun, place, seen) };
  const home = state.home.places ? { ...state.home, ...begun[place], hero, places: begun } : state.home;
  const { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn } = state;
  const fell = { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn, seed: state.seed, health: 0 };
  return note(say({ ...state, ...woke, home, seed, fell, health: maxHealth(state), oil: OIL.start, found: foundAfterFall(state.found) }, 'fall'), 'fall');
}

// § attack: the hero swings the lantern at the foe and stays put (D-109),
// or the weapon held, which hits for its own `hit` (D-252). It passes a turn
// like a step, so oil burns (D-111). One that may flee flees or stands (D-301).
// The foe's line is said, and an oil line
// said on the same turn replaces it (D-112). A foe beaten is worth experience (D-245).
// It is a `hit` event, and a foe beaten a `beat` too.
export const LANTERN_HIT = 1; // two hits kill the rat (D-110)
export const heroHit = (state) => (state.held && get(state.held)?.hit) || LANTERN_HIT;
function attack(state, foe) {
  const entry = get(foe.id), hit = hitEnemy(state.enemies, foe, entry, heroHit(state));
  const dead = hit.length < state.enemies.length, { enemies, stands } = fleeOrStand(state, hit, foe);
  const next = note(passTurn({ ...state, enemies }), 'hit', { id: foe.id, held: state.held });
  return endTurn(state, say(dead ? note(gain(next, XP_FOE), 'beat', { id: foe.id }) : next, dead ? entry.die : stands ? entry.stands : entry.hurt));
}

// § light a torch: walking into the wall of an unlit torch, from the tile it
// faces, lights it for good (D-121). It passes a turn like a step (D-122);
// the hit's rules for lines apply (D-124). With the lantern off nothing
// happens and no turn passes, but the line says why (D-122). Lit, it is a `torch` event.
function lightTorch(state, x, y) {
  const torch = lightAt(state, x, y), entry = torch && get(torch.id);
  if (!entry?.lightsTo) return state;
  const side = openSide(mountAt(state.room, x, y), x, y);
  if (!side || side.x !== state.hero.x || side.y !== state.hero.y) return state;
  if (!state.lit) return say(state, 'lanternDark');
  const lights = state.lights.map((l) => (l === torch ? { ...l, id: entry.lightsTo } : l));
  return endTurn(state, note(say(passTurn({ ...state, lights }), 'torchLit'), 'torch'));
}

// § pour: a flask from bag slot i into the lantern, never above full, even
// into a full one (D-078). It passes a turn like a wait, so the oil burns first
// and the enemies act (D-247). An empty slot changes nothing. A `pour` event, by hand.
export function pour(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  if (!entry?.oil) return state;
  const next = note(passTurn(state), 'pour', { id: state.bag[i].id, by: 'hand' });
  return endTurn(state, { ...next, bag: bagTake(state.bag, i), oil: Math.min(1, next.oil + entry.oil) });
}

// § craft: Make on bag slot i turns its item's `craft.of` into one
// `craft.into`, which goes on its stack or in a slot at the end, and passes a
// turn, like a pour, with its line (D-299). With too few, nothing happens;
// with no room for what it makes, its `full` line is said, free, and the bag
// stays as it was.
export function craft(state, i) {
  const s = state.bag[i], recipe = s && get(s.id).craft;
  if (!recipe || s.n < recipe.of) return state;
  const bag = bagAdd(bagTake(state.bag, i, recipe.of), recipe.into);
  if (!bag) return say(state, get(recipe.into).full);
  return endTurn(state, say({ ...passTurn(state), bag }, recipe.says));
}

// § eat: Eat on bag slot i eats one of its item, healing its `heal` hearts,
// never above full, with its `eats` line; a turn passes, like a pour (D-308).
// A potion is drunk this way, for 4 hearts (D-309).
// At full health it stays, "You aren't hurt." is said, free. An `eat` event.
export function eat(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  if (!entry?.eats) return state;
  if (state.health >= maxHealth(state)) return say(state, 'notHurt');
  const next = note(say(passTurn(state), entry.eats), 'eat', { id: entry.id });
  return endTurn(state, { ...next, bag: bagTake(state.bag, i), health: Math.min(maxHealth(next), next.health + entry.heal) });
}

// § look: choosing bag slot i says its item's `look` line, the next in turn
// (D-297). Free: no turn passes. An item with none changes nothing.
export function look(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  return entry?.look ? say(state, entry.look) : state;
}

// § pour by itself: with Flasks set to By itself (D-249), after a turn has
// passed, the first flask in the bag pours once none of it would be wasted
// (at 55% oil or lower, D-248). It is free: no turn passes. "You pour a
// flask." is said, unless another line was said this turn (an oil line aside).
// It adds a `pour` event, by itself, to the turn's.
export function pourByItself(before, after) {
  if (after.turn === before.turn || after.fell !== before.fell) return after;
  const i = after.bag.findIndex((s) => get(s.id)?.oil && after.oil + get(s.id).oil <= 1 + 1e-9);
  if (i < 0) return after;
  const poured = note({ ...after, bag: bagTake(after.bag, i), oil: Math.min(1, after.oil + get(after.bag[i].id).oil) }, 'pour', { id: after.bag[i].id, by: 'self' });
  const other = after.line?.turn === after.turn && !['oilLow', 'oilEmpty'].includes(after.line.id);
  return other ? poured : say(poured, 'flaskPour');
}

// § wait: stand still for one turn (D-084). It passes a turn like a step,
// so oil burns while the lantern is lit (D-037).
export const wait = (state) => endTurn(state, passTurn(state));
// A passed turn starts a new list of events (events.js)
const passTurn = (state) => fresh({ ...state, turn: state.turn + 1, oil: state.lit ? burnOil(state.oil) : state.oil });
// The end of a passed turn: the oil line, if one was crossed, a new room's
// experience (D-245), the level line if a level was reached, which replaces
// any other line (D-246), then the enemies' turn. Another room is an `enter`
// event, a new one a `found` too, and a level reached a `level`. Last, what
// was taken here and is due grows back out of sight, or anywhere in a room
// just come into, as it grew while the hero was away (regrow.js, D-307).
const endTurn = (before, after) => {
  const id = oilLine(before.oil, after.oil), place = after.place;
  let found = discover(before, id ? say(after, id) : after);
  if (place !== before.place) found = note(found, 'enter', { place });
  if (found.found.length > after.found.length) found = note(found, 'found', { place });
  const level = levelOf(found.xp);
  return regrow(enemiesAct(level > levelOf(before.xp) ? note(say(found, 'levelUp', level), 'level', { n: level }) : found), place !== before.place);
};

// § switch: the lantern on or off, whenever the player likes. It is free:
// no turn passes and no oil burns (D-015, D-080, D-081). A `lantern` event, on a list of its own.
export const switchLantern = (state) => note(fresh({ ...state, lit: !state.lit }), 'lantern', { lit: !state.lit });
// With the lantern set to By itself (D-210): out as the hero comes into daylight,
// or dawn comes, lit again as they leave it, or dusk falls (D-217); else the state
// as it is. Only at that change, so the player's own switch between holds. It is
// free, like the switch, and adds a `lantern` event to the turn's.
export function followDaylight(before, after) {
  const was = inDaylight(before), now = inDaylight(after);
  return was === now || after.lit === was ? after : note({ ...after, lit: was }, 'lantern', { lit: was });
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
