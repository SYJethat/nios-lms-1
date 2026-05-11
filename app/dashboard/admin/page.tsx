'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
  Users,
  UserPlus,
  BookOpen,
  ShieldCheck,
  Activity,
  Server,
  Settings,
  FileText,
  BadgeAlert,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import Link from 'next/link';

const platformStats = [
  { icon: Users, label: 'Total Learners', value: '1.24M', change: '+8,421', up: true, color: 'from-blue-500 to-indigo-600' },
  { icon: Globe, label: 'Active Language Pairs', value: '484', change: 'Max Capacity', up: true, color: 'from-emerald-500 to-teal-600' },
  { icon: BookOpen, label: 'MLP Active Courses', value: '1,240', change: '+45 pending', up: true, color: 'from-blue-500 to-red-600' },
  { icon: CreditCard, label: 'Revenue (MTD)', value: '₹48.6L', change: '+12%', up: true, color: 'from-purple-500 to-pink-600' },
];

const systemHealth = [
  { label: 'Core API', status: 'Healthy', uptime: '99.99%', color: 'text-emerald-500' },
  { icon: Server, label: 'Database Cluster', status: 'Optimal', uptime: '99.96%', color: 'text-emerald-500' },
  { icon: ShieldCheck, label: 'Auth Service', status: 'Healthy', uptime: '100%', color: 'text-emerald-500' },
  { icon: Globe, label: 'CDN Nodes', status: 'Degraded', uptime: '97.4%', color: 'text-blue-500' },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout
      title="System Administration"
      subtitle={`NIOS Central Ops · Node: ${user.details.designation || 'Master Admin'}`}
    >
      {/* System Status Banner */}
      <div className="flex items-center gap-4 p-4 mb-8 bg-emerald-50 border border-emerald-100 rounded-xl">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <ShieldCheck size={20} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-black text-emerald-900 uppercase tracking-tight">Security Protocol Active</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">STQC Compliant · ISO 27001 Certified · Last Audit: 1 Mar 2026</div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white border border-emerald-100 text-emerald-600 text-[10px] font-black rounded-lg">2FA ENFORCED</span>
          <span className="px-3 py-1 bg-white border border-emerald-100 text-emerald-600 text-[10px] font-black rounded-lg">VPN ACCESS ONLY</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {platformStats.map((s, i) => (
          <div key={i} className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm group hover:shadow-2xl transition-all relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.color} opacity-[0.03] rounded-full -mr-8 -mt-8`} />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-6 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
              <s.icon size={20} />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
            <div className={`mt-4 flex items-center gap-1 text-[10px] font-black text-emerald-600`}>
              <TrendingUp size={12} /> {s.change} this month
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Platform Users */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Access Control Log</h3>
            <div className="flex gap-2">
              <Link href="/admin/users" className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-xl hover:bg-black transition-all">Manage Roles</Link>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Principal</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Auth Level</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Region</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_USERS.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-5 text-sm font-black text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-500">{u.name.charAt(0)}</div>
                        {u.name}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-blue-50 text-blue-600' : u.role === 'teacher' ? 'bg-blue-50 text-blue-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DE-CENTRALIZED</td>
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-8">
          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">System Infrastructure</h3>
              <Activity className="text-blue-900 animate-pulse" size={20} />
            </div>
            <div className="space-y-6">
              {systemHealth.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
                      {item.icon ? <item.icon size={16} /> : <Server size={16} />}
                    </div>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</div>
                    <div className="text-[10px] font-bold text-slate-400">{item.uptime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <h3 className="font-black uppercase tracking-tight mb-6">Quick Admin Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: ShieldCheck, label: 'Admissions & KYC', href: '/admin/admissions' },
                { icon: Globe, label: 'Integrations Panel', href: '/admin/integrations' },
                { icon: Server, label: 'System & Backups', href: '/admin/system' },
                { icon: FileText, label: 'Platform Reports', href: '/admin/reports' },
              ].map((a, i) => (
                <Link key={i} href={a.href} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold w-full text-left">
                  <div className="flex items-center gap-3 font-black uppercase tracking-widest">
                    <a.icon size={16} className="text-blue-900" /> {a.label}
                  </div>
                  <ArrowUpRight size={14} className="text-slate-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

