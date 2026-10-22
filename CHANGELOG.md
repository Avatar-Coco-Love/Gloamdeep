# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump.

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.43 (2026-10-22)
- A second creature, the gloamling: a small shadow with pink eyes that
  shuns light. It won't step into any light, backs away when light
  reaches it, and doesn't bite while lit, so it only gets you when the
  lantern is off or down to an ember.
- Two rooms on each warren floor (depths 5 to 7) hold one, in place of
  their second rat. It can be spawned in dev mode.
- Decisions: D-240, D-241, D-242.

## 0.2.42 (2026-10-22)
- Saving: the journey is kept on this device after every turn. Continue
  appears first on the title once a journey is saved, and picks it up
  where it was, even after closing the page.
- Back to title keeps the journey. New journey asks "Start over? The
  saved journey is lost." first, with No picked.
- Decisions: D-238, D-239 (supersedes the last part of D-187).

## 0.2.41 (2026-10-22)
- A proper fall: at 0 health the hero lies down where they fell, the
  light closes to the deepest dark, then opens where they wake. With
  reduced motion, only a moment of dark.
- `src/main.js` is split in three: the screens and the drawing each have
  their own file. The game plays the same.
- Decisions D-219 to D-233 moved to `archive/DECISIONS-DEEPER.md`, and
  the Stage label in `PROGRESS.md` now says stage 0.2's last steps.
- Decisions: D-234 to D-237.

## 0.2.40 (2026-10-21)
- The map and the Seed Explorer name each floor's area beside its depth:
  "DEPTH 9 · DUNGEON", with Crypt, Cave and Warren above it. The surface
  stays SURFACE.
- Walls on the map take their area's colour: crypt brick, cave grey,
  warren brown, dungeon blue, woods green. The area's name in the heading
  is in the same colour.
- Decisions: D-233.

## 0.2.39 (2026-10-21)
- The game remembers the deepest depth the hero has walked to, on this
  device, across journeys. The title screen shows it in grey under the
  menu ("Deepest: depth 7") once the hero has gone below the surface.
- A dev Go to depth jump stops the journey counting until a New journey.
- Decisions: D-232.

## 0.2.38 (2026-10-21)
- Deeper floors hold more rats: from depth 5 down every room has two, one
  guarding the flask and one anywhere in the dark. Depths 2 to 4 keep one
  a room. Everything else in a seed's rooms stays where it was.
- New `docs/RESEARCH.md`: the owner's wish list, and what Hoplite and
  similar games do well, with the ideas the owner wants kept for later.
- An inventory step is planned just before first gear (step 41).
- Decisions: D-230, D-231. Questions opened: Q-049.

## 0.2.37 (2026-10-21)
- The dungeon (depth 8 down) now has its own look: the crypt's bricks and
  slabs in deeper, colder, bluer colours, as in option B of the step 59b
  mock-up. The stairs keep their colours. The crypt at the top is unchanged.
- Decisions: D-229.

## 0.2.36 (2026-10-21)
- A new kind of place, the dungeon, from depth 8 down: six rooms in a
  3 × 3 grid, grown like the warren with one extra doorway, so one way
  round makes a loop. The stairs down are in the room farthest away.
- Each dungeon room is 3 or 4 straight-walled halls joined by one-tile
  corridors that turn once, in the crypt's bricks. Earth warrens now stop
  at depth 7.
- Decisions: D-228. Questions narrowed: Q-038.

## 0.2.35 (2026-10-21)
- From depth 5 down, each earth burrow floor is now a warren: five rooms
  in a 3 × 3 grid, grown as a winding chain with dead ends and one way
  through. The stairs down are in the room farthest from the stairs up.
  Depths 2 to 4 are unchanged, and every seed keeps its rooms there.
- Decisions: D-227 (supersedes part of D-203).

## 0.2.34 (2026-10-21)
- A rat in light now notices you only if it has a clear straight line to
  you, with no wall between. A torchlit rat behind a wall stays put.
  Distance still doesn't matter, and a bite or a hit still makes it notice.
- Decisions: D-226 (supersedes part of D-126).

## 0.2.33 (2026-10-21)
- In the game, a thin pale blue line marks each doorway, across its outer
  edge where you step through to the next room, the cave mouth too. It
  pulses gently, and holds still with reduced motion. It shows once the
  doorway's tile has been seen, so it stays in memory's dim light.
- Decisions: D-225 (built).

## 0.2.32 (2026-10-21)
- On the map screens, in the game and the Seed Explorer, rooms side by
  side are drawn one tile apart, with a dark seam between them, so each
  room shows as its own.
- A pale blue line bridges each doorway the hero has found, and the cave
  mouth between the woods and the crypt. Reveal map shows them all.
- Decisions: D-224, D-225.

## 0.2.31 (2026-10-21)
- Hold a finger or the mouse button on a tile you remember and the hero
  walks there around walls, about 4 steps a second. A small amber frame
  marks the tile; slide to move it, lift to stop.
- When a creature or an item comes into view, the hero stops and a "!"
  shows over them. Lift and hold again to go on. Taking stairs stops the
  walk too.
- Held on a dark tile, or one no remembered way leads to, the hero steps
  straight toward it, as before.
- The map joins the woods and the crypt at the cave mouth, as the Seed
  Explorer does, once you have been in both.
- Decisions: D-220, D-221 (the surface decisions move to the archive),
  D-222, D-223 (deeper floors as grids, next). Q-038 narrowed.

## 0.2.30 (2026-10-21)
- Daylight comes in through the cave mouth: in the crypt room the mouth
  leads to, the gap in the wall lets in a pale light that reaches about 3
  tiles, like a torch. Tiles it reaches are remembered, and a creature
  standing in it can see you.
- It follows the time of day: through dusk it shrinks and warms to
  orange, at night it is gone, and at dawn it comes back the same way.
- Decisions: D-218, D-219. Questions closed: Q-026. Q-040 narrowed.

## 0.2.29 (2026-10-21)
- Day and night pass outside with your turns: a day is 300 turns, 170 of
  full day, a 30-turn dusk, 70 of night and a 30-turn dawn. The clock
  keeps running below ground too.
- At night the woods are dark like a cave: you see what your lantern
  lights, and tiles already seen stay in a dim moonlit blue. Dusk and
  dawn fade the light slowly. No clock on screen, only the light.
- The lantern set to By itself lights as dusk falls and goes out as dawn
  comes.
- Dev: the Room tab gets TIME, +10 and +50, which move the clock only;
  the status line shows the turn of the day.
- Decisions: D-217.

## 0.2.28 (2026-10-21)
- Step E2, the whole surface in the Seed Explorer (D-214): its surface
  map shows the woods and the crypt together, joined where the cave
  mouth meets the gap in the crypt wall.
- The game's own map still shows only the part you're in (D-213).
- Decisions: D-216.

## 0.2.27 (2026-10-21)
- Step E1, the Seed Explorer (D-214): a new last line on the title menu
  opens the map of a seed, every floor in full, with no hero.
- A bar at the bottom of the map shows the seed, with Back, Type and
  Reseed; R, T and B do the same on a keyboard. Floors turn as on the map.
- It opens on the seed typed in Settings, else a random one, on the
  surface (the crypt rooms for now), and never changes Settings.
- Decisions: D-215.

## 0.2.26 (2026-10-21)
- Step 49b, depths move up one (D-212): the two crypt rooms are depth 0
  and the strip says SURFACE there, the second room is depth 1, the grey
  rock grids depths 2 to 4, and earth burrows start at depth 5.
- A seed keeps its rooms: each place keeps the numbers of its old depth.
- The surface map shows the part you're in: the woods, or the crypt.
- Dev: Go to depth goes from 0 (the crypt); Go outside still leads to the woods.
- D-201 to D-208 moved to `docs/archive/DECISIONS-REGION.md`.
- Planned next: a Seed Explorer on the title menu (D-214).
- Decisions: D-213, D-214.

## 0.2.25 (2026-10-20)
- The woods now has a cave mouth: a dark opening between two grey rocks
  on one edge, with worn earth in front. The seed picks the edge and the
  spot along it.
- Walk through it and you arrive on the crypt's facing side, through a
  new gap in its wall: going up, the bottom of the south room; going
  down, left or right, the first room. Walk back out and you are on the
  mouth again. A new journey still starts in the crypt.
- Decisions: D-211, D-212 (for step 49b).

## 0.2.24 (2026-10-20)
- Settings gains "Lantern: By hand" under Seed. Picked, or Left and Right,
  it flips to "By itself": the lantern then goes out as you step into
  daylight and lights again as you go back into the dark.
- It switches only at that moment, so switching it yourself in between
  holds. Like the switch, it costs no turn and no oil. By hand until picked.
- Decisions: D-210. Questions closed: Q-049.

## 0.2.23 (2026-10-20)
- The first outside room: woods, 17 × 20, made from the seed. Trees stand
  thick at the edges and thinner inside; they block the way and the view.
- One round tree a tile, each with its own crown, trunk and shadow.
- Plain daylight: the whole room is lit and remembered; the lantern isn't
  needed, but burns oil as before while lit. The strip says SURFACE.
- For now the dev drawer's Room section has Go outside; the cave mouth
  comes next (step 49). The map shows the woods as the surface.
- Decisions: D-209. Questions opened: Q-049.

## 0.2.22 (2026-10-20)
- The map turns between floors: arrows beside "DEPTH 3", < and >, or
  Page Up and Page Down show the floor above or below. The hero stays put.
- Floors never seen are skipped; an arrow greys out when nothing seen
  lies that way. Dev Reveal map turns through every floor from 1 to 99.
- Tapping stairs found on the map turns it to the floor they lead to,
  centred on the matching stairs. The hero's dot shows on their own floor only.
- D-194 to D-200 moved to `docs/archive/DECISIONS-GETTING-AROUND.md`.
- Decisions: D-207, D-208.

## 0.2.21 (2026-10-20)
- A map: the new map button (left of pause) or the M key shows the
  floor you are on, in a box over the darkened room. Each room is drawn
  small from the tiles your lantern has reached; rooms you haven't seen
  stay dark. Your spot blinks gold, stairs you've found are violet, and
  the depth is written at the top. Drag or use the arrows to scroll;
  pinch or the mouse wheel to zoom. The map button becomes a cross that
  closes it; M, Esc or a tap outside the box close it too. No turn passes.
- Dev tools: a Reveal map switch shows every room of the floor in full.
- Written down for the next step: the map will turn between floors.
- Decisions: D-205, D-206. Questions closed: Q-042.

## 0.2.20 (2026-10-20)
- The stairs line up between floors: the stairs up on a floor are at
  the same spot, in the same room of the grid, as the stairs down on the
  floor above. Each cave room is carved to fit.
- Depths 4 and 5 are now three rooms in an L too, like depth 3. On all
  three, the stairs down are in a different room from the stairs up, so
  you go through an opening to get deeper. The torch stays by the
  stairs up.
- Depth 6 and deeper are still one room each, lined up the same way.
- Written down for later: stairs line up by their place on the floor,
  so rooms of different sizes and shapes can still match.
- Decisions: D-203, D-204.

## 0.2.19 (2026-10-20)
- Depth 3 is now three cave rooms instead of one: a 2 × 2 grid with one
  corner left empty by the seed, so the rooms make an L. The corner room
  joins the other two through a one-tile gap in the shared edge; walk
  out through it and you come in at the same spot in the next room.
  The rock is drawn open right up to the edge there, so the gap shows.
- The seed picks which of the three holds the stairs up and down and the
  torch. The other two each hold a flask, a rat and a herb, in the dark.
- Depths 4 and 5 stay one room each, and every other depth is as before.
- Decisions: D-201, D-202.

## 0.2.18 (2026-10-20)
- The dev tools are now a drawer that slides out from the left edge,
  from under the wrench down to the stats line. The sections (View,
  Spawn, Room, Oil, Hero, Share) are stacked down its left side, and the
  open one's tools sit beside them. Tap the open section again and the
  drawer narrows to just its tabs.
- All dev words, the stats line too, are in the game's pixel font. The
  font gains +, % and a middle dot.
- Decisions: D-200.

## 0.2.17 (2026-10-20)
- A phone held sideways (or a wide PC window): the hearts, depth and oil
  stand in a column at the room's left, so the room can grow. The wrench
  sits at the top left, pause at the top right, and the lantern at the
  bottom right, under your thumb. Upright, nothing changes.
- Sideways, the dev panel and the stats line keep to the space left of
  the room and never cover it; the panel ends above the stats line and
  scrolls instead of running off the screen.
- Decisions: D-199. New question: Q-048 (the room filling the screen).

## 0.2.16 (2026-10-20)
- Side openings: the gap in the first room's bottom wall is now a
  doorway. Step out through it into a new crypt room to the south, and
  back the same way. The seed places its flask and rat.
- The hearts, depth and oil now sit in a strip just above the room, so
  they no longer cover it. Above them, one row holds the dev wrench on
  the left and pause and the lantern on the right. On a wide screen the
  buttons stand beside the picture when that makes it bigger.
- The main menu decisions, and the 0.1.26 and 0.1.27 changelog entries,
  moved to archive files.
- Decisions: D-196 to D-198.

## 0.2.15 (2026-10-20)
- The camera: the caves from depth 3 down are now about 1.5 screens
  (17 × 20 tiles), and the view glides along with the hero, keeping them
  in the middle and stopping at the cave's edges. The crypt rooms at the
  top stay one screen and don't move.
- Dev: the grid and pointed tile move with the camera.
- Decisions: D-195.

## 0.2.14 (2026-10-20)
- Stairs must be found: their violet glow stays hidden until your
  lantern has reached them once. Found, it glows half as bright as
  before, on the stairs and just beside them. A hidden glow wakes no rat.
- Decisions: D-194. Questions closed: Q-041.

## 0.2.13 (2026-10-20)
- How to play joins the title (under New journey) and the pause menu
  (after Settings): a page each for Touch, Mouse and Keyboard showing
  how to walk, wait, switch the lantern and pause. Left and Right flip
  the page; it opens on the way you last played.
- Decisions: D-193. Questions opened: Q-047.

## 0.2.12 (2026-10-20)
- The first two rooms now change with the seed: their shape stays, but
  the flask and the rat start in different places each world, and again
  after a fall. A new rule: every room takes something from the seed.
- Decisions: D-192.

## 0.2.11 (2026-10-20)
- Settings has a Seed line under Motion. Pick it to open a number pad
  drawn in the game's style (tap, arrows, or a keyboard's digits): type
  up to 5 digits and OK, or Random. A typed seed starts every New
  journey until set back to Random, so a world can be replayed. From
  the pause menu, Random shows this journey's seed.
- Decisions: D-191.

## 0.2.10 (2026-10-20)
- Settings has a Motion line under Controls: Full or Reduced. Pick it
  (or press Left or Right) to flip it. Until you pick, it follows the
  device's own reduce-motion setting; after that your choice is kept on
  this device. Reduced stills slides, shakes, flames and flicker.
- Decisions: D-190.

## 0.2.9 (2026-10-20)
- Settings: on the title and in the pause menu. Its first line is
  Controls: pick it (or press Left or Right) to go Tap and swipe, Tap
  only, Swipe only. Tap only stops swipes walking the hero; Swipe only
  stops taps and held fingers, though a tap on the hero still waits.
  Menus always take both. The choice is kept on this device.
- Decisions: D-189.

## 0.2.8 (2026-10-20)
- A pause menu: a new button with two bars, beside the lantern button,
  or Esc or P, opens it over the darkened room. Resume goes back to
  play (Esc or P again does too); Back to title ends the journey, and
  New journey then starts in a new world. No turn passes while paused.
- The decision log made room: D-159 to D-167 moved to the archive.
- Decisions: D-187, D-188.

## 0.2.7 (2026-10-20)
- The game opens on a title screen: pitch black, the hero on crypt floor
  in the lantern's light, the name Gloamdeep carved in warm gold above,
  and New journey below with a small flame beside it. Tap it, click it,
  or press Enter or Space to start. The wrench and the lantern button
  wait until the journey starts.
- Decisions: D-186.

## 0.2.6 (2026-10-20)
- Nothing new to play. The starting region is designed: a 3 × 3 grid,
  all rooms used, home in the centre, mountains along the north and
  woods elsewhere, and the first cave's entrance next to home. The first
  cave ends at 5 levels, with the endless depths behind a portal at the
  bottom. The region's name is still open. Rule sheet in
  `docs/regions/starting-region.md`.
- Decisions: D-182 to D-185. Questions closed: Q-036, Q-043. Questions
  opened: Q-045, Q-046.

## 0.2.5 (2026-10-20)
- Nothing new to play. The main menu is planned: a title screen with the
  menu on it, and a pause menu during play. Buttons appear only when
  their feature exists. Settings will hold a tap or swipe switch, a
  motion switch and a seed, plus a How to play page. Three looks for the
  title screen were shown in a mock-up; the owner picked the lantern in
  the dark, to be drawn with the game's own art.
- Decisions: D-177 to D-181. Questions closed: Q-025, Q-044.

## 0.2.4 (2026-10-19)
- Nothing new to play. The owner's world ideas are written down in a new
  `docs/WORLD.md`: regions as grids of rooms, each with its own rules;
  ways between rooms that line up; rooms of every size, with a camera
  that follows; light through openings; stairs that must be found; a
  world map. Stage 0.3, the world, is planned and comes next.
- Decisions: D-168 to D-176 (D-134 partly superseded). Questions opened:
  Q-036 to Q-044 (a main menu, the owner's wish for soon).

## 0.2.3 (2026-10-19)
- Nothing new to play. The owner's ideas from a woods sketch are written
  down as open questions: outside trees (their look, kinds, wind, and
  lantern shadows that follow a tree's shape), weather, and shadows from
  the sun and moon. Next conversation starts by hearing more ideas.
- Questions opened: Q-034, Q-035.

## 0.2.2 (2026-10-19)
- Stairs that match the place: in grey rock and earth, the steps are
  pale stone with violet edges, set in a square opening of the ground's
  own colour that darkens as it goes down, instead of a black square.
  The crypt rooms keep their stairs.
- Decisions: D-167.

## 0.2.1 (2026-10-19)
- Depths change kind: from depth 6 down, every depth is an earth
  burrow, twisty dug tunnels with loops and dead ends, drawn as brown
  earth with banded walls. Depths 3 to 5 stay grey rock chambers.
- Dev: Go to depth, in the Room section. Pick a depth with − and +,
  then Go; you land on its stairs up and no turn passes.
- Decisions: D-165, D-166.

## 0.2.0 (2026-10-19)
- Natural caves: every depth below the second room is now 2 to 4
  round, lumpy chambers joined by winding one-tile tunnels, smoothed
  like worn stone. No more boxes with nicks and straight gaps.
- Cave art: those depths are drawn as raw grey rock, not crypt bricks.
  Walls are piled rock chunks, the floor is rough stone with gravel and
  the odd puddle, and the rock's edges round off and wander instead of
  following the square tiles. The first two rooms stay crypt.
- Torch, flask, rat, herb and stairs are placed by the same rules as
  before. Walking is still tile by tile.
- Decisions: D-162 (supersedes D-152 and the shape in D-147), D-163,
  D-164.

Older entries: `docs/archive/CHANGELOG-FOUNDATION-3.md` (0.1.26 to
0.1.27), `CHANGELOG-FOUNDATION-2.md` (0.1.13 to 0.1.25),
`CHANGELOG-FOUNDATION-1.md` (0.1.0 to 0.1.12) and
`CHANGELOG-PREPRODUCTION.md` (0.0.x).
