# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump.

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- Later minor versions (`0.2`, `0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.1.14 (2026-10-18)
- A text line: a strip under the room where the game speaks, in a pixel
  font drawn in code. A line stays 5 turns, then fades.
- The first lines: "The flame is getting low." as the oil drops under
  20%, and "The lantern gutters to an ember." (in amber) as it runs dry.
  Each is said once, and again only after the oil goes back above it.
- Screen readers hear the same words.
- Decisions: D-094 to D-097. Questions closed: Q-028.

## 0.1.13 (2026-10-18)
- Dev tools are on for everyone, on every build: no `?dev` needed.
- The dev panel has sections (View, Spawn, Room, Oil, Share): a fixed
  grid of section buttons at the top, the open one's tools below. Switches are buttons, two to a row.
- A stats line at the bottom left: turn, oil %, lit or dark, hero tile.
- Spawn entries are chips grouped by kind; tap one again to drop it.
- PC keys: ` opens the panel; G, C and R switch Grid, Coords, Reveal.
- An oil slider sets any amount.
- A start-up hook brings `main` up to date at the start of each
  conversation.
- Polish: violet section buttons, a grey tray for the tools, gold for
  what is on, soft red for buttons that undo.
- Decisions: D-086 to D-093.

## 0.1.12 (2026-10-18)
- The hero can wait a turn: tap or click the hero, or press Space
  (hold it to keep waiting). A wait passes a turn like a step, so oil
  burns while the lantern is lit. Only the oil bar shows it.
- Decisions: D-084, D-085. Questions closed: Q-029.

## 0.1.11 (2026-10-18)
- The lantern can be switched off and on: a lantern button next to the
  oil bar, or the L key. Switching is free. While off, no oil burns,
  the room goes pitch dark apart from the tiles you remember, and
  nothing new is remembered.
- Older decisions moved to `docs/archive/DECISIONS-FOUNDATION-1.md` to
  make room in `DECISIONS.md`.
- Decisions: D-080 to D-083.

## 0.1.10 (2026-10-18)
- The oil flask, the first item. It is the style study's bottle, bobbing
  on its shadow. Walk onto it and it pours 45% of a tank into the
  lantern (never above full), then it is gone.
- Dev panel: "Oil flask" is in the spawn list; "Reset room" clears
  spawned flasks; the coordinates readout names an item on a tile.
- The fully superseded decisions (D-055, D-068) moved to the archive.
- Decisions: D-077 to D-079.

## 0.1.9 (2026-10-18)
- Docs audit. Each conversation now pulls the latest `main` first; docs
  name a PR by its version, not its number; decisions in an open PR are
  changed in place after a playtest; "Waiting on the owner" no longer
  lists merges; the PR body is updated after every push.
- The playtest bundler is now in the repo: `tools/playtest.js`.
- Stale text fixed: the README status, the "proposed" pillars, a dev
  tool example, the fog of war notes, the seeded RNG (not built yet).
- The 0.0.x entries moved to `docs/archive/CHANGELOG-PREPRODUCTION.md`
  (this file had passed 8 KB).
- Decisions: D-070 to D-076.

## 0.1.8 (2026-10-18)
- Docs only: the next conversation is a docs audit, with the problems
  noticed so far. The build plan's order may change as we go.
- Decisions: none.

## 0.1.7 (2026-10-18)
- Oil. The lantern starts three quarters full, and every step burns a
  little: 60 steps empty a full tank (the study's 40 felt too short
  and 80 too long). As the oil drops, the light
  shrinks from about 5 tiles down to under 2, and an empty lantern is
  a small ember.
- An oil bar of 10 amber segments, as in the study, sits in the top
  right corner of the game screen.
- Dev mode: "Refill oil" and "Empty oil" buttons.
- The oil flask moves to its own next step.
- Decisions: D-064 to D-069. Questions opened: Q-028, Q-029.

## 0.1.6 (2026-10-18)
- Fog of war. Every tile the lantern has reached is remembered and stays
  faintly visible. A tile counts as seen when the light reaches its
  middle. Where the memory meets the dark, it fades over 4 pixels in
  the dither pattern, like the shadow edges.
- Each place now sets its own darkness. This room is a cave with no
  lights, so tiles you have never seen are pitch black, and remembered
  ones are a faint grey (found in the playtest: the study's blue was
  too bright and looked like moonlight).
- Dev mode: a "Reveal room" switch shows the whole room as remembered,
  and a "Forget" button wipes the memory. "Reset room" forgets too.
- Decisions: D-059 to D-063. Questions opened: Q-027.

## 0.1.5 (2026-10-18)
- The lantern lights the room. The hero holds it out to the right, and
  its warm light falls about 5 tiles in the study's dithered bands, with
  a gentle flicker (off when the device asks for reduced motion).
- Walls cast shadows. Shadow edges now fade into the dither over 4
  pixels instead of stepping in 4-pixel blocks, at the same cost.
- A wall you can see is lit as a whole tile. Long walls seen at a slant
  no longer show dark teeth (found in the playtest).
- Outside the light the room is almost black, until fog of war (step 13).
- Dev mode: a "Lighting off" switch in the wrench panel shows the whole room.
- Decisions: D-053 to D-058.

## 0.1.4 (2026-10-18)
- The game now keeps one list of everything in it, the content registry.
  For now it holds the two tiles, Wall and Floor. Items, enemies and
  NPCs will each get their own small file in it later.
- Dev mode can spawn: the wrench panel has a Spawn list (None, Wall,
  Floor), read from the registry. Pick one, then each tap or click puts
  it on that tile, and the hero doesn't walk. Keys and swipes still walk.
  Pick None to walk by tapping again. It starts at None each time.
- A wall can't go on the hero's tile. Spawning never uses up a turn.
- "Reset room" brings back the starting room. Spawned tiles are also gone
  after a reload. If the hero is standing where a wall comes back, they
  go back to the starting tile.
- While something is picked, the bottom readout says so ("placing Wall").
- "Copy room" puts the room on the clipboard as one line of text, to
  paste to Claude (for example `GD:0.1.4:11x13:hero5,11:11#/#3.#5.#/…`):
  the version, the size, the hero's tile, then the rows split by `/`,
  with a number for a run of the same tile. No spaces or line breaks, so
  chat apps can't break it up. The button says "Copied!". If the browser
  blocks copying, a box opens with the code selected, to copy by hand.
- Decisions: D-048, D-049, D-050, D-051, D-052.

## 0.1.3 (2026-10-18)
- Dev mode is here. Open the game with `?dev` once and that browser
  remembers it. `?dev=off` makes it forget.
- A small wrench button in the top-left corner opens the dev panel, with
  two switches: Grid and Coordinates. Both start off. On a PC the ` key
  shows or hides both.
- Grid: a faint line on every tile edge.
- Coordinates: a readout at the bottom gives the hero's tile and the tile
  under the mouse or finger (for example "hero 5,11 · tile 3,4 wall"),
  and that tile gets a bright outline. Tiles count from 0,0 at the top left.
- Players without `?dev` see nothing new.
- Decisions: D-045, D-046, D-047.

## 0.1.2 (2026-10-18)
- The hero is on screen: the style study's hooded figure, without the
  lantern for now, standing on a small shadow near the bottom doorway.
- The hero steps one tile at a time, in 4 directions, with a quick slide:
  arrow keys or WASD, a tap toward a side, a swipe, or holding a finger
  or the mouse down to keep walking (about 4 steps a second, still
  steered by the finger).
- Walking into a wall gives a tiny nudge and passes no turn.
- Turn rules live in `src/core/turn.js`, with tests. Input has its own
  folder, `src/input`.
- Decisions: D-042, D-043, D-044. Questions opened: Q-025, Q-026.

## 0.1.1 (2026-10-18)
- The screen now shows a whole room, built from a text map (one letter
  per tile: `#` wall, `.` floor) in the shape of the style study's room.
- Walls have brick front faces, dark caps and light edges. Floor below a
  wall is shaded, and some floor beside walls has moss.
- A small tile table says what each letter means; step 11 grows it into
  the content registry. One new test file for rooms.
- The decision log was split: D-001 to D-038 moved, unchanged, to
  `docs/archive/DECISIONS-PREPRODUCTION.md`.
- Decisions: D-040, D-041.

## 0.1.0 (2026-10-18)
- The first code. The front page is now the game, not the style study.
- It shows one crypt floor tile in the middle of a dark 11 × 13 tile
  screen, enlarged with crisp pixels to fit any phone or PC screen.
- A small version number sits in the bottom-right corner.
- Code folders are set up, with two tests (`npm test`).
- Decisions: D-039.

Older entries (0.0.x, pre-production) are in
`docs/archive/CHANGELOG-PREPRODUCTION.md`.
