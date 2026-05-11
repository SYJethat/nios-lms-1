'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom Social Icons (since they are missing in local lucide-react version)
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function OfficialFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Information', links: ['About Us', 'Contact Us', 'Vacancies', 'Tenders', 'RTI Disclosure', 'Citizen Charter'] },
    { title: 'Academic', links: ['Secondary', 'Senior Secondary', 'Vocational', 'OBE', 'Life Enrichment', 'LMS Portal'] },
    { title: 'Quick Links', links: ['Forms', 'Results', 'E-Services', 'Audio/Video', 'Mukta Vidya Vani', 'Digital Library'] },
    { title: 'Portal Help', links: ['Privacy Policy', 'Disclaimer', 'Copyright Policy', 'Terms & Conditions', 'Accessibility Help', 'Sitemap'] },
  ];

  return (
    <footer className="bg-slate-900 text-white border-t-2 border-blue-700">
      {/* Top Banner (Optional for Gov Sites but adds weight) */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-40">
 
            {/* Address */}
            <div className="flex gap-4 items-start">
              <div
                className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: 'rgba(29,78,216,0.18)', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[15px] font-bold uppercase tracking-widest text-blue-400 mb-2">Headquarters Address</p>
                <p className="text-sm text-slate-100 leading-relaxed">
                  National Institute of Open Schooling<br />
                  A-24/25, Institutional Area, Sector-62,<br />
                  NOIDA, Gautam Budh Nagar, UP - 201309
                </p>
              </div>
            </div>
 
            {/* Helpline */}
            <div className="flex gap-4 items-start">
              <div
                className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: 'rgba(29,78,216,0.18)', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[15px] font-bold uppercase tracking-widest text-blue-400 mb-2">Student Helpline</p>
                <p className="text-xl font-extrabold text-white tracking-tight tabular-nums">1800 180 9393</p>
                <p className="text-[12px] text-slate-100 mt-1 uppercase tracking-wide">Toll Free </p>
                <p className="text-[12px] text-slate-100 mt-1 uppercase tracking-wide">Mon–Fri, 9:00 AM – 5:30 PM</p>
              </div>
            </div>
 
            {/* Email */}
            <div className="flex gap-4 items-start">
              <div
                className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: 'rgba(29,78,216,0.18)', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[15px] font-bold uppercase tracking-widest text-blue-400 mb-2">Official Email</p>
                <p className="text-sm text-slate-100">lsc@nios.ac.in</p>
                <p className="text-sm text-slate-100 mt-1">chairperson@nios.ac.in</p>
              </div>
            </div>
 
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-24">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-8 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <ExternalLink className="w-0 h-0 group-hover:w-3 group-hover:h-3 transition-all text-blue-500" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/NIOS.png" alt="NIOS" className="h-12 w-auto grayscale brightness-200" />
              <div className="h-10 w-px bg-white/10" />
              <div className="text-[10px] font-bold text-white uppercase tracking-widest">
                National Institute of <br /> Open Schooling
              </div>
            </div>
            <p className="text-[10px] text-slate-500 max-w-sm text-center md:text-left leading-relaxed">
              NIOS is an autonomous institution under Ministry of Education, Government of India, providing high-quality education through Open and Distance Learning.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <button key={i} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Visitors</p>
                  <p className="text-xl font-black text-white tabular-nums tracking-tighter">948,291,2040</p>
               </div>
               <div className="w-px h-10 bg-white/10" />
               <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Updated on</p>
                  <p className="text-sm font-bold text-white">16 April 2026</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Government Logos & Bottom Bar */}
      <div className="bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center justify-items-center py-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="https://vectorseek.com/wp-content/uploads/2023/09/Digital-India-Power-Logo-Vector.svg-.png" alt="Digital India logo" className="h-10 object-contain brightness-200" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="https://www.uxdt.nic.in/wp-content/uploads/2020/06/NIC-LOGO-IDENTITY-VARIANTS_blue-01.png" alt="NIC logo" className="h-10 object-contain brightness-100" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Ministry_of_Education_India.svg" alt="Ministry of Education logo" className="h-10 object-contain brightness-100 invert " />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="https://www.convergence-now.com/wp-content/uploads/2025/02/52.jpg" alt="Convergence Now logo" className="h-10 object-contain rounded brightness-100" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="https://images.seeklogo.com/logo-png/45/2/aadhaar-hindi-logo-png_seeklogo-454106.png" alt="Aadhaar logo" className="h-16 object-contain" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_logo.png" alt="Swayam logo" className="h-10 object-contain brightness-100" />
            </motion.div>
            </div>
          <div className=" flex flex-col items-center gap-6 border-t border-white/5 pt-5">
            <p className="text-xs text-slate-500 font-medium text-center leading-relaxed">
              Website Content Managed by <br className="sm:hidden" />
              <span className="text-blue-900">National Institute of Open Schooling</span> <br />
              This site is designed, hosted and maintained by <br className="sm:hidden" />
              <span className="text-blue-900 underline decoration-white/20 underline-offset-4">National Informatics Centre (NIC)</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <span className="flex items-center gap-2">
                 <ShieldCheck className="w-3 h-3 text-blue-500" />
                 Last Updated: 16-Apr-2026
               </span>
               <span>Copyright © {currentYear} NIOS. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
