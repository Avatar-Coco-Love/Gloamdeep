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
to 21) are in `archive/DECISIONS-FOUNDATION-4.md` (D-137).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-114 · 2026-10-18 · The rat bites** (step 22, supersedes the last
sentence of D-109, answers Q-030) After each passed turn (a step, a
wait or a hit), every enemy next to the hero, four ways, bites. ~~The rat
stays on its tile; moving and fleeing come later.~~ *Superseded by D-128
(2026-10-18): a rat now walks; fleeing comes later.* It bites with the
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

**D-121 · 2026-10-18 · Lighting an unlit torch** (step 23, D-015) The
hero lights an unlit torch by walking into its wall from the tile it
faces: below a face torch, beside a side one. It stays lit for good.
In the registry it is its own light, "Unlit torch", with no light, which
becomes a torch when lit.

**D-122 · 2026-10-18 · What lighting costs** (step 23) It passes a turn
like a step or a hit, so the lantern burns its usual oil and a rat next
to the hero bites; no extra oil. It needs the lantern lit: off, nothing
lights and no turn passes.

**D-123 · 2026-10-18 · The first room's unlit torch** (step 23) A fourth
torch, unlit, on the face of the small block at 7,9, two tiles from the
start. A fall (D-119) and "Reset room" put it back unlit, like the rat.
The spawn tool's Lights group has "Unlit torch", with the torch's rules
for where it can sit (D-100).

**D-124 · 2026-10-18 · The torch lines** (step 23) Lighting says "You
light the torch."; an oil line or a bite on the same turn replaces it,
as for a hit (D-112, D-117). Walking into it with the lantern off says
"Your lantern is dark." and the hero bumps as at a wall.

**D-125 · 2026-10-18 · How an unlit torch looks** (step 23, owner
picked option A from the picture) The torch's bracket with a charred
stub where the flame would be, and one grey ash pixel. It is still and
gives no light, so it shows only in other light and in memory, like the
wall.

**D-126 · 2026-10-18 · The rat notices the hero in light** (step 24, D-026,
owner's pick) A rat notices the hero when it stands on a tile lit by
the lantern or a burning torch: if the hero can see it, it sees them
(D-106). Lit counts as for memory: the light reaches the tile's centre,
inside 95% of its reach (D-059). With the lantern off, a rat in the dark
doesn't notice them; one in torchlight still does.

**D-127 · 2026-10-18 · Once noticed, it keeps coming** (step 24, owner's pick)
A rat that has noticed the hero keeps chasing until it dies or the hero
falls (D-119 puts it back as it began), lantern off or not.

**D-128 · 2026-10-18 · How the rat walks** (step 24, owner's pick,
supersedes part of D-114) After each
passed turn, a chasing rat not next to the hero steps one tile toward
them, along the farther side first (as a held finger does, D-044). If a
wall, an item, another enemy or the hero is in the way it tries the
other side toward them, and else stays put. No going around walls.
Rats move in list order, so one waits behind another. It slides to its
new tile like the hero (D-043), at once with reduced motion.

**D-129 · 2026-10-18 · Stepping in, then biting** (step 24, owner's pick, D-016)
Rats already next to the hero bite (D-114); a rat that steps next to
them this turn bites only on the next one, so the hero has a turn to
swing first.

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

**D-133 · 2026-10-18 · How stairs look** (step 25, owner's pick) Stairs
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
second room holds the first oil flask found in play, and a rat to guard
it. Only things that already exist; no new rules.

**D-139 · 2026-10-18 · Where they are** (step 26, owner's pick) The
flask lies at 9,11, the far corner of the lower cave, through the gap.
The rat sits at 7,10, near the flask, and acts as every rat does
(D-114, D-126 to D-129).

**D-140 · 2026-10-18 · Rooms start with items** (step 26, extends D-132
and D-136) A room can start with items as it does with lights and
enemies. A taken flask stays gone while the room is left; a fall or the
dev "Reset room" puts the room's items back as they began.
