# Open questions

Only questions that are still undecided. When the owner answers one, record
a decision in `DECISIONS.md` that cites it, then delete the entry here.
IDs are never reused. Questions are ordered by when the build plan needs them.

Ask as multiple choice (D-018): options with a recommendation, more than
one pick where options combine, and the owner may always answer something
else entirely.

---

**Q-027 · Darkness outside, and the moon** (when outside places exist)
Each place sets its own darkness (D-063). Outside at night, remembered
tiles use the study's cold blue as moonlight (D-217). Should moon phases
make some nights darker than others? The owner isn't sure the moon will
be in the game. Each biome's darkness is asked when it arrives.

**Q-034 · Trees outside** (when outside places exist)
The owner's notes on the woods sketch from 0.2.3
(https://claude.ai/artifact/NNdk6rD2Cgg1FkNguoaKg4): the trees need
more work. A lantern's shadow should follow the tree's shape, not
darken its whole tile. Later: several kinds of tree, more variety, and
maybe trees swaying in the wind. One round tree a tile came first
(D-209). How many kinds, and does wind come with them?

**Q-035 · Weather, and shadows from the sun and moon** (when outside places exist)
The owner's ideas: different kinds of weather, and outside shadows that
follow the time of day, cast from where the sun (or the moon, see Q-027)
is in the sky. Which weather, what does it change, and do shadows move
with the hour?


**Q-037 · How regions are generated and joined** (stage 0.3)
Proposed in `WORLD.md`: two passes, the region's layout first, then each
room made to fit its ways in, each room with its own seed. Built for
depth 3 (D-201); the owner left the rest open until a second region. How do
regions join each other: grid edge to grid edge on the surface, and
stairs or cave mouths between the surface and the regions below?

**Q-038 · Kinds of room, shapes and sizes** (stage 0.3)
Which kinds (tunnel, clearing, house, marsh, desert…), how big each is,
and whether shapes come from hand-made templates, are generated, or both
(D-172). The owner mentioned "predefined tiles" for the shapes. Rooms
of other sizes line up their stairs by place on the floor (D-204). So far
the generated caves are 17 × 20 and the crypt rooms 11 × 13 (D-195).
Narrowed by D-223: each kind of place has its own rules, and deeper
floors become grids; which rules each kind has is still open. Burrow
floors are warrens (D-227), and from depth 8 dungeon halls (D-228).

**Q-039 · Swimming** (later)
How the hero learns to swim, where they may jump into water, what water
does to the lantern and oil, and how rivers and underground streams
carry them into rooms reached no other way (D-171).

**Q-040 · Light through openings** (when outside places exist)
The cave mouth is settled (D-218). Still open: daylight down stairs from
outside, how weather dims it, and how strong the glow from an unfound
lit room is (D-173).

**Q-048 · Should the room fill the screen sideways?** (after the 0.2.17 playtest)
The owner is weighing it. Sideways, the camera could show more tiles to
the left and right of the hero, or zoom in and scroll more. Either way a
player would see more, or differently, held sideways than upright.

**Q-045 · The starting region's name** (any time)
The owner liked "Gloamwood" but felt it may suit a later place. Other
ideas shown: Thornmere, The Greyhold. The owner may name it.

**Q-047 · A bestiary** (any time)
The owner wondered whether how to fight (walk into a rat to hit it,
D-109) belongs in a "Bestiary" rather than How to play (D-193). Is
there one, what is it called, where does it open, and what does it
show?

**Q-046 · Where do the earth burrows go?** (when the first cave gets its bottom)
D-165 makes depths from 6 down earth burrows, but the first cave now
ends at depth 5 (D-185). Do burrows move behind the portal, become the
bottom depths of the first cave, or wait for a later cave?

**Q-049 · When do creatures show their next move?** (with the second creature or later)
The owner liked creatures showing what they will do next, as in Hoplite
and Into the Breach (`RESEARCH.md`), but some situations may use it and
some won't. When and where does it show, and how does it look?

**Q-052 · Play data: kept on the device, or sent?** (near 1.0)
Telemetry sends how people play (falls, depths, journey length) to a
small service, with an opt-in switch in Settings and a privacy note.
Options: keep it on the device, with a dev button to save it as a file
for playtesters (Claude's pick for now); opt-in telemetry near release,
built on each turn's events (D-267); or never.

**Q-054 · May a name hold a space or digits?** (any time)
Names are A to Z only for now (D-272). A space would allow "OLD TOM",
digits "COCO2". The owner is unsure and wants it kept for later.

**Q-055 · The play-earned currency** (before the first unlock, D-280)
What it is called, how it is earned (depths, finds, deeds, gathering),
what it buys first (looks, unique things) and where it is spent.

**Q-056 · A region's name and difficulty on entering** (with a second
region, D-281) Whether the name shows on screen when you enter, with a
difficulty rating, and how the rating looks (stars, skulls, words).

**Q-057 · Achievements: tiers and rewards** (before the first
achievement, D-284) Which records get a set, the numbers of each tier,
what a reward is (perhaps the play-earned currency, Q-055, or a look)
and where achievements show (a Journal tab, a note on reaching one).
