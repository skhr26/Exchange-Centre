import { motion } from "framer-motion";
import { Gem, MousePointerClick, ClipboardCheck, BadgeCheck, Coins } from "lucide-react";
import styles from "./HowExchangeWorks.module.css";
import { HOW_IT_WORKS } from "../../data/exchangeData";

const ICONS = [Gem, MousePointerClick, ClipboardCheck, BadgeCheck, Coins];

export default function HowExchangeWorks() {
  return (
    <section className={styles.panel} aria-label="How exchange works">
      <h2 className={styles.title}>How Exchange Works</h2>
      <p className={styles.sub}>From earned Gems to VEs in five simple steps</p>
      <ol className={styles.steps}>
        {HOW_IT_WORKS.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.li
              key={s.step}
              className={styles.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <span className={styles.stepNum}>{s.step}</span>
              <span className={styles.stepIcon}><Icon size={16} /></span>
              <div>
                <div className={styles.stepTitle}>{s.title}</div>
                <div className={styles.stepText}>{s.text}</div>
              </div>
              {i < HOW_IT_WORKS.length - 1 && <span className={styles.connector} aria-hidden="true" />}
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
