import { Gem, Coins } from "lucide-react";
import styles from "./ExchangeLoader.module.css";

export default function ExchangeLoader({ text = "Preparing your reward conversions…" }) {
  return (
    <div className={styles.loader} role="status" aria-live="polite" aria-label={text}>
      <div className={styles.orbRow}>
        <span className={`${styles.orb} ${styles.gem}`}><Gem size={20} /></span>
        <span className={styles.track} aria-hidden="true"><span className={styles.shuttle} /></span>
        <span className={`${styles.orb} ${styles.ve}`}><Coins size={20} /></span>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
