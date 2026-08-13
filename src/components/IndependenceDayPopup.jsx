import { useState, useEffect, useRef } from 'react';
import './IndependenceDayPopup.css';

/* ─── Ashoka Chakra (24 spokes) ─── */
const AshokaChakra = ({ size = 60 }) => {
  const spokes = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="chakra-svg">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#003580" strokeWidth="4" />
      <circle cx="50" cy="50" r="8"  fill="#003580" />
      <circle cx="50" cy="50" r="3"  fill="#fff" />
      {spokes.map((i) => {
        const rad = ((i * 15 - 90) * Math.PI) / 180;
        const x1 = 50 + 10 * Math.cos(rad);
        const y1 = 50 + 10 * Math.sin(rad);
        const x2 = 50 + 44 * Math.cos(rad);
        const y2 = 50 + 44 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#003580" strokeWidth="2" strokeLinecap="round" />;
      })}
    </svg>
  );
};

/* ─── Firework Spark ─── */
const Spark = ({ style }) => <div className="spark" style={style} />;

/* ─── Fireworks burst ─── */
const Fireworks = () => {
  const bursts = [
    { top: '10%', left: '15%', color: '#FF9933', delay: '0s' },
    { top: '20%', left: '75%', color: '#138808', delay: '0.6s' },
    { top: '55%', left: '5%',  color: '#FFD700', delay: '1.1s' },
    { top: '70%', left: '85%', color: '#FF9933', delay: '0.3s' },
    { top: '35%', left: '50%', color: '#fff',    delay: '0.9s' },
  ];
  return (
    <div className="fireworks-wrap" aria-hidden="true">
      {bursts.map((b, bi) =>
        Array.from({ length: 8 }, (_, si) => {
          const angle = (si / 8) * 360;
          return (
            <Spark
              key={`${bi}-${si}`}
              style={{
                top: b.top,
                left: b.left,
                '--color': b.color,
                '--angle': `${angle}deg`,
                animationDelay: b.delay,
              }}
            />
          );
        })
      )}
    </div>
  );
};

/* ─── Floating particles ─── */
const Particles = () =>
  Array.from({ length: 18 }, (_, i) => (
    <div
      key={i}
      className="id-particle"
      style={{
        left: `${(i / 18) * 100}%`,
        width: `${4 + (i % 4) * 2}px`,
        height: `${4 + (i % 4) * 2}px`,
        backgroundColor: ['#FF9933','#138808','#FFD700','#fff'][i % 4],
        animationDelay: `${(i * 0.3) % 3}s`,
        animationDuration: `${3 + (i % 3)}s`,
      }}
    />
  ));

/* ─── Main Component ─── */
const IndependenceDayPopup = () => {
  const [phase, setPhase] = useState('hidden'); // hidden | entering | visible | leaving
  const [triggerKey, setTriggerKey] = useState(0);
  const hideTimerRef = useRef(null);
  const hideTimer2Ref = useRef(null);

  const triggerPopup = () => {
    // Clear any existing hide timers
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (hideTimer2Ref.current) clearTimeout(hideTimer2Ref.current);

    setTriggerKey(prev => prev + 1);
    setPhase('entering');

    // Auto-hide after 3 s
    hideTimerRef.current = setTimeout(() => {
      setPhase('leaving');
      hideTimer2Ref.current = setTimeout(() => setPhase('hidden'), 600);
    }, 3000);
  };

  useEffect(() => {
    // Show on page load / refresh ONLY on home page
    let showTimer;
    if (window.location.pathname === '/' || window.location.pathname === '/home') {
      showTimer = setTimeout(() => {
        triggerPopup();
      }, 900);
    }

    // Listen for manual trigger
    const handleTrigger = () => {
      triggerPopup();
    };
    window.addEventListener('trigger-independence-celebration', handleTrigger);

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (hideTimer2Ref.current) clearTimeout(hideTimer2Ref.current);
      window.removeEventListener('trigger-independence-celebration', handleTrigger);
    };
  }, []);

  const handleClose = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (hideTimer2Ref.current) clearTimeout(hideTimer2Ref.current);
    setPhase('leaving');
    setTimeout(() => setPhase('hidden'), 600);
  };

  if (phase === 'hidden') return null;

  return (
    <div
      className={`id-panel id-panel--${phase}`}
      role="complementary"
      aria-label="Independence Day Greeting"
      onAnimationEnd={() => { if (phase === 'entering') setPhase('visible'); }}
    >
      <Fireworks />
      <Particles />

      {/* Flag ribbon across top */}
      <div className="id-ribbon">
        <div className="id-ribbon-saffron" />
        <div className="id-ribbon-white">
          <AshokaChakra size={28} />
        </div>
        <div className="id-ribbon-green" />
      </div>

      {/* Glow blobs */}
      <div className="id-blob id-blob-a" aria-hidden="true" />
      <div className="id-blob id-blob-b" aria-hidden="true" />

      {/* Content */}
      <div className="id-content">
        {/* Flag emoji + year pill */}
        <div className="id-top-row">
          {/* <span className="id-flag-emoji">🇮🇳</span> */}
          <span className="id-year-pill">15 Aug 2026</span>
        </div>

        {/* Big chakra */}
        <div className="id-chakra-center">
          <AshokaChakra size={90} />
          <div className="id-chakra-ring" />
        </div>

        {/* Main text */}
        <div className="id-text-block">
          <p className="id-vande">वंदे मातरम्</p>
          <h2 className="id-title">Happy Independence Day</h2>
          <p className="id-subtitle">80<sup>th</sup> Year of Freedom &amp; Democracy</p>
          <p className="id-slogan">Proud to be Indian</p>
        </div>

        {/* Divider */}
        <div className="id-divider">
          <span className="id-divider-dot" style={{ background: '#FF9933' }} />
          <span className="id-divider-dot" style={{ background: '#fff' }} />
          <span className="id-divider-dot" style={{ background: '#138808' }} />
        </div>

        {/* CTA */}
        <button className="id-cta" onClick={handleClose}>
          <span>Jai Hind! 🎉</span>
        </button>
      </div>

      {/* Dismiss button */}
      <button className="id-x" onClick={handleClose} aria-label="Close">✕</button>

      {/* Progress bar auto-close */}
      <div key={triggerKey} className="id-progress" style={{ animationDuration: '3s' }} />
    </div>
  );
};

export default IndependenceDayPopup;
