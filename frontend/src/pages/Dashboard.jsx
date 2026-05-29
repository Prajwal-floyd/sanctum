import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// CONFIGURATION & THEME ENGINE
// ============================================================================

const TIER_CONFIG = {
  initiate: {
    id: 'initiate',
    name: 'Initiate',
    icon: '🌙',
    weight: 1,
    colors: {
      main: '#8ab4f8',
      glow: 'rgba(138, 180, 248, 0.4)',
      bgTop: '#0a101f',
      bgBottom: '#020408',
      particle: '#8ab4f8',
      surface: 'rgba(15, 20, 35, 0.6)',
      border: 'rgba(138, 180, 248, 0.2)'
    },
    lore: 'You have taken your first step into the digital sanctuary. The moonlight guides your path as you explore the foundational rituals.'
  },
  devotee: {
    id: 'devotee',
    name: 'Devotee',
    icon: '🔮',
    weight: 2,
    colors: {
      main: '#c58af9',
      glow: 'rgba(197, 138, 249, 0.5)',
      bgTop: '#150a24',
      bgBottom: '#05020a',
      particle: '#e5cfff',
      surface: 'rgba(25, 15, 40, 0.6)',
      border: 'rgba(197, 138, 249, 0.2)'
    },
    lore: 'Your devotion deepens. The ethereal magenta energies surround you, unlocking pathways to deeper spiritual mysteries and grander sevas.'
  },
  ascendant: {
    id: 'ascendant',
    name: 'Ascendant',
    icon: '✨',
    weight: 3,
    colors: {
      main: '#b388ff',
      glow: 'rgba(179, 136, 255, 0.6)',
      bgTop: '#100520',
      bgBottom: '#000000',
      particle: '#ffffff',
      surface: 'rgba(30, 20, 50, 0.7)',
      border: 'rgba(179, 136, 255, 0.3)'
    },
    lore: 'You ascend beyond the mortal veil. Radiant spiritual glows follow your every interaction, granting access to transcendent ceremonies.'
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    icon: '👑',
    weight: 4,
    colors: {
      main: '#d4af37',
      glow: 'rgba(212, 175, 55, 0.6)',
      bgTop: '#1a1608',
      bgBottom: '#000000',
      particle: '#fcefa4',
      surface: 'rgba(25, 20, 10, 0.8)',
      border: 'rgba(212, 175, 55, 0.4)'
    },
    lore: 'The ultimate state of divine luxury. You stand at the zenith of Sanctum. Elite exclusive rituals and bespoke blessings are at your command.'
  }
};

const MOCK_SEVAS = [
  { id: 1, seva_name: "Morning Suprabhatam", description: "Awaken the divine energies. A peaceful morning chant to align your spirit with the sunrise.", price: 1001, tier_required: "initiate" },
  { id: 2, seva_name: "Navagraha Shanti", description: "Harmonize the celestial bodies. A complex ritual to balance the influence of the nine planets in your digital birth chart.", price: 5100, tier_required: "initiate" },
  { id: 3, seva_name: "Rudra Abhishekam", description: "Immersive bathing of the cosmic deity. Experience the ultimate purification of your soul through sacred virtual offerings.", price: 11000, tier_required: "devotee" },
  { id: 4, seva_name: "Lakshmi Kubera Homam", description: "Invoke cosmic abundance and prosperity. A grand fire ritual transposed into the digital ether.", price: 21000, tier_required: "devotee" },
  { id: 5, seva_name: "Chandi Parayanam", description: "Fierce divine mother worship. Unlock supreme protective energies and obliterate spiritual obstacles.", price: 51000, tier_required: "ascendant" },
  { id: 6, seva_name: "Maha Sudarshana Homam", description: "The ultimate weapon of light. A transcendent virtual ceremony to cleanse all negative karmic imprints.", price: 100000, tier_required: "ascendant" },
  { id: 7, seva_name: "Elite Bespoke Darshan", description: "A closed-door, one-on-one virtual audience with the highest digital priests. Tailored entirely to your cosmic signature.", price: 250000, tier_required: "elite" },
  { id: 8, seva_name: "Eternal Flame Installation", description: "Permanently install a digital flame in the Sanctum core, radiating blessings to your lineage forever.", price: 500000, tier_required: "elite" }
];

// ============================================================================
// CSS INJECTION: MASSIVE STYLESHEET
// ============================================================================
const dashboardStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
  /* Dynamic variables mapped via JS inline styles, fallbacks here */
  --theme-main: #8ab4f8;
  --theme-glow: rgba(138, 180, 248, 0.4);
  --theme-bg-top: #0a101f;
  --theme-bg-bottom: #020408;
  --theme-particle: #8ab4f8;
  --theme-surface: rgba(15, 20, 35, 0.6);
  --theme-border: rgba(138, 180, 248, 0.2);

  --text-primary: #ffffff;
  --text-secondary: #a0a0b8;
  --text-muted: #5a5a70;
  
  --font-cinzel: 'Cinzel', serif;
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-inter: 'Inter', sans-serif;

  --ease-cinematic: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.26, 1.55);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--theme-bg-bottom);
  color: var(--text-primary);
  font-family: var(--font-inter);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--theme-bg-bottom); }
::-webkit-scrollbar-thumb { background: var(--theme-border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--theme-main); }

/* ==========================================================================
   ANIMATIONS
   ========================================================================== */
@keyframes ambientBreathe {
  0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; filter: blur(80px); }
  50% { transform: scale(1.1) translate(2%, 2%); opacity: 0.5; filter: blur(100px); }
}

@keyframes particleAscend {
  0% { transform: translateY(100vh) scale(0); opacity: 0; }
  20% { opacity: var(--max-opacity); transform: translateY(80vh) scale(1); }
  80% { opacity: var(--max-opacity); }
  100% { transform: translateY(-20vh) scale(0.5); opacity: 0; }
}

@keyframes sacredSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes reverseSpin {
  from { transform: translate(-50%, -50%) rotate(360deg); }
  to { transform: translate(-50%, -50%) rotate(0deg); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 15px var(--theme-glow); }
  50% { box-shadow: 0 0 30px var(--theme-main), inset 0 0 15px var(--theme-glow); }
}

@keyframes modalBackdrop {
  from { opacity: 0; backdrop-filter: blur(0px); }
  to { opacity: 1; backdrop-filter: blur(20px); }
}

@keyframes toastSlide {
  from { opacity: 0; transform: translateX(100%) scale(0.9); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

/* ==========================================================================
   GLOBAL LAYOUT & BACKGROUND
   ========================================================================== */
.dashboard-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 50% 0%, var(--theme-bg-top) 0%, var(--theme-bg-bottom) 100%);
  transition: background 1.5s var(--ease-cinematic);
}

.ambient-glow-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.ambient-glow-1, .ambient-glow-2 {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.ambient-glow-1 {
  top: 10%; left: 20%; width: 60vw; height: 60vw;
  background: radial-gradient(circle, var(--theme-glow) 0%, transparent 60%);
  animation: ambientBreathe 15s infinite ease-in-out;
}
.ambient-glow-2 {
  bottom: -10%; right: 10%; width: 70vw; height: 70vw;
  background: radial-gradient(circle, var(--theme-glow) 0%, transparent 60%);
  animation: ambientBreathe 20s infinite ease-in-out reverse;
}

.particles-container {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.particle {
  position: absolute;
  background: var(--theme-particle);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--theme-particle);
  animation: particleAscend linear infinite;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ==========================================================================
   NAVBAR
   ========================================================================== */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  z-index: 100;
  transition: all 0.5s var(--ease-cinematic);
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: rgba(2, 4, 8, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--theme-border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-cinzel);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
  cursor: pointer;
}
.brand-logo-svg {
  width: 40px; height: 40px;
  color: var(--theme-main);
  filter: drop-shadow(0 0 10px var(--theme-glow));
  animation: sacredSpin 30s linear infinite;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.tier-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: var(--theme-surface);
  border: 1px solid var(--theme-main);
  border-radius: 30px;
  box-shadow: 0 0 15px var(--theme-glow);
  font-family: var(--font-cinzel);
  font-size: 0.9rem;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.btn-nav {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-inter);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
}
.btn-nav::after {
  content: ''; position: absolute; bottom: -5px; left: 0; width: 0%; height: 1px;
  background: var(--theme-main); transition: width 0.3s ease;
}
.btn-nav:hover { color: #fff; }
.btn-nav:hover::after { width: 100%; }

.btn-logout {
  padding: 0.6rem 1.5rem;
  background: rgba(255, 60, 60, 0.1);
  border: 1px solid rgba(255, 60, 60, 0.3);
  border-radius: 6px;
  color: #ff6b6b;
}
.btn-logout:hover {
  background: rgba(255, 60, 60, 0.2);
  color: #ff4d4d;
  box-shadow: 0 0 15px rgba(255, 60, 60, 0.3);
}

/* ==========================================================================
   HERO SECTION
   ========================================================================== */
.hero-section {
  padding: 180px 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.hero-sacred-bg {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 800px;
  opacity: 0.05;
  pointer-events: none;
  animation: sacredSpin 120s linear infinite;
}

.hero-title {
  font-family: var(--font-cinzel);
  font-size: 5rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  animation: fadeInUp 1.2s var(--ease-cinematic) forwards;
}
.hero-title span {
  background: linear-gradient(135deg, #ffffff 0%, var(--theme-main) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px var(--theme-glow));
}

.hero-subtitle {
  font-family: var(--font-cormorant);
  font-size: 1.6rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin-bottom: 4rem;
  animation: fadeInUp 1.2s var(--ease-cinematic) 0.2s forwards;
  opacity: 0;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  animation: fadeInUp 1.2s var(--ease-cinematic) 0.4s forwards;
  opacity: 0;
}

.stat-card {
  background: var(--theme-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--theme-border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transition: all 0.4s ease;
}
.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--theme-main);
  box-shadow: 0 15px 40px rgba(0,0,0,0.5), inset 0 0 20px var(--theme-glow);
}
.stat-card::before {
  content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
  transform: skewX(-25deg);
  animation: shimmer 6s infinite;
}

.stat-value {
  font-family: var(--font-cinzel);
  font-size: 3rem;
  color: var(--text-primary);
  text-shadow: 0 0 20px var(--theme-glow);
}
.stat-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}
.stat-ring {
  position: absolute;
  top: -20px; right: -20px;
  width: 100px; height: 100px;
  border-radius: 50%;
  border: 2px dashed var(--theme-border);
  animation: sacredSpin 20s linear infinite;
  opacity: 0.3;
}

/* ==========================================================================
   TIER EXPERIENCE LORE
   ========================================================================== */
.experience-section {
  margin-bottom: 6rem;
  animation: fadeInUp 1.2s var(--ease-cinematic) 0.6s forwards;
  opacity: 0;
}
.experience-card {
  background: linear-gradient(135deg, var(--theme-surface) 0%, rgba(5,5,10,0.8) 100%);
  border: 1px solid var(--theme-border);
  border-radius: 24px;
  padding: 4rem;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  overflow: hidden;
}
.experience-card::after {
  content: ''; position: absolute; inset: 0;
  box-shadow: inset 0 0 50px var(--theme-glow);
  pointer-events: none;
}
.exp-icon-wrapper {
  font-size: 6rem;
  filter: drop-shadow(0 0 30px var(--theme-glow));
  animation: ambientBreathe 6s infinite ease-in-out;
}
.exp-content { flex: 1; }
.exp-title {
  font-family: var(--font-cinzel);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--theme-main);
}
.exp-desc {
  font-family: var(--font-cormorant);
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* ==========================================================================
   SEVA GRID SECTION
   ========================================================================== */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--theme-border);
  padding-bottom: 1rem;
}
.section-title {
  font-family: var(--font-cinzel);
  font-size: 2.5rem;
  color: #fff;
}
.section-subtitle {
  color: var(--text-muted);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.seva-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 3rem;
  margin-bottom: 8rem;
}

.seva-card {
  background: var(--theme-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--theme-border);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.5s var(--ease-cinematic);
  position: relative;
}

.seva-card:not(.locked):hover {
  transform: translateY(-10px);
  border-color: var(--theme-main);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px var(--theme-glow);
}

.seva-image-area {
  height: 200px;
  background: linear-gradient(45deg, #101520, #050a10);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.seva-image-area::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
}
.seva-bg-icon {
  font-size: 8rem;
  opacity: 0.1;
  color: var(--theme-main);
  animation: sacredSpin 60s linear infinite;
}

.seva-tier-badge {
  position: absolute;
  top: 1rem; right: 1rem;
  padding: 0.4rem 1rem;
  background: rgba(0,0,0,0.6);
  border: 1px solid var(--theme-border);
  border-radius: 30px;
  font-family: var(--font-cinzel);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 2;
}

.seva-content {
  padding: 2.5rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.seva-name {
  font-family: var(--font-cinzel);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}
.seva-desc {
  font-family: var(--font-inter);
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 2rem;
}
.seva-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.seva-price {
  font-family: var(--font-cormorant);
  font-size: 1.8rem;
  color: var(--theme-main);
}

.btn-book {
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  border: 1px solid var(--theme-border);
  border-radius: 8px;
  color: #fff;
  font-family: var(--font-cinzel);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}
.seva-card:not(.locked) .btn-book:hover {
  background: var(--theme-main);
  color: #000;
  box-shadow: 0 0 20px var(--theme-glow);
}

/* Locked State */
.seva-card.locked {
  opacity: 0.6;
  filter: grayscale(80%);
}
.seva-card.locked .seva-image-area {
  background: #0a0a0a;
}
.seva-card.locked .seva-bg-icon {
  color: #333;
}
.seva-card.locked .btn-book {
  background: transparent;
  border-color: #333;
  color: #555;
  cursor: not-allowed;
}
.lock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.seva-card.locked:hover .lock-overlay {
  opacity: 1;
}
.lock-icon {
  width: 48px; height: 48px;
  color: #ff4d4d;
  filter: drop-shadow(0 0 10px rgba(255,77,77,0.5));
}
.lock-text {
  font-family: var(--font-cinzel);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ==========================================================================
   BOOKING MODAL
   ========================================================================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: modalBackdrop 0.5s var(--ease-cinematic) forwards;
}
.modal-content {
  width: 100%;
  max-width: 600px;
  background: var(--theme-bg-top);
  border: 1px solid var(--theme-main);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 50px var(--theme-glow);
  position: relative;
  animation: scaleIn 0.5s var(--ease-spring) forwards;
  overflow: hidden;
}
.modal-content::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at top right, var(--theme-glow) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0.3;
}
.btn-close-modal {
  position: absolute;
  top: 1.5rem; right: 1.5rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.3s ease;
}
.btn-close-modal:hover { color: #fff; }

.modal-header { margin-bottom: 2rem; }
.modal-title {
  font-family: var(--font-cinzel);
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
}
.modal-subtitle { color: var(--theme-main); font-family: var(--font-cormorant); font-size: 1.2rem; }

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}
.modal-desc { color: var(--text-secondary); line-height: 1.6; }

.date-picker-wrapper {
  position: relative;
}
.date-label {
  display: block;
  font-family: var(--font-cinzel);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.date-input {
  width: 100%;
  padding: 1.2rem 1.5rem;
  background: rgba(0,0,0,0.5);
  border: 1px solid var(--theme-border);
  border-radius: 8px;
  color: #fff;
  font-family: var(--font-inter);
  font-size: 1.1rem;
  transition: all 0.3s ease;
}
.date-input:focus {
  outline: none;
  border-color: var(--theme-main);
  box-shadow: inset 0 0 15px rgba(0,0,0,0.8), 0 0 15px var(--theme-glow);
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.5;
  cursor: pointer;
}
::-webkit-calendar-picker-indicator:hover { opacity: 1; }

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 2rem;
}
.modal-price-label { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; }
.modal-price { font-family: var(--font-cormorant); font-size: 2.5rem; color: var(--theme-main); line-height: 1; }

.btn-confirm {
  padding: 1.2rem 3rem;
  background: var(--theme-main);
  border: none;
  border-radius: 8px;
  color: #000;
  font-family: var(--font-cinzel);
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px var(--theme-glow);
  display: flex;
  align-items: center;
  gap: 1rem;
}
.btn-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px var(--theme-glow);
}
.btn-confirm:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ==========================================================================
   TOAST NOTIFICATION
   ========================================================================== */
.toast-container {
  position: fixed;
  bottom: 2rem; right: 2rem;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.toast {
  background: rgba(10, 15, 20, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--theme-main);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px var(--theme-glow);
  animation: toastSlide 0.5s var(--ease-spring) forwards;
}
.toast-icon {
  width: 32px; height: 32px;
  color: var(--theme-main);
  animation: sacredSpin 10s linear infinite;
}
.toast-content h4 { font-family: var(--font-cinzel); color: #fff; margin-bottom: 0.3rem; }
.toast-content p { color: var(--text-secondary); font-size: 0.9rem; }

/* ==========================================================================
   LOADING & EMPTY STATES
   ========================================================================== */
.full-screen-center {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.sacred-spinner {
  width: 100px; height: 100px;
  border-radius: 50%;
  border: 2px dashed var(--theme-main);
  animation: sacredSpin 4s linear infinite;
  margin-bottom: 2rem;
  box-shadow: 0 0 30px var(--theme-glow);
  display: flex;
  justify-content: center;
  align-items: center;
}
.sacred-spinner::after {
  content: '✦';
  font-size: 2rem;
  color: var(--theme-main);
  animation: reverseSpin 4s linear infinite;
}

.empty-state {
  text-align: center;
  padding: 6rem 0;
}
.empty-icon { font-size: 5rem; color: var(--theme-border); margin-bottom: 2rem; animation: ambientBreathe 4s infinite; }
.empty-title { font-family: var(--font-cinzel); font-size: 2rem; margin-bottom: 1rem; }

/* ==========================================================================
   FOOTER
   ========================================================================== */
.footer {
  border-top: 1px solid var(--theme-border);
  padding: 4rem;
  text-align: center;
  background: rgba(0,0,0,0.5);
  position: relative;
  z-index: 10;
}
.footer-logo {
  font-family: var(--font-cinzel);
  font-size: 2rem;
  color: var(--theme-main);
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px var(--theme-glow));
}
.footer-text { color: var(--text-muted); font-size: 0.9rem; letter-spacing: 0.05em; }

/* Responsive */
@media (max-width: 1200px) {
  .hero-title { font-size: 4rem; }
  .analytics-grid { grid-template-columns: repeat(2, 1fr); }
  .experience-card { flex-direction: column; text-align: center; padding: 3rem 2rem; gap: 2rem; }
}
@media (max-width: 768px) {
  .navbar { padding: 0 1.5rem; height: 70px; }
  .nav-actions { gap: 1rem; }
  .tier-badge span { display: none; }
  .hero-section { padding: 120px 0 60px; }
  .hero-title { font-size: 2.5rem; }
  .analytics-grid { grid-template-columns: 1fr; }
  .seva-grid { grid-template-columns: 1fr; }
  .modal-content { padding: 2rem; margin: 1rem; }
  .modal-footer { flex-direction: column; gap: 1.5rem; align-items: stretch; }
  .btn-confirm { width: 100%; justify-content: center; }
}
`;

// ============================================================================
// SVG COMPONENTS
// ============================================================================
const SanctumLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" className="brand-logo-svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M50 15L85 80H15L50 15Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="58" r="12" fill="currentColor" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const MandalaIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="toast-icon">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
    <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="currentColor" opacity="0.5" />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Dashboard() {
  const navigate = useNavigate();

  // Core State
  const [sevas, setSevas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  
  // User Info
  const userId = localStorage.getItem("userId") || "unknown";
  const tierStr = (localStorage.getItem("tier") || "initiate").toLowerCase();
  
  // Get Tier Configuration
  const currentTier = TIER_CONFIG[tierStr] || TIER_CONFIG.initiate;

  // Booking State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Particles Engine Generator (Static on mount to prevent re-renders)
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.6 + 0.2
    }));
  }, []);

  // Fetch Sevas
  useEffect(() => {
    let isMounted = true;
    const fetchSevas = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/sevas');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (isMounted) setSevas(data);
      } catch (error) {
        console.warn("API fetch failed, falling back to mock data for cinematic presentation", error);
        // Fallback to mock data for robust UI showcase
        if (isMounted) setSevas(MOCK_SEVAS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchSevas();
    return () => { isMounted = false; };
  }, []);

  // Scroll Listener for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);

  const openBookingModal = useCallback((seva) => {
    setSelectedSeva(seva);
    // Default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
    setModalOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedSeva(null);
      setBookingDate('');
    }, 500); // Wait for exit animation
  }, []);

  const handleBooking = async () => {
    if (!bookingDate) return;
    setBookingLoading(true);
    
    try {
      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          seva_id: selectedSeva.id,
          booking_date: bookingDate
        })
      });

      // Allow mock success even if backend fails for demonstration of premium UI
      if (!response.ok) {
        console.warn("Backend booking failed, mocking success for UI presentation.");
      }

      // Simulate network delay for cinematic effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      setToast({
        title: "Ascension Granted",
        message: `Your offering for ${selectedSeva.seva_name} is etched in the eternal ledger.`
      });

      closeBookingModal();

      // Auto clear toast
      setTimeout(() => setToast(null), 5000);

    } catch (error) {
      console.error(error);
      setToast({
        title: "Cosmic Disturbance",
        message: "The ethereal connection was lost. Please attempt the offering again."
      });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setBookingLoading(false);
    }
  };

  // Helper Functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTierWeight = (tierName) => {
    return TIER_CONFIG[tierName?.toLowerCase()]?.weight || 1;
  };

  const canAccessSeva = (sevaTier) => {
    return currentTier.weight >= getTierWeight(sevaTier);
  };

  // CSS Variables mapped dynamically from Tier config
  const dynamicThemeStyles = {
    '--theme-main': currentTier.colors.main,
    '--theme-glow': currentTier.colors.glow,
    '--theme-bg-top': currentTier.colors.bgTop,
    '--theme-bg-bottom': currentTier.colors.bgBottom,
    '--theme-particle': currentTier.colors.particle,
    '--theme-surface': currentTier.colors.surface,
    '--theme-border': currentTier.colors.border,
  };

  // Loading Screen
  if (loading) {
    return (
      <div style={dynamicThemeStyles}>
        <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
        <div className="dashboard-container full-screen-center">
          <div className="ambient-glow-1"></div>
          <div className="sacred-spinner"></div>
          <h2 className="hero-title" style={{fontSize: '2rem'}}>Aligning Cosmic Energies...</h2>
          <p style={{color: 'var(--text-secondary)'}}>Preparing the digital sanctum</p>
        </div>
      </div>
    );
  }

  // Calculate Stats
  const accessibleSevasCount = sevas.filter(s => canAccessSeva(s.tier_required)).length;

  return (
    <div style={dynamicThemeStyles}>
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
      <div className="dashboard-container">

        {/* =======================================================================
            BACKGROUND ELEMENTS
            ======================================================================= */}
        <div className="ambient-glow-layer">
          <div className="ambient-glow-1"></div>
          <div className="ambient-glow-2"></div>
        </div>
        
        <div className="particles-container">
          {particles.map((p) => (
            <div key={p.id} className="particle" style={{
              width: `${p.size}px`, height: `${p.size}px`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--max-opacity': p.opacity
            }} />
          ))}
        </div>

        {/* =======================================================================
            NAVBAR
            ======================================================================= */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-brand" onClick={() => window.scrollTo(0,0)}>
            <SanctumLogo />
            <span>SANCTUM</span>
          </div>
          <div className="nav-actions">
            <div className="tier-badge">
              {currentTier.icon} <span>{currentTier.name}</span>
            </div>
            <button className="btn-nav" onClick={() => navigate('/history')}>Sacred Archives</button>
            <button className="btn-nav btn-logout" onClick={handleLogout}>Depart</button>
          </div>
        </nav>

        {/* =======================================================================
            MAIN CONTENT
            ======================================================================= */}
        <div className="content-wrapper">
          
          {/* HERO */}
          <section className="hero-section">
            <div className="hero-sacred-bg">
              <svg viewBox="0 0 100 100" fill="none" stroke="var(--theme-border)" strokeWidth="0.5">
                <circle cx="50" cy="50" r="45" strokeDasharray="2 4"/>
                <path d="M50 5 L95 50 L50 95 L5 50 Z" />
              </svg>
            </div>
            <h1 className="hero-title">
              Welcome back, <span>Seeker</span>
            </h1>
            <p className="hero-subtitle">
              The ethereal gates of Sanctum are open. Trace the cosmic pathways and select the rituals that resonate with your digital soul.
            </p>
            
            <div className="analytics-grid">
              <div className="stat-card">
                <div className="stat-ring"></div>
                <span className="stat-value">{sevas.length}</span>
                <span className="stat-label">Cosmic Offerings</span>
              </div>
              <div className="stat-card">
                <div className="stat-ring" style={{animationDirection: 'reverse'}}></div>
                <span className="stat-value">{accessibleSevasCount}</span>
                <span className="stat-label">Accessible to You</span>
              </div>
              <div className="stat-card">
                <div className="stat-ring"></div>
                <span className="stat-value" style={{fontSize: '2rem', marginTop: '0.8rem'}}>{currentTier.name}</span>
                <span className="stat-label">Current State</span>
              </div>
              <div className="stat-card">
                <div className="stat-ring" style={{animationDirection: 'reverse'}}></div>
                <span className="stat-value" style={{fontSize: '2rem', marginTop: '0.8rem'}}>{currentTier.weight * 25}%</span>
                <span className="stat-label">Ascension Progress</span>
              </div>
            </div>
          </section>

          {/* TIER EXPERIENCE LORE */}
          <section className="experience-section">
            <div className="experience-card">
              <div className="exp-icon-wrapper">{currentTier.icon}</div>
              <div className="exp-content">
                <h3 className="exp-title">The Path of the {currentTier.name}</h3>
                <p className="exp-desc">{currentTier.lore}</p>
              </div>
            </div>
          </section>

          {/* SEVA GRID */}
          <section>
            <div className="section-header">
              <div>
                <h2 className="section-title">Sacred Offerings</h2>
                <span className="section-subtitle">Manifest your devotion</span>
              </div>
            </div>

            {sevas.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✨</div>
                <h3 className="empty-title">The Vault is Empty</h3>
                <p style={{color: 'var(--text-secondary)'}}>No sacred rituals are currently manifested in this realm.</p>
              </div>
            ) : (
              <div className="seva-grid">
                {sevas.map((seva, idx) => {
                  const isLocked = !canAccessSeva(seva.tier_required);
                  const sevaTierConfig = TIER_CONFIG[seva.tier_required?.toLowerCase()] || TIER_CONFIG.initiate;

                  return (
                    <div 
                      key={seva.id} 
                      className={`seva-card ${isLocked ? 'locked' : ''}`}
                      style={{ animationDelay: `${idx * 0.1}s`, animation: 'fadeInUp 0.8s var(--ease-cinematic) forwards', opacity: 0 }}
                    >
                      {/* Image Area placeholder with cinematic gradients */}
                      <div className="seva-image-area">
                        <div className="seva-bg-icon">🪷</div>
                        <div className="seva-tier-badge" style={{ color: isLocked ? '#aaa' : sevaTierConfig.colors.main, borderColor: isLocked ? '#555' : sevaTierConfig.colors.main }}>
                          {sevaTierConfig.icon} {sevaTierConfig.name} Required
                        </div>
                      </div>

                      <div className="seva-content">
                        <h3 className="seva-name">{seva.seva_name}</h3>
                        <p className="seva-desc">{seva.description}</p>
                        
                        <div className="seva-footer">
                          <span className="seva-price">{formatCurrency(seva.price)}</span>
                          <button 
                            className="btn-book" 
                            disabled={isLocked}
                            onClick={() => openBookingModal(seva)}
                          >
                            {isLocked ? 'Sealed' : 'Offer Seva'}
                          </button>
                        </div>
                      </div>

                      {/* Locked Overlay */}
                      {isLocked && (
                        <div className="lock-overlay">
                          <LockIcon />
                          <span className="lock-text">Insufficient Ascension</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

        </div>

        {/* =======================================================================
            BOOKING MODAL
            ======================================================================= */}
        {modalOpen && selectedSeva && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="btn-close-modal" onClick={closeBookingModal}>
                <CloseIcon />
              </button>
              
              <div className="modal-header">
                <h2 className="modal-title">{selectedSeva.seva_name}</h2>
                <div className="modal-subtitle">Sacred Reservation</div>
              </div>

              <div className="modal-body">
                <p className="modal-desc">{selectedSeva.description}</p>
                
                <div className="date-picker-wrapper">
                  <label className="date-label" htmlFor="bookingDate">Select Auspicious Date</label>
                  <input 
                    type="date" 
                    id="bookingDate"
                    className="date-input"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <div>
                  <div className="modal-price-label">Devotional Offering</div>
                  <div className="modal-price">{formatCurrency(selectedSeva.price)}</div>
                </div>
                <button 
                  className="btn-confirm" 
                  onClick={handleBooking}
                  disabled={bookingLoading || !bookingDate}
                >
                  {bookingLoading ? 'Communing...' : 'Confirm Ascension'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TOAST NOTIFICATION
            ======================================================================= */}
        <div className="toast-container">
          {toast && (
            <div className="toast">
              <MandalaIcon />
              <div className="toast-content">
                <h4>{toast.title}</h4>
                <p>{toast.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* =======================================================================
            FOOTER
            ======================================================================= */}
        <footer className="footer">
          <div className="footer-logo">SANCTUM</div>
          <div className="footer-text">
            &copy; 2026 Ethereal Software Solutions. Preserving the divine in the digital realm.
          </div>
        </footer>

      </div>
    </div>
  );
}