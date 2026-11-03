'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import AICallInterface from '@/components/AICallInterface';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Sparkles,
  Brain,
  Lightbulb,
  MessageSquare,
  Mic,
  MicOff,
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
  User,
  Volume2,
  VolumeX,
  ExternalLink,
  BookOpen,
  RotateCcw
} from 'lucide-react';

import type { ChatMessage } from '@/lib/mock-chat-data';
import { mockChatHistory, quickSuggestions } from '@/lib/mock-chat-data';
import { MOCK_COURSES, MOCK_ASSESSMENTS, MOCK_USERS } from '@/lib/mock-data';
import { generateNIOSAssistantResponse } from '@/lib/nios-ai-engine';

export default function AITutorPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  const suggestions = quickSuggestions.map((title, i) => ({
    title,
    sub: MOCK_COURSES[i % MOCK_COURSES.length]?.subject || 'NIOS Curriculum',
    icon: [Lightbulb, Zap, Brain][i % 3],
    color: ['text-blue-500 bg-blue-50', 'text-purple-500 bg-purple-50', 'text-emerald-500 bg-emerald-50'][i % 3]
  }));

  const handleReadAloud = (msgId: string, text: string) => {
    if (!synthRef.current) return;

    if (speakingMessageId === msgId) {
      synthRef.current.cancel();
      setSpeakingMessageId(null);
      return;
    }

    synthRef.current.cancel();
    // Strip markdown formatting characters for clean speech synthesis
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*#_~`]/g, '')
      .replace(/•/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    synthRef.current.speak(utterance);
  };

  // Voice Speech Recognition
  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use keyboard input.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const executeSend = useCallback(async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Generate accurate, data-grounded NIOS response
    setTimeout(() => {
      const aiResult = generateNIOSAssistantResponse(
        trimmed,
        activeUser,
        [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
      );

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '/ai-avatar.png',
        status: 'read',
        type: (aiResult.type as any) || 'text',
        suggestedActions: aiResult.suggestedActions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 700 + Math.random() * 400);
  }, [isLoading, activeUser, messages]);

  const handleSend = () => {
    executeSend(input);
  };

  const handleResetChat = () => {
    if (confirm('Do you want to reset your conversation with the NIOS Assistant?')) {
      synthRef.current?.cancel();
      setSpeakingMessageId(null);
      setMessages([
        {
          id: Date.now().toString(),
          role: 'ai',
          content: `Hello ${activeUser.name}! I am your official NIOS AI Academic Assistant. Ask me anything about your syllabus, textbooks, courses, video lessons, TMAs, or exam dates!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        }
      ]);
    }
  };

  // Format Class display cleanly without double "Class Class 10"
  const formattedClass = activeUser.details?.class
    ? activeUser.details.class.startsWith('Class')
      ? activeUser.details.class
      : `Class ${activeUser.details.class}`
    : 'Class 10';

  return (
    <DashboardLayout
      title="Personal AI Tutor & Academic Assistant"
      subtitle="Connected to NIOS Curriculum, 3D SLMs, Assessments, and Portal Data"
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Chat Interface */}
        <div className="flex flex-col min-h-[80vh] max-h-[85vh] bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 via-white to-red-50/40 border-b border-slate-200 backdrop-blur-md z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-900/10 flex items-center justify-center text-blue-900 ring-4 ring-blue-50 shadow-xs">
                <Sparkles size={20} className="text-blue-900" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  NIOS Intelligent Assistant
                </div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Optimizing for {formattedClass}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsCalling(true)}
                className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Start AI Video Call"
              >
                <VideoIcon size={14} />
                <span className="hidden sm:inline">Start AI Video Call</span>
              </button>
              <button
                onClick={handleResetChat}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <AnimatePresence>
                {messages.map((message) => {
                  const isUser = message.role === 'user';
                  const isSpeaking = speakingMessageId === message.id;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className={`flex gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isUser
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-blue-900/10 text-blue-900 border border-blue-200/50'
                        }`}
                      >
                        {isUser ? <User size={16} /> : <Sparkles size={16} />}
                      </div>

                      {/* Content Bubble */}
                      <div
                        className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed shadow-xs max-w-[85%] sm:max-w-[80%] ${
                          isUser
                            ? 'bg-slate-900 text-white rounded-tr-none'
                            : 'bg-slate-50 border border-slate-200/80 rounded-tl-none text-slate-900'
                        }`}
                      >
                        {/* Markdown Formatted Content */}
                        <div className="prose prose-sm max-w-none text-inherit">
                          <ReactMarkdown
                            components={{
                              strong: ({ children }) => (
                                <strong className={`font-black ${isUser ? 'text-white' : 'text-slate-900'}`}>
                                  {children}
                                </strong>
                              ),
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0 leading-relaxed font-normal">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="space-y-1.5 my-2.5 pl-4 list-disc">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="space-y-1.5 my-2.5 pl-4 list-decimal">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="font-normal">{children}</li>
                              ),
                              a: ({ href, children }) => (
                                <Link
                                  href={href || '#'}
                                  className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900 underline underline-offset-2 decoration-blue-400 mx-0.5"
                                >
                                  <span>{children}</span>
                                  <ExternalLink size={11} className="inline opacity-70" />
                                </Link>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>

                        {/* Interactive Suggested Action Chips */}
                        {!isUser && message.suggestedActions && message.suggestedActions.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-slate-200/80">
                            {message.suggestedActions.map((action, idx) => {
                              if (action.link) {
                                return (
                                  <Link
                                    key={idx}
                                    href={action.link}
                                    className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
                                  >
                                    <BookOpen size={12} />
                                    <span>{action.label}</span>
                                  </Link>
                                );
                              }
                              return (
                                <button
                                  key={idx}
                                  onClick={() => executeSend(action.action)}
                                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-blue-950 border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                                >
                                  <span>{action.label}</span>
                                  <ArrowRight size={11} className="text-blue-900" />
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Footer details: time + listen button */}
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mt-2.5 pt-1">
                          <span className="uppercase tracking-wider">{message.timestamp}</span>
                          {!isUser && (
                            <button
                              onClick={() => handleReadAloud(message.id, message.content)}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                isSpeaking
                                  ? 'bg-amber-100 text-amber-800 font-black animate-pulse'
                                  : 'hover:bg-slate-200/80 text-slate-500'
                              }`}
                              title={isSpeaking ? 'Stop Audio' : 'Listen Aloud'}
                            >
                              {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
                              <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 sm:gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-900/10 flex items-center justify-center text-blue-900 shrink-0 animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <div className="p-4 bg-slate-50 text-slate-900 rounded-2xl rounded-tl-none border border-slate-200/80 text-xs leading-relaxed font-semibold shadow-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-900 animate-ping" />
                    <span>Searching NIOS textbooks, courses, and syllabus...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />

              {/* Quick Starter Suggestions */}
              {messages.length <= 3 && !isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 animate-fade-in">
                  {suggestions.slice(0, 3).map((s, i) => (
                    <button
                      key={i}
                      onClick={() => executeSend(s.title)}
                      className="p-4 text-left rounded-2xl bg-white border border-slate-200 hover:border-blue-900/40 hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}
                      >
                        <s.icon size={18} />
                      </div>
                      <div className="text-xs font-black text-slate-900 mb-0.5 tracking-tight">
                        {s.title}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        {s.sub}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-100 z-10">
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
                placeholder="Ask about Physics, Maths, 3D SLMs, TMA dates, fee structure..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 pr-32 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all resize-none shadow-2xs min-h-[58px]"
                rows={1}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-slate-400 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                  title={isListening ? 'Listening (Click to stop)' : 'Voice input (Mic)'}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button
                  type="button"
                  onClick={() => alert('Attachment upload ready for TMA assignment review & quiz generation.')}
                  className="p-2 text-slate-400 hover:text-blue-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Attach SLM or assignment notes"
                >
                  <Paperclip size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`p-2.5 rounded-xl bg-blue-900 text-white shadow-md active:scale-95 transition-all cursor-pointer ${
                    input.trim() && !isLoading
                      ? 'opacity-100 hover:bg-blue-800'
                      : 'opacity-40 grayscale cursor-not-allowed'
                  }`}
                  title="Send message (Enter)"
                >
                  <Send size={16} fill="currentColor" />
                </button>
              </div>
            </div>
            <div className="text-center mt-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Grounded in official NIOS academic materials &amp; 3D SLM repository.
              </span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Knowledge Context & Quick Actions */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="font-black text-sm uppercase tracking-tight mb-5 flex items-center gap-2">
              <Brain size={18} className="text-blue-400" /> Learning Context
            </h3>

            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Student Record
                </div>
                <div className="text-xs font-black text-white">{activeUser.name}</div>
                <div className="text-[11px] text-blue-300 font-mono mt-0.5">
                  Roll: {activeUser.details?.enrollmentNo || '270012023945'}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Active Subjects
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Physics (312)', 'Math (211)', 'Science (212)', 'English (202)'].map((subj, idx) => (
                    <button
                      key={idx}
                      onClick={() => executeSend(`Tell me about ${subj} syllabus and SLM`)}
                      className="px-2.5 py-1 bg-white/10 hover:bg-blue-600 rounded-lg text-[10px] font-bold text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => executeSend('Can you generate a practice quiz for TMA?')}
                  className="w-full p-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap size={14} className="text-amber-400" /> Generate Practice Quiz
                </button>

                <Link
                  href="/student/library"
                  className="w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <BookOpen size={14} className="text-emerald-400" /> Open 3D Library
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Academic Resources */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-sm uppercase tracking-tight text-slate-900">
              Interactive SLMs
            </h3>
            <div className="space-y-2.5">
              {[
                { title: 'Physics 312: Electromagnetism', path: '/student/library/sr-phy-312', code: 'Code 312' },
                { title: 'Math 211: Real Numbers & Geometry', path: '/student/library/sec-mat-211', code: 'Code 211' },
                { title: 'Science 212: Matter & Motion', path: '/student/library/sec-sci-212', code: 'Code 212' },
                { title: 'English 202: The Squirrel', path: '/student/library/sec-eng-202', code: 'Code 202' },
              ].map((res, i) => (
                <Link
                  key={i}
                  href={res.path}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-[10px] font-black text-blue-900 uppercase">{res.code}</div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-900 truncate">
                      {res.title}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-900 shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCalling && (
          <AICallInterface
            userName={activeUser.name}
            onEndCall={() => setIsCalling(false)}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
