import { History, CheckCircle2, Loader2, XCircle } from "lucide-react";
import styles from "./ExchangeHistory.module.css";

function StatusBadge({ status }) {
  if (status === "completed")
    return <span className={`${styles.badge} ${styles.done}`}><CheckCircle2 size={12} /> Completed</span>;
  if (status === "processing" || status === "pending")
    return <span className={`${styles.badge} ${styles.pending}`}><Loader2 size={12} className={styles.spin} /> Processing</span>;
  return <span className={`${styles.badge} ${styles.failed}`}><XCircle size={12} /> Failed</span>;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  } catch {
    return "";
  }
}

export default function ExchangeHistory({ items }) {
  return (
    <section className={styles.panel} aria-label="Recent conversions">
      <div className={styles.head}>
        <span className={styles.headIcon}><History size={16} /></span>
        <div>
          <h2 className={styles.title}>Recent Conversions</h2>
          <p className={styles.sub}>Latest reward conversions on your account</p>
        </div>
      </div>
      {!items || items.length === 0 ? (
        <p className={styles.empty}>No conversions yet. Your completed conversions will appear here.</p>
      ) : (
        <ul className={styles.list}>
          {items.slice(0, 6).map((h) => (
            <li key={h.id} className={styles.item}>
              <div className={styles.itemLeft}>
                <div className={styles.itemLabel}>{h.label || formatDate(h.createdAt) || "Recent"}</div>
                <div className={styles.itemText}>
                  {h.requiredGems} Gems → {h.receiveVEs} VEs
                </div>
                {h.createdAt && <div className={styles.itemDate}>{formatDate(h.createdAt)}</div>}
              </div>
              <StatusBadge status={h.status} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
