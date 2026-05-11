'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, BookOpen, Award, Users, Zap, CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_COURSES, MOCK_BADGES } from '@/lib/mock-data';

const slides = [
  {
    title: 'Welcome to NIOS AI Learning',
    subtitle: 'Your personalized journey starts here',
    description: 'Adaptive learning powered by AI. Track progress, earn badges, compete on leaderboards.',
    image: '/hero.mp4',
    cta: 'Begin Journey',
    href: '/login'
  },
  {
    title: 'Interactive Courses',
    subtitle: 'Science • Math • English',
    description: 'Video lessons, quizzes, AI tutor. Complete challenges to level up.',
    image: '/book.jpg',
    cta: 'Explore Courses',
    href: '/courses'
  },
  {
    title: 'Earn Badges & Rewards',
    subtitle: 'Gamified Learning',
    description: 'Collect badges, maintain streaks, unlock certificates. Climb the leaderboard.',
    image: '/NIOS.png',
    cta: 'View Achievements',
    href: '/achievements'
  },
  {
    title: 'Live Classes & Mentors',
    subtitle: 'Real-time learning',
    description: 'Join live sessions with expert faculty. Direct Q&A and doubt clearing.',
    image: '/qrcode.png',
    cta: 'Join as Learner',
    href: '/login?role=learner'
  }
];

export default function OnboardingTour() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!mounted) return null;

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-emerald-900 overflow-hidden relative">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-red-500/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-8 lg:px-16 py-20 text-white">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
            <Zap size={20} className="text-yellow-300" />
            <span className="text-sm font-black uppercase tracking-widest">AI-Poweblue Gamification</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
              {slide.title}
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-slate-200/90 max-w-2xl leading-relaxed opacity-90">
              {slide.subtitle}
            </p>
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              {slide.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link href={slide.href} className="group flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-emerald-500 to-red-600 text-white rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 flex-1 justify-center">
              {slide.cta}
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-3 px-10 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white font-black text-lg uppercase tracking-widest hover:bg-white/20 transition-all group"
            >
              <Play size={24} className={`transition-transform ${isPlaying ? 'rotate-180' : ''}`} />
              {isPlaying ? 'Pause' : 'Auto-play'}
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="lg:w-1/2 mt-16 lg:mt-0">
          <div className="relative">
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px] mx-auto rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-12">
              {slide.image === '/hero.mp4' ? (
                <video
                  src="/hero.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              )}

              {/* Floating badges */}
              <div className="absolute -top-6 -right-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Star size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}

      <button
        onClick={() => setCurrentSlide((prev) => prev === 0 ? slides.length - 1 : prev - 1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 hover:bg-white/30 transition-all flex items-center justify-center shadow-xl hover:shadow-2xl"
        aria-label="Previous slide"
        title="Previous"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 hover:bg-white/30 transition-all flex items-center justify-center shadow-xl hover:shadow-2xl"
        aria-label="Next slide"
        title="Next"
      >
        <ChevronRight size={24} className="text-white" />
      </button>
    </div>
  );
}

