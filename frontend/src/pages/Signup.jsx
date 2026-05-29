import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// ULTRA-PREMIUM CINEMATIC CSS INJECTION
// ============================================================================
const sanctumSignupStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
  /* Core Colors */
  --bg-abyss: #020203;
  --bg-surface: rgba(10, 12, 18, 0.6);
  --bg-glass: rgba(15, 18, 25, 0.4);
  --bg-input: rgba(5, 5, 8, 0.7);
  
  /* Text */
  --text-pure: #ffffff;
  --text-primary: #e2e2e8;
  --text-secondary: #8a8a9e;
  --text-muted: #5a5a70;
  
  /* Borders */
  --border-dim: rgba(255, 255, 255, 0.05);
  --border-glow: rgba(255, 255, 255, 0.15);
  
  /* Fonts */
  --font-cinzel: 'Cinzel', serif;
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-inter: 'Inter', sans-serif;

  /* Transitions */
  --ease-cinematic: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.26, 1.55);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  
  /* Tier Definitions */
  --tier-initiate-main: #8ab4f8;
  --tier-initiate-dark: #1a3a6c;
  --tier-initiate-glow: rgba(138, 180, 248, 0.4);
  
  --tier-devotee-main: #c58af9;
  --tier-devotee-dark: #4a1c7c;
  --tier-devotee-glow: rgba(197, 138, 249, 0.4);
  
  --tier-ascendant-main: #e8eaed;
  --tier-ascendant-dark: #5a5c60;
  --tier-ascendant-glow: rgba(232, 234, 237, 0.4);
  
  --tier-elite-main: #d4af37;
  --tier-elite-dark: #5c470a;
  --tier-elite-glow: rgba(212, 175, 55, 0.4);

  /* Dynamic Active Theme (Updated via React inline styles) */
  --active-main: var(--tier-initiate-main);
  --active-dark: var(--tier-initiate-dark);
  --active-glow: var(--tier-initiate-glow);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-abyss);
  color: var(--text-primary);
  font-family: var(--font-inter);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-abyss); }
::-webkit-scrollbar-thumb { background: var(--border-glow); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--active-main); }

/* ==========================================================================
   ADVANCED ANIMATIONS
   ========================================================================== */
@keyframes abyssBreathe {
  0%, 100% { transform: scale(1); opacity: 0.15; filter: blur(100px); }
  50% { transform: scale(1.3); opacity: 0.3; filter: blur(120px); }
}

@keyframes particleAscension {
  0% { transform: translate(0, 100vh) scale(0); opacity: 0; }
  15% { opacity: var(--p-opacity); transform: translate(var(--p-drift-x), 80vh) scale(1); }
  85% { opacity: var(--p-opacity); transform: translate(var(--p-drift-x-end), 20vh) scale(1); }
  100% { transform: translate(0, -20vh) scale(0); opacity: 0; }
}

@keyframes mandalaSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes mandalaReverseSpin {
  from { transform: translate(-50%, -50%) rotate(360deg); }
  to { transform: translate(-50%, -50%) rotate(0deg); }
}

@keyframes cinematicEntranceUp {
  from { opacity: 0; transform: translateY(60px) scale(0.95); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

@keyframes cinematicFadeIn {
  from { opacity: 0; filter: blur(5px); }
  to { opacity: 1; filter: blur(0); }
}

@keyframes shimmerWave {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes borderGlowPulse {
  0%, 100% { box-shadow: inset 0 0 10px transparent, 0 0 10px transparent; }
  50% { box-shadow: inset 0 0 20px var(--active-glow), 0 0 30px var(--active-glow); }
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}

@keyframes spinnerRotate {
  0% { transform: rotate(0deg); stroke-dashoffset: 280; }
  50% { transform: rotate(180deg); stroke-dashoffset: 70; }
  100% { transform: rotate(360deg); stroke-dashoffset: 280; }
}

@keyframes successOverlayReveal {
  0% { opacity: 0; backdrop-filter: blur(0px); background: transparent; }
  100% { opacity: 1; backdrop-filter: blur(40px); background: rgba(2, 2, 3, 0.9); }
}

@keyframes cinematicScaleUp {
  0% { opacity: 0; transform: scale(0.8) translateY(40px); filter: blur(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}

@keyframes divineIdGlow {
  0%, 100% { text-shadow: 0 0 30px var(--active-glow), 0 0 60px var(--active-main); }
  50% { text-shadow: 0 0 60px var(--active-main), 0 0 100px var(--text-pure), 0 0 140px var(--active-glow); }
}

/* ==========================================================================
   GLOBAL LAYOUT & CINEMATIC BACKGROUND
   ========================================================================== */
.signup-page-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background: radial-gradient(circle at 50% 0%, #0d0f14 0%, var(--bg-abyss) 80%);
  transition: all 1.5s var(--ease-cinematic);
}

.ambient-nebula-left, .ambient-nebula-right {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transition: all 2s var(--ease-cinematic);
}
.ambient-nebula-left {
  top: -10%; left: -10%;
  width: 70vw; height: 70vw;
  background: radial-gradient(circle, var(--active-glow) 0%, transparent 60%);
  animation: abyssBreathe 20s infinite alternate var(--ease-cinematic);
}
.ambient-nebula-right {
  bottom: -20%; right: -10%;
  width: 80vw; height: 80vw;
  background: radial-gradient(circle, var(--active-dark) 0%, transparent 70%);
  animation: abyssBreathe 25s infinite alternate-reverse var(--ease-cinematic);
}

.sacred-geometry-layer {
  position: fixed;
  top: 50%; left: 50%;
  width: 150vmin; height: 150vmin;
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
  transform-origin: center center;
  transition: opacity 1s var(--ease-cinematic);
}
.sacred-geometry-outer {
  position: absolute; inset: 0;
  animation: mandalaSpin 180s linear infinite;
  color: var(--active-main);
  transition: color 2s var(--ease-cinematic);
}
.sacred-geometry-inner {
  position: absolute; inset: 15%;
  animation: mandalaReverseSpin 120s linear infinite;
  color: var(--text-pure);
}

.particle-system {
  position: fixed; inset: 0; z-index: 2; pointer-events: none;
}
.ethereal-particle {
  position: absolute;
  background: radial-gradient(circle, var(--text-pure) 0%, var(--active-main) 50%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--active-glow);
  animation: particleAscension linear infinite;
  transition: background 1s ease, box-shadow 1s ease;
}

.main-content-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  padding: 4rem 2rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* ==========================================================================
   HEADER SECTION
   ========================================================================== */
.hero-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: cinematicEntranceUp 1.2s var(--ease-out-expo) forwards;
}

.sanctum-brand-crest {
  position: relative;
  width: 80px; height: 80px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sanctum-brand-crest svg {
  width: 100%; height: 100%;
  color: var(--text-pure);
  filter: drop-shadow(0 0 20px var(--active-glow));
  transition: all 1s var(--ease-cinematic);
}
.crest-halo-ring {
  position: absolute;
  inset: -20px;
  border: 1px dashed var(--border-glow);
  border-radius: 50%;
  animation: mandalaSpin 40s linear infinite;
  transition: border-color 1s ease;
}
.signup-page-wrapper:hover .crest-halo-ring {
  border-color: var(--active-glow);
}

.hero-title {
  font-family: var(--font-cinzel);
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: linear-gradient(135deg, var(--text-pure) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  text-shadow: 0 10px 30px rgba(0,0,0,0.8);
}
.hero-subtitle {
  font-family: var(--font-cormorant);
  font-size: 1.4rem;
  color: var(--text-secondary);
  letter-spacing: 0.1em;
  font-style: italic;
  max-width: 600px;
}

/* ==========================================================================
   TIER SELECTION GRID
   ========================================================================== */
.tier-selection-area {
  width: 100%;
  animation: cinematicEntranceUp 1.2s var(--ease-out-expo) 0.15s forwards;
  opacity: 0;
}
.section-kicker {
  font-family: var(--font-cinzel);
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 2.5rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.section-kicker::before, .section-kicker::after {
  content: '';
  height: 1px;
  width: 60px;
  background: linear-gradient(90deg, transparent, var(--text-muted), transparent);
}

.tier-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.tier-card {
  position: relative;
  background: var(--bg-surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-dim);
  border-radius: 20px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.5s var(--ease-cinematic);
  box-shadow: 0 15px 35px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
}

.tier-card-bg-glow {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 150px; height: 150px;
  background: radial-gradient(circle, var(--card-glow) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s var(--ease-cinematic);
  pointer-events: none;
}

.tier-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(180deg, var(--card-glow), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.tier-card:hover {
  transform: translateY(-8px);
  background: rgba(20, 24, 35, 0.7);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}
.tier-card:hover .tier-card-bg-glow { opacity: 0.15; }

.tier-card.active {
  transform: translateY(-12px) scale(1.02);
  background: linear-gradient(180deg, rgba(20,24,35,0.8) 0%, var(--bg-abyss) 100%);
  border-color: transparent;
  box-shadow: 
    0 30px 60px rgba(0,0,0,0.8),
    0 0 40px var(--card-glow),
    inset 0 0 20px rgba(255,255,255,0.02);
}
.tier-card.active::after { opacity: 1; }
.tier-card.active .tier-card-bg-glow { opacity: 0.25; top: -20px; }

.tier-icon-wrapper {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));
  transition: all 0.5s var(--ease-spring);
  position: relative;
  z-index: 2;
}
.tier-card.active .tier-icon-wrapper {
  transform: scale(1.2);
  filter: drop-shadow(0 0 25px var(--card-main));
}

.tier-name {
  font-family: var(--font-cinzel);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-pure);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  transition: color 0.4s ease;
  z-index: 2;
}
.tier-card.active .tier-name {
  color: var(--card-main);
  text-shadow: 0 0 20px var(--card-glow);
}

.tier-description {
  font-family: var(--font-inter);
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  z-index: 2;
  transition: color 0.4s ease;
}
.tier-card.active .tier-description {
  color: var(--text-primary);
}

/* ==========================================================================
   SIGNUP FORM SECTION
   ========================================================================== */
.signup-form-section {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  animation: cinematicEntranceUp 1.2s var(--ease-out-expo) 0.3s forwards;
  opacity: 0;
  position: relative;
}

.sacred-form-panel {
  position: relative;
  background: var(--bg-glass);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--border-dim);
  border-radius: 24px;
  padding: 3.5rem 4rem;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.5s var(--ease-cinematic);
}

.sacred-form-panel::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--active-main), transparent);
  opacity: 0.5;
  transition: all 1s ease;
}

.sacred-form-panel.has-error {
  animation: errorShake 0.6s var(--ease-spring) forwards;
  border-color: rgba(255, 77, 77, 0.4);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.7),
    0 0 40px rgba(255, 77, 77, 0.15),
    inset 0 0 20px rgba(255, 77, 77, 0.05);
}
.sacred-form-panel.has-error::before { background: linear-gradient(90deg, transparent, #ff4d4d, transparent); }

/* Form Error Banner */
.error-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: rgba(255, 77, 77, 0.08);
  border: 1px solid rgba(255, 77, 77, 0.3);
  border-radius: 12px;
  margin-bottom: 2.5rem;
  animation: cinematicFadeIn 0.4s ease forwards;
}
.error-banner svg {
  flex-shrink: 0;
  width: 24px; height: 24px;
  color: #ff4d4d;
}
.error-banner span {
  color: #ffb3b3;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Info Box */
.oracle-info-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border-left: 2px solid var(--active-main);
  border-radius: 0 12px 12px 0;
  margin-bottom: 2.5rem;
  transition: border-color 1s ease;
}
.oracle-info-box svg {
  flex-shrink: 0;
  width: 20px; height: 20px;
  color: var(--active-main);
  margin-top: 0.2rem;
  transition: color 1s ease;
}
.oracle-info-box p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Inputs */
.input-group {
  position: relative;
  margin-bottom: 2.5rem;
}
.input-icon {
  position: absolute;
  left: 1.2rem; top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  width: 22px; height: 22px;
  pointer-events: none;
  transition: all 0.4s var(--ease-cinematic);
  z-index: 2;
}
.input-field {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-dim);
  border-radius: 12px;
  padding: 1.4rem 1.2rem 1.4rem 3.5rem;
  color: var(--text-pure);
  font-family: var(--font-inter);
  font-size: 1.05rem;
  transition: all 0.4s var(--ease-cinematic);
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.6);
}
.input-field::placeholder { color: transparent; }

.input-field:focus {
  outline: none;
  background: rgba(10, 12, 18, 0.8);
  border-color: var(--border-glow);
  box-shadow: inset 0 2px 15px rgba(0,0,0,0.8), 0 0 20px var(--active-glow);
}

.floating-label {
  position: absolute;
  left: 3.5rem; top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-family: var(--font-cinzel);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  pointer-events: none;
  transition: all 0.3s var(--ease-out-expo);
  z-index: 1;
}

.input-field:focus ~ .floating-label,
.input-field:not(:placeholder-shown) ~ .floating-label {
  top: -0.6rem; left: 1rem;
  font-size: 0.75rem;
  color: var(--active-main);
  background: var(--bg-abyss);
  padding: 0 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.15em;
  font-weight: 600;
}

.input-field:focus ~ .input-icon {
  color: var(--active-main);
  filter: drop-shadow(0 0 8px var(--active-glow));
}

.input-bottom-line {
  position: absolute;
  bottom: 0; left: 50%;
  width: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--active-main), transparent);
  transform: translateX(-50%);
  transition: all 0.5s var(--ease-cinematic);
}
.input-field:focus ~ .input-bottom-line {
  width: 85%;
  box-shadow: 0 -2px 10px var(--active-glow);
}

.toggle-visibility-btn {
  position: absolute;
  right: 1.2rem; top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--text-muted);
  width: 22px; height: 22px;
  cursor: pointer;
  z-index: 3;
  transition: color 0.3s ease;
}
.toggle-visibility-btn:hover { color: var(--text-pure); }
.toggle-visibility-btn:focus { outline: none; color: var(--active-main); }

/* Submit Button */
.submit-action-wrapper {
  margin-top: 1rem;
  position: relative;
}
.btn-submit-premium {
  position: relative;
  width: 100%;
  padding: 1.4rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: var(--text-pure);
  font-family: var(--font-cinzel);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s var(--ease-cinematic);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.btn-submit-premium::before {
  content: '';
  position: absolute;
  top: 0; left: -150%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: skewX(-20deg);
  transition: all 0.7s var(--ease-out-expo);
}

.btn-submit-premium:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--active-main);
  color: var(--active-main);
  transform: translateY(-3px);
  box-shadow: 
    0 15px 30px rgba(0,0,0,0.5),
    0 0 25px var(--active-glow),
    inset 0 0 15px var(--active-glow);
}
.btn-submit-premium:hover:not(:disabled)::before {
  animation: shimmerWave 2s infinite;
}

.btn-submit-premium:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-loading-spinner {
  width: 28px; height: 28px;
  fill: none;
  stroke: var(--active-main);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 280;
  animation: spinnerRotate 2s cubic-bezier(0.68, -0.55, 0.26, 1.55) infinite;
}

/* Footer Link */
.auth-footer {
  text-align: center;
  margin-top: 2.5rem;
  font-family: var(--font-inter);
  font-size: 0.95rem;
  color: var(--text-secondary);
}
.auth-footer button {
  background: none;
  border: none;
  color: var(--active-main);
  font-family: var(--font-cinzel);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-left: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
.auth-footer button::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0%; height: 1px;
  background: var(--active-main);
  transition: width 0.3s ease;
}
.auth-footer button:hover {
  text-shadow: 0 0 15px var(--active-glow);
}
.auth-footer button:hover::after { width: 100%; }

/* ==========================================================================
   CINEMATIC SUCCESS REVEAL
   ========================================================================== */
.success-overlay-portal {
  position: fixed; inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: successOverlayReveal 1.5s var(--ease-cinematic) forwards;
  pointer-events: all;
}

.success-cinematic-card {
  position: relative;
  background: linear-gradient(180deg, rgba(15, 18, 25, 0.9) 0%, #000000 100%);
  border: 1px solid var(--active-main);
  border-radius: 30px;
  padding: 5rem 4rem;
  max-width: 800px;
  width: 90%;
  text-align: center;
  box-shadow: 
    0 40px 100px rgba(0,0,0,1),
    0 0 80px var(--active-glow),
    inset 0 0 40px rgba(0,0,0,0.8);
  animation: cinematicScaleUp 1.2s var(--ease-spring) 0.3s forwards;
  opacity: 0;
  overflow: hidden;
}

.success-bg-ornament {
  position: absolute; inset: 0;
  background: radial-gradient(circle at top, var(--active-glow) 0%, transparent 70%);
  opacity: 0.3; pointer-events: none;
}
.success-bg-mandala {
  position: absolute; top: -50%; left: -50%;
  width: 200%; height: 200%;
  opacity: 0.05; pointer-events: none;
  animation: mandalaSpin 60s linear infinite;
  color: var(--active-main);
}

.success-icon-container {
  position: relative;
  width: 100px; height: 100px;
  margin: 0 auto 2.5rem;
  color: var(--active-main);
  filter: drop-shadow(0 0 25px var(--active-glow));
}
.success-icon-container svg { width: 100%; height: 100%; animation: mandalaSpin 30s linear infinite; }

.success-header-title {
  position: relative;
  font-family: var(--font-cinzel);
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-pure);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.success-header-subtitle {
  position: relative;
  font-family: var(--font-inter);
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 4rem;
}

.divine-id-display-area {
  position: relative;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
  overflow: hidden;
}
.divine-id-display-area::before {
  content: ''; position: absolute; top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: skewX(-25deg);
  animation: shimmerWave 4s infinite 1.5s;
}
.divine-id-label {
  display: block;
  font-family: var(--font-cinzel);
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 1.5rem;
}
.divine-id-value {
  display: block;
  font-family: var(--font-cormorant);
  font-size: 6.5rem;
  font-weight: 700;
  color: var(--text-pure);
  line-height: 1;
  letter-spacing: 0.15em;
  animation: divineIdGlow 4s infinite alternate;
}

.security-warning-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(255, 77, 77, 0.05);
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 30px;
  margin-bottom: 3rem;
}
.security-warning-box svg { width: 24px; height: 24px; color: #ff4d4d; }
.security-warning-box span { color: #ffb3b3; font-size: 1rem; font-weight: 500; letter-spacing: 0.05em; }

.btn-acknowledge-ritual {
  position: relative;
  padding: 1.5rem 5rem;
  background: var(--active-main);
  border: none;
  border-radius: 12px;
  color: var(--bg-abyss);
  font-family: var(--font-cinzel);
  font-size: 1.3rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.4s var(--ease-spring);
  box-shadow: 0 0 30px var(--active-glow);
}
.btn-acknowledge-ritual:hover {
  transform: translateY(-4px) scale(1.02);
  background: var(--text-pure);
  box-shadow: 0 15px 40px var(--active-glow), 0 0 60px var(--active-main);
}

/* ==========================================================================
   RESPONSIVE LAYOUT
   ========================================================================== */
@media (max-width: 1200px) {
  .tier-cards-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-title { font-size: 3.5rem; }
}
@media (max-width: 768px) {
  .main-content-container { padding: 2rem 1rem 5rem; gap: 3rem; }
  .hero-title { font-size: 2.5rem; }
  .hero-subtitle { font-size: 1.1rem; }
  .tier-cards-grid { grid-template-columns: 1fr; }
  .tier-card { padding: 2rem 1.5rem; }
  .sacred-form-panel { padding: 2.5rem 1.5rem; }
  
  .success-cinematic-card { padding: 3rem 1.5rem; width: 95%; }
  .success-header-title { font-size: 2.2rem; }
  .divine-id-value { font-size: 4rem; }
  .btn-acknowledge-ritual { padding: 1.2rem 2rem; font-size: 1.1rem; width: 100%; }
  .security-warning-box { padding: 1rem; flex-direction: column; text-align: center; }
}
`;

// ============================================================================
// CONFIGURATION & DATA
// ============================================================================
const TIER_DATA = [
  {
    id: 'initiate',
    name: 'Initiate',
    desc: 'Take your first step into the digital sanctuary. The moonlight guides your path to foundational rituals.',
    icon: '🌙',
    cssMain: 'var(--tier-initiate-main)',
    cssDark: 'var(--tier-initiate-dark)',
    cssGlow: 'var(--tier-initiate-glow)'
  },
  {
    id: 'devotee',
    name: 'Devotee',
    desc: 'Deepen your devotion. Ethereal energies surround you, unlocking mystic pathways to grander sevas.',
    icon: '🔮',
    cssMain: 'var(--tier-devotee-main)',
    cssDark: 'var(--tier-devotee-dark)',
    cssGlow: 'var(--tier-devotee-glow)'
  },
  {
    id: 'ascendant',
    name: 'Ascendant',
    desc: 'Ascend beyond the mortal veil. Radiant spiritual glows follow your every interaction, granting transcendent ceremonies.',
    icon: '✨',
    cssMain: 'var(--tier-ascendant-main)',
    cssDark: 'var(--tier-ascendant-dark)',
    cssGlow: 'var(--tier-ascendant-glow)'
  },
  {
    id: 'elite',
    name: 'Elite',
    desc: 'The ultimate state of divine luxury. You stand at the zenith. Exclusive rituals and bespoke blessings await.',
    icon: '👑',
    cssMain: 'var(--tier-elite-main)',
    cssDark: 'var(--tier-elite-dark)',
    cssGlow: 'var(--tier-elite-glow)'
  }
];

// ============================================================================
// DETAILED SVG COMPONENTS
// ============================================================================
const SanctumLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M50 35 L65 60 L35 60 Z" fill="currentColor" opacity="0.9" />
    <circle cx="50" cy="50" r="5" fill="var(--bg-abyss)" />
  </svg>
);

const SacredMandalaOuter = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sacred-geometry-outer">
    <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" />
    <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <path d="M100 5 L125 75 L195 100 L125 125 L100 195 L75 125 L5 100 L75 75 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <path d="M100 20 L115 85 L180 100 L115 115 L100 180 L85 115 L20 100 L85 85 Z" stroke="currentColor" strokeWidth="0.2" />
    <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
  </svg>
);

const SacredMandalaInner = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sacred-geometry-inner">
    <polygon points="100,10 190,145 10,145" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
    <polygon points="100,190 10,55 190,55" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const IconEye = ({ visible }) => (
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

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);


// ============================================================================
// MAIN SIGNUP COMPONENT
// ============================================================================
export default function Signup() {
  const navigate = useNavigate();

  // --- State Management ---
  const [selectedTier, setSelectedTier] = useState('initiate');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Request states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null); // Will hold { userId, tier } upon success

  // --- Particles Generation (Memoized to prevent recreation on render) ---
  const particles = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      startX: Math.random() * 100,
      endX: (Math.random() * 100) - 50, // Drift left or right
      delay: Math.random() * 15,
      duration: Math.random() * 20 + 15,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  // --- Form Submission Logic ---
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Pre-flight validation
    if (!password || !confirmPassword) {
      setError('You must forge a sacred cipher to secure your essence.');
      return;
    }
    if (password.length < 6) {
      setError('Your cipher must possess at least 6 cosmic characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Your ciphers lack resonance. They must match exactly.');
      return;
    }

    setLoading(true);

    try {
      // The exact requested fetch implementation
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          password: password, 
          tier: selectedTier 
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Trigger the cinematic success reveal
        setSuccessData({
          userId: data.userId,
          tier: data.tier
        });
      } else {
        setError(data.message || 'The divine oracle rejected your initiation. Please try again.');
      }
    } catch (err) {
      console.error('Sanctum Initiation Error:', err);
      setError('A disturbance in the ether prevented connection to the oracle. Ensure the backend is active.');
    } finally {
      setLoading(false);
    }
  };

  // --- Post-Signup Navigation ---
  const handleComplete = () => {
    if (successData) {
      // Store exact data into localStorage
      localStorage.setItem('userId', successData.userId);
      localStorage.setItem('tier', successData.tier);
      
      // Redirect to dashboard
      navigate('/dashboard');
    }
  };

  // --- Dynamic Styling based on active tier ---
  const activeConfig = TIER_DATA.find(t => t.id === selectedTier) || TIER_DATA[0];
  const dynamicPageStyles = {
    '--active-main': activeConfig.cssMain,
    '--active-dark': activeConfig.cssDark,
    '--active-glow': activeConfig.cssGlow
  };

  return (
    <div className="signup-page-wrapper" style={dynamicPageStyles}>
      {/* Inject pure CSS */}
      <style dangerouslySetInnerHTML={{ __html: sanctumSignupStyles }} />

      {/* --- CINEMATIC BACKGROUND ELEMENTS --- */}
      <div className="ambient-nebula-left"></div>
      <div className="ambient-nebula-right"></div>
      
      <div className="sacred-geometry-layer">
        <SacredMandalaOuter />
        <SacredMandalaInner />
      </div>

      <div className="particle-system">
        {particles.map((p) => (
          <div
            key={p.id}
            className="ethereal-particle"
            style={{
              width: `${p.size}px`, height: `${p.size}px`,
              left: `${p.startX}vw`,
              animationDelay: `${p.delay}s`, 
              animationDuration: `${p.duration}s`,
              '--p-opacity': p.opacity,
              '--p-drift-x': `${p.endX * 0.3}vw`,
              '--p-drift-x-end': `${p.endX}vw`
            }}
          />
        ))}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content-container">
        
        {/* 1. Hero Section */}
        <header className="hero-header">
          <div className="sanctum-brand-crest">
            <div className="crest-halo-ring"></div>
            <SanctumLogo />
          </div>
          <h1 className="hero-title">Initiation</h1>
          <p className="hero-subtitle">Step out of the mundane. Join the eternal digital order of Sanctum.</p>
        </header>

        {/* 2. Interactive Tier Selection */}
        <section className="tier-selection-area">
          <h2 className="section-kicker">Select Your Spiritual Resonance</h2>
          
          <div className="tier-cards-grid">
            {TIER_DATA.map((tier) => (
              <div
                key={tier.id}
                className={`tier-card ${selectedTier === tier.id ? 'active' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
                style={{ 
                  '--card-main': tier.cssMain, 
                  '--card-glow': tier.cssGlow 
                }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedTier === tier.id}
                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setSelectedTier(tier.id) }}
              >
                <div className="tier-card-bg-glow"></div>
                
                <div className="tier-icon-wrapper">{tier.icon}</div>
                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-description">{tier.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Signup Form */}
        <section className="signup-form-section">
          <div className={`sacred-form-panel ${error ? 'has-error' : ''}`}>
            
            {/* Error State */}
            {error && (
              <div className="error-banner">
                <IconAlert />
                <span>{error}</span>
              </div>
            )}

            {/* Instruction Context */}
            <div className="oracle-info-box">
              <IconInfo />
              <p>The Divine Oracle will automatically generate your unique Sanctum ID upon completion. Prepare your cipher.</p>
            </div>

            {/* The Form */}
            <form onSubmit={handleSignup} noValidate>
              
              {/* Password */}
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="input-field"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || successData !== null}
                />
                <label htmlFor="password" className="floating-label">Forge Sacred Cipher</label>
                <div className="input-icon"><IconLock /></div>
                <div className="input-bottom-line"></div>
                <button
                  type="button"
                  className="toggle-visibility-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  disabled={loading || successData !== null}
                  aria-label="Toggle cipher visibility"
                >
                  <IconEye visible={showPassword} />
                </button>
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className="input-field"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading || successData !== null}
                />
                <label htmlFor="confirmPassword" className="floating-label">Confirm Cipher Resonance</label>
                <div className="input-icon"><IconLock /></div>
                <div className="input-bottom-line"></div>
                <button
                  type="button"
                  className="toggle-visibility-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                  disabled={loading || successData !== null}
                  aria-label="Toggle confirm cipher visibility"
                >
                  <IconEye visible={showConfirmPassword} />
                </button>
              </div>

              {/* Submit */}
              <div className="submit-action-wrapper">
                <button 
                  type="submit" 
                  className="btn-submit-premium"
                  disabled={loading || successData !== null}
                >
                  {loading ? (
                    <>
                      <svg className="btn-loading-spinner" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45"></circle>
                      </svg>
                      Communing with Oracle...
                    </>
                  ) : (
                    'Ascend to Sanctum'
                  )}
                </button>
              </div>

            </form>

            <div className="auth-footer">
              Already possess a sacred ID? 
              <button onClick={() => navigate('/login')}>Enter Temple</button>
            </div>

          </div>
        </section>
      </div>

      {/* --- 4. CINEMATIC SUCCESS REVEAL MODAL --- */}
      {successData && (
        <div className="success-overlay-portal">
          <div className="success-cinematic-card">
            
            <div className="success-bg-ornament"></div>
            <div className="success-bg-mandala">
              <SacredMandalaOuter />
            </div>

            <div className="success-icon-container">
              <SanctumLogo />
            </div>
            
            <h2 className="success-header-title">Initiation Complete</h2>
            <p className="success-header-subtitle">
              Your essence has been successfully inscribed into the eternal ledger. Welcome to the order.
            </p>
            
            <div className="divine-id-display-area">
              <span className="divine-id-label">Your Unique Sanctum ID</span>
              <span className="divine-id-value">{successData.userId}</span>
            </div>

            <div className="security-warning-box">
              <IconShield />
              <span>CRITICAL: Save this ID immediately. It is your only key for future entry into the temple.</span>
            </div>

            <button className="btn-acknowledge-ritual" onClick={handleComplete}>
              Acknowledge & Enter Dashboard
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
}