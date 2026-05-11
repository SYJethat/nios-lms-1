'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Maximize2,
  Minimize2,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface AICallInterfaceProps {
  onEndCall: () => void;
  userName: string;
}

export default function AICallInterface({ onEndCall, userName }: AICallInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'speaking' | 'listening'>('connecting');
  const [transcription, setTranscription] = useState('');
  const [callTime, setCallTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => setStatus('connected'), 2000);

    const interval = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);

    // Mock AI conversation flow
    const convoTimers = [
      setTimeout(() => {
        setStatus('speaking');
        setTranscription(`Hello ${userName}! I'm Aura, your NIOS AI Tutor. How can I help you today?`);
      }, 4000),
      setTimeout(() => {
        setStatus('listening');
        setTranscription('');
      }, 9000),
      setTimeout(() => {
        setStatus('speaking');
        setTranscription("That's a great question about NewtonsLaws. Let me simplify it for you...");
      }, 15000),
    ];

    // Mock local video feed
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.log("Webcam access denied or unavailable", err));
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      convoTimers.forEach(t => clearTimeout(t));
    };
  }, [userName]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 mt-10 ml-20 rounded-xl h-[90vh] w-[90vw] z-[100] bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-8"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-xl overflow-hidden border border-white/5 shadow-2xl flex">
        {/* Main AI Feed */}
        <div className="relative flex-1 bg-black overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'connecting' ? (
              <motion.div
                key="connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-24 h-24 rounded-full border-4 border-blue-900/20 border-t-blue-900 animate-spin" />
                <div className="text-blue-900 font-black uppercase tracking-[0.2em] text-sm animate-pulse">Establishing Secure Neural Link...</div>
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                <img
                  src="/ai-avatar.png"
                  alt="AI Tutor"
                  className={`w-full h-full object-cover transition-all duration-1000 ${status === 'speaking' ? 'scale-105 opacity-90' : 'scale-100 opacity-60'}`}
                />

                {/* Voice Waveform Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-1 h-32">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={status === 'speaking' ? {
                          height: [20, Math.random() * 100 + 40, 20],
                        } : {
                          height: 8,
                          opacity: 0.3
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + Math.random() * 0.5,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 bg-blue-900 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.5)]"
                      />
                    ))}
                  </div>
                </div>

                {/* AI Info Badge */}
                <div className="absolute top-8 left-8 flex items-center gap-4">
                  <div className="p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Aura AI Tutor · Live</span>
                  </div>
                  <div className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl">
                    <span className="text-white/60 text-[10px] font-black tracking-widest">{formatTime(callTime)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transcription Subtitles */}
          {transcription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8"
            >
              <div className="p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-center">
                <p className="text-white font-medium leading-relaxed italic opacity-90">"{transcription}"</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Status Indicators & Local Feed */}
        <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col p-8 gap-8">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Status</div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === 'listening' ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]' : 'bg-slate-700'}`} />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  {status === 'connecting' ? 'INITIATING...' : status === 'speaking' ? 'AI SPEAKING...' : 'LISTENING TO YOU...'}
                </span>
              </div>
            </div>

            {/* Local Video Feed */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your Feed</div>
              <div className="relative aspect-[4/3] bg-slate-800 rounded-xl overflow-hidden border border-white/10 ring-4 ring-black/20">
                {isVideoEnabled ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale brightness-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                    <VideoOff size={32} />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg text-[8px] font-black text-white/60 uppercase tracking-widest">You (Class 10)</div>
              </div>
            </div>

            {/* Voice Visualization for User */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Input Analysis</div>
              <div className="flex items-end gap-1 h-8 opacity-40">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={status === 'listening' ? {
                      height: [4, Math.random() * 20 + 8, 4],
                    } : { height: 4 }}
                    transition={{ repeat: Infinity, duration: 0.3 }}
                    className="flex-1 bg-white rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-xl flex items-center justify-center transition-all ${isMuted ? 'bg-blue-500 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`p-4 rounded-xl flex items-center justify-center transition-all ${!isVideoEnabled ? 'bg-slate-700 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
            >
              {isVideoEnabled ? <VideoIcon size={20} /> : <VideoOff size={20} />}
            </button>
            <button
              onClick={onEndCall}
              className="col-span-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              <PhoneOff size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Dissolve Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sparkles Decoration */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="mt-8 flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl"
      >
        <Sparkles size={16} className="text-blue-900" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Quantum AI Processing Active</span>
      </motion.div>
    </motion.div>
  );
}
