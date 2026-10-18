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

## 0.0.9 (2026-10-17)
- The design brief is approved, and now covers the hero, oil and growth.
- The hero is a lamplighter. Why they go down (the spreading gloam,
  treasure, a call from below) is uncovered slowly.
- Oil burns every turn the lantern is lit.
- You grow stronger through levels, gear, home upgrades and discoveries.
- The replaced dog decisions moved to the archive to keep the log small.
- Decisions: D-035 to D-038. Questions closed: Q-022 to Q-024.

## 0.0.8 (2026-10-17)
- Draft of the one-page design brief (`docs/DESIGN.md`), built only from
  decisions, for the owner to approve.
- Three gaps the brief found are now open questions: the hero and why
  they go down, how oil drains, how you get stronger.
- D-004's slower pace is marked as superseded by D-018.
- The companion is now a faery, not a dog: it flies around you, talks,
  guides and never fights.
- Decisions: D-034 (supersedes D-029, D-033). Questions opened: Q-022 to
  Q-024.

## 0.0.7 (2026-10-17)
- Every biome has portals, and each leads into a twisted, darker version
  of that biome with rarer loot.
- The companion is a dog you rescue in the first cave.
- Decisions: D-032, D-033. Questions closed: Q-020, Q-021.

## 0.0.6 (2026-10-17)
- Light comes from torches, glowing life, thrown light and daylight
  shafts too. Day and night pass with your turns.
- Switching the lantern off saves oil, hides you, reveals some secrets and
  calms some creatures.
- One close-up weapon first; each weapon has its own attack shape, and
  ranged, area and learned abilities unlock as you grow.
- Four biomes: woods and mountains, old mines, glowing fungal caverns,
  sunken ruins. The companion is an animal.
- Dev mode opens with `?dev` and ships hidden. Text uses a pixel font.
- Decisions: D-024 to D-031. Questions closed: Q-012 to Q-019. Questions
  opened: Q-020, Q-021.

## 0.0.5 (2026-10-17)
- The game is one persistent journey. The world is generated once per
  save, and portals lead into deep areas that change on every visit.
- Dying sends you home: in the world you can fetch your dropped bag, in a
  portal you lose that dive's finds. Levels, unlocks and lore always stay.
- What you keep: lore, unlocks, home base, levels, shortcuts, explored map,
  stash, deepest depth record.
- Surface first, then down, with caves that open into valleys or cut
  through mountains. Solo, with one companion later.
- Decisions: D-019 to D-023. Questions closed: Q-008 to Q-010. Questions
  opened: Q-018, Q-019.

## 0.0.4 (2026-10-17)
- Oil is light only. Running dry shrinks the light to an ember and makes
  enemies bolder, but the run goes on.
- The lantern can be switched on and off, other light sources exist, and
  outside in the day you don't need it.
- Turns happen only when you act. Walk into an enemy to attack, with
  ranged abilities, weapon kinds and area attacks planned too.
- Faster working pace: several small decisions per PR, multiple-choice
  questions.
- Decisions: D-014 to D-018. Questions closed: Q-004 to Q-007. Questions
  opened: Q-014 to Q-017.

## 0.0.3 (2026-10-17)
- The four design pillars are set: the lantern is your world, always one
  floor deeper, curiosity pays off, and stronger, slowly.
- Decisions: D-013. Questions closed: Q-003.

## 0.0.2 (2026-10-17)
- Everything in style study 1 stays. Only the rat sprite and the blocky
  shadow edges will be improved.
- The game is hosted on GitHub Pages, at the renamed repo `gloamdeep`.
- No blue flash when tapping: recorded as a rule for the game.
- The Pages front page now opens style study 1, so the link is playable.
- Decisions: D-009 to D-012. Questions closed: Q-002, Q-011.

## 0.0.1 (2026-10-17)
- Project kickoff: working rules (`CLAUDE.md`), decision log, open questions,
  vision, art direction, tech and dev-tool notes.
- Added style study 1 as the frozen art reference (`reference/`).
- Recorded what the owner loved about Dungeon Siege.
- Decisions: D-001 to D-008. Questions closed: Q-001.
