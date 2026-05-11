'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { MapPin, Phone, Mail, Clock, Building2, Users } from 'lucide-react';

export default function HeadquartersPage() {
  return (
    <>
      <BrandingBanner />
      <OfficialNav />

      {/* Hero */}
      <section className="min-h-[60vh] bg-gradient-to-br from-gray-900 via-slate-900 to-emerald-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-5" /> {/* India map pattern */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full mb-8 mx-auto w-fit">
            <Building2 className="w-6 h-6" />
            <span className="font-black uppercase tracking-wider">Headquarters</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent drop-shadow-2xl">
            NIOS Headquarters
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            A-24/25, Institutional Area, Sector 62, Noida, Uttar Pradesh 201309 - Main administrative campus
          </p>
        </div>
      </section>

      {/* Address & Contact */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="flex items-center gap-4 mb-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">NIOS Head Office</h2>
                    <p className="text-xl text-slate-700">A-24/25, Institutional Area, Sector 62<br />Noida, Uttar Pradesh 201309</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-900 mb-1">Phone</h3>
                      <p className="text-lg text-slate-700">
                        <a href="tel:+911202404915" className="hover:text-blue-600 font-semibold">+91-120-2404915</a><br />
                        <a href="tel:+911802424165" className="text-sm text-emerald-600 font-medium">Toll Free: 1800-180-9393</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-900 mb-1">Email</h3>
                      <p className="text-lg">
                        <a href="mailto:info@nios.ac.in" className="hover:text-orange-600 font-semibold">info@nios.ac.in</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="h-96 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-slate-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-600 mb-3">Interactive Map</h3>
                    <p className="text-slate-500">NIOS HQ Noida · Metro: Sector 62 · 2.5 km from Fortuner Mall</p>
                    <button className="mt-6 bg-emerald-500 text-white px-8 py-3 rounded-xl font-black hover:bg-emerald-600 transition-all shadow-lg">
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours & Services */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100 text-center">
                <Clock className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900 mb-3">Working Hours</h3>
                <div className="space-y-2 text-slate-700 text-lg">
                  <div>Mon-Sat: 9:30 AM - 5:30 PM</div>
                  <div className="text-emerald-600 font-bold">Lunch: 1:30-2:00 PM</div>
                </div>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100 text-center">
                <Users className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900 mb-3">Visitor Info</h3>
                <div className="space-y-1 text-slate-700">
                  <div>Appointments required</div>
                  <div>Valid ID mandatory</div>
                  <div>Security check-in</div>
                </div>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100 text-center md:col-span-1">
                <Building2 className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900 mb-3">Facilities</h3>
                <div className="space-y-1 text-slate-700 text-sm">
                  <div>Library · Conference Hall</div>
                  <div>Computer Centre · AV Studio</div>
                  <div>Exam Branch · Admission Cell</div>
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

