// § dev: dev tools (DEV-TOOLS.md), on for everyone on every build (D-086).
// A wrench button slides out the drawer (panel.js); a stats line sits at the
// bottom left (D-088); on a PC, keys work the drawer (D-090). Words are in
// the game's pixel font (D-200).
import { tileAt, depthOf } from '../core/room.js';
import { get } from '../core/registry.js';
import { itemAt } from '../core/turn.js';
import { spawn } from '../core/spawn.js';
import { W, H, TILE } from '../render/screen.js';
import { drawGrid, drawPointed, drawWrench } from '../render/overlay.js';
import { buildPanel, el } from './panel.js';
import { setPixelText } from './pixeltext.js';
import { keepPlaced } from '../input/lantern.js';

const KEY = 'gloamdeep-dev'; // localStorage: the switches and the open sections

// § storage: wrapped in try/catch, the game works without it (TECH.md)
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}
function save(opts) {
  try { localStorage.setItem(KEY, JSON.stringify(opts)); } catch { /* not saved */ }
}

// `game` gives tools the state: get() reads it, set(s) replaces it, reset()
// gives the state with the starting room back, forget() with a blank memory,
// setOil(amount) with that much oil, heal() with full hearts; still() is
// true when motion is reduced (D-190); camera() is the
// room pixel at the screen's top-left (D-195). `hud` is the strip at the
// picture's top; the wrench sits at the left end of the buttons' row (D-198).
export function createDev(stage, canvas, game, hud) {
  // every switch starts off (D-047); only View starts open (D-087)
  const opts = { grid: false, coords: false, noLight: false, reveal: false, revealMap: false, open: ['view'], ...load() };
  save(opts);

  // § panel: the wrench button and the folding sections
  const button = el('button', { id: 'dev-button', type: 'button', title: 'Dev tools (`)' });
  button.setAttribute('aria-label', 'Dev tools');
  button.setAttribute('aria-expanded', 'false');
  const icon = el('canvas', { width: 12, height: 12 });
  drawWrench(icon.getContext('2d'));
  button.append(icon);
  const panel = el('div', { id: 'dev-panel', className: 'shut', inert: true });
  const readout = el('div', { id: 'dev-readout' });
  const tools = buildPanel(panel, opts, () => save(opts), game);
  document.body.append(button, panel, readout);
  // § drawer: along the screen's left edge, from under the wrench down to
  // the stats line (D-200); the stats line keeps to the space left of the
  // picture when it stands sideways (D-199)
  const fitPanel = () => {
    const top = parseFloat(button.style.top) + 52;
    panel.style.top = top + 'px';
    panel.style.height = Math.max(88, readout.getBoundingClientRect().top - 8 - top) + 'px';
  };
  keepPlaced(hud, button, -1, (top, left, pic) => {
    readout.style.maxWidth = left < pic.left ? pic.left - 16 + 'px' : '';
    fitPanel();
  });
  new ResizeObserver(fitPanel).observe(readout);

  let open = false;
  const showPanel = (show) => {
    open = show;
    panel.style.transition = game.still() ? 'none' : ''; // the Motion switch (D-190)
    panel.classList.toggle('shut', !show);
    panel.inert = !show;
    if (!show && panel.contains(document.activeElement)) document.activeElement.blur(); // keys walk again
    button.setAttribute('aria-expanded', String(show));
  };
  button.addEventListener('click', () => showPanel(!open));

  // § hide: the title screen keeps the wrench, panel and stats away, and their keys off
  let hidden = false;
  const hide = (on) => {
    hidden = on;
    if (on) showPanel(false);
    button.style.display = readout.style.display = on ? 'none' : '';
  };

  // § keys: ` the panel, G grid, C coordinates, R reveal room (D-090)
  const SWITCH_KEYS = { g: 'grid', c: 'coords', r: 'reveal' };
  addEventListener('keydown', (ev) => {
    if (hidden || ev.repeat || ev.ctrlKey || ev.metaKey || ev.altKey || ev.target.closest('textarea')) return;
    if (ev.key === '`') { showPanel(!open); return; }
    const name = SWITCH_KEYS[ev.key.toLowerCase()];
    if (name) tools.flip(name);
  });

  // § pointing: the room tile under the mouse, or under the finger (kept after it lifts)
  let pointed = null;
  const point = (ev) => {
    const r = canvas.getBoundingClientRect(), cam = game.camera(), { room } = game.get();
    const px = (ev.clientX - r.left) / r.width * W, py = (ev.clientY - r.top) / r.height * canvas.height;
    const tx = Math.floor((px + cam.x) / TILE), ty = Math.floor((py + cam.y) / TILE);
    const onRoom = px >= 0 && py >= 0 && px < W && py < H; // the text strip is no tile
    pointed = onRoom && tx < room.cols && ty < room.rows ? { x: tx, y: ty } : null;
  };
  stage.addEventListener('pointerdown', point);
  stage.addEventListener('pointermove', point);
  stage.addEventListener('pointerleave', (ev) => { if (ev.pointerType === 'mouse') pointed = null; });

  // § draw: called each frame after the game is drawn
  let text = '';
  return {
    hide,
    armed: () => tools.picked() !== null,
    lightOff: () => opts.noLight, // see the whole room, lit or not (D-057)
    revealed: () => opts.reveal, // show every tile as remembered; the memory is kept (D-061)
    revealedMap: () => opts.revealMap, // the map shows every room of the floor in full (D-205)
    // Places the picked entry on tile x, y. False when nothing is picked,
    // so the tap walks instead.
    place(x, y) {
      const picked = tools.picked();
      if (!picked) return false;
      game.set(spawn(game.get(), picked.id, x, y));
      return true;
    },
    draw(ctx, state, cam) {
      if (opts.grid) drawGrid(ctx, cam);
      if (opts.coords && pointed) {
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); // off the text strip
        drawPointed(ctx, pointed.x - cam.x / TILE, pointed.y - cam.y / TILE);
        ctx.restore();
      }
      tools.sync(state);
      // § stats: always on; a second line for the pick and the pointed tile (D-088)
      const h = state.hero, picked = tools.picked();
      let next = `turn ${state.turn} · oil ${Math.round(state.oil * 100)}% · ${state.lit ? 'lit' : 'dark'} · health ${state.health} · hero ${h.x},${h.y} · depth ${depthOf(state.place)} · seed ${state.seed}`;
      const more = [];
      if (picked) more.push(`placing ${picked.name}`);
      if (opts.coords && pointed) {
        let tile = `tile ${pointed.x},${pointed.y} ${tileAt(state.room, pointed.x, pointed.y).id}`;
        const it = itemAt(state, pointed.x, pointed.y);
        if (it) tile += `, ${get(it.id).name}`;
        more.push(tile);
      }
      if (more.length) next += '\n' + more.join(' · ');
      if (next !== text) { text = next; setPixelText(readout, text); } // touch the page only on change
    },
  };
}
