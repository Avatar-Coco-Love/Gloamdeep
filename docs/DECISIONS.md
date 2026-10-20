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
31 to 33) are in `archive/DECISIONS-STAGE-0.2-1.md` (D-188).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---


**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. Steps of stage 0.3 are versioned 0.3.x. The step list
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

**D-177 · 2026-10-20 · A title screen and a pause menu** (owner's pick,
part of Q-044) The game opens on a title screen with its name and the
menu on it. During play a small pause menu offers Resume, Settings, How
to play and Back to title.

**D-178 · 2026-10-20 · The menu shows only what works** (owner's pick,
part of Q-044) A button appears only once its feature exists: Continue
with saving (step 37), Sound with sound. Nothing is shown greyed out.

**D-179 · 2026-10-20 · What Settings holds first** (owner's picks,
answers Q-025, part of Q-044) A Controls switch: tap and swipe, tap
only, or swipe only. A Motion switch: full or reduced, on top of the
device's own setting. A seed: random, or one typed in. How to play is
its own page of the controls for touch, mouse and keyboard.

**D-180 · 2026-10-20 · The menu comes after step 42** (owner's pick,
part of Q-044) The menu steps follow the starting region's design
(step 42), before the world steps from 43 on.

**D-181 · 2026-10-20 · The menu's look: the lantern in the dark**
(owner's pick, answers Q-044) Pitch black, the hero on crypt floor in
the lantern's dithered light, the name glowing warm above and a small
flame marking the chosen line. Drawn with the game's own tiles, sprites,
light and font, so it matches the game exactly, not the mock-up's
simplified copies. Picking themes, a changing or moving background and
a moving hero may come later.

**D-182 · 2026-10-20 · The starting region: 3 × 3, home in the centre**
(step 42, owner's picks, part of Q-036) The starting region is a 3 × 3
grid with all 9 cells used, every seed. The home base is in the centre
cell, every seed. Its name is still open (Q-045). Rule sheet:
`docs/regions/starting-region.md`.

**D-183 · 2026-10-20 · Mountains north, woods elsewhere** (step 42,
owner's pick, part of Q-036) The north row's 3 cells are mountain rooms;
the other 6 are woods, every seed.

**D-184 · 2026-10-20 · One cave, beside home; houses and ways out later**
(step 42, owner's picks, answers Q-036) One cave entrance for now, the
first cave's, in a side cell next to home (N, E, S or W from the seed),
with room for more caves later. No NPC houses yet, a slot kept for later.
Ways to other regions wait for the second region (Q-037).

**D-185 · 2026-10-20 · The first cave ends at 5 levels** (step 42,
owner's picks, answers Q-043) The first cave has a bottom: the 2 crypt
rooms and depths 3 to 5. The endless depths move behind a portal at the
bottom (D-019, D-032).

**D-186 · 2026-10-20 · How the title screen is built** (step 52, owner's
picks) Drawn on the game's own canvas as a second screen, picked with
arrows, Enter, Space, a tap or a click. The name is the pixel font at
double size, carved: gold, a dark outline, an ember edge underneath
(changed after seeing 5 looks: glow → carved). The wrench and the
lantern button stay hidden until the journey starts.

**D-187 · 2026-10-20 · How the pause menu works** (step 53, owner's
picks) A pause button with two bars, in the lantern button's style,
sits just left of it (under it when the buttons stand beside the
picture); Esc or P open the menu too, and close it again. The menu is
drawn over the room behind a dark veil, its lines centred, picked like
the title's. No turn passes while it is open. Back to title ends the
journey: New journey then starts a new world with a new random seed.

**D-188 · 2026-10-20 · The decision log makes room again** (step 53,
as D-151) D-159 to D-167 (steps 31 to 33) moved unchanged to
`archive/DECISIONS-STAGE-0.2-1.md`. They stay in force.

**D-189 · 2026-10-20 · How Settings and the Controls switch work**
(step 54, owner's picks) Settings joins the title (New journey,
Settings) and the pause menu (Resume, Settings, Back to title). It is
a page headed Settings with a line "Controls: Tap and swipe" and Back;
picking the line moves it on to Tap only, Swipe only and round again,
and Left or Right change it too. Back, Esc or P return to the menu it
came from. The choice is kept on this device; if the browser's storage
is blocked it starts on Tap and swipe. It changes only walking in
play: Tap only stops swipes; Swipe only stops taps toward a side and
held fingers, though a tap on the hero still waits. Menus always take
both, so no one is locked out.

**D-190 · 2026-10-20 · How the Motion switch works** (step 55, owner's
picks) Settings gains a second line under Controls: "Motion: Full" or
"Motion: Reduced", above Back. Picking it, Left or Right flip it.
Until it is picked it follows the device's own reduced-motion setting
and shows what that setting is; once picked, the pick wins and is kept
on this device. Reduced stills the same things the device setting
always did: the walking slide, the shake, flames, flicker and fades.

**D-191 · 2026-10-20 · How the seed is set** (step 56, owner's picks)
Settings gains "Seed: Random" under Motion, above Back. Picking it opens
a seed pad drawn in the game's style: the digits typed so far, keys 1 to
9 and 0, Del, Random and OK; tapped, clicked, walked with the arrows, or
typed with a keyboard's digits and Backspace (the flame then moves to
OK, so Enter keeps it). Up to 5 digits, 1 to 99999 (D-150). OK keeps the
typed seed, or Random if none is typed; Esc or P leave it unchanged. A
typed seed starts every New journey until set back to Random, and is
kept on this device. A journey under way goes on as it is. From the
pause menu a Random line names this journey's seed: "Seed: Random (this
one 4071)".

**D-192 · 2026-10-20 · Every room changes with the seed** (step 57,
owner's picks) A standing rule: every room takes something from the
seed. Some are hand-made with seeded parts, others wholly generated.
The two crypt rooms (depths 1 and 2) stay hand-made in shape; the seed
places their flask and rat, as generated rooms do (D-149): the flask at
least 5 steps from the start, the rat at least 3 tiles from the start
and every stairs, and the second room's rat within 2 tiles of its flask
(D-138). A fall's new seed places them afresh (extends D-136, D-148).

**D-193 · 2026-10-20 · How to play** (step 58, owner's picks) One page
per way of playing: Touch, Mouse and Keyboard, headed How to play, the
page's name between two arrows, then Back. Left, Right, a tap on an
arrow or picking the name flip the page; it opens on the way last used
(touch until something is pressed). It lists Walk, Wait, Lantern and
Pause; how to hit a rat waits for a bestiary (Q-047). Walking by touch
or mouse follows the Controls switch, so only what works is shown
(D-178, D-189). On the title it sits under New journey; on the pause
menu after Settings (D-177). Back, Esc or P return to the menu.
