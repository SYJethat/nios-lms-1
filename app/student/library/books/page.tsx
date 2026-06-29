'use client';
import DashboardLayout from '@/components/DashboardLayout';
import FlipBook from '@/components/FlipBook';
import { MOCK_BOOKS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Share2, Download, Printer } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BookViewerContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  if (!user) return null;

  const id = searchParams.get('id');
  const selectedBook = MOCK_BOOKS.find(b => b.id === id) || MOCK_BOOKS[0];

  if (!selectedBook) return (
    <div className="p-10 text-center">
      <Link href="/student/library" className="text-brand-orange font-black uppercase tracking-widest text-xs hover:underline flex items-center justify-center gap-2">
        <ArrowLeft size={16} /> Back to Library
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-8xl mx-auto">
      {/* Header Actions */}
      <div className="flex items-center justify-between ">
         <Link 
            href="/student/library" 
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all shadow-sm"
         >
           <ArrowLeft size={14} /> Back to Grid
         </Link>
         <div className="flex items-center gap-2">
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
               <Share2 size={18} />
            </button>
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
               <Download size={18} />
            </button>
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
               <Printer size={18} />
            </button>
         </div>
      </div>

      {/* The FlipBook Component */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
         <FlipBook 
           pages={selectedBook.pages} 
           title={selectedBook.title} 
         />
      </div>

      {/* Help / FAQ Section */}
      <div className="p-12 bg-white rounded-xl border border-slate-100 shadow-sm text-center space-y-6">
         <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">How to use our Interactive System</h3>
         <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl mx-auto uppercase tracking-widest">
            Click the edges of the pages to flip through the book. Use the zoom controls in the top bar for detailed reading. Our system is blockchain-verified for academic transparency.
         </p>
         <div className="flex items-center justify-center gap-10 pt-6">
            <div className="text-center">
               <div className="text-2xl font-black text-slate-900 mb-1">{selectedBook.pages.length}</div>
               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Pages</div>
            </div>
            <div className="h-10 w-px bg-slate-100" />
            <div className="text-center">
               <div className="text-2xl font-black text-emerald-500 mb-1">VERIFIED</div>
               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Authenticity</div>
            </div>
         </div>
      </div>
    </div>
  );
}

export default function InteractiveSchedulePage() {
  return (
    <DashboardLayout 
      title="Digital Reader" 
      subtitle="Interactive textbooks & digital study guides"
    >
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <BookViewerContent />
      </Suspense>
    </DashboardLayout>
  );
}
