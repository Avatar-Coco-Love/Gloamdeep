// § explorer: the Seed Explorer (D-214), the map of any seed, all revealed,
// with no hero and no journey. It opens on the seed typed in Settings, else a
// random one, and never changes Settings. Plain data, no drawing.
// The seeds seen this visit, oldest first; the last is the one shown.
// Reseed and a typed seed add one; Back steps through them all, newest first.
export const startSeeds = (seed) => [seed];
export const shownSeed = (seeds) => seeds[seeds.length - 1];
export const addSeed = (seeds, seed) => (seed === shownSeed(seeds) ? seeds : [...seeds, seed]);
export const canGoBack = (seeds) => seeds.length > 1;
export const backSeed = (seeds) => (canGoBack(seeds) ? seeds.slice(0, -1) : seeds);

// The world the map reads for a seed: no place is the hero's, so no hero shows,
// and every room is made fresh from the seed (floorPlan with reveal)
export const explorerWorld = (seed) => ({ seed, place: 'explorer', elsewhere: {} });
