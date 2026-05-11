'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import {
  BookOpen,
  Video,
  CheckCircle2,
  XCircle,
  Archive,
  Eye,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_COURSES, MOCK_TEACHERS } from '@/lib/mock-data';

export default function AdminContentPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending_review' | 'published' | 'archived'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');

  if (!user || user.role !== 'admin') return null;

  const stats = [
    { label: 'Total Courses', value: '642', icon: BookOpen, color: 'purple' },
    { label: 'Published', value: '589', icon: CheckCircle2, color: 'emerald' },
    { label: 'Pending Review', value: '24', icon: Video, color: 'blue' },
    { label: 'Archived', value: '29', icon: Archive, color: 'slate' },
  ];

  const filteredCourses = MOCK_COURSES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase()) ||
    c.subject.toLowerCase().includes(search.toLowerCase())
  ).filter(c => filterStatus === 'all' || c.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-100 text-emerald-700';
      case 'pending_review': return 'bg-blue-100 text-blue-700 animate-pulse';
      case 'archived': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <DashboardLayout title="Content Oversight" subtitle="Approve, reject or archive uploaded courses - read-only preview">
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
        <div className="bg-slate-50 p-1 rounded-xl border">
          <button onClick={() => setActiveTab('all')} className={`px-6 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            All Content
          </button>
          <button onClick={() => setActiveTab('pending')} className={`px-6 py-3 rounded-lg font-black uppercase tracking-widest flex-1 text-xs transition-all ${activeTab === 'pending' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            Needs Review
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, teachers or subjects..."
              className="pl-12 pr-6 py-4 w-full bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-purple-500/20"
              aria-label="Search courses"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500/20 text-sm font-medium"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="pending_review">Pending Review</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 shadow-lg whitespace-nowrap">
            <Download className="inline mr-2 w-4 h-4" /> Export List
          </button>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Course Module</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Subject / Level</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Faculty</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Lessons</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
{filteredCourses.map((course, index) => {
                  const mockStatus = ['published', 'pending_review', 'archived'][index % 3];
                  return (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                            <Video size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 line-clamp-1">{course.title}</div>
                            <div className="text-xs text-slate-500">{course.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm">
                        <span className="block font-medium text-slate-900">{course.subject}</span>
                        <span className="text-xs text-slate-500">{course.level}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-medium text-slate-900">{course.teacher}</div>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm font-bold text-slate-900">{course.lessons || 0} · {course.duration || 'N/A'}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(mockStatus)}`}>
                          {mockStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right space-x-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all inline-flex items-center gap-1 text-xs" title="Preview (Read-Only)">
                          <Eye size={14} /> Preview
                        </button>
                        {mockStatus === 'pending_review' && (
                          <>
                            <button className="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                              <CheckCircle2 size={12} className="inline mr-1" /> Approve
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                              <XCircle size={12} className="inline mr-1" /> Reject
                            </button>
                          </>
                        )}
                        {mockStatus === 'published' && (
                          <button className="px-4 py-2 bg-slate-500 text-white hover:bg-slate-600 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all">
                            <Archive size={12} className="inline mr-1" /> Archive
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <div className="text-lg font-semibold mb-2">No courses found</div>
                      <div className="text-sm">Try adjusting your search or filter</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

