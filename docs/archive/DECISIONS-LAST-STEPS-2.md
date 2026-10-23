# Stage 0.2's last steps, part 2 (D-247 to D-260)

Moved unchanged from `docs/DECISIONS.md` at 0.2.58 (D-265), when it
would have passed 12 KB: the bag and its flasks (steps 41a to 41a3), the
knife (41, 41b), Version history, the first four sounds and the title
without its deepest line. These are still in force unless marked
superseded. Grep for an ID or topic; never read this whole.

---

**D-247 · 2026-10-22 · The bag** (step 41a, owner's picks; answers
D-230, supersedes part of D-078) Walking onto an oil flask puts it in the
bag; flasks stack in one slot, with a count. The bag has 6 slots in one
row. A bag button sits left of the map button (under it sideways), and
I opens it too; it opens as a panel over the room's foot, the hero and
the strip still in view, and over the room's top when the hero stands
where it would hide them (Claude's fix, found while building). Tap a
flask, then Pour: pouring takes one turn, like a wait, and closes the
bag. The button (a cross while open), I, Esc or a tap outside close it,
and no turn passes. Pouring into a full lantern is allowed (D-078). A
fall keeps the bag for now; D-020's bag left where you fell is a later
step. Herbs stay as they are. Older saves start with an empty bag.

**D-248 · 2026-10-22 · The bag's next steps** (owner's picks) After 41a:
41a2, an Auto setting that pours a flask only when none would be wasted
(at 55% oil or lower); 41a3, a stack limit of 3, a flask over it staying
on the floor. The stash chest at home (D-021) comes later, with the home
base, and makes the limit matter.

**D-249 · 2026-10-22 · Flasks by themselves** (step 41a2, owner's picks;
builds D-248) Settings gains "Flasks: By hand" under Lantern, above
Back; picking it, Left or Right flip it to "By itself", kept on this
device. By itself, once a turn has passed with the oil at 55% or lower,
one flask from the bag pours, free, and the line says "You pour a
flask.", unless another line (an oil line aside) was said that turn. On
the title, a 6-line page lifts the hero and light one tile.

**D-250 · 2026-10-22 · A stack limit of 3** (step 41a3, owner's picks;
builds D-248) A stack in the bag holds at most 3 flasks. Walking onto a
flask over a full stack still takes the step, but the flask stays on the
floor: it never starts a second stack in a free slot. The line says
"You can't carry more flasks."

**D-251 · 2026-10-22 · The last steps' first decisions are archived**
(as D-236) D-234 to D-246 moved unchanged to
`archive/DECISIONS-LAST-STEPS-1.md` as this file passed 12 KB. They stay
in force.

**D-252 · 2026-10-22 · First gear: a knife** (step 41, owner's picks)
The first gear is a close weapon, a knife, hitting for 2 where the
lantern hits for 1 (D-110), on the same one tile. It lies in depth 2's
first room, the one with the stairs up, on a tile the seed picks by the
flask's rule (at least 5 steps from the stairs). Walking onto it puts it
in the hero's hand at once, a held slot apart from the bag, shown in the
bag panel above the six slots under "HELD"; the line says "You take the
knife." It is kept through a fall, and no knife lies there while the
hero holds one. For later (the owner's words): it will lie a little
deeper, in a chest; a second weapon, found with one held, goes into the
bag.

**D-253 · 2026-10-22 · The knife's stab** (owner's pick, builds D-252)
A hit with the knife held shows a quick jab: the hero darts half a tile
(8 pixels) toward the creature and back in 0.1 s, as well as the hit's
flash and shake (D-109). The lantern's swing has none. None with reduced
motion.

**D-254 · 2026-10-22 · Version history in Settings** (owner's picks)
Settings gets a line, Version history, above Back. It lists every
version from 0.0.1, newest first: its number and a short title taken
from its PR's title. Tapping one (or Enter, or Right) opens it: its date
and its changelog lines, word for word, without backticks; Left or a
second tap closes it. Swipes and Page Up and Page Down scroll a page.
Every PR adds its lines to `src/core/history-0.2.js` (the stage's file)
as well as to `CHANGELOG.md`; a test fails if the two differ. The pixel
font gains " × < > = # … and −. The page is dark of its own, and each
Settings line past 5 lifts the title's hero a tile (builds D-249).
Checked at 0.2.52: PRs #1 to #89 are versions 0.0.1 to 0.2.51, one
each, with no gaps or repeats; only the build plan's step numbers jump.

**D-255 · 2026-10-23 · The first sound: a footstep** (owner's picks)
The game's first sound is a soft, light footstep each time the hero
walks a tile, made in code with Web Audio. No two steps sound alike
(changed after the playtest: a low thump dropped, half as loud, and
each step's pitch and loudness vary, where before two took turns).
Settings gets "Sound: Off", above Version history (D-178): On or Off,
kept on this device. Off until picked, while the sounds get player
ready (changed after the playtest: On → Off). A browser plays nothing
before the first tap, click or key.

**D-256 · 2026-10-23 · A sound board for new sounds** (owner's wish)
Every PR that adds or changes a sound also publishes a private sound
board: a page with one button per game sound, built with
`node tools/soundboard.js <scratchpad>/sounds.html` from the game's own
sound code. Its link goes in the chat, the PR body and the log entry,
republished to the same link each time.

**D-257 · 2026-10-23 · The lantern's tick** (owner's picks)
The second sound: a soft, low "tok" each time the lantern goes on or
off, a little higher for on (1200 Hz) and lower for off (850 Hz), about
as loud as the footstep (D-255). It plays at every switch: by hand (the
button or L) and By itself at the daylight's edge (D-210). Picked from a
preview of three; the first pick, higher and louder, was too loud and
sharp, so three softer ones followed and the owner took the middle one.

**D-258 · 2026-10-23 · The hit's sound** (owner's picks)
The third sound: each time the hero hits a creature, a soft, low "dmp",
a falling tone (110 to 60 Hz) under muffled noise, quieter than the
footstep's peak. With the knife held (D-252), a small tick like the
lantern's (D-257) rides on top. Each hit varies a little, pitch by up
to a tenth and loudness from 70% to full, like the steps (D-255).
Picked from four moments (hit, bite, pour, pick up), then from three
hits: the softer one.

**D-259 · 2026-10-23 · A rat's bite** (owner's picks)
The fourth sound: when a rat bites the hero, two low, dry snaps of
teeth (700 Hz, 0.04 s apart) and a hint of breath. Hit and bitten in
one turn, the bite comes 0.18 s after the hit (D-258). Each bite varies
like the hit. The sound is the creature's own, in the registry: the
gloamling's bite is silent until it gets one. Picked over the first
three bites ("not very natural or rat-like"), three rat-like ones, then
four variations on the teeth: the lower, drier one.

**D-260 · 2026-10-23 · No deepest line on the title** (the owner's
wish; supersedes D-232 in part) The "Deepest: depth N" line under the
title menu, and its spoken words, are gone. The deepest depth is still
kept on the device, as before, for a stats page later.
