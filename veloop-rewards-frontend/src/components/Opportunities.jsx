import { useState, useEffect } from 'react';
import { ShoppingBag, Building2, GraduationCap, HeartPulse, Plane, UtensilsCrossed, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './Opportunities.module.css';

export default function Opportunities() {
  const [isLoading, setIsLoading] = useState(true);
  const [completedAds, setCompletedAds] = useState([]);
  const [activeAd, setActiveAd] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);

  const cards = [
    { id: 1, icon: ShoppingBag, bg: '#ef4444', label: 'Advertiser 1', sub: 'Premium Shopping', reward: '+38 VEs', time: '30 Seconds', cat: 'shop' },
    { id: 2, icon: Building2, bg: '#2563eb', label: 'Advertiser 2', sub: 'Finance & Banking', reward: '+20 VEs', time: '45 Seconds', cat: 'finance' },
    { id: 3, icon: GraduationCap, bg: '#7c3aed', label: 'Advertiser 3', sub: 'Online Education', reward: '+15 VEs', time: '20 Seconds', cat: 'edu' },
    { id: 4, icon: HeartPulse, bg: '#059669', label: 'Advertiser 4', sub: 'Health & Fitness', reward: '+25 VEs', time: '30 Seconds', cat: 'health' },
    { id: 5, icon: Plane, bg: '#0ea5e9', label: 'Advertiser 5', sub: 'Travel & Tourism', reward: '+30 VEs', time: '35 Seconds', cat: 'travel' },
    { id: 6, icon: UtensilsCrossed, bg: '#f59e0b', label: 'Advertiser 6', sub: 'Food & Delivery', reward: '+18 VEs', time: '25 Seconds', cat: 'food' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const handleClaim = (e, card) => {
    if (completedAds.includes(card.id) || activeAd) return;
    setActiveAd(card.id);
    setTimeout(() => {
      setActiveAd(null);
      setCompletedAds(prev => [...prev, card.id]);
      const rect = e.target.getBoundingClientRect();
      confetti({
        particleCount: 120, spread: 70,
        origin: { x: (rect.left + rect.width/2)/window.innerWidth, y: (rect.top+rect.height/2)/window.innerHeight },
        colors: ['#7c3aed','#f59e0b','#22c55e','#38bdf8','#fff']
      });
      setToastMessage(`Reward Added! You earned ${card.reward}`);
      setTimeout(() => setToastMessage(null), 3200);
    }, 1400);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <div className={styles.titleIcon}><span className={styles.playDot}>▶</span></div>
          <div>
            <h2 className={styles.sectionTitle}>Available Advertisements</h2>
            <div className={styles.subtitle}>Watch ads and earn VEs instantly</div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <label className={styles.autoPlay}>
            Auto Play
            <button className={`${styles.toggle} ${autoPlay ? styles.on : ''}`} onClick={()=>setAutoPlay(!autoPlay)}><span/></button>
          </label>
          <button className={styles.howBtn}>How It Works ?</button>
        </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div className={styles.toast} initial={{opacity:0, y:40, scale:0.98}} animate={{opacity:1,y:0, scale:1}} exit={{opacity:0, y:-10}}>
            <span className={styles.toastIcon}>✓</span>
            <div><div className={styles.toastTitle}>Reward Added!</div><div className={styles.toastSub}>{toastMessage.replace('Reward Added! ','')}</div></div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className={styles.grid}>
          {[1,2,3,4,5,6].map(n=>(
            <div key={n} className={`brutal-card ${styles.card} ${styles.skeleton}`}>
              <div className={styles.skelHead}>
                <div className={styles.skelIcon}/><div className={styles.skelLines}><div/><div/></div>
              </div>
              <div className={styles.skelBar}/>
              <div className={styles.skelBtn}/>
            </div>
          ))}
        </div>
      ) : (
        <motion.div className={styles.grid} initial="hidden" animate="visible" variants={{hidden:{opacity:0}, visible:{opacity:1, transition:{staggerChildren:0.06}}}}>
          {cards.map(card=>{
            const isDone = completedAds.includes(card.id);
            const isWatching = activeAd===card.id;
            const Icon = card.icon;
            return (
              <motion.div key={card.id} variants={{hidden:{y:16, opacity:0}, visible:{y:0, opacity:1}}}
                className={`brutal-card ${styles.card} ${isDone ? styles.done : ''}`}
                whileHover={isDone?{}:{y:-5}}
              >
                <span className={styles.available}>Available</span>
                <div className={styles.cardHead}>
                  <div className={styles.iconBig} style={{background: card.bg}}><Icon size={26} color="#fff"/></div>
                  <div className={styles.headText}>
                    <div className={styles.advName}>{card.label}</div>
                    <div className={styles.advSub}>{card.sub}</div>
                    <div className={styles.reward}>{card.reward}</div>
                    <div className={styles.timeRow}><Clock size={11}/> {card.time}</div>
                  </div>
                </div>
                <button
                  className={`${styles.watchBtn} ${isDone?styles.doneBtn:''} ${isWatching?styles.watching:''}`}
                  onClick={(e)=>handleClaim(e,card)}
                  disabled={isDone || !!activeAd}
                >
                  {isDone ? <><CheckCircle size={14}/> Completed</> : isWatching ? <><Loader2 size={14} className={styles.spin}/> Watching...</> : <>Watch Advertisement <span>▶</span></>}
                </button>
                <div className={styles.cardShine}/>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
