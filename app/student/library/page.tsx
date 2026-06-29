'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { MOCK_BOOKS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Search, Filter, ArrowRight, Star, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LibraryPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout
      title="Digital Library"
      subtitle="Interactive textbooks, study guides, and academic resources"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative flex-1 w-full max-w-xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search digital books, modules, or authors..."
            className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-orange/5 focus:border-brand-orange/20 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-8 py-5 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all flex items-center gap-2">
            <Filter size={16} /> Filter Categories
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
        {MOCK_BOOKS.map((book) => (
          <div key={book.id} className="group bg-white rounded-xl border border-slate-100 hover:border-brand-orange/20 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700">
            {/* Book Representation */}
            <div className="relative h-64 bg-slate-50 flex items-center justify-center p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-transparent pointer-events-none" />
              <div className="relative w-40 h-52 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                {/* 3D-like Book Cover */}
                <div className="absolute inset-0 bg-white rounded-r-xl shadow-2xl overflow-hidden border-l-8 border-slate-900 border-y border-r border-slate-100">
                  <Image src={book.cover} alt={book.title} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] font-black text-orange-900 uppercase tracking-tighter drop-shadow-md">NIOS DIGITAL</div>
                  </div>
                </div>
                {/* Page Edges */}
                <div className="absolute right-0 top-1 bottom-1 w-2 bg-slate-100 rounded-r-sm shadow-inner"
                  style={{ transform: 'translateX(2px) skewY(5deg)' }} />
              </div>

              <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-brand-orange border border-orange-100 shadow-sm">
                {book.category}
              </div>
            </div>

            <div className="p-10">
              <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-brand-orange transition-colors">
                {book.title}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                by {book.author}
              </p>

              <div className="flex items-center gap-6 mb-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-slate-300" /> {book.pages.length} Pages
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-amber-400" fill="currentColor" /> 4.9 Rating
                </div>
              </div>

              <Link
                href={`/student/library/books?id=${book.id}`}
                className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl active:scale-95"
              >
                Read Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}

        {/* Featured Section CTA */}
        <div className="lg:col-span-3 mt-10 p-12 rounded-xl bg-gradient-to-br from-brand-orange to-red-600 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-[2s]" />
          <div className="relative z-10 grid md:grid-cols-[1fr_auto] items-center gap-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-black leading-tight tracking-tighter">Your AI-Powered <br />LMS Learning Core</h2>
              <p className="text-white/80 font-medium text-lg max-w-xl">Access thousands of digitised study materials, video lectures, and interactive simulations in our unified knowledge repository.</p>
              <button className="px-10 py-5 bg-white text-brand-orange rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl">
                Request Resources
              </button>
            </div>
            <div className="hidden md:block w-64 h-64 bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-700">
              <BookOpen size={120} className="text-white/30" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
