// § map moves: dragging scrolls the map, two fingers pinch it and the mouse
// wheel zooms it (D-205). Thin layer, on only while active() is true: it
// reports onPan(dx, dy) and onZoom(by, x, y) in game pixels, the zoom about
// that point. Taps and arrow keys still go through input.js.
const PINCH = 1.25; // fingers this much farther apart (or nearer) zoom one step
const WHEEL = 100; // this much wheel turning zooms one step

export function createMapMoves(area, canvas, { active, onPan, onZoom }) {
  const down = new Map(); // pointer id → its last point, in game pixels
  let spread = 0; // the two fingers' distance at the last pinch step
  const at = (ev) => {
    const r = canvas.getBoundingClientRect();
    return { x: (ev.clientX - r.left) / r.width * canvas.width, y: (ev.clientY - r.top) / r.height * canvas.height };
  };
  const pair = () => { const [a, b] = [...down.values()]; return { d: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; };

  area.addEventListener('pointerdown', (ev) => {
    if (!active()) return;
    down.set(ev.pointerId, at(ev));
    if (down.size === 2) spread = pair().d;
  });
  area.addEventListener('pointermove', (ev) => {
    const last = down.get(ev.pointerId);
    if (!last || !active()) return;
    const now = at(ev);
    if (down.size === 1) onPan(last.x - now.x, last.y - now.y);
    down.set(ev.pointerId, now);
    if (down.size !== 2 || !spread) return;
    const p = pair();
    if (p.d > spread * PINCH) { spread = p.d; onZoom(1, p.x, p.y); }
    else if (p.d < spread / PINCH) { spread = p.d; onZoom(-1, p.x, p.y); }
  });
  const up = (ev) => { down.delete(ev.pointerId); spread = 0; };
  area.addEventListener('pointerup', up);
  area.addEventListener('pointercancel', up);

  let turned = 0;
  area.addEventListener('wheel', (ev) => {
    if (!active()) return;
    ev.preventDefault();
    turned += ev.deltaY;
    if (Math.abs(turned) < WHEEL) return;
    const p = at(ev);
    onZoom(turned < 0 ? 1 : -1, p.x, p.y);
    turned = 0;
  }, { passive: false });
}
