'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  Clock,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Award,
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  FileText,
  Calendar,
  Filter,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { COURSES_DATA, Course, getStoredEnrolledIds, getStoredEnrollmentOrders } from '@/lib/courses-data';

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setEnrolledIds(getStoredEnrolledIds());
  }, []);

  const enrolledCourses = COURSES_DATA.filter(course => enrolledIds.includes(course.id));

  // Progress simulation map
  const progressMap: Record<string, number> = {
    'course-env-001': 80,
    'course-sci-002': 70,
    'course-math-003': 100,
    'course-it-004': 60
  };

  const filteredCourses = enrolledCourses.filter(course => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      course.titleHindi.toLowerCase().includes(q) ||
      course.titleEnglish.toLowerCase().includes(q) ||
      course.subjectHindi.toLowerCase().includes(q) ||
      course.subjectEnglish.toLowerCase().includes(q);

    const prog = progressMap[course.id] ?? 75;
    const isCompleted = prog >= 100;
    if (statusFilter === 'completed') return matchesSearch && isCompleted;
    if (statusFilter === 'in_progress') return matchesSearch && !isCompleted;
    return matchesSearch;
  });

  return (
    <DashboardLayout
      title="My Learning"
      subtitle={`${user?.name || 'Arjun Sharma'} · Continue where you left off`}
    >
      <div className="space-y-8 pb-20">
        {/* Search & Filters Bar matching screenshot */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-900 transition-colors" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, subjects, or keywords..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowFiltersModal(!showFiltersModal)}
              className="px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Filter size={14} /> FILTERS
            </button>

            {(['all', 'in_progress', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-blue-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'in_progress' ? 'In Progress' : 'Completed'}
              </button>
            ))}

            <Link href="/student/explore-courses">
              <button className="px-4 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap">
                <Sparkles size={14} /> Explore All
              </button>
            </Link>
          </div>
        </div>

        {/* Course Cards Grid - 3 Columns matching user's screenshot */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const progressPct = progressMap[course.id] ?? 75;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Course Image Header with Overlay Badges */}
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.titleEnglish}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Category & Content Badges on Image */}
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

                      {/* Meta Row matching screenshot */}
                      <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" /> {course.duration.includes('Hours') ? course.duration.split('Hours')[0] + 'h estimated' : '2h estimated'}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Layers size={13} className="text-slate-400" /> {course.lessons.length} Modules
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

                    {/* Instructor / NIOS Faculty footer */}
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
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 space-y-4">
            <BookOpen size={48} className="text-slate-300 mx-auto" />
            <h3 className="text-base font-black text-slate-900 uppercase">No Courses Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You haven't enrolled in any courses matching your filters.
            </p>
            <Link href="/student/explore-courses">
              <button className="px-6 py-3 rounded-xl bg-blue-900 text-white font-black text-xs uppercase tracking-wider hover:bg-blue-800 transition-all shadow-md">
                Explore 23-Language Courses
              </button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
