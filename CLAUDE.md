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
  `docs/DECISIONS.md` or its archive files (D-041, D-083, D-103, D-120, D-137). If something
  is missing, add it to
  `docs/OPEN-QUESTIONS.md` and ask.
- Ask questions as **multiple choice** (the AskUserQuestion tool when it
  exists): 2 to 4 options, the recommended one first, more than one pick
  allowed when options can combine, and the owner can always add their own
  answer. Up to 4 related questions at a time.
- Write for the owner in plain words. Explain technical terms when they
  first come up.

## Start of every conversation

1. Pull the latest `main` first (`git fetch origin main`); the starting
   copy can be old (D-070). A start-up hook does this already when it
   runs (D-092); there is no need to tell the owner about it. If any PR is still open, tell the owner and ask
   whether to merge it, update it or close it. If this conversation's
   branch had a PR merged, restart the branch from `origin/main`.
2. Read `docs/PROGRESS.md` on the fresh `main`. It says where things
   stand, what is "Next up" and what is waiting on the owner.
3. Read only the documents that the Next up item names.

## Where things live

Read the smallest file that answers the question.

| File | What it holds | When to read it |
| --- | --- | --- |
| `docs/PROGRESS.md` | status, Next up, the last 3 log entries | every conversation |
| `docs/DECISIONS.md` | settled decisions from D-114 on | grep for an ID or topic |
| `docs/archive/DECISIONS-PREPRODUCTION.md` | D-001 to D-038, still in force | grep only, never read whole |
| `docs/archive/DECISIONS-FOUNDATION-1.md` | D-039 to D-052, D-070 to D-076, still in force | grep only, never read whole |
| `docs/archive/DECISIONS-FOUNDATION-2.md` | D-053 to D-069, still in force | grep only, never read whole |
| `docs/archive/DECISIONS-FOUNDATION-3.md` | D-077 to D-093, still in force | grep only, never read whole |
| `docs/archive/DECISIONS-FOUNDATION-4.md` | D-094 to D-113, still in force | grep only, never read whole |
| `docs/OPEN-QUESTIONS.md` | undecided questions, Q-001, Q-002… | when a step touches one |
| `docs/DESIGN.md` | the one-page design brief | before proposing any feature |
| `docs/VISION.md` | the pitch, inspirations, the pillars | when proposing a design |
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
- **Name a PR by its version** (0.1.9) in the docs, never by its number,
  which isn't known until the PR exists (D-071). Docs-only PRs bump the
  version too (D-075).
- **"Waiting on the owner"** holds only questions and choices for the
  owner. Merging the open PR is always implied, so it is never listed
  (D-074).
- **Decisions**: when the owner settles something, add `D-xxx` to
  `docs/DECISIONS.md` with the date and the owner's choice in a sentence.
  If it answers a question, delete the `Q-xxx` entry from
  `docs/OPEN-QUESTIONS.md` and cite it in the decision ("answers Q-004").
  IDs are never reused or renumbered.
- **Decisions in the open PR** aren't final until it is merged. Playtest
  tweaks edit them in place, with a note of what changed ("changed after
  the playtest: 40 → 80 → 60 turns") (D-072).
- **Changing a merged decision**: never edit it silently. Add a new
  one ("supersedes D-005"), and mark the old one
  `Superseded by D-0xx (date)`. When `DECISIONS.md` passes 12 KB, move the
  superseded entries to `docs/archive/DECISIONS-SUPERSEDED.md`, and the
  rest of a finished stage to its own archive file (as D-041 did).
- Once code exists, the `VERSION` constant in the code must match the top
  `CHANGELOG.md` entry.

## Keeping context small

- No doc over 8 KB, except `docs/DECISIONS.md` (12 KB) and the grep-only
  files in `docs/archive/`. Archive or split when a doc gets close. Nothing is deleted. Old material moves to `docs/archive/`.
- Keep code files small. Mark sections with `// § name` so a file can be
  read by line range (`grep -n "§"`).
- Test output: one line per test or check, never full logs or page dumps.
- Diffs: run `git diff --stat` first.

## Git and PRs

- Never push to `main`. One PR per conversation. Merging is the owner's call.
- Fill in `.github/pull_request_template.md`.
- Every PR that changes something visible gets a private playtest Artifact
  (the owner can't play a PR before it is merged). Build it with
  `node tools/playtest.js <scratchpad>/playtest.html` (D-073), and
  put the link in the PR body and the `docs/PROGRESS.md` log entry.
  Republish to the same link after each push.
- After every push, update the PR body so "What changed" and "Decisions"
  match the branch (D-076).
- End every conversation with a handoff of at most 5 lines: the PR link,
  what changed, what is waiting on the owner, and the proposed next step.

## Hard technical rules (details in `docs/TECH.md`)

- No external assets: no image, audio or font files, no CDNs, no frameworks,
  no build step (`tools/` is only for playtests). Visuals use Canvas 2D. Sound uses the Web Audio API.
- Phone first. Everything works with touch, mouse and keyboard.
- Game state is kept separate from drawing. All content (items, enemies,
  NPCs, tiles) lives in one data registry. Randomness goes through a seeded
  RNG. Dev tools are on for everyone (D-086); they work by editing the
  state and read from the registry (`docs/DEV-TOOLS.md`).
- Wrap every `localStorage` access in try/catch.
