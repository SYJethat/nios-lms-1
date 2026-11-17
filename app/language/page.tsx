'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Sparkles,
  Globe,
  Languages,
  CheckCircle2,
  Volume2,
  BookOpen,
  ArrowLeftRight,
  Headphones,
  Bookmark,
  GraduationCap,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import {
  LANGUAGES_22,
  ALL_484_PATHWAYS,
  Pathway
} from '@/lib/multilingual-data';
import CourseEnrollModal from '@/components/CourseEnrollModal';
import {
  Course,
  createBilateralCourse,
  saveBilateralCourse,
  getStoredBilateralCourses,
  getStoredEnrolledIds,
  saveEnrolledCourseId
} from '@/lib/courses-data';

// ── 22 Scheduled Languages Metadata with Native Scripts & Sample Phrases ──
export const LANGUAGE_NATIVE_MAP: Record<
  string,
  { native: string; script: string; family: string; greeting: string; voiceLang: string }
> = {
  Hindi: { native: 'हिन्दी', script: 'Devanagari', family: 'Indo-Aryan', greeting: 'नमस्ते! आप कैसे हैं?', voiceLang: 'hi-IN' },
  English: { native: 'English', script: 'Latin', family: 'Germanic', greeting: 'Hello! Welcome to language mastery.', voiceLang: 'en-US' },
  Bengali: { native: 'বাংলা', script: 'Bengali', family: 'Indo-Aryan', greeting: 'নমস্কার! আপনি কেমন আছেন?', voiceLang: 'bn-IN' },
  Tamil: { native: 'தமிழ்', script: 'Tamil', family: 'Dravidian', greeting: 'வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?', voiceLang: 'ta-IN' },
  Telugu: { native: 'తెలుగు', script: 'Telugu', family: 'Dravidian', greeting: 'నమస్కారం! మీరు ఎలా ఉన్నారు?', voiceLang: 'te-IN' },
  Marathi: { native: 'मराठी', script: 'Devanagari', family: 'Indo-Aryan', greeting: 'नमस्कार! तुम्ही कसे आहात?', voiceLang: 'mr-IN' },
  Gujarati: { native: 'ગુજરાતી', script: 'Gujarati', family: 'Indo-Aryan', greeting: 'નમસ્તે! તમે કેમ છો?', voiceLang: 'gu-IN' },
  Kannada: { native: 'ಕನ್ನಡ', script: 'Kannada', family: 'Dravidian', greeting: 'ನಮಸ್ಕಾರ! ನೀವು ಹೇಗಿದ್ದೀರಾ?', voiceLang: 'kn-IN' },
  Malayalam: { native: 'മലയാളം', script: 'Malayalam', family: 'Dravidian', greeting: 'നമസ്കാരം! സുഖമാണോ?', voiceLang: 'ml-IN' },
  Punjabi: { native: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', family: 'Indo-Aryan', greeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?', voiceLang: 'pa-IN' },
  Odia: { native: 'ଓଡ଼ିଆ', script: 'Odia', family: 'Indo-Aryan', greeting: 'ନମସ୍କାର! ଆପଣ କେମିତି ଅଛନ୍ତି?', voiceLang: 'or-IN' },
  Assamese: { native: 'অসমীয়া', script: 'Bengali-Assamese', family: 'Indo-Aryan', greeting: 'নমস্কাৰ! আপুনি ভালে আছেনে?', voiceLang: 'as-IN' },
  Urdu: { native: 'اردو', script: 'Perso-Arabic', family: 'Indo-Aryan', greeting: 'السلام علیکم! آپ کیسے हैं؟', voiceLang: 'ur-IN' },
  Sanskrit: { native: 'संस्कृतम्', script: 'Devanagari', family: 'Indo-Aryan', greeting: 'नमस्ते! भवान् कथम् अस्ति?', voiceLang: 'hi-IN' },
  Kashmiri: { native: 'کٲشُر', script: 'Perso-Arabic', family: 'Dardic', greeting: 'سلام! تۄہہ چھਵਾ ٹھیک؟', voiceLang: 'ur-IN' },
  Konkani: { native: 'कोंकणी', script: 'Devanagari', family: 'Indo-Aryan', greeting: 'देव बरें करूं! तुमी कसे आसात?', voiceLang: 'mr-IN' },
  Maithili: { native: 'मैथिली', script: 'Devanagari', family: 'Indo-Aryan', greeting: 'प्रणाम! अपने कनि निक छी?', voiceLang: 'hi-IN' },
  Manipuri: { native: 'মণিপুরী', script: 'Meitei Mayek', family: 'Tibeto-Burman', greeting: 'খুরুমজরি! কমদৌরিগে?', voiceLang: 'bn-IN' },
  Nepali: { native: 'नेपाली', script: 'Devanagari', family: 'Indo-Aryan', greeting: 'नमस्ते! तपाईंलाई कस्तो छ?', voiceLang: 'ne-NP' },
  Bodo: { native: 'बड़ो', script: 'Devanagari', family: 'Tibeto-Burman', greeting: 'खुलुमबाय! नोंथाङा मोजाङै दं ना?', voiceLang: 'hi-IN' },
  Santali: { native: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', family: 'Austroasiatic', greeting: 'ᱡᱚᱦᱟᱨ! ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱜ ᱵᱤᱱᱟ?', voiceLang: 'hi-IN' },
  Dogri: { native: 'डोगरी', script: 'Devanagari', family: 'Indo-Aryan', greeting: 'नमस्ते! तुंदा के हाल ऐ?', voiceLang: 'hi-IN' }
};

export default function MultilingualLanguageHubPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const motherLang = activeUser.motherLang || 'Hindi';

  // State for interactive pair builder
  const [sourceLang, setSourceLang] = useState<string>(motherLang);
  const [targetLang, setTargetLang] = useState<string>(motherLang === 'Tamil' ? 'Hindi' : 'Tamil');
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Tabs & filters
  const [activeTab, setActiveTab] = useState<'all' | 'mother' | 'directory' | 'enrolled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterLang, setSelectedFilterLang] = useState<string>('All');
  const [pageLimit, setPageLimit] = useState(24);

  // Enrolled pathways state (persisted in localStorage)
  const [enrolledPathways, setEnrolledPathways] = useState<string[]>([
    'PATH-HINDI-TAMIL',
    'PATH-ENGLISH-HINDI',
    'PATH-BENGALI-MARATHI'
  ]);

  // Bilateral Course Enrollment Modal state
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [bilateralList, setBilateralList] = useState<Course[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    setEnrolledCourseIds(getStoredEnrolledIds());
    setBilateralList(getStoredBilateralCourses());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEnrollBilateralClick = () => {
    const course = createBilateralCourse(sourceLang, targetLang);
    setSelectedCourseForEnroll(course);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollmentSuccess = (courseId: string) => {
    if (selectedCourseForEnroll) {
      saveBilateralCourse(selectedCourseForEnroll);
      setBilateralList(prev => [selectedCourseForEnroll, ...prev.filter(c => c.id !== selectedCourseForEnroll.id)]);
      setEnrolledPathways(prev => prev.includes(activeMatchedPathway.id) ? prev : [...prev, activeMatchedPathway.id]);
    }
    setEnrolledCourseIds(prev => prev.includes(courseId) ? prev : [...prev, courseId]);
    showToast(`Enrolled in "${selectedCourseForEnroll?.titleEnglish || 'Bilateral Course'}"! Now available in My Courses.`);
  };

  // Find dynamic matched pathway from pair selector
  const activeMatchedPathway = useMemo(() => {
    const found = ALL_484_PATHWAYS.find(
      (p) => p.source.toLowerCase() === sourceLang.toLowerCase() && p.target.toLowerCase() === targetLang.toLowerCase()
    );
    if (found) return found;
    return {
      id: `PATH-${sourceLang.toUpperCase()}-${targetLang.toUpperCase()}`,
      source: sourceLang,
      target: targetLang,
      title: sourceLang === targetLang
        ? `Advanced ${sourceLang} Grammar, Phonetics & Literature`
        : `Learn ${targetLang} via ${sourceLang}: Conversational Mastery`,
      subject: `${sourceLang}-${targetLang}`,
      teacher: 'NIOS Multilingual AI Engine',
      level: 'Foundation to Advanced',
      rating: 4.95,
      learners: 1240,
      tags: [sourceLang, targetLang, 'Bilateral NEP', 'Phonetics', 'Conversational'],
      description: `Bilateral language bridge specifically customized for native ${sourceLang} speakers to master spoken and written ${targetLang} with cross-linguistic phonetic comparisons.`
    };
  }, [sourceLang, targetLang]);

  const currentBilateralCourse = useMemo(() => createBilateralCourse(sourceLang, targetLang), [sourceLang, targetLang]);
  const isCurrentPairEnrolled = useMemo(() => {
    return (
      enrolledCourseIds.includes(currentBilateralCourse.id) ||
      enrolledCourseIds.includes(activeMatchedPathway.id) ||
      bilateralList.some(bc =>
        bc.id === currentBilateralCourse.id ||
        (bc.titleEnglish.toLowerCase().includes(targetLang.toLowerCase()) &&
         bc.titleEnglish.toLowerCase().includes(sourceLang.toLowerCase()))
      )
    );
  }, [enrolledCourseIds, bilateralList, currentBilateralCourse.id, activeMatchedPathway.id, targetLang, sourceLang]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nios_enrolled_pathways');
      if (stored) {
        try {
          setEnrolledPathways(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const toggleEnroll = (pathwayId: string) => {
    setEnrolledPathways((prev) => {
      const next = prev.includes(pathwayId) ? prev.filter((id) => id !== pathwayId) : [...prev, pathwayId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('nios_enrolled_pathways', JSON.stringify(next));
      }
      return next;
    });
  };

  // Swap source and target
  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  // Speech preview
  const playGreeting = (text: string, langName: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const meta = LANGUAGE_NATIVE_MAP[langName];
    const u = new SpeechSynthesisUtterance(text);
    u.lang = meta?.voiceLang || 'hi-IN';
    u.rate = 0.9;
    setSpeakingText(text);
    u.onend = () => setSpeakingText(null);
    u.onerror = () => setSpeakingText(null);
    window.speechSynthesis.speak(u);
  };



  // Filter 484 pathways
  const filteredPathways = useMemo(() => {
    return ALL_484_PATHWAYS.filter((p) => {
      const q = searchQuery.toLowerCase().trim();

      // Tab filter
      if (activeTab === 'mother' && p.source.toLowerCase() !== motherLang.toLowerCase()) {
        return false;
      }
      if (activeTab === 'enrolled' && !enrolledPathways.includes(p.id)) {
        return false;
      }

      // Language pill filter
      if (selectedFilterLang !== 'All') {
        if (p.source !== selectedFilterLang && p.target !== selectedFilterLang) {
          return false;
        }
      }

      // Search match
      if (!q) return true;
      const srcMeta = LANGUAGE_NATIVE_MAP[p.source];
      const tgtMeta = LANGUAGE_NATIVE_MAP[p.target];
      return (
        p.title.toLowerCase().includes(q) ||
        p.source.toLowerCase().includes(q) ||
        p.target.toLowerCase().includes(q) ||
        (srcMeta && srcMeta.native.toLowerCase().includes(q)) ||
        (tgtMeta && tgtMeta.native.toLowerCase().includes(q)) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeTab, selectedFilterLang, motherLang, enrolledPathways]);

  const visiblePathways = filteredPathways.slice(0, pageLimit);

  const targetMeta = LANGUAGE_NATIVE_MAP[targetLang] || LANGUAGE_NATIVE_MAP['Tamil'];
  const sourceMeta = LANGUAGE_NATIVE_MAP[sourceLang] || LANGUAGE_NATIVE_MAP['Hindi'];

  return (
    <DashboardLayout
      title="484 Multilingual Pathways (22 × 22 Matrix)"
      subtitle={`${activeUser.name} · National Institute of Open Schooling · NEP 2020 22 Scheduled Indian Languages`}
    >
      <div className="space-y-10 animate-fade-in pb-20">

        {/* ── 1. SPOTLIGHT: 484 BILATERAL LANGUAGE PAIR MATCHER (LIGHT THEME) ── */}
        <div className="relative rounded-[32px] bg-gradient-to-br from-white via-blue-50/60 to-indigo-50/40 p-6 sm:p-10 text-slate-900 overflow-hidden shadow-sm border border-blue-200/70">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-200/25 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Context & Interactive Pair Builder */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-black uppercase tracking-widest border border-blue-200">
                  <Sparkles size={13} className="text-amber-600" /> 484 BILATERAL LANGUAGE BRIDGES
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                  22 × 22 Language Matrix
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                  NEP 2020 Mother-Tongue Learning
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  National Multilingual Matrix
                </h1>
                <p className="text-base sm:text-lg text-blue-900 font-bold">
                  राष्ट्रीय बहुभाषी सेतु एवं 484 भाषा अधिगम केंद्र
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1 max-w-xl">
                  Master any of India&apos;s 22 Eighth Schedule languages directly from your mother tongue. Every language pair features phonetic transliteration, speech recognition, grammar rules, native lexicon, and interactive exercises.
                </p>
              </div>

              {/* Bilateral Pair Selector Box (Light Card) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-blue-200/80 shadow-md space-y-4 max-w-xl">
                <div className="text-[11px] font-black uppercase tracking-wider text-blue-950 flex items-center justify-between">
                  <span>SELECT BILATERAL LEARNING PAIR (22 × 22):</span>
                  <span className="text-slate-500 lowercase font-medium">choose any source &amp; target</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
                  {/* Source Language */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      I Speak (Source):
                    </label>
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-white text-slate-900 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer shadow-xs"
                    >
                      {LANGUAGES_22.map((lang) => {
                        const meta = LANGUAGE_NATIVE_MAP[lang];
                        return (
                          <option key={`src-${lang}`} value={lang}>
                            {lang} ({meta?.native || lang})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center pt-4 sm:pt-4">
                    <button
                      onClick={handleSwapLanguages}
                      title="Swap Source and Target Languages"
                      className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 flex items-center justify-center transition-all border border-blue-300 cursor-pointer active:scale-90 shadow-xs"
                    >
                      <ArrowLeftRight size={16} />
                    </button>
                  </div>

                  {/* Target Language */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      I Want to Learn (Target):
                    </label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-white text-slate-900 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer shadow-xs"
                    >
                      {LANGUAGES_22.map((lang) => {
                        const meta = LANGUAGE_NATIVE_MAP[lang];
                        return (
                          <option key={`tgt-${lang}`} value={lang}>
                            {lang} ({meta?.native || lang})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Quick Info bar */}
                <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Globe size={13} className="text-blue-700" />
                    <span>Bridge: <strong className="text-slate-900">{sourceLang}</strong> ({sourceMeta.native}) ➔ <strong className="text-slate-900">{targetLang}</strong> ({targetMeta.native})</span>
                  </span>
                  <span className="text-[10px] font-black uppercase text-amber-700">
                    Pathway ID: {activeMatchedPathway.id}
                  </span>
                </div>
              </div>

            
            </div>

            {/* Right Column: Dynamic Pathway Spotlight Card (Light Theme) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-black text-xs border border-blue-200 shadow-xs">
                      {sourceLang.substring(0, 2).toUpperCase()}
                    </span>
                    <ArrowRight size={14} className="text-slate-400" />
                    <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs border border-amber-200 shadow-xs">
                      {targetLang.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                    Active Bridge
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {activeMatchedPathway.title}
                  </div>
                  <div className="text-sm font-bold text-blue-900">
                    {targetMeta.native} — {targetMeta.script} Script ({targetMeta.family} Family)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    Structured 8-module comprehensive bilateral curriculum: phonetics, daily phrases, verb conjugations, and native dialogues tailored specifically for native {sourceLang} speakers.
                  </p>
                </div>

                {/* Audio Sample Box */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span className="text-blue-900 flex items-center gap-1">
                      <Headphones size={13} /> Target Language Greeting:
                    </span>
                    <button
                      onClick={() => playGreeting(targetMeta.greeting, targetLang)}
                      className="text-xs text-blue-800 hover:text-blue-950 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 size={12} /> Play Audio
                    </button>
                  </div>
                  <div className="text-base font-bold text-slate-900 tracking-wide">
                    {targetMeta.greeting}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Source Meaning: &ldquo;Hello! How are you?&rdquo;
                  </div>
                </div>

                {/* Modules Specs */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-base font-black text-slate-900">8</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Modules</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-base font-black text-amber-700">100%</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Interactive</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="text-base font-black text-emerald-700">NIOS</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Certified</div>
                  </div>
                </div>

                <div className="pt-2">
                  {isCurrentPairEnrolled ? (
                    <div className="space-y-2">
                      <Link href="/student/my-courses" className="block w-full">
                        <button className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
                          <CheckCircle2 size={16} />
                          <span>✓ Enrolled — Open in My Courses</span>
                          <ArrowRight size={14} />
                        </button>
                      </Link>
                      <Link href={`/language/${activeMatchedPathway.id}`} className="block w-full text-center">
                        <span className="text-[11px] font-bold text-blue-900 hover:underline">
                          Or enter bilateral classroom directly →
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleEnrollBilateralClick}
                      className="w-full py-3.5 bg-blue-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer group"
                    >
                      <GraduationCap size={16} className="text-amber-300 group-hover:scale-110 transition-transform" />
                      <span>Enroll Bilateral Course</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* 22 Scheduled Indian Languages Pill Strip (Light Theme) */}
          <div className="pt-6 mt-8 border-t border-blue-200/60 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-blue-950 font-black uppercase text-[10px] tracking-wider">
                <Globe size={13} className="text-blue-700" />
                <span>All 22 Scheduled Languages of India (Click to Filter Pathways):</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Total 484 pairwise bilateral permutations</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilterLang('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${selectedFilterLang === 'All'
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 shadow-2xs'
                  }`}
              >
                <span>All 22 Languages</span>
                <span className="text-[10px] opacity-75">(484)</span>
              </button>

              {LANGUAGES_22.map((lang) => {
                const meta = LANGUAGE_NATIVE_MAP[lang];
                const isActive = selectedFilterLang === lang;
                return (
                  <button
                    key={`pill-${lang}`}
                    onClick={() => setSelectedFilterLang(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isActive
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 shadow-2xs'
                      }`}
                  >
                    <span>{lang}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({meta?.native || lang})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 2. CATALOG NAVIGATION & FILTER TABS (LIGHT THEME) ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            {[
              { id: 'all', label: 'All 484 Pathways', badge: '484' },
              { id: 'mother', label: `From ${motherLang} (Native)`, badge: '22' },
              { id: 'enrolled', label: 'My Enrolled Pathways', badge: `${enrolledPathways.length}` },
              { id: 'directory', label: '22 Scheduled Languages Directory', badge: '22' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setPageLimit(24);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === tab.id
                    ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === tab.id ? 'bg-blue-100 text-blue-900' : 'bg-slate-200 text-slate-700'
                    }`}
                >
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pathways, scripts, languages..."
              className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
            />
          </div>
        </div>

        {/* ── 3. MAIN PATHWAYS GRID (LIGHT THEME) ── */}
        {activeTab !== 'directory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
              <span>
                Showing {Math.min(visiblePathways.length, filteredPathways.length)} of {filteredPathways.length} Pathways
                {selectedFilterLang !== 'All' && ` · Filtered by ${selectedFilterLang}`}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="/student/learn-language"
                  className="text-blue-900 font-bold hover:underline flex items-center gap-1"
                >
                  <Languages size={13} />
                  <span>Launch Practice Lab</span>
                </Link>
              </div>
            </div>

            {filteredPathways.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                <Globe className="mx-auto text-slate-400" size={36} />
                <h4 className="text-sm font-bold text-slate-800">No language pathways matched your search</h4>
                <p className="text-xs text-slate-500">Try clearing filters or search for another language name or script.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilterLang('All');
                  }}
                  className="px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {visiblePathways.map((pathway) => {
                  const isEnrolled = enrolledPathways.includes(pathway.id);
                  const srcMeta = LANGUAGE_NATIVE_MAP[pathway.source] || LANGUAGE_NATIVE_MAP['Hindi'];
                  const tgtMeta = LANGUAGE_NATIVE_MAP[pathway.target] || LANGUAGE_NATIVE_MAP['Tamil'];

                  return (
                    <motion.div
                      key={pathway.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Light Gradient Header Strip */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50/70 to-slate-50 border-b border-slate-200/80 text-slate-900 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                          <span className="text-blue-900 flex items-center gap-1">
                            <Sparkles size={11} className="text-amber-600" /> 22×22 BRIDGE
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white text-slate-700 text-[9px] font-bold border border-slate-200 shadow-2xs">
                            8 Modules
                          </span>
                        </div>

                        {/* Language Pair Indicators */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="min-w-0">
                            <div className="text-[10px] uppercase font-bold text-slate-500">Source</div>
                            <div className="text-sm font-black text-slate-900 truncate">{pathway.source}</div>
                            <div className="text-[11px] text-blue-900 font-bold">{srcMeta.native}</div>
                          </div>

                          <div className="px-2 text-slate-400">
                            <ArrowRight size={16} className="text-amber-600" />
                          </div>

                          <div className="min-w-0 text-right">
                            <div className="text-[10px] uppercase font-bold text-slate-500">Target</div>
                            <div className="text-sm font-black text-slate-900 truncate">{pathway.target}</div>
                            <div className="text-[11px] text-amber-700 font-bold">{tgtMeta.native}</div>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                            {pathway.title}
                          </h3>
                          <p className="text-[11px] text-slate-600 font-medium line-clamp-2">
                            Bilingual vocabulary, grammar patterns, phonetic transcription, and dialogue scenarios.
                          </p>

                          {/* Quick audio phrase */}
                          <div className="pt-1 flex items-center justify-between bg-slate-50 border border-slate-200/70 p-2 rounded-xl text-[11px]">
                            <span className="text-slate-800 font-bold truncate max-w-[170px]">
                              {tgtMeta.greeting}
                            </span>
                            <button
                              onClick={() => playGreeting(tgtMeta.greeting, pathway.target)}
                              title="Listen Pronunciation"
                              className="text-blue-900 hover:text-blue-700 p-1 cursor-pointer shrink-0"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Feature Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 text-[10px] font-bold border border-blue-100">
                            Phonetics
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100">
                            AI Voice
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 text-[10px] font-bold border border-amber-100">
                            NIOS Certified
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 space-y-2">
                          {/* <div className="grid grid-cols-2 gap-2">
                            <Link href={`/language/${pathway.id}`} className="block">
                              <button className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs">
                                <span>Classroom</span>
                                <ArrowRight size={12} />
                              </button>
                            </Link>

                            <Link
                              href={`/student/learn-language?source=${encodeURIComponent(pathway.source)}&target=${encodeURIComponent(pathway.target)}`}
                              className="block"
                            >
                              <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer border border-slate-200">
                                <span>Lab</span>
                                <Headphones size={12} />
                              </button>
                            </Link>
                          </div> */}

                          <button
                            onClick={() => toggleEnroll(pathway.id)}
                            className={`w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${isEnrolled
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                              }`}
                          >
                            {isEnrolled ? (
                              <>
                                <CheckCircle2 size={12} className="text-emerald-600" />
                                <span>Enrolled in Pathway</span>
                              </>
                            ) : (
                              <>
                                <Bookmark size={12} />
                                <span>Bookmark Pathway</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {visiblePathways.length < filteredPathways.length && (
              <div className="pt-6 text-center">
                <button
                  onClick={() => setPageLimit((prev) => prev + 24)}
                  className="px-8 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 active:scale-95 transition-all cursor-pointer"
                >
                  Load More Pathways ({filteredPathways.length - visiblePathways.length} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── 4. TAB: 22 SCHEDULED LANGUAGES DIRECTORY (LIGHT THEME) ── */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-950 font-medium">
              <span>
                India&apos;s Eighth Schedule recognizes 22 official languages, representing four major linguistic families.
              </span>
              <span className="font-bold text-blue-900">
                Total Pathways: 22 × 22 = 484 Bilateral Combinations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {LANGUAGES_22.map((lang) => {
                const meta = LANGUAGE_NATIVE_MAP[lang];

                return (
                  <div
                    key={`dir-${lang}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100">
                          {meta.family}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {meta.script} Script
                        </span>
                      </div>

                      <div className="pt-1">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                          {lang}
                        </h3>
                        <p className="text-base font-bold text-amber-700">
                          {meta.native}
                        </p>
                      </div>

                      {/* Greeting snippet */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Common Greeting:
                        </div>
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>{meta.greeting}</span>
                          <button
                            onClick={() => playGreeting(meta.greeting, lang)}
                            className="text-blue-900 hover:text-blue-700 p-1 cursor-pointer shrink-0"
                            title="Listen Voice"
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                        <span>Bilateral Pathways</span>
                        <span className="font-black text-slate-900">22 Pairs</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedFilterLang(lang);
                          setActiveTab('all');
                        }}
                        className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <span>View All {lang} Pathways</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X size={15} />
          </button>
        </div>
      )}

      {/* Course Enrollment Modal */}
      <CourseEnrollModal
        course={selectedCourseForEnroll}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onSuccess={handleEnrollmentSuccess}
      />
    </DashboardLayout>
  );
}
