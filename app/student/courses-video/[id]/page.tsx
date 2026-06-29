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
   ClipboardList, Trophy, Star, AlertCircle, Loader
} from 'lucide-react';
import { MOCK_COURSES } from '@/lib/mock-data';
import { useParams } from 'next/navigation';

// ─── Lesson sidebar data ───────────────────────────────────────
const lessons = [
   { id: 1, title: 'Introduction to Vrikshayurveda', type: 'video', duration: '18 min', done: true },
   { id: 2, title: 'Principles of Vedic Soil Science', type: 'video', duration: '24 min', done: true },
   { id: 3, title: 'SLM Reading: Ancient Herbology', type: 'pdf', duration: '15 min', done: true },
   { id: 4, title: 'Practice Quiz – Vedic Principles', type: 'quiz', duration: '10 min', done: false },
   { id: 5, title: 'Herbarium Collection Methods', type: 'video', duration: '20 min', done: false },
   { id: 6, title: 'Concept Map: Ayurvedic Plants', type: 'flipbook', duration: '12 min', done: false },
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
   { id: 'video', label: 'Video Lesson', icon: Play, color: 'text-orange-600', bg: 'bg-blue-50', border: 'border-orange-100' },
   { id: 'mcq', label: 'MCQ Assessment', icon: ClipboardList, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
   { id: 'reading', label: 'Reading Assessment', icon: BookMarked, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
   { id: 'listening', label: 'Listening Assessment', icon: Headphones, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
   { id: 'writing', label: 'Writing Assessment', icon: PenTool, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
   { id: 'report', label: 'Performance Report', icon: BarChart2, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
   { id: 'certificate', label: 'Certificate', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

// ─── Quiz data ──────────────────────────────────────────────────────────────
const MCQ_QUESTIONS = [
   {
      q: "Which term refers to the ancient Indian science of plant life?",
      opts: ['Ayurveda', 'Vrikshayurveda', 'Mrigayurveda', 'Samskrit'],
      ans: 1,
      exp: "Vrikshayurveda is the branch of Ayurveda that deals specifically with plant life and soil science.",
   },
   {
      q: 'According to Vedic soil science, which soil type is considered ideal for agriculture?',
      opts: ['Jangala', 'Anupa', 'Sadharana', 'Maru'],
      ans: 2,
      exp: 'Sadharana soil (common soil) is often considered balanced and suitable for various crops.',
   },
   {
      q: 'Which of the following is a core principle of Ayurvedic Herbology?',
      opts: ['Dravya Guna', 'Newtonian Mechanics', 'Thermodynamics', 'Quantum Theory'],
      ans: 0,
      exp: 'Dravya Guna is the study of the properties and actions of medicinal substances in Ayurveda.',
   },
   {
      q: 'Which classic text is foundational to Vrikshayurveda?',
      opts: ['Surapala\'s Vrikshayurveda', 'Principia Mathematica', 'Origin of Species', 'The Republic'],
      ans: 0,
      exp: 'Surapala\'s Vrikshayurveda is one of the most important historical texts on the subject.',
   },
   {
      q: 'In Ayurveda, the three pillars of health are known as:',
      opts: ['Newton\'s Laws', 'Tridosha', 'Triguna', 'Panchamahabhuta'],
      ans: 1,
      exp: 'Tridosha (Vata, Pitta, Kapha) are the three functional energies that govern human physiology.',
   },
];

const READING_PASSAGE = `Vrikshayurveda, the ancient Indian science of plant life, emphasizes the interconnectedness of soil, water, and seeds. It describes sophisticated methods for plant propagation, protection, and nourishment, rooted in the principles of Ayurveda.

Soil classification in Vedic science is highly detailed, identifying types such as Jangala (arid), Anupa (marshy), and Sadharana (common). Each type has specific properties that determine its suitability for different medicinal plants. Understanding these properties is crucial for the successful cultivation of Ayurvedic herbs.

Traditional herbology, or Dravya Guna, studies the properties (Guna), tastes (Rasa), and potencies (Virya) of plants. This knowledge allows practitioners to select the right herbs for balancing the Doshas and promoting health. The collection of herbs is also governed by astronomical factors, ensuring maximum potency.

Modern integrative medicine is increasingly looking toward these ancient practices to find sustainable solutions for organic farming and natural medicine. By combining traditional wisdom with modern research, we can create a holistic approach to health and environment.`;

const READING_QUESTIONS = [
   { q: "What is Vrikshayurveda primarily concerned with?", opts: ["Animal health", "Plant life", "Astronomy", "Architecture"], ans: 1, exp: "Vrikshayurveda is the science of plant life." },
   { q: 'Which soil type is described as marshy?', opts: ['Jangala', 'Sadharana', 'Anupa', 'Maru'], ans: 2, exp: 'Anupa soil refers to marshy or wetland areas.' },
   { q: 'Dravya Guna studies which properties of plants?', opts: ['Atomic weight', 'Rasa, Guna, and Virya', 'Speed of growth', 'Color only'], ans: 1, exp: 'Dravya Guna focuses on Rasa (taste), Guna (properties), and Virya (potency).' },
   { q: 'Why is the collection of herbs governed by astronomical factors?', opts: ['For religious reasons', 'To ensure maximum potency', 'To save time', 'To avoid rain'], ans: 1, exp: 'Astronomical factors are believed to influence the medicinal potency of herbs during collection.' },
];

const LISTENING_QUESTIONS = [
   { q: 'In the audio example, which herb was mentioned for heart health?', opts: ['Ashwagandha', 'Arjuna', 'Tulsi', 'Neem'], ans: 1, exp: 'Arjuna is traditionally used in Ayurveda for cardiovascular health.' },
   { q: 'What part of the Arjuna plant is primarily used?', opts: ['Leaves', 'Roots', 'Bark', 'Flowers'], ans: 2, exp: 'The bark of the Arjuna tree is the primary medicinal part used.' },
   { q: 'The recommended dosage form mentioned was:', opts: ['Kashaya (Decoction)', 'Churna (Powder)', 'Arishta (Fermented)', 'All of above'], ans: 3, exp: 'Arjuna is used in various forms including decoctions, powders, and fermented preparations.' },
];

const WRITING_TASKS = [
   { title: 'Short Answer', prompt: "Explain the importance of 'Veda' in Ayurvedic education and its relevance to modern clinical practice.", minWords: 80 },
   { title: 'Case Study', prompt: 'A patient presents with Pitta imbalance during the summer season. Recommend a dietary regimen rooted in Ayurvedic principles.', minWords: 50 },
   { title: 'Critical Thinking', prompt: 'Discuss how the principles of Vrikshayurveda can be applied to modern sustainable organic farming practices.', minWords: 100 },
];

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

// Sub Components
function AnswerOption({ label, text, state, onClick }: { label: string; text: string; state: 'idle' | 'selected' | 'correct' | 'wrong'; onClick: () => void }) {
   const base = 'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all';
   const variants: Record<string, string> = {
      idle: 'bg-white border-slate-100 hover:border-orange-200 hover:bg-blue-50/30 text-slate-700 cursor-pointer',
      selected: 'bg-blue-50 border-orange-300 text-orange-900 cursor-pointer',
      correct: 'bg-emerald-50 border-emerald-300 text-emerald-800 cursor-default',
      wrong: 'bg-red-50 border-red-300 text-red-700 cursor-default',
   };
   return (
      <button className={`${base} ${variants[state]}`} onClick={onClick} disabled={state === 'correct' || state === 'wrong'}>
         <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0
            ${state === 'idle' ? 'bg-slate-100 text-slate-500' :
               state === 'selected' ? 'bg-orange-900 text-white' :
                  state === 'correct' ? 'bg-emerald-500 text-white' : 'bg-red-400 text-white'}`}>
            {label}
         </span>
         <span className="text-xs font-semibold">{text}</span>
         {state === 'correct' && <CheckCircle size={16} className="ml-auto text-emerald-500 shrink-0" />}
         {state === 'wrong' && <X size={16} className="ml-auto text-red-400 shrink-0" />}
      </button>
   );
}

function StageTracker({ current, total, label }: { current: number; total: number; label: string }) {
   return (
      <div className="flex items-center gap-3 mb-6">
         <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all ${i < current ? 'bg-emerald-500 w-6' : i === current ? 'bg-orange-900 w-8' : 'bg-slate-200 w-4'}`} />
            ))}
         </div>
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
   );
}

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

// ─── Dubbed Videos from public/video/ ────────────────────────────
const DUBBED_VIDEOS = [
   {
      id: 'about',
      title: 'About NIOS',
      description: 'General introduction and overview of the National Institute of Open Schooling.',
      languages: {
         'English': 'https://v.jethat.in/video/about/Eng_about.mp4',
         'Hindi': 'https://v.jethat.in/video/about/hindi_about.mp4',
         'Sanskrit': 'https://v.jethat.in/video/about/sanskrit_about.mp4',
         'Gujarati': 'https://v.jethat.in/video/about/gujrati_about.mp4',
         'Tamil': 'https://v.jethat.in/video/about/tamil_about.mp4',
         'Marathi': 'https://v.jethat.in/video/about/marathi_about.mp4',
      }
   },
   {
      id: 'aggression',
      title: 'Aggression Study',
      description: 'Psychology lesson discussing aggression, social learning, and behavioral patterns.',
      languages: {
         'English': 'https://v.jethat.in/video/aggression/Eng_aggression.mp4',
         'Hindi': 'https://v.jethat.in/video/aggression/hindi_aggression.mp4',
         'Sanskrit': 'https://v.jethat.in/video/aggression/sanskrit_aggression.mp4',
         'Gujarati': 'https://v.jethat.in/video/aggression/gujarati_aggression.mp4',
         'Tamil': 'https://v.jethat.in/video/aggression/tamil_aggression.mp4',
         'Marathi': 'https://v.jethat.in/video/aggression/marathi_aggression.mp4',
      }
   },
   {
      id: 'aggression',
      title: 'Aggression Study',
      description: 'Psychology lesson discussing aggression, social learning, and behavioral patterns.',
      languages: {
         'English': 'https://v.jethat.in/video/aggression/Eng_aggression.mp4',
         'Hindi': 'https://v.jethat.in/video/aggression/hindi_aggression.mp4',
         'Sanskrit': 'https://v.jethat.in/video/aggression/sanskrit_aggression.mp4',
         'Gujarati': 'https://v.jethat.in/video/aggression/gujarati_aggression.mp4',
         'Tamil': 'https://v.jethat.in/video/aggression/tamil_aggression.mp4',
         'Marathi': 'https://v.jethat.in/video/aggression/marathi_aggression.mp4',
      }
   },
   // {
   //    id: 'laxmi',
   //    title: 'Laxmi Story',
   //    description: 'An educational narrative and story-based lesson.',
   //    languages: {
   //       'English': 'https://v.jethat.in/video/laxmi/english.mp4',
   //       'Hindi': 'https://v.jethat.in/video/laxmi/hindi.mp4',
   //       'Sanskrit': 'https://v.jethat.in/video/laxmi/sanskrit.mp4',
   //       'Gujarati': 'https://v.jethat.in/video/laxmi/gujarati.mp4',
   //       'Tamil': 'https://v.jethat.in/video/laxmi/tamil.mp4',
   //    }
   // },
   //   {
   //     id: 'sigmund',
   //     title: 'Sigmund Freud Biography',
   //     description: 'A study on the life, theories, and impact of Sigmund Freud on modern psychology.',
   //     languages: {
   //       'English': 'https://v.jethat.in/video/sigmund/Eng_sigmund.mp4',
   //       'Hindi': 'https://v.jethat.in/video/sigmund/hindi_sigmund.mp4',
   //     }
   //   }
];

// MAIN COMPONENT
export default function CoursePlayerPage() {
   const params = useParams();
   const id = params.id as string;
   const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];

   const getInitialVideo = (courseId: string) => {
      if (courseId === '1') return DUBBED_VIDEOS[0];
      if (courseId === '2') return DUBBED_VIDEOS[1];
      if (courseId === '3') return DUBBED_VIDEOS[2];
      if (courseId === 'mlp-001') return DUBBED_VIDEOS[3];
      const index = parseInt(courseId) % DUBBED_VIDEOS.length;
      return DUBBED_VIDEOS[isNaN(index) ? 0 : index] || DUBBED_VIDEOS[0];
   };

   const [selectedDubbedVideo, setSelectedDubbedVideo] = useState(() => getInitialVideo(id));

   useEffect(() => {
      const initialVideo = getInitialVideo(id);
      setSelectedDubbedVideo(initialVideo);
      // Reset language if not supported in the new course's video
      if (initialVideo && !initialVideo.languages[language as keyof typeof initialVideo.languages]) {
         setLanguage(Object.keys(initialVideo.languages)[0] || 'English');
      }
   }, [id]);

   const selectVideo = (video: typeof DUBBED_VIDEOS[0]) => {
      setSelectedDubbedVideo(video);
      if (!video.languages[language as keyof typeof video.languages]) {
         setLanguage(Object.keys(video.languages)[0] || 'English');
      }
   };

   // States
   const [activeTab, setActiveTab] = useState('Overview');
   const [activeLesson, setActiveLesson] = useState(1);
   const [note, setNote] = useState('');
   const [fontSize, setFontSize] = useState<'text-sm' | 'text-base' | 'text-lg'>('text-base');
   const [isISLEnabled, setIsISLEnabled] = useState(false);
   const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState(false);
   const [isReadingAloud, setIsReadingAloud] = useState(false);
   const [language, setLanguage] = useState('English');
   const [showAISummary, setShowAISummary] = useState(false);

   // Dubbing States
   const [isDubbing, setIsDubbing] = useState(false);
   const [dubbingTargetLang, setDubbingTargetLang] = useState<string | null>(null);

   // Learning Flow States
   const [showLearningFlow, setShowLearningFlow] = useState(false);
   const [flowStage, setFlowStage] = useState(0);
   const [stagesDone, setStagesDone] = useState<boolean[]>(Array(7).fill(false));

   // Video States
   const [videoPlaying, setVideoPlaying] = useState(false);
   const [videoProgress, setVideoProgress] = useState(0);
   const videoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

   // MCQ States
   const [mcqIndex, setMcqIndex] = useState(0);
   const [mcqSelected, setMcqSelected] = useState<number | null>(null);
   const [mcqSubmitted, setMcqSubmitted] = useState(false);
   const [mcqScore, setMcqScore] = useState(0);
   const [mcqDone, setMcqDone] = useState(false);

   // Reading States
   const [readIdx, setReadIdx] = useState(0);
   const [readSelected, setReadSelected] = useState<number | null>(null);
   const [readSubmitted, setReadSubmitted] = useState(false);
   const [readScore, setReadScore] = useState(0);
   const [readDone, setReadDone] = useState(false);

   // Listening States
   const [listenIdx, setListenIdx] = useState(0);
   const [listenSelected, setListenSelected] = useState<number | null>(null);
   const [listenSubmitted, setListenSubmitted] = useState(false);
   const [listenScore, setListenScore] = useState(0);
   const [listenDone, setListenDone] = useState(false);
   const [audioPlaying, setAudioPlaying] = useState(false);
   const [audioProgress, setAudioProgress] = useState(0);
   const audioTimer = useRef<ReturnType<typeof setInterval> | null>(null);

   // Writing States
   const [writings, setWritings] = useState(['', '', '']);
   const [writingSubmitted, setWritingSubmitted] = useState(false);

   const synth = useRef<SpeechSynthesis | null>(null);

   useEffect(() => {
      synth.current = window.speechSynthesis;
      return () => { synth.current?.cancel(); };
   }, []);

   // Dubbing Function
   const handleDubLanguage = (newLang: string) => {
      if (newLang === language || isDubbing) return;
      setDubbingTargetLang(newLang);
      setIsDubbing(true);

      setTimeout(() => {
         setLanguage(newLang);
         setIsDubbing(false);
         setDubbingTargetLang(null);
      }, 5000);
   };

   const handleReadAloud = () => {
      if (isReadingAloud) {
         synth.current?.cancel();
         setIsReadingAloud(false);
      } else {
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
      if (videoTimer.current) clearInterval(videoTimer.current);
      markStageDone(0);
   };

   const markStageDone = (idx: number) => {
      setStagesDone(prev => { const n = [...prev]; n[idx] = true; return n; });
   };

   const goNextStage = () => {
      const next = flowStage + 1;
      if (next < LEARNING_STAGES.length) {
         setFlowStage(next);
         if (next === 1) { setMcqIndex(0); setMcqSelected(null); setMcqSubmitted(false); setMcqScore(0); setMcqDone(false); }
         if (next === 2) { setReadIdx(0); setReadSelected(null); setReadSubmitted(false); setReadScore(0); setReadDone(false); }
         if (next === 3) { setListenIdx(0); setListenSelected(null); setListenSubmitted(false); setListenScore(0); setListenDone(false); }
      }
   };

   // Quiz Handlers
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

   const toggleAudio = () => {
      if (audioPlaying) {
         if (audioTimer.current) clearInterval(audioTimer.current);
         setAudioPlaying(false);
      } else {
         setAudioPlaying(true);
         audioTimer.current = setInterval(() => {
            setAudioProgress(p => {
               if (p >= 100) {
                  if (audioTimer.current) clearInterval(audioTimer.current);
                  setAudioPlaying(false);
                  return 100;
               }
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

   const allWritingMet = WRITING_TASKS.every((t, i) => wordCount(writings[i]) >= t.minWords);
   const submitWriting = () => { setWritingSubmitted(true); markStageDone(4); markStageDone(5); };

   const overallScore = Math.round(
      (mcqScore / MCQ_QUESTIONS.length * 100 + readScore / READING_QUESTIONS.length * 100 +
         listenScore / LISTENING_QUESTIONS.length * 100 + (writingSubmitted ? 80 : 0)) / 4
   );
   const scoreRing = Math.max(0, Math.min(100, overallScore || 80));
   const circumference = 2 * Math.PI * 52;
   const dashOffset = circumference - (scoreRing / 100) * circumference;

   const optionState = (
      selected: number | null, submitted: boolean, correctAns: number, optIdx: number
   ): 'idle' | 'selected' | 'correct' | 'wrong' => {
      if (!submitted) return selected === optIdx ? 'selected' : 'idle';
      if (optIdx === correctAns) return 'correct';
      if (optIdx === selected) return 'wrong';
      return 'idle';
   };

   return (
      <DashboardLayout
         title={course.title}
         subtitle={`${course.subject} · Stage: ${course.currentStage} · Modules: ${course.modules.length}`}
      >
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start pb-20">

            {/* Main Player Area */}
            <div className="space-y-6">

               <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                     <span className="badge bg-orange-900/10 text-orange-900 border-orange-900/20 font-black uppercase tracking-widest px-3 py-1 text-[8px]">
                        AI ENHANCED
                     </span>
                     <span className="badge bg-blue-50 text-orange-600 border-orange-100 font-black uppercase tracking-widest px-3 py-1 text-[8px]">
                        BY-DR. MEHTA
                     </span>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all"><Share2 size={16} /></button>
                     <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all"><Calendar size={16} /></button>
                  </div>
               </div>

               {/* Video Player with Dubbing */}
               <div className="relative group">
                  <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video shadow-2xl border border-slate-800 relative ring-8 ring-white/50">
                     {activeLesson === 6 ? (
                        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-12">
                           <div className="text-white text-center space-y-4">
                              <BookOpen size={48} className="mx-auto text-orange-900" />
                              <h4 className="font-black uppercase tracking-widest text-sm">Interactive FlipBook Active</h4>
                              <p className="text-slate-500 text-[10px] max-w-xs mx-auto">Open the library to view full 3D interactive version of this SLM.</p>
                              <button className="px-8 py-3 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-500/20">Expand Content</button>
                           </div>
                        </div>
                     ) : (() => {
                        const currentVideoUrl = (selectedDubbedVideo && selectedDubbedVideo.languages[language as keyof typeof selectedDubbedVideo.languages]) || (selectedDubbedVideo && selectedDubbedVideo.languages['English']) || (course as any).videoUrlsByLanguage?.[language] || course.videoUrl || '';
                        if (currentVideoUrl.endsWith('.mp4') || currentVideoUrl.startsWith('/') || currentVideoUrl.includes('video/')) {
                           return (
                              <video
                                 key={currentVideoUrl}
                                 src={currentVideoUrl}
                                 controls
                                 autoPlay
                                 className="w-full h-full object-contain bg-slate-950"
                              />
                           );
                        }
                        return (
                           <iframe
                              src={getEmbedUrl(currentVideoUrl)}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                           />
                        );
                     })()}

                     {/* DUBBING LOADING OVERLAY */}
                     <AnimatePresence>
                        {isDubbing && (
                           <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50"
                           >
                              <div className="flex flex-col items-center gap-6 text-center px-8">
                                 <div className="relative">
                                    <Loader size={72} className="text-orange-400 animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       <Languages size={36} className="text-white" />
                                    </div>
                                 </div>
                                 <div>
                                    <div className="text-white text-2xl font-black tracking-tight">
                                       Dubbing to {dubbingTargetLang}...
                                    </div>
                                    <p className="text-slate-400 text-sm mt-2">
                                       AI Voice Synthesis + Lip Sync in progress
                                    </p>
                                 </div>
                                 <div className="w-80 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                       className="h-full bg-gradient-to-r from-orange-500 via-cyan-400 to-orange-500 rounded-full"
                                       initial={{ width: "0%" }}
                                       animate={{ width: "100%" }}
                                       transition={{ duration: 5, ease: "linear" }}
                                    />
                                 </div>
                                 <p className="text-xs text-slate-500">Please wait...</p>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>

               {/* Tools */}
               <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <Info size={14} /> Tools
                  </div>

                  <button onClick={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isSubtitlesEnabled ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                     📝 Subtitles
                  </button>
                  <button onClick={() => setIsISLEnabled(!isISLEnabled)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isISLEnabled ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                     🤟 ISL (Sign)
                  </button>
                  <button onClick={handleReadAloud} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isReadingAloud ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                     🔊 {isReadingAloud ? 'Reading...' : 'Read Aloud'}
                  </button>

                  {/* Dub Language Selector */}
                  <div className="relative group">
                     <button className="px-6 py-3 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-100">
                        <Languages size={14} /> Dub: {language}
                     </button>
                     <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 opacity-0 group-hover:opacity-100 pointer-events group-hover:pointer-events-auto transition-all">
                        {Object.keys(selectedDubbedVideo ? selectedDubbedVideo.languages : {}).map(l => (
                           <button
                              key={l}
                              onClick={() => handleDubLanguage(l)}
                              disabled={isDubbing}
                              className={`w-full px-4 py-3 text-left text-sm rounded-xl flex items-center justify-between transition-all
                                 ${language === l ? 'bg-blue-50 text-orange-900' : 'hover:bg-slate-50'}
                                 ${isDubbing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                           >
                              {l}
                              {language === l && <CheckCircle size={16} className="text-emerald-500" />}
                           </button>
                        ))}
                     </div>
                  </div>

                  <button onClick={toggleFontSize} className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all"><Type size={18} /></button>
                  <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all"><Moon size={18} /></button>
                  <button onClick={() => setShowAISummary(!showAISummary)} className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all"><Sparkles size={24} /></button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-800 transition-all shadow-lg shadow-orange-900/20"
                  >
                     <Play size={12} fill="currentColor" /> Assessment
                  </button>
               </div>

               {/* Dubbed Video Series Selector */}
               <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                     <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">AI Multi-Lingual Dubbed Demo Videos</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Select any course video to play with real-time AI dubbing & lip sync</p>
                     </div>
                     <span className="px-3 py-1 bg-orange-900/10 text-orange-900 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        {DUBBED_VIDEOS.length} Available
                     </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {DUBBED_VIDEOS.map(video => {
                        const isSelected = selectedDubbedVideo?.id === video.id;
                        return (
                           <button
                              key={video.id}
                              onClick={() => selectVideo(video)}
                              className={`text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 hover:shadow-md hover:border-orange-200/50 ${isSelected ? 'bg-blue-50/50 border-orange-300 ring-2 ring-orange-900/5' : 'bg-slate-50/30 border-slate-100'}`}
                           >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-orange-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                 <Video size={16} />
                              </div>
                              <div className="min-w-0">
                                 <div className="text-[11px] font-black uppercase tracking-wider text-slate-900 truncate">{video.title}</div>
                                 <p className="text-[9px] text-slate-400 font-bold line-clamp-2 mt-1">{video.description}</p>
                                 <div className="flex flex-wrap gap-1 mt-2">
                                    {Object.keys(video.languages).map(lang => (
                                       <span key={lang} className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${language === lang && isSelected ? 'bg-orange-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                          {lang}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Tabs */}
               <div className="space-y-6">
                  <div className="flex gap-4 border-b border-slate-100">
                     {tabs.map(t => (
                        <button
                           key={t}
                           onClick={() => setActiveTab(t)}
                           className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === t ? 'text-orange-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                           {t}
                           {activeTab === t && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-900" />}
                        </button>
                     ))}
                  </div>

                  <div className={`p-8 bg-white rounded-xl border border-slate-100 shadow-sm animate-in fade-in duration-500 ${fontSize}`}>
                     {activeTab === 'Overview' && (
                        <div className="space-y-6">
                           <h3 className="text-2xl font-black text-slate-900 tracking-tight">{course.title}</h3>
                           <p className="text-slate-500 leading-relaxed font-medium">{course.description}</p>
                           <div className="grid grid-cols-2 gap-4">
                              {course.objectives?.map((obj: string, i: number) => (
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
                              className="w-full h-48 p-6 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-900/5 transition-all text-slate-600 font-medium placeholder:text-slate-400"
                              placeholder="Take your lesson notes here..."
                              value={note} onChange={e => setNote(e.target.value)}
                           />
                        </div>
                     )}
                     {/* Add other tabs if needed */}
                  </div>
               </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-8">
               {showAISummary && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 bg-slate-900 rounded-xl text-white shadow-2xl">
                     <h4 className="text-sm font-black uppercase tracking-tight flex items-center gap-2 mb-4">
                        <Sparkles size={18} className="text-orange-900" /> Gemini Summary
                     </h4>
                     <p className="text-xs leading-relaxed text-white/80">{course.summary}</p>
                  </motion.div>
               )}

               <div className="p-8 bg-white rounded-xl border border-slate-100 shadow-sm space-y-8">
                  <div className="space-y-4">
                     <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Course Content</span><span className="text-slate-900 font-bold">12/24</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-900 w-1/2" />
                     </div>
                  </div>
                  <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
                     {lessons.map(l => (
                        <button
                           key={l.id}
                           onClick={() => setActiveLesson(l.id)}
                           className={`w-full group p-4 flex items-center gap-4 rounded-xl transition-all ${activeLesson === l.id ? 'bg-slate-900 text-white shadow-xl' : 'hover:bg-slate-50 text-slate-500'}`}
                        >
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${activeLesson === l.id ? 'bg-orange-900 border-orange-900/20 text-white' : 'bg-white border-slate-100'}`}>
                              {l.done ? <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> : <Play size={18} />}
                           </div>
                           <div className="text-left min-w-0">
                              <div className={`text-[10px] font-black uppercase tracking-tight truncate ${activeLesson === l.id ? 'text-white' : 'text-slate-900'}`}>{l.title}</div>
                              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{l.duration} · {l.type}</div>
                           </div>
                        </button>
                     ))}
                  </div>
               </div>
            </aside>
         </div>

         {/* Learning Flow Modal */}
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
                              <div className="h-full bg-orange-500 rounded-full transition-all duration-500"
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
                                       ${active ? 'bg-orange-900 text-white' : done ? 'text-slate-300 hover:bg-slate-800' : locked ? 'opacity-40 cursor-not-allowed text-slate-500' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
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
                                                className="w-16 h-16 rounded-full bg-orange-900 flex items-center justify-center hover:bg-orange-800 transition-all hover:scale-105">
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
                                          <div className="h-full bg-orange-500 transition-all" style={{ width: `${videoProgress}%` }} />
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
                                       <button onClick={goNextStage} className="w-full py-4 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-800 transition-all">
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
                                                   className="px-8 py-3 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-orange-800 transition-all">
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
                                          <button onClick={goNextStage} className="w-full py-4 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-800 transition-all">
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
                                                   className="px-8 py-3 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-orange-800 transition-all">
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
                                          <button onClick={goNextStage} className="w-full py-4 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-800 transition-all">
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
                                                className="flex-1 rounded-sm bg-orange-500 transition-all"
                                                style={{
                                                   height: `${audioPlaying ? 20 + Math.random() * 80 : 20}%`,
                                                   opacity: audioProgress > (i / 36 * 100) ? 1 : 0.3,
                                                   transition: audioPlaying ? 'height 0.15s ease' : 'none',
                                                }} />
                                          ))}
                                       </div>
                                       {/* Seek bar */}
                                       <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                          <div className="h-full bg-orange-500 transition-all" style={{ width: `${audioProgress}%` }} />
                                       </div>
                                       <div className="flex items-center justify-between">
                                          <button onClick={toggleAudio}
                                             className="w-10 h-10 rounded-full bg-orange-900 flex items-center justify-center hover:bg-orange-800 transition-all">
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
                                          <div className="text-[8px] font-black text-orange-400 uppercase tracking-widest mb-2">Auto-transcript</div>
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
                                                   className="px-8 py-3 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-orange-800 transition-all">
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
                                          <button onClick={goNextStage} className="w-full py-4 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-800 transition-all">
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
                                                className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 font-medium leading-relaxed resize-none focus:outline-none focus:ring-4 focus:ring-orange-900/5 placeholder:text-slate-300 disabled:opacity-60"
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
                                          className="w-full py-4 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-orange-800 transition-all">
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
                                          <button onClick={goNextStage} className="w-full py-4 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-800 transition-all">
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
                                             { label: 'MCQ', val: `${mcqScore}/${MCQ_QUESTIONS.length}`, pct: Math.round(mcqScore / MCQ_QUESTIONS.length * 100), color: 'bg-orange-500' },
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
                                                <div className="h-full bg-orange-900 rounded-full" style={{ width: `${s.pct}%` }} />
                                             </div>
                                             <span className="text-[10px] font-black text-slate-500 w-8 text-right">{s.pct}%</span>
                                          </div>
                                       ))}
                                    </div>

                                    {/* AI Feedback */}
                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                          <Sparkles size={12} className="text-orange-900" /> AI Feedback
                                       </div>
                                       <p className="text-xs text-slate-600 leading-relaxed">
                                          Excellent conceptual grasp of all three laws. Your written explanation of Newton's Third Law showed strong understanding.
                                          <span className="text-amber-600 font-semibold"> Area to improve:</span> Review friction calculations from the listening section.
                                          <span className="text-emerald-600 font-semibold"> Strength:</span> Reading comprehension and extracting key information.
                                       </p>
                                    </div>

                                    <button onClick={() => { markStageDone(5); goNextStage(); }}
                                       className="w-full py-4 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-800 transition-all">
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

                                       <div className="text-sm font-black text-orange-900 uppercase tracking-widest">{course.title}</div>
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
                                       <button onClick={() => { markStageDone(6); }}
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