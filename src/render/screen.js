// § screen: a small native canvas, enlarged with crisp pixels (ART-DIRECTION.md, "Grid and scale")
export const TILE = 16;
export const COLS = 11;
export const ROWS = 13;
export const W = COLS * TILE; // 176
export const H = ROWS * TILE; // 208, the room
export const LINE_H = 13; // the text line's strip under the room (D-094)
export const SCREEN_H = H + LINE_H; // 221, the room and its text line
export const HUD_H = 15; // the strip above the room for the hearts, depth and oil (D-198)
export const SIDE_W = 49; // sideways, the strip is a column this wide at the room's left (D-199)
const PICTURE_H = HUD_H + SCREEN_H; // 236, the whole picture upright
export const BUTTON = 44; // a 44 px tap target (TECH.md)
export const BUTTON_GAP = 8; // 8 px from the picture
const ROW = BUTTON + BUTTON_GAP; // the buttons' row above the picture, or a column beside it (D-198)

// (canvas, hud) → { ctx, hudCtx }: the room's canvas and the strip's above it
export function createScreen(canvas, hud) {
  canvas.width = W; canvas.height = SCREEN_H;
  const ctx = canvas.getContext('2d'), hudCtx = hud.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const fit = () => fitCanvas(canvas, hud, hudCtx);
  addEventListener('resize', fit);
  fit();
  return { ctx, hudCtx };
}

// § fit: the biggest zoom that fits the box, upright or sideways (D-199).
// Upright, the strip sits above the room and the buttons' row above that
// (D-198). Sideways, when that gives a bigger picture, the strip turns into
// a column at the room's left and the buttons stand beside the picture.
// Each game pixel covers a whole number of screen pixels (2 or more), so
// all are the same size. Below 2 the zoom is fractional instead, so very
// small screens still fill the box.
function fitCanvas(canvas, hud, hudCtx) {
  const box = canvas.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  const upright = zoom(Math.min(bw / W, (bh - ROW) / PICTURE_H)), side = zoom(Math.min((bw - 2 * ROW) / (SIDE_W + W), bh / SCREEN_H));
  const sideways = side > upright, scale = sideways ? side : upright;
  const [hw, hh] = sideways ? [SIDE_W, SCREEN_H] : [W, HUD_H];
  if (hud.width !== hw || hud.height !== hh) { hud.width = hw; hud.height = hh; hudCtx.imageSmoothingEnabled = false; }
  for (const c of [canvas, hud]) { c.style.width = c.width * scale + 'px'; c.style.height = c.height * scale + 'px'; }
  box.style.flexDirection = sideways ? 'row' : 'column';
  hud.style.marginTop = sideways ? '0' : ROW + 'px'; // room for the row above
}
function zoom(fitScale) {
  const dpr = devicePixelRatio || 1, whole = Math.floor(fitScale * dpr) / dpr;
  return whole * dpr >= 2 ? whole : Math.max(fitScale, 0.1);
}
