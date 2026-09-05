import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgGlow} />
      <div className={styles.bgGrid} />

      {/* floating particles */}
      <div className={styles.particles}>
        <span className={styles.p1} />
        <span className={styles.p2} />
        <span className={styles.p3} />
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            LIVE REWARDS • INSTANT PAYOUTS
            <Sparkles size={12} />
          </div>
          <h1 className={styles.title}>
            <span className={styles.gradientText}>Watch Ads & Earn</span>
          </h1>
          <p className={styles.subtitle}>
            Watch short advertisements and earn <b>VEs</b>. Convert your VEs into real cash and withdraw to your bank — plus stake for <b>SVEs</b> premium rewards.
          </p>

          <div className={styles.ctas}>
            <button className={`brutal-btn ${styles.primaryCta}`}>
              <Play size={16} fill="white" /> Start Watching
            </button>
            <button className={styles.secondaryCta}>How it works <ArrowRight size={16} /></button>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.avatars}>
              <img src="https://i.pravatar.cc/100?img=11" alt="" />
              <img src="https://i.pravatar.cc/100?img=22" alt="" />
              <img src="https://i.pravatar.cc/100?img=33" alt="" />
            </div>
            <div className={styles.trustText}>
              <strong>12k+ Veloopers</strong> earned today
              <span>★ 4.9/5 rating</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className={styles.ring} />
          <div className={styles.ring2} />

          {/* clapperboard card */}
          <div className={styles.clapperCard}>
            <div className={styles.clapperTop}>
              <span /><span /><span /><span /><span /><span />
            </div>
            <div className={styles.clapperBody}>
              <div className={styles.playOrb}>
                <Play size={28} fill="#fff" color="#fff" />
              </div>
              <div className={styles.clapperMeta}>
                <div className={styles.clapTitle}>PREMIUM ADS</div>
                <div className={styles.clapSub}>45 sec • +38 VEs</div>
              </div>
            </div>
            <div className={styles.shine} />
          </div>

          {/* floating VE coin */}
          <motion.div
            className={styles.coin}
            animate={{ y: [0, -10, 0], rotateY: [0, 8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={styles.coinInner}>
              <span className={styles.coinText}>VEs</span>
              <span className={styles.coinSub}>COIN</span>
            </div>
            <div className={styles.coinEdge} />
          </motion.div>

          {/* small SVE coin */}
          <motion.div
            className={styles.sCoin}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <span>SVEs</span>
          </motion.div>

          <div className={styles.floatingBadge}>
            <span className={styles.badgeDot} /> +38 VEs credited instantly
          </div>
        </motion.div>
      </div>
    </section>
  );
}
