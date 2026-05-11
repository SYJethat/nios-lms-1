'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { FileText, CheckCircle2, Clock, Edit3, Download, Award, Filter, Send } from 'lucide-react';
import { MOCK_ASSESSMENTS } from '@/lib/mock-data';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ParentTMA() {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Completed' | 'Graded'>('All');

  if (!user) return null;

  const filteredTMAs = filterStatus === 'All'
    ? MOCK_ASSESSMENTS
    : MOCK_ASSESSMENTS.filter(tma => tma.status === filterStatus);

  const tmaStats = {
    total: MOCK_ASSESSMENTS.length,
    pending: MOCK_ASSESSMENTS.filter(t => t.status === 'Pending').length,
    completed: MOCK_ASSESSMENTS.filter(t => t.status === 'Completed').length,
    avgScore: '85.2%'
  };

  const viewFeedback = (tmaId: string) => {
    // Mock feedback modal
    alert(`📝 TMA Feedback for ${MOCK_ASSESSMENTS.find(a => a.id === tmaId)?.title}:\n\nExcellent analysis! Focus on showing all steps for full marks next time. Grade: A (88/100)`);
  };

  return (
    <DashboardLayout
      title="TMA Feedback"
      subtitle="Tutor Marked Assignments - Progress & Faculty Comments"
    >
      <div className="space-y-12 pb-20">
        {/* Stats Header */}
        <div className="grid lg:grid-cols-4 gap-6 p-10 rounded-xl] bg-gradient-to-br from-purple-50 to-emerald-50 border border-purple-100/50 shadow-xl">
          <div className="text-center">
            <div className="text-4xl font-black text-purple-600 mb-3">{tmaStats.total}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Total TMAs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-500 mb-3">{tmaStats.pending}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Pending Review</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-3">{tmaStats.completed}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Graded</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-3">{tmaStats.avgScore}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Avg Score</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            <FileText className="text-purple-500" size={40} />
            TMA Evaluations
          </h1>
          <select
            className="px-8 py-5 bg-white border border-slate-100 rounded-xl shadow-sm font-black text-[11px] uppercase tracking-widest text-slate-700 focus:ring-blue-900 focus:border-transparent min-w-[200px]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            aria-label="Filter TMAs by status"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Graded</option>
          </select>
        </div>

        {/* TMA List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTMAs.map((tma) => (
            <div key={tma.id} className={`group p-8 rounded-2xl border-2 transition-all h-full ${tma.status === 'Pending' ? 'border-blue-200 bg-blue-50/30 hover:border-blue-300' :
              tma.status === 'Completed' ? 'border-blue-200 bg-blue-50/30 hover:border-blue-300' :
                'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300'
              }`}>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0 ${tma.status === 'Pending' ? 'bg-blue-500' :
                  tma.status === 'Completed' ? 'bg-blue-500' :
                    'bg-emerald-500'
                  }`}>
                  <FileText size={22} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${tma.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                  tma.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                  {tma.status}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight line-clamp-2 group-hover:text-purple-700 transition-colors">
                {tma.title}
              </h3>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  📚 <span>{tma.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  📅 Due <span className="font-black">{tma.dueDate}</span>
                </div>
                {tma.score && (
                  <div className="flex items-center gap-2 text-sm">
                    <Award size={16} className="text-yellow-500" />
                    <span className="font-black text-emerald-600">{tma.score}%</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {tma.status === 'Completed' ? (
                  <button
                    onClick={() => viewFeedback(tma.id)}
                    className="w-full py-5 px-6 bg-gradient-to-r from-purple-500 to-emerald-500 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all flex items-center gap-3 justify-center"
                  >
                    <Edit3 size={18} /> View Faculty Feedback
                  </button>
                ) : tma.status === 'Pending' ? (
                  <div className="w-full py-5 px-6 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest text-center shadow-xl">
                    ⏳ Under Faculty Review
                  </div>
                ) : (
                  <button className="w-full py-5 px-6 bg-slate-900 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center">
                    <Download size={18} /> Download Original
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTMAs.length === 0 && (
          <div className="col-span-full text-center py-32 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
            <FileText className="w-24 h-24 text-slate-300 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-slate-500 mb-4">No TMAs match your filter</h3>
            <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto">
              Select different status to view Tutor Marked Assignments.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

