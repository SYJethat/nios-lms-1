'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { UserPlus, Download, Upload, Users, Search, Filter, Eye, Edit, Trash2, Shield, GraduationCap } from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'list' | 'bulk' | 'roles'>('list');
  const [search, setSearch] = useState('');

  if (!user || user.role !== 'admin') return null;

  const filteredUsers = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'blue' },
    { label: 'Teachers', value: '156', icon: UserPlus, color: 'emerald' },
    { label: 'Learners', value: '2,684', icon: GraduationCap, color: 'blue' },
    { label: 'Pending Verification', value: '23', icon: Shield, color: 'blue' },
  ];

  return (
    <DashboardLayout title="User Administration" subtitle="Bulk onboarding, role management and security monitoring">
      <div className="space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 rounded-xl bg-white border border-slate-100 shadow-lg hover:shadow-xl transition-all text-center">
              <div className={`w-16 h-16 ${stat.color}-500 bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-6`}>
                <stat.icon size={24} className={`${stat.color}-500`} />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white/50 backdrop-blur p-2 rounded-xl border border-slate-100/50 flex">
          <button onClick={() => setActiveTab('list')} className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest flex-1 ${activeTab === 'list' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900'}`}>
            User List
          </button>
          <button onClick={() => setActiveTab('bulk')} className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest flex-1 ${activeTab === 'bulk' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900'}`}>
            Bulk Onboard
          </button>
          <button onClick={() => setActiveTab('roles')} className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest flex-1 ${activeTab === 'roles' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900'}`}>
            Role Management
          </button>
        </div>

        {activeTab === 'bulk' && (
          <div className="p-12 border-4 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-center group hover:border-blue-900 transition-all">
            <div className="w-32 h-32 mx-auto mb-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all">
              <Upload size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Bulk Teacher Onboarding</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Upload CSV with 1 Crore teacher profiles (name, mother tongue, district, subject). Automated profiling and role assignment.
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <button className="w-full px-12 py-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-black text-xl uppercase tracking-widest hover:shadow-emerald-500/50 shadow-xl transition-all flex items-center justify-center gap-4">
                <Upload size={24} />
                Upload Teacher CSV Template
              </button>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono grid grid-cols-2 gap-2">
                <span>• Name</span>
                <span>• Email</span>
                <span>• District</span>
                <span>• Subject</span>
                <span>• Mother Tongue</span>
                <span>• Phone</span>
              </div>
            </div>
            <p className="mt-16 text-sm text-slate-400">
              Supports ~1 Crore teachers. Auto-generates profiles with regional language preferences.
            </p>
          </div>
        )}

        {activeTab === 'list' && (
          <>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users by name, email or ID..."
                  className="pl-14 pr-6 py-5 w-full bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-900/20"
                />
              </div>
              <button className="px-10 py-5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-blue-900 shadow-xl whitespace-nowrap">
                Export CSV
              </button>
            </div>
            <div className="grid gap-6">
              {filteredUsers.slice(0, 8).map((u) => (
                <div key={u.id} className="flex items-center p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900 hover:shadow-xl transition-all gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center font-black text-2xl flex-shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-slate-900">{u.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                      <span>{u.email}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${u.role === 'teacher' ? 'bg-emerald-100 text-emerald-700' :
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                        {u.role}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900">{u.details.enrollmentNo || 'Active'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-4 hover:bg-slate-50 rounded-xl transition-all" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-4 hover:bg-emerald-50 text-emerald-500 rounded-xl transition-all" title="Edit Role">
                      <Edit size={18} />
                    </button>
                    <button className="p-4 hover:bg-blue-50 text-blue-500 rounded-xl transition-all" title="Deactivate">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'roles' && (
          <div className="grid lg:grid-cols-3 gap-8 text-center">
            <div className="p-12 rounded-xl border-4 border-dashed border-blue-200 bg-blue-50/50">
              <UserPlus className="w-24 h-24 text-blue-500 mx-auto mb-8" />
              <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Teacher</h3>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-sm mx-auto">
                Content creation, grading, announcements, reports. Class management for assigned streams.
              </p>
              <button className="px-12 py-6 bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest shadow-xl hover:shadow-blue-500/25 transition-all text-sm">
                Bulk Assign Teachers
              </button>
            </div>
            <div className="p-12 rounded-xl border-4 border-dashed border-blue-200 bg-blue-50/50">
              <GraduationCap className="w-24 h-24 text-blue-500 mx-auto mb-8" />
              <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Learner</h3>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-sm mx-auto">
                Course access, assessments, progress tracking, certificates. Parent linkage available.
              </p>
              <button className="px-12 py-6 bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest shadow-xl hover:shadow-blue-500/25 transition-all text-sm">
                Enroll Students
              </button>
            </div>
            <div className="p-12 rounded-xl border-4 border-dashed border-purple-200 bg-purple-50/50">
              <Shield className="w-24 h-24 text-purple-500 mx-auto mb-8" />
              <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Admin</h3>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-sm mx-auto">
                Full platform control. System reports, bulk operations, compliance dashboards.
              </p>
              <button className="px-12 py-6 bg-purple-500 text-white rounded-xl font-black uppercase tracking-widest shadow-xl hover:shadow-purple-500/25 transition-all text-sm">
                Manage Admins
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

