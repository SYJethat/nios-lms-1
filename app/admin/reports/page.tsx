'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  BarChart3,
  Download,
  Search,
  Filter,
  Calendar,
  FileText,
  PieChart,
  TrendingUp,
  Users,
  BookOpen,
  Activity,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

import { MOCK_REVENUE } from '@/lib/mock-data';

const reportTabs = [
  { id: 'learners', label: 'Learners', count: '2,684' },
  { id: 'teachers', label: 'Teachers', count: '156' },
  { id: 'revenue', label: 'Revenue', count: '₹48.6L' },
  { id: 'content', label: 'Content Performance', count: '642' },
];

const reports = [
  {
    id: 'R001',
    title: 'Monthly Enrollment Report',
    category: 'Admissions',
    date: '2026-03-31',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: 'R002',
    title: 'Course Completion Analytics',
    category: 'Academic',
    date: '2026-03-28',
    size: '5.8 MB',
    format: 'XLSX'
  },
  {
    id: 'R003',
    title: 'Platform Security Audit Log',
    category: 'Security',
    date: '2026-03-25',
    size: '12.1 MB',
    format: 'CSV'
  },
  {
    id: 'R004',
    title: 'Teacher Engagement Metrics',
    category: 'Faculty',
    date: '2026-03-20',
    size: '1.2 MB',
    format: 'PDF'
  },
];

export default function AdminReportsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'learners' | 'teachers' | 'revenue' | 'content'>('learners');

  if (!user) return null;

  return (
    <DashboardLayout
      title="System Intelligence & Reports"
      subtitle="Comprehensive platform analytics, audit exports, and regulatory compliance logs"
    >
      <div className="space-y-10 animate-fade-in pb-20">

        {/* Analytics Headline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-12 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />

            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
                <TrendingUp size={32} />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                  SDG 4 & NEP 2020 Alignment
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                  Platform analytics show <span className="text-blue-500 font-bold">18.5% YoY closer alignment</span>
                  with NCF standards. Regional analytics indicate peak equity growth.
                </p>
              </div>

              <div className="flex-1" />

              <button className="px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl z-10">
                View Policy Scorecard
              </button>
            </div>
          </div>

          <div className="p-10 rounded-2xl bg-slate-900 text-white flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />

            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 shadow-inner">
                <ShieldCheck size={20} />
              </div>
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-full">
                Compliance Active
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-black text-white uppercase tracking-widest">Regulatory Export</div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">
                Automated platform auditing for Ministry of Education standards.
              </p>
            </div>
          </div>
        </div>

        {/* Report Tabs */}
        <div className="flex bg-white/70 backdrop-blur p-1.5 rounded-2xl border border-slate-100 mb-8">
          {reportTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white shadow-lg'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              {tab.label}
              <span className="ml-2 text-[10px] opacity-75">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'learners' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <h4 className="text-lg font-black text-slate-900 mb-4">Learner Analytics</h4>
              <div className="space-y-4 text-sm">
                <div>Active Learners: <span className="font-bold">2,684</span> <span className="text-emerald-600 font-bold">+12%</span></div>
                <div>Completion Rate: <span className="font-bold">78%</span> <span className="text-blue-600 font-bold">▼2%</span></div>
                <div>Engagement Score: <span className="font-bold">4.2/5</span></div>
              </div>
              <button className="mt-8 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-xs tracking-wider transition-all">
                Download Learner Report
              </button>
            </div>
            {/* Add more learner cards here if needed */}
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <h4 className="text-lg font-black text-slate-900 mb-4">Faculty Performance</h4>
              <div className="space-y-4 text-sm">
                <div>Active Faculty: <span className="font-bold">156</span> <span className="text-emerald-600 font-bold">+8</span></div>
                <div>Avg Classes/Week: <span className="font-bold">14.2</span></div>
                <div>Content Uploads: <span className="font-bold">2,340</span></div>
              </div>
              <button className="mt-8 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase text-xs tracking-wider transition-all">
                Faculty Metrics Report
              </button>
            </div>
            {/* Add more teacher cards here */}
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="grid gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <h4 className="text-lg font-black text-slate-900 mb-6">Revenue Dashboard</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {MOCK_REVENUE.slice(0, 2).map((r) => (
                  <div key={r.id} className="p-6 rounded-2xl bg-white border shadow-sm">
                    <div className="text-3xl font-black text-purple-600">
                      ₹{r.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{r.period}</div>
                    <div className={`text-sm font-bold mt-2 ${r.growth > 0 ? 'text-emerald-600' : 'text-blue-600'}`}>
                      {r.growth > 0 ? '↑' : ''}{r.growth}% from last month
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black uppercase text-xs tracking-wider transition-all">
                Download Revenue Summary (PDF)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-red-50 border border-blue-100">
              <h4 className="text-lg font-black text-slate-900 mb-4">Content Performance</h4>
              <div className="space-y-4 text-sm">
                <div>Published Modules: <span className="font-bold">642</span></div>
                <div>Average Rating: <span className="font-bold">4.7/5</span></div>
                <div>Completion Rate: <span className="font-bold">76%</span></div>
              </div>
              <button className="mt-8 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-xs tracking-wider transition-all">
                View Content Analytics
              </button>
            </div>
            {/* Add more content cards here */}
          </div>
        )}

        {/* Exportable Datasets */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between px-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Exportable Datasets</h3>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-72"
                  placeholder="Search reports..."
                />
              </div>
              <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {reports.map((r) => (
              <div
                key={r.id}
                className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all flex flex-col lg:flex-row items-center gap-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <FileText size={28} />
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                    {r.category} • {r.format}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {r.title}
                  </h4>
                  <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {r.date}</span>
                    <span className="flex items-center gap-1"><Download size={14} /> {r.size}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2">
                    Download <Download size={16} />
                  </button>
                  <button className="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Engagement */}
        <div className="p-12 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <Globe size={28} />
                <h3 className="text-2xl font-black uppercase tracking-tight">Geographic Engagement</h3>
              </div>
              <p className="text-slate-600 leading-relaxed max-w-2xl">
                Visualize the impact of NIOS nationwide. Real-time heatmaps show learner activity,
                resource demand, and regional performance trends.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Delhi', 'Maharashtra', 'Uttar Pradesh', 'Kerala', 'Karnataka'].map((region) => (
                  <span
                    key={region}
                    className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black text-slate-500 uppercase tracking-widest"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80 h-56 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-400">
              <PieChart size={48} className="opacity-30" />
              <span className="text-xs font-black uppercase tracking-widest">Interactive Map Preview</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}