'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Edit3, Download, Calendar, CheckCircle, Upload } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function TMAPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Edit3 className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Tutor Marked Assignment</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            TMA Portal
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Submit your Tutor Marked Assignments online and track evaluation status
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#submit" className="group bg-white text-orange-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Submit TMA
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#schedule" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Submission Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Submit TMA */}
      <section id="submit" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full mb-8">
              <Upload className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Online Submission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Submit Your TMA</h2>
            <p className="text-xl text-slate-600">Upload scanned assignments for all subjects</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-100 mb-12">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">Enrollment Number</label>
                <input type="text" placeholder="ENR-2025-XXXXXX" className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-black text-lg transition-all" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">Subject Code</label>
                  <select className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-black text-lg">
                    <option>201 - Hindi</option>
                    <option>202 - English</option>
                    <option>211 - Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">Assignment No.</label>
                  <select className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-black text-lg">
                    <option>TMA 01</option>
                    <option>TMA 02</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">Upload TMA (PDF/JPG)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-orange-400 transition-colors">
                  <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-black text-slate-700 mb-2">Click to upload or drag & drop</p>
                  <p className="text-sm text-slate-500">Max 10MB per file</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-xl py-5 px-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider">
                Submit TMA
              </button>
            </form>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

