'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Play, FileText, PenTool, BookOpen, Video, Calendar, Download,
   ChevronLeft, ChevronRight, Eye, ThumbsUp, Upload, Save,
   FileOutput, Bot, Languages, Type, Volume2, Moon, Sun,
   Sparkles, X, MessageSquare, List, Info, Share2,
   CheckCircle, Lock, Award, BarChart2, Headphones, BookMarked,
   ClipboardList, Trophy, Star, AlertCircle,
   Globe,
   ArrowRight
} from 'lucide-react';
import { MOCK_COURSES } from '@/lib/mock-data';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// ─── Lesson sidebar data (unchanged) ───────────────────────────────────────
const lessons = [
   { id: 1, title: 'Introduction to Motion', type: 'video', duration: '18 min', done: true },
   { id: 2, title: 'Newton\'s Laws of Motion', type: 'video', duration: '24 min', done: true },
   { id: 3, title: 'SLM Reading: Force & Types', type: 'pdf', duration: '15 min', done: true },
   { id: 4, title: 'Practice Quiz – Laws of Motion', type: 'quiz', duration: '10 min', done: false },
   { id: 5, title: 'Friction & Its Applications', type: 'video', duration: '20 min', done: false },
   { id: 6, title: 'Concept Map: Energy Types', type: 'flipbook', duration: '12 min', done: false },
   { id: 7, title: 'Live Q&A Session (Recording)', type: 'live', duration: '45 min', done: false },
   { id: 8, title: 'Unit Assessment', type: 'quiz', duration: '30 min', done: false },
];

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
   video: Play, pdf: FileText, quiz: PenTool, flipbook: BookOpen, live: Video,
};

const tabs = ['Overview', 'Notes', 'Resources', 'Discussion', 'TMA'];

const getEmbedUrl = (url: string) => {
   if (!url) return '';
   if (url.includes('youtube.com/embed/')) return url;
   let videoId = '';
   if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split(/[?#]/)[0];
   } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URL(url).searchParams;
      videoId = urlParams.get('v') || '';
   }
   return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

// ─── Learning-flow stage definitions ───────────────────────────────────────
const LEARNING_STAGES = [
   { id: 'video',      label: 'Video Lesson',         icon: Play,          color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100' },
   { id: 'mcq',        label: 'MCQ Assessment',        icon: ClipboardList, color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
   { id: 'reading',    label: 'Reading Assessment',    icon: BookMarked,    color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
   { id: 'listening',  label: 'Listening Assessment',  icon: Headphones,    color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
   { id: 'writing',    label: 'Writing Assessment',    icon: PenTool,       color: 'text-pink-600',   bg: 'bg-pink-50',   border: 'border-pink-100' },
   { id: 'report',     label: 'Performance Report',    icon: BarChart2,     color: 'text-slate-600',  bg: 'bg-slate-50',  border: 'border-slate-100' },
   { id: 'certificate',label: 'Certificate',           icon: Trophy,        color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-100' },
];

// ─── Quiz data ──────────────────────────────────────────────────────────────
const MCQ_QUESTIONS = [
   {
      q: "According to Newton's First Law, an object at rest will…",
      opts: ['Slowly drift away', 'Remain at rest unless acted on by an external force', 'Accelerate continuously', 'Lose energy over time'],
      ans: 1,
      exp: "Newton's First Law (Law of Inertia): objects maintain their state unless acted on by a net external force.",
   },
   {
      q: 'A 10 kg object accelerates at 5 m/s². What is the net force acting on it?',
      opts: ['2 N', '15 N', '50 N', '0.5 N'],
      ans: 2,
      exp: 'F = ma = 10 × 5 = 50 N',
   },
   {
      q: "Newton's Third Law states that every action has…",
      opts: ['A larger opposite reaction', 'An equal and opposite reaction', 'A delayed reaction', 'A parallel reaction'],
      ans: 1,
      exp: 'Equal and opposite — forces always occur in pairs acting on different objects.',
   },
   {
      q: 'Which scenario best demonstrates inertia?',
      opts: ['A rocket launching', 'A passenger lurching forward when a bus brakes', 'A ball rolling downhill', 'A spring stretching'],
      ans: 1,
      exp: "Passengers lurch forward because their bodies resist the change in motion — classic inertia.",
   },
   {
      q: 'If mass doubles but net force stays constant, acceleration…',
      opts: ['Doubles', 'Stays the same', 'Halves', 'Quadruples'],
      ans: 2,
      exp: 'From F = ma → a = F/m. Double the mass at constant F → acceleration halves.',
   },
];

const READING_PASSAGE = `Newton's First Law of Motion, commonly known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced external force.

In everyday life, inertia manifests in countless ways. When a bus suddenly brakes, passengers lurch forward — their bodies tend to continue moving at the original speed. Seat belts exist precisely to counteract this inertial tendency by applying an external braking force on the passenger.

Newton's Second Law establishes the quantitative relationship between force, mass, and acceleration: F = ma. A heavier object requires a greater force to achieve the same acceleration as a lighter one. This relationship explains why pushing a loaded truck requires far more effort than pushing a bicycle.

The Third Law — "For every action, there is an equal and opposite reaction" — underpins technologies from rocket propulsion to everyday walking. When you push against the ground with your foot, the ground pushes back with equal force, propelling you forward.`;

const READING_QUESTIONS = [
   { q: "What is Newton's First Law also known as?", opts: ["Second Law", "Law of Gravity", "Law of Inertia", "Law of Reaction"], ans: 2, exp: "Newton's First Law is called the Law of Inertia." },
   { q: 'Why do seat belts exist, according to the passage?', opts: ['Legal requirement', 'To apply an external braking force', 'To restrict movement always', 'Fashion accessory'], ans: 1, exp: 'Seat belts apply an external braking force to counteract inertia.' },
   { q: 'F = ma is the formula from which law?', opts: ['First Law', 'Third Law', 'Law of Gravity', 'Second Law'], ans: 3, exp: "Newton's Second Law: F = ma" },
   { q: 'Rockets move upward because of which principle?', opts: ['First Law', 'Second Law', 'Third Law', 'Conservation of Energy'], ans: 2, exp: 'Third Law: exhaust expelled downward → rocket moves upward (equal and opposite reaction).' },
];

const LISTENING_QUESTIONS = [
   { q: 'In the audio example, what was the mass of the block?', opts: ['2 kg', '5 kg', '10 kg', '20 kg'], ans: 1, exp: 'The audio mentions a 5 kg block.' },
   { q: 'What net force was applied to the block?', opts: ['5 N', '10 N', '20 N', '40 N'], ans: 2, exp: '20 Newtons was stated in the audio example.' },
   { q: 'The resulting acceleration of the block was:', opts: ['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²'], ans: 1, exp: 'a = F/m = 20/5 = 4 m/s²' },
];

const WRITING_TASKS = [
   { title: 'Short Answer', prompt: "Explain Newton's Third Law in your own words and give two real-world examples not mentioned in the lesson.", minWords: 80 },
   { title: 'Problem Solving', prompt: 'A car of mass 1 200 kg accelerates from rest to 20 m/s in 8 seconds. Calculate the net force, identify the friction type, and state all assumptions.', minWords: 50 },
   { title: 'Critical Thinking', prompt: 'Imagine you are an astronaut in deep space far from any gravitational field. Describe how Newtons Laws govern your motion if you push off a wall.', minWords: 100 },
];

// ─── Helper ──────────────────────────────────────────────────────────────────
const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Shared answer-option button used by MCQ / Reading / Listening */
function AnswerOption({
   label, text, state, onClick,
}: { label: string; text: string; state: 'idle' | 'selected' | 'correct' | 'wrong'; onClick: () => void }) {
   const base = 'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all';
   const variants: Record<string, string> = {
      idle:     'bg-white border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 text-slate-700 cursor-pointer',
      selected: 'bg-blue-50 border-blue-300 text-blue-900 cursor-pointer',
      correct:  'bg-emerald-50 border-emerald-300 text-emerald-800 cursor-default',
      wrong:    'bg-red-50 border-red-300 text-red-700 cursor-default',
   };
   return (
      <button className={`${base} ${variants[state]}`} onClick={onClick} disabled={state === 'correct' || state === 'wrong'}>
         <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0
            ${state === 'idle' ? 'bg-slate-100 text-slate-500' :
              state === 'selected' ? 'bg-blue-900 text-white' :
              state === 'correct' ? 'bg-emerald-500 text-white' : 'bg-red-400 text-white'}`}>
            {label}
         </span>
         <span className="text-xs font-semibold">{text}</span>
         {state === 'correct' && <CheckCircle size={16} className="ml-auto text-emerald-500 shrink-0" />}
         {state === 'wrong'   && <X size={16} className="ml-auto text-red-400 shrink-0" />}
      </button>
   );
}

/** Mini step-tracker shown above each assessment panel */
function StageTracker({ current, total, label }: { current: number; total: number; label: string }) {
   return (
      <div className="flex items-center gap-3 mb-6">
         <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all ${i < current ? 'bg-emerald-500 w-6' : i === current ? 'bg-blue-900 w-8' : 'bg-slate-200 w-4'}`} />
            ))}
         </div>
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
   );
}

/** Feedback box after answering */
function FeedbackBox({ correct, explanation }: { correct: boolean; explanation: string }) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 6 }}
         animate={{ opacity: 1, y: 0 }}
         className={`mt-4 p-4 rounded-xl flex gap-3 text-xs leading-relaxed font-medium
            ${correct ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-red-50 border border-red-100 text-red-700'}`}
      >
         {correct ? <CheckCircle size={16} className="shrink-0 mt-0.5 text-emerald-500" /> : <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />}
         <span><strong>{correct ? 'Correct! ' : 'Not quite. '}</strong>{explanation}</span>
      </motion.div>
   );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function CoursePlayerPage() {
   const { user, updateLinguisticProfile } = useAuth();
   const params = useParams();
   const id = params.id as string;
   const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];

   // ── Original state (untouched) ──
   const [activeTab, setActiveTab] = useState('Overview');
   const [activeLesson, setActiveLesson] = useState(1);
   const [note, setNote] = useState('');
   const [fontSize, setFontSize] = useState<'text-sm' | 'text-base' | 'text-lg'>('text-base');
   const [isISLEnabled, setIsISLEnabled] = useState(false);
   const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState(false);
   const [isReadingAloud, setIsReadingAloud] = useState(false);
   const [language, setLanguage] = useState('English');
   const [showAISummary, setShowAISummary] = useState(false);
   const synth = useRef<SpeechSynthesis | null>(null);

   // ── New: learning flow state ──
   const [showLearningFlow, setShowLearningFlow] = useState(false);
   const [flowStage, setFlowStage] = useState(0);           // 0-6
   const [stagesDone, setStagesDone] = useState<boolean[]>(Array(7).fill(false));

   // Video
   const [videoPlaying, setVideoPlaying] = useState(false);
   const [videoProgress, setVideoProgress] = useState(0);
   const videoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

   // MCQ
   const [mcqIndex, setMcqIndex] = useState(0);
   const [mcqSelected, setMcqSelected] = useState<number | null>(null);
   const [mcqSubmitted, setMcqSubmitted] = useState(false);
   const [mcqScore, setMcqScore] = useState(0);
   const [mcqDone, setMcqDone] = useState(false);

   // Reading
   const [readIdx, setReadIdx] = useState(0);
   const [readSelected, setReadSelected] = useState<number | null>(null);
   const [readSubmitted, setReadSubmitted] = useState(false);
   const [readScore, setReadScore] = useState(0);
   const [readDone, setReadDone] = useState(false);

   // Listening
   const [listenIdx, setListenIdx] = useState(0);
   const [listenSelected, setListenSelected] = useState<number | null>(null);
   const [listenSubmitted, setListenSubmitted] = useState(false);
   const [listenScore, setListenScore] = useState(0);
   const [listenDone, setListenDone] = useState(false);
   const [audioPlaying, setAudioPlaying] = useState(false);
   const [audioProgress, setAudioProgress] = useState(0);
   const audioTimer = useRef<ReturnType<typeof setInterval> | null>(null);

   // Writing
   const [writings, setWritings] = useState(['', '', '']);
   const [writingSubmitted, setWritingSubmitted] = useState(false);

   useEffect(() => {
      synth.current = window.speechSynthesis;
      return () => { synth.current?.cancel(); };
   }, []);

   const handleReadAloud = () => {
      if (isReadingAloud) { synth.current?.cancel(); setIsReadingAloud(false); }
      else {
         const u = new SpeechSynthesisUtterance(course.transcript || '');
         u.onend = () => setIsReadingAloud(false);
         synth.current?.speak(u);
         setIsReadingAloud(true);
      }
   };
   const toggleFontSize = () => {
      const sizes: ('text-sm' | 'text-base' | 'text-lg')[] = ['text-sm', 'text-base', 'text-lg'];
      setFontSize(sizes[(sizes.indexOf(fontSize) + 1) % sizes.length]);
   };

   // ── Video simulation ──
   const startVideo = () => {
      setVideoPlaying(true);
      videoTimer.current = setInterval(() => {
         setVideoProgress(p => {
            if (p >= 100) {
               clearInterval(videoTimer.current!);
               markVideoDone();
               return 100;
            }
            return p + 0.5;
         });
      }, 150);
   };
   const markVideoDone = () => {
      setVideoProgress(100);
      setVideoPlaying(false);
      clearInterval(videoTimer.current!);
      markStageDone(0);
   };

   // ── Stage helpers ──
   const markStageDone = (idx: number) => {
      setStagesDone(prev => { const n = [...prev]; n[idx] = true; return n; });
   };
   const goNextStage = () => {
      const next = flowStage + 1;
      if (next < LEARNING_STAGES.length) {
         setFlowStage(next);
         // reset per-question state when entering a new quiz stage
         if (next === 1) { setMcqIndex(0); setMcqSelected(null); setMcqSubmitted(false); setMcqScore(0); setMcqDone(false); }
         if (next === 2) { setReadIdx(0); setReadSelected(null); setReadSubmitted(false); setReadScore(0); setReadDone(false); }
         if (next === 3) { setListenIdx(0); setListenSelected(null); setListenSubmitted(false); setListenScore(0); setListenDone(false); }
      }
   };

   // ── MCQ logic ──
   const submitMCQ = () => {
      if (mcqSelected === null) return;
      const correct = mcqSelected === MCQ_QUESTIONS[mcqIndex].ans;
      setMcqSubmitted(true);
      if (correct) setMcqScore(s => s + 1);
   };
   const nextMCQ = () => {
      if (mcqIndex < MCQ_QUESTIONS.length - 1) {
         setMcqIndex(i => i + 1); setMcqSelected(null); setMcqSubmitted(false);
      } else {
         setMcqDone(true); markStageDone(1);
      }
   };

   // ── Reading logic ──
   const submitReading = () => {
      if (readSelected === null) return;
      const correct = readSelected === READING_QUESTIONS[readIdx].ans;
      setReadSubmitted(true);
      if (correct) setReadScore(s => s + 1);
   };
   const nextReading = () => {
      if (readIdx < READING_QUESTIONS.length - 1) {
         setReadIdx(i => i + 1); setReadSelected(null); setReadSubmitted(false);
      } else {
         setReadDone(true); markStageDone(2);
      }
   };

   // ── Listening logic ──
   const toggleAudio = () => {
      if (audioPlaying) {
         clearInterval(audioTimer.current!);
         setAudioPlaying(false);
      } else {
         setAudioPlaying(true);
         audioTimer.current = setInterval(() => {
            setAudioProgress(p => {
               if (p >= 100) { clearInterval(audioTimer.current!); setAudioPlaying(false); return 100; }
               return p + 0.4;
            });
         }, 150);
      }
   };
   const submitListening = () => {
      if (listenSelected === null) return;
      const correct = listenSelected === LISTENING_QUESTIONS[listenIdx].ans;
      setListenSubmitted(true);
      if (correct) setListenScore(s => s + 1);
   };
   const nextListening = () => {
      if (listenIdx < LISTENING_QUESTIONS.length - 1) {
         setListenIdx(i => i + 1); setListenSelected(null); setListenSubmitted(false);
      } else {
         setListenDone(true); markStageDone(3);
      }
   };

   // ── Writing logic ──
   const allWritingMet = WRITING_TASKS.every((t, i) => wordCount(writings[i]) >= t.minWords);
   const submitWriting = () => { setWritingSubmitted(true); markStageDone(4); markStageDone(5); };

   // ── Computed overall score ──
   const overallScore = Math.round(
      (mcqScore / MCQ_QUESTIONS.length * 100 + readScore / READING_QUESTIONS.length * 100 +
       listenScore / LISTENING_QUESTIONS.length * 100 + (writingSubmitted ? 80 : 0)) / 4
   );
   const scoreRing = Math.max(0, Math.min(100, overallScore || 80));
   const circumference = 2 * Math.PI * 52;
   const dashOffset = circumference - (scoreRing / 100) * circumference;

   // ── Option state helper ──
   const optionState = (
      selected: number | null, submitted: boolean, correctAns: number, optIdx: number
   ): 'idle' | 'selected' | 'correct' | 'wrong' => {
      if (!submitted) return selected === optIdx ? 'selected' : 'idle';
      if (optIdx === correctAns) return 'correct';
      if (optIdx === selected) return 'wrong';
      return 'idle';
   };

   // ════════════════════════════════════════════════════════════════════════
   // RENDER
   // ════════════════════════════════════════════════════════════════════════
   return (
      <DashboardLayout
         title={course.title}
         subtitle={`${course.level} · ${course.teacher} · ${course.lessons} Lessons`}
      >
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start pb-20">

            {/* ── Main Player Area ── */}
            <div className="space-y-8">

               {/* Header Actions & ID */}
               <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                     <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                        ID: {course.id.toUpperCase()}
                     </div>
                     <span className="w-1 h-1 bg-slate-200 rounded-full" />
                     <div className="flex gap-2">
                        <span className="badge bg-blue-900/10 text-blue-900 border-blue-900/20 font-black uppercase tracking-widest px-3 py-1.5 text-[8px] rounded-lg">
                           AI ENHANCED
                        </span>
                        <span className="badge bg-emerald-50 text-emerald-600 border-emerald-100 font-black uppercase tracking-widest px-3 py-1.5 text-[8px] rounded-lg">
                           LIVE SUPPORT
                        </span>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-900 hover:border-blue-100 transition-all shadow-sm">
                        <Share2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
                     </button>
                     <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm"><Calendar size={18} /></button>
                  </div>
               </div>
                {/* Multilingual Onboarding Card */}
               <div className="p-10 rounded-[32px] bg-white border-2 border-blue-900/5 shadow-2xl shadow-blue-900/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000" />
                  <div className="relative z-10 space-y-8">
                     <div className="flex items-start justify-between gap-6">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-[9px] font-black uppercase tracking-[0.2em] w-fit">
                              <Sparkles size={10} /> Enrollment Success
                           </div>
                           <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                              🎓 Welcome to the <span className="text-blue-900">Multilingual Learning Platform!</span>
                           </h2>
                           <p className="text-slate-400 text-sm font-medium italic">
                              You have successfully enrolled in your selected course. Now, personalize your experience.
                           </p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-blue-900 flex items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                           <Globe size={32} />
                        </div>
                     </div>

                     <div className="pt-8 border-t border-slate-50 space-y-6">
                        <div className="space-y-1">
                           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">🌍 Choose Your Learning Language</h3>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available in 22 Indian languages with 484 pair combinations.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                           {/* Source Selection */}
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">1. Source Language (I know)</label>
                              <select 
                                 value={user?.motherLang || ''}
                                 onChange={(e) => updateLinguisticProfile(e.target.value)}
                                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 appearance-none"
                              >
                                 <option value="">Select Language</option>
                                 {['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Sanskrit', 'Kashmiri', 'Konkani', 'Maithili', 'Manipuri', 'Nepali', 'Bodo', 'Santali', 'Dogri'].map(l => (
                                    <option key={l} value={l}>{l}</option>
                                 ))}
                              </select>
                           </div>
                           {/* Target Selection */}
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">2. Target Language (Learn)</label>
                              <select 
                                 value={user?.targetLang || ''}
                                 onChange={(e) => updateLinguisticProfile(user?.motherLang || null, e.target.value)}
                                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 appearance-none"
                              >
                                 <option value="">Select Language</option>
                                 {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Sanskrit', 'Kashmiri', 'Konkani', 'Maithili', 'Manipuri', 'Nepali', 'Bodo', 'Santali', 'Dogri'].map(l => (
                                    <option key={l} value={l}>{l}</option>
                                 ))}
                              </select>
                           </div>
                        </div>

                        <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/30 hover:bg-blue-900 transition-all active:scale-95 flex items-center justify-center gap-3">
                           🚀 Start personalized multilingual journey <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>
               </div>

               {/* Player Hub */}
               <div className="relative group">
                  <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video shadow-2xl border border-slate-800 relative ring-8 ring-white/50">
                     {activeLesson === 6 ? (
                        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-12">
                           <div className="text-white text-center space-y-4">
                              <BookOpen size={48} className="mx-auto text-blue-900" />
                              <h4 className="font-black uppercase tracking-widest text-sm">Interactive FlipBook Active</h4>
                              <p className="text-slate-500 text-[10px] max-w-xs mx-auto">Open the library to view full 3D interactive version of this SLM.</p>
                              <button className="px-8 py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20">Expand Content</button>
                           </div>
                        </div>
                     ) : (
                        <iframe
                           src={getEmbedUrl(course.videoUrl || '')}
                           className="w-full h-full border-0"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                        />
                     )}

                     {isISLEnabled && (
                        <div className="absolute bottom-16 right-8 w-40 aspect-video bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-right-8">
                           <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <Video className="text-blue-900 opacity-40" />
                              <div className="absolute top-2 left-2 text-[8px] font-black text-white uppercase tracking-widest bg-blue-900 px-2 py-0.5 rounded-full">ISL FEED</div>
                           </div>
                        </div>
                     )}

                     {isSubtitlesEnabled && (
                        <div className="absolute bottom-20 left-10 right-10 p-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 animate-in slide-in-from-bottom-4 duration-500">
                           <p className="text-white text-center text-sm font-medium leading-relaxed italic opacity-90">
                              "...{course.transcript?.substring(0, 150)}..."
                           </p>
                        </div>
                     )}

                     <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-4">
                           <button className="text-white hover:text-blue-900"><Play fill="currentColor" /></button>
                           <div className="text-[10px] font-black text-white/60 tracking-widest">08:24 / 18:40</div>
                        </div>
                        <div className="flex items-center gap-4">
                           <button className="text-xs font-black text-white/60 hover:text-white">1.0X</button>
                           <button className="text-xs font-black text-white/60 hover:text-white uppercase tracking-widest">HD</button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* AI Accessibility Hub */}
               <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <Info size={14} /> Tools
                  </div>
                  <button onClick={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)} className={`btn-pill px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isSubtitlesEnabled ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                     📝 Subtitles
                  </button>
                  <button onClick={() => setIsISLEnabled(!isISLEnabled)} className={`btn-pill px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isISLEnabled ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                     🤟 ISL (Sign)
                  </button>
                  <button onClick={handleReadAloud} className={`btn-pill px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isReadingAloud ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                     🔊 {isReadingAloud ? 'Reading...' : 'Read Aloud'}
                  </button>
                  <div className="h-6 w-px bg-slate-100 mx-2" />
                  {/* <div className="relative group">
                     <button className="px-6 py-3 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-100">
                        <Languages size={14} /> Dub: {language}
                     </button>
                     <div className="absolute top-full mt-2 left-0 w-40 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 opacity-0 group-hover:opacity-100  group-hover:pointer-events-auto transition-all z-30">
                        {['English', 'Hindi', 'Sanskrit', 'Bengali'].map(l => (
                           <button key={l} onClick={() => setLanguage(l)} className="w-full px-4 py-2 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-900 hover:text-white rounded-xl transition-all">
                              {l}
                           </button>
                        ))}
                     </div>
                  </div> */}
                  <button onClick={toggleFontSize} className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all"><Type size={18} /></button>
                  <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all"><Moon size={18} /></button>
                  <button onClick={() => setShowAISummary(!showAISummary)} className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
                     <Sparkles size={24} />
                  </button>
                    <button
                        onClick={() => setShowLearningFlow(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                     >
                        <Play size={12} fill="currentColor" /> Assessment
                     </button>
               </div>

               {/* Bottom Content Tabs */}
               <div className="space-y-6">
                  <div className="flex gap-4 border-b border-slate-100">
                     {tabs.map(t => (
                        <button key={t} onClick={() => setActiveTab(t)}
                           className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === t ? 'text-blue-900' : 'text-slate-400 hover:text-slate-600'}`}>
                           {t}
                           {activeTab === t && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900" />}
                        </button>
                     ))}
                     
                  </div>

                  <div className={`p-8 bg-white rounded-xl border border-slate-100 shadow-sm animate-in fade-in duration-500 ${fontSize}`}>
                     {activeTab === 'Overview' && (
                        <div className="space-y-6">
                           <h3 className="text-2xl font-black text-slate-900 tracking-tight">{course.title}</h3>
                           <p className="text-slate-500 leading-relaxed font-medium">{course.description}</p>
                           <div className="grid grid-cols-2 gap-4">
                              {course.objectives.map((obj: string, i: number) => (
                                 <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100/50">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{obj}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                     {activeTab === 'Notes' && (
                        <div className="space-y-6">
                           <textarea
                              className="w-full h-48 p-6 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all text-slate-600 font-medium placeholder:text-slate-400"
                              placeholder="Take your lesson notes here... AI is listening to key points."
                              value={note} onChange={e => setNote(e.target.value)}
                           />
                           <div className="flex gap-4">
                              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl">Auto-Save Enabled</button>
                              <button className="px-8 py-4 bg-white border border-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all">Export (MD)</button>
                           </div>
                        </div>
                     )}
                     {activeTab === 'Resources' && (
                        <div className="grid md:grid-cols-2 gap-6">
                           {[{ name: 'Unit 1 SLM', type: 'PDF', icon: FileText }, { name: 'Formula Sheet', type: 'IMG', icon: PenTool }].map((r, i) => (
                              <div key={i} className="group p-6 bg-slate-50 hover:bg-white border border-slate-100 rounded-xl flex items-center justify-between transition-all hover:shadow-xl">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform"><r.icon size={20} /></div>
                                    <div>
                                       <div className="text-xs font-black text-slate-900">{r.name}</div>
                                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.type} · 2.4MB</div>
                                    </div>
                                 </div>
                                 <button className="p-3 bg-white text-slate-400 hover:text-slate-900 rounded-xl shadow-sm"><Download size={18} /></button>
                              </div>
                           ))}
                           
                        </div>
                     )}
                     
                  </div>
               </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-8 lg:sticky lg:top-8">
               {showAISummary && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                     className="p-8 bg-slate-900 rounded-xl text-white shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl" />
                     <div className="flex items-center justify-between mb-8">
                        <h4 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                           <Sparkles size={18} className="text-blue-900" /> Gemini Summary
                        </h4>
                        <button onClick={() => setShowAISummary(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
                     </div>
                     <div className="space-y-6">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                           <div className="text-[8px] font-black text-blue-900 uppercase tracking-widest mb-2">Key Concept</div>
                           <p className="text-xs leading-relaxed text-white/80">{course.summary}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                           {['3 Laws Identified', 'Solved Examples included', 'Assignment Help available'].map(t => (
                              <div key={t} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                 <div className="w-1.5 h-1.5 bg-blue-900 rounded-full shadow-[0_0_8px_rgba(255,107,0,1)]" /> {t}
                              </div>
                           ))}
                        </div>
                        <button className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">Deep Dive with AI</button>
                     </div>
                  </motion.div>
               )}

                {/* Curriculum Progress */}
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <span>Course Content</span>
                         <span className="text-slate-900 font-bold">12/24 Lessons</span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden p-0.5">
                         <div className="h-full bg-gradient-to-r from-blue-900 to-blue-600 rounded-full w-1/2" />
                      </div>
                   </div>
                   
                   <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                      {lessons.map(l => (
                         <button key={l.id} onClick={() => setActiveLesson(l.id)}
                            className={`w-full group p-4 flex items-center gap-4 rounded-2xl transition-all ${
                               activeLesson === l.id ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20' : 'hover:bg-slate-50 text-slate-500'
                            }`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                               activeLesson === l.id ? 'bg-blue-900 border-white/10 text-white' : 'bg-white border-slate-100'
                            }`}>
                               {l.done ? (
                                  <CheckCircle size={20} className="text-emerald-500" />
                               ) : (
                                  <div className="relative">
                                     {l.type === 'video' ? <Play size={20} fill={activeLesson === l.id ? 'white' : 'currentColor'} /> : <FileText size={20} />}
                                  </div>
                               )}
                            </div>
                            <div className="text-left min-w-0 flex-1">
                               <div className={`text-[11px] font-black uppercase tracking-tight truncate ${activeLesson === l.id ? 'text-white' : 'text-slate-900'}`}>
                                  {l.title}
                               </div>
                               <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{l.duration}</span>
                                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{l.type}</span>
                                </div>
                            </div>
                            {activeLesson === l.id && (
                               <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            )}
                         </button>
                      ))}
                   </div>

                   <button className="w-full py-5 bg-blue-50 border border-blue-100/50 text-blue-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all shadow-sm active:scale-[0.98]">
                      Download Full Syllabus
                   </button>
                </div>
            </aside>
         </div>

         {/* ══════════════════════════════════════════════════════════════════
             LEARNING FLOW MODAL - FULL SCREEN (LOCKED)
         ══════════════════════════════════════════════════════════════════ */}
         <AnimatePresence>
            {showLearningFlow && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-white flex"   // full viewport, white background, lock interaction
               >
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     className="w-full h-full flex overflow-hidden"
                  >
                     {/* Left navigation - wider for full-screen */}
                     <div className="w-80 bg-slate-900 flex flex-col shrink-0">
                        <div className="p-6 border-b border-slate-800">
                           <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Learning Path</div>
                           <div className="text-sm font-black text-white leading-tight">{course.title}</div>
                        </div>

                        {/* Stage progress bar */}
                        <div className="px-6 pt-4 pb-2">
                           <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
                              <span>Progress</span>
                              <span className="text-white">{stagesDone.filter(Boolean).length}/{LEARNING_STAGES.length}</span>
                           </div>
                           <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                 style={{ width: `${(stagesDone.filter(Boolean).length / LEARNING_STAGES.length) * 100}%` }} />
                           </div>
                        </div>

                        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                           {LEARNING_STAGES.map((s, i) => {
                              const Icon = s.icon;
                              const active = flowStage === i;
                              const done = stagesDone[i];
                              const locked = i > 0 && !stagesDone[i - 1];
                              return (
                                 <button key={s.id}
                                    onClick={() => !locked && setFlowStage(i)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all
                                       ${active ? 'bg-blue-900 text-white' : done ? 'text-slate-300 hover:bg-slate-800' : locked ? 'opacity-40 cursor-not-allowed text-slate-500' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                                       ${active ? 'bg-white/20' : done ? 'bg-emerald-500/20' : 'bg-slate-700'}`}>
                                       {done && !active ? <CheckCircle size={14} className="text-emerald-400" /> : locked ? <Lock size={12} className="text-slate-600" /> : <Icon size={14} />}
                                    </div>
                                    <div className="min-w-0">
                                       <div className="text-[10px] font-black uppercase tracking-wide truncate">{s.label}</div>
                                       {done && <div className="text-[8px] text-emerald-400 font-bold">Completed ✓</div>}
                                    </div>
                                 </button>
                              );
                           })}
                        </nav>

                        <div className="p-4 border-t border-slate-800">
                           <button onClick={() => setShowLearningFlow(false)}
                              className="w-full py-3 bg-slate-800 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
                              ← Back to Course
                           </button>
                        </div>
                     </div>

                     {/* Right content - scrollable area */}
                     <div className="flex-1 overflow-y-auto">
                        <AnimatePresence mode="wait">
                           <motion.div key={flowStage} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="h-full">

                              {/* ── STAGE 0: VIDEO ── */}
                              {flowStage === 0 && (
                                 <div className="p-8 space-y-6">
                                    <div>
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage 1 · Watch</div>
                                       <h2 className="text-xl font-black text-slate-900">Video Lesson</h2>
                                    </div>

                                    {/* Mock video player */}
                                    <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video flex flex-col items-center justify-center relative">
                                       {!videoPlaying && videoProgress === 0 && (
                                          <div className="text-center space-y-4">
                                             <button onClick={startVideo}
                                                className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 transition-all hover:scale-105">
                                                <Play size={24} fill="white" className="text-white ml-1" />
                                             </button>
                                             <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Click to Play · 24:00 min</p>
                                          </div>
                                       )}
                                       {(videoPlaying || videoProgress > 0) && (
                                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                             <div className="text-white text-xs font-bold opacity-60">
                                                {videoProgress < 100 ? 'Lesson playing...' : '✓ Lesson complete'}
                                             </div>
                                             <div className="text-slate-400 text-[10px]">
                                                {Math.round((videoProgress / 100) * 24)}:00 / 24:00
                                             </div>
                                          </div>
                                       )}
                                       {/* Progress bar */}
                                       <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                                          <div className="h-full bg-blue-500 transition-all" style={{ width: `${videoProgress}%` }} />
                                       </div>
                                    </div>

                                    {/* Controls row */}
                                    <div className="flex items-center gap-3">
                                       {videoProgress > 0 && videoProgress < 100 && !videoPlaying && (
                                          <button onClick={startVideo} className="px-5 py-3 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200">
                                             Resume
                                          </button>
                                       )}
                                       <button onClick={markVideoDone}
                                          className="px-5 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                          Mark as Watched ✓
                                       </button>
                                       {stagesDone[0] && (
                                          <span className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                             <CheckCircle size={14} /> Video Complete
                                          </span>
                                       )}
                                    </div>

                                    {/* Objectives */}
                                    <div className="grid grid-cols-2 gap-3">
                                       {course.objectives?.map((obj: string, i: number) => (
                                          <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                             <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 text-[10px]">✓</div>
                                             <span className="text-[10px] font-bold text-slate-700 leading-tight">{obj}</span>
                                          </div>
                                       ))}
                                    </div>

                                    {stagesDone[0] && (
                                       <button onClick={goNextStage} className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all">
                                          Continue to MCQ Assessment →
                                       </button>
                                    )}
                                 </div>
                              )}

                              {/* ── STAGE 1: MCQ ── */}
                              {flowStage === 1 && (
                                 <div className="p-8 space-y-6">
                                    <div>
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage 2 · Quiz</div>
                                       <h2 className="text-xl font-black text-slate-900">MCQ Assessment</h2>
                                    </div>

                                    {!mcqDone ? (
                                       <>
                                          <StageTracker current={mcqIndex} total={MCQ_QUESTIONS.length} label={`Q${mcqIndex + 1} of ${MCQ_QUESTIONS.length}`} />
                                          <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-5">
                                             <p className="text-sm font-bold text-slate-900 leading-relaxed">{MCQ_QUESTIONS[mcqIndex].q}</p>
                                             <div className="space-y-3">
                                                {MCQ_QUESTIONS[mcqIndex].opts.map((opt, i) => (
                                                   <AnswerOption key={i} label={String.fromCharCode(65 + i)} text={opt}
                                                      state={optionState(mcqSelected, mcqSubmitted, MCQ_QUESTIONS[mcqIndex].ans, i)}
                                                      onClick={() => !mcqSubmitted && setMcqSelected(i)} />
                                                ))}
                                             </div>
                                             {mcqSubmitted && <FeedbackBox correct={mcqSelected === MCQ_QUESTIONS[mcqIndex].ans} explanation={MCQ_QUESTIONS[mcqIndex].exp} />}
                                          </div>
                                          <div className="flex justify-between items-center">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                Score: {mcqScore} / {mcqIndex + (mcqSubmitted ? 1 : 0)}
                                             </span>
                                             {!mcqSubmitted ? (
                                                <button onClick={submitMCQ} disabled={mcqSelected === null}
                                                   className="px-8 py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-blue-800 transition-all">
                                                   Submit Answer
                                                </button>
                                             ) : (
                                                <button onClick={nextMCQ} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                                                   {mcqIndex < MCQ_QUESTIONS.length - 1 ? 'Next Question →' : 'Finish Quiz →'}
                                                </button>
                                             )}
                                          </div>
                                       </>
                                    ) : (
                                       /* MCQ result card */
                                       <div className="space-y-6">
                                          <div className="p-8 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-4">
                                             <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                                                <CheckCircle size={32} className="text-emerald-500" />
                                             </div>
                                             <div>
                                                <div className="text-3xl font-black text-slate-900">{mcqScore}/{MCQ_QUESTIONS.length}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">MCQ Score</div>
                                             </div>
                                             <div className={`inline-flex px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest
                                                ${mcqScore / MCQ_QUESTIONS.length >= 0.6 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                                {mcqScore / MCQ_QUESTIONS.length >= 0.6 ? '✓ Passed' : '✗ Below Pass Mark (60%)'}
                                             </div>
                                          </div>
                                          <button onClick={goNextStage} className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all">
                                             Continue to Reading Assessment →
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              )}

                              {/* ── STAGE 2: READING ── */}
                              {flowStage === 2 && (
                                 <div className="p-8 space-y-6">
                                    <div>
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage 3 · Read</div>
                                       <h2 className="text-xl font-black text-slate-900">Reading Assessment</h2>
                                    </div>

                                    {/* Passage */}
                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Passage · Newton's Laws</div>
                                       <div className="text-xs text-slate-600 leading-relaxed space-y-3 max-h-40 overflow-y-auto pr-2">
                                          {READING_PASSAGE.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                                       </div>
                                    </div>

                                    {!readDone ? (
                                       <>
                                          <StageTracker current={readIdx} total={READING_QUESTIONS.length} label={`Q${readIdx + 1} of ${READING_QUESTIONS.length}`} />
                                          <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-5">
                                             <p className="text-sm font-bold text-slate-900 leading-relaxed">{READING_QUESTIONS[readIdx].q}</p>
                                             <div className="space-y-3">
                                                {READING_QUESTIONS[readIdx].opts.map((opt, i) => (
                                                   <AnswerOption key={i} label={String.fromCharCode(65 + i)} text={opt}
                                                      state={optionState(readSelected, readSubmitted, READING_QUESTIONS[readIdx].ans, i)}
                                                      onClick={() => !readSubmitted && setReadSelected(i)} />
                                                ))}
                                             </div>
                                             {readSubmitted && <FeedbackBox correct={readSelected === READING_QUESTIONS[readIdx].ans} explanation={READING_QUESTIONS[readIdx].exp} />}
                                          </div>
                                          <div className="flex justify-between items-center">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score: {readScore}/{readIdx + (readSubmitted ? 1 : 0)}</span>
                                             {!readSubmitted ? (
                                                <button onClick={submitReading} disabled={readSelected === null}
                                                   className="px-8 py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-blue-800 transition-all">
                                                   Submit Answer
                                                </button>
                                             ) : (
                                                <button onClick={nextReading} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                                                   {readIdx < READING_QUESTIONS.length - 1 ? 'Next Question →' : 'Finish Reading →'}
                                                </button>
                                             )}
                                          </div>
                                       </>
                                    ) : (
                                       <div className="space-y-6">
                                          <div className="p-8 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-4">
                                             <div className="text-3xl font-black text-slate-900">{readScore}/{READING_QUESTIONS.length}</div>
                                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reading Score</div>
                                             <div className="inline-flex px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">✓ Section Complete</div>
                                          </div>
                                          <button onClick={goNextStage} className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all">
                                             Continue to Listening Assessment →
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              )}

                              {/* ── STAGE 3: LISTENING ── */}
                              {flowStage === 3 && (
                                 <div className="p-8 space-y-6">
                                    <div>
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage 4 · Listen</div>
                                       <h2 className="text-xl font-black text-slate-900">Listening Assessment</h2>
                                    </div>

                                    {/* Audio player */}
                                    <div className="p-6 bg-slate-900 rounded-xl space-y-4">
                                       <div className="text-white text-xs font-black uppercase tracking-widest">Audio Clip · Force & Motion Problems · 8:30 min</div>
                                       {/* Waveform bars */}
                                       <div className="flex items-end gap-1 h-10">
                                          {Array.from({ length: 36 }).map((_, i) => (
                                             <div key={i}
                                                className="flex-1 rounded-sm bg-blue-500 transition-all"
                                                style={{
                                                   height: `${audioPlaying ? 20 + Math.random() * 80 : 20}%`,
                                                   opacity: audioProgress > (i / 36 * 100) ? 1 : 0.3,
                                                   transition: audioPlaying ? 'height 0.15s ease' : 'none',
                                                }} />
                                          ))}
                                       </div>
                                       {/* Seek bar */}
                                       <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                          <div className="h-full bg-blue-500 transition-all" style={{ width: `${audioProgress}%` }} />
                                       </div>
                                       <div className="flex items-center justify-between">
                                          <button onClick={toggleAudio}
                                             className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 transition-all">
                                             {audioPlaying
                                                ? <span className="text-white text-xs font-black">⏸</span>
                                                : <Play size={14} fill="white" className="text-white ml-0.5" />}
                                          </button>
                                          <div className="flex gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                             <button className="hover:text-white">0.75×</button>
                                             <button className="text-white">1×</button>
                                             <button className="hover:text-white">1.5×</button>
                                          </div>
                                       </div>
                                       {/* Transcript excerpt */}
                                       <div className="p-4 bg-slate-800 rounded-xl">
                                          <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">Auto-transcript</div>
                                          <p className="text-slate-300 text-[10px] leading-relaxed italic">
                                             "…In this example, a 5 kg block experiences a net force of 20 Newtons. Using F = ma we calculate the acceleration as 4 m/s². Now if friction is introduced, we subtract the friction force first…"
                                          </p>
                                       </div>
                                    </div>

                                    {!listenDone ? (
                                       <>
                                          <StageTracker current={listenIdx} total={LISTENING_QUESTIONS.length} label={`Q${listenIdx + 1} of ${LISTENING_QUESTIONS.length}`} />
                                          <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-5">
                                             <p className="text-sm font-bold text-slate-900 leading-relaxed">{LISTENING_QUESTIONS[listenIdx].q}</p>
                                             <div className="space-y-3">
                                                {LISTENING_QUESTIONS[listenIdx].opts.map((opt, i) => (
                                                   <AnswerOption key={i} label={String.fromCharCode(65 + i)} text={opt}
                                                      state={optionState(listenSelected, listenSubmitted, LISTENING_QUESTIONS[listenIdx].ans, i)}
                                                      onClick={() => !listenSubmitted && setListenSelected(i)} />
                                                ))}
                                             </div>
                                             {listenSubmitted && <FeedbackBox correct={listenSelected === LISTENING_QUESTIONS[listenIdx].ans} explanation={LISTENING_QUESTIONS[listenIdx].exp} />}
                                          </div>
                                          <div className="flex justify-between items-center">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score: {listenScore}/{listenIdx + (listenSubmitted ? 1 : 0)}</span>
                                             {!listenSubmitted ? (
                                                <button onClick={submitListening} disabled={listenSelected === null}
                                                   className="px-8 py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-blue-800 transition-all">
                                                   Submit Answer
                                                </button>
                                             ) : (
                                                <button onClick={nextListening} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                                                   {listenIdx < LISTENING_QUESTIONS.length - 1 ? 'Next Question →' : 'Finish Listening →'}
                                                </button>
                                             )}
                                          </div>
                                       </>
                                    ) : (
                                       <div className="space-y-6">
                                          <div className="p-8 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-4">
                                             <div className="text-3xl font-black text-slate-900">{listenScore}/{LISTENING_QUESTIONS.length}</div>
                                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Listening Score</div>
                                             <div className="inline-flex px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">✓ Section Complete</div>
                                          </div>
                                          <button onClick={goNextStage} className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all">
                                             Continue to Writing Assessment →
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              )}

                              {/* ── STAGE 4: WRITING ── */}
                              {flowStage === 4 && (
                                 <div className="p-8 space-y-6">
                                    <div>
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage 5 · Write</div>
                                       <h2 className="text-xl font-black text-slate-900">Writing Assessment</h2>
                                    </div>

                                    {WRITING_TASKS.map((task, i) => {
                                       const wc = wordCount(writings[i]);
                                       const met = wc >= task.minWords;
                                       return (
                                          <div key={i} className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-4">
                                             <div className="flex items-start justify-between gap-4">
                                                <div>
                                                   <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Task {i + 1} · {task.title}</div>
                                                   <p className="text-xs font-semibold text-slate-700 leading-relaxed">{task.prompt}</p>
                                                </div>
                                                <span className={`shrink-0 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                                                   ${met ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                   min {task.minWords}w
                                                </span>
                                             </div>
                                             <textarea
                                                disabled={writingSubmitted}
                                                value={writings[i]}
                                                onChange={e => { const n = [...writings]; n[i] = e.target.value; setWritings(n); }}
                                                placeholder="Write your answer here..."
                                                className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 font-medium leading-relaxed resize-none focus:outline-none focus:ring-4 focus:ring-blue-900/5 placeholder:text-slate-300 disabled:opacity-60"
                                             />
                                             <div className="flex items-center justify-between">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${met ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                   {met ? '✓ Minimum met' : `${wc} / ${task.minWords} words`}
                                                </span>
                                                {met && <CheckCircle size={14} className="text-emerald-500" />}
                                             </div>
                                          </div>
                                       );
                                    })}

                                    {!writingSubmitted ? (
                                       <button onClick={submitWriting} disabled={!allWritingMet}
                                          className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-blue-800 transition-all">
                                          Submit All Writing Tasks
                                       </button>
                                    ) : (
                                       <div className="space-y-4">
                                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
                                             <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                                             <div>
                                                <div className="text-xs font-black text-emerald-800 uppercase tracking-wide">Writing Submitted Successfully</div>
                                                <div className="text-[10px] text-emerald-600 mt-0.5">All 3 tasks recorded · Pending instructor review</div>
                                             </div>
                                          </div>
                                          <button onClick={goNextStage} className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all">
                                             View Performance Report →
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              )}

                              {/* ── STAGE 5: REPORT ── */}
                              {flowStage === 5 && (
                                 <div className="p-8 space-y-6">
                                    <div>
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage 6 · Results</div>
                                       <h2 className="text-xl font-black text-slate-900">Performance Report</h2>
                                    </div>

                                    {/* Score ring */}
                                    <div className="flex items-center gap-8 p-6 bg-slate-900 rounded-xl text-white">
                                       <div className="relative shrink-0">
                                          <svg width="120" height="120" viewBox="0 0 120 120">
                                             <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="10" />
                                             <circle cx="60" cy="60" r="52" fill="none" stroke="#1e3a5f" strokeWidth="10"
                                                strokeLinecap="round" strokeDasharray={circumference}
                                                strokeDashoffset={dashOffset}
                                                transform="rotate(-90 60 60)"
                                                style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
                                          </svg>
                                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                                             <div className="text-2xl font-black">{scoreRing}%</div>
                                             <div className="text-[8px] text-slate-400 uppercase tracking-widest">Overall</div>
                                          </div>
                                       </div>
                                       <div className="space-y-3 flex-1">
                                          {[
                                             { label: 'MCQ', val: `${mcqScore}/${MCQ_QUESTIONS.length}`, pct: Math.round(mcqScore / MCQ_QUESTIONS.length * 100), color: 'bg-blue-500' },
                                             { label: 'Reading', val: `${readScore}/${READING_QUESTIONS.length}`, pct: Math.round(readScore / READING_QUESTIONS.length * 100), color: 'bg-purple-500' },
                                             { label: 'Listening', val: `${listenScore}/${LISTENING_QUESTIONS.length}`, pct: Math.round(listenScore / LISTENING_QUESTIONS.length * 100), color: 'bg-amber-500' },
                                             { label: 'Writing', val: writingSubmitted ? 'Submitted' : 'Pending', pct: writingSubmitted ? 80 : 0, color: 'bg-pink-500' },
                                          ].map(r => (
                                             <div key={r.label} className="flex items-center gap-3">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest w-16">{r.label}</span>
                                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                   <div className={`h-full rounded-full ${r.color} transition-all duration-700`} style={{ width: `${r.pct}%` }} />
                                                </div>
                                                <span className="text-[9px] font-black text-slate-300 w-16 text-right">{r.val}</span>
                                             </div>
                                          ))}
                                       </div>
                                    </div>

                                    {/* Skill breakdown */}
                                    <div className="p-6 bg-white border border-slate-100 rounded-xl space-y-4">
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skill Breakdown</div>
                                       {[
                                          { skill: 'Conceptual Understanding', pct: 82 },
                                          { skill: 'Problem Solving', pct: 75 },
                                          { skill: 'Reading Comprehension', pct: 85 },
                                          { skill: 'Listening & Recall', pct: 75 },
                                          { skill: 'Written Expression', pct: 80 },
                                       ].map(s => (
                                          <div key={s.skill} className="flex items-center gap-3">
                                             <span className="text-[10px] font-medium text-slate-600 w-40 shrink-0">{s.skill}</span>
                                             <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-900 rounded-full" style={{ width: `${s.pct}%` }} />
                                             </div>
                                             <span className="text-[10px] font-black text-slate-500 w-8 text-right">{s.pct}%</span>
                                          </div>
                                       ))}
                                    </div>

                                    {/* AI Feedback */}
                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                          <Sparkles size={12} className="text-blue-900" /> AI Feedback
                                       </div>
                                       <p className="text-xs text-slate-600 leading-relaxed">
                                          Excellent conceptual grasp of all three laws. Your written explanation of Newton's Third Law showed strong understanding.
                                          <span className="text-amber-600 font-semibold"> Area to improve:</span> Review friction calculations from the listening section.
                                          <span className="text-emerald-600 font-semibold"> Strength:</span> Reading comprehension and extracting key information.
                                       </p>
                                    </div>

                                    <button onClick={() => { markStageDone(5); goNextStage(); }}
                                       className="w-full py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all">
                                       Claim Your Certificate →
                                    </button>
                                 </div>
                              )}

                              {/* ── STAGE 6: CERTIFICATE ── */}
                              {flowStage === 6 && (
                                 <div className="p-8 space-y-6">
                                    <div>
                                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage 7 · Complete</div>
                                       <h2 className="text-xl font-black text-slate-900">Certificate of Completion</h2>
                                    </div>

                                    {/* Certificate */}
                                    <div className="relative border-2 border-amber-200 rounded-2xl p-8 bg-gradient-to-br from-amber-50/60 to-white text-center space-y-4 overflow-hidden">
                                       {/* Corner ornaments */}
                                       <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-300 rounded-tl-lg" />
                                       <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-300 rounded-tr-lg" />
                                       <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300 rounded-bl-lg" />
                                       <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300 rounded-br-lg" />

                                       <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-amber-200 flex items-center justify-center mx-auto">
                                          <Trophy size={28} className="text-amber-600" />
                                       </div>

                                       <div className="text-[10px] font-black text-amber-600 uppercase tracking-[4px]">Certificate of Completion</div>
                                       <div className="w-24 h-0.5 bg-amber-200 mx-auto" />

                                       <div>
                                          <div className="text-[10px] text-slate-400 mb-1">This certifies that</div>
                                          <div className="text-3xl font-black text-slate-900 italic">Arjun Sharma</div>
                                          <div className="text-xs text-slate-500 mt-1">has successfully completed</div>
                                       </div>

                                       <div className="text-sm font-black text-blue-900 uppercase tracking-widest">{course.title}</div>
                                       <div className="text-[10px] text-slate-400">Physics · Grade 11 · Dr. Mehta</div>

                                       <div className="flex justify-center gap-3 flex-wrap">
                                          {[
                                             { label: 'MCQ', val: `${mcqScore}/${MCQ_QUESTIONS.length}` },
                                             { label: 'Reading', val: `${readScore}/${READING_QUESTIONS.length}` },
                                             { label: 'Listening', val: `${listenScore}/${LISTENING_QUESTIONS.length}` },
                                             { label: 'Writing', val: writingSubmitted ? '✓' : '—' },
                                          ].map(b => (
                                             <div key={b.label} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-center shadow-sm">
                                                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{b.label}</div>
                                                <div className="text-sm font-black text-slate-900 mt-0.5">{b.val}</div>
                                             </div>
                                          ))}
                                       </div>

                                       <div className="w-24 h-0.5 bg-amber-200 mx-auto" />

                                       <div className="flex justify-center gap-8 text-center">
                                          <div>
                                             <div className="text-[10px] font-black text-slate-700">29 Apr 2026</div>
                                             <div className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">Date Issued</div>
                                          </div>
                                          <div>
                                             <div className="text-[10px] font-black text-slate-700">NLM-2026-0429</div>
                                             <div className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">Certificate ID</div>
                                          </div>
                                          <div>
                                             <div className="text-[10px] font-black text-slate-700">{scoreRing}%</div>
                                             <div className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">Overall Score</div>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-3 gap-3">
                                       <button onClick={() => {markStageDone(6);}}
                                          className="py-4 bg-amber-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all col-span-1">
                                          ⬇ Download
                                       </button>
                                       <button className="py-4 bg-white border border-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all col-span-1">
                                          ↗ Share
                                       </button>
                                       <button onClick={() => setFlowStage(5)}
                                          className="py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all col-span-1">
                                          📊 Report
                                       </button>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                                       <Star size={16} className="text-emerald-500 shrink-0" />
                                       <p className="text-[10px] font-bold text-emerald-700 leading-relaxed">
                                          🎉 Congratulations! You have completed all learning stages for this module. Your certificate has been added to your profile.
                                       </p>
                                    </div>
                                 </div>
                              )}

                           </motion.div>
                        </AnimatePresence>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </DashboardLayout>
   );
}