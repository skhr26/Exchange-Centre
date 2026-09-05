import { motion } from 'framer-motion';
import styles from './BonusBanner.module.css';

export default function BonusBanner() {
  return (
    <motion.div className={styles.banner} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} whileHover={{scale:1.005}}>
      <div className={styles.left}>
        <div className={styles.gift}>🎁</div>
        <div>
          <div className={styles.title}>Bonus Ads Available!</div>
          <div className={styles.sub}>Watch bonus ads and earn extra VEs</div>
        </div>
      </div>
      <button className={styles.btn}>Watch Bonus Ads</button>
      <div className={styles.sparkles}>✦ ✦</div>
    </motion.div>
  );
}
