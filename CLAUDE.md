# Gloamdeep: notes for Claude Code

Gloamdeep is a grid-based, turn-based survival micro-RPG with action and
strategy. It is built phone-first and also plays on PC in any browser. You
carry a lantern down through dark places, and the oil runs low. Plain HTML,
CSS and JavaScript, with everything drawn and synthesized in code.

## The owner leads. Work in tiny steps.

- The owner wants to take part in every decision. The pace is a little
  faster than at kickoff (D-018).
- A PR may settle **several small decisions** together. Visible changes
  stay small: one small visible change per step ("the hero can move one
  tile"). Never bundle a new mechanic with a new system.
- **Propose before building.** Say what you found, offer 2 or 3 options with
  a recommendation (a quick mock-up or picture where it helps), and wait for
  the owner's choice. This applies to design, art, code structure and bug
  fixes.
- Never invent mechanics, story, names or numbers that are not in
  `docs/DECISIONS.md`. If something is missing, add it to
  `docs/OPEN-QUESTIONS.md` and ask.
- Ask questions as **multiple choice** (the AskUserQuestion tool when it
  exists): 2 to 4 options, the recommended one first, more than one pick
  allowed when options can combine, and the owner can always add their own
  answer. Up to 4 related questions at a time.
- Write for the owner in plain words. Explain technical terms when they
  first come up.

## Start of every conversation

1. Read `docs/PROGRESS.md`. It says where things stand, what is "Next up"
   and what is waiting on the owner.
2. Read only the documents that the Next up item names.
3. Check the branch. If its PR was merged, restart the branch from `main`
   before doing anything. If any PR is still open, tell the owner first and
   ask whether to merge it, update it or close it.

## Where things live

Read the smallest file that answers the question.

| File | What it holds | When to read it |
| --- | --- | --- |
| `docs/PROGRESS.md` | status, Next up, the last 3 log entries | every conversation |
| `docs/DECISIONS.md` | every settled decision, D-001, D-002… | grep for an ID or topic |
| `docs/OPEN-QUESTIONS.md` | undecided questions, Q-001, Q-002… | when a step touches one |
| `docs/DESIGN.md` | the one-page design brief | before proposing any feature |
| `docs/VISION.md` | the pitch, inspirations, proposed pillars | when proposing a design |
| `docs/ART-DIRECTION.md` | the visual rules taken from the style study | before any drawing code |
| `docs/TECH.md` | architecture and code rules | before writing code |
| `docs/DEV-TOOLS.md` | the dev mode plan and tool list | when touching dev mode |
| `CHANGELOG.md` | versions, newest first | the top entry only |
| `docs/archive/` | old log entries, superseded decisions | grep only, never read whole |
| `reference/style-study-1.html` | the approved look (545 lines, frozen) | art work only, by line range (see `reference/README.md`) |

## Keeping track: every PR does all of these

- **CHANGELOG.md**: add a new version entry at the top (the format is in its
  header). Each PR has exactly one version.
- **docs/PROGRESS.md**: add a log entry, set "Next up" and update "Waiting
  on the owner". Keep only 3 log entries there. Move the oldest to the top
  of `docs/archive/PROGRESS-LOG.md`.
- **Decisions**: when the owner settles something, add `D-xxx` to
  `docs/DECISIONS.md` with the date and the owner's choice in a sentence.
  If it answers a question, delete the `Q-xxx` entry from
  `docs/OPEN-QUESTIONS.md` and cite it in the decision ("answers Q-004").
  IDs are never reused or renumbered.
- **Changing a decision**: never edit an old decision silently. Add a new
  one ("supersedes D-005"), and mark the old one
  `Superseded by D-0xx (date)`. When `DECISIONS.md` passes 12 KB, move the
  superseded entries to `docs/archive/DECISIONS-SUPERSEDED.md`.
- Once code exists, the `VERSION` constant in the code must match the top
  `CHANGELOG.md` entry.

## Keeping context small

- No doc over 8 KB, except `docs/DECISIONS.md` (12 KB). Archive or split when a
  doc gets close. Nothing is deleted. Old material moves to `docs/archive/`.
- Keep code files small. Mark sections with `// § name` so a file can be
  read by line range (`grep -n "§"`).
- Test output: one line per test or check, never full logs or page dumps.
- Diffs: run `git diff --stat` first.

## Git and PRs

- Never push to `main`. One PR per conversation. Merging is the owner's call.
- Fill in `.github/pull_request_template.md`.
- Every PR that changes something visible gets a private playtest Artifact
  (the owner can't play a PR before it is merged). Put the link in the PR
  body and in `docs/PROGRESS.md`. Republish to the same link after each push.
- End every conversation with a handoff of at most 5 lines: the PR link,
  what changed, what is waiting on the owner, and the proposed next step.

## Hard technical rules (details in `docs/TECH.md`)

- No external assets: no image, audio or font files, no CDNs, no frameworks,
  no build step. Visuals use Canvas 2D. Sound uses the Web Audio API.
- Phone first. Everything works with touch, mouse and keyboard.
- Game state is kept separate from drawing. All content (items, enemies,
  NPCs, tiles) lives in one data registry. Randomness goes through a seeded
  RNG. Dev tools work by editing the state and read from the registry
  (`docs/DEV-TOOLS.md`).
- Wrap every `localStorage` access in try/catch.
