import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Lock, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 pt-12 pb-8 px-4 lg:px-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-base font-extrabold text-slate-100 tracking-tight">
              AURA<span className="text-emerald-400">CONNECT</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The global standard for confidential doctor appointments, executive health consultations, and direct VIP 1-on-1 sessions.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL</span>
            <span>•</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-cyan-400" /> HIPAA Verified</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">Specialties</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#specialty" className="hover:text-cyan-300 transition-colors">Cardiology & Vascular</a></li>
            <li><a href="#specialty" className="hover:text-cyan-300 transition-colors">Neurology & Brain Health</a></li>
            <li><a href="#specialty" className="hover:text-cyan-300 transition-colors">Dermatology & Laser</a></li>
            <li><a href="#specialty" className="hover:text-cyan-300 transition-colors">Venture Capital Advisory</a></li>
          </ul>
        </div>

        {/* VIP Advisory */}
        <div>
          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">VIP Concierge</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#vip" className="hover:text-amber-300 transition-colors">Executive Mentorship</a></li>
            <li><a href="#vip" className="hover:text-amber-300 transition-colors">Celebrity Wellness Protocol</a></li>
            <li><a href="#vip" className="hover:text-amber-300 transition-colors">Global Legal Arbitration</a></li>
            <li><a href="#vip" className="hover:text-amber-300 transition-colors">Emergency Same-Day Desk</a></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">24/7 Client Desk</h4>
          <p className="text-slate-400 mb-2">Need assistance with your booking or calendar sync?</p>
          <div className="text-cyan-400 font-bold text-sm">support@auraconnect.vip</div>
          <div className="text-slate-300 text-xs mt-1">+1 (800) 555-AURA-VIP</div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>© 2026 AuraConnect VIP & Doctor Booking Systems. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <a href="#hipaa" className="hover:underline">HIPAA Notice</a>
        </div>
      </div>
    </footer>
  );
}
