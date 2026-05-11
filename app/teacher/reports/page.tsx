'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { FileText, Download, BarChart3, Users, TrendingUp, Calendar, Filter, Search, ShieldCheck, icons } from 'lucide-react';
import { MOCK_TEACHER_REPORTS } from '@/lib/mock-data';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function TeacherReportsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  if (!user || user.role !== 'teacher') return null;

  const filteredReports = MOCK_TEACHER_REPORTS.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || report.type === filter;
    return matchesSearch && matchesFilter;
  });

  const reportTypes = ['All', 'Class Analytics', 'Student Performance', 'Exam Results'];

  const stats = [
    { icon: BarChart3, label: 'Total Reports', value: '24', trend: '+12%' },
    { icon: Users, label: 'Students Covered', value: '1,284', trend: '+8%' },
    { icon: TrendingUp, label: 'Avg Performance', value: '82%', trend: '+4.2pts' },
    { icon: Calendar, label: 'Last Generated', value: '2 hrs ago' },
  ];

  return (
    <DashboardLayout title="Teacher Reports & Analytics" subtitle="Classroom insights, performance trends and exportable compliance data">
      <div className="space-y-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="group p-8 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 transition-all overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-red-500 opacity-[0.03] group-hover:opacity-5 transition-opacity" />
              {/* <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-red-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform mx-auto">
                <stat.icon size={24} />
              </div> */}
              <div className="text-3xl font-black text-slate-900 mb-2 text-center">{stat.value}</div>
              <div className="text-sm font-bold text-slate-600 uppercase tracking-wider text-center">{stat.label}</div>
              {stat.trend && (
                <div className="mt-3 text-xs font-bold text-emerald-600 flex items-center justify-center gap-1 uppercase tracking-wider">
                  <TrendingUp size={14} />
                  {stat.trend}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100/50 shadow-xl">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Report Library</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="pl-12 pr-6 py-4 bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-900/20 w-80"
              />
            </div>
            <div className="flex gap-2 bg-white/50 p-2 rounded-xl border border-slate-100/50">
              {reportTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${filter === type
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white'
                    }`}
                >
                  {type}
                </button>
              ))}

            </div>

          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-8">
          {filteredReports.map((report) => (
            <div key={report.id} className="group p-10 rounded-xl bg-white border-2 border-slate-100 hover:border-blue-900 hover:shadow-2xl hover:shadow-blue-500/10 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/3 via-transparent to-emerald-500/3" />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-red-400 text-white rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                    <FileText size={28} />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-red-100 text-blue-800 rounded-xl text-sm font-black uppercase tracking-wider shadow-md">
                      <ShieldCheck size={14} />
                      {report.type}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-900 transition-all mb-4 leading-tight">{report.title}</h4>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{report.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download size={16} />
                      <span>{report.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} />
                      <span>42 Students</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 lg:pt-0 lg:pl-12 lg:border-l-4 lg:border-l-slate-100">
                  <button className="flex items-center gap-3 px-8 py-5 bg-blue-400 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-900 shadow-2xl hover:shadow-blue-500/25 transition-all whitespace-nowrap">
                    <Download size={18} />
                    Download PDF
                  </button>
                  <button className="p-4 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl shadow-lg transition-all hover:shadow-xl">
                    <BarChart3 size={20} />
                  </button>
                  <button className="p-4 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl shadow-lg transition-all hover:shadow-xl">
                    <Users size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="col-span-full text-center py-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <FileText className="w-32 h-32 text-slate-300 mx-auto mb-8" />
              <h3 className="text-3xl font-black text-slate-500 mb-4">No reports match your criteria</h3>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">Try adjusting your search or filters, or generate a new custom report for your class.</p>
              <button className="px-16 py-8 bg-gradient-to-r from-blue-900 to-red-500 text-white rounded-xl font-black text-xl uppercase tracking-widest hover:shadow-2xl hover:shadow-blue-500/25 transition-all shadow-xl">
                Generate First Report
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

