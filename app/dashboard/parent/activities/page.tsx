'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { ClipboardList, BookOpen, CheckCircle2, Clock, Filter, Calendar, Award } from 'lucide-react';
import { MOCK_CLASS_ACTIVITIES } from '@/lib/mock-data';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ParentActivities() {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Submitted' | 'Graded'>('All');

  if (!user) return null;

  const filteredActivities = filterStatus === 'All'
    ? MOCK_CLASS_ACTIVITIES
    : MOCK_CLASS_ACTIVITIES.filter(activity => activity.status === filterStatus);

  return (
    <DashboardLayout
      title="Class Activities"
      subtitle="Homework, projects and assignments overview"
    >
      <div className="space-y-12 pb-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
              <ClipboardList className="text-emerald-500" size={36} />
              Learning Tasks
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
              Track homework, projects and quizzes assigned by faculty. {MOCK_CLASS_ACTIVITIES.filter(a => a.status === 'Pending').length} pending.
            </p>
          </div>
          <select
            className="px-6 py-4 bg-white border border-slate-100 rounded-xl shadow-sm font-black text-[10px] uppercase tracking-widest text-slate-700 focus:ring-blue-900 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            aria-label="Filter activities by status"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Submitted</option>
            <option>Graded</option>
          </select>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="group p-8 rounded-xl bg-white border-2 border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all overflow-hidden">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 shrink-0 ${activity.status === 'Pending' ? 'bg-blue-500' :
                  activity.status === 'Submitted' ? 'bg-blue-500' :
                    'bg-emerald-500'
                  }`}>
                  <ClipboardList size={20} />
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  {activity.status}
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">{activity.title}</h3>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-center gap-2 text-slate-500">
                  <BookOpen size={14} /> {activity.subject}
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  👨‍🏫 {activity.teacher}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Calendar size={12} /> Due {activity.dueDate}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${activity.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                  activity.status === 'Submitted' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                  {activity.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 col-span-full">
            <ClipboardList className="w-20 h-20 text-slate-300 mx-auto mb-6 opacity-50" />
            <h3 className="text-xl font-black text-slate-500 mb-2">No activities match filter</h3>
            <p className="text-slate-400 font-medium text-sm max-w-md mx-auto">
              Select different status or wait for new assignments from teachers.
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid lg:grid-cols-4 gap-6 p-8 rounded-xl] bg-gradient-to-r from-emerald-50 to-red-50 border border-emerald-100/50">
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-600 mb-2">2</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">3</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Submitted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-slate-900 mb-2">1</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Graded</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-red-500 bg-clip-text text-transparent mb-2">92%</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">On-time Rate</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

