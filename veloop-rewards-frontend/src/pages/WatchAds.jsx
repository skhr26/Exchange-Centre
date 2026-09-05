import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import CoinShowcase from '../components/CoinShowcase';
import BonusBanner from '../components/BonusBanner';
import Opportunities from '../components/Opportunities';
import SidePanels from '../components/SidePanels';
import YourStats from '../components/YourStats';
import styles from './WatchAds.module.css';

export default function WatchAds() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <HeroSection />
      
      <main className={styles.mainContent}>
        <StatsBar />
        <BonusBanner />
        
        <div className={styles.contentGrid}>
          <div className={styles.mainCol}>
            <CoinShowcase />
            <Opportunities />
            <YourStats />
          </div>
          <aside className={styles.sideCol}>
            <SidePanels />
          </aside>
        </div>
      </main>
    </div>
  );
}
