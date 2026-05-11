'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { LayoutDashboard, Calendar, BookOpen, Award, TrendingUp } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function StudentDashboardPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <LayoutDashboard className="w-6 h-6" />
              <span className="font-black text-lg uppercase tracking-wider">Student Dashboard</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
              Learner Portal
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              Complete learning management system - Track courses, assignments, exams, results in one place
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#login" className="group bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
                Login Here
                <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Your Learning Dashboard</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16">Everything you need in one place</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-20">
            {[
              { icon: BookOpen, title: 'My Courses', count: '5 Active', color: 'from-blue-500 to-indigo-600', desc: 'Track progress, SLM, videos' },
              { icon: Calendar, title: 'Assignments', count: '3 Pending', color: 'from-orange-500 to-red-600', desc: 'TMA submission & status' },
              { icon: Award, title: 'Exams', count: 'Next: Apr 15', color: 'from-emerald-500 to-teal-600', desc: 'Public & ODE scheduling' },
              { icon: TrendingUp, title: 'Results', count: '86% Avg', color: 'from-purple-500 to-pink-600', desc: 'Instant marks & certificates' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all border border-slate-100 text-center h-[280px] flex flex-col justify-between">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                  <div className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">{item.count}</div>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="max-w-2xl mx-auto mb-12">
              <h3 className="text-3xl font-black text-slate-900 mb-6">Ready to Start?</h3>
              <p className="text-lg text-slate-600 mb-8">Access your personalized dashboard with enrollment number</p>
            </div>
            <div className="bg-gradient-to-r from-slate-900 to-red-900 text-white p-12 rounded-3xl shadow-2xl max-w-2xl mx-auto">
              <div className="text-4xl font-black mb-4">ENR-2025-XXXXXX</div>
              <p className="text-lg mb-8 opacity-90">Your Enrollment Number</p>
              <button className="w-full bg-white text-slate-900 font-black py-5 px-10 rounded-2xl text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-wider">
                Access Dashboard →
              </button>
            </div>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

