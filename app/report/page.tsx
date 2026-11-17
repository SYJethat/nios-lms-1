'use client';

import React, { useState, useEffect, Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2,
  BookOpen,
  Video,
  FileText,
  Award,
  CheckCircle2,
  Clock,
  Download,
  ChevronLeft,
  PlayCircle,
  Star,
  Trophy,
  CreditCard,
  Layout,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Calendar,
  Eye,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  sno: number;
  name: string;
  length: string;
  section: number;
  views: number;
  date: string;
}

interface StudyMaterial {
  id: number;
  title: string;
}

interface SubjectDetail {
  id: string;
  title: string;
  hindiTitle: string;
  code: string;
  progress: number;
  credit: string;
  videos: { pct: number; ratio: string };
  guided: { pct: number; ratio: string };
  exam: { pct: number; ratio: string };
  lessons: Lesson[];
  studyMaterials: StudyMaterial[];
  preparedBy: string;
}

const SUBJECT_DETAILS: Record<string, SubjectDetail> = {
  'Environmental Science (211)': {
    id: 'env-211',
    title: 'Environmental Science (211)',
    hindiTitle: 'मानव जीवन में पशु-पक्षियों एवं वनस्पतियों का महत्व',
    code: '211',
    progress: 80.0,
    credit: '4 Credits',
    videos: { pct: 80, ratio: '16/20' },
    guided: { pct: 100, ratio: '10/10' },
    exam: { pct: 80, ratio: '4/5' },
    preparedBy: 'NIOS Environmental & Life Sciences Faculty',
    lessons: [
      { sno: 1, name: 'पाठ 1: प्रस्तावना - मानव और प्रकृति का आदिम सह-अस्तित्व', length: '18.14 min', section: 1, views: 3, date: '25-08-2025' },
      { sno: 2, name: 'पाठ 2: वनस्पतियाँ - प्राणवायु, भोजन एवं औषधीय भंडार', length: '22.30 min', section: 1, views: 2, date: '30-04-2026' },
      { sno: 3, name: 'पाठ 3: पक्षियों की भूमिका - परागण एवं कीट नियंत्रण', length: '25.15 min', section: 1, views: 2, date: '30-04-2026' },
      { sno: 4, name: 'पाठ 4: पशु-जगत और मानवीय अर्थव्यवस्था', length: '20.00 min', section: 2, views: 1, date: '30-04-2026' },
      { sno: 5, name: 'पाठ 5: जैव विविधता संकट एवं विलुप्तप्राय प्रजातियाँ', length: '24.45 min', section: 2, views: 1, date: '30-04-2026' },
      { sno: 6, name: 'पाठ 6: वन्यजीव संरक्षण अधिनियम एवं हमारे कर्तव्य', length: '19.50 min', section: 2, views: 1, date: '30-04-2026' },
    ],
    studyMaterials: [
      { id: 1, title: 'Ecosystem Balance & Biological Diversity Handbook' },
      { id: 2, title: 'Medicinal Plants of India & Ayurvedic Formulations' },
      { id: 3, title: 'Avian Conservation & Migratory Corridors' },
      { id: 4, title: 'Soil Fertility & Agricultural Symbiosis' },
      { id: 5, title: 'Wildlife Protection Act & Citizen Environmental Duties' },
      { id: 6, title: 'Pollination Vectors & Forest Canopy Preservation' },
      { id: 7, title: 'Aquatic Life & Marine Food Chains' },
      { id: 8, title: 'Organic Farming & Natural Compost Methods' },
      { id: 9, title: 'Carbon Sequestration & Afforestation Strategies' },
      { id: 10, title: 'TMA Model Questions & Solved Answers' },
    ]
  },
  'Science & Technology (212)': {
    id: 'sci-212',
    title: 'Science & Technology (212)',
    hindiTitle: 'गति के नियम एवं प्रायोगिक विज्ञान',
    code: '212',
    progress: 70.0,
    credit: '4 Credits',
    videos: { pct: 70, ratio: '14/20' },
    guided: { pct: 85, ratio: '11/13' },
    exam: { pct: 60, ratio: '3/5' },
    preparedBy: 'NIOS Physics & Applied Sciences Board',
    lessons: [
      { sno: 1, name: 'पाठ 1: गति के मूलभूत नियम एवं न्यूटन के सिद्धांत', length: '19.45 min', section: 1, views: 2, date: '28-08-2025' },
      { sno: 2, name: 'पाठ 2: कार्य, ऊर्जा एवं शक्ति का संरक्षण', length: '24.10 min', section: 1, views: 1, date: '15-09-2025' },
      { sno: 3, name: 'पाठ 3: प्रकाश का परावर्तन एवं अपवर्तन', length: '26.30 min', section: 1, views: 2, date: '02-10-2025' },
      { sno: 4, name: 'पाठ 4: रासायनिक अभिक्रियाएं एवं समीकरण', length: '21.15 min', section: 2, views: 1, date: '18-10-2025' },
      { sno: 5, name: 'पाठ 5: विद्युत धारा एवं परिपथ सिद्धांत', length: '28.00 min', section: 2, views: 1, date: '05-11-2025' },
    ],
    studyMaterials: [
      { id: 1, title: 'Kinematics & Mechanics Formula Handbook' },
      { id: 2, title: 'Optics Ray Diagrams & Lens Practical Guide' },
      { id: 3, title: 'Chemical Reactions Lab Manual & Safety Protocols' },
      { id: 4, title: 'Ohm\'s Law & Virtual Circuit Simulation Notes' },
      { id: 5, title: 'Atomic Structure & Periodic Table Trends' },
      { id: 6, title: 'Sources of Energy & Renewable Technology' },
      { id: 7, title: 'Magnetism & Electromagnetic Induction' },
      { id: 8, title: 'Acids, Bases & Salts Laboratory Procedures' },
      { id: 9, title: 'Human Eye & Colourful World Optical Studies' },
      { id: 10, title: 'Solved Numerical Exercises for Secondary Exam' },
    ]
  },
  'Vedic Mathematics (211)': {
    id: 'ved-211',
    title: 'Vedic Mathematics (211)',
    hindiTitle: 'तीव्र मानसिक अंकगणित एवं सूत्र',
    code: '211',
    progress: 100.0,
    credit: '4 Credits',
    videos: { pct: 100, ratio: '18/18' },
    guided: { pct: 100, ratio: '14/14' },
    exam: { pct: 100, ratio: '5/5' },
    preparedBy: 'Samskrit Promotion Foundation & NIOS Mathematics Department',
    lessons: [
      { sno: 1, name: 'सूत्र 1: एकाधिकेन पूर्वेण एवं निखिलं नवतश्चरमं दशतः', length: '20.15 min', section: 1, views: 4, date: '15-08-2025' },
      { sno: 2, name: 'सूत्र 2: ऊर्ध्वतिर्यग्भ्याम् द्वारा तीव्र गुणन', length: '25.40 min', section: 1, views: 3, date: '20-08-2025' },
      { sno: 3, name: 'सूत्र 3: परावर्त्य योजयेत् एवं बीजगणितीय अनुप्रयोग', length: '22.50 min', section: 1, views: 3, date: '05-09-2025' },
      { sno: 4, name: 'सूत्र 4: वर्ग एवं घनमूल निकालने की वैदिक विधियाँ', length: '27.10 min', section: 2, views: 2, date: '20-09-2025' },
      { sno: 5, name: 'सूत्र 5: युगपत् समीकरण एवं विलोकनं विधि', length: '23.20 min', section: 2, views: 2, date: '01-10-2025' },
    ],
    studyMaterials: [
      { id: 1, title: '16 Core Vedic Sutras Compendium & Mental Math Exercises' },
      { id: 2, title: 'Rapid Multiplication & Division Speed Drill Worksheets' },
      { id: 3, title: 'Fast Square Roots and Cube Roots Reference Chart' },
      { id: 4, title: 'Vedic Algebraic Factoring & Linear Equation Solvers' },
      { id: 5, title: 'Coordinate Geometry Speed Hacks' },
      { id: 6, title: 'Trigonometry & Heights/Distances by Vedic Triples' },
      { id: 7, title: 'Divisibility Tests & Osculation Sutras' },
      { id: 8, title: 'Calculus Fundamentals through Vedic Logic' },
      { id: 9, title: 'Speed Test Practice Sheets & Timed Drills' },
      { id: 10, title: 'Certified Master Challenge Solutions' },
    ]
  },
  'Information Technology & AI (229)': {
    id: 'it-229',
    title: 'Information Technology & AI (229)',
    hindiTitle: 'कंप्यूटर विज्ञान एवं पायथन साक्षरता',
    code: '229',
    progress: 60.0,
    credit: '4 Credits',
    videos: { pct: 60, ratio: '12/20' },
    guided: { pct: 75, ratio: '9/12' },
    exam: { pct: 40, ratio: '2/5' },
    preparedBy: 'NIOS Vocational Technology & Digital Skills Faculty',
    lessons: [
      { sno: 1, name: 'Module 1: Computer Architecture & Modern Operating Systems', length: '18.30 min', section: 1, views: 2, date: '10-09-2025' },
      { sno: 2, name: 'Module 2: Python Fundamentals - Variables, Loops & Functions', length: '26.45 min', section: 1, views: 1, date: '24-09-2025' },
      { sno: 3, name: 'Module 3: Data Structures - Lists, Tuples & Dictionaries', length: '24.15 min', section: 1, views: 1, date: '08-10-2025' },
      { sno: 4, name: 'Module 4: Basics of Machine Learning & Neural Networks', length: '29.50 min', section: 2, views: 1, date: '22-10-2025' },
      { sno: 5, name: 'Module 5: Cyber Security, Ethics & Digital Privacy Laws', length: '19.20 min', section: 2, views: 1, date: '04-11-2025' },
    ],
    studyMaterials: [
      { id: 1, title: 'Python Syntax Cheat Sheet & Practice Exercises' },
      { id: 2, title: 'AI & Data Science Foundational Workbook' },
      { id: 3, title: 'Computer Networks & Internet Protocols Manual' },
      { id: 4, title: 'Cyber Safety Guidelines for Secondary Scholars' },
      { id: 5, title: 'HTML5, CSS & Web Page Design Starter Kit' },
      { id: 6, title: 'Relational Database SQL Queries & Schema Building' },
      { id: 7, title: 'Prompt Engineering & Generative AI Overview' },
      { id: 8, title: 'Algorithmic Problem Solving Flowcharts' },
      { id: 9, title: 'Practical Lab Coding Portfolio Templates' },
      { id: 10, title: 'Board Exam Practical Viva Questions' },
    ]
  },
  'Hindi Core & Sahitya (201)': {
    id: 'hin-201',
    title: 'Hindi Core & Sahitya (201)',
    hindiTitle: 'हिन्दी साहित्य एवं व्यावहारिक व्याकरण',
    code: '201',
    progress: 75.0,
    credit: '4 Credits',
    videos: { pct: 75, ratio: '15/20' },
    guided: { pct: 90, ratio: '10/11' },
    exam: { pct: 60, ratio: '3/5' },
    preparedBy: 'NIOS Department of Humanities & Indian Languages',
    lessons: [
      { sno: 1, name: 'पाठ 1: कबीर, तुलसी एवं सूरदास के पद व्याख्या', length: '21.30 min', section: 1, views: 2, date: '12-08-2025' },
      { sno: 2, name: 'पाठ 2: आधुनिक हिन्दी गद्य एवं मुंशी प्रेमचंद की कहानियां', length: '25.10 min', section: 1, views: 2, date: '29-08-2025' },
      { sno: 3, name: 'पाठ 3: व्यावहारिक हिन्दी व्याकरण: सन्धि, समास एवं कारक', length: '23.45 min', section: 1, views: 1, date: '14-09-2025' },
      { sno: 4, name: 'पाठ 4: पत्र-लेखन, निबंध एवं अपठित गद्यांश विश्लेषण', length: '19.15 min', section: 2, views: 1, date: '02-10-2025' },
      { sno: 5, name: 'पाठ 5: जनसंचार माध्यम, विज्ञापन एवं हिन्दी पत्रकारिता', length: '22.00 min', section: 2, views: 1, date: '20-10-2025' },
    ],
    studyMaterials: [
      { id: 1, title: 'कालजयी कविताओं की व्याख्या एवं शब्दार्थ संकलन' },
      { id: 2, title: 'सम्पूर्ण हिन्दी व्याकरण एवं अभ्यास पुस्तिका' },
      { id: 3, title: 'औपचारिक एवं अनौपचारिक पत्र प्रारूप संकलन' },
      { id: 4, title: 'प्रमुख निबंध एवं समसामयिक आलेख संग्रह' },
      { id: 5, title: 'अपठित बोध एवं संक्षेपण अभ्यास' },
      { id: 6, title: 'मुहावरे, लोकोक्तियाँ एवं वाक्य शुद्धि' },
      { id: 7, title: 'हिन्दी साहित्य का संक्षिप्त इतिहास' },
      { id: 8, title: 'आधुनिक कवियों की चुनिंदा रचनाएं' },
      { id: 9, title: 'TMA आदर्श उत्तर पुस्तिका एवं परियोजना कार्य' },
      { id: 10, title: 'बोर्ड परीक्षा मॉडल प्रश्नपत्र एवं अंक विभाजन' },
    ]
  },
  'Introduction to Medical Astrology': {
    id: 'med-ast',
    title: 'Introduction to Medical Astrology',
    hindiTitle: 'आयुर्वेदिक निदान एवं ज्योतिषीय अंतर्दृष्टि',
    code: 'ELEC-105',
    progress: 51.8,
    credit: 'NA',
    videos: { pct: 53, ratio: '9/17' },
    guided: { pct: 100, ratio: '13/13' },
    exam: { pct: 0, ratio: '1/5' },
    preparedBy: 'Samskrit Promotion Foundation',
    lessons: [
      { sno: 1, name: 'Introduction to Medical Astrology', length: '19.14 min', section: 1, views: 2, date: '25-08-2025' },
      { sno: 2, name: 'Ayurvedic medicine and medical astrology', length: '28.9 min', section: 1, views: 1, date: '30-04-2026' },
      { sno: 3, name: 'General Introduction to Astrology', length: '23.39 min', section: 1, views: 1, date: '30-04-2026' },
      { sno: 4, name: 'Introduction of Birth Chart', length: '29.21 min', section: 2, views: 1, date: '30-04-2026' },
      { sno: 5, name: 'Human Anatomy', length: '17.87 min', section: 2, views: 1, date: '30-04-2026' },
    ],
    studyMaterials: [
      { id: 1, title: 'Introduction to Astrology & Some basic facts of medical astrology' },
      { id: 2, title: 'Human Anatomy and Astrology' },
      { id: 3, title: 'Diagnosis by Horoscope' },
      { id: 4, title: 'Visual Disorders' },
      { id: 5, title: 'Hearing Disorders' },
      { id: 6, title: 'Stomach Disorder' },
      { id: 7, title: 'Heart Problem' },
      { id: 8, title: 'Mental Disorder' },
      { id: 9, title: 'Pelvic Region Problems' },
      { id: 10, title: 'Tuberculosis' },
    ]
  }
};

function SubjectReportContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeView, setActiveView] = useState<'report' | 'guided'>('report');
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>('Introduction to Medical Astrology');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with search parameter ?subject=...
  useEffect(() => {
    const param = searchParams.get('subject');
    if (param) {
      // Find matching key
      const foundKey = Object.keys(SUBJECT_DETAILS).find(
        k => k.toLowerCase() === param.toLowerCase() ||
             k.includes(param) ||
             param.includes(k) ||
             SUBJECT_DETAILS[k].id === param
      );
      if (foundKey) {
        setSelectedSubjectKey(foundKey);
      }
    }
  }, [searchParams]);

  if (!user) return null;

  const currentSubject = SUBJECT_DETAILS[selectedSubjectKey] || SUBJECT_DETAILS['Introduction to Medical Astrology'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X size={15} />
          </button>
        </div>
      )}

      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/analytics"
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-all shadow-sm cursor-pointer shrink-0"
            title="Back to Analytics"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                Individual Subject Analysis
              </span>
              <span className="text-xs text-slate-400 font-bold">• Code {currentSubject.code}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {currentSubject.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {currentSubject.hindiTitle}
            </p>
          </div>
        </div>

        {/* View Switcher Pill */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveView('report')}
            className={`px-6 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeView === 'report' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Performance Report
          </button>
          <button
            onClick={() => setActiveView('guided')}
            className={`px-6 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeView === 'guided' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Guided Learning
          </button>
        </div>
      </div>

      {/* Quick Subject Selector Pills */}
      <div className="px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">
            Switch Subject:
          </span>
          {Object.keys(SUBJECT_DETAILS).map((subKey) => (
            <button
              key={subKey}
              onClick={() => {
                setSelectedSubjectKey(subKey);
                router.replace(`/report?subject=${encodeURIComponent(subKey)}`);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubjectKey === subKey
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {subKey}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'report' ? (
          <motion.div
            key={`report-${currentSubject.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Badge Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
              {[
                { name: 'Bronze', color: 'from-orange-400 to-orange-100', icon: <Trophy size={20} />, active: currentSubject.progress >= 25 },
                { name: 'Silver', color: 'from-slate-400 to-slate-100', icon: <Award size={20} />, active: currentSubject.progress >= 50 },
                { name: 'Gold', color: 'from-yellow-400 to-yellow-100', icon: <Star size={20} />, active: currentSubject.progress >= 75 },
                { name: 'Platinum', color: 'from-blue-400 to-blue-100', icon: <Trophy size={20} />, active: currentSubject.progress >= 95 },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all overflow-hidden relative"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${badge.color} opacity-10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-all`} />
                  <div>
                    <h4 className="text-lg font-black text-slate-400 uppercase tracking-widest">{badge.name}</h4>
                    <span className="text-[10px] font-bold text-slate-400">
                      {badge.active ? 'Unlocked Milestone' : 'In Progress'}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-inner ${
                    badge.active
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-slate-50 text-slate-300 group-hover:bg-blue-900 group-hover:text-white'
                  }`}>
                    {badge.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="px-4">
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="relative h-12 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentSubject.progress}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-black text-white uppercase tracking-widest px-4 whitespace-nowrap">
                      Course Progress {currentSubject.progress}%
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid md:grid-cols-4 gap-6 px-4">
              {[
                { label: 'After Result', value: currentSubject.credit === 'NA' ? 'NA' : currentSubject.credit.split(' ')[0], sub: 'Credit', color: 'from-blue-500 to-orange-300' },
                { label: `${currentSubject.videos.pct}%`, value: currentSubject.videos.ratio, sub: 'Videos', color: 'from-red-500 to-purple-500' },
                { label: `${currentSubject.guided.pct}%`, value: currentSubject.guided.ratio, sub: 'Guided Learning', color: 'from-cyan-400 to-blue-500' },
                { label: `${currentSubject.exam.pct}%`, value: currentSubject.exam.ratio, sub: 'Section Exam', color: 'from-rose-500 to-slate-400' },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-3xl bg-gradient-to-br ${card.color} text-white shadow-xl flex items-center justify-between relative overflow-hidden group`}
                >
                  <div className="relative z-10">
                    <h4 className="text-2xl font-black mb-1">{card.label}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{card.sub}</p>
                  </div>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                    <span className="text-[10px] font-black">{card.value}</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all" />
                </div>
              ))}
            </div>

            {/* Lessons Data Table */}
            <div className="px-4">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-900 uppercase tracking-wider">
                      Module Lessons & Video Telemetry
                    </h4>
                    <p className="text-xs text-slate-400">Recorded sessions, completion status, and view logs</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {currentSubject.lessons.length} Modules Available
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">S.No</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lesson Name</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Length</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Section</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Views</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentSubject.lessons.map((lesson) => (
                        <tr key={lesson.sno} className="hover:bg-slate-50/70 transition-colors group">
                          <td className="px-8 py-5 text-sm font-black text-slate-400">{lesson.sno}</td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                <PlayCircle size={16} />
                              </div>
                              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                                {lesson.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-500 text-center">{lesson.length}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-500 text-center">{lesson.section}</td>
                          <td className="px-8 py-5 text-sm font-black text-blue-900 text-center">{lesson.views}</td>
                          <td className="px-8 py-5 text-sm font-medium text-slate-400 text-right">{lesson.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`guided-${currentSubject.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="grid lg:grid-cols-[400px_1fr] gap-10 px-4"
          >
            {/* Left: Course Card */}
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 text-center">
                <div className="relative aspect-square w-full rounded-[32px] overflow-hidden mb-8 border-4 border-slate-50 shadow-inner bg-slate-900 flex items-center justify-center">
                  <div className="relative text-center p-8 space-y-4">
                    <img src="/NIOS_logo.png" alt="NIOS" className="h-16 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tight">
                        {currentSubject.title}
                      </h3>
                      <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                        Digital Learning Module
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      Prepared by: {currentSubject.preparedBy}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Study Material Library</h3>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
                  Access comprehensive course notes, presentations, and research papers curated by national faculty.
                </p>
              </div>

              <div className="p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-blue-400" size={24} />
                  <h4 className="font-black uppercase tracking-tight">Reading Guide</h4>
                </div>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed mb-8">
                  Complete all materials to unlock your Final Examination and earn 4 Academic Credits.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase">
                    <span>Completed</span>
                    <span>{currentSubject.studyMaterials.length} / {currentSubject.studyMaterials.length}</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Material List */}
            <div className="space-y-4">
              {currentSubject.studyMaterials.map((material) => (
                <div
                  key={material.id}
                  className="group p-6 rounded-3xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                        Module {material.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-tight">
                        {material.title}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Downloading ${material.title.slice(0, 24)}... (PDF)`)}
                    className="px-6 sm:px-8 py-3.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
                  >
                    <span>Study Material</span>
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <DashboardLayout
      title="Academic Performance & Resources"
      subtitle="Track your progress and access guided learning materials for your electives"
    >
      <Suspense fallback={
        <div className="flex items-center justify-center p-20">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <SubjectReportContent />
      </Suspense>
    </DashboardLayout>
  );
}
