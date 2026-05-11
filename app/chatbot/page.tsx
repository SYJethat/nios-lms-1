'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    X,
    Send,
    Bot,
    User,
    Sparkles,
    Minus,
    Maximize2,
    Globe,
    ChevronDown
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import DashboardLayout from '@/components/DashboardLayout';

const INDIAN_LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi (हिन्दी)' },
    { code: 'es', name: 'Sanskrit (संस्कृतम्)' },
    { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' },
    { code: 'mr', name: 'Marathi (मराठी)' },
    { code: 'bn', name: 'Bengali (বাংলা)' },
    { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
    { code: 'ml', name: 'Malayalam (മലയാളം)' },
    { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
    { code: 'or', name: 'Odia (ଓଡ଼ିଆ)' },
    { code: 'as', name: 'Assamese (অসমীয়া)' },
    { code: 'ur', name: 'Urdu (اردو)' },
    { code: 'bh', name: 'Bhojpuri (भोजपुरी)' },
    { code: 'ma', name: 'Maithili (मैथिली)' },
    { code: 'sa', name: 'Santali (संताली)' },
    { code: 'ks', name: 'Kashmiri (कश्मीरी)' },
    { code: 'ne', name: 'Nepali (नेपाली)' },
    { code: 'sd', name: 'Sindhi (सिंधी)' },
    { code: 'kok', name: 'Konkani (कोंकणी)' },
    { code: 'mni', name: 'Manipuri (মণিপুরী)' },
];

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    time: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Namaste! I am your NIOS Academic Assistant. How can I help you today?", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({
                        role: m.sender === 'bot' ? 'ai' : 'user',
                        content: m.text
                    })),
                    language: selectedLanguage
                }),
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();

            const botResponse: Message = {
                id: Date.now() + 1,
                text: data.content,
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting to the brain. Please try again or check your local Ollama instance.",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <DashboardLayout
        >


            <div className="fixed bottom-4 h-[80vh]   font-sans">


                <AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="w-[180vh] h-full bg-white rounded-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-6 flex items-center justify-between relative">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-white uppercase tracking-tight">NIOS Assistant</div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always Online</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Language Selector */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowLangMenu(!showLangMenu)}
                                        className="flex w-48 items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest"
                                    >
                                        <Globe size={14} />
                                        {INDIAN_LANGUAGES.find(l => l.code === selectedLanguage)?.code}
                                        <ChevronDown size={12} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showLangMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[300px] overflow-y-auto custom-scrollbar"
                                            >
                                                <div className="p-2 grid grid-cols-1 gap-1">
                                                    {INDIAN_LANGUAGES.map((lang) => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => {
                                                                setSelectedLanguage(lang.code);
                                                                setShowLangMenu(false);
                                                            }}
                                                            className={`w-full px-4 py-3 rounded-xl text-left text-[10px] font-bold transition-all flex items-center justify-between ${selectedLanguage === lang.code
                                                                    ? 'bg-blue-700 text-white'
                                                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                                                }`}
                                                        >
                                                            {lang.name}
                                                            {selectedLanguage === lang.code && <div className="w-1 h-1 bg-white rounded-full" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>


                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="h-[400px] overflow-y-auto p-6 bg-slate-50 space-y-6 scroll-smooth"
                        >
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] space-y-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed prose prose-sm max-w-none ${msg.sender === 'user'
                                                ? 'bg-blue-700 text-white rounded-tr-none shadow-lg shadow-blue-900/10'
                                                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'
                                            }`}>
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ node, ...props }) => <a {...props} className="text-blue-500 underline hover:text-blue-700 font-bold" target="_blank" rel="noopener noreferrer" />,
                                                    strong: ({ node, ...props }) => <strong {...props} className="font-black text-slate-900" />,
                                                    ul: ({ node, ...props }) => <ul {...props} className="list-disc ml-4 space-y-1 my-2" />,
                                                    ol: ({ node, ...props }) => <ol {...props} className="list-decimal ml-4 space-y-1 my-2" />,
                                                    h1: ({ node, ...props }) => <h1 {...props} className="text-lg font-black mt-2 mb-1" />,
                                                    h2: ({ node, ...props }) => <h2 {...props} className="text-md font-black mt-2 mb-1" />,
                                                    p: ({ node, ...props }) => <p {...props} className={msg.sender === 'user' ? 'text-white' : 'text-slate-800'} />
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                                            {msg.time}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ask a question..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all font-medium"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:bg-slate-300"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <Sparkles size={10} className="text-blue-500" /> Powered by NIOS AI
                            </div>
                        </div>
                    </motion.div>

                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
