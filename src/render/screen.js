// § screen: a small native canvas, enlarged with crisp pixels (ART-DIRECTION.md, "Grid and scale")
export const TILE = 16;
export const COLS = 11;
export const ROWS = 13;
export const W = COLS * TILE; // 176
export const H = ROWS * TILE; // 208, the room
export const LINE_H = 13; // the text line's strip under the room (D-094)
export const SCREEN_H = H + LINE_H; // 221, the whole picture

export function createScreen(canvas) {
  canvas.width = W;
  canvas.height = SCREEN_H;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const fit = () => fitCanvas(canvas);
  addEventListener('resize', fit);
  fit();
  return ctx;
}

// § fit: the biggest zoom that fits the box. Each game pixel covers a whole
// number of screen pixels (2 or more), so all are the same size. Below 2 the
// zoom is fractional instead, so very small screens still fill the box.
function fitCanvas(canvas) {
  const box = canvas.parentElement;
  const dpr = devicePixelRatio || 1;
  const fitScale = Math.min(box.clientWidth / W, box.clientHeight / SCREEN_H);
  const whole = Math.floor(fitScale * dpr) / dpr;
  const scale = whole * dpr >= 2 ? whole : fitScale;
  canvas.style.width = W * scale + 'px';
  canvas.style.height = SCREEN_H * scale + 'px';
}
