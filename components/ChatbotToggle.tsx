'use client';

import { useState } from 'react';
import { MessageSquare, X, Minimize2 } from 'lucide-react';
import Image from 'next/image';
import ChatbotModal from './ChatbotModal';

export default function ChatbotToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Course Recommendation Chatbot"
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-gradient-to-br from-blue-900 to-red-600 rounded-2xl shadow-2xl border-4 border-white/20 ring-4 ring-blue-500/30 hover:ring-blue-400/50 active:scale-95 transition-all duration-300 hover:-translate-y-1 group sm:bottom-6 sm:right-6"
      >
        <Image
          src="/course_recommendation_AI.png"
          alt="AI Chatbot"
          width={48}
          height={48}
          className="rounded-xl group-hover:scale-110 transition-transform duration-300"
          priority
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 border-3 border-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </button>

      {/* New Message Badge Animation */}
      <div className="fixed bottom-20 right-20 w-3 h-3 bg-blue-500 rounded-full animate-bounce opacity-0 group-hover:opacity-100 z-[101] sm:hidden lg:block" />

      {isOpen && (
        <ChatbotModal onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

