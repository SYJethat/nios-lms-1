'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Mic, Calendar, Eye, Download, Newspaper } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function PressReleasePage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-orange-900 via-red-900 to-rose-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Mic className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Press Releases</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Media Centre
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Official press releases and media statements from NIOS Chairman, Director and academic departments
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#recent" className="group bg-white text-orange-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Recent Releases
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#media-kit" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Media Kit
            </a>
          </div>
        </div>
      </section>

      {/* Recent Press Releases */}
      <section id="recent" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-orange-600 text-white px-6 py-3 rounded-full mb-8">
              <Newspaper className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Official Statements</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Press Release Archive</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Chronological listing of all media communications</p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                title: "NIOS Achieves 95% Digital Delivery Milestone - Chairman Statement",
                date: "March 22, 2026",
                excerpt: "Over 95% of SLM and exams now delivered digitally, reaching 5 lakh learners...",
                reads: "12K",
                category: "Achievement"
              },
              {
                title: "New ODE Centres Announcement - 25 New Locations Added",
                date: "March 18, 2026",
                excerpt: "On-Demand Examination now available at 25 additional cities including Tier-3 locations...",
                reads: "8.5K",
                category: "Examination"
              },
              {
                title: "NEP 2020 Competency Assessment Launch",
                date: "March 12, 2026",
                excerpt: "NIOS introduces competency-based evaluation aligned with National Education Policy...",
                reads: "15K",
                category: "Academic"
              },
              {
                title: "Record 2.8 Lakh Admissions for 2026 Session",
                date: "March 5, 2026",
                excerpt: "NIOS records highest ever admission numbers with increased female enrolment...",
                reads: "18K",
                category: "Admission"
              },
              {
                title: "Regional Centre Expansion Plan 2026-28",
                date: "Feb 28, 2026",
                excerpt: "10 new Regional Centres planned across North-East and Southern regions...",
                reads: "9.2K",
                category: "Infrastructure"
              },
            ].map((release, i) => (
              <div key={i} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all overflow-hidden border border-slate-100">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Newspaper className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-black uppercase tracking-wide">
                        {release.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <Calendar className="w-3 h-3" />
                        {release.date}
                      </div>
                      <div className="flex items-center gap-1 ml-auto text-xs text-slate-500">
                        <Eye className="w-3 h-3" />
                        <span>{release.reads}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                      {release.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed line-clamp-2">{release.excerpt}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <a href="#" className="inline-flex items-center gap-2 text-orange-600 font-black uppercase tracking-wide text-sm hover:text-orange-700 group-hover:translate-x-1 transition-all">
                    Read Full Release →
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-5 py-2 rounded-xl font-black uppercase tracking-wide text-xs transition-all shadow-sm hover:shadow-md">
                    <Download className="w-4 h-4" />
                    PDF
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a href="#" className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black px-12 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-lg">
              <Mic className="w-6 h-6" />
              Media Contact
            </a>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

