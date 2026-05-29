import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// CSS INJECTION: PURE CSS FOR ULTRA-PREMIUM CINEMATIC DESIGN
// ============================================================================
const loginStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
  /* Core Colors */
  --bg-deep: #030305;
  --bg-panel: rgba(10, 10, 15, 0.4);
  --bg-input: rgba(0, 0, 0, 0.5);
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a0a0b8;
  --text-muted: #5a5a70;
  
  /* Accents & Glows */
  --accent-gold: #d4af37;
  --accent-gold-glow: rgba(212, 175, 55, 0.4);
  --accent-blue: #8ab4f8;
  --accent-blue-glow: rgba(138, 180, 248, 0.2);
  --accent-red: #ff4d4d;
  --accent-red-glow: rgba(255, 77, 77, 0.3);
  
  /* Borders */
  --border-dim: rgba(255, 255, 255, 0.05);
  --border-light: rgba(255, 255, 255, 0.15);
  
  /* Fonts */
  --font-cinzel: 'Cinzel', serif;
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-inter: 'Inter', sans-serif;

  /* Transitions */
  --ease-cinematic: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-deep);
  color: var(--text-primary);
  font-family: var(--font-inter);
  overflow: hidden; /* Prevent scroll on login */
  -webkit-font-smoothing: antialiased;
}

/* ==========================================================================
   ANIMATIONS
   ========================================================================== */
@keyframes ambientBreathe {
  0%, 100% { transform: scale(1); opacity: 0.3; filter: blur(60px); }
  50% { transform: scale(1.2); opacity: 0.5; filter: blur(80px); }
}

@keyframes particleAscend {
  0% { transform: translateY(100vh) scale(0) rotate(0deg); opacity: 0; }
  20% { opacity: var(--max-opacity); transform: translateY(80vh) scale(1) rotate(45deg); }
  80% { opacity: var(--max-opacity); }
  100% { transform: translateY(-20vh) scale(0.5) rotate(180deg); opacity: 0; }
}

@keyframes sacredSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes reverseSpin {
  from { transform: translate(-50%, -50%) rotate(360deg); }
  to { transform: translate(-50%, -50%) rotate(0deg); }
}

@keyframes cardEntrance {
  from { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmerEffect {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes shakeError {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes glowPulseRed {
  0%, 100% { box-shadow: 0 0 15px var(--accent-red-glow); }
  50% { box-shadow: 0 0 30px rgba(255, 77, 77, 0.6); }
}

@keyframes successFlash {
  0% { opacity: 0; background: transparent; }
  20% { opacity: 1; background: #ffffff; }
  100% { opacity: 1; background: #ffffff; }
}

@keyframes sacredSpinner {
  0% { transform: rotate(0deg); stroke-dashoffset: 280; }
  50% { transform: rotate(180deg); stroke-dashoffset: 70; }
  100% { transform: rotate(360deg); stroke-dashoffset: 280; }
}

/* ==========================================================================
   LAYOUT & BACKGROUND
   ========================================================================== */
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: radial-gradient(circle at center, #0f1016 0%, var(--bg-deep) 100%);
  perspective: 1000px;
}

.ambient-glow-1 {
  position: absolute;
  top: 30%;
  left: 20%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, var(--accent-blue-glow) 0%, transparent 60%);
  border-radius: 50%;
  animation: ambientBreathe 15s infinite ease-in-out;
  pointer-events: none;
  z-index: 0;
}

.ambient-glow-2 {
  position: absolute;
  bottom: 20%;
  right: 15%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
  border-radius: 50%;
  animation: ambientBreathe 20s infinite ease-in-out reverse;
  pointer-events: none;
  z-index: 0;
}

/* Sacred Mandala Backgrounds */
.sacred-mandala-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120vmin;
  height: 120vmin;
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
  animation: sacredSpin 120s linear infinite;
}
.sacred-mandala-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80vmin;
  height: 80vmin;
  opacity: 0.05;
  pointer-events: none;
  z-index: 1;
  animation: reverseSpin 90s linear infinite;
}

/* Particles */
.particles-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}
.particle {
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ffffff, 0 0 20px var(--accent-blue);
  animation: particleAscend linear infinite;
}

/* ==========================================================================
   LOGIN CARD
   ========================================================================== */
.login-card-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  padding: 0 2rem;
  animation: cardEntrance 1.2s var(--ease-cinematic) forwards;
}

.login-card {
  position: relative;
  background: var(--bg-panel);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  padding: 3.5rem 3rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.8),
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    inset 0 -1px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth);
}
.login-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  opacity: 0.5;
}

.login-card:hover {
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.9),
    0 0 30px rgba(212, 175, 55, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

.login-card.has-error {
  animation: shakeError 0.5s var(--ease-smooth) forwards;
  border-color: var(--accent-red);
  box-shadow: 0 0 30px var(--accent-red-glow), inset 0 0 15px rgba(255,77,77,0.1);
}

/* ==========================================================================
   LOGO & HEADER
   ========================================================================== */
.card-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 1s var(--ease-cinematic) 0.2s forwards;
  opacity: 0;
}

.brand-logo-container {
  position: relative;
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.brand-logo-container svg {
  width: 100%;
  height: 100%;
  color: var(--accent-gold);
  filter: drop-shadow(0 0 15px var(--accent-gold-glow));
}
.brand-logo-spin {
  position: absolute;
  inset: -10px;
  border: 1px dashed var(--accent-gold);
  border-radius: 50%;
  opacity: 0.3;
  animation: sacredSpin 20s linear infinite;
}

.brand-title {
  font-family: var(--font-cinzel);
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #a0a0b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

.brand-subtitle {
  font-family: var(--font-cormorant);
  font-size: 1.1rem;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  font-style: italic;
}

/* ==========================================================================
   INPUT FIELDS
   ========================================================================== */
.form-group {
  position: relative;
  margin-bottom: 2rem;
  animation: fadeInUp 1s var(--ease-cinematic) 0.4s forwards;
  opacity: 0;
}
.form-group:nth-child(2) {
  animation-delay: 0.5s;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  transition: color 0.3s var(--ease-smooth);
  width: 20px;
  height: 20px;
  z-index: 2;
}

.input-field {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-dim);
  border-radius: 8px;
  padding: 1.2rem 1rem 1.2rem 3.5rem;
  color: var(--text-primary);
  font-family: var(--font-inter);
  font-size: 1rem;
  transition: all 0.3s var(--ease-smooth);
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
}

.input-field:focus {
  outline: none;
  background: rgba(15, 15, 20, 0.8);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 
    inset 0 2px 10px rgba(0,0,0,0.5),
    0 0 20px rgba(255,255,255,0.05);
}

.input-field:focus + .input-label,
.input-field:not(:placeholder-shown) + .input-label {
  top: -0.6rem;
  left: 0.8rem;
  font-size: 0.75rem;
  color: var(--accent-gold);
  background: var(--bg-deep);
  padding: 0 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.1em;
}

.input-field:focus ~ .input-icon {
  color: var(--accent-gold);
  filter: drop-shadow(0 0 5px var(--accent-gold-glow));
}

.input-label {
  position: absolute;
  left: 3.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-family: var(--font-cinzel);
  font-size: 0.9rem;
  text-transform: uppercase;
  pointer-events: none;
  transition: all 0.3s var(--ease-cinematic);
  z-index: 1;
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
  transition: all 0.4s var(--ease-cinematic);
  transform: translateX(-50%);
}
.input-field:focus ~ .input-highlight {
  width: 80%;
  box-shadow: 0 -2px 10px var(--accent-gold-glow);
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease;
}
.password-toggle:hover {
  color: var(--text-primary);
}

/* ==========================================================================
   BUTTON & ACTIONS
   ========================================================================== */
.form-actions {
  margin-top: 3rem;
  animation: fadeInUp 1s var(--ease-cinematic) 0.6s forwards;
  opacity: 0;
  position: relative;
}

.btn-submit {
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1.2rem;
  color: var(--text-primary);
  font-family: var(--font-cinzel);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s var(--ease-cinematic);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.btn-submit::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: skewX(-25deg);
  transition: all 0.7s var(--ease-smooth);
}

.btn-submit:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--accent-gold);
  box-shadow: 
    0 10px 30px rgba(0,0,0,0.5),
    0 0 20px var(--accent-gold-glow),
    inset 0 0 10px rgba(212,175,55,0.2);
  color: var(--accent-gold);
  transform: translateY(-2px);
}

.btn-submit:hover:not(:disabled)::before {
  animation: shimmerEffect 1.5s infinite;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ==========================================================================
   LOADING SPINNER
   ========================================================================== */
.loading-spinner {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: var(--accent-gold);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 280;
  animation: sacredSpinner 2s cubic-bezier(0.68, -0.55, 0.26, 1.55) infinite;
}

/* ==========================================================================
   ERROR MESSAGE
   ========================================================================== */
.error-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 77, 77, 0.05);
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 8px;
  margin-bottom: 2rem;
  color: var(--accent-red);
  font-size: 0.9rem;
  animation: fadeInUp 0.4s var(--ease-smooth) forwards;
  box-shadow: inset 0 0 15px rgba(255,0,0,0.1);
}
.error-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* ==========================================================================
   FOOTER
   ========================================================================== */
.card-footer {
  margin-top: 2rem;
  text-align: center;
  animation: fadeInUp 1s var(--ease-cinematic) 0.8s forwards;
  opacity: 0;
}
.footer-text {
  font-family: var(--font-inter);
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}
.footer-text span {
  color: var(--accent-gold);
  font-family: var(--font-cinzel);
  text-transform: uppercase;
}

/* ==========================================================================
   SUCCESS OVERLAY
   ========================================================================== */
.success-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.success-overlay.active {
  animation: successFlash 2s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}
.success-symbol {
  opacity: 0;
  transform: scale(0.5);
  transition: all 1s var(--ease-cinematic);
  color: var(--accent-gold);
  width: 200px;
  height: 200px;
}
.success-overlay.active .success-symbol {
  opacity: 1;
  transform: scale(1.2);
  filter: drop-shadow(0 0 50px var(--accent-gold));
}

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 600px) {
  .login-card {
    padding: 2.5rem 1.5rem;
    border-radius: 16px;
    border-left: none;
    border-right: none;
    backdrop-filter: blur(16px);
  }
  .brand-title {
    font-size: 2rem;
  }
}
`;

// ============================================================================
// SVG ICONS & COMPONENTS
// ============================================================================
const SanctumLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M50 35 L65 60 L35 60 Z" fill="currentColor" opacity="0.8" />
    <circle cx="50" cy="50" r="5" fill="var(--bg-deep)" />
  </svg>
);

const MandalaPath = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <path d="M100 10 L120 80 L190 100 L120 120 L100 190 L80 120 L10 100 L80 80 Z" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M100 30 L115 85 L170 100 L115 115 L100 170 L85 115 L30 100 L85 85 Z" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </>
    )}
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Login() {
  const navigate = useNavigate();
  
  // State variables
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Background particles engine
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 15 + 10;
      const opacity = Math.random() * 0.5 + 0.1;
      return { id: i, size, left, delay, duration, opacity };
    });
  }, []);

  // Form submission handler
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    if (!userId || !password) {
      setError('Please provide your divine credentials to enter.');
      return;
    }

    setLoading(true);

    try {
      // Simulate network request as requested by fetch API usage
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(userId),
          password: password
        })
      });

      let data;
      const contentType = response.headers.get("content-type");
      
      // Safety check for JSON parsing
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        // Fallback for mocked response if backend is unreachable but we want to simulate success
        // In a true prod app, we'd throw an error. For this prompt's completeness and robust UI testing:
        if (!response.ok) throw new Error('Sacred connection interrupted.');
      }

      // Process response based on prompt rules
      if (data && data.success) {
        // Set success state to trigger cinematic flash animation
        setSuccess(true);
        
        // Store in localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('tier', data.tier);
        
        // Delay navigation to allow success animation to play
        setTimeout(() => {
          navigate('/dashboard');
        }, 1800);
      } else {
        // Handle explicit failure from backend
        setError(data?.message || 'The cosmic gates remain closed. Invalid credentials.');
        setLoading(false);
      }
      
    } catch (err) {
      console.error('Login Error:', err);
      setError('A disturbance in the ether prevented your login.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Injecting pure CSS directly */}
      <style dangerouslySetInnerHTML={{ __html: loginStyles }} />

      {/* Cinematic Ambient Backgrounds */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Sacred Rotating Mandalas */}
      <div className="sacred-mandala-bg">
        <MandalaPath />
      </div>
      <div className="sacred-mandala-inner">
        <MandalaPath />
      </div>

      {/* Floating Dust Particles */}
      <div className="particles-layer">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--max-opacity': p.opacity
            }}
          />
        ))}
      </div>

      {/* Main Login UI */}
      <div className="login-card-wrapper">
        <div className={`login-card ${error ? 'has-error' : ''}`}>
          
          {/* Header Section */}
          <div className="card-header">
            <div className="brand-logo-container">
              <div className="brand-logo-spin"></div>
              <SanctumLogo />
            </div>
            <h1 className="brand-title">Sanctum</h1>
            <p className="brand-subtitle">Ascend Beyond the Mortal Plane</p>
          </div>

          {/* Error Toast */}
          {error && (
            <div className="error-container">
              <div className="error-icon"><AlertIcon /></div>
              <span>{error}</span>
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleLogin} noValidate>
            
            {/* User ID Input */}
            <div className="form-group">
              <input
                type="text"
                id="userId"
                className="input-field"
                placeholder=" "
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                autoComplete="off"
                disabled={loading || success}
              />
              <label htmlFor="userId" className="input-label">Devotee ID</label>
              <div className="input-icon"><UserIcon /></div>
              <div className="input-highlight"></div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="input-field"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                disabled={loading || success}
              />
              <label htmlFor="password" className="input-label">Sacred Cipher</label>
              <div className="input-icon"><LockIcon /></div>
              <div className="input-highlight"></div>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                disabled={loading || success}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading || success}
              >
                {loading ? (
                  <>
                    <svg className="loading-spinner" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45"></circle>
                    </svg>
                    Communing...
                  </>
                ) : (
                  'Enter Sanctum'
                )}
              </button>
            </div>
          </form>

          {/* Footer Text */}
          <div className="card-footer">
            <p className="footer-text">
              By entering, you bind your spirit to the <span>Eternal Ledger</span>.
            </p>
          </div>

        </div>
      </div>

      {/* Success Flash Cinematic Overlay */}
      <div className={`success-overlay ${success ? 'active' : ''}`}>
        {success && (
          <div className="success-symbol">
            <SanctumLogo />
          </div>
        )}
      </div>

    </div>
  );
}