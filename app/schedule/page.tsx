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
  Zap,
  CalendarCheck,
  Bell,
  Sparkles
} from 'lucide-react';
import { MOCK_EVENTS, MOCK_USERS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

export default function SchedulePage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Enriched events for realistic NIOS schedule
  const allEvents = (MOCK_EVENTS && MOCK_EVENTS.length > 0 ? MOCK_EVENTS : [
    {
      id: 'evt-1',
      title: 'Mathematics Live PCP Doubt Clearing Session',
      time: '10:00 AM',
      endTime: '11:30 AM',
      date: '2026-04-15',
      platform: 'Virtual Studio Lab',
      type: 'Class',
      isLive: true
    },
    {
      id: 'evt-2',
      title: 'Tutor Marked Assignment (TMA) Submission Deadline',
      time: '05:00 PM',
      endTime: '06:00 PM',
      date: '2026-04-18',
      platform: 'Portal Upload',
      type: 'Exam',
      isLive: false
    },
    {
      id: 'evt-3',
      title: 'Science & Tech Practical Laboratory Induction',
      time: '02:00 PM',
      endTime: '04:00 PM',
      date: '2026-04-20',
      platform: 'Study Center AI 270104',
      type: 'Class',
      isLive: false
    },
    {
      id: 'evt-4',
      title: 'Bilingual Language Lab Pronunciation Masterclass',
      time: '11:00 AM',
      endTime: '12:30 PM',
      date: '2026-04-22',
      platform: '22-Lang Lab',
      type: 'Class',
      isLive: true
    }
  ]).map(event => ({
    ...event,
    date: event.date || '2026-04-15'
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
      days.push(<div key={`prev-${i}`} className="aspect-square border-r border-b border-slate-100 bg-slate-50/50" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = eventsOnDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDate(date);
            setShowEventModal(true);
          }}
          className={`p-2 min-h-[85px] border-r border-b border-slate-100 hover:bg-blue-50/60 transition-all text-left flex flex-col justify-between group cursor-pointer ${isSelected
              ? 'bg-blue-50/80 ring-2 ring-blue-600 ring-inset'
              : isToday
                ? 'bg-amber-50/60'
                : 'bg-white'
            }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className={`text-xs font-bold rounded-md px-1.5 py-0.5 ${isToday
                ? 'bg-amber-500 text-white font-extrabold'
                : isSelected
                  ? 'bg-blue-900 text-white font-extrabold'
                  : 'text-slate-700 group-hover:text-blue-900'
              }`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full">
                {dayEvents.length}
              </span>
            )}
          </div>

          {dayEvents.length > 0 ? (
            <div className="mt-1 space-y-1 w-full">
              {dayEvents.slice(0, 2).map((ev) => (
                <div
                  key={ev.id}
                  className="text-[10px] truncate font-medium px-1.5 py-0.5 rounded bg-blue-100/70 text-blue-900 border border-blue-200/50"
                  title={ev.title}
                >
                  {ev.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <p className="text-[9px] text-blue-700 font-bold">+{dayEvents.length - 2} more</p>
              )}
            </div>
          ) : (
            <span className="text-[10px] text-slate-300 group-hover:text-slate-400">No events</span>
          )}
        </button>
      );
    }
    return days;
  };

  const handleExportICS = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\n${allEvents.map(e =>
      `BEGIN:VEVENT\nSUMMARY:${e.title}\nDTSTART:20260415T100000\nEND:VEVENT`
    ).join('\n')}\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nios-academic-schedule.ics';
    a.click();
  };

  return (
    <DashboardLayout
      title="Academic Schedule & Calendar"
      subtitle="Synchronized live classes, TMA submission deadlines, and ODE examination slots"
    >
      {/* Event Details Modal */}
      <AnimatePresence>
        {showEventModal && selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-900">
                    NIOS Timetable
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                </div>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {eventsOnDate(selectedDate).length > 0 ? (
                  eventsOnDate(selectedDate).map(event => (
                    <div key={event.id} className="p-5 border border-slate-200 bg-slate-50/50 rounded-xl hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl flex-shrink-0 ${event.type === 'Class' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'Exam' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                          <Clock size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                              {event.type}
                            </span>
                            {event.isLive && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700 animate-pulse">
                                LIVE
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-base text-slate-900 mb-1">{event.title}</h4>
                          <p className="text-xs text-slate-500 mb-2 font-medium">
                            {event.time} {event.endTime && `– ${event.endTime}`}
                          </p>
                          {event.platform && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold">
                              <MapPin size={12} className="text-blue-600" /> {event.platform}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200 flex gap-2">
                        <button
                          onClick={() => alert(`Connecting to ${event.title}...`)}
                          className="flex-1 py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <Video size={14} /> Join Session
                        </button>
                        <button
                          onClick={() => alert(`Added ${event.title} to your personal alerts.`)}
                          className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
                        >
                          <Bell size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <CalendarDays className="w-10 h-10 mx-auto mb-2 text-slate-400" />
                    <p className="font-bold text-slate-700 text-sm">No Events Scheduled</p>
                    <p className="text-xs text-slate-500 mt-1">There are no mandatory sessions or deadlines on this date.</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"
                >
                  + Add Custom Reminder
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Close
                </button>
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-1">Add Academic Reminder</h3>
              <p className="text-xs text-slate-500 mb-6">Schedule personal study hours, tutor meetings, or revision sessions.</p>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Session Type</label>
                  <select className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900">
                    <option>Personal Study / Revision</option>
                    <option>PCP Doubt Session</option>
                    <option>TMA Preparation</option>
                    <option>Mock Exam Simulation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Title</label>
                  <input className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="e.g., Mathematics Algebra Practice" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Date</label>
                    <input type="date" defaultValue="2026-04-16" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Time</label>
                    <input type="time" defaultValue="14:00" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Reminder scheduled and added to your calendar!');
                      setShowAddModal(false);
                    }}
                    className="flex-1 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-900/20"
                  >
                    Create Reminder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 sm:p-6 max-w-8xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          {/* Left Sidebar - Quick Planning & Agenda */}
          <div className="space-y-6 flex flex-col">
            {/* Quick Actions (Light Style) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-blue-900">
                  Quick Actions
                </span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Academic Planning</h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Schedule Study Session
                </button>
                <button
                  onClick={handleExportICS}
                  className="w-full py-3 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download size={16} className="text-blue-900" /> Export Calendar (.ICS)
                </button>
              </div>
            </div>

            {/* Upcoming Events Agenda Feed */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Upcoming Milestones
                </h3>
                <span className="text-xs text-blue-900 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  {upcomingEvents.length} Sessions
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedDate(new Date(event.date!));
                      setShowEventModal(true);
                    }}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer relative"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                        {event.type}
                      </span>
                      {event.isLive && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[9px] font-black uppercase rounded-full animate-pulse border border-red-200">
                          LIVE
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                      {event.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" /> {event.platform || 'Online'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Interactive Calendar Grid (Light Style) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            {/* Calendar Controls */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    title="Previous Month"
                    className="p-2 hover:bg-white rounded-lg transition-all text-slate-600 hover:text-blue-900 shadow-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    title="Next Month"
                    className="p-2 hover:bg-white rounded-lg transition-all text-slate-600 hover:text-blue-900 shadow-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                  {['Month', 'Week', 'Day'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v.toLowerCase() as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === v.toLowerCase()
                          ? 'bg-blue-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Today
                </button>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 w-36 sm:w-44"
                  />
                  <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-x-auto">
              {view === 'month' && (
                <div>
                  <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <div key={d} className="py-2.5 text-center text-xs font-bold text-slate-600 border-r border-slate-200 last:border-r-0">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {renderMonthDays()}
                  </div>
                </div>
              )}

              {view === 'week' && (
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-7 gap-3">
                  {Array.from({ length: 7 }, (_, i) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i - 3);
                    const dayEvents = eventsOnDate(date);
                    return (
                      <div
                        key={i}
                        className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white transition-all cursor-pointer hover:shadow-md"
                        onClick={() => {
                          setSelectedDate(date);
                          setShowEventModal(true);
                        }}
                      >
                        <div className="text-xs font-bold text-slate-700 mb-2">
                          {date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="space-y-1.5">
                          {dayEvents.length > 0 ? (
                            dayEvents.map(e => (
                              <div key={e.id} className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs font-bold text-blue-950 truncate">
                                {e.title}
                              </div>
                            ))
                          ) : (
                            <p className="text-[11px] text-slate-400">No events</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {view === 'day' && (
                <div className="p-6 space-y-4">
                  <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">Showing scheduled lectures and assessments for today</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {eventsOnDate(selectedDate || currentDate).map(e => (
                      <div key={e.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
                            <Clock size={18} />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {e.type}
                            </span>
                            <h4 className="font-bold text-slate-900 mt-1">{e.title}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{e.time} • {e.platform}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => alert(`Opening ${e.title}`)}
                          className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-xs transition-colors"
                        >
                          Join Session
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
