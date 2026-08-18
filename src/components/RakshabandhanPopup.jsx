import { useState, useEffect, useRef } from 'react';
import './RakshabandhanPopup.css';

/* ─── Cute & High-Aesthetic Flower Rakhi SVG ─── */
const Rakhi = ({ size = 80 }) => {
  return (
    <div className="rakhi-container" style={{ width: size * 2.2, height: size }}>
      {/* Silk Thread with dangling beads */}
      <svg width="100%" height="100%" viewBox="0 0 200 100" className="rakhi-threads-svg">
        <defs>
          <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(244,63,94,0)" />
            <stop offset="25%" stopColor="#db2777" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="75%" stopColor="#db2777" />
            <stop offset="100%" stopColor="rgba(244,63,94,0)" />
          </linearGradient>
          <radialGradient id="cuteBeadGold" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          <radialGradient id="cuteBeadRose" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="70%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be123c" />
          </radialGradient>
        </defs>
        
        {/* Thread path */}
        <path d="M 10 50 Q 50 38 100 50" fill="none" stroke="url(#threadGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 100 50 Q 150 62 190 50" fill="none" stroke="url(#threadGrad)" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Round glossy beads */}
        <circle cx="48" cy="44.2" r="4.5" fill="url(#cuteBeadGold)" />
        <circle cx="62" cy="46" r="3.5" fill="url(#cuteBeadRose)" />
        <circle cx="138" cy="54" r="3.5" fill="url(#cuteBeadRose)" />
        <circle cx="152" cy="55.8" r="4.5" fill="url(#cuteBeadGold)" />
      </svg>

      {/* Heartbeat Pulsating Medallion */}
      <div className="rakhi-medallion-wrap">
        <svg width={size} height={size} viewBox="0 0 100 100" className="rakhi-medallion-svg">
          <defs>
            <radialGradient id="pearlGloss" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f8fafc" />
              <stop offset="85%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>
            <radialGradient id="pinkBase" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="70%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </radialGradient>
            <radialGradient id="goldPetal" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
          </defs>

          {/* Golden base plate ring */}
          <circle cx="50" cy="50" r="37" fill="none" stroke="#fbbf24" strokeWidth="1.5" />

          {/* Round glossy flower petals (8 petals) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <circle
                key={i}
                cx="50"
                cy="23"
                r="9.5"
                fill="url(#goldPetal)"
                transform={`rotate(${angle} 50 50)`}
                stroke="#fff"
                strokeWidth="1"
              />
            );
          })}

          {/* Elevated inner pink base */}
          <circle cx="50" cy="50" r="22" fill="url(#pinkBase)" stroke="#db2777" strokeWidth="0.8" />

          {/* Center Pearl */}
          <circle cx="50" cy="50" r="8.5" fill="url(#pearlGloss)" stroke="#fbbf24" strokeWidth="1.2" />
          <circle cx="47.8" cy="47.8" r="1.5" fill="#fff" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
};

/* ─── Floating Heart & Star Particles (Swaying & Rising) ─── */
const FloatingParticles = () => {
  return (
    <div className="rakhi-particles-wrap" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => {
        const isStar = i % 3 === 1;
        const size = 6 + (i % 3) * 4;
        const delay = `${(i * 0.3) % 4.5}s`;
        const duration = `${4.5 + (i % 3.5)}s`;
        const left = `${(i / 18) * 100}%`;
        const color = ['#f43f5e', '#fbbf24', '#f472b6', '#facc15', '#ffffff'][i % 5];
        
        const style = {
          left,
          animationDelay: delay,
          animationDuration: duration,
        };

        if (isStar) {
          // Four-pointed star particle
          return (
            <div key={i} className="particle-star" style={style}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </div>
          );
        } else {
          // Heart vector particle
          return (
            <div key={i} className="particle-heart" style={style}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          );
        }
      })}
    </div>
  );
};

/* ─── Main Component ─── */
const RakshabandhanPopup = () => {
  const [phase, setPhase] = useState('hidden'); // hidden | entering | visible | leaving
  const [triggerKey, setTriggerKey] = useState(0);
  const hideTimerRef = useRef(null);
  const hideTimer2Ref = useRef(null);

  // Active theme till August 28th, 2026
  const isPeriodActive = () => {
    const now = new Date();
    const expiry = new Date('2026-08-28T23:59:59');
    return now <= expiry;
  };

  const triggerPopup = () => {
    if (!isPeriodActive()) return;

    // Clear timers
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (hideTimer2Ref.current) clearTimeout(hideTimer2Ref.current);

    setTriggerKey(prev => prev + 1);
    setPhase('entering');

    // Auto-hide after 5 seconds to let the quote breathe
    hideTimerRef.current = setTimeout(() => {
      setPhase('leaving');
      hideTimer2Ref.current = setTimeout(() => setPhase('hidden'), 600);
    }, 5000);
  };

  useEffect(() => {
    if (!isPeriodActive()) return;

    let showTimer;
    if (window.location.pathname === '/' || window.location.pathname === '/home') {
      showTimer = setTimeout(() => {
        triggerPopup();
      }, 900);
    }

    const handleTrigger = () => {
      triggerPopup();
    };
    window.addEventListener('trigger-rakhi-celebration', handleTrigger);

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (hideTimer2Ref.current) clearTimeout(hideTimer2Ref.current);
      window.removeEventListener('trigger-rakhi-celebration', handleTrigger);
    };
  }, []);

  const handleClose = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (hideTimer2Ref.current) clearTimeout(hideTimer2Ref.current);
    setPhase('leaving');
    setTimeout(() => setPhase('hidden'), 600);
  };

  const handleCTAClick = () => {
    handleClose();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/products';
    }
  };

  if (phase === 'hidden' || !isPeriodActive()) return null;

  return (
    <div
      className={`rakhi-panel rakhi-panel--${phase}`}
      role="complementary"
      aria-label="Raksha Bandhan Greeting"
      onAnimationEnd={() => { if (phase === 'entering') setPhase('visible'); }}
    >
      <FloatingParticles />

      {/* Content wrapper */}
      <div className="rakhi-content">
        {/* Combined Badge Pill */}
        <div className="rakhi-badge-pill">
          <span className="rakhi-badge-emoji">💝</span>
          <span className="rakhi-badge-text">Festive Offer • Till 28 Aug 2026</span>
        </div>

        {/* Heartbeat Pulsating Rakhi */}
        <div className="rakhi-visual-center">
          <Rakhi size={74} />
        </div>

        {/* Typographic Layout */}
        <div className="rakhi-text-block">
          <h2 className="rakhi-title">Happy Raksha Bandhan</h2>
          
          {/* Heartwarming Quote in a greeting-card note layout */}
          <div className="rakhi-quote-container">
            <span className="rakhi-quote-mark">“</span>
            <p className="rakhi-quote-text">
              A sibling is a little bit of childhood that can never be lost.
            </p>
            <span className="rakhi-quote-mark">”</span>
          </div>

          <p className="rakhi-slogan">A bond of love, the best gift of health! 🎁</p>
        </div>

        {/* Glowing Interactive CTA */}
        <button className="rakhi-cta" onClick={handleCTAClick}>
          <span className="rakhi-cta-text">Send Sibling Love</span>
          <span className="rakhi-cta-heart">❤️</span>
        </button>
      </div>

      {/* Minimal Close Button */}
      <button className="rakhi-close-btn" onClick={handleClose} aria-label="Close">✕</button>

      {/* Thin gold progress bar */}
      <div key={triggerKey} className="rakhi-progress" style={{ animationDuration: '5s' }} />
    </div>
  );
};

export default RakshabandhanPopup;
