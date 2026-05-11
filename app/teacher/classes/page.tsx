'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
  Plus,
  Video,
  Clock,
  Calendar,
  Users,
  Monitor,
  Settings,
  Zap,
  BarChart3,
  MoreVertical,
  ChevronRight,
  Eye,
  Edit2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const classes = [
  {
    id: 'C1',
    title: 'Advanced Physics: Quantum Basics',
    stream: 'Science',
    time: '10:00 AM - 11:30 AM',
    status: 'Upcoming',
    students: 42,
    type: 'Live Session'
  },
  {
    id: 'C2',
    title: 'Modern Mathematics: Algebra II',
    stream: 'Science',
    time: '02:00 PM - 03:30 PM',
    status: 'Scheduled',
    students: 38,
    type: 'Recorded Review'
  },
  {
    id: 'C3',
    title: 'English Literature: The Indian Renaissance',
    stream: 'Arts',
    time: '04:00 PM - 05:30 PM',
    status: 'Scheduled',
    students: 24,
    type: 'Discussion Panel'
  }
];

export default function TeacherClassesPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout
      title="Classroom Console"
      subtitle="Manage your upcoming live sessions, recordings, and classroom resources"
    >
      <div className="space-y-10 animate-fade-in">
        {/* Quick Actions & Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="px-8 py-5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center gap-3">
              <Plus size={18} /> Schedule New Class
            </button>
            <div className="h-10 w-px bg-blue-900 hidden md:block" />
            <div className="flex items-center bg-slate-100 rounded-2xl gap-2">
              {['Today', 'This Week', 'Archives'].map((f) => (
                <button key={f} className="px-4   py-2 text-[10px] cursor-pointer  border-r-2 font-black rounded-xl border-slate-400 text-black uppercase tracking-widest hover:text-slate-900 transition-colors">{f}</button>
              ))}
            </div>
          </div>
          <button className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-400 hover:text-slate-900 transition-all">
            <Settings size={18} />
          </button>
        </div>

        {/* Classes Feed */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Upcoming Schedule</h3>
          <div className="grid gap-6">
            {classes.map((cls) => (
              <div key={cls.id} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col lg:flex-row items-center gap-10">
                <div className="w-20 h-20 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <Video size={32} />
                </div>

                <div className="flex-1 text-center lg:text-left min-w-0">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{cls.stream} · {cls.type}</div>
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-900 transition-colors mb-4">{cls.title}</h4>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                      <Clock className="text-slate-300" size={14} /> {cls.time}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                      <Users className="text-slate-300" size={14} /> {cls.students} Learners Enrolled
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                      <Zap className="text-emerald-500" size={14} /> High Engagement
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-8 px-10 border-x border-slate-50 hidden lg:flex">
                  <div className="text-center">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest text-center">Status</div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${cls.status === 'Upcoming' ? 'text-blue-500 underline decoration-2' : 'text-emerald-500'
                      }`}>{cls.status}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl active:scale-95 flex items-center gap-2">
                    Start Session <ChevronRight size={14} />
                  </button>
                  <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources & Insights */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-3 mb-8 text-blue-900">
              <BarChart3 size={24} />
              <h3 className="font-black uppercase tracking-tight">Attendance Analysis</h3>
            </div>
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
              Your average class attendance has increased by 12% following the introduction of interactive simulations.
            </p>
            <button className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-blue-900 pb-1 hover:text-blue-900 transition-colors">Generate Reports</button>
          </div>

          <div className="p-10 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-3 mb-8">
              <Monitor size={24} className="text-blue-900" />
              <h3 className="font-black uppercase tracking-tight text-white">Resource Vault</h3>
            </div>
            <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">
              Manage all learning materials, slides, and shared files across all your active and archived classes.
            </p>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Upload Materials</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
