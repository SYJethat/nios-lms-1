'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { MOCK_BOOKS, MOCK_USERS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  Search,
  Filter,
  ArrowRight,
  Star,
  Clock,
  Sparkles,
  Download,
  Eye,
  CheckCircle,
  X,
  Bookmark,
  Layers,
  Globe
} from 'lucide-react';
import Image from 'next/image';

export default function DigitalLibraryPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeReadingBook, setActiveReadingBook] = useState<any | null>(null);

  const categories = ['All', 'Secondary', 'Senior Secondary', 'Vocational', 'Language SLM'];

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      book.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout
      title="Digital Library & 3D Interactive SLMs"
      subtitle={`${activeUser.name} · National Institute of Open Schooling · Self-Learning Materials (SLM) Repository`}
    >
      <div className="space-y-8 animate-fade-in pb-20">

        {/* Hero Spotlight (Light Theme) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-amber-50/50 border border-blue-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider border border-blue-200 flex items-center gap-1.5 w-fit">
              <Sparkles size={12} className="text-amber-600" /> NIOS DIGITAL SLM ARCHIVE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Interactive Textbooks &amp; Study Guides
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Browse official NIOS Self-Learning Materials across 22 scheduled languages, vocational modules, sample question papers, and interactive 3D flipbook editions.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-center pr-4 border-r border-slate-100">
              <div className="text-xl font-black text-blue-900">4,800+</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">SLM Titles</div>
            </div>
            <div className="text-center pr-4 border-r border-slate-100">
              <div className="text-xl font-black text-emerald-700">22</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-amber-700">100%</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">Free Access</div>
            </div>
          </div>
        </div>

        {/* Search & Category Pills (Light Theme) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-blue-900 font-black shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, subjects..."
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
            />
          </div>
        </div>

        {/* Books Grid (Light Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Visual Cover (Light Theme) */}
              <div className="relative h-56 bg-gradient-to-br from-slate-100 to-blue-50/50 flex items-center justify-center p-6 border-b border-slate-100 overflow-hidden">
                <div className="relative w-36 h-44 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1 shadow-md rounded-r-xl overflow-hidden border-l-4 border-blue-900 border-y border-r border-slate-200 bg-white">
                  <Image src={book.cover} alt={book.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-[9px] font-black uppercase text-white tracking-wider">
                    NIOS OFFICIAL
                  </div>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-white text-blue-900 border border-blue-200 rounded-full text-[9px] font-black uppercase tracking-wider shadow-2xs">
                  {book.category}
                </div>
              </div>

              {/* Book Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    By {book.author}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <BookOpen size={13} className="text-blue-700" />
                    <span>{book.pages?.length || 140} Pages</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star size={13} fill="currentColor" /> 4.9
                  </span>
                  <span className="text-emerald-700 font-bold">PDF + 3D</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setActiveReadingBook(book)}
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Read SLM</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading official PDF for ${book.title}...`)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-slate-200 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Reading Flipbook Modal (Light Theme) */}
        {activeReadingBook && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-900" />
                  <span className="text-sm font-black text-slate-900">{activeReadingBook.title}</span>
                </div>
                <button
                  onClick={() => setActiveReadingBook(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto space-y-6">
                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-800 space-y-2">
                  <div className="text-xs font-black uppercase tracking-wider text-blue-900">
                    Official NIOS Self-Learning Material (SLM)
                  </div>
                  <p className="text-sm leading-relaxed font-medium">
                    This unit covers key theoretical principles, practical applications, solved exercises, and terminal evaluation questions according to the updated National Curriculum Framework (NCF).
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="text-xs font-black uppercase text-slate-500">Unit Structure</h4>
                    <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                      <li>• 1.1 Introduction &amp; Historical Context</li>
                      <li>• 1.2 Core Theoretical Formulations</li>
                      <li>• 1.3 Solved Model Examples &amp; Diagrams</li>
                      <li>• 1.4 Practice Exercise &amp; Self Check</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="text-xs font-black uppercase text-slate-500">Multilingual Availability</h4>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      This textbook is mapped to all 22 scheduled Indian languages with synchronized audio lectures and glossary definitions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Pages: {activeReadingBook.pages?.length || 140} Chapters</span>
                <button
                  onClick={() => setActiveReadingBook(null)}
                  className="px-6 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-800 transition-all cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
