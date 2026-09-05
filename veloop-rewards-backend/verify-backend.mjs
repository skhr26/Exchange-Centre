// One-shot backend verification: spawns server.js, exercises the API, exits.
// Run: node verify-backend.mjs  (from veloop-rewards-backend/)
import { spawn } from "node:child_process";

const PORT = 5001;
const server = spawn(process.execPath, ["server.js"], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: "pipe",
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForReady(tries = 30) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/api/health`);
      if (r.ok) return true;
    } catch { /* not up yet */ }
    await sleep(300);
  }
  return false;
}

let failed = 0;
const check = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"} - ${name}${extra ? ` (${extra})` : ""}`);
  if (!cond) failed++;
};

try {
  const ready = await waitForReady();
  check("server starts", ready);
  if (!ready) throw new Error("server did not start");

  const j = async (path, opts) => (await fetch(`http://localhost:${PORT}${path}`, opts)).json();
  const r = async (path, opts) => fetch(`http://localhost:${PORT}${path}`, opts);

  await fetch(`http://localhost:${PORT}/api/reset`, { method: "POST" });

  const b = await j("/api/balances");
  check("initial balances 275 Gems / 500 VEs", b.gems === 275 && b.ves === 500, JSON.stringify(b));

  const o = await j("/api/exchange-options");
  check("6 exchange options", Array.isArray(o.options) && o.options.length === 6, `${o.options?.length} found`);
  const o1 = o.options.find((x) => x.id === "exchange-01");
  check("exchange-01 is 28 Gems -> 151 VEs", o1?.requiredGems === 28 && o1?.receiveVEs === 151);

  const p = await j("/api/exchange/preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionId: "exchange-01" }),
  });
  check("preview computes after-balances", p.after?.gems === 247 && p.after?.ves === 651, JSON.stringify(p.after));

  const c1 = await j("/api/exchange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionId: "exchange-01", idempotencyKey: "test-key-1" }),
  });
  check("exchange applies (247 / 651)", c1.ok && c1.balances.gems === 247 && c1.balances.ves === 651, JSON.stringify(c1.balances));

  const c1dup = await j("/api/exchange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionId: "exchange-01", idempotencyKey: "test-key-1" }),
  });
  const b2 = await j("/api/balances");
  check("idempotent retry does not double-convert", c1dup.deduped === true && b2.gems === 247 && b2.ves === 651, JSON.stringify(b2));

  const insuf = await r("/api/exchange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionId: "exchange-06", idempotencyKey: "test-key-2" }),
  });
  check("insufficient Gems rejected (422)", insuf.status === 422, `status=${insuf.status}`);

  const h = await j("/api/history");
  check("history records conversion", Array.isArray(h.history) && h.history.some((x) => x.optionId === "exchange-01" && x.status === "completed"));

  await fetch(`http://localhost:${PORT}/api/reset`, { method: "POST" });
  const b3 = await j("/api/balances");
  check("reset restores 275 / 500", b3.gems === 275 && b3.ves === 500, JSON.stringify(b3));
} catch (e) {
  console.log(`FAIL - ${e.message}`);
  failed++;
} finally {
  server.kill();
}

console.log(failed === 0 ? "ALL_BACKEND_TESTS_PASSED" : `${failed}_TESTS_FAILED`);
process.exit(failed === 0 ? 0 : 1);
