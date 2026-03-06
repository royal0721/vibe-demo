# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start Vite dev server
npm run build        # production build (vite build only — no TypeScript type-check)
npm run preview      # preview production build locally
npm run test         # run tests once (vitest run)
npm run test:watch   # run tests in watch mode (vitest)
```

No lint command is configured. The project is pure JSX — `tsconfig.json` exists only as a Vite artifact and is not used for compilation.

### Testing

Vitest + `@testing-library/react` + jsdom. Setup file: `src/test/setup.js` (imports `@testing-library/jest-dom`).

- Test files go next to the module they test: `src/hooks/useAffection.test.js`, etc.
- Pure logic functions (affection, history helpers) are the primary test targets.
- React component tests use `@testing-library/react` — render, query, assert on DOM output.
- `globals: true` is set in `vite.config.js`, so `describe`/`it`/`expect` are available without imports.

## Architecture

**CTF 帥哥攻略遊戲** — A CTF quiz game in an otome/visual novel aesthetic. Players select a character, read an opening story, answer quiz questions, and receive an affection-based ending.

### State machine (`src/hooks/useGameState.js`)

Single `useReducer` drives the whole app. Screens follow this flow:

```
HOME → CHARACTER_SELECT → STORY → QUIZ → RESULTS
HOME → DASHBOARD → HOME
```

All game state (selected character, questions, answers, affection, combo, score) lives in this one reducer. `dispatch` and `state` are passed as props down to each screen.

### Screen routing (`src/App.jsx`)

`screens[state.screen]` maps the string enum to a JSX element — no router library. `AnimatePresence mode="wait"` handles screen transitions.

### Affection system (`src/hooks/useAffection.js`)

Pure calculation functions (no hooks, despite the filename):
- `calculateAffectionDelta` — correct answers give `+AFFECTION_PER_CORRECT` with a combo bonus every 3rd consecutive correct answer; wrong answers give `AFFECTION_PER_WRONG`. A `PASS_BONUS` is applied on the final question if score ≥ `PASS_THRESHOLD`.
- `clampAffection` — clamps to [0, 100]
- `getScoreGrade` — returns `s/a/b/c/d` based on score percentage
- `getAffectionGrade` — returns `s/a/b/c/d` based on affection value (used in dashboard)
- `getAffectionTier` — returns `high/mid/low`
- Confession triggers only if affection ≥ `CONFESSION_THRESHOLD` **AND** grade is `s` or `a`

### Constants and environment (`src/constants/env.js`)

All `VITE_*` env vars are re-exported as typed constants with defaults. Always import from here instead of directly from `import.meta.env`.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_GAS_URL` | `""` | Google Apps Script Web App URL |
| `VITE_QUESTION_COUNT` | 10 | Questions per quiz |
| `VITE_PASS_THRESHOLD` | 5 | Min correct to "pass" |
| `VITE_AFFECTION_PER_CORRECT` | 12 | Affection delta on correct |
| `VITE_AFFECTION_PER_WRONG` | -5 | Affection delta on wrong |
| `VITE_COMBO_BONUS` | 10 | Bonus every 3rd consecutive correct |
| `VITE_PASS_BONUS` | 20 | Bonus on last question if passed |
| `VITE_CONFESSION_THRESHOLD` | 80 | Min affection for confession |

### Backend / demo mode (`src/services/gasApi.js`)

When `VITE_GAS_URL` is not set, `fetchQuestions` falls back to `src/constants/demoQuestions.js` (10 hardcoded questions per character, CTF-themed in Traditional Chinese). `submitResult` silently no-ops in demo mode. The GAS POST uses `Content-Type: text/plain` to avoid CORS preflight.

### Character data (`src/constants/characters.js`)

Each character object contains: id, name, neon color tokens, DiceBear avatar params, opening dialogue array, per-question fallback dialogue arrays (`defaultCorrect`, `defaultWrong`), `finalComment` keyed by grade (`s/a/b/c/d`), and confession tier lines (`s`, `a`). Custom character images can be placed in `public/characters/<id>.png` — `CharacterAvatar` uses `imagePath` with a DiceBear fallback.

`buildDiceBearUrl(character, size)` constructs a DiceBear `lorelei` SVG URL. DiceBear is accessed via HTTP only — no npm package.

### Persistence (`src/hooks/useHistory.js`)

localStorage key `ctf-dating-sim-v1`. Stores per-player, per-character: `affection`, `confessionUnlocked`, `lastPlayed`. Uses `Object.create(null)` throughout to prevent prototype pollution.

- `useHistory(playerName)` — hook exposing `getPlayerHistory()` and `saveResult()`
- `getAllHistory()` — standalone export that returns the full storage object (all players); used by `DashboardScreen` to aggregate best scores across all player entries

### Tailwind design tokens (`tailwind.config.js`)

Custom colors: `neon-pink`, `neon-cyan`, `neon-purple`, `neon-amber`, `dark-base`, `dark-card`, `dark-panel`, `dark-border`.
Custom fonts: `font-display` (Press Start 2P), `font-body` (M PLUS Rounded 1c), `font-mono` (JetBrains Mono).
Custom animations: `float-up`, `heartbeat`, `scanline`, `glitch`, `neon-pulse`, `fade-in-up`, `blink`.
Custom shadows: `shadow-neon-cyan`, `shadow-neon-pink`, `shadow-neon-purple`, `shadow-neon-amber`, `shadow-card`.

Character colors are passed via CSS custom property `--char-color` on the screen wrapper to let children inherit the active character's color without prop-drilling.

### Google Apps Script backend (`gas/Code.gs`)

Standalone GAS file — not a Node project. Manages two Google Sheets:
- `題目` (Questions): columns id, character, difficulty, text, A–D options, correct, correctDialogue, wrongDialogue
- `回答` (Answers): per-player per-character result upsert

To deploy: set `SPREADSHEET_ID` in Code.gs, deploy as Web App (Execute as Me, Anyone access), paste the URL into `VITE_GAS_URL`.

The server re-validates all inputs and recomputes `passed` and `confessionUnlocked` server-side — client values are not trusted.

## Key conventions

- All source files are `.jsx` or `.js` — no TypeScript in `src/`
- Screen components receive `{ state, dispatch }` as props
- Component folders: `src/components/{ui,character,layout,quiz,story,results}/`
- `ScreenWrapper` wraps every screen with Framer Motion `motion.div` entry/exit animation
