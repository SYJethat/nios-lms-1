'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
  Clock,
  Target,
  Brain,
  TrendingUp,
  BarChart3,
  Download,
  Zap,
  ArrowUpRight,
  PieChart,
  Activity,
  Award,
  Layers,
  FileSearch,
  Dna,
  History as TimeHistory,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const analyticsStats = [
  { label: 'Avg. Engagement', value: '62.5h', change: '+12%', up: true, icon: Clock, color: 'from-blue-500 to-indigo-600' },
  { label: 'Syllabus Coverage', value: '74%', change: 'On Track', up: true, icon: Target, color: 'from-emerald-500 to-teal-600' },
  { label: 'Course Mastery', value: 'Lvl 4', change: 'Advanced', up: true, icon: Brain, color: 'from-purple-500 to-pink-600' },
  { label: 'Avg. Assessment', value: '82%', change: '+5%', up: true, icon: Award, color: 'from-blue-500 to-red-600' },
];

const performanceData = [
  { subject: 'Science', score: 88, progress: 92, status: 'Excellence' },
  { subject: 'Maths', score: 72, progress: 65, status: 'Needs Focus' },
  { subject: 'English', score: 94, progress: 98, status: 'Mastery' },
  { subject: 'Social', score: 65, progress: 40, status: 'Under-prepared' },
];

const weeklyActivity = [
  { day: 'Mon', hours: 4.5 },
  { day: 'Tue', hours: 6.2 },
  { day: 'Wed', hours: 3.8 },
  { day: 'Thu', hours: 5.5 },
  { day: 'Fri', hours: 4.0 },
  { day: 'Sat', hours: 7.2 },
  { day: 'Sun', hours: 2.5 },
];

export default function AnalyticsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout
      title="Intelligence & Analytics"
      subtitle="Comprehensive insights into academic performance and growth trajectories"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {analyticsStats.map((s, i) => (
          <div key={i} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-4 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
              <s.icon size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{s.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase">
              <TrendingUp size={12} /> {s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          {/* Weekly Engagement Chart */}
          {/* Weekly Focus Hours - Cleaner & More Beautiful Version */}
          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-blue-500 to-rose-500 text-white flex items-center justify-center shadow-inner">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Weekly Focus Hours</h3>
                  <p className="text-xs text-slate-400 font-medium">Last 7 days • Total study time</p>
                </div>
              </div>

              <div className="flex gap-2 text-xs">
                <button className="px-5 py-2 bg-blue-500 text-white font-black rounded-xl shadow-sm hover:bg-blue-600 transition-all active:scale-95">
                  7 Days
                </button>
                <button className="px-5 py-2 bg-slate-100 text-slate-500 font-black rounded-xl hover:bg-slate-200 transition-all">
                  30 Days
                </button>
              </div>
            </div>

            <div className="relative h-[380px] mt-4">
              <svg className="w-full h-full" viewBox="0 0 700 380" preserveAspectRatio="none">
                <defs>
                  {/* Smooth gradient for line */}
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>

                  {/* Soft area gradient */}
                  <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Subtle grid */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <line
                    key={`grid-h-${i}`}
                    x1="40"
                    y1={340 - i * 40}
                    x2="660"
                    y2={340 - i * 40}
                    stroke="#f8fafc"
                    strokeWidth="1"
                  />
                ))}

                {/* X-axis labels (days) - positioned at bottom */}
                {weeklyActivity.map((d, i) => (
                  <text
                    key={`day-${i}`}
                    x={60 + i * 90}
                    y="365"
                    textAnchor="middle"
                    className="text-[11px] font-black text-slate-400 fill-current tracking-widest"
                  >
                    {d.day}
                  </text>
                ))}

                {/* Y-axis labels */}
                {[0, 2, 4, 6, 8].map((h, i) => (
                  <text
                    key={`y-${i}`}
                    x="28"
                    y={340 - (h / 8) * 280 + 5}
                    textAnchor="end"
                    className="text-[10px] font-black text-slate-400 fill-current"
                  >
                    {h}h
                  </text>
                ))}

                {/* Area under the curve */}
                <path
                  d={`M 60 340 
            ${weeklyActivity
                      .map((d, i) => `L ${60 + i * 90} ${340 - (d.hours / 8) * 280}`)
                      .join(' ')} 
            L 660 340 Z`}
                  fill="url(#areaGrad)"
                  className="transition-all duration-1000"
                />

                {/* Main line - smooth curve */}
                <path
                  d={`M ${weeklyActivity
                    .map((d, i) => `${60 + i * 90} ${340 - (d.hours / 8) * 280}`)
                    .join(' L ')}`}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  className="transition-all duration-1000 group-hover:stroke-[6]"
                />

                {/* Data points with hover effect */}
                {weeklyActivity.map((d, i) => {
                  const x = 60 + i * 90;
                  const y = 340 - (d.hours / 8) * 280;

                  return (
                    <g key={i}>
                      {/* Larger invisible hover area */}
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={(e) => {
                          const tooltip = (e.target as SVGCircleElement).parentElement?.querySelector('.tooltip') as HTMLElement;
                          if (tooltip) {
                            tooltip.style.opacity = '1';
                            tooltip.style.transform = 'translate(-50%, -120%)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const tooltip = (e.target as SVGCircleElement).parentElement?.querySelector('.tooltip') as HTMLElement;
                          if (tooltip) {
                            tooltip.style.opacity = '0';
                            tooltip.style.transform = 'translate(-50%, -100%)';
                          }
                        }}
                      />

                      {/* Visible dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r="6.5"
                        fill={d.hours > 5.5 ? '#10b981' : '#f97316'}
                        stroke="white"
                        strokeWidth="3"
                        className="transition-all duration-300 hover:scale-125"
                      />

                      {/* Tooltip */}
                      <foreignObject x={x - 45} y={y - 75} width="90" height="50" className="tooltip opacity-0 transition-all pointer-events-none">
                        <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-xl text-center whitespace-nowrap">
                          {d.day} • {d.hours} hours
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Summary stats */}
            <div className="flex justify-between mt-8 text-xs font-black text-slate-500 tracking-widest uppercase">
              <div>
                Total: <span className="text-slate-900">{weeklyActivity.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h</span>
              </div>
              <div>
                Daily Avg: <span className="text-slate-900">{(weeklyActivity.reduce((sum, d) => sum + d.hours, 0) / 7).toFixed(1)}h</span>
              </div>
              <div className="text-emerald-600">Peak: Sat ({Math.max(...weeklyActivity.map(d => d.hours))}h)</div>
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-white  border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Subject Proficiency</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Score</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {performanceData.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-6 font-black text-slate-900">{p.subject}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-black text-xs border-4 ${p.score >= 80 ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-blue-500 text-blue-600 bg-blue-50'
                        }`}>
                        {p.score}%
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[100px]">
                          <div
                            className="h-full bg-blue-900 rounded-full transition-all duration-1000"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-900">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${p.status === 'Excellence' || p.status === 'Mastery' ? 'text-emerald-500' : 'text-blue-500'
                        }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phase 2: Detailed Exam Analytics */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl group">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TimeHistory size={20} />
                </div>
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Time Distribution</h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Reading Content', value: '42%', color: 'bg-blue-400' },
                  { label: 'Answering MCQs', value: '28%', color: 'bg-emerald-400' },
                  { label: 'Subjective Drafts', value: '18%', color: 'bg-purple-400' },
                  { label: 'Skipped/Review', value: '12%', color: 'bg-slate-300' },
                ].map((t, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest mb-2 text-slate-400 group-hover:text-slate-900 transition-colors">
                      <span>{t.label}</span>
                      <span>{t.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full ${t.color} rounded-full transition-all duration-1000`} style={{ width: t.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl group">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layers size={20} />
                </div>
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Difficulty Analysis</h3>
              </div>
              <div className="flex items-end justify-center gap-4 h-48 pt-8">
                {[
                  { level: 'Easy', h: '90%', color: 'bg-emerald-400' },
                  { level: 'Medium', h: '65%', color: 'bg-blue-400' },
                  { level: 'Hard', h: '42%', color: 'bg-blue-400' },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full bg-slate-50 rounded-xl relative overflow-hidden h-[120px]">
                      <div className={`absolute bottom-0 left-0 right-0 ${d.color} transition-all duration-1000`} style={{ height: d.h }} />
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{d.level}</span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-6 text-center">Efficiency: 88% accuracy on medium questions</p>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-900/20 flex items-center justify-center text-blue-900">
                <Activity size={20} />
              </div>
              <h3 className="font-black uppercase tracking-tight">AI Predictions</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Success Probability</div>
                <div className="flex items-center justify-center p-8 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
                  <div className="text-6xl font-black text-white relative z-10">84%</div>
                </div>
              </div>
              <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                "Focusing on Social Science module 2 could boost your grade by 12%."
              </p>
              <button className="w-full py-4 bg-blue-900 hover:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Optimize Study Plan
              </button>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            <h3 className="font-black uppercase tracking-tight mb-8 text-slate-900">Skills Mapping</h3>
            <div className="space-y-6">
              {[
                { skill: 'Critical Thinking', lvl: 75, color: 'bg-blue-500' },
                { skill: 'Digital Literacy', lvl: 92, color: 'bg-emerald-500' },
                { skill: 'Problem Solving', lvl: 60, color: 'bg-blue-500' },
                { skill: 'Communication', lvl: 45, color: 'bg-purple-500' },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-900">{s.skill}</span>
                    <span className="text-slate-400">{s.lvl}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.lvl}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 hover:text-white   transition-all text-center">
              Career Roadmap
            </button>
          </div>

          <div className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-indigo-100 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <Dna className="mx-auto mb-6 text-blue-500 opacity-50 group-hover:rotate-45 transition-transform" size={40} />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2 text-center">NEP-360 Report Card</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 leading-relaxed text-center">Holistic progress mapping beyond just grades</p>

            <div className="space-y-2 mb-8">
              {['Competency Based', 'Skill Tracking', 'AI Peer Review'].map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-[8px] font-black text-slate-600 uppercase">
                  <div className="w-1 h-1 bg-slate-500 rounded-full" /> {tag}
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
