'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import FlipBook from '@/components/FlipBook';
import { MOCK_BOOKS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  BookOpen,
  Share2,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Layers,
  Star,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function BookReaderPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const bookId = params?.id as string;

  const book = MOCK_BOOKS.find(b => b.id.toLowerCase() === bookId?.toLowerCase()) || MOCK_BOOKS[0];

  return (
    <DashboardLayout
      title={book.title}
      subtitle={`NIOS Self-Learning Material (SLM) · ${book.category} · 3D Interactive FlipBook`}
    >
      <div className="space-y-8 pb-24 max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <Link
            href="/student/library"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Digital Library (डिजिटल लाइब्रेरी)
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-black rounded-lg">
              {book.subjectCode || book.category}
            </span>
            <button
              onClick={() => alert(`Downloading official PDF for ${book.title}...`)}
              className="px-4 py-2 bg-slate-900 hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>

        {/* 3D Interactive FlipBook Reader */}
        <div className="w-full animate-in fade-in duration-300">
          <FlipBook
            title={book.title}
            author={book.author}
            category={book.category}
            subjectCode={book.subjectCode}
            pageDetails={book.pageDetails}
            pages={book.pages}
          />
        </div>

        {/* Book Details & Chapter Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-900 text-xs font-black uppercase tracking-wider">
              <Sparkles size={16} className="text-amber-500" />
              Course Description & Curriculum Mapping
            </div>
            <h3 className="text-xl font-black text-slate-900">
              {book.title}
            </h3>
            {book.titleHindi && (
              <p className="text-sm font-bold text-slate-600">
                {book.titleHindi}
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {book.description || 'Official curriculum publication prepared by the National Institute of Open Schooling according to the updated National Curriculum Framework (NCF). Features theoretical explanations, model solved exercises, multilingual glossaries, and self-check assessment rubrics.'}
            </p>

            {book.chapters && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Layers size={14} className="text-blue-900" /> Table of Contents (अध्याय सूची)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {book.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 flex items-center justify-between"
                    >
                      <span className="truncate">{ch.title}</span>
                      <span className="text-[10px] text-blue-900 font-bold bg-white px-2 py-0.5 rounded shadow-2xs">
                        Page {ch.page}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Meta Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Publication Metadata
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Board / Publisher</span>
                  <span className="font-bold text-slate-900">NIOS India</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Academic Level</span>
                  <span className="font-bold text-slate-900">{book.level || 'Secondary'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Language</span>
                  <span className="font-bold text-slate-900">{book.language || 'English / Hindi'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Learner Rating</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> {book.rating || 4.9} / 5.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Accessibility</span>
                  <span className="font-bold text-emerald-600">3D Flip + TTS Audio</span>
                </div>
              </div>
            </div>

            {/* Related SLM */}
            <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Award size={20} className="text-amber-400" />
                <h5 className="text-xs font-black uppercase tracking-wider">Verified Credential</h5>
              </div>
              <p className="text-xs text-blue-200/90 leading-relaxed font-medium">
                Completing the in-text questions in this SLM contributes towards your final Tutor Marked Assignment (TMA) marks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

