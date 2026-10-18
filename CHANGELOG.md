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

## 0.1.22 (2026-10-18)
- The second room isn't empty any more. An oil flask lies in the far
  corner of the lower cave, through the narrow gap: the first oil you
  can find without the dev tools.
- A rat sits near it, guarding it. Fight it, or switch the lantern off
  and slip past.
- Both stay as you left them when you go up and back down. A fall or
  "Reset room" puts them back.
- Decisions: D-138 to D-140.

## 0.1.21 (2026-10-18)
- Stairs down in the top-left corner of the first room, where the style
  study had them. Step onto them to go down to a second room: two dark
  caves joined by a narrow gap, empty for now. It costs a turn, like a step.
- You arrive on stairs up. Step off and back on to go up again. Each
  room stays as you left it, map and all.
- The screen dims to black and back as you go (instant with reduced
  motion), and the line says "You go down the stairs." or "You go up
  the stairs."
- Stairs glow a faint violet, so you can spot them in the dark, and a rat
  standing in that glow notices you.
- Stairs are an escape: you're gone before a rat next to you can bite,
  and rats don't follow. Falling anywhere wakes you at the start of the
  first room, with both rooms as they began.
- Steps 18 to 21's decisions, and the 0.1.0 to 0.1.12 changelog
  entries, moved to archive files to keep these files small.
- Decisions: D-130 to D-137.

## 0.1.20 (2026-10-18)
- The rat moves. Once it stands in light (the lantern's or a torch's)
  it notices the hero, and from then on it comes one tile closer after
  every passed turn, until it dies or the hero falls. It slides from
  tile to tile like the hero.
- It walks straight toward the hero, the farther way first. If that's
  blocked it tries the other way toward them, and else it waits. It
  doesn't go around walls.
- A rat that has just stepped next to the hero bites on the next turn,
  so there's a turn to swing first.
- With the lantern off, a rat in the dark doesn't notice the hero.
- Decisions: D-126 to D-129. Questions opened: Q-031, Q-032.

## 0.1.19 (2026-10-18)
- An unlit torch on the small block near the start, a charred stub on
  its bracket. Walk into its wall from below, with the lantern lit, to
  light it: it says "You light the torch." and stays lit. It costs a
  turn, like a step.
- With the lantern off it won't light: the hero bumps and it says "Your
  lantern is dark.", and no turn passes.
- A fall or "Reset room" puts it back unlit. The spawn tool can place
  unlit torches too.
- Decisions: D-121 to D-125.

## 0.1.18 (2026-10-18)
- The rat fights back: after each step, wait or hit, a rat next to the
  hero bites for 1. It stays on its tile, and bites in the dark too.
- The hero has 5 health, shown as pixel hearts in the top left. A bite
  flashes the hero red, shakes the room and says "The rat bites you.",
  which replaces any other line that turn.
- At 0 health the hero falls and wakes on the starting tile: the room as
  it began, full health, oil back to 75%, the map still remembered. It
  says "You fall, and wake again."
- The dev stats line shows health.
- Decisions D-077 to D-093 moved to an archive file, unchanged.
- Decisions: D-114 to D-120 (part of D-109 superseded). Questions
  closed: Q-030.

## 0.1.17 (2026-10-18)
- Fighting the rat: walking into it swings the lantern. The first hit
  says "The rat squeaks and holds its ground.", and the second kills it
  with "The rat squeaks and falls still."; it flashes and is gone.
- A hit passes a turn and burns oil, like a step. The rat doesn't fight
  back yet.
- Decisions: D-109 to D-113 (D-105 superseded). Q-030 narrowed to the
  rat fighting back.

## 0.1.16 (2026-10-18)
- The first enemy: a rat sits in the first room, where the study had
  it. It's redrawn from the study's rat (the owner picked option A) and
  bobs while idle.
- Walking into it flashes it white, shakes the room a pixel and says
  "The rat squeaks and holds its ground." It doesn't fight back or get
  hurt yet, and no turn passes.
- It shows only in lantern or torch light, never in the remembered map.
- The dev Spawn tool has an Enemies group.
- Decisions: D-104 to D-108. Questions opened: Q-030.

## 0.1.15 (2026-10-18)
- Torches: the first light sources besides the lantern. Three hang in
  the first room, where the study had them (the top-right one a tile
  left, clear of the oil bar), with swaying flames and rising embers.
- Their orange light flickers and shows even with the lantern off. Only
  the lantern adds to the remembered map.
- A torch picks its look from where it sits: on a brick face, or on an
  iron arm out from a wall's side. The dev Spawn tool has a Lights group
  and refuses spots where a torch can't sit.
- Older decisions D-053 to D-069 moved to an archive file, unchanged.
- Decisions: D-098 to D-103.

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

Older entries: 0.1.0 to 0.1.12 are in `docs/archive/CHANGELOG-FOUNDATION-1.md`,
and 0.0.x in `docs/archive/CHANGELOG-PREPRODUCTION.md`.
