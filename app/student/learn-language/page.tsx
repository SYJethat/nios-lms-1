'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Headphones,
  BookOpen,
  PenTool,
  Globe,
  BarChart2,
  Zap,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  Volume2,
  ChevronRight,
  Trophy,
  Target,
  ArrowRight,
  Gamepad2,
  Sparkles,
  Search,
  Filter,
  Award,
  Layers,
  Video,
  Download,
  RotateCcw,
  Check,
  Languages,
  BookMarked,
  Printer
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import { INDIAN_LANGUAGES_22 } from '@/lib/courses-data';
import { ALL_484_PATHWAYS, Pathway } from '@/lib/multilingual-data';

// Types
type Mode = 'pathways' | 'speaking' | 'listening' | 'reading' | 'writing' | 'video-lab';
type Level = 'beginner' | 'intermediate' | 'advanced';

interface Feedback {
  score: number;
  pronunciation?: number;
  fluency?: number;
  grammar?: number;
  confidence?: number;
  suggestions: string[];
}

export default function LearnLanguagePage() {
  const { user, updateLinguisticProfile } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [activeMode, setActiveMode] = useState<Mode>('pathways');
  const [level, setLevel] = useState<Level>('beginner');
  const [sourceLang, setSourceLang] = useState<string>(activeUser.motherLang || 'Hindi');
  const [targetLang, setTargetLang] = useState<string>(activeUser.targetLang || 'Tamil');
  const [pathwaySearch, setPathwaySearch] = useState<string>('');
  const [showCertificate, setShowCertificate] = useState(false);

  const [progress, setProgress] = useState({
    pathways: 85,
    speaking: 70,
    listening: 80,
    reading: 65,
    writing: 55
  });

  // Keep mother language in sync with AuthContext
  const handleSourceLangChange = (lang: string) => {
    setSourceLang(lang);
    if (updateLinguisticProfile) {
      updateLinguisticProfile(lang, targetLang);
    }
  };

  const handleTargetLangChange = (lang: string) => {
    setTargetLang(lang);
    if (updateLinguisticProfile) {
      updateLinguisticProfile(sourceLang, lang);
    }
  };

  // Filter 484 Pathways
  const filteredPathways = ALL_484_PATHWAYS.filter((p) => {
    const matchesSource = !sourceLang || p.source.toLowerCase() === sourceLang.toLowerCase();
    const matchesTarget = !targetLang || p.target.toLowerCase() === targetLang.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(pathwaySearch.toLowerCase()) ||
      p.source.toLowerCase().includes(pathwaySearch.toLowerCase()) ||
      p.target.toLowerCase().includes(pathwaySearch.toLowerCase());
    return (matchesSource || matchesTarget) && matchesSearch;
  }).slice(0, 24); // Show top 24 pathways for clean performance

  const modes = [
    { id: 'pathways', label: '484 Pathways', sub: '23-Lang Matrix', icon: <Layers className="w-5 h-5" />, color: 'bg-indigo-600' },
    { id: 'speaking', label: 'Speaking Lab', sub: 'Voice & Fluency', icon: <Mic className="w-5 h-5" />, color: 'bg-rose-600' },
    { id: 'listening', label: 'Listening Lab', sub: 'TTS Comprehension', icon: <Headphones className="w-5 h-5" />, color: 'bg-blue-600' },
    { id: 'reading', label: 'Reading & Vocab', sub: 'Clickable Lexicon', icon: <BookOpen className="w-5 h-5" />, color: 'bg-emerald-600' },
    { id: 'writing', label: 'Writing & Grammar', sub: 'AI Composition Check', icon: <PenTool className="w-5 h-5" />, color: 'bg-amber-600' },
    { id: 'video-lab', label: '23-Lang Video Stream', sub: 'Synced Master Dubs', icon: <Video className="w-5 h-5" />, color: 'bg-purple-600' },
  ];

  return (
    <DashboardLayout
      title="National Multilingual Language Lab"
      subtitle={`${activeUser.name} · NEP 2020 23 Scheduled Languages & 484 Bilateral Learning Pathways`}
    >
      <div className="space-y-8 animate-fade-in pb-20">

        {/* ── 1. TOP CONTROL BAR: SOURCE & TARGET LANGUAGE MATRIX ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center shadow-md shrink-0">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    23 Indian Languages Bilingual Matrix
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                    484 Pathways
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Learn any scheduled Indian language natively through your mother tongue with synchronized audio & AI evaluation.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/gamification"
                className="px-4 py-2.5 bg-[#FF9933] text-[#051C45] rounded-xl font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Gamified Arena (XP)</span>
              </Link>
              <button
                onClick={() => setShowCertificate(true)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Lab Certificate</span>
              </button>
            </div>
          </div>

          {/* Language Pair Selectors & Difficulty Bar */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-4 pt-4 border-t border-slate-100 items-center">
            {/* Source / Mother Tongue */}
            <div className="lg:col-span-4 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                I Speak (Mother Tongue / स्रोत भाषा):
              </label>
              <select
                value={sourceLang}
                onChange={(e) => handleSourceLangChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer"
              >
                {INDIAN_LANGUAGES_22.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.name} ({lang.native})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Language */}
            <div className="lg:col-span-4 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                I Want to Learn (Target / लक्ष्य भाषा):
              </label>
              <select
                value={targetLang}
                onChange={(e) => handleTargetLangChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer"
              >
                {INDIAN_LANGUAGES_22.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.name} ({lang.native})
                  </option>
                ))}
              </select>
            </div>

            {/* Level Selector */}
            <div className="lg:col-span-4 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Proficiency Level:
              </label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {(['beginner', 'intermediate', 'advanced'] as Level[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${level === l
                        ? 'bg-white text-blue-900 shadow-sm font-black'
                        : 'text-slate-500 hover:text-slate-900'
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. MAIN LAB WORKSPACE GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Learning Modes & Progress (4 Cols) */}
          <div className="sticky top-20 lg:col-span-4 space-y-6">

            {/* Modes Menu */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
                Laboratory Practice Modes
              </h3>

              <div className="space-y-2">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id as Mode)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer ${activeMode === mode.id
                        ? 'bg-[#0d1322] text-white shadow-xl scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2.5 rounded-xl ${activeMode === mode.id ? mode.color + ' text-white' : 'bg-white text-slate-500 shadow-xs'}`}>
                        {mode.icon}
                      </div>
                      <div className="text-left min-w-0">
                        <div className="font-black text-xs truncate">{mode.label}</div>
                        <div className={`text-[10px] truncate ${activeMode === mode.id ? 'text-slate-300' : 'text-slate-400'}`}>
                          {mode.sub}
                        </div>
                      </div>
                    </div>
                    {activeMode === mode.id && <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Lab Proficiency Progress */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Linguistic Mastery
                </h3>
                <BarChart2 className="w-4 h-4 text-blue-900" />
              </div>

              <div className="space-y-3.5">
                {[
                  { label: 'Bilateral Pathways', val: progress.pathways, color: 'bg-indigo-600' },
                  { label: 'Speaking & Pronunciation', val: progress.speaking, color: 'bg-rose-500' },
                  { label: 'Audio Comprehension', val: progress.listening, color: 'bg-blue-600' },
                  { label: 'Interactive Reading', val: progress.reading, color: 'bg-emerald-500' },
                  { label: 'AI Composition Check', val: progress.writing, color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="text-slate-900 font-mono">{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Speaking Streak Box */}
            <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white space-y-3 shadow-xl border border-blue-900/40">
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <Zap size={16} /> Daily Language Sprint
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Practice 5 sentences of <strong>{targetLang}</strong> using your microphone to earn <strong>+50 XP</strong> and unlock the Multilingual Scholar Badge.
              </p>
              <button
                onClick={() => setActiveMode('speaking')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Start Speaking Now
              </button>
            </div>

          </div>

          {/* Right Column: Active Interactive Workspace (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[620px] overflow-hidden flex flex-col justify-between">

            {/* ── MODE 1: 484 LANGUAGE PATHWAYS (FROM APP/LANGUAGE) ── */}
            {activeMode === 'pathways' && (
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-wider">
                      PATHWAY CATALOG
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      Learn {targetLang} via {sourceLang} (और अधिक भाषाएं)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Select any bilateral pathway to begin multi-stage conversational practice.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Search language pairs..."
                      value={pathwaySearch}
                      onChange={(e) => setPathwaySearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                {/* 23 Languages Quick Pills Grid */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Globe size={12} />
                    <span>Quick Target Switcher (23 Indian Languages):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {INDIAN_LANGUAGES_22.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => setTargetLang(l.name)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${targetLang.toLowerCase() === l.name.toLowerCase()
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                      >
                        {l.name} ({l.native})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pathways Cards Grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {filteredPathways.map((pathway) => (
                    <div
                      key={pathway.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 hover:shadow-lg transition-all space-y-3 flex flex-col justify-between group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                          <span className="text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                            {pathway.source} → {pathway.target}
                          </span>
                          <span className="text-slate-400">8 Modules</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                          {pathway.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Bilateral conversational practice, phonetics, and contextual grammar.
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[10px] font-bold text-emerald-700">✓ AI Evaluated</span>
                        <button
                          onClick={() => setActiveMode('speaking')}
                          className="px-3 py-1.5 rounded-lg bg-blue-900 text-white text-[11px] font-black uppercase tracking-wider hover:bg-blue-800 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Practice</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── MODE 2: SPEAKING PRACTICE LAB (MICROPHONE INPUT) ── */}
            {activeMode === 'speaking' && (
              <SpeakingModule level={level} language={targetLang} sourceLang={sourceLang} />
            )}

            {/* ── MODE 3: LISTENING PRACTICE LAB (TTS COMPREHENSION) ── */}
            {activeMode === 'listening' && (
              <ListeningModule level={level} language={targetLang} sourceLang={sourceLang} />
            )}

            {/* ── MODE 4: READING & VOCABULARY LAB (CLICKABLE LEXICON) ── */}
            {activeMode === 'reading' && (
              <ReadingModule level={level} language={targetLang} sourceLang={sourceLang} />
            )}

            {/* ── MODE 5: WRITING & GRAMMAR LAB (AI COMPOSITION) ── */}
            {activeMode === 'writing' && (
              <WritingModule level={level} language={targetLang} sourceLang={sourceLang} />
            )}

            {/* ── MODE 6: 23-LANG VIDEO LABORATORY ── */}
            {activeMode === 'video-lab' && (
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-900 text-[10px] font-black uppercase tracking-wider">
                    MULTILINGUAL VIDEO STREAM
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    Importance of Animals, Birds & Plants in Human Life
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Synchronized 23 Indian regional languages dubbing with gapless audio switching.
                  </p>
                </div>

                <div className="relative aspect-video rounded-2xl bg-black overflow-hidden shadow-xl border border-slate-800">
                  <video
                    src="/courses/importance-of-animals-and-plants/hindi.mp4"
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-900 uppercase">
                      Switch Audio Dubbing Track (23 Languages):
                    </h4>
                    <Link href="/student/my-courses/course-env-001" className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1">
                      <span>Open Full Player</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {INDIAN_LANGUAGES_22.map((l) => (
                      <Link
                        key={l.code}
                        href={`/student/my-courses/course-env-001?lang=${l.code}`}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-900 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-xs"
                      >
                        {l.name} ({l.native})
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ── OFFICIAL LANGUAGE LAB CERTIFICATE MODAL ── */}
      <AnimatePresence>
        {showCertificate && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 sm:p-12 max-w-2xl w-full border-4 border-amber-500/30 shadow-2xl space-y-6 text-center relative"
            >
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 font-black text-xl cursor-pointer"
              >
                ×
              </button>

              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 border-2 border-amber-300 flex items-center justify-center mx-auto shadow-md">
                <Trophy size={32} />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest">
                  NATIONAL INSTITUTE OF OPEN SCHOOLING (राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान)
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  MULTILINGUAL LANGUAGE LAB PROFICIENCY CERTIFICATE
                </h3>
                <p className="text-xs text-slate-400 font-semibold">
                  Recognized Under National Education Policy (NEP 2020)
                </p>
              </div>

              <div className="py-4 border-y border-slate-100 space-y-2 text-sm text-slate-700">
                <p>This is to certify that</p>
                <div className="text-2xl font-black text-blue-900 tracking-tight">
                  {activeUser.name}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Enrollment Number: <strong className="text-slate-800">{activeUser.details.enrollmentNo || 'ENR-2025-001'}</strong>
                </p>
                <p className="pt-2 text-xs leading-relaxed max-w-lg mx-auto">
                  Has successfully completed the <strong>{sourceLang} → {targetLang}</strong> bilateral conversational laboratory pathway with proficiency in speaking cadence, listening comprehension, and lexicon reading.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-4">
                <div>
                  <div>Issued on: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  <div className="text-[9px] text-emerald-700">✓ Digital Telemetry Authenticated</div>
                </div>
                <div className="text-right">
                  <div className="font-serif italic font-bold text-slate-800 text-sm">Dean of Languages</div>
                  <div className="text-[9px]">NIOS Academic Secretariat</div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-800 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

// ── SUB-COMPONENT 1: SPEAKING MODULE ──
function SpeakingModule({ level, language, sourceLang }: { level: Level; language: string; sourceLang: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<Feedback | null>(null);
  const [transcript, setTranscript] = useState('');

  const prompts = {
    beginner: `Introduce yourself in ${language} and talk about your favorite Indian bird or animal.`,
    intermediate: `Explain how plants and trees purify the air in your city in ${language}.`,
    advanced: `Discuss the importance of Article 51A(g) in protecting wildlife and nature in ${language}.`
  };

  const handleStart = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Web Speech Recognition. Showing simulated AI evaluation.');
      simulateEvaluation('प्रकृति और पर्यावरण का संरक्षण हम सभी का मूल कर्तव्य है।');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      simulateEvaluation(text);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      simulateEvaluation('पर्यावरण संरक्षण एवं जैव विविधता हमारा दायित्व है।');
    };

    recognition.start();
  };

  const simulateEvaluation = (text: string) => {
    setTranscript(text);
    setIsRecording(false);
    setTimeout(() => {
      setResult({
        score: Math.floor(Math.random() * 15) + 85,
        pronunciation: 88,
        fluency: 92,
        grammar: 90,
        confidence: 95,
        suggestions: [
          `Recognized speech: "${text}"`,
          `Excellent tonal pitch and vowel elongation according to standard ${language} phonetics.`,
          `Sentence flow between subject and verb is grammatically accurate.`,
          `Recommendation: Try practicing consonant clusters in compound words.`
        ]
      });
    }, 800);
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
          <Mic className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Speaking & Pronunciation Lab</h3>
          <p className="text-slate-400 font-medium text-xs">Target Language: <strong>{language}</strong> via {sourceLang}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Speaking Prompt ({level}):
        </span>
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed italic">
          "{prompts[level]}"
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-6">
        {!result ? (
          <>
            <button
              onClick={handleStart}
              disabled={isRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white border-4 border-rose-200 text-rose-600 hover:scale-105 hover:border-rose-400'
                }`}
            >
              {isRecording ? <Square size={32} fill="currentColor" /> : <Mic size={36} />}
            </button>
            <div className="text-center">
              <h4 className="font-black text-slate-900 text-sm">
                {isRecording ? 'Listening to speech...' : 'Click to Speak into Microphone'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">Real-time AI acoustic & pronunciation scoring</p>
            </div>
          </>
        ) : (
          <div className="w-full space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Pronunciation', val: result.pronunciation, color: 'text-rose-600' },
                { label: 'Fluency', val: result.fluency, color: 'text-blue-600' },
                { label: 'Grammar', val: result.grammar, color: 'text-emerald-600' },
                { label: 'Confidence', val: result.confidence, color: 'text-amber-600' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className={`text-[10px] font-black uppercase ${stat.color}`}>{stat.label}</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">{stat.val}%</div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <h5 className="text-xs font-black text-blue-900 flex items-center gap-1.5 uppercase">
                <CheckCircle2 size={14} /> AI Linguistic Analysis & Feedback
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {result.suggestions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setResult(null)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
            >
              Practice Another Sentence
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 2: LISTENING MODULE ──
function ListeningModule({ level, language, sourceLang }: { level: Level; language: string; sourceLang: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const content = {
    beginner: {
      text: `Vanaspati aur pashu-pakshi manav jeevan ke mukhya aadhar hain.`,
      meaning: `Plants and animals are the foundational pillars of human life.`,
      q: `What is the speaker saying about plants and animals?`
    },
    intermediate: {
      text: `Paryavaran santulan banaye rakhne ke liye van sanrakshan anivarya hai.`,
      meaning: `Forest conservation is essential for maintaining ecological balance.`,
      q: `What is necessary to maintain ecological balance?`
    },
    advanced: {
      text: `Jaiv vividhta hot spots prakriti ke anmol dharohar hain jinki raksha rashtriya kartavya hai.`,
      meaning: `Biodiversity hotspots are priceless treasures of nature whose protection is a national duty.`,
      q: `What does the speaker designate biodiversity hotspots as?`
    }
  };

  const handlePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content[level].text);
    utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Headphones className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Audio Comprehension Lab</h3>
          <p className="text-slate-400 font-medium text-xs">Audio Synthesis & Native Cadence</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center space-y-4">
        <button
          onClick={handlePlay}
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
        >
          {isPlaying ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        <div>
          <h4 className="text-sm font-black text-slate-900">
            {isPlaying ? 'Playing Audio Stream...' : 'Click to Listen to Native Segment'}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">Listen carefully to articulation and answer the comprehension prompt.</p>
        </div>

        <div className="w-full text-left space-y-4 pt-2">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Comprehension Question:</span>
            <p className="text-xs sm:text-sm font-bold text-slate-900">{content[level].q}</p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your comprehension answer here..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <button
              onClick={() => setShowAnswer(true)}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              Verify
            </button>
          </div>

          {showAnswer && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-black uppercase text-[10px] text-emerald-700">Audio Transcription & Meaning:</div>
              <p className="font-bold">"{content[level].text}"</p>
              <p className="text-slate-600 text-[11px]">Translation: {content[level].meaning}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 3: READING MODULE (CLICKABLE LEXICON) ──
function ReadingModule({ level, language, sourceLang }: { level: Level; language: string; sourceLang: string }) {
  const [selectedWord, setSelectedWord] = useState<{ word: string; meaning: string } | null>(null);

  const passages = {
    beginner: "Pashu-pakshi aur vanaspati prakriti ka sabse sundar upahar hain. Hum sabhi ko inka sanrakshan karna chahiye.",
    intermediate: "Jaiv vividhta ke bheetar har ek jeev ka apna vishisht mahatva hai. Paristithiki tantra ko santulit rakhne ke liye kide-makode aur pakshi aavashyak hain.",
    advanced: "Sanvidhan ke anuchhed 51A(g) ke anusar van, jheel aur vanyajeev ki suraksha har ek bhartiya nagrik ka mul kartavya ghoshit kiya gaya hai."
  };

  const wordsDictionary: Record<string, string> = {
    "vanaspati": "Flora and plant life / वनस्पतियां एवं पेड़-पौधे",
    "pashu-pakshi": "Fauna, wild animals and birds / पशु और पक्षी",
    "sanrakshan": "Ecological preservation and protection / संरक्षण एवं संवर्धन",
    "paristithiki": "Ecosystem ecology and environmental trophic levels / पारिस्थितिकी",
    "anuchhed": "Constitutional Article / संविधान का अनुच्छेद",
    "kartavya": "Fundamental Duty of every citizen / नागरिक का मूल कर्तव्य"
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Interactive Reading & Lexicon Lab</h3>
          <p className="text-slate-400 font-medium text-xs">Click on highlighted words to view contextual meanings</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Passage ({level}):
          </span>
          <div className="text-sm sm:text-base font-medium leading-loose text-slate-800">
            {passages[level].split(' ').map((word, idx) => {
              const cleanWord = word.replace(/[,.]/g, '').toLowerCase();
              const hasMeaning = wordsDictionary[cleanWord];

              return (
                <span
                  key={idx}
                  onClick={() => hasMeaning && setSelectedWord({ word: cleanWord, meaning: hasMeaning })}
                  className={`inline-block mr-1.5 cursor-pointer transition-all ${hasMeaning
                      ? 'text-blue-900 font-bold border-b-2 border-blue-400 hover:bg-blue-100 rounded px-1'
                      : 'text-slate-700'
                    }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 italic font-medium">
            * Highlighted blue words can be clicked to view bilingual vocabulary definitions.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
          <h4 className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
            <Zap size={14} className="text-amber-500" /> Vocabulary Insights
          </h4>

          {selectedWord ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="text-lg font-black text-emerald-900 capitalize">{selectedWord.word}</div>
              <p className="text-xs text-emerald-800 font-medium">{selectedWord.meaning}</p>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-xl">
              Click any highlighted word in the passage to see its full definition.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SUB-COMPONENT 4: WRITING MODULE ──
function WritingModule({ level, language, sourceLang }: { level: Level; language: string; sourceLang: string }) {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const prompts = {
    beginner: `Write 2 sentences in ${language} about why birds are important for crops.`,
    intermediate: `Write a short paragraph explaining the symbiotic relationship between bees and flower pollination in ${language}.`,
    advanced: `Draft a 100-word essay on how traditional Indian culture integrates plant worship with scientific conservation in ${language}.`
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setFeedback({
        score: 92,
        words: text.split(/\s+/).filter(Boolean).length,
        metrics: [
          { label: 'Vocabulary Richness', score: '94%' },
          { label: 'Grammar Accuracy', score: '90%' },
          { label: 'Curriculum Relevance', score: '95%' }
        ],
        suggestions: [
          'Strong sentence composition and coherent theme structure.',
          'Good usage of environmental terminology.',
          'Recommendation: Use compound conjunctions to connect dependent clauses.'
        ]
      });
    }, 1000);
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
          <PenTool className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Writing & Composition Lab</h3>
          <p className="text-slate-400 font-medium text-xs">AI Grammar, Syntax & Vocabulary Feedback</p>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
          Assignment Prompt ({level}):
        </span>
        <p className="text-xs sm:text-sm font-bold text-slate-800">{prompts[level]}</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Type your response here in ${language}...`}
          className="w-full h-40 p-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-bold">
            {text.split(/\s+/).filter(Boolean).length} Words Typed
          </span>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer shadow-md"
          >
            {isAnalyzing ? 'Analyzing with AI...' : 'Submit & Analyze'}
          </button>
        </div>

        {feedback && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-900 uppercase">
                Composition Score: {feedback.score}%
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded">
                Grade A
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {feedback.metrics.map((m: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white text-center">
                  <div className="text-[10px] font-bold text-slate-500">{m.label}</div>
                  <div className="text-sm font-black text-slate-900">{m.score}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-emerald-950 space-y-1 pt-1">
              <div className="font-bold">Feedback Points:</div>
              {feedback.suggestions.map((s: string, idx: number) => (
                <div key={idx}>• {s}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
