import { motion } from 'framer-motion';
import styles from './DashboardOverview.module.css';

export default function DashboardOverview() {
  const stats = [
    { label: 'Total Earnings', value: '116 VEs' },
    { label: 'Available Ads', value: '6' },
    { label: 'Watched Ads', value: '12' },
    { label: 'Remaining Tasks', value: '54' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            className="brutal-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={styles.statCardContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className={`brutal-card ${styles.milestoneCard}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className={styles.milestoneHeader}>
          <h3>Milestone</h3>
          <div className={styles.progressInfo}>
            <span className={styles.progressText}>
              <span className={styles.highlight}>96</span> / 100 VEs
            </span>
            <span className={styles.percentage}>96%</span>
          </div>
        </div>
        
        <div className={styles.progressBarBg}>
          <motion.div 
            className={styles.progressBarFill}
            initial={{ width: 0 }}
            animate={{ width: '96%' }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
        
        <p className={styles.milestoneHint}>Earn 100 VEs to get 2 Lucky Spins</p>
      </motion.div>
    </div>
  );
}
