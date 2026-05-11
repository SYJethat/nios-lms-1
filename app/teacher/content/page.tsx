'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
  PenTool, Sparkles, CheckCircle,
  BookOpen, Upload, Plus, UploadCloud,
  FileText, Image as ImageIcon,
  Save, Eye, Trash2, Edit
} from 'lucide-react';
import { useState } from 'react';
import { MOCK_COURSES, MOCK_BOOKS } from '@/lib/mock-data';

export default function TeacherContentPage() {
  const [activeTab, setActiveTab] = useState('course');
  const [courseForm, setCourseForm] = useState({
    title: '',
    subject: '',
    description: '',
    modules: 0
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    alert(`Course "${courseForm.title}" created!`);
    setCourseForm({ title: '', subject: '', description: '', modules: 0 });
  };

  const handleFileUpload = (e: any) => {
    const files = Array.from((e.target.files || e.dataTransfer.files) as FileList);
    const newFiles = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type.includes('pdf') ? 'PDF' : 'Book',
      uploaded: new Date().toLocaleTimeString()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const tabs = [
    { id: 'ai-tools', label: 'AI Tools', icon: Sparkles, count: 3 },
    { id: 'course', label: 'Create Course', icon: BookOpen, count: MOCK_COURSES.length },
    { id: 'upload', label: 'Upload Book/PDF', icon: UploadCloud, count: uploadedFiles.length },
    { id: 'my-content', label: 'My Content', icon: Eye, count: MOCK_COURSES.length + MOCK_BOOKS.length }
  ];

  return (
    <DashboardLayout
      title="Content Creation Studio"
      subtitle="Build courses, upload textbooks & PDFs for your students"
    >
      <div className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100 shadow-sm">
        {/* Tabs */}
        <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-slate-100/50 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex-1 relative ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-900 to-red-500 text-white shadow-xl' : 'text-slate-500 hover:text-slate-900 hover:bg-white/70'
                }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {tab.count > 0 && <span className="ml-auto px-2 py-px bg-white/30 text-xs rounded-full">{tab.count}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'ai-tools' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer" onClick={() => alert('Quiz Generator')}>
              <Sparkles className="w-12 h-12 text-blue-500 group-hover:rotate-12 transition-transform mb-4 mx-auto" />
              <h3 className="font-black text-lg text-slate-900 mb-2 text-center">Quiz Generator</h3>
              <p className="text-sm text-slate-500 text-center mb-6">Upload notes/SLM → Instant 20-question quiz with answers</p>
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all">Create Quiz</button>
            </div>
            <div className="group p-8 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer" onClick={() => alert('Proofreading AI')}>
              <CheckCircle className="w-12 h-12 text-emerald-500 group-hover:scale-110 transition-transform mb-4 mx-auto" />
              <h3 className="font-black text-lg text-slate-900 mb-2 text-center">Proofreading AI</h3>
              <p className="text-sm text-slate-500 text-center mb-6">Grammar, readability (Flesch score), Indian English compliance</p>
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all">Check Content</button>
            </div>
            <div className="group p-8 rounded-xl border border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all cursor-pointer" onClick={() => alert('Accessibility Audit')}>
              <Sparkles className="w-12 h-12 text-purple-500 group-hover:rotate-[-15deg] transition-transform mb-4 mx-auto" />
              <h3 className="font-black text-lg text-slate-900 mb-2 text-center">Accessibility</h3>
              <p className="text-sm text-slate-500 text-center mb-6">WCAG 2.1, ISL subtitles, 22-language readability scores</p>
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-purple-600 transition-all">Audit Content</button>
            </div>
          </div>
        )}

        {activeTab === 'course' && (
          <div>
            <form onSubmit={handleCourseSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-black uppercase tracking-wider text-slate-500 mb-2">Course Title</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-900/20 focus:border-transparent"
                  placeholder="e.g. Advanced Physics for Class 12"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-slate-500 mb-2">Subject</label>
                  <select
                    value={courseForm.subject}
                    onChange={(e) => setCourseForm({ ...courseForm, subject: e.target.value })}
                    className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-900/20"
                  >
                    <option value="">Select Subject</option>
                    <option>Physics</option>
                    <option>Mathematics</option>
                    <option>English</option>
                    <option>History</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-slate-500 mb-2"># of Modules</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={courseForm.modules}
                    onChange={(e) => setCourseForm({ ...courseForm, modules: Number(e.target.value) })}
                    className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-900/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-wider text-slate-500 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-900/20 resize-vertical"
                  placeholder="Brief course overview..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-900 to-red-500 text-white rounded-xl  text-md uppercase tracking-widest shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.02] transition-all"
              >
                <Plus size={20} className="inline mr-2" /> Publish New Course
              </button>
            </form>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-8">
            <div
              className="relative border-4 border-dashed border-slate-200 rounded-3xl p-20 text-center hover:border-blue-900 hover:bg-blue-50/50 transition-all cursor-pointer group"
              onDrop={handleFileUpload}
              onDragOver={(e) => e.preventDefault()}
            >
              <UploadCloud size={64} className="mx-auto mb-6 text-slate-400 group-hover:text-blue-900 transition-colors" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">Drop PDF or Book Files Here</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Drag & drop PDFs, EPUBs, or textbooks. Up to 50MB per file.</p>
              <input
                type="file"
                multiple
                accept=".pdf,.epub"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                <Upload size={16} /> Or Click to Browse
              </div>
            </div>
            {uploadedFiles.length > 0 && (
              <div>
                <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <FileText size={20} /> Recently Uploaded ({uploadedFiles.length})
                </h4>
                <div className="space-y-3">
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-xl flex items-center justify-center">
                          {file.type === 'PDF' ? 'PDF' : 'EPUB'}
                        </div>
                        <div>
                          <div className="font-black text-slate-900 truncate max-w-xs">{file.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{file.type} • {file.uploaded}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                          <Eye size={16} className="text-slate-600" />
                        </button>
                        <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                          <Edit size={16} className="text-slate-600" />
                        </button>
                        <button className="p-2 hover:bg-blue-100 text-blue-500 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-content' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...MOCK_COURSES, ...MOCK_BOOKS].map((item, i) => (
              <div key={i} className="group p-6 rounded-xl bg-white border border-slate-100 hover:shadow-xl hover:border-blue-900 transition-all overflow-hidden">
                <div className="w-full h-32 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg mb-4 flex items-center justify-center text-white font-black text-lg">
                  {/* <BookOpen size={32} /> */}
                  <div className=' w-full bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg mb-4 flex items-center justify-center'>
                    <img src="/book.jpg" alt="" className='w-40' />
                  </div>

                </div>
                <h4 className="font-black text-slate-900 mb-2 line-clamp-1">{item.title}</h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{item.description || "Explore smart, engaging books powered for the digital age. With simplified explanations, interactive concepts, and learner-friendly design, our books make studying easier, faster, and more effective. "}</p>
                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2 px-3 bg-emerald-500 text-white rounded-lg font-black text-xs uppercase tracking-wider hover:bg-emerald-600" title="View Content">
                    View
                  </button>
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors" title="Edit">
                    <Edit size={14} />
                  </button>
                  <button className="p-2 bg-slate-100 hover:bg-blue-100 text-blue-500 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
