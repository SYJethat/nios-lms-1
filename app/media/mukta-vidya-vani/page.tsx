'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { Mic, Radio, Play, Calendar, Clock, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MuktaVidyaVaniPage() {
  const broadcasts = [
    { title: 'Class 10 Mathematics - Algebra', time: 'Daily 6:00 AM', duration: '30 min', type: 'Live', platform: 'FM Radio' },
    { title: 'Class 12 Physics Revision', time: 'Mon-Fri 7:30 AM', duration: '45 min', type: 'Repeat', platform: 'AIR FM Gold' },
    { title: 'Hindi Literature Lessons', time: 'Sat-Sun 8:00 AM', duration: '60 min', type: 'Live', platform: 'Community Radio' },
    { title: 'TMA Guidance Session', time: 'Every Wed 5:00 PM', duration: '30 min', type: 'Live', platform: 'FM Radio' },
    { title: 'Exam Preparation Tips', time: 'Daily 9:00 PM', duration: '20 min', type: 'Repeat', platform: 'AIR FM Gold' },
  ];

  return (
    <>
      <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#fbbf24_0%,transparent_50%)] opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Radio className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Mukta Vidya Vani</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-orange-100/80 bg-clip-text text-transparent drop-shadow-2xl">
            Radio Education
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            NIOS Radio Lessons broadcast nationwide through All India Radio and Community FM stations - reaching learners without internet access
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-white text-amber-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
              Listen Live
              <motion.span 
                className="ml-2 inline-block" 
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ display: "inline-block" }}
              >
                ▶
              </motion.span>
            </button>
            <button className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all">
              Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Broadcast Schedule */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Broadcast Schedule</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Daily radio lessons across All India Radio FM Gold and Community Radio stations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {broadcasts.map((broadcast, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 border border-slate-100 relative overflow-hidden"
              >
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black ${broadcast.type === 'Live' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {broadcast.type}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900 line-clamp-1">{broadcast.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{broadcast.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-3 h-3" />
                    <span>{broadcast.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 font-medium">
                    <Radio className="w-3 h-3" />
                    <span>{broadcast.platform}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-6 rounded-xl font-black text-sm shadow-lg hover:shadow-xl transition-all uppercase tracking-wide">
                  Listen Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* Radio Partners */}
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-8">Broadcast Partners</h3>
            <div className="flex flex-wrap gap-8 justify-center">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-md">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Radio className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-lg">AIR FM Gold</h4>
                  <p className="text-sm text-slate-600">Nationwide Broadcast Partner</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-md">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Radio className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-lg">Community Radio</h4>
                  <p className="text-sm text-slate-600">Regional Partners</p>
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

