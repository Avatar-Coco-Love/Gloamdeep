// § screens: the game opens on the title screen (D-177); in play, the pause button,
// Esc or P open the pause menu over the room (D-187). Settings opens from either,
// and Back, Esc or P return there (D-189). On a menu, arrows and swipes
// move the flame; Enter, Space or a tap on a line picks it. The Seed line opens
// the seed pad; Esc or P leave it with nothing changed (D-191). How to play opens
// from either menu on the way of playing last used, and returns there the same way (D-193).
// In play, the map button or M opens the map; the button (a cross while it is open), M, Esc,
// P or a tap outside its box closes it. Drags, pinches, the wheel and arrows move it (D-205).
// Its heading's arrows, < and >, Page Up and Page Down, or a tap on stairs found turn it a floor (D-206).
// Seed Explorer on the title opens the same map for any seed, all revealed, with no
// hero (D-214); the cross, Esc, P, M or a tap outside the box return to the title.
// In play, the bag button or I opens the bag over the room's foot; Left and Right or a tap
// pick a slot, Enter, Space or Pour pours the chosen flask, which closes it and takes the
// turn; the button (a cross while it is open), I, Esc, P or a tap outside it closes it (D-247).
// Continue goes back to the saved journey; New journey, while one is saved, asks
// "Start over?" first, and No, Esc or P return to the title (D-238).
// Split from main.js (D-235): `app` holds what the screens share with play and drawing.
import { depthOf, areaAt } from '../core/room.js';
import { lineAt, pauseTop } from '../render/menu.js';
import { titleTop } from '../render/title.js';
import { keyAt } from '../render/seedpad.js';
import { howtoAt } from '../render/howto.js';
import { nextPage, howtoWords, HOWTO_LINES } from '../core/howto.js';
import { PAD, typeKey, entrySeed, moveKey } from '../core/seedpad.js';
import { titleMenu, PAUSE_MENU, SURE_MENU, SURE_NOTE, SURE_HEADING, settingsMenu, moveChoice } from '../core/menu.js';
import { saveSettings, nextControl, controlsText, nextMotion, motionText, seedText, lanternText, nextLantern } from '../core/settings.js';
import { recordText } from '../core/record.js';
import { floorPlan, wholeSurface, roomsFound, fitView, panView, zoomView, floorsShown, turnFrom, stairsNear, stairsIn, centreView } from '../core/map.js';
import { setMap, inBox, turnAt, barAt, VIEW, EXPLORE_VIEW } from '../render/map.js';
import { startSeeds, shownSeed, addSeed, backSeed, explorerWorld } from '../core/explorer.js';
import { BAG_SLOTS } from '../core/bag.js';
import { get } from '../core/registry.js';
import { bagAt, panelOnTop } from '../render/bag.js';
import { TILE } from '../render/screen.js';

const WORDS = {
  title: 'Gloamdeep. New journey, How to play, Settings or Seed Explorer: press Enter, or tap one.',
  saved: 'Gloamdeep. Continue, New journey, How to play, Settings or Seed Explorer: press Enter, or tap one.',
  sure: `${SURE_HEADING} ${SURE_NOTE} Yes or No.`,
  paused: 'Paused. Resume, Settings, How to play, or Back to title.',
  play: '',
};
const SEED_WORDS = 'Seed. Type up to 5 digits, then OK. Random gives a new world each journey. Esc leaves it unchanged.';
const EXPLORE_PAD_WORDS = 'Seed. Type up to 5 digits, then OK to see that seed. Random shows a random one. Esc leaves it unchanged.';
const PAN = 8; // game pixels an arrow key scrolls the map
const STAIRS_REACH = 8; // game pixels from found stairs' centre that a tap still picks them

// `ui`: the spoken line, the buttons, and the dev tools, input and map moves, asked for
// when used (they are made after the screens); `newJourney`, `randomSeed` and `pour(slot)` from main.js.
export function createScreens(app, ui) {
  const { spoken, lanternButton, pauseButton, mapButton, bagButton, reduceMotion } = ui;
  const menuOf = (sc) => (sc === 'title' ? titleMenu(app.saved) : sc === 'paused' ? PAUSE_MENU : sc === 'sure' ? SURE_MENU
    : settingsMenu(app.settings, reduceMotion.matches, app.pageFrom === 'paused' ? app.journeySeed : null));
  const exploring = () => app.screen === 'explore' || (app.screen === 'seed' && app.padFrom === 'explore');
  const onTitle = () => app.screen === 'title' || app.screen === 'sure' || exploring() || (!['play', 'paused', 'map', 'bag'].includes(app.screen) && app.pageFrom === 'title');
  const menuTop = () => (onTitle() ? titleTop(menuOf(app.screen).length) : pauseTop(menuOf(app.screen).length, app.screen === 'settings'));
  const settingsWords = () => `Settings. ${menuOf('settings').slice(0, -1).map((l) => l.text).join('. ')}. Pick one to change it. Back.`;
  function show(next, at = 0) {
    if ((next === 'settings' && app.screen !== 'seed') || next === 'howto') app.pageFrom = app.screen;
    app.screen = next; app.chosen = at;
    const playing = next === 'play';
    lanternButton.hide(!playing); pauseButton.hide(!playing); ui.dev().hide(!playing);
    const mapOpen = next === 'map' || next === 'explore';
    mapButton.hide(!playing && !mapOpen); mapButton.closes(mapOpen);
    bagButton.hide(!playing && next !== 'bag'); bagButton.closes(next === 'bag');
    app.spokenLine = null;
    spoken.textContent = next === 'settings' ? settingsWords() : next === 'seed' ? (app.padFrom === 'explore' ? EXPLORE_PAD_WORDS : SEED_WORDS)
      : next === 'howto' ? howtoWords(app.page, app.settings.controls) : next === 'bag' ? bagWords()
      : next === 'title' ? [WORDS[app.saved ? 'saved' : 'title'], app.deepest && `${recordText(app.deepest)}.`].filter(Boolean).join(' ') : WORDS[next];
  }
  const backTo = (id) => () => show(app.pageFrom, menuOf(app.pageFrom).findIndex((l) => l.id === id));
  const closeSettings = backTo('settings'), closeHowTo = backTo('howto');
  function openHowTo() { app.page = ui.input().kind(); show('howto'); }
  function flipPage(back = false) { app.page = nextPage(app.page, back); spoken.textContent = howtoWords(app.page, app.settings.controls); }

  // § map: the floor the hero is on, worked out once as it opens; no turn passes
  // (D-205). It turns to other floors seen; the hero stays put (D-206).
  const win = () => (app.screen === 'explore' ? EXPLORE_VIEW : VIEW); // the map's window, shorter in the Explorer
  const world = () => (app.screen === 'explore' ? explorerWorld(shownSeed(app.seeds)) : app.state); // the world the map shows
  const panMap = (dx, dy) => { app.view = panView(app.view, app.plan, win().w, win().h, dx, dy); };
  const zoomMap = (by, x, y) => { app.view = zoomView(app.view, app.plan, win().w, win().h, by, x - win().x, y - win().y); };
  const turns = () => ({ up: turnFrom(app.floors, app.plan.depth, 'up') !== null, down: turnFrom(app.floors, app.plan.depth, 'down') !== null });
  // The map on floor `depth`, its view from at(plan), and its words for the screen reader
  function mapFloor(depth, at = (p) => fitView(p, win().w, win().h)) {
    const explore = app.screen === 'explore';
    const plan = explore && depth === 0 ? wholeSurface(world()) : floorPlan(world(), explore || ui.dev().revealedMap(), depth);
    app.plan = plan;
    setMap(plan);
    app.view = at(plan);
    const n = roomsFound(plan), own = plan.hero || explore ? '' : ' The hero is on another floor.';
    const area = areaAt(plan.depth), where = `${plan.depth === 0 ? 'the surface' : `depth ${plan.depth}, ${area.area.toLowerCase()}`}. ${n} ${n === 1 ? 'room' : 'rooms'}`;
    spoken.textContent = explore
      ? `Seed Explorer, seed ${shownSeed(app.seeds)}. Map of ${where}. Drag or use the arrows to scroll, pinch or the wheel to zoom. Page Up and Page Down turn a floor. R reseeds, T types a seed, B goes back to the last seed. Esc or the close button returns to the title.`
      : `Map of ${where} found.${own} Drag or use the arrows to scroll, pinch or the wheel to zoom. Page Up and Page Down turn a floor. M or the close button closes it.`;
  }
  function toggleMap() {
    if (app.screen === 'map') { show('play'); return; }
    if (app.screen === 'explore') { closeExplorer(); return; }
    if (app.screen !== 'play') return;
    app.queued = null;
    app.floors = floorsShown(app.state, ui.dev().revealedMap());
    show('map');
    mapFloor(depthOf(app.state.place));
  }
  function turnMap(way) {
    const to = (app.screen === 'map' || app.screen === 'explore') && turnFrom(app.floors, app.plan.depth, way);
    if (to) mapFloor(to);
  }
  // A tap on found stairs turns the map to the floor they lead to, centred on the matching stairs
  function tapStairs(px, py) {
    const k = app.view.k, near = stairsNear(app.plan, (px - win().x + app.view.x) / k, (py - win().y + app.view.y) / k, STAIRS_REACH / k, world().seed);
    if (!near || !app.floors.includes(near.depth)) return;
    mapFloor(near.depth, (p) => {
      const at = stairsIn(p, near.room, near.arrive);
      return at ? centreView(p, win().w, win().h, k, at.x, at.y) : fitView(p, win().w, win().h);
    });
  }

  // § bag (D-247): opens on the first slot; no turn passes until a flask is poured
  const slotWords = (i) => { const s = app.state.bag[i]; return s ? `${get(s.id).name}, ${s.n}` : 'Empty'; };
  const bagWords = () => `Bag. ${app.state.bag.length ? app.state.bag.map((s, i) => slotWords(i)).join('. ') : 'Empty'}. Left and Right choose, Enter pours, I or Esc closes.`;
  function toggleBag() {
    if (app.screen === 'bag') show('play');
    else if (app.screen === 'play') { app.queued = null; app.bagOnTop = panelOnTop(app.state.hero.y * TILE - app.cam.y); show('bag'); }
  }
  function pickSlot(i) { app.chosen = i; spoken.textContent = slotWords(i); }
  function pourChosen() {
    const s = app.state.bag[app.chosen];
    if (!s || !get(s.id).oil) return;
    show('play');
    ui.pour(app.chosen);
  }

  // § explorer (D-214): opens on the Settings seed, else a random one, on the surface;
  // Reseed, a typed seed and Back keep the floor shown, fitted whole. Settings never changes.
  function openExplorer() {
    app.seeds = startSeeds(app.settings.seed || ui.randomSeed());
    app.floors = floorsShown(null, true);
    show('explore');
    mapFloor(0);
  }
  const titleAt = (id) => show('title', menuOf('title').findIndex((l) => l.id === id));
  const closeExplorer = () => titleAt('explore');
  function showSeeds(next) {
    if (next === app.seeds) return;
    app.seeds = next;
    mapFloor(app.plan.depth);
  }
  function pressBar(id) {
    if (id === 'back') showSeeds(backSeed(app.seeds));
    else if (id === 'reseed') showSeeds(addSeed(app.seeds, ui.randomSeed()));
    else if (id === 'type') openPad('explore');
  }
  function pause() {
    if (app.screen === 'map' || app.screen === 'bag') show('play');
    else if (app.screen === 'explore') closeExplorer();
    else if (app.screen === 'play') { app.queued = null; show('paused'); } // a step waiting in line is dropped
    else if (app.screen === 'paused') show('play'); // Esc or P again resumes
    else if (app.screen === 'settings') closeSettings();
    else if (app.screen === 'seed') closePad();
    else if (app.screen === 'howto') closeHowTo();
    else if (app.screen === 'sure') titleAt('new');
  }
  function change(key, next, words) {
    app.settings = { ...app.settings, [key]: next };
    saveSettings(app.settings);
    spoken.textContent = words;
  }
  const changeControls = (back = false) => { const c = nextControl(app.settings.controls, back); change('controls', c, controlsText(c)); };
  const changeMotion = () => { const m = nextMotion(app.settings.motion, reduceMotion.matches); change('motion', m, motionText(m, reduceMotion.matches)); };
  const changeLantern = () => { const l = nextLantern(app.settings.lantern); change('lantern', l, lanternText(l)); };

  // § seed pad (D-191): OK keeps the typed seed, or Random when none is typed; Random
  // keeps Random. Either starts the next New journey; this one goes on as it is.
  // From the Explorer it starts empty; OK shows the seed typed, or keeps the one shown
  // when none is typed, and Random shows a random one (D-214).
  function openPad(from = 'settings') {
    app.padFrom = from;
    app.entry = from === 'settings' && app.settings.seed ? String(app.settings.seed) : '';
    show('seed');
  }
  function closePad() {
    if (app.padFrom === 'explore') { show('explore'); mapFloor(app.plan.depth, () => app.view); }
    else show('settings', menuOf('settings').findIndex((l) => l.id === 'seed'));
  }
  function pressKey(id) {
    if (app.padFrom === 'explore' && (id === 'ok' || id === 'random')) {
      const seed = id === 'ok' ? entrySeed(app.entry) : ui.randomSeed();
      closePad();
      if (seed) showSeeds(addSeed(app.seeds, seed));
    } else if (id === 'ok' || id === 'random') {
      const seed = id === 'ok' ? entrySeed(app.entry) : null;
      app.settings = { ...app.settings, seed };
      saveSettings(app.settings);
      closePad();
      spoken.textContent = seedText(seed);
    } else { app.entry = typeKey(app.entry, id); spoken.textContent = app.entry || 'nothing typed'; }
  }
  // Digits and Backspace type on the seed pad from a keyboard; the flame moves to OK, so Enter keeps it
  // In the Explorer, R reseeds, T types a seed and B goes back (D-214)
  const onType = (key) => {
    if (app.screen === 'explore') {
      const id = { r: 'reseed', t: 'type', b: 'back' }[key];
      if (id) pressBar(id);
      return !!id;
    }
    if (app.screen !== 'seed') return false;
    pressKey(key === 'backspace' ? 'del' : key);
    app.chosen = PAD.findIndex((k) => k.id === 'ok');
    return true;
  };

  // § choosing: a menu line picked; New journey starts in a new world (D-187), asking first
  // while one is saved; Continue and Back to title keep the journey (D-238)
  function choose(i = app.chosen) {
    const id = menuOf(app.screen)[i]?.id;
    if (app.screen === 'seed') { pressKey(PAD[i].id); return; }
    if (app.screen === 'bag') { pourChosen(); return; }
    if (app.screen === 'howto') { if (HOWTO_LINES[i] === 'page') flipPage(); else closeHowTo(); return; }
    if (id === 'new' && app.saved) show('sure', SURE_MENU.findIndex((l) => l.id === 'no'));
    else if (id === 'new' || id === 'yes') { ui.newJourney(); show('play'); }
    else if (id === 'no') titleAt('new');
    else if (id === 'resume' || id === 'continue') show('play');
    else if (id === 'title') show('title');
    else if (id === 'settings') show('settings');
    else if (id === 'howto') openHowTo();
    else if (id === 'explore') openExplorer();
    else if (id === 'controls') changeControls();
    else if (id === 'motion') changeMotion();
    else if (id === 'seed') openPad();
    else if (id === 'lantern') changeLantern();
    else if (id === 'back') closeSettings();
  }
  // Arrows and swipes off the room: menus take swipes always (D-189)
  const onDir = (dir, how) => {
    if (app.screen === 'map' || app.screen === 'explore') { if (how !== 'swipe') panMap(...{ up: [0, -PAN], down: [0, PAN], left: [-PAN, 0], right: [PAN, 0] }[dir]); return; }
    if (app.screen === 'seed') { app.chosen = moveKey(app.chosen, dir); return; }
    if (app.screen === 'bag') { if (dir === 'left' || dir === 'right') pickSlot(Math.min(BAG_SLOTS - 1, Math.max(0, app.chosen + (dir === 'left' ? -1 : 1)))); return; }
    if (app.screen === 'howto') { if (dir === 'left' || dir === 'right') flipPage(dir === 'left'); else app.chosen = moveChoice(app.chosen, dir, HOWTO_LINES.length); return; }
    const id = menuOf(app.screen)[app.chosen]?.id;
    if (id === 'controls' && (dir === 'left' || dir === 'right')) changeControls(dir === 'left');
    else if (id === 'motion' && (dir === 'left' || dir === 'right')) changeMotion();
    else if (id === 'lantern' && (dir === 'left' || dir === 'right')) changeLantern();
    else app.chosen = moveChoice(app.chosen, dir, menuOf(app.screen).length);
  };
  // A tap or click off the room
  const onPoint = (px, py, held) => {
    if (app.screen === 'map' || app.screen === 'explore') {
      if (held || ui.mapMoves().dragged()) return;
      const way = turnAt(px, py), button = app.screen === 'explore' && barAt(px, py);
      if (way) turnMap(way);
      else if (button) pressBar(button);
      else if (!inBox(px, py)) pause(); // closes the map, or the Explorer to the title
      else if (app.screen === 'map' || py < win().y + win().h) tapStairs(px, py); // not through the Explorer's bar
      return;
    }
    if (app.screen === 'bag') {
      if (held) return;
      const at = bagAt(px, py, app.bagOnTop);
      if (at === 'out') show('play');
      else if (at === 'pour') pourChosen();
      else if (at) pickSlot(at.slot);
      return;
    }
    if (app.screen === 'seed') { const k = keyAt(px, py); if (k >= 0) { app.chosen = k; choose(k); } return; }
    if (app.screen === 'howto') { const at = howtoAt(px, py); if (at === 'back') closeHowTo(); else if (at) { app.chosen = 0; flipPage(at === 'prev'); } return; }
    const i = lineAt(py, menuOf(app.screen).length, menuTop());
    if (i >= 0) { app.chosen = i; choose(i); }
  };
  const onMapScreen = () => app.screen === 'map' || app.screen === 'explore';

  return { show, pause, toggleMap, toggleBag, turnMap, panMap, zoomMap, onType, choose, onDir, onPoint, onMapScreen, onTitle, menuOf, turns };
}
