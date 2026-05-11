'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import {
  Users,
  BarChart3,
  Calendar,
  ClipboardList,
  Award,
  MessageSquare,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const children = [
  { id: '10023', name: 'Arjun Sharma', grade: 'Class 10 (Science)', progress: 72, attendance: '92%', lastActive: '2 hours ago' },
];

const childStats = [
  { label: 'Overall Progress', value: '72%', icon: BarChart3, color: 'from-blue-500 to-indigo-600' },
  { label: 'Attendance', value: '92%', icon: Calendar, color: 'from-emerald-500 to-teal-600' },
  { label: 'Pending Tasks', value: '3', icon: ClipboardList, color: 'from-blue-500 to-red-600' },
  { label: 'Global Rank', value: '#12', icon: Award, color: 'from-purple-500 to-pink-600' },
];

const recentActivity = [
  { activity: 'Completed Quiz: Laws of Motion', time: '10:45 AM', score: '85%', status: 'success' },
  { activity: 'Submitted TMA: English Grammar', time: 'Yesterday', score: 'Pending', status: 'warning' },
  { activity: 'Logged in for Live Class (Physics)', time: '31 Mar', score: '-', status: 'info' },
];

export default function ParentDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout
      title="Guardian Portal"
      subtitle={`Welcome back, ${user.name} · Managing ${children.length} Scholar(s)`}
    >
      {/* Child Overview Card */}
      <div className="p-8 mb-8 rounded-xl bg-white border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
        <div className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-400 group-hover:bg-blue-900 group-hover:text-white transition-colors animate-fade-in">
          {children[0].name.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{children[0].name}</h2>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-100">ONLINE</span>
          </div>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{children[0].grade} · ROLL: {children[0].id}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-400">
              <Clock size={14} /> ACTIVE {children[0].lastActive}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-500" /> VERIFIED GEN-ID
            </div>
          </div>
        </div>
        <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">
          Switch Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {childStats.map((s, i) => (
          <div key={i} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-4 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
              <s.icon size={20} />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Trajectory</h3>
              <TrendingUp className="text-emerald-500" />
            </div>
            <div className="h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-4">
              <BarChart3 size={48} className="opacity-20 translate-y-2" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Generating Real-time Telemetry...</span>
            </div>
            <div className="grid grid-3 gap-6 mt-8 pt-8 border-t border-slate-100">
              <div className="text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Time Spent</div>
                <div className="text-xl font-black text-slate-900 tracking-tight">42h 15m</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Avg. Quiz Score</div>
                <div className="text-xl font-black text-slate-900 tracking-tight">78%</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Consistency</div>
                <div className="text-xl font-black text-emerald-500 tracking-tight">HIGH</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">Log Feed</h3>
            <div className="space-y-6">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 transition-transform group-hover:scale-150 ${a.status === 'success' ? 'bg-emerald-500' : a.status === 'warning' ? 'bg-blue-500' : 'bg-blue-500'
                    }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black text-slate-900 leading-tight mb-1">{a.activity}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{a.time} · Result: {a.score}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 font-black text-[10px] uppercase rounded-xl tracking-widest transition-all">
              Full Activity Logs
            </button>
          </div>
        </div>
      </div>

      {/* Parental Actions */}
      <div className="mt-8 p-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000" />
        <h3 className="text-xl font-black uppercase tracking-tight mb-8">Guardian Services</h3>
        <div className="grid grid-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { icon: MessageSquare, label: 'Message Teacher', href: '/dashboard/parent/ptm' },
            { icon: FileText, label: 'View Reports', href: '/dashboard/parent/reports' },
            { icon: AlertCircle, label: 'Check Alerts', href: '/dashboard/parent/alerts' },
            { icon: ClipboardList, label: 'Class Activities', href: '/dashboard/parent/activities' },
            { icon: Calendar, label: 'Attendance', href: '/dashboard/parent/attendance' },
            { icon: CreditCard, label: 'Fee Payment', href: '/dashboard/parent/fees' },
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-900/30 transition-all cursor-pointer flex flex-col items-center gap-4 group/btn">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-900 group-hover/btn:scale-110 transition-transform">
                  <action.icon size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{action.label}</span>
              </div>
            </Link>
          ))}
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

