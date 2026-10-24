# Built to grow, part 4 (D-299 to D-309)

Moved unchanged from `docs/DECISIONS.md` at 0.2.93 (D-310), when it would
have passed 12 KB: the first craft, the rat that flees and calms, the
heartcap, mushroom tones, things that grow back, eating a heartcap and the
healing potion. These are still in force unless marked superseded. Grep
for an ID or topic; never read this whole.

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

**D-309 · 2026-10-24 · The healing potion** (step H4, the owner's picks,
five of five recommended; builds D-303, D-308) Make turns 3 heartcaps into
1 Healing potion, a turn, like the flask (D-299): "You make a healing
potion.", or with 3 potions carried "You can't carry more potions.", free.
On heartcaps Make sits left of Eat, each dim on its own; Enter or Space
eats, C makes. A potion is drunk from the bag with Drink, healing 4 hearts,
never above full, a turn; its lines take turns: "You drink a healing
potion.", "The potion warms you through.", "Your wounds close." At full
health Drink shows dim and says "You aren't hurt." Its look: a round red
bottle under a cork, a pale glass neck (look A of three). It is only made,
never found.
