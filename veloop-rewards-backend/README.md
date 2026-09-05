# VELOOP Rewards — Exchange Backend

Authoritative backend for the Exchange Center. **All balances and conversion
values are validated here** — the frontend only displays what this server returns.

- Initial balances: **275 Gems / 500 VEs**
- Zero dependencies (Node built-ins only — no `npm install` needed).

## Run

```bash
cd veloop-rewards-backend
node server.js
# → http://localhost:5000
```

## API

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/balances` | Authoritative `{ gems, ves }` |
| GET | `/api/exchange-options` | Canonical conversion options |
| POST | `/api/exchange/preview` | Server-computed `{ balances, after, eligible, needed }` for `{ optionId }` |
| POST | `/api/exchange` | Validated conversion for `{ optionId, idempotencyKey }`. Returns updated balances + history record. 422 on insufficient Gems, 409 if another conversion is processing. Same `idempotencyKey` never converts twice. |
| GET | `/api/history` | Conversion history |
| POST | `/api/reset` | Reset demo to 275 Gems / 500 VEs |

## Backend-proofing

- `requiredGems` / `receiveVEs` are taken from the server catalogue, never from client input.
- Balance check happens at commit time (after a ~900 ms processing window).
- Single-flight lock + idempotency keys prevent double conversion from double-clicks/retries.
- State persists to `db.json` (git-ignored).
