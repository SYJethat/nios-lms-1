'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
   Settings,
   Shield,
   Smartphone,
   Globe,
   Bell,
   Lock,
   Database,
   Cpu,
   Cloud,
   RefreshCw,
   Trash2,
   Upload,
   MoreVertical,
   ChevronRight,
   Monitor,
   Zap,
   CheckCircle2,
   AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const settings = [
   {
      id: 'S1',
      title: 'Platform blueing',
      desc: 'Modify logos, color schemes, and system-wide appearance assets.',
      icon: Globe,
      status: 'Default NIOS'
   },
   {
      id: 'S2',
      title: 'Authentication & Security',
      desc: 'Configure 2FA, session timeouts, and password complexity rules.',
      icon: Shield,
      status: 'High Enforcement'
   },
   {
      id: 'S3',
      title: 'Storage & Backup',
      desc: 'Database snapshots, media asset storage, and backup frequency.',
      icon: Database,
      status: 'AWS S3 Synced'
   },
   {
      id: 'S4',
      title: 'AI Model Configuration',
      desc: 'Configure tutor response parameters and learning path algorithms.',
      icon: Cpu,
      status: 'v2.4 Engine'
   }
];

export default function AdminSettingsPage() {
   const { user } = useAuth();

   if (!user) return null;

   return (
      <DashboardLayout
         title="Global Configuration"
         subtitle="Full control over platform-wide behavior, security, and asset management"
      >
         <div className="max-w-8xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* System Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 p-10 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex flex-col md:flex-row items-center gap-10">
                     <div className="w-16 h-16 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={28} />
                     </div>
                     <div className="text-center md:text-left">
                        <h3 className="text-xl font-black text-slate-900 mb-2">Systems Operational</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                           All core services, including AI nodes and database clusters, are performing within target latency.
                        </p>
                     </div>
                     <div className="flex-1" />
                     <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">
                        Health Check
                     </button>
                  </div>
               </div>

               <div className="p-10 rounded-xl bg-slate-900 text-white flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-900">
                        <Cloud size={20} />
                     </div>
                     <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest underline underline-offset-4 decoration-2">Maintenance Mode</div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Status</span>
                        <div className="w-10 h-5 bg-white/10 rounded-full flex items-center p-1 cursor-pointer">
                           <div className="w-3 h-3 bg-slate-400 rounded-full" />
                        </div>
                     </div>
                     <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">Toggle restricted accessibility for feature deployment.</p>
                  </div>
               </div>
            </div>

            {/* Settings Grid */}
            <div className="grid gap-6">
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight ml-4">Core Management</h3>
               <div className="grid gap-4">
                  {settings.map((s) => (
                     <div key={s.id} className="group p-10 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col lg:flex-row items-center gap-10">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                           <s.icon size={26} />
                        </div>

                        <div className="flex-1 text-center lg:text-left">
                           <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                              <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors">{s.title}</h4>
                              <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase rounded-lg border border-slate-100">{s.status}</span>
                           </div>
                           <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xl">{s.desc}</p>
                        </div>

                        <button className="px-10 py-5 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm flex items-center gap-3">
                           Configure <ChevronRight size={16} />
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            {/* Danger Zone */}
            <div className="p-12 rounded-xl bg-blue-50/50 border-2 border-dashed border-blue-200/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
               <div className="flex flex-col lg:flex-row items-center gap-10">
                  <div className="w-16 h-16 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/20">
                     <AlertCircle size={24} />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                     <h3 className="text-2xl font-black text-blue-600 mb-2 uppercase tracking-tight">Danger Zone</h3>
                     <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
                        High-impact destructive actions. Including database wipes, migration resets, and account purges. Ensure you have a recent off-site backup before proceeding.
                     </p>
                  </div>
                  <button className="px-12 py-5 bg-white border border-blue-100 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-200/50 flex items-center gap-3">
                     <Trash2 size={16} /> Purge Inactive Data
                  </button>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
}
