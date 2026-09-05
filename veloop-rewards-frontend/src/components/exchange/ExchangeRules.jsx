import { useState } from "react";
import { ShieldCheck, Info, ChevronDown } from "lucide-react";
import styles from "./ExchangeRules.module.css";
import { EXCHANGE_RULES, INFO_COPY } from "../../data/exchangeData";

export default function ExchangeRules() {
  const [open, setOpen] = useState(false);
  return (
    <section className={styles.panel} aria-label="Exchange rules">
      <div className={styles.head}>
        <span className={styles.headIcon}><ShieldCheck size={16} /></span>
        <h2 className={styles.title}>
          Exchange Rules
          <span className={styles.tipWrap}>
            <button
              type="button"
              className={styles.infoBtn}
              aria-label="About exchange rules"
              onClick={() => setOpen((v) => !v)}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Info size={13} />
            </button>
            {open && <span className={styles.tip} role="tooltip">{INFO_COPY.rules}</span>}
          </span>
        </h2>
      </div>
      <ul className={styles.list}>
        {EXCHANGE_RULES.map((rule) => (
          <li key={rule} className={styles.item}>
            <span className={styles.dot} aria-hidden="true" /> {rule}
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        <ChevronDown size={13} /> Conversions use predefined exchange values — never market prices.
      </p>
    </section>
  );
}
