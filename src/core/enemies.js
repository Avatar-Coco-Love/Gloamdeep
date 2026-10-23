// § enemies: every enemy kind, keyed by id (D-104). Enemies stand on floor
// tiles, one per tile, in `state.enemies`. registry.js gathers this table.
// An enemy in the state is { id, x, y }, plus `health` once it has been hit,
// `chasing` once it has noticed the hero (D-127, D-157) and `facing` ('left'
// or 'right', drawn facing right until it walks, D-158).
export const ENEMIES = {
  // Two lantern hits kill it (D-109, D-110); it bites for 1 when next to the hero (D-114)
  // and comes for them once it notices them (D-126). Its bite sounds of teeth (D-259).
  rat: { id: 'rat', kind: 'enemy', name: 'Rat', health: 2, bite: 1, hurt: 'ratHurt', die: 'ratDie', bites: 'ratBite', sound: 'teeth' },
  // Light-shy (D-240): it never steps onto a lit tile, backs out of light into
  // the dark, and doesn't bite while lit. It sees the hero along a clear line, lit or not.
  gloamling: { id: 'gloamling', kind: 'enemy', name: 'Gloamling', health: 2, bite: 1, shy: true, hurt: 'gloamlingHurt', die: 'gloamlingDie', bites: 'gloamlingBite' },
};

// § lookups: the enemy on tile x, y, or undefined
export const enemyAt = (state, x, y) => state.enemies.find((e) => e.x === x && e.y === y);

// § hit: (enemies, foe, entry, damage) → the enemies after the hit. A foe
// whose health reaches 0 is gone (D-110). One that lives has noticed the
// hero, even in the dark (D-157).
export function hitEnemy(enemies, foe, entry, damage) {
  const health = (foe.health ?? entry.health) - damage;
  if (health <= 0) return enemies.filter((e) => e !== foe);
  return enemies.map((e) => (e === foe ? { ...foe, health, chasing: true } : e));
}

// § bites: (enemies, hero) → the enemies next to the hero, four ways (D-042),
// who bite on their turn. They stay put while they bite (D-114, D-128).
export const biters = (enemies, hero) => enemies.filter((e) => Math.abs(e.x - hero.x) + Math.abs(e.y - hero.y) === 1);

// § bite sound: (events) → the sound of this turn's bite, or undefined (D-259), read
// from the turn's `bite` events (events.js, D-267): the first creature's to bite,
// whose bite line shows, or after a fall, the first that has a sound.
// A creature without a `sound` bites silently, for now the gloamling.
export function biteSound(events) {
  const kinds = events.filter((e) => e.type === 'bite').map((e) => ENEMIES[e.id]);
  return (events.some((e) => e.type === 'fall') ? kinds.find((k) => k?.sound) : kinds[0])?.sound;
}
