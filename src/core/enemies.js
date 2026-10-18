// § enemies: every enemy kind, keyed by id (D-104). Enemies stand on floor
// tiles, one per tile, in `state.enemies`. registry.js gathers this table.
export const ENEMIES = {
  // For now it only sits there: walking into it says its line and passes no turn (D-105).
  rat: { id: 'rat', kind: 'enemy', name: 'Rat', bump: 'ratBump' },
};

// § lookups: the enemy on tile x, y, or undefined
export const enemyAt = (state, x, y) => state.enemies.find((e) => e.x === x && e.y === y);
