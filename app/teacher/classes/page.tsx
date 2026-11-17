'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Plus,
  Video,
  Clock,
  Calendar,
  Users,
  Monitor,
  Settings,
  Zap,
  BarChart3,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  Search,
  Filter,
  Copy,
  Check,
  Radio,
  Play,
  Upload,
  Download,
  X,
  AlertCircle,
  Sparkles,
  BookOpen,
  ExternalLink,
  Laptop,
  MessageSquare,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export interface TeacherClass {
  id: string;
  title: string;
  stream: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
  category: 'today' | 'week' | 'archives';
  date: string;
  time: string;
  status: 'Live Now' | 'Upcoming' | 'Scheduled' | 'Completed';
  students: number;
  type: 'Live Session' | 'Recorded Review' | 'Discussion Panel' | 'Lab Workshop';
  platform: string;
  meetingUrl: string;
  recordingUrl?: string;
  description: string;
  engagement: string;
  attendanceRate?: string;
  resourcesCount?: number;
}

const DEFAULT_CLASSES: TeacherClass[] = [
  {
    id: 'C1',
    title: 'Advanced Physics: Quantum Basics & Wave Mechanics',
    stream: 'Science',
    category: 'today',
    date: 'Today, Nov 17',
    time: '10:00 AM - 11:30 AM',
    status: 'Live Now',
    students: 42,
    type: 'Live Session',
    platform: 'NIOS Live Virtual Studio',
    meetingUrl: '/live?session=C1',
    description: 'Deep dive into Planck-Einstein relations, De Broglie wavelength equations, and dual nature of radiation with live student Q&A.',
    engagement: 'High Engagement · Active Q&A',
    attendanceRate: '96%',
    resourcesCount: 4
  },
  {
    id: 'C2',
    title: 'Modern Mathematics: Linear Algebra & Matrix Calculus',
    stream: 'Science',
    category: 'today',
    date: 'Today, Nov 17',
    time: '02:00 PM - 03:30 PM',
    status: 'Upcoming',
    students: 38,
    type: 'Recorded Review',
    platform: 'NIOS Live Virtual Studio',
    meetingUrl: '/live?session=C2',
    description: 'Discussion of determinants, matrix inversion, and solving systems of linear equations using Cramer\'s Rule.',
    engagement: '38 Confirmed RSVP',
    attendanceRate: 'Pending',
    resourcesCount: 2
  },
  {
    id: 'C3',
    title: 'English Literature: The Indian Renaissance & Selected Verses',
    stream: 'Arts',
    category: 'week',
    date: 'Tomorrow, Nov 18',
    time: '11:00 AM - 12:30 PM',
    status: 'Scheduled',
    students: 29,
    type: 'Discussion Panel',
    platform: 'NIOS Live Virtual Studio',
    meetingUrl: '/live?session=C3',
    description: 'Critical analysis of modern Indian poetry with special emphasis on themes of nationalism and identity.',
    engagement: 'Panel Discussion',
    attendanceRate: 'Pending',
    resourcesCount: 3
  },
  {
    id: 'C4',
    title: 'Accountancy: Corporate Balance Sheets & Cash Flow Statements',
    stream: 'Commerce',
    category: 'week',
    date: 'Thursday, Nov 20',
    time: '03:00 PM - 04:30 PM',
    status: 'Scheduled',
    students: 35,
    type: 'Live Session',
    platform: 'Google Meet (Integrated)',
    meetingUrl: 'https://meet.google.com/nios-acc-301',
    description: 'Hands-on workshop calculating operating, investing, and financing cash flows from multi-year balance sheets.',
    engagement: 'Hands-on Practice',
    attendanceRate: 'Pending',
    resourcesCount: 5
  },
  {
    id: 'C5',
    title: 'Vocational Tech: Microcontroller Circuit Simulation',
    stream: 'Vocational',
    category: 'week',
    date: 'Friday, Nov 21',
    time: '01:00 PM - 02:30 PM',
    status: 'Scheduled',
    students: 27,
    type: 'Lab Workshop',
    platform: 'Interactive Virtual Lab',
    meetingUrl: '/live?session=C5',
    description: 'Live hardware simulator walkthrough for 8051 assembly programming and GPIO pin control.',
    engagement: 'Virtual Lab Interactive',
    attendanceRate: 'Pending',
    resourcesCount: 6
  },
  {
    id: 'C6',
    title: 'Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids',
    stream: 'Science',
    category: 'archives',
    date: 'Nov 12, 2026',
    time: '10:00 AM - 11:30 AM',
    status: 'Completed',
    students: 54,
    type: 'Live Session',
    platform: 'NIOS Live Virtual Studio',
    meetingUrl: '/live?session=C6',
    recordingUrl: '/live?session=C6&replay=true',
    description: 'Full lecture recording and whiteboards on nucleophilic addition reactions and tollens reagent tests.',
    engagement: 'Archived · 54 Attended',
    attendanceRate: '98% Attendance',
    resourcesCount: 5
  },
  {
    id: 'C7',
    title: 'Business Studies: Principles of Scientific Management',
    stream: 'Commerce',
    category: 'archives',
    date: 'Nov 08, 2026',
    time: '02:00 PM - 03:30 PM',
    status: 'Completed',
    students: 46,
    type: 'Recorded Review',
    platform: 'NIOS Live Virtual Studio',
    meetingUrl: '/live?session=C7',
    recordingUrl: '/live?session=C7&replay=true',
    description: 'Taylor vs Fayol management principles comparative study with case study questions for Senior Secondary exams.',
    engagement: 'Archived · 46 Attended',
    attendanceRate: '92% Attendance',
    resourcesCount: 3
  }
];

export default function TeacherClassesPage() {
  const { user } = useAuth();

  // Primary State
  const [classesList, setClassesList] = useState<TeacherClass[]>(DEFAULT_CLASSES);
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'archives' | 'all'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('All');

  // Modals State
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<TeacherClass | null>(null);
  const [viewingClass, setViewingClass] = useState<TeacherClass | null>(null);
  const [launchingClass, setLaunchingClass] = useState<TeacherClass | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Class Form State
  const [newClass, setNewClass] = useState({
    title: '',
    stream: 'Science' as TeacherClass['stream'],
    category: 'today' as TeacherClass['category'],
    date: 'Today, Nov 17',
    time: '10:00 AM - 11:30 AM',
    status: 'Upcoming' as TeacherClass['status'],
    students: 35,
    type: 'Live Session' as TeacherClass['type'],
    platform: 'NIOS Live Virtual Studio',
    meetingUrl: '',
    description: '',
    engagement: 'High Engagement'
  });

  // Settings State
  const [classroomSettings, setClassroomSettings] = useState({
    defaultPlatform: 'NIOS Live Virtual Studio',
    autoRecord: true,
    allowStudentChat: true,
    enableRaiseHand: true,
    waitingRoom: false,
    aiTranslation: true
  });

  // Upload State
  const [uploadData, setUploadData] = useState({
    classId: 'C1',
    title: '',
    type: 'Lecture Notes (PDF)',
    fileName: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nios_teacher_classes');
      if (saved) {
        setClassesList(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const saveClasses = (updated: TeacherClass[]) => {
    setClassesList(updated);
    try {
      localStorage.setItem('nios_teacher_classes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Schedule New Class Handler
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.title.trim()) {
      showToast('Please provide a class title');
      return;
    }

    const generatedId = `C${Date.now().toString().slice(-4)}`;
    const finalMeetingUrl = newClass.meetingUrl.trim() || `/live?session=${generatedId}`;

    const created: TeacherClass = {
      id: generatedId,
      title: newClass.title,
      stream: newClass.stream,
      category: newClass.category,
      date: newClass.date,
      time: newClass.time,
      status: newClass.status,
      students: Number(newClass.students) || 30,
      type: newClass.type,
      platform: newClass.platform,
      meetingUrl: finalMeetingUrl,
      description: newClass.description || `Interactive class on ${newClass.title} for enrolled NIOS students.`,
      engagement: 'Enrolled & Scheduled',
      resourcesCount: 1
    };

    const updated = [created, ...classesList];
    saveClasses(updated);

    // Switch to the tab where the class was scheduled
    setActiveTab(newClass.category);
    setIsScheduleOpen(false);
    showToast(`Class "${created.title}" successfully scheduled!`);

    // Reset Form
    setNewClass({
      title: '',
      stream: 'Science',
      category: 'today',
      date: 'Today, Nov 17',
      time: '10:00 AM - 11:30 AM',
      status: 'Upcoming',
      students: 35,
      type: 'Live Session',
      platform: 'NIOS Live Virtual Studio',
      meetingUrl: '',
      description: '',
      engagement: 'High Engagement'
    });
  };

  // Edit Class Handler
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;

    const updated = classesList.map(c => c.id === editingClass.id ? editingClass : c);
    saveClasses(updated);
    setEditingClass(null);
    showToast('Class details updated successfully!');
  };

  // Delete Class Handler
  const handleDeleteClass = (id: string, title: string) => {
    if (confirm(`Are you sure you want to cancel and remove "${title}"?`)) {
      const updated = classesList.filter(c => c.id !== id);
      saveClasses(updated);
      if (viewingClass?.id === id) setViewingClass(null);
      showToast('Class removed successfully.');
    }
  };

  // Copy Link Handler
  const handleCopyLink = (url: string, id: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    showToast('Meeting link copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter calculations
  const todayClasses = classesList.filter(c => c.category === 'today');
  const weekClasses = classesList.filter(c => c.category === 'week');
  const archiveClasses = classesList.filter(c => c.category === 'archives');

  const filteredClasses = classesList.filter(cls => {
    // Tab filter
    if (activeTab === 'today' && cls.category !== 'today') return false;
    if (activeTab === 'week' && cls.category !== 'week') return false;
    if (activeTab === 'archives' && cls.category !== 'archives') return false;

    // Stream filter
    if (selectedStream !== 'All' && cls.stream !== selectedStream) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = cls.title.toLowerCase().includes(q);
      const matchStream = cls.stream.toLowerCase().includes(q);
      const matchType = cls.type.toLowerCase().includes(q);
      const matchDesc = cls.description.toLowerCase().includes(q);
      if (!matchTitle && !matchStream && !matchType && !matchDesc) return false;
    }

    return true;
  });

  return (
    <DashboardLayout
      title="Classroom Console"
      subtitle="Manage your upcoming live sessions, recordings, and classroom resources"
    >
      <div className="space-y-8 animate-fade-in relative pb-16">
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

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Video size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{todayClasses.length}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Today&apos;s Sessions</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Calendar size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{weekClasses.length}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">This Week</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                {classesList.reduce((acc, c) => acc + c.students, 0)}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Enrolled Learners</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Zap size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">94.8%</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avg Attendance</div>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation Tabs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Left: Schedule Button & Date Category Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="schedule-new-class-btn"
                onClick={() => setIsScheduleOpen(true)}
                className="px-6 py-3.5 bg-blue-900 hover:bg-black text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Plus size={16} /> Schedule New Class
              </button>

              <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1" />

              {/* Tabs: Today, This Week, Archives, All */}
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  id="tab-today"
                  onClick={() => setActiveTab('today')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'today'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Today</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    activeTab === 'today' ? 'bg-blue-100 text-blue-900' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {todayClasses.length}
                  </span>
                </button>

                <button
                  type="button"
                  id="tab-this-week"
                  onClick={() => setActiveTab('week')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'week'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>This Week</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    activeTab === 'week' ? 'bg-blue-100 text-blue-900' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {weekClasses.length}
                  </span>
                </button>

                <button
                  type="button"
                  id="tab-archives"
                  onClick={() => setActiveTab('archives')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'archives'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Archives</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    activeTab === 'archives' ? 'bg-blue-100 text-blue-900' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {archiveClasses.length}
                  </span>
                </button>

                <button
                  type="button"
                  id="tab-all"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({classesList.length})
                </button>
              </div>
            </div>

            {/* Right: Search, Stream Filter & Classroom Settings */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1 sm:w-56">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Stream filter */}
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option value="All">All Streams</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Vocational">Vocational</option>
              </select>

              {/* Classroom settings button */}
              <button
                id="classroom-settings-btn"
                onClick={() => setIsSettingsOpen(true)}
                title="Classroom Settings & Studio Preferences"
                className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:text-blue-950 transition-all cursor-pointer shadow-xs"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Classes Feed List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>
                {activeTab === 'today' && "Today's Schedule"}
                {activeTab === 'week' && 'Scheduled This Week'}
                {activeTab === 'archives' && 'Past Recorded Archives'}
                {activeTab === 'all' && 'All Classroom Sessions'}
              </span>
              <span className="text-xs font-bold text-slate-400 normal-case">
                ({filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'})
              </span>
            </h3>

            {activeTab !== 'today' && (
              <button
                onClick={() => setActiveTab('today')}
                className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View Today&apos;s Sessions <ChevronRight size={13} />
              </button>
            )}
          </div>

          {filteredClasses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
                <Calendar size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">No classes found in this view</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery
                    ? `No sessions matched your search "${searchQuery}". Try clearing filters.`
                    : activeTab === 'today'
                    ? "There are no live sessions scheduled for today yet. Schedule one to start teaching."
                    : activeTab === 'week'
                    ? "No sessions scheduled for later this week. Plan ahead for your learners."
                    : "No archived classroom recordings found."}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                {searchQuery || selectedStream !== 'All' ? (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStream('All');
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setNewClass(prev => ({ ...prev, category: (activeTab === 'archives' || activeTab === 'all') ? 'today' : activeTab }));
                      setIsScheduleOpen(true);
                    }}
                    className="px-6 py-2.5 bg-blue-900 hover:bg-black text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus size={15} /> Schedule a Class Now
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredClasses.map((cls) => {
                const isLive = cls.status === 'Live Now';
                const isCompleted = cls.status === 'Completed';

                return (
                  <div
                    key={cls.id}
                    className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-900/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col lg:flex-row items-start lg:items-center gap-6"
                  >
                    {/* Icon / Status Visual */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative shadow-xs transition-transform group-hover:scale-105 ${
                        isLive
                          ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-500/20'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-blue-50 text-blue-900'
                      }`}>
                        {isLive ? (
                          <>
                            <Radio size={24} className="animate-pulse" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-600 rounded-full ring-2 ring-white animate-ping" />
                          </>
                        ) : isCompleted ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <Video size={24} />
                        )}
                      </div>

                      {/* Mobile-only status label */}
                      <div className="lg:hidden">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isLive
                            ? 'bg-rose-100 text-rose-700 animate-pulse'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-900'
                        }`}>
                          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />}
                          {cls.status}
                        </span>
                      </div>
                    </div>

                    {/* Middle Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {cls.stream}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-blue-900 font-bold">{cls.type}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 font-bold">{cls.platform}</span>
                      </div>

                      <h4 className="text-base lg:text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                        {cls.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-1">
                        {cls.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <Calendar size={13} className="text-slate-400" />
                          <span>{cls.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <Clock size={13} className="text-slate-400" />
                          <span>{cls.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <Users size={13} className="text-slate-400" />
                          <span>{cls.students} Learners Enrolled</span>
                        </div>
                        {cls.attendanceRate && cls.attendanceRate !== 'Pending' && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                            <ShieldCheck size={13} />
                            <span>{cls.attendanceRate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Desktop Status Badge */}
                    <div className="hidden lg:flex flex-col items-center justify-center px-6 border-x border-slate-100 text-center shrink-0">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        isLive
                          ? 'bg-rose-100 text-rose-700'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        {isLive && <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />}
                        {cls.status}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 mt-1">
                        {cls.engagement}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      {isCompleted ? (
                        <Link
                          href={cls.recordingUrl || cls.meetingUrl}
                          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                        >
                          <Play size={14} /> Watch Recording
                        </Link>
                      ) : (
                        <button
                          onClick={() => setLaunchingClass(cls)}
                          className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer ${
                            isLive
                              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                              : 'bg-blue-900 hover:bg-black text-white'
                          }`}
                        >
                          <Video size={14} />
                          <span>{isLive ? 'Join Live Now' : 'Start Session'}</span>
                          <ChevronRight size={14} />
                        </button>
                      )}

                      {/* Quick copy link */}
                      <button
                        onClick={() => handleCopyLink(cls.meetingUrl, cls.id)}
                        title="Copy Meeting Link"
                        className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-900 rounded-xl transition-all cursor-pointer border border-slate-100"
                      >
                        {copiedId === cls.id ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                      </button>

                      {/* View Details */}
                      <button
                        onClick={() => setViewingClass(cls)}
                        title="View Class Details & Syllabus"
                        className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-900 rounded-xl transition-all cursor-pointer border border-slate-100"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Edit Details */}
                      <button
                        onClick={() => setEditingClass(cls)}
                        title="Edit Class Information"
                        className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-900 rounded-xl transition-all cursor-pointer border border-slate-100"
                      >
                        <Edit2 size={15} />
                      </button>

                      {/* Delete / Cancel */}
                      <button
                        onClick={() => handleDeleteClass(cls.id, cls.title)}
                        title="Cancel / Delete Class"
                        className="p-3 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer border border-slate-100"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Resources & Insights Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6 pt-4">
          {/* Card 1: Attendance Analysis */}
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-900/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-3 mb-4 text-blue-900">
              <div className="p-3 bg-blue-50 rounded-xl">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight text-base">Attendance & Engagement Insights</h3>
                <p className="text-xs text-slate-400">Classroom analytics and participation tracking</p>
              </div>
            </div>
            <p className="text-xs font-medium text-slate-600 leading-relaxed mb-6">
              Learner attendance has increased by <span className="font-bold text-emerald-600">+14%</span> across your live lectures following the rollout of automated SMS alerts and interactive live polls.
            </p>
            <div className="flex items-center gap-3">
              <button
                id="generate-reports-btn"
                onClick={() => setIsReportsOpen(true)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                <BarChart3 size={14} /> Generate Reports
              </button>
              <span className="text-xs text-slate-400 font-bold">• 48 Sessions Recorded</span>
            </div>
          </div>

          {/* Card 2: Resource Vault */}
          <div className="p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-xl text-blue-400">
                <Monitor size={24} />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-tight text-base text-white">Classroom Resource Vault</h3>
                <p className="text-xs text-slate-400">Manage lecture slides, worksheets, and syllabus handouts</p>
              </div>
            </div>
            <p className="text-xs font-medium text-slate-400 leading-relaxed mb-6">
              Upload study notes, chapter summaries, and formula sheets directly to active classes so learners can review prior to live sessions.
            </p>
            <div className="flex items-center gap-3">
              <button
                id="upload-materials-btn"
                onClick={() => setIsUploadOpen(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <Upload size={14} /> Upload Materials
              </button>
              <span className="text-xs text-slate-400 font-bold">• 26 Active Resources Attached</span>
            </div>
          </div>
        </div>

        {/* ── MODAL 1: SCHEDULE NEW CLASS ── */}
        {isScheduleOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
                    <Plus size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Schedule New Class</h3>
                    <p className="text-xs text-slate-500">Configure session details, date, time slot, and platform</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Class Title / Subject Topic *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced Physics: Thermodynamics & Heat Transfer"
                    value={newClass.title}
                    onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>

                {/* Stream & Target Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Stream / Subject Area
                    </label>
                    <select
                      value={newClass.stream}
                      onChange={(e) => setNewClass({ ...newClass, stream: e.target.value as TeacherClass['stream'] })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                      <option value="Vocational">Vocational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Scheduling Tab / Period *
                    </label>
                    <select
                      value={newClass.category}
                      onChange={(e) => {
                        const cat = e.target.value as TeacherClass['category'];
                        setNewClass({
                          ...newClass,
                          category: cat,
                          date: cat === 'today' ? 'Today, Nov 17' : cat === 'week' ? 'Tomorrow, Nov 18' : 'Nov 12, 2026',
                          status: cat === 'today' ? 'Upcoming' : cat === 'archives' ? 'Completed' : 'Scheduled'
                        });
                      }}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      <option value="today">Today (Nov 17)</option>
                      <option value="week">This Week (Upcoming)</option>
                      <option value="archives">Archives (Past Session)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Session Date Label
                    </label>
                    <input
                      type="text"
                      value={newClass.date}
                      onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                      placeholder="e.g. Today, Nov 17 or Nov 22, 2026"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      value={newClass.time}
                      onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                      placeholder="e.g. 10:00 AM - 11:30 AM"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>
                </div>

                {/* Session Type & Platform */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Session Format
                    </label>
                    <select
                      value={newClass.type}
                      onChange={(e) => setNewClass({ ...newClass, type: e.target.value as TeacherClass['type'] })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      <option value="Live Session">Live Session</option>
                      <option value="Discussion Panel">Discussion Panel</option>
                      <option value="Recorded Review">Recorded Review</option>
                      <option value="Lab Workshop">Lab Workshop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Virtual Classroom Provider
                    </label>
                    <select
                      value={newClass.platform}
                      onChange={(e) => setNewClass({ ...newClass, platform: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      <option value="NIOS Live Virtual Studio">NIOS Live Studio (Default)</option>
                      <option value="Google Meet (Integrated)">Google Meet (Integrated)</option>
                      <option value="Interactive Virtual Lab">Interactive Virtual Lab</option>
                      <option value="Zoom Meeting Room">Zoom Meeting Room</option>
                    </select>
                  </div>
                </div>

                {/* Expected Learners */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Expected Enrolled Learners
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={newClass.students}
                    onChange={(e) => setNewClass({ ...newClass, students: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Lesson Description & Agenda
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add lesson summary, agenda, required readings or student preparation guidelines..."
                    value={newClass.description}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsScheduleOpen(false)}
                    className="px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="submit-schedule-class"
                    className="px-6 py-3 bg-blue-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Plus size={15} /> Confirm & Schedule Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MODAL 2: EDIT CLASS ── */}
        {editingClass && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-xl">
                    <Edit2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Edit Class Session</h3>
                    <p className="text-xs text-slate-500">Update title, time slot, status, or session category</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingClass(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Class Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingClass.title}
                    onChange={(e) => setEditingClass({ ...editingClass, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Stream
                    </label>
                    <select
                      value={editingClass.stream}
                      onChange={(e) => setEditingClass({ ...editingClass, stream: e.target.value as TeacherClass['stream'] })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                      <option value="Vocational">Vocational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Category Tab
                    </label>
                    <select
                      value={editingClass.category}
                      onChange={(e) => setEditingClass({ ...editingClass, category: e.target.value as TeacherClass['category'] })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="archives">Archives</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      value={editingClass.time}
                      onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Status
                    </label>
                    <select
                      value={editingClass.status}
                      onChange={(e) => setEditingClass({ ...editingClass, status: e.target.value as TeacherClass['status'] })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      <option value="Live Now">Live Now</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingClass.description}
                    onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingClass(null)}
                    className="px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MODAL 3: VIEW CLASS DETAILS ── */}
        {viewingClass && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-50 text-blue-900">
                      {viewingClass.stream}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-100 text-slate-700">
                      {viewingClass.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{viewingClass.title}</h3>
                </div>
                <button
                  onClick={() => setViewingClass(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Date</span>
                    <span className="font-bold text-slate-800">{viewingClass.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Time Slot</span>
                    <span className="font-bold text-slate-800">{viewingClass.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Enrolled Learners</span>
                    <span className="font-bold text-slate-800">{viewingClass.students} Students</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Status</span>
                    <span className="font-bold text-blue-900">{viewingClass.status}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h5 className="font-black text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    Lesson Overview
                  </h5>
                  <p className="text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                    {viewingClass.description}
                  </p>
                </div>

                {/* Platform & Meeting link */}
                <div>
                  <h5 className="font-black text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    Platform & Direct Access
                  </h5>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                    <div className="truncate">
                      <span className="font-bold text-slate-900 block">{viewingClass.platform}</span>
                      <span className="text-[11px] text-slate-500 truncate block">{viewingClass.meetingUrl}</span>
                    </div>
                    <button
                      onClick={() => handleCopyLink(viewingClass.meetingUrl, viewingClass.id)}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
                    >
                      {copiedId === viewingClass.id ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedId === viewingClass.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleDeleteClass(viewingClass.id, viewingClass.title)}
                  className="px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Cancel Class
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const c = viewingClass;
                      setViewingClass(null);
                      setEditingClass(c);
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const c = viewingClass;
                      setViewingClass(null);
                      setLaunchingClass(c);
                    }}
                    className="px-5 py-2.5 bg-blue-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Video size={14} /> Launch Studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL 4: LIVE STUDIO LAUNCHER ── */}
        {launchingClass && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => setLaunchingClass(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Camera Preview Box */}
              <div className="w-full aspect-video bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-white shadow-inner">
                <div className="w-16 h-16 rounded-full bg-blue-900/60 border border-blue-400/30 flex items-center justify-center mb-2 animate-pulse">
                  <Video size={28} className="text-blue-300" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Virtual Camera & Mic Ready
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-bold text-emerald-400">Audio Stream Detected</span>
                </div>

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/60 text-[10px] font-bold text-white backdrop-blur-xs">
                  {user?.name || 'Dr. Priya Mehta (Teacher)'}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  {launchingClass.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {launchingClass.platform} • {launchingClass.students} Learners Waiting
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <Link
                  href={launchingClass.meetingUrl.startsWith('http') ? launchingClass.meetingUrl : launchingClass.meetingUrl}
                  onClick={() => {
                    // Update class status to Live Now
                    const updated = classesList.map(c =>
                      c.id === launchingClass.id ? { ...c, status: 'Live Now' as const } : c
                    );
                    saveClasses(updated);
                    setLaunchingClass(null);
                  }}
                  className="w-full py-3.5 bg-blue-900 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Video size={16} /> Enter Live Classroom
                </Link>

                <button
                  type="button"
                  onClick={() => setLaunchingClass(null)}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL 5: CLASSROOM SETTINGS ── */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-100 text-slate-800 rounded-xl">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Classroom Studio Settings</h3>
                    <p className="text-xs text-slate-500">Configure global teaching studio rules and privacy controls</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Default Platform */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Default Teaching Platform
                  </label>
                  <select
                    value={classroomSettings.defaultPlatform}
                    onChange={(e) => setClassroomSettings({ ...classroomSettings, defaultPlatform: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="NIOS Live Virtual Studio">NIOS Live Virtual Studio (Built-in)</option>
                    <option value="Google Meet (Integrated)">Google Meet (Integrated)</option>
                    <option value="Interactive Virtual Lab">Interactive Virtual Lab</option>
                  </select>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
                    <div className="pr-4">
                      <span className="text-xs font-black text-slate-900 block">Auto-Record All Live Sessions</span>
                      <span className="text-[11px] text-slate-500 block">
                        Recordings are instantly archived to the &quot;Archives&quot; tab for student revisions.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={classroomSettings.autoRecord}
                      onChange={(e) => setClassroomSettings({ ...classroomSettings, autoRecord: e.target.checked })}
                      className="w-4 h-4 accent-blue-900 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
                    <div className="pr-4">
                      <span className="text-xs font-black text-slate-900 block">Enable Real-Time Student Chat</span>
                      <span className="text-[11px] text-slate-500 block">
                        Allow enrolled learners to participate in real-time text chat and send questions.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={classroomSettings.allowStudentChat}
                      onChange={(e) => setClassroomSettings({ ...classroomSettings, allowStudentChat: e.target.checked })}
                      className="w-4 h-4 accent-blue-900 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
                    <div className="pr-4">
                      <span className="text-xs font-black text-slate-900 block">Virtual Waiting Room</span>
                      <span className="text-[11px] text-slate-500 block">
                        Require teacher admission before students can join live audio/video.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={classroomSettings.waitingRoom}
                      onChange={(e) => setClassroomSettings({ ...classroomSettings, waitingRoom: e.target.checked })}
                      className="w-4 h-4 accent-blue-900 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
                    <div className="pr-4">
                      <span className="text-xs font-black text-slate-900 block">AI Multi-Language Subtitles</span>
                      <span className="text-[11px] text-slate-500 block">
                        Auto-transcribe speech into 22 Indian regional languages in real-time.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={classroomSettings.aiTranslation}
                      onChange={(e) => setClassroomSettings({ ...classroomSettings, aiTranslation: e.target.checked })}
                      className="w-4 h-4 accent-blue-900 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSettingsOpen(false);
                    showToast('Classroom studio preferences saved!');
                  }}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL 6: GENERATE ATTENDANCE REPORTS ── */}
        {isReportsOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Faculty Attendance Report</h3>
                    <p className="text-xs text-slate-500">Summary statistics and exportable attendance roster</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsReportsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Stats Highlight */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div>
                  <div className="text-xl font-black text-slate-900">48</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Total Sessions</div>
                </div>
                <div>
                  <div className="text-xl font-black text-emerald-600">94.8%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Attendance</div>
                </div>
                <div>
                  <div className="text-xl font-black text-blue-900">1,842</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Total Attendees</div>
                </div>
              </div>

              {/* Recent Sessions Table */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Recent Session Rosters
                </span>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                  {classesList.slice(0, 4).map((c) => (
                    <div key={c.id} className="p-3 flex items-center justify-between">
                      <div className="truncate pr-4">
                        <div className="font-bold text-slate-800 truncate">{c.title}</div>
                        <div className="text-[10px] text-slate-400">{c.date} • {c.stream}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-black text-emerald-600">{c.attendanceRate || '95%'}</span>
                        <div className="text-[10px] text-slate-400">{c.students} enrolled</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Export format options:</span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      showToast('Downloading Attendance_Report_2026.csv...');
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={14} /> Export CSV
                  </button>
                  <button
                    onClick={() => {
                      showToast('Generating official NIOS PDF attendance summary...');
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-blue-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download size={14} /> Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL 7: UPLOAD MATERIALS ── */}
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Upload Classroom Materials</h3>
                    <p className="text-xs text-slate-500">Attach lecture slides, handouts, and formula sheets</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Class / Subject
                  </label>
                  <select
                    value={uploadData.classId}
                    onChange={(e) => setUploadData({ ...uploadData, classId: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    {classesList.map(c => (
                      <option key={c.id} value={c.id}>{c.title} ({c.stream})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 4: Formula Sheet & Solved Numericals"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Resource Category
                  </label>
                  <select
                    value={uploadData.type}
                    onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="Lecture Notes (PDF)">Lecture Notes (PDF)</option>
                    <option value="Presentation Slides (PPTX)">Presentation Slides (PPTX)</option>
                    <option value="Formula Sheet">Formula Sheet & Quick Reference</option>
                    <option value="Practice Worksheet">Practice Worksheet & Exercises</option>
                  </select>
                </div>

                {/* File Dropzone Area */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Choose File (PDF, PPTX, DOCX, ZIP)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-900 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50">
                    <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                    <span className="font-bold text-slate-700 block">Click to select file or drag and drop</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Maximum file size: 50MB</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!uploadData.title.trim()) {
                      showToast('Please enter a document title.');
                      return;
                    }
                    setIsUploadOpen(false);
                    showToast(`"${uploadData.title}" uploaded and shared with students!`);
                    setUploadData({ classId: 'C1', title: '', type: 'Lecture Notes (PDF)', fileName: '' });
                  }}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Upload size={14} /> Upload & Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
