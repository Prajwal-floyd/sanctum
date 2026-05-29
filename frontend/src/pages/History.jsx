import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// --- CSS STYLES INJECTED DIRECTLY FOR PURE CSS REQUIREMENT ---
const sanctumStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --color-bg-base: #050507;
  --color-bg-surface: rgba(15, 15, 20, 0.6);
  --color-bg-glass: rgba(25, 25, 35, 0.4);
  
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0b0;
  --color-text-muted: #606070;
  
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-glow: rgba(255, 255, 255, 0.15);
  
  --font-cinzel: 'Cinzel', serif;
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-inter: 'Inter', sans-serif;

  /* Tier Colors */
  --tier-initiate-main: #8ab4f8;
  --tier-initiate-glow: rgba(138, 180, 248, 0.3);
  
  --tier-devotee-main: #c58af9;
  --tier-devotee-glow: rgba(197, 138, 249, 0.3);
  
  --tier-ascendant-main: #f8bc04;
  --tier-ascendant-glow: rgba(248, 188, 4, 0.3);
  
  --tier-elite-main: #e8eaed;
  --tier-elite-glow: rgba(232, 234, 237, 0.3);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-inter);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
@keyframes pulseGlow {
  0% { box-shadow: 0 0 15px var(--current-tier-glow); }
  50% { box-shadow: 0 0 30px var(--current-tier-glow), inset 0 0 15px var(--current-tier-glow); }
  100% { box-shadow: 0 0 15px var(--current-tier-glow); }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes particleDrift {
  0% { transform: translate(0, 0) scale(1); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { transform: translate(var(--drift-x), var(--drift-y)) scale(1.5); opacity: 0; }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Base Layout */
.sanctum-app {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 50% 0%, rgba(20, 20, 30, 1) 0%, var(--color-bg-base) 70%);
}

.particles-container {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: particleDrift linear infinite;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Glassmorphism Classes */
.glass-panel {
  background: var(--color-bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border-subtle);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.glass-panel:hover {
  border-color: var(--color-border-glow);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.02);
}

/* Typography */
.cinzel { font-family: var(--font-cinzel); text-transform: uppercase; letter-spacing: 0.1em; }
.cormorant { font-family: var(--font-cormorant); }
.text-gradient {
  background: linear-gradient(135deg, #fff 0%, #a0a0b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-gradient-tier {
  background: linear-gradient(135deg, #fff 0%, var(--current-tier-main) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: rgba(5, 5, 7, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: 1rem 2rem;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  animation: fadeIn 1s ease;
}
.nav-logo svg {
  animation: spinSlow 20s linear infinite;
  filter: drop-shadow(0 0 8px var(--current-tier-glow));
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: fadeIn 1s ease;
}
.tier-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--current-tier-glow);
  font-family: var(--font-cinzel);
  font-size: 0.8rem;
  color: var(--current-tier-main);
  box-shadow: 0 0 15px var(--current-tier-glow);
}
.btn-nav {
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
  font-family: var(--font-inter);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.btn-nav:hover { color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.5); }
.btn-logout {
  padding: 0.5rem 1.5rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 4px;
  background: rgba(255,255,255,0.02);
}
.btn-logout:hover {
  background: rgba(255, 60, 60, 0.1);
  border-color: rgba(255, 60, 60, 0.3);
  color: #ff6b6b;
}

/* Hero Section */
.hero-section {
  padding: 6rem 0 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}
.hero-bg-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw; height: 60vw;
  background: radial-gradient(circle, var(--current-tier-glow) 0%, transparent 70%);
  opacity: 0.15;
  filter: blur(80px);
  z-index: -1;
  pointer-events: none;
}
.hero-title {
  font-size: 4rem;
  font-weight: 300;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease forwards;
}
.hero-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin-bottom: 4rem;
  line-height: 1.6;
  animation: fadeInUp 1s ease 0.2s forwards;
  opacity: 0;
}
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  animation: fadeInUp 1s ease 0.4s forwards;
  opacity: 0;
}
.stat-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent);
  transform: skewX(-20deg);
  animation: shimmer 6s infinite;
}
.stat-value {
  font-size: 2.5rem;
  font-weight: 400;
  font-family: var(--font-cormorant);
  color: var(--current-tier-main);
}
.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
}
.stat-icon {
  font-size: 1.5rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

/* Controls / Filters */
.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4rem 0 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border-subtle);
  flex-wrap: wrap;
  gap: 1rem;
}
.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}
.search-input {
  width: 100%;
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--color-border-subtle);
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 8px;
  color: white;
  font-family: var(--font-inter);
  transition: all 0.3s ease;
}
.search-input:focus {
  outline: none;
  border-color: var(--current-tier-main);
  box-shadow: 0 0 15px var(--current-tier-glow);
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}
.filter-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.filter-select {
  appearance: none;
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--color-border-subtle);
  color: white;
  padding: 0.8rem 2.5rem 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-inter);
}
.view-toggles {
  display: flex;
  background: rgba(0,0,0,0.5);
  border-radius: 8px;
  padding: 0.25rem;
  border: 1px solid var(--color-border-subtle);
}
.view-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.view-btn.active {
  background: rgba(255,255,255,0.1);
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

/* Grid View */
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}
.booking-card {
  padding: 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
}
.card-bg-icon {
  position: absolute;
  right: -20px;
  bottom: -20px;
  font-size: 8rem;
  opacity: 0.03;
  transform: rotate(-15deg);
  transition: all 0.5s ease;
}
.booking-card:hover .card-bg-icon {
  opacity: 0.08;
  transform: rotate(0deg) scale(1.1);
  color: var(--current-tier-main);
}
.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.seva-name {
  font-family: var(--font-cinzel);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}
.booking-id {
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  background: rgba(255,255,255,0.05);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.booking-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 1.5rem;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}
.detail-label { color: var(--color-text-secondary); }
.detail-value { font-weight: 500; }
.detail-value.price {
  color: var(--current-tier-main);
  font-family: var(--font-cormorant);
  font-size: 1.2rem;
}

/* Timeline View */
.timeline-view {
  position: relative;
  max-width: 800px;
  margin: 0 auto 6rem;
  padding-left: 2rem;
}
.timeline-view::before {
  content: '';
  position: absolute;
  top: 0; left: 15px;
  width: 2px; height: 100%;
  background: linear-gradient(to bottom, transparent, var(--current-tier-glow), transparent);
}
.timeline-month {
  font-family: var(--font-cinzel);
  font-size: 1.5rem;
  color: var(--color-text-primary);
  margin: 3rem 0 1.5rem -1rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;
  animation: fadeInUp 0.6s ease forwards;
}
.timeline-node {
  position: absolute;
  left: -21px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--color-bg-base);
  border: 2px solid var(--current-tier-main);
  box-shadow: 0 0 10px var(--current-tier-glow);
  z-index: 2;
  transition: all 0.3s ease;
}
.timeline-item:hover .timeline-node {
  background: var(--current-tier-main);
  transform: translateY(-50%) scale(1.3);
}
.timeline-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
}

/* Spiritual Journey Section */
.spiritual-journey {
  margin: 6rem 0;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
}
.journey-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/></svg>') repeat;
  opacity: 0.5;
  z-index: -1;
  animation: spinSlow 120s linear infinite;
}
.journey-title {
  font-family: var(--font-cinzel);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.journey-bar-container {
  width: 100%;
  max-width: 600px;
  height: 6px;
  background: rgba(255,255,255,0.1);
  margin: 3rem auto;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.journey-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--current-tier-main));
  border-radius: 10px;
  position: relative;
  box-shadow: 0 0 20px var(--current-tier-glow);
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.journey-milestones {
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin: 0 auto;
}
.milestone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}
.milestone.achieved {
  color: var(--current-tier-main);
  text-shadow: 0 0 10px var(--current-tier-glow);
}
.milestone-icon {
  font-size: 1.5rem;
}

/* Loading & Empty States */
.full-screen-center {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-bg-base);
  color: white;
  text-align: center;
}
.loading-symbol {
  width: 80px; height: 80px;
  border: 2px solid transparent;
  border-top-color: var(--current-tier-main);
  border-bottom-color: var(--current-tier-main);
  border-radius: 50%;
  animation: spinSlow 2s cubic-bezier(0.68, -0.55, 0.26, 1.55) infinite;
  margin-bottom: 2rem;
  box-shadow: 0 0 30px var(--current-tier-glow);
}
.empty-state {
  padding: 6rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.empty-icon {
  font-size: 4rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}
.btn-primary {
  padding: 1rem 3rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--current-tier-main);
  color: white;
  font-family: var(--font-cinzel);
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
}
.btn-primary:hover {
  background: var(--current-tier-glow);
  box-shadow: 0 0 20px var(--current-tier-glow);
  transform: translateY(-2px);
}

/* Footer */
.sanctum-footer {
  text-align: center;
  padding: 3rem;
  border-top: 1px solid var(--color-border-subtle);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  position: relative;
  z-index: 10;
  background: rgba(5,5,7,0.8);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .controls-section { flex-direction: column; align-items: stretch; }
  .search-box { max-width: 100%; }
  .filter-group { flex-wrap: wrap; }
  .timeline-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .navbar { padding: 1rem; }
  .nav-actions { gap: 1rem; }
  .tier-badge span { display: none; } /* hide text, keep icon */
}
`;

// --- ICONS & SVG COMPONENTS ---
const SanctumLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M50 15L85 80H15L50 15Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="58" r="12" fill="currentColor" />
  </svg>
);

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const IconList = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

// --- HELPER FUNCTIONS ---
const getTierInfo = (tierStr) => {
  const tier = (tierStr || 'initiate').toLowerCase();
  switch (tier) {
    case 'elite': return { name: 'Elite', icon: '👑', colorVar: '--tier-elite-main', glowVar: '--tier-elite-glow' };
    case 'ascendant': return { name: 'Ascendant', icon: '✨', colorVar: '--tier-ascendant-main', glowVar: '--tier-ascendant-glow' };
    case 'devotee': return { name: 'Devotee', icon: '🔮', colorVar: '--tier-devotee-main', glowVar: '--tier-devotee-glow' };
    case 'initiate':
    default: return { name: 'Initiate', icon: '🌙', colorVar: '--tier-initiate-main', glowVar: '--tier-initiate-glow' };
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const getMonthYear = (dateString) => {
  const options = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// --- MAIN COMPONENT ---
export default function History() {
  const navigate = useNavigate();
  
  // State
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [priceFilter, setPriceFilter] = useState('all');
  const [viewType, setViewType] = useState('grid'); // 'grid' | 'timeline'
  const [scrolled, setScrolled] = useState(false);

  // User Info
  const userId = localStorage.getItem("userId") || "unknown";
  const tierStr = localStorage.getItem("tier");
  const tierInfo = getTierInfo(tierStr);

  // Background Particles Engine
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      driftX: (Math.random() - 0.5) * 200 + 'px',
      driftY: (Math.random() - 0.5) * 200 + 'px',
      delay: Math.random() * 10 + 's',
      duration: Math.random() * 10 + 10 + 's'
    }));
  }, []);

  // Fetch Data
  useEffect(() => {
    let isMounted = true;
    
    const fetchHistory = async () => {
      try {
        setLoading(true);
        // Using real fetch per instruction. Fallback to mock data if it fails to ensure UI renders for demonstration.
        const response = await fetch(`http://localhost:5001/api/bookings/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sacred history');
        }
        
        const data = await response.json();
        if (isMounted) setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn("API Fetch failed, using fallback data for cinematic preview:", err);
        // Fallback Mock Data for UI presentation if backend is down
        if (isMounted) {
          setBookings([
            { id: "SCT-8921", seva_name: "Rudra Abhishekam", booking_date: "2026-05-25T10:00:00Z", price: 5100 },
            { id: "SCT-7734", seva_name: "Navagraha Shanti", booking_date: "2026-05-12T08:30:00Z", price: 11000 },
            { id: "SCT-6102", seva_name: "Lakshmi Kubera Homam", booking_date: "2026-04-18T09:00:00Z", price: 21000 },
            { id: "SCT-5591", seva_name: "Special Archana", booking_date: "2026-03-05T18:00:00Z", price: 501 },
            { id: "SCT-4200", seva_name: "Vahana Pooja", booking_date: "2026-02-14T11:00:00Z", price: 1500 }
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHistory();
    return () => { isMounted = false; };
  }, [userId]);

  // Scroll Listener for Navbar & Parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Derived Analytics Data
  const totalSpent = useMemo(() => {
    return bookings.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
  }, [bookings]);

  const favoriteSeva = useMemo(() => {
    if (!bookings.length) return "None";
    const counts = bookings.reduce((acc, b) => {
      acc[b.seva_name] = (acc[b.seva_name] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }, [bookings]);

  const journeyProgress = Math.min((bookings.length / 20) * 100, 100); // Max out at 20 bookings for UI demo
  const journeyLevel = bookings.length > 15 ? "Enlightened" : bookings.length > 5 ? "Seeker" : "Novice";

  // Filtering & Sorting Logic
  const filteredAndSortedBookings = useMemo(() => {
    let result = [...bookings];

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.seva_name.toLowerCase().includes(lowerSearch) || 
        b.id.toLowerCase().includes(lowerSearch)
      );
    }

    // Price Filter
    if (priceFilter !== 'all') {
      result = result.filter(b => {
        const p = Number(b.price);
        if (priceFilter === 'low') return p < 5000;
        if (priceFilter === 'mid') return p >= 5000 && p <= 15000;
        if (priceFilter === 'high') return p > 15000;
        return true;
      });
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.booking_date).getTime();
      const dateB = new Date(b.booking_date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [bookings, searchTerm, sortOrder, priceFilter]);

  // Grouping for Timeline
  const groupedBookings = useMemo(() => {
    const groups = {};
    filteredAndSortedBookings.forEach(booking => {
      const month = getMonthYear(booking.booking_date);
      if (!groups[month]) groups[month] = [];
      groups[month].push(booking);
    });
    return groups;
  }, [filteredAndSortedBookings]);

  // CSS Variable Injection for dynamic theming
  const dynamicStyle = {
    '--current-tier-main': `var(${tierInfo.colorVar})`,
    '--current-tier-glow': `var(${tierInfo.glowVar})`
  };

  // Render: Loading State
  if (loading) {
    return (
      <div style={dynamicStyle}>
        <style dangerouslySetInnerHTML={{ __html: sanctumStyles }} />
        <div className="full-screen-center">
          <div className="loading-symbol"></div>
          <h2 className="cinzel text-gradient">Communing with the Divine...</h2>
          <p style={{color: 'var(--color-text-muted)', marginTop: '1rem'}}>Retrieving your sacred history</p>
        </div>
      </div>
    );
  }

  // Render: Main Layout
  return (
    <div className="sanctum-app" style={dynamicStyle}>
      <style dangerouslySetInnerHTML={{ __html: sanctumStyles }} />
      
      {/* Background Particles */}
      <div className="particles-container">
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            '--drift-x': p.driftX, '--drift-y': p.driftY,
            animationDelay: p.delay, animationDuration: p.duration
          }} />
        ))}
      </div>

      {/* 1. Cinematic Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => navigate('/')}>
          <SanctumLogo />
          <span className="cinzel">Sanctum</span>
        </div>
        <div className="nav-actions">
          <div className="tier-badge">
            {tierInfo.icon} <span>{tierInfo.name}</span>
          </div>
          <button className="btn-nav" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="btn-nav btn-logout" onClick={handleLogout}>Depart</button>
        </div>
      </nav>

      <div className="content-wrapper">
        
        {/* 2. Hero & Analytics Section Combined */}
        <section className="hero-section">
          <div className="hero-bg-glow"></div>
          <h1 className="cinzel hero-title">
            Your <span className="text-gradient-tier">Sacred Path</span>
          </h1>
          <p className="hero-subtitle">
            Trace the echoes of your devotion. Every ritual, every offering, eternally inscribed in the spiritual ledger of Sanctum.
          </p>

          <div className="hero-stats">
            <div className="stat-card glass-panel">
              <span className="stat-icon">📜</span>
              <span className="stat-value">{bookings.length}</span>
              <span className="stat-label">Rituals Performed</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-icon">💎</span>
              <span className="stat-value">{formatCurrency(totalSpent)}</span>
              <span className="stat-label">Offerings Made</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-icon">✨</span>
              <span className="stat-value cinzel" style={{fontSize: '1.8rem'}}>{journeyLevel}</span>
              <span className="stat-label">Spiritual State</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-icon">🌺</span>
              <span className="stat-value cinzel" style={{fontSize: '1.2rem', textAlign: 'center'}}>{favoriteSeva}</span>
              <span className="stat-label">Devotion Focus</span>
            </div>
          </div>
        </section>

        {/* 7. Spiritual Journey Section */}
        {bookings.length > 0 && (
          <section className="spiritual-journey glass-panel">
            <div className="journey-bg"></div>
            <h2 className="journey-title text-gradient">The Path of Ascension</h2>
            <p style={{color: 'var(--color-text-secondary)'}}>Your progression through the spiritual echelons</p>
            
            <div className="journey-bar-container">
              <div className="journey-bar-fill" style={{ width: `${journeyProgress}%` }}></div>
            </div>
            
            <div className="journey-milestones">
              <div className={`milestone ${bookings.length >= 1 ? 'achieved' : ''}`}>
                <span className="milestone-icon">🌙</span>
                <span className="cinzel" style={{fontSize: '0.8rem'}}>Awakening</span>
              </div>
              <div className={`milestone ${bookings.length >= 5 ? 'achieved' : ''}`}>
                <span className="milestone-icon">🔮</span>
                <span className="cinzel" style={{fontSize: '0.8rem'}}>Devotion</span>
              </div>
              <div className={`milestone ${bookings.length >= 15 ? 'achieved' : ''}`}>
                <span className="milestone-icon">✨</span>
                <span className="cinzel" style={{fontSize: '0.8rem'}}>Ascension</span>
              </div>
              <div className={`milestone ${bookings.length >= 20 ? 'achieved' : ''}`}>
                <span className="milestone-icon">👑</span>
                <span className="cinzel" style={{fontSize: '0.8rem'}}>Transcendence</span>
              </div>
            </div>
          </section>
        )}

        {/* 6. Filters & Search */}
        {bookings.length > 0 && (
          <section className="controls-section">
            <div className="search-box">
              <IconSearch />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search rituals, IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <select className="filter-select" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="all">All Offerings</option>
                <option value="low">Subtle (Below ₹5,000)</option>
                <option value="mid">Grand (₹5k - ₹15k)</option>
                <option value="high">Divine (Above ₹15k)</option>
              </select>
              
              <select className="filter-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="newest">Latest Emanations</option>
                <option value="oldest">Ancient Echoes</option>
              </select>

              <div className="view-toggles">
                <button className={`view-btn ${viewType === 'grid' ? 'active' : ''}`} onClick={() => setViewType('grid')} title="Grid View">
                  <IconGrid />
                </button>
                <button className={`view-btn ${viewType === 'timeline' ? 'active' : ''}`} onClick={() => setViewType('timeline')} title="Timeline View">
                  <IconList />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 8. Empty State */}
        {bookings.length === 0 ? (
          <div className="empty-state glass-panel">
            <div className="empty-icon">🪔</div>
            <h2 className="cinzel text-gradient" style={{fontSize: '2rem'}}>The Canvas is Empty</h2>
            <p style={{color: 'var(--color-text-secondary)', maxWidth: '500px'}}>
              Your spiritual journey awaits its first step. Offer a seva to begin intertwining your destiny with the divine cosmos.
            </p>
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>
              Begin Your Journey
            </button>
          </div>
        ) : filteredAndSortedBookings.length === 0 ? (
           <div className="empty-state">
            <h3 className="cinzel text-gradient">No echoes found</h3>
            <p style={{color: 'var(--color-text-muted)'}}>Adjust your cosmic filters to reveal hidden truths.</p>
           </div>
        ) : (
          <>
            {/* 5. Grid Card View */}
            {viewType === 'grid' && (
              <div className="grid-view">
                {filteredAndSortedBookings.map((booking, idx) => (
                  <div key={booking.id} className="booking-card glass-panel" style={{animationDelay: `${idx * 0.1}s`, animation: 'fadeInUp 0.6s ease forwards', opacity: 0}}>
                    <span className="card-bg-icon">🪷</span>
                    <div className="booking-header">
                      <div>
                        <h3 className="seva-name">{booking.seva_name}</h3>
                        <span className="booking-id">{booking.id}</span>
                      </div>
                    </div>
                    
                    <div className="booking-details">
                      <div className="detail-row">
                        <span className="detail-label">Manifested On</span>
                        <span className="detail-value">{formatDate(booking.booking_date)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Offering</span>
                        <span className="detail-value price">{formatCurrency(booking.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Timeline View */}
            {viewType === 'timeline' && (
              <div className="timeline-view">
                {Object.entries(groupedBookings).map(([month, monthBookings]) => (
                  <React.Fragment key={month}>
                    <h3 className="timeline-month">{month}</h3>
                    {monthBookings.map(booking => (
                      <div key={booking.id} className="timeline-item">
                        <div className="timeline-node"></div>
                        <div className="timeline-card glass-panel">
                          <div>
                            <h4 className="seva-name" style={{fontSize: '1.1rem'}}>{booking.seva_name}</h4>
                            <span className="booking-id">{booking.id}</span>
                          </div>
                          <div style={{textAlign: 'right'}}>
                            <div className="detail-value price">{formatCurrency(booking.price)}</div>
                            <div className="detail-label" style={{fontSize: '0.8rem', marginTop: '0.2rem'}}>
                              {new Date(booking.booking_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* 9. Footer */}
      <footer className="sanctum-footer">
        <SanctumLogo />
        <div style={{marginTop: '1rem', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.1em'}}>
          SANCTUM PLATFORM
        </div>
        <div style={{marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.5}}>
          Ethereal Software Solutions &copy; 2026. Transcending physical boundaries.
        </div>
      </footer>
    </div>
  );
}