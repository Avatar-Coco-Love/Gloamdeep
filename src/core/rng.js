// § rng: the one seeded random generator (TECH.md). The same seed always
// gives the same numbers, so a seed reproduces a layout exactly. Plain math,
// no Math.random; only the page's boot picks a first seed (main.js).

// (seed) → a function giving the next number in [0, 1), mulberry32
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// § helpers: a whole number from lo to hi, both included; one from a list
export const int = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
export const pick = (r, list) => list[Math.floor(r() * list.length)];

// § seeds: shown in the dev stats, so kept short, 1 to 99999 (D-150)
export const SEED_MAX = 99999;
export const nextSeed = (seed) => int(rng(seed), 1, SEED_MAX);
// A seed of its own for each depth, from the game's seed
export const seedFor = (seed, depth) => (Math.imul(seed, 0x9e3779b1) ^ Math.imul(depth, 0x85ebca6b)) >>> 0;
