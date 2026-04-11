# Hand Betting Game

A tile-based betting game built with Next.js. Each round you are dealt a hand of 3 tiles, you guess whether the next hand will be higher or lower, then the result is revealed. Special tiles (dragons and winds) change value over time based on your wins and losses.

---

## Setup & Running

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone the repo
git clone <repo-url>
cd hand-getting-game

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Other commands:**

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # run ESLint
```

---

## File Structure

```
hand-getting-game/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page (/)
│   ├── newgame/page.tsx        # Game screen (/newgame)
│   ├── leaderboard/page.tsx    # Leaderboard (/leaderboard)
│   ├── layout.tsx              # Root layout (fonts, global styles)
│   └── globals.css             # Global CSS + Tailwind imports
│
├── components/
│   ├── LandingPage/            # Components used only on the landing page
│   │   ├── HeroSection.tsx     # Title and tagline
│   │   ├── ActionButtons.tsx   # "New Game" and "Leaderboard" buttons
│   │   ├── FloatingTiles.tsx   # Decorative animated tiles in background
│   │   └── GameFeatures.tsx    # Feature highlights section
│   │
│   └── game/                   # Components used during active gameplay
│       ├── GameScreen.tsx       # Main game screen, composes all game components
│       ├── GameOverScreen.tsx   # Shown when game ends (score + save to leaderboard)
│       ├── GameHeader.tsx       # Score and round counter at the top
│       ├── HandDisplay.tsx      # Renders a 3-tile hand (Hand 1 or Hand 2)
│       ├── BettingButtons.tsx   # Higher / Lower bet buttons
│       ├── RoundResult.tsx      # Win / Lose / Draw result banner
│       ├── RoundHistory.tsx     # Scrollable list of past rounds
│       ├── DeckStatsBar.tsx     # Shows deck/discard counts and reshuffle info
│       └── tiles/
│           ├── NumberTile.tsx   # Renders a number tile (1–9)
│           ├── SpecialTile.tsx  # Renders a dragon or wind tile (dynamic value)
│           ├── MiniTile.tsx     # Smaller tile variant used in round history
│           └── TileRenderer.tsx # Picks the right tile component by type
│
├── store/                       # Zustand state management (one store per concern)
│   ├── useGameStore.ts          # Phase, score, round number; game lifecycle actions
│   ├── useTileStore.ts          # All 26 tiles by ID; value updates for special tiles
│   ├── useDeckStore.ts          # Draw pile, discard pile, reshuffle counter
│   ├── useRoundStore.ts         # Current round: hand IDs, guess, totals, result
│   ├── useLeaderboardStore.ts   # Persistent leaderboard entries (localStorage)
│   └── index.ts                 # Re-exports all stores
│
└── types/
    └── game.ts                  # Shared TypeScript types (Tile, GamePhase, etc.)
```

### How the pieces connect

1. **Pages** import only top-level components (`GameScreen`, `LandingPage` sections) and do no logic themselves.
2. **Game components** read state from Zustand stores and call store actions on user interaction. No prop-drilling — each component connects to the store it needs directly.
3. **Stores are independent** but interact in a defined sequence: `useGameStore` drives the phase transitions; `useRoundStore` calls into `useDeckStore` to draw tiles and into `useTileStore` to update special tile values after each round.
4. **Tiles** are initialized once in `useTileStore` with a fixed ID. The deck stores only IDs; tile data is always looked up by ID from `useTileStore`.

### Game flow

```
landing  →  betting  →  reveal  →  (loop)  →  game-over
```

- **betting**: Hand 1 is dealt; player picks Higher or Lower.
- **reveal**: Hand 2 is dealt; totals are compared; result recorded; special tile values updated.
- **game-over** triggers when any tile reaches value 0 or 10, or the deck runs out 3 times.

---

## What I Built vs. What AI Assisted With

### Built by me

- **Game logic** — all Zustand stores (`useGameStore`, `useTileStore`, `useDeckStore`, `useRoundStore`, `useLeaderboardStore`)
- **Game rules** — tile values, special tile mechanic (dragon/wind value shifting on win/lose), game-over conditions, score tracking
- **Type definitions** — `types/game.ts`
- **State architecture** — deciding how stores split responsibilities and interact with each other
- **Core algorithms** — deck initialization and shuffling, hand dealing, round resolution, reshuffle logic

### AI assisted with

- **UI components** — all files under `components/` (layout, styling, animations)
- **Page composition** — `app/page.tsx`, `app/newgame/page.tsx`, `app/leaderboard/page.tsx`
- **Tailwind styling** — color theme, responsive layout, visual polish
- **Landing page design** — `HeroSection`, `FloatingTiles`, `ActionButtons`, `GameFeatures`

The AI handled the visual layer only. All game behavior, rules, and state management were designed and written by me.
