'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import AICallInterface from '@/components/AICallInterface';
import {
  Send,
  Sparkles,
  Brain,
  Lightbulb,
  MessageSquare,
  Mic,
  Paperclip,
  History,
  Zap,
  ArrowRight,
  FileText,
  Video as VideoIcon,
  Phone,
  HelpCircle,
  Upload,
  BarChart,
  FileCode,
  User
} from 'lucide-react';

import type { ChatMessage } from '@/lib/mock-chat-data';
import { mockChatHistory, quickSuggestions } from '@/lib/mock-chat-data';
import { MOCK_COURSES, MOCK_ASSESSMENTS } from '@/lib/mock-data';

export default function AITutorPage() {
  const { user } = useAuth();
  const [input, setInput] = useState(''); // Note: was already here, keeping for context
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  if (!user) return null;

  const suggestions = quickSuggestions.map((title, i) => ({
    title,
    sub: MOCK_COURSES[i % MOCK_COURSES.length]?.subject || 'NIOS Curriculum',
    icon: [Lightbulb, Zap, Brain][i % 3],
    color: ['text-blue-500 bg-blue-50', 'text-purple-500 bg-purple-50', 'text-emerald-500 bg-emerald-50'][i % 3]
  }));

  const aiResponses = [
    "Great question! Based on NIOS Class 12 Physics syllabus, here's a detailed explanation with solved examples from your SLM.",
    "Perfect! Here's a custom 10-question TMA practice quiz with answers and reference links to your course materials.",
    "📚 **Recommended Study Plan:** Week 1: Theory + 20 problems. Use HC Verma Ch1-3. Your next mock test is in 7 days.",
    "✅ Your essay structure is good. Improve thesis statement and add 2 more NIOS-specific examples. Score: 8/10.",
    "Based on MOCK_ASSESSMENTS, you have 2 pending quizzes. Want me to generate practice questions from Unit 1-2?"
  ];

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Fake AI response delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '/ai-avatar.png',
        status: 'read',
        type: 'text' as const
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  }, [input, isLoading, setMessages, setInput, setIsLoading]);

  return (
    <DashboardLayout
      title="Personal AI Tutor"
      subtitle="Your 24/7 Academic companion for NIOS Curriculum"
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-8 ">
        {/* Chat Interface */}
        <div className="flex flex-col min-h-[80vh] max-h-[85vh] bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in ">
          <div className="absolute top-0 inset-0 bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none" />

          <div className="p-6 border-b border-slate-50 bg-gradient-to-r from-blue-50 to-red-50  border-b border-slate-200 backdrop-blur-md z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900/10 flex items-center justify-center text-blue-900 ring-4 ring-blue-50">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 uppercase tracking-tight">NIOS Intelligent Assistant</div>
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Optimizing for Class {user.details.class || 'Secondary'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCalling(true)}
                className="px-4 py-2 bg-blue-900/10 text-blue-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-900 hover:text-white transition-all"
                title="Start AI Video Call"
              >
                <VideoIcon size={14} /> Start AI Video Call
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
                <History size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            <div className="max-w-xl mx-auto space-y-8">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${message.role === 'ai' ? 'bg-blue-900/10 text-blue-900' : 'bg-slate-900 text-white'}`}>
                      {message.role === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
                    </div>
                    <div className={`p-4 rounded-xl border text-sm leading-relaxed font-medium shadow-sm max-w-[80%] ${message.role === 'ai' ? 'bg-slate-50 border-slate-100 rounded-tr-none' : 'bg-slate-900 text-white border-slate-700 rounded-tl-none'}`}>
                      <div className="prose prose-sm max-w-none">
                        <p>{message.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}</p>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider opacity-75">
                        {message.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-900/10 flex items-center justify-center text-blue-900 shrink-0 animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <div className="p-6 bg-slate-50 text-slate-900 rounded-xl rounded-tl-none border border-slate-100 text-sm leading-relaxed font-medium shadow-sm">
                    AI is typing...
                  </div>
                </motion.div>
              )}

              {messages.length === 0 && input === '' && (
                <div className="text-center py-12 text-slate-400">
                  <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-sm font-medium">No messages yet. Start a conversation!</p>
                </div>
              )}

              {input === '' && messages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 animate-fade-in">
                  {suggestions.slice(0, 3).map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(s.title);
                        setTimeout(() => document.querySelector('textarea')?.focus(), 100);
                      }}
                      className="p-6 text-left rounded-xl bg-white border border-slate-100 hover:border-blue-900/30 hover:shadow-xl transition-all group cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <s.icon size={20} />
                      </div>
                      <div className="text-xs font-black text-slate-900 mb-1 uppercase tracking-tight">{s.title}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase leading-tight">{s.sub}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-white z-10">
            <div className="max-w-2xl mx-auto relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={messages.length === 0 ? "Message your AI Tutor..." : "Type your response..."}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-5 px-8 pr-32 text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900/20 transition-all resize-none shadow-sm min-h-[64px]"
                rows={1}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  onClick={() => setIsCalling(true)}
                  className="p-2 text-slate-400 hover:text-blue-900 transition-colors"
                  title="Voice input"
                >
                  <Mic size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-blue-900 transition-colors" title="Attach file">
                  <Paperclip size={20} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`p-2.5 rounded-xl bg-blue-900 text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all ${input.trim() && !isLoading ? 'opacity-100 hover:shadow-blue-500/40' : 'opacity-50 grayscale cursor-not-allowed'}`}
                  title="Send message (Enter)"
                >
                  <Send size={18} fill="currentColor" />
                </button>
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI can make mistakes. Check important academic info.</span>
            </div>
          </div>
        </div>

        {/* Knowledge Context */}
        <div className="space-y-6">
          <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/10 rounded-full blur-3xl" />
            <h3 className="font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <Brain size={20} className="text-blue-900" /> Learning Context
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Subject</div>
                <div className="text-sm font-black text-white">Advanced Physics</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Focus Area</div>
                <div className="text-sm font-black text-white">Quantum Mechanics</div>
              </div>

              {/* Phase 2: Raise Queries */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-[8px] font-black text-blue-900 uppercase tracking-[0.2em] mb-4">Quick Actions</div>
                <button className="w-full p-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group">
                  <HelpCircle size={14} className="group-hover:rotate-12 transition-transform" /> Raise Academic Query
                </button>
              </div>

              {/* Phase 2: Quiz Generation */}
              <div className="pt-4">
                <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-blue-900" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">AI Quiz Gen</span>
                  </div>
                  <p className="text-[8px] font-medium text-slate-400 leading-relaxed uppercase">Upload your notes or SLM to generate a custom 10-question quiz instantly.</p>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <Upload size={12} /> Upload Content
                  </button>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button className="flex items-center justify-between w-full p-4 bg-white/5 rounded-xl hover:bg-blue-900 transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">View Concept Map</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden relative">
            <h3 className="font-black uppercase tracking-tight mb-6">Recent Resources</h3>
            <div className="space-y-4">
              {[
                { type: 'SLM', title: 'Chapter 4: Cell Structure', icon: FileText },
                { type: 'VIDEO', title: 'Calculus Intro', icon: MessageSquare },
                { type: 'QUIZ', title: 'English Mock Test', icon: Lightbulb },
              ].map((r, i) => (
                <button key={i} className="flex items-center gap-4 w-full p-4 hover:bg-slate-50 transition-colors text-left group rounded-xl border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-900 transition-colors">
                    <r.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{r.type}</div>
                    <div className="text-xs font-black text-slate-900 truncate">{r.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isCalling && (
          <AICallInterface
            userName={user.name}
            onEndCall={() => setIsCalling(false)}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
