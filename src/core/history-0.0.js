// § history 0.0: pre-production: decisions, docs and art studies, no game yet. Newest first. Each line is the change's
// line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data.
export const HISTORY_00 = [
  { v: '0.0.9', date: '2026-10-17', title: "Brief approved", lines: [
    "The design brief is approved, and now covers the hero, oil and growth.",
    "The hero is a lamplighter. Why they go down (the spreading gloam, treasure, a call from below) is uncovered slowly.",
    "Oil burns every turn the lantern is lit.",
    "You grow stronger through levels, gear, home upgrades and discoveries.",
    "The replaced dog decisions moved to the archive to keep the log small.",
    "Decisions: D-035 to D-038. Questions closed: Q-022 to Q-024.",
  ] },
  { v: '0.0.8', date: '2026-10-17', title: "Design brief, faery", lines: [
    "Draft of the one-page design brief (docs/DESIGN.md), built only from decisions, for the owner to approve.",
    "Three gaps the brief found are now open questions: the hero and why they go down, how oil drains, how you get stronger.",
    "D-004's slower pace is marked as superseded by D-018.",
    "The companion is now a faery, not a dog: it flies around you, talks, guides and never fights.",
    "Decisions: D-034 (supersedes D-029, D-033). Questions opened: Q-022 to Q-024.",
  ] },
  { v: '0.0.7', date: '2026-10-17', title: "Portals, the dog", lines: [
    "Every biome has portals, and each leads into a twisted, darker version of that biome with rarer loot.",
    "The companion is a dog you rescue in the first cave.",
    "Decisions: D-032, D-033. Questions closed: Q-020, Q-021.",
  ] },
  { v: '0.0.6', date: '2026-10-17', title: "Light, biomes, companion", lines: [
    "Light comes from torches, glowing life, thrown light and daylight shafts too. Day and night pass with your turns.",
    "Switching the lantern off saves oil, hides you, reveals some secrets and calms some creatures.",
    "One close-up weapon first; each weapon has its own attack shape, and ranged, area and learned abilities unlock as you grow.",
    "Four biomes: woods and mountains, old mines, glowing fungal caverns, sunken ruins. The companion is an animal.",
    "Dev mode opens with ?dev and ships hidden. Text uses a pixel font.",
    "Decisions: D-024 to D-031. Questions closed: Q-012 to Q-019. Questions opened: Q-020, Q-021.",
  ] },
  { v: '0.0.5', date: '2026-10-17', title: "The journey's shape", lines: [
    "The game is one persistent journey. The world is generated once per save, and portals lead into deep areas that change on every visit.",
    "Dying sends you home: in the world you can fetch your dropped bag, in a portal you lose that dive's finds. Levels, unlocks and lore always stay.",
    "What you keep: lore, unlocks, home base, levels, shortcuts, explored map, stash, deepest depth record.",
    "Surface first, then down, with caves that open into valleys or cut through mountains. Solo, with one companion later.",
    "Decisions: D-019 to D-023. Questions closed: Q-008 to Q-010. Questions opened: Q-018, Q-019.",
  ] },
  { v: '0.0.4', date: '2026-10-17', title: "Oil, turns, fighting", lines: [
    "Oil is light only. Running dry shrinks the light to an ember and makes enemies bolder, but the run goes on.",
    "The lantern can be switched on and off, other light sources exist, and outside in the day you don't need it.",
    "Turns happen only when you act. Walk into an enemy to attack, with ranged abilities, weapon kinds and area attacks planned too.",
    "Faster working pace: several small decisions per PR, multiple-choice questions.",
    "Decisions: D-014 to D-018. Questions closed: Q-004 to Q-007. Questions opened: Q-014 to Q-017.",
  ] },
  { v: '0.0.3', date: '2026-10-17', title: "The four pillars", lines: [
    "The four design pillars are set: the lantern is your world, always one floor deeper, curiosity pays off, and stronger, slowly.",
    "Decisions: D-013. Questions closed: Q-003.",
  ] },
  { v: '0.0.2', date: '2026-10-17', title: "Style study, a front page", lines: [
    "Everything in style study 1 stays. Only the rat sprite and the blocky shadow edges will be improved.",
    "The game is hosted on GitHub Pages, at the renamed repo gloamdeep.",
    "No blue flash when tapping: recorded as a rule for the game.",
    "The Pages front page now opens style study 1, so the link is playable.",
    "Decisions: D-009 to D-012. Questions closed: Q-002, Q-011.",
  ] },
  { v: '0.0.1', date: '2026-10-17', title: "Kickoff: rules and art", lines: [
    "Project kickoff: working rules (CLAUDE.md), decision log, open questions, vision, art direction, tech and dev-tool notes.",
    "Added style study 1 as the frozen art reference (reference/).",
    "Recorded what the owner loved about Dungeon Siege.",
    "Decisions: D-001 to D-008. Questions closed: Q-001.",
  ] },
];
