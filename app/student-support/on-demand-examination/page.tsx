'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Clock, Calendar, CheckCircle, MapPin, Download } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function OnDemandExaminationPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Clock className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">On Demand Examination</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            ODE Anytime
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Take exams when you are ready! Flexible On-Demand Examination system for Secondary &amp; Sr. Secondary
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#schedule-exam" className="group bg-white text-teal-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Schedule Exam
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#centres" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Exam Centres
            </a>
          </div>
        </div>
      </section>

      {/* Schedule Exam */}
      <section id="schedule-exam" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-8">
              <CheckCircle className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Same Day Results</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">On Demand Examination Process</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Book your exam slot anytime during the month</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                  Book Exam Slot
                </h3>
                <div className="space-y-4 text-lg">
                  <p><strong>✓</strong> Available 24×7 throughout the year</p>
                  <p><strong>✓</strong> Secondary &amp; Sr. Secondary subjects</p>
                  <p><strong>✓</strong> Same day results declaration</p>
                  <p><strong>✓</strong> 144 exam centres across India</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl">
                <div className="text-4xl font-black mb-4">₹500</div>
                <p className="text-emerald-100 mb-6">Per Subject Exam Fee</p>
                <a href="#" className="block w-full bg-white text-emerald-900 font-black py-4 px-8 rounded-2xl text-center hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Book Now →
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-orange-600" />
                  Exam Timings
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-black text-orange-600 mb-2">Morning</div>
                    <div className="text-sm text-slate-600 uppercase tracking-wide">09:30 AM - 12:30 PM</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-black text-orange-600 mb-2">Evening</div>
                    <div className="text-sm text-slate-600 uppercase tracking-wide">02:00 PM - 05:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

