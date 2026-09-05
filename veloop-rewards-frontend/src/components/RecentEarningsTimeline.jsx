import { motion } from 'framer-motion';
import { History, TrendingUp } from 'lucide-react';
import styles from './RecentEarningsTimeline.module.css';

export default function RecentEarningsTimeline() {
  const earnings = [
    { source: 'Gaming Ad', amount: '+24 VEs', time: '2m ago' },
    { source: 'Tech Review', amount: '+15 VEs', time: '12m ago' },
    { source: 'Bonus Reward', amount: '+50 VEs', time: '1h ago' },
    { source: 'Finance Ad', amount: '+28 VEs', time: '2h ago' },
    { source: 'Shopping', amount: '+20 VEs', time: '3h ago' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <History size={16} className={styles.icon} />
        <h3>Recent Earnings Timeline</h3>
      </div>
      
      <div className={styles.timelineScroll}>
        {earnings.map((item, idx) => (
          <motion.div 
            key={idx}
            className={styles.earningNode}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={styles.nodePoint}>
              <TrendingUp size={12} />
            </div>
            {idx !== earnings.length - 1 && <div className={styles.connectingLine}></div>}
            
            <div className={styles.nodeCard}>
              <span className={styles.amount}>{item.amount}</span>
              <span className={styles.source}>{item.source}</span>
              <span className={styles.time}>{item.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
