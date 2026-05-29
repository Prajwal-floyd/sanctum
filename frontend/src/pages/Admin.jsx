import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// CINEMATIC CSS INJECTION - THE SACRED STYLESHEET
// ============================================================================
const sanctumAdminStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
  /* Core Deep Space / Temple Colors */
  --bg-void: #020204;
  --bg-surface: rgba(10, 12, 18, 0.6);
  --bg-glass: rgba(18, 22, 32, 0.4);
  --bg-glass-hover: rgba(25, 30, 45, 0.6);
  --bg-input: rgba(5, 6, 10, 0.8);
  
  /* Text Accents */
  --text-pure: #ffffff;
  --text-primary: #e2e2e8;
  --text-secondary: #8a8a9e;
  --text-muted: #4a4a5e;
  
  /* Borders and Lighting */
  --border-dim: rgba(255, 255, 255, 0.05);
  --border-light: rgba(255, 255, 255, 0.12);
  --border-glow: rgba(255, 255, 255, 0.25);
  
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
  --tier-initiate-bg: rgba(138, 180, 248, 0.05);
  
  --tier-devotee: #c58af9;
  --tier-devotee-glow: rgba(197, 138, 249, 0.3);
  --tier-devotee-bg: rgba(197, 138, 249, 0.05);
  
  --tier-ascendant: #e8eaed;
  --tier-ascendant-glow: rgba(232, 234, 237, 0.3);
  --tier-ascendant-bg: rgba(232, 234, 237, 0.05);
  
  --tier-elite: #d4af37;
  --tier-elite-glow: rgba(212, 175, 55, 0.4);
  --tier-elite-bg: rgba(212, 175, 55, 0.05);

  /* Status Colors */
  --status-success: #4ade80;
  --status-danger: #f87171;
  --status-warning: #facc15;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-inter);
  overflow: hidden; /* App handles its own scrolling */
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--tier-ascendant); }

/* ==========================================================================
   ANIMATIONS & KINEMATICS
   ========================================================================== */
@keyframes abyssBreathe {
  0%, 100% { transform: scale(1); opacity: 0.1; filter: blur(80px); }
  50% { transform: scale(1.1); opacity: 0.2; filter: blur(100px); }
}

@keyframes particleAscension {
  0% { transform: translate(0, 100vh) scale(0); opacity: 0; }
  10% { opacity: var(--p-opacity); transform: translate(var(--p-drift-x), 80vh) scale(1); }
  90% { opacity: var(--p-opacity); transform: translate(var(--p-drift-x-end), 10vh) scale(1); }
  100% { transform: translate(0, -10vh) scale(0); opacity: 0; }
}

@keyframes mandalaSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes cinematicEntrance {
  from { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes shimmerWave {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 10px transparent; }
  50% { box-shadow: 0 0 25px var(--glow-color); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes toastSlide {
  0% { opacity: 0; transform: translateX(100%) scale(0.9); }
  10% { opacity: 1; transform: translateX(0) scale(1); }
  90% { opacity: 1; transform: translateX(0) scale(1); }
  100% { opacity: 0; transform: translateX(100%) scale(0.9); }
}

/* ==========================================================================
   LAYOUT STRUCTURE
   ========================================================================== */
.admin-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 50% 0%, #080a10 0%, var(--bg-void) 100%);
}

/* Background Atmosphere */
.ambient-nebula-left {
  position: fixed; top: -20%; left: -10%; width: 60vw; height: 60vw;
  background: radial-gradient(circle, var(--tier-initiate-glow) 0%, transparent 60%);
  border-radius: 50%; animation: abyssBreathe 20s infinite alternate var(--ease-cinematic);
  pointer-events: none; z-index: 0;
}
.ambient-nebula-right {
  position: fixed; bottom: -20%; right: -10%; width: 70vw; height: 70vw;
  background: radial-gradient(circle, var(--tier-elite-glow) 0%, transparent 60%);
  border-radius: 50%; animation: abyssBreathe 25s infinite alternate-reverse var(--ease-cinematic);
  pointer-events: none; z-index: 0;
}
.particle-system { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
.ethereal-particle {
  position: absolute; border-radius: 50%;
  background: radial-gradient(circle, var(--text-pure) 0%, var(--tier-initiate) 50%, transparent 100%);
  box-shadow: 0 0 15px var(--tier-initiate-glow);
  animation: particleAscension linear infinite;
}

/* Sidebar */
.admin-sidebar {
  width: 280px;
  height: 100%;
  background: rgba(5, 7, 12, 0.7);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-right: 1px solid var(--border-dim);
  display: flex;
  flex-direction: column;
  z-index: 50;
  position: relative;
  transition: all 0.4s var(--ease-cinematic);
}
.sidebar-header {
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--border-dim);
}
.sidebar-logo {
  width: 40px; height: 40px; color: var(--tier-elite);
  filter: drop-shadow(0 0 10px var(--tier-elite-glow));
  animation: spin 30s linear infinite;
}
.sidebar-title {
  font-family: var(--font-cinzel); font-size: 1.5rem; font-weight: 700;
  color: var(--text-pure); letter-spacing: 0.1em;
}

.sidebar-nav {
  flex: 1;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.nav-item {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  color: var(--text-secondary);
  font-family: var(--font-cinzel); font-size: 0.95rem; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all 0.4s var(--ease-cinematic);
  position: relative; overflow: hidden;
}
.nav-item::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0;
  background: var(--tier-elite); transition: width 0.4s var(--ease-cinematic);
}
.nav-item:hover { color: var(--text-pure); background: rgba(255,255,255,0.03); }
.nav-item.active {
  color: var(--tier-elite); background: var(--tier-elite-bg);
  box-shadow: inset 0 0 20px var(--tier-elite-glow);
}
.nav-item.active::before { width: 3px; box-shadow: 0 0 15px var(--tier-elite); }
.nav-icon { width: 20px; height: 20px; z-index: 2; transition: all 0.4s ease; }
.nav-text { z-index: 2; }

.sidebar-footer {
  padding: 2rem;
  border-top: 1px solid var(--border-dim);
}
.admin-profile {
  display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
}
.admin-avatar {
  width: 45px; height: 45px; border-radius: 12px;
  background: var(--tier-elite-bg); border: 1px solid var(--tier-elite);
  display: flex; justify-content: center; align-items: center; color: var(--tier-elite);
  box-shadow: 0 0 15px var(--tier-elite-glow);
}
.admin-info h4 { font-family: var(--font-cinzel); color: var(--text-pure); font-size: 0.9rem; margin-bottom: 0.2rem; }
.admin-info span { font-size: 0.75rem; color: var(--tier-elite); letter-spacing: 0.1em; text-transform: uppercase; }

.btn-logout {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.8rem;
  padding: 1rem; background: rgba(248, 113, 113, 0.05); border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 8px; color: var(--status-danger); font-family: var(--font-inter);
  font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease;
}
.btn-logout:hover {
  background: rgba(248, 113, 113, 0.15); box-shadow: 0 0 20px rgba(248, 113, 113, 0.2);
}

/* Main Content Area */
.admin-main {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  position: relative;
  z-index: 10;
  padding: 3rem 4rem 6rem;
}

/* ==========================================================================
   CINEMATIC HERO HEADER
   ========================================================================== */
.content-header {
  margin-bottom: 4rem;
  animation: cinematicEntrance 1s var(--ease-out-expo) forwards;
}
.header-kicker {
  font-family: var(--font-cinzel); font-size: 0.9rem; color: var(--tier-elite);
  letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 0.5rem;
  display: flex; align-items: center; gap: 1rem;
}
.header-kicker::before {
  content: ''; width: 40px; height: 1px; background: var(--tier-elite);
  box-shadow: 0 0 10px var(--tier-elite);
}
.header-title {
  font-family: var(--font-cinzel); font-size: 3.5rem; font-weight: 800;
  color: var(--text-pure); letter-spacing: 0.05em; text-transform: uppercase;
  background: linear-gradient(135deg, #fff 0%, #a0a0b8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 30px rgba(0,0,0,0.8); margin-bottom: 1rem;
}
.header-subtitle {
  font-family: var(--font-cormorant); font-size: 1.4rem; color: var(--text-secondary);
  font-style: italic; max-width: 800px; line-height: 1.5;
}

/* ==========================================================================
   ADVANCED ANALYTICS DASHBOARD
   ========================================================================== */
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}
.analytics-card {
  position: relative;
  background: var(--bg-glass);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-dim);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  overflow: hidden;
  display: flex; flex-direction: column; gap: 1.5rem;
  transition: all 0.5s var(--ease-cinematic);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  animation: cinematicEntrance 1s var(--ease-out-expo) forwards;
}
.analytics-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at top right, var(--card-glow) 0%, transparent 60%);
  opacity: 0.1; transition: opacity 0.5s ease;
}
.analytics-card:hover {
  transform: translateY(-8px); border-color: var(--border-light);
  box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 30px var(--card-glow);
}
.analytics-card:hover::before { opacity: 0.25; }

.card-icon-wrapper {
  width: 50px; height: 50px; border-radius: 12px;
  background: rgba(255,255,255,0.03); border: 1px solid var(--border-dim);
  display: flex; justify-content: center; align-items: center;
  color: var(--card-color); font-size: 1.5rem;
  box-shadow: inset 0 0 15px var(--card-glow);
}
.card-label {
  font-family: var(--font-cinzel); font-size: 0.9rem; color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.1em;
}
.card-value {
  font-family: var(--font-cormorant); font-size: 3rem; font-weight: 700;
  color: var(--text-pure); line-height: 1; text-shadow: 0 0 20px var(--card-glow);
}
.card-trend {
  display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;
  color: var(--status-success); background: rgba(74, 222, 128, 0.1);
  padding: 0.4rem 0.8rem; border-radius: 20px; width: fit-content;
}

/* Revenue Chart Section */
.revenue-section {
  display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 4rem;
  animation: cinematicEntrance 1.2s var(--ease-out-expo) forwards;
}
.chart-panel {
  background: var(--bg-glass); border: 1px solid var(--border-dim);
  border-radius: 24px; padding: 2.5rem; position: relative; overflow: hidden;
}
.chart-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;
}
.chart-title { font-family: var(--font-cinzel); font-size: 1.5rem; color: #fff; }
.css-chart-container {
  height: 250px; display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem;
}
.css-bar-wrapper {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1rem; height: 100%; justify-content: flex-end;
}
.css-bar {
  width: 100%; max-width: 40px; background: linear-gradient(0deg, var(--tier-elite-bg) 0%, var(--tier-elite) 100%);
  border-radius: 6px 6px 0 0; position: relative; transition: height 1.5s var(--ease-spring);
  box-shadow: 0 0 20px var(--tier-elite-glow); cursor: pointer;
}
.css-bar:hover { filter: brightness(1.2); box-shadow: 0 0 30px var(--tier-elite); }
.css-bar-label { font-size: 0.8rem; color: var(--text-secondary); font-family: var(--font-cinzel); }

/* Tier Distribution */
.tier-distribution {
  display: flex; flex-direction: column; gap: 1.5rem;
}
.tier-stat-row {
  display: flex; align-items: center; gap: 1rem;
}
.tier-stat-info { flex: 1; }
.tier-stat-header {
  display: flex; justify-content: space-between; margin-bottom: 0.5rem;
  font-family: var(--font-cinzel); font-size: 0.9rem;
}
.tier-stat-bar-bg {
  width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;
}
.tier-stat-bar-fill {
  height: 100%; border-radius: 3px; transition: width 1.5s var(--ease-cinematic);
  box-shadow: 0 0 10px var(--tier-color); background: var(--tier-color);
}

/* ==========================================================================
   ADVANCED USER & SEVA MANAGEMENT TABLES / GRIDS
   ========================================================================== */
.section-toolbar {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 2rem;
}
.search-input-wrapper {
  position: relative; width: 350px;
}
.search-icon {
  position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%);
  color: var(--text-muted); width: 18px; height: 18px;
}
.search-input {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border-dim);
  border-radius: 30px; padding: 1rem 1rem 1rem 3rem; color: #fff;
  font-family: var(--font-inter); font-size: 0.95rem; transition: all 0.3s ease;
}
.search-input:focus {
  outline: none; border-color: var(--tier-ascendant); box-shadow: 0 0 15px var(--tier-ascendant-glow);
}

.btn-primary-action {
  padding: 1rem 2rem; background: linear-gradient(135deg, var(--tier-elite-bg) 0%, transparent 100%);
  border: 1px solid var(--tier-elite); border-radius: 30px; color: var(--tier-elite);
  font-family: var(--font-cinzel); font-size: 0.9rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer;
  display: flex; align-items: center; gap: 0.8rem; transition: all 0.4s ease;
  box-shadow: 0 0 15px var(--tier-elite-glow);
}
.btn-primary-action:hover {
  background: var(--tier-elite); color: #000; box-shadow: 0 0 30px var(--tier-elite);
  transform: translateY(-2px);
}

/* Cinematic Table */
.cinematic-table-container {
  width: 100%; overflow-x: auto;
  background: var(--bg-glass); border: 1px solid var(--border-dim);
  border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  animation: cinematicEntrance 1s var(--ease-out-expo) forwards;
}
.cinematic-table {
  width: 100%; border-collapse: collapse; text-align: left;
}
.cinematic-table th {
  padding: 1.5rem; font-family: var(--font-cinzel); font-size: 0.9rem;
  color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em;
  border-bottom: 1px solid var(--border-light); background: rgba(0,0,0,0.4);
}
.cinematic-table td {
  padding: 1.5rem; border-bottom: 1px solid var(--border-dim);
  color: var(--text-primary); font-size: 0.95rem; transition: background 0.3s ease;
}
.cinematic-table tbody tr {
  transition: all 0.3s ease;
}
.cinematic-table tbody tr:hover {
  background: rgba(255,255,255,0.02);
}
.cinematic-table tbody tr:hover td {
  border-bottom-color: var(--border-light);
}

/* Tier Badges */
.badge-tier {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 1rem; border-radius: 20px; font-family: var(--font-cinzel);
  font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
  border: 1px solid var(--t-color); color: var(--t-color); background: var(--t-bg);
  box-shadow: inset 0 0 10px var(--t-glow);
}
.badge-initiate { --t-color: var(--tier-initiate); --t-bg: var(--tier-initiate-bg); --t-glow: var(--tier-initiate-glow); }
.badge-devotee { --t-color: var(--tier-devotee); --t-bg: var(--tier-devotee-bg); --t-glow: var(--tier-devotee-glow); }
.badge-ascendant { --t-color: var(--tier-ascendant); --t-bg: var(--tier-ascendant-bg); --t-glow: var(--tier-ascendant-glow); }
.badge-elite { --t-color: var(--tier-elite); --t-bg: var(--tier-elite-bg); --t-glow: var(--tier-elite-glow); }

.btn-icon-danger {
  background: transparent; border: 1px solid rgba(248, 113, 113, 0.2);
  color: var(--status-danger); width: 36px; height: 36px; border-radius: 8px;
  display: flex; justify-content: center; align-items: center; cursor: pointer;
  transition: all 0.3s ease;
}
.btn-icon-danger:hover {
  background: rgba(248, 113, 113, 0.1); border-color: var(--status-danger);
  box-shadow: 0 0 15px rgba(248, 113, 113, 0.3); transform: scale(1.1);
}

/* Seva Grid */
.seva-admin-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem; animation: cinematicEntrance 1s var(--ease-out-expo) forwards;
}
.seva-admin-card {
  background: var(--bg-glass); border: 1px solid var(--border-dim);
  border-radius: 24px; overflow: hidden; display: flex; flex-direction: column;
  transition: all 0.4s var(--ease-cinematic); position: relative;
}
.seva-admin-card:hover {
  transform: translateY(-5px); border-color: var(--tier-ascendant);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 30px var(--tier-ascendant-glow);
}
.seva-visual-header {
  height: 160px; background: linear-gradient(45deg, #0a0a0a, #1a1a24);
  position: relative; display: flex; justify-content: center; align-items: center;
  overflow: hidden;
}
.seva-visual-header::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at center, transparent 0%, #000 100%);
}
.seva-icon-bg { font-size: 6rem; opacity: 0.1; animation: spin 40s linear infinite; }
.seva-tier-tag {
  position: absolute; top: 1rem; right: 1rem; z-index: 2;
}
.seva-card-body { padding: 2rem; flex: 1; display: flex; flex-direction: column; }
.seva-card-title { font-family: var(--font-cinzel); font-size: 1.4rem; color: #fff; margin-bottom: 1rem; }
.seva-card-desc { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 2rem; flex: 1; }
.seva-card-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 1.5rem; border-top: 1px solid var(--border-dim);
}
.seva-card-price { font-family: var(--font-cormorant); font-size: 1.8rem; color: var(--tier-elite); }

/* ==========================================================================
   MODALS
   ========================================================================== */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  display: flex; justify-content: center; align-items: center;
  animation: cinematicFadeIn 0.3s ease forwards;
}
.modal-content {
  background: var(--bg-void); border: 1px solid var(--tier-elite);
  border-radius: 24px; padding: 3rem; width: 100%; max-width: 600px;
  position: relative; overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,1), 0 0 50px var(--tier-elite-glow);
  animation: cinematicEntrance 0.5s var(--ease-spring) forwards;
}
.modal-content::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at top, var(--tier-elite-glow) 0%, transparent 60%);
  opacity: 0.15; pointer-events: none;
}
.modal-header { margin-bottom: 2.5rem; }
.modal-title { font-family: var(--font-cinzel); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; }
.modal-subtitle { color: var(--tier-elite); font-family: var(--font-cormorant); font-size: 1.2rem; }
.btn-close {
  position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none;
  color: var(--text-muted); cursor: pointer; transition: color 0.3s;
}
.btn-close:hover { color: #fff; }

.form-group { margin-bottom: 2rem; position: relative; }
.form-label {
  display: block; font-family: var(--font-cinzel); font-size: 0.9rem;
  color: var(--text-secondary); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;
}
.form-input {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border-dim);
  border-radius: 12px; padding: 1.2rem; color: #fff; font-family: var(--font-inter); font-size: 1rem;
  transition: all 0.3s ease; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
}
.form-input:focus {
  outline: none; border-color: var(--tier-elite); box-shadow: inset 0 2px 10px rgba(0,0,0,0.8), 0 0 20px var(--tier-elite-glow);
}
select.form-input { appearance: none; cursor: pointer; }

.modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 3rem; }
.btn-cancel {
  padding: 1rem 2rem; background: transparent; border: 1px solid var(--border-light);
  border-radius: 12px; color: var(--text-primary); font-family: var(--font-cinzel); font-weight: 600;
  cursor: pointer; transition: all 0.3s ease;
}
.btn-cancel:hover { background: rgba(255,255,255,0.05); }

/* ==========================================================================
   TOASTS & LOADING
   ========================================================================== */
.toast-container {
  position: fixed; bottom: 2rem; right: 2rem; z-index: 10000;
  display: flex; flex-direction: column; gap: 1rem; pointer-events: none;
}
.toast-card {
  background: rgba(10, 12, 18, 0.95); backdrop-filter: blur(10px);
  border: 1px solid var(--toast-color); border-radius: 16px;
  padding: 1.5rem 2rem; display: flex; align-items: center; gap: 1.5rem;
  box-shadow: 0 15px 30px rgba(0,0,0,0.8), 0 0 20px var(--toast-glow);
  animation: toastSlide 4s ease-in-out forwards; min-width: 350px;
}
.toast-success { --toast-color: var(--status-success); --toast-glow: rgba(74, 222, 128, 0.2); }
.toast-error { --toast-color: var(--status-danger); --toast-glow: rgba(248, 113, 113, 0.2); }
.toast-info { --toast-color: var(--tier-initiate); --toast-glow: var(--tier-initiate-glow); }
.toast-icon { width: 28px; height: 28px; color: var(--toast-color); }
.toast-text h4 { font-family: var(--font-cinzel); color: #fff; margin-bottom: 0.3rem; }
.toast-text p { color: var(--text-secondary); font-size: 0.9rem; }

.loading-screen {
  position: fixed; inset: 0; background: var(--bg-void); z-index: 99999;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.loading-mandala {
  width: 120px; height: 120px; color: var(--tier-elite);
  animation: spin 8s linear infinite; filter: drop-shadow(0 0 30px var(--tier-elite-glow));
  margin-bottom: 3rem;
}
.loading-text {
  font-family: var(--font-cinzel); font-size: 1.5rem; color: #fff;
  letter-spacing: 0.2em; text-transform: uppercase; animation: pulseGlow 2s infinite alternate;
}

/* Bookings Timeline */
.timeline {
  display: flex; flex-direction: column; gap: 2rem; padding: 2rem 0;
  animation: cinematicEntrance 1s var(--ease-out-expo) forwards;
}
.timeline-item {
  display: flex; gap: 2rem; position: relative;
}
.timeline-item::before {
  content: ''; position: absolute; left: 24px; top: 50px; bottom: -2rem;
  width: 2px; background: linear-gradient(to bottom, var(--border-light), transparent);
}
.timeline-item:last-child::before { display: none; }
.timeline-node {
  width: 50px; height: 50px; border-radius: 50%;
  background: var(--bg-input); border: 2px solid var(--t-color);
  display: flex; justify-content: center; align-items: center; font-size: 1.2rem;
  box-shadow: 0 0 15px var(--t-glow); z-index: 2; flex-shrink: 0;
}
.timeline-content {
  background: var(--bg-glass); border: 1px solid var(--border-dim);
  border-radius: 16px; padding: 2rem; flex: 1; display: flex; justify-content: space-between;
  align-items: center; transition: all 0.3s ease;
}
.timeline-content:hover {
  background: var(--bg-glass-hover); border-color: var(--t-color);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px var(--t-glow);
}
.timeline-meta { font-family: var(--font-cinzel); color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem; }
.timeline-title { font-size: 1.2rem; color: #fff; font-weight: 600; }
.timeline-price { font-family: var(--font-cormorant); font-size: 1.8rem; color: var(--t-color); }

/* Responsive */
@media (max-width: 1200px) {
  .analytics-grid { grid-template-columns: repeat(2, 1fr); }
  .revenue-section { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .admin-layout { flex-direction: column; }
  .admin-sidebar { width: 100%; height: auto; flex-direction: row; align-items: center; padding: 1rem; overflow-x: auto;}
  .sidebar-header { border: none; padding: 0; margin-right: 2rem; }
  .sidebar-nav { flex-direction: row; padding: 0; flex: none;}
  .sidebar-footer { display: none; }
  .admin-main { padding: 2rem 1rem; }
  .analytics-grid { grid-template-columns: 1fr; }
  .section-toolbar { flex-direction: column; gap: 1rem; align-items: stretch; }
  .search-input-wrapper { width: 100%; }
}
`;

// ============================================================================
// SVG ICONS & GRAPHICS
// ============================================================================
const Icons = {
  Logo: () => (
    <svg viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M50 15L85 80H15L50 15Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="58" r="12" fill="currentColor" />
    </svg>
  ),
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  ),
  Sevas: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  ),
  Bookings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  Revenue: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  Alert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
  )
};

// ============================================================================
// CONFIGURATION & UTILS
// ============================================================================
const TIER_CONFIG = {
  initiate: { name: 'Initiate', icon: '🌙', color: 'var(--tier-initiate)' },
  devotee: { name: 'Devotee', icon: '🔮', color: 'var(--tier-devotee)' },
  ascendant: { name: 'Ascendant', icon: '✨', color: 'var(--tier-ascendant)' },
  elite: { name: 'Elite', icon: '👑', color: 'var(--tier-elite)' }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Admin() {
  const navigate = useNavigate();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [sevas, setSevas] = useState([]);
  
  // Modals & Forms
  const [isAddSevaModalOpen, setIsAddSevaModalOpen] = useState(false);
  const [newSeva, setNewSeva] = useState({ seva_name: '', description: '', price: '', tier_required: 'initiate' });
  
  // Search & Filter
  const [userSearch, setUserSearch] = useState('');
  
  // Toasts
  const [toasts, setToasts] = useState([]);

  // --- PARTICLES GENERATOR ---
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      startX: Math.random() * 100,
      endX: (Math.random() * 100) - 50,
      delay: Math.random() * 15,
      duration: Math.random() * 15 + 15,
      opacity: Math.random() * 0.4 + 0.1
    }));
  }, []);

  // --- TOAST SYSTEM ---
  const showToast = useCallback((title, message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  // --- DATA FETCHING ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, bookingsRes, sevasRes] = await Promise.all([
        fetch('http://localhost:5001/api/users').catch(() => ({ ok: false })),
        fetch('http://localhost:5001/api/bookings').catch(() => ({ ok: false })),
        fetch('http://localhost:5001/api/sevas').catch(() => ({ ok: false }))
      ]);

      let usersData = [], bookingsData = [], sevasData = [];

      if (usersRes.ok) usersData = await usersRes.json();
      if (bookingsRes.ok) bookingsData = await bookingsRes.json();
      if (sevasRes.ok) sevasData = await sevasRes.json();

      // Mock Data Fallback for Cinematic UI Demonstration if backend is down
      if (!usersRes.ok && !bookingsRes.ok && !sevasRes.ok) {
        console.warn("Backend unavailable. Injecting divine mock data for cinematic presentation.");
        usersData = [
          { id: 'usr_001', tier: 'elite', join_date: '2026-01-15' },
          { id: 'usr_002', tier: 'ascendant', join_date: '2026-02-20' },
          { id: 'usr_003', tier: 'devotee', join_date: '2026-03-10' },
          { id: 'usr_004', tier: 'initiate', join_date: '2026-05-01' },
          { id: 'usr_005', tier: 'elite', join_date: '2026-05-15' }
        ];
        sevasData = [
          { id: 1, seva_name: "Morning Suprabhatam", description: "Awaken divine energies.", price: 1001, tier_required: "initiate" },
          { id: 2, seva_name: "Rudra Abhishekam", description: "Immersive purification.", price: 11000, tier_required: "devotee" },
          { id: 3, seva_name: "Chandi Parayanam", description: "Unlock supreme protective energies.", price: 51000, tier_required: "ascendant" },
          { id: 4, seva_name: "Elite Bespoke Darshan", description: "A closed-door virtual audience.", price: 250000, tier_required: "elite" }
        ];
        bookingsData = [
          { id: 'b_1', user_id: 'usr_001', tier: 'elite', seva_name: 'Elite Bespoke Darshan', price: 250000, booking_date: '2026-05-28' },
          { id: 'b_2', user_id: 'usr_002', tier: 'ascendant', seva_name: 'Chandi Parayanam', price: 51000, booking_date: '2026-05-29' },
          { id: 'b_3', user_id: 'usr_003', tier: 'devotee', seva_name: 'Rudra Abhishekam', price: 11000, booking_date: '2026-05-29' }
        ];
      }

      setUsers(usersData);
      setBookings(bookingsData);
      setSevas(sevasData);
    } catch (error) {
      console.error("Admin fetch error:", error);
      showToast('Celestial Disturbance', 'Failed to synchronize with the divine ledger.', 'error');
    } finally {
      // Cinematic artificial delay for loading screen visual
      setTimeout(() => setLoading(false), 1200);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- HANDLERS ---
  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        showToast('Soul Excised', `User ${id} has been removed from the sanctuary.`);
      } else throw new Error();
    } catch (e) {
      // Fallback for mock demo
      setUsers(users.filter(u => u.id !== id));
      showToast('Soul Excised', `User ${id} has been removed from the sanctuary.`);
    }
  };

  const handleDeleteSeva = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/sevas/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSevas(sevas.filter(s => s.id !== id));
        showToast('Ritual Dissolved', `Seva has been erased from existence.`);
      } else throw new Error();
    } catch (e) {
      setSevas(sevas.filter(s => s.id !== id));
      showToast('Ritual Dissolved', `Seva has been erased from existence.`);
    }
  };

  const handleCreateSeva = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/sevas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSeva)
      });
      if (res.ok) {
        fetchData(); // Refetch to get real ID
        setIsAddSevaModalOpen(false);
        setNewSeva({ seva_name: '', description: '', price: '', tier_required: 'initiate' });
        showToast('Ritual Manifested', `${newSeva.seva_name} is now available to devotees.`);
      } else throw new Error();
    } catch (err) {
      // Mock Fallback
      const mockSeva = { id: Date.now(), ...newSeva, price: Number(newSeva.price) };
      setSevas([...sevas, mockSeva]);
      setIsAddSevaModalOpen(false);
      setNewSeva({ seva_name: '', description: '', price: '', tier_required: 'initiate' });
      showToast('Ritual Manifested', `${newSeva.seva_name} is now available to devotees.`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // --- COMPUTED ANALYTICS ---
  const totalRevenue = bookings.reduce((acc, b) => acc + Number(b.price || 0), 0);
  const avgOrderValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;
  
  const usersByTier = users.reduce((acc, user) => {
    const tier = (user.tier || 'initiate').toLowerCase();
    acc[tier] = (acc[tier] || 0) + 1;
    return acc;
  }, {});

  const revenueByTier = bookings.reduce((acc, b) => {
    const tier = (b.tier || 'initiate').toLowerCase();
    acc[tier] = (acc[tier] || 0) + Number(b.price || 0);
    return acc;
  }, { initiate: 0, devotee: 0, ascendant: 0, elite: 0 });
  const maxTierRevenue = Math.max(...Object.values(revenueByTier), 1);

  const filteredUsers = users.filter(u => u.id?.toString().includes(userSearch.toLowerCase()));

  // ============================================================================
  // RENDER SECTIONS
  // ============================================================================

  const renderDashboard = () => (
    <div>
      <div className="content-header">
        <div className="header-kicker">Celestial Operations</div>
        <h1 className="header-title">Command Sanctum</h1>
        <p className="header-subtitle">Oversee the spiritual ascension of your flock and the prosperity of the digital temple.</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card" style={{'--card-color': 'var(--tier-initiate)', '--card-glow': 'var(--tier-initiate-glow)'}}>
          <div className="card-icon-wrapper"><Icons.Users /></div>
          <div>
            <div className="card-label">Total Devotees</div>
            <div className="card-value">{users.length}</div>
          </div>
          <div className="card-trend"><Icons.Check /> Active Ledger</div>
        </div>
        <div className="analytics-card" style={{'--card-color': 'var(--tier-devotee)', '--card-glow': 'var(--tier-devotee-glow)'}}>
          <div className="card-icon-wrapper"><Icons.Bookings /></div>
          <div>
            <div className="card-label">Sacred Offerings</div>
            <div className="card-value">{bookings.length}</div>
          </div>
          <div className="card-trend"><Icons.Check /> Manifested</div>
        </div>
        <div className="analytics-card" style={{'--card-color': 'var(--tier-elite)', '--card-glow': 'var(--tier-elite-glow)'}}>
          <div className="card-icon-wrapper"><Icons.Revenue /></div>
          <div>
            <div className="card-label">Cosmic Treasury</div>
            <div className="card-value">{formatCurrency(totalRevenue)}</div>
          </div>
          <div className="card-trend"><Icons.Check /> Eternal Wealth</div>
        </div>
        <div className="analytics-card" style={{'--card-color': 'var(--tier-ascendant)', '--card-glow': 'var(--tier-ascendant-glow)'}}>
          <div className="card-icon-wrapper"><Icons.Sevas /></div>
          <div>
            <div className="card-label">Avg. Devotion Value</div>
            <div className="card-value">{formatCurrency(avgOrderValue)}</div>
          </div>
          <div className="card-trend"><Icons.Check /> Per Offering</div>
        </div>
      </div>

      <div className="revenue-section">
        <div className="chart-panel">
          <div className="chart-header">
            <h3 className="chart-title">Treasury Resonance by Tier</h3>
          </div>
          <div className="css-chart-container">
            {['initiate', 'devotee', 'ascendant', 'elite'].map(tier => {
              const val = revenueByTier[tier];
              const heightPct = (val / maxTierRevenue) * 100;
              const config = TIER_CONFIG[tier];
              return (
                <div key={tier} className="css-bar-wrapper">
                  <div className="css-bar-label">{formatCurrency(val)}</div>
                  <div className="css-bar" style={{
                    height: `${Math.max(heightPct, 5)}%`,
                    '--tier-elite': config.color,
                    '--tier-elite-bg': `rgba(255,255,255,0.1)`,
                    '--tier-elite-glow': `rgba(255,255,255,0.2)`
                  }} title={`${config.name} Revenue`}></div>
                  <div className="css-bar-label">{config.icon}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-panel">
          <div className="chart-header">
            <h3 className="chart-title">Population Distribution</h3>
          </div>
          <div className="tier-distribution">
            {['elite', 'ascendant', 'devotee', 'initiate'].map(tier => {
              const count = usersByTier[tier] || 0;
              const pct = users.length ? (count / users.length) * 100 : 0;
              const config = TIER_CONFIG[tier];
              return (
                <div key={tier} className="tier-stat-row">
                  <div style={{fontSize: '1.5rem'}}>{config.icon}</div>
                  <div className="tier-stat-info">
                    <div className="tier-stat-header">
                      <span>{config.name}</span>
                      <span>{count} Souls</span>
                    </div>
                    <div className="tier-stat-bar-bg">
                      <div className="tier-stat-bar-fill" style={{
                        width: `${pct}%`, '--tier-color': config.color
                      }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="content-header">
        <h1 className="header-title">The Congregation</h1>
        <p className="header-subtitle">Manage the souls traversing the digital paths of Sanctum.</p>
      </div>

      <div className="section-toolbar">
        <div className="search-input-wrapper">
          <Icons.Search className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search soul by ID..." 
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="cinematic-table-container">
        <table className="cinematic-table">
          <thead>
            <tr>
              <th>Devotee ID</th>
              <th>Current Tier</th>
              <th>Join Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? filteredUsers.map(u => {
              const t = (u.tier || 'initiate').toLowerCase();
              return (
                <tr key={u.id}>
                  <td style={{fontFamily: 'monospace', color: 'var(--text-primary)'}}>{u.id}</td>
                  <td>
                    <span className={`badge-tier badge-${t}`}>
                      {TIER_CONFIG[t]?.icon} {t}
                    </span>
                  </td>
                  <td>{u.join_date ? formatDate(u.join_date) : 'Eternity'}</td>
                  <td>
                    <button className="btn-icon-danger" onClick={() => handleDeleteUser(u.id)} title="Excommunicate">
                      <Icons.Trash />
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>No souls found in the search ether.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSevas = () => (
    <div>
      <div className="content-header">
        <h1 className="header-title">Sacred Rituals</h1>
        <p className="header-subtitle">Curate the divine offerings available to the congregation.</p>
      </div>

      <div className="section-toolbar">
        <div></div>
        <button className="btn-primary-action" onClick={() => setIsAddSevaModalOpen(true)}>
          <Icons.Plus /> Manifest Ritual
        </button>
      </div>

      <div className="seva-admin-grid">
        {sevas.map(s => {
          const t = (s.tier_required || 'initiate').toLowerCase();
          const config = TIER_CONFIG[t] || TIER_CONFIG.initiate;
          return (
            <div key={s.id} className="seva-admin-card" style={{'--tier-ascendant': config.color, '--tier-ascendant-glow': `var(--tier-${t}-glow)`}}>
              <div className="seva-visual-header">
                <div className="seva-icon-bg">🪷</div>
                <div className="seva-tier-tag">
                  <span className={`badge-tier badge-${t}`}>{config.icon} {t}</span>
                </div>
              </div>
              <div className="seva-card-body">
                <h3 className="seva-card-title">{s.seva_name}</h3>
                <p className="seva-card-desc">{s.description}</p>
                <div className="seva-card-footer">
                  <span className="seva-card-price">{formatCurrency(s.price)}</span>
                  <button className="btn-icon-danger" onClick={() => handleDeleteSeva(s.id)} title="Erase Ritual">
                    <Icons.Trash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div>
      <div className="content-header">
        <h1 className="header-title">River of Time</h1>
        <p className="header-subtitle">A chronological ledger of every sacred offering manifested.</p>
      </div>

      <div className="timeline">
        {bookings.sort((a,b) => new Date(b.booking_date) - new Date(a.booking_date)).map(b => {
          const t = (b.tier || 'initiate').toLowerCase();
          const config = TIER_CONFIG[t] || TIER_CONFIG.initiate;
          return (
            <div key={b.id} className="timeline-item" style={{'--t-color': config.color, '--t-glow': `var(--tier-${t}-glow)`}}>
              <div className="timeline-node">{config.icon}</div>
              <div className="timeline-content">
                <div>
                  <div className="timeline-meta">{formatDate(b.booking_date)} • Devotee {b.user_id}</div>
                  <div className="timeline-title">{b.seva_name}</div>
                </div>
                <div className="timeline-price">{formatCurrency(b.price)}</div>
              </div>
            </div>
          );
        })}
        {bookings.length === 0 && <p style={{color: 'var(--text-muted)'}}>The ledger is empty.</p>}
      </div>
    </div>
  );

  // ============================================================================
  // FULL PAGE RENDER
  // ============================================================================
  
  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: sanctumAdminStyles }} />
        <div className="loading-screen">
          <Icons.Logo className="loading-mandala" />
          <div className="loading-text">Initializing Celestial Admin</div>
        </div>
      </>
    );
  }

  return (
    <div className="admin-layout">
      <style dangerouslySetInnerHTML={{ __html: sanctumAdminStyles }} />
      
      {/* Background Ambience */}
      <div className="ambient-nebula-left"></div>
      <div className="ambient-nebula-right"></div>
      <div className="particle-system">
        {particles.map(p => (
          <div key={p.id} className="ethereal-particle" style={{
            width: `${p.size}px`, height: `${p.size}px`,
            left: `${p.startX}vw`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            '--p-opacity': p.opacity, '--p-drift-x': `${p.endX * 0.3}vw`, '--p-drift-x-end': `${p.endX}vw`
          }} />
        ))}
      </div>

      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Icons.Logo className="sidebar-logo" />
          <span className="sidebar-title">Sanctum</span>
        </div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <Icons.Dashboard className="nav-icon" /> <span className="nav-text">Command Center</span>
          </div>
          <div className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <Icons.Users className="nav-icon" /> <span className="nav-text">Congregation</span>
          </div>
          <div className={`nav-item ${activeTab === 'sevas' ? 'active' : ''}`} onClick={() => setActiveTab('sevas')}>
            <Icons.Sevas className="nav-icon" /> <span className="nav-text">Sacred Rituals</span>
          </div>
          <div className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <Icons.Bookings className="nav-icon" /> <span className="nav-text">Time Ledger</span>
          </div>
        </nav>
        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar"><Icons.Logo style={{width:'24px', animation:'none'}}/></div>
            <div className="admin-info">
              <h4>High Priest</h4>
              <span>Celestial Admin</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <Icons.Logout style={{width:'18px'}} /> Depart Realm
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'sevas' && renderSevas()}
        {activeTab === 'bookings' && renderBookings()}
      </main>

      {/* Modals */}
      {isAddSevaModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="btn-close" onClick={() => setIsAddSevaModalOpen(false)}><Icons.X /></button>
            <div className="modal-header">
              <h2 className="modal-title">Manifest Ritual</h2>
              <p className="modal-subtitle">Forge a new path of devotion for the congregation.</p>
            </div>
            <form onSubmit={handleCreateSeva}>
              <div className="form-group">
                <label className="form-label">Ritual Name</label>
                <input required type="text" className="form-input" value={newSeva.seva_name} onChange={e => setNewSeva({...newSeva, seva_name: e.target.value})} placeholder="e.g. Celestial Harmony" />
              </div>
              <div className="form-group">
                <label className="form-label">Divine Description</label>
                <textarea required className="form-input" style={{resize: 'vertical', minHeight: '100px'}} value={newSeva.description} onChange={e => setNewSeva({...newSeva, description: e.target.value})} placeholder="Describe the cosmic benefits..."></textarea>
              </div>
              <div style={{display: 'flex', gap: '1rem'}}>
                <div className="form-group" style={{flex: 1}}>
                  <label className="form-label">Offering (Price in INR)</label>
                  <input required type="number" min="0" className="form-input" value={newSeva.price} onChange={e => setNewSeva({...newSeva, price: e.target.value})} placeholder="e.g. 11000" />
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label className="form-label">Required Tier</label>
                  <select className="form-input" value={newSeva.tier_required} onChange={e => setNewSeva({...newSeva, tier_required: e.target.value})}>
                    <option value="initiate">🌙 Initiate</option>
                    <option value="devotee">🔮 Devotee</option>
                    <option value="ascendant">✨ Ascendant</option>
                    <option value="elite">👑 Elite</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsAddSevaModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary-action">Manifest</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast-card toast-${t.type}`}>
            {t.type === 'error' ? <Icons.Alert className="toast-icon" /> : <Icons.Logo className="toast-icon" style={{animation: 'spin 10s linear infinite'}} />}
            <div className="toast-text">
              <h4>{t.title}</h4>
              <p>{t.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}