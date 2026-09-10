import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Info, RefreshCcw, ShieldCheck } from "lucide-react";
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
    <motion.section
      className={styles.strip}
      aria-label="Your balances"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left — Gems balance */}
      <div className={styles.half}>
        <span className={`${styles.tokenIcon} ${styles.gemIcon}`} aria-hidden="true">
          <Gem size={26} />
        </span>
        <div className={styles.meta}>
          <span className={styles.label}>
            Available Gems <InfoTip label="What are Gems?" text={INFO_COPY.gems} />
          </span>
          <span className={`${styles.amount} ${styles.gemAmount}`} aria-live="polite">
            {loading ? <span className={styles.shimmer} /> : Number(gems).toLocaleString("en-IN")}
          </span>
          <span className={styles.unit}>Gems</span>
        </div>
      </div>

      <span className={styles.divider} aria-hidden="true" />

      {/* Right — VEs balance */}
      <div className={styles.half}>
        <span className={`${styles.tokenIcon} ${styles.veIcon}`} aria-hidden="true">
          VE
        </span>
        <div className={styles.meta}>
          <span className={styles.label}>
            Available VEs <InfoTip label="What are VEs?" text={INFO_COPY.ves} />
          </span>
          <span className={`${styles.amount} ${styles.veAmount}`} aria-live="polite">
            {loading ? <span className={styles.shimmer} /> : Number(ves).toLocaleString("en-IN")}
          </span>
          <span className={styles.unit}>VEs</span>
        </div>
      </div>

      {/* Slim verified footer */}
      <div className={styles.footer}>
        <span className={styles.verified}>
          <ShieldCheck size={13} /> Server-verified balances
        </span>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={onReset}
          disabled={loading || resetting}
          aria-label="Reset demo balances to 275 Gems and 500 VEs"
        >
          <RefreshCcw size={12} /> {resetting ? "Resetting…" : "Reset demo (275 / 500)"}
        </button>
      </div>
    </motion.section>
  );
}
