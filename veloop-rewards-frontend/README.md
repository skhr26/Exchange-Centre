# VELOOP Rewards — Exchange Center (Full-Stack)

Premium **Reward Conversion Vault**: convert earned **Gems → VEs** through
predefined, server-validated exchange opportunities. Not a crypto/trading UI.

Live concept: sidebar + hero → balance strip (Gems + VEs) → Enter Gems Amount
converter → how it works → available conversions (sortable) → trust badges →
recent conversions → exchange rules.

## Features

- Premium header with Gem → VE vault visual + floating gems
- App shell with sidebar nav (Dashboard, Earn Gems, Exchange Center, …) + promo
  card, topbar with notifications + profile, drawer navigation on mobile
- Combined balance strip (**275 Gems / 500 VEs** initial, loaded from backend):
  Available Gems on the left, Available VEs on the right
- Enter Gems Amount converter: type Gems (MAX shortcut) → matched to the best
  predefined option it unlocks → VEs preview + per-option rate (1 Gem = x VEs)
  → Preview Conversion opens the server-verified confirm modal
- 6 conversion cards (28→151, 39→168, 25→120, 55→310, 120→690, 300→1750)
  with rate line, badges (Most Popular / Best Value / High Conversion),
  sort (Recommended / Lowest Gems / Highest VEs), Convert Now + Watch Ad link
- Confirm modal with **server-computed** after-balances, insufficient-Gems state
  ("Earn More Gems"), success state with confetti, `Converting…` locked button
- Recent conversions with Completed / Processing / Failed badges
- Exchange rules + 5-step "How Exchange Works"
- Loading / empty / error (+Retry) states, responsive 320px → 1920px+,
  keyboard-accessible modal (Esc), focus states, tooltips (ⓘ)

## Exchange logic (backend-proof)

The backend (`../veloop-rewards-backend/server.js`) is the source of truth:

- `GET /api/balances`, `GET /api/exchange-options`, `GET /api/history`
- `POST /api/exchange/preview` → modal shows server-computed after-balances
- `POST /api/exchange { optionId, idempotencyKey }` → validates option exists,
  checks balance at commit time, deducts Gems / adds VEs, appends history.
  422 = insufficient Gems, 409 = already processing, same idempotency key never
  converts twice. Frontend never computes balances itself.

## User flow

Earn Gems → Choose Conversion → Review Exchange → Confirm → Receive VEs.

## Components

```
src/components/exchange/
  ExchangeSidebar.jsx · ExchangeTopbar.jsx · ExchangeHero.jsx · BalanceOverview.jsx
  AmountConverter.jsx · ExchangeCard.jsx · ExchangeModal.jsx
  ExchangeHistory.jsx · ExchangeRules.jsx · HowExchangeWorks.jsx · ExchangeLoader.jsx
  TrustBadges.jsx
src/pages/ExchangeCenter/ExchangeCenter.jsx
src/services/exchangeApi.js
src/utils/exchange.js
src/data/exchangeData.js
```

## Tech stack

React 19 · Vite · Bootstrap · CSS Modules · React Hooks · lucide-react ·
Framer Motion · canvas-confetti · react-router-dom. Backend: Node built-ins only.

## Installation / local development

```bash
# terminal 1 — backend (no install needed)
cd veloop-rewards-backend
node server.js            # http://localhost:5000

# terminal 2 — frontend
cd veloop-rewards-frontend
npm install
npm run dev               # http://localhost:5173/exchange-center
```

Optional: copy `.env.example` to `.env` to point `VITE_API_URL` elsewhere.

## Build

```bash
cd veloop-rewards-frontend
npm run build
npm run preview
```

## Responsive / animation

Grid: 3 cols (desktop) → 2 (tablet) → 1 (mobile 320px+), max-width 1200px
(1280px on very large screens). Animations: page entrance, card hover lift,
floating gems, conversion pulse dots, modal spring, success confetti.

## Future backend integration

`src/services/exchangeApi.js` is the only file that knows the API base URL —
swap `VITE_API_URL` for production and everything else keeps working.
Auth can be added by attaching a token header in `request()`.
