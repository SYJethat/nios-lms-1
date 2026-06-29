'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import {
  Search,
  Filter,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
  Layers,
  Microscope
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_COURSES } from '@/lib/mock-data';

const COURSE_OVERLAY_MAP: Record<string, { title: string; subject: string }> = {
  '1': { title: 'Aggression Study', subject: 'NIOS' },
  '2': { title: 'About of Psychology', subject: 'Psychology' },
  '3': { title: 'Laxmi Story', subject: 'Story' },
  '4': { title: 'Aggression Study', subject: 'NIOS' },
  '5': { title: 'About of Psychology', subject: 'Psychology' },
  '6': { title: 'Laxmi Story', subject: 'Story' }
};

export default function CoursesPage() {
  const { user } = useAuth();

  if (!user) return null;

  const isLearner = user.role === 'learner';

  return (
    <DashboardLayout
      title={isLearner ? "My Learning" : "Course Management"}
      subtitle={isLearner ? "Continue where you left off" : "Manage your curriculum and content"}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search courses, subjects, or keywords..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-900/5 focus:border-orange-900/20 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} /> Filters
          </button>
          {!isLearner && (
            <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/10">
              Create New Course
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.filter(course => ['1', '2', '3', '4', '5', '6'].includes(course.id)).map((course) => {
          const getCourseImage = (id: string) => {
            if (id === '1') return '/NIOSlogo_with_title.png';
            if (id === '2') return '/book.jpg';
            if (id === '3') return '/image.png';
            if (id === '4') return '/NIOS.png';
            if (id === '5') return '/book.jpg';
            if (id === '6') return '/image.png';
            return '/NIOS.png';
          };
          const courseInfo = COURSE_OVERLAY_MAP[course.id] || { title: course.title, subject: course.subject };
          return (
            <div key={course.id} className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
              <Link href={`/student/courses-video/${course.id}`} className="block relative h-48 bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 w-full h-full">
                  <img src={getCourseImage(course.id)} alt={courseInfo.title} className="object-cover w-full h-full" />
                </div>
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20">
                    {courseInfo.subject}
                  </span>
                  <span className="px-3 py-1 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/20 bg-emerald-500/80">
                    {course.currentStage && course.currentStage.toUpperCase()}
                  </span>

                </div>
              </Link>

              <div className="p-8">
                <Link href={`/student/courses-video/${course.id}`}>
                  <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-orange-900 transition-colors">
                    {courseInfo.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Clock size={14} /> {course.modules?.length * 2}h estimated
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Layers size={14} /> {course.modules?.length} Modules
                  </div>
                  {course.rating && (
                    <div className="flex items-center gap-1 text-xs font-black text-orange-500">
                      <Star size={14} fill="currentColor" /> {course.rating}
                    </div>
                  )}
                </div>


                {isLearner && course.enrolled ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Course Progress</span>
                      <span className="text-slate-900">{course.overallProgress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-900 transition-all duration-1000"
                        style={{ width: `${course.overallProgress}%` }}
                      />
                    </div>
                    <Link
                      href={`/student/courses-video/${course.id}`}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-900 transition-all shadow-lg active:scale-95"
                    >
                      Resume Learning <ArrowRight size={14} />
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">👨‍🏫</div>
                      <span className="text-xs font-bold text-slate-500">NIOS Faculty</span>
                    </div>
                    <Link
                      href={`/student/courses-video/${course.id}`}
                      className="px-6 py-3 bg-orange-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95 text-center"
                    >
                      Enroll Now
                    </Link>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 p-12 rounded-xl bg-blue-50 border border-slate-200 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-900/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
        <div className="absolute -bottom-20 -right-20 opacity-5 group-hover:opacity-10 transition-opacity">
          <Microscope size={320} className="text-orange-800" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-900/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000 border border-orange-900/5" />
        <div className="relative  z-10 max-w-2xl">


          <div className="w-16 h-16 rounded-xl bg-orange-900/20 flex items-center justify-center text-orange-900 mb-8 group-hover:scale-110 transition-transform">
            <Sparkles size={32} />
          </div>
          <h2 className="text-4xl font-black mb-6 leading-tight">Can't find what you're looking for?</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">Use our AI-assisted search or contact an academic counselor for personalized course guidance.</p>



          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-orange-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95">
              Ask AI Assistant
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white  rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              Talk to Expert
            </button>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}
