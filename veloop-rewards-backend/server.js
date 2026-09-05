import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 5000);

// ---------------------------------------------------------------------------
// Canonical server-side truth. The frontend MUST NOT decide values.
// Initial balances as required: Gems = 275, VEs = 500
// ---------------------------------------------------------------------------
const INITIAL_GEMS = 275;
const INITIAL_VES = 500;

// Predefined exchange opportunities (server is the source of truth).
const EXCHANGE_OPTIONS = [
  {
    id: "exchange-01",
    title: "Daily Gem Conversion",
    tag: "Most popular",
    requiredGems: 28,
    receiveVEs: 151,
    description: "Convert your earned Gems into VEs.",
    rewardType: "Daily Gem Conversion",
  },
  {
    id: "exchange-02",
    title: "Standard Reward Conversion",
    tag: "Great value",
    requiredGems: 39,
    receiveVEs: 168,
    description: "Turn eligible Gems into VEs and keep your reward journey going.",
    rewardType: "Standard Conversion",
  },
  {
    id: "exchange-03",
    title: "Starter Conversion",
    tag: "Quick convert",
    requiredGems: 25,
    receiveVEs: 120,
    description: "A small, quick conversion for everyday earners.",
    rewardType: "Starter Conversion",
  },
  {
    id: "exchange-04",
    title: "Plus Reward Conversion",
    tag: "Boost",
    requiredGems: 55,
    receiveVEs: 310,
    description: "Convert a bigger Gem bundle into a bigger VE reward.",
    rewardType: "Plus Conversion",
  },
  {
    id: "exchange-05",
    title: "Mega Vault Conversion",
    tag: "High reward",
    requiredGems: 120,
    receiveVEs: 690,
    description: "Unlock the vault: convert a large Gem balance at once.",
    rewardType: "Vault Conversion",
  },
  {
    id: "exchange-06",
    title: "Grand Treasure Conversion",
    tag: "Locked — earn more",
    requiredGems: 300,
    receiveVEs: 1750,
    description: "The grand prize. Requires 300 Gems — earn more to unlock.",
    rewardType: "Grand Conversion",
  },
];

const DB_PATH = path.join(__dirname, "db.json");

function defaultState() {
  return {
    gems: INITIAL_GEMS,
    ves: INITIAL_VES,
    history: [
      {
        id: "seed-01",
        optionId: "exchange-02",
        title: "Standard Reward Conversion",
        requiredGems: 39,
        receiveVEs: 168,
        status: "completed",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        label: "Yesterday",
      },
      {
        id: "seed-02",
        optionId: "exchange-03",
        title: "Starter Conversion",
        requiredGems: 25,
        receiveVEs: 120,
        status: "completed",
        createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        label: "18 Aug",
      },
    ],
    processedKeys: {},
  };
}

function loadState() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      if (typeof parsed.gems === "number" && typeof parsed.ves === "number") return parsed;
    }
  } catch { /* use default */ }
  return defaultState();
}

let state = loadState();
let processing = false; // single-flight lock: blocks overlapping conversions

function saveState() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2));
  } catch { /* non-fatal */ }
}
saveState();

const findOption = (id) => EXCHANGE_OPTIONS.find((o) => o.id === id);
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => { raw += c; });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  if (req.method === "GET" && pathname === "/api/health") {
    return send(res, 200, { ok: true, service: "veloop-exchange-backend" });
  }
  if (req.method === "GET" && pathname === "/api/balances") {
    return send(res, 200, { gems: state.gems, ves: state.ves });
  }
  if (req.method === "GET" && pathname === "/api/exchange-options") {
    return send(res, 200, { options: EXCHANGE_OPTIONS });
  }
  if (req.method === "GET" && pathname === "/api/history") {
    return send(res, 200, { history: state.history });
  }

  if (req.method === "POST" && pathname === "/api/exchange/preview") {
    const body = await readBody(req);
    const { optionId } = body ?? {};
    if (typeof optionId !== "string" || !optionId) {
      return send(res, 400, { error: "optionId is required." });
    }
    const option = findOption(optionId);
    if (!option) return send(res, 404, { error: "Unknown conversion option." });
    const eligible = state.gems >= option.requiredGems;
    return send(res, 200, {
      option,
      balances: { gems: state.gems, ves: state.ves },
      after: { gems: state.gems - option.requiredGems, ves: state.ves + option.receiveVEs },
      eligible,
      needed: Math.max(0, option.requiredGems - state.gems),
    });
  }

  if (req.method === "POST" && pathname === "/api/exchange") {
    const body = await readBody(req);
    const { optionId, idempotencyKey } = body ?? {};
    if (typeof optionId !== "string" || !optionId.trim()) {
      return send(res, 400, { error: "optionId is required." });
    }
    const option = findOption(optionId);
    if (!option) return send(res, 404, { error: "Unknown conversion option." });

    const key = typeof idempotencyKey === "string" && idempotencyKey ? idempotencyKey : null;
    if (key && state.processedKeys[key]) {
      return send(res, 200, { ...state.processedKeys[key], deduped: true });
    }
    if (processing) {
      return send(res, 409, { error: "A conversion is already being processed. Please wait." });
    }
    processing = true;
    try {
      await delay(900); // real processing window so double-click protection is exercised
      if (state.gems < option.requiredGems) {
        return send(res, 422, {
          error: "Insufficient Gems.",
          required: option.requiredGems,
          available: state.gems,
          needed: option.requiredGems - state.gems,
        });
      }
      state.gems -= option.requiredGems;
      state.ves += option.receiveVEs;
      const record = {
        id: `conv-${Date.now()}`,
        optionId: option.id,
        title: option.title,
        requiredGems: option.requiredGems,
        receiveVEs: option.receiveVEs,
        status: "completed",
        createdAt: new Date().toISOString(),
        label: "Today",
      };
      state.history.unshift(record);
      const result = { ok: true, conversion: record, balances: { gems: state.gems, ves: state.ves } };
      if (key) state.processedKeys[key] = result;
      saveState();
      return send(res, 200, result);
    } finally {
      processing = false;
    }
  }

  if (req.method === "POST" && pathname === "/api/reset") {
    state = defaultState();
    saveState();
    return send(res, 200, { ok: true, balances: { gems: state.gems, ves: state.ves } });
  }

  return send(res, 404, { error: "Not found." });
});

server.listen(PORT, () => {
  console.log(`VELOOP exchange backend running on http://localhost:${PORT}`);
  console.log(`Balances: ${state.gems} Gems / ${state.ves} VEs (backend truth)`);
});
