import React from 'react';
import { Star, ShieldCheck, Crown, Stethoscope, Video, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function ExpertCard({ expert, onViewProfile, onQuickBook }) {
  const isDoctor = expert.type === 'doctor';

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-5 border border-slate-800 flex flex-col justify-between relative group">
      
      {/* Top Badge (VIP Gold or Doctor Emerald) */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {isDoctor ? (
          <span className="badge-emerald inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold">
            <Stethoscope className="w-3.5 h-3.5" /> Medical Specialist
          </span>
        ) : (
          <span className="badge-gold pulse-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold">
            <Crown className="w-3.5 h-3.5 text-amber-400" /> VIP Expert
          </span>
        )}

        <div className="flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-full border border-slate-700/60 text-xs font-bold text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{expert.rating}</span>
          <span className="text-slate-500 font-normal">({expert.reviewCount})</span>
        </div>
      </div>

      {/* Expert Profile Info */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className={`w-16 h-16 rounded-2xl object-cover border-2 ${
                isDoctor ? 'border-emerald-500/50' : 'border-amber-500/50'
              }`}
            />
            {expert.verified && (
              <ShieldCheck className={`w-5 h-5 absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-0.5 ${
                isDoctor ? 'text-emerald-400' : 'text-amber-400'
              }`} />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              {expert.name}
            </h3>
            <p className="text-xs font-semibold text-slate-300 mt-0.5">{expert.title}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{expert.institution}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {expert.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Location & Format */}
        <div className="text-xs text-slate-400 space-y-1.5 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{expert.location}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Next: {expert.nextAvailable}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[11px]">Fee: </span>
              <strong className="text-sm font-extrabold text-slate-100">{expert.currency}{expert.fee}</strong>
              <span className="text-[10px] text-slate-500"> / session</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-slate-800">
        <button
          onClick={() => onViewProfile(expert)}
          className="btn-secondary text-xs py-2.5"
        >
          View Profile
        </button>

        <button
          onClick={() => onQuickBook(expert)}
          className={`${
            isDoctor ? 'btn-primary' : 'btn-gold'
          } text-xs py-2.5 shadow-md`}
        >
          <span>Book Slot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
