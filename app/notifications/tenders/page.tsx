'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { FileText, Calendar, Download, Eye, Building } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function TendersPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-gray-900 via-slate-900 to-stone-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <FileText className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Tenders</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Tender Notices
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Current and archived tender documents for procurement, services and works from NIOS departments
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#current" className="group bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Active Tenders
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#archive" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Tender Archive
            </a>
          </div>
        </div>
      </section>

      {/* Active Tenders */}
      <section id="current" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white px-6 py-3 rounded-full mb-8">
              <Building className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">7 Active Tenders</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Current Tenders</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Tenders open for bidding</p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                title: "Tender for Printing SLM Books 2026 Batch",
                ref: "NIOS/PRINT/2026/01",
                dept: "Academic Printing Division",
                due: "Apr 10, 2026",
                value: "₹2.45 Cr",
                views: "156"
              },
              {
                title: "Annual Maintenance Contract - IT Infrastructure",
                ref: "NIOS/IT/AMC/2026/02",
                dept: "IT Department",
                due: "Apr 05, 2026",
                value: "₹85 Lakh",
                views: "89"
              },
              {
                title: "Supply of Desktop Computers (500 Units)",
                ref: "NIOS/HW/2026/03",
                dept: "Hardware Procurement",
                due: "Mar 28, 2026",
                value: "₹1.25 Cr",
                views: "234"
              },
              {
                title: "Website Development & Maintenance",
                ref: "NIOS/WEB/2026/04",
                dept: "Digital Services",
                due: "Apr 15, 2026",
                value: "₹65 Lakh",
                views: "67"
              },
            ].map((tender, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-black text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-slate-700 transition-colors">{tender.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-2">
                    <span className="font-mono bg-slate-100 px-3 py-1 rounded-full text-xs uppercase tracking-wide">{tender.ref}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {tender.due}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-700 font-semibold">{tender.dept}</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Eye className="w-4 h-4" />
                      {tender.views} views
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
                  <div className="bg-emerald-100 text-emerald-800 font-black px-4 py-2 rounded-xl text-sm">
                    {tender.value}
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-700 text-white px-6 py-3 rounded-xl font-black uppercase tracking-wide text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    <Download className="w-4 h-4" />
                    Documents
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a href="#" className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-slate-900 text-white font-black px-12 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-lg">
              <Download className="w-6 h-6" />
              Register as Vendor
            </a>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}
