# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump.

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.0 (2026-10-19)
- Natural caves: every depth below the second room is now 2 to 4
  round, lumpy chambers joined by winding one-tile tunnels, smoothed
  like worn stone. No more boxes with nicks and straight gaps.
- Cave art: those depths are drawn as raw grey rock, not crypt bricks.
  Walls are piled rock chunks, the floor is rough stone with gravel and
  the odd puddle, and the rock's edges round off and wander instead of
  following the square tiles. The first two rooms stay crypt.
- Torch, flask, rat, herb and stairs are placed by the same rules as
  before. Walking is still tile by tile.
- Decisions: D-162 (supersedes D-152 and the shape in D-147), D-163,
  D-164.

## 0.1.27 (2026-10-19)
- Nothing to play yet: this step plans stage 0.2. Natural caves and
  depths that change as you go down come first, then a dive worth
  repeating (a record, a proper fall, saving), then getting stronger.
  Sounds come in a later stage.
- After your playtest: caves will stop being boxy and samey; the rat
  in the dark and the healing herb stay as they are.
- The foundation's decisions and older changelog entries moved to
  archive files; the decisions still hold.
- Decisions: D-159 to D-161.

## 0.1.26 (2026-10-19)
- Healing: every generated depth now has a Healing herb, a green sprig.
  Walking onto it heals 2 hearts. At full health it stays on the floor
  for later.
- A rat that bites you, or that you hit without killing, has noticed
  you, even in the dark: step away and it follows.
- A rat faces the way it walks, left or right.
- Decisions: D-155 to D-158 (D-157 supersedes part of D-126, D-158
  part of D-104). Questions closed: Q-031, Q-032, Q-033.

Older entries: `docs/archive/CHANGELOG-FOUNDATION-2.md` (0.1.13 to
0.1.25), `CHANGELOG-FOUNDATION-1.md` (0.1.0 to 0.1.12) and
`CHANGELOG-PREPRODUCTION.md` (0.0.x).
