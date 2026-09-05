import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Coins, ArrowRight, Info, Sparkles, ShieldCheck } from "lucide-react";
import styles from "./ExchangeHero.module.css";
import { INFO_COPY } from "../../data/exchangeData";

function Tip({ text, label }) {
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

export default function ExchangeHero() {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className={styles.floatGem1} aria-hidden="true"><Gem size={22} /></div>
      <div className={styles.floatGem2} aria-hidden="true"><Coins size={20} /></div>

      <div className={styles.left}>
        <div className={styles.eyebrow}>
          <Sparkles size={13} /> Reward Conversion Vault
        </div>
        <h1 className={styles.title}>Exchange Center</h1>
        <p className={styles.subtitle}>Turn your earned Gems into VEs</p>
        <p className={styles.support}>
          Convert your eligible Gems into VEs and continue your reward journey.
        </p>
        <div className={styles.trustRow}>
          <span className={styles.trustPill}><ShieldCheck size={13} /> Server-verified balances</span>
          <span className={styles.trustPill}><Gem size={13} /> Gems <Tip label="What are Gems?" text={INFO_COPY.gems} /></span>
          <span className={styles.trustPill}><Coins size={13} /> VEs <Tip label="What are VEs?" text={INFO_COPY.ves} /></span>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.vault}>
          <div className={styles.gemOrb}><Gem size={30} /></div>
          <div className={styles.pathLine}>
            <span className={styles.pathDot} />
            <span className={styles.pathDot} />
            <span className={styles.pathDot} />
          </div>
          <div className={styles.veOrb}><Coins size={30} /></div>
        </div>
        <div className={styles.visualCaption}>
          <span>Gems</span>
          <span className={styles.visualArrow}><ArrowRight size={14} /></span>
          <span>VEs</span>
        </div>
      </div>
    </motion.section>
  );
}
