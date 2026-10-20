// § screen: a small native canvas, enlarged with crisp pixels (ART-DIRECTION.md, "Grid and scale")
export const TILE = 16;
export const COLS = 11;
export const ROWS = 13;
export const W = COLS * TILE; // 176
export const H = ROWS * TILE; // 208, the room
export const LINE_H = 13; // the text line's strip under the room (D-094)
export const SCREEN_H = H + LINE_H; // 221, the room and its text line
export const HUD_H = 15; // the strip above the room for the hearts, depth and oil (D-198)
const PICTURE_H = HUD_H + SCREEN_H; // 236, the whole picture
export const BUTTON = 44; // a 44 px tap target (TECH.md)
export const BUTTON_GAP = 8; // 8 px from the picture
const ROW = BUTTON + BUTTON_GAP; // the buttons' row above the picture, or beside it (D-198)

// (canvas, hud) → { ctx, hudCtx }: the room's canvas and the strip's above it
export function createScreen(canvas, hud) {
  canvas.width = W; canvas.height = SCREEN_H;
  hud.width = W; hud.height = HUD_H;
  const ctx = canvas.getContext('2d'), hudCtx = hud.getContext('2d');
  ctx.imageSmoothingEnabled = hudCtx.imageSmoothingEnabled = false;
  const fit = () => fitCanvas(canvas, hud);
  addEventListener('resize', fit);
  fit();
  return { ctx, hudCtx };
}

// § fit: the biggest zoom that fits the box with room left for the buttons'
// row above the picture, or beside it when that gives a bigger picture
// (D-198). Each game pixel covers a whole number of screen pixels (2 or
// more), so all are the same size. Below 2 the zoom is fractional instead,
// so very small screens still fill the box.
function fitCanvas(canvas, hud) {
  const box = canvas.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  const above = zoom(Math.min(bw / W, (bh - ROW) / PICTURE_H)), beside = zoom(Math.min((bw - 2 * ROW) / W, bh / PICTURE_H));
  const scale = Math.max(above, beside);
  for (const [c, h] of [[canvas, SCREEN_H], [hud, HUD_H]]) { c.style.width = W * scale + 'px'; c.style.height = h * scale + 'px'; }
  hud.style.marginTop = above >= beside ? ROW + 'px' : '0'; // room for the row above
}
function zoom(fitScale) {
  const dpr = devicePixelRatio || 1, whole = Math.floor(fitScale * dpr) / dpr;
  return whole * dpr >= 2 ? whole : Math.max(fitScale, 0.1);
}
