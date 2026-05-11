'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import {
  Users,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Filter,
  Download,
  ShieldX
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_STUDENTS, MOCK_USERS } from '@/lib/mock-data';

export default function AdminStudentsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'pending'>('all');
  const [filterClass, setFilterClass] = useState('all');

  if (!user || user.role !== 'admin') return null;

  const stats = [
    { label: 'Total Learners', value: '2,684', icon: Users, color: 'blue' },
    { label: 'Active', value: '2,612', icon: CheckCircle2, color: 'emerald' },
    { label: 'Suspended', value: '12', icon: XCircle, color: 'blue' },
    { label: 'Pending', value: '60', icon: ShieldX, color: 'blue' },
  ];

  const filteredStudents = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  ).filter(s => filterStatus === 'all' || s.status === filterStatus)
    .filter(s => filterClass === 'all' || s.class.includes(filterClass));

  const classes = ['Class 10', 'Class 12', 'Vocational'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'suspended': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <DashboardLayout title="Student Records Oversight" subtitle="Full visibility, status management and parent linkage">
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
              <div className={`w-12 h-12 ${stat.color}-500 bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon size={20} className={`${stat.color}-500`} />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name, email or ID..."
              className="pl-12 pr-6 py-4 w-full bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500/20"
              aria-label="Search students"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
            aria-label="Filter by class"
          >
            <option value="all">All Classes</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 shadow-lg whitespace-nowrap">
            <Download className="inline mr-2 w-4 h-4" /> Export
          </button>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Courses</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Parent</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500">{student.email}</div>
                          <div className="text-xs text-slate-400">Enrolled: {student.enrollmentDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-sm font-bold text-slate-900">{student.courses}</td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-bold text-emerald-600">
                        {student.attendance}%
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(student.status)}`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-xs font-medium text-slate-600">
                        {student.parentId ? `P${student.parentId.slice(-4)}` : 'None'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all inline-flex items-center gap-1 text-xs" title="View Records">
                        <Eye size={14} /> Records
                      </button>
                      {student.status === 'suspended' && (
                        <button className="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                          Activate
                        </button>
                      )}
                      {student.status === 'active' && (
                        <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <GraduationCap className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <div className="text-lg font-semibold mb-2">No students found</div>
                      <div className="text-sm">Adjust search or filter criteria</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

