import { useMemo, useState } from "react";
import { Gem, ArrowRightLeft, Info, ArrowRight } from "lucide-react";
import styles from "./AmountConverter.module.css";
import { matchOption, gemRate } from "../../utils/exchange";
import { INFO_COPY } from "../../data/exchangeData";

export default function AmountConverter({ options, balance, busy, onPreview }) {
  const [raw, setRaw] = useState("");
  const amount = raw === "" ? 0 : Number(raw);
  const matched = useMemo(() => matchOption(amount, options), [amount, options]);
  const smallest = useMemo(
    () => options.reduce((m, o) => Math.min(m, o.requiredGems), Infinity),
    [options]
  );
  const overBalance = amount > balance;

  const handleChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
    setRaw(v);
  };

  return (
    <section className={styles.panel} aria-label="Enter Gems amount">
      <h2 className={styles.title}>Enter Gems Amount</h2>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.gemIcon} aria-hidden="true"><Gem size={20} /></span>
          <span className={styles.inputWrap}>
            <input
              type="text"
              inputMode="numeric"
              className={styles.input}
              placeholder="0"
              value={raw}
              onChange={handleChange}
              aria-label="Gems to convert"
            />
            <span className={styles.fieldCaption}>Gems to convert</span>
          </span>
          <button
            type="button"
            className={styles.maxBtn}
            onClick={() => setRaw(String(balance))}
            aria-label={`Use maximum ${balance} Gems`}
          >
            MAX
          </button>
        </label>

        <span className={styles.swapBadge} aria-hidden="true"><ArrowRightLeft size={16} /></span>

        <div className={styles.field} aria-live="polite">
          <span className={styles.veCount}>{matched ? matched.receiveVEs : 0}</span>
          <span className={styles.inputWrap}>
            <span className={styles.veLabel}>VEs you will receive</span>
          </span>
          <span className={styles.veCoin} aria-hidden="true">VE</span>
        </div>

        <button
          type="button"
          className={styles.previewBtn}
          disabled={!matched || busy}
          onClick={() => matched && onPreview(matched)}
        >
          Preview Conversion <ArrowRight size={15} />
        </button>
      </div>

      <div className={styles.rateRow}>
        {matched ? (
          <span className={styles.rate}>
            <Gem size={12} /> 1 Gem = {gemRate(matched)} VEs
            <span className={styles.rateInfo} title={INFO_COPY.rate}><Info size={13} /></span>
            <span className={styles.matchedTag}>Unlocks: {matched.title}</span>
          </span>
        ) : (
          <span className={styles.hint}>
            {raw !== "" && amount > 0 && amount < smallest
              ? `Enter at least ${smallest} Gems to unlock a conversion.`
              : "Type your Gems to see the VEs you will receive."}
          </span>
        )}
        {overBalance && (
          <span className={styles.warn}>Exceeds your {balance} Gems balance — server will verify.</span>
        )}
      </div>
    </section>
  );
}
