// § dev: dev mode (DEV-TOOLS.md). `?dev` in the address turns it on, and the
// browser remembers it until `?dev=off` (D-030, D-045, D-047). A wrench button
// opens a panel of switches; on a PC the ` key shows or hides the overlay.
// Plain page text, not the pixel font (D-045).
import { tileAt } from '../core/room.js';
import { COLS, ROWS } from '../render/screen.js';
import { drawGrid, drawPointed, drawWrench } from '../render/overlay.js';

const KEY = 'gloamdeep-dev'; // localStorage: the switches, saved while dev mode is on

// § storage: wrapped in try/catch, the game works without it (TECH.md)
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}
function save(opts) {
  try { if (opts) localStorage.setItem(KEY, JSON.stringify(opts)); else localStorage.removeItem(KEY); } catch { /* not saved */ }
}

// Returns null when dev mode is off, so players get no DEV button at all.
export function createDev(stage, canvas) {
  const asked = new URLSearchParams(location.search).get('dev'); // '' for ?dev, 'off' for ?dev=off
  if (asked === 'off') { save(null); return null; }
  const saved = load();
  if (asked === null && !saved) return null;
  const opts = { grid: false, coords: false, ...saved }; // every switch starts off (D-047)
  save(opts);

  // § panel: the wrench button and its switches
  const button = el('button', { id: 'dev-button', type: 'button', title: 'Dev tools' });
  button.setAttribute('aria-label', 'Dev tools');
  button.setAttribute('aria-expanded', 'false');
  const icon = el('canvas', { width: 12, height: 12 });
  drawWrench(icon.getContext('2d'));
  button.append(icon);
  const panel = el('div', { id: 'dev-panel', hidden: true });
  const readout = el('div', { id: 'dev-readout' });
  const boxes = {};
  for (const [name, label] of [['grid', 'Grid'], ['coords', 'Coordinates']]) {
    const row = el('label', {});
    boxes[name] = el('input', { type: 'checkbox', checked: opts[name] });
    boxes[name].addEventListener('change', () => { opts[name] = boxes[name].checked; save(opts); });
    row.append(boxes[name], ' ' + label);
    panel.append(row);
  }
  document.body.append(button, panel, readout);

  button.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
  });

  // § key: ` shows or hides the whole overlay
  addEventListener('keydown', (ev) => {
    if (ev.key !== '`' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const show = !(opts.grid || opts.coords);
    for (const name of ['grid', 'coords']) { opts[name] = show; boxes[name].checked = show; }
    save(opts);
  });

  // § pointing: the tile under the mouse, or under the finger (kept after it lifts)
  let pointed = null;
  const point = (ev) => {
    const r = canvas.getBoundingClientRect();
    const tx = Math.floor((ev.clientX - r.left) / r.width * COLS);
    const ty = Math.floor((ev.clientY - r.top) / r.height * ROWS);
    pointed = tx >= 0 && ty >= 0 && tx < COLS && ty < ROWS ? { x: tx, y: ty } : null;
  };
  stage.addEventListener('pointerdown', point);
  stage.addEventListener('pointermove', point);
  stage.addEventListener('pointerleave', (ev) => { if (ev.pointerType === 'mouse') pointed = null; });

  // § draw: called each frame after the game is drawn
  let text = '';
  return {
    draw(ctx, state) {
      if (opts.grid) drawGrid(ctx);
      if (opts.coords && pointed) drawPointed(ctx, pointed.x, pointed.y);
      const h = state.hero;
      let next = '';
      if (opts.coords) {
        next = `hero ${h.x},${h.y}`;
        if (pointed) next += ` · tile ${pointed.x},${pointed.y} ${tileAt(state.room, pointed.x, pointed.y).id}`;
      }
      if (next !== text) { text = next; readout.textContent = text; } // touch the page only on change
    },
  };
}

function el(tag, props) {
  return Object.assign(document.createElement(tag), props);
}
