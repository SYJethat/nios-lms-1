'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Plus, Send, MessageCircle, Megaphone, Users, Calendar, Edit3, Trash2, Clock, Eye, Download, Search } from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

export default function TeacherAnnouncementsPage() {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '', target: 'All Students' });
  const [search, setSearch] = useState('');

  if (!user || user.role !== 'teacher') return null;

  const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.message.toLowerCase().includes(search.toLowerCase())
  );

  const targets = ['All Students', 'Class 10', 'Class 12', 'Science Stream', 'Mathematics'];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock create
    console.log('Creating announcement:', newAnnouncement);
    setIsCreating(false);
    setNewAnnouncement({ title: '', message: '', target: 'All Students' });
  };

  return (
    <DashboardLayout title="Announcements" subtitle="Instant notifications to students, classes, or streams. Track delivery & engagement">
      <div className="space-y-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-xl bg-white border-2 border-slate-200 shadow-lg text-center">
            <Megaphone className="w-16 h-16 text-emerald-500 bg-emerald-200 rounded-full p-4 mx-auto mb-4" />
            <div className="text-3xl font-black text-emerald-600 mb-2">247</div>
            <div className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Total Sent</div>
          </div>
          <div className="p-8 rounded-xl bg-white border-2 border-slate-200 shadow-lg text-center">
            <Eye className="w-16 h-16 text-blue-500 mx-auto mb-4 p-4 rounded-full bg-blue-200" />
            <div className="text-3xl font-black text-blue-600 mb-2">89%</div>
            <div className="text-sm font-bold text-blue-700 uppercase tracking-wider">Avg Read Rate</div>
          </div>
          <div className="p-8 rounded-xl bg-white border-2 border-slate-200 shadow-lg text-center">
            <Users className="w-16 h-16 text-blue-500 rounded-full p-4 bg-blue-200 mx-auto mb-4" />
            <div className="text-3xl font-black text-blue-600 mb-2">1,284</div>
            <div className="text-sm font-bold text-blue-700 uppercase tracking-wider">Reach</div>
          </div>
          <div className="p-8 rounded-xl bg-white border-2 border-slate-200 shadow-lg text-center">
            <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-4 p-4 rounded-full bg-purple-200" />
            <div className="text-3xl font-black text-purple-600 mb-2">23</div>
            <div className="text-sm font-bold text-purple-700 uppercase tracking-wider">Replies</div>
          </div>
        </div>

        {/* Create Announcement */}
        <div className=" ">
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-xl  text-md uppercase tracking-widest hover:from-blue-900 hover:to-red-500 transition-all shadow-2xl mb-6 hover:shadow-blue-500/25"
          >
            <Plus size={24} />
            Create New Announcement
          </button>

          {isCreating && (
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="e.g. Midterm Exam Rescheduled to April 15"
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-200 rounded-xl text-lg font-semibold focus:ring-4 focus:ring-blue-900/30 focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Message</label>
                <textarea
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  placeholder="Type your message here. Use @mentions for students or #hashtags for topics. Supports formatting."
                  rows={6}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-200 rounded-xl text-lg leading-relaxed focus:ring-4 focus:ring-blue-900/30 focus:border-transparent transition-all shadow-sm resize-vertical"
                  required
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Target Audience</label>
                  <select
                    value={newAnnouncement.target}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: e.target.value })}
                    className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-200 rounded-xl font-semibold focus:ring-4 focus:ring-blue-900/30 focus:border-transparent transition-all shadow-sm"
                  >
                    {targets.map(target => (
                      <option key={target} value={target}>{target}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="flex h-16 mt-8  px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-black text-md
                   uppercase   transition-all whitespace-nowrap items-center justify-center gap-3 "
                >
                  <Send size={24} />
                  Send to {newAnnouncement.target}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex-1">Recent Announcements</h3>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search announcements..."
                className="pl-12 pr-6 py-4 w-72 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-900/20"
              />
            </div>
          </div>
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-red-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-900 transition-colors">{announcement.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span>Sent to: <span className="font-bold text-slate-900">{announcement.target}</span></span>
                        <span>{announcement.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2 lg:pt-0 lg:pl-8 lg:border-l border-slate-100">
                    <div className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                      <Eye size={14} />
                      {announcement.readCount} views
                    </div>
                    <button className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                      <Trash2 size={16} />
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg whitespace-nowrap">
                      Resend
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">{announcement.message}</p>
              </div>
            ))}
            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-24 text-slate-400">
                <Megaphone className="w-24 h-24 mx-auto mb-8 opacity-30" />
                <h3 className="text-2xl font-black text-slate-500 mb-2">No announcements found</h3>
                <p className="max-w-md mx-auto">Create your first announcement or adjust your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

