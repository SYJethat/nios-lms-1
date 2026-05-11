'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { BookOpen, Users, Award, Star, MapPin } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function OpenBasicEducationPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <BookOpen className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Open Basic Education</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            OBE Programme
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Foundation literacy and numeracy program equivalent to Class 3, 5, 8 standards through Open Schooling
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#levels" className="group bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Programme Levels
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#centres" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Study Centres
            </a>
          </div>
        </div>
      </section>

      {/* Levels Overview */}
      <section id="levels" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-8">
              <Users className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">3 Levels</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Open Basic Education Levels</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">A, B, C levels equivalent to Std 3, 5, 8</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Star, title: 'Level A', desc: 'Equivalent to Class 3 • Basic Literacy & Numeracy', color: 'from-emerald-400 to-green-400' },
              { icon: BookOpen, title: 'Level B', desc: 'Equivalent to Class 5 • Environmental Studies', color: 'from-teal-400 to-cyan-400' },
              { icon: Award, title: 'Level C', desc: 'Equivalent to Class 8 • Advanced Foundation', color: 'from-green-400 to-lime-400' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">{item.title}</h3>
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

