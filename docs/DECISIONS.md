# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force; grep there for an ID or
topic. **D-001 to D-038** (pre-production) are in
`archive/DECISIONS-PREPRODUCTION.md` (D-041). **D-039 to D-052**
(steps 7 to 11) and **D-070 to D-076** (the docs audit) are in
`archive/DECISIONS-FOUNDATION-1.md` (D-083).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-053 · 2026-10-18 · Blended shadow edges** (step 12, the D-009 fix)
Option C from the side-by-side picture: light is still checked in 4 × 4
pixel cells, but each pixel mixes the four nearest cells, so a shadow
edge fades into the dithered bands over one cell. The bands stay as in
the study.

**D-054 · 2026-10-18 · Outside the light is almost black** (step 12)
Until fog of war (step 13), tiles the lantern doesn't reach get the
study's "never seen" darkness.

**D-056 · 2026-10-18 · The lantern in hand, with flicker** (step 12, ends
D-042's "lantern later")
The study's lantern pixels go back on the hero, and its flame is the
light's centre, with a bright core drawn over the darkness. The light
flickers by about ±3.5%, not at all with reduced motion.

**D-057 · 2026-10-18 · Dev switch: lighting off** (step 12, builds on D-047)
The wrench panel has a "Lighting off" switch, off at first, that shows
the whole room unlit. It is a dev tool, not the lantern switch (D-026).

**D-058 · 2026-10-18 · Walls are lit as whole tiles** (step 12, playtest)
The study's rule lit wall blocks one by one, so long walls seen at a
slant showed dark teeth. Now each wall block aims its ray at the wall
tile's point nearest the lantern, so a seen wall is lit as a whole tile,
still fading with distance. Floor shadows don't change.

**D-059 · 2026-10-18 · When a tile counts as seen** (step 13, ends D-054)
The study's rule, picked from a side-by-side picture: a tile is
remembered once the lantern's light reaches its centre, inside 95% of
the light's reach. It is checked when the hero stands still on a tile.
The memory is part of the game state, one mark per tile.

**D-060 · 2026-10-18 · Remembered tiles fade at the edge** (step 13)
*Partly superseded by D-063 (2026-10-18): the colours. The fading edge stays.*
Remembered tiles get the study's cold blue (0.15, 0.16, 0.26), and never
seen ones stay almost black. Where they meet, the blue fades into black
over 4 pixels in the dither pattern, like the shadow edges (D-053).

**D-061 · 2026-10-18 · Dev: Reveal room and Forget** (step 13, builds on
D-047)
The wrench panel gets a "Reveal room" switch, off at first, that shows
every tile as remembered while it is on, and keeps the real memory. A
"Forget" button wipes the memory.

**D-062 · 2026-10-18 · Reset room forgets too** (step 13, builds on D-050)
The dev "Reset room" button also gives a blank memory, as if you had
just arrived.

**D-063 · 2026-10-18 · Each place sets its darkness** (step 13, playtest;
supersedes the colours in D-060)
The owner found the fog too bright and its blue too much like
moonlight. Each place now sets how dark never-seen tiles are and how
remembered tiles look. The first room is a cave with no lights:
never-seen is pitch black, and remembered tiles get a neutral grey at
half the study's strength (0.095), picked from a picture. Other places
get their values when they arrive (Q-027).

**D-064 · 2026-10-18 · Oil amounts: the study's** (step 14, supersedes
D-055, sets D-037's amounts)
*Partly superseded by D-068 (2026-10-18): the burn per turn.*
The tank starts three quarters full, and each passed turn burns 2.5% of
a full tank (40 turns from full to empty). The light reaches 1.6 tiles
plus 3.6 per full tank (5.2 when full), and an empty lantern is an
ember reaching 0.9 tiles. Bumping a wall passes no turn, so burns none.

**D-065 · 2026-10-18 · The oil bar** (step 14)
The study's 10 amber segments, drawn in pixels in the top right corner
of the game screen, always bright. A segment is lit while the oil is
above its share. Short oil messages come later (Q-028).

**D-066 · 2026-10-18 · Dev: Refill oil and Empty oil** (step 14, builds
on D-047)
Two wrench panel buttons give a full or an empty tank, with no turn
passed. "Reset room" leaves the oil as it is.

**D-067 · 2026-10-18 · The flask is its own step** (step 14, D-018)
Draining oil is a new rule and the flask is the first item, a new kind
in the registry, so they come in two steps: oil now, the flask next.

**D-069 · 2026-10-18 · A full tank lasts 60 turns** (step 14, playtest;
supersedes D-068)
80 turns felt too long, so the owner picked the middle: each passed
turn burns 1/60 of a full tank. The starting three quarters last 45.

**D-077 · 2026-10-18 · The oil flask, the first item** (step 15, D-067)
Items get their own registry file (`items.js`). The flask is the
study's sprite on a shadow, bobbing 1 pixel every 0.7 s.

**D-078 · 2026-10-18 · A flask gives 45% of a tank** (step 15)
The study's amount. Walking onto a flask burns the step, then pours it
in and it is gone, even with a full lantern (the extra is lost).

**D-079 · 2026-10-18 · Flasks come from the dev spawn list** (step 15,
builds on D-049)
"Oil flask" joins the list: on floor only, never on the hero or another
item, and no wall over it. The room starts with none; "Reset room"
clears them. The coordinates readout names an item on the pointed tile.

**D-080 · 2026-10-18 · The lantern switch: a button and L** (step 16,
builds on D-015)
A 44 px button with the hero's lantern pixels sits next to the oil bar,
just outside the game picture (above it on a tall screen, beside it on a
wide one, just under it when neither fits). A tap or click switches the
lantern, and so does the L key. Its flame is lit when on and dark when off.

**D-081 · 2026-10-18 · Switching is free** (step 16)
Switching on or off passes no turn and burns no oil. To look at again
when enemies arrive. Steps with the lantern off still pass turns, but
burn no oil (D-026, D-037); a flask still pours in.

**D-082 · 2026-10-18 · Off is pitch dark, memory only** (step 16)
No light at all and no bright flame core. Remembered tiles keep their dim
grey, and the hero shows only as dimly as the tile under them, so on
never-seen tiles they can't be seen at all. Nothing new is remembered
until the lantern is back on. (Tried after the playtest and dropped: a
faint outline of the hero at 22%, then 8%. It didn't work.)

**D-083 · 2026-10-18 · The decision log makes room** (step 16, as D-041)
D-039 to D-052 (steps 7 to 11) and D-070 to D-076 (the docs audit, which
`CLAUDE.md` repeats) moved unchanged to
`archive/DECISIONS-FOUNDATION-1.md`. They stay in force.

**D-084 · 2026-10-18 · Waiting a turn** (step 17, answers Q-029)
The hero can stand still for one turn. A wait passes a turn like a step:
oil burns while the lantern is lit, and none while it is off (D-037,
D-081). Nothing new is drawn for it; only the oil bar shows it.

**D-085 · 2026-10-18 · How to wait** (step 17)
A tap or click on the hero's own tile waits one turn; a finger held on
the hero does nothing. On a keyboard, Space waits, and holding it keeps
waiting, the way held arrows keep walking; one wait can queue behind a
step (D-043). Space on a focused button still presses that button.

**D-086 · 2026-10-18 · Dev tools are on for everyone** (0.1.13,
supersedes D-030 and parts of D-045 and D-047)
The wrench and the stats line show on every build, for every player:
GitHub Pages, playtests and local. No `?dev`, and `?dev=off` does nothing.
The switches are still remembered per browser. Clutter on screen is fine
when it helps make the game better.

**D-087 · 2026-10-18 · The dev panel folds into sections** (0.1.13)
View, Spawn, Room, Oil and Share, each a heading that folds open or
shut; the browser remembers which are open, and only View is open at
first. Switches are buttons, lit when on, and buttons sit two to a row.
A new tool adds a section (`src/dev/panel.js`).

**D-088 · 2026-10-18 · A live stats line** (0.1.13, supersedes part of
D-046)
The bottom-left readout always shows the turn, the oil in %, lit or
dark, and the hero's tile. A second line shows the spawn pick and, with
Coords on, the pointed tile. It grows as enemies and floors arrive.

**D-089 · 2026-10-18 · Spawn chips by kind** (0.1.13, supersedes part
of D-049)
Each registry entry is a chip, grouped under its kind (tiles, items,
later enemies and NPCs). Tap a chip to pick it, tap it again to drop
the pick. There is no None entry.

**D-090 · 2026-10-18 · Dev keys on a PC** (0.1.13, supersedes part of
D-045)
` opens or shuts the panel; G, C and R switch Grid, Coords and Reveal.
The key shows on each switch.

**D-091 · 2026-10-18 · Set oil to any amount** (0.1.13, builds on D-066)
The Oil section has a slider from 0 to 100% beside Refill and Empty. It
follows the real oil and passes no turn.

**D-092 · 2026-10-18 · Main syncs itself at the start** (0.1.13, builds
on D-070)
A start-up hook (`.claude/settings.json`) fetches `main` and
fast-forwards it when a conversation starts, so the stale-copy notice
stops. It never discards work.
