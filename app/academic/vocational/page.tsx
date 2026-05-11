'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Wrench, Briefcase, GraduationCap, Star, Users } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function VocationalEducationPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Wrench className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Vocational Education</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Skill Development
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Industry-ready vocational courses alongside academic programs for immediate employability
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#courses" className="group bg-white text-orange-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Available Courses
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#certification" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Certification Process
            </a>
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section id="courses" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full mb-8">
              <Briefcase className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">40+ Courses</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Vocational Courses Catalogue</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">NIOS offers diverse vocational education programs at Secondary & Sr. Secondary levels</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Wrench, title: 'Electrical Technician', desc: 'House wiring, appliances repair, safety standards', color: 'from-orange-400 to-amber-400' },
              { icon: Briefcase, title: 'Computer Applications', desc: 'MS Office, internet, basic programming', color: 'from-blue-400 to-indigo-400' },
              { icon: Users, title: 'Beauty & Wellness', desc: 'Cosmetology, grooming, salon management', color: 'from-rose-400 to-pink-400' },
              { icon: GraduationCap, title: 'Carpentry & Plumbing', desc: 'Furniture making, house repairs, estimation', color: 'from-emerald-400 to-teal-400' },
              { icon: Star, title: 'Catering Management', desc: 'Food preparation, hygiene, entrepreneurship', color: 'from-purple-400 to-violet-400' },
              { icon: Wrench, title: 'Yoga & Fitness', desc: 'Asanas, anatomy, wellness instructor training', color: 'from-sky-400 to-cyan-400' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">{item.title}</h3>
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

