import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// ULTRA-PREMIUM CINEMATIC CSS
// ============================================================================
const sanctumStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
  /* Core Deep Space / Temple Colors */
  --bg-void: #020204;
  --bg-surface: rgba(10, 12, 18, 0.6);
  --bg-glass: rgba(18, 22, 32, 0.3);
  --bg-glass-hover: rgba(25, 30, 45, 0.5);
  --bg-glass-solid: rgba(10, 12, 18, 0.85);
  
  /* Text Accents */
  --text-pure: #ffffff;
  --text-primary: #e2e2e8;
  --text-secondary: #8a8a9e;
  --text-muted: #4a4a5e;
  --text-gold: #d4af37;
  
  /* Borders and Lighting */
  --border-dim: rgba(255, 255, 255, 0.05);
  --border-light: rgba(255, 255, 255, 0.12);
  --border-glow: rgba(255, 255, 255, 0.25);
  --border-gold: rgba(212, 175, 55, 0.3);
  
  /* Typography */
  --font-cinzel: 'Cinzel', serif;
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-inter: 'Inter', sans-serif;

  /* Motion & Easing */
  --ease-cinematic: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.26, 1.55);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  
  /* Divine Tier System */
  --tier-initiate: #8ab4f8;
  --tier-initiate-glow: rgba(138, 180, 248, 0.3);
  
  --tier-devotee: #c58af9;
  --tier-devotee-glow: rgba(197, 138, 249, 0.3);
  
  --tier-ascendant: #e8eaed;
  --tier-ascendant-glow: rgba(232, 234, 237, 0.3);
  
  --tier-elite: #d4af37;
  --tier-elite-glow: rgba(212, 175, 55, 0.4);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-inter);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-void); }
::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--tier-ascendant); }

/* ==========================================================================
   ANIMATIONS
   ========================================================================== */
@keyframes abyssBreathe {
  0%, 100% { transform: scale(1); opacity: 0.15; filter: blur(80px); }
  50% { transform: scale(1.2); opacity: 0.3; filter: blur(100px); }
}

@keyframes floatParticle {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
  20% { opacity: var(--p-opacity); }
  80% { opacity: var(--p-opacity); }
  100% { transform: translateY(-100vh) translateX(var(--p-drift)) scale(0.5); opacity: 0; }
}

@keyframes mandalaSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes reverseMandalaSpin {
  from { transform: translate(-50%, -50%) rotate(360deg); }
  to { transform: translate(-50%, -50%) rotate(0deg); }
}

@keyframes cinematicFadeUp {
  from { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

@keyframes shimmerEffect {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 15px transparent; }
  50% { box-shadow: 0 0 35px var(--glow-target); }
}

@keyframes floatElement {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes dashSpin {
  0% { transform: rotate(0deg); stroke-dashoffset: 280; }
  50% { transform: rotate(180deg); stroke-dashoffset: 70; }
  100% { transform: rotate(360deg); stroke-dashoffset: 280; }
}

/* ==========================================================================
   GLOBAL UTILITIES & CONTAINERS
   ========================================================================== */
.landing-wrapper {
  position: relative;
  width: 100vw;
  overflow: hidden;
  background: radial-gradient(circle at 50% 0%, #0a0a12 0%, var(--bg-void) 100%);
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem;
  position: relative;
  z-index: 10;
}

.text-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #8a8a9e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-gold-gradient {
  background: linear-gradient(135deg, #ffffff 0%, var(--tier-elite) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s var(--ease-cinematic);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ==========================================================================
   AMBIENT BACKGROUNDS & PARTICLES
   ========================================================================== */
.ambient-layer {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
}
.ambient-orb-1 {
  position: absolute; top: -10%; left: -10%; width: 60vw; height: 60vw;
  background: radial-gradient(circle, var(--tier-initiate-glow) 0%, transparent 60%);
  border-radius: 50%; animation: abyssBreathe 20s infinite alternate var(--ease-cinematic);
}
.ambient-orb-2 {
  position: absolute; bottom: -20%; right: -10%; width: 70vw; height: 70vw;
  background: radial-gradient(circle, rgba(197, 138, 249, 0.2) 0%, transparent 60%);
  border-radius: 50%; animation: abyssBreathe 25s infinite alternate-reverse var(--ease-cinematic);
}
.ambient-orb-3 {
  position: absolute; top: 40%; left: 40%; width: 40vw; height: 40vw;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 60%);
  border-radius: 50%; animation: abyssBreathe 30s infinite alternate var(--ease-cinematic);
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, #fff 0%, var(--tier-initiate) 50%, transparent 100%);
  box-shadow: 0 0 10px var(--tier-initiate-glow);
  animation: floatParticle linear infinite;
  pointer-events: none;
}

/* ==========================================================================
   NAVBAR
   ========================================================================== */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 1.5rem 4rem; display: flex; justify-content: space-between; align-items: center;
  transition: all 0.5s var(--ease-cinematic); border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: var(--bg-glass-solid); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border-light); padding: 1rem 4rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.8);
}

.nav-brand {
  display: flex; align-items: center; gap: 1rem; cursor: pointer;
}
.brand-logo-svg {
  width: 36px; height: 36px; color: var(--text-pure);
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.4));
  animation: mandalaSpin 40s linear infinite;
}
.brand-text {
  font-family: var(--font-cinzel); font-size: 1.6rem; font-weight: 700;
  letter-spacing: 0.15em; color: var(--text-pure); text-transform: uppercase;
}

.nav-links {
  display: flex; gap: 2.5rem; align-items: center;
}
.nav-link {
  font-family: var(--font-inter); font-size: 0.9rem; color: var(--text-secondary);
  text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;
  transition: all 0.3s ease; position: relative; cursor: pointer;
}
.nav-link::after {
  content: ''; position: absolute; bottom: -6px; left: 0; width: 0%; height: 1px;
  background: var(--text-pure); transition: width 0.3s ease;
}
.nav-link:hover { color: var(--text-pure); text-shadow: 0 0 10px rgba(255,255,255,0.3); }
.nav-link:hover::after { width: 100%; }

.nav-actions {
  display: flex; gap: 1rem; align-items: center;
}

/* Base Buttons */
.btn {
  padding: 0.8rem 1.8rem; border-radius: 8px; font-family: var(--font-cinzel);
  font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
  cursor: pointer; transition: all 0.4s var(--ease-cinematic); position: relative;
  overflow: hidden; display: inline-flex; align-items: center; justify-content: center;
  gap: 0.5rem;
}
.btn::before {
  content: ''; position: absolute; top: 0; left: -150%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: skewX(-20deg); transition: all 0.7s var(--ease-out-expo);
}
.btn:hover::before { animation: shimmerEffect 1.5s infinite; }

.btn-ghost {
  background: transparent; border: 1px solid var(--border-light); color: var(--text-primary);
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.05); border-color: var(--text-pure);
  box-shadow: 0 0 20px rgba(255,255,255,0.1); color: var(--text-pure);
}

.btn-primary {
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid var(--border-glow); color: var(--text-pure);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}
.btn-primary:hover {
  background: rgba(255,255,255,0.15); border-color: var(--text-pure);
  box-shadow: 0 15px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.2), inset 0 0 15px rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

.btn-admin {
  background: linear-gradient(135deg, #1a1608 0%, #000000 100%);
  border: 1px solid var(--border-gold); color: var(--tier-elite);
}
.btn-admin:hover {
  background: var(--bg-void); border-color: var(--tier-elite); color: var(--tier-elite);
  box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px var(--tier-elite-glow), inset 0 0 10px var(--border-gold);
  transform: translateY(-2px);
}

/* Mobile Menu */
.mobile-menu-btn {
  display: none; background: transparent; border: none; color: var(--text-pure);
  font-size: 1.5rem; cursor: pointer;
}
.mobile-nav-overlay {
  position: fixed; inset: 0; background: var(--bg-glass-solid); backdrop-filter: blur(24px);
  z-index: 999; display: flex; flex-direction: column; justify-content: center; align-items: center;
  gap: 2rem; opacity: 0; pointer-events: none; transition: all 0.4s ease; transform: translateY(-20px);
}
.mobile-nav-overlay.active {
  opacity: 1; pointer-events: all; transform: translateY(0);
}

/* ==========================================================================
   HERO SECTION
   ========================================================================== */
.hero-section {
  min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  align-items: center; text-align: center; position: relative; padding-top: 80px;
}
.hero-mandala-bg {
  position: absolute; top: 50%; left: 50%; width: 120vmin; height: 120vmin;
  opacity: 0.03; pointer-events: none; z-index: 1; animation: mandalaSpin 180s linear infinite;
  transform-origin: center center;
}

.hero-content {
  position: relative; z-index: 10; max-width: 1000px; padding: 0 2rem;
  animation: cinematicFadeUp 1.5s var(--ease-out-expo) forwards;
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.2rem;
  background: rgba(255,255,255,0.03); border: 1px solid var(--border-dim);
  border-radius: 30px; font-family: var(--font-cinzel); font-size: 0.8rem;
  color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.2em;
  margin-bottom: 2rem;
}
.hero-badge span { color: var(--tier-elite); }

.hero-title {
  font-family: var(--font-cinzel); font-size: 5.5rem; font-weight: 800;
  line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: 0.05em;
  text-shadow: 0 20px 40px rgba(0,0,0,0.8);
}

.hero-subtitle {
  font-family: var(--font-cormorant); font-size: 1.6rem; color: var(--text-secondary);
  line-height: 1.6; max-width: 700px; margin: 0 auto 3.5rem; font-style: italic;
}

.hero-cta-group {
  display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;
}

.hero-cta-main {
  padding: 1.2rem 3rem; font-size: 1.1rem;
}

/* ==========================================================================
   SACRED STATISTICS
   ========================================================================== */
.stats-section {
  padding-top: 0; margin-top: -4rem; z-index: 20; position: relative;
}
.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
}
.stat-card {
  background: var(--bg-glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-dim); border-radius: 20px; padding: 3rem 2rem;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  transition: all 0.5s var(--ease-cinematic); position: relative; overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.stat-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at top, var(--border-glow) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.5s ease;
}
.stat-card:hover {
  transform: translateY(-10px); border-color: var(--border-light);
  box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.05);
}
.stat-card:hover::before { opacity: 0.1; }

.stat-value {
  font-family: var(--font-cormorant); font-size: 4rem; font-weight: 600;
  color: var(--text-pure); line-height: 1; margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(255,255,255,0.2);
}
.stat-label {
  font-family: var(--font-cinzel); font-size: 0.9rem; color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.15em;
}

/* ==========================================================================
   SECTION HEADERS
   ========================================================================== */
.section-header {
  text-align: center; margin-bottom: 5rem;
}
.section-kicker {
  font-family: var(--font-cinzel); font-size: 0.9rem; color: var(--tier-elite);
  letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 1rem;
  display: flex; align-items: center; justify-content: center; gap: 1rem;
}
.section-kicker::before, .section-kicker::after {
  content: ''; width: 40px; height: 1px; background: var(--tier-elite);
  box-shadow: 0 0 10px var(--tier-elite);
}
.section-title {
  font-family: var(--font-cinzel); font-size: 3.5rem; font-weight: 700;
  color: var(--text-pure); margin-bottom: 1.5rem; line-height: 1.2;
}
.section-desc {
  font-family: var(--font-cormorant); font-size: 1.3rem; color: var(--text-secondary);
  max-width: 700px; margin: 0 auto; line-height: 1.6;
}

/* ==========================================================================
   FEATURES SECTION
   ========================================================================== */
.features-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
}
.feature-card {
  background: var(--bg-surface); border: 1px solid var(--border-dim);
  border-radius: 20px; padding: 3rem 2.5rem; transition: all 0.5s var(--ease-cinematic);
  position: relative; overflow: hidden;
}
.feature-card:hover {
  transform: translateY(-8px); border-color: var(--border-light);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.02);
  background: var(--bg-glass-hover);
}
.feature-icon-wrapper {
  width: 60px; height: 60px; border-radius: 16px; background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-dim); display: flex; justify-content: center; align-items: center;
  font-size: 1.8rem; color: var(--tier-initiate); margin-bottom: 2rem;
  transition: all 0.4s var(--ease-spring);
}
.feature-card:hover .feature-icon-wrapper {
  transform: scale(1.1) rotate(5deg); border-color: var(--tier-initiate);
  box-shadow: 0 0 20px var(--tier-initiate-glow); color: var(--text-pure);
  background: var(--tier-initiate-glow);
}
.feature-title {
  font-family: var(--font-cinzel); font-size: 1.3rem; font-weight: 700;
  color: var(--text-pure); margin-bottom: 1rem; letter-spacing: 0.05em;
}
.feature-desc {
  font-family: var(--font-inter); font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;
}

/* ==========================================================================
   MEMBERSHIP TIERS SECTION
   ========================================================================== */
.tiers-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
}
.tier-card {
  background: var(--bg-glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-dim); border-radius: 24px; padding: 3rem 2rem;
  display: flex; flex-direction: column; position: relative; overflow: hidden;
  transition: all 0.5s var(--ease-cinematic); box-shadow: 0 15px 35px rgba(0,0,0,0.5);
}
.tier-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at top, var(--t-glow) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
}
.tier-card:hover {
  transform: translateY(-10px); border-color: var(--t-color);
  box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 30px var(--t-glow);
}
.tier-card:hover::before { opacity: 0.15; }

.tier-icon {
  font-size: 3rem; margin-bottom: 1.5rem; filter: drop-shadow(0 0 15px var(--t-glow));
  transition: transform 0.5s var(--ease-spring);
}
.tier-card:hover .tier-icon { transform: scale(1.15); }

.tier-name {
  font-family: var(--font-cinzel); font-size: 1.8rem; font-weight: 700;
  color: var(--text-pure); margin-bottom: 0.5rem; letter-spacing: 0.1em;
}
.tier-desc {
  font-family: var(--font-cormorant); font-size: 1.1rem; color: var(--text-secondary);
  line-height: 1.5; margin-bottom: 2rem; min-height: 50px;
}
.tier-features {
  list-style: none; margin-bottom: 2.5rem; flex: 1; display: flex; flex-direction: column; gap: 1rem;
}
.tier-feature {
  display: flex; align-items: flex-start; gap: 0.8rem;
  font-size: 0.9rem; color: var(--text-primary); line-height: 1.4;
}
.tier-feature svg {
  flex-shrink: 0; width: 16px; height: 16px; color: var(--t-color); margin-top: 0.1rem;
}

.btn-tier {
  width: 100%; padding: 1.2rem; background: transparent; border: 1px solid var(--border-light);
  border-radius: 12px; color: var(--text-pure); font-family: var(--font-cinzel); font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 0.4s ease;
}
.tier-card:hover .btn-tier {
  background: rgba(255,255,255,0.05); border-color: var(--t-color); box-shadow: inset 0 0 15px var(--t-glow);
}

/* Elite Tier Overrides */
.tier-elite {
  background: linear-gradient(180deg, rgba(20, 16, 5, 0.8) 0%, var(--bg-void) 100%);
  border-color: var(--border-gold);
}
.tier-elite::after {
  content: ''; position: absolute; inset: 0; border-radius: 24px; padding: 2px;
  background: linear-gradient(135deg, var(--tier-elite), transparent, var(--tier-elite));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0.5;
}
.tier-elite:hover {
  border-color: var(--tier-elite); box-shadow: 0 30px 70px rgba(0,0,0,0.9), 0 0 40px var(--tier-elite-glow);
}
.tier-elite .tier-name { color: var(--tier-elite); text-shadow: 0 0 20px var(--tier-elite-glow); }
.tier-elite .btn-tier { background: rgba(212, 175, 55, 0.1); border-color: var(--tier-elite); color: var(--tier-elite); }
.tier-elite:hover .btn-tier {
  background: var(--tier-elite); color: #000; box-shadow: 0 0 30px var(--tier-elite-glow);
}

/* ==========================================================================
   SHOWCASE & ABOUT SECTIONS
   ========================================================================== */
.showcase-row {
  display: flex; align-items: center; gap: 5rem; margin-bottom: 8rem;
}
.showcase-row.reverse { flex-direction: row-reverse; }
.showcase-visual {
  flex: 1; height: 500px; border-radius: 30px; position: relative; overflow: hidden;
  background: linear-gradient(45deg, #0a0a0f, #151520); border: 1px solid var(--border-dim);
  display: flex; justify-content: center; align-items: center;
  box-shadow: 0 30px 60px rgba(0,0,0,0.7);
}
.showcase-visual::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%); z-index: 1;
}
.visual-ring-1 {
  position: absolute; width: 300px; height: 300px; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%; animation: mandalaSpin 30s linear infinite; z-index: 2;
}
.visual-ring-2 {
  position: absolute; width: 220px; height: 220px; border: 1px dashed rgba(255,255,255,0.2);
  border-radius: 50%; animation: reverseMandalaSpin 20s linear infinite; z-index: 2;
}
.visual-core {
  font-size: 5rem; color: var(--text-pure); z-index: 3; filter: drop-shadow(0 0 20px rgba(255,255,255,0.5));
  animation: floatElement 4s ease-in-out infinite;
}

.showcase-content { flex: 1; }
.showcase-title {
  font-family: var(--font-cinzel); font-size: 2.8rem; font-weight: 700;
  color: var(--text-pure); margin-bottom: 1.5rem; line-height: 1.2;
}
.showcase-text {
  font-family: var(--font-inter); font-size: 1.1rem; color: var(--text-secondary);
  line-height: 1.7; margin-bottom: 2rem;
}

/* ==========================================================================
   TESTIMONIALS
   ========================================================================== */
.testimonials-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
}
.testimonial-card {
  background: var(--bg-surface); border: 1px solid var(--border-dim);
  border-radius: 20px; padding: 3rem; display: flex; flex-direction: column;
  transition: all 0.4s ease; position: relative;
}
.testimonial-card:hover {
  transform: translateY(-5px); border-color: var(--border-light);
  box-shadow: 0 15px 35px rgba(0,0,0,0.5); background: var(--bg-glass-hover);
}
.quote-icon {
  font-size: 3rem; color: var(--border-light); margin-bottom: 1.5rem;
  font-family: var(--font-cormorant); line-height: 1; height: 30px;
}
.testimonial-text {
  font-family: var(--font-cormorant); font-size: 1.25rem; font-style: italic;
  color: var(--text-primary); line-height: 1.6; flex: 1; margin-bottom: 2.5rem;
}
.testimonial-author {
  display: flex; align-items: center; gap: 1rem;
  border-top: 1px solid var(--border-dim); padding-top: 1.5rem;
}
.author-avatar {
  width: 50px; height: 50px; border-radius: 50%; background: var(--bg-void);
  border: 1px solid var(--border-glow); display: flex; justify-content: center;
  align-items: center; font-size: 1.2rem;
}
.author-info h4 {
  font-family: var(--font-cinzel); font-size: 0.95rem; color: var(--text-pure); margin-bottom: 0.2rem;
}
.author-info span {
  font-size: 0.8rem; color: var(--tier-elite); text-transform: uppercase; letter-spacing: 0.1em;
}

/* ==========================================================================
   FAQ SECTION
   ========================================================================== */
.faq-container {
  max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;
}
.faq-item {
  background: var(--bg-glass); border: 1px solid var(--border-dim);
  border-radius: 16px; overflow: hidden; transition: all 0.4s ease;
}
.faq-item.active {
  border-color: var(--tier-initiate); box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px var(--tier-initiate-bg);
}
.faq-question {
  padding: 1.8rem 2rem; display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; font-family: var(--font-inter); font-size: 1.1rem; font-weight: 500;
  color: var(--text-pure); transition: all 0.3s ease;
}
.faq-item:hover .faq-question { background: rgba(255,255,255,0.02); }
.faq-icon {
  color: var(--text-secondary); transition: transform 0.4s var(--ease-spring);
}
.faq-item.active .faq-icon { transform: rotate(180deg); color: var(--tier-initiate); }
.faq-answer {
  max-height: 0; padding: 0 2rem; color: var(--text-secondary); line-height: 1.6;
  transition: all 0.5s var(--ease-cinematic); opacity: 0; overflow: hidden;
}
.faq-item.active .faq-answer {
  max-height: 300px; padding: 0 2rem 1.8rem; opacity: 1;
}

/* ==========================================================================
   CTA SECTION
   ========================================================================== */
.cta-section {
  padding: 10rem 2rem; text-align: center; position: relative; overflow: hidden;
}
.cta-bg-layer {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at center, var(--tier-elite-bg) 0%, transparent 60%);
  animation: pulseGlow 8s infinite alternate; --glow-target: var(--tier-elite-glow);
}
.cta-content {
  position: relative; z-index: 10; max-width: 800px; margin: 0 auto;
}
.cta-title {
  font-family: var(--font-cinzel); font-size: 4.5rem; font-weight: 800;
  color: var(--text-pure); margin-bottom: 1.5rem; line-height: 1.1;
  text-shadow: 0 10px 30px rgba(0,0,0,0.8);
}
.cta-actions {
  display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; margin-top: 3rem;
}

/* ==========================================================================
   FOOTER
   ========================================================================== */
.footer {
  border-top: 1px solid var(--border-dim); padding: 5rem 4rem 2rem;
  background: #010102; position: relative; z-index: 10;
}
.footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem;
  max-width: 1400px; margin: 0 auto 4rem;
}
.footer-brand {
  display: flex; flex-direction: column; gap: 1.5rem;
}
.footer-logo-wrap { display: flex; align-items: center; gap: 1rem; }
.footer-brand p { color: var(--text-secondary); line-height: 1.6; max-width: 300px; }

.footer-col h4 {
  font-family: var(--font-cinzel); font-size: 1.1rem; color: var(--text-pure);
  margin-bottom: 1.5rem; letter-spacing: 0.1em; text-transform: uppercase;
}
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
.footer-links a {
  color: var(--text-secondary); text-decoration: none; font-size: 0.95rem;
  transition: all 0.3s ease; display: inline-block;
}
.footer-links a:hover { color: var(--text-pure); transform: translateX(5px); }

.footer-bottom {
  border-top: 1px solid var(--border-dim); padding-top: 2rem; text-align: center;
  color: var(--text-muted); font-size: 0.85rem; max-width: 1400px; margin: 0 auto;
}

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 1200px) {
  .hero-title { font-size: 4.5rem; }
  .stats-grid, .tiers-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid, .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .navbar { padding: 1rem 1.5rem; }
  .nav-links, .nav-actions { display: none; }
  .mobile-menu-btn { display: block; }
  
  .hero-section { padding-top: 100px; }
  .hero-title { font-size: 3rem; }
  .hero-subtitle { font-size: 1.2rem; }
  .hero-cta-group { flex-direction: column; width: 100%; }
  
  .section-container { padding: 5rem 1.5rem; }
  .section-title { font-size: 2.5rem; }
  
  .stats-grid, .tiers-grid, .features-grid, .testimonials-grid, .footer-grid { grid-template-columns: 1fr; }
  
  .showcase-row, .showcase-row.reverse { flex-direction: column; gap: 3rem; }
  .showcase-visual { height: 350px; width: 100%; }
  
  .cta-title { font-size: 3rem; }
  .cta-actions { flex-direction: column; }
}
`;

// ============================================================================
// DATA MODELS
// ============================================================================
const STATS = [
  { value: "12,400+", label: "Active Devotees" },
  { value: "85,000+", label: "Rituals Manifested" },
  { value: "1,200", label: "Sacred Ceremonies" },
  { value: "33", label: "Elite Ascendants" }
];

const FEATURES = [
  { icon: "🪷", title: "Sacred Seva Booking", desc: "Reserve your place in ancient rituals transposed into the digital ether, scheduled with celestial precision." },
  { icon: "🔮", title: "Divine Membership Access", desc: "Unlock higher states of existence. Progress through tiers to experience deeper, more profound ceremonies." },
  { icon: "✨", title: "Spiritual Progress Tracking", desc: "Monitor your ascension. Every offering and prayer is eternally inscribed in your spiritual ledger." },
  { icon: "📜", title: "Personalized Ritual History", desc: "A cinematic archive of your devotional acts, accessible at any moment to reflect on your journey." },
  { icon: "👑", title: "Elite Temple Experiences", desc: "Exclusive, closed-door virtual ceremonies reserved only for those who attain the highest spiritual rank." },
  { icon: "🌌", title: "Advanced Analytics", desc: "View the cosmic impact of your devotions through premium, data-driven spiritual dashboards." }
];

const TIERS = [
  {
    id: "initiate",
    name: "Initiate",
    icon: "🌙",
    desc: "Begin your spiritual journey and step into the digital sanctuary. The moonlight guides your path.",
    features: ["Access to basic Sevas", "Public prayer forums", "Digital blessing history", "Standard support"],
    cssVar: "--tier-initiate"
  },
  {
    id: "devotee",
    name: "Devotee",
    icon: "🔮",
    desc: "Deepen your connection. Unlock advanced spiritual practices and ethereal resonance.",
    features: ["Priority Seva booking", "Monthly group rituals", "Extended spiritual history", "Devotee community access"],
    cssVar: "--tier-devotee"
  },
  {
    id: "ascendant",
    name: "Ascendant",
    icon: "✨",
    desc: "Rise above the mundane. Experience profound ceremonial power and celestial energy.",
    features: ["Exclusive Ascendant Sevas", "1-on-1 virtual blessings", "Custom digital offerings", "Ascendant badge"],
    cssVar: "--tier-ascendant"
  },
  {
    id: "elite",
    name: "Elite",
    icon: "👑",
    desc: "The ultimate state of divine luxury and spiritual exclusivity. Royal heavenly access.",
    features: ["Private temple access", "Bespoke ritual creation", "Direct line to High Priests", "Black/Gold Elite aesthetic", "Unlimited cosmic archives"],
    cssVar: "--tier-elite",
    isElite: true
  }
];

const TESTIMONIALS = [
  { quote: "Since joining Sanctum, my digital and spiritual lives have merged into something profoundly beautiful. The interface itself feels like a prayer.", name: "Kaelen of the Outer Rim", role: "Ascendant", avatar: "🌌" },
  { quote: "The Elite tier rituals transcend technology. I have felt genuine peace watching my personalized Seva unfold on this platform. Pure cinematic divinity.", name: "Priestess Elara", role: "Elite", avatar: "👑" },
  { quote: "Tracking my spiritual journey through the timeline view gives me a sense of purpose. Sanctum is the future of devotion.", name: "Valerius Truthseeker", role: "Devotee", avatar: "🔮" }
];

const FAQS = [
  { q: "What is Sanctum?", a: "Sanctum is a premium, futuristic platform that digitizes ancient spiritual traditions. We offer a space where technology and divinity intersect, allowing users to book sacred rituals, track their spiritual journey, and ascend through membership tiers." },
  { q: "How do memberships work?", a: "Users begin as Initiates. By participating in rituals (Sevas) and offering devotion, you can upgrade your membership to Devotee, Ascendant, and ultimately, Elite. Each tier unlocks deeper, more exclusive temple experiences." },
  { q: "What are Sevas?", a: "Sevas are sacred rituals and offerings performed within our digital temple. Ranging from simple prayers to elaborate, personalized ceremonies, they form the core of your spiritual progression on Sanctum." },
  { q: "Can I upgrade tiers?", a: "Yes, ascension is a core part of the Sanctum experience. Continued devotion, participation in Sevas, and engagement with the platform naturally elevate your spiritual standing and tier status." },
  { q: "How is ritual history stored?", a: "Your entire journey is cryptographically secured and beautifully presented in your personal dashboard. It acts as an eternal, digital ledger of your spiritual path." },
  { q: "Are Elite rituals exclusive?", a: "Yes. The Elite tier grants access to private, closed-door ceremonies that are bespoke to the individual. These are highly exclusive experiences designed for our most devoted members." }
];

// ============================================================================
// SVG ICONS
// ============================================================================
const SanctumLogo = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M50 15L85 80H15L50 15Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="58" r="12" fill="currentColor" />
  </svg>
);

const IconChevron = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function LandingPage() {
  const navigate = useNavigate();
  
  // State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Scroll effect for Navbar & Scroll Reveal
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Simple reveal logic
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      const elementVisible = 150;
      
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate deterministic particles to avoid hydration mismatches if SSR, but fine for SPA
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 10,
    opacity: Math.random() * 0.4 + 0.1,
    drift: (Math.random() - 0.5) * 50
  }));

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-wrapper">
      <style dangerouslySetInnerHTML={{ __html: sanctumStyles }} />

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="ambient-layer">
        <div className="ambient-orb-1"></div>
        <div className="ambient-orb-2"></div>
        <div className="ambient-orb-3"></div>
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            width: `${p.size}px`, height: `${p.size}px`, left: `${p.left}vw`,
            bottom: '-10px',
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            '--p-opacity': p.opacity, '--p-drift': `${p.drift}vw`
          }} />
        ))}
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand" onClick={() => window.scrollTo(0,0)}>
          <SanctumLogo className="brand-logo-svg" />
          <span className="brand-text">Sanctum</span>
        </div>
        
        <div className="nav-links">
          <span className="nav-link" onClick={() => scrollToSection('features')}>Architecture</span>
          <span className="nav-link" onClick={() => scrollToSection('memberships')}>Ascension</span>
          <span className="nav-link" onClick={() => scrollToSection('lore')}>Lore</span>
          <span className="nav-link" onClick={() => scrollToSection('faq')}>Mysteries</span>
        </div>
        
        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/signup')}>Sign Up</button>
          <button className="btn btn-admin" onClick={() => navigate('/admin')}>Admin</button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
          <IconMenu />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <button style={{position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem'}} onClick={() => setMobileMenuOpen(false)}>
          <IconX />
        </button>
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center'}}>
          <span className="nav-link" style={{fontSize: '1.5rem'}} onClick={() => scrollToSection('features')}>Architecture</span>
          <span className="nav-link" style={{fontSize: '1.5rem'}} onClick={() => scrollToSection('memberships')}>Ascension</span>
          <span className="nav-link" style={{fontSize: '1.5rem'}} onClick={() => scrollToSection('lore')}>Lore</span>
          <span className="nav-link" style={{fontSize: '1.5rem'}} onClick={() => scrollToSection('faq')}>Mysteries</span>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem'}}>
            <button className="btn btn-ghost" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-primary" onClick={() => navigate('/signup')}>Sign Up</button>
            <button className="btn btn-admin" onClick={() => navigate('/admin')}>Admin Portal</button>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <svg className="hero-mandala-bg" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="90" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="75" />
          <path d="M100 25 L175 100 L100 175 L25 100 Z" />
          <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.2"/>
        </svg>

        <div className="hero-content">
          <div className="hero-badge">
            ✦ Welcome to the <span>Digital Ethers</span> ✦
          </div>
          <h1 className="hero-title">
            Sanctum <br/>
            <span className="text-gradient">The Digital Temple</span>
          </h1>
          <p className="hero-subtitle">
            Enter the Sacred Digital Sanctum. Where ancient tradition meets futuristic luxury, and every ritual is etched in the eternal cosmos.
          </p>
          <div className="hero-cta-group">
            <button className="btn btn-primary hero-cta-main" onClick={() => navigate('/login')}>Enter Sanctum</button>
            <button className="btn btn-ghost hero-cta-main" onClick={() => navigate('/signup')}>Become a Member</button>
          </div>
        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section className="section-container stats-section reveal">
        <div className="stats-grid">
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="section-container reveal">
        <div className="section-header">
          <div className="section-kicker">Divine Architecture</div>
          <h2 className="section-title text-gradient">Tools of Devotion</h2>
          <p className="section-desc">Experience spiritual software crafted with the precision of a master artisan. Sanctum offers unparalleled systems for your ascension.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">{feat.icon}</div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TEMPLE EXPERIENCE SHOWCASE --- */}
      <section className="section-container reveal">
        <div className="showcase-row">
          <div className="showcase-visual">
             <div className="visual-ring-1"></div>
             <div className="visual-ring-2"></div>
             <div className="visual-core">🪷</div>
          </div>
          <div className="showcase-content">
            <div className="section-kicker" style={{justifyContent: 'flex-start'}}>The Ritual</div>
            <h2 className="showcase-title text-gradient">Immersive Spiritual Presence</h2>
            <p className="showcase-text">
              Every interaction within Sanctum is designed to induce a state of flow and reverence. 
              Our cinematic interfaces strip away digital noise, leaving only the pure essence of your devotion.
            </p>
            <p className="showcase-text">
              Watch as your offerings materialize into beautifully rendered timelines, connecting your present actions to ancient cosmic rhythms.
            </p>
          </div>
        </div>
        
        <div className="showcase-row reverse reveal" style={{marginTop: '4rem'}}>
          <div className="showcase-visual" style={{background: 'linear-gradient(45deg, #120a1a, #0a101a)'}}>
             <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5}}></div>
             <div className="visual-core" style={{fontSize: '4rem'}}>📜</div>
          </div>
          <div className="showcase-content">
            <div className="section-kicker" style={{justifyContent: 'flex-start'}}>The Ledger</div>
            <h2 className="showcase-title text-gradient">Eternal Cosmic Archives</h2>
            <p className="showcase-text">
              Unlike mortal memory, your spiritual progress here is eternal. Sanctum's dashboard acts as a sacred ledger, recording every Seva and offering.
            </p>
            <p className="showcase-text">
              Review your journey through visually stunning analytics that map your growth across the spiritual echelons.
            </p>
          </div>
        </div>
      </section>

      {/* --- MEMBERSHIP TIERS SECTION --- */}
      <section id="memberships" className="section-container reveal">
        <div className="section-header">
          <div className="section-kicker">Paths of Ascension</div>
          <h2 className="section-title text-gradient">Choose Your State of Being</h2>
          <p className="section-desc">Begin your journey. As your devotion deepens, so too will your access to the temple's innermost mysteries.</p>
        </div>
        <div className="tiers-grid">
          {TIERS.map((tier, idx) => (
            <div key={idx} className={`tier-card ${tier.isElite ? 'tier-elite' : ''}`} style={{'--t-color': `var(${tier.cssVar})`, '--t-glow': `var(${tier.cssVar}-glow)`}}>
              <div className="tier-icon">{tier.icon}</div>
              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-desc">{tier.desc}</p>
              <ul className="tier-features">
                {tier.features.map((feat, i) => (
                  <li key={i} className="tier-feature">
                    <IconCheck /> {feat}
                  </li>
                ))}
              </ul>
              <button className="btn-tier" onClick={() => navigate('/signup')}>
                {tier.isElite ? 'Request Audience' : 'Join Tier'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT SANCTUM / LORE --- */}
      <section id="lore" className="section-container reveal" style={{background: 'linear-gradient(180deg, transparent, rgba(15,15,20,0.4), transparent)', padding: '6rem 2rem', borderRadius: '30px', border: '1px solid var(--border-dim)'}}>
        <div className="section-header" style={{marginBottom: '3rem'}}>
          <div className="section-kicker">The Genesis</div>
          <h2 className="section-title text-gradient">Preserving Spiritual Heritage</h2>
        </div>
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <p className="section-desc" style={{marginBottom: '2rem'}}>
            For millennia, humanity has sought connection with the divine through stone temples and whispered prayers. 
            Yet, as we evolve, so too must our sanctuaries. Sanctum was forged by visionary architects who saw 
            the digital realm not as a distraction, but as a new canvas for the sacred.
          </p>
          <p className="section-desc">
            By digitizing ancient rituals and securing them within a luxurious, cinematic interface, 
            we have created a space where the soul can ascend unburdened by physical limits. 
            Here, every click is a mantra, every scroll a meditation, and every offering a permanent mark on the cosmos.
          </p>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="section-container reveal">
        <div className="section-header">
          <div className="section-kicker">Voices of the Ascended</div>
          <h2 className="section-title text-gradient">Transformative Experiences</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((test, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{test.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{test.avatar}</div>
                <div className="author-info">
                  <h4>{test.name}</h4>
                  <span>{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="section-container reveal">
        <div className="section-header">
          <div className="section-kicker">Unveiling the Unknown</div>
          <h2 className="section-title text-gradient">Mysteries Answered</h2>
        </div>
        <div className="faq-container">
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(idx)}>
                {faq.q}
                <div className="faq-icon"><IconChevron /></div>
              </div>
              <div className="faq-answer">
                <div style={{paddingTop: '1rem'}}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CINEMATIC CTA --- */}
      <section className="cta-section reveal">
        <div className="cta-bg-layer"></div>
        <div className="cta-content">
          <div className="section-kicker">The Portal is Open</div>
          <h2 className="cta-title text-gold-gradient">Begin Your Sacred Ascension</h2>
          <p className="section-desc" style={{color: '#fff', marginBottom: '2rem'}}>
            The doors of the digital temple await. Will you step inside and transform your spiritual destiny?
          </p>
          <div className="cta-actions">
            <button className="btn btn-primary" style={{padding: '1.2rem 3rem', fontSize: '1.1rem'}} onClick={() => navigate('/login')}>Enter Sanctum</button>
            <button className="btn btn-ghost" style={{padding: '1.2rem 3rem', fontSize: '1.1rem'}} onClick={() => navigate('/signup')}>Become a Member</button>
          </div>
          <div style={{marginTop: '3rem'}}>
             <button className="btn btn-admin" onClick={() => navigate('/admin')}>Admin Access</button>
          </div>
        </div>
      </section>

      {/* --- LUXURY FOOTER --- */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <SanctumLogo style={{width: '32px', height: '32px', color: 'var(--text-pure)'}} />
              <span style={{fontFamily: 'var(--font-cinzel)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.1em'}}>SANCTUM</span>
            </div>
            <p>The premier platform for futuristic spiritual devotion and ritual management. Ascend with us.</p>
          </div>
          
          <div className="footer-col">
            <h4>Temple</h4>
            <ul className="footer-links">
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Architecture</a></li>
              <li><a href="#memberships" onClick={(e) => { e.preventDefault(); scrollToSection('memberships'); }}>Tiers of Ascension</a></li>
              <li><a href="#lore" onClick={(e) => { e.preventDefault(); scrollToSection('lore'); }}>Sacred Lore</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>Mysteries (FAQ)</a></li>
              <li><a href="#contact">Contact High Priests</a></li>
              <li><a href="#terms">Terms of Devotion</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Ethereal Network</h4>
            <ul className="footer-links">
              <li><a href="#twitter">Holographic Broadcasts</a></li>
              <li><a href="#instagram">Visual Archives</a></li>
              <li><a href="#discord">Community Sanctuary</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Sanctum Spiritual Systems. Preserving the divine in the digital realm. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}