'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Search, Calendar, Download, TrendingUp, Award } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function ExaminationResultPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Search className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Examination Result</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Results Portal
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Instant access to Public Exam, On-Demand Exam and TMA results with marks statement download
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#check-result" className="group bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Check Result
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#previous" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Previous Results
            </a>
          </div>
        </div>
      </section>

      {/* Result Checker */}
      <section id="check-result" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-8">
              <TrendingUp className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Instant Access</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Check Your Result</h2>
            <p className="text-xl text-slate-600">Enter your roll number and exam session</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-100">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">Roll Number</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input type="text" placeholder="e.g., NIOS202512345678" className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-black text-lg transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">Exam Session</label>
                <div className="flex gap-3">
                  <select className="flex-1 px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-black text-lg">
                    <option>April 2026</option>
                    <option>October 2025</option>
                    <option>On-Demand</option>
                  </select>
                  <Calendar className="w-12 h-12 text-slate-400" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xl py-5 px-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider">
                Get Result
              </button>
            </form>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4">Or Download Marks Statement</h3>
            <div className="flex flex-wrap gap-4 justify-center pt-8 border-t border-slate-200">
              <a href="#" className="flex items-center gap-3 px-8 py-4 border-2 border-emerald-200 text-emerald-700 bg-emerald-50 rounded-2xl font-black hover:bg-emerald-100 transition-all">
                <Download className="w-5 h-5" />
                Public Exam 2026
              </a>
              <a href="#" className="flex items-center gap-3 px-8 py-4 border-2 border-blue-200 text-blue-700 bg-blue-50 rounded-2xl font-black hover:bg-blue-100 transition-all">
                <Download className="w-5 h-5" />
                TMA Results
              </a>
            </div>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

