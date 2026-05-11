'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useMemo, useState } from 'react';
import { addTicket, useTickets } from '@/lib/ticket-store';
import { AlertTriangle, CheckCircle2, FileText, Search } from 'lucide-react';

export default function TeacherTicketsPage() {
  const { user } = useAuth();
  const tickets = useTickets();
  const [search, setSearch] = useState('');

  const isAllowed = user?.role === 'teacher' || user?.role === 'admin';
  const viewTickets = useMemo(() => {
    if (!search.trim()) return tickets;
    const q = search.toLowerCase();
    return tickets.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.topic.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.reportedByName.toLowerCase().includes(q)
    );
  }, [tickets, search]);

  if (!user || !isAllowed) return null;

  return (
    <DashboardLayout
      title="Tickets"
      subtitle="Student-raised issues (mock shared inbox)"
      // teacher + admin can both view
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex-1">Inbox</h3>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets..."
              className="pl-12 pr-6 py-4 w-72 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-900/20"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 uppercase tracking-tight">Student Ticket Flow</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shown for teacher/admin</div>
              </div>
            </div>
            <div className="text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
              {viewTickets.length} ticket(s)
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reported By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {viewTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-900 text-sm tracking-tight">{t.id}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest">{t.createdAt}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-bold text-slate-900">{t.topic}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest truncate max-w-[260px]">
                          {t.description}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{t.priority}</div>
                      </td>
                      <td className="px-4 py-4">
                        {t.status === 'resolved' ? (
                          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">
                            <CheckCircle2 size={14} /> resolved
                          </span>
                        ) : t.status === 'escalated' ? (
                          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-600 border border-blue-200">
                            <AlertTriangle size={14} /> escalated
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600">
                            open
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-bold text-slate-900">{t.reportedByName}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.reportedByRole}</div>
                      </td>
                    </tr>
                  ))}

                  {viewTickets.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-16 text-center text-slate-400">
                        No tickets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

