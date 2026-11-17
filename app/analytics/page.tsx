'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Clock,
  Target,
  Brain,
  TrendingUp,
  BarChart3,
  Download,
  Zap,
  ArrowUpRight,
  PieChart,
  Activity,
  Award,
  Layers,
  FileSearch,
  Dna,
  History as TimeHistory,
  AlertTriangle,
  Globe,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Calendar,
  Share2,
  Printer,
  ChevronRight,
  Video,
  ShieldCheck,
  Eye,
  Percent
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import { INDIAN_LANGUAGES_22 } from '@/lib/courses-data';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [activeRange, setActiveRange] = useState<'7d' | '30d' | 'term'>('7d');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [showProgressCardModal, setShowProgressCardModal] = useState<boolean>(false);

  // Weekly focus telemetry dataset
  const weeklyActivity7d = [
    { day: 'Mon', hours: 4.5, video: 2.8, quiz: 1.2, tma: 0.5 },
    { day: 'Tue', hours: 6.2, video: 4.0, quiz: 1.5, tma: 0.7 },
    { day: 'Wed', hours: 3.8, video: 2.2, quiz: 1.0, tma: 0.6 },
    { day: 'Thu', hours: 5.5, video: 3.5, quiz: 1.2, tma: 0.8 },
    { day: 'Fri', hours: 4.0, video: 2.5, quiz: 1.0, tma: 0.5 },
    { day: 'Sat', hours: 7.2, video: 5.0, quiz: 1.5, tma: 0.7 },
    { day: 'Sun', hours: 2.5, video: 1.5, quiz: 0.8, tma: 0.2 },
  ];

  const weeklyActivity30d = [
    { day: 'W1', hours: 24.5, video: 16.0, quiz: 5.5, tma: 3.0 },
    { day: 'W2', hours: 28.2, video: 18.2, quiz: 6.5, tma: 3.5 },
    { day: 'W3', hours: 32.0, video: 21.0, quiz: 7.0, tma: 4.0 },
    { day: 'W4', hours: 33.7, video: 22.5, quiz: 7.2, tma: 4.0 },
  ];

  const currentActivity = activeRange === '7d' ? weeklyActivity7d : weeklyActivity30d;
  const maxHours = Math.max(...currentActivity.map((d) => d.hours));

  // NIOS Official Academic Performance Matrix
  const performanceData = [
    {
      subject: 'Environmental Science (211)',
      hindi: 'मानव जीवन में पशु-पक्षियों एवं वनस्पतियों का महत्व',
      score: 92,
      progress: 80,
      status: 'Excellence',
      tmaStatus: 'Submitted (18/20)',
      color: 'bg-emerald-500'
    },
    {
      subject: 'Science & Technology (212)',
      hindi: 'गति के नियम एवं प्रायोगिक विज्ञान',
      score: 86,
      progress: 70,
      status: 'On Track',
      tmaStatus: 'In Review (16/20)',
      color: 'bg-blue-600'
    },
    {
      subject: 'Vedic Mathematics (211)',
      hindi: 'तीव्र मानसिक अंकगणित एवं सूत्र',
      score: 96,
      progress: 100,
      status: 'Mastery',
      tmaStatus: 'Verified (20/20)',
      color: 'bg-purple-600'
    },
    {
      subject: 'Information Technology & AI (229)',
      hindi: 'कंप्यूटर विज्ञान एवं पायथन साक्षरता',
      score: 78,
      progress: 60,
      status: 'In Progress',
      tmaStatus: 'Draft Pending',
      color: 'bg-amber-500'
    },
    {
      subject: 'Hindi Core & Sahitya (201)',
      hindi: 'हिन्दी साहित्य एवं व्यावहारिक व्याकरण',
      score: 88,
      progress: 75,
      status: 'Proficient',
      tmaStatus: 'Submitted (17/20)',
      color: 'bg-rose-500'
    }
  ];

  // 23 Languages telemetry distribution
  const languageDistribution = [
    { lang: 'Hindi (हिन्दी)', pct: 48, code: 'hi', hours: '18.5h' },
    { lang: 'English', pct: 28, code: 'en', hours: '10.8h' },
    { lang: 'Bengali (বাংলা)', pct: 8, code: 'bn', hours: '3.1h' },
    { lang: 'Tamil (தமிழ்)', pct: 6, code: 'ta', hours: '2.3h' },
    { lang: 'Telugu (తెలుగు)', pct: 4, code: 'te', hours: '1.5h' },
    { lang: 'Marathi (मराठी)', pct: 3, code: 'mr', hours: '1.2h' },
    { lang: 'Sindhi & 17 More', pct: 3, code: 'sd', hours: '1.1h' },
  ];

  const analyticsStats = [
    {
      label: 'Video Watch Time',
      value: '38.5h',
      change: '+14% this week',
      up: true,
      sub: '22-Lang Streamed',
      icon: Video,
      color: 'text-blue-900 bg-blue-50'
    },
    {
      label: 'Syllabus Covered',
      value: '75%',
      change: 'On Schedule',
      up: true,
      sub: '4 of 5 Modules',
      icon: Target,
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      label: 'Academic Percentile',
      value: '96th',
      change: 'Top 4% State',
      up: true,
      sub: 'Regional Rank #12',
      icon: Award,
      color: 'text-purple-700 bg-purple-50'
    },
    {
      label: 'Board Preparedness',
      value: '88%',
      change: 'Distinction A+',
      up: true,
      sub: 'AI Predicted Grade',
      icon: Brain,
      color: 'text-amber-700 bg-amber-50'
    }
  ];

  return (
    <DashboardLayout
      title="Intelligence & Learning Analytics"
      subtitle={`${activeUser.name} · Real-time telemetry, NEP-360 progress mapping & predictive analytics`}
    >
      <div className="space-y-10 animate-fade-in pb-20">

        {/* ── 1. TOP METRIC STATS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {analyticsStats.map((s, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <s.icon size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {s.change}
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-700">{s.label}</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 2. HERO ENGAGEMENT CHART & MULTILINGUAL TELEMETRY ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Interactive Study Telemetry Bar Chart (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wider">
                    Study Hours & Video Engagement
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-black">
                    LIVE TELEMETRY
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Tracks video lecture streaming, interactive MCQ quizzes, and TMA work.
                </p>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl">
                {[
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRange(r.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      activeRange === r.id
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-4 space-y-2">
              <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 border-b border-slate-100">
                {currentActivity.map((item, idx) => {
                  const pct = Math.round((item.hours / (maxHours || 8)) * 100);
                  const videoPct = Math.round((item.video / item.hours) * 100);

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900 text-white text-[10px] font-bold py-1.5 px-2.5 rounded-xl shadow-xl z-20 whitespace-nowrap">
                        {item.day}: {item.hours}h ({item.video}h Video)
                      </div>

                      {/* Stacked Bar */}
                      <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end transition-all group-hover:brightness-105" style={{ height: `${pct}%` }}>
                        <div
                          className="w-full bg-gradient-to-t from-blue-900 via-indigo-800 to-blue-600 rounded-t-xl transition-all duration-700"
                          style={{ height: '100%' }}
                        />
                      </div>

                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider mt-3">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend & Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-blue-900" />
                    <span>Video Lecture Dubs (65%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-indigo-500" />
                    <span>Quizzes & Assessments (22%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-slate-300" />
                    <span>TMA Portfolios (13%)</span>
                  </span>
                </div>

                <div className="text-slate-800 font-bold">
                  Total Focus Time: <strong className="text-blue-900 font-black">38.5 Hours</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 23-Languages Telemetry Breakdown (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
                  <Globe size={13} /> NEP 2020 Telemetry
                </span>
                <h3 className="text-lg font-black mt-0.5">22 Languages Audio Usage</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase">
                Active
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Real-time linguistic tracking of regional language audio dubs selected during video playback.
            </p>

            <div className="space-y-3.5">
              {languageDistribution.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200">{item.lang}</span>
                    <span className="text-amber-400 font-mono font-black">{item.pct}% ({item.hours})</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link href="/student/my-courses/course-env-001" className="block pt-2">
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                <Video size={14} />
                <span>Launch 22-Lang Lecture</span>
              </button>
            </Link>
          </div>

        </div>

        {/* ── 3. SUBJECT PROFICIENCY MATRIX & TMA PROGRESS ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wider">
                Subject Proficiency & Syllabus Coverage
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Verified evaluation marks and continuous Tutor Marked Assignment (TMA) portfolio status.
              </p>
            </div>

            <button
              onClick={() => setShowProgressCardModal(true)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Download size={14} />
              <span>Download NEP-360 Report Card</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50/50">
                  <th className="py-3 px-4">Subject & Curriculum</th>
                  <th className="py-3 px-4 text-center">Assessment Score</th>
                  <th className="py-3 px-4">Syllabus Progress</th>
                  <th className="py-3 px-4">TMA Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                  <th className="py-3 px-4 text-right">Academic Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {performanceData.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <Link
                        href={`/report?subject=${encodeURIComponent(p.subject)}`}
                        className="group/item block hover:text-blue-900 transition-colors cursor-pointer"
                        title={`Open ${p.subject} details`}
                      >
                        <div className="font-bold text-slate-900 group-hover/item:text-blue-900 flex items-center gap-1.5">
                          <span>{p.subject}</span>
                          <ArrowUpRight size={13} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-900" />
                        </div>
                        <div className="text-[11px] text-slate-400">{p.hindi}</div>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-black text-xs border-2 ${
                        p.score >= 90
                          ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                          : 'border-blue-500 text-blue-900 bg-blue-50'
                      }`}>
                        {p.score}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1 max-w-xs">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-600">{p.progress}% Completed</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        {p.tmaStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Link
                        href={`/report?subject=${encodeURIComponent(p.subject)}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95"
                        title={`Open ${p.subject} individual report`}
                      >
                        <Eye size={13} />
                        <span>Detial Report</span>
                        <ChevronRight size={13} />
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                        p.status === 'Excellence' || p.status === 'Mastery'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-900 border border-blue-200'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 4. AI PREDICTIVE SUCCESS ENGINE & NEP-360 HOLISTIC SKILLS ── */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* AI Predictive Intelligence Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <Brain size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  AI Board Prediction
                </h4>
                <p className="text-xs text-slate-400 font-medium">Model Trained on 500k+ NIOS Records</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950 to-indigo-950 text-white text-center space-y-2">
              <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                Predicted Secondary Board Grade
              </div>
              <div className="text-5xl font-black tracking-tight text-white">
                A+ (92.4%)
              </div>
              <div className="text-xs text-emerald-400 font-bold">
                ✓ 98.2% Probability of First Division
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-600 font-medium leading-relaxed">
              <div className="flex items-center gap-1.5 font-black text-slate-900 text-xs">
                <Sparkles size={14} className="text-amber-500" /> AI Coach Recommendation:
              </div>
              <p>
                Complete Module 5 quiz in <strong>Environmental Science</strong> and submit your <strong>TMA portfolio</strong> before May 15 to lock in full 20/20 internal marks.
              </p>
            </div>
          </div>

          {/* NEP-360 Competency Radar */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  NEP-360 Competencies
                </h4>
                <p className="text-xs text-slate-400 font-medium">Holistic Skill Progression</p>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-black">
                LEVEL 4
              </span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Scientific Inquiry & Ecology', score: 94, color: 'bg-emerald-500' },
                { name: 'Vedic Mathematical Logic', score: 96, color: 'bg-purple-600' },
                { name: 'Digital & AI Literacy', score: 82, color: 'bg-blue-600' },
                { name: 'Multilingual Articulation (22 Langs)', score: 90, color: 'bg-indigo-600' },
                { name: 'Critical Problem Solving', score: 85, color: 'bg-amber-500' }
              ].map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-800">{skill.name}</span>
                    <span className="text-slate-500 font-mono">{skill.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Readiness & Hall Ticket Dispatch */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Board Registration
                </h4>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  ELIGIBLE
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900">
                  <CheckCircle2 size={15} /> All Prerequisites Cleared
                </div>
                <ul className="text-[11px] text-emerald-800 space-y-1 font-medium">
                  <li>• Minimum 75% video attendance satisfied (38.5h)</li>
                  <li>• 2 of 2 core subject assessments completed</li>
                  <li>• Identity verification & photo KYC approved</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <Link href="/assessments">
                <button className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
                  <span>Take Module Assessments</span>
                  <ChevronRight size={15} />
                </button>
              </Link>
              <Link href="/live">
                <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>Join Live Classroom</span>
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* ── NEP-360 OFFICIAL PROGRESS CARD MODAL ── */}
      <AnimatePresence>
        {showProgressCardModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowProgressCardModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 sm:p-10 max-w-2xl w-full border-4 border-blue-900/20 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setShowProgressCardModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 font-black text-xl cursor-pointer"
              >
                ×
              </button>

              <div className="text-center space-y-1">
                <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest">
                  NATIONAL INSTITUTE OF OPEN SCHOOLING (राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान)
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  HOLISTIC NEP-360 ACADEMIC PROGRESS CARD
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Autonomous Body Under Ministry of Education, Government of India
                </p>
              </div>

              {/* Student Demographics Header */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Learner Name</span>
                  <span className="font-black text-slate-900">{activeUser.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Enrollment No.</span>
                  <span className="font-black text-slate-900">{activeUser.details.enrollmentNo || 'ENR-2025-001'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Academic Stream</span>
                  <span className="font-black text-slate-900">{activeUser.details.class || 'Class 10 (Secondary)'}</span>
                </div>
              </div>

              {/* Grades Table */}
              <div className="space-y-2">
                <div className="text-xs font-black text-slate-900 uppercase">Subject Performance Breakdown:</div>
                <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-[10px] font-black text-slate-500 uppercase">
                      <tr>
                        <th className="p-2.5">Subject</th>
                        <th className="p-2.5 text-center">Score</th>
                        <th className="p-2.5 text-center">Progress</th>
                        <th className="p-2.5 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {performanceData.map((p, i) => (
                        <tr key={i}>
                          <td className="p-2.5 font-bold text-slate-800">{p.subject}</td>
                          <td className="p-2.5 text-center font-black text-blue-900">{p.score}%</td>
                          <td className="p-2.5 text-center text-slate-600">{p.progress}%</td>
                          <td className="p-2.5 text-right font-black text-emerald-700">A+</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verified Seal Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-100">
                <div>
                  <div className="text-slate-700">Digital Seal: SHA-256 Verified</div>
                  <div className="text-[10px] text-emerald-700">✓ Linked to NIOS Academic Bank of Credits (ABC)</div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print Report</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </DashboardLayout>
  );
}
