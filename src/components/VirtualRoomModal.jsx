import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, FileText, ShieldCheck, Sparkles, Send, User } from 'lucide-react';

export default function VirtualRoomModal({ appointment, onClose }) {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: 'Encrypted 256-Bit Telehealth Room Established.' },
    { sender: appointment.expertName, text: `Hello! Welcome to our session. I am reviewing your notes now.` }
  ]);
  const [inputText, setInputText] = useState('');
  const [notesText, setNotesText] = useState('Consultation Notes:\n- Patient reports regular health updates\n- Recommended follow-up in 4 weeks');
  const [callTimer, setCallTimer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCallTimer(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'You', text: inputText }]);
    setInputText('');
    
    // Auto simulated reply from expert
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: appointment.expertName, 
        text: `Got it! Let's address that right now during our call.` 
      }]);
    }, 1500);
  };

  return (
    <div className="modal-overlay p-2 sm:p-6">
      <div className="glass-panel w-full max-w-5xl h-[88vh] rounded-3xl border border-slate-700 shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Virtual Call Header */}
        <div className="bg-slate-950/90 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <h3 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                <span>Direct HD Call with {appointment.expertName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE
                </span>
              </h3>
              <p className="text-slate-400 text-[11px]">{appointment.expertTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-cyan-300 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              ⏱ {formatTimer(callTimer)}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HIPAA Encrypted</span>
            </div>
          </div>
        </div>

        {/* Video Stage Container */}
        <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
          
          {/* Main Remote Video (Expert Avatar Visualizer) */}
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
            <img 
              src={appointment.avatar || '/assets/doctor_cardiology.png'} 
              alt={appointment.expertName} 
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-cyan-400/40 shadow-2xl animate-pulse"
            />
            
            {/* Audio Wave Visualizer Simulation */}
            <div className="absolute bottom-16 flex items-center gap-1.5">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-10 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-14 bg-amber-400 rounded-full animate-bounce delay-200"></span>
              <span className="w-1.5 h-8 bg-cyan-400 rounded-full animate-bounce delay-150"></span>
            </div>

            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-200">
              🎙️ {appointment.expertName} (Speaking...)
            </div>
          </div>

          {/* User Self Camera Thumbnail (PIP) */}
          <div className="absolute bottom-4 right-4 w-36 h-24 sm:w-48 sm:h-32 rounded-2xl bg-slate-900 border-2 border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center">
            {videoActive ? (
              <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center relative">
                <User className="w-8 h-8 text-cyan-400" />
                <span className="text-[10px] text-slate-400 mt-1 font-semibold">You ({appointment.patientName})</span>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-950 flex items-center justify-center text-xs text-slate-500 font-bold">
                Camera Off
              </div>
            )}
          </div>

          {/* Side Drawer: Chat Box */}
          {chatOpen && (
            <div className="absolute top-0 right-0 w-80 h-full bg-slate-900/95 backdrop-blur border-l border-slate-800 p-4 flex flex-col justify-between z-20">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <h4 className="text-xs font-bold text-slate-200">Session Live Chat</h4>
                <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`text-xs p-2.5 rounded-xl ${
                    msg.sender === 'You' ? 'bg-cyan-600/30 border border-cyan-500/40 ml-4' : 'bg-slate-800/80 mr-4'
                  }`}>
                    <div className="font-bold text-[10px] text-slate-400 mb-0.5">{msg.sender}</div>
                    <div className="text-slate-100">{msg.text}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Type encrypted message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-slate-950 text-slate-100 text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
                />
                <button type="submit" className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Side Drawer: Notes Pad */}
          {notesOpen && (
            <div className="absolute top-0 left-0 w-80 h-full bg-slate-900/95 backdrop-blur border-r border-slate-800 p-4 flex flex-col justify-between z-20">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <h4 className="text-xs font-bold text-slate-200">Consultation Notes</h4>
                <button onClick={() => setNotesOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                className="w-full flex-1 bg-slate-950 text-slate-200 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none font-mono"
              ></textarea>
            </div>
          )}

        </div>

        {/* Video Control Bar */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                chatOpen ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Chat
            </button>

            <button
              onClick={() => setNotesOpen(!notesOpen)}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                notesOpen ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" /> Notes
            </button>
          </div>

          {/* Central Call Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMicActive(!micActive)}
              className={`p-3.5 rounded-full border transition-all ${
                micActive ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-red-500/20 border-red-500 text-red-400'
              }`}
              title="Toggle Microphone"
            >
              {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setVideoActive(!videoActive)}
              className={`p-3.5 rounded-full border transition-all ${
                videoActive ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-red-500/20 border-red-500 text-red-400'
              }`}
              title="Toggle Camera"
            >
              {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <PhoneOff className="w-4 h-4" /> End Call
            </button>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[10px] text-slate-500 font-semibold">100% Encrypted Video</span>
          </div>
        </div>

      </div>
    </div>
  );
}
