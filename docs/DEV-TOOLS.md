# Dev tools

The game has built-in developer tools from the start (D-006). The owner
asked for the ability to spawn any item, enemy, NPC and so on, plus more
tools to be chosen together later.

## Principles
- **Tools edit the game state, then the screen redraws.** A tool never
  draws anything itself, so it can't fall out of step with the real game.
- **Tools read the content registry** (`TECH.md`). Anything added to the
  game appears in the spawn menu automatically.
- **Hidden from players.** Adding `?dev` to the address opens it. It ships
  in the public build, hidden unless opened (D-030).
- **Reproducible.** Show the current seed, and allow loading a seed.
- Each new game feature arrives with its dev hook in the same PR (for
  example, oil arrives with "set oil").

## Decided
- Spawn any registry entry (item, enemy, NPC, tile) at a chosen tile (D-006).
- The switch: `?dev` once, remembered until "Leave dev mode"; a DEV button
  opens a panel of switches; ` on a PC (D-045). Code: `src/dev/dev.js`.
- Grid and coordinates overlay (D-046). Drawing: `src/render/overlay.js`.

## Candidates (the owner picks; record each pick as a decision)
- God mode (no damage)
- Set, refill or empty oil
- Reveal the whole map / clear fog of war
- Jump to any room or floor
- Step enemies one turn at a time
- Collision overlay (the grid and coordinates part is built, D-046)
- Show light radius and line-of-sight overlay
- Save and load test situations
- Seed display and load
- Lighting on/off (the style study already has this)
- Speed up or slow down animations

## Next (build plan step 11)
Spawning, together with the content registry. Built at step 10: the
switch and the grid and coordinates overlay.
