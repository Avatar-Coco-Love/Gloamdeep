// § enemies: every enemy kind, keyed by id (D-104). Enemies stand on floor
// tiles, one per tile, in `state.enemies`. registry.js gathers this table.
// An enemy in the state is { id, x, y }, plus `health` once it has been hit.
export const ENEMIES = {
  // Two lantern hits kill it (D-109, D-110); it bites for 1 when next to the hero (D-114).
  rat: { id: 'rat', kind: 'enemy', name: 'Rat', health: 2, bite: 1, hurt: 'ratHurt', die: 'ratDie', bites: 'ratBite' },
};

// § lookups: the enemy on tile x, y, or undefined
export const enemyAt = (state, x, y) => state.enemies.find((e) => e.x === x && e.y === y);

// § hit: (enemies, foe, entry, damage) → the enemies after the hit. A foe
// whose health reaches 0 is gone (D-110).
export function hitEnemy(enemies, foe, entry, damage) {
  const health = (foe.health ?? entry.health) - damage;
  if (health <= 0) return enemies.filter((e) => e !== foe);
  return enemies.map((e) => (e === foe ? { ...foe, health } : e));
}

// § bites: (enemies, hero) → the enemies next to the hero, four ways (D-042),
// who bite on their turn. They stay put (D-114).
export const biters = (enemies, hero) => enemies.filter((e) => Math.abs(e.x - hero.x) + Math.abs(e.y - hero.y) === 1);
