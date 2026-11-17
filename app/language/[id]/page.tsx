'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  FileText,
  PenTool,
  BookOpen,
  Video,
  Download,
  CheckCircle,
  Lock,
  Trophy,
  Star,
  AlertCircle,
  Globe,
  ArrowRight,
  Info,
  Share2,
  Sparkles,
  X,
  Volume2,
  Type,
  Headphones,
  BookMarked,
  ClipboardList,
  BarChart2,
  Calendar,
  Languages
} from 'lucide-react';
import { MOCK_COURSES, MockCourse } from '@/lib/mock-data';
import { ALL_484_PATHWAYS } from '@/lib/multilingual-data';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LANGUAGE_NATIVE_MAP } from '@/app/language/page';
import { getLanguageVideoUrl } from '@/lib/courses-data';

// ─── Language Lesson sidebar data ──────────────────────────────────────────
const lessons = [
  { id: 1, title: 'Alphabet, Script & Phonetics (वर्णमाला, उच्चारण एवं लिपि)', type: 'video', duration: '18 min', done: true },
  { id: 2, title: 'Essential Greetings & Daily Vocabulary (अभिवादन)', type: 'video', duration: '22 min', done: true },
  { id: 3, title: 'SLM Reading: Nouns, Pronouns & Grammar Rules', type: 'pdf', duration: '15 min', done: true },
  { id: 4, title: 'Practice Quiz – Bilingual Vocabulary & Syntax', type: 'quiz', duration: '10 min', done: false },
  { id: 5, title: 'Conversational Dialogue & Everyday Scenarios', type: 'video', duration: '20 min', done: false },
  { id: 6, title: 'Interactive Flipbook: Multilingual Expressions', type: 'flipbook', duration: '12 min', done: false },
  { id: 7, title: 'Live Pronunciation & Spoken Lab (Recording)', type: 'live', duration: '45 min', done: false },
  { id: 8, title: 'Unit Language Assessment & Certificate', type: 'quiz', duration: '30 min', done: false }
];

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
  { id: 'video', label: 'Video Lesson', icon: Play, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { id: 'mcq', label: 'MCQ Assessment', icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { id: 'reading', label: 'Reading Assessment', icon: BookMarked, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  { id: 'listening', label: 'Listening Assessment', icon: Headphones, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { id: 'writing', label: 'Writing Assessment', icon: PenTool, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  { id: 'report', label: 'Performance Report', icon: BarChart2, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
  { id: 'certificate', label: 'Certificate', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' }
];

// ─── Quiz data (Strictly Language Learning) ────────────────────────────────
const MCQ_QUESTIONS = [
  {
    q: 'Which phrase is the universal polite greeting in Hindi and Sanskrit?',
    opts: ['Alvida', 'Namaste (नमस्ते)', 'Shukriya', 'Theek Hai'],
    ans: 1,
    exp: 'Namaste (नमस्ते) is the traditional and respectful greeting widely used across India.'
  },
  {
    q: 'In Indian linguistics, vowels and consonants are known as:',
    opts: ['Vakya and Shabd', 'Swara (स्वर) and Vyanjana (व्यंजन)', 'Kriya and Karaka', 'Lipi and Bhasha'],
    ans: 1,
    exp: 'Swara (स्वर) refers to vowels, and Vyanjana (व्यंजन) refers to consonants in Indic phonetic systems.'
  },
  {
    q: 'What is the grammatical function of a postposition/vibhakti in Indian languages?',
    opts: ['It modifies only verbs', 'It indicates the relationship between noun/pronoun and other sentence parts', 'It always ends questions', 'It converts adjectives to nouns'],
    ans: 1,
    exp: 'Vibhakti (कारक/विभक्ति) marks case relationships (nominative, accusative, instrumental, etc.).'
  },
  {
    q: 'How many scheduled languages are recognized under the Eighth Schedule of the Constitution of India?',
    opts: ['14', '18', '22', '28'],
    ans: 2,
    exp: 'The Eighth Schedule recognizes 22 official languages, forming a 22x22 matrix of 484 bilateral pathways.'
  },
  {
    q: 'When greeting an elder respectfully in Hindi or related Indian languages, which pronoun is used?',
    opts: ['Tu (तू)', 'Tum (तुम)', 'Aap (आप)', 'Woh (वह)'],
    ans: 2,
    exp: 'Aap (आप) signifies polite, respectful honorific address.'
  }
];

const READING_PASSAGE = `India's linguistic landscape is one of the most vibrant and culturally rich in human history. Under the Eighth Schedule of the Constitution of India, 22 official languages are recognized, encompassing four major language families: Indo-Aryan, Dravidian, Tibeto-Burman, and Austroasiatic.

Language learning in India has historically been intrinsically multilingual. Under the National Education Policy (NEP 2020), mother-tongue learning and bilateral language bridges empower learners to acquire neighboring and national languages with ease. A Hindi speaker learning Tamil or a Bengali speaker acquiring Marathi benefits from shared grammatical concepts, cognate vocabulary, and shared cultural narratives.

Every bilateral pathway connects phonetics, script orthography, core vocabulary, and conversational dialogues. Through systematic study of roots (Dhatu), verb conjugation, and honorific forms, students build authentic spoken fluency and cross-cultural understanding across the nation.`;

const READING_QUESTIONS = [
  { q: 'How many official languages are recognized in the Eighth Schedule?', opts: ['12', '18', '22', '30'], ans: 2, exp: '22 official languages are recognized under the Eighth Schedule.' },
  { q: 'Which national education policy emphasizes mother-tongue learning?', opts: ['NEP 1986', 'NEP 2020', 'Kothari Commission', 'Mudaliar Report'], ans: 1, exp: 'NEP 2020 strongly advocates mother-tongue and multilingual education.' },
  { q: 'What linguistic element refers to root words in Indian grammar?', opts: ['Vakya', 'Sandhi', 'Dhatu (धातु)', 'Samas'], ans: 2, exp: 'Dhatu refers to the verbal root in Indic grammatical tradition.' },
  { q: 'Bilateral pathways help learners by leveraging:', opts: ['Only English translations', 'Shared grammatical concepts and cognate vocabulary', 'Memorization only', 'Latin transliteration alone'], ans: 1, exp: 'Shared structures and cognates make learning between Indian languages intuitive.' }
];

const LISTENING_QUESTIONS = [
  { q: 'What polite greeting was used in the introductory spoken track?', opts: ['Alvida', 'Namaste / Vanakkam', 'Danyavad', 'Shubh Ratri'], ans: 1, exp: 'The spoken track opens with the respectful greeting Namaste / Vanakkam.' },
  { q: 'What was the focus of the dialogue exercise?', opts: ['Airport announcements', 'Marketplace and daily introductions', 'Legal courtroom terms', 'Astronomical calculations'], ans: 1, exp: 'The dialogue practiced everyday introductions and market conversations.' },
  { q: 'The speaker highlighted the importance of clear pronunciation of:', opts: ['Silent letters', 'Aspirated and retroflex sounds (महाप्राण एवं मूर्धन्य)', 'Foreign borrowings only', 'Fast speech speed'], ans: 1, exp: 'Indic phonology emphasizes precise articulation of aspirated and retroflex consonants.' }
];

const WRITING_TASKS = [
  { title: 'Self-Introduction', prompt: 'Write a 4-to-5 sentence self-introduction in your target language including your name, city, hobbies, and why you are learning this language.', minWords: 40 },
  { title: 'Bilingual Dialogue', prompt: 'Compose a dialogue between two friends greeting each other, asking about family, and making weekend plans using polite honorific forms.', minWords: 60 },
  { title: 'Linguistic Heritage Reflection', prompt: 'Reflect on how learning a new Indian language bridges cultural understanding and enriches your daily life.', minWords: 80 }
];

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

function AnswerOption({
  label,
  text,
  state,
  onClick
}: {
  label: string;
  text: string;
  state: 'idle' | 'selected' | 'correct' | 'wrong';
  onClick: () => void;
}) {
  const base = 'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all';
  const variants: Record<string, string> = {
    idle: 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-700 cursor-pointer shadow-2xs',
    selected: 'bg-blue-50 border-blue-400 text-blue-950 font-bold cursor-pointer shadow-xs',
    correct: 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold cursor-default',
    wrong: 'bg-rose-50 border-rose-300 text-rose-800 font-bold cursor-default'
  };

  return (
    <button className={`${base} ${variants[state]}`} onClick={onClick} disabled={state === 'correct' || state === 'wrong'}>
      <span
        className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
          state === 'idle'
            ? 'bg-slate-100 text-slate-600'
            : state === 'selected'
            ? 'bg-blue-900 text-white'
            : state === 'correct'
            ? 'bg-emerald-600 text-white'
            : 'bg-rose-500 text-white'
        }`}
      >
        {label}
      </span>
      <span className="text-xs font-semibold">{text}</span>
      {state === 'correct' && <CheckCircle size={16} className="ml-auto text-emerald-600 shrink-0" />}
      {state === 'wrong' && <X size={16} className="ml-auto text-rose-500 shrink-0" />}
    </button>
  );
}

function StageTracker({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i < current ? 'bg-emerald-500 w-6' : i === current ? 'bg-blue-900 w-8' : 'bg-slate-200 w-4'
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function FeedbackBox({ correct, explanation }: { correct: boolean; explanation: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 p-4 rounded-xl flex gap-3 text-xs leading-relaxed font-medium ${
        correct ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'
      }`}
    >
      {correct ? (
        <CheckCircle size={16} className="shrink-0 mt-0.5 text-emerald-600" />
      ) : (
        <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-500" />
      )}
      <span>
        <strong>{correct ? 'Correct! ' : 'Not quite. '}</strong>
        {explanation}
      </span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE (LIGHT THEME)
// ═══════════════════════════════════════════════════════════════════════════
export default function CoursePlayerPage() {
  const { user, updateLinguisticProfile } = useAuth();
  const params = useParams();
  const id = params.id as string;

  const pathway = ALL_484_PATHWAYS.find((p) => p.id === id);
  const matchedCourse = MOCK_COURSES.find((c) => c.id === id);

  const course: MockCourse = (matchedCourse ||
    (pathway
      ? {
          id: pathway.id,
          title: pathway.title,
          subject: `${pathway.source} to ${pathway.target}`,
          description: `Official NIOS 22x22 bilateral language bridge from ${pathway.source} to ${pathway.target} under NEP 2020.`,
          teacher: pathway.teacher || 'NIOS Multilingual Faculty',
          level: pathway.level,
          lessons: 8,
          duration: '6 hours',
          rating: 4.9,
          tags: pathway.tags,
          enrolled: true,
          currentStage: 'content',
          overallProgress: 65,
          transcript: `Welcome to ${pathway.title}. In this course, you will learn the complete phonetic foundation, core vocabulary, and conversational dialogues bridging ${pathway.source} and ${pathway.target}.`,
          objectives: [
            `Master conversational basics in ${pathway.target} using ${pathway.source}`,
            'Learn core vocabulary and everyday communication phrases',
            'Practice correct phonetics and pronunciation rules',
            'Gain confidence with bilingual dialogues and NIOS certification'
          ],
          summary: `Comprehensive 22x22 bilateral language bridge linking ${pathway.source} and ${pathway.target}. Covers script phonetics, everyday greetings, vocabulary, and dialogue scenarios under NEP 2020.`,
          videoUrl: getLanguageVideoUrl(pathway.target),
          modules: []
        }
      : MOCK_COURSES[0])) as MockCourse;

  // Language pair extraction
  const sourceLang = pathway ? pathway.source : user?.motherLang || 'Hindi';
  const targetLang = pathway ? pathway.target : user?.targetLang || 'Tamil';
  const srcMeta = LANGUAGE_NATIVE_MAP[sourceLang] || LANGUAGE_NATIVE_MAP['Hindi'];
  const tgtMeta = LANGUAGE_NATIVE_MAP[targetLang] || LANGUAGE_NATIVE_MAP['Tamil'];

  // State
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeLesson, setActiveLesson] = useState(1);
  const [note, setNote] = useState('');
  const [fontSize, setFontSize] = useState<'text-sm' | 'text-base' | 'text-lg'>('text-base');
  const [isISLEnabled, setIsISLEnabled] = useState(false);
  const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);

  // Learning flow state
  const [showLearningFlow, setShowLearningFlow] = useState(false);
  const [flowStage, setFlowStage] = useState(0);
  const [stagesDone, setStagesDone] = useState<boolean[]>(Array(7).fill(false));

  // Video stage
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // MCQ stage
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqSelected, setMcqSelected] = useState<number | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqScore, setMcqScore] = useState(0);
  const [mcqDone, setMcqDone] = useState(false);

  // Reading stage
  const [readIdx, setReadIdx] = useState(0);
  const [readSelected, setReadSelected] = useState<number | null>(null);
  const [readSubmitted, setReadSubmitted] = useState(false);
  const [readScore, setReadScore] = useState(0);
  const [readDone, setReadDone] = useState(false);

  // Listening stage
  const [listenIdx, setListenIdx] = useState(0);
  const [listenSelected, setListenSelected] = useState<number | null>(null);
  const [listenSubmitted, setListenSubmitted] = useState(false);
  const [listenScore, setListenScore] = useState(0);
  const [listenDone, setListenDone] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Writing stage
  const [writings, setWritings] = useState(['', '', '']);
  const [writingSubmitted, setWritingSubmitted] = useState(false);

  useEffect(() => {
    synth.current = window.speechSynthesis;
    return () => {
      synth.current?.cancel();
    };
  }, []);

  const handleReadAloud = () => {
    if (isReadingAloud) {
      synth.current?.cancel();
      setIsReadingAloud(false);
    } else {
      const u = new SpeechSynthesisUtterance(course.transcript || course.description || '');
      u.onend = () => setIsReadingAloud(false);
      synth.current?.speak(u);
      setIsReadingAloud(true);
    }
  };

  const playGreetingAudio = (text: string, voiceLang: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voiceLang || 'hi-IN';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  const toggleFontSize = () => {
    const sizes: ('text-sm' | 'text-base' | 'text-lg')[] = ['text-sm', 'text-base', 'text-lg'];
    setFontSize(sizes[(sizes.indexOf(fontSize) + 1) % sizes.length]);
  };

  // Video simulation
  const startVideo = () => {
    setVideoPlaying(true);
    videoTimer.current = setInterval(() => {
      setVideoProgress((p) => {
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

  // Stage helpers
  const markStageDone = (idx: number) => {
    setStagesDone((prev) => {
      const n = [...prev];
      n[idx] = true;
      return n;
    });
  };

  const goNextStage = () => {
    const next = flowStage + 1;
    if (next < LEARNING_STAGES.length) {
      setFlowStage(next);
      if (next === 1) {
        setMcqIndex(0);
        setMcqSelected(null);
        setMcqSubmitted(false);
        setMcqScore(0);
        setMcqDone(false);
      }
      if (next === 2) {
        setReadIdx(0);
        setReadSelected(null);
        setReadSubmitted(false);
        setReadScore(0);
        setReadDone(false);
      }
      if (next === 3) {
        setListenIdx(0);
        setListenSelected(null);
        setListenSubmitted(false);
        setListenScore(0);
        setListenDone(false);
      }
    }
  };

  // MCQ logic
  const submitMCQ = () => {
    if (mcqSelected === null) return;
    const correct = mcqSelected === MCQ_QUESTIONS[mcqIndex].ans;
    setMcqSubmitted(true);
    if (correct) setMcqScore((s) => s + 1);
  };

  const nextMCQ = () => {
    if (mcqIndex < MCQ_QUESTIONS.length - 1) {
      setMcqIndex((i) => i + 1);
      setMcqSelected(null);
      setMcqSubmitted(false);
    } else {
      setMcqDone(true);
      markStageDone(1);
    }
  };

  // Reading logic
  const submitReading = () => {
    if (readSelected === null) return;
    const correct = readSelected === READING_QUESTIONS[readIdx].ans;
    setReadSubmitted(true);
    if (correct) setReadScore((s) => s + 1);
  };

  const nextReading = () => {
    if (readIdx < READING_QUESTIONS.length - 1) {
      setReadIdx((i) => i + 1);
      setReadSelected(null);
      setReadSubmitted(false);
    } else {
      setReadDone(true);
      markStageDone(2);
    }
  };

  // Listening logic
  const toggleAudio = () => {
    if (audioPlaying) {
      clearInterval(audioTimer.current!);
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      audioTimer.current = setInterval(() => {
        setAudioProgress((p) => {
          if (p >= 100) {
            clearInterval(audioTimer.current!);
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
    if (correct) setListenScore((s) => s + 1);
  };

  const nextListening = () => {
    if (listenIdx < LISTENING_QUESTIONS.length - 1) {
      setListenIdx((i) => i + 1);
      setListenSelected(null);
      setListenSubmitted(false);
    } else {
      setListenDone(true);
      markStageDone(3);
    }
  };

  // Writing logic
  const allWritingMet = WRITING_TASKS.every((t, i) => wordCount(writings[i]) >= t.minWords);
  const submitWriting = () => {
    setWritingSubmitted(true);
    markStageDone(4);
    markStageDone(5);
  };

  // Overall Score
  const overallScore = Math.round(
    ((mcqScore / MCQ_QUESTIONS.length) * 100 +
      (readScore / READING_QUESTIONS.length) * 100 +
      (listenScore / LISTENING_QUESTIONS.length) * 100 +
      (writingSubmitted ? 80 : 0)) /
      4
  );
  const scoreRing = Math.max(0, Math.min(100, overallScore || 85));
  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (scoreRing / 100) * circumference;

  const optionState = (
    selected: number | null,
    submitted: boolean,
    correctAns: number,
    optIdx: number
  ): 'idle' | 'selected' | 'correct' | 'wrong' => {
    if (!submitted) return selected === optIdx ? 'selected' : 'idle';
    if (optIdx === correctAns) return 'correct';
    if (optIdx === selected) return 'wrong';
    return 'idle';
  };

  return (
    <DashboardLayout
      title={course.title}
      subtitle={`National Multilingual Matrix · ${sourceLang} ➔ ${targetLang} · ${course.lessons} Modules`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start pb-20">

        {/* ── Main Classroom Area (Light Theme) ── */}
        <div className="space-y-6">

          {/* Top Bar: Bilingual Direction & Quick Badges */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-amber-50/60 border border-blue-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-xl bg-blue-900 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                {course.id.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-200 flex items-center gap-1.5">
                <Globe size={12} className="text-amber-700" />
                <span>{sourceLang} ({srcMeta.native}) ➔ {targetLang} ({tgtMeta.native})</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-200">
                NEP 2020 Bilateral Bridge
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/student/learn-language?source=${encodeURIComponent(sourceLang)}&target=${encodeURIComponent(targetLang)}`}>
                <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-blue-200 shadow-2xs">
                  <Languages size={14} className="text-blue-700" />
                  <span>Language Lab</span>
                </button>
              </Link>
              <button
                onClick={() => playGreetingAudio(tgtMeta.greeting, tgtMeta.voiceLang)}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Hear Greeting"
              >
                <Volume2 size={14} className="text-amber-600" />
                <span>Hear Native</span>
              </button>
            </div>
          </div>

          {/* Video / Interactive Player (Light Theme Frame) */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-lg relative">
            <div className="aspect-[16/6] w-full bg-black relative">
              {activeLesson === 6 ? (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-900 flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
                  <BookOpen size={44} className="text-amber-400 mx-auto" />
                  <h4 className="font-black text-lg">Interactive 3D Language Flipbook</h4>
                  <p className="text-slate-300 text-xs max-w-md mx-auto">
                    Flip through the official bilingual SLM vocabulary bank, grammar tables, and dialogues.
                  </p>
                  <Link href="/student/library">
                    <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer">
                      Open in SLM Reader
                    </button>
                  </Link>
                </div>
              ) : (course.videoUrl?.endsWith('.mp4') || course.videoUrl?.startsWith('/courses/')) ? (
                <video
                  src={course.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(course.videoUrl || '')}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* Subtitles Overlay */}
              {isSubtitlesEnabled && (
                <div className="absolute bottom-12 left-6 right-6 p-3 bg-black/75 backdrop-blur-md rounded-xl border border-white/20 text-center">
                  <p className="text-white text-xs font-semibold leading-relaxed">
                    &ldquo;{course.transcript?.substring(0, 140)}...&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Bar inside Player */}
            <div className="p-3 bg-slate-950 text-white flex items-center justify-between text-xs border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-2">
                <Play size={13} className="text-amber-400 fill-amber-400" />
                <span>Active: <strong>Lesson {activeLesson}</strong> — {lessons[activeLesson - 1]?.title}</span>
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-400">
                HD · Bilingual Audio
              </span>
            </div>
          </div>

          {/* AI Accessibility & Learning Tools Strip (Light Theme) */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  isSubtitlesEnabled
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>📝 Subtitles</span>
              </button>

              <button
                onClick={() => setIsISLEnabled(!isISLEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  isISLEnabled
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>🤟 Sign (ISL)</span>
              </button>

              <button
                onClick={handleReadAloud}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  isReadingAloud
                    ? 'bg-emerald-600 text-white animate-pulse'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Volume2 size={14} />
                <span>{isReadingAloud ? 'Reading...' : 'Read Aloud'}</span>
              </button>

              <button
                onClick={toggleFontSize}
                className="p-2 bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
                title="Change Text Size"
              >
                <Type size={16} />
              </button>

              <button
                onClick={() => setShowAISummary(!showAISummary)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  showAISummary
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
                title="Gemini Language Summary"
              >
                <Sparkles size={16} className="text-amber-600" />
              </button>
            </div>

            <button
              onClick={() => setShowLearningFlow(true)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ClipboardList size={14} />
              <span>Launch Assessment Flow</span>
            </button>
          </div>

          {/* Content Tabs (Overview, Notes, Resources, Discussion, TMA) */}
          <div className="space-y-4">
            <div className="flex gap-2 border-b border-slate-200 pb-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all rounded-xl cursor-pointer ${
                    activeTab === t
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className={`p-6 bg-white rounded-2xl border border-slate-200 shadow-xs ${fontSize}`}>
              {activeTab === 'Overview' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{course.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-normal">{course.description}</p>
                  </div>

                  {/* Native Script Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-blue-900">
                        Target Language Native Script:
                      </div>
                      <div className="text-lg font-black text-slate-900 mt-0.5">
                        {tgtMeta.native} — {tgtMeta.script} Script ({tgtMeta.family} Family)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Greeting Sample</div>
                      <div className="text-sm font-bold text-blue-900">{tgtMeta.greeting}</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">Learning Objectives:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(course.objectives || [
                        'Master foundational vocabulary',
                        'Learn pronunciation and grammar',
                        'Practice conversational dialogue'
                      ]).map((obj: string, i: number) => (
                        <div key={i} className="flex gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                            ✓
                          </div>
                          <span className="text-xs font-bold text-slate-800">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Notes' && (
                <div className="space-y-4">
                  <textarea
                    className="w-full h-44 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-medium placeholder:text-slate-400"
                    placeholder="Take notes on new vocabulary, pronunciation tips, or grammar rules here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <button className="px-6 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-blue-800 transition-all cursor-pointer">
                      Save Notes
                    </button>
                    <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer">
                      Export Markdown
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Resources' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Bilingual Lexicon & Word Bank', type: 'PDF · 2.4MB', icon: BookOpen },
                    { name: 'Phonetic Sound & Alphabet Chart', type: 'PDF · 1.8MB', icon: FileText },
                    { name: 'Grammar Rules & Conjugation Guide', type: 'PDF · 3.1MB', icon: FileText },
                    { name: 'Daily Conversational Dialogue Transcripts', type: 'PDF · 1.5MB', icon: PenTool }
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl flex items-center justify-between transition-all hover:shadow-md group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center font-bold">
                          <r.icon size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{r.name}</div>
                          <div className="text-[10px] font-semibold text-slate-500 uppercase">{r.type}</div>
                        </div>
                      </div>
                      <button className="p-2 text-slate-500 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Discussion' && (
                <div className="p-6 text-center text-slate-500 space-y-2">
                  <Languages size={32} className="mx-auto text-slate-400" />
                  <h4 className="text-sm font-bold text-slate-800">Bilingual Peer Exchange</h4>
                  <p className="text-xs max-w-sm mx-auto">
                    Connect with fellow learners acquiring {targetLang} through {sourceLang}. Ask questions and practice phrases.
                  </p>
                </div>
              )}

              {activeTab === 'TMA' && (
                <div className="p-6 text-center text-slate-500 space-y-2">
                  <PenTool size={32} className="mx-auto text-slate-400" />
                  <h4 className="text-sm font-bold text-slate-800">Tutor Marked Assignment (TMA)</h4>
                  <p className="text-xs max-w-sm mx-auto">
                    Submit your spoken audio recording and written bilingual composition for mentor evaluation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Sidebar: AI Language Summary & Curriculum Progress (Light Theme) ── */}
        <aside className="space-y-6 lg:sticky lg:top-8">

          {/* Gemini Language Summary (Light Theme) */}
          {showAISummary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-amber-50/60 border border-blue-200/90 shadow-md text-slate-900 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-600" /> Gemini Language Summary
                </span>
                <button onClick={() => setShowAISummary(false)} className="text-slate-400 hover:text-slate-700">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-black uppercase text-blue-900 tracking-wider">Key Concept:</div>
                <p className="text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-blue-100 shadow-2xs">
                  {course.summary}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                {[
                  'Bilingual Vocabulary Bank',
                  'Phonetics & Pronunciation Guide',
                  'Dialogue Practice & NIOS Certification'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                    <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Curriculum Modules List (Light Theme) */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-600">
                <span>Modules Progress</span>
                <span className="text-blue-900 font-bold">{activeLesson}/8 Active</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-700 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${(activeLesson / 8) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {lessons.map((l) => {
                const isActive = activeLesson === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setActiveLesson(l.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/70'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : l.done
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {l.done && !isActive ? <CheckCircle size={14} /> : l.id}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate leading-tight">{l.title}</div>
                      <div
                        className={`text-[10px] mt-0.5 font-medium ${
                          isActive ? 'text-blue-200' : 'text-slate-500'
                        }`}
                      >
                        {l.duration} · {l.type.toUpperCase()}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <Link href="/student/library" className="block w-full">
              <button className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-950 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-blue-200 cursor-pointer">
                <span>Browse Full Syllabus &amp; SLM</span>
                <ArrowRight size={13} />
              </button>
            </Link>
          </div>

        </aside>

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LEARNING FLOW MODAL (100% LIGHT THEME)
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showLearningFlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col md:flex-row overflow-hidden"
            >
              {/* Left Navigation (Light Theme) */}
              <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
                <div className="p-5 border-b border-slate-200">
                  <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                    Language Assessment
                  </div>
                  <div className="text-sm font-black text-slate-900 truncate leading-tight">
                    {course.title}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-5 pt-3 pb-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                    <span>Progress</span>
                    <span className="text-blue-900">
                      {stagesDone.filter(Boolean).length}/{LEARNING_STAGES.length} Complete
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-900 rounded-full transition-all duration-500"
                      style={{ width: `${(stagesDone.filter(Boolean).length / LEARNING_STAGES.length) * 100}%` }}
                    />
                  </div>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                  {LEARNING_STAGES.map((s, i) => {
                    const Icon = s.icon;
                    const active = flowStage === i;
                    const done = stagesDone[i];
                    const locked = i > 0 && !stagesDone[i - 1];

                    return (
                      <button
                        key={s.id}
                        onClick={() => !locked && setFlowStage(i)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                          active
                            ? 'bg-blue-900 text-white shadow-xs font-bold'
                            : done
                            ? 'text-slate-800 hover:bg-slate-100 font-semibold'
                            : locked
                            ? 'opacity-40 cursor-not-allowed text-slate-400'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            active
                              ? 'bg-white/20 text-white'
                              : done
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {done && !active ? <CheckCircle size={13} /> : locked ? <Lock size={12} /> : <Icon size={13} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs truncate">{s.label}</div>
                          {done && <div className="text-[9px] text-emerald-600 font-bold">Done ✓</div>}
                        </div>
                      </button>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-slate-200">
                  <button
                    onClick={() => setShowLearningFlow(false)}
                    className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    ← Back to Classroom
                  </button>
                </div>
              </div>

              {/* Right Content Area (Light Theme) */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={flowStage}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* ── STAGE 0: VIDEO ── */}
                    {flowStage === 0 && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                            Stage 1 · Watch &amp; Comprehend
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">Video Lecture &amp; Phonetics</h2>
                        </div>

                        <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-video flex flex-col items-center justify-center relative shadow-lg">
                          {!videoPlaying && videoProgress === 0 && (
                            <div className="text-center space-y-3 p-6">
                              <button
                                onClick={startVideo}
                                className="w-16 h-16 rounded-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center mx-auto shadow-xl transition-all hover:scale-105 cursor-pointer"
                              >
                                <Play size={24} fill="currentColor" className="ml-1" />
                              </button>
                              <p className="text-white text-xs font-bold uppercase tracking-wider">
                                Click to Play Spoken Lesson (18 min)
                              </p>
                            </div>
                          )}

                          {(videoPlaying || videoProgress > 0) && (
                            <div className="text-center text-white space-y-2">
                              <div className="text-sm font-bold">
                                {videoProgress < 100 ? 'Playing lecture audio & visual...' : '✓ Video lecture complete'}
                              </div>
                              <div className="text-xs text-slate-400">
                                {Math.round((videoProgress / 100) * 18)}:00 / 18:00 min
                              </div>
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                            <div
                              className="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${videoProgress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={markVideoDone}
                            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                          >
                            Mark Lesson Watched ✓
                          </button>
                          {stagesDone[0] && (
                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                              <CheckCircle size={15} /> Ready for MCQ Quiz
                            </span>
                          )}
                        </div>

                        {stagesDone[0] && (
                          <button
                            onClick={goNextStage}
                            className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                          >
                            Continue to Stage 2: MCQ Quiz →
                          </button>
                        )}
                      </div>
                    )}

                    {/* ── STAGE 1: MCQ ── */}
                    {flowStage === 1 && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                            Stage 2 · Language Quiz
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">Bilingual Vocabulary &amp; Grammar MCQ</h2>
                        </div>

                        {!mcqDone ? (
                          <>
                            <StageTracker
                              current={mcqIndex}
                              total={MCQ_QUESTIONS.length}
                              label={`Question ${mcqIndex + 1} of ${MCQ_QUESTIONS.length}`}
                            />
                            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                              <p className="text-base font-bold text-slate-900">{MCQ_QUESTIONS[mcqIndex].q}</p>
                              <div className="space-y-2.5">
                                {MCQ_QUESTIONS[mcqIndex].opts.map((opt, i) => (
                                  <AnswerOption
                                    key={i}
                                    label={String.fromCharCode(65 + i)}
                                    text={opt}
                                    state={optionState(mcqSelected, mcqSubmitted, MCQ_QUESTIONS[mcqIndex].ans, i)}
                                    onClick={() => !mcqSubmitted && setMcqSelected(i)}
                                  />
                                ))}
                              </div>
                              {mcqSubmitted && (
                                <FeedbackBox
                                  correct={mcqSelected === MCQ_QUESTIONS[mcqIndex].ans}
                                  explanation={MCQ_QUESTIONS[mcqIndex].exp}
                                />
                              )}
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-500">
                                Current Score: {mcqScore} / {mcqIndex + (mcqSubmitted ? 1 : 0)}
                              </span>
                              {!mcqSubmitted ? (
                                <button
                                  onClick={submitMCQ}
                                  disabled={mcqSelected === null}
                                  className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all cursor-pointer shadow-sm"
                                >
                                  Submit Answer
                                </button>
                              ) : (
                                <button
                                  onClick={nextMCQ}
                                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                                >
                                  {mcqIndex < MCQ_QUESTIONS.length - 1 ? 'Next Question →' : 'Finish Quiz →'}
                                </button>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-2xl">
                              ✓
                            </div>
                            <div className="text-3xl font-black text-slate-900">
                              {mcqScore} / {MCQ_QUESTIONS.length}
                            </div>
                            <p className="text-xs font-bold text-slate-600">
                              MCQ Section completed successfully!
                            </p>
                            <button
                              onClick={goNextStage}
                              className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                            >
                              Continue to Reading Assessment →
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── STAGE 2: READING ── */}
                    {flowStage === 2 && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                            Stage 3 · Reading Comprehension
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">Multilingual Reading Passage</h2>
                        </div>

                        {/* Passage (Light Theme) */}
                        <div className="p-5 bg-blue-50/50 border border-blue-200/80 rounded-2xl space-y-2">
                          <div className="text-[10px] font-black uppercase text-blue-900 tracking-wider">
                            Passage · India&apos;s Multilingual Matrix &amp; Bilateral Bridges
                          </div>
                          <div className="text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto pr-2 space-y-2 font-medium">
                            {READING_PASSAGE.split('\n\n').map((para, i) => (
                              <p key={i}>{para}</p>
                            ))}
                          </div>
                        </div>

                        {!readDone ? (
                          <>
                            <StageTracker
                              current={readIdx}
                              total={READING_QUESTIONS.length}
                              label={`Reading Question ${readIdx + 1} of ${READING_QUESTIONS.length}`}
                            />
                            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                              <p className="text-sm font-bold text-slate-900">{READING_QUESTIONS[readIdx].q}</p>
                              <div className="space-y-2.5">
                                {READING_QUESTIONS[readIdx].opts.map((opt, i) => (
                                  <AnswerOption
                                    key={i}
                                    label={String.fromCharCode(65 + i)}
                                    text={opt}
                                    state={optionState(readSelected, readSubmitted, READING_QUESTIONS[readIdx].ans, i)}
                                    onClick={() => !readSubmitted && setReadSelected(i)}
                                  />
                                ))}
                              </div>
                              {readSubmitted && (
                                <FeedbackBox
                                  correct={readSelected === READING_QUESTIONS[readIdx].ans}
                                  explanation={READING_QUESTIONS[readIdx].exp}
                                />
                              )}
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-500">
                                Score: {readScore} / {readIdx + (readSubmitted ? 1 : 0)}
                              </span>
                              {!readSubmitted ? (
                                <button
                                  onClick={submitReading}
                                  disabled={readSelected === null}
                                  className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all cursor-pointer shadow-sm"
                                >
                                  Submit Answer
                                </button>
                              ) : (
                                <button
                                  onClick={nextReading}
                                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                                >
                                  {readIdx < READING_QUESTIONS.length - 1 ? 'Next Question →' : 'Finish Reading →'}
                                </button>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4">
                            <div className="text-3xl font-black text-slate-900">
                              {readScore} / {READING_QUESTIONS.length}
                            </div>
                            <p className="text-xs font-bold text-slate-600">Reading Comprehension Section Complete!</p>
                            <button
                              onClick={goNextStage}
                              className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                            >
                              Continue to Listening Assessment →
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── STAGE 3: LISTENING ── */}
                    {flowStage === 3 && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                            Stage 4 · Listening &amp; Spoken Accent
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">Listening Comprehension</h2>
                        </div>

                        {/* Audio Player (Light Theme) */}
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-4 shadow-xs">
                          <div className="text-xs font-black uppercase text-blue-900 tracking-wider">
                            Audio Track · Bilingual Spoken Dialogue &amp; Phonetics
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-blue-100 flex items-center justify-between">
                            <button
                              onClick={toggleAudio}
                              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                            >
                              <Volume2 size={16} />
                              <span>{audioPlaying ? 'Pause Audio' : 'Play Spoken Dialogue'}</span>
                            </button>
                            <span className="text-xs font-bold text-slate-500">
                              {Math.round((audioProgress / 100) * 8)}:30 / 8:30 min
                            </span>
                          </div>

                          <div className="p-3.5 bg-white rounded-xl border border-blue-100 text-xs text-slate-600 italic">
                            &ldquo;In this spoken dialogue, notice how honorific greetings like Namaste and Vanakkam set a respectful tone in daily communication. Listen carefully to vowel lengths and retroflex sounds...&rdquo;
                          </div>
                        </div>

                        {!listenDone ? (
                          <>
                            <StageTracker
                              current={listenIdx}
                              total={LISTENING_QUESTIONS.length}
                              label={`Audio Question ${listenIdx + 1} of ${LISTENING_QUESTIONS.length}`}
                            />
                            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                              <p className="text-sm font-bold text-slate-900">{LISTENING_QUESTIONS[listenIdx].q}</p>
                              <div className="space-y-2.5">
                                {LISTENING_QUESTIONS[listenIdx].opts.map((opt, i) => (
                                  <AnswerOption
                                    key={i}
                                    label={String.fromCharCode(65 + i)}
                                    text={opt}
                                    state={optionState(listenSelected, listenSubmitted, LISTENING_QUESTIONS[listenIdx].ans, i)}
                                    onClick={() => !listenSubmitted && setListenSelected(i)}
                                  />
                                ))}
                              </div>
                              {listenSubmitted && (
                                <FeedbackBox
                                  correct={listenSelected === LISTENING_QUESTIONS[listenIdx].ans}
                                  explanation={LISTENING_QUESTIONS[listenIdx].exp}
                                />
                              )}
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-500">
                                Score: {listenScore} / {listenIdx + (listenSubmitted ? 1 : 0)}
                              </span>
                              {!listenSubmitted ? (
                                <button
                                  onClick={submitListening}
                                  disabled={listenSelected === null}
                                  className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all cursor-pointer shadow-sm"
                                >
                                  Submit Answer
                                </button>
                              ) : (
                                <button
                                  onClick={nextListening}
                                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                                >
                                  {listenIdx < LISTENING_QUESTIONS.length - 1 ? 'Next Question →' : 'Finish Listening →'}
                                </button>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4">
                            <div className="text-3xl font-black text-slate-900">
                              {listenScore} / {LISTENING_QUESTIONS.length}
                            </div>
                            <p className="text-xs font-bold text-slate-600">Listening Section Complete!</p>
                            <button
                              onClick={goNextStage}
                              className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                            >
                              Continue to Writing Assessment →
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── STAGE 4: WRITING ── */}
                    {flowStage === 4 && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                            Stage 5 · Composition &amp; Script
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">Bilingual Writing Assessment</h2>
                        </div>

                        {WRITING_TASKS.map((task, i) => {
                          const wc = wordCount(writings[i]);
                          const met = wc >= task.minWords;

                          return (
                            <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="text-[10px] font-black text-blue-900 uppercase tracking-wider">
                                    Task {i + 1} · {task.title}
                                  </div>
                                  <p className="text-xs font-bold text-slate-800 mt-0.5">{task.prompt}</p>
                                </div>
                                <span
                                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                                    met
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                      : 'bg-white text-slate-600 border-slate-200'
                                  }`}
                                >
                                  min {task.minWords}w
                                </span>
                              </div>

                              <textarea
                                disabled={writingSubmitted}
                                value={writings[i]}
                                onChange={(e) => {
                                  const n = [...writings];
                                  n[i] = e.target.value;
                                  setWritings(n);
                                }}
                                placeholder="Type your response in target or transliterated script..."
                                className="w-full h-28 p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
                              />

                              <div className="flex items-center justify-between text-xs">
                                <span className={met ? 'text-emerald-700 font-bold' : 'text-slate-500 font-medium'}>
                                  {met ? '✓ Minimum word count reached' : `${wc} / ${task.minWords} words`}
                                </span>
                                {met && <CheckCircle size={15} className="text-emerald-600" />}
                              </div>
                            </div>
                          );
                        })}

                        {!writingSubmitted ? (
                          <button
                            onClick={submitWriting}
                            disabled={!allWritingMet}
                            className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all shadow-md cursor-pointer"
                          >
                            Submit Bilingual Writing Tasks
                          </button>
                        ) : (
                          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                            <div className="text-xs font-black text-emerald-900">
                              ✓ Writing Tasks Recorded &amp; AI Evaluated!
                            </div>
                            <button
                              onClick={goNextStage}
                              className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                            >
                              View Performance Report →
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── STAGE 5: REPORT ── */}
                    {flowStage === 5 && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                            Stage 6 · Holistic Evaluation
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">Performance Report</h2>
                        </div>

                        {/* Overall Score Card (Light Theme) */}
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-xs flex items-center gap-8">
                          <div className="relative shrink-0">
                            <svg width="100" height="100" viewBox="0 0 120 120">
                              <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="#1e3a8a"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={dashOffset}
                                transform="rotate(-90 60 60)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="text-xl font-black text-slate-900">{scoreRing}%</div>
                              <div className="text-[8px] text-slate-500 uppercase font-bold">Overall</div>
                            </div>
                          </div>

                          <div className="space-y-2 flex-1">
                            {[
                              { label: 'MCQ Quiz', val: `${mcqScore}/${MCQ_QUESTIONS.length}`, pct: Math.round((mcqScore / MCQ_QUESTIONS.length) * 100), color: 'bg-blue-600' },
                              { label: 'Reading Comprehension', val: `${readScore}/${READING_QUESTIONS.length}`, pct: Math.round((readScore / READING_QUESTIONS.length) * 100), color: 'bg-indigo-600' },
                              { label: 'Listening Comprehension', val: `${listenScore}/${LISTENING_QUESTIONS.length}`, pct: Math.round((listenScore / LISTENING_QUESTIONS.length) * 100), color: 'bg-amber-600' },
                              { label: 'Writing Expression', val: writingSubmitted ? 'Verified' : 'Pending', pct: writingSubmitted ? 85 : 0, color: 'bg-emerald-600' }
                            ].map((r) => (
                              <div key={r.label} className="space-y-1">
                                <div className="flex justify-between text-[11px] font-bold text-slate-700">
                                  <span>{r.label}</span>
                                  <span>{r.val}</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Linguistic Feedback */}
                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <div className="text-[10px] font-black uppercase text-blue-900 tracking-wider flex items-center gap-1.5">
                            <Sparkles size={13} className="text-amber-600" /> AI Linguistic Feedback:
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            Excellent phonetic grasp and syntax comprehension! Your written dialogue demonstrated natural conversational fluency and polite address.
                            <span className="text-emerald-700 font-bold"> Strength:</span> Bilingual reading comprehension and phoneme recognition.
                            <span className="text-amber-800 font-bold"> Suggestion:</span> Continue practicing daily spoken listening exercises to further hone native accent articulation.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            markStageDone(5);
                            goNextStage();
                          }}
                          className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                        >
                          Claim Your Certificate →
                        </button>
                      </div>
                    )}

                    {/* ── STAGE 6: CERTIFICATE (LIGHT THEME) ── */}
                    {flowStage === 6 && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">
                            Stage 7 · Accredited Credential
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">Certificate of Completion</h2>
                        </div>

                        {/* Certificate Card (Light Theme) */}
                        <div className="relative border-2 border-amber-300 rounded-3xl p-8 bg-gradient-to-br from-amber-50/70 via-white to-blue-50/50 text-center space-y-4 shadow-md">
                          <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center mx-auto text-amber-700">
                            <Trophy size={28} />
                          </div>

                          <div className="text-xs font-black text-amber-800 uppercase tracking-[3px]">
                            National Institute of Open Schooling
                          </div>
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Department of Languages &amp; Multilingual Education
                          </div>

                          <div className="pt-2">
                            <div className="text-xs text-slate-500">This certifies that</div>
                            <div className="text-2xl font-black text-slate-900 mt-1">
                              {user?.name || 'Arjun Sharma'}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              has successfully achieved proficiency in
                            </div>
                            <div className="text-lg font-black text-blue-950 mt-1">
                              {course.title}
                            </div>
                            <div className="text-xs font-bold text-amber-800 mt-0.5">
                              NEP 2020 22×22 Bilateral Language Pathway ({sourceLang} ➔ {targetLang})
                            </div>
                          </div>

                          <div className="flex justify-center gap-6 pt-3 text-xs text-slate-600 border-t border-slate-200">
                            <div>
                              <div className="font-bold text-slate-900">Grade A+ ({scoreRing}%)</div>
                              <div className="text-[9px] uppercase font-semibold text-slate-400">Proficiency Score</div>
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">NIOS-MLP-2026</div>
                              <div className="text-[9px] uppercase font-semibold text-slate-400">Verification ID</div>
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">Verified QR</div>
                              <div className="text-[9px] uppercase font-semibold text-slate-400">Digital Seal</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => markStageDone(6)}
                            className="py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                          >
                            ⬇ Download PDF Certificate
                          </button>
                          <button
                            onClick={() => setShowLearningFlow(false)}
                            className="py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                          >
                            Complete &amp; Return to Hub
                          </button>
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