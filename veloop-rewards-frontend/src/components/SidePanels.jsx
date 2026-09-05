import { Play, Coins, IndianRupee, Building2, Wallet, ArrowRight } from 'lucide-react';
import styles from './SidePanels.module.css';

export function HowYouEarn() {
  const steps = [
    { n: 1, title: 'Watch Advertisements', sub: 'Earn VEs by watching short ads', icon: Play, color: '#7c3aed' },
    { n: 2, title: 'Earn VEs Instantly', sub: 'VEs will be added to your wallet', icon: Coins, color: '#f59e0b' },
    { n: 3, title: 'Convert to Real Cash', sub: 'Convert your VEs into INR', icon: IndianRupee, color: '#10b981' },
    { n: 4, title: 'Withdraw to Bank', sub: 'Withdraw directly to your bank', icon: Building2, color: '#0ea5e9' },
  ];
  return (
    <div className={`glass-panel ${styles.panel}`}>
      <h3 className={styles.panelTitle}>How You Earn?</h3>
      <div className={styles.steps}>
        {steps.map(s=>(
          <div key={s.n} className={styles.step}>
            <div className={styles.stepIcon} style={{background: s.color}}><s.icon size={14} color="#fff"/></div>
            <div className={styles.stepText}>
              <div className={styles.stepTitle}>{s.n}. {s.title}</div>
              <div className={styles.stepSub}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VEToCash() {
  return (
    <div className={`glass-panel ${styles.panel} ${styles.cashPanel}`}>
      <h3 className={styles.panelTitle}>VE to Cash Conversion</h3>
      <div className={styles.cashRow}>
        <div className={styles.coinStack}>
          <span className={styles.stackCoin}>₵</span>
          <span className={styles.plus}>+</span>
        </div>
        <div>
          <div className={styles.rate}>1 VE = <span>₹0.10</span></div>
          <div className={styles.min}>Minimum Withdrawal: 1,000 VEs</div>
        </div>
      </div>
      <button className={styles.withdrawBtn}>Withdraw Now</button>
      <div className={styles.svesHint}>
        <span className={styles.svesPill}>SVEs</span> Stake 1,000 VEs → get 1.2× value via SVEs
      </div>
    </div>
  );
}

export function RecentEarnings() {
  const rows = [
    { icon: Wallet, label: 'Advertiser 1', val: '+38 VEs', time: 'Just Now', color: '#ef4444' },
    { icon: Building2, label: 'Advertiser 2', val: '+20 VEs', time: '2 min ago', color: '#2563eb' },
    { icon: Wallet, label: 'Advertiser 3', val: '+15 VEs', time: '5 min ago', color: '#7c3aed' },
  ];
  return (
    <div className={`glass-panel ${styles.panel}`}>
      <div className={styles.panelHead}>
        <h3 className={styles.panelTitle} style={{margin:0}}>Recent Earnings</h3>
        <a className={styles.viewAll} href="#all">View All</a>
      </div>
      <div className={styles.earnList}>
        {rows.map((r,i)=>(
          <div key={i} className={styles.earnRow}>
            <div className={styles.earnIcon} style={{background: r.color}}><r.icon size={12} color="#fff"/></div>
            <div className={styles.earnLabel}>{r.label}</div>
            <div className={styles.earnVal}>{r.val}</div>
            <div className={styles.earnTime}>{r.time}</div>
          </div>
        ))}
      </div>
      <div className={styles.rewardToast}>
        <div className={styles.toastCheck}>✓</div>
        <div>
          <div className={styles.toastTitle}>Reward Added!</div>
          <div className={styles.toastSub}>You earned +38 VEs</div>
        </div>
        <ArrowRight size={12} className={styles.toastArrow}/>
      </div>
    </div>
  );
}

export default function SidePanels() {
  return (
    <div className={styles.sidebar}>
      <HowYouEarn/>
      <VEToCash/>
      <RecentEarnings/>
    </div>
  );
}
