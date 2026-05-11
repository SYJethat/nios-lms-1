'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Users, Briefcase, Calendar, Download, MapPin } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function VacanciesPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Users className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Career Opportunities</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Join NIOS Team
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Faculty, administrative and technical positions at NIOS Headquarters and Regional Centres
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#current-openings" className="group bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Current Vacancies
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#application" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Apply Online
            </a>
          </div>
        </div>
      </section>

      {/* Current Vacancies */}
      <section id="current-openings" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-8">
              <Briefcase className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">12 Open Positions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Current Vacancies</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Regular and contractual positions available</p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                title: "Academic Counsellor (Contractual)",
                location: "NIOS Headquarters, Noida",
                vacancies: "15",
                salary: "₹35,000 - ₹45,000 PM",
                due: "Apr 15, 2026",
                category: "Academic"
              },
              {
                title: "Subject Matter Expert - Mathematics",
                location: "Regional Centre Delhi",
                vacancies: "3",
                salary: "₹60,000 - ₹80,000 PM",
                due: "Apr 10, 2026",
                category: "Faculty"
              },
              {
                title: "IT Support Engineer",
                location: "NIOS HQ, Noida",
                vacancies: "2",
                salary: "₹45,000 - ₹55,000 PM",
                due: "Apr 05, 2026",
                category: "Technical"
              },
              {
                title: "Examination Assistant (Contractual)",
                location: "Multiple Regional Centres",
                vacancies: "25",
                salary: "₹25,000 - ₹30,000 PM",
                due: "Mar 31, 2026",
                category: "Examination"
              },
            ].map((position, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-black text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">{position.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {position.location}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide">
                      {position.vacancies} slots
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm mb-2">
                    <span className="font-black text-emerald-700">{position.salary}</span>
                    <span className="text-slate-500 font-medium uppercase tracking-wide">{position.category}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Last Date: <span className="font-black text-slate-900">{position.due}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-4 lg:pt-0 lg:border-l lg:border-slate-200 lg:pl-6">
                  <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-black uppercase tracking-wide text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    <Download className="w-4 h-4" />
                    Notification
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-black uppercase tracking-wide text-xs transition-all shadow-sm hover:shadow-md">
                    Apply Online
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a href="#" className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black px-12 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-lg">
              <Users className="w-6 h-6" />
              View Complete List
            </a>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

