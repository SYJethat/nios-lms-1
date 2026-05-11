'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Plus, FileText, BookOpen, Zap, Shield, Download, Search, Clock, Users, Edit, Trash2, Eye, Upload, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_EXAMS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

const mockQuestions = [
  { id: 'q1', text: 'Newton\'s First Law is also called?', type: 'mcq', options: ['Law of Inertia', 'Law of Acceleration', 'Law of Action-Reaction'], correct: 0 },
  { id: 'q2', text: 'Define friction with example', type: 'subjective' },
];

export default function TeacherExamsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'exams' | 'questions' | 'quizzes'>('exams');
  const [search, setSearch] = useState('');

  if (!user || user.role !== 'teacher') return null;

  const filteredExams = MOCK_EXAMS.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) || e.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Exam Management" subtitle="Create exams, upload questions, generate question papers & setup proctoring">
      <div className="space-y-10">
        {/* Tabs & Quick Actions */}
        <div className="flex flex-wrap gap-3 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-100/50">
          <button onClick={() => setActiveTab('exams')} className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest ${activeTab === 'exams' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>
            Exams
          </button>
          <button onClick={() => setActiveTab('questions')} className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest ${activeTab === 'questions' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>
            Questions Bank
          </button>
          <button onClick={() => setActiveTab('quizzes')} className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest ${activeTab === 'quizzes' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>
            Quick Quizzes
          </button>
        </div>

        {/* Create Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <button className="group p-8 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-900 hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-900 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Plus size={24} />
            </div>
            <h3 className="font-black text-lg text-slate-900 text-center">New Exam</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">Full exam with question paper & proctoring</p>
          </button>
          <button className="group p-8 rounded-xl bg-white border-2 border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <BookOpen size={24} />
            </div>
            <h3 className="font-black text-lg text-slate-900 text-center">Upload Questions</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">Bulk upload MCQ/subjective questions</p>
          </button>
          <button className="group p-8 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Zap size={24} />
            </div>
            <h3 className="font-black text-lg text-slate-900 text-center">AI Quiz Gen</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">Auto-generate 20 questions from notes</p>
          </button>
        </div>

        {/* Exams List */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search exams by title or subject..."
                  className="w-full pl-12 pr-6 py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-900/20 focus:outline-none transition-all"
                />
              </div>
              <button className="px-8 py-4 flex gap-3 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-900 shadow-xl transition-all">
                Export All <Download size={16} />
              </button>
            </div>
            <div className="grid gap-6">
              {filteredExams.map((exam) => (
                <div key={exam.id} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900 hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-red-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                      <Shield size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl text-xs  uppercase ">{exam.subject}</span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-xl text-xs  uppercase ">{exam.type}</span>
                      </div>
                      <h3 className="text-xl text-slate-900 group-hover:text-blue-900 transition-colors mb-2">{exam.title}</h3>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} />
                          <span>{exam.students} Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye size={14} />
                          <span>Proctored: {exam.proctoring ? 'AI+Human' : 'Open'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-slate-100">
                      <Link href={`/teacher/exams/${exam.id}`} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-900 flex items-center gap-2 transition-all shadow-lg">
                        Edit Exam <ChevronRight size={14} />
                      </Link>
                      <button className="p-3 text-slate-400 hover:text-slate-900 rounded-xl transition-all hover:bg-slate-50">
                        <Download size={16} />
                      </button>
                      <button className="p-3 text-slate-400 hover:text-blue-500 rounded-xl transition-all hover:bg-blue-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-3 text-slate-400 hover:text-blue-500 rounded-xl transition-all hover:bg-blue-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === 'questions' && (
          <div className="p-12 text-center rounded-xl bg-gradient-to-br from-slate-50 to-white border-2 border-dashed border-slate-200">
            <FileText className="w-24 h-24 text-slate-300 mx-auto mb-8" />
            <h2 className="text-3xl font-black text-slate-900 mb-4">Questions Bank</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">Upload MCQs, subjective questions, or generate via AI. Organize by subject and difficulty.</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <span>Bulk CSV Upload</span>
              <span>AI Generation</span>
              <span>Difficulty Tags</span>
              <span>Export Bank</span>
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="p-12 text-center rounded-xl bg-gradient-to-br from-blue-50 to-red-100 border-2 border-dashed border-blue-200">
            <Zap className="w-24 h-24 text-blue-500 mx-auto mb-8" />
            <h2 className="text-3xl font-black text-slate-900 mb-4">Quick Quiz Generator</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">AI-powered quiz from SLM/notes. Instant question paper + answer key. Perfect for classwork/homework.</p>
            <button className="px-12 py-6 bg-blue-500 text-white rounded-xl font-black text-lg uppercase tracking-widest hover:bg-blue-600 shadow-2xl transition-all mx-auto">
              Generate Quiz Now
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

