import { Video, CheckCircle, Target, Gift } from 'lucide-react';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const steps = [
    { icon: <Video size={24} className={styles.iconBlue} />, label: 'Watch' },
    { icon: <CheckCircle size={24} className={styles.iconBlue} />, label: 'Earn' },
    { icon: <Target size={24} className={styles.iconBlue} />, label: 'Reach Goal' },
    { icon: <Gift size={24} className={styles.iconBlue} />, label: 'Redeem' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>How it works</h2>
      
      <div className={styles.stepsWrapper}>
        <div className={styles.stepsLine}></div>
        <div className={styles.steps}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.step}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconOuter}>
                  <div className={styles.iconInner}>
                    {step.icon}
                  </div>
                </div>
              </div>
              <span className={styles.label}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
