import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Info, RotateCcw, AlertTriangle, PackageOpen, ArrowDownUp } from "lucide-react";
import ExchangeSidebar from "../../components/exchange/ExchangeSidebar";
import ExchangeTopbar from "../../components/exchange/ExchangeTopbar";
import ExchangeHero from "../../components/exchange/ExchangeHero";
import BalanceOverview from "../../components/exchange/BalanceOverview";
import AmountConverter from "../../components/exchange/AmountConverter";
import ExchangeCard from "../../components/exchange/ExchangeCard";
import ExchangeModal from "../../components/exchange/ExchangeModal";
import ExchangeHistory from "../../components/exchange/ExchangeHistory";
import ExchangeRules from "../../components/exchange/ExchangeRules";
import HowExchangeWorks from "../../components/exchange/HowExchangeWorks";
import ExchangeLoader from "../../components/exchange/ExchangeLoader";
import TrustBadges from "../../components/exchange/TrustBadges";
import { exchangeApi, newIdempotencyKey } from "../../services/exchangeApi";
import { INFO_COPY } from "../../data/exchangeData";
import styles from "./ExchangeCenter.module.css";

const rateOf = (o) => o.receiveVEs / o.requiredGems;

export default function ExchangeCenter() {
  const [balances, setBalances] = useState({ gems: 275, ves: 500 });
  const [options, setOptions] = useState([]);
  const [history, setHistory] = useState([]);
  const [phase, setPhase] = useState("loading"); // loading | ready | error | empty
  const [loadError, setLoadError] = useState("");
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalState, setModalState] = useState("confirm"); // confirm | processing | success | error
  const [modalError, setModalError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [busy, setBusy] = useState(false); // global single-flight lock (prevents double conversion)
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [sort, setSort] = useState("recommended");
  const attemptKey = useRef(null);

  const loadAll = useCallback(async () => {
    setPhase("loading");
    setLoadError("");
    try {
      const [b, o, h] = await Promise.all([
        exchangeApi.getBalances(),
        exchangeApi.getOptions(),
        exchangeApi.getHistory(),
      ]);
      setBalances({ gems: b.gems, ves: b.ves });
      setOptions(o.options ?? []);
      setHistory(h.history ?? []);
      setPhase((o.options ?? []).length === 0 ? "empty" : "ready");
    } catch (e) {
      setLoadError(e.message || "Unable to load exchange options. Please try again.");
      setPhase("error");
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Card badges derived from backend values (presentation only).
  const badges = useMemo(() => {
    if (options.length === 0) return {};
    const best = options.reduce((a, b) => (rateOf(b) > rateOf(a) ? b : a));
    const max = options.reduce((a, b) => (b.receiveVEs > a.receiveVEs ? b : a));
    const map = {};
    map[options[0].id] = "🔥 Most Popular";
    if (!map[best.id]) map[best.id] = "⭐ Best Value";
    if (!map[max.id]) map[max.id] = "↗ High Conversion";
    return map;
  }, [options]);

  const sortedOptions = useMemo(() => {
    const list = [...options];
    if (sort === "gems-asc") list.sort((a, b) => a.requiredGems - b.requiredGems);
    else if (sort === "ves-desc") list.sort((a, b) => b.receiveVEs - a.receiveVEs);
    return list;
  }, [options, sort]);

  // Open modal + fetch server-side preview (backend-proof after-balances)
  const handleConvert = async (option) => {
    if (busy) return;
    setSelected(option);
    setPreview(null);
    setModalError("");
    setModalState("confirm");
    setModalOpen(true);
    try {
      const p = await exchangeApi.preview(option.id);
      setPreview(p);
    } catch (e) {
      setModalState("error");
      setModalError(e.message || "Unable to verify this conversion. Please try again.");
    }
  };

  const handleConfirm = async () => {
    if (!selected || busy || modalState === "processing") return;
    setBusy(true);
    setModalState("processing");
    setModalError("");
    attemptKey.current = newIdempotencyKey();
    try {
      // No client-side balance math: the server validates + returns new balances.
      const result = await exchangeApi.convert(selected.id, attemptKey.current);
      setBalances({ ...result.balances });
      // Refresh preview to the authoritative post-conversion balances for the success screen.
      setPreview({
        option: selected,
        balances: { ...result.balances },
        after: { gems: result.balances.gems, ves: result.balances.ves },
      });
      try {
        const h = await exchangeApi.getHistory();
        setHistory(h.history ?? []);
      } catch { /* history refresh is best-effort */ }
      setModalState("success");
      setToast(`+${selected.receiveVEs} VEs added to your balance`);
    } catch (e) {
      if (e.code === "BUSY") {
        setModalState("error");
        setModalError("A conversion is already being processed. Please wait a moment and try again.");
      } else if (e.code === "INSUFFICIENT") {
        setModalState("error");
        const needed = e.data?.needed ?? Math.max(0, selected.requiredGems - balances.gems);
        setModalError(`Insufficient Gems. You need ${needed} more Gem${needed === 1 ? "" : "s"} to unlock this conversion.`);
        // Refresh balances from server in case they changed.
        try {
          const b = await exchangeApi.getBalances();
          setBalances({ gems: b.gems, ves: b.ves });
        } catch { /* ignore */ }
      } else {
        setModalState("error");
        setModalError(e.message || "Conversion failed. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  const closeModal = () => {
    if (modalState === "processing") return;
    setModalOpen(false);
    setSelected(null);
    setPreview(null);
    setModalError("");
    setModalState("confirm");
  };

  const handleReset = async () => {
    if (resetting) return;
    setResetting(true);
    try {
      const r = await exchangeApi.reset();
      setBalances({ ...r.balances });
      const h = await exchangeApi.getHistory();
      setHistory(h.history ?? []);
      setToast("Demo balances reset to 275 Gems / 500 VEs");
    } catch {
      setToast("Reset failed — is the backend running on :5000?");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className={styles.shell}>
      <ExchangeSidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className={styles.body}>
        <ExchangeTopbar onMenu={() => setNavOpen(true)} />
        <main className={styles.main}>
          <ExchangeHero />

          <BalanceOverview
            gems={balances.gems}
            ves={balances.ves}
            loading={phase === "loading"}
            onReset={handleReset}
            resetting={resetting}
          />

          {toast && (
            <div className={styles.toast} role="status">
              <span className={styles.toastIcon}>✓</span> {toast}
            </div>
          )}

          {phase === "loading" && <ExchangeLoader />}

          {phase === "error" && (
            <div className={styles.stateBox} role="alert">
              <span className={styles.stateIcon}><AlertTriangle size={26} /></span>
              <h3>Unable to load exchange options.</h3>
              <p>{loadError || "Please try again."}</p>
              <p className={styles.hint}>Make sure the backend is running: <code>node server.js</code> in <code>veloop-rewards-backend</code> (:5000).</p>
              <button type="button" className={styles.retryBtn} onClick={loadAll}>
                <RotateCcw size={14} /> Retry
              </button>
            </div>
          )}

          {phase !== "loading" && phase !== "error" && (
            <>
              <AmountConverter
                options={options}
                balance={balances.gems}
                busy={busy}
                onPreview={handleConvert}
              />

              <HowExchangeWorks />

              <section className={styles.section} aria-label="Available conversions">
                <div className={styles.sectionHead}>
                  <div>
                    <h2 className={styles.sectionTitle}>✨ Available Conversions</h2>
                    <p className={styles.sectionSub}>
                      Choose the best conversion option for your Gems.{" "}
                      <span className={styles.inlineInfo} title={INFO_COPY.rate}>
                        <Info size={13} />
                      </span>
                    </p>
                  </div>
                  <label className={styles.sortWrap}>
                    <ArrowDownUp size={13} />
                    <span className={styles.sortLabel}>Sort by:</span>
                    <select
                      className={styles.sortSelect}
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      aria-label="Sort conversions"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="gems-asc">Lowest Gems</option>
                      <option value="ves-desc">Highest VEs</option>
                    </select>
                  </label>
                </div>

                {phase === "empty" ? (
                  <div className={styles.stateBox}>
                    <span className={styles.stateIcon}><PackageOpen size={26} /></span>
                    <h3>No conversions available right now.</h3>
                    <p>New reward conversion opportunities will appear here when available.</p>
                  </div>
                ) : (
                  <div className={styles.grid}>
                    {sortedOptions.map((opt, i) => (
                      <ExchangeCard
                        key={opt.id}
                        option={opt}
                        badge={badges[opt.id]}
                        gems={balances.gems}
                        busy={busy}
                        index={i}
                        onConvert={handleConvert}
                      />
                    ))}
                  </div>
                )}
              </section>

              <TrustBadges />

              <div className={styles.twoCol}>
                <ExchangeHistory items={history} />
                <ExchangeRules />
              </div>
            </>
          )}
        </main>
      </div>

      <ExchangeModal
        open={modalOpen}
        state={modalState}
        option={selected}
        preview={preview}
        error={modalError}
        onCancel={closeModal}
        onConfirm={handleConfirm}
        onContinue={closeModal}
      />
    </div>
  );
}
