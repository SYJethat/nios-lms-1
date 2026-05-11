'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import { Image, Calendar, Eye, Grid, Filter } from 'lucide-react';
import BrandingBanner from '@/components/BrandingBanner';

export default function PhotoGalleryPage() {
  return (
    <>
    <BrandingBanner />
      <OfficialNav />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-purple-500/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Image className="w-6 h-6" />
            <span className="font-black text-lg uppercase tracking-wider">Photo Gallery</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
            Visual Moments
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Capturing the spirit of NIOS - events, achievements, student success stories, regional centres
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              View Gallery
              <Grid className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white/30 text-white/90 px-8 py-4 rounded-2xl font-black text-lg backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Events
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center mb-16 -mt-12 relative z-10">
            <button className="px-6 py-2 bg-white text-slate-700 font-black rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
              All Events
            </button>
            <button className="px-6 py-2 bg-white/50 text-slate-600 font-black rounded-full shadow hover:shadow-lg transition-all whitespace-nowrap">
              Convocation 2026
            </button>
            <button className="px-6 py-2 bg-white/50 text-slate-600 font-black rounded-full shadow hover:shadow-lg transition-all whitespace-nowrap">
              Regional Centres
            </button>
            <button className="px-6 py-2 bg-white/50 text-slate-600 font-black rounded-full shadow hover:shadow-lg transition-all whitespace-nowrap">
              Student Achievements
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1516979187457-637a1f4db35b?w=400&h=300&fit=crop",
                title: "Annual Convocation 2026",
                date: "Mar 15, 2026",
                views: "24K"
              },
              {
                img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
                title: "New Regional Centre Opening",
                date: "Mar 10, 2026",
                views: "18K"
              },
              {
                img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
                title: "Science Excellence Awards",
                date: "Mar 5, 2026",
                views: "32K"
              },
              {
                img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587208?w=400&h=300&fit=crop",
                title: "Digital Learning Workshop",
                date: "Feb 28, 2026",
                views: "15K"
              },
              {
                img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
                title: "Student Orientation 2026",
                date: "Feb 20, 2026",
                views: "21K"
              },
              {
                img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
                title: "Examination Centre Visit",
                date: "Feb 15, 2026",
                views: "12K"
              },
              {
                img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
                title: "PTM Programme Launch",
                date: "Feb 10, 2026",
                views: "28K"
              },
              {
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                title: "AI Tutor Beta Launch",
                date: "Feb 5, 2026",
                views: "45K"
              },
            ].map((photo, i) => (
              <div key={i} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden cursor-pointer border border-slate-100">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={photo.img} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-lg text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">{photo.title}</h3>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {photo.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {photo.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black px-16 py-6 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-lg">
              <Image className="w-7 h-7" />
              Load More Photos
            </button>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

