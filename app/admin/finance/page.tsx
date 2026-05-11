'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, FileText, Download, TrendingUp, IndianRupee, PieChart, Activity, Wallet, Smartphone, ShieldCheck } from 'lucide-react';

const recentInvoices = [
  { id: 'INV-2026-0891', user: 'Vikram Singh', amount: '₹12,400', status: 'Paid', method: 'UPI (PhonePe)', date: '06 Apr 2026' },
  { id: 'INV-2026-0892', user: 'Neha Sharma', amount: '₹4,500', status: 'Pending', method: 'Credit Card', date: '06 Apr 2026' },
  { id: 'INV-2026-0893', user: 'Rahul Verma', amount: '₹8,200', status: 'Paid', method: 'Net Banking', date: '05 Apr 2026' },
  { id: 'INV-2026-0894', user: 'Priya Patel', amount: '₹12,400', status: 'Failed', method: 'Wallet (Paytm)', date: '05 Apr 2026' },
];

export default function FinancePage() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return null;

  return (
    <DashboardLayout
      title="Financial Operations"
      subtitle="Revenue, Payment Gateways & Automated Invoicing"
    >
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue (MTD)', value: '₹48.6L', icon: IndianRupee, change: '+12.4%', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Pending Invoices', value: '342', icon: FileText, change: '-5.2%', color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Successful txns', value: '98.2%', icon: Activity, change: '+0.8%', color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Gateway Fees Paid', value: '₹42.1K', icon: PieChart, change: '+2.1%', color: 'text-slate-500', bg: 'bg-slate-100' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
              <stat.icon size={48} className={stat.color} />
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter mb-2">{stat.value}</div>
            <div className={`text-[10px] font-bold flex items-center gap-1 ${stat.color}`}>
              <TrendingUp size={12} /> {stat.change} vs last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Invoice Management */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Automated Invoicing Log</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-colors">
              <Download size={14} /> Export CSV
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice / User</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">{inv.id}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{inv.user} · {inv.date}</div>
                  </td>
                  <td className="px-6 py-4 font-black">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      {inv.method.includes('UPI') ? <Smartphone size={14} className="text-purple-500" /> :
                        inv.method.includes('Card') ? <CreditCard size={14} className="text-blue-500" /> :
                          <Wallet size={14} className="text-blue-500" />}
                      {inv.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                      inv.status === 'Failed' ? 'bg-blue-50 text-blue-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gateway Config */}
        <div className="space-y-6">
          <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden shadow-lg border border-slate-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mt-10 -mr-10" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400 backdrop-blur-md">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-tight text-white">Payment Gateways</h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Multi-Option Secure Routing</p>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {[
                { name: 'Razorpay Gateway', modes: 'Cards, UPI', status: 'Primary', active: true },
                { name: 'PayU India', modes: 'Netbanking, EMI', status: 'Backup', active: true },
                { name: 'PayPal Int.', modes: 'USD, Wallets', status: 'Global', active: false },
              ].map((gw, i) => (
                <div key={i} className={`p-4 rounded-xl border ${gw.active ? 'border-indigo-500/30 bg-indigo-500/10' : 'border-slate-700 bg-slate-800/50'} flex items-center justify-between`}>
                  <div>
                    <div className="font-bold text-sm text-slate-200">{gw.name}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">{gw.modes}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${gw.active ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {gw.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
