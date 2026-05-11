'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { BookCheck, UserMinus, ShieldQuestion, CheckCircle2, XCircle, Search, Video, Eye, Library } from 'lucide-react';
import { useState } from 'react';

const mockTeachers = [
   { id: 'TCH-102', name: 'Dr. Srinivasan', subject: 'Mathematics', status: 'pending_approval', joined: 'Yesterday' },
   { id: 'TCH-103', name: 'Anita Desai', subject: 'Physics', status: 'active', joined: 'Oct 2025' },
   { id: 'TCH-104', name: 'Vishal Bhardwaj', subject: 'History', status: 'suspended', joined: 'Jan 2026' },
];

const mockCourses = [
   { id: 'CRS-881', title: 'Advanced Trigonometry', teacher: 'Dr. Srinivasan', status: 'pending_review', uploads: 12 },
   { id: 'CRS-882', title: 'Modern Indian History', teacher: 'Vishal Bhardwaj', status: 'archived', uploads: 8 },
   { id: 'CRS-883', title: 'English Literature P1', teacher: 'Kavita Iyer', status: 'published', uploads: 24 },
];

export default function AcademicAdminPage() {
   const { user } = useAuth();
   const [activeTab, setActiveTab] = useState<'teachers' | 'content'>('teachers');
   const [searchTerm, setSearchTerm] = useState('');

   if (!user || user.role !== 'admin') return null;

   return (
      <DashboardLayout
         title="Academic & Content Oversight"
         subtitle="Teacher Onboarding, Moderation & Course Approvals"
      >
         {/* Header & Tabs */}
         <div className="flex items-center justify-between mb-8">
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setActiveTab('teachers')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'teachers' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                  <div className="flex items-center gap-2"><UserMinus size={14} /> Teacher Roles</div>
               </button>
               <button onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'content' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                  <div className="flex items-center gap-2"><BookCheck size={14} /> Content QC</div>
               </button>
            </div>

            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input
                  type="text"
                  placeholder="Search by ID or Name..."
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-900 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            {activeTab === 'teachers' && (
               <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                     <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Faculty Member</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Domain</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {mockTeachers.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map(teacher => (
                        <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">{teacher.name}</div>
                              <div className="text-[10px] text-slate-500 uppercase tracking-widest">{teacher.id} · Joined {teacher.joined}</div>
                           </td>
                           <td className="px-6 py-4 text-xs font-bold text-slate-600">
                              {teacher.subject}
                           </td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${teacher.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                                 teacher.status === 'suspended' ? 'bg-blue-50 text-blue-600' : 'bg-blue-50 text-blue-600'
                                 }`}>
                                 {teacher.status.replace('_', ' ')}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right space-x-2">
                              {teacher.status === 'pending_approval' && (
                                 <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Approve</button>
                              )}
                              {teacher.status === 'active' && (
                                 <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Suspend</button>
                              )}
                              <button className="px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">View Audit Log</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )}

            {activeTab === 'content' && (
               <div className="p-2">
                  <table className="w-full text-left">
                     <thead className="bg-white border-b border-slate-100">
                        <tr>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Module</th>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Author / Faculty</th>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">QC Status</th>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Moderator Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {mockCourses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map(course => (
                           <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900">
                                       <Video size={18} />
                                    </div>
                                    <div className="flex-1">
                                       <div className="font-bold text-slate-900 line-clamp-1">{course.title}</div>
                                       <div className="text-[10px] text-slate-500 uppercase tracking-widest">{course.id} · {course.uploads} Media Assets</div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-xs font-bold text-slate-600">
                                 {course.teacher}
                              </td>
                              <td className="px-6 py-4">
                                 <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${course.status === 'published' ? 'bg-emerald-50 text-emerald-600' :
                                    course.status === 'archived' ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600 animate-pulse'
                                    }`}>
                                    {course.status.replace('_', ' ')}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right space-x-2">
                                 {course.status === 'pending_review' && (
                                    <>
                                       <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"><CheckCircle2 size={12} className="inline mr-1" /> Approve</button>
                                       <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"><XCircle size={12} className="inline mr-1" /> Reject</button>
                                    </>
                                 )}
                                 <button className="px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all" title="View as Learner (Read-Only)">
                                    <Eye size={12} className="inline" />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </DashboardLayout>
   );
}
