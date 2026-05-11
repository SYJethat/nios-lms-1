'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import Image from 'next/image';

interface FlipBookProps {
  pages: string[];
  title: string;
}

export default function FlipBook({ pages, title }: FlipBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [direction, setDirection] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const variants: any = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: direction > 0 ? 'left' : 'right',
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        rotateY: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      zIndex: 0,
      transformOrigin: direction > 0 ? 'right' : 'left',
      transition: {
        rotateY: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-8xl h-[80vh] mx-auto p-4 md:p-10 bg-white/50 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl">
      {/* Controls Header */}
      <div className="flex items-center justify-between w-full px-6">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Page {currentPage + 1} of {pages.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-100">
            <ZoomIn size={18} />
          </button>
          <button onClick={() => setZoom(1)} className="p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-100">
            <RotateCcw size={18} />
          </button>
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all shadow-sm border border-slate-100">
            <ZoomOut size={18} />
          </button>
        </div>
      </div>

      {/* Book Container */}
      <div className="relative w-full aspect-[4/3] md:aspect-[3/2] perspective-[2000px] flex items-center justify-center overflow-hidden rounded-xl bg-slate-100/50 p-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{
              scale: zoom,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative w-full h-full shadow-2xl rounded-xl overflow-hidden bg-white border border-slate-200">
              <Image
                src={pages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                fill
                className="object-contain p-8"
                priority
              />
              {/* Center Spine Shadow */}
              <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Overlays */}
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl text-slate-900 hover:bg-blue-900 hover:text-white transition-all disabled:opacity-0 z-10"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl text-slate-900 hover:bg-blue-900 hover:text-white transition-all disabled:opacity-0 z-10"
        >
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Thumbnails / Progress Bar */}
      <div className="w-full px-6 space-y-4">
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-900 shadow-[0_0_10px_rgba(255,107,0,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-center gap-2 overflow-x-auto py-2 scrollbar-hide">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentPage ? 1 : -1);
                setCurrentPage(i);
              }}
              className={`w-12 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${currentPage === i ? 'border-blue-900 scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
            >
              <div className="relative w-full h-full bg-white">
                <Image src={p} alt={`Thumb ${i + 1}`} fill className="object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
