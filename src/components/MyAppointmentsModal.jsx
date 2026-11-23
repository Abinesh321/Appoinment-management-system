import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, AlertCircle, FileText, CheckCircle2, Trash2, ArrowRight } from 'lucide-react';

export default function MyAppointmentsModal({ appointments, onClose, onJoinVirtualRoom, onCancelAppointment }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingAppts = appointments.filter(a => a.status === 'Upcoming');
  const pastAppts = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 shadow-2xl relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-100">My Consultation Schedule</h2>
            <p className="text-xs text-slate-400">Manage upcoming sessions and launch virtual consultations</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-4 border-b border-slate-800 mb-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'border-b-2 border-emerald-400 text-emerald-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Upcoming Sessions</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              {upcomingAppts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 transition-colors flex items-center gap-2 ${
              activeTab === 'past'
                ? 'border-b-2 border-emerald-400 text-emerald-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Past & History</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs">
              {pastAppts.length}
            </span>
          </button>
        </div>

        {/* List of Upcoming */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingAppts.length > 0 ? (
              upcomingAppts.map((appt) => (
                <div 
                  key={appt.bookingId} 
                  className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={appt.avatar || '/assets/doctor_cardiology.png'} 
                        alt={appt.expertName} 
                        className="w-12 h-12 rounded-xl object-cover border border-cyan-500/40"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{appt.expertName}</h4>
                        <p className="text-xs text-slate-400">{appt.expertTitle}</p>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ✓ {appt.consultationTypeLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-500 text-[10px]">Reference:</span>
                      <div className="font-mono text-cyan-300 font-bold">{appt.bookingId}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">Date & Time:</span>
                      <div className="font-bold text-slate-100">📅 {appt.date}</div>
                      <div className="font-bold text-emerald-400">⏰ {appt.time}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">Consultation Reason:</span>
                      <div className="truncate text-slate-300">{appt.reason}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => onCancelAppointment(appt.bookingId)}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Cancel Appointment
                    </button>

                    <div className="flex items-center gap-2">
                      {appt.consultationType === 'virtual' && (
                        <button
                          onClick={() => onJoinVirtualRoom(appt)}
                          className="btn-primary text-xs py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md animate-pulse"
                        >
                          <Video className="w-3.5 h-3.5" /> Join HD Video Call
                        </button>
                      )}

                      <button
                        onClick={() => alert(`Digital Pass for ID ${appt.bookingId} sent to ${appt.patientEmail}`)}
                        className="btn-secondary text-xs py-2"
                      >
                        Resend Pass
                      </button>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-10 space-y-3">
                <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">No upcoming consultations booked yet.</p>
              </div>
            )}
          </div>
        )}

        {/* List of Past */}
        {activeTab === 'past' && (
          <div className="space-y-3">
            {pastAppts.length > 0 ? (
              pastAppts.map((appt) => (
                <div key={appt.bookingId} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-200">{appt.expertName}</h5>
                    <p className="text-slate-400 text-[11px]">ID: {appt.bookingId} • {appt.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                    appt.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">No historical appointments found.</p>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button onClick={onClose} className="btn-secondary text-xs">
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
