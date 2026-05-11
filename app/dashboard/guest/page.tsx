'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
   Sparkles,
   BookOpen,
   Zap,
   Play,
   Users,
   ArrowRight,
   Globe,
   Award,
   ShieldCheck,
   Search,
   CheckCircle2,
   ChevronRight,
   TrendingUp,
   Cpu
} from 'lucide-react';
import Link from 'next/link';

const featuredCourses = [
   { id: 1, title: 'Secondary Schooling: Unified Science', level: 'Class 10', learners: '124k', rating: 4.8 },
   { id: 2, title: 'Advanced Mathematics & Algebra', level: 'Class 12', learners: '85k', rating: 4.9 },
   { id: 3, title: 'Digital Literacy & Modern Life', level: 'Skill Base', learners: '42k', rating: 4.7 },
];

export default function GuestDashboard() {
   return (
      <DashboardLayout
         title="Global Learning Portal"
         subtitle="Experience India's most advanced AI-driven educational ecosystem"
      >
         <div className="space-y-12 animate-fade-in pb-20">

            {/* Welcome Hero - Guest Version */}
            <div className="p-12 rounded-xl bg-gradient-to-r from-blue-500 to-red-600 border border-slate-800 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />


               <div className="relative space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="px-4 py-2 bg-blue-900/10 border border-slate-50 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 shadow-inner">
                        <Sparkles size={14} className="animate-pulse text-taupe-50" />
                        Guest Access Node
                     </div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Public Catalog Awareness</div>
                  </div>

                  <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter max-w-3xl leading-none">
                     Democratizing Quality Education via <span className="text-slate-800 underline underline-offset-8 decoration-4">AI Intelligence</span>.
                  </h2>

                  <p className="text-lg font-medium text-slate-100 leading-relaxed max-w-2xl">
                     Join over 2.4 million learners across India. Access world-class secondary and vocational education normalized by the National Institute of Open Schooling.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                     <Link href="/login" className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-3">
                        Enroll for Free <ArrowRight size={18} />
                     </Link>
                     <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all border border-white/10">
                        Watch Platform Tour
                     </button>
                  </div>
               </div>
               <div className="absolute -bottom-20 right-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe size={320} className="text-white" />
               </div>
            </div>

            {/* Why NIOS Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  { label: 'Active Learners', value: '2.4M+', icon: Users, color: 'text-blue-500 bg-blue-50' },
                  { label: 'Courses Offeblue', value: '850+', icon: BookOpen, color: 'text-emerald-500 bg-emerald-50' },
                  { label: 'States Covered', value: '36', icon: Globe, color: 'text-blue-900 bg-blue-50' },
                  { label: 'Avg. Rating', value: '4.8/5', icon: Award, color: 'text-purple-500 bg-purple-50' },
               ].map((s, i) => (
                  <div key={i} className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm transition-all hover:translate-y-1">
                     <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mb-6 shadow-sm`}>
                        <s.icon size={20} />
                     </div>
                     <div className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                  </div>
               ))}
            </div>

            {/* Featured Courses Selection */}
            <div className="space-y-8">
               <div className="flex items-center justify-between border-b border-slate-50 pb-6 mx-4">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Pathways</h3>
                  <Link href="/courses" className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Browse Catalog</Link>
               </div>

               <div className="grid md:grid-cols-3 gap-6">
                  {featuredCourses.map((c) => (
                     <div key={c.id} className="group p-10 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50 group-hover:bg-blue-900 transition-colors" />
                        <div className="w-16 h-16 mx-auto mb-8 rounded-[2rem] bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center shadow-sm">
                           <BookOpen size={24} />
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{c.level}</div>
                        <h4 className="text-lg font-black text-slate-900 leading-tight mb-6 h-12 flex items-center justify-center">{c.title}</h4>
                        <div className="flex items-center justify-center gap-6 pt-8 border-t border-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                           <span>{c.learners} Scholars</span>
                           <span className="text-blue-900">★ {c.rating}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* AI Tutor Feature Discovery */}
            <div className="p-12 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
               <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/20">
                     <Cpu size={32} className="animate-float" />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                     <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Pblueictive AI Tutoring</h3>
                     <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
                        Experience our next-gen AI tutor that adapts to your unique learning style. Get 24/7 support, instant concepts clarification, and multi-lingual bridging. Register for a partial-access trial.
                     </p>
                  </div>
                  <button className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-slate-200">
                     Trial Learning Hub
                  </button>
               </div>
            </div>

            {/* Trust & Compliance Section */}
            <div className="p-12 rounded-[4rem] bg-slate-50 border border-slate-100 text-center">
               <div className="flex flex-wrap justify-center gap-12 opacity-50 mb-10">
                  {['DIKSHA', 'SWAYAM', 'UDISE+', 'Govt of India', 'UNESCO Aligned'].map((t) => (
                     <span key={t} className="text-xs font-black text-slate-400 uppercase tracking-widest">{t}</span>
                  ))}
               </div>
               <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  <ShieldCheck size={14} /> Official National Open Schooling Registry · Encrypted Node Access
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
}
