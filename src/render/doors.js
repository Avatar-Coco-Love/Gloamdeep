// § doorways: a thin pale blue line across each doorway's outer edge, where
// you step through to the next room (D-225), in room pixels. It pulses
// gently, steady with reduced motion, and shows once the tile is remembered.
const MARK = '166,224,228'; // the cloak's pale blue, as on the map (D-224)
const T = 16;

// doors: [{ x, y, dir }] (core/openings.js); seen: one byte per tile, or null for all
export function drawDoors(c, doors, seen, cols, t, still) {
  const a = still ? 0.85 : 0.6 + 0.35 * (Math.sin(t / 400) + 1) / 2;
  for (const { x, y, dir } of doors) {
    if (seen && !seen[y * cols + x]) continue;
    const px = x * T, py = y * T;
    // the bright line on the edge's second pixel, a fainter one inside it
    for (const [depth, al] of [[1, a], [2, a * 0.4]]) {
      c.fillStyle = `rgba(${MARK},${al})`;
      if (dir === 'down') c.fillRect(px + 1, py + T - 1 - depth, T - 2, 1);
      if (dir === 'up') c.fillRect(px + 1, py + depth, T - 2, 1);
      if (dir === 'right') c.fillRect(px + T - 1 - depth, py + 1, 1, T - 2);
      if (dir === 'left') c.fillRect(px + depth, py + 1, 1, T - 2);
    }
  }
}
