import styles from './YourStats.module.css';

function MiniChart({color}) {
  const d = "M2 22 L14 14 L26 18 L38 8 L52 16 L68 12 L82 20 L96 10 L110 16";
  return (
    <svg viewBox="0 0 112 24" className={styles.chart}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${d} L110 24 L2 24 Z`} fill={`${color}18`} stroke="none" />
    </svg>
  );
}

export default function YourStats(){
  const stats=[
    {label:"Today's Earnings", value:"96 VEs", delta:"12.5%", color:"#22c55e"},
    {label:"This Week", value:"1,260 VEs", delta:"8.3%", color:"#22c55e"},
    {label:"Total Earnings", value:"12,450 VEs", delta:"", color:"#a78bfa"},
    {label:"Total Ads Watched", value:"245", delta:"", color:"#38bdf8"},
  ];
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Your Stats</h3>
      <div className={styles.grid}>
        {stats.map(s=>(
          <div key={s.label} className="brutal-card" style={{padding:'14px'}}>
            <div className={styles.top}>
              <div>
                <div className={styles.value} style={{color: s.label.includes('Total Earnings')? '#c4b5fd' : s.label.includes('Total Ads')? '#7dd3fc':'#fbbf24'}}>{s.value}</div>
                <div className={styles.label}>{s.label}</div>
              </div>
              {s.delta && <span className={styles.delta}>▲ {s.delta}</span>}
            </div>
            <MiniChart color={s.color}/>
          </div>
        ))}
      </div>
    </div>
  );
}
