'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { AlertCircle, Bell, CheckCircle2, Clock, Filter, Archive } from 'lucide-react';
import { MOCK_PARENT_ALERTS } from '@/lib/mock-data';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ParentAlerts() {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState<'All' | 'Urgent' | 'Important' | 'Info'>('All');

  if (!user) return null;

  const filteredAlerts = filterType === 'All'
    ? MOCK_PARENT_ALERTS
    : MOCK_PARENT_ALERTS.filter(alert => alert.type === filterType);

  const markAsRead = (id: string) => {
    // Mock read status update
    console.log(`Mark read: ${id}`);
  };

  return (
    <DashboardLayout
      title="Guardian Alerts"
      subtitle="Real-time notifications from faculty and administration"
    >
      <div className="space-y-12 pb-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
              <Bell className="text-blue-500" size={36} />
              Alerts & Notifications
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
              {MOCK_PARENT_ALERTS.filter(a => !a.read).length} unread • Stay informed about academic progress and important dates
            </p>
          </div>
          <div className="flex gap-3">
            <select
              className="px-6 py-4 bg-white border border-slate-100 rounded-xl shadow-sm font-black text-[10px] uppercase tracking-widest text-slate-700 focus:ring-blue-900 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              aria-label="Filter alerts by type"
            >
              <option>All</option>
              <option>Urgent</option>
              <option>Important</option>
              <option>Info</option>
            </select>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-xl shadow-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
              <Archive size={16} /> Archive All
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`group p-8 rounded-xl border-2 transition-all ${alert.read
              ? 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
              : 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-slate-50 shadow-sm border-opacity-100 shadow-blue-200/50'
              }`}>
              <div className="flex items-start gap-6">
                <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 transition-all ${alert.read ? 'bg-slate-300' : 'bg-blue-500 animate-pulse'
                  }`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${alert.type === 'Urgent' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      alert.type === 'Important' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                      {alert.type}
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-auto">
                      {alert.date}
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">{alert.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{alert.message}</p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => markAsRead(alert.id)}
                      className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-blue-900 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 size={14} /> Mark Read
                    </button>
                  </div>
                </div>

                {!alert.read && (
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 ml-4">
                    <AlertCircle size={24} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
              <Bell className="w-20 h-20 text-slate-300 mx-auto mb-6 opacity-50" />
              <h3 className="text-xl font-black text-slate-500 mb-2">No alerts match your filter</h3>
              <p className="text-slate-400 font-medium text-sm max-w-md mx-auto">
                Adjust the filter above or check back later for faculty updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

