// § input: keys, taps, swipes and holds, turned into "step this way" (D-042),
// the L key, which switches the lantern (D-080), Space, which waits a turn (D-085),
// Enter, which picks the chosen menu line (D-177), Esc or P, which open and close the pause menu (D-187), M, which opens and closes the map (D-205),
// and < and > or Page Up and Page Down, which turn it a floor (D-206).
// Thin layer: it only reports a direction, a tap point in game pixels, the switch or a wait.
const KEYS = {
  arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down',
  arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right',
};
const SWIPE_PX = 24; // a finger moving this far (CSS px) is a swipe, not a tap
const HOLD_MS = 250; // a still finger held this long keeps stepping

// onDir(dir, how) for keys and swipes, how being 'swipe' for a swipe (the Controls switch, D-189); onPoint(x, y) for taps and holds, in game pixels;
// onLantern() for the L key; onWait() for Space, which repeats while held, like the arrows;
// onChoose() for Enter; onPause() for Esc and P; onMap() for M; onFloor(way) for < and > or Page Up and Page Down; onType(key) for digits and Backspace (the seed pad, D-191),
// which returns true when it used the key.
// held() gives the point of a finger held still, so the loop keeps stepping toward it;
// kind() the way of playing last used: 'touch', 'mouse' or 'keyboard' (How to play opens on it, D-193).
export function createInput(area, canvas, { onDir, onPoint, onLantern, onWait, onChoose, onPause, onMap, onFloor, onType }) {
  let kind = 'touch'; // phone first, until something is pressed
  addEventListener('keydown', (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    kind = 'keyboard';
    const key = ev.key.toLowerCase(), dir = KEYS[key];
    if ((/^[0-9]$/.test(key) || key === 'backspace') && !ev.target.closest('input')) { if (onType(key)) ev.preventDefault(); return; }
    if (key === 'l' && !ev.repeat) { ev.preventDefault(); onLantern(); return; }
    if ((key === 'escape' || key === 'p') && !ev.repeat) { ev.preventDefault(); onPause(); return; }
    if (key === 'm' && !ev.repeat && !ev.target.closest('input')) { ev.preventDefault(); onMap(); return; }
    const way = { '<': 'up', pageup: 'up', '>': 'down', pagedown: 'down' }[key];
    if (way && !ev.target.closest('input')) { ev.preventDefault(); onFloor(way); return; }
    if (key === 'enter' && !ev.repeat && !ev.target.closest('button, input')) { ev.preventDefault(); onChoose(); return; }
    if (key === ' ' && !ev.target.closest('button')) { ev.preventDefault(); onWait(); return; } // Space on a focused button presses it
    if (!dir || (key.startsWith('arrow') && ev.target.type === 'range')) return; // arrows on the dev oil slider move it
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
    kind = ev.pointerType === 'mouse' ? 'mouse' : 'touch';
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
    onDir(Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'), 'swipe');
  });
  area.addEventListener('pointerup', (ev) => {
    if (!press || ev.pointerId !== press.id) return;
    if (!press.swiped && !press.held) onPoint(...gamePoint(press));
    end();
  });
  area.addEventListener('pointercancel', end);

  return { held: () => (press && press.held ? gamePoint(press) : null), kind: () => kind };
}
