'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Megaphone, Calendar, Eye, Clock } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function LatestNewsPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-rose-900 via-red-900 to-orange-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Megaphone className="w-6 h-6" />
              <span className="font-black text-lg uppercase tracking-wider">Latest News</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
              News Updates
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              Latest announcements, press releases and important updates from NIOS Headquarters
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Public Examination April 2026 Schedule Released",
                excerpt: "Detailed exam schedule for Secondary and Sr. Secondary public exams. Admit cards from March 25th.",
                date: "March 15, 2026",
                views: "2.4K",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
              },
              {
                title: "On-Demand Examination Centres Expanded to 144",
                excerpt: "New exam centres added in Tier-2/3 cities. Now available across all states.",
                date: "March 10, 2026",
                views: "1.8K",
                image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=250&fit=crop",
              },
              {
                title: "New SLM Books Available for Download",
                excerpt: "Updated Self Learning Material for 2026 batch now available in digital format.",
                date: "March 5, 2026",
                views: "3.2K",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
              },
              {
                title: "TMA Submission Extended till March 31st",
                excerpt: "Final extension for Tutor Marked Assignment submission for April exam cycle.",
                date: "Feb 28, 2026",
                views: "4.1K",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
              },
              {
                title: "Regional Centre Inauguration - New Delhi",
                excerpt: "New NIOS Regional Centre opened in Dwarka, Delhi with advanced facilities.",
                date: "Feb 20, 2026",
                views: "1.2K",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
              },
              {
                title: "NEP 2020 Integration Progress Report",
                excerpt: "NIOS competency-based assessment implementation status update.",
                date: "Feb 15, 2026",
                views: "2.8K",
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
              },
            ].map((news, i) => (
              <div key={i} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden border border-slate-100">
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wide text-slate-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{news.date}</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Eye className="w-4 h-4" />
                      <span>{news.views}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-2">{news.excerpt}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-orange-600 font-black uppercase tracking-wide text-sm hover:text-orange-700 transition-colors">
                    Read More
                    <span className="w-4 h-4 border-r border-orange-600" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a href="#" className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 text-white font-black px-12 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-lg">
              <Megaphone className="w-6 h-6" />
              View All News
            </a>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

