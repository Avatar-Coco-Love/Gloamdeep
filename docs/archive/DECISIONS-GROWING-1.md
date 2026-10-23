# Built to grow, part 1 (D-261 to D-269)

Moved unchanged from `docs/DECISIONS.md` at 0.2.66 (D-274), when it
would have passed 12 KB: built to grow with ideas from other games, the
Journal's plan, the glossary, old saves upgraded, each turn's events,
profiles and creatures' ways (steps G1 to G4). These are still in force
unless marked superseded. Grep for an ID or topic; never read this whole.

**D-261 · 2026-10-23 · Built to grow, with ideas from other games**
(the owner's wish) The game may become vast: many enemies, bosses,
quests, features and mechanics, and a sprawling, living world. So
everything is built to be added to without rework, and Claude brings
recommendations from successful games along the way, on how things
work, are organised and are named, as options for the owner to pick.

**D-262 · 2026-10-23 · One Journal, Records first** (owner's picks)
Stats, and later quests, a bestiary and achievements, live in one
Journal with tabs, like Hades' Codex or Hollow Knight's Hunter's
Journal. The first tab is Records, facts about how you've played, the
deepest depth first (D-260). The other tabs, their names and where the
Journal opens from come later.

**D-263 · 2026-10-23 · Groundwork before the Journal** (owner's picks;
order proposed by Claude, may change) Four small steps that change
nothing on screen come first: G1 old saves are upgraded to the new
shape instead of dropped (changes D-238's last sentence once built);
G2 each turn writes a short list of what happened (events), which
sounds, Records, quests and feats read; G3 one profile save for what
lasts across journeys (Records, later feats and unlocks), apart from
the journey save; G4 creatures' behaviours (chases, shuns light) as
data in the registry. Then J1, the Journal with its Records tab.

**D-264 · 2026-10-23 · A glossary** (owner's pick) `docs/GLOSSARY.md`
lists the game's words, what each means and its decision, so names
stay the same as the world grows. A new word goes there when decided.

**D-265 · 2026-10-23 · The last steps' later decisions are archived**
(as D-251) D-247 to D-260 moved unchanged to
`archive/DECISIONS-LAST-STEPS-2.md`. They stay in force.

**D-266 · 2026-10-23 · Old saves are upgraded** (G1, owner's picks;
answers D-263's G1, supersedes D-238's last sentence) Each save carries
a format number. When the save's shape changes, the number goes up by
one and a small numbered step is added, from the old shape to the new
(as Minecraft and Factorio upgrade old worlds). Loading runs every step
from the save's number up to today's. A save no step can bring up,
broken or from a newer version of the game, is still dropped quietly.

**D-267 · 2026-10-23 · Each turn's events** (G2, owner's picks; answers
D-263's G2) The turn's list of what happened lives on the game state,
`state.events`, as roguelikes such as Brogue and Caves of Qud pass news
between their parts. Each passed turn, and each free switch of the
lantern, starts a new list; what follows in the same action (the lantern
or a flask by itself) adds to it. From the start it holds what sounds,
Records, and items and torches need: step, hit, beat, bite, fall,
lantern, enter, found, level, take, eat, pour, torch
(`src/core/events.js`). The sounds play from it now, as before; nothing
else reads it yet. The save's format goes to 3 (D-266).

**D-268 · 2026-10-23 · Profiles, one for each person** (G3, owner's
picks; answers D-263's G3) A device keeps up to 3 profiles, in slots, as
Hollow Knight and Celeste keep save files. Each profile has a name
(typed, up to 12 letters), a look, its Records, and its own journey,
saved apart from the small list of profiles, so a turn rewrites only
the journey in play. Settings and dev switches stay with the device.
G3 builds this with nothing on screen: the first slot is used, unnamed,
and keeps the journey and deepest depth already saved. Later steps, one
at a time: a screen to pick, start and delete profiles; the name; then
the look: the cloak's colour, the eyes' colour, the lantern's trim (its
light stays the same for everyone) and the clothing type. The colours
come from sets that fit the palette, shown as a mock-up first.

**D-269 · 2026-10-23 · Creatures' ways as data** (G4, owner's pick from
three; answers D-263's G4) A creature's registry entry names its ways,
as Caves of Qud builds creatures from parts: the rat `['chases']`, the
gloamling `['chases', 'shunsLight']`. `src/core/behaviours.js` holds what
each way means as data (how it notices the hero, whether it moves toward
them, steps into light, bites while lit, what it does when lit); the
turn rules read only that, and a later way in the list wins. A new
creature mixes ways by name. Nothing changes in play.
