'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  ClipboardList,
  Star,
  PlusCircle,
  MessageSquare,
  TrendingUp,
  Video,
  ArrowRight,
  Brain,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';

const teacherStats = [
  { icon: Users, label: 'Total Students', value: '2,847', change: '+124', up: true, color: 'from-blue-500 to-indigo-600' },
  { icon: BookOpen, label: 'Active Courses', value: '12', change: '4 Multilingual', up: true, color: 'from-emerald-500 to-teal-600' },
  { icon: Globe, label: 'Language Pairs', value: '18', change: '+2 new', up: true, color: 'from-amber-500 to-orange-600' },
  { icon: Star, label: 'AI Feedback Score', value: '4.8', change: 'Top 1%', up: true, color: 'from-purple-500 to-pink-600' },
];

const students = [
  { name: 'Priya Nair', id: '10041', course: 'Physics (Eng → Hin)', progress: 88, risk: 'low' },
  { name: 'Rahul Das', id: '10042', course: 'Maths (Hin → Ben)', progress: 32, risk: 'high' },
  { name: 'Sonal Mehta', id: '10043', course: 'English (Eng → Tam)', progress: 67, risk: 'medium' },
  { name: 'Arjun Sharma', id: 'L10023', course: 'Physics (Eng → Hin)', progress: 72, risk: 'low' },
  { name: 'Meera Bai', id: 'L10024', course: 'Science (Pun → Hin)', progress: 95, risk: 'low' },
];

const quickActions = [
  { icon: PlusCircle, label: 'Create Quiz', href: '/teacher/exams', color: 'text-blue-600 bg-blue-50' },
  { icon: MessageSquare, label: 'Announcement', href: '/teacher/announcements', color: 'text-purple-600 bg-purple-50' },
  { icon: TrendingUp, label: 'Class Report', href: '/analytics', color: 'text-emerald-600 bg-emerald-50' },
  { icon: Video, label: 'Start Live', href: '/live', color: 'text-blue-600 bg-blue-50' },
];

export default function TeacherDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout
      title="Faculty Dashboard"
      subtitle={`${user.details.department} · ${user.details.designation}`}
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map((a) => (
          <Link href={a.href} key={a.label} className="group">
            <div className="p-6 rounded-xl bg-white border border-slate-100 hover:shadow-2xl hover:border-blue-900/20 transition-all flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-xl ${a.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <a.icon size={24} />
              </div>
              <span className="text-sm font-black text-slate-900 tracking-tight">{a.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {teacherStats.map((s) => (
          <div key={s.label} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
            {/* <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-4 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
              <s.icon size={20} />
            </div> */}
            <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
            <div className={`mt-4 flex items-center gap-1 text-[10px] font-black ${s.up ? 'text-emerald-600' : 'text-blue-500'}`}>
              <span className="text-xs">{s.up ? '↑' : '↓'}</span> {s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Student Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Students</h3>
            <Link href="/teacher/students" className="text-sm font-bold text-blue-900 hover:underline">View All Students →</Link>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-sm group-hover:bg-blue-900 group-hover:text-white transition-colors">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900">{s.name}</div>
                          <div className="text-[10px] font-bold text-slate-400">ID: {s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[80px]">
                          <div
                            className="h-full bg-blue-900 transition-all duration-1000"
                            style={{ width: `${s.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-black text-slate-900">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-widest uppercase ${s.risk === 'high' ? 'bg-blue-50 text-blue-900' : s.risk === 'medium' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                        {s.risk}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-[10px] font-black text-slate-400 hover:text-blue-900 uppercase tracking-tight">Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Intelligence & Queue */}
        <div className="space-y-8">
          <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-900/20 flex items-center justify-center text-blue-900">
                <Brain size={20} />
              </div>
              <h3 className="font-black uppercase tracking-tight">AI Insights</h3>
            </div>
            <div className="space-y-4">
              {[
                "2 students haven't logged in for 5 days.",
                "High dropout risk detected for Rahul Das.",
                "Physics quiz scores are 15% below average."
              ].map((insight, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 leading-relaxed hover:bg-white/10 transition-all">
                  <span className="text-blue-900 mr-2">●</span> {insight}
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all">
              Send Intervention Nudges
            </button>
          </div>

          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">TMA Queue</h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-900 rounded-md text-[10px] font-black">38 NEW</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Priya Nair', sub: 'Physics TMA 1', date: 'Today' },
                { name: 'Rahul Das', sub: 'Maths Unit 2', date: 'Yesterday' },
                { name: 'Sonal Mehta', sub: 'English Essay', date: 'Yesterday' },
              ].map((tma, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-transparent hover:border-blue-900/20 transition-all cursor-pointer">
                  <div>
                    <div className="text-sm font-black text-slate-900">{tma.name}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">{tma.sub}</div>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase">{tma.date}</div>
                </div>
              ))}
            </div>
          </div>
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

