'use client';
import DashboardLayout from '@/components/DashboardLayout';
import FlipBook from '@/components/FlipBook';
import { MOCK_BOOKS } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Share2, Download, Printer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InteractiveSchedulePage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const scheduleBook = MOCK_BOOKS.find(b => b.category === 'Schedule' && b.pages.length > 0);

  if (!scheduleBook) return (
    <DashboardLayout title="Error" subtitle="Schedule not found">
      <div className="p-10 text-center">
        <Link href="/schedule" className="text-blue-900 font-black uppercase tracking-widest text-xs hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Calendar
        </Link>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout
      title="Interactive Schedule"
      subtitle="Digital class calendar & academic milestones flipbook"
    >
      <div className="flex flex-col gap-10 pb-20 max-w-8xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between ">
          <Link
            href="/library"
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
            pages={scheduleBook.pages}
            title={scheduleBook.title}
          />
        </div>

        {/* Help / FAQ Section */}
        <div className="p-12 bg-white rounded-xl border border-slate-100 shadow-sm text-center space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">How to use our Interactive System</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl mx-auto uppercase tracking-widest">
            Click the edges of the pages to flip through the schedule. Use the zoom controls in the top bar for detailed reading. Our system is blockchain-verified for academic transparency.
          </p>
          <div className="flex items-center justify-center gap-10 pt-6">
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-1">08</div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Modules</div>
            </div>
            <div className="h-10 w-px bg-slate-100" />
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-500 mb-1">VERIFIED</div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Authenticity</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
