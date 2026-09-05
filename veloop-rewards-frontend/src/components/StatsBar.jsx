import { Coins, Wallet, PlaySquare, CheckCircle2, Info } from 'lucide-react';
import styles from './StatsBar.module.css';

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <div className={`${styles.iconWrap} ${styles.gold}`}><Coins size={18} /></div>
        <div className={styles.meta}>
          <div className={styles.label}>Today's Earnings</div>
          <div className={styles.value}>96 VEs</div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <div className={`${styles.iconWrap} ${styles.purple}`}><Wallet size={18} /></div>
        <div className={styles.meta}>
          <div className={styles.label}>Total VEs Earned</div>
          <div className={styles.value}>12,450 VEs</div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <div className={`${styles.iconWrap} ${styles.blue}`}><PlaySquare size={18} /></div>
        <div className={styles.meta}>
          <div className={styles.label}>Available Ads</div>
          <div className={styles.value}>12</div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <div className={`${styles.iconWrap} ${styles.green}`}><CheckCircle2 size={18} /></div>
        <div className={styles.meta}>
          <div className={styles.label}>Ads Completed</div>
          <div className={styles.value}>5</div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.progressWrap}>
        <div className={styles.progressMeta}>
          <div className={styles.progressLabel}>Daily Progress <Info size={12} /></div>
          <div className={styles.progressTrack}><div className={styles.progressFill} /></div>
          <div className={styles.progressSub}>5 / 12 Ads Completed</div>
        </div>
        <div className={styles.circle}>
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" className={styles.bgRing} />
            <circle cx="22" cy="22" r="18" className={styles.fgRing} />
          </svg>
          <span>42%</span>
        </div>
      </div>
    </div>
  );
}
