'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Calendar, FileText, Download, Users, CheckCircle } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function AdmissionPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Calendar className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Admissions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Online Admission
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Streamlined admission process for Secondary, Senior Secondary and OBE programs - Anytime Anywhere Learning
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#process" className="group bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Admission Steps
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#documents" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Required Documents
            </a>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section id="process" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full mb-8">
              <CheckCircle className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">3 Simple Steps</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Admission Procedure</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Complete your NIOS admission in 3 easy steps</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              { step: '1', title: 'Online Registration', desc: 'Create account & fill personal/academic details', icon: Users },
              { step: '2', title: 'Document Upload', desc: 'Upload photo, signature, marksheets', icon: FileText },
              { step: '3', title: 'Fee Payment', desc: 'Pay online via net banking/UPI/Cards', icon: Download },
            ].map((item, i) => (
              <div key={i} className="group text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-4">{item.step}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

