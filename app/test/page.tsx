"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GraduationCap, ArrowRight, Brain, Globe, Shield, Zap, BarChart3, MessageCircle, Award, ExternalLink, Users, PieChart, BookOpen, ChevronRight, MapPin, Video, Target, ArrowUpRight, FileText, School, PlaySquare, Library, UserCheck, Flag, ClipboardCheck, LayoutGrid, Book, Image as ImageIcon, Info, CheckCircle, Radio, Trophy, Clipboard, FileStack, Briefcase, Star, Calendar, Scale, Download, Gavel, Headphones, Heart, HelpCircle, Mic2, RotateCcw, Search, Accessibility, FileWarning, Bell, MessageSquare, Phone, Type, Eye, Languages } from "lucide-react";
import { useRef, useState } from "react";

// Official Government Components
import BrandingBanner from "@/components/BrandingBanner";
import OfficialNav from "@/components/OfficialNav";
import NewsTicker from "@/components/NewsTicker";
import KeyPersonnel from "@/components/KeyPersonnel";
import OfficialFooter from "@/components/OfficialFooter";
import Hero from "@/components/Hero";
import LMSPopup from "@/components/LMSPopup";
import ChatbotToggle from "@/components/ChatbotToggle";

const stats = [
  { label: "Active Learners", value: "2.4M+" },
  { label: "Courses Available", value: "850+" },
  { label: "Certified Teachers", value: "12,000+" },
  { label: "States Covered", value: "36" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CollaborationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-110vw"]);

  return (
    <div ref={containerRef} className="relative bg-[#F8FAFC] h-[200vh] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="sticky top-20 h-screen w-full flex flex-col justify-center overflow-hidden ">
        <div className="text-center mb-12 w-full max-w-7xl mx-auto z-10 flex-shrink-0 px-8">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-1.5 h-8 bg-blue-700 rounded-full" />
             <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Collaboration & Tech Partners</h2>
          </div>
          <p className="text-left text-slate-500 font-medium max-w-2xl mb-12">
            NIOS AI Platform is integrated with global technology leaders to provide world-class educational infrastructure for millions of learners.
          </p>
        </div>

        <motion.div style={{ x }} className="flex items-center px-[20vw] gap-[5vw] w-max">
          {/* Card 1 */}
          <div className="w-[80vw] lg:w-[700px] h-[350px] flex-shrink-0 flex flex-col justify-between p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="relative z-10 max-w-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Integrated AI Ecosystem</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Built on sovereign educational infrastructure, ensuring full compliance with data residency norms while providing state-of-the-art AI tutoring.
              </p>
            </div>
            <div className="absolute right-12 bottom-12 w-48 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <img src="/NIOSlogo_with_title.png" alt="NIOS" className="w-full h-auto" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-[80vw] lg:w-[700px] h-[350px] flex-shrink-0 flex flex-col justify-between p-10 rounded-3xl bg-blue-900 text-white shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="relative z-10 max-w-lg">
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight text-blue-400">Institutional Governance</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                An autonomous institution under the Ministry of Education, implementing NEP 2020 via innovative digital-first strategies.
              </p>
            </div>
            <div className="absolute right-12 bottom-12 w-48 opacity-20 group-hover:opacity-100 transition-all duration-700">
              <img src="https://www.education.gov.in/sites/upload_files/mhrd/files/logo_2.png" alt="MoE" className="w-60 h-auto brightness-900" />
            </div>
          </div>
          {/* Card 3 */}
          <div className="w-[80vw] lg:w-[700px] h-[350px] flex-shrink-0 flex flex-col justify-between p-10 rounded-3xl bg-blue-900 text-white shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="relative z-10 max-w-lg">
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight text-blue-400">UDIES Portal</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                UDISE+ is a unified system for collecting, processing, and disseminating data on school education in India. It provides real-time data on school infrastructure, student enrollment, teacher deployment, and learning outcomes.
              </p>
            </div>
            <div className="absolute right-12 bottom-12 w-48 opacity-20 group-hover:opacity-100 transition-all duration-700">
              <img src="https://sochinternational.in/wp-content/uploads/Unified-District-Information-System-for-Education-490x202.png" alt="MoE" className="w-60 h-auto brightness-100" />
            </div>
          </div>
          {/* Card 4 */}
          <div className="w-[80vw] lg:w-[700px] h-[350px] flex-shrink-0 flex flex-col justify-between p-10 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-white/10">
            <div className="relative z-10 max-w-lg">
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight text-blue-400">Swayam Portal</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                Swayam is a program initiated by the Government of India to provide free and open online courses to Indian citizens.
              </p>
            </div>
            <div className="absolute right-12 bottom-12 w-48 opacity-20 group-hover:opacity-100 transition-all duration-700">
              <img src="https://storage.googleapis.com/swayam2_central/assets/img/swayam_logo.png" alt="Swayam" className="w-60 h-auto brightness-100" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AIFactorySection = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layersData = [
    { 
      label: "CURRICULUM", 
      title: "Sovereign Framework", 
      desc: "Digital data hosted on secure Indian infrastructure, fully compliant with national safety guidelines.",
      color: "bg-white", 
      z: 0, 
      border: "border-gray-200 text-slate-400",
      activeBorder: "border-blue-500 shadow-blue-500/20"
    },
    { 
      label: "AI ENGINE", 
      title: "High-Performance Scaling", 
      desc: "Automated assessment and proctoring systems that scale for millions of learners nationwide.",
      color: "bg-blue-600", 
      z: 100, 
      border: "border-blue-400 text-white",
      activeBorder: "border-white shadow-white/40"
    },
    { 
      label: "CERTIFICATION", 
      title: "Skill Mapping", 
      desc: "Outcome-based learning objectives mapped through intelligent knowledge graphs.",
      color: "bg-slate-900", 
      z: 200, 
      border: "border-slate-700 text-blue-400",
      activeBorder: "border-blue-400 shadow-blue-400/50"
    }
  ];

  return (
    <div className="relative bg-slate-50 py-24 px-8 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="w-1.5 h-8 bg-blue-700 rounded-full" />
             <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Learning Factory</h2>
          </div>
          <h3 className="text-xl font-medium text-slate-500 max-w-2xl">
            Sovereign AI infrastructure built for the future of inclusive education in India.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12 items-center">
           <div className="relative z-10 flex justify-center items-center h-[500px]">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 cursor-pointer" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-45deg)" }}>
              {layersData.map((layer, idx) => (
                <motion.div
                  key={layer.label}
                  initial={{ z: 300, opacity: 0 }}
                  animate={{ 
                    z: activeLayer === idx ? layer.z + 80 : layer.z,
                    opacity: 1,
                    scale: activeLayer === idx ? 1.05 : 1
                  }}
                  whileHover={{ z: activeLayer === idx ? layer.z + 100 : layer.z + 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => setActiveLayer(idx)}
                  className={`absolute inset-0 ${layer.color} border-2 ${activeLayer === idx ? layer.activeBorder : layer.border} shadow-2xl rounded-2xl flex items-center justify-center transition-colors duration-300`}
                >
                  <span className="font-black rotate-45 transform-gpu select-none text-xl tracking-widest hidden sm:block uppercase">
                    {layer.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {layersData.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ 
                  opacity: activeLayer === idx ? 1 : 0.4,
                  x: activeLayer === idx ? 0 : 10,
                  scale: activeLayer === idx ? 1.02 : 1
                }}
                onClick={() => setActiveLayer(idx)}
                className={`pl-8 border-l-4 ${activeLayer === idx ? 'border-blue-700' : 'border-blue-700/20'} cursor-pointer hover:border-blue-700 transition-all py-2`}
              >
                <h4 className={`text-lg font-bold ${activeLayer === idx ? 'text-slate-900' : 'text-slate-400'} mb-2 uppercase tracking-tight transition-colors`}>{step.title}</h4>
                <p className={`${activeLayer === idx ? 'text-slate-600' : 'text-slate-400'} leading-relaxed font-medium transition-colors`}>{step.desc}</p>
                {activeLayer === idx && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     className="mt-4 flex items-center gap-2 text-blue-700 font-bold text-sm tracking-widest"
                   >
                     LEARN MORE <ArrowRight size={14} />
                   </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickLinksSection = () => {
  const links = [
    { label: "Online Admission", icon: GraduationCap, color: "from-blue-600 to-red-800", desc: "Secondary & Sr. Secondary Admission" },
    { label: "Course Material", icon: BookOpen, color: "from-slate-700 to-slate-900", desc: "Self Learning Material (SLM)" },
    { label: "Examination", icon: ClipboardCheck, color: "from-indigo-600 to-indigo-800", desc: "Results, DATESHEET & TMA" },
    { label: "Study Centres", icon: School, color: "from-blue-800 to-slate-900", desc: "AI / AVI / OBE Centres" },
    { label: "Video Gallery", icon: PlaySquare, color: "from-blue-500 to-indigo-600", desc: "Educational Video Content" },
    { label: "Latest Notices", icon: Bell, color: "from-red-600 to-red-800", desc: "Important Announcements" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 w-1/4 h-full bg-slate-50 border-l border-slate-100 hidden lg:block" />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="text-left">
            <div className="flex items-center gap-3 text-blue-700 font-black uppercase tracking-[0.2em] text-xs mb-4">
               <LayoutGrid size={16} />
               Quick Access
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Student Services Hub</h2>
          </div>
          <button className="text-sm font-bold text-blue-700 flex items-center gap-2 hover:gap-3 transition-all">
             View All Services <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link) => (
            <motion.div
              key={link.label}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col gap-6"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <link.icon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                 <h3 className="text-xl font-bold text-slate-900 tracking-tight">{link.label}</h3>
                 <p className="text-sm text-slate-500 font-medium">{link.desc}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600">
                 <span className="text-[10px] font-black uppercase tracking-widest">Access Now</span>
                 <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsBoardSection = () => {
    const [activeTab, setActiveTab] = useState('News');
    
    const categories = ['News', 'Circulars', 'Events'];
    
    const content = {
        News: [
            { date: '16 APR 2026', title: 'Schedule for October/November 2026 Examination for Secondary and Senior Secondary', isNew: true },
            { date: '12 APR 2026', title: 'Public Notice regarding extension of last date for TMA submission', isNew: false },
            { date: '08 APR 2026', title: 'Notification for D.El.Ed. (Special Education) Examination', isNew: false },
        ],
        Circulars: [
            { date: '15 APR 2026', title: 'Revised guidelines for Accreditation of Study Centres', isNew: true },
            { date: '10 APR 2026', title: 'Circular regarding implementation of NEP 2020 in Vocational courses', isNew: false },
        ],
        Events: [
            { date: '20 APR 2026', title: 'National Workshop on AI in Open Schooling at NIOS HQ', isNew: true },
            { date: '25 APR 2026', title: 'Celebration of World Book Day across Regional Centres', isNew: false },
        ]
    };

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Side: Tabs and Title */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                           <div className="flex items-center gap-3 text-blue-700 font-black uppercase tracking-[0.2em] text-xs mb-6">
                              <Bell size={16} className="animate-bounce" />
                              What's New
                           </div>
                           <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-10 leading-tight">
                              Latest Updates <br />& Announcements
                           </h2>
                           
                           <div className="flex flex-col gap-2">
                              {categories.map((cat) => (
                                <button
                                  key={cat}
                                  onClick={() => setActiveTab(cat)}
                                  className={`px-6 py-4 rounded-2xl text-left font-bold transition-all flex items-center justify-between group ${
                                    activeTab === cat 
                                    ? 'bg-blue-700 text-white shadow-xl shadow-blue-900/20' 
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  {cat}
                                  <ChevronRight size={16} className={`${activeTab === cat ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} transition-all`} />
                                </button>
                              ))}
                           </div>
                        </div>
                    </div>

                    {/* Right Side: List content */}
                    <div className="lg:col-span-8">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-4"
                        >
                            {(content as any)[activeTab].map((item: any, i: number) => (
                                <div key={i} className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer flex gap-10 items-center">
                                    <div className="flex-shrink-0 text-center border-r border-slate-100 pr-10 hidden sm:block">
                                        <div className="text-2xl font-black text-slate-900">{item.date.split(' ')[0]}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">{item.date.split(' ').slice(1).join(' ')}</div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            {item.isNew && (
                                                <span className="px-2 py-0.5 bg-red-500 text-white text-[8px] font-black rounded uppercase">New</span>
                                            )}
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTab}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-snug">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                       <Download size={18} />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                        
                        <div className="mt-10 p-4 border-t border-slate-200 flex justify-center">
                           <button className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2">
                             View Complete Archive <ExternalLink size={14} />
                           </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PortalHubSection = () => {
    const portals = [
        { label: "Virtual Open School", icon: Globe },
        { label: "On Demand Examination", icon: Zap },
        { label: "e-Accreditation", icon: CheckCircle },
        { label: "Mukta Vidya Vani", icon: Radio },
        { label: "Awards & Honors", icon: Trophy },
        { label: "Tender Notices", icon: FileStack },
        { label: "Success Stories", icon: Star },
        { label: "Research Projects", icon: Search },
    ];

    return (
        <section className="py-24 bg-[#0F172A] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
                    <div className="max-w-2xl text-left">
                        <div className="inline-flex items-center gap-2 text-blue-400 font-black uppercase tracking-[0.3em] mb-6 text-xs px-3 py-1 bg-blue-400/10 rounded-full border border-blue-400/20">
                           <LayoutGrid className="w-3 h-3" />
                           Services Portal
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                           Unified Digital Hub for <br />
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">NIOS Ecosystem</span>
                        </h2>
                    </div>
                    <button className="group px-8 py-4 bg-white text-slate-900 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-50 transition-all flex items-center gap-3">
                        View All Digital Services
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {portals.map((portal) => (
                        <motion.div 
                            key={portal.label}
                            whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                            className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col gap-8 group relative"
                        >
                            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                               <ArrowUpRight className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl w-fit shadow-xl shadow-blue-900/40 group-hover:scale-110 transition-transform">
                                <portal.icon size={28} className="text-white" />
                            </div>
                            <h3 className="font-bold text-xl leading-tight uppercase tracking-tight pr-4">{portal.label}</h3>
                            <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                               Access Portal
                               <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AccessibilityToolbar = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-2 p-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl hidden lg:flex"
        >
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors group relative" title="Increase Font">
                <Type size={18} />
                <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Text Size +</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors group relative" title="Contrast Mode">
                <Eye size={18} />
                <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Contrast Mode</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors group relative" title="Language">
                <Languages size={18} />
                <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Switch to Hindi</span>
            </button>
            <div className="h-px bg-slate-200 mx-2" />
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group relative" title="Help">
                <HelpCircle size={18} />
                <span className="absolute left-full ml-3 px-2 py-1 bg-blue-700 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Support</span>
            </button>
        </motion.div>
    );
};

const RegionalNetworkSection = () => {
    const stats = [
        { label: "Regional Centres", value: "23" },
        { label: "Sub-Regional Centres", value: "11" },
        { label: "Study Centres", value: "6,000+" },
        { label: "States Covered", value: "36" },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/India_location_map.svg/1200px-India_location_map.svg.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 text-blue-700 font-black uppercase tracking-[0.3em] text-[10px] mb-6 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 shadow-sm">
                       <Globe size={14} className="animate-spin-slow" />
                       National Footprint
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Largest Global Network for <br />
                        <span className="text-blue-700">Open & Distance Learning</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center hover:bg-blue-50/50 hover:border-blue-100 transition-all group"
                        >
                            <div className="text-4xl font-black text-slate-900 mb-4 tracking-tighter group-hover:text-blue-700 transition-colors">{stat.value}</div>
                            <div className="h-1 w-12 bg-blue-700 mx-auto mb-6 rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 leading-relaxed">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-12 bg-blue-900 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Locate a Study Centre Near You</h3>
                            <p className="text-blue-100/60 leading-relaxed">
                                Access quality education in your local community through our extensive network of accredited institutions across India and abroad.
                            </p>
                        </div>
                        <button className="px-10 py-4 bg-white text-blue-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-50 transition-all shadow-xl flex items-center gap-3">
                            Search All Centres
                            <MapPin size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900">
      <LMSPopup/>
      <BrandingBanner />
      <OfficialNav />
      <NewsTicker />
      
      {/* Hero Section */}
      {/* <Hero /> */}
      <section className="relative text-white min-h-[85vh] flex items-center overflow-hidden">
              <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0">
                <source src="/hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-slate-900/40 z-10 backdrop-blur-[2px]"></div> 
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-20 w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8, ease: "easeOut" }} 
                  className="max-w-4xl"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 backdrop-blur-md mb-10 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">National Initiative | NEP 2020 Aligned</span>
                  </div>
                  
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-indigo-200 drop-shadow-2xl">
                      NIOS AI LMS
                    </span>
                    <br />
                    <span className="text-white drop-shadow-xl text-4xl sm:text-5xl lg:text-6xl">Platform</span>
                  </h1>

                  <p className="text-xl sm:text-2xl text-slate-100/80 font-medium mb-12 max-w-2xl leading-relaxed drop-shadow-lg">
                    Empowering 1.4 Billion aspirations through <span className="text-blue-300 font-bold">Inclusive Digital Excellence</span> and Sovereign AI infrastructure.
                  </p>

                  <div className="flex flex-wrap gap-6">
                     <button className="px-10 py-4 bg-white text-blue-900 font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl hover:bg-blue-50 transition-all hover:-translate-y-1">
                        Get Started
                     </button>
                     <button className="px-10 py-4 border-2 border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all">
                        Learn More
                     </button>
                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 hidden md:flex"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Scroll to Explore</span>
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                   <motion.div 
                     animate={{ y: [0, 12, 0] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="w-1.5 h-1.5 bg-blue-400 rounded-full" 
                   />
                </div>
              </motion.div>
      </section>

      {/* Stats Overlay Strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block">
                  <p className="text-4xl font-black text-blue-700 tracking-tighter mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-1 bg-blue-100 absolute -bottom-1 left-0 rounded-full -z-10 group-hover:bg-blue-200 transition-colors"
                  />
                </div>
                <div className="h-0.5 w-8 bg-slate-200 mx-auto my-3" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <KeyPersonnel />
      
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-1.5 h-8 bg-blue-700 rounded-full" />
                   <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Institutional Vision</h2>
                </div>
                <p className="text-xl font-medium text-slate-600 leading-relaxed italic border-l-4 border-blue-100 pl-6">
                  "Sustainable inclusive learning through open and distance excellence — ensuring Education for All."
                </p>
                <p className="text-slate-500 leading-relaxed">
                  The National Institute of Open Schooling (NIOS) was established in November 1989 as an autonomous organisation by the Ministry of Education, Government of India. It has emerged as the largest open schooling system in the world.
                </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-blue-500 transition-all">
                     <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform">
                        <Target className="w-8 h-8" />
                     </div>
                     <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-tight text-lg">Our Mission</h4>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">Provide relevant, continuing and holistic education up to pre-degree level through Open and Distance Learning.</p>
                  </div>
                  <div className="p-8 bg-slate-900 rounded-3xl shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                     <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform relative z-10">
                        <Award className="w-8 h-8" />
                     </div>
                     <h4 className="font-bold text-white mb-3 uppercase tracking-tight text-lg relative z-10">Global Standard</h4>
                     <p className="text-sm text-blue-100/60 leading-relaxed font-medium relative z-10">Implementing AI-driven adaptive learning pathways aligned with NEP 2020 international standards.</p>
                  </div>
                </div>

                {/* Key Initiatives Grid */}
                <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[
                     { label: "Virtual Open School", icon: Globe },
                     { label: "On Demand Exams", icon: Zap },
                     { label: "AI Tutoring", icon: Brain },
                     { label: "National Portal", icon: School }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                        <item.icon className="w-5 h-5 text-blue-700 opacity-50 group-hover:opacity-100" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.label}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="relative group">
               <div className="absolute -inset-4 bg-blue-700/5 rounded-[40px] blur-2xl group-hover:scale-105 transition-all duration-700" />
               <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&mute=1&loop=1&playlist=PBUP8ghRjrA"
                    title="NIOS Overview"
                    allow="autoplay; fullscreen"
                  />
               </div>
             </div>
          </div>
        </div>
      </section>

      <NewsBoardSection />
      
      <RegionalNetworkSection />

      <QuickLinksSection />
      
      {/* <PortalHubSection /> */}
      
      <div className="bg-slate-50">
        <CollaborationSection />
        <AIFactorySection />
      </div>

      {/* Integration Strip */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Technically Powered By</h4>
                <p className="text-lg font-bold text-slate-800">National Education Digital Ecosystem</p>
             </div>
             <div className="flex flex-wrap gap-4">
                {["DIKSHA", "SWAYAM", "DigiLocker", "ULLAS", "ABC", "UDISE+"].map((name) => (
                  <div key={name} className="px-6 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-black text-slate-600 hover:text-blue-700 hover:border-blue-200 transition-all cursor-pointer">
                    {name}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
         {/* Background Orbs */}
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.1, 0.2, 0.1],
             x: [0, 50, 0],
             y: [0, -30, 0]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             opacity: [0.05, 0.15, 0.05],
             x: [0, -40, 0],
             y: [0, 60, 0]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" 
         />

         <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-10 shadow-sm"
            >
               <Users className="w-4 h-4" />
               Join 2.4 Million+ Learners
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 uppercase tracking-tight">
               Begin Your Journey with <br /> 
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 underline decoration-blue-100 underline-offset-8">The Largest Open School</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-14 max-w-2xl mx-auto leading-relaxed">
               Empowering learners across India with flexible, inclusive, and AI-driven education. Register today to unlock your potential.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
               <Link href="/portal">
                  <button className="group px-12 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all transform hover:-translate-y-1 flex items-center gap-3">
                     Access Student Portal
                     <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
               </Link>
               <Link href="/admission">
                  <button className="px-12 py-5 bg-white text-blue-900 border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-50 hover:border-blue-200 transition-all transform hover:-translate-y-1">
                     Online Admission
                  </button>
               </Link>
            </div>
         </div>
      </section>

      <OfficialFooter />
      <ChatbotToggle />
      <AccessibilityToolbar />
    </div>
  );
}
