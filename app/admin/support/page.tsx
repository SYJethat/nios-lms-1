'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Headphones, AlertTriangle, ShieldAlert, Clock, CheckCircle2, AlertOctagon, MessageSquare, Terminal } from 'lucide-react';
import { useState } from 'react';

const mockTickets = [
   { id: 'TKT-9921', user: 'Amit Verma', role: 'Learner', issue: 'Cannot access Live Class', priority: 'High', sla: '14m left', status: 'escalated' },
   { id: 'TKT-9922', user: 'Priya S.', role: 'Teacher', issue: 'Assignment upload failing', priority: 'Medium', sla: '3h 10m left', status: 'open' },
   { id: 'TKT-9923', user: 'Rohan G.', role: 'Parent', issue: 'Fee receipt not generated', priority: 'Low', sla: '12h left', status: 'open' },
   { id: 'TKT-9924', user: 'Deepa M.', role: 'Learner', issue: 'Profile spelling error', priority: 'Low', sla: '21h left', status: 'resolved' },
];

const mockCyberAlerts = [
   { id: 'CYB-001', context: 'Discussion Forum: Class 10 Physics', flags: ['Harassment', 'Profanity'], severity: 'Critical', time: '10 mins ago', status: 'investigating' },
   { id: 'CYB-002', context: 'Direct Message: User A to User B', flags: ['Bullying'], severity: 'High', time: '1 hour ago', status: 'resolved (warning issued)' },
];

export default function SupportPage() {
   const { user } = useAuth();
   const [activeTab, setActiveTab] = useState<'tickets' | 'cyber'>('tickets');

   if (!user || user.role !== 'admin') return null;

   return (
      <DashboardLayout
         title="Support & Trust"
         subtitle="SLA Ticketing, Escalation & Cyberbullying Monitoring"
      >
         <div className="grid lg:grid-cols-4 gap-8 mb-8">
            {[
               { label: 'SLA Breaches', value: '0', icon: AlertOctagon, color: 'text-emerald-500', alert: false },
               { label: 'Avg Resolution', value: '42m', icon: Clock, color: 'text-blue-500', alert: false },
               { label: 'Open Tickets', value: '142', icon: Headphones, color: 'text-blue-900', alert: true },
               { label: 'Cyber Alerts', value: '12', icon: ShieldAlert, color: 'text-blue-500', alert: true },
            ].map((stat, i) => (
               <div key={i} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden flex items-center justify-between">
                  <div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                     <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                  </div>
                  <div className={`p-4 rounded-xl ${stat.alert ? 'bg-blue-50 animate-pulse' : 'bg-slate-50'}`}>
                     <stat.icon size={24} className={stat.color} />
                  </div>
               </div>
            ))}
         </div>

         <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
            {/* Header & Tabs */}
            <div className="border-b border-slate-100 p-6 flex items-center justify-between">
               <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setActiveTab('tickets')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'tickets' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                     Ticketing SLA
                  </button>
                  <button onClick={() => setActiveTab('cyber')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'cyber' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                     Cyberbullying AI
                  </button>
               </div>
               {activeTab === 'tickets' && (
                  <div className="uppercase text-[10px] font-black tracking-widest text-slate-400">
                     SLA Matrix: <span className="text-blue-500">High (&lt;1h)</span> · <span className="text-blue-500">Medium (&lt;4h)</span> · <span className="text-blue-500">Low (&lt;24h)</span>
                  </div>
               )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto">
               {activeTab === 'tickets' && (
                  <table className="w-full text-left">
                     <thead className="sticky top-0 bg-white shadow-sm z-10">
                        <tr>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket / Issue</th>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reporter</th>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority SLA</th>
                           <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {mockTickets.map(tkt => (
                           <tr key={tkt.id} className="hover:bg-slate-50/50 cursor-pointer">
                              <td className="px-6 py-4">
                                 <div className="font-bold text-slate-900 text-sm tracking-tight">{tkt.issue}</div>
                                 <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{tkt.id}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="text-sm font-bold">{tkt.user}</div>
                                 <div className="text-[10px] text-slate-400 uppercase tracking-widest">{tkt.role}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${tkt.priority === 'High' ? 'bg-blue-500 animate-pulse' : tkt.priority === 'Medium' ? 'bg-blue-500' : 'bg-blue-500'}`} />
                                    <div className="text-xs font-bold text-slate-700">{tkt.priority}</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 rounded-md py-0.5 ml-2">{tkt.sla}</div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${tkt.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' :
                                    tkt.status === 'escalated' ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {tkt.status}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}

               {activeTab === 'cyber' && (
                  <div className="p-6 space-y-6">
                     <div className="flex p-4 rounded-xl bg-indigo-50 border border-indigo-100 items-start gap-4">
                        <Terminal size={24} className="text-indigo-600 mt-1" />
                        <div>
                           <h4 className="font-black text-indigo-900 uppercase tracking-tight">AI Moderation Engine Active</h4>
                           <p className="text-xs font-bold text-indigo-500 leading-relaxed mt-1">Scanning all live chats, forum threads, and DMs. Auto-quarantine enabled for high-confidence toxicity matches. Human review required for flagged items.</p>
                        </div>
                     </div>

                     <div className="grid gap-4">
                        {mockCyberAlerts.map(alert => (
                           <div key={alert.id} className="p-5 rounded-xl border border-blue-100 bg-white hover:border-blue-300 transition-all shadow-sm">
                              <div className="flex items-start justify-between mb-4">
                                 <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-blue-50 text-blue-500">
                                       <AlertTriangle size={20} />
                                    </div>
                                    <div>
                                       <div className="font-bold text-slate-900">{alert.context}</div>
                                       <div className="text-[10px] text-slate-500 uppercase tracking-widest">{alert.id} · {alert.time}</div>
                                    </div>
                                 </div>
                                 <span className="px-3 py-1 rounded bg-blue-100 border border-blue-200 text-blue-600 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                    {alert.severity}
                                 </span>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                 {alert.flags.map(flag => (
                                    <span key={flag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">{flag}</span>
                                 ))}
                              </div>

                              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                                 <button className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase rounded-lg transition-all">Review Log</button>
                                 <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-black uppercase rounded-lg transition-all">Suspend User</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </DashboardLayout>
   );
}
