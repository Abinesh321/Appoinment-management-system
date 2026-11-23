import React, { useState } from 'react';
import { X, Star, ShieldCheck, Crown, Stethoscope, MapPin, Calendar, Check, Award, BookOpen, MessageSquare } from 'lucide-react';

export default function ExpertDetailModal({ expert, onClose, onProceedToBooking }) {
  const [activeSubTab, setActiveSubTab] = useState('about');
  const [selectedDate, setSelectedDate] = useState('2026-10-01');
  const [selectedSlot, setSelectedSlot] = useState('');

  if (!expert) return null;

  const isDoctor = expert.type === 'doctor';
  const availableDates = Object.keys(expert.slots || {});
  const slotsForDate = expert.slots[selectedDate] || [];

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 shadow-2xl relative p-6 sm:p-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-800 pb-6">
          <div className="relative">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 ${
                isDoctor ? 'border-emerald-500/50' : 'border-amber-500/50'
              }`}
            />
            {isDoctor ? (
              <Stethoscope className="w-6 h-6 absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 rounded-full p-1 shadow-lg" />
            ) : (
              <Crown className="w-6 h-6 absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 rounded-full p-1 shadow-lg" />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                isDoctor ? 'badge-emerald' : 'badge-gold'
              }`}>
                {isDoctor ? 'Medical Specialist' : 'VIP Executive Expert'}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{expert.rating}</span>
                <span className="text-slate-500">({expert.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 mt-1">
              {expert.name}
            </h2>
            <p className="text-sm font-semibold text-slate-300">{expert.title}</p>
            <p className="text-xs text-slate-400">{expert.institution}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" /> {expert.location}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-medium">Experience: {expert.experience}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">Fee: {expert.currency}{expert.fee} / session</span>
            </div>
          </div>
        </div>

        {/* Modal Sub Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-800 my-4 text-sm font-semibold">
          <button
            onClick={() => setActiveSubTab('about')}
            className={`pb-3 transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'about'
                ? 'border-b-2 border-cyan-400 text-cyan-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> About & Qualifications
          </button>

          <button
            onClick={() => setActiveSubTab('reviews')}
            className={`pb-3 transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'reviews'
                ? 'border-b-2 border-cyan-400 text-cyan-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Client Reviews ({expert.reviews?.length || 0})
          </button>

          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`pb-3 transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'schedule'
                ? 'border-b-2 border-cyan-400 text-cyan-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" /> Direct Booking Slots
          </button>
        </div>

        {/* Tab Content: About */}
        {activeSubTab === 'about' && (
          <div className="space-y-5 text-sm text-slate-300 leading-relaxed py-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Biography & Specialization</h4>
              <p className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-slate-200">
                {expert.bio}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Education & Credentials</h4>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 text-xs leading-normal">{expert.education}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Competencies & Consultations</h4>
              <div className="flex flex-wrap gap-2">
                {expert.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold border border-slate-700">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Reviews */}
        {activeSubTab === 'reviews' && (
          <div className="space-y-3 py-2">
            {expert.reviews && expert.reviews.length > 0 ? (
              expert.reviews.map((rev) => (
                <div key={rev.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-xs">{rev.user}</span>
                      <span className="text-[10px] text-slate-500">• Verified Patient/Client</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                  <p className="text-[10px] text-slate-500 text-right">{rev.date}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No reviews yet for this expert.</p>
            )}
          </div>
        )}

        {/* Tab Content: Schedule Slots */}
        {activeSubTab === 'schedule' && (
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Select Date</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {availableDates.map((dateStr) => (
                  <button
                    key={dateStr}
                    onClick={() => {
                      setSelectedDate(dateStr);
                      setSelectedSlot('');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedDate === dateStr
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    📅 {dateStr}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Available Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {slotsForDate.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      selectedSlot === slot
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {selectedSlot === slot && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Action */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-slate-400">Total Consultation Fee:</span>
            <div className="text-lg font-extrabold text-slate-100">
              {expert.currency}{expert.fee} <span className="text-xs font-normal text-slate-400">/ 45 min session</span>
            </div>
          </div>

          <button
            onClick={() => onProceedToBooking(expert, selectedDate, selectedSlot)}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all ${
              isDoctor ? 'btn-primary' : 'btn-gold'
            }`}
          >
            {selectedSlot ? `Confirm Booking for ${selectedSlot}` : 'Proceed to Book Appointment'}
          </button>
        </div>

      </div>
    </div>
  );
}
