// § input: keys, taps, swipes and holds, turned into "step this way" (D-042).
// Thin layer: it only reports a direction, or a tap point in game pixels.
const KEYS = {
  arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down',
  arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right',
};
const SWIPE_PX = 24; // a finger moving this far (CSS px) is a swipe, not a tap
const HOLD_MS = 250; // a still finger held this long keeps stepping

// onDir(dir) for keys and swipes; onPoint(x, y) for taps and holds, in game pixels.
// held() gives the point of a finger held still, so the loop keeps stepping toward it.
export function createInput(area, canvas, { onDir, onPoint }) {
  addEventListener('keydown', (ev) => {
    const dir = KEYS[ev.key.toLowerCase()];
    if (!dir || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    ev.preventDefault();
    onDir(dir);
  });

  let press = null; // { id, x0, y0, x, y, swiped, held, timer }
  const gamePoint = (p) => {
    const r = canvas.getBoundingClientRect();
    return [(p.x - r.left) / r.width * canvas.width, (p.y - r.top) / r.height * canvas.height];
  };
  const end = () => { if (press) clearTimeout(press.timer); press = null; };

  area.addEventListener('pointerdown', (ev) => {
    if (press || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
    area.setPointerCapture(ev.pointerId);
    press = { id: ev.pointerId, x0: ev.clientX, y0: ev.clientY, x: ev.clientX, y: ev.clientY, swiped: false, held: false };
    press.timer = setTimeout(() => { if (press && !press.swiped) press.held = true; }, HOLD_MS);
  });
  area.addEventListener('pointermove', (ev) => {
    if (!press || ev.pointerId !== press.id) return;
    press.x = ev.clientX; press.y = ev.clientY;
    const dx = press.x - press.x0, dy = press.y - press.y0;
    if (press.swiped || press.held || Math.hypot(dx, dy) < SWIPE_PX) return;
    press.swiped = true;
    onDir(Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  });
  area.addEventListener('pointerup', (ev) => {
    if (!press || ev.pointerId !== press.id) return;
    if (!press.swiped && !press.held) onPoint(...gamePoint(press));
    end();
  });
  area.addEventListener('pointercancel', end);

  return { held: () => (press && press.held ? gamePoint(press) : null) };
}
