'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { FileText, Download, Calendar, Users, Building } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function OfficeOrdersPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-slate-900 via-gray-900 to-stone-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <FileText className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Office Orders</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Official Orders
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            All administrative office orders, circulars, notifications issued by NIOS Headquarters and Regional Centres
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#latest" className="group bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Latest Orders
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            <a href="#categories" className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              By Category
            </a>
          </div>
        </div>
      </section>

      {/* Latest Orders */}
      <section id="latest" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white px-6 py-3 rounded-full mb-8">
              <Building className="w-5 h-5" />
              <span className="font-black uppercase tracking-wider text-sm">Headquarters Orders</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Recent Office Orders</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Latest administrative notifications and circulars</p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                title: "Examination Centre Allotment Order No. 45/2026",
                date: "March 20, 2026",
                category: "Examination Branch",
                file: "OO-45-2026.pdf",
                size: "245 KB"
              },
              {
                title: "TMA Evaluation Guidelines for April Cycle",
                date: "March 18, 2026",
                category: "Academic Department",
                file: "OO-44-2026.pdf",
                size: "189 KB"
              },
              {
                title: "Regional Centre Staff Transfer Orders",
                date: "March 15, 2026",
                category: "HR Division",
                file: "OO-43-2026.pdf",
                size: "312 KB"
              },
              {
                title: "Fee Structure Revision FY 2026-27",
                date: "March 12, 2026",
                category: "Finance Branch",
                file: "OO-42-2026.pdf",
                size: "167 KB"
              },
              {
                title: "New Course Approval - AI & Data Science",
                date: "March 8, 2026",
                category: "Academic Council",
                file: "OO-41-2026.pdf",
                size: "298 KB"
              },
            ].map((order, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-black text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-slate-700 transition-colors">{order.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {order.date}
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-wide">
                      {order.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center text-right">
                  <div className="text-xs text-slate-500">{order.size}</div>
                  <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-700 text-white px-6 py-2 rounded-xl font-black uppercase tracking-wide text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a href="#" className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-slate-900 text-white font-black px-12 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-lg">
              <Download className="w-6 h-6" />
              View Complete Archive (2000+ Orders)
            </a>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

