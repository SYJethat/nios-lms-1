'use client';

// import DashboardLayout from '@/components/DashboardLayout';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Check,
  X,
  Edit3,
  Shield,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { MOCK_STUDENTS } from '@/lib/mock-data';

export default function TeacherStudentsPage() {
  // const { user } = useAuth();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');

  const students = MOCK_STUDENTS.map(s => ({
    ...s,
    progress: Math.floor(Math.random() * 30 + 70), // 70-100%
    attendance: `${Math.floor(Math.random() * 26 + 75)}%`,
    lastActive: ['2h ago', '5h ago', '1d ago', '10m ago'][Math.floor(Math.random() * 4)],
    performance: s.status === 'active' ? 'Good' : s.status === 'suspended' ? 'Needs Focus' : 'Pending'
  }));

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const performBulkAction = () => {
    if (!bulkAction) return;
    alert(`Bulk ${bulkAction} applied to ${selectedIds.length} students`);
    setSelectedIds([]);
    setBulkAction('');
  };

  const toggleStatus = (id: string) => {
    alert(`Student ${id} status toggled`);
  };

  const sendMessage = (id: string) => {
    alert(`Message sent to student ${id}`);
  };

  const viewDetails = (id: string) => {
    window.location.href = `/student/details/${id}`;
  };
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout
      title="Student Management"
      subtitle="Track performance, engagement, and communication for your assigned students"
    >
      <div className="space-y-8 animate-fade-in">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Students', value: '42', icon: Users, color: 'text-blue-500 bg-blue-100' },
            { label: 'Avg. Attendance', value: '88%', icon: Clock, color: 'text-emerald-500 bg-emerald-50' },
            { label: 'Performance', value: '+4.2%', icon: TrendingUp, color: 'text-blue-900 bg-blue-50' },
            { label: 'Active Now', value: '18', icon: CheckCircle2, color: 'text-purple-500 bg-purple-50' },
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon size={20} />
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedIds.length === students.length}
                onChange={selectAll}
                className="w-5 h-5 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
              />
              <span className="text-sm font-bold text-slate-700">{selectedIds.length} selected</span>
            </label>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              placeholder="Search by name, ID or class..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 transition-all font-medium text-slate-600 placeholder:text-slate-400"
            />
          </div>
          {selectedIds.length > 0 && (
            <div className="flex gap-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-black uppercase tracking-widest"
              >
                <option value="">Bulk Actions</option>
                <option value="approve">Approve Selected</option>
                <option value="suspend">Suspend Selected</option>
                <option value="assign-class-10">Assign Class 10</option>
                <option value="export-csv">Export CSV</option>
              </select>
              <button
                onClick={performBulkAction}
                className="px-6 py-3 bg-blue-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 shadow-xl"
              >
                Apply
              </button>
            </div>
          )}
          <button className="px-6 py-4 bg-white border border-slate-100 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
            <Filter size={16} /> Filter By Class
          </button>
        </div>

        {/* Student Grid */}
        <div className="grid gap-4">
          {students.map((student) => (
            <div key={student.id} className="group p-6 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex items-start gap-4">
              <label className="relative flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(student.id)}
                  onChange={() => toggleSelect(student.id)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-900 focus:ring-blue-900 peer"
                />
              </label>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-lg font-black text-slate-400 uppercase tracking-tighter">
                    {student.name.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${student.status === 'active' ? 'bg-emerald-500' : student.status === 'suspended' ? 'bg-blue-500' : 'bg-blue-500'
                    }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-black text-slate-900 mb-1 group-hover:text-blue-900 transition-colors truncate">{student.name}</h4>
                  <div className="flex flex-wrap gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>ID: {student.id}</span>
                    <span>Class: {student.class}</span>
                    <span>Attendance: {student.attendance}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:flex">
                  <div>Progress: {student.progress}%</div>
                  <div>{student.performance}</div>
                  <div>{student.lastActivity}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${student.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  student.status === 'suspended' ? 'bg-blue-100 text-blue-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                  {student.status.toUpperCase()}
                </span>
                <button
                  onClick={() => toggleStatus(student.id)}
                  className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                  title="Toggle Status"
                >
                  <Shield size={16} />
                </button>
                <button
                  onClick={() => sendMessage(student.id)}
                  className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                  title="Send Message"
                >
                  <MessageSquare size={16} />
                </button>
                <button
                  onClick={() => viewDetails(student.id)}
                  className="px-4 py-2 bg-blue-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-md transition-all whitespace-nowrap"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
