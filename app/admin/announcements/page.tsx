'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import {
  Megaphone,
  Search,
  Edit,
  Send,
  Calendar,
  Users,
  Download,
  Filter,
  Eye,
  GraduationCap,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_SYSTEM_ANNOUNCEMENTS } from '@/lib/mock-data';

export default function AdminAnnouncementsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filterTarget, setFilterTarget] = useState<'all' | 'all' | 'teachers' | 'students' | 'admins'>('all');

  if (!user || user.role !== 'admin') return null;

  const stats = [
    { label: 'Active', value: '5', icon: Megaphone, color: 'blue' },
    { label: 'Teachers', value: '2', icon: Users, color: 'indigo' },
    { label: 'Students', value: '3', icon: Users, color: 'blue' },
    { label: 'Total Views', value: '3.2K', icon: Eye, color: 'emerald' },
  ];

  const filteredAnnouncements = MOCK_SYSTEM_ANNOUNCEMENTS.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.target.toLowerCase().includes(search.toLowerCase())
  ).filter(a => filterTarget === 'all' || a.target === filterTarget);

  const getTargetIcon = (target: string) => {
    switch (target) {
      case 'all': return Users;
      case 'teachers': return Users;
      case 'students': return GraduationCap;
      case 'admins': return Shield;
      default: return Users;
    }
  };

  return (
    <DashboardLayout title="System-wide Announcements" subtitle="Global notifications, policy updates and reminders">
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
        <div className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements..."
              className="pl-12 pr-6 py-4 w-full bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500/20"
              aria-label="Search announcements"
            />
          </div>
          <select
            value={filterTarget}
            onChange={(e) => setFilterTarget(e.target.value as any)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20"
            aria-label="Filter by target audience"
          >
            <option value="all">All Targets</option>
            <option value="all">All Users</option>
            <option value="teachers">Teachers</option>
            <option value="students">Students</option>
            <option value="admins">Admins</option>
          </select>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 shadow-lg">
            New Announcement
          </button>
        </div>

        {/* Announcements Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Announcement</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Target</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Views</th>
                <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAnnouncements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-900 pr-0">
                    <div className="text-lg">{announcement.title}</div>
                    <div className="text-sm text-slate-600 mt-1 line-clamp-2">{announcement.message}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        {(() => {
                          const Icon = getTargetIcon(announcement.target);
                          return <Icon size={16} className="text-blue-600" />;
                        })()}
                      </div>
                      <span className="font-medium capitalize">{announcement.target}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">{announcement.created}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="font-mono text-lg font-bold text-emerald-600">{announcement.views.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all" title="Analytics">
                      <Eye size={14} />
                    </button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 hover:text-blue-700 transition-all" title="Edit">
                      <Edit size={14} />
                    </button>
                    <button className="p-2 hover:bg-emerald-100 rounded-lg text-emerald-600 hover:text-emerald-700 transition-all" title="Resend">
                      <Send size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAnnouncements.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Megaphone className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <div className="text-lg font-semibold mb-2">No announcements</div>
                    <div className="text-sm">Create your first system-wide announcement</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

