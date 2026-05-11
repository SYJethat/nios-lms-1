'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
  ClipboardList,
  Search,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  FileText,
  Download,
  MoreVertical,
  ChevronRight,
  AlertCircle,
  Clock,
  Sparkles,
  Users,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

import { useState } from 'react';
import { MOCK_ASSESSMENTS, MOCK_TEACHER_REPORTS } from '@/lib/mock-data';

export default function TeacherGradesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'grades' | 'analytics' | 'reports'>('grades');
  const [search, setSearch] = useState('');

  if (!user || user.role !== 'teacher') return null;

  const filteredAssessments = MOCK_ASSESSMENTS.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.subject.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Total Students', value: '128', change: '+5', icon: Users, color: 'text-blue-500 bg-blue-400' },
    { label: 'Avg Grade', value: '82%', change: '+3%', icon: TrendingUp, color: 'text-emerald-500 bg-green-400  ' },
    { label: 'Pending Grading', value: '14', change: '-2', icon: Clock, color: 'text-blue-500 bg-blue-400' },
    { label: 'Reports Generated', value: '8', change: '+4', icon: FileText, color: 'text-purple-500 bg-purple-100' },
  ];

  return (
    <DashboardLayout title="Gradebook & Reports" subtitle="Real-time class performance tracking with exportable analytics">
      <div className="space-y-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="group p-8 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all overflow-hidden">
              <div className={`absolute inset-0  opacity-5 group-hover:opacity-10 transition-opacity`} />
              {/* <div className={`w-14 h-14 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <stat.icon size={24} className="text-white" />
              </div> */}
              <div className="text-2xl font-black text-slate-900 mb-2 relative z-10">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10">
                {stat.change.startsWith('+') ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-blue-500" />}
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-slate-100/50">
          {[
            { tab: 'grades' as const, label: 'Gradebook', badge: '42' },
            { tab: 'analytics' as const, label: 'Analytics' },
            { tab: 'reports' as const, label: 'Reports', badge: 'New' }
          ].map(({ tab, label, badge }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all relative ${activeTab === tab
                ? 'bg-gradient-to-r from-blue-900 to-red-500 text-white shadow-2xl shadow-blue-500/25'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/70'
                }`}
            >
              {label}
              {badge && <span className="ml-2 px-2 py-0.5 bg-white/20 text-xs rounded-full">{badge}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'grades' && (
          <>
            {/* Search & Filter */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by student or assessment..."
                  className="w-full pl-14 pr-6 py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-900/20 focus:outline-none transition-all"
                />
              </div>
              <button className="px-4 py-4 bg-blue-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-900 shadow-xl transition-all whitespace-nowrap">
                Bulk Grade Import
              </button>
            </div>

            {/* Grades Table */}
            <div className="overflow-hidden rounded-xl border border-slate-100 shadow-xl bg-white/70 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                      <th className="p-6 text-left font-black text-slate-900 uppercase tracking-wider text-sm">Assessment</th>
                      <th className="p-6 text-right font-black text-slate-900 uppercase tracking-wider text-sm">Submissions</th>
                      <th className="p-6 text-right font-black text-slate-900 uppercase tracking-wider text-sm">Avg Score</th>
                      <th className="p-6 text-right font-black text-slate-900 uppercase tracking-wider text-sm">Status</th>
                      <th className="p-6 text-right font-black text-slate-900 uppercase tracking-wider text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssessments.slice(0, 6).map((assessment, i) => (
                      <tr key={assessment.id} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                        <td className="p-6 font-semibold text-slate-900 max-w-md">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-red-400 text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {assessment.subject.charAt(0)}
                            </div>
                            <div>
                              <div className="font-black">{assessment.title}</div>
                              <div className="text-sm text-slate-500">{assessment.subject} • {assessment.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-right font-mono text-lg text-slate-900">{assessment.submissions || 0}/{assessment.totalStudents || 0}</td>
                        <td className="p-6 text-right">
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                            {assessment.avgScore || 'N/A'}
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${assessment.status === 'Grading Active' ? 'bg-blue-100 text-blue-700' :
                            assessment.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                            {assessment.status}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2">
                            <button className="p-3 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all">
                              <Download size={16} />
                            </button>
                            <button className="p-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all">
                              <CheckCircle2 size={16} />
                            </button>
                            <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center pt-8">
              <button className="px-6 py-4 bg-slate-900 text-white rounded-xl font-black text-md uppercase tracking-widest hover:bg-blue-900 shadow-2xl transition-all">
                View Complete Gradebook →
              </button>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-8 p-12 rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-100/50 shadow-2xl">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                Performance Trends
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Science Stream Avg</span>
                  <div className="text-2xl font-black text-emerald-600">87%</div>
                </div>
                <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Performer</span>
                  <div className="text-2xl font-black text-blue-900">Arjun S. (94%)</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                Risk Indicators
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-red-100 rounded-xl border border-blue-200">
                  <span className="font-bold text-slate-900">Rahul Das</span>
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-black uppercase tracking-widest rounded-full">High Risk (45%)</span>
                </div>
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-red-100 rounded-xl border border-blue-200">
                  <span className="font-bold text-slate-900">Priya N.</span>
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-black uppercase tracking-widest rounded-full">Medium Risk (68%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex-1">Recent Reports</h3>
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-900 shadow-xl transition-all">
                Generate New
              </button>
            </div>
            <div className="grid gap-4">
              {MOCK_TEACHER_REPORTS.map((report) => (
                <div key={report.id} className="group flex items-center p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900 hover:shadow-xl hover:shadow-blue-500/10 transition-all gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-red-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-lg text-slate-900 group-hover:text-blue-900 transition-colors">{report.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.period}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900">{report.size}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Download</div>
                  </div>
                  <button className="p-4 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all ml-4">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

