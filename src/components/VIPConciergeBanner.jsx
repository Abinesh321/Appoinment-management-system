import React from 'react';
import { Award, Crown, Shield, Zap, Sparkles, PhoneCall, Check } from 'lucide-react';

export default function VIPConciergeBanner({ onRequestConcierge }) {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-12 py-10">
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass-panel border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950">
        
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Crown className="w-3.5 h-3.5" /> AuraConnect Executive VIP Concierge
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
              Need Guaranteed Same-Day Access or Private jet / On-Site Advisory?
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Our high-priority Concierge team handles discreet bookings, bilateral NDA contracts, emergency medical consultations with chief surgeons, and private penthouse sessions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 Dedicated Account Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Strict Discretion & NDA Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Priority Emergency Time Slots</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 text-center lg:text-right">
            <button
              onClick={onRequestConcierge}
              className="btn-gold text-sm py-4 px-8 shadow-2xl font-extrabold rounded-2xl w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact VIP Desk</span>
            </button>
            <p className="text-[11px] text-slate-500 mt-2">Response time under 15 minutes guaranteed</p>
          </div>

        </div>

      </div>
    </section>
  );
}
