// § history 0.2: stage 0.2 (D-159), in the world of 0.3 (D-168, D-237). Newest first. Each line is the change's
// line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data.
export const HISTORY_02 = [
  { v: '0.2.77', date: '2026-10-23', title: 'Back on the name pad', lines: [
    "The name pad (Name your profile, and Rename profile) has a Back key on its own row under Del and OK, so a phone can leave it too. It goes back to Profiles with nothing made, or with the old name kept, as Esc does.",
    "On the Profiles screen, Look now reads Change look.",
    "Decisions: D-288, D-289.",
  ] },
  { v: '0.2.76', date: '2026-10-23', title: "A hero in each Profiles box", lines: [
    "Each Profiles box shows that profile's hero, in its cloak, eyes, trim and clothes, on a small lit patch of crypt floor at the box's left, with the name and Deepest beside it. Empty boxes stay as they were.",
    "Decisions: D-287.",
  ] },
  { v: '0.2.75', date: '2026-10-23', title: 'Torches lit in Records', lines: [
    "The Journal's Records show a seventh line, Torches lit, under Flasks poured: every time you light a torch, on all your journeys. A torch lit again after a fall or \"Reset room\" counts again. It counts from 0 from now on, also for profiles made before this.",
    "Decisions: D-286.",
  ] },
  { v: '0.2.74', date: '2026-10-23', title: 'Flasks poured in Records', lines: [
    "The Journal's Records show a sixth line, Flasks poured, under Steps: every flask of oil poured into the lantern, by your hand or by itself, on all your journeys. It counts from 0 from now on, also for profiles made before this.",
    "Decisions: D-285.",
  ] },
  { v: '0.2.73', date: '2026-10-23', title: 'Steps in Records', lines: [
    "The Journal's Records show a fifth line, Steps: every tile you have walked onto, on all your journeys. It counts from 0 from now on, also for profiles made before this.",
    "The idea of achievements is recorded: each thing Records counts can have its own achievements at higher and higher numbers, such as many tiers of steps, some with rewards. Nothing else in the game changes.",
    "Decisions: D-283, D-284.",
  ] },
  { v: '0.2.72', date: '2026-10-23', title: 'Earned looks and gathering', lines: [
    "Ideas recorded: looks and unique things earned in play with their own currency, never bought, such as zebra, cow-spot or camo cloaks; calm or intense play chosen by where you go; mining, fishing, farming and harvesting for later; co-op as a someday idea. Nothing in the game changes.",
    "Decisions: D-280, D-281, D-282.",
  ] },
  { v: '0.2.71', date: '2026-10-23', title: 'Decisions archived', lines: [
    "Decisions D-270 to D-278 moved, unchanged, to an archive file. Nothing in the game changes.",
    "Decisions: D-279.",
  ] },
  { v: '0.2.70', date: '2026-10-23', title: 'Clothes for each profile', lines: [
    "A new profile now chooses its clothes after its trim: Choose your clothes shows four heroes, two to a row, in the cloak, eyes and trim just picked: Cloak (as before), Belted, Short or Tattered. The belt and its buckle take the lantern's trim. OK makes the profile; Back returns to the trim.",
    "Look on the slot screen now opens the cloak, the eyes, the trim, then the clothes; OK on the clothes keeps all four, and Esc after the cloak keeps the old look. The cloak screen's heroes wear the clothes picked, and the red flash of a bite keeps their shape.",
    "Profiles made before this keep the long cloak, as before.",
    "Decisions: D-278.",
  ] },
  { v: '0.2.69', date: '2026-10-23', title: 'A trim for each lantern', lines: [
    "A new profile now chooses its lantern's trim after its eyes: Choose a trim shows the lantern hand close up, with a brass, iron, copper, silver, verdigris or blackened cap and base. The flame and its light stay the same. OK makes the profile; Back returns to the eyes.",
    "Look on the slot screen now opens the cloak, then the eyes, then the trim; OK on the trim keeps all three, and Esc on the eyes or trim keeps the old look. The cloak screen's heroes carry the trim picked.",
    "Profiles made before this keep brass, as before.",
    "Decisions: D-277.",
  ] },
  { v: '0.2.68', date: '2026-10-23', title: 'Eyes for each profile', lines: [
    "A new profile now chooses its eyes after its cloak: Choose your eyes shows the hero's head close up, in the cloak just picked, with bone, ice, moss, sky, silver or brown eyes. OK makes the profile; Back returns to the cloak.",
    "Look on the slot screen now opens the cloak, then the eyes; OK on the eyes keeps both, and Esc there keeps the old look. The cloak screen's heroes wear the eyes picked.",
    "Profiles made before this keep bone eyes, as before.",
    "Decisions: D-276.",
  ] },
  { v: '0.2.67', date: '2026-10-23', title: 'A cloak for each profile', lines: [
    "A new profile now chooses its cloak after its name: six heroes on one screen, in teal, moss, heather, rust, indigo or sand. Pick one with a tap, the arrows or a click, then OK. Back returns to the name pad with the name kept.",
    "The slot screen has a Look line between Rename and Delete. Look, then a profile's box, opens the same screen on its cloak; OK keeps the new one, and Back or Esc keeps the old. The hero wears the cloak on the title and in play.",
    "Profiles made before this wear teal, as before.",
    "Decisions: D-275.",
  ] },
  { v: '0.2.66', date: '2026-10-23', title: 'Rename a profile', lines: [
    "The slot screen has a Rename line above Delete. Rename, then a profile's box, opens the name pad on its name: Del trims it, letters add to it, and OK keeps the new name. OK with nothing typed makes it unnamed again, and Esc keeps the old name.",
    "While picking, the heading asks \"Rename which?\" and Rename reads Cancel. An Empty box can't be renamed.",
    "Decisions D-261 to D-269 moved, unchanged, to an archive file.",
    "Decisions: D-273, D-274.",
  ] },
  { v: '0.2.65', date: '2026-10-23', title: 'A name for each profile', lines: [
    "Picking an Empty slot now asks for a name first: a pad of letters A to Z, with Del and OK, drawn like the seed pad. Tap or click the letters, walk them with the arrows, or type on a keyboard. A name has up to 12 letters, in capitals, and shows on the slot screen.",
    "OK with nothing typed makes the profile unnamed (Profile 2), and Esc goes back to the slots without making it.",
    "Plans: a profile's name and look may change later, from the slot screen. A new open question, whether names may hold a space or digits (Q-054).",
    "Decisions: D-272. Questions closed: Q-053. Questions opened: Q-054.",
  ] },
  { v: '0.2.64', date: '2026-10-23', title: 'Profiles to pick', lines: [
    "The game now opens on a Profiles screen with three slots. Each used slot shows its profile's name and deepest depth; an unnamed profile shows as Profile 1, 2 or 3. Pick one to play as that profile, with its own journey and Records. Picking an empty slot makes a new profile there.",
    "Delete, then a slot, asks \"Delete \u2026? Lost for good.\" with No picked; Yes removes the profile and its journey. A Profiles line on the title screen, after Settings, goes back to the slots.",
    "Plans: a new open question, whether a profile's name or look may change later (Q-053).",
    "Decisions: D-271. Questions closed: Q-051. Questions opened: Q-053.",
  ] },
  { v: '0.2.63', date: '2026-10-23', title: 'The Journal', lines: [
    "A Journal now opens from the title screen, under New journey, and from the pause menu, under Resume. It has one tab for now, Records: your deepest depth, the creatures you have beaten, your falls and the rooms you have found, counted across all your journeys from now on.",
    "Your deepest depth carries over. The other counts start at 0. A journey where a dev tool jumped to a depth doesn't count, as for the deepest depth.",
    "Plans: a new open question about play data, kept on the device or sent (Q-052).",
    "Decisions: D-270. Questions opened: Q-052.",
  ] },
  { v: '0.2.62', date: '2026-10-23', title: 'Creatures\' ways', lines: [
    "Behind the scenes, nothing changes in the game. How a creature acts is now written as named ways it can have: the rat chases, and the gloamling chases and shuns light. A new creature can mix these ways, and new ways can be added later.",
    "Decisions: D-269.",
  ] },
  { v: '0.2.61', date: '2026-10-23', title: 'Profiles', lines: [
    "Behind the scenes, nothing changes on screen. The game can now keep up to three profiles on one device, so later each person can have their own name, look, Records and journey. For now everyone plays as the first profile, which keeps your current journey and your deepest depth.",
    "Planned next, one small step at a time: a screen to pick a profile, typing a name (up to 12 letters), then choices for the cloak's colour, the eyes, the lantern's trim and the clothing.",
    "Decisions: D-268.",
  ] },
  { v: '0.2.60', date: '2026-10-23', title: 'What happened', lines: [
    "Behind the scenes, nothing changes on screen or in sound. Each turn now writes a short list of what happened: a step, a hit, a bite, a fall, the lantern switched, a room entered or found, a level reached, an item taken, a herb eaten, a flask poured, a torch lit. The sounds now play from this list, and later Records, quests and feats will read it too.",
    "Decisions: D-267.",
  ] },
  { v: '0.2.59', date: '2026-10-23', title: 'Old saves upgraded', lines: [
    "Behind the scenes, nothing changes on screen. A journey saved by an older version of the game is now brought up to date when you continue it, one small numbered step at a time, instead of being lost. Saves the game can't read are still dropped quietly.",
    "Decisions: D-266.",
  ] },
  { v: '0.2.58', date: '2026-10-23', title: 'Built to grow', lines: [
    "Plans only, nothing changes in the game. The game is now built to grow: Claude suggests ideas from other successful games along the way, and new parts are made so more can be added later.",
    "Stats, and later quests, a bestiary and achievements, will live in one Journal with tabs; the first tab is Records. Four behind-the-scenes steps come first: old saves upgraded instead of lost, a list of what happens each turn, a profile save, and creature behaviours as data.",
    "A new glossary page keeps the game's words consistent.",
    "Decisions: D-261 to D-265.",
  ] },
  { v: '0.2.57', date: '2026-10-23', title: 'A quieter title', lines: [
    "The title screen no longer shows your deepest depth under the menu. The game still remembers it on this device, ready for a stats page later.",
    "Decisions: D-260.",
  ] },
  { v: '0.2.56', date: '2026-10-23', title: "A rat's bite", lines: [
    "A rat's bite makes a sound: two low, dry snaps of teeth with a hint of breath. When you hit and get bitten in the same turn, the bite comes a moment after your hit, so you hear both. Each bite varies a little, like the hits. The gloamling's bite stays silent for now. Only with Sound: On.",
    "The sound board has A rat bites, and Knife hit, then a rat bites.",
    "Decisions: D-259.",
  ] },
  { v: '0.2.55', date: '2026-10-23', title: "The hit's sound", lines: [
    "Hitting a creature makes a sound: a soft, low \"dmp\". With the knife held, a small tick rides on top. Each hit varies a little in pitch and loudness, so a fight doesn't sound like a machine. Only with Sound: On.",
    "The sound board has Lantern hit, Knife hit and A fight, 3 knife hits.",
    "Decisions: D-258.",
  ] },
  { v: '0.2.54', date: '2026-10-23', title: "The lantern's tick", lines: [
    "The lantern ticks as it goes on or off: a soft, low \"tok\", a little higher for on and lower for off, so you can tell which by ear. It ticks whether you switch it yourself or it switches by itself at the daylight's edge. Only with Sound: On.",
    "The sound board has Lantern on and Lantern off.",
    "Decisions: D-257.",
  ] },
  { v: '0.2.53', date: '2026-10-23', title: "The first sound", lines: [
    "Settings has a new line, \"Sound: Off\", above Version history. Sound starts off while the sounds get ready for players; pick it (or press Left or Right) to switch it On and back. This device remembers your choice.",
    "The game's first sound: a soft, light footstep each time the hero walks a tile. No two steps sound alike: each has its own pitch and loudness. It is made in code, with no sound files. A browser plays sound only after your first tap, click or key, so the game stays quiet until then.",
    "Sound board: a page with a button for each of the game's sounds, to hear them without playing (tools/soundboard.js, for the owner's PRs, not in the game).",
    "Decisions: D-255, D-256.",
  ] },
  { v: '0.2.52', date: '2026-10-22', title: "Version history", lines: [
    "Settings has a new line, Version history, above Back. It lists every version from 0.0.1 to this one, newest first, each with a short title. Tap one, or press Enter or Right, to open it: its date and every change in it, the same lines as this changelog. Left or a second tap closes it. Swipes and Page Up and Page Down scroll a page.",
    "Under Settings on the title, the hero sits one more tile higher, clear of its heading now that Settings has seven lines.",
    "The pixel font gains the marks the changelog uses: quotes, ×, <, >, =, # and the three-dot ….",
    "A test checks every version and every line against this changelog, word for word, so the two can't drift apart.",
    "Decisions: D-254.",
  ] },
  { v: '0.2.51', date: '2026-10-22', title: "The knife's stab", lines: [
    "The knife stabs: hitting a creature with the knife held, the hero darts half a tile toward it and springs back, in a tenth of a second. The lantern's swing stays as it was. None with reduced motion.",
    "Decisions: D-253.",
  ] },
  { v: '0.2.50', date: '2026-10-22', title: "A knife", lines: [
    "The first gear: a knife. It lies in the first cave, the room you reach down the crypt's stairs (depth 2), on a tile the seed picks at least 5 steps from the stairs.",
    "Walk onto it and the hero holds it at once (\"You take the knife.\"). It hits for 2 where the lantern hits for 1, so a rat falls in one hit.",
    "The bag shows it in its own \"HELD\" slot above the six slots. The bag panel is a little taller for it.",
    "It is kept through a fall, and no new knife lies in the cave while the hero holds one.",
    "Decisions: D-252.",
  ] },
  { v: '0.2.49', date: '2026-10-22', title: "Stacks of 3", lines: [
    "A stack in the bag holds at most 3 flasks. Walk onto a 4th and it stays on the floor for later (it never starts a second stack), and the text line says \"You can't carry more flasks.\"",
    "D-234 to D-246 moved to docs/archive/DECISIONS-LAST-STEPS-1.md.",
    "Decisions: D-250, D-251.",
  ] },
  { v: '0.2.48', date: '2026-10-22', title: "Flasks by themselves", lines: [
    "Settings has a new line, \"Flasks: By hand\". Pick it (or press Left or Right) to switch to \"By itself\". This device remembers your choice.",
    "By itself, a flask from the bag pours itself into the lantern once the oil is at 55% or lower, so none is wasted. It costs no turn, and the text line says \"You pour a flask.\" (unless something else happened that turn, like a bite).",
    "On the title screen, the hero and their light sit one tile higher while Settings is open, so its heading no longer covers them.",
    "Decisions: D-249.",
  ] },
  { v: '0.2.47', date: '2026-10-22', title: "The bag", lines: [
    "The bag: walking onto an oil flask now puts it in your bag instead of pouring it straight in. Flasks stack in one slot, with a count.",
    "A bag button sits left of the map button (under it, sideways); I opens it too. The bag opens as a panel over the bottom of the room, with six slots, so the hero and the hearts stay in view. If the hero stands where the panel would hide them, it opens over the top instead.",
    "Tap a flask, then Pour (or Enter or Space) to pour it into the lantern. Pouring takes one turn and closes the bag. The button (now a cross), I, Esc or a tap outside the panel close it without a turn passing.",
    "The bag is kept through a fall, and in the save. Older saves start with an empty bag.",
    "Decisions: D-247, D-248.",
  ] },
  { v: '0.2.46', date: '2026-10-22', title: "Levels", lines: [
    "Levels: experience now adds up to levels. Level 2 takes 10, level 3 takes 30, level 4 takes 60, each 10 more than the last.",
    "A small \"LV 1\" box sits after the hearts (under the oil bar, sideways).",
    "Reaching a level, the text line says \"You feel stronger. Level 2.\" A level gives nothing else yet.",
    "Dev stats line: shows the experience total.",
    "Decisions: D-246.",
  ] },
  { v: '0.2.45', date: '2026-10-22', title: "Experience", lines: [
    "Experience: beating a creature or stepping into a room you have never been in gives 1. A small amber \"+1\" rises over the hero when it does. Experience is kept through a fall and with the saved journey.",
    "A journey saved before this update gets 1 for each room already on its map (not the starting room), as soon as it is continued.",
    "Decisions: D-245.",
  ] },
  { v: '0.2.44', date: '2026-10-22', title: "More gloamlings", lines: [
    "Gloamlings now live on every floor from depth 5 down, the dungeon too, and there are three a floor instead of two.",
    "Fix: a gloamling backing out of your light no longer walks into a torch's light; with nowhere dark or lantern-only to go, it stays.",
    "Decisions: D-243 (supersedes part of D-241), D-244 (supersedes D-242).",
  ] },
  { v: '0.2.43', date: '2026-10-22', title: "The gloamling", lines: [
    "A second creature, the gloamling: a small shadow with pink eyes that shuns light. It won't step into any light, backs away when light reaches it, and doesn't bite while lit, so it only gets you when the lantern is off or down to an ember.",
    "Two rooms on each warren floor (depths 5 to 7) hold one, in place of their second rat. It can be spawned in dev mode.",
    "Decisions: D-240, D-241, D-242.",
  ] },
  { v: '0.2.42', date: '2026-10-22', title: "Saving the journey", lines: [
    "Saving: the journey is kept on this device after every turn. Continue appears first on the title once a journey is saved, and picks it up where it was, even after closing the page.",
    "Back to title keeps the journey. New journey asks \"Start over? The saved journey is lost.\" first, with No picked.",
    "Decisions: D-238, D-239 (supersedes the last part of D-187).",
  ] },
  { v: '0.2.41', date: '2026-10-22', title: "A proper fall", lines: [
    "A proper fall: at 0 health the hero lies down where they fell, the light closes to the deepest dark, then opens where they wake. With reduced motion, only a moment of dark.",
    "src/main.js is split in three: the screens and the drawing each have their own file. The game plays the same.",
    "Decisions D-219 to D-233 moved to archive/DECISIONS-DEEPER.md, and the Stage label in PROGRESS.md now says stage 0.2's last steps.",
    "Decisions: D-234 to D-237.",
  ] },
  { v: '0.2.40', date: '2026-10-21', title: "Map names areas", lines: [
    "The map and the Seed Explorer name each floor's area beside its depth: \"DEPTH 9 · DUNGEON\", with Crypt, Cave and Warren above it. The surface stays SURFACE.",
    "Walls on the map take their area's colour: crypt brick, cave grey, warren brown, dungeon blue, woods green. The area's name in the heading is in the same colour.",
    "Decisions: D-233.",
  ] },
  { v: '0.2.39', date: '2026-10-21', title: "Deepest depth kept", lines: [
    "The game remembers the deepest depth the hero has walked to, on this device, across journeys. The title screen shows it in grey under the menu (\"Deepest: depth 7\") once the hero has gone below the surface.",
    "A dev Go to depth jump stops the journey counting until a New journey.",
    "Decisions: D-232.",
  ] },
  { v: '0.2.38', date: '2026-10-21', title: "More rats deeper", lines: [
    "Deeper floors hold more rats: from depth 5 down every room has two, one guarding the flask and one anywhere in the dark. Depths 2 to 4 keep one a room. Everything else in a seed's rooms stays where it was.",
    "New docs/RESEARCH.md: the owner's wish list, and what Hoplite and similar games do well, with the ideas the owner wants kept for later.",
    "An inventory step is planned just before first gear (step 41).",
    "Decisions: D-230, D-231. Questions opened: Q-049.",
  ] },
  { v: '0.2.37', date: '2026-10-21', title: "Dungeon bricks", lines: [
    "The dungeon (depth 8 down) now has its own look: the crypt's bricks and slabs in deeper, colder, bluer colours, as in option B of the step 59b mock-up. The stairs keep their colours. The crypt at the top is unchanged.",
    "Decisions: D-229.",
  ] },
  { v: '0.2.36', date: '2026-10-21', title: "The dungeon", lines: [
    "A new kind of place, the dungeon, from depth 8 down: six rooms in a 3 × 3 grid, grown like the warren with one extra doorway, so one way round makes a loop. The stairs down are in the room farthest away.",
    "Each dungeon room is 3 or 4 straight-walled halls joined by one-tile corridors that turn once, in the crypt's bricks. Earth warrens now stop at depth 7.",
    "Decisions: D-228. Questions narrowed: Q-038.",
  ] },
  { v: '0.2.35', date: '2026-10-21', title: "Burrow warrens", lines: [
    "From depth 5 down, each earth burrow floor is now a warren: five rooms in a 3 × 3 grid, grown as a winding chain with dead ends and one way through. The stairs down are in the room farthest from the stairs up. Depths 2 to 4 are unchanged, and every seed keeps its rooms there.",
    "Decisions: D-227 (supersedes part of D-203).",
  ] },
  { v: '0.2.34', date: '2026-10-21', title: "Rats need sight", lines: [
    "A rat in light now notices you only if it has a clear straight line to you, with no wall between. A torchlit rat behind a wall stays put. Distance still doesn't matter, and a bite or a hit still makes it notice.",
    "Decisions: D-226 (supersedes part of D-126).",
  ] },
  { v: '0.2.33', date: '2026-10-21', title: "Doorway lines", lines: [
    "In the game, a thin pale blue line marks each doorway, across its outer edge where you step through to the next room, the cave mouth too. It pulses gently, and holds still with reduced motion. It shows once the doorway's tile has been seen, so it stays in memory's dim light.",
    "Decisions: D-225 (built).",
  ] },
  { v: '0.2.32', date: '2026-10-21', title: "Map: rooms apart", lines: [
    "On the map screens, in the game and the Seed Explorer, rooms side by side are drawn one tile apart, with a dark seam between them, so each room shows as its own.",
    "A pale blue line bridges each doorway the hero has found, and the cave mouth between the woods and the crypt. Reveal map shows them all.",
    "Decisions: D-224, D-225.",
  ] },
  { v: '0.2.31', date: '2026-10-21', title: "Walk around walls", lines: [
    "Hold a finger or the mouse button on a tile you remember and the hero walks there around walls, about 4 steps a second. A small amber frame marks the tile; slide to move it, lift to stop.",
    "When a creature or an item comes into view, the hero stops and a \"!\" shows over them. Lift and hold again to go on. Taking stairs stops the walk too.",
    "Held on a dark tile, or one no remembered way leads to, the hero steps straight toward it, as before.",
    "The map joins the woods and the crypt at the cave mouth, as the Seed Explorer does, once you have been in both.",
    "Decisions: D-220, D-221 (the surface decisions move to the archive), D-222, D-223 (deeper floors as grids, next). Q-038 narrowed.",
  ] },
  { v: '0.2.30', date: '2026-10-21', title: "Daylight inside", lines: [
    "Daylight comes in through the cave mouth: in the crypt room the mouth leads to, the gap in the wall lets in a pale light that reaches about 3 tiles, like a torch. Tiles it reaches are remembered, and a creature standing in it can see you.",
    "It follows the time of day: through dusk it shrinks and warms to orange, at night it is gone, and at dawn it comes back the same way.",
    "Decisions: D-218, D-219. Questions closed: Q-026. Q-040 narrowed.",
  ] },
  { v: '0.2.29', date: '2026-10-21', title: "Day and night", lines: [
    "Day and night pass outside with your turns: a day is 300 turns, 170 of full day, a 30-turn dusk, 70 of night and a 30-turn dawn. The clock keeps running below ground too.",
    "At night the woods are dark like a cave: you see what your lantern lights, and tiles already seen stay in a dim moonlit blue. Dusk and dawn fade the light slowly. No clock on screen, only the light.",
    "The lantern set to By itself lights as dusk falls and goes out as dawn comes.",
    "Dev: the Room tab gets TIME, +10 and +50, which move the clock only; the status line shows the turn of the day.",
    "Decisions: D-217.",
  ] },
  { v: '0.2.28', date: '2026-10-21', title: "Explorer: surface", lines: [
    "Step E2, the whole surface in the Seed Explorer (D-214): its surface map shows the woods and the crypt together, joined where the cave mouth meets the gap in the crypt wall.",
    "The game's own map still shows only the part you're in (D-213).",
    "Decisions: D-216.",
  ] },
  { v: '0.2.27', date: '2026-10-21', title: "Seed Explorer", lines: [
    "Step E1, the Seed Explorer (D-214): a new last line on the title menu opens the map of a seed, every floor in full, with no hero.",
    "A bar at the bottom of the map shows the seed, with Back, Type and Reseed; R, T and B do the same on a keyboard. Floors turn as on the map.",
    "It opens on the seed typed in Settings, else a random one, on the surface (the crypt rooms for now), and never changes Settings.",
    "Decisions: D-215.",
  ] },
  { v: '0.2.26', date: '2026-10-21', title: "Crypt is depth 0", lines: [
    "Step 49b, depths move up one (D-212): the two crypt rooms are depth 0 and the strip says SURFACE there, the second room is depth 1, the grey rock grids depths 2 to 4, and earth burrows start at depth 5.",
    "A seed keeps its rooms: each place keeps the numbers of its old depth.",
    "The surface map shows the part you're in: the woods, or the crypt.",
    "Dev: Go to depth goes from 0 (the crypt); Go outside still leads to the woods.",
    "D-201 to D-208 moved to docs/archive/DECISIONS-REGION.md.",
    "Planned next: a Seed Explorer on the title menu (D-214).",
    "Decisions: D-213, D-214.",
  ] },
  { v: '0.2.25', date: '2026-10-20', title: "A cave mouth", lines: [
    "The woods now has a cave mouth: a dark opening between two grey rocks on one edge, with worn earth in front. The seed picks the edge and the spot along it.",
    "Walk through it and you arrive on the crypt's facing side, through a new gap in its wall: going up, the bottom of the south room; going down, left or right, the first room. Walk back out and you are on the mouth again. A new journey still starts in the crypt.",
    "Decisions: D-211, D-212 (for step 49b).",
  ] },
  { v: '0.2.24', date: '2026-10-20', title: "Lantern by itself", lines: [
    "Settings gains \"Lantern: By hand\" under Seed. Picked, or Left and Right, it flips to \"By itself\": the lantern then goes out as you step into daylight and lights again as you go back into the dark.",
    "It switches only at that moment, so switching it yourself in between holds. Like the switch, it costs no turn and no oil. By hand until picked.",
    "Decisions: D-210. Questions closed: Q-049.",
  ] },
  { v: '0.2.23', date: '2026-10-20', title: "The woods", lines: [
    "The first outside room: woods, 17 × 20, made from the seed. Trees stand thick at the edges and thinner inside; they block the way and the view.",
    "One round tree a tile, each with its own crown, trunk and shadow.",
    "Plain daylight: the whole room is lit and remembered; the lantern isn't needed, but burns oil as before while lit. The strip says SURFACE.",
    "For now the dev drawer's Room section has Go outside; the cave mouth comes next (step 49). The map shows the woods as the surface.",
    "Decisions: D-209. Questions opened: Q-049.",
  ] },
  { v: '0.2.22', date: '2026-10-20', title: "Map turns floors", lines: [
    "The map turns between floors: arrows beside \"DEPTH 3\", < and >, or Page Up and Page Down show the floor above or below. The hero stays put.",
    "Floors never seen are skipped; an arrow greys out when nothing seen lies that way. Dev Reveal map turns through every floor from 1 to 99.",
    "Tapping stairs found on the map turns it to the floor they lead to, centred on the matching stairs. The hero's dot shows on their own floor only.",
    "D-194 to D-200 moved to docs/archive/DECISIONS-GETTING-AROUND.md.",
    "Decisions: D-207, D-208.",
  ] },
  { v: '0.2.21', date: '2026-10-20', title: "The map", lines: [
    "A map: the new map button (left of pause) or the M key shows the floor you are on, in a box over the darkened room. Each room is drawn small from the tiles your lantern has reached; rooms you haven't seen stay dark. Your spot blinks gold, stairs you've found are violet, and the depth is written at the top. Drag or use the arrows to scroll; pinch or the mouse wheel to zoom. The map button becomes a cross that closes it; M, Esc or a tap outside the box close it too. No turn passes.",
    "Dev tools: a Reveal map switch shows every room of the floor in full.",
    "Written down for the next step: the map will turn between floors.",
    "Decisions: D-205, D-206. Questions closed: Q-042.",
  ] },
  { v: '0.2.20', date: '2026-10-20', title: "Stairs line up", lines: [
    "The stairs line up between floors: the stairs up on a floor are at the same spot, in the same room of the grid, as the stairs down on the floor above. Each cave room is carved to fit.",
    "Depths 4 and 5 are now three rooms in an L too, like depth 3. On all three, the stairs down are in a different room from the stairs up, so you go through an opening to get deeper. The torch stays by the stairs up.",
    "Depth 6 and deeper are still one room each, lined up the same way.",
    "Written down for later: stairs line up by their place on the floor, so rooms of different sizes and shapes can still match.",
    "Decisions: D-203, D-204.",
  ] },
  { v: '0.2.19', date: '2026-10-20', title: "Depth 3 as a grid", lines: [
    "Depth 3 is now three cave rooms instead of one: a 2 × 2 grid with one corner left empty by the seed, so the rooms make an L. The corner room joins the other two through a one-tile gap in the shared edge; walk out through it and you come in at the same spot in the next room. The rock is drawn open right up to the edge there, so the gap shows.",
    "The seed picks which of the three holds the stairs up and down and the torch. The other two each hold a flask, a rat and a herb, in the dark.",
    "Depths 4 and 5 stay one room each, and every other depth is as before.",
    "Decisions: D-201, D-202.",
  ] },
  { v: '0.2.18', date: '2026-10-20', title: "Dev side drawer", lines: [
    "The dev tools are now a drawer that slides out from the left edge, from under the wrench down to the stats line. The sections (View, Spawn, Room, Oil, Hero, Share) are stacked down its left side, and the open one's tools sit beside them. Tap the open section again and the drawer narrows to just its tabs.",
    "All dev words, the stats line too, are in the game's pixel font. The font gains +, % and a middle dot.",
    "Decisions: D-200.",
  ] },
  { v: '0.2.17', date: '2026-10-20', title: "Sideways screens", lines: [
    "A phone held sideways (or a wide PC window): the hearts, depth and oil stand in a column at the room's left, so the room can grow. The wrench sits at the top left, pause at the top right, and the lantern at the bottom right, under your thumb. Upright, nothing changes.",
    "Sideways, the dev panel and the stats line keep to the space left of the room and never cover it; the panel ends above the stats line and scrolls instead of running off the screen.",
    "Decisions: D-199. New question: Q-048 (the room filling the screen).",
  ] },
  { v: '0.2.16', date: '2026-10-20', title: "Side openings", lines: [
    "Side openings: the gap in the first room's bottom wall is now a doorway. Step out through it into a new crypt room to the south, and back the same way. The seed places its flask and rat.",
    "The hearts, depth and oil now sit in a strip just above the room, so they no longer cover it. Above them, one row holds the dev wrench on the left and pause and the lantern on the right. On a wide screen the buttons stand beside the picture when that makes it bigger.",
    "The main menu decisions, and the 0.1.26 and 0.1.27 changelog entries, moved to archive files.",
    "Decisions: D-196 to D-198.",
  ] },
  { v: '0.2.15', date: '2026-10-20', title: "The camera", lines: [
    "The camera: the caves from depth 3 down are now about 1.5 screens (17 × 20 tiles), and the view glides along with the hero, keeping them in the middle and stopping at the cave's edges. The crypt rooms at the top stay one screen and don't move.",
    "Dev: the grid and pointed tile move with the camera.",
    "Decisions: D-195.",
  ] },
  { v: '0.2.14', date: '2026-10-20', title: "Stairs to find", lines: [
    "Stairs must be found: their violet glow stays hidden until your lantern has reached them once. Found, it glows half as bright as before, on the stairs and just beside them. A hidden glow wakes no rat.",
    "Decisions: D-194. Questions closed: Q-041.",
  ] },
  { v: '0.2.13', date: '2026-10-20', title: "How to play", lines: [
    "How to play joins the title (under New journey) and the pause menu (after Settings): a page each for Touch, Mouse and Keyboard showing how to walk, wait, switch the lantern and pause. Left and Right flip the page; it opens on the way you last played.",
    "Decisions: D-193. Questions opened: Q-047.",
  ] },
  { v: '0.2.12', date: '2026-10-20', title: "Seeded first rooms", lines: [
    "The first two rooms now change with the seed: their shape stays, but the flask and the rat start in different places each world, and again after a fall. A new rule: every room takes something from the seed.",
    "Decisions: D-192.",
  ] },
  { v: '0.2.11', date: '2026-10-20', title: "The seed pad", lines: [
    "Settings has a Seed line under Motion. Pick it to open a number pad drawn in the game's style (tap, arrows, or a keyboard's digits): type up to 5 digits and OK, or Random. A typed seed starts every New journey until set back to Random, so a world can be replayed. From the pause menu, Random shows this journey's seed.",
    "Decisions: D-191.",
  ] },
  { v: '0.2.10', date: '2026-10-20', title: "The Motion switch", lines: [
    "Settings has a Motion line under Controls: Full or Reduced. Pick it (or press Left or Right) to flip it. Until you pick, it follows the device's own reduce-motion setting; after that your choice is kept on this device. Reduced stills slides, shakes, flames and flicker.",
    "Decisions: D-190.",
  ] },
  { v: '0.2.9', date: '2026-10-20', title: "Settings: Controls", lines: [
    "Settings: on the title and in the pause menu. Its first line is Controls: pick it (or press Left or Right) to go Tap and swipe, Tap only, Swipe only. Tap only stops swipes walking the hero; Swipe only stops taps and held fingers, though a tap on the hero still waits. Menus always take both. The choice is kept on this device.",
    "Decisions: D-189.",
  ] },
  { v: '0.2.8', date: '2026-10-20', title: "The pause menu", lines: [
    "A pause menu: a new button with two bars, beside the lantern button, or Esc or P, opens it over the darkened room. Resume goes back to play (Esc or P again does too); Back to title ends the journey, and New journey then starts in a new world. No turn passes while paused.",
    "The decision log made room: D-159 to D-167 moved to the archive.",
    "Decisions: D-187, D-188.",
  ] },
  { v: '0.2.7', date: '2026-10-20', title: "The title screen", lines: [
    "The game opens on a title screen: pitch black, the hero on crypt floor in the lantern's light, the name Gloamdeep carved in warm gold above, and New journey below with a small flame beside it. Tap it, click it, or press Enter or Space to start. The wrench and the lantern button wait until the journey starts.",
    "Decisions: D-186.",
  ] },
  { v: '0.2.6', date: '2026-10-20', title: "Starting region", lines: [
    "Nothing new to play. The starting region is designed: a 3 × 3 grid, all rooms used, home in the centre, mountains along the north and woods elsewhere, and the first cave's entrance next to home. The first cave ends at 5 levels, with the endless depths behind a portal at the bottom. The region's name is still open. Rule sheet in docs/regions/starting-region.md.",
    "Decisions: D-182 to D-185. Questions closed: Q-036, Q-043. Questions opened: Q-045, Q-046.",
  ] },
  { v: '0.2.5', date: '2026-10-20', title: "Main menu planned", lines: [
    "Nothing new to play. The main menu is planned: a title screen with the menu on it, and a pause menu during play. Buttons appear only when their feature exists. Settings will hold a tap or swipe switch, a motion switch and a seed, plus a How to play page. Three looks for the title screen were shown in a mock-up; the owner picked the lantern in the dark, to be drawn with the game's own art.",
    "Decisions: D-177 to D-181. Questions closed: Q-025, Q-044.",
  ] },
  { v: '0.2.4', date: '2026-10-19', title: "The world planned", lines: [
    "Nothing new to play. The owner's world ideas are written down in a new docs/WORLD.md: regions as grids of rooms, each with its own rules; ways between rooms that line up; rooms of every size, with a camera that follows; light through openings; stairs that must be found; a world map. Stage 0.3, the world, is planned and comes next.",
    "Decisions: D-168 to D-176 (D-134 partly superseded). Questions opened: Q-036 to Q-044 (a main menu, the owner's wish for soon).",
  ] },
  { v: '0.2.3', date: '2026-10-19', title: "Surface sketch ideas", lines: [
    "Nothing new to play. The owner's ideas from a woods sketch are written down as open questions: outside trees (their look, kinds, wind, and lantern shadows that follow a tree's shape), weather, and shadows from the sun and moon. Next conversation starts by hearing more ideas.",
    "Questions opened: Q-034, Q-035.",
  ] },
  { v: '0.2.2', date: '2026-10-19', title: "Stairs that match", lines: [
    "Stairs that match the place: in grey rock and earth, the steps are pale stone with violet edges, set in a square opening of the ground's own colour that darkens as it goes down, instead of a black square. The crypt rooms keep their stairs.",
    "Decisions: D-167.",
  ] },
  { v: '0.2.1', date: '2026-10-19', title: "Earth burrows", lines: [
    "Depths change kind: from depth 6 down, every depth is an earth burrow, twisty dug tunnels with loops and dead ends, drawn as brown earth with banded walls. Depths 3 to 5 stay grey rock chambers.",
    "Dev: Go to depth, in the Room section. Pick a depth with − and +, then Go; you land on its stairs up and no turn passes.",
    "Decisions: D-165, D-166.",
  ] },
  { v: '0.2.0', date: '2026-10-19', title: "Natural caves", lines: [
    "Natural caves: every depth below the second room is now 2 to 4 round, lumpy chambers joined by winding one-tile tunnels, smoothed like worn stone. No more boxes with nicks and straight gaps.",
    "Cave art: those depths are drawn as raw grey rock, not crypt bricks. Walls are piled rock chunks, the floor is rough stone with gravel and the odd puddle, and the rock's edges round off and wander instead of following the square tiles. The first two rooms stay crypt.",
    "Torch, flask, rat, herb and stairs are placed by the same rules as before. Walking is still tile by tile.",
    "Decisions: D-162 (supersedes D-152 and the shape in D-147), D-163, D-164.",
  ] },
];
