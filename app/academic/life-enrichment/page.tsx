'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Heart, Leaf, Brain, Music, Palette } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function LifeEnrichmentPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Heart className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Life Enrichment</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Holistic Development
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Character building courses for personality development and life skills beyond academics
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#courses" className="group bg-white text-rose-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Enrichment Courses
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#benefits" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Benefits Overview
            </a>
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section id="courses" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full mb-8">
              <Brain className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Personality Development</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Life Enrichment Courses</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Yoga, meditation, art, music for complete personality development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Yoga', desc: 'Physical fitness, stress management, meditation techniques', color: 'from-rose-400 to-pink-400' },
              { icon: Leaf, title: 'Environmental Education', desc: 'Sustainable living, conservation, green citizenship', color: 'from-emerald-400 to-teal-400' },
              { icon: Brain, title: 'Entrepreneurship Mindset', desc: 'Business thinking, innovation, self-employment skills', color: 'from-blue-400 to-indigo-400' },
              { icon: Music, title: 'Indian Culture', desc: 'Classical music, dance, heritage appreciation', color: 'from-purple-400 to-violet-400' },
              { icon: Palette, title: 'Painting', desc: 'Creative expression, art therapy, visual arts', color: 'from-orange-400 to-amber-400' },
              { icon: Heart, title: 'Social Harmony', desc: 'Value education, ethics, community living', color: 'from-sky-400 to-cyan-400' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-rose-600 transition-colors">{item.title}</h3>
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

