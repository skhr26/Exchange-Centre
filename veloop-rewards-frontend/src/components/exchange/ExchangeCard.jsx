import { motion } from "framer-motion";
import { Gem, Coins, ArrowDown, Lock } from "lucide-react";
import styles from "./ExchangeCard.module.css";

export default function ExchangeCard({ option, gems, busy, onConvert, index = 0 }) {
  const eligible = gems >= option.requiredGems;
  const needed = Math.max(0, option.requiredGems - gems);
  const locked = !eligible;

  return (
    <motion.article
      className={`${styles.card} ${locked ? styles.locked : ""}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.3) }}
      whileHover={locked ? {} : { y: -5 }}
    >
      <span className={styles.tag}>{option.tag}</span>
      <div className={styles.head}>
        <span className={styles.vaultIcon} aria-hidden="true">🎁</span>
        <div>
          <div className={styles.rewardType}>{option.rewardType}</div>
          <div className={styles.title}>{option.title}</div>
        </div>
      </div>

      <div className={styles.conversion} aria-label={`${option.requiredGems} Gems converts to ${option.receiveVEs} VEs`}>
        <div className={styles.gemRow}><Gem size={16} /> {option.requiredGems} Gems</div>
        <div className={styles.arrowRow}>
          <span className={styles.arrowBadge}><ArrowDown size={14} /></span>
          <span className={styles.convLabel}>Reward conversion</span>
        </div>
        <div className={styles.veRow}><Coins size={16} /> {option.receiveVEs} VEs</div>
      </div>

      <p className={styles.desc}>{option.description}</p>

      {locked ? (
        <div className={styles.insufficient} role="status">
          <Lock size={13} /> You need {needed} more Gem{needed === 1 ? "" : "s"} to unlock this conversion.
        </div>
      ) : (
        <div className={styles.eligible} role="status">
          ✓ Eligible — {gems} Gems available
        </div>
      )}

      <button
        type="button"
        className={`${styles.cta} ${locked ? styles.earnBtn : styles.convertBtn}`}
        disabled={busy || locked}
        onClick={() => !locked && onConvert(option)}
        aria-label={locked ? `Earn more gems to unlock ${option.title}` : `Convert ${option.requiredGems} Gems into ${option.receiveVEs} VEs`}
      >
        {busy ? "Converting…" : locked ? "Earn More Gems" : "Convert Rewards"}
      </button>
    </motion.article>
  );
}
