'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
   GraduationCap,
   Flame,
   BookOpen,
   CheckCircle,
   Medal,
   Scroll,
   Palette,
   Flag,
   Verified,
   MapPin,
   Calendar,
   Mail,
   Phone,
   ShieldCheck,
   Globe,
   Award,
   User,
   Hexagon,
   Sparkles,
   ChevronRight,
   Edit3,
   ArrowUpRight,
   Accessibility,
   Languages
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';

const achievements = [
   { icon: GraduationCap, title: 'Top Performer', date: 'Mar 2026', subject: 'Science' },
   { icon: Flame, title: '12-Day Streak', date: 'Apr 2026', subject: 'Platform' },
   { icon: BookOpen, title: 'Reading Rocket', date: 'Feb 2026', subject: 'English' },
   { icon: CheckCircle, title: 'Quiz Whiz', date: 'Mar 2026', subject: 'Maths' },
];

const certificates = [
   { title: 'Mathematics: Algebra Mastery', status: 'Issued', date: 'Mar 15, 2026', id: 'NIOS-MAT-23948' },
   { title: 'Digital Literacy Workshop', status: 'Issued', date: 'Feb 2, 2026', id: 'NIOS-DIG-10294' },
];

const projects = [
   { title: 'Friction in Daily Life', type: 'Subject Project', grade: 'A+' },
   { title: 'Modern India Timeline', type: 'Exhibition', grade: 'A' },
   { title: 'Ecosystem Sustainability', type: 'Creative Lab', grade: 'A+' },
];

export default function ProfilePage() {
   const { user, updateLinguisticProfile } = useAuth();
   const activeUser = user || MOCK_USERS[0];

   return (
      <DashboardLayout
         title="Holistic Digital Portfolio"
         subtitle="A comprehensive record of your academic journey, creative projects, and national achievements"
      >
         <div className="grid lg:grid-cols-[380px_1fr] gap-10 items-start animate-fade-in pb-20">

            {/* Left Column - Identity & Verification */}
            <div className="space-y-8">

               {/* Profile Identity Card */}
               <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs text-center relative overflow-hidden group">
                  <div className="relative mb-6">
                     <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-blue-900 to-indigo-600 p-1 shadow-xl relative">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-black text-slate-900 overflow-hidden">
                           {activeUser.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-md">
                           <Verified size={15} />
                        </div>
                     </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1 uppercase">{activeUser.name}</h3>
                  <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-6">
                     Enrollment: {activeUser.id} · {activeUser.role}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                     <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-lg font-black text-slate-900">72%</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase">Avg. Score</div>
                     </div>
                     <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-lg font-black text-emerald-600">92%</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase">Attendance</div>
                     </div>
                  </div>

                  <button className="w-full py-3.5 bg-blue-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2">
                     <Edit3 size={15} /> Update Portfolio
                  </button>
               </div>

               {/* Aadhaar & Regional Identity (Light Theme) */}
               <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-200 text-slate-900 relative overflow-hidden shadow-xs">
                  <div className="flex items-center gap-2.5 mb-6">
                     <ShieldCheck className="text-blue-900" size={20} />
                     <h4 className="text-xs font-black uppercase tracking-wider text-blue-950">National Identity · DigiLocker Verified</h4>
                  </div>

                  <div className="space-y-3 relative z-10">
                     {[
                        { label: 'Aadhaar Link', value: 'XXXX-XXXX-2394', icon: <CheckCircle size={12} className="text-emerald-600" /> },
                        { label: 'State Region', value: 'Delhi NCR', icon: <MapPin size={12} /> },
                        { label: 'Academic Center', value: 'NIOS-10294', icon: <Globe size={12} /> },
                        { label: 'Registry', value: 'DigiLocker Synced', icon: <CheckCircle size={12} className="text-emerald-600" /> },
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-blue-100/60 pb-2.5 last:border-0 last:pb-0">
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                           <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                              {item.icon}
                              {item.value}
                           </div>
                        </div>
                     ))}
                  </div>

                  <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300 transition-all border border-white/10">
                     View Verification Logs
                  </button>
               </div>

               {/* Institutional Links */}
               <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Ecosystem Connections</h4>
                  <div className="space-y-4">
                     {[
                        { name: 'DigiLocker', status: 'Healthy', color: 'blue' },
                        { name: 'ABC Bank', status: 'Linked', color: 'emerald' },
                        { name: 'SWAYAM Nodes', status: 'Sync', color: 'blue' },
                     ].map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 group cursor-default">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{p.name}</span>
                           </div>
                           <span className="text-[8px] font-black text-blue-700 uppercase">{p.status}</span>
                        </div>
                     ))}
                  </div>
               </div>

            </div>

            {/* Right Column - Results & Portfolio */}
            <div className="space-y-12">


               {/* Linguistic Identity Section */}
               <div className="p-12 rounded-[32px] bg-white border border-slate-100 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                     <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-xl shadow-blue-900/20 rotate-3">
                        <Languages size={28} />
                     </div>
                     <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Linguistic Identity</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed mb-6">
                           Your preferred primary language and desired target for multi-lingual learning pathways.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Primary Language</label>
                              <select 
                                 value={activeUser.motherLang || ''}
                                 onChange={(e) => updateLinguisticProfile(e.target.value)}
                                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all"
                              >
                                 <option value="">Select Language</option>
                                 {['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Sanskrit', 'Kashmiri', 'Konkani', 'Maithili', 'Manipuri', 'Nepali', 'Bodo', 'Santali', 'Dogri'].map(l => (
                                    <option key={l} value={l}>{l}</option>
                                 ))}
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Target Language</label>
                              <select 
                                 value={activeUser.targetLang || ''}
                                 onChange={(e) => updateLinguisticProfile(activeUser.motherLang || null, e.target.value)}
                                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all"
                              >
                                 <option value="">Select Language</option>
                                 {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Sanskrit', 'Kashmiri', 'Konkani', 'Maithili', 'Manipuri', 'Nepali', 'Bodo', 'Santali', 'Dogri'].map(l => (
                                    <option key={l} value={l}>{l}</option>
                                 ))}
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Achievements Section */}
               <div className="space-y-8">
                  <div className="flex items-center justify-between px-4">
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Merit Board</h3>
                     <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline underline-offset-4 decoration-2">View Full Board</button>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                     {achievements.map((a, i) => (
                        <div key={i} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/5 transition-all text-center relative overflow-hidden">
                           <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xl group-hover:bg-blue-900 group-hover:scale-110 transition-all duration-500">
                              <a.icon size={24} />
                           </div>
                           <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{a.title}</h4>
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{a.subject} · {a.date}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Creative Portfolio Section */}
               <div className="space-y-8">
                  <div className="flex items-center justify-between px-4">
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Holistic Projects</h3>
                     <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl">
                        Add Submission
                     </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                     {projects.map((p, i) => (
                        <div key={i} className="group p-8 rounded-xl bg-white border border-slate-100 hover:shadow-xl transition-all text-center">
                           <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shadow-sm">
                              <Palette size={24} />
                           </div>
                           <h4 className="text-sm font-black text-slate-900 mb-2 leading-tight h-10 flex items-center justify-center">{p.title}</h4>
                           <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-4">
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.type}</span>
                              <span className="text-[10px] font-black text-emerald-500 uppercase">{p.grade} Grade</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Certificates Section */}
               <div className="space-y-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight px-4">Official Transcripts</h3>
                  <div className="grid gap-4">
                     {certificates.map((c, i) => (
                        <div key={i} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 transition-all flex items-center gap-10">
                           <div className="w-16 h-16 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                              <Scroll size={24} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors truncate">{c.title}</h4>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{c.date} · Registry: {c.id}</div>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="px-4 py-2 bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-100">{c.status}</span>
                              <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                                 <ArrowUpRight size={18} />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>


               {/* Accessibility & Governance Section */}
               <div className="p-12 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                     <div className="w-16 h-16 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/20">
                        <Accessibility size={28} />
                     </div>
                     <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Accessibility Preferences</h3>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
                           Language: {activeUser.motherLang || 'Unset'} · Font: Standard · Contrast: Standard · ISL Aids: Off
                        </p>
                     </div>
                     <button className="px-10 py-5 bg-white border border-blue-100 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-500/10">
                        Modify Settings
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
}
