import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  // We grab the user's tier from their VIP pass to display it
  const tier = localStorage.getItem('userTier');

  const handleLogout = () => {
    localStorage.clear(); // Shreds the VIP pass
    navigate('/'); // Kicks them back to the landing page
  };

  return (
    <nav className="bg-stone-900 border-b border-stone-800 p-4 px-6 flex justify-between items-center relative z-50">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 flex items-center gap-2">
          <Flame className="text-orange-500 w-6 h-6" />
          SANCTUM
        </div>
        <div className="hidden md:flex gap-6 text-sm font-semibold tracking-wide">
          <Link to="/dashboard" className="text-stone-400 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/history" className="text-stone-400 hover:text-white transition-colors">History</Link>
          <Link to="/admin" className="text-stone-400 hover:text-amber-500 transition-colors">Admin</Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {tier && (
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-stone-950 text-stone-300 border border-stone-700">
            Tier: {tier}
          </span>
        )}
        <button 
          onClick={handleLogout} 
          className="text-stone-400 hover:text-red-500 flex items-center gap-2 text-sm font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </nav>
  );
}
