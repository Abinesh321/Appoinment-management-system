import React from 'react';
import { ShieldCheck, Calendar, Sun, Moon, Sparkles, User, Search, Award } from 'lucide-react';

export default function Navbar({ 
  theme, 
  setTheme, 
  activeTab, 
  setActiveTab, 
  upcomingCount, 
  onOpenMyAppointments,
  searchQuery,
  setSearchQuery,
  onOpenConcierge
}) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/60 px-4 lg:px-12 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('all')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-cyan-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                AURA<span className="text-emerald-400">CONNECT</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">VIP & Medical Specialist Platform</p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Cardiology, AI Investors, Dermatology, VIP Advisory..."
            className="w-full bg-slate-900/80 text-sm text-slate-100 pl-10 pr-4 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* VIP Priority Banner trigger */}
          <button 
            onClick={onOpenConcierge}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/15 to-amber-600/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:border-amber-400 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>VIP Concierge</span>
          </button>

          {/* My Appointments Button */}
          <button
            onClick={onOpenMyAppointments}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-medium transition-all"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">My Bookings</span>
            {upcomingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[11px] flex items-center justify-center animate-pulse">
                {upcomingCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

      </div>
    </header>
  );
}
