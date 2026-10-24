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
**D-130 to D-158** (steps 25 to 30) are in
`archive/DECISIONS-FOUNDATION-6.md` (D-161). **D-159 to D-167** (steps
31 to 33) are in `archive/DECISIONS-STAGE-0.2-1.md` (D-188). **D-177 to
D-193** (the main menu, steps 52 to 58) are in `archive/DECISIONS-MENU.md`
(D-196). **D-194 to D-200** (steps 43 to 45, UI steps U1 and U2) are in
`archive/DECISIONS-GETTING-AROUND.md` (D-208). **D-201 to D-208** (a
region and its map, steps 46 to 47b) are in `archive/DECISIONS-REGION.md`
(D-213). **D-209 to D-218** (the surface, steps 48 to 51, and the Seed
Explorer) are in `archive/DECISIONS-SURFACE.md` (D-221). **D-219 to
D-233** (the held walk, deeper floors, steps 51b to 59c, 34, 35 and M1)
are in `archive/DECISIONS-DEEPER.md` (D-236). **D-234 to D-246** (steps
36 to 40) are in `archive/DECISIONS-LAST-STEPS-1.md` (D-251). **D-247 to
D-260** (the bag, the knife, Version history, the first sounds) are in
`archive/DECISIONS-LAST-STEPS-2.md` (D-265). **D-261 to D-269** (built to
grow, steps G1 to G4) are in `archive/DECISIONS-GROWING-1.md` (D-274).
**D-270 to D-278** (the Journal, profiles and their looks, steps J1 and
P1 to P6) are in `archive/DECISIONS-GROWING-2.md` (D-279). **D-279 to
D-298** (play to earn, Records, profiles' boxes, embers, the oilcap) are
in `archive/DECISIONS-GROWING-3.md` (D-300).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---


**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. ~~Steps of stage 0.3 are versioned 0.3.x.~~ *That part
superseded by D-237 (2026-10-22): versions stay 0.2.x.* The step list
is in `PROGRESS.md` and may change as we go.

**D-169 · 2026-10-19 · Regions are grids of rooms** (the owner's idea)
The world, surface and below, is split into regions joined to each
other. Each region is a grid of cells (a 3 × 3 marsh has 9), and not
every cell must be used. Each region has its own rule sheet for how it
generates, including promises that hold for every seed: a special room
with its own rules, a single secret entrance to it from a side that
changes with the seed, or a special item that must appear in a named
room or building. Each cave follows its own rules too. Generated once
per save, as D-019.

**D-170 · 2026-10-19 · Where the world is written down** (owner's pick)
`docs/WORLD.md` holds how the world works, under 8 KB. Each region gets
its own rule sheet in `docs/regions/`, one file per region, made when the
region is designed. Undecided details are open questions.

**D-171 · 2026-10-19 · Ways between rooms** (the owner's idea) Rooms
join by stairs up and down, by openings at their sides into the room
beside them, by water for a hero who can swim (Q-039), and by secret
entrances. Both sides of a way line up exactly, and each room is made to
fit the ways into it.

**D-172 · 2026-10-19 · Rooms of every shape and size** (the owner's idea
and pick) Rooms differ in shape and size by their kind: tunnels are
narrow, deserts are vast. A room bigger than the screen scrolls, with the
camera following the hero. The kinds and sizes are Q-038.

**D-173 · 2026-10-19 · Light comes through openings** (the owner's idea)
A doorway, cave mouth or stairs lets in the light of the place beyond.
Daylight shines in behind you by day, less in rain or snow, not at
night, following the time of day (D-025) and the weather (Q-035). An
open way into a lit room not yet found glows, so you can tell a lit
space lies ahead. Details are Q-040.

**D-174 · 2026-10-19 · Stairs must be found** (the owner's idea,
supersedes part of D-134) The stairs' glow is dimmer and shows only where
the fog of war has lifted, so stairs and doors must be found, unless
other light reveals them. Some underground places are brightly lit.
How dim is Q-041.

**D-175 · 2026-10-19 · Today's game becomes the first cave** (owner's
pick) The two crypt rooms and the generated depths below them become the
first cave under the starting region, reached from a cave entrance on
the surface. Q-043 asks whether it gets a bottom.

**D-176 · 2026-10-19 · A world map to uncover** (the owner's idea,
builds on D-021) Players uncover the map as they explore. Dev tools get
a switch that reveals the whole map, and a map mode, which may be the
same map players see. Details are Q-042.

**D-299 · 2026-10-24 · The first craft: Make** (step C2, the owner's
picks; builds D-296) Choosing oilcaps in the bag shows a Make button where
Pour sits for a flask; Enter or Space does it too. Under 3 oilcaps it
shows dim and does nothing. With 3, it turns them into 1 oil flask, on the
flasks' stack or in a slot at the end, and a turn passes, like a pour; the
bag stays open, on the new flask. The line says "You make an oil flask."
With 3 flasks already carried, the line says "You can't carry more
flasks.", the oilcaps stay and no turn passes.

**D-300 · 2026-10-24 · Built to grow's third decisions are archived** (as
D-279, by the 12 KB rule in `CLAUDE.md`) D-279 to D-298 moved unchanged to
`archive/DECISIONS-GROWING-3.md` as this file would have passed 12 KB.
They stay in force.

**D-301 · 2026-10-24 · The rat flees or stands its ground** (the owner's
picks; partly supersedes D-292) When a hit hurts a rat, a seeded coin
toss, 1 in 2, picks one and it keeps to it. Fleeing, it steps away as in
D-292 for 4 turns, then stops and has to notice the hero again (in light,
along a clear line) before it comes back. Standing, it keeps coming and
bites. The stand lines take turns (D-297): "The rat stands its ground.",
"The rat squeaks and bares its teeth.", "The rat squeaks." On the turn it
is hit, its stand line shows instead of the bite line (D-117); it still
bites. ("The rat squeaks and stands its ground." was too wide for the line.)

**D-302 · 2026-10-24 · A fleeing rat calms when the hero leaves** (the
owner's find and pick) A room left waits as it was (D-019), but a rat
still fleeing in it stops: back in the room, it stays put until it notices
the hero again, as after its 4 turns (D-301). Fleeing stops by turns only,
not by distance or out of light.

**D-303 · 2026-10-24 · The heartcap, a healing mushroom** (the owner's
picks; builds D-296) The second kind of mushroom, the Heartcap: bright red
(`#d8483c`, shade `#8c2430`) with pale spots, a round dome on a short pale
stem. It lies in about 1 in 2 generated rooms, on an open tile nothing else
took, picked after the oilcap so the rest of each seed's room stays as it
was. Walked onto, it goes into the bag as the oilcap does, in stacks of 3,
saying "You can't carry more heartcaps." over a full stack. Its lines take
turns (D-297): "You pick a heartcap.", "The heartcap comes up whole.", "A
heartcap, warm in your hand."; and "It might mend a wound.", "Its red cap
is spotted white.", "It feels faintly warm." It heals, in two later steps:
eaten from the bag it heals a little; Make turns several into a healing
potion, with its own art, that heals more. Amounts are chosen then.

**D-304 · 2026-10-24 · Every mushroom a slightly different tone** (the
owner's idea) Each mushroom, oilcaps and heartcaps alike, gets a slight but
noticeable shift in colour tone, so no two look exactly the same, even
within one seed's world. It is its own step, after the heartcap; then
eating a heartcap, then its potion.

**D-305 · 2026-10-24 · How strong a mushroom's tone is** (the owner's pick
of three shown; builds D-304, step H2) Each oilcap and heartcap a room lays
out shifts its cap's two colours by up to 12° of hue and 7 points of
lightness, either way; the spots, stem and outline stay. The seed and the
mushroom's tile set it, so a seed's mushrooms keep their tones and the rest
of its rooms stay as they were. Mushrooms in rooms an old save already
reached, and ones the dev tools place, keep the plain colour.

**D-306 · 2026-10-24 · Things picked grow back** (the owner's wish and
picks) Everything that can be collected comes back after enough in-game
time, each kind by its own rule. Each thing has its own clock, from the
turn it was taken; a room or floor needn't be cleared first. Oilcaps,
heartcaps and herbs come back after a day, 300 turns (D-217); an oil flask
after 3 days, 900 turns. The one knife doesn't. Mining's deposits (D-282)
and later collectables get their own rules when they are built. It is its
own step, H2b, right after H2; then eating a heartcap, then its potion.

**D-307 · 2026-10-24 · How a room remembers what was taken** (the owner's
picks, three of three recommended; builds D-306, step H2b) Each room keeps a
taken list beside its items: the thing as it lay, its tile and tone, and the
turn it was taken. When its clock runs out it comes back just as it was, but
only on a tile out of the hero's light, with no hero, creature or item on it;
in a room the hero has just walked into, what grew while they were away is
already there. Things the dev tools placed grow back too. Things taken in an
old save before this stay gone; a fall still begins every room anew.

**D-308 · 2026-10-24 · Eating a heartcap** (step H3, the owner's picks,
four of four recommended; builds D-303) Choosing heartcaps in the bag shows
an Eat button where Pour and Make sit; Enter or Space does it too. Eating
one heals 1 heart, never above full, and a turn passes, like a pour; the
bag stays open, on the slot. Its lines take turns: "You eat a heartcap.",
"The heartcap tastes of earth.", "Warmth spreads through you." At full
health Eat shows dim; used, the heartcap stays, no turn passes and the line
says "You aren't hurt."
