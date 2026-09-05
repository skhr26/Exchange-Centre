import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WatchAds from './pages/WatchAds';
import ExchangeCenter from './pages/ExchangeCenter/ExchangeCenter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/watch-ads" replace />} />
        <Route path="/watch-ads" element={<WatchAds />} />
        <Route path="/exchange-center" element={<ExchangeCenter />} />
        <Route path="/watchAd-bonus" element={<div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}><h2>Bonus Ads Page</h2><p>Coming Soon...</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;
