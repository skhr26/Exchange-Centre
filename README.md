# VELOOP Rewards — Exchange Center (Full-Stack)

Premium **Reward Conversion Vault**: convert earned **Gems → VEs** through
predefined, server-validated exchange opportunities. This is a reward
conversion feature — not a crypto/trading interface.

## Folders

```
Internship Project/
├── veloop-rewards-backend/    # Node API (zero dependencies) — source of truth
│   ├── server.js              # Balances + validated Gem → VE conversions
│   └── verify-backend.mjs     # One-shot API test (10 checks)
└── veloop-rewards-frontend/   # React + Vite Exchange Center UI
    └── src/
        ├── components/exchange/  # Sidebar, Topbar, Hero, BalanceOverview,
        │                         # AmountConverter, ExchangeCard, ExchangeModal,
        │                         # History, Rules, HowItWorks, Loader, TrustBadges
        ├── pages/ExchangeCenter/ # ExchangeCenter.jsx (route: /exchange-center)
        ├── services/exchangeApi.js# Backend API client (only place with API URL)
        ├── utils/exchange.js    # matchOption / gemRate helpers
        └── data/exchangeData.js # Copy, rules, steps, fallback values
```

## Quick start (local)

```bash
# Terminal 1 — backend (no install needed)
cd veloop-rewards-backend
node server.js            # http://localhost:5000

# Terminal 2 — frontend
cd veloop-rewards-frontend
npm install
npm run dev               # http://localhost:5173/exchange-center
```

Initial demo balances: **275 Gems / 500 VEs**. Reset anytime from the
balance strip or via `POST /api/reset`.

## How the exchange stays backend-proof

- The frontend never computes balances — it only renders `GET /api/balances`
  and `GET /api/exchange-options`.
- The confirm modal shows after-balances from `POST /api/exchange/preview`.
- `POST /api/exchange { optionId, idempotencyKey }` validates the option,
  checks the balance at commit time (422 if insufficient, 409 if busy),
  then deducts Gems / adds VEs and records history. Retried keys return the
  previous result without converting twice.

Verify anytime: `cd veloop-rewards-backend && node verify-backend.mjs`

## Build / deploy

```bash
cd veloop-rewards-frontend
npm run build             # outputs dist/
```

- Backend → Render Web Service (root: `veloop-rewards-backend`, start: `node server.js`)
- Frontend → Vercel/Netlify (root: `veloop-rewards-frontend`) with env var
  `VITE_API_URL=https://<your-backend-url>`

See `veloop-rewards-frontend/README.md` and `veloop-rewards-backend/README.md`
for full details.
