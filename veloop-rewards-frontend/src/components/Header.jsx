import { Bell, Wallet, Sparkles } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();
  const onExchange = location.pathname.startsWith('/exchange-center');
  const onWatch = !onExchange;
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoWrap}>
          <div className={styles.logoMark}>V</div>
          <div className={styles.logoText}>
            <span className={styles.brandName}>VELOOP</span>
            <span className={styles.brandSub}>— REWARDS —</span>
          </div>
        </div>

        <nav className={styles.navPill} aria-label="Primary">
          <NavLink to="/watch-ads" className={onWatch ? styles.navActive : undefined}>Watch Ads & Earn</NavLink>
          <NavLink to="/exchange-center" className={onExchange ? styles.navActive : undefined}>Exchange Center</NavLink>
          <a href="#ves">VEs Coin</a>
          <a href="#staking">Staking</a>
        </nav>
      </div>

      <div className={styles.right}>
        <button className={styles.bellBtn} aria-label="notifications">
          <Bell size={18} />
          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.balanceCard}>
          <div className={styles.walletIcon}><Wallet size={16} /></div>
          <div>
            <div className={styles.balanceValue}>12,450 VEs</div>
            <div className={styles.balanceLabel}>Total Balance</div>
          </div>
          <span className={styles.liveDot} title="live" />
        </div>

        <div className={styles.profileCard}>
          <img className={styles.avatar} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Velooper" alt="avatar" />
          <div className={styles.profileMeta}>
            <div className={styles.hi}>Hi, Velooper</div>
            <div className={styles.levelRow}>
              <span>Level 8</span>
              <div className={styles.levelTrack}><div className={styles.levelFill} /></div>
            </div>
          </div>
          <Sparkles size={14} className={styles.sparkle} />
        </div>
      </div>
    </header>
  );
}
