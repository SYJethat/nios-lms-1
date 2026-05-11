'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Headphones,
  HelpCircle,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import dynamic from 'next/dynamic';
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

import { addTicket, useTickets } from '@/lib/ticket-store';

type TicketPriority = 'Low' | 'Medium' | 'High';
type TicketStatus = 'open' | 'escalated' | 'resolved';

const formatTime = () =>
  new Date().toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function AISupportTicketsPage() {
  const { user } = useAuth();

  const tickets = useTickets();

  const [topic, setTopic] = useState('Academic Query');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('Medium');

  const canSubmit = description.trim().length >= 10;

  const handleRaiseTicket = () => {
    if (!canSubmit || !user) return;

    const sla =
      priority === 'High' ? '14m left' : priority === 'Medium' ? '3h 10m left' : '21h left';

    const status: TicketStatus = priority === 'High' ? 'escalated' : 'open';

    addTicket({
      topic,
      description: description.trim(),
      priority,
      status,
      sla,
      reportedByName: user.name ?? 'Learner',
      reportedByRole: 'Learner',
    });

    setDescription('');
    setPriority('Medium');
    setTopic('Academic Query');
  };

  const stats = useMemo(() => {
    const open = tickets.filter((t) => t.status === 'open').length;
    const escalated = tickets.filter((t) => t.status === 'escalated').length;
    const resolved = tickets.filter((t) => t.status === 'resolved').length;
    return { open, escalated, resolved };
  }, [tickets]);

  if (!user) return null;

  return (
    <DashboardLayout title="AI Support" subtitle="Raise a ticket for issue resolution (mock workflow)">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Ticket creation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Open</div>
              <div className="text-3xl font-black text-slate-900 mt-2">{stats.open}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SLA ticking</div>
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escalated</div>
              <div className="text-3xl font-black text-slate-900 mt-2">{stats.escalated}</div>
              <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Priority review</div>
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolved</div>
              <div className="text-3xl font-black text-slate-900 mt-2">{stats.resolved}</div>
              <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Closed tickets</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase tracking-tight">Raise a separate Ticket</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dedicated resolution workflow</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                <Clock size={14} className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">SLA enabled</span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic</div>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900/20 transition-all"
                  >
                    <option>Academic Query</option>
                    <option>Live Class Access</option>
                    <option>Assessments</option>
                    <option>Course Content Issue</option>
                    <option>Account / Profile</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</div>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TicketPriority)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900/20 transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
              </div>

              <label className="space-y-2 block">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900/20 transition-all resize-none"
                  placeholder="Explain the issue with steps you tried, expected outcome, and any error message."
                />
                <div className="flex items-center justify-between">
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${canSubmit ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {canSubmit ? 'Ready to submit' : 'Min 10 characters'}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{description.trim().length}/200</div>
                </div>
              </label>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setDescription('');
                    setPriority('Medium');
                    setTopic('Academic Query');
                  }}
                  className="px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={handleRaiseTicket}
                  disabled={!canSubmit}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${
                    canSubmit ? 'bg-blue-900 text-white hover:bg-blue-700 active:scale-[0.99]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Submit Ticket
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-[12px] font-medium">
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-700" />
                  AI assistant here is for triage suggestions. Actual resolution is ticket-based.
                </span>
              </div>
            </div>
          </div>

          {/* Ticket list */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase tracking-tight">Your Tickets</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mock shared inbox</div>
                </div>
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
                      <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">SLA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-900 text-sm tracking-tight">{t.id}</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-widest">{t.createdAt}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-bold text-slate-900">{t.topic}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest truncate max-w-[260px]">{t.description}</div>
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
                        <td className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">{t.sla}</td>
                      </tr>
                    ))}

                    {tickets.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-16 text-center text-slate-400">
                          No tickets yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <Headphones size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 uppercase tracking-tight">AI Triage</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optional assistant</div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <MessageSquare size={18} className="text-blue-700 mt-1" />
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tip</div>
                  <div className="text-xs font-medium text-slate-700 mt-1">
                    Use the assistant to draft a precise ticket description. Submit ticket separately.
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-bold text-slate-500 leading-relaxed">
                <span className="inline-flex items-center gap-2">
                  <HelpCircle size={14} className="text-slate-400" />
                  Resolution stays ticket-based (this page).
                </span>
              </div>
            </div>
          </div>

          {/* Keep existing global chat widget (separate from ticket) */}
          <div className="hidden lg:block">
            <Chatbot />
          </div>
        </div>
      </div>

      {/* mobile assistant floating button */}
      <div className="lg:hidden">
        <Chatbot />
      </div>
    </DashboardLayout>
  );
}

