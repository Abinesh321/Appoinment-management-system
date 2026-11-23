import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Check, Calendar, Clock, Video, MapPin, Crown, CreditCard, ShieldCheck, Download, Sparkles, AlertCircle, FileText, Smartphone } from 'lucide-react';

export default function BookingModal({ expert, initialDate, initialSlot, onClose, onBookingSuccess }) {
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState('virtual');
  const [selectedDate, setSelectedDate] = useState(initialDate || '2026-10-01');
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || '');
  
  // Step 2 Form
  const [patientName, setPatientName] = useState('Alex Mercer');
  const [patientEmail, setPatientEmail] = useState('alex.mercer@example.com');
  const [patientPhone, setPatientPhone] = useState('+1 (555) 234-5678');
  const [reason, setReason] = useState('');
  
  // Step 3 Payment & Promo
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  // Confirmation result
  const [completedBooking, setCompletedBooking] = useState(null);

  const isDoctor = expert.type === 'doctor';
  const availableDates = Object.keys(expert.slots || {});
  const slotsForDate = expert.slots[selectedDate] || [];

  useEffect(() => {
    if (!selectedSlot && slotsForDate.length > 0) {
      setSelectedSlot(slotsForDate[0]);
    }
  }, [selectedDate]);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VIP10' || promoCode.trim().toUpperCase() === 'HEALTH2026') {
      const discount = Math.round(expert.fee * 0.15); // 15% off
      setDiscountAmount(discount);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "VIP10" or "HEALTH2026" for 15% discount!');
    }
  };

  const finalTotal = expert.fee - discountAmount;

  const handleCompletePayment = (e) => {
    e.preventDefault();
    if (!patientName || !patientEmail || !patientPhone) {
      alert('Please fill in your contact information.');
      return;
    }

    const bookingId = `APPT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      bookingId,
      expertId: expert.id,
      expertName: expert.name,
      expertTitle: expert.title,
      type: expert.type,
      consultationType,
      consultationTypeLabel: consultationType === 'virtual' ? 'Virtual HD Video Call' : consultationType === 'in-person' ? 'In-Person Clinic Visit' : 'VIP Executive Lounge',
      date: selectedDate,
      time: selectedSlot,
      fee: finalTotal,
      status: 'Upcoming',
      patientName,
      patientEmail,
      patientPhone,
      reason: reason || 'General Consultation & Strategic Session',
      qrCodeData: `${bookingId}-${expert.name.replaceAll(' ', '')}-${selectedDate}`,
      avatar: expert.avatar
    };

    setCompletedBooking(newBooking);
    setStep(4);

    // Fire Confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    onBookingSuccess(newBooking);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-700 shadow-2xl relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Header Indicator */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span className={step >= 1 ? 'text-cyan-400' : ''}>1. Format & Time</span>
              <span className={step >= 2 ? 'text-cyan-400' : ''}>2. Client Info</span>
              <span className={step >= 3 ? 'text-cyan-400' : ''}>3. Secure Checkout</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Expert Brief Summary Card */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 mb-6">
          <img 
            src={expert.avatar} 
            alt={expert.name} 
            className={`w-12 h-12 rounded-xl object-cover border ${
              isDoctor ? 'border-emerald-500/50' : 'border-amber-500/50'
            }`}
          />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-100">{expert.name}</h4>
            <p className="text-xs text-slate-400">{expert.title}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Rate:</span>
            <div className="text-sm font-bold text-emerald-400">{expert.currency}{expert.fee}</div>
          </div>
        </div>

        {/* STEP 1: Format & Time */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-extrabold text-slate-100">Step 1: Choose Consultation Format & Slot</h3>
            
            {/* Consultation Types */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Consultation Format</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('virtual')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    consultationType === 'virtual'
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Video className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-xs font-bold text-slate-100">Virtual HD Video Call</div>
                  <div className="text-[10px] text-slate-400">Encrypted 1-on-1 link sent to email</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('in-person')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    consultationType === 'in-person'
                      ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-xs font-bold text-slate-100">Clinic / Office Visit</div>
                  <div className="text-[10px] text-slate-400">{expert.location}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('vip-lounge')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    consultationType === 'vip-lounge'
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Crown className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="text-xs font-bold text-slate-100">VIP Private Lounge</div>
                  <div className="text-[10px] text-slate-400">Concierge priority check-in</div>
                </button>
              </div>
            </div>

            {/* Date selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {availableDates.map((dateStr) => (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedDate === dateStr
                        ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {dateStr}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Select Time Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {slotsForDate.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      selectedSlot === slot
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md ring-1 ring-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                disabled={!selectedSlot}
                onClick={() => setStep(2)}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Client Info →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Client Details */}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-100">Step 2: Patient / Client Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-900 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Email Address (For Consultation Link)</label>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full bg-slate-900 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Phone Number (SMS Reminders)</label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">
                Consultation Reason / Medical Summary / Advisory Goals
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what you'd like to discuss during your session..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
              ></textarea>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All details are encrypted and strictly protected under global privacy standards.</span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary text-xs"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Proceed to Checkout →
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Secure Checkout */}
        {step === 3 && (
          <form onSubmit={handleCompletePayment} className="space-y-5">
            <h3 className="text-lg font-extrabold text-slate-100">Step 3: Secure Payment & Confirmation</h3>

            {/* Order Summary Box */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Consultation Fee</span>
                <span className="font-bold">{expert.currency}{expert.fee}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Promo Discount (15% OFF)</span>
                  <span>-{expert.currency}{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>HIPAA & VIP Booking Processing</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-extrabold text-slate-100">
                <span>Total Amount Due</span>
                <span className="text-lg text-emerald-400">{expert.currency}{finalTotal}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Promo code (e.g. VIP10 or HEALTH2026)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-slate-900 text-slate-100 px-3.5 py-2 rounded-xl border border-slate-700 text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="btn-secondary text-xs py-2"
              >
                Apply Code
              </button>
            </div>

            {/* Payment Method Simulator */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Payment Method</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'card' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4" /> Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'apple' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                   Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'upi' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4" /> Instant UPI / Bank
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-950 text-slate-100 px-3 py-2 rounded-xl border border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Expiry Date</label>
                      <input type="text" defaultValue="12/28" className="w-full bg-slate-950 text-slate-100 px-3 py-2 rounded-xl border border-slate-700 text-xs font-mono" />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">CVC / CVV</label>
                      <input type="password" defaultValue="888" className="w-full bg-slate-950 text-slate-100 px-3 py-2 rounded-xl border border-slate-700 text-xs font-mono" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-secondary text-xs"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="btn-gold font-bold"
              >
                Confirm & Pay {expert.currency}{finalTotal} ✓
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success & Printable Pass */}
        {step === 4 && completedBooking && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Appointment Confirmed</span>
              <h2 className="text-2xl font-extrabold text-slate-100 mt-1">
                You're All Set! 🎉
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Booking Reference ID: <strong className="text-cyan-300">{completedBooking.bookingId}</strong>
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 text-left space-y-3 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Official Booking Pass</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
                  {completedBooking.consultationTypeLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Specialist:</span>
                  <div className="font-bold text-slate-100">{completedBooking.expertName}</div>
                  <div className="text-[11px] text-slate-400">{completedBooking.expertTitle}</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Client / Patient:</span>
                  <div className="font-bold text-slate-100">{completedBooking.patientName}</div>
                  <div className="text-[11px] text-slate-400">{completedBooking.patientEmail}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800/60">
                <div>
                  <span className="text-slate-400 text-[11px]">Scheduled Date & Time:</span>
                  <div className="font-bold text-cyan-300">📅 {completedBooking.date}</div>
                  <div className="font-bold text-emerald-400">⏰ {completedBooking.time}</div>
                </div>

                {/* Simulated QR Code */}
                <div className="flex flex-col items-center justify-center bg-white p-2 rounded-xl">
                  <div className="w-16 h-16 bg-slate-900 rounded p-1 text-[8px] text-emerald-400 font-mono flex items-center justify-center text-center break-all">
                    [QR-CODE-{completedBooking.bookingId}]
                  </div>
                  <span className="text-[8px] text-slate-800 font-bold mt-1">Scan for Check-in</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Calendar invite downloaded for ${completedBooking.expertName} on ${completedBooking.date} at ${completedBooking.time}`);
                }}
                className="btn-secondary text-xs"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                Add to Calendar (.ics)
              </button>

              <button
                onClick={() => window.print()}
                className="btn-secondary text-xs"
              >
                <Download className="w-4 h-4 text-amber-400" />
                Print / Save Pass PDF
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="btn-primary w-full"
              >
                Done & Return to Home
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
