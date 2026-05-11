'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import {
  UserPlus,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  ShieldX,
  Trash2,
  Download,
  Filter,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_TEACHERS } from '@/lib/mock-data';

export default function AdminTeachersPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'pending' | 'suspended'>('list');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

  if (!user || user.role !== 'admin') return null;

  const filteredTeachers = MOCK_TEACHERS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  ).filter(t => filterStatus === 'all' || t.status === filterStatus);

  const stats = [
    { label: 'Total Teachers', value: '156', icon: Users, color: 'indigo' },
    { label: 'Active', value: '142', icon: CheckCircle2, color: 'emerald' },
    { label: 'Pending Approval', value: '8', icon: ShieldX, color: 'blue' },
    { label: 'Suspended', value: '6', icon: XCircle, color: 'blue' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'pending_approval': return 'bg-blue-100 text-blue-700';
      case 'suspended': return 'bg-blue-100 text-blue-700';
      case 'removed': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <DashboardLayout title="Teacher Management" subtitle="Onboarding, approval, suspension, removal and oversight">
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

        {/* Tabs */}
        <div className="bg-slate-50 p-1 rounded-xl border border-slate-200 flex">
          <button onClick={() => setActiveTab('list')} className={`px-6 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${activeTab === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            All Faculty (156)
          </button>
          <button onClick={() => setActiveTab('pending')} className={`px-6 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${activeTab === 'pending' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            Pending (8)
          </button>
          <button onClick={() => setActiveTab('suspended')} className={`px-6 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${activeTab === 'suspended' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            Suspended (6)
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or subject..."
              className="pl-12 pr-6 py-4 w-full bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending_approval">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 shadow-lg whitespace-nowrap">
            <Download className="inline mr-2 w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Teachers List */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Faculty Member</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Classes</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center">
                          {teacher.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{teacher.name}</div>
                          <div className="text-xs text-slate-500">{teacher.email}</div>
                          <div className="text-xs text-slate-400">ID: {teacher.id} · Joined {teacher.joined}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
                        {teacher.subject}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-sm font-bold text-slate-900">{teacher.classes}</td>
                    <td className="px-6 py-5 font-mono text-sm font-bold text-slate-900">{teacher.students}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(teacher.status)}`}>
                        {teacher.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all inline-flex items-center gap-1 text-xs" title="View Profile">
                        <Eye size={14} /> View
                      </button>
                      {teacher.status === 'pending_approval' && (
                        <button className="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                          Approve
                        </button>
                      )}
                      {teacher.status === 'active' && (
                        <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                          Suspend
                        </button>
                      )}
                      <button className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Remove">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTeachers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <div className="text-lg font-semibold mb-2">No teachers found</div>
                      <div className="text-sm">Try adjusting your search or filter criteria</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="p-8 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl border border-slate-100/50 text-center">
          <div className="max-w-2xl mx-auto">
            <UserPlus className="w-20 h-20 text-indigo-400 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Bulk Teacher Onboarding</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Upload CSV with teacher profiles for automated approval workflow. Supports regional languages and district-wise assignment.
            </p>
            <button className="px-12 py-6 bg-indigo-500 text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:shadow-indigo-500/25 shadow-xl transition-all">
              Upload CSV Template
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

