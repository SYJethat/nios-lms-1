'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  CheckCircle2,
  List,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import Image from 'next/image';
import { BookPageDetail } from '@/lib/mock-data';

interface FlipBookProps {
  pages?: string[];
  pageDetails?: BookPageDetail[];
  title: string;
  author?: string;
  category?: string;
  subjectCode?: string;
  onClose?: () => void;
}

export default function FlipBook({
  pages = [],
  pageDetails,
  title,
  author,
  category,
  subjectCode,
  onClose
}: FlipBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const totalPages = pageDetails?.length || pages.length || 1;

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleReadAloud = () => {
    if (!synthRef.current) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentDetail = pageDetails?.[currentPage];
    const textToRead = currentDetail
      ? `${currentDetail.chapterTitle}. ${currentDetail.heading}. ${currentDetail.content} ${currentDetail.subcontent || ''}`
      : `${title}. Page ${currentPage + 1}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 70 : -70,
      opacity: 0,
      scale: 0.96,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        rotateY: { type: 'spring', stiffness: 220, damping: 25 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -70 : 70,
      opacity: 0,
      scale: 0.96,
      zIndex: 0,
      transformOrigin: dir > 0 ? 'right center' : 'left center',
      transition: {
        rotateY: { type: 'spring', stiffness: 220, damping: 25 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const currentDetail = pageDetails?.[currentPage];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-900/90 text-white backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
      {/* Controls Bar Header */}
      <div className="flex flex-wrap items-center justify-between w-full gap-3 px-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
            <BookOpen size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                {title}
              </h2>
              {subjectCode && (
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-wider shrink-0">
                  {subjectCode}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              {author || 'NIOS Self-Learning Material'} · {category || 'Interactive 3D SLM'}
            </p>
          </div>
        </div>

        {/* Toolbar buttons */}
        <div className="flex items-center gap-2">
          {/* Read aloud */}
          <button
            onClick={handleReadAloud}
            title={isSpeaking ? 'Stop Audio' : 'Listen to Page'}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 font-black animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span className="hidden sm:inline">{isSpeaking ? 'Reading...' : 'Listen'}</span>
          </button>

          {/* Zoom In / Out */}
          <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/10">
            <button
              onClick={() => setZoom(z => Math.max(z - 0.15, 0.7))}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-2 py-1 text-[11px] font-black text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={() => setZoom(z => Math.min(z + 0.15, 1.6))}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3D FlipBook Stage */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[620px] perspective-[2500px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4 border border-white/5 shadow-inner">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants as any}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center"
            style={{
              scale: zoom,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* The Authentic Book Page Container */}
            <div className="relative w-full h-full max-w-3xl bg-[#FCFBF8] text-slate-900 rounded-xl shadow-2xl border border-amber-900/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-text">
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50/40 via-white to-amber-50/30 pointer-events-none" />

              {/* Book Spine Crease & Shadow on Left */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />

              {currentDetail ? (
                // ── Structured Realistic SLM Page ──
                <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                  {/* Page Top Header */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900/15">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 relative shrink-0">
                        <Image src="/NIOS.png" alt="NIOS" fill className="object-contain" />
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-blue-900">
                        {currentDetail.chapterTitle}
                      </div>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      NIOS SLM · {subjectCode || 'ACADEMIC'}
                    </div>
                  </div>

                  {/* Main Page Body */}
                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                      {currentDetail.heading}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {currentDetail.content}
                    </p>

                    {currentDetail.subcontent && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic border-l-2 border-blue-900 pl-3">
                        {currentDetail.subcontent}
                      </p>
                    )}

                    {/* Formula / Example Box */}
                    {currentDetail.formulaOrExample && (
                      <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs font-semibold text-amber-950 font-mono whitespace-pre-line shadow-2xs">
                        {currentDetail.formulaOrExample}
                      </div>
                    )}

                    {/* Key Points */}
                    {currentDetail.keyPoints && currentDetail.keyPoints.length > 0 && (
                      <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-1.5 shadow-2xs">
                        <div className="text-[10px] font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                          <Sparkles size={12} className="text-amber-600" />
                          Key Concept Highlights (मुख्य बिंदु)
                        </div>
                        <ul className="space-y-1">
                          {currentDetail.keyPoints.map((pt, i) => (
                            <li key={i} className="text-[11px] sm:text-xs text-slate-800 flex items-start gap-2 font-medium">
                              <CheckCircle2 size={13} className="text-blue-900 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Self Check Assessment Questions */}
                    {currentDetail.selfCheck && currentDetail.selfCheck.length > 0 && (
                      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1.5 shadow-2xs">
                        <div className="text-[10px] font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-emerald-700" />
                          In-Text Self Check Questions (स्वयं जांचें)
                        </div>
                        <ol className="list-decimal list-inside space-y-1 text-[11px] sm:text-xs text-slate-800 font-medium">
                          {currentDetail.selfCheck.map((q, i) => (
                            <li key={i} className="pl-1 leading-snug">{q}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>

                  {/* Page Footer */}
                  <div className="pt-2 border-t border-slate-900/10 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>National Institute of Open Schooling</span>
                    <span className="font-black text-slate-900">Page {currentDetail.pageNumber}</span>
                  </div>
                </div>
              ) : (
                // ── Image-based Fallback Page ──
                <div className="relative w-full h-full flex flex-col justify-between">
                  <div className="relative flex-1 w-full rounded-lg overflow-hidden bg-white">
                    <Image
                      src={pages[currentPage] || '/book.jpg'}
                      alt={`Page ${currentPage + 1}`}
                      fill
                      className="object-contain p-4"
                      priority
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>NIOS SLM</span>
                    <span className="font-black text-slate-900">Page {currentPage + 1}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Page Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          title="Previous Page (Left Arrow)"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white text-slate-900 rounded-full shadow-2xl flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none cursor-pointer z-30 hover:scale-110 active:scale-95 border border-slate-200"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        {/* Next Page Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          title="Next Page (Right Arrow)"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white text-slate-900 rounded-full shadow-2xl flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none cursor-pointer z-30 hover:scale-110 active:scale-95 border border-slate-200"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Bottom Thumbnail Strip & Progress Indicator */}
      <div className="w-full px-2 space-y-3">
        {/* Progress bar */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
          <span>Page {currentPage + 1} of {totalPages}</span>
          <span className="text-blue-400">{Math.round(((currentPage + 1) / totalPages) * 100)}% Completed</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Thumbnail buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-hide">
          {Array.from({ length: totalPages }).map((_, i) => {
            const isCurrent = currentPage === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                Page {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
