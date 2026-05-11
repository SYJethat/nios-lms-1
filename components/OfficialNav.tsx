'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  {
    title: 'About',
    links: [
      { label: 'Overview',           href: '/about/overview' },
      { label: "Vision & Mission",   href: '/about/vision-mission' },
      { label: "Chairman's Message", href: '/about/chairmans-message' },
      { label: 'Committees',         href: '/about/committees' },
      { label: 'Departments',        href: '/about/departments' },
      { label: 'Regional Centres',   href: '/about/regional-centres' },
    ],
  },
  {
    title: 'Academic',
    links: [
      { label: 'Secondary Courses',    href: '/academic/secondary' },
      { label: 'Sr. Secondary Courses', href: '/academic/senior-secondary' },
      { label: 'Open Basic Education', href: '/academic/obe' },
      { label: 'Vocational Education', href: '/academic/vocational' },
      { label: 'Life Enrichment',      href: '/academic/life-enrichment' },
    ],
  },
  {
    title: 'Student Support',
    links: [
      { label: 'Admission',              href: '/student-support/admission' },
      { label: 'Examination / Result',   href: '/student-support/examination-result' },
      { label: 'Study Material',         href: '/student-support/study-material' },
      { label: 'TMA',                    href: '/student-support/tma' },
      { label: 'On Demand Examination',  href: '/student-support/on-demand-examination' },
      { label: 'Student Dashboard',      href: '/student-support/dashboard' },
    ],
  },
  {
    title: 'Notifications',
    links: [
      { label: 'Latest News',    href: '/notifications/latest-news' },
      { label: 'Office Orders',  href: '/notifications/office-orders' },
      { label: 'Tenders',        href: '/notifications/tenders' },
      { label: 'Vacancies',      href: '/notifications/vacancies' },
      { label: 'Press Release',  href: '/notifications/press-release' },
    ],
  },
  {
    title: 'Media',
    links: [
      { label: 'Photo Gallery',    href: '/media/photo-gallery' },
      { label: 'Video Gallery',    href: '/media/video-gallery' },
      { label: 'Mukta Vidya Vani', href: '/media/mukta-vidya-vani' },
      { label: 'NIOS Journal',     href: '/media/journal' },
      { label: 'Audio Gallery',    href: '/media/audio-gallery' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Directory',   href: '/contact/directory' },
      { label: 'Headquarters', href: '/contact/headquarters' },
      { label: 'Grievance',   href: '/contact/grievance' },
      { label: 'Feedback',    href: '/contact/feedback' },
      { label: 'FAQ',         href: '/contact/faq' },
    ],
  },
];

export default function OfficialNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Main Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 h-full">
            <Link href="/" className="px-4 h-full flex items-center hover:bg-blue-800 transition-colors">
              <Home size={18} />
            </Link>

            {navItems.map((item) => (
              <div
                key={item.title}
                className="relative h-full"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-2 h-full flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide hover:bg-blue-800 transition-colors">
                  {item.title}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === item.title ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 top-full w-64 bg-white text-slate-800 shadow-2xl rounded-b-xl overflow-hidden border border-slate-200 z-[60]"
                    >
                      <div className="py-2">
                        {item.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-6 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium border-b border-slate-50 last:border-none"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side: Search & Portal Button */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <input
                type="text"
                placeholder="Search..."
                className="bg-blue-950/50 border border-blue-700 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-48 group-hover:w-64 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={16} />
            </div>

            <Link
              href="/portal"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full transition-all shadow-lg shadow-orange-900/20"
            >
              LMS Portal
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 hover:bg-blue-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-blue-950 border-t border-blue-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] px-2">
                    {item.title}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {item.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-2 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="h-px bg-blue-800 mx-2 mt-4" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}