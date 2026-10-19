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
`archive/DECISIONS-FOUNDATION-3.md` (D-120). **D-094 to D-113** (steps 18
to 21) are in `archive/DECISIONS-FOUNDATION-4.md` (D-137). **D-114 to
D-129** (steps 22 to 24) are in `archive/DECISIONS-FOUNDATION-5.md` (D-151).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-130 · 2026-10-18 · Stairs down** (step 25, owner's pick, D-022) The
first room has stairs down at 1,1, where style study 1 put them, the far
corner from the start. Stepping onto stairs takes them and passes one
turn, like a step (oil burns). Standing or waiting on them does nothing.

**D-131 · 2026-10-18 · The second room** (step 25, owner's pick; its "nothing in it yet" superseded by D-138, 2026-10-18) Two
caves joined by a narrow gap, the same 11 × 13 size and cave darkness as
the first room, with nothing in it yet. Its stairs up are at 1,1, and the
stairs down arrive on them.

**D-132 · 2026-10-18 · Going back up** (step 25, owner's pick, D-019)
The stairs up lead back to the first room, onto its stairs down. Each
room stays as it was left: its rat, torches, items and map. The hero is
gone before the rats left behind can act, so stairs are an escape; rats
never follow between rooms, and a chasing rat is still chasing where
the hero left it. Rats in the room they arrive in take their turn.

**D-133 · 2026-10-18 · How stairs look** (step 25, owner's pick; which way they point superseded by D-143, 2026-10-18) Stairs
down are the study's: five violet-lipped steps narrowing into a dark pit
(study lines 244–254). Stairs up are the same steps flipped, narrow at
the top and widest and brightest at the bottom.

**D-134 · 2026-10-18 · Stairs glow** (step 25, owner's pick,
ART-DIRECTION.md) Both stairs give a faint, steady violet light (the
stairs colour, `#a58ce0`) reaching 1.5 tiles. A rat in it notices the
hero, as in torchlight (D-126).

**D-135 · 2026-10-18 · Taking the stairs** (step 25, owner's pick) The
hero walks onto the stairs as the room dims to black, then the new room
shows and brightens again, about 0.2 s each way; the hearts and oil bar
stay. Instant with reduced motion. The line says "You go down the
stairs." or "You go up the stairs."; an oil or bite line on the same
turn replaces it (D-112, D-117).

**D-136 · 2026-10-18 · Falling in another room** (step 25, owner's pick,
extends D-119) A fall anywhere wakes the hero at the first room's start,
with every room back as it began. The map of every room stays
remembered (D-021). The dev "Reset room" resets only the room the hero
is in.

**D-137 · 2026-10-18 · The decision log makes room again** (step 25, as
D-120) D-094 to D-113 (steps 18 to 21) moved unchanged to
`archive/DECISIONS-FOUNDATION-4.md`. They stay in force.

**D-138 · 2026-10-18 · The second room gets a flask and a rat** (step
26, owner's pick, supersedes the "nothing in it yet" of D-131) The
second room holds an oil flask, and a rat to guard it (changed after
the playtest: no longer the only flask, D-141). Only things that already exist; no new rules.

**D-139 · 2026-10-18 · Where they are** (step 26, owner's pick) The
flask lies at 9,11, the far corner of the lower cave, through the gap.
The rat sits at 7,10, near the flask, and acts as every rat does
(D-114, D-126 to D-129).

**D-140 · 2026-10-18 · Rooms start with items** (step 26, extends D-132
and D-136) A room can start with items as it does with lights and
enemies. A taken flask stays gone while the room is left; a fall or the
dev "Reset room" puts the room's items back as they began.

**D-141 · 2026-10-18 · More light on the way down** (step 26 playtest,
owner's pick) The second room was too dark to cross. The first room
gets a flask at 9,2, in the top-right cave off the way to the stairs,
and the second room a lit wall torch at 3,0, just right of the stairs
up.

**D-142 · 2026-10-18 · Start with a full tank** (step 26 playtest,
owner's pick, supersedes D-064's starting amount) A new game, and a
wake after a fall, start with the tank full: 60 turns of light, not 45.

**D-143 · 2026-10-18 · Stairs sink into the wall beside them** (step 26
playtest, owner's pick, supersedes D-133's direction) The top step starts
at the floor and the steps narrow toward a wall touching the stairs: the
wall above first, then left, then right, else down. Stairs down darken
into the pit as before; stairs up narrow the same way but brighten
toward the wall, rising to the light above.

**D-144 · 2026-10-18 · An endless way down, for now** (step 27, owner's
pick, D-013 pillar 2; its copies and their remembered maps superseded by
D-147 and D-148, 2026-10-18) Below the second room is a fresh copy of it, with
its own flask, rat and torch, one depth deeper, and below that another,
with no end. Each depth stays as left (D-132), and a fall puts every
depth back as it began, maps remembered (D-136). Step 28's generated
rooms replace the copies.

**D-145 · 2026-10-18 · The second room's stairs down** (step 27, owner's
pick) At 1,11, the lower cave's far left, through the gap and away from
the flask, so it's a choice: the flask past the rat, or straight down.

**D-146 · 2026-10-18 · The depth counter** (step 27, owner's pick)
Always shown in the top middle, between the hearts and the oil bar, in a
box like theirs: "DEPTH 1" in the first room, "DEPTH 2" in the second,
in the text line's grey. It changes as the stairs' fade turns.

**D-147 · 2026-10-18 · Generated rooms** (step 28, owner's pick,
supersedes D-144's copies, D-019) Every depth below the second room is
generated: 2 to 4 rough-edged caves joined by narrow one-tile gaps, like
the second room, in the same 11 × 13 size and cave darkness. Every tile
can be reached from the stairs up without crossing a stair, and the
stairs down lie as far along the way as the room allows. The sizes are
first guesses to tune by playing: caves 3 to 7 wide and 3 to 6 tall, at
least 45 open tiles (the second room has 67), stairs at least 8 steps apart.

**D-148 · 2026-10-18 · One seed, new on each fall** (step 28, owner's
pick, supersedes D-144's remembered maps for these depths, D-020) The
game has one seed, a number that sets every generated room, picked
afresh each time the page opens. A depth stays the same while you go up
and down, as left (D-132). A fall gives a new seed, so every generated
depth is new, like a dive (D-019), and their maps are forgotten; the
first two rooms keep theirs (D-136).

**D-149 · 2026-10-18 · What a generated room holds** (step 28, owner's
pick) As the copies did: a torch on a wall face within 3 tiles of the
stairs up, a flask at least 5 steps from them, and a rat within 2 tiles
of the flask. The rat starts in the dark, out of the torch's light and
the stairs' glow, at least 3 tiles from either stairs. Only things that
already exist; no new rules.

**D-150 · 2026-10-18 · The seed in the dev stats** (step 28, owner's
pick) The dev stats line ends with "seed 4127", so a room can be
reported and made again. Seeds run from 1 to 99999.

**D-151 · 2026-10-18 · The decision log makes room again** (step 28, as
D-137) D-114 to D-129 (steps 22 to 24) moved unchanged to
`archive/DECISIONS-FOUNDATION-5.md`. They stay in force.

**D-152 · 2026-10-18 · Rougher caves** (step 29, owner's pick, tunes
D-147) A generated cave's edges are bitten back more: each corner tile
goes to wall at 60% (was 50%), each other edge tile at 30% (was 15%),
and a bitten tile takes the next tile inward with it at 30% (caves over
3 tiles both ways). A tile a bite cuts off goes back to wall. Sizes stay
as D-147. Later the owner wants other kinds of place too: smaller
caves, bigger rooms, more natural caves, dungeons, crypts.

**D-153 · 2026-10-18 · The rat shows in memory's dim light** (step 29,
owner's pick, supersedes D-106's memory rule) Like the flask and the
hero, a rat on a remembered tile is drawn, shaded by the same dim light
as the floor, even with no lantern or torch near. On a tile never seen
it stays hidden in the dark. Noticing is unchanged: a rat still notices
the hero only in light (D-126). *A bite or a hit now counts too: D-157
(2026-10-19).*

**D-154 · 2026-10-18 · Refill hearts** (step 29 playtest, owner's pick,
DEV-TOOLS.md) Two rats in the first two rooms cost a heart or two each
and nothing heals, so the generated depths were hard to reach. The dev
panel gets a Hero section with a Refill hearts button: back to full
health, no turn passed. God mode and jumping a depth up or down come in
later steps, one at a time. Healing in the game is its own step (Q-033,
answered by D-155).

**D-155 · 2026-10-19 · The healing herb** (step 30, owner's pick,
answers Q-033) The hero heals by finding a Healing herb, a new item:
a sprig of three leaves in the moss greens. Walking onto it heals 2
hearts, never above full, and it is gone. Every generated depth has
one, on open floor at least 3 tiles from the flask and the rat, picked
after them so the rest of each seed's room is unchanged. The first two
rooms have none. The dev spawn tool lists it, as it lists every item.

**D-156 · 2026-10-19 · A herb at full health stays** (step 30, owner's
pick) At full health walking onto a herb does nothing: it stays on the
floor for later (a flask is always used, D-078). Eaten, it says "You
eat the herb and feel better."; a bite on the same turn replaces that
line (D-117).

**D-157 · 2026-10-19 · A bite or a hit makes a rat notice** (step 30,
owner's pick, answers Q-031, supersedes part of D-126) A rat that bites
the hero, or lives through their hit, has noticed them, even in the
dark: step away and it follows. Otherwise a rat still notices only in
light.

**D-158 · 2026-10-19 · A rat faces the way it walks** (step 30, owner's
pick, answers Q-032, supersedes D-104's "facing right") A rat that
steps left turns to face left, one that steps right faces right, and a
step up or down keeps its facing. One that hasn't walked yet faces
right.
