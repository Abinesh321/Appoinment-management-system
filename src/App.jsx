import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilters from './components/CategoryFilters';
import ExpertCard from './components/ExpertCard';
import ExpertDetailModal from './components/ExpertDetailModal';
import BookingModal from './components/BookingModal';
import MyAppointmentsModal from './components/MyAppointmentsModal';
import VirtualRoomModal from './components/VirtualRoomModal';
import VIPConciergeBanner from './components/VIPConciergeBanner';
import Footer from './components/Footer';
import Toast from './components/Toast';

import { EXPERTS, INITIAL_USER_APPOINTMENTS } from './data/expertsData';
import { Crown, Stethoscope, Search, Sparkles, PhoneCall, X } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'doctor' | 'vip'
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [consultationTypeFilter, setConsultationTypeFilter] = useState('all');

  // Appointments & Modal states
  const [userAppointments, setUserAppointments] = useState(INITIAL_USER_APPOINTMENTS);
  const [selectedExpertForProfile, setSelectedExpertForProfile] = useState(null);
  const [selectedExpertForBooking, setSelectedExpertForBooking] = useState(null);
  const [bookingInitialDate, setBookingInitialDate] = useState('');
  const [bookingInitialSlot, setBookingInitialSlot] = useState('');
  
  const [showMyAppointments, setShowMyAppointments] = useState(false);
  const [activeVirtualCall, setActiveVirtualCall] = useState(null);
  const [showConciergeModal, setShowConciergeModal] = useState(false);

  // Toast
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const triggerToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
  };

  // Filter & Sort Logic
  const filteredExperts = useMemo(() => {
    return EXPERTS.filter((exp) => {
      // Category Tab filter
      if (activeTab === 'doctor' && exp.type !== 'doctor') return false;
      if (activeTab === 'vip' && exp.type !== 'vip') return false;

      // Specialty filter
      if (selectedSpecialty !== 'All Categories' && exp.specialty !== selectedSpecialty) return false;

      // Format filter
      if (consultationTypeFilter !== 'all' && !exp.consultationTypes.includes(consultationTypeFilter)) return false;

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = exp.name.toLowerCase().includes(q);
        const matchesTitle = exp.title.toLowerCase().includes(q);
        const matchesSpecialty = exp.specialty.toLowerCase().includes(q);
        const matchesTag = exp.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesSpecialty && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.fee - b.fee;
      if (sortBy === 'price-high') return b.fee - a.fee;
      return 0; // recommended default
    });
  }, [activeTab, selectedSpecialty, consultationTypeFilter, searchQuery, sortBy]);

  // Handlers
  const handleOpenBooking = (expert, date = '', slot = '') => {
    setSelectedExpertForProfile(null);
    setSelectedExpertForBooking(expert);
    setBookingInitialDate(date);
    setBookingInitialSlot(slot);
  };

  const handleBookingSuccess = (newBooking) => {
    setUserAppointments(prev => [newBooking, ...prev]);
    setSelectedExpertForBooking(null);
    triggerToast(`Appointment with ${newBooking.expertName} confirmed! 🎉`, 'success');
  };

  const handleCancelAppointment = (bookingId) => {
    if (window.confirm(`Are you sure you want to cancel appointment ID ${bookingId}?`)) {
      setUserAppointments(prev => prev.map(a => a.bookingId === bookingId ? { ...a, status: 'Cancelled' } : a));
      triggerToast(`Appointment ${bookingId} has been cancelled.`, 'warning');
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] relative selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Background Gradients */}
      <div className="bg-gradients">
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>
        <div className="bg-blob-3"></div>
      </div>

      {/* Navbar */}
      <Navbar 
        theme={theme}
        setTheme={setTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        upcomingCount={userAppointments.filter(a => a.status === 'Upcoming').length}
        onOpenMyAppointments={() => setShowMyAppointments(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenConcierge={() => setShowConciergeModal(true)}
      />

      {/* Hero Header */}
      <Hero 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Specialty Tags & Filter Controls */}
      <CategoryFilters 
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        sortBy={sortBy}
        setSortBy={setSortBy}
        consultationTypeFilter={consultationTypeFilter}
        setConsultationTypeFilter={setConsultationTypeFilter}
        totalResults={filteredExperts.length}
      />

      {/* Experts Grid */}
      <main className="max-w-7xl mx-auto px-4 lg:px-12 py-4 pb-16">
        {filteredExperts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map((expert) => (
              <ExpertCard 
                key={expert.id}
                expert={expert}
                onViewProfile={(exp) => setSelectedExpertForProfile(exp)}
                onQuickBook={(exp) => handleOpenBooking(exp)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-3xl space-y-3 max-w-lg mx-auto">
            <Search className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-200">No Matching Experts Found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your specialty filters or search query to discover available specialists.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedSpecialty('All Categories');
                setSearchQuery('');
                setConsultationTypeFilter('all');
              }}
              className="btn-secondary text-xs mt-2"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* VIP Priority Concierge Banner */}
      <VIPConciergeBanner onRequestConcierge={() => setShowConciergeModal(true)} />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {selectedExpertForProfile && (
        <ExpertDetailModal 
          expert={selectedExpertForProfile}
          onClose={() => setSelectedExpertForProfile(null)}
          onProceedToBooking={(exp, date, slot) => handleOpenBooking(exp, date, slot)}
        />
      )}

      {selectedExpertForBooking && (
        <BookingModal 
          expert={selectedExpertForBooking}
          initialDate={bookingInitialDate}
          initialSlot={bookingInitialSlot}
          onClose={() => setSelectedExpertForBooking(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {showMyAppointments && (
        <MyAppointmentsModal 
          appointments={userAppointments}
          onClose={() => setShowMyAppointments(false)}
          onJoinVirtualRoom={(appt) => {
            setShowMyAppointments(false);
            setActiveVirtualCall(appt);
          }}
          onCancelAppointment={handleCancelAppointment}
        />
      )}

      {activeVirtualCall && (
        <VirtualRoomModal 
          appointment={activeVirtualCall}
          onClose={() => setActiveVirtualCall(null)}
        />
      )}

      {/* VIP Concierge Direct Hotline Modal */}
      {showConciergeModal && (
        <div className="modal-overlay">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-amber-500/40 relative text-left space-y-4">
            <button
              onClick={() => setShowConciergeModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-100">VIP Priority Concierge Desk</h3>
                <p className="text-xs text-amber-400 font-semibold">100% Discreet • Direct Officer Line</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              For high-priority requests, emergency consultations with chief medical directors, bilateral NDA signing, or jet travel arrangements:
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-200">
                <span>VIP Priority Hotline:</span>
                <strong className="text-amber-400">+1 (800) 999-AURA-VIP</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-200">
                <span>Direct Executive Email:</span>
                <strong className="text-cyan-400">concierge@auraconnect.vip</strong>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setShowConciergeModal(false);
                  triggerToast('VIP Concierge representative notified via SMS!', 'success');
                }}
                className="btn-gold w-full text-xs font-extrabold py-3"
              >
                Request Immediate Call Back ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

    </div>
  );
}
