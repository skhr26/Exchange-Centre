import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Gem,
  ArrowLeftRight,
  Coins,
  ReceiptText,
  User,
  LifeBuoy,
  X,
  Gift,
  ArrowRight,
} from "lucide-react";
import styles from "./ExchangeSidebar.module.css";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, to: null },
  { label: "Earn Gems", icon: Gem, to: "/watch-ads" },
  { label: "Exchange Center", icon: ArrowLeftRight, to: "/exchange-center" },
  { label: "My VEs", icon: Coins, to: null },
  { label: "Transactions", icon: ReceiptText, to: null },
  { label: "Profile", icon: User, to: null },
  { label: "Help & Support", icon: LifeBuoy, to: null },
];

export default function ExchangeSidebar({ open, onClose }) {
  const location = useLocation();
  return (
    <>
      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`} aria-label="Exchange Center navigation">
        <div className={styles.brandRow}>
          <span className={styles.logo} aria-hidden="true">🌀</span>
          <span className={styles.brandText}>
            <strong>VELOOP</strong>
            <small>REWARDS</small>
          </span>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close navigation">
            <X size={16} />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/exchange-center" && location.pathname.startsWith("/exchange-center");
            const cls = `${styles.navItem} ${active ? styles.active : ""}`;
            return item.to ? (
              <Link key={item.label} to={item.to} className={cls} aria-current={active ? "page" : undefined} onClick={onClose}>
                <Icon size={17} /> {item.label}
              </Link>
            ) : (
              <span key={item.label} className={`${cls} ${styles.soon}`} title="Coming soon">
                <Icon size={17} /> {item.label}
              </span>
            );
          })}
        </nav>

        <div className={styles.promo}>
          <span className={styles.promoArt} aria-hidden="true"><Gift size={30} /></span>
          <p className={styles.promoTitle}>More Rewards.<br />More Happiness!</p>
          <p className={styles.promoText}>Convert your Gems and enjoy amazing benefits with VEs.</p>
          <button type="button" className={styles.promoBtn}>
            Learn More <ArrowRight size={14} />
          </button>
        </div>
      </aside>
    </>
  );
}
