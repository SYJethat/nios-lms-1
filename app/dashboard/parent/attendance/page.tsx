'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, CheckCircle2, XCircle, Clock, TrendingUp, Award, Filter } from 'lucide-react';
import { MOCK_ATTENDANCE } from '@/lib/mock-data';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ParentAttendance() {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Present' | 'Absent' | 'Late'>('All');

  if (!user) return null;

  const filteredAttendance = filterStatus === 'All'
    ? MOCK_ATTENDANCE
    : MOCK_ATTENDANCE.filter(record => record.status === filterStatus);

  const attendanceStats = {
    total: MOCK_ATTENDANCE.length,
    present: MOCK_ATTENDANCE.filter(r => r.status === 'Present').length,
    absent: MOCK_ATTENDANCE.filter(r => r.status === 'Absent').length,
    late: MOCK_ATTENDANCE.filter(r => r.status === 'Late').length,
    rate: ((MOCK_ATTENDANCE.filter(r => r.status === 'Present').length / MOCK_ATTENDANCE.length) * 100).toFixed(1)
  };

  return (
    <DashboardLayout
      title="Attendance Tracker"
      subtitle="Real-time class attendance and participation records"
    >
      <div className="space-y-12 pb-20">
        {/* Stats Header */}
        <div className="grid lg:grid-cols-5 gap-6 p-10 rounded-xl] bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 border border-slate-100 shadow-xl">
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-3">{attendanceStats.present}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Present</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-500 mb-3">{attendanceStats.late}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Late</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-500 mb-3">{attendanceStats.absent}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Absent</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-slate-900 mb-3">{attendanceStats.total}</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Total Classes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-3">{attendanceStats.rate}%</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Attendance Rate</div>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            <Calendar className="text-blue-500" size={40} />
            Detailed Records
          </h1>
          <select
            className="px-8 py-5 bg-white border border-slate-100 rounded-xl shadow-sm font-black text-[11px] uppercase tracking-widest text-slate-700 focus:ring-blue-900 focus:border-transparent min-w-[180px]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            aria-label="Filter attendance by status"
          >
            <option>All</option>
            <option>Present</option>
            <option>Late</option>
            <option>Absent</option>
          </select>
        </div>

        {/* Attendance Records */}
        <div className="grid gap-4">
          {filteredAttendance.map((record) => (
            <div key={record.id} className={`p-8 rounded-xl border-2 transition-all flex items-center gap-6 ${record.status === 'Present' ? 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-300' :
              record.status === 'Late' ? 'border-blue-200 bg-blue-50/50 hover:border-blue-300' :
                'border-blue-200 bg-blue-50/50 hover:border-blue-300'
              }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 ${record.status === 'Present' ? 'bg-emerald-500' :
                record.status === 'Late' ? 'bg-blue-500' :
                  'bg-blue-500'
                }`}>
                {record.status === 'Present' && <CheckCircle2 size={24} />}
                {record.status === 'Late' && <Clock size={24} />}
                {record.status === 'Absent' && <XCircle size={24} />}
              </div>

              <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-6 border-r border-slate-100 pr-8">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</div>
                  <div className="text-lg font-black text-slate-900">{record.date}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</div>
                  <div className="text-lg font-black text-slate-900">{record.subject}</div>
                </div>
                <div className="md:text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
                  <div className={`text-lg font-black uppercase tracking-widest px-3 py-1 rounded-full ${record.status === 'Present' ? 'text-emerald-600 bg-emerald-100' :
                    record.status === 'Late' ? 'text-blue-600 bg-blue-100' :
                      'text-blue-600 bg-blue-100'
                    }`}>
                    {record.status}
                  </div>
                </div>
              </div>

              {record.remarks && (
                <div className="ml-auto pl-8">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Remarks</div>
                  <div className="text-sm font-medium text-slate-700 bg-slate-100 px-4 py-2 rounded-xl max-w-md whitespace-pre-wrap">
                    {record.remarks}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAttendance.length === 0 && (
          <div className="col-span-full text-center py-32 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
            <Calendar className="w-24 h-24 text-slate-300 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-slate-500 mb-4">No records match your filter</h3>
            <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto">
              Select a different status to view attendance history.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

