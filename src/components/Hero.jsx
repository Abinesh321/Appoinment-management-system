import React from 'react';
import { Search, Stethoscope, Crown, Video, MapPin, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function Hero({ activeTab, setActiveTab, selectedSpecialty, setSelectedSpecialty, searchQuery, setSearchQuery }) {
  return (
    <section className="relative pt-8 pb-10 px-4 lg:px-12 max-w-7xl mx-auto text-center md:text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Headline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
            <span className="online-dot"></span>
            <span className="text-emerald-400 font-bold">24/7 Priority Booking</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300 flex items-center gap-1">
              <Crown className="w-3 h-3" /> VIP Verified Experts
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
            Book Direct Consultations with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
              Top Doctors & VIP Icons
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Connect 1-on-1 with elite interventional cardiologists, neurosurgeons, venture capitalists, and global leaders. Book seamless virtual video sessions or private clinic appointments.
          </p>

          {/* Tab Filter Switcher */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              All Specialists
            </button>

            <button
              onClick={() => setActiveTab('doctor')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'doctor'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-300" />
              Medical Doctors
            </button>

            <button
              onClick={() => setActiveTab('vip')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'vip'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-400" />
              VIP & Executives
            </button>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-slate-400 pt-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>HIPAA Compliant & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Instant Video & In-Person</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Guaranteed Slots</span>
            </div>
          </div>
        </div>

        {/* Right Feature Card / Preview Banner */}
        <div className="lg:col-span-5">
          <div className="relative p-6 rounded-3xl glass-panel border border-slate-700/60 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold text-slate-200">LIVE CONSULTATION SLOTS</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                Verified Today
              </span>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
              <img 
                src="/assets/doctor_cardiology.png" 
                alt="Dr. Elena" 
                className="w-14 h-14 rounded-xl object-cover border border-emerald-500/40" 
              />
              <div className="flex-1 text-left">
                <h4 className="text-sm font-bold text-slate-100">Dr. Elena Rostova, MD</h4>
                <p className="text-xs text-emerald-400 font-medium">Chief of Cardiology</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">3:30 PM Today</span>
                  <span>• $280 / session</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
              <img 
                src="/assets/vip_tech_founder.png" 
                alt="Alexander Vance" 
                className="w-14 h-14 rounded-xl object-cover border border-amber-500/40" 
              />
              <div className="flex-1 text-left">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  Alexander Vance <Crown className="w-3.5 h-3.5 text-amber-400" />
                </h4>
                <p className="text-xs text-amber-400 font-medium">Venture Capitalist & Tech Founder</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300">11:00 AM Tomorrow</span>
                  <span>• VIP Advisory</span>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <div className="text-center text-xs text-slate-400">
                ⭐ <strong className="text-slate-200">4.98 / 5.0</strong> average rating across 15,000+ completed appointments
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
