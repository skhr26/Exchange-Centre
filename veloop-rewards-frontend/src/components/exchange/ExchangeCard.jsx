import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gem, ArrowRight, Info, Lock, Play } from "lucide-react";
import styles from "./ExchangeCard.module.css";
import { gemRate } from "../../utils/exchange";
import { INFO_COPY } from "../../data/exchangeData";

export default function ExchangeCard({ option, badge, gems, busy, onConvert, index = 0 }) {
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
      {badge && <span className={styles.tag}>{badge}</span>}
      <div className={styles.visualRow} aria-hidden="true">
        <span className={styles.gemMini}><Gem size={20} /></span>
        <ArrowRight size={17} className={styles.miniArrow} />
        <span className={styles.veMini}>VE</span>
      </div>

      <div className={styles.amounts}>
        <span className={styles.gemAmount}>{option.requiredGems} Gems</span>
        <span className={styles.veAmount}>{option.receiveVEs} VEs</span>
      </div>
      <div className={styles.rateLine}>
        1 Gem = {gemRate(option)} VEs
        <span className={styles.rateInfo} title={INFO_COPY.rate}><Info size={13} /></span>
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
        {busy ? "Converting…" : locked ? "Earn More Gems" : "Convert Now"}
      </button>
      <Link to="/watch-ads" className={styles.watchLink}>
        <Play size={12} /> Watch Ad to proceed
      </Link>
    </motion.article>
  );
}
