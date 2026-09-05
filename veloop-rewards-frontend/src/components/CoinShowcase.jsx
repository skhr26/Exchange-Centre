import { motion } from 'framer-motion';
import { ArrowLeftRight, Lock, Zap, Crown, TrendingUp, ShieldCheck, Gift } from 'lucide-react';
import styles from './CoinShowcase.module.css';

export default function CoinShowcase() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2><span className={styles.dot} /> Coin Ecosystem</h2>
        <p>Two-tier reward economy — earn instantly with VEs, multiply prestige with SVEs</p>
      </div>

      <div className={styles.grid}>
        {/* VEs Coin */}
        <motion.div
          className={`${styles.coinCard} ${styles.ves}`}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className={styles.cardGlowGold} />
          <div className={styles.topRow}>
            <div className={styles.badge}>EARN & SPEND • LIQUID</div>
            <span className={styles.live}>● Live</span>
          </div>

          <div className={styles.coinHero}>
            <motion.div className={styles.bigCoinGold} animate={{ y: [0, -8, 0], rotateY: [0, 6, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
              <span>VEs</span>
            </motion.div>
            <div>
              <h3>VEs Coin</h3>
              <div className={styles.tagline}>Watch Ads → Earn Instantly</div>
              <div className={styles.price}><span className={styles.priceBig}>1 VE = ₹0.10</span> <span className={styles.priceMuted}>• Min withdraw 1,000 VEs</span></div>
            </div>
          </div>

          <div className={styles.perks}>
            <div className={styles.perk}><Zap size={14}/> +15 to +38 VEs per ad (20-45s)</div>
            <div className={styles.perk}><Gift size={14}/> Bonus ads give 2× multiplier</div>
            <div className={styles.perk}><ShieldCheck size={14}/> Instant wallet credit • No lock-in</div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryGold}>Start Earning VEs</button>
            <button className={styles.ghost}>Withdraw Now</button>
          </div>

          <div className={styles.floatCoins}>
            <span className={styles.fCoin1}>VEs</span>
            <span className={styles.fCoin2}>+38</span>
          </div>
        </motion.div>

        {/* Center exchange */}
        <div className={styles.exchange}>
          <div className={styles.exchangeIcon}>
            <ArrowLeftRight size={18} />
          </div>
          <div className={styles.exchangeCard}>
            <div className={styles.exchangeLabel}>Convert</div>
            <div className={styles.exchangeRate}>10 VEs → 1 SVEs</div>
            <div className={styles.exchangeHint}>Stake & upgrade</div>
          </div>
          <div className={styles.vLine} />
        </div>

        {/* SVEs Coin */}
        <motion.div
          className={`${styles.coinCard} ${styles.sves}`}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className={styles.cardGlowDiamond} />
          <div className={styles.topRow}>
            <div className={`${styles.badge} ${styles.badgeDiamond}`}><Crown size={12}/> PREMIUM • STAKING • GOVERNANCE</div>
            <span className={styles.premium}>✦ Premium</span>
          </div>

          <div className={styles.coinHero}>
            <motion.div className={styles.bigCoinDiamond} animate={{ y: [0, -10, 0], rotateY: [0, -7, 0] }} transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
              <span>SVEs</span>
            </motion.div>
            <div>
              <h3>SVEs Coin</h3>
              <div className={styles.tagline}>Stake VEs → Earn SVEs Prestige</div>
              <div className={styles.price}><span className={styles.priceBigDiamond}>1 SVE ≈ ₹1.20</span> <span className={styles.priceMuted}>• 20% bonus yield</span></div>
            </div>
          </div>

          <div className={styles.perks}>
            <div className={styles.perkDiamond}><Lock size={14}/> Lock VEs 7/30/90 days → earn SVEs yield</div>
            <div className={styles.perkDiamond}><TrendingUp size={14}/> SVEs boosts lottery & leaderboard multipliers</div>
            <div className={styles.perkDiamond}><Crown size={14}/> Unlock VIP ads (+30% higher payouts)</div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryDiamond}>Stake & Earn SVEs</button>
            <button className={styles.ghost}>View APY</button>
          </div>

          <div className={styles.apyRibbon}>UP TO 18% APY • AUTO-COMPOUND</div>
        </motion.div>
      </div>
    </div>
  );
}
