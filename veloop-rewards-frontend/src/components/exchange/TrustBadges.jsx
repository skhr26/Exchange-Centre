import { ShieldCheck, Zap, Repeat, Headphones } from "lucide-react";
import styles from "./TrustBadges.module.css";

const BADGES = [
  { icon: ShieldCheck, title: "Secure & Trusted", text: "All conversions are safe, secure and processed instantly." },
  { icon: Zap, title: "Instant Credit", text: "VEs will be added to your account immediately after conversion." },
  { icon: Repeat, title: "One-way Conversion", text: "Once converted, Gems cannot be reversed." },
  { icon: Headphones, title: "Need Help?", text: "Contact our support team for any assistance." },
];

export default function TrustBadges() {
  return (
    <section className={styles.row} aria-label="Why convert with VELOOP">
      {BADGES.map((b) => {
        const Icon = b.icon;
        return (
          <div key={b.title} className={styles.badge}>
            <span className={styles.icon}><Icon size={17} /></span>
            <div>
              <div className={styles.title}>{b.title}</div>
              <div className={styles.text}>{b.text}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
