// Central API client for the Exchange Center.
// ALL balances and conversion results come from the backend —
// the frontend never computes authoritative values itself.

const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    const err = new Error("Unable to load exchange options. Please try again.");
    err.code = "NETWORK";
    throw err;
  }
  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) {
    const err = new Error(data.error || "Unable to load exchange options. Please try again.");
    err.code = res.status === 422 ? "INSUFFICIENT" : res.status === 409 ? "BUSY" : "API";
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const exchangeApi = {
  base: BASE,
  getBalances: () => request("/api/balances"),
  getOptions: () => request("/api/exchange-options"),
  getHistory: () => request("/api/history"),
  preview: (optionId) =>
    request("/api/exchange/preview", {
      method: "POST",
      body: JSON.stringify({ optionId }),
    }),
  convert: (optionId, idempotencyKey) =>
    request("/api/exchange", {
      method: "POST",
      body: JSON.stringify({ optionId, idempotencyKey }),
    }),
  reset: () => request("/api/reset", { method: "POST" }),
};

export function newIdempotencyKey() {
  return `key-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
