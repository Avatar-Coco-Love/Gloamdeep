// § boot: set up the screen, the room and the hero. The screens are in
// input/screens.js and the drawing in render/frame.js (D-235); `app` holds
// what the three share.
import { VERSION } from './core/version.js';
import { makeWorld, step, wait, pour, pourByItself, switchLantern, followDaylight, toward, DIRS, HERO_HEALTH } from './core/turn.js';
import { resetRoom } from './core/spawn.js';
import { enemyAt, biteSound } from './core/enemies.js';
import { eventsSince, has } from './core/events.js';
import { goToDepth, goToPlace } from './core/stairs.js';
import { beginPlace, depthOf } from './core/room.js';
import { SEED_MAX } from './core/rng.js';
import { createScreen, TILE } from './render/screen.js';
import { reach, setOil } from './core/oil.js';
import { createTextLine } from './render/textline.js';
import { loadSettings, swipesWalk, tapsWalk, stillMotion } from './core/settings.js';
import { deeper, counted } from './core/record.js';
import { loadProfiles, saveProfiles, playing, withRecords, usingSlot, withoutSlot, renamedSlot, lookedSlot } from './core/profile.js';
import { loadJourney, saveJourney, dropJourney } from './core/save.js';
import { remember, rememberAll, forget } from './core/fog.js';
import { inDaylight, passTime } from './core/daytime.js';
import { lanternFrom } from './core/sight.js';
import { mouthLight } from './core/mouth.js';
import { wayStep, cameIntoView } from './core/walk.js';
import { createInput } from './input/input.js';
import { createLanternButton } from './input/lantern.js';
import { createPauseButton } from './input/pause.js';
import { createMapButton } from './input/mapbutton.js';
import { createBagButton } from './input/bagbutton.js';
import { createMapMoves } from './input/mapview.js';
import { createScreens } from './input/screens.js';
import { createFrame, FADE_MS } from './render/frame.js';
import { createSound } from './render/sound.js';
import { createDev } from './dev/dev.js';

const canvas = document.getElementById('game'), hud = document.getElementById('hud');
const { ctx, hudCtx } = createScreen(canvas, hud);
document.getElementById('version').textContent = VERSION;

// The only Math.random: a new seed for each journey (D-148, D-187), unless a
// seed is typed in Settings (D-191). journeySeed: the one this journey began on.
const randomSeed = () => Math.floor(Math.random() * SEED_MAX) + 1; // the Seed Explorer's Reseed too (D-214)
const app = {
  settings: loadSettings(), // kept on this device (D-189)
  journeySeed: 0, state: null,
  // Who plays: the profiles on this device (D-268), the one in use picked on the slot screen (D-271)
  profiles: loadProfiles(),
  jumped: false, // a dev jump stops this journey counting towards the deepest depth (D-232)
  // screen: 'slots', 'name', 'drop', 'title', 'play', 'paused', 'settings', 'seed', 'howto', 'map', 'bag', 'explore', 'history' or 'journal'
  screen: 'slots', chosen: 0,
  picking: null, dropping: 0, slotsBack: false, // the slot screen: Rename or Delete picked (D-273), the slot asked about, Back shown (D-271)
  pageFrom: 'title', // the menu Settings or How to play was opened from
  page: 'touch', // How to play's page
  entry: '', // the digits typed on the seed pad, or the letters on the name pad
  naming: 0, renaming: false, // the slot the name pad names: an empty one (D-272), or a profile renamed (D-273)
  padFrom: 'settings', // the screen the seed pad was opened from: Settings or the Explorer
  seeds: [], // the seeds the Explorer has shown this visit, the last one on screen
  plan: null, view: null, floors: [], // the map shown, its view, and the floors it turns to
  spokenLine: null,
  cam: { x: 0, y: 0 }, // the room pixel at the screen's top-left (src/core/camera.js)
  bagOnTop: false, // the bag's panel over the room's top, so it doesn't hide the hero (D-247)
  opened: new Set(), rows: [], scroll: 0, // Version history: the versions open, its rows, and how far it is scrolled (D-254)
};
const newWorld = () => {
  app.journeySeed = app.settings.seed || randomSeed();
  return makeWorld('first', app.journeySeed);
};
// The profile's saved journey comes back as it was, ready for Continue (D-238); with none
// in use, or none saved, a new world waits unsaved
function loadInto(slot) {
  const kept = slot === null ? null : loadJourney(slot);
  app.saved = !!kept;
  if (kept) { app.state = kept.state; app.jumped = kept.jumped; app.journeySeed = kept.state.seed; }
  else { app.state = newWorld(); app.jumped = false; }
}
loadInto(app.profiles.current);
const sound = createSound(() => app.settings.sound === 'on'); // D-255
// Saved after every turn, or any change, once the journey has begun (D-238)
let savedState = app.state;
function keepJourney() {
  if (app.state === savedState) return;
  saveJourney(app.state, app.jumped, app.profiles.current); savedState = app.state; app.saved = true;
}
function keepRecords(events) {
  // The profile's Records (D-021, D-232, D-268, D-270): the deepest depth walked to,
  // and the creatures beaten, falls and rooms found that this action's events bring
  const was = playing(app.profiles).records, d = deeper(was.deepest, depthOf(app.state.place), app.jumped);
  let records = counted(was, events, app.jumped);
  if (d !== records.deepest) records = { ...records, deepest: d };
  if (records !== was) { app.profiles = withRecords(app.profiles, records); saveProfiles(app.profiles); }
}
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
// Motion follows the device until the Motion switch is picked (D-190)
const still = () => stillMotion(app.settings.motion, reduceMotion.matches);

const textLine = createTextLine();
const spoken = document.getElementById('line'); // the same words for screen readers

// § moving: the hero slides to its new tile (D-043); one step or wait waits in line
// so a quick second tap or key is not lost.
const SLIDE = 0.18; // tiles per frame, as in the study
const HOLD_STEP_MS = 250; // a held finger walks about 4 steps a second (D-044)
let lastHeldStep = 0;
Object.assign(app, {
  shown: { x: app.state.hero.x, y: app.state.hero.y },
  queued: null, nudge: null, // nudge: { dx, dy, until } after bumping a wall
  // The held walk (D-219, D-220): its target tile, set where the finger lands and moved only when it slides,
  // as the camera follows the hero; `stopped` once something came into view, until the finger lifts.
  walk: null, // { px, py, tx, ty, stopped }
  alertUntil: 0, // the "!" over the hero after a stop
  gain: null, // { n, at } the "+1" over the hero when experience is earned (D-245)
  hit: null, // { enemy, until, shakeUntil } after attacking an enemy (D-105, D-109)
  jab: null, // { dx, dy, start } after a hit with a weapon held (D-253)
  bitten: null, // { until, shakeUntil } after a bite: the hero flashes red (D-118)
  travel: null, // { from, mid, end } while taking stairs: the old room fades out, the new one in (D-135)
  fall: null, // { from, lieAt, darkAt, mid, end } after a fall, until the hero wakes (D-234)
});
const ALERT_MS = 900;
const HIT_FLASH_MS = 140, SHAKE_MS = 120; // the study's (study line 470)
// A fall (D-234): the hero lies down, the light closes to the deepest dark over about a
// second, stays dark a moment, then opens on the start. With reduced motion, only the dark.
const FALL = { lie: 120, dark: 1000, wake: 1300, end: 1800 }, FALL_STILL_MS = 800;
const settled = () => !app.travel && !app.fall && app.shown.x === app.state.hero.x && app.shown.y === app.state.hero.y;
const flashFor = () => { const now = performance.now(); return { until: now + HIT_FLASH_MS, shakeUntil: now + SHAKE_MS }; };
const snap = (to) => { app.shown.x = to.x; app.shown.y = to.y; };

function tryStep(dir) {
  if (app.fall) return; // nothing is taken while the hero lies fallen
  if (!settled()) { app.queued = dir; return; }
  const before = app.state;
  let to = before.hero;
  if (dir === 'wait') app.state = wait(app.state); // standing still, one turn (D-084)
  else if (dir.pour !== undefined) app.state = pour(app.state, dir.pour); // a flask from the bag, one turn (D-247)
  else {
    const next = step(app.state, dir);
    const [dx, dy] = DIRS[dir], foe = enemyAt(app.state, app.state.hero.x + dx, app.state.hero.y + dy);
    to = { x: before.hero.x + dx, y: before.hero.y + dy };
    if (foe) app.hit = { enemy: foe, ...flashFor() };
    if (foe && before.held) app.jab = { dx, dy, start: performance.now() }; // the knife's stab (D-253)
    else if (next.turn === app.state.turn) nudgeToward(dir); // a bump, or a torch the dark lantern can't light (D-122)
    app.state = next;
  }
  app.state = byItself(before, app.state);
  if (app.settings.flasks === 'self') app.state = pourByItself(before, app.state);
  const { state } = app, fell = state.fell !== before.fell;
  if (fell || state.health < before.health) app.bitten = flashFor();
  const events = eventsSince(before, state);
  hear(events);
  keepRecords(events);
  if (fell) fallDown(state.fell);
  const went = !fell && state.place !== before.place;
  if (went && !still()) { // the hero walks onto the stairs as the old room fades (D-135)
    const now = performance.now();
    app.travel = { from: { ...before, hero: to }, mid: now + FADE_MS, end: now + 2 * FADE_MS };
  } else if (went || (still() && !fell)) { snap(state.hero); if (went) foeShown = new Map(); }
  else if (!fell) followFoes(before.enemies, state.enemies);
  // Experience earned shows as it rises over the hero; after stairs, once the new room shows (D-245)
  if (state.xp > before.xp) app.gain = { n: state.xp - before.xp, at: app.travel?.mid ?? performance.now() };
}
// The fall is shown in the room where it happened, then the hero wakes at the start (D-234)
function fallDown(from) {
  const now = performance.now();
  app.hit = null; app.queued = null;
  if (app.walk) app.walk.stopped = true;
  if (still()) { snap(from.hero); app.fall = { from, lieAt: now, darkAt: now, mid: now + FALL_STILL_MS, end: now + FALL_STILL_MS }; }
  else app.fall = { from, lieAt: now + FALL.lie, darkAt: now + FALL.dark, mid: now + FALL.wake, end: now + FALL.end };
}

// § enemies sliding: a rat slides to its new tile like the hero (D-128).
// `foeShown` holds where each enemy is drawn; one it doesn't know yet (a spawn,
// a reset, a fall) shows on its tile at once. A turn keeps the enemies in order,
// less any the hit killed, so the new list pairs with the old one by place.
let foeShown = new Map();
function followFoes(was, now) {
  const alive = now.length < was.length ? was.filter((e) => e !== app.hit?.enemy) : was;
  if (alive.length !== now.length) return;
  const next = new Map();
  now.forEach((e, i) => next.set(e, foeShown.get(alive[i]) || { x: alive[i].x, y: alive[i].y }));
  foeShown = next;
}
function foeAt(e) {
  let p = foeShown.get(e);
  if (!p || still()) { p = { x: e.x, y: e.y }; foeShown.set(e, p); }
  return p;
}
function nudgeToward(dir) {
  const [dx, dy] = DIRS[dir];
  app.nudge = { dx, dy, until: performance.now() + 90 };
}
// A tap on the hero waits a turn; a finger held on the hero does nothing (D-085).
// With Swipe only, taps toward a side and held fingers don't walk; a tap on the hero still waits (D-189).
const stepToward = (px, py, held = false) => {
  const h = app.state.hero, tx = Math.floor((px + app.cam.x) / TILE), ty = Math.floor((py + app.cam.y) / TILE);
  if (dev.place(tx, ty)) return; // a picked spawn takes the tap (D-049)
  const dir = toward(h.x, h.y, tx, ty);
  if (dir) { if (tapsWalk(app.settings.controls)) tryStep(dir); }
  else if (!held) tryStep('wait');
};
// § held walk: one step on the remembered way to the held tile, else one step toward it,
// as a held finger walked before (D-044, D-220). A creature or item coming into view stops it (D-219).
function walkOn() {
  const { walk } = app, before = app.state, h = before.hero, dir = wayStep(before, walk.tx, walk.ty) || toward(h.x, h.y, walk.tx, walk.ty);
  if (!dir) return;
  tryStep(dir);
  if (app.state !== before && cameIntoView(before, app.state)) { walk.stopped = true; app.alertUntil = performance.now() + ALERT_MS; }
  else if (app.state.place !== before.place) walk.stopped = true; // the held tile was in the room left behind
}
// The held point in game pixels → the walk's target, kept while the finger stays put
function holdAt(p) {
  if (!p || app.screen !== 'play' || dev.armed() || !tapsWalk(app.settings.controls)) { app.walk = null; return; }
  const { walk, cam } = app;
  if (walk && walk.px === p[0] && walk.py === p[1]) return;
  app.walk = { px: p[0], py: p[1], tx: Math.floor((p[0] + cam.x) / TILE), ty: Math.floor((p[1] + cam.y) / TILE), stopped: walk?.stopped || false };
}

// § hear: the sounds of an action's events (events.js, D-267): the hit's (D-258), the
// lantern's tick (D-257), a bite a moment after the hit, when there was one (D-259),
// and a tile walked, unless the hero fell (D-255)
function hear(events) {
  const hit = events.find((e) => e.type === 'hit'), bite = biteSound(events);
  if (hit) sound.hit(!!hit.held);
  for (const e of events) if (e.type === 'lantern') sound.lantern(e.lit);
  if (bite) sound[bite](!!hit);
  if (has(events, 'step') && !has(events, 'fall')) sound.footstep();
}
// The lantern set to By itself follows the daylight as the hero comes and goes (D-210)
const byItself = (before, after) => (app.settings.lantern === 'self' ? followDaylight(before, after) : after);
// § switch: the lantern button and the L key, free at any time in play (D-080, D-081); it ticks (D-257)
const switchIt = () => { if (app.screen === 'play') { const before = app.state; app.state = switchLantern(before); hear(eventsSince(before, app.state)); } };
const lanternButton = createLanternButton(hud, { onSwitch: switchIt });
const pauseButton = createPauseButton(hud, { onPause: () => screens.pause() });
const mapButton = createMapButton(hud, { onMap: () => screens.toggleMap() });
const bagButton = createBagButton(hud, { onBag: () => screens.toggleBag() });

// The hero and room shown afresh, with nothing moving, after the state is replaced
function freshView() {
  snap(app.state.hero);
  app.queued = app.nudge = app.hit = app.jab = app.bitten = app.travel = app.fall = app.gain = null; foeShown = new Map();
  frame.redraw(); rememberedAt = rememberedSeen = null;
}
// § journey: New journey starts in a new world (D-187)
function newJourney() {
  app.state = newWorld(); app.jumped = false;
  freshView();
  savedState = null; keepJourney(); // saved at once, so Continue is there before a first turn
}
// § slots (D-271): picking a slot plays as its profile, a new one in an empty slot, with its own journey;
// a new one takes the name typed on the name pad (D-272) and the cloak and eyes chosen after it (P3, P4)
function useSlot(i, name = '', look = {}) {
  app.profiles = usingSlot(app.profiles, i, name, look); saveProfiles(app.profiles);
  loadInto(i); savedState = app.state; freshView();
}
// Renaming a profile keeps all else, its journey too (D-273)
function renameSlot(i, name) { app.profiles = renamedSlot(app.profiles, i, name); saveProfiles(app.profiles); }
// A new look keeps all else too (P3)
function lookSlot(i, look) { app.profiles = lookedSlot(app.profiles, i, look); saveProfiles(app.profiles); }
// Deleting a profile drops its journey too; if it was in use, the next in use takes over
function dropSlot(i) {
  const was = app.profiles.current;
  app.profiles = withoutSlot(app.profiles, i); saveProfiles(app.profiles); dropJourney(i);
  if (app.profiles.current !== was) { loadInto(app.profiles.current); savedState = app.state; freshView(); }
}
const stage = document.getElementById('stage');
const screens = createScreens(app, {
  spoken, lanternButton, pauseButton, mapButton, bagButton, reduceMotion, newJourney, randomSeed, useSlot, renameSlot, lookSlot, dropSlot,
  pour: (slot) => tryStep({ pour: slot }),
  dev: () => dev, input: () => input, mapMoves: () => mapMoves, // made below
});
// In play the Controls switch can turn swipes off (D-189); off the room, the screens take them
const onDir = (dir, how) => {
  if (app.screen !== 'play') screens.onDir(dir, how);
  else if (how !== 'swipe' || swipesWalk(app.settings.controls)) tryStep(dir);
};
const onPoint = (px, py, held) => { if (app.screen === 'play') stepToward(px, py, held); else screens.onPoint(px, py, held); };
const onWait = () => { if (app.screen === 'play') tryStep('wait'); else if (!screens.onMapScreen()) screens.choose(); };
const onChoose = () => { if (app.screen !== 'play' && !screens.onMapScreen()) screens.choose(); };
const input = createInput(stage, canvas, {
  onDir, onPoint, onLantern: switchIt, onWait, onChoose, onPause: screens.pause, onMap: screens.toggleMap, onBag: screens.toggleBag, onFloor: screens.turnMap, onType: screens.onType,
});
const mapMoves = createMapMoves(stage, canvas, { active: screens.onMapScreen, onPan: screens.panMap, onZoom: screens.zoomMap });
const dev = createDev(stage, canvas, { // on for everyone (D-086)
  get: () => app.state,
  still,
  set: (s) => { // a new place shows at once, with no slide (Go to depth)
    const went = s.place !== app.state.place;
    app.state = byItself(app.state, s);
    hear(eventsSince(s, app.state)); // the lantern by itself ticks
    if (went) { snap(app.state.hero); foeShown = new Map(); }
  },
  reset: () => { // the room the hero is in, as it began
    const { state } = app, p = state.home.places[state.place] || beginPlace(state.place, state.seed);
    return resetRoom(state, p.room, p.start, p.lights, p.enemies, p.items);
  },
  forget: () => forget(app.state),
  setOil: (oil) => setOil(app.state, oil),
  heal: () => ({ ...app.state, health: HERO_HEALTH }),
  passTime: (turns) => passTime(app.state, turns), // the clock only (D-217)
  goTo: (depth) => { app.jumped = true; return goToDepth(app.state, depth); }, // depth 0 is the crypt (D-212)
  goOutside: () => goToPlace(app.state, 'woods'), // the woods, on the surface too (D-209)
  camera: () => app.cam,
}, hud);
const frame = createFrame(app, { ctx, hudCtx, hud, canvas, textLine, spoken, lanternButton, dev, screens, still, foeAt });
screens.openSlots(false); // the game opens on the slot screen (D-271)

// § memory: once the hero stands still on a tile, the tiles their lantern
// reaches are remembered (D-059). Again after a dev change to the memory or oil,
// or when the lantern comes back on. Nothing new is remembered while it is off (D-082).
// Daylight shows the whole room, so all of it is remembered, lantern or not (D-209);
// at night under the sky the lantern remembers as below ground (D-217).
// Daylight through the cave mouth remembers what it reaches, lantern or not (D-218).
let rememberedAt = null, rememberedSeen = null, sunAt = null, sunSeen = null;
function rememberHere() {
  let { state } = app;
  if (inDaylight(state)) { app.state = rememberAll(state); return; }
  const sun = mouthLight(state), when = state.place + ',' + state.turn;
  if (sun && (when !== sunAt || state.seen !== sunSeen)) { state = app.state = remember(state, sun); sunAt = when; sunSeen = state.seen; }
  if (!state.lit) { rememberedAt = null; return; }
  const key = state.hero.x + ',' + state.hero.y + ',' + state.oil;
  if (key === rememberedAt && state.seen === rememberedSeen) return;
  app.state = remember(state, { ...lanternFrom(state.hero.x, state.hero.y), r: reach(state.oil) });
  rememberedAt = key; rememberedSeen = app.state.seen;
}

// § loop: move the shown hero and enemies toward the real ones, take a waiting step, then draw
function approach(from, to) { return from + Math.sign(to - from) * Math.min(Math.abs(to - from), SLIDE); }
function update(t) {
  const { travel, fall, shown } = app;
  // § stairs: until the fade's middle the old room is shown, then the new one at once (D-135)
  if (travel && t >= travel.mid && travel.from) { travel.from = null; snap(app.state.hero); foeShown = new Map(); }
  if (travel && t >= travel.end) app.travel = null;
  // A fall shows where the hero fell until the dark is deepest, then where they wake (D-234)
  if (fall && t >= fall.mid && fall.from) { fall.from = null; snap(app.state.hero); foeShown = new Map(); }
  if (fall && t >= fall.end) app.fall = null;
  const s = app.travel?.from || app.fall?.from || app.state;
  shown.x = approach(shown.x, s.hero.x);
  shown.y = approach(shown.y, s.hero.y);
  for (const e of s.enemies) { const p = foeAt(e); p.x = approach(p.x, e.x); p.y = approach(p.y, e.y); }
  holdAt(input.held());
  if (settled() && app.screen === 'play') { // paused, no turn is taken
    rememberHere();
    if (app.queued) { const d = app.queued; app.queued = null; tryStep(d); }
    else if (app.walk && !app.walk.stopped && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; walkOn(); }
  }
}
function loop(t) {
  if (!screens.onTitle()) update(t);
  keepJourney();
  frame.draw(t);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
