# Open questions

Only questions that are still undecided. When the owner answers one, record
a decision in `DECISIONS.md` that cites it, then delete the entry here.
IDs are never reused. Questions are ordered by when the build plan needs them.

Ask as multiple choice (D-018): options with a recommendation, more than
one pick where options combine, and the owner may always answer something
else entirely.

---

**Q-026 · Walking around walls to a held finger** (pathfinding, later)
A held finger now steps straight toward the finger and bumps any wall in
the way (D-044). Should the hero find a way around walls to reach it,
like style study 1 did for a tapped tile? Should a tap do the same, and
should the walk stop when something comes into view? When in the build
plan?

**Q-027 · Darkness outside, and the moon** (when outside places exist)
Each place sets its own darkness (D-063). The owner sees the study's cold
blue as moonlight. Should outside at night use it? Should moon phases
make some nights darker than others? The owner isn't sure the moon will
be in the game. Each biome's darkness is asked when it arrives.

**Q-034 · Trees outside** (when outside places exist)
The owner's notes on the woods sketch from 0.2.3
(https://claude.ai/artifact/NNdk6rD2Cgg1FkNguoaKg4): the trees need
more work. A lantern's shadow should follow the tree's shape, not
darken its whole tile. Later: several kinds of tree, more variety, and
maybe trees swaying in the wind. How should trees look, how many kinds,
and does wind come with them?

**Q-035 · Weather, and shadows from the sun and moon** (when outside places exist)
The owner's ideas: different kinds of weather, and outside shadows that
follow the time of day, cast from where the sun (or the moon, see Q-027)
is in the sky. Which weather, what does it change, and do shadows move
with the hour?


**Q-037 · How regions are generated and joined** (stage 0.3)
Proposed in `WORLD.md`: two passes, the region's layout first, then each
room made to fit its ways in, each room with its own seed. How do
regions join each other: grid edge to grid edge on the surface, and
stairs or cave mouths between the surface and the regions below?

**Q-038 · Kinds of room, shapes and sizes** (stage 0.3)
Which kinds (tunnel, clearing, house, marsh, desert…), how big each is,
and whether shapes come from hand-made templates, are generated, or both
(D-172). The owner mentioned "predefined tiles" for the shapes.

**Q-039 · Swimming** (later)
How the hero learns to swim, where they may jump into water, what water
does to the lantern and oil, and how rivers and underground streams
carry them into rooms reached no other way (D-171).

**Q-040 · Light through openings** (when outside places exist)
How far daylight reaches in through a cave mouth or stairs, its colour
by hour, how weather dims it, and how strong the glow from an unfound
lit room is (D-173).

**Q-041 · How dim the stairs are** (a small step)
How far the dimmer glow reaches, and whether all stairs change or only
those in generated places, the crypt's too (D-174).

**Q-042 · The map screen** (stage 0.3)
How it opens (button, key), what it shows (rooms as boxes, or every
tile seen), markers or names, and whether dev map mode is the same
screen with everything revealed (D-176).

**Q-045 · The starting region's name** (any time)
The owner liked "Gloamwood" but felt it may suit a later place. Other
ideas shown: Thornmere, The Greyhold. The owner may name it.

**Q-046 · Where do the earth burrows go?** (when the first cave gets its bottom)
D-165 makes depths from 6 down earth burrows, but the first cave now
ends at depth 5 (D-185). Do burrows move behind the portal, become the
bottom depths of the first cave, or wait for a later cave?
