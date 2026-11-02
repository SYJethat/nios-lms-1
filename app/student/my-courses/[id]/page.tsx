'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
  FileText,
  PenTool,
  BookOpen,
  Video,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  ThumbsUp,
  Sparkles,
  X,
  MessageSquare,
  List,
  Info,
  Share2,
  CheckCircle2,
  Lock,
  Award,
  BarChart2,
  Headphones,
  BookMarked,
  ClipboardList,
  Trophy,
  Star,
  AlertCircle,
  Globe,
  Languages,
  Clock,
  Layers,
  Save,
  Check
} from 'lucide-react';
import { COURSES_DATA, Course, INDIAN_LANGUAGES_22, LanguageTrack } from '@/lib/courses-data';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

// Assessment Stages
const LEARNING_STAGES = [
  { id: 'video', label: 'Video Lecture (वीडियो व्याख्यान)', icon: Play, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'mcq', label: 'MCQ Assessment (वस्तुनिष्ठ प्रश्न)', icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'reading', label: 'Reading & SLM (पठन सामग्री)', icon: BookMarked, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'listening', label: 'Listening Lab (श्रवण अभ्यास)', icon: Headphones, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'writing', label: 'Writing Assignment (लिखित कार्य)', icon: PenTool, color: 'text-pink-600', bg: 'bg-pink-50' },
  { id: 'report', label: 'Performance Report (प्रगति विवरण)', icon: BarChart2, color: 'text-slate-600', bg: 'bg-slate-50' },
  { id: 'certificate', label: 'Certificate (प्रमाणपत्र)', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' }
];

export default function CourseVideoPlayerPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string;

  // Find course from COURSES_DATA or fallback to first course
  const foundCourse = COURSES_DATA.find(c => c.id === courseId) || COURSES_DATA[0];

  // Active language track (23 Indian languages)
  const [selectedLangCode, setSelectedLangCode] = useState('hi');
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Notes' | 'Resources' | 'Discussion' | 'TMA'>('Overview');

  // Video Player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(74.2);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Accessibility controls
  const [isISLEnabled, setIsISLEnabled] = useState(false);
  const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState(true);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [fontSize, setFontSize] = useState<'text-sm' | 'text-base' | 'text-lg'>('text-base');
  const [notesText, setNotesText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);

  // Learning Flow Stages
  const [flowStage, setFlowStage] = useState(0);
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqSelected, setMcqSelected] = useState<number | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqScore, setMcqScore] = useState(0);

  // Speech synthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);

    return () => {
      synthRef.current?.cancel();
      document.removeEventListener('fullscreenchange', onFsChange);
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, []);

  // Format MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get active language details
  const activeLangTrack: LanguageTrack = foundCourse.languageTracks[selectedLangCode] ||
    foundCourse.languageTracks['hi'] ||
    foundCourse.languageTracks['en'] || {
      code: selectedLangCode,
      name: INDIAN_LANGUAGES_22.find(l => l.code === selectedLangCode)?.name || 'Language',
      nativeName: INDIAN_LANGUAGES_22.find(l => l.code === selectedLangCode)?.native || '',
      speechCode: INDIAN_LANGUAGES_22.find(l => l.code === selectedLangCode)?.voice || 'hi-IN',
      title: foundCourse.titleHindi,
      summary: foundCourse.overview,
      transcript: `नमस्ते विद्यार्थियों। इस पाठ में हम 23 भाषाओं में उपलब्ध एनआईओएस पाठ्यक्रम का अध्ययन कर रहे हैं।`,
      videoUrl: foundCourse.lessons[0]?.videoUrl || '/courses/importance-of-animals-and-plants/hindi.mp4'
    };

  const currentLesson = foundCourse.lessons.find(l => l.id === activeLessonId) || foundCourse.lessons[0];

  // Resolve video URL: if it's lesson 1 or has language tracks, use the activeLangTrack's video
  const resolvedVideoSrc = currentLesson.id === 1
    ? (activeLangTrack?.videoUrl || currentLesson.videoUrl)
    : (currentLesson.videoUrl || activeLangTrack?.videoUrl || '/courses/importance-of-animals-and-plants/hindi.mp4');

  const isLocalMp4 = resolvedVideoSrc && (
    resolvedVideoSrc.endsWith('.mp4') ||
    resolvedVideoSrc.includes('.mp4') ||
    resolvedVideoSrc.startsWith('/')
  );

  // Seamless Language Switcher - preserves playback position
  const handleLanguageChange = (newLangCode: string) => {
    synthRef.current?.cancel();
    setIsReadingAloud(false);

    const savedTime = videoRef.current?.currentTime || currentTime;
    const wasPlaying = videoRef.current ? !videoRef.current.paused : isPlaying;

    setSelectedLangCode(newLangCode);

    const targetLang = INDIAN_LANGUAGES_22.find(l => l.code === newLangCode);
    setToastMessage(`🔊 ${targetLang?.native} (${targetLang?.name}) Dubbed · Synced at ${formatTime(savedTime)}`);
    setTimeout(() => setToastMessage(null), 3500);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = savedTime;
        if (wasPlaying) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    }, 120);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipTime = (delta: number) => {
    if (videoRef.current) {
      const nextTime = Math.max(0, Math.min(videoRef.current.duration || duration, videoRef.current.currentTime + delta));
      videoRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const togglePip = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPipActive(false);
      } else {
        await videoRef.current.requestPictureInPicture();
        setIsPipActive(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      synthRef.current?.cancel();
      setIsReadingAloud(false);
    } else {
      synthRef.current?.cancel();
      const utterance = new SpeechSynthesisUtterance(activeLangTrack.transcript);
      utterance.lang = activeLangTrack.speechCode;
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      synthRef.current?.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  const handleSaveNotes = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  // MCQ Data specific to Course 1 (Importance of Animals, Birds, and Plants)
  const mcqQuestions = [
    {
      q: 'पौधों में प्रकाश संश्लेषण (Photosynthesis) की प्रक्रिया से वायुमंडल में कौन-सी गैस उत्सर्जित होती है?',
      opts: ['कार्बन डाइऑक्साइड (CO2)', 'प्राणवायु ऑक्सीजन (O2)', 'नाइट्रोजन', 'मीथेन'],
      ans: 1,
      exp: 'प्रकाश संश्लेषण प्रक्रिया में पौधे सूर्य के प्रकाश व जल की सहायता से ग्लूकोज बनाते हैं और ऑक्सीजन (O2) गैस मुक्त करते हैं।'
    },
    {
      q: 'फसलों के परागण (Pollination) में किस जीव समूह की सबसे महत्वपूर्ण भूमिका है?',
      opts: ['मधुमक्खियाँ एवं कीट-पतंगे', 'सरीसृप', 'जलचर जीव', 'मृदा जीवाणु'],
      ans: 0,
      exp: 'मधुमक्खियाँ और पक्षी 80% से अधिक पुष्पीय पौधों और कृषि फसलों के परागण के लिए जिम्मेदार हैं।'
    },
    {
      q: 'पारिस्थितिकीय खाद्य श्रृंखला (Food Chain) में वनस्पतियों को किस श्रेणी में रखा जाता है?',
      opts: ['उपभोक्ता (Consumers)', 'प्राथमिक उत्पादक (Primary Producers)', 'अपघटक (Decomposers)', 'परजीवी'],
      ans: 1,
      exp: 'हरे पौधे स्वयं अपना भोजन बनाते हैं, इसलिए उन्हें प्राथमिक उत्पादक (Producers) कहा जाता है।'
    }
  ];

  return (
    <DashboardLayout
      title={foundCourse.titleHindi}
      subtitle={`${foundCourse.titleEnglish} · NIOS Multi-Language Academic Stream`}
    >
      <div className="space-y-8 pb-24">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <Link href="/student/my-courses">
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-900 transition-colors cursor-pointer">
              <ChevronLeft size={16} /> Back to My Courses (मेरे पाठ्यक्रम)
            </button>
          </Link>

          {/* 23 Indian Languages Switcher */}
          <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-slate-200 shadow-sm">
            <Globe size={18} className="text-blue-900 shrink-0" />
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Audio / Subtitles:
            </div>
            <select
              value={selectedLangCode}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-blue-50 border-0 rounded-xl px-3 py-1.5 text-xs font-black text-blue-950 focus:ring-2 focus:ring-blue-900 cursor-pointer"
            >
              {INDIAN_LANGUAGES_22.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Grid: Video Player on Left, Lessons Playlist on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: VIDEO PLAYER + ACCESSIBILITY HUB + TABS */}
          <div className="lg:col-span-2 space-y-6">
            {/* The Video Container */}
            <div className="relative rounded-[28px] overflow-hidden bg-slate-950 shadow-2xl border border-slate-800 aspect-video ring-4 ring-slate-100">
              {(currentLesson.type === 'video' || currentLesson.type === 'live') ? (
                isLocalMp4 ? (
                  <div
                    ref={playerContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => isPlaying && setShowControls(false)}
                    className="relative w-full h-full bg-black flex items-center justify-center group select-none overflow-hidden"
                  >
                    <video
                      ref={videoRef}
                      key={resolvedVideoSrc}
                      src={resolvedVideoSrc}
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={togglePlay}
                      playsInline
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={() => {
                        if (videoRef.current) {
                          setCurrentTime(videoRef.current.currentTime);
                        }
                      }}
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          setDuration(videoRef.current.duration || 74.2);
                          videoRef.current.playbackRate = playbackSpeed;
                        }
                      }}
                      onEnded={() => setIsPlaying(false)}
                    />

                    {/* Big Animated Center Play Button Overlay when paused */}
                    <AnimatePresence>
                      {!isPlaying && (
                        <motion.button
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          onClick={togglePlay}
                          className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl backdrop-blur-md cursor-pointer transition-transform hover:scale-110 ring-4 ring-white/30 z-20"
                        >
                          <Play size={36} className="ml-1 fill-white" />
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Dubbed Language Badge on Top Left */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center gap-2 shadow-lg">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-bold tracking-wide">
                          {activeLangTrack.nativeName} ({activeLangTrack.name}) Dubbed
                        </span>
                        <span className="px-1.5 py-0.2 bg-blue-500/30 rounded text-[9px] font-black uppercase text-blue-300">
                          1080p HD
                        </span>
                      </div>
                    </div>

                    {/* Sync Toast Notification */}
                    <AnimatePresence>
                      {toastMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          className="absolute top-4 right-4 z-30 px-4 py-2 rounded-2xl bg-blue-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-blue-400"
                        >
                          <Sparkles size={14} className="text-amber-300" />
                          <span>{toastMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Live Subtitles overlay */}
                    {isSubtitlesEnabled && (
                      <div className="absolute bottom-20 left-6 right-6 z-20 pointer-events-none text-center">
                        <div className="inline-block px-5 py-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl max-w-2xl">
                          <p className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md">
                            "{activeLangTrack.transcript.slice(0, 140)}..."
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Sign Language PIP window */}
                    {isISLEnabled && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-16 right-4 w-44 aspect-video bg-slate-900 rounded-2xl border-2 border-blue-400 shadow-2xl overflow-hidden z-20"
                      >
                        <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                          <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                            alt="ISL Interpreter"
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-blue-900 text-white text-[8px] font-black uppercase tracking-wider">
                            ISL Sign Feed
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Sleek Custom Controls Bar */}
                    <div
                      className={`absolute inset-x-0 bottom-0 z-30 pt-16 pb-3 px-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 ${
                        showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Scrubber / Progress Bar */}
                      <div className="relative w-full mb-3 group/timeline cursor-pointer">
                        <input
                          type="range"
                          min={0}
                          max={duration || 74.2}
                          step={0.1}
                          value={currentTime}
                          onChange={(e) => handleSeek(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2 transition-all"
                        />
                      </div>

                      {/* Buttons Row */}
                      <div className="flex items-center justify-between gap-3 text-white">
                        <div className="flex items-center gap-3">
                          {/* Play/Pause */}
                          <button
                            onClick={togglePlay}
                            className="p-2 rounded-xl hover:bg-white/10 text-white transition-all cursor-pointer"
                          >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-white" />}
                          </button>

                          {/* Skip 10s Backward */}
                          <button
                            onClick={() => skipTime(-10)}
                            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-0.5 text-[10px] font-bold"
                            title="Rewind 10 seconds"
                          >
                            <RotateCcw size={16} /> 10
                          </button>

                          {/* Skip 10s Forward */}
                          <button
                            onClick={() => skipTime(10)}
                            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-0.5 text-[10px] font-bold"
                            title="Forward 10 seconds"
                          >
                            <RotateCw size={16} /> 10
                          </button>

                          {/* Volume */}
                          <div className="flex items-center gap-1.5 group/vol">
                            <button
                              onClick={toggleMute}
                              className="p-1.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
                            >
                              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.05}
                              value={isMuted ? 0 : volume}
                              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                              className="w-16 h-1 bg-white/25 rounded-lg appearance-none cursor-pointer accent-blue-500 opacity-80 group-hover/vol:opacity-100 transition-opacity"
                            />
                          </div>

                          {/* Current Time / Duration */}
                          <div className="text-xs font-semibold text-white/90 pl-1 tracking-wider">
                            <span>{formatTime(currentTime)}</span>
                            <span className="text-white/40 mx-1">/</span>
                            <span className="text-white/60">{formatTime(duration)}</span>
                          </div>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2">
                          {/* Speed Selector */}
                          <div className="relative">
                            <select
                              value={playbackSpeed}
                              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                              className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl px-2.5 py-1 text-xs font-bold cursor-pointer focus:ring-0"
                            >
                              <option value={0.75} className="bg-slate-900 text-white">0.75x</option>
                              <option value={1} className="bg-slate-900 text-white">1.0x</option>
                              <option value={1.25} className="bg-slate-900 text-white">1.25x</option>
                              <option value={1.5} className="bg-slate-900 text-white">1.5x</option>
                              <option value={2} className="bg-slate-900 text-white">2.0x</option>
                            </select>
                          </div>

                          {/* Subtitles CC Toggle */}
                          <button
                            onClick={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)}
                            className={`p-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSubtitlesEnabled ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                            }`}
                            title="Closed Captions / Subtitles"
                          >
                            CC
                          </button>

                          {/* Picture in Picture */}
                          <button
                            onClick={togglePip}
                            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                              isPipActive ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-white/80 hover:text-white'
                            }`}
                            title="Picture in Picture"
                          >
                            <PictureInPicture2 size={18} />
                          </button>

                          {/* Fullscreen */}
                          <button
                            onClick={toggleFullscreen}
                            className="p-1.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
                            title="Toggle Fullscreen"
                          >
                            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={resolvedVideoSrc}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : currentLesson.type === 'flipbook' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-white text-center space-y-4">
                  <BookOpen size={56} className="text-blue-400 animate-pulse" />
                  <h4 className="text-xl font-black">Interactive 3D FlipBook Active</h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Explore botanical diagrams, bird species migration maps, and high-resolution anatomical charts.
                  </p>
                  <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider">
                    Full Screen 3D View
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-white text-center space-y-4">
                  <FileText size={56} className="text-emerald-400" />
                  <h4 className="text-xl font-black">Official NIOS SLM Study Material</h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Read chapter notes, textbook definitions, and end-of-chapter review questions.
                  </p>
                  <button className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <Download size={14} /> Download PDF (12.4 MB)
                  </button>
                </div>
              )}
            </div>

            {/* 23 INDIAN LANGUAGES QUICK DUBBING CAROUSEL */}
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-black">
                    <Languages size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      23 Indian Languages Synchronized Dubbing
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        NEP 2020 Multi-Lingual Sync
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Switch video and audio instantly to any Indian language without losing your playback position.
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-500">
                  Current: <span className="text-blue-900 font-black">{activeLangTrack.nativeName} ({activeLangTrack.name})</span>
                </div>
              </div>

              {/* Scrollable Language Pill Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                {INDIAN_LANGUAGES_22.map((lang) => {
                  const isSelected = selectedLangCode === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20 ring-2 ring-blue-900'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        ({lang.name})
                      </span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accessibility and Audio Narration Control Bar */}
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* 23-Language Audio Narration */}
                <button
                  onClick={handleReadAloud}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    isReadingAloud
                      ? 'bg-amber-500 text-white shadow-lg animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Volume2 size={16} />
                  {isReadingAloud ? `Speaking (${activeLangTrack.name})...` : `Listen in ${activeLangTrack.nativeName}`}
                </button>

                {/* Subtitles Toggle */}
                <button
                  onClick={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSubtitlesEnabled
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Subtitles (CC): {isSubtitlesEnabled ? 'ON' : 'OFF'}
                </button>

                {/* ISL Feed Toggle */}
                <button
                  onClick={() => setIsISLEnabled(!isISLEnabled)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isISLEnabled
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  ISL Feed (सांकेतिक भाषा)
                </button>

                {/* Font Size Toggle */}
                <button
                  onClick={() => {
                    const sizes: ('text-sm' | 'text-base' | 'text-lg')[] = ['text-sm', 'text-base', 'text-lg'];
                    setFontSize(sizes[(sizes.indexOf(fontSize) + 1) % sizes.length]);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black cursor-pointer"
                >
                  Text Size ({fontSize === 'text-sm' ? 'A' : fontSize === 'text-base' ? 'A+' : 'A++'})
                </button>
              </div>

              {/* AI Summary Button */}
              <button
                onClick={() => setShowAISummary(!showAISummary)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-blue-700/20 cursor-pointer"
              >
                <Sparkles size={14} /> AI 23-Lang Summary
              </button>
            </div>

            {/* AI Summary Slide-out Box */}
            <AnimatePresence>
              {showAISummary && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl border border-blue-200 shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-900 font-black text-sm uppercase tracking-wider">
                      <Sparkles size={16} /> AI Summary ({activeLangTrack.nativeName})
                    </div>
                    <button onClick={() => setShowAISummary(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={18} />
                    </button>
                  </div>
                  <h4 className="text-base font-black text-slate-900">{activeLangTrack.title}</h4>
                  <p className={`text-slate-700 leading-relaxed font-medium ${fontSize}`}>
                    {activeLangTrack.summary}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Course Title and Instructor Banner */}
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-wider">
                  {foundCourse.subjectHindi}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2 leading-tight">
                  {currentLesson.title}
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Subject: {foundCourse.titleHindi} ({foundCourse.titleEnglish})
                </p>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                <img
                  src={foundCourse.instructor.avatar}
                  alt={foundCourse.instructor.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                    {foundCourse.instructor.name}
                    <CheckCircle2 size={13} className="text-blue-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">{foundCourse.instructor.designation}</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation: Overview, Notes, Resources, Discussion */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100 overflow-x-auto">
                {(['Overview', 'Notes', 'Resources', 'Discussion', 'TMA'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-blue-900 text-blue-900 bg-blue-50/40'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'Overview' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                        पाठ्यक्रम का उद्देश्य एवं विवरण (Course Overview)
                      </h4>
                      <p className={`text-slate-600 leading-relaxed font-medium ${fontSize}`}>
                        {foundCourse.overview}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                        प्रमुख अध्ययन बिंदु (Core Learning Objectives):
                      </h5>
                      <ul className="space-y-2">
                        {foundCourse.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                            <CheckCircle2 size={16} className="text-blue-900 shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'Notes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        My Study Notes (मेरे अध्ययन नोट्स)
                      </h4>
                      <button
                        onClick={handleSaveNotes}
                        className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        {noteSaved ? <Check size={14} /> : <Save size={14} />}
                        {noteSaved ? 'Saved!' : 'Save Notes'}
                      </button>
                    </div>
                    <textarea
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      rows={6}
                      placeholder="Write your notes here while watching the lecture (e.g. key botanical terms, ecological food chain formulas)..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none focus:border-blue-900"
                    />
                  </div>
                )}

                {activeTab === 'Resources' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
                      Downloadable Study Materials (SLM & PDFs)
                    </h4>
                    {[
                      { title: 'मानव जीवन में पशु-पक्षी एवं वनस्पति - संपूर्ण पाठ्यपुस्तक SLM.pdf', size: '14.2 MB' },
                      { title: '23 भाषाओं में पारिभाषिक शब्दावली एवं शब्दकोश.pdf', size: '5.8 MB' },
                      { title: 'अभ्यास प्रश्नोत्तर एवं पूर्व वर्ष प्रश्न पत्र.pdf', size: '3.1 MB' }
                    ].map((res, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-blue-900" />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{res.title}</div>
                            <div className="text-[10px] text-slate-400 font-semibold">{res.size} · Verified NIOS Material</div>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-black text-xs uppercase tracking-wider border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-sm">
                          <Download size={14} /> Download
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Discussion' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        Classroom Discussion & Queries
                      </h4>
                      <span className="text-xs text-blue-900 font-bold">14 Active Threads</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">P</span>
                        <span className="text-xs font-bold text-slate-900">Priya Patel (Student)</span>
                        <span className="text-[10px] text-slate-400">· 2 hours ago</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        "Sir, in lesson 2, can you explain the distinction between endemic and endangered medicinal flora in Western Ghats?"
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'TMA' && (
                  <div className="space-y-4">
                    <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
                      <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-900 uppercase tracking-wider">
                        <AlertCircle size={14} /> Tutor Marked Assignment (TMA 2026)
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Assignment 1: Biodiversity in Human Settlements</h4>
                      <p className="text-xs text-slate-600">
                        Maximum Marks: 20 · Submission Deadline: 15 May 2026 · Weightage: 20% in Final Exam
                      </p>
                      <button className="mt-2 px-5 py-2.5 rounded-xl bg-blue-900 text-white font-black text-xs uppercase tracking-widest cursor-pointer shadow-md">
                        Upload TMA Answer Sheet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Assessment Stage Flow (MCQ / Reading / Quiz / Certificate) */}
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-900">Step-by-Step Learning Flow</span>
                  <h3 className="text-xl font-black text-slate-900">Interactive Assessment Arena</h3>
                </div>
              </div>

              {/* Stage Navigation Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {LEARNING_STAGES.map((stg, i) => (
                  <button
                    key={stg.id}
                    onClick={() => setFlowStage(i)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                      flowStage === i
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <stg.icon size={14} />
                    <span>{stg.label.split('(')[0]}</span>
                  </button>
                ))}
              </div>

              {/* MCQ Stage Content */}
              {flowStage === 1 && (
                <div className="space-y-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Question {mcqIndex + 1} of {mcqQuestions.length}</span>
                    <span className="text-blue-900">Score: {mcqScore}</span>
                  </div>

                  <h4 className="text-base font-black text-slate-900">
                    {mcqQuestions[mcqIndex].q}
                  </h4>

                  <div className="space-y-3">
                    {mcqQuestions[mcqIndex].opts.map((opt, optIdx) => {
                      const isSelected = mcqSelected === optIdx;
                      const isCorrect = optIdx === mcqQuestions[mcqIndex].ans;

                      let btnStyle = 'bg-white border-slate-200 hover:border-blue-900 text-slate-800';
                      if (mcqSubmitted) {
                        if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                        else if (isSelected) btnStyle = 'bg-red-50 border-red-400 text-red-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-blue-50 border-blue-900 text-blue-900 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={mcqSubmitted}
                          onClick={() => setMcqSelected(optIdx)}
                          className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle} cursor-pointer`}
                        >
                          <span>{opt}</span>
                          {mcqSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {mcqSubmitted && (
                    <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <strong className="text-blue-900">स्पष्टीकरण (Explanation): </strong>
                      {mcqQuestions[mcqIndex].exp}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    {!mcqSubmitted ? (
                      <button
                        disabled={mcqSelected === null}
                        onClick={() => {
                          setMcqSubmitted(true);
                          if (mcqSelected === mcqQuestions[mcqIndex].ans) {
                            setMcqScore(s => s + 1);
                          }
                        }}
                        className="px-6 py-3 rounded-xl bg-blue-900 text-white font-black text-xs uppercase tracking-wider hover:bg-blue-800 disabled:opacity-40 cursor-pointer"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (mcqIndex < mcqQuestions.length - 1) {
                            setMcqIndex(i => i + 1);
                            setMcqSelected(null);
                            setMcqSubmitted(false);
                          } else {
                            setFlowStage(6); // Go to certificate
                          }
                        }}
                        className="px-6 py-3 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-wider hover:bg-blue-900 cursor-pointer"
                      >
                        {mcqIndex < mcqQuestions.length - 1 ? 'Next Question' : 'View Certificate'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Certificate Stage Content */}
              {flowStage === 6 && (
                <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl border-2 border-amber-300 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center mx-auto shadow-lg">
                    <Trophy size={36} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Verified NIOS Credential</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      Certificate of Completion
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      This is to certify that <strong>{user?.name || 'Arjun Sharma'}</strong> has successfully completed the curriculum for
                    </p>
                    <div className="text-base font-black text-blue-950 mt-2">
                      "{foundCourse.titleHindi}"
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">
                      ({foundCourse.titleEnglish})
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => alert('Certificate downloaded in high resolution PDF!')}
                      className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-900 text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Download size={16} /> Download Official PDF Certificate
                    </button>
                  </div>
                </div>
              )}

              {flowStage !== 1 && flowStage !== 6 && (
                <div className="p-8 bg-slate-50 rounded-2xl text-center space-y-3">
                  <BookOpen size={36} className="text-blue-900 mx-auto" />
                  <h4 className="text-sm font-black text-slate-900">Active Learning Module</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Complete the video lesson and attempt the MCQ quiz to unlock certified verification.
                  </p>
                  <button
                    onClick={() => setFlowStage(1)}
                    className="px-6 py-2.5 rounded-xl bg-blue-900 text-white font-black text-xs uppercase tracking-wider"
                  >
                    Start MCQ Assessment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: LESSONS PLAYLIST */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Course Modules</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{foundCourse.lessons.length} Lessons · {foundCourse.duration} Total</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-black">
                  Active
                </span>
              </div>

              {/* Lessons list */}
              <div className="space-y-2.5">
                {foundCourse.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/10'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600 shadow-sm'
                      }`}>
                        {lesson.done ? <CheckCircle2 size={16} className={isActive ? 'text-white' : 'text-emerald-600'} /> : lesson.id}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-900'} line-clamp-2`}>
                          {lesson.title}
                        </div>
                        <div className={`flex items-center gap-2 mt-1 text-[10px] font-semibold ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                          <span>{lesson.duration}</span>
                          <span>·</span>
                          <span className="uppercase">{lesson.type}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick 23-Languages Helper Card */}
            <div className="p-6 bg-gradient-to-br from-indigo-900 to-blue-950 text-white rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-blue-400" />
                <h5 className="text-sm font-black uppercase tracking-wider">23 Indian Languages</h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Switch video track, audio narration, and live subtitles anytime. All course videos are synchronized across 23 languages under the National Education Policy (NEP 2020).
              </p>
              <div className="pt-2 text-[11px] text-blue-300 font-bold">
                ✓ Approved under National Education Policy (NEP)
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
