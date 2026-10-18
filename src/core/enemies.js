// § enemies: every enemy kind, keyed by id (D-104). Enemies stand on floor
// tiles, one per tile, in `state.enemies`. registry.js gathers this table.
// An enemy in the state is { id, x, y }, plus `health` once it has been hit.
export const ENEMIES = {
  // It doesn't fight back yet: two lantern hits and it dies (D-109, D-110).
  rat: { id: 'rat', kind: 'enemy', name: 'Rat', health: 2, hurt: 'ratHurt', die: 'ratDie' },
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
