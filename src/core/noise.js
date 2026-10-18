// § noise: deterministic per-tile noise from style study 1 (lines 114–120).
// Not randomness: the same tile always looks the same. Game randomness will use the seeded RNG (TECH.md).
export function hash(x, y, s) {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 982451653);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}
