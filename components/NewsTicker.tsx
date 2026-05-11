'use client';

import { Bell, Megaphone, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const announcements = [
  "Schedule for Secondary (Class X) and Sr. Secondary (Class XII) October/November 2026 Examination",
  "Admission Open for Vocational Courses (Academic Year 2026-27)",
  "Extension of date for submission of Tutor Mark Assignments (TMA) for Block-I",
  "Result of D.El.Ed program (Special Examination) Declared",
  "Guidelines for implementation of AI-driven Learning pathways for 2026 batch",
  "Important Notice: Aadhaar authentication mandatory for all new admissions"
];

export default function NewsTicker() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 py-2 overflow-hidden shadow-inner flex items-center">
      <div className="flex-shrink-0 bg-red-600 text-white px-4 py-1 flex items-center gap-2 z-10 font-bold text-xs uppercase tracking-widest ml-4 rounded-sm shadow-sm">
        <Megaphone size={14} className="animate-bounce" />
        Latest Updates
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <motion.div 
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {announcements.map((text, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700 transition-colors">
                {text}
              </p>
              <div className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full transform scale-75 lg:scale-100">
                NEW
              </div>
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {announcements.map((text, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-3 group cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700 transition-colors">
                {text}
              </p>
              <div className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full transform scale-75 lg:scale-100">
                NEW
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex-shrink-0 px-6 hidden md:block">
        <button className="text-blue-700 hover:text-blue-900 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors border-l border-amber-300 pl-6">
          View All <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
