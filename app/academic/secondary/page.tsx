'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function SecondaryCoursesPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <GraduationCap className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Secondary Courses</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Class 10 Excellence
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Comprehensive Secondary Education Programs for Open Schooling - Foundation for Sr. Secondary Success
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#curriculum" className="group bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              View Curriculum
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#admissions" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Admission Process
            </a>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section id="curriculum" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full mb-8">
              <BookOpen className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Core Subjects</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">NIOS Secondary Subjects</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Choose from 5 compulsory + 7 optional subjects across languages, sciences, commerce, arts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Languages', desc: 'Hindi, English, Regional Languages - Foundation Communication', color: 'from-blue-500 to-cyan-500' },
              { icon: Users, title: 'Mathematics', desc: 'Algebra, Geometry, Statistics - Essential Problem Solving', color: 'from-emerald-500 to-teal-500' },
              { icon: Award, title: 'Sciences', desc: 'Physics, Chemistry, Biology - Conceptual Understanding', color: 'from-purple-500 to-pink-500' },
              { icon: GraduationCap, title: 'Social Science', desc: 'History, Geography, Economics - Global Perspective', color: 'from-orange-500 to-red-500' },
              { icon: BookOpen, title: 'Commerce', desc: 'Business Studies, Accountancy - Career Foundation', color: 'from-indigo-500 to-violet-500' },
              { icon: Users, title: 'Vocational', desc: 'IT, Painting, Home Science - Skill Development', color: 'from-rose-500 to-fuchsia-500' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
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

