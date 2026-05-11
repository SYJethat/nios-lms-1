'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { BookOpen, Download, Layers, Search, Play } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function StudyMaterialPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <BookOpen className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Study Material</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            SLM Repository
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Self Learning Material (SLM) in print and digital format for all NIOS courses - Secondary to Vocational
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#download" className="group bg-white text-purple-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Download SLM
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#search" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Search Material
            </a>
          </div>
        </div>
      </section>

      {/* SLM Download */}
      <section id="download" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full mb-8">
              <Layers className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">All Subjects Available</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Download Study Material</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Official NIOS SLM PDFs for print/digital study</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { subject: 'Hindi (201)', level: 'Secondary', format: 'PDF', size: '12 MB', icon: '📖' },
              { subject: 'English (202)', level: 'Secondary', format: 'PDF', size: '15 MB', icon: '📚' },
              { subject: 'Mathematics (211)', level: 'Secondary', format: 'PDF', size: '18 MB', icon: '📐' },
              { subject: 'Science (212)', level: 'Secondary', format: 'PDF', size: '22 MB', icon: '🔬' },
              { subject: 'Physics (312)', level: 'Sr. Secondary', format: 'PDF', size: '25 MB', icon: '⚛️' },
              { subject: 'Chemistry (313)', level: 'Sr. Secondary', format: 'PDF', size: '28 MB', icon: '🧪' },
            ].map((item, i) => (
              <a key={i} href="#" className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-100 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{item.subject}</h3>
                <div className="text-sm text-slate-500 mb-4">{item.level} • {item.format} • {item.size}</div>
                <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-wide text-xs group-hover:translate-x-1 transition-transform">
                  <Download className="w-4 h-4" />
                  Download
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a href="#" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black px-12 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 uppercase tracking-wider text-lg">
              <Download className="w-6 h-6" />
              View Complete Catalogue
            </a>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

