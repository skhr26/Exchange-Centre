import { Gamepad2, DollarSign, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './RecentActivity.module.css';

export default function RecentActivity() {
  const activities = [
    { 
      icon: <Gamepad2 size={16} className={styles.iconBlue} />, 
      title: 'Gaming Hub Ad', 
      reward: '+24 VEs', 
      time: '2 min ago',
      isLast: false
    },
    { 
      icon: <DollarSign size={16} className={styles.iconBlue} />, 
      title: 'Finance Services Ad', 
      reward: '+20 VEs', 
      time: '10 min ago',
      isLast: false
    },
    { 
      icon: <ShoppingCart size={16} className={styles.iconBlue} />, 
      title: 'E-commerce Ad', 
      reward: '+22 VEs', 
      time: '18 min ago',
      isLast: false
    },
    { 
      icon: <CheckCircle2 size={16} className={styles.iconBlue} />, 
      title: 'Daily Goal Reached', 
      reward: '+50 VEs', 
      time: 'Yesterday',
      isLast: true
    },
  ];

  return (
    <div className={`${styles.card} glass-panel`}>
      <h3 className={styles.title}>Recent Activity</h3>
      
      <div className={styles.timeline}>
        {activities.map((act, idx) => (
          <motion.div 
            key={idx} 
            className={styles.timelineItem}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconBg}>{act.icon}</div>
              {!act.isLast && <div className={styles.line}></div>}
            </div>
            
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.actTitle}>{act.title}</span>
              </div>
              <div className={styles.footer}>
                <span className={styles.reward}>{act.reward}</span>
                <span className={styles.time}>{act.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
