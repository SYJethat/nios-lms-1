'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  ArrowRight, 
  Languages, 
  Sparkles, 
  CheckCircle2, 
  Search,
  BookOpen,
  Zap,
  Award,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 
  'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Sanskrit', 'Kashmiri', 'Konkani', 
  'Maithili', 'Manipuri', 'Nepali', 'Bodo', 'Santali', 'Dogri'
];

const MOCK_COURSES = [
  { id: 'L-001', name: 'Foundation of Communication', modules: 12, level: 'Beginner' },
  { id: 'L-002', name: 'Advanced Conversational Skills', modules: 18, level: 'Advanced' },
  { id: 'L-003', name: 'Business & Professional Usage', modules: 15, level: 'Intermediate' },
  { id: 'L-004', name: 'Classical Literature & Text', modules: 10, level: 'Advanced' },
];

export default function CourseSetupPage() {
  const [step, setStep] = useState(1);
  const [sourceLang, setSourceLang] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const filteredLanguages = LANGUAGES.filter(l => 
    l.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (step === 1 && sourceLang) setStep(2);
    else if (step === 2 && targetLang) setStep(3);
    else if (step === 3 && selectedCourse) setStep(4);
  };

  return (
    <DashboardLayout 
      title="Multilingual Learning Platform" 
      subtitle="Personalize your language journey"
    >
      <div className="max-w-6xl mx-auto min-h-[700px] flex flex-col">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 px-10">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${
                  step >= i ? 'bg-blue-700 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > i ? <CheckCircle2 size={20} /> : i}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${step >= i ? 'text-blue-700' : 'text-slate-400'}`}>
                  {i === 1 ? 'Source' : i === 2 ? 'Target' : i === 3 ? 'Course' : 'Confirm'}
                </span>
              </div>
              {i < 4 && <div className={`flex-1 h-0.5 mx-4 ${step > i ? 'bg-blue-700' : 'bg-slate-100'}`} />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Choose Your <span className="text-blue-700">Source Language</span></h2>
                <p className="text-slate-500 font-medium italic">Select the language you are most comfortable with</p>
              </div>

              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-4 focus:ring-blue-700/5 focus:border-blue-700 outline-none transition-all font-bold"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSourceLang(lang)}
                    className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 group ${
                      sourceLang === lang ? 'border-blue-700 bg-blue-50 shadow-lg' : 'border-slate-50 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      sourceLang === lang ? 'bg-blue-700 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-100'
                    }`}>
                      <Languages size={24} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest ${sourceLang === lang ? 'text-blue-700' : 'text-slate-500'}`}>
                      {lang}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Choose Your <span className="text-blue-700">Target Language</span></h2>
                <p className="text-slate-500 font-medium italic">Select the language you want to master</p>
              </div>

              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-4 focus:ring-blue-700/5 focus:border-blue-700 outline-none transition-all font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredLanguages.filter(l => l !== sourceLang).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setTargetLang(lang)}
                    className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center text-center gap-3 group relative overflow-hidden ${
                      targetLang === lang ? 'border-blue-700 bg-blue-50 shadow-lg' : 'border-slate-50 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      targetLang === lang ? 'bg-blue-700 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-100'
                    }`}>
                      <Globe size={18} />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Available Pathway</div>
                      <div className={`text-[11px] font-black uppercase tracking-tight leading-tight ${targetLang === lang ? 'text-blue-700' : 'text-slate-600'}`}>
                        📘 Learn {sourceLang} <span className="text-blue-900/40">→</span> {lang}
                      </div>
                    </div>
                    {targetLang === lang && (
                      <div className="absolute top-2 right-2">
                         <CheckCircle2 size={16} className="text-blue-700" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Select <span className="text-blue-700">Course Content</span></h2>
                <p className="text-slate-500 font-medium italic">Available curriculum for {sourceLang} → {targetLang}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {MOCK_COURSES.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-8 rounded-[40px] border-2 text-left transition-all relative overflow-hidden group ${
                      selectedCourse?.id === course.id ? 'border-blue-700 bg-blue-50 shadow-xl' : 'border-slate-100 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1 bg-slate-900 text-white text-[9px] font-black uppercase rounded-lg tracking-widest">{course.id}</span>
                      <span className={`px-4 py-1 text-[9px] font-black uppercase rounded-lg tracking-widest ${
                        course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' : 
                        course.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{course.name}</h4>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><BookOpen size={14} /> {course.modules} Modules</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-2"><Zap size={14} /> AI Optimized</span>
                    </div>
                    {selectedCourse?.id === course.id && (
                      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-700/5 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={40} className="text-blue-700 mr-4 mt-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center space-y-10 py-10"
            >
              <div className="w-24 h-24 bg-blue-700 text-white rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-blue-900/30">
                <Sparkles size={48} />
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ready to Start!</h2>
                <p className="text-slate-500 font-medium">Your personalized multilingual learning path is ready.</p>
              </div>

              <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl space-y-8 text-left">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Source Language</div>
                    <div className="text-xl font-bold text-blue-700">{sourceLang}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Language</div>
                    <div className="text-xl font-bold text-blue-700">{targetLang}</div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Selected Course</div>
                  <h4 className="text-2xl font-black text-slate-900">{selectedCourse?.name}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedCourse?.modules} Modules</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedCourse?.level} Curriculum</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/student/learn-language'}
                className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4"
              >
                Launch Learning Environment <ChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="mt-auto flex items-center justify-between pt-10 px-10">
            <button 
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="px-8 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-30"
            >
              Previous Step
            </button>
            <button 
              disabled={(step === 1 && !sourceLang) || (step === 2 && !targetLang) || (step === 3 && !selectedCourse)}
              onClick={handleNext}
              className="px-12 py-5 bg-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3 disabled:opacity-50"
            >
              {step === 3 ? 'Finalize Setup' : 'Continue'} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
