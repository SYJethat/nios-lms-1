'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Play,
  Clock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  BookOpen,
  Calendar,
  Award,
  ChevronRight,
  Zap,
  Target,
  ArrowRight,
  ShieldCheck,
  Globe,
  Gamepad2,
  Languages,
  Layers,
  Star,
  FileText,
  Compass,
  Download,
  IndianRupee,
  Share2,
  HelpCircle,
  Video,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  COURSES_DATA,
  Course,
  getStoredEnrolledIds,
  saveEnrolledCourseId,
  INDIAN_LANGUAGES_22
} from '@/lib/courses-data';
import { MOCK_USERS } from '@/lib/mock-data';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CourseEnrollModal from '@/components/CourseEnrollModal';

export default function LearnerDashboard() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const [selectedLanguageTab, setSelectedLanguageTab] = useState<string>('hi');

  useEffect(() => {
    setEnrolledIds(getStoredEnrolledIds());
  }, []);

  const handleEnrollSuccess = (courseId: string) => {
    saveEnrolledCourseId(courseId);
    setEnrolledIds(getStoredEnrolledIds());
    setEnrollingCourse(null);
  };

  const enrolledCourses = COURSES_DATA.filter((c) => enrolledIds.includes(c.id));
  const unenrolledCourses = COURSES_DATA.filter((c) => !enrolledIds.includes(c.id));
  const primaryCourse = enrolledCourses.find((c) => c.id === 'course-env-001') || enrolledCourses[0] || COURSES_DATA[0];

  const progressMap: Record<string, number> = {
    'course-env-001': 80,
    'course-sci-002': 70,
    'course-math-003': 100,
    'course-it-004': 60
  };

  const stats = [
    {
      label: 'Enrolled Courses',
      value: `${enrolledCourses.length}`,
      sub: `${unenrolledCourses.length} more in catalog`,
      icon: BookOpen,
      color: 'text-blue-900 bg-blue-50',
      badge: 'Active'
    },
    {
      label: 'Video Watch Time',
      value: '38.5h',
      sub: '+4.2h this week',
      icon: Clock,
      color: 'text-amber-700 bg-amber-50',
      badge: 'Top 10%'
    },
    {
      label: 'Average Progress',
      value: '75%',
      sub: 'On Track for Exams',
      icon: TrendingUp,
      color: 'text-emerald-700 bg-emerald-50',
      badge: 'Exemplary'
    },
    {
      label: '23 Regional Languages',
      value: 'NEP 2020',
      sub: 'Sync Dubbing & ISL',
      icon: Globe,
      color: 'text-purple-700 bg-purple-50',
      badge: 'Govt. Accredited'
    }
  ];

  return (
    <DashboardLayout
      title="Learner Dashboard"
      subtitle={`${activeUser.name} · Class 10 (Senior Secondary) · NIOS Academic Portal`}
    >
      <div className="space-y-10 animate-fade-in pb-20">



        {/* ── 2. FEATURED RESUME LECTURE HERO BANNER ── */}
        <div className="relative rounded-[32px] bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 sm:p-10 text-white overflow-hidden shadow-2xl border border-blue-900/40">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          {/* ── 1. WELCOME PROFILE HEADER STRIP ── */}
          <div className=" rounded-3xl bg-white/10 p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-600 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shadow-blue-950/20 shrink-0">
                {activeUser.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                    Welcome back, {activeUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                    Active Student
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  Enrollment ID: <strong className="text-slate-100 font-bold">{activeUser.details.enrollmentNo || 'ENR-2025-001'}</strong> · Standard: <strong className="text-slate-100 font-bold">{activeUser.details.class || 'Class 10'}</strong> · Regional Center: Noida (09)
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-200 font-medium">
                  <span> 2 Subjects Enrolled</span>
                  <span>·</span>
                  <span> 23 Scheduled Languages</span>
                  <span>·</span>
                  <span> Gold Scholar Milestone (65%)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link href="/student/explore-courses" className="flex-1 md:flex-initial">
                <button className="w-full px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer">
                  <Compass size={15} />
                  <span>Explore Catalog</span>
                </button>
              </Link>
              <Link href="/student/my-courses" className="flex-1 md:flex-initial">
                <button className="w-full px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer">
                  <BookOpen size={15} />
                  <span>My Courses</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-black uppercase tracking-widest border border-blue-400/20">
                  <Sparkles size={13} className="text-amber-400" /> RESUME LECTURE
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
                  23 Languages Synced
                </span>
              </div>

              <div className="space-y-2">
                {/* <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  {primaryCourse.titleEnglish}
                </h2> */}
                <p className="text-sm sm:text-base text-blue-200 font-medium">
                  {primaryCourse.titleHindi}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
                  Dive into ecological stewardship and the symbiosis between birds, animals, plants and mankind. Switch between Hindi, English, Bengali, Tamil, Telugu, Marathi, Sindhi, and 16 more languages with gapless audio synchronization.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-2 pt-1 max-w-lg">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Course Progress</span>
                  <span className="text-amber-400 font-black">80% Completed (Module 4 of 5)</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 rounded-full"
                    style={{ width: '80%' }}
                  />
                </div>
              </div>

              {/* CTA Action Buttons */}
              {/* <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link href={`/student/my-courses/${primaryCourse.id}`}>
                  <button className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-blue-600/30 active:scale-95 transition-all cursor-pointer">
                    <Play size={16} fill="currentColor" />
                    <span>Resume Video Lecture (80%)</span>
                  </button>
                </Link>
                <Link href={`/student/courses-video/${primaryCourse.id}`}>
                  <button className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center gap-2 cursor-pointer">
                    <Video size={16} />
                    <span>23-Lang Player Hub</span>
                  </button>
                </Link>
                <Link href="/gamification">
                  <button className="px-4 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-blue-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer">
                    <Gamepad2 size={15} />
                    <span>Quiz & XP</span>
                  </button>
                </Link>
              </div> */}
            </div>

            {/* Right Video Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl group">
                <img
                  src={primaryCourse.thumbnail}
                  alt={primaryCourse.titleEnglish}
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Center Glowing Play Button */}
                <Link
                  href={`/student/my-courses/${primaryCourse.id}`}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 group-hover:bg-blue-500 transition-all border border-white/30 backdrop-blur-sm">
                    <Play size={26} fill="currentColor" className="ml-1" />
                  </div>
                </Link>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-10">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                    <Clock size={12} className="text-amber-400" />
                    <span>74s Synced Master HD</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                    ✓ 23 Indian Languages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. FOUR METRICS STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                {/* <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <s.icon size={22} />
                </div> */}
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {s.badge}
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

        {/* ── 4. MY ENROLLED COURSES (3-COLUMN CARDS MATCHING SCREENSHOT) ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">
                  My Enrolled Courses (मेरे पंजीकृत पाठ्यक्रम)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black">
                  {enrolledCourses.length} ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Continue learning your active subjects with full HD video playback in 23 synchronized Indian languages.
              </p>
            </div>

            <Link href="/student/my-courses">
              <button className="text-xs font-black text-blue-900 uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer">
                <span>View All In My Courses</span>
                <ChevronRight size={14} />
              </button>
            </Link>
          </div>

          {/* 3-Columns Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enrolledCourses.slice(0, 2).map((course) => {
              const progressPct = progressMap[course.id] ?? 75;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Image Header with Overlay Badges */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.titleEnglish}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Category & Content Badges */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                      <span className="px-2.5 py-0.5 rounded-md bg-white text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {course.subjectEnglish.split('&')[0].trim().toUpperCase()}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                        CONTENT
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider border border-white/20">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                        {course.titleEnglish}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {course.titleHindi}
                      </p>

                      {/* Meta Row */}
                      <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" />
                          {course.duration.includes('Hours') ? course.duration.split('Hours')[0] + 'h estimated' : '2h estimated'}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Layers size={13} className="text-slate-400" />
                          {course.lessons.length} Modules
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star size={13} fill="currentColor" /> {course.rating}
                        </span>
                      </div>
                    </div>

                    {/* Course Progress Section */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                        <span className="text-slate-400">COURSE PROGRESS</span>
                        <span className="text-slate-800 font-bold">{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 rounded-full transition-all duration-700"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button: RESUME LEARNING -> */}
                    <div className="pt-2">
                      <Link href={`/student/my-courses/${course.id}`} className="block w-full">
                        <button className="w-full py-3 bg-[#0d1322] hover:bg-blue-950 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer">
                          <span>RESUME LEARNING</span>
                          <ArrowRight size={14} />
                        </button>
                      </Link>
                    </div>

                    {/* Instructor / NIOS Faculty Footer */}
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-[9px] font-black">
                          N
                        </div>
                        <span className="text-slate-600 font-bold">{course.instructor.name}</span>
                      </div>
                      <span className="text-emerald-700 font-bold">✓ 23 Langs Sync</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* If unenrolled courses exist, show the first unenrolled as a card with ENROLL NOW */}
            {unenrolledCourses.slice(0, 1).map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Header with Price Badge */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.titleEnglish}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-white text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {course.subjectEnglish.split('&')[0].trim().toUpperCase()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      CONTENT
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded bg-[#7c2d12] text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                      {course.price ? `₹${course.price}` : '₹599'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                      {course.titleEnglish}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {course.titleHindi}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        {course.duration.includes('Hours') ? course.duration.split('Hours')[0] + 'h estimated' : '2h estimated'}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Layers size={13} className="text-slate-400" />
                        {course.lessons.length} Modules
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={13} fill="currentColor" /> {course.rating}
                      </span>
                    </div>
                  </div>

                  {/* Enroll Benefit Pill */}
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 font-medium flex items-center gap-2">
                    <Award size={14} className="text-amber-700 shrink-0" />
                    <span>Includes 23-language video streams & NIOS certification</span>
                  </div>

                  {/* Action Button: ENROLL NOW */}
                  <div className="pt-2">
                    <button
                      onClick={() => setEnrollingCourse(course)}
                      className="w-full py-3 bg-[#7c2d12] hover:bg-[#60230e] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                    >
                      <span>ENROLL NOW</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-50">
                    <span className="text-slate-600 font-bold">{course.instructor.name}</span>
                    <span className="text-slate-500 font-bold">Official Registration</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Quick Explore Card */}
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-900/40 transition-colors group bg-slate-50/50">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-900 uppercase">Discover Full Catalog</h4>
                <p className="text-xs text-slate-500 max-w-xs font-medium">
                  Enroll in Vedic Mathematics, AI Literacy, Environmental Conservation & more with official NIOS certification.
                </p>
              </div>
              <Link href="/student/explore-courses">
                <button className="px-5 py-2.5 rounded-xl bg-blue-900 text-white font-black text-xs uppercase tracking-wider hover:bg-blue-800 transition-all shadow-md cursor-pointer">
                  Browse 23-Lang Catalog
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── 5. 23 INDIAN LANGUAGES QUICK VIDEO SELECTOR HUB ── */}
        {/* ── 5. 23 INDIAN LANGUAGES QUICK VIDEO SELECTOR HUB ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Soft background accent */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                  <Sparkles size={12} />
                  Approved under NEP 2020
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  23 Indian Languages Video Hub
                </h3>

                <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                  Choose any language to open the player with native audio dubbing, live subtitles, interactive transcripts, and Indian Sign Language (ISL) picture-in-picture.
                </p>
              </div>

              <Link href="/student/my-courses/course-env-001">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all shrink-0">
                  <Play size={15} fill="currentColor" />
                  Launch Full Player
                </button>
              </Link>
            </div>

            {/* Language Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {INDIAN_LANGUAGES_22.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/student/my-courses/course-env-001?lang=${lang.code}`}
                  className="group p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                      {lang.name}
                    </span>
                    <span className="text-[9px] font-mono font-semibold text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-100 group-hover:border-blue-100 group-hover:text-blue-500">
                      {lang.code}
                    </span>
                  </div>
                  <div className="text-[15px] font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {lang.native}
                  </div>
                </Link>
              ))}
            </div>

            {/* Optional footer note */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
              <span>All videos support dual audio + ISL</span>
              <Link
                href="/student/my-courses/course-env-001"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all languages →
              </Link>
            </div>
          </div>
        </div>

        {/* ── 6. SCHEDULE & DEADLINE QUEUE + QUICK TOOLS ── */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Schedule & Deadlines Queue */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">
                  Upcoming Assessments & Deadlines (परीक्षा एवं कार्य सूची)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Track upcoming Tutor Marked Assignments (TMA) and interactive video assessments.
                </p>
              </div>
              <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                3 Pending
              </span>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  title: 'Importance of Animals, Birds & Plants MCQ Quiz',
                  date: 'Tomorrow, 02 Nov 2026',
                  time: '10:00 AM',
                  status: 'Urgent',
                  color: 'text-rose-600 bg-rose-50 border-rose-200',
                  href: '/student/my-courses/course-env-001'
                },
                {
                  title: 'Tutor Marked Assignment (TMA) 2026 Online Submission',
                  date: '15 Nov 2026',
                  time: '11:59 PM',
                  status: 'Due Soon',
                  color: 'text-amber-700 bg-amber-50 border-amber-200',
                  href: '/student/my-courses'
                },
                {
                  title: 'Science & Biodiversity Virtual Lab Simulation',
                  date: '22 Nov 2026',
                  time: '02:00 PM',
                  status: 'Upcoming',
                  color: 'text-blue-700 bg-blue-50 border-blue-200',
                  href: '/student/my-courses/course-sci-002'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-white text-blue-900 flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                      <Calendar size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${item.color}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold">
                        {item.date} · {item.time}
                      </p>
                    </div>
                  </div>

                  <Link href={item.href} className="shrink-0">
                    <button className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1 cursor-pointer">
                      <span>Open</span>
                      <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => alert('Calendar synced with your student account successfully!')}
                className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                <span>Sync with Student Calendar</span>
              </button>

              <Link href="/student-support" className="text-xs font-bold text-blue-900 hover:underline">
                Need help with submission deadlines? Contact Support →
              </Link>
            </div>
          </div>

          {/* Quick Academic Toolkit Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Academic Toolkit
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/student/my-courses/course-env-001"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2.5">
                    <Video size={16} className="text-blue-900" />
                    <span>23-Lang Video Lecture</span>
                  </span>
                  <ExternalLink size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/student/learn-language"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2.5">
                    <Zap size={16} className="text-amber-600" />
                    <span>Regional Language Lab</span>
                  </span>
                  <ExternalLink size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/gamification"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2.5">
                    <Gamepad2 size={16} className="text-purple-600" />
                    <span>Gamified MCQ & Badges</span>
                  </span>
                  <ExternalLink size={14} className="text-slate-400" />
                </Link>

                <div
                  onClick={() => alert('Certificate generator is active after completing 100% of your course modules.')}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors border border-slate-100 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Award size={16} className="text-emerald-600" />
                    <span>NIOS Official Certificate</span>
                  </span>
                  <Download size={14} className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Quick Tip Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950 to-slate-900 text-white space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <Sparkles size={14} /> Did You Know?
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                You can change playback audio between Hindi, English, Sindhi, and 20 other languages at any second without losing your current video position.
              </p>
            </div>
          </div>
        </div>

        {/* ── 7. OFFICIAL NIOS & NEP 2020 COMPLIANCE BADGES ── */}
        <div className="p-6 rounded-2xl bg-white border border-slate-100 text-center space-y-3 shadow-sm">
          <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            {['DIKSHA', 'SWAYAM', 'NEP 2020', 'Govt of India', 'NIOS Board Accredited', 'NCERT Aligned'].map((t) => (
              <span key={t} className="hover:text-blue-900 transition-colors cursor-default">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
            <ShieldCheck size={14} className="text-emerald-600" />
            Official National Institute of Open Schooling Academic Stream
          </div>
        </div>

      </div>

      {/* ── COURSE ENROLLMENT MODAL (IF CLICKED ENROLL NOW) ── */}
      <CourseEnrollModal
        course={enrollingCourse}
        isOpen={!!enrollingCourse}
        onClose={() => setEnrollingCourse(null)}
        onSuccess={handleEnrollSuccess}
      />
    </DashboardLayout>
  );
}
