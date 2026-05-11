'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import {
  Bell,
  Search,
  Calendar,
  Send,
  Edit,
  Trash2,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_NOTIFICATIONS } from '@/lib/mock-data';

export default function AdminNotificationsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'reminder' | 'approval' | 'deadline'>('all');
  const [tab, setTab] = useState<'scheduled' | 'history' | 'templates'>('scheduled');

  if (!user || user.role !== 'admin') return null;

  const stats = [
    { label: 'Scheduled', value: '12', icon: Calendar, color: 'blue' },
    { label: 'Reminders', value: '8', icon: Bell, color: 'indigo' },
    { label: 'Pending Approvals', value: '3', icon: Edit, color: 'blue' },
    { label: 'Deadlines', value: '1', icon: Calendar, color: 'blue' },
  ];

  const filteredNotifications = MOCK_NOTIFICATIONS.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.target.toLowerCase().includes(search.toLowerCase())
  ).filter(n => filterType === 'all' || n.type === filterType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'bg-blue-100 text-blue-700';
      case 'approval': return 'bg-blue-100 text-blue-700';
      case 'deadline': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <DashboardLayout title="Automated Notifications" subtitle="Class reminders, pending approvals, deadlines and targeted messaging">
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
        <div className="bg-slate-50 p-1 rounded-xl border flex">
          <button onClick={() => setTab('scheduled')} className={`px-8 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${tab === 'scheduled' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            Scheduled (12)
          </button>
          <button onClick={() => setTab('history')} className={`px-8 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${tab === 'history' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            Sent History
          </button>
          <button onClick={() => setTab('templates')} className={`px-8 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${tab === 'templates' ? 'bg-purple-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            Templates
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications by title or target..."
              className="pl-12 pr-6 py-4 w-full bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500/20"
              aria-label="Search notifications"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20"
            aria-label="Filter by type"
          >
            <option value="all">All Types</option>
            <option value="reminder">Reminders</option>
            <option value="approval">Approvals</option>
            <option value="deadline">Deadlines</option>
          </select>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 shadow-lg">
            <Download className="inline mr-2 w-4 h-4" /> Export Logs
          </button>
        </div>

        {/* Notifications Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Notification</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Target</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Scheduled</th>
                <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-900 pr-0 max-w-md">
                    <div>{notification.title}</div>
                    <div className="text-sm text-slate-500 mt-1 line-clamp-2">{notification.message}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-900">{notification.target}</td>
                  <td className="px-6 py-5 text-sm font-mono text-slate-600">{notification.scheduled}</td>
                  <td className="px-6 py-5 text-right">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${notification.sent ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                      {notification.sent ? 'Sent' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all" title="Edit">
                      <Edit size={14} />
                    </button>
                    {!notification.sent && (
                      <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                        <Send size={12} className="inline mr-1" /> Send Now
                      </button>
                    )}
                    <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 hover:text-blue-600 transition-all" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredNotifications.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Bell className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <div className="text-lg font-semibold mb-2">No notifications</div>
                    <div className="text-sm">Create new scheduled notifications</div>
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

