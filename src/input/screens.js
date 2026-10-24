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
// On oilcaps, Enter, Space or Make crafts a flask, a turn, and the bag stays open on it (D-299).
// Continue goes back to the saved journey; New journey, while one is saved, asks
// "Start over?" first, and No, Esc or P return to the title (D-238).
// Version history in Settings opens the page of every version (D-254): Up and Down choose one,
// Enter, Space, Right or a tap on its row opens or closes it (Left closes it), swipes and
// Page Up and Page Down scroll a page; Back, Esc or P return to Settings.
// Journal, on the title and the pause menu, opens its page on Records (D-270); Left and
// Right or a tap on a tab turn to Records or Growth (D-293). On Growth, Up and Down choose
// Add a heart or Back, and Enter, Space or a tap on Add a heart spends an ember on one.
// Enter or Space on Back, a tap on Back, Esc or P return to the menu it was opened from.
// The game opens on the slot screen (D-271): Up and Down or a tap pick a slot's box, which
// plays as that profile (a new one in an empty slot) and opens the title. Delete, then a box,
// asks "Delete …? Lost for good." with No picked; No, Esc or P go back. Profiles on the title
// opens the slot screen again, with Back, Esc or P returning to the title. An empty box first
// opens the name pad (D-272): letters typed, tapped or picked, Del, and OK makes the profile;
// Esc goes back to the slot screen with nothing made. Rename, then a profile's box, opens the
// pad on its name; OK keeps the new name, Esc the old (D-273). Cancel, Esc or P stop picking.
// After the name, a new profile chooses its cloak, its eyes, its lantern's trim, then its clothes;
// Look, then a box, changes them later (P3 to P6). Arrows, swipes or a tap pick one, OK goes on,
// and Back goes back a screen; Esc or P after the cloak leave a profile's old look as it was.
// Split from main.js (D-235): `app` holds what the screens share with play and drawing.
import { depthOf, areaAt } from '../core/room.js';
import { lineAt, pauseTop } from '../render/menu.js';
import { titleTop } from '../render/title.js';
import { keyAt } from '../render/seedpad.js';
import { howtoAt } from '../render/howto.js';
import { historyRows, historyAt, headRow, lastRow, ROW_H, LIST_H } from '../render/history.js';
import { HISTORY, versionWords, scrollToShow, clampScroll } from '../core/history.js';
import { nextPage, howtoWords, HOWTO_LINES } from '../core/howto.js';
import { PAD, typeKey, entrySeed, moveKey } from '../core/seedpad.js';
import { NAME_PAD, typeLetter, moveName } from '../core/namepad.js';
import { nameKeyAt } from '../render/namepad.js';
import { CLOAKS, CLOAK_PAD, CLOAK_IDS, moveCloak, cloakOf, EYES, EYES_PAD, EYE_IDS, moveEyes, eyesOf, TRIMS, TRIM_PAD, TRIM_IDS, moveTrim, trimOf, CLOTHES, CLOTHES_PAD, CLOTHES_IDS, moveClothes, clothesOf } from '../core/looks.js';
import { cloakKeyAt } from '../render/cloak.js';
import { titleMenu, PAUSE_MENU, SURE_MENU, SURE_NOTE, SURE_HEADING, DROP_NOTE, settingsMenu, moveChoice } from '../core/menu.js';
import { saveSettings, nextControl, controlsText, nextMotion, motionText, seedText, lanternText, nextLantern, flasksText, nextFlasks, soundText, nextSound } from '../core/settings.js';
import { floorPlan, wholeSurface, roomsFound, fitView, panView, zoomView, floorsShown, turnFrom, stairsNear, stairsIn, centreView } from '../core/map.js';
import { setMap, inBox, turnAt, barAt, VIEW, EXPLORE_VIEW } from '../render/map.js';
import { startSeeds, shownSeed, addSeed, backSeed, explorerWorld } from '../core/explorer.js';
import { BAG_SLOTS } from '../core/bag.js';
import { get } from '../core/registry.js';
import { playing as inPlay, SLOTS, slotName, playedText } from '../core/profile.js';
import { slotLines, slotsAt, slotsHeading, askTop } from '../render/slots.js';
import { journalWords, growthWords } from '../core/journal.js';
import { addHeart } from '../core/growth.js';
import { journalAt } from '../render/journal.js';
import { bagAt, panelOnTop } from '../render/bag.js';
import { TILE } from '../render/screen.js';

const WORDS = {
  title: 'Gloamdeep. New journey, Journal, How to play, Settings, Profiles or Seed Explorer: press Enter, or tap one.',
  saved: 'Gloamdeep. Continue, New journey, Journal, How to play, Settings, Profiles or Seed Explorer: press Enter, or tap one.',
  sure: `${SURE_HEADING} ${SURE_NOTE} Yes or No.`,
  paused: 'Paused. Resume, Journal, Settings, How to play, or Back to title.',
  play: '',
};
const HISTORY_WORDS = `Version history, ${HISTORY.length} versions, newest first. Up and Down choose one, Enter opens or closes it. Back.`;
const SEED_WORDS = 'Seed. Type up to 5 digits, then OK. Random gives a new world each journey. Esc leaves it unchanged.';
const EXPLORE_PAD_WORDS = 'Seed. Type up to 5 digits, then OK to see that seed. Random shows a random one. Esc leaves it unchanged.';
const PAN = 8; // game pixels an arrow key scrolls the map
const STAIRS_REACH = 8; // game pixels from found stairs' centre that a tap still picks them

// `ui`: the spoken line, the buttons, and the dev tools, input and map moves, asked for
// when used (they are made after the screens); `newJourney`, `randomSeed`, `pour(slot)`, `craft(slot)` and `lookAt(slot)` from main.js.
export function createScreens(app, ui) {
  const { spoken, lanternButton, pauseButton, mapButton, bagButton, reduceMotion } = ui;
  const menuOf = (sc) => (sc === 'title' ? titleMenu(app.saved) : sc === 'paused' ? PAUSE_MENU : sc === 'sure' || sc === 'drop' ? SURE_MENU
    : settingsMenu(app.settings, reduceMotion.matches, app.pageFrom === 'paused' ? app.journeySeed : null));
  const exploring = () => app.screen === 'explore' || (app.screen === 'seed' && app.padFrom === 'explore');
  const onTitle = () => ['slots', 'name', 'cloak', 'eyes', 'trim', 'clothes', 'drop', 'title', 'sure'].includes(app.screen) || exploring() || (!['play', 'paused', 'map', 'bag'].includes(app.screen) && app.pageFrom === 'title');
  const menuTop = () => (app.screen === 'drop' ? askTop : onTitle() ? titleTop(menuOf(app.screen).length) : pauseTop(menuOf(app.screen).length, app.screen === 'settings'));
  const settingsWords = () => `Settings. ${menuOf('settings').slice(0, -2).map((l) => l.text).join('. ')}. Pick one to change it. Version history. Back.`;
  function show(next, at = 0) {
    if ((next === 'settings' && app.screen !== 'seed' && app.screen !== 'history') || next === 'howto' || next === 'journal') app.pageFrom = app.screen;
    app.screen = next; app.chosen = at;
    const playing = next === 'play';
    lanternButton.hide(!playing); pauseButton.hide(!playing); ui.dev().hide(!playing);
    const mapOpen = next === 'map' || next === 'explore';
    mapButton.hide(!playing && !mapOpen); mapButton.closes(mapOpen);
    bagButton.hide(!playing && next !== 'bag'); bagButton.closes(next === 'bag');
    app.spokenLine = null;
    spoken.textContent = next === 'settings' ? settingsWords() : next === 'seed' ? (app.padFrom === 'explore' ? EXPLORE_PAD_WORDS : SEED_WORDS)
      : next === 'howto' ? howtoWords(app.page, app.settings.controls) : next === 'bag' ? bagWords() : next === 'history' ? HISTORY_WORDS
      : next === 'journal' ? journalPageWords() : next === 'slots' ? slotsWords() : next === 'name' ? nameWords() : next === 'cloak' ? cloakWords() : next === 'eyes' ? eyesWords() : next === 'trim' ? trimWords() : next === 'clothes' ? clothesWords()
      : next === 'drop' ? `Delete ${slotName(app.profiles.slots[app.dropping], app.dropping)}? ${DROP_NOTE} Yes or No.`
      : next === 'title' ? WORDS[app.saved ? 'saved' : 'title'] : WORDS[next];
  }
  const backTo = (id) => () => show(app.pageFrom, menuOf(app.pageFrom).findIndex((l) => l.id === id));
  const closeSettings = backTo('settings'), closeHowTo = backTo('howto'), closeJournal = backTo('journal');
  // § journal: its tabs (D-270, D-293). It opens on Records; Growth opens on Back.
  const journalPageWords = () => (app.tab === 'growth' ? growthWords(app.state) : journalWords(inPlay(app.profiles).records, inPlay(app.profiles).played));
  function openJournal() { app.tab = 'records'; show('journal'); }
  function turnTab(id) {
    if (id === app.tab) return;
    app.tab = id; app.chosen = 1;
    spoken.textContent = journalPageWords();
  }
  function buyHeart() {
    const s = addHeart(app.state);
    if (s === app.state) return;
    app.state = s;
    spoken.textContent = journalPageWords();
  }
  function openHowTo() { app.page = ui.input().kind(); show('howto'); }
  function flipPage(back = false) { app.page = nextPage(app.page, back); spoken.textContent = howtoWords(app.page, app.settings.controls); }

  // § version history (D-254): opens with every version closed, on the newest
  function openHistory() { app.opened = new Set(); app.rows = historyRows(app.opened); app.scroll = 0; show('history'); }
  const closeHistory = () => show('settings', menuOf('settings').findIndex((l) => l.id === 'history'));
  const shownRows = () => clampScroll(app.scroll, app.rows.length * ROW_H, LIST_H);
  // Choose version i (or Back), its row scrolled into view
  function pickVersion(i) {
    app.chosen = i;
    const e = HISTORY[i];
    if (!e) { spoken.textContent = 'Back'; return; }
    const r = headRow(app.rows, i);
    app.scroll = scrollToShow(app.scroll, r, r, ROW_H, LIST_H, app.rows.length);
    spoken.textContent = versionWords(e, app.opened.has(e.v));
  }
  // Open or close version i; an opened one shows as much of itself as fits
  function openVersion(i, open = !app.opened.has(HISTORY[i]?.v)) {
    const e = HISTORY[i];
    if (!e || open === app.opened.has(e.v)) return;
    if (open) app.opened.add(e.v); else app.opened.delete(e.v);
    app.rows = historyRows(app.opened);
    app.scroll = shownRows();
    pickVersion(i);
    if (open) app.scroll = scrollToShow(app.scroll, headRow(app.rows, i), lastRow(app.rows, i), ROW_H, LIST_H, app.rows.length);
  }
  // Scroll a page down (by > 0) or up; the flame moves to the top version shown if it scrolled away
  function pageHistory(by) {
    app.scroll = clampScroll(app.scroll + by * (LIST_H - ROW_H), app.rows.length * ROW_H, LIST_H);
    const top = Math.floor(app.scroll / ROW_H), bottom = Math.floor((app.scroll + LIST_H) / ROW_H) - 1;
    const shown = (r) => r >= top && r <= bottom;
    if (app.chosen < HISTORY.length && !app.rows.some((row, r) => row.i === app.chosen && shown(r))) {
      app.chosen = app.rows[top].i;
      spoken.textContent = versionWords(HISTORY[app.chosen], app.opened.has(HISTORY[app.chosen].v));
    }
  }

  // § slots (D-271): the flame starts on the profile in use; Back only once there is a title to go back to
  const linesNow = () => slotLines(app.picking, app.slotsBack && app.profiles.current !== null);
  const profileWords = (p, i) => (p ? `${slotName(p, i)}, deepest ${p.records.deepest}, played ${playedText(p.played)}` : 'Empty');
  const slotsWords = () => `${app.picking ? slotsHeading(app.picking) : 'Profiles. Pick one to play.'} ${app.profiles.slots.map(profileWords).join('. ')}. ${linesNow().map((l) => l.text).join('. ')}.`;
  function openSlots(back) { app.picking = null; app.slotsBack = back; show('slots', app.profiles.current ?? 0); }
  function chooseSlot(i) {
    if (i < SLOTS) {
      const p = app.profiles.slots[i];
      if (!app.picking && !p) openName(i, false);
      else if (!app.picking) { ui.useSlot(i); show('title'); }
      else if (!p) return; // an Empty box can't be renamed or deleted
      else if (app.picking === 'rename') openName(i, true);
      else if (app.picking === 'look') openCloak(i, false);
      else { app.dropping = i; show('drop', SURE_MENU.findIndex((l) => l.id === 'no')); }
      return;
    }
    const id = linesNow()[i - SLOTS]?.id;
    if (id === 'rename' || id === 'look' || id === 'delete') { app.picking = app.picking === id ? null : id; spoken.textContent = slotsWords(); }
    else if (id === 'back') titleAt('profiles');
  }
  // § name pad (D-272): OK makes the profile with the letters typed (none keeps it unnamed,
  // Claude's call) and opens the title; Back or Esc goes back to the slot screen with nothing made.
  // Renaming (D-273) opens on the name kept; OK keeps the new one (none: unnamed again) and
  // goes back to the slot screen; Back or Esc leaves the old name (D-288).
  const nameWords = () => (app.renaming ? `Rename profile. ${app.entry || 'nothing typed'}. Type up to 12 letters, then OK.` : 'Name your profile. Type up to 12 letters, then OK.');
  function openName(i, renaming) { app.naming = i; app.renaming = renaming; app.entry = renaming ? app.profiles.slots[i].name : ''; show('name'); }
  function closeName() { app.picking = null; show('slots', app.naming); }
  function pressName(id) {
    if (id === 'back') closeName();
    else if (id === 'ok' && app.renaming) { ui.renameSlot(app.naming, app.entry); closeName(); }
    else if (id === 'ok') openCloak(app.naming, true);
    else { app.entry = typeLetter(app.entry, id); spoken.textContent = app.entry || 'nothing typed'; }
  }
  // § cloak (P3): a new profile's comes after its name; Back returns to the name pad with the
  // name kept. Look opens on the profile's own look, and Back leaves it as it was. OK goes on
  // to the eyes (P4).
  const cloakWords = () => `Choose a cloak. ${CLOAKS[app.cloak].name} picked. ${CLOAK_IDS.map((id) => CLOAKS[id].name).join(', ')}. Arrows choose, then OK.`;
  function openCloak(i, fresh) {
    app.naming = i; app.cloakNew = fresh;
    app.cloak = fresh ? CLOAK_IDS[0] : cloakOf(app.profiles.slots[i]);
    app.eyes = fresh ? EYE_IDS[0] : eyesOf(app.profiles.slots[i]);
    app.trim = fresh ? TRIM_IDS[0] : trimOf(app.profiles.slots[i]);
    app.clothes = fresh ? CLOTHES_IDS[0] : clothesOf(app.profiles.slots[i]);
    show('cloak', CLOAK_IDS.indexOf(app.cloak));
  }
  function closeCloak() {
    if (app.cloakNew) show('name', NAME_PAD.findIndex((k) => k.id === 'ok'));
    else { app.picking = null; show('slots', app.naming); }
  }
  // The flame moves to key i; on a hero, that cloak is picked
  function moveToCloak(i) {
    app.chosen = i;
    const id = CLOAK_PAD[i].id;
    if (CLOAKS[id]) { app.cloak = id; spoken.textContent = `${CLOAKS[id].name} cloak`; } else spoken.textContent = id === 'ok' ? 'OK' : 'Back';
  }
  function pressCloak(i, tapped = false) {
    const id = CLOAK_PAD[i].id;
    if (CLOAKS[id]) { moveToCloak(i); if (!tapped) moveToCloak(CLOAK_PAD.findIndex((k) => k.id === 'ok')); } // Enter on a hero goes on to OK
    else if (id === 'back') closeCloak();
    else show('eyes', EYE_IDS.indexOf(app.eyes));
  }
  // § eyes (P4): after the cloak, the same shape. OK goes on to the trim (P5); Back returns to
  // the cloak with the choices kept.
  const eyesWords = () => `Choose your eyes. ${EYES[app.eyes].name} picked. ${EYE_IDS.map((id) => EYES[id].name).join(', ')}. Arrows choose, then OK.`;
  const backToCloak = () => show('cloak', CLOAK_PAD.findIndex((k) => k.id === 'ok'));
  function moveToEyes(i) {
    app.chosen = i;
    const id = EYES_PAD[i].id;
    if (EYES[id]) { app.eyes = id; spoken.textContent = `${EYES[id].name} eyes`; } else spoken.textContent = id === 'ok' ? 'OK' : 'Back';
  }
  function pressEyes(i, tapped = false) {
    const id = EYES_PAD[i].id;
    if (EYES[id]) { moveToEyes(i); if (!tapped) moveToEyes(EYES_PAD.findIndex((k) => k.id === 'ok')); }
    else if (id === 'back') backToCloak();
    else show('trim', TRIM_IDS.indexOf(app.trim));
  }
  // Esc or P: a new profile goes back to its cloak; a profile's Look ends with nothing changed
  const escEyes = () => (app.cloakNew ? backToCloak() : closeCloak());
  // § trim (P5): after the eyes, the same shape. OK goes on to the clothes (P6); Back returns to
  // the eyes with the choices kept.
  const trimWords = () => `Choose a trim. ${TRIMS[app.trim].name} picked. ${TRIM_IDS.map((id) => TRIMS[id].name).join(', ')}. Arrows choose, then OK.`;
  const backToEyes = () => show('eyes', EYES_PAD.findIndex((k) => k.id === 'ok'));
  function moveToTrim(i) {
    app.chosen = i;
    const id = TRIM_PAD[i].id;
    if (TRIMS[id]) { app.trim = id; spoken.textContent = `${TRIMS[id].name} trim`; } else spoken.textContent = id === 'ok' ? 'OK' : 'Back';
  }
  function pressTrim(i, tapped = false) {
    const id = TRIM_PAD[i].id;
    if (TRIMS[id]) { moveToTrim(i); if (!tapped) moveToTrim(TRIM_PAD.findIndex((k) => k.id === 'ok')); }
    else if (id === 'back') backToEyes();
    else show('clothes', CLOTHES_IDS.indexOf(app.clothes));
  }
  // Esc or P: a new profile goes back to its eyes; a profile's Look ends with nothing changed
  const escTrim = () => (app.cloakNew ? backToEyes() : closeCloak());
  // § clothes (P6): after the trim, four heroes two to a row. OK makes a new profile and opens the
  // title, or keeps a profile's new look; Back returns to the trim with the choices kept.
  const clothesWords = () => `Choose your clothes. ${CLOTHES[app.clothes].name} picked. ${CLOTHES_IDS.map((id) => CLOTHES[id].name).join(', ')}. Arrows choose, then OK.`;
  const backToTrim = () => show('trim', TRIM_PAD.findIndex((k) => k.id === 'ok'));
  function moveToClothes(i) {
    app.chosen = i;
    const id = CLOTHES_PAD[i].id;
    if (CLOTHES[id]) { app.clothes = id; spoken.textContent = CLOTHES[id].name; } else spoken.textContent = id === 'ok' ? 'OK' : 'Back';
  }
  function pressClothes(i, tapped = false) {
    const id = CLOTHES_PAD[i].id, look = { cloak: app.cloak, eyes: app.eyes, trim: app.trim, clothes: app.clothes };
    if (CLOTHES[id]) { moveToClothes(i); if (!tapped) moveToClothes(CLOTHES_PAD.findIndex((k) => k.id === 'ok')); }
    else if (id === 'back') backToTrim();
    else if (app.cloakNew) { ui.useSlot(app.naming, app.entry, look); show('title'); }
    else { ui.lookSlot(app.naming, look); closeCloak(); }
  }
  // Esc or P: a new profile goes back to its trim; a profile's Look ends with nothing changed
  const escClothes = () => (app.cloakNew ? backToTrim() : closeCloak());
  // After the question: back to the slot screen, the flame on the slot asked about
  function closeDrop(yes) {
    if (yes) ui.dropSlot(app.dropping);
    app.picking = null;
    show('slots', app.dropping);
  }

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
    if (app.screen === 'history') { pageHistory(way === 'up' ? -1 : 1); return; }
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
  const bagWords = () => `Bag. ${app.state.bag.length ? app.state.bag.map((s, i) => slotWords(i)).join('. ') : 'Empty'}. Left and Right choose, Enter pours or makes, I or Esc closes.`;
  function toggleBag() {
    if (app.screen === 'bag') show('play');
    else if (app.screen === 'play') { app.queued = null; app.bagOnTop = panelOnTop(app.state.hero.y * TILE - app.cam.y); show('bag'); }
  }
  function pickSlot(i) { app.chosen = i; spoken.textContent = slotWords(i); ui.lookAt(i); } // choosing says an item's look line (D-297)
  // Enter, Space or the button: pours a flask, or makes one from oilcaps (D-299)
  function useChosen() {
    const s = app.state.bag[app.chosen], entry = s && get(s.id);
    if (entry?.oil) { show('play'); ui.pour(app.chosen); return; }
    if (!entry?.craft || s.n < entry.craft.of) return; // dim: nothing happens
    const turn = app.state.turn;
    ui.craft(app.chosen);
    if (app.fall) { show('play'); return; } // a bite in that turn felled the hero
    if (app.state.turn === turn) return; // no room for the flask: its line, and the oilcaps stay
    app.chosen = app.state.bag.findIndex((o) => o.id === entry.craft.into);
    spoken.textContent = slotWords(app.chosen);
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
    else if (app.screen === 'history') closeHistory();
    else if (app.screen === 'journal') closeJournal();
    else if (app.screen === 'sure') titleAt('new');
    else if (app.screen === 'drop') closeDrop(false);
    else if (app.screen === 'name') closeName();
    else if (app.screen === 'cloak') closeCloak();
    else if (app.screen === 'eyes') escEyes();
    else if (app.screen === 'trim') escTrim();
    else if (app.screen === 'clothes') escClothes();
    else if (app.screen === 'slots' && app.picking) { app.picking = null; spoken.textContent = slotsWords(); } // Cancel
    else if (app.screen === 'slots' && linesNow().some((l) => l.id === 'back')) titleAt('profiles');
  }
  function change(key, next, words) {
    app.settings = { ...app.settings, [key]: next };
    saveSettings(app.settings);
    spoken.textContent = words;
  }
  const changeControls = (back = false) => { const c = nextControl(app.settings.controls, back); change('controls', c, controlsText(c)); };
  const changeMotion = () => { const m = nextMotion(app.settings.motion, reduceMotion.matches); change('motion', m, motionText(m, reduceMotion.matches)); };
  const changeLantern = () => { const l = nextLantern(app.settings.lantern); change('lantern', l, lanternText(l)); };
  const changeFlasks = () => { const f = nextFlasks(app.settings.flasks); change('flasks', f, flasksText(f)); };
  const changeSound = () => { const o = nextSound(app.settings.sound); change('sound', o, soundText(o)); };

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
    if (app.screen === 'name') {
      if (key !== 'backspace' && !/^[a-z]$/.test(key)) return false;
      pressName(key === 'backspace' ? 'del' : key);
      app.chosen = NAME_PAD.findIndex((k) => k.id === 'ok');
      return true;
    }
    if (app.screen !== 'seed' || !/^[0-9]$|^backspace$/.test(key)) return false;
    pressKey(key === 'backspace' ? 'del' : key);
    app.chosen = PAD.findIndex((k) => k.id === 'ok');
    return true;
  };

  // § choosing: a menu line picked; New journey starts in a new world (D-187), asking first
  // while one is saved; Continue and Back to title keep the journey (D-238)
  function choose(i = app.chosen) {
    const id = menuOf(app.screen)[i]?.id;
    if (app.screen === 'seed') { pressKey(PAD[i].id); return; }
    if (app.screen === 'name') { pressName(NAME_PAD[i].id); return; }
    if (app.screen === 'cloak') { pressCloak(i); return; }
    if (app.screen === 'eyes') { pressEyes(i); return; }
    if (app.screen === 'trim') { pressTrim(i); return; }
    if (app.screen === 'clothes') { pressClothes(i); return; }
    if (app.screen === 'bag') { useChosen(); return; }
    if (app.screen === 'howto') { if (HOWTO_LINES[i] === 'page') flipPage(); else closeHowTo(); return; }
    if (app.screen === 'history') { if (i < HISTORY.length) openVersion(i); else closeHistory(); return; }
    if (app.screen === 'journal') { if (app.tab === 'growth' && i === 0) buyHeart(); else closeJournal(); return; }
    if (app.screen === 'slots') { chooseSlot(i); return; }
    if (app.screen === 'drop') { closeDrop(id === 'yes'); return; }
    if (id === 'profiles') openSlots(true);
    else if (id === 'new' && app.saved) show('sure', SURE_MENU.findIndex((l) => l.id === 'no'));
    else if (id === 'new' || id === 'yes') { ui.newJourney(); show('play'); }
    else if (id === 'no') titleAt('new');
    else if (id === 'resume' || id === 'continue') show('play');
    else if (id === 'title') show('title');
    else if (id === 'settings') show('settings');
    else if (id === 'journal') openJournal();
    else if (id === 'howto') openHowTo();
    else if (id === 'explore') openExplorer();
    else if (id === 'controls') changeControls();
    else if (id === 'motion') changeMotion();
    else if (id === 'seed') openPad();
    else if (id === 'lantern') changeLantern();
    else if (id === 'flasks') changeFlasks();
    else if (id === 'sound') changeSound();
    else if (id === 'history') openHistory();
    else if (id === 'back') closeSettings();
  }
  // Arrows and swipes off the room: menus take swipes always (D-189)
  const onDir = (dir, how) => {
    if (app.screen === 'map' || app.screen === 'explore') { if (how !== 'swipe') panMap(...{ up: [0, -PAN], down: [0, PAN], left: [-PAN, 0], right: [PAN, 0] }[dir]); return; }
    if (app.screen === 'seed') { app.chosen = moveKey(app.chosen, dir); return; }
    if (app.screen === 'name') { app.chosen = moveName(app.chosen, dir); return; }
    if (app.screen === 'cloak') { moveToCloak(moveCloak(app.chosen, dir)); return; }
    if (app.screen === 'eyes') { moveToEyes(moveEyes(app.chosen, dir)); return; }
    if (app.screen === 'trim') { moveToTrim(moveTrim(app.chosen, dir)); return; }
    if (app.screen === 'clothes') { moveToClothes(moveClothes(app.chosen, dir)); return; }
    if (app.screen === 'bag') { if (dir === 'left' || dir === 'right') pickSlot(Math.min(BAG_SLOTS - 1, Math.max(0, app.chosen + (dir === 'left' ? -1 : 1)))); return; }
    if (app.screen === 'howto') { if (dir === 'left' || dir === 'right') flipPage(dir === 'left'); else app.chosen = moveChoice(app.chosen, dir, HOWTO_LINES.length); return; }
    if (app.screen === 'journal') {
      if (dir === 'left' || dir === 'right') turnTab(dir === 'left' ? 'records' : 'growth');
      else if (app.tab === 'growth') app.chosen = moveChoice(app.chosen, dir, 2);
      return;
    }
    if (app.screen === 'slots') { app.chosen = moveChoice(app.chosen, dir, SLOTS + linesNow().length); return; }
    if (app.screen === 'history') {
      if (dir === 'left' || dir === 'right') openVersion(app.chosen, dir === 'right');
      else if (how === 'swipe') pageHistory(dir === 'up' ? 1 : -1); // the list follows the finger
      else pickVersion(moveChoice(app.chosen, dir, HISTORY.length + 1));
      return;
    }
    const id = menuOf(app.screen)[app.chosen]?.id;
    if (id === 'controls' && (dir === 'left' || dir === 'right')) changeControls(dir === 'left');
    else if (id === 'motion' && (dir === 'left' || dir === 'right')) changeMotion();
    else if (id === 'lantern' && (dir === 'left' || dir === 'right')) changeLantern();
    else if (id === 'flasks' && (dir === 'left' || dir === 'right')) changeFlasks();
    else if (id === 'sound' && (dir === 'left' || dir === 'right')) changeSound();
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
      else if (at === 'act') useChosen();
      else if (at) pickSlot(at.slot);
      return;
    }
    if (app.screen === 'seed') { const k = keyAt(px, py); if (k >= 0) { app.chosen = k; choose(k); } return; }
    if (app.screen === 'name') { const k = nameKeyAt(px, py); if (k >= 0) { app.chosen = k; choose(k); } return; }
    if (app.screen === 'cloak') { const k = cloakKeyAt(px, py); if (k >= 0) pressCloak(k, true); return; }
    if (app.screen === 'eyes') { const k = cloakKeyAt(px, py); if (k >= 0) pressEyes(k, true); return; }
    if (app.screen === 'trim') { const k = cloakKeyAt(px, py); if (k >= 0) pressTrim(k, true); return; }
    if (app.screen === 'clothes') { const k = cloakKeyAt(px, py, CLOTHES_PAD); if (k >= 0) pressClothes(k, true); return; }
    if (app.screen === 'history') {
      const at = historyAt(py, app.scroll, app.rows.length);
      if (at === 'back') closeHistory();
      else if (at && app.rows[at.row].kind === 'head') openVersion(app.rows[at.row].i);
      else if (at) pickVersion(app.rows[at.row].i);
      return;
    }
    if (app.screen === 'journal') {
      const at = journalAt(px, py, app.tab);
      if (at === 'back') closeJournal();
      else if (at === 'heart') { app.chosen = 0; buyHeart(); }
      else if (at) turnTab(at);
      return;
    }
    if (app.screen === 'slots') {
      const at = slotsAt(py, linesNow()), i = typeof at === 'number' ? at : SLOTS + linesNow().findIndex((l) => l.id === at);
      if (at !== null) { app.chosen = i; chooseSlot(i); }
      return;
    }
    if (app.screen === 'howto') { const at = howtoAt(px, py); if (at === 'back') closeHowTo(); else if (at) { app.chosen = 0; flipPage(at === 'prev'); } return; }
    const i = lineAt(py, menuOf(app.screen).length, menuTop());
    if (i >= 0) { app.chosen = i; choose(i); }
  };
  const onMapScreen = () => app.screen === 'map' || app.screen === 'explore';

  return { show, openSlots, pause, toggleMap, toggleBag, turnMap, panMap, zoomMap, onType, choose, onDir, onPoint, onMapScreen, onTitle, menuOf, turns };
}
