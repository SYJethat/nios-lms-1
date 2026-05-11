'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Paperclip, 
  MoreVertical, 
  Maximize2,
  Minimize2,
  Trash2,
  MessageSquare,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockChatHistory, quickSuggestions, ChatMessage } from '@/lib/mock-chat-data';
import Image from 'next/image';

interface ChatbotModalProps {
  onClose: () => void;
}

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `I've analyzed your request about "${input}". Here are some recommended resources and a quick study plan to help you progress efficiently. Would you like me to generate a practice quiz for this topic?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '/ai-avatar.png'
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-32 right-8 z-[105] w-[450px] h-[650px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col sm:w-[calc(100vw-32px)] sm:bottom-24 sm:right-4 sm:h-[550px]"
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-900 to-red-700 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <Bot size={24} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-blue-800 rounded-full" />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight flex items-center gap-2">
              NIOS AI Assistant <Sparkles size={14} className="text-blue-300" />
            </h3>
            <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest">Active • Course Recommender</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-all"><MoreVertical size={18} /></button>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all"><X size={18} /></button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        <div className="text-center py-4">
          <span className="px-4 py-1.5 bg-slate-200/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-full">Today</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-blue-900 text-white' : 'bg-white border border-slate-200'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-blue-900" />}
              </div>
              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-blue-900 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>{line}</p>
                  ))}
                  
                  {msg.type === 'quiz' && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-emerald-700 font-black text-[10px] uppercase tracking-widest">
                        <BookOpen size={14} /> Quiz Suggestion
                      </div>
                      <button className="w-full py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md">
                        Take Quiz Now
                      </button>
                    </div>
                  )}
                </div>
                <div className={`text-[9px] font-black text-slate-400 uppercase tracking-widest ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp} {msg.role === 'user' && '• Sent'}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                <Bot size={14} className="text-blue-900" />
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Input */}
      <div className="p-6 bg-white border-t border-slate-100 space-y-4">
        {/* Quick Suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {quickSuggestions.map((text, i) => (
            <button
              key={i}
              onClick={() => { setInput(text); }}
              className="whitespace-nowrap px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-blue-900 hover:text-blue-900 transition-all active:scale-95"
            >
              {text}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about courses, TMA or exams..."
            className="w-full p-4 pr-16 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 outline-none transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button type="button" className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Paperclip size={18} /></button>
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="p-2.5 bg-blue-900 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:grayscale"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <p className="text-[9px] text-center text-slate-400 font-medium">
          AI can make mistakes. Verify important information with your regional center.
        </p>
      </div>
    </motion.div>
  );
}
