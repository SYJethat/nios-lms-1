'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { Video, Play, Calendar, Eye, Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VideoGalleryPage() {
  const videos = [
    { title: 'Physics - Newton\'s Laws Demo', views: '12.5K', duration: '8:42', date: 'Apr 2026' },
    { title: 'Math - Quadratic Equations', views: '8.7K', duration: '15:23', date: 'Mar 2026' },
    { title: 'English Grammar Workshop', views: '5.2K', duration: '22:10', date: 'Feb 2026' },
    { title: 'Chemistry Practical - Titration', views: '9.1K', duration: '12:05', date: 'Jan 2026' },
    { title: 'History - Indian Freedom Struggle', views: '6.8K', duration: '18:47', date: 'Dec 2025' },
  ];

  return (
    <>
      <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-red-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#3b82f6_0%,transparent_50%)] opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Video className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Video Gallery</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200/80 bg-clip-text text-transparent drop-shadow-2xl">
            NIOS Learning Videos
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Comprehensive video lessons, live classes, practical demonstrations and motivational lectures from NIOS faculty
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Latest Videos
              <motion.span 
                className="ml-2 inline-block" 
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ display: "inline-block" }}
              >
                →
              </motion.span>
            </button>
            <button className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              By Subject
            </button>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-3">Featured Videos</h2>
              <p className="text-xl text-slate-600">Recent uploads sorted by popularity</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all font-medium">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <span className="text-sm text-slate-500">{videos.length} videos</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 overflow-hidden border border-slate-100"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:to-red-500 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/hero.mp4')] bg-cover bg-center opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-12 h-12 text-indigo-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{video.date}</span>
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                    </div>
                    <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

