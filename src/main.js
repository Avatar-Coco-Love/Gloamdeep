// § boot: set up the screen, the room and the hero
import { VERSION } from './core/version.js';
import { makeWorld, step, wait, switchLantern, toward, DIRS, HERO_HEALTH } from './core/turn.js';
import { resetRoom } from './core/spawn.js';
import { enemyAt } from './core/enemies.js';
import { glowsIn, goToDepth } from './core/stairs.js';
import { beginPlace, depthOf } from './core/room.js';
import { SEED_MAX } from './core/rng.js';
import { createScreen, TILE, W, H } from './render/screen.js';
import { drawRoom } from './render/tiles.js';
import { drawHero, drawItems, drawEnemies } from './render/sprites.js';
import { drawLight, flicker } from './render/light.js';
import { drawBrackets, torchLights, drawFlames } from './render/torches.js';
import { LANTERN, LANTERN_AT } from './core/light.js';
import { reach, setOil } from './core/oil.js';
import { drawOilBar, drawHearts, drawDepth } from './render/hud.js';
import { createTextLine } from './render/textline.js';
import { drawTitle, titleTop } from './render/title.js';
import { drawPause, lineAt, pauseTop } from './render/menu.js';
import { drawSeedPad, keyAt } from './render/seedpad.js';
import { drawHowTo, howtoAt } from './render/howto.js';
import { nextPage, howtoWords, HOWTO_LINES } from './core/howto.js';
import { PAD, typeKey, entrySeed, moveKey } from './core/seedpad.js';
import { TITLE_MENU, PAUSE_MENU, settingsMenu, moveChoice } from './core/menu.js';
import { loadSettings, saveSettings, nextControl, controlsText, swipesWalk, tapsWalk, stillMotion, motionText, nextMotion, seedText } from './core/settings.js';
import { shownLine } from './core/lines.js';
import { remember, forget } from './core/fog.js';
import { lanternFrom } from './core/sight.js';
import { cameraAt } from './core/camera.js';
import { createInput } from './input/input.js';
import { createLanternButton } from './input/lantern.js';
import { createPauseButton } from './input/pause.js';
import { createDev } from './dev/dev.js';

const canvas = document.getElementById('game');
const ctx = createScreen(canvas);
document.getElementById('version').textContent = VERSION;

let settings = loadSettings(); // kept on this device (D-189)
// The only Math.random: a new seed for each journey (D-148, D-187), unless a
// seed is typed in Settings (D-191). journeySeed: the one this journey began on.
let journeySeed = 0;
const newWorld = () => {
  journeySeed = settings.seed || Math.floor(Math.random() * SEED_MAX) + 1;
  return makeWorld('first', journeySeed);
};
let state = newWorld();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
// Motion follows the device until the Motion switch is picked (D-190)
const still = () => stillMotion(settings.motion, reduceMotion.matches);

const textLine = createTextLine();
const spoken = document.getElementById('line'); // the same words for screen readers
let spokenLine = null;

// The room is drawn onto a hidden canvas, again only when it changes (a dev spawn),
// as big as the whole room; the camera shows the screen's part of it (D-195).
const base = document.createElement('canvas');
let drawnRoom = null;
let cam = { x: 0, y: 0 }; // the room pixel at the screen's top-left (src/core/camera.js)

// § moving: the hero slides to its new tile (D-043); one step or wait waits in line
// so a quick second tap or key is not lost.
const SLIDE = 0.18; // tiles per frame, as in the study
const HOLD_STEP_MS = 250; // a held finger walks about 4 steps a second (D-044)
const shown = { x: state.hero.x, y: state.hero.y };
let queued = null, nudge = null, lastHeldStep = 0; // nudge: { dx, dy, until } after bumping a wall
let hit = null; // { enemy, until, shakeUntil } after attacking an enemy (D-105, D-109)
let bitten = null; // { until, shakeUntil } after a bite: the hero flashes red (D-118)
let travel = null; // { from, mid, end } while taking stairs: the old room fades out, the new one in (D-135)
const FADE_MS = 200; // each way
const HIT_FLASH_MS = 140, SHAKE_MS = 120; // the study's (study line 470)
const settled = () => !travel && shown.x === state.hero.x && shown.y === state.hero.y;
const flashFor = () => { const now = performance.now(); return { until: now + HIT_FLASH_MS, shakeUntil: now + SHAKE_MS }; };

function tryStep(dir) {
  if (!settled()) { queued = dir; return; }
  const before = state;
  let to = before.hero;
  if (dir === 'wait') state = wait(state); // standing still, one turn (D-084)
  else {
    const next = step(state, dir);
    const [dx, dy] = DIRS[dir], foe = enemyAt(state, state.hero.x + dx, state.hero.y + dy);
    to = { x: before.hero.x + dx, y: before.hero.y + dy };
    if (foe) hit = { enemy: foe, ...flashFor() };
    else if (next.turn === state.turn) nudgeToward(dir); // a bump, or a torch the dark lantern can't light (D-122)
    state = next;
  }
  // A fall wakes the hero at the start: they appear there, with no slide (D-119).
  const fell = state.line !== before.line && state.line?.id === 'fall';
  if (fell || state.health < before.health) bitten = flashFor();
  if (fell) hit = null;
  const went = !fell && state.place !== before.place;
  if (went && !still()) { // the hero walks onto the stairs as the old room fades (D-135)
    const now = performance.now();
    travel = { from: { ...before, hero: to }, mid: now + FADE_MS, end: now + 2 * FADE_MS };
  } else if (fell || went || still()) { shown.x = state.hero.x; shown.y = state.hero.y; if (went) foeShown = new Map(); }
  else followFoes(before.enemies, state.enemies);
}

// § enemies sliding: a rat slides to its new tile like the hero (D-128).
// `foeShown` holds where each enemy is drawn; one it doesn't know yet (a spawn,
// a reset, a fall) shows on its tile at once. A turn keeps the enemies in order,
// less any the hit killed, so the new list pairs with the old one by place.
let foeShown = new Map();
function followFoes(was, now) {
  const alive = now.length < was.length ? was.filter((e) => e !== hit?.enemy) : was;
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
  nudge = { dx, dy, until: performance.now() + 90 };
}
// A tap on the hero waits a turn; a finger held on the hero does nothing (D-085).
// With Swipe only, taps toward a side and held fingers don't walk; a tap on the hero still waits (D-189).
const stepToward = (px, py, held = false) => {
  const h = state.hero, tx = Math.floor((px + cam.x) / TILE), ty = Math.floor((py + cam.y) / TILE);
  if (dev.place(tx, ty)) return; // a picked spawn takes the tap (D-049)
  const dir = toward(h.x, h.y, tx, ty);
  if (dir) { if (tapsWalk(settings.controls)) tryStep(dir); }
  else if (!held) tryStep('wait');
};

// § switch: the lantern button and the L key, free at any time in play (D-080, D-081)
const switchIt = () => { if (screen === 'play') state = switchLantern(state); };
const lanternButton = createLanternButton(canvas, { onSwitch: switchIt });
const pauseButton = createPauseButton(canvas, { onPause: () => pause() });

const stage = document.getElementById('stage');
// § screens: the game opens on the title screen (D-177); in play, the pause button,
// Esc or P open the pause menu over the room (D-187). Settings opens from either,
// and Back, Esc or P return there (D-189). On a menu, arrows and swipes
// move the flame; Enter, Space or a tap on a line picks it. The Seed line opens
// the seed pad; Esc or P leave it with nothing changed (D-191). How to play opens
// from either menu on the way of playing last used, and returns there the same way (D-193).
let screen = 'title', chosen = 0; // screen: 'title', 'play', 'paused', 'settings', 'seed' or 'howto'
let pageFrom = 'title'; // the menu Settings or How to play was opened from
let page = 'touch'; // How to play's page
let entry = ''; // the digits typed on the seed pad
const menuOf = (sc) => (sc === 'title' ? TITLE_MENU : sc === 'paused' ? PAUSE_MENU
  : settingsMenu(settings, reduceMotion.matches, pageFrom === 'paused' ? journeySeed : null));
const onTitle = () => screen === 'title' || (screen !== 'play' && screen !== 'paused' && pageFrom === 'title');
const menuTop = () => (onTitle() ? titleTop(menuOf(screen).length) : pauseTop(menuOf(screen).length, screen === 'settings'));
const WORDS = {
  title: 'Gloamdeep. New journey, How to play or Settings: press Enter, or tap one.',
  paused: 'Paused. Resume, Settings, How to play, or Back to title.',
  play: '',
};
const settingsWords = () => `Settings. ${menuOf('settings').slice(0, -1).map((l) => l.text).join('. ')}. Pick one to change it. Back.`;
const SEED_WORDS = 'Seed. Type up to 5 digits, then OK. Random gives a new world each journey. Esc leaves it unchanged.';
function show(next, at = 0) {
  if ((next === 'settings' && screen !== 'seed') || next === 'howto') pageFrom = screen;
  screen = next; chosen = at;
  const playing = next === 'play';
  lanternButton.hide(!playing); pauseButton.hide(!playing); dev.hide(!playing);
  spokenLine = null;
  spoken.textContent = next === 'settings' ? settingsWords() : next === 'seed' ? SEED_WORDS
    : next === 'howto' ? howtoWords(page, settings.controls) : WORDS[next];
}
const backTo = (id) => () => show(pageFrom, menuOf(pageFrom).findIndex((l) => l.id === id));
const closeSettings = backTo('settings'), closeHowTo = backTo('howto');
function openHowTo() { page = input.kind(); show('howto'); }
function flipPage(back = false) { page = nextPage(page, back); spoken.textContent = howtoWords(page, settings.controls); }
function pause() {
  if (screen === 'play') { queued = null; show('paused'); } // a step waiting in line is dropped
  else if (screen === 'paused') show('play'); // Esc or P again resumes
  else if (screen === 'settings') closeSettings();
  else if (screen === 'seed') closePad();
  else if (screen === 'howto') closeHowTo();
}
function changeControls(back = false) {
  settings = { ...settings, controls: nextControl(settings.controls, back) };
  saveSettings(settings);
  spoken.textContent = controlsText(settings.controls);
}
function changeMotion() {
  settings = { ...settings, motion: nextMotion(settings.motion, reduceMotion.matches) };
  saveSettings(settings);
  spoken.textContent = motionText(settings.motion, reduceMotion.matches);
}
// § seed pad (D-191): OK keeps the typed seed, or Random when none is typed; Random
// keeps Random. Either starts the next New journey; this one goes on as it is.
function openPad() { entry = settings.seed ? String(settings.seed) : ''; show('seed'); }
const closePad = () => show('settings', menuOf('settings').findIndex((l) => l.id === 'seed'));
function pressKey(id) {
  if (id === 'ok' || id === 'random') {
    settings = { ...settings, seed: id === 'ok' ? entrySeed(entry) : null };
    saveSettings(settings);
    closePad();
    spoken.textContent = seedText(settings.seed);
  } else { entry = typeKey(entry, id); spoken.textContent = entry || 'nothing typed'; }
}
// Digits and Backspace type on the seed pad from a keyboard; the flame moves to OK, so Enter keeps it
const onType = (key) => {
  if (screen !== 'seed') return false;
  pressKey(key === 'backspace' ? 'del' : key);
  chosen = PAD.findIndex((k) => k.id === 'ok');
  return true;
};
// § journey: New journey starts in a new world; Back to title ends it (D-187)
function newJourney() {
  state = newWorld();
  shown.x = state.hero.x; shown.y = state.hero.y;
  queued = nudge = hit = bitten = travel = null; foeShown = new Map();
  drawnRoom = null; rememberedAt = rememberedSeen = null;
  show('play');
}
function choose(i = chosen) {
  const id = menuOf(screen)[i]?.id;
  if (screen === 'seed') { pressKey(PAD[i].id); return; }
  if (screen === 'howto') { if (HOWTO_LINES[i] === 'page') flipPage(); else closeHowTo(); return; }
  if (id === 'new') newJourney();
  else if (id === 'resume') show('play');
  else if (id === 'title') show('title');
  else if (id === 'settings') show('settings');
  else if (id === 'howto') openHowTo();
  else if (id === 'controls') changeControls();
  else if (id === 'motion') changeMotion();
  else if (id === 'seed') openPad();
  else if (id === 'back') closeSettings();
}
// Menus take swipes always; in play the Controls switch can turn swipes off (D-189).
const onDir = (dir, how) => {
  if (screen === 'play') { if (how !== 'swipe' || swipesWalk(settings.controls)) tryStep(dir); return; }
  if (screen === 'seed') { chosen = moveKey(chosen, dir); return; }
  if (screen === 'howto') { if (dir === 'left' || dir === 'right') flipPage(dir === 'left'); else chosen = moveChoice(chosen, dir, HOWTO_LINES.length); return; }
  const id = menuOf(screen)[chosen]?.id;
  if (id === 'controls' && (dir === 'left' || dir === 'right')) changeControls(dir === 'left');
  else if (id === 'motion' && (dir === 'left' || dir === 'right')) changeMotion();
  else chosen = moveChoice(chosen, dir, menuOf(screen).length);
};
const onPoint = (px, py, held) => {
  if (screen === 'play') { stepToward(px, py, held); return; }
  if (screen === 'seed') { const k = keyAt(px, py); if (k >= 0) { chosen = k; choose(k); } return; }
  if (screen === 'howto') { const at = howtoAt(px, py); if (at === 'back') closeHowTo(); else if (at) { chosen = 0; flipPage(at === 'prev'); } return; }
  const i = lineAt(py, menuOf(screen).length, menuTop());
  if (i >= 0) { chosen = i; choose(i); }
};
const onWait = () => { if (screen === 'play') tryStep('wait'); else choose(); };
const onChoose = () => { if (screen !== 'play') choose(); };
const input = createInput(stage, canvas, { onDir, onPoint, onLantern: switchIt, onWait, onChoose, onPause: pause, onType });
const dev = createDev(stage, canvas, { // on for everyone (D-086)
  get: () => state,
  set: (s) => { // a new place shows at once, with no slide (Go to depth)
    const went = s.place !== state.place;
    state = s;
    if (went) { shown.x = state.hero.x; shown.y = state.hero.y; foeShown = new Map(); }
  },
  reset: () => { // the room the hero is in, as it began
    const p = state.home.places[state.place] || beginPlace(state.place, state.seed);
    return resetRoom(state, p.room, p.start, p.lights, p.enemies, p.items);
  },
  forget: () => forget(state),
  setOil: (oil) => setOil(state, oil),
  heal: () => ({ ...state, health: HERO_HEALTH }),
  goTo: (depth) => goToDepth(state, depth),
  camera: () => cam,
});
show('title');

// § memory: once the hero stands still on a tile, the tiles their lantern
// reaches are remembered (D-059). Again after a dev change to the memory or oil,
// or when the lantern comes back on. Nothing new is remembered while it is off (D-082).
let rememberedAt = null, rememberedSeen = null;
function rememberHere() {
  if (!state.lit) { rememberedAt = null; return; }
  const key = state.hero.x + ',' + state.hero.y + ',' + state.oil;
  if (key === rememberedAt && state.seen === rememberedSeen) return;
  state = remember(state, { ...lanternFrom(state.hero.x, state.hero.y), r: reach(state.oil) });
  rememberedAt = key; rememberedSeen = state.seen;
}

const lights = [], torchGlow = []; // reused every frame (TECH.md)

// § loop: move the shown hero toward the real one, then draw
function approach(from, to) { return from + Math.sign(to - from) * Math.min(Math.abs(to - from), SLIDE); }
function frame(t) {
  if (onTitle()) {
    if (screen === 'seed') { drawTitle(ctx, [], 0, t, still()); drawSeedPad(ctx, entry, chosen, t, still()); }
    else if (screen === 'howto') { drawTitle(ctx, [], 0, t, still()); drawHowTo(ctx, page, settings.controls, chosen, t, still()); }
    else drawTitle(ctx, menuOf(screen), chosen, t, still(), screen === 'settings' ? 'Settings' : null);
    requestAnimationFrame(frame); return;
  }
  // § stairs: until the fade's middle the old room is shown, then the new one at once (D-135)
  if (travel && t >= travel.mid && travel.from) { travel.from = null; shown.x = state.hero.x; shown.y = state.hero.y; foeShown = new Map(); }
  if (travel && t >= travel.end) travel = null;
  const s = travel?.from || state;
  shown.x = approach(shown.x, s.hero.x);
  shown.y = approach(shown.y, s.hero.y);
  for (const e of s.enemies) { const p = foeAt(e); p.x = approach(p.x, e.x); p.y = approach(p.y, e.y); }
  if (settled() && screen === 'play') { // paused, no turn is taken
    rememberHere();
    if (queued) { const d = queued; queued = null; tryStep(d); }
    else {
      const p = input.held();
      if (p && !dev.armed() && tapsWalk(settings.controls) && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; stepToward(...p, true); }
    }
  }
  let nx = 0, ny = 0;
  if (nudge && t < nudge.until && !still()) { nx = nudge.dx; ny = nudge.dy; }
  if (s.room !== drawnRoom) {
    drawnRoom = s.room;
    base.width = drawnRoom.cols * TILE; base.height = drawnRoom.rows * TILE;
    drawRoom(base.getContext('2d'), drawnRoom);
  }
  // § camera: centred on the sliding hero, a bump's nudge left out (D-195)
  const sx = Math.round(shown.x * TILE), sy = Math.round(shown.y * TILE);
  cam = cameraAt(sx, sy, s.room, W, H);
  ctx.drawImage(base, cam.x, cam.y, W, H, 0, 0, W, H);
  inRoom(() => {
    drawBrackets(ctx, s.room, s.lights);
    drawItems(ctx, s.items, t, still());
    drawHero(ctx, sx + nx, sy + ny, !!bitten && t < bitten.until);
    // § enemies: shaded by the light like the floor, so seen in memory's dim light too (D-153)
    drawEnemies(ctx, s.enemies, t, still(), hit && t < hit.until ? hit.enemy : null, foeAt);
  });
  const lightOn = !dev.lightOff();
  // § light: the lantern's flame is the light's centre, oil sets its reach (D-053 to D-056, D-064).
  // Switched off, the lantern gives no light: only torchlight and remembered tiles show (D-082, D-101).
  const lx = sx + nx + LANTERN_AT.x, ly = sy + ny - 2 + LANTERN_AT.y;
  if (lightOn) {
    const r = s.lit ? reach(s.oil) * (still() ? 1 : flicker(t, 1.7, 0.035)) : 0;
    lights[0] = { ...LANTERN, x: lx, y: ly, r };
    lights.length = 1;
    lights.push(...torchLights(s.room, s.lights, t, still(), torchGlow), ...glowsIn(s.room, dev.revealed() ? null : s.seen));
    drawLight(ctx, s.room, lights, dev.revealed() ? null : s.seen, cam);
  }
  inRoom(() => {
    drawFlames(ctx, s.room, s.lights, t, still());
    if (s.lit) { ctx.fillStyle = '#fff5d6'; ctx.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
  });
  // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
  // A bite shakes it the same way (D-118).
  if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil)) && !still()) {
    const jx = Math.floor(t / 30) % 2 ? 1 : -1;
    ctx.drawImage(canvas, 0, 0, W, H, jx, 0, W, H);
    ctx.fillStyle = '#0e0c16'; ctx.fillRect(jx > 0 ? 0 : W - 1, 0, 1, H);
  }
  if (travel) { // the room dims to the deepest dark and back; the hearts and oil stay
    ctx.globalAlpha = Math.max(0, 1 - Math.abs(t - travel.mid) / FADE_MS);
    ctx.fillStyle = '#0e0c16'; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }
  const heroOnScreen = { x: sx - cam.x, y: sy - cam.y, w: TILE, h: TILE }; // a box over the hero turns faint (D-198)
  drawOilBar(ctx, s.oil, heroOnScreen);
  drawHearts(ctx, s.health, HERO_HEALTH, heroOnScreen);
  drawDepth(ctx, depthOf(s.place), heroOnScreen);
  const line = shownLine(state);
  textLine.draw(ctx, line, t, still());
  if (line !== spokenLine) { spokenLine = line; if (line) spoken.textContent = line.text; }
  lanternButton.show(state.lit);
  if (screen === 'paused') drawPause(ctx, PAUSE_MENU, chosen, t, still());
  else if (screen === 'settings') drawPause(ctx, menuOf(screen), chosen, t, still(), 'Settings');
  else if (screen === 'seed') drawSeedPad(ctx, entry, chosen, t, still());
  else if (screen === 'howto') drawHowTo(ctx, page, settings.controls, chosen, t, still());
  else dev.draw(ctx, state, cam);
  requestAnimationFrame(frame);
}
// Draws in room pixels, moved by the camera and kept off the text strip below the room
function inRoom(draw) {
  ctx.save();
  ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
  ctx.translate(-cam.x, -cam.y);
  draw();
  ctx.restore();
}
requestAnimationFrame(frame);
