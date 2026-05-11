'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { Headphones, Play, Download, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioGalleryPage() {
  const audios = [
    { title: 'Science - Human Body Systems', duration: '12:45', size: '5.2 MB', date: 'Apr 2026' },
    { title: 'Mathematics - Geometry Proofs', duration: '18:30', size: '7.8 MB', date: 'Mar 2026' },
    { title: 'Hindi Poetry Recitation', duration: '25:12', size: '10.1 MB', date: 'Feb 2026' },
    { title: 'History - Ancient Civilizations', duration: '15:08', size: '6.3 MB', date: 'Jan 2026' },
    { title: 'Business Studies - Entrepreneurship', duration: '22:47', size: '9.4 MB', date: 'Dec 2025' },
  ];

  return (
    <>
      <BrandingBanner />
      <OfficialNav />

      {/* Hero */}
      <section className="min-h-[60vh] bg-gradient-to-br from-gray-900 via-slate-900 to-red-950 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(59,130,246,0.1),transparent)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 mx-auto w-fit">
            <Headphones className="w-6 h-6" />
            <span className="font-black uppercase tracking-wider">Audio Gallery</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-slate-100 to-red-100 bg-clip-text text-transparent drop-shadow-2xl">
            Audio Lessons
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            MP3 downloads for offline learning - NIOS faculty lectures, revision sessions, language pronunciation guides
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              All Downloads
              <span className="ml-2 group-hover:translate-x-1 transition-transform">↓</span>
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              By Subject
            </button>
          </div>
        </div>
      </section>

      {/* Audio Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">Audio Lessons Archive</h2>
              <p className="text-xl text-slate-600">High quality MP3 recordings for offline study</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>Sort by: Date</span>
              <button className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200">Size</button>
            </div>
          </div>

          <div className="space-y-4">
            {audios.map((audio, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 relative"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-indigo-500 transition-all">
                    <Play className={`w-8 h-8 ${i === 0 ? 'text-blue-600' : 'text-slate-500'} transition-colors`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg text-slate-900 line-clamp-1 mb-2 group-hover:text-blue-700 transition-colors">
                      {audio.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{audio.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{audio.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{audio.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <button className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-medium shadow-md transition-all">
                      <Play className="w-4 h-4" />
                      Play
                    </button>
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">
                      <Download className="w-5 h-5 text-slate-600" />
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

