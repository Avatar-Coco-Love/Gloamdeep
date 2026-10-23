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

**D-270 · 2026-10-23 · The Journal and its Records** (J1, owner's picks;
builds D-262) Journal is a line on the title, under New journey, and on
the pause menu, under Resume. Its page shows a tab row with its one tab,
Records, open; later tabs join the row. Records shows the deepest depth,
creatures beaten, falls and rooms found, counted from each turn's events
(D-267) on all the profile's journeys, from 0 for the counts. As for the
deepest depth, a journey with a dev jump doesn't count (D-232; Claude's
call, may change). Only Back can be picked for now.

**D-271 · 2026-10-23 · The slot screen** (P1, owner's picks; answers
Q-051) The game opens on the slot screen, Profiles: a framed box for each
of the 3 slots with the profile's name and "Deepest" and its depth, or
Empty (mock-up B). An unnamed profile shows as Profile 1, 2 or 3. Picking
a box plays as that profile and opens the title; an empty slot gets a
new, unnamed profile. Delete, then a box, asks "Delete …? Lost for
good." with Yes and No, No picked, and takes its journey too. A Profiles
line on the title, after Settings, opens the slot screen again, with
Back. The hero's look and play time in the box come later (the owner's
wish). Claude's words, may change: "Delete which?" while deleting, and
Cancel in place of Delete.

**D-272 · 2026-10-23 · The name pad, and changing a profile later** (P2,
owner's picks; answers Q-053; builds D-268) Picking an Empty box opens a
name pad, dark like the slot screen, drawn as the seed pad is (D-191):
the heading "Name your profile", the letters typed with a cursor, then
A to Z seven to a row, Del and OK. Keys are tapped, clicked, walked with
the arrows, or typed on a keyboard (letters and Backspace; the flame then
moves to OK). A name holds only the letters A to Z, up to 12, kept in
capitals; a space and digits wait (Q-054). OK makes the profile and opens
the title. Claude's calls, may change: OK with nothing typed makes it
unnamed (Profile 2), and Esc goes back to the slot screen with nothing
made. A profile's name and look may change later, from the slot screen
(a Rename line next to Delete; the look the same way once it exists).

**D-273 · 2026-10-23 · Rename** (P2b, owner's picks; builds D-272) The
slot screen has Rename above Delete, each on its own line, then Back.
Rename, then a profile's box, opens the name pad with the heading
"Rename profile" and its name already typed. OK keeps the new name and
goes back to the slot screen; OK with nothing typed makes it unnamed
again (Profile 1); Esc keeps the old name. An Empty box can't be renamed.
While picking, the heading asks "Rename which?" and Rename reads Cancel,
as Delete does. Claude's call, may change: a tap between two lines picks
the nearer one.

**D-274 · 2026-10-23 · Built to grow's first decisions are archived**
(owner's pick, as D-265) D-261 to D-269 moved unchanged to
`archive/DECISIONS-GROWING-1.md`. They stay in force.

**D-275 · 2026-10-23 · The cloak** (P3, owner's picks from a mock-up;
builds D-268) A profile's cloak comes in six colours, teal (the study's,
first), moss, heather, rust, indigo and sand, each four shades in
`src/core/looks.js`; ash, crimson, gold and violet are kept out, as they
fade into the crypt or look like enemies, the lantern or stairs. A new
profile picks its cloak after its name, on Choose a cloak: the six
heroes 2× on lit crypt floor, three to a row, the picked one framed in
gold, then OK and Back. OK makes the profile and opens the title; Back
returns to the name pad with the name kept. Look, between Rename and
Delete on the slot screen, then a box, opens the same screen on its
cloak; OK keeps the new one, Back or Esc the old. Profiles made before
wear teal; their look was already kept, so the save's shape needs no
upgrade. Claude's calls, may change: the heading words, "Change whose
look?" while picking, a new profile starting on teal, and Enter on a
hero moving the flame to OK.

**D-276 · 2026-10-23 · The eyes** (P4, owner's picks from a mock-up;
builds D-268) A profile's eyes come in six colours, bone (the study's,
first), ice, moss, sky, silver and brown, in `src/core/looks.js`;
pink-red, gold, violet and black are kept out, as they look like enemies,
the lantern or stairs, or vanish in the hood. A new profile picks its eyes
after its cloak, on Choose your eyes: the cloak screen's shape, each box
the hero's head at 4× in the cloak just picked. OK makes the profile; Back
returns to the cloak with both choices kept. Look opens the cloak, then
the eyes; OK on the eyes keeps both, and Esc there keeps the old look.
Profiles made before keep bone eyes. Claude's calls, may change: the
heading words, the cloak screen's heroes wearing the eyes picked, Back on
the eyes putting the flame on the cloak screen's OK, and Esc on a new
profile's eyes going back to the cloak.

**D-277 · 2026-10-23 · The lantern's trim** (P5, owner's picks from a
mock-up; builds D-268) The trim is the lantern's cap and base, the two
pixels that were brass; the black outline, the flame and its light stay
the same for everyone. Six trims, each a light cap and a dark base shade
in `src/core/looks.js`: brass (the study's, first), iron, copper, silver,
verdigris and blackened; gold, red and violet are kept out, as they look
like the flame, enemies or stairs, and bronze was left out. A new profile
picks its trim after its eyes, on Choose a trim: the cloak screen's shape,
each box the lantern hand close up in the cloak and eyes just picked. OK
makes the profile; Back returns to the eyes with the choices kept. Look
opens the cloak, the eyes, then the trim; OK on the trim keeps all three,
and Esc there keeps the old look. Profiles made before keep brass.
Claude's calls, may change: the shades, the heading words, the close-up
at 5×, the cloak screen's heroes carrying the trim picked, and Esc on a
new profile's trim going back to the eyes.

**D-278 · 2026-10-23 · The clothes** (P6, owner's picks from a mock-up;
builds D-268) The clothing type is the shape of what the hero wears; its
colours stay the cloak's. Four, in `src/core/looks.js`: Cloak (the study's,
hem to the floor, first), Belted (a belt at the waist, the trim's base
with its cap as the buckle), Short (to the knee, dark legs and boots
below) and Tattered (the hem torn into rags); Mantle and Strap were left
out. A new profile picks its clothes after its trim, on Choose your
clothes: the cloak screen's shape with its four heroes two to a row, in
the cloak, eyes and trim just picked. OK makes the profile; Back returns
to the trim. Look opens the cloak, eyes, trim, then clothes; OK on the
clothes keeps all four. Profiles made before wear the Cloak. Claude's
calls, may change: the pixels, the names, the heading words, the other
screens' heroes wearing the clothes picked, and a bite's flash keeping
their shape.
