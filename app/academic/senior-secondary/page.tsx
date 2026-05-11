'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { GraduationCap, BookOpen, Users, Award, Star } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function SeniorSecondaryCoursesPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <GraduationCap className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Senior Secondary Courses</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Class 12 Mastery
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Advanced Senior Secondary Programs preparing students for higher education and professional careers
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#streams" className="group bg-white text-purple-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Explore Streams
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#admissions" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Eligibility Criteria
            </a>
          </div>
        </div>
      </section>

      {/* Streams Overview */}
      <section id="streams" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full mb-8">
              <Star className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Stream Options</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">NIOS Sr. Secondary Streams</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Science, Commerce, Arts streams with flexible subject combinations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Science Stream', desc: 'Physics, Chemistry, Biology/Maths + English', color: 'from-emerald-500 to-green-500' },
              { icon: Award, title: 'Commerce Stream', desc: 'Accountancy, Economics, Business Studies + IP', color: 'from-blue-500 to-indigo-500' },
              { icon: Users, title: 'Arts/Humanities', desc: 'History, Geography, Political Science + Languages', color: 'from-purple-500 to-pink-500' },
              { icon: GraduationCap, title: 'Vocational Combo', desc: 'ITI + Academic subjects for skill certification', color: 'from-orange-500 to-yellow-500' },
              { icon: Star, title: 'Custom Combination', desc: 'Mix any 5 subjects per NIOS transfer of credit rules', color: 'from-rose-500 to-fuchsia-500' },
              { icon: BookOpen, title: 'Open Electives', desc: 'Home Science, Painting, Environmental Science', color: 'from-sky-500 to-cyan-500' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
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

