// § jab: a hit with a weapon held darts the hero half a tile toward the foe
// and back, in JAB_MS (D-253). None with reduced motion. Plain timing, no drawing.
export const JAB_MS = 100, JAB_PX = 8; // half a 16-pixel tile

// (jab, t) → the hero's offset in pixels { x, y } at time t: out for the
// first half, back for the second; 0, 0 outside it. jab: { dx, dy, start }
export function jabAt(jab, t) {
  if (!jab || t < jab.start || t >= jab.start + JAB_MS) return { x: 0, y: 0 };
  const p = (t - jab.start) / JAB_MS, d = Math.round(JAB_PX * (1 - Math.abs(2 * p - 1)));
  return { x: jab.dx * d, y: jab.dy * d };
}
