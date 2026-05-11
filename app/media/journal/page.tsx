'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { BookOpen, FileText, Download, Calendar, Search, Users } from 'lucide-react';

export default function JournalPage() {
  const journals = [
    { title: 'NIOS Journal Vol 12 Issue 1', year: '2026', type: 'Print + Digital', downloads: '2.4K' },
    { title: 'Open Learning Trends', year: '2025', type: 'Digital', downloads: '1.8K' },
    { title: 'Vocational Education Report', year: '2025', type: 'Print', downloads: '1.2K' },
    { title: 'NIOS Annual Report 2024-25', year: '2025', type: 'Digital', downloads: '5.6K' },
  ];

  return (
    <>
      <BrandingBanner />
      <OfficialNav />

      {/* Hero */}
      <section className="min-h-[50vh] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full mb-6 mx-auto w-fit">
            <BookOpen className="w-6 h-6" />
            <span className="font-black uppercase tracking-wider">NIOS Journal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">Research & Publications</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Quarterly academic journal featuring research papers, case studies and policy analysis on open and distance learning</p>
        </div>
      </section>

      {/* Archives */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Journal Archive</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">Complete collection of NIOS research publications since 2010. Open access PDFs available for download.</p>
              <div className="space-y-3">
                <button className="flex items-center gap-3 px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 font-black shadow-lg transition-all">
                  <Search className="w-4 h-4" />
                  Search Articles
                </button>
                <button className="flex items-center gap-3 px-6 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 font-black transition-all">
                  Submit Paper
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {journals.map((journal, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-all">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">{journal.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                      <span>{journal.year}</span>
                      <span>{journal.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{journal.downloads} downloads</span>
                    <button className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-medium transition-all">
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-black text-slate-900 mb-8">Subscription & Contributors</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-black text-slate-900 mb-3">For Authors</h4>
                <p className="text-slate-600 mb-4">Submit research papers on open schooling, distance education, assessment reforms</p>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-black hover:bg-blue-700 transition-all">
                  Guidelines
                </button>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
                <BookOpen className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="text-xl font-black text-slate-900 mb-3">Subscribe</h4>
                <p className="text-slate-600 mb-4">Print + Digital annual subscription for educators and researchers</p>
                <button className="w-full bg-emerald-500 text-white py-3 px-6 rounded-xl font-black hover:bg-emerald-600 transition-all">
                  Subscribe
                </button>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
                <Download className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-black text-slate-900 mb-3">Open Access</h4>
                <p className="text-slate-600 mb-4">All volumes available free as PDF downloads</p>
                <a href="#archive" className="w-full block bg-purple-500 text-white py-3 px-6 rounded-xl font-black hover:bg-purple-600 transition-all text-center">
                  Download All
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

