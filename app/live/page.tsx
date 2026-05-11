'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microscope,
  Video,
  MapPin,
  Users,
  RefreshCw,
  Calendar,
  Mail,
  FileText,
  HelpCircle,
  Play,
  Scroll,
  Clock,
  Zap,
  MoreVertical,
  ChevronRight,
  Monitor,
  Sparkles,
  Columns,
  Layers,
  MousePointer2,
  PenTool,
  Eraser,
  MessageSquare,
  BarChart2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const schedule = [
  { id: '1', date: '2026-04-11', time: '11:00 AM', event: 'Science: Motion (Live)', teacher: 'Dr. V. Mehta', status: 'Live Now', platform: 'Google Meet', live: true, joinLink: 'https://meet.google.com/abc-defg' },
  { id: '2', date: '2026-04-11', time: '09:00 AM', event: 'Mathematics: Algebra II (Live)', teacher: 'Ms. S. Verma', status: 'Completed', platform: 'Zoom', joinLink: '#' },
  { id: '3', date: '2026-04-15', time: '02:00 PM', event: 'English: Grammar & Composition', teacher: 'Mr. R. Iyer', status: 'Upcoming', platform: 'MS Teams', joinLink: 'https://teams.microsoft.com/xyz' },
  { id: '4', date: '2026-04-18', time: '04:00 PM', event: 'Digital Literacy Workshop', teacher: 'NIOS Official', status: 'Upcoming', platform: 'YouTube', joinLink: 'https://youtube.com/live/123' },
];

const MOCK_EVENTS = [
  { id: 'EV1', date: '2026-04-12', title: 'Physics Lab Demo', time: '10:00 AM', platform: 'Zoom' },
  { id: 'EV2', date: '2026-04-20', title: 'Math Problem Solving', time: '02:00 PM', platform: 'Google Meet' },
];

export default function LiveClassesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All Classes');
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', platform: '' });
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [showPoll, setShowPoll] = useState(false);

  if (!user) return null;

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const allEvents = [...schedule, ...MOCK_EVENTS];

  const eventsOnDate = (date: Date): any[] => {
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendarDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 text-xs text-slate-200 rounded-xl cursor-default">
          &nbsp;
        </div>
      );
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
      const isToday = currentDay.toDateString() === new Date().toDateString();
      const dayEvents = eventsOnDate(currentDay);
      const isSelected = selectedDate && currentDay.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDate(currentDay);
            setShowEventModal(true);
          }}
          title={`Select ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${dayEvents.length} events`}
          className={`p-3 text-sm font-black rounded-xl transition-all hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-900/50 relative group ${isSelected
            ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/30'
            : isToday
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : dayEvents.length > 0
                ? 'text-blue-900 border-2 border-blue-900/30 hover:border-blue-900'
                : 'text-slate-900 hover:bg-slate-50'
            }`}
        >
          {day}
          {dayEvents.length > 0 && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform" />
          )}
        </button>
      );
    }

    return days;
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, save to backend/localStorage
    console.log('New event added:', newEvent);
    setShowAddEventModal(false);
    setNewEvent({ title: '', time: '', platform: '' });
  };

  return (
    <DashboardLayout
      title="Live Virtual Classroom"
      subtitle="Synchronized interactive sessions with national faculty and peers"
    >
      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && selectedDate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900">
                  Events on {selectedDate.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all"
                  title="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-8">
                {eventsOnDate(selectedDate).length > 0 ? (
                  eventsOnDate(selectedDate).map((event) => (
                    <div key={event.id} className="group p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-900/50 transition-all">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-900/10 border-2 border-blue-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Clock className="w-6 h-6 text-blue-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-slate-900 text-lg group-hover:text-blue-900 truncate">{event.event || event.title}</h4>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest">
                          {event.platform}
                        </span>
                        <span className="text-slate-500">{event.teacher}</span>
                      </div>
                      {event.status && (
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status === 'Live Now' ? 'bg-blue-100 text-blue-700' :
                          event.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                          {event.status}
                        </span>
                      )}
                      {event.joinLink && event.joinLink !== '#' && (
                        <button
                          onClick={() => window.open(event.joinLink, '_blank')}
                          className="w-full mt-4 py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                        >
                          Join Session Now
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="font-black text-sm uppercase tracking-widest">No events scheduled</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddEventModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddEventModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900">Add New Event</h3>
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all"
                  title="Close"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-black text-slate-900 mb-2 uppercase tracking-widest text-[10px]">Event Title</label>
                  <input
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full p-4 border border-slate-200 rounded-xl font-black text-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    placeholder="e.g. Physics Lab Demo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-900 mb-2 uppercase tracking-widest text-[10px]">Time</label>
                  <input
                    required
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full p-4 border border-slate-200 rounded-xl font-black focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-900 mb-2 uppercase tracking-widest text-[10px]">Platform</label>
                  <select
                    required
                    value={newEvent.platform}
                    onChange={(e) => setNewEvent({ ...newEvent, platform: e.target.value })}
                    className="w-full p-4 border border-slate-200 rounded-xl font-black focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  >
                    <option value="">Select Platform</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="MS Teams">MS Teams</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black text-lg uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                >
                  Create Event
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start animate-fade-in pb-20">

        {/* Main Feed */}
        <div className="space-y-10">
          {/* Featured Live Now */}
          <div className="p-12 rounded-xl bg-blue-50 border border-slate-200 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="absolute -bottom-20 -right-20 opacity-5 group-hover:opacity-10 transition-opacity">
              <Microscope size={320} className="text-blue-800" />
            </div>

            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  Streaming Live Now
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Started 15 mins ago</div>
              </div>

              <h2 className="text-4xl lg:text-5xl font-black text-blue-800 tracking-tighter max-w-2xl leading-none">
                Science: Advanced NewtonsLaws of Motion
              </h2>

              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center font-black text-blue-800">V</div>
                  <div className="text-left">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Instructor</div>
                    <div className="text-sm font-black text-blue-800">Dr. Vikram Mehta</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Participants</div>
                    <div className="text-sm font-black text-blue-800 flex items-center gap-2">
                      <Users size={14} className="text-blue-800" /> 1,240+
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Platform</div>
                    <div className="text-sm font-black text-emerald-400 flex items-center gap-2">
                      <Monitor size={14} /> Google Meet
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsInteractiveMode(!isInteractiveMode)}
                  className="px-10 py-5 bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-3"
                >
                  <Video size={18} /> {isInteractiveMode ? 'Exit Interactive Mode' : 'Enter Interactive Room'}
                </button>
                <button className="px-10 py-5 bg-white border border-slate-200 text-blue-800 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-slate-50">
                  View Syllabus
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isInteractiveMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-8"
              >
                {/* Phase 3: Interactive Whiteboard & Breakout Tools */}
                <div className="grid lg:grid-cols-[1fr_280px] gap-8">
                  {/* Virtual Whiteboard */}
                  <div className="bg-white border-2 border-slate-100 rounded-xl p-8 shadow-inner min-h-[400px] relative overflow-hidden flex flex-col">
                    <div className="absolute top-4 left-4 flex gap-2">
                      {[MousePointer2, PenTool, Eraser, Layers].map((Icon, i) => (
                        <button key={i} className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-900 hover:text-white rounded-xl transition-all">
                          <Icon size={18} />
                        </button>
                      ))}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-500 rounded-xl text-[8px] font-black uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Shablue Canvas Active
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20 pointer-events-none">
                      <MousePointer2 size={64} className="mb-4 text-slate-300" />
                      <p className="text-sm font-black uppercase tracking-widest">Collaborative Whiteboard</p>
                    </div>
                    <div className="flex justify-center gap-4 pt-6 mt-auto border-t border-slate-50">
                      <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-blue-900 transition-all">Download Frame</button>
                      <button className="px-6 py-3 bg-slate-100 text-slate-400 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Clear Canvas</button>
                    </div>
                  </div>

                  {/* Breakout Rooms Sidebar */}
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-900 rounded-xl text-white">
                      <div className="flex items-center gap-2 mb-6">
                        <Columns size={16} className="text-blue-900" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Breakout Rooms</h4>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'Room Alpha', members: 12, status: 'In Session' },
                          { name: 'Room Beta', members: 8, status: 'Inactive' },
                          { name: 'Room Gamma', members: 15, status: 'In Session' },
                        ].map((room, i) => (
                          <button key={i} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-between transition-all group">
                            <div className="text-left">
                              <div className="text-[10px] font-black text-white">{room.name}</div>
                              <div className="text-[8px] font-black text-slate-500 uppercase">{room.members} Students</div>
                            </div>
                            <div className={`w-1.5 h-1.5 rounded-full ${room.status === 'In Session' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                          </button>
                        ))}
                      </div>
                      <button className="w-full mt-6 py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">Assign Peer Groups</button>
                    </div>

                    {/* Real-time Poll CTA */}
                    <div className="p-6 bg-white border border-slate-100 rounded-xl group cursor-pointer hover:border-blue-900/20 transition-all" onClick={() => setShowPoll(!showPoll)}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                          <BarChart2 size={18} />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Active Poll</h4>
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-snug">Teacher has started a new poll: "Understanding of Newtons2nd Law"</p>
                    </div>
                  </div>
                </div>

                {/* Poll Overlay Mockup */}
                <AnimatePresence>
                  {showPoll && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="fixed bottom-12 right-12 z-50 w-80 p-8 bg-white border-2 border-slate-100 rounded-xl shadow-2xl"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Class Poll</h4>
                        <button onClick={() => setShowPoll(false)} className="text-slate-300 hover:text-slate-900 transition-colors">×</button>
                      </div>
                      <p className="font-black text-slate-900 mb-6">How confident are you with today's simulation?</p>
                      <div className="space-y-3">
                        {['Very Confident', 'Need more practice', 'Not understood'].map((opt, i) => (
                          <button key={i} className="w-full p-4 bg-slate-50 hover:bg-blue-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-left">
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Schedule Filter & List */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Daily Timeline</h3>
              <div className="flex gap-2">
                {['All Classes', 'Scientific', 'Humanities'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${activeTab === t ? 'text-blue-900 bg-blue-50' : 'text-slate-400 hover:text-slate-900'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {schedule.map((item) => {
                const eventDate = new Date(item.date);
                return (
                  <div key={item.id} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col lg:flex-row items-center gap-10 cursor-pointer" onClick={() => {
                    setSelectedDate(eventDate);
                    setShowEventModal(true);
                  }}>
                    <div className="w-16 h-16 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                      <Clock size={24} />
                    </div>

                    <div className="flex-1 text-center lg:text-left min-w-0">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.time} · {item.platform}</div>
                      <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors truncate">{item.event}</h4>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Faculty: {item.teacher}</div>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Live Now' ? 'bg-blue-50 text-blue-500' : item.status === 'Completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'
                        }`}>
                        {item.status}
                      </span>
                      <button
                        title={(item.status === 'Completed' ? 'View Recording' : 'Join Room')}
                        className="px-8 py-4 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all shadow-sm flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.joinLink !== '#') window.open(item.joinLink, '_blank');
                        }}
                      >
                        {item.status === 'Completed' ? 'Recording' : 'Join Room'} <ChevronRight size={14} />
                      </button>
                      <button title="More options" className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-8">
          {/* Reality Calendar - Fully Functional */}
          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                  title="Previous Month"
                  className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-900 hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  title="Today"
                  className="px-4 py-2 bg-blue-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                  title="Next Month"
                  className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-900 hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <div key={d} className="text-[10px] font-black text-slate-300 uppercase py-2">{d}</div>
              ))}
              {renderCalendarDays(currentDate)}
            </div>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="w-full mt-6 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl"
            >
              + Add New Event
            </button>
          </div>

          <div className='p-8 rounded-xl bg-blue-100 text-black relative  overflow-hidden group'>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className=" flex items-center gap-4 mb-8">
              <Sparkles className="text-blue-900" size={20} />
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">AI Tutor</h4>
            </div>
            {/* <div className="flex items-center gap-4 mb-8">
               <Link href="/ai-tutor" className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Connect AI Tutor</Link>
            </div> */}
          </div>
          {/* Sync & Tools */}
          <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-4 mb-8">
              <Sparkles className="text-blue-900" size={20} />
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Faculty Resources</h4>
            </div>
            <div className="space-y-3">
              {[
                { icon: <FileText className="w-4 h-4" />, label: 'Session Notes' },
                { icon: <Play className="w-4 h-4" />, label: 'Archive Hub' },
                { icon: <HelpCircle className="w-4 h-4" />, label: 'Submit Q&A' },
                { icon: <Scroll className="w-4 h-4" />, label: 'Attendance' },
                { icon: <Columns className="w-4 h-4" />, label: 'Breakouts' },
              ].map((tool, i) => (
                <button key={i} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-3 transition-all group">
                  <div className="text-blue-900 group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Support */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm text-center">
            <Mail className="w-10 h-10 mx-auto mb-4 text-blue-500 opacity-50" />
            <h4 className="text-sm font-black text-slate-900 mb-2">Technical Issues?</h4>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed mb-6">Connect with our support team for platform streaming assistance.</p>
            <button className="w-full py-4 bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
              Contact Helpdesk
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
