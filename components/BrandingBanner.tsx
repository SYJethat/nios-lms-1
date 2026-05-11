'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Globe, Accessibility, Menu, X, ChevronDown } from 'lucide-react';

export default function BrandingBanner() {
  return (
    <div className="bg-white border-b border-slate-200">
      {/* Top Utility Bar (GIGW Standard) */}
      <div className="bg-slate-900 text-white text-[10px] md:text-[11px] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 border-r border-slate-700 pr-4">
              भारत सरकार | GOVERNMENT OF INDIA
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              शिक्षा मंत्रालय | MINISTRY OF EDUCATION
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#main" className="hover:underline">Skip to main content</Link>
            <Link href="/sitemap" className="hover:underline">Sitemap</Link>
            <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
              <button className="hover:text-blue-400 transition-colors">A-</button>
              <button className="font-bold border px-1.5 rounded border-slate-700">A</button>
              <button className="hover:text-blue-400 transition-colors">A+</button>
            </div>
            <select className="bg-slate-800 border-none rounded text-[10px] outline-none cursor-pointer px-1 py-0.5 ml-2">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Branding Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* GoI Emblem & Ministry Name */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative w-12 h-16 sm:w-14 sm:h-20 shrink-0">
              <img 
                src="/NIOS.png" 
                alt="Emblem of India"
                className="object-contain h-full"
              />
            </div>
            <div className="flex flex-col border-l border-slate-300 pl-4 md:pl-6 py-1">
              <h1 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight uppercase tracking-tight">
                राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान
              </h1>
              <h2 className="text-xs sm:text-sm font-medium text-slate-600 leading-tight uppercase">
                National Institute of Open Schooling (NIOS)
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">
                An Autonomous Institution under Ministry of Education, Govt. of India
              </p>
            </div>
          </div>

          {/* Right Section: NIOS Logo & G20/AKAM (Common for Gov Sites) */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-blue-800 leading-none">ISO 9001:2015</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter mt-1">Certified Institution</p>
              </div>
              <img 
                src="/pngwing.com.png" 
                alt="NIOS Official Logo"
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </div>
            {/* National Initiative Logos */}
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6 h-12">
               <img src="https://www.pmindia.gov.in/wp-content/uploads/2022/11/g20-image.jpg" alt="G20 Logo" className="h-full object-contain  opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
               <img src="https://cdn.shriramgi.com/webassets/blogs/fcdc4391-1daa-4f91-9f64-63710d66daa2_Aazadi-ka-amritmahotsav.jpg" alt="Azadi ka Amrit Mahotsav" className="h-full object-contain  opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
