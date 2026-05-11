'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Database, HardDrive, ShieldCheck, History, Megaphone, BellRing, KeyRound, GlobeLock } from 'lucide-react';
import { useState } from 'react';

const recentBackups = [
   { id: 'BK-20260405-A', size: '42.8 GB', trigger: 'Scheduled', status: 'Success', time: '05 Apr 2026, 02:00 AM' },
   { id: 'BK-20260404-A', size: '42.1 GB', trigger: 'Scheduled', status: 'Success', time: '04 Apr 2026, 02:00 AM' },
   { id: 'BK-20260403-M', size: '41.9 GB', trigger: 'Manual (Admin)', status: 'Success', time: '03 Apr 2026, 14:30 PM' },
];

export default function SystemAdminPage() {
   const { user } = useAuth();
   const [announcement, setAnnouncement] = useState('');

   if (!user || user.role !== 'admin') return null;

   return (
      <DashboardLayout
         title="System Operations & Security"
         subtitle="Backups, Access Controls & Global Announcements"
      >
         <div className="grid lg:grid-cols-2 gap-8 mb-8">

            {/* Backups & Version Control */}
            <div className="space-y-6">
               <h3 className="flex items-center gap-2 text-xl font-black text-slate-900 uppercase tracking-tight">
                  <Database className="text-blue-900" size={20} /> Database & Backups
               </h3>
               {/* <div className="p-8 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group"> */}
               <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900  text-white relative overflow-hidden shadow-lg border border-slate-700">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mt-10 -mr-10" />
                  <div className="flex justify-between items-end mb-6 relative z-10">
                     <div>
                        <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Storage Cluster</div>
                        <div className="text-3xl font-black">1.4 TB <span className="text-sm text-slate-400 font-medium">/ 5.0 TB</span></div>
                     </div>
                     <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 t  ext-white text-xs font-black uppercase rounded-xl transition-all shadow-lg flex items-center gap-2">
                        <HardDrive size={14} /> Trigger Backup
                     </button>
                  </div>

                  <div className="space-y-2 relative z-10">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Recent Snapshots</div>
                     {recentBackups.map(bk => (
                        <div key={bk.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                           <div className="flex items-center gap-3">
                              <History size={16} className="text-slate-400" />
                              <div>
                                 <div className="text-xs font-bold text-slate-200">{bk.id}</div>
                                 <div className="text-[9px] text-slate-500 uppercase tracking-widest">{bk.time} · {bk.trigger}</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-xs font-black text-slate-200">{bk.size}</div>
                              <div className="text-[9px] text-emerald-400 uppercase tracking-widest font-black">{bk.status}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Access Control & RBAC */}
               <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                     <KeyRound size={24} />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-black text-slate-900 uppercase tracking-tight">Role-Based Access Control</h4>
                     <p className="text-xs text-slate-500 leading-relaxed mb-4 mt-1">Full visibility enabled. 4 active roles configured. Policy last updated 12 days ago.</p>
                     <button className="text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">Manage Roles</button>
                  </div>
               </div>
            </div>

            {/* Announcements & Notifications */}
            <div className="space-y-6">
               <h3 className="flex items-center gap-2 text-xl font-black text-slate-900 uppercase tracking-tight">
                  <Megaphone className="text-indigo-500" size={20} /> Global Communications
               </h3>

               <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4">Broadcast New Announcement</h4>
                  <textarea
                     className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none mb-4"
                     placeholder="Draft system-wide policy updates or global reminders..."
                     value={announcement}
                     onChange={(e) => setAnnouncement(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                        <GlobeLock size={16} className="text-slate-400" /> Public to all users
                     </div>
                     <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase rounded-lg transition-all flex items-center gap-2">
                        <BellRing size={14} /> Send Broadcast
                     </button>
                  </div>
               </div>

               <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className="font-black text-slate-900 uppercase tracking-tight">Notification Queue</h4>
                     <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-md">Healthy</span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 font-bold">Scheduled Class Reminders</span>
                        <span className="font-black text-slate-900">14,203 <span className="text-slate-400 text-[10px] uppercase ml-1">in queue</span></span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 font-bold">Pending Approvals (Teachers)</span>
                        <span className="font-black text-slate-900">42 <span className="text-slate-400 text-[10px] uppercase ml-1">in queue</span></span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 font-bold">Deadline Alerts</span>
                        <span className="font-black text-slate-900">8,912 <span className="text-slate-400 text-[10px] uppercase ml-1">in queue</span></span>
                     </div>
                     <div className="pt-4 border-t border-slate-50 mt-4 flex justify-end">
                        <button className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">View Logs</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
}
