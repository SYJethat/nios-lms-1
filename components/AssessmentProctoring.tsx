'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Shield,
   Eye,
   UserCheck,
   AlertTriangle,
   CheckCircle2,
   Camera,
   Maximize2,
   Activity,
   User,
   Zap
} from 'lucide-react';

interface ProctoringEvent {
   id: string;
   type: 'biometric' | 'behavior' | 'system';
   message: string;
   status: 'info' | 'warning' | 'success';
   timestamp: string;
}

export default function AssessmentProctoring() {
   const [isExpanded, setIsExpanded] = useState(false);
   const [isWebcamActive, setIsWebcamActive] = useState(true);
   const [events, setEvents] = useState<ProctoringEvent[]>([
      { id: '1', type: 'system', message: 'Browser lockdown engaged', status: 'success', timestamp: '10:01' },
      { id: '2', type: 'biometric', message: 'Identity verified via biometrics', status: 'success', timestamp: '10:02' },
   ]);
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      // Simulate events
      const timers = [
         setTimeout(() => {
            setEvents(prev => [{ id: '3', type: 'behavior', message: 'Analyzing gaze patterns...', status: 'info', timestamp: '10:05' }, ...prev]);
         }, 5000),
         setTimeout(() => {
            setEvents(prev => [{ id: '4', type: 'biometric', message: 'Identity check passed', status: 'success', timestamp: '10:15' }, ...prev]);
         }, 15000),
      ];

      // Mock local video feed
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
         navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
               if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch(() => setIsWebcamActive(false));
      }

      return () => timers.forEach(t => clearTimeout(t));
   }, []);

   return (
      <div className={`fixed bottom-8 left-8 z-50 transition-all duration-500 ${isExpanded ? 'w-80' : 'w-48'}`}>
         <div className="bg-slate-900 rounded-xl shadow-2xl border border-white/10 overflow-hidden ring-8 ring-black/10">
            <div className="relative aspect-video bg-slate-800">
               {isWebcamActive ? (
                  <video
                     ref={videoRef}
                     autoPlay
                     muted
                     playsInline
                     className="w-full h-full object-cover scale-x-[-1]"
                  />
               ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                     <User size={48} className="text-white/10" />
                  </div>
               )}

               {/* AI Overlay Mockup */}
               <div className="absolute inset-0 pointer-events-none border-2 border-blue-900/20 animate-pulse" />
               <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 rounded-full text-[6px] font-black text-white uppercase tracking-widest z-10">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> REC · LIVE
               </div>

               <div className="absolute bottom-2 right-2 flex gap-1">
                  <div className="w-5 h-5 rounded-lg bg-black/60 flex items-center justify-center text-emerald-400">
                     <UserCheck size={10} />
                  </div>
                  <div className="w-5 h-5 rounded-lg bg-black/60 flex items-center justify-center text-blue-400">
                     <Zap size={10} />
                  </div>
               </div>
            </div>

            <div className="p-4 space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Shield size={14} className="text-blue-900" />
                     <span className="text-[8px] font-black text-white uppercase tracking-widest">AI Proctoring</span>
                  </div>
                  <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/40 hover:text-white">
                     <Maximize2 size={12} />
                  </button>
               </div>

               {isExpanded && (
                  <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     className="space-y-3 pt-2 border-t border-white/5"
                  >
                     <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                           <div className="text-[6px] font-black text-white/40 uppercase mb-1">Confidence</div>
                           <div className="text-xs font-black text-emerald-400">98%</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                           <div className="text-[6px] font-black text-white/40 uppercase mb-1">State</div>
                           <div className="text-xs font-black text-blue-400">Secure</div>
                        </div>
                     </div>

                     <div className="space-y-2 max-h-32 overflow-y-auto pr-2 scrollbar-hide">
                        <AnimatePresence initial={false}>
                           {events.map((e) => (
                              <motion.div
                                 key={e.id}
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 className="flex items-start gap-2 p-2 bg-white/5 rounded-lg text-[7px]"
                              >
                                 {e.status === 'warning' ? <AlertTriangle size={10} className="text-blue-400 mt-0.5" /> : e.status === 'success' ? <CheckCircle2 size={10} className="text-emerald-400 mt-0.5" /> : <Activity size={10} className="text-blue-400 mt-0.5" />}
                                 <div className="flex-1">
                                    <div className="text-white font-bold">{e.message}</div>
                                    <div className="text-white/30">{e.timestamp}</div>
                                 </div>
                              </motion.div>
                           ))}
                        </AnimatePresence>
                     </div>
                  </motion.div>
               )}
            </div>
         </div>
      </div>
   );
}
