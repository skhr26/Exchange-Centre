import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Coins, Info, RefreshCcw } from "lucide-react";
import styles from "./BalanceOverview.module.css";
import { INFO_COPY } from "../../data/exchangeData";

function InfoTip({ label, text }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={styles.tipWrap}>
      <button
        type="button"
        className={styles.infoBtn}
        aria-label={label}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
      >
        <Info size={13} />
      </button>
      {open && <span className={styles.tip} role="tooltip">{text}</span>}
    </span>
  );
}

export default function BalanceOverview({ gems, ves, loading, onReset, resetting }) {
  return (
    <section className={styles.grid} aria-label="Your balances">
      <motion.div
        className={`${styles.card} ${styles.gemCard}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.cardTop}>
          <span className={styles.iconBadge}><Gem size={18} /></span>
          <span className={styles.label}>
            Available Gems <InfoTip label="What are Gems?" text={INFO_COPY.gems} />
          </span>
        </div>
        <div className={styles.value} aria-live="polite">
          {loading ? <span className={styles.shimmer} /> : <>💎 {Number(gems).toLocaleString("en-IN")}</>}
        </div>
        <div className={styles.sub}>Eligible for reward conversion</div>
      </motion.div>

      <motion.div
        className={`${styles.card} ${styles.veCard}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <div className={styles.cardTop}>
          <span className={styles.iconBadge}><Coins size={18} /></span>
          <span className={styles.label}>
            Available VEs <InfoTip label="What are VEs?" text={INFO_COPY.ves} />
          </span>
        </div>
        <div className={styles.value} aria-live="polite">
          {loading ? <span className={styles.shimmer} /> : <>{Number(ves).toLocaleString("en-IN")} VEs</>}
        </div>
        <div className={styles.sub}>Virtual reward currency</div>
      </motion.div>

      <motion.div
        className={`${styles.card} ${styles.noteCard}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
      >
        <div className={styles.noteTitle}>Backend-verified</div>
        <p className={styles.noteText}>
          Balances are loaded from the server and every conversion is validated there.
        </p>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={onReset}
          disabled={loading || resetting}
          aria-label="Reset demo balances to 275 Gems and 500 VEs"
        >
          <RefreshCcw size={13} /> {resetting ? "Resetting…" : "Reset demo (275 / 500)"}
        </button>
      </motion.div>
    </section>
  );
}
