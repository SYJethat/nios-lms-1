'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Users,
  Calendar,
  Clock,
  Sparkles,
  MessageSquare,
  BarChart2,
  Send,
  ThumbsUp,
  Hand,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Globe,
  Radio,
  Share2,
  Download,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Play,
  Pause,
  AlertCircle,
  Columns,
  Layers,
  FileText,
  Search,
  Filter,
  Flame,
  Heart,
  Smile
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import { INDIAN_LANGUAGES_22 } from '@/lib/courses-data';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: string;
  location: string;
  text: string;
  time: string;
  isTeacher?: boolean;
  avatarColor: string;
}

interface LiveScheduleItem {
  id: string;
  title: string;
  subject: string;
  category: string;
  teacher: string;
  designation: string;
  date: string;
  time: string;
  status: 'live' | 'upcoming' | 'completed';
  platform: string;
  viewers?: number;
  joinUrl?: string;
  tags: string[];
}

export default function LiveClassesPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  // Video player states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // muted by default for auto-play compliance
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showISL, setShowISL] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [viewerCount, setViewerCount] = useState(1482);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);

  // Studio tabs: Chat, Q&A, Polls, Notes
  const [activeStudioTab, setActiveStudioTab] = useState<'chat' | 'qa' | 'poll' | 'notes'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Dr. Vikram Mehta', location: 'NIOS Faculty', text: 'Welcome students from across India! Today we explore biodiversity and ecological interdependence.', time: '11:00 AM', isTeacher: true, avatarColor: 'bg-blue-600' },
    { id: '2', sender: 'Pooja Deshmukh', location: 'Pune', text: 'Good morning Sir! The video streaming and audio is very clear.', time: '11:02 AM', avatarColor: 'bg-emerald-600' },
    { id: '3', sender: 'Rahul Verma', location: 'Delhi', text: 'Sir, will this chapter be tested in TMA 2026 submission?', time: '11:04 AM', avatarColor: 'bg-amber-600' },
    { id: '4', sender: 'Dr. Vikram Mehta', location: 'NIOS Faculty', text: 'Yes Rahul! Section 2 on flora & fauna food chains is mandatory for TMA.', time: '11:05 AM', isTeacher: true, avatarColor: 'bg-blue-600' },
    { id: '5', sender: 'Meera Sundaram', location: 'Chennai', text: 'Tamil translation audio is running smoothly in sync 👍', time: '11:06 AM', avatarColor: 'bg-purple-600' },
    { id: '6', sender: 'Karan Aulakh', location: 'Amritsar', text: 'Very intuitive practical demonstrations. Thanks NIOS team!', time: '11:07 AM', avatarColor: 'bg-rose-600' }
  ]);

  // Live Poll state
  const [pollSelected, setPollSelected] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState<number[]>([42, 680, 85, 34]);
  const hasVoted = pollSelected !== null;

  // Schedule filtering & state
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<LiveScheduleItem | null>(null);

  // Live broadcast schedule dataset
  const liveSessions: LiveScheduleItem[] = [
    {
      id: 'session-001',
      title: 'Science: Importance of Animals, Birds & Plants in Human Life',
      subject: 'Environmental Science (211)',
      category: 'Science',
      teacher: 'Dr. Vikram Mehta',
      designation: 'Senior Faculty & Biodiversity Researcher, NIOS',
      date: new Date().toISOString().split('T')[0], // Today
      time: '11:00 AM - 12:00 PM',
      status: 'live',
      platform: 'NIOS WebRTC Studio (22 Languages)',
      viewers: 1482,
      joinUrl: '#',
      tags: ['NEP 2020', 'Multi-Audio', 'ISL Supported', 'Class 10']
    },
    {
      id: 'session-002',
      title: 'Vedic Mathematics: Rapid Mental Calculation & Multiplications',
      subject: 'Mathematics (212)',
      category: 'Math',
      teacher: 'Prof. Anand Kumar',
      designation: 'Department of Mathematics, NIOS Board',
      date: new Date().toISOString().split('T')[0], // Today
      time: '02:30 PM - 03:30 PM',
      status: 'upcoming',
      platform: 'NIOS Live Studio + YouTube Live',
      viewers: 950,
      joinUrl: 'https://youtube.com',
      tags: ['Mental Math', 'Vedic Sutras', 'Interactive Polls']
    },
    {
      id: 'session-003',
      title: 'Artificial Intelligence & Python Basics for Secondary Learners',
      subject: 'Information Technology (229)',
      category: 'Technology',
      teacher: 'Dr. Sunita Rao',
      designation: 'Centre for Digital Literacy & AI, New Delhi',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      time: '10:00 AM - 11:30 AM',
      status: 'upcoming',
      platform: 'Google Meet Broadcast',
      viewers: 1200,
      joinUrl: 'https://meet.google.com',
      tags: ['Hands-on Lab', 'Python Code', 'Live Demo']
    },
    {
      id: 'session-004',
      title: 'Physics: Laws of Motion, Inertia & Friction Laboratory Demo',
      subject: 'Science & Tech (212)',
      category: 'Science',
      teacher: 'Dr. Vikram Mehta',
      designation: 'Senior Faculty, NIOS',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      time: '09:00 AM - 10:15 AM',
      status: 'completed',
      platform: 'Archived Recording Hub',
      viewers: 3420,
      joinUrl: '/student/my-courses/course-sci-002',
      tags: ['Simulation', 'Archived Video', 'Full HD']
    },
    {
      id: 'session-005',
      title: 'Hindi Sahitya & Vyakaran: Nibandh Rachna & Patra Lekhan',
      subject: 'Hindi Core (201)',
      category: 'Language',
      teacher: 'Acharya Ramvilas Sharma',
      designation: 'Department of Languages, NIOS',
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      time: '04:00 PM - 05:00 PM',
      status: 'upcoming',
      platform: 'NIOS Live Studio',
      viewers: 640,
      joinUrl: '#',
      tags: ['Grammar', 'Exam Tips', 'Doubt Clearing']
    }
  ];

  // Video path mapping for 23 languages
  const getLanguageVideoSrc = (langCode: string) => {
    const langMap: Record<string, string> = {
      hi: 'hindi.mp4',
      en: 'english.mp4',
      bn: 'bengali.mp4',
      te: 'telugu.mp4',
      mr: 'marathi.mp4',
      ta: 'tamil.mp4',
      gu: 'gujarati.mp4',
      kn: 'kannada.mp4',
      ml: 'malayalam.mp4',
      pa: 'punjabi.mp4',
      or: 'odia.mp4',
      as: 'assamese.mp4',
      ur: 'urdu.mp4',
      sa: 'sanskrit.mp4',
      ks: 'kashmiri.mp4',
      kok: 'konkani.mp4',
      mai: 'maithili.mp4',
      mni: 'manipuri.mp4',
      ne: 'nepali.mp4',
      brx: 'bodo.mp4',
      sat: 'santhali.mp4',
      doi: 'dogri.mp4',
      sd: 'sindhi.mp4'
    };
    const fileName = langMap[langCode] || 'hindi.mp4';
    return `/courses/importance-of-animals-and-plants/${fileName}`;
  };

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle reaction trigger
  const triggerReaction = (emoji: string) => {
    const newId = Date.now() + Math.random();
    const xPos = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    setReactions((prev) => [...prev, { id: newId, emoji, x: xPos }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 2500);
  };

  // Send message to live chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `${Date.now()}`,
      sender: activeUser.name,
      location: 'Noida',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      avatarColor: 'bg-blue-900'
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  // Cast vote in poll
  const handleVote = (index: number) => {
    if (hasVoted) return;
    setPollSelected(index);
    setPollVotes((prev) => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Filtered live sessions
  const filteredSessions = liveSessions.filter((s) => {
    const matchesFilter =
      activeFilter === 'all' ||
      s.status === activeFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      title="Live Virtual Classroom"
      subtitle="Interactive multi-camera streaming with 22 synchronized regional languages & national faculty"
    >
      <div className="space-y-10 animate-fade-in pb-20">

        {/* ── 1. BROADCAST STUDIO HERO GRID: LIVE VIDEO + INTERACTIVE SIDEBAR ── */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Live Video Player Studio (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-3xl bg-black overflow-hidden shadow-2xl border border-slate-400 group">

              {/* Main HTML5 Video Stream */}
              <div className="relative aspect-[16/7] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src={getLanguageVideoSrc(selectedLanguage)}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Floating Reaction Emojis Animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                  {reactions.map((r) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 1, y: 300, scale: 0.8 }}
                      animate={{ opacity: 0, y: -40, scale: 1.4 }}
                      transition={{ duration: 2.2, ease: 'easeOut' }}
                      style={{ left: `${r.x}%` }}
                      className="absolute bottom-10 text-3xl select-none"
                    >
                      {r.emoji}
                    </motion.div>
                  ))}
                </div>

                {/* Top Overlay Badge Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/90 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/40 backdrop-blur-md animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-white" />
                      LIVE ON AIR
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white text-[11px] font-bold backdrop-blur-md border border-white/15">
                      <Users size={13} className="text-blue-400" />
                      <span>{viewerCount.toLocaleString()} Watching</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30 backdrop-blur-md">
                      1080p 60fps
                    </span>
                  </div>

                  {/* ISL PIP Feed Toggle */}
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      onClick={() => setShowISL(!showISL)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all backdrop-blur-md border cursor-pointer ${showISL
                          ? 'bg-amber-500 text-blue-950 border-amber-400 shadow-lg shadow-amber-500/30'
                          : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
                        }`}
                    >
                      🤟 ISL Sign PIP {showISL ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>

                {/* Indian Sign Language (ISL) PIP Window */}
                <AnimatePresence>
                  {showISL && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      className="absolute bottom-16 right-4 w-36 sm:w-48 aspect-video rounded-2xl bg-slate-900 border-2 border-amber-400 overflow-hidden shadow-2xl z-20 group/isl"
                    >
                      <video
                        src={getLanguageVideoSrc(selectedLanguage)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-125"
                      />
                      <div className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-black text-amber-300 uppercase tracking-widest border border-amber-400/30">
                        ISL Interpreter
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Custom Overlay Controls */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (!videoRef.current) return;
                        if (isPlaying) {
                          videoRef.current.pause();
                        } else {
                          videoRef.current.play();
                        }
                        setIsPlaying(!isPlaying);
                      }}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>

                    <button
                      onClick={() => {
                        if (!videoRef.current) return;
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      {isMuted ? <VolumeX size={18} className="text-amber-400" /> : <Volume2 size={18} />}
                    </button>

                    <div className="text-xs text-white/90 font-bold hidden sm:block">
                      <span className="text-rose-400 font-black">● LIVE</span> Science Lecture 01 · Biodiversity
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Hand Raise Button */}
                    <button
                      onClick={() => {
                        setHasRaisedHand(!hasRaisedHand);
                        triggerReaction('✋');
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${hasRaisedHand
                          ? 'bg-amber-400 text-blue-950 shadow-lg shadow-amber-400/40'
                          : 'bg-white/15 text-white hover:bg-white/25'
                        }`}
                    >
                      <Hand size={14} />
                      <span className="hidden sm:inline">{hasRaisedHand ? 'Hand Raised' : 'Raise Hand'}</span>
                    </button>

                    {/* Reactions Bar */}
                    <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1 backdrop-blur-md">
                      {['👏', '❤️', '💡', '🔥'].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => triggerReaction(emoji)}
                          className="w-7 h-7 hover:scale-125 transition-transform flex items-center justify-center text-sm cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>

                    {/* Fullscreen Toggle */}
                    <button
                      onClick={() => {
                        if (!videoRef.current) return;
                        if (!isFullscreen) {
                          videoRef.current.requestFullscreen?.();
                          setIsFullscreen(true);
                        } else {
                          document.exitFullscreen?.();
                          setIsFullscreen(false);
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 23 Languages Quick Switcher Strip directly below Video */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1 shrink-0 mr-1">
                  <Globe size={13} />
                  <span>22 Langs Live Dub:</span>
                </span>
                {INDIAN_LANGUAGES_22.map((lang) => {
                  const isActive = selectedLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                          : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white'
                        }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[9px] uppercase font-mono opacity-70">({lang.code})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Broadcast Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider">
                      SCIENCE (211)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                      SECONDARY / CLASS 10
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider">
                      NEP 2020 APPROVED
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Importance of Animals, Birds & Plants in Human Life
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    मानव जीवन में पशु-पक्षियों एवं वनस्पतियों का महत्व · Live Laboratory Demonstration & Ecosystem Ecology
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/student/my-courses/course-env-001">
                    <button className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer">
                      <BookOpen size={14} />
                      <span>Course Modules</span>
                    </button>
                  </Link>
                  <button
                    onClick={() => alert('Lecture notes and slide deck (PDF) downloaded to your device!')}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download size={14} />
                    <span>Download Notes</span>
                  </button>
                </div>
              </div>

              {/* Faculty Info Card */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                    V
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <span>Dr. Vikram Mehta</span>
                      <CheckCircle2 size={13} className="text-blue-600" />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Senior Faculty & Biodiversity Researcher · NIOS Academic Department
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Clock size={13} className="text-slate-400" />
                    <span>Duration: 60 Mins</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <Radio size={13} />
                    <span>WebRTC Ultra-Low Latency</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Studio Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[650px] overflow-hidden">

            {/* Sidebar Tabs Header */}
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-1">
              {[
                { id: 'chat', label: 'Live Chat', icon: MessageSquare },
                { id: 'qa', label: 'Live Q&A', icon: HelpCircle },
                { id: 'poll', label: 'Poll (Active)', icon: BarChart2 },
                { id: 'notes', label: 'Notes', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveStudioTab(tab.id as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeStudioTab === tab.id
                      ? 'bg-white text-blue-900 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  <tab.icon size={13} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab 1: Live Chat */}
            {activeStudioTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Messages stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                  <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 font-medium">
                    📢 <strong>NIOS Moderator:</strong> Keep discussions respectful and focused on subject curriculum. Questions are reviewed in real-time.
                  </div>

                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span className={`w-4 h-4 rounded-full ${msg.avatarColor} text-white flex items-center justify-center text-[9px] font-black`}>
                            {msg.sender.charAt(0)}
                          </span>
                          <span className={msg.isTeacher ? 'text-blue-900 font-black' : 'text-slate-800'}>
                            {msg.sender}
                          </span>
                          {msg.isTeacher && (
                            <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 text-[8px] font-black uppercase">
                              Faculty
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-normal">({msg.location})</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{msg.time}</span>
                      </div>
                      <div className={`p-2.5 rounded-2xl text-xs font-normal leading-relaxed ${msg.isTeacher
                          ? 'bg-blue-900 text-white font-medium'
                          : 'bg-slate-50 text-slate-700 border border-slate-100'
                        }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question or comment..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Live Q&A */}
            {activeStudioTab === 'qa' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Upvoted Questions (3)
                  </h4>
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    Moderated
                  </span>
                </div>

                {[
                  { q: 'How does deforestration directly impact the pollination cycle in agricultural crops?', student: 'Ananya S. · Kolkata', votes: 48 },
                  { q: 'Can we submit TMA assignments in any of the 22 regional languages?', student: 'Gaurav K. · Patna', votes: 36 },
                  { q: 'What is the minimum passing score for the practical lab assessment?', student: 'Kavita M. · Jaipur', votes: 19 }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      "{item.q}"
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-medium">
                      <span>{item.student}</span>
                      <button
                        onClick={() => alert(`Upvoted! Total votes: ${item.votes + 1}`)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-900 text-xs font-bold transition-all cursor-pointer"
                      >
                        <ThumbsUp size={12} />
                        <span>{item.votes}</span>
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => alert('Question submitted to Dr. Vikram Mehta for the live Q&A round!')}
                  className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  + Submit New Question
                </button>
              </div>
            )}

            {/* Tab 3: Live Poll */}
            {activeStudioTab === 'poll' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                    ● ACTIVE CLASS POLL
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">Total Votes: 841</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-black text-slate-900 leading-snug">
                    Question: Which of the following is considered a primary ecological role of insectivorous birds in agricultural systems?
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Cast your vote live to view instant results from students across India.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'A) Soil aeration only', votes: pollVotes[0] },
                    { label: 'B) Natural biological pest suppression', votes: pollVotes[1], correct: true },
                    { label: 'C) Water table retention', votes: pollVotes[2] },
                    { label: 'D) Atmospheric nitrogen fixation', votes: pollVotes[3] }
                  ].map((opt, idx) => {
                    const totalVotes = pollVotes.reduce((a, b) => a + b, 0);
                    const pct = Math.round((opt.votes / totalVotes) * 100);
                    const isSelected = pollSelected === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleVote(idx)}
                        disabled={hasVoted}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden cursor-pointer ${isSelected
                            ? 'border-blue-900 bg-blue-50/70 shadow-sm'
                            : 'border-slate-200 hover:border-blue-300 bg-white'
                          }`}
                      >
                        {hasVoted && (
                          <div
                            className={`absolute top-0 bottom-0 left-0 transition-all duration-700 opacity-20 ${opt.correct ? 'bg-emerald-500' : 'bg-blue-600'
                              }`}
                            style={{ width: `${pct}%` }}
                          />
                        )}

                        <div className="relative z-10 flex items-center justify-between text-xs font-bold text-slate-900">
                          <span className={opt.correct && hasVoted ? 'text-emerald-700 font-black' : ''}>
                            {opt.label} {opt.correct && hasVoted && '✓'}
                          </span>
                          {hasVoted && (
                            <span className="text-xs font-black text-slate-700">{pct}%</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {hasVoted && (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                    ✓ Your vote has been recorded! <strong>Option B</strong> is the scientifically verified answer according to NCERT/NIOS syllabus.
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Live Collaborative Notes */}
            {activeStudioTab === 'notes' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Faculty Shared Notes
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Live Sync
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-2 text-xs text-amber-950 font-medium leading-relaxed">
                  <h5 className="font-black text-amber-900">Key Points Covered Today:</h5>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Biodiversity is vital for nutrient cycling and ecosystem resilience.</li>
                    <li>Avian species control agricultural pests naturally without chemical pesticides.</li>
                    <li>Plants regulate microclimate and prevent soil erosion in river basins.</li>
                    <li>22 Scheduled languages provide synchronized study material.</li>
                  </ul>
                </div>

                <button
                  onClick={() => alert('Saved to your My Notes notebook!')}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Save Notes to Notebook
                </button>
              </div>
            )}

          </div>
        </div>

        {/* ── 2. LIVE CLASS TIMELINE & SCHEDULE CATALOG ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">
                  National Broadcast Schedule (राष्ट्रीय लाइव कक्षाएं)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black">
                  {liveSessions.length} SESSIONS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Attend interactive live sessions broadcast daily by NIOS national subject matter experts.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
              {[
                { id: 'all', label: 'All Sessions' },
                { id: 'live', label: '🔴 Live Now' },
                { id: 'upcoming', label: 'Upcoming' },
                { id: 'completed', label: 'Archives' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${activeFilter === f.id
                      ? 'bg-white text-blue-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Session Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Header Banner on Card */}
                <div className="p-5 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-wider border border-blue-100">
                      {session.category}
                    </span>

                    {session.status === 'live' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider border border-rose-200 flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        LIVE NOW
                      </span>
                    ) : session.status === 'upcoming' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                        UPCOMING
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                        RECORDED
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                      {session.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {session.subject}
                    </p>
                  </div>

                  {/* Timing & Platform */}
                  <div className="pt-1 flex flex-col gap-1.5 text-xs text-slate-400 font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{session.date} · {session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-bold">
                      <Radio size={13} className="text-blue-600" />
                      <span>{session.platform}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {session.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Faculty & Join CTA */}
                <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-black">
                      {session.teacher.charAt(3) || 'F'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{session.teacher}</div>
                      <div className="text-[10px] text-slate-400 truncate">{session.designation}</div>
                    </div>
                  </div>

                  <div>
                    {session.status === 'live' ? (
                      <button
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/30 cursor-pointer"
                      >
                        <Video size={15} />
                        <span>JOIN LIVE STUDIO NOW</span>
                      </button>
                    ) : session.status === 'upcoming' ? (
                      <button
                        onClick={() => alert(`Reminder set for ${session.title}! We will send a push notification 15 minutes before the broadcast.`)}
                        className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                      >
                        <Calendar size={15} />
                        <span>SET REMINDER / RSVP</span>
                      </button>
                    ) : (
                      <Link href={session.joinUrl || '#'} className="block w-full">
                        <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer">
                          <Play size={15} />
                          <span>WATCH ARCHIVED LECTURE</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 3. MONTHLY BROADCAST CALENDAR & TIMELINE QUICK SCHEDULER ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Interactive Month Calendar (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">
                  Academic Broadcast Calendar
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · National Institute of Open Schooling
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-black transition-all cursor-pointer"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1.5 bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-800 transition-all cursor-pointer"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-black transition-all cursor-pointer"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Days grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-slate-400 uppercase py-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-3 text-xs text-slate-200 rounded-xl" />
                ))}

                {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                  const day = i + 1;
                  const isToday =
                    day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();

                  const hasLiveEvent = day === 2 || day === 5 || day === 12 || day === 18;

                  return (
                    <button
                      key={day}
                      onClick={() => alert(`Events for ${day} ${currentDate.toLocaleDateString('en-US', { month: 'short' })}: Science Lecture 11:00 AM & Vedic Math 02:30 PM.`)}
                      className={`p-3 text-xs font-black rounded-xl transition-all relative group cursor-pointer ${isToday
                          ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/30'
                          : hasLiveEvent
                            ? 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      <span>{day}</span>
                      {hasLiveEvent && (
                        <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900" /> Today
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Scheduled Live Broadcast
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Practical Lab Assessment
              </span>
            </div>
          </div>

          {/* Regional Multilingual Broadcast Hub Info (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-blue-900/40">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={14} /> Official NEP 2020 Protocol
              </span>
              <h3 className="text-xl font-black">
                How 22 Regional Languages Synchronization Works
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                NIOS multi-stream WebRTC nodes synchronize 22 scheduled Indian language audio tracks directly alongside the master laboratory demonstration video, ensuring uniform academic delivery across all Indian states.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Zero Audio Latency', desc: 'Real-time WebRTC audio multiplexing synchronized with instructor camera feed.' },
                { title: 'Indian Sign Language (ISL) PIP', desc: 'Accessible visual feed for deaf and hard-of-hearing learners nationwide.' },
                { title: 'Live Bilingual Closed Captions', desc: 'Real-time speech-to-text generating regional subtitles dynamically.' },
                { title: 'TMA Interactive Quizzes', desc: 'Live in-session polls recorded towards continuous internal assessment.' }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <h4 className="text-xs font-black text-blue-300">{item.title}</h4>
                  <p className="text-[11px] text-slate-300 font-normal">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/student/my-courses/course-env-001" className="block">
              <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer">
                <Video size={16} />
                <span>Go To 22-Lang Video Lecture</span>
              </button>
            </Link>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
