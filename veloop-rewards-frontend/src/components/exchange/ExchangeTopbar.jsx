import { Bell, Menu } from "lucide-react";
import styles from "./ExchangeTopbar.module.css";

export default function ExchangeTopbar({ onMenu }) {
  return (
    <div className={styles.topbar}>
      <button type="button" className={styles.menuBtn} onClick={onMenu} aria-label="Open navigation">
        <Menu size={18} />
      </button>
      <span className={styles.spacer} />
      <button type="button" className={styles.bellBtn} aria-label="Notifications">
        <Bell size={17} />
        <span className={styles.dot} />
      </button>
      <div className={styles.userChip}>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Velooper" alt="Your profile" className={styles.avatar} />
        <span className={styles.userName}>Velooper</span>
      </div>
    </div>
  );
}
