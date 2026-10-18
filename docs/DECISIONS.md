# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force; grep there for an ID or
topic. **D-001 to D-038** (pre-production) are in
`archive/DECISIONS-PREPRODUCTION.md` (D-041). **D-039 to D-052**
(steps 7 to 11) and **D-070 to D-076** (the docs audit) are in
`archive/DECISIONS-FOUNDATION-1.md` (D-083). **D-053 to D-069** (steps 12
to 14) are in `archive/DECISIONS-FOUNDATION-2.md` (D-103). **D-077 to
D-093** (steps 15 to 17 and the 0.1.13 dev tools) are in
`archive/DECISIONS-FOUNDATION-3.md` (D-120).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-094 · 2026-10-18 · The text line** (step 18, answers Q-028)
Game text shows on one line in a strip under the room, so no tile is
ever covered; the picture grows to 176 × 221. The letters are the pixel
font (D-031), 7 pixels tall with 2 below for g, j, p, q, y, centred.

**D-095 · 2026-10-18 · How long a line stays** (step 18)
A line stays 5 turns (steps or waits), then fades in about half a
second; with reduced motion it just goes. A new line replaces it at
once.

**D-096 · 2026-10-18 · The oil lines** (step 18, answers Q-028)
"The flame is getting low." as the oil drops under 20%, and "The
lantern gutters to an ember." as it runs dry (style study 1's words).
Each is said once, as the oil crosses its mark on the way down, and
again only after the oil has gone back above it. A flask found on the
same step counts first.

**D-097 · 2026-10-18 · Text colours** (step 18)
Ordinary lines use the study's muted grey (`#9790a4`); warnings, like
the lantern guttering, use the oil bar's amber (`#ffc65c`).

**D-098 · 2026-10-18 · Torches, the first light kind** (step 19, D-024)
Light sources are their own kind in the registry, with their own list in
the game state, like items. A light sits on a tile; the registry gives
its colour, reach and flicker. The torch is the study's: orange (1.2,
0.78, 0.42), a reach of 3 tiles, flickering about ±9%. Other light
sources (braziers, glowing life…) join this list in later steps.

**D-099 · 2026-10-18 · A torch picks its look from where it sits** (step 19)
On a wall with its brick face showing, it hangs on the face as in the
study. Otherwise it goes on a wall side that has open ground next to it:
a short iron arm out from the wall's edge, the same flame on top (owner
approved the picture). The order is fixed: face, then left, then right.
Other mounts (on the floor, standing) come later.

**D-100 · 2026-10-18 · No torch where it can't sit** (step 19)
The dev spawn tool places no torch on floor, inside solid wall, or on a
tile that already has a light, as a wall can't go on the hero (D-049).

**D-101 · 2026-10-18 · The first room's torches, and what they show**
(step 19) The study's three: the top wall at 2,0 and the middle block at
4,4, and the top-right one moved from 8,0 to 7,0 so the oil bar doesn't
cover it. Their light shows wherever it falls, also with the lantern
off; only the lantern adds tiles to memory (D-059). The full study look:
bracket, a 3-frame swaying flame and rising embers, always bright;
"reduce motion" stops the sway, flicker and embers. The room keeps its
darkness values (D-063).

**D-102 · 2026-10-18 · Tile edits around a torch** (step 19)
When a dev spawn changes the tiles around a torch, it picks its look
again (D-099). A change that would leave it nowhere to sit, a floor on
its own wall included, is refused. "Reset room" brings the starting
torches back and removes spawned ones.

**D-103 · 2026-10-18 · The decision log makes room again** (step 19, as
D-083) D-053 to D-069 (steps 12 to 14) moved unchanged to
`archive/DECISIONS-FOUNDATION-2.md`. They stay in force.

**D-104 · 2026-10-18 · The rat, the first enemy** (step 20, D-009)
Enemies are their own kind in the registry, with their own list in the
game state, like items and lights. The rat is redrawn from the study's
(option A, owner approved the picture): side on, facing right, grey with
a pink hostile eye, ear, nose, feet and tail, and a shaded belly. It
bobs a pixel about every half second, as the study's did (0.52 s), still
with reduced motion.

**D-106 · 2026-10-18 · The rat is seen only in light** (step 20)
Lantern or torch light shows the rat, shaded like the floor around it.
Memory never does: on a remembered tile out of the light, the floor
shows without it, and with the lantern off and no torch near it can't
be seen at all. The first room's rat sits where the study's did, at 2,10.

**D-107 · 2026-10-18 · The rat's line** (step 20)
"The rat squeaks and holds its ground." The study's line began "You
swing your lantern.", but the whole of it doesn't fit the text line, so
it was cut to fit (owner's pick).

**D-108 · 2026-10-18 · Spawning enemies** (step 20)
The spawn tool has an Enemies group. An enemy goes on floor, off the
hero, one thing per tile: not on an item or another enemy, and no wall
or item goes on it. "Reset room" brings the starting rat back and
removes spawned ones.

**D-109 · 2026-10-18 · Swinging the lantern** (step 21, supersedes
D-105, answers part of Q-030) Walking into an enemy swings the lantern
at it, the hero's weapon until they find one (D-027); the hero stays
put. It flashes white for 0.14 s and the room shakes a pixel for
0.12 s (none with reduced motion), as before. ~~The rat doesn't fight
back yet.~~ *That last sentence is superseded by D-114 (2026-10-18).*

**D-110 · 2026-10-18 · The rat's health** (step 21, answers part of
Q-030) A rat has 2 health and a lantern hit takes 1, so two hits kill
it. Each rat keeps its own health.

**D-111 · 2026-10-18 · An attack passes a turn** (step 21, answers
part of Q-030) Like a step: the turn counts and oil burns while the
lantern is lit.

**D-112 · 2026-10-18 · The rat's lines** (step 21) A hit it survives
says D-107's line; the kill says "The rat squeaks and falls still."
An oil line crossed on the same turn replaces either, as after a step.

**D-113 · 2026-10-18 · How the rat dies** (step 21) The killing hit
flashes and shakes like any hit, then the rat is gone, leaving nothing
behind.

**D-114 · 2026-10-18 · The rat bites** (step 22, supersedes the last
sentence of D-109, answers Q-030) After each passed turn (a step, a
wait or a hit), every enemy next to the hero, four ways, bites. The rat
stays on its tile; moving and fleeing come later. It bites with the
lantern off too, for now. A rat killed by the hit doesn't bite.

**D-115 · 2026-10-18 · The hero's health** (step 22, answers Q-030) The
hero has 5 health, and a rat's bite takes 1. Two rats next to the hero
bite twice.

**D-116 · 2026-10-18 · Hearts** (step 22, answers Q-030) Health shows
as 5 small pixel hearts in the top left of the room, in a box like the
oil bar's. A full heart is the hostile red; an empty one goes dark, like
an empty oil segment.

**D-117 · 2026-10-18 · The bite line** (step 22) "The rat bites you."
It replaces any other line said on the same turn, the hit line and the
oil lines too (so a hit the rat survives now shows the bite). The
hearts and oil bar still show the rest.

**D-118 · 2026-10-18 · How a bite looks** (step 22) The hero flashes the
hostile red for 0.14 s and the room shakes a pixel for 0.12 s (none with
reduced motion), as a hit does.

**D-119 · 2026-10-18 · Falling** (step 22, answers Q-030, a stand-in for
D-020 until a home base exists) At 0 health the hero falls and wakes on
the room's starting tile, at once, with no slide. The room is as it
began (the starting rat back, spawned things gone), health is full and
the oil is back to its start (75%). The remembered map stays (D-021).
The turn still counts. The line is "You fall, and wake again."

**D-120 · 2026-10-18 · The decision log makes room again** (step 22, as
D-103) D-077 to D-093 (steps 15 to 17 and the 0.1.13 dev tools) moved
unchanged to `archive/DECISIONS-FOUNDATION-3.md`. They stay in force.
D-105 moved to `archive/DECISIONS-SUPERSEDED.md`.
