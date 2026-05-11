'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  Video,
  BookOpen,
  MapPin,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  Menu,
  Filter,
  Search,
  Plus,
  Download,
  MoreVertical,
  Zap
} from 'lucide-react';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

export default function SchedulePage() {
  const { user } = useAuth();
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const allEvents = MOCK_EVENTS.map(event => ({
    ...event,
    date: event.date || '2026-04-15' // Mock dates for demo
  })).filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.platform?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const eventsOnDate = (date: Date) => allEvents.filter(e => new Date(e.date).toDateString() === date.toDateString());
  const upcomingEvents = allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);

  const renderMonthDays = () => {
    const days = [];
    const firstDay = firstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`prev-${i}`} className="aspect-square border-r border-b border-slate-50" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = eventsOnDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={` p-2 border-r border-b border-slate-50 hover:bg-blue-50 transition-all group cursor-pointer relative flex flex-col ${isToday ? 'bg-blue-100 ring-2 ring-blue-300' : dayEvents.length ? 'bg-blue-50 hover:bg-blue-100' : ''
            }`}
        >
          <span className={`text-xs font-black text-center ${isToday ? 'text-blue-600' : dayEvents.length ? 'text-blue-600' : 'text-slate-500'}`}>
            {day}
          </span>
          {dayEvents.length > 0 && (
            <div className="mt-auto w-full h-1.5 bg-gradient-to-r from-blue-400 to-red-400 rounded-t-full mt-1 shadow-sm" />
          )}
        </button>
      );
    }
    return days;
  };

  const handleExportICS = () => {
    const icsContent = `BEGIN:VCALENDAR\\nVERSION:2.0\\n${allEvents.map(e =>
      `BEGIN:VEVENT\\nSUMMARY:${e.title}\\nDTSTART:20260415T100000\\nEND:VEVENT`
    ).join('\\n')}\\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nios-schedule.ics';
    a.click();
  };

  if (!user) return null;

  return (
    <DashboardLayout
      title="Academic Schedule"
      subtitle="Synchronized calendar for classes, exams, and milestones"
    >
      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <h3 className="text-xl font-black text-slate-900">
                  {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100"
                  title="Close"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                {eventsOnDate(selectedDate).length > 0 ? eventsOnDate(selectedDate).map(event => (
                  <div key={event.id} className="p-6 border rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${event.type === 'Class' ? 'bg-blue-100 text-blue-700' :
                        event.type === 'Exam' ? 'bg-blue-100 text-blue-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                        <Clock size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-lg text-slate-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-slate-500 mb-2">{event.time} {event.endTime && `- ${event.endTime}`}</p>
                        {event.platform && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest">
                            <MapPin size={12} /> {event.platform}
                          </span>
                        )}
                      </div>
                    </div>
                    {event.platform === 'Zoom' && (
                      <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-red-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:from-blue-600 hover:to-red-700 shadow-lg transition-all">
                        Join Zoom Meeting
                      </button>
                    )}
                  </div>
                )) : (
                  <div className="text-center py-12 text-slate-400">
                    <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-black uppercase tracking-widest">No events scheduled</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl border"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-6">Schedule New Event</h3>
              <div className="space-y-4">
                <select className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900">
                  <option>Class</option>
                  <option>Exam</option>
                  <option>Submission</option>
                </select>
                <input className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900" placeholder="Title" />
                <input type="time" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900" />
                <select className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900">
                  <option>Zoom</option>
                  <option>Google Meet</option>
                </select>
                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-sm tracking-widest hover:bg-slate-800">Cancel</button>
                  <button className="flex-1 py-4 bg-emerald-500 text-white rounded-xl font-black uppercase text-sm tracking-widest hover:bg-emerald-600 shadow-lg">Create</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid lg:grid-cols-[380px_1fr] gap-8 h-[calc(100vh-210px)] max-h-[900px]">
        {/* Left Sidebar - Upcoming & Filters */}
        <div className="space-y-8 flex flex-col overflow-hidden">
          {/* Quick Actions */}
          <div className="p-8 rounded-xl  bg-slate-900 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <h3 className="text-lg font-black uppercase tracking-tight mb-6">Planning</h3>
            <div className="space-y-3">
              <button className="w-full py-4 bg-blue-900 hover:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2">
                <Plus size={16} /> Schedule Class
              </button>
              <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                <Download size={16} /> Export (ICS)
              </button>
            </div>
          </div>

          {/* Upcoming Events Feed */}
          <div className="flex-1 p-8 rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-8">Agenda Feed</h3>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="group p-5 rounded-xl bg-slate-50 hover:bg-white hover:shadow-xl hover:ring-1 hover:ring-slate-100 transition-all cursor-pointer relative overflow-hidden" onClick={() => setSelectedDate(new Date(event.date!))}>
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${event.type === 'Class' ? 'bg-blue-500' : event.type === 'Exam' ? 'bg-blue-500' : 'bg-blue-500'
                    }`} />
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.type}</div>
                    {event.isLive && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase rounded-full animate-pulse border border-blue-100">LIVE</span>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 group-hover:text-blue-900 transition-colors">{event.title}</h4>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                    <div className="flex items-center gap-1.5"><Clock size={12} /> {event.time}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={12} /> {event.platform || 'Campus'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Interactive Calendar Grid */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          {/* Calendar Header */}
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  title="Previous Month"
                  className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-blue-900 shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  title="Next Month"
                  className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-blue-900 shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="h-6 w-px bg-slate-100" />
              <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-xl">
                {['Month', 'Week', 'Day'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v.toLowerCase() as any)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${view === v.toLowerCase() ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    title={`Switch to ${v} view`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="py-2 px-2 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase w-32 hover:bg-emerald-600 
                   transition-all shadow-lg shadow-emerald-500/20 flex items-center "
              >
                <Plus size={16} /> Schedule Class
              </button>
              <button
                onClick={handleExportICS}
                className="px-2 w-32 py-2 bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                <Download size={16} /> Export ICS
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                title="Go to Today"
                className="px-2 py-2 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg"
              >
                Today
              </button>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-blue-900 focus:border-transparent w-48 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-7 border-b border-slate-50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 last:border-r-0">
                  {d}
                </div>
              ))}
            </div>
            {view === 'month' ? (
              <div className="grid grid-cols-7 h-full">
                {renderMonthDays()}
              </div>
            ) : view === 'week' ? (
              <div className="grid grid-cols-7 gap-4 p-6 h-full items-start">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i - 3);
                  const dayEvents = eventsOnDate(date);
                  return (
                    <div key={i} className="flex-1 min-h-[200px] p-4 border rounded-xl bg-slate-50 hover:bg-white transition-all cursor-pointer group" onClick={() => setSelectedDate(date)}>
                      <div className="text-xs font-black text-slate-500 mb-3 uppercase">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                      <div className="space-y-2">
                        {dayEvents.slice(0, 2).map(e => (
                          <div key={e.id} className="p-2 bg-white rounded-xl text-xs font-bold text-slate-900 truncate shadow-sm">{e.title}</div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-slate-400">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                  <div className="text-sm text-slate-500 uppercase tracking-widest">Day View</div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {eventsOnDate(selectedDate || currentDate).map(e => (
                    <div key={e.id} className="p-6 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl shadow-lg hover:shadow-xl transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-xl ${e.type === 'Class' ? 'bg-blue-200' : e.type === 'Exam' ? 'bg-blue-200' : 'bg-blue-200'
                          }`}>
                          <Clock size={16} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{e.title}</h4>
                          <p className="text-sm text-slate-500">{e.time} - {e.platform}</p>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-white border-2 border-slate-200 rounded-xl font-black text-sm uppercase tracking-widest hover:border-blue-900 hover:bg-blue-900/5 transition-all">
                        Join/View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
