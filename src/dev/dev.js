// § dev: dev tools (DEV-TOOLS.md), on for everyone on every build (D-086).
// A wrench button opens the panel (panel.js); a stats line sits at the bottom
// left (D-088); on a PC, keys work the panel (D-090). Plain page text, not the
// pixel font (D-045).
import { tileAt, depthOf } from '../core/room.js';
import { get } from '../core/registry.js';
import { itemAt } from '../core/turn.js';
import { spawn } from '../core/spawn.js';
import { W, H, TILE } from '../render/screen.js';
import { drawGrid, drawPointed, drawWrench } from '../render/overlay.js';
import { buildPanel, el } from './panel.js';
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
// setOil(amount) with that much oil, heal() with full hearts; camera() is the
// room pixel at the screen's top-left (D-195). `hud` is the strip at the
// picture's top; the wrench sits at the left end of the buttons' row (D-198).
export function createDev(stage, canvas, game, hud) {
  // every switch starts off (D-047); only View starts open (D-087)
  const opts = { grid: false, coords: false, noLight: false, reveal: false, open: ['view'], ...load() };
  save(opts);

  // § panel: the wrench button and the folding sections
  const button = el('button', { id: 'dev-button', type: 'button', title: 'Dev tools (`)' });
  button.setAttribute('aria-label', 'Dev tools');
  button.setAttribute('aria-expanded', 'false');
  const icon = el('canvas', { width: 12, height: 12 });
  drawWrench(icon.getContext('2d'));
  button.append(icon);
  const panel = el('div', { id: 'dev-panel', hidden: true });
  const readout = el('div', { id: 'dev-readout' });
  const tools = buildPanel(panel, opts, () => save(opts), game);
  document.body.append(button, panel, readout);
  keepPlaced(hud, button, -1, (top, left) => { panel.style.top = top + 52 + 'px'; panel.style.left = left + 'px'; });

  const showPanel = (show) => {
    panel.hidden = !show;
    if (!show && panel.contains(document.activeElement)) document.activeElement.blur(); // keys walk again
    button.setAttribute('aria-expanded', String(show));
  };
  button.addEventListener('click', () => showPanel(panel.hidden));

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
    if (ev.key === '`') { showPanel(panel.hidden); return; }
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
      if (next !== text) { text = next; readout.textContent = text; } // touch the page only on change
    },
  };
}
