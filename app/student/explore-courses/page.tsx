'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Globe,
  Star,
  CheckCircle2,
  BookOpen,
  Filter,
  Play,
  IndianRupee,
  ShieldCheck,
  Video,
  Languages
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { COURSES_DATA, Course, getStoredEnrolledIds, INDIAN_LANGUAGES_22 } from '@/lib/courses-data';
import CourseEnrollModal from '@/components/CourseEnrollModal';

export default function ExploreCoursesPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  // Modal state
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setEnrolledIds(getStoredEnrolledIds());
  }, []);

  const handleEnrollClick = (course: Course) => {
    setSelectedCourseForEnroll(course);
    setIsModalOpen(true);
  };

  const handleEnrollmentSuccess = (courseId: string) => {
    setEnrolledIds(prev => prev.includes(courseId) ? prev : [...prev, courseId]);
  };

  const categories = [
    'All',
    'पर्यावरण एवं जीवन विज्ञान (Environmental & Life Sciences)',
    'गणित एवं तार्किक विश्लेषण (Mathematics & Logic)',
    'सूचना प्रौद्योगिकी एवं एआई (Tech & Computer Science)',
    'पर्यावरण एवं भूगोल (Earth & Environment)'
  ];

  const progressMap: Record<string, number> = {
    'course-env-001': 80,
    'course-sci-002': 70,
    'course-math-003': 100,
    'course-it-004': 60
  };

  const filteredCourses = COURSES_DATA.filter(course => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      course.titleHindi.toLowerCase().includes(q) ||
      course.titleEnglish.toLowerCase().includes(q) ||
      course.subjectHindi.toLowerCase().includes(q) ||
      course.subjectEnglish.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q) ||
      course.instructor.name.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <DashboardLayout
      title="My Learning"
      subtitle={`${user?.name || 'Arjun Sharma'} · Continue where you left off`}
    >
      <div className="space-y-8 pb-20">
        {/* Search Bar & FILTERS Button matching user's screenshot */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-900 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search courses, subjects, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'All' ? categories[1] : 'All')}
              className="px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Filter size={14} /> FILTERS
            </button>

            {['All', 'Secondary', 'Senior Secondary'].map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedLevel === level
                    ? 'bg-blue-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {level}
              </button>
            ))}

            <Link href="/student/my-courses">
              <button className="px-4 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap">
                <Play size={14} fill="currentColor" /> My Enrolled
              </button>
            </Link>
          </div>
        </div>

        {/* 23 Languages Banner Note */}
        <div className="p-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
              <Globe size={18} />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-blue-200">
                23 Scheduled Indian Languages Synchronized AI Video Stream
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                All video lectures dubbing synchronized across Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Sindhi & more.
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shrink-0">
            NEP 2020 APPROVED
          </span>
        </div>

        {/* Course Cards Grid - 3 Columns matching user screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledIds.includes(course.id);
            const progressPct = progressMap[course.id] ?? 80;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Header with Overlay Badges */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.titleEnglish}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Badges on Image matching screenshot */}
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

                    {/* Meta Row: Clock, Modules, Star */}
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

                  {/* Conditional Section: Enrolled (Progress + Resume) vs Unenrolled (Payment / Purchase ENROLL NOW) */}
                  {isEnrolled ? (
                    <div className="space-y-4 pt-1">
                      {/* Course Progress Bar matching screenshot */}
                      <div className="space-y-1.5">
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

                      {/* Full-width RESUME LEARNING Button */}
                      <Link href={`/student/my-courses/${course.id}`} className="block w-full">
                        <button className="w-full py-3 bg-[#0d1322] hover:bg-blue-950 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer">
                          <span>RESUME LEARNING</span>
                          <ArrowRight size={14} />
                        </button>
                      </Link>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-50">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-[9px] font-black">
                            N
                          </div>
                          <span className="text-slate-600 font-bold">{course.instructor.name}</span>
                        </div>
                        <span className="text-emerald-700 font-bold">✓ Enrolled</span>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                          N
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 leading-tight">
                            {course.instructor.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-semibold">
                            ₹{course.price} · <span className="line-through">₹{course.originalPrice}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleEnrollClick(course)}
                        className="px-5 py-2.5 bg-[#7c2d12] hover:bg-[#60230e] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        ENROLL NOW
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <Search className="text-slate-300 mx-auto mb-3" size={36} />
            <h3 className="text-sm font-black text-slate-900 uppercase">No Courses Matching Search</h3>
            <p className="text-slate-400 text-xs font-medium mt-1">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Modal for Enrollment */}
        <CourseEnrollModal
          course={selectedCourseForEnroll}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleEnrollmentSuccess}
        />
      </div>
    </DashboardLayout>
  );
}
