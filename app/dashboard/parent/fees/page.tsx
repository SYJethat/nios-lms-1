'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
   CreditCard,
   Download,
   Search,
   Filter,
   Calendar,
   FileText,
   CheckCircle2,
   AlertCircle,
   Clock,
   ArrowUpRight,
   ArrowRight,
   ShieldCheck,
   Zap,
   MoreVertical,
   ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const fees = [
   { id: 'F001', title: 'Secondary Examination Fee - April 2026', child: 'Arjun Sharma', amount: '₹1,500', status: 'Paid', date: '2026-03-15' },
   { id: 'F002', title: 'Practical Exam Fee - Science', child: 'Arjun Sharma', amount: '₹200', status: 'Paid', date: '2026-03-20' },
   { id: 'F003', title: 'TMA Submission Processing', child: 'Arjun Sharma', amount: '₹100', status: 'Due Soon', date: '2026-04-10' },
   { id: 'F004', title: 'Late Registry Surcharge', child: 'Arjun Sharma', amount: '₹500', status: 'Pending', date: '2026-04-15' },
];

export default function ParentFeesPage() {
   const { user } = useAuth();

   if (!user) return null;

   return (
      <DashboardLayout
         title="Fee Management & Payments"
         subtitle="Secure platform for academic fees, examination registries, and payment history"
      >
         <div className="space-y-12 animate-fade-in pb-20">

            {/* Payment Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 p-12 rounded-xl] bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex flex-col md:flex-row items-center gap-10">
                     <div className="w-20 h-20 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 shadow-sm">
                        <CreditCard size={32} />
                     </div>
                     <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Financial Health</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                           All main examination fees for the 2026 academic cycle are up to date. <span className="text-blue-900 font-bold">1 pending submission fee</span> requires attention.
                        </p>
                     </div>
                     <div className="flex-1" />
                     <button className="px-10 py-5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200">
                        Pay All Dues
                     </button>
                  </div>
               </div>

               <div className="p-10 rounded-xl] bg-slate-900 text-white flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-900">
                        <ShieldCheck size={20} />
                     </div>
                     <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest bg-blue-900/10 px-3 py-1 rounded-full border border-blue-900/20">PCI-DSS Compliant</div>
                  </div>
                  <div className="space-y-4">
                     <div className="text-sm font-black text-white uppercase tracking-widest">Gateway Status</div>
                     <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">Secure multi-channel payment gateway active. Verified via BHIM/UPI, NetBanking & Cards.</p>
                  </div>
               </div>
            </div>

            {/* Transaction/Fee List */}
            <div className="space-y-8">
               <div className="flex flex-col md:flex-row gap-6 items-center justify-between px-4">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Invoices</h3>
                  <div className="flex gap-3">
                     <button className="px-6 py-4 bg-white border border-slate-100 rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-3">
                        <Download size={16} /> History
                     </button>
                     <button className="px-6 py-4 bg-white border border-slate-100 rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-3">
                        <Filter size={16} /> Filtering
                     </button>
                  </div>
               </div>

               <div className="grid gap-4">
                  {fees.map((f) => (
                     <div key={f.id} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col lg:flex-row items-center gap-10">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                           <FileText size={24} />
                        </div>

                        <div className="flex-1 text-center lg:text-left min-w-0">
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{f.child} · ID: {f.id}</div>
                           <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors truncate">{f.title}</h4>
                           <div className="flex items-center justify-center lg:justify-start gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                              <Calendar size={12} /> {f.date} · <Zap size={12} className="text-blue-900" /> ONLINE REGISTRY
                           </div>
                        </div>

                        <div className="flex items-center gap-12 px-12 border-x border-slate-50 hidden lg:flex">
                           <div className="text-center min-w-[100px]">
                              <div className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest text-center">Amount</div>
                              <div className="text-xl font-black text-slate-900 tracking-tighter">{f.amount}</div>
                           </div>
                        </div>

                        <div className="flex items-center gap-6">
                           <div className="text-center min-w-[100px] hidden lg:block">
                              <div className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Status</div>
                              <div className={`text-[10px] font-black uppercase tracking-widest ${f.status === 'Paid' ? 'text-emerald-500' : 'text-blue-900 underline underline-offset-4 decoration-2'
                                 }`}>{f.status}</div>
                           </div>
                           <button className={`px-10 py-5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-3 ${f.status === 'Paid' ? 'bg-slate-50 text-slate-400' : 'bg-slate-900 text-white hover:bg-blue-900'
                              }`}>
                              {f.status === 'Paid' ? 'View Receipt' : 'Pay Now'} <ChevronRight size={14} />
                           </button>
                           <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                              <MoreVertical size={16} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Digital Wallet Preview Section */}
            <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
               <div className="flex flex-col lg:flex-row items-center gap-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/20">
                     <CreditCard size={24} className="text-white" />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                     <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Linked Digital Wallet</h3>
                     <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
                        Seamlessly connect your NIOS Digital Wallet for instant fee settlements, scholarship disbursements, and transaction management across the platform.
                     </p>
                  </div>
                  <button className="px-10 py-5 bg-slate-50 text-slate-900 rounded-xl border border-slate-100 font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/50">
                     Manage Wallet
                  </button>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
}
