'use client';

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
   Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const stats = [
   { label: 'Overall Progress', value: '72%', icon: TrendingUp, color: 'text-blue-900 bg-blue-50' },
   { label: 'Course Completed', value: '04', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
   { label: 'Study Hours', value: '128h', icon: Clock, color: 'text-blue-500 bg-blue-50' },
   { label: 'Achievements', value: '12', icon: Award, color: 'text-purple-500 bg-purple-50' },
];

const nextLessons = [
   { title: 'Algebraic Identities', subject: 'Mathematics', duration: '45 mins', progress: 75, type: 'Video' },
   { title: 'Thermodynamics Part 2', subject: 'Science', duration: '20 mins', progress: 50, type: 'Reading' },
   { title: 'English Grammer', subject: 'English', duration: '30 mins', progress: 30, type: 'Video' },
   { title: 'AI Agents', subject: 'AI', duration: '30 mins', progress: 20, type: 'Video' }
];

export default function LearnerDashboard() {
   const { user } = useAuth();

   if (!user) return null;

   return (
      <DashboardLayout
         title="Academic Console"
         subtitle={`Welcome back, ${user.name.split(' ')[0]} · ${user.details.class} Stream`}
      >
         <div className="space-y-12 animate-fade-in pb-20">

            {/* Progress Headline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 p-10 rounded-xl border-1 border-slate-100 bg-blue-50 text-slate-900 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                     <div className="w-24 h-24 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-2xl animate-float">
                        <Target size={40} />
                     </div>
                     <div className="text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-900">Weekly Goal Active</div>
                        <h3 className="text-3xl font-black tracking-tight leading-none">Finish 3 Lessons this week to reach <span className="text-blue-900">Silver Tier</span>.</h3>
                        <p className="text-slate-400 text-sm font-medium">You have completed 65% of your target. Keep going!</p>
                     </div>
                     <div className="flex-1" />
                     <button className="px-10 py-5 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all shadow-xl active:scale-95 whitespace-nowrap">
                        Resume Physics <Play size={12} className="inline text-blue-600    ml-1" />
                     </button>
                  </div>
               </div>

               <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                        <Sparkles size={24} />
                     </div>
                     <Link href="/dashboard/ai-tutor">
                        <button className="text-[10px] font-black text-green-400 uppercase cursor-pointer z-10 tracking-widest">AI Tutor Online</button>
                     </Link>
                  </div>
                  <p className="text-sm font-black text-slate-900 leading-tight">"You spent 2 hours on Trigonometry yesterday. Ready for a quick recap?"</p>

                  <Link href="/ai-tutor" className='cursor-pointer'>
                     <button className="w-full mt-6 py-4 bg-blue-50 text-slate-400 cursor-pointer  rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-blue-600 hover:text-white border border-transparent hover:border-slate-100">
                        Start Recap Session
                     </button>
                  </Link>
               </div>
            </div>

            {/* Action Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {stats.map((s) => (
                  <div key={s.label} className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                     <div className={`w-14 h-14 rounded-xl ${s.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                        <s.icon size={24} />
                     </div>
                     <div className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                  </div>
               ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
               {/* Learning Path */}
               <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center justify-between px-4">
                     <h3 className="text-2xl font-black text-slate-900 uppercase tracking-[0.05em]">Continue Learning</h3>
                     <Link href="/courses" className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Browse Catalog</Link>
                  </div>

                  <div className="space-y-6">
                     <div className="flex flex-wrap gap-2 px-4">
                        {['All', 'Hindi', 'English', 'Tamil', 'Bengali'].map(lang => (
                           <button key={lang} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:border-blue-900/20 hover:text-blue-900 transition-all">
                              {lang}
                           </button>
                        ))}
                     </div>

                     <div className="grid gap-4">
                        {nextLessons.map((lesson, i) => (
                           <div key={i} className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col md:flex-row items-center gap-10">
                              <div className="w-20 h-20 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center shrink-0 shadow-inner">
                                 {lesson.type === 'Video' ? <Play size={32} /> : <BookOpen size={32} />}
                              </div>

                              <div className="flex-1 text-center md:text-left">
                                 <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lesson.subject}</span>
                                    <span className="text-[8px] font-black text-blue-900 uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded-full">{lesson.type}</span>
                                 </div>
                                 <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-900 transition-colors">{lesson.title}</h4>
                                 <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                                    <div className="w-32 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                       <div className="h-full bg-blue-400 group-hover:bg-blue-900 transition-all duration-1000" style={{ width: `${lesson.progress}%` }} />
                                    </div>
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{lesson.progress}% Done</span>
                                 </div>
                              </div>

                              <button className="px-10 py-5 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm group-hover:shadow-xl active:scale-95 whitespace-nowrap">
                                 Start Lesson <ArrowRight size={14} className="inline ml-1" />
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Multilingual Learning Hub Quick Access */}
                  <div className="p-10 rounded-[32px] bg-slate-900 text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-125 transition-transform duration-1000" />
                     <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">New Feature</div>
                              <h3 className="text-2xl font-black">Multilingual Learning Hub</h3>
                           </div>
                           <Globe size={40} className="text-blue-900" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">
                           Master 22 Indian languages with 484 pair combinations. Experience AI-powered speaking, listening, and writing labs.
                        </p>
                        <div className="flex flex-wrap gap-4">
                           <Link href="/student/course-setup" className="px-8 py-4 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center gap-2">
                              Launch Setup <ChevronRight size={16} />
                           </Link>
                           <Link href="/student/learn-language" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                              Enter Language Lab <Zap size={16} />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Schedule & Deadlines */}
               <div className="space-y-8">
                  <div className="flex items-center justify-between px-4">
                     <h3 className="text-2xl font-black text-slate-900 uppercase tracking-[0.05em]">Deadline Queue</h3>
                  </div>

                  <div className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-8">
                     {[
                        { title: 'Quantum Quiz', date: 'Tomorrow', time: '10:00 AM', status: 'Urgent', color: 'text-blue-500 bg-blue-50' },
                        { title: 'History TMA', date: '15 Apr 2026', time: '11:59 PM', status: 'Due Soon', color: 'text-blue-500 bg-blue-50' },
                        { title: 'Science Lab', date: '18 Apr 2026', time: '02:00 PM', status: 'Upcoming', color: 'text-blue-500 bg-blue-50' },
                     ].map((item, i) => (
                        <div key={i} className="flex gap-6 group cursor-pointer">
                           <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border border-transparent group-hover:border-slate-100 transition-all ${item.color}`}>
                              <Calendar size={18} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                 <h4 className="text-sm font-black text-slate-900 truncate tracking-tight">{item.title}</h4>
                                 <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
                              </div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date} · {item.time}</p>
                           </div>
                        </div>
                     ))}

                     <div className="pt-6 border-t border-slate-50">
                        <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/30 hover:bg-blue-900 transition-all active:scale-95">
                           Sync with Google Calendar
                        </button>
                     </div>
                  </div>
               </div>
            </div>


         </div>

         {/* Trust & Compliance Section */}
         <div className="p-12 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="flex flex-wrap justify-center gap-12 opacity-50 mb-10">
               {['DIKSHA', 'SWAYAM', 'UDISE+', 'Govt of India', 'UNESCO Aligned'].map((t) => (
                  <span key={t} className="text-xs font-black text-slate-400 uppercase tracking-widest">{t}</span>
               ))}
            </div>
            <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
               <ShieldCheck size={14} /> Official National Open Schooling Registry · Encrypted Node Access
            </div>
         </div>
      </DashboardLayout>
   );
}
