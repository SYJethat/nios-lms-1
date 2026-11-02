'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Clock,
  CheckCircle2,
  BarChart3,
  Calendar,
  ChevronRight,
  Timer,
  AlertCircle,
  ArrowRight,
  FileText,
  Mic,
  BookOpenCheck,
  ShieldAlert,
  Zap,
  BookOpen,
  Award,
  ChevronLeft,
  LayoutGrid,
  Download,
  Search,
  Filter,
  Target,
  Bookmark,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  Printer,
  Check,
  X,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import AssessmentProctoring from '@/components/AssessmentProctoring';
import Link from 'next/link';

interface AssessmentQuestion {
  id: string;
  textEnglish: string;
  textHindi: string;
  options: { en: string; hi: string }[];
  correctIndex: number;
  explanation: string;
  type: 'mcq' | 'subjective' | 'voice' | 'reading';
}

interface AssessmentItem {
  id: string;
  title: string;
  titleHindi: string;
  subject: string;
  subjectCode: string;
  type: 'Quiz' | 'TMA' | 'Practical' | 'Speaking' | 'Exam';
  status: 'Pending' | 'Completed' | 'In Progress';
  dueDate: string;
  duration: string;
  totalMarks: number;
  score?: number;
  questions: AssessmentQuestion[];
  tags: string[];
}

const NIOS_ASSESSMENTS: AssessmentItem[] = [
  {
    id: 'as-env-001',
    title: 'Importance of Animals, Birds & Plants in Human Life',
    titleHindi: 'मानव जीवन में पशु-पक्षियों एवं वनस्पतियों का महत्व',
    subject: 'Environmental Science',
    subjectCode: 'ENV-211',
    type: 'Quiz',
    status: 'Pending',
    dueDate: '15 MAY 2026',
    duration: '30 Mins',
    totalMarks: 25,
    tags: ['NEP 2020', 'Biodiversity', 'Core Subject'],
    questions: [
      {
        id: 'q1',
        textEnglish: 'Which of the following birds is recognized as an apex bio-indicator of wetland ecosystem health?',
        textHindi: 'निम्नलिखित में से किस पक्षी को आर्द्रभूमि पारिस्थितिकी तंत्र के स्वास्थ्य का प्रमुख जैव-सूचक माना जाता है?',
        options: [
          { en: 'House Sparrow (गौरैया)', hi: 'House Sparrow (घरेलू गौरैया)' },
          { en: 'Painted Stork & Flamingo (चित्रित सारस एवं राजहंस)', hi: 'Painted Stork & Flamingo (चित्रित सारस एवं राजहंस)' },
          { en: 'Common Crow (कौआ)', hi: 'Common Crow (साधारण कौआ)' },
          { en: 'Pigeon (कबूतर)', hi: 'Pigeon (कबूतर)' }
        ],
        correctIndex: 1,
        explanation: 'Waterbirds such as the Painted Stork and Flamingo indicate healthy aquatic trophic webs and unpolluted wetland habitats.',
        type: 'mcq'
      },
      {
        id: 'q2',
        textEnglish: 'What is the primary ecological contribution of insectivorous bats and birds in agricultural landscapes?',
        textHindi: 'कृषि परिदृश्यों में कीटभक्षी चमगादड़ों और पक्षियों का प्राथमिक पारिस्थितिक योगदान क्या है?',
        options: [
          { en: 'Enhancing soil salinity (मृदा लवणता बढ़ाना)', hi: 'Enhancing soil salinity (मृदा लवणता बढ़ाना)' },
          { en: 'Natural biological pest suppression without chemicals (बिना रसायनों के प्राकृतिक जैविक कीट नियंत्रण)', hi: 'Natural biological pest suppression without chemicals (बिना रसायनों के प्राकृतिक जैविक कीट नियंत्रण)' },
          { en: 'Increasing transpiration rate in crops (फसलों में वाष्पोत्सर्जन दर बढ़ाना)', hi: 'Increasing transpiration rate in crops (फसलों में वाष्पोत्सर्जन दर बढ़ाना)' },
          { en: 'Direct mechanical pollination of root vegetables (जड़ वाली सब्जियों का परागण)', hi: 'Direct mechanical pollination of root vegetables (जड़ वाली सब्जियों का परागण)' }
        ],
        correctIndex: 1,
        explanation: 'Insectivorous species consume tonnes of crop pests nightly, eliminating the need for hazardous synthetic pesticides.',
        type: 'mcq'
      },
      {
        id: 'q3',
        textEnglish: 'Which plant species is celebrated in Indian traditional knowledge for producing oxygen throughout day and night (crassulacean metabolic cycle)?',
        textHindi: 'भारतीय पारंपरिक ज्ञान में किस पौधे को दिन और रात ऑक्सीजन प्रदान करने और वायु शुद्धि के लिए सम्मानित किया गया है?',
        options: [
          { en: 'Peepal (Ficus religiosa) & Tulsi (पीपल एवं तुलसी)', hi: 'Peepal (Ficus religiosa) & Tulsi (पीपल एवं तुलसी)' },
          { en: 'Eucalyptus (यूकेलिप्टस)', hi: 'Eucalyptus (सफेदा/यूकेलिप्टस)' },
          { en: 'Pine tree (चीड़ का पेड़)', hi: 'Pine tree (चीड़ का पेड़)' },
          { en: 'Water Hyacinth (जलकुंभी)', hi: 'Water Hyacinth (जलकुंभी)' }
        ],
        correctIndex: 0,
        explanation: 'Ficus religiosa (Peepal) and Ocimum sanctum (Tulsi) possess specialized nocturnal carbon uptake, purifying air around human dwellings.',
        type: 'mcq'
      },
      {
        id: 'q4',
        textEnglish: 'What term defines animal and plant species whose presence or absence drastically alters entire community structures?',
        textHindi: 'उन जंतु एवं वनस्पति प्रजातियों को क्या कहा जाता है जिनकी उपस्थिति या अनुपस्थिति से संपूर्ण समुदाय संरचना बदल जाती है?',
        options: [
          { en: 'Invasive Alien Species (आक्रामक विदेशी प्रजातियां)', hi: 'Invasive Alien Species (आक्रामक विदेशी प्रजातियां)' },
          { en: 'Keystone Species (की-स्टोन / आधारशिला प्रजातियां)', hi: 'Keystone Species (की-स्टोन / आधारशिला प्रजातियां)' },
          { en: 'Domesticated Varieties (पालतू किस्में)', hi: 'Domesticated Varieties (पालतू किस्में)' },
          { en: 'Commercial Hybrids (व्यावसायिक संकर)', hi: 'Commercial Hybrids (व्यावसायिक संकर)' }
        ],
        correctIndex: 1,
        explanation: 'Keystone species (like bees, figs, and top predators) play critical roles in holding ecosystems intact.',
        type: 'mcq'
      },
      {
        id: 'q5',
        textEnglish: 'Under the National Education Policy (NEP 2020), which constitutional value is reinforced through biodiversity conservation study?',
        textHindi: 'राष्ट्रीय शिक्षा नीति (NEP 2020) के अंतर्गत जैव विविधता संरक्षण अध्ययन से किस संवैधानिक मूल्य को बल मिलता है?',
        options: [
          { en: 'Article 51A(g) - Fundamental duty to protect forests, lakes, rivers and wildlife', hi: 'अनुच्छेद 51A(g) - वनों, झीलों, नदियों तथा वन्यजीवों की रक्षा का मूल कर्तव्य' },
          { en: 'Industrial patent priority over forests', hi: 'वनों पर औद्योगिक पेटेंट प्राथमिकता' },
          { en: 'Urban development over mangrove habitats', hi: 'मैंग्रोव आवासों पर शहरी विकास' },
          { en: 'Monoculture timber plantation mandate', hi: 'एकल कृषि लकड़ी वृक्षारोपण' }
        ],
        correctIndex: 0,
        explanation: 'Article 51A(g) of the Constitution of India mandates every citizen to protect and improve the natural environment including forests, lakes, rivers and wildlife.',
        type: 'mcq'
      }
    ]
  },
  {
    id: 'as-sci-002',
    title: "Secondary Science: Newton's Laws & Laboratory Friction Demo",
    titleHindi: 'माध्यमिक विज्ञान: न्यूटन के गति नियम एवं घर्षण प्रायोगिक मूल्यांकन',
    subject: 'Science & Technology',
    subjectCode: 'SCI-212',
    type: 'Practical',
    status: 'Pending',
    dueDate: '20 MAY 2026',
    duration: '45 Mins',
    totalMarks: 30,
    tags: ['Physics Lab', 'Simulation', 'Calculations'],
    questions: [
      {
        id: 'sci-q1',
        textEnglish: "According to Newton's Second Law of Motion, what is the mathematical relationship between force (F), mass (m), and acceleration (a)?",
        textHindi: 'न्यूटन के गति के द्वितीय नियम के अनुसार बल (F), द्रव्यमान (m) तथा त्वरण (a) के बीच क्या गणितीय संबंध है?',
        options: [
          { en: 'F = m / a', hi: 'F = m / a' },
          { en: 'F = m × a', hi: 'F = m × a' },
          { en: 'F = m + a', hi: 'F = m + a' },
          { en: 'F = a / m', hi: 'F = a / m' }
        ],
        correctIndex: 1,
        explanation: 'Force equals mass multiplied by acceleration (F = ma), fundamental to classical dynamics.',
        type: 'mcq'
      }
    ]
  },
  {
    id: 'as-math-003',
    title: 'Vedic Mathematics: Rapid Mental Arithmetic & Sutras',
    titleHindi: 'वैदिक गणित: तीव्र मानसिक गणना एवं एकाधिकेन पूर्वेण सूत्र',
    subject: 'Mathematics',
    subjectCode: 'MATH-211',
    type: 'Quiz',
    status: 'Completed',
    dueDate: '10 MAY 2026',
    duration: '20 Mins',
    totalMarks: 20,
    score: 95,
    tags: ['Vedic Sutras', 'Speed Test', 'Mental Math'],
    questions: []
  },
  {
    id: 'as-tma-004',
    title: 'Tutor Marked Assignment (TMA) 2026: Environmental Science Portfolio',
    titleHindi: 'शिक्षक अंकित मूल्यांकन (TMA) 2026: पर्यावरण विज्ञान पोर्टफोलियो',
    subject: 'Continuous Internal Assessment',
    subjectCode: 'TMA-2026',
    type: 'TMA',
    status: 'In Progress',
    dueDate: '30 MAY 2026',
    duration: 'Portfolio',
    totalMarks: 20,
    tags: ['Mandatory', '20% Weightage', 'Online Upload'],
    questions: []
  },
  {
    id: 'as-hin-005',
    title: 'Hindi Core & Regional Language Speaking Viva-Voce',
    titleHindi: 'हिन्दी एवं क्षेत्रीय भाषा मौखिक अभिव्यक्ति एवं उच्चारण मूल्यांकन',
    subject: 'Languages & Literature',
    subjectCode: 'HIN-201',
    type: 'Speaking',
    status: 'Pending',
    dueDate: '02 JUN 2026',
    duration: '15 Mins',
    totalMarks: 15,
    tags: ['Voice Input', 'Pronunciation', 'AI Evaluated'],
    questions: [
      {
        id: 'hin-q1',
        textEnglish: 'Read and articulate the following prose passage clearly with proper stress and cadence.',
        textHindi: 'प्रकृति और मानव का सह-अस्तित्व ही भारतीय संस्कृति का मूल आधार है। दिए गए गद्यांश का स्पष्ट उच्चारण करें।',
        options: [],
        correctIndex: 0,
        explanation: 'Speaking assessments evaluate clarity, cadence, and vocabulary articulation.',
        type: 'voice'
      }
    ]
  },
  {
    id: 'as-ode-006',
    title: 'On-Demand Board Mock Examination (ODE 2026)',
    titleHindi: 'मांग पर परीक्षा (ODE) मॉडल बोर्ड मूल्यांकन 2026',
    subject: 'Comprehensive Secondary Board',
    subjectCode: 'ODE-ALL',
    type: 'Exam',
    status: 'Pending',
    dueDate: '10 JUN 2026',
    duration: '180 Mins',
    totalMarks: 100,
    tags: ['Full Length', 'Timer Proctoring', 'Final Prep'],
    questions: []
  }
];

export default function AssessmentsPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [activeTab, setActiveTab] = useState<'list' | 'exam' | 'results'>('list');
  const [selectedExam, setSelectedExam] = useState<AssessmentItem | null>(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Exam Answering State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [isExamLanguageHindi, setIsExamLanguageHindi] = useState(false);
  const [isSpeakingActive, setIsSpeakingActive] = useState(false);

  // Results State
  const [finalScore, setFinalScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  // Timer countdown hook during active exam
  useEffect(() => {
    if (activeTab !== 'exam') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const handleStartExam = (exam: AssessmentItem) => {
    setSelectedExam(exam);
    setActiveTab('exam');
    setCurrentQIndex(0);
    setAnswers({});
    setBookmarked({});
    setTimeLeft(parseInt(exam.duration) * 60 || 1800);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarked((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const speakQuestion = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isExamLanguageHindi ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmitExam = () => {
    if (!selectedExam) return;
    let scoreCount = 0;
    selectedExam.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        scoreCount += 1;
      }
    });
    const percentage = Math.round((scoreCount / (selectedExam.questions.length || 1)) * 100);
    setFinalScore(percentage);
    setActiveTab('results');
  };

  // Filtered dataset
  const filteredAssessments = NIOS_ASSESSMENTS.filter((a) => {
    const matchesFilter = filter === 'All' || a.type === filter;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: 'Pending Evaluations', value: '03', sub: 'Urgent: Environmental Science', icon: Clock, color: 'text-amber-700 bg-amber-50' },
    { label: 'Completed Assessments', value: '14', sub: 'Verified by Faculty', icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Academic Percentile', value: '96th', sub: 'Regional Rank #12', icon: Award, color: 'text-purple-700 bg-purple-50' },
    { label: 'Avg. Accuracy Rate', value: '92%', sub: 'TMA Internal 2026', icon: BarChart3, color: 'text-blue-900 bg-blue-50' }
  ];

  return (
    <DashboardLayout
      title="Examination & Continuous Evaluation"
      subtitle={`${activeUser.name} · NIOS Secondary Accreditation & Tutor Marked Assignments`}
    >
      <AnimatePresence mode="wait">

        {/* ── VIEW 1: ASSESSMENT CATALOG & DASHBOARD ── */}
        {activeTab === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10 animate-fade-in pb-20"
          >
            {/* 4 Metric Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <s.icon size={22} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Academic Year 2026
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-700">{s.label}</div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Urgent Assessment Spotlight */}
            <div className="relative rounded-[32px] bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 sm:p-10 text-white overflow-hidden shadow-2xl border border-blue-900/40">
              <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-black uppercase tracking-widest border border-rose-400/30">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    ACTION REQUIRED · DUE TOMORROW
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                    Importance of Animals, Birds & Plants in Human Life (पर्यावरण अध्ययन)
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                    Interactive 5-question multi-choice evaluation aligned with NIOS Secondary Curriculum & NEP 2020. Features bilingual Hindi/English switchable prompts, read-aloud TTS, and digital verification.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      onClick={() => handleStartExam(NIOS_ASSESSMENTS[0])}
                      className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
                    >
                      <Zap size={16} />
                      <span>Start Evaluation (30 Mins)</span>
                    </button>
                    <Link href="/student/my-courses/course-env-001">
                      <button className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center gap-2 cursor-pointer">
                        <BookOpen size={16} />
                        <span>Review 23-Lang Lecture</span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="w-full lg:w-72 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-3 shrink-0">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>TMA Weightage</span>
                    <span className="text-amber-400 font-black">20% of Final Board Grade</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    Continuous evaluation scores are indexed directly to your NIOS Hall Ticket and Secondary Marksheet.
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    <CheckCircle2 size={13} />
                    <span>AI Safe Proctoring Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                {['All', 'Quiz', 'TMA', 'Practical', 'Speaking', 'Exam'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      filter === f
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search by subject, code, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              </div>
            </div>

            {/* Assessment Cards List */}
            <div className="grid gap-4 sm:gap-5">
              {filteredAssessments.map((a) => (
                <div
                  key={a.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      a.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : a.type === 'TMA'
                        ? 'bg-purple-50 text-purple-700'
                        : 'bg-blue-50 text-blue-900'
                    }`}>
                      {a.type === 'Quiz' ? <Zap size={24} /> :
                       a.type === 'Speaking' ? <Mic size={24} /> :
                       a.type === 'Practical' ? <BookOpenCheck size={24} /> :
                       a.type === 'Exam' ? <Award size={24} /> : <FileText size={24} />}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                          {a.subjectCode}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {a.subject} · {a.type}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {a.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {a.titleHindi}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-slate-400" /> Due: {a.dueDate}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" /> {a.duration}
                        </span>
                        <span>·</span>
                        <span>Total Marks: {a.totalMarks}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end shrink-0">
                    {a.status === 'Completed' ? (
                      <div className="px-6 py-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2.5">
                        <CheckCircle2 size={18} className="text-emerald-600" />
                        <div>
                          <div className="text-sm font-black">{a.score}% Score</div>
                          <div className="text-[9px] uppercase font-bold text-emerald-600">Passed & Certified</div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartExam(a)}
                        className="w-full lg:w-auto px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Start Evaluation</span>
                        <ChevronRight size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── VIEW 2: ACTIVE SECURE EXAM PLAYER ── */}
        {activeTab === 'exam' && selectedExam && (
          <motion.div
            key="exam"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 animate-fade-in pb-20"
          >
            {/* Live Camera Proctoring PIP */}
            <AssessmentProctoring />

            {/* Exam Header Topbar */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl border border-slate-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to pause and exit the exam? Your answers will be saved.')) {
                      setActiveTab('list');
                    }
                  }}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                    <span>{selectedExam.subjectCode}</span>
                    <span>·</span>
                    <span>Safe Lockdown Active</span>
                  </div>
                  <h3 className="text-lg font-black text-white">
                    {selectedExam.title}
                  </h3>
                </div>
              </div>

              {/* Language Switcher and Timer */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                {/* Hindi / English prompt toggle */}
                <button
                  onClick={() => setIsExamLanguageHindi(!isExamLanguageHindi)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider transition-all border border-white/15 cursor-pointer"
                >
                  🌐 {isExamLanguageHindi ? 'हिन्दी (Active)' : 'English (Active)'}
                </button>

                {/* Countdown Timer */}
                <div className={`px-5 py-2 rounded-xl flex items-center gap-2.5 font-mono font-black text-lg transition-all border ${
                  timeLeft < 300
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                    : 'bg-white/10 text-white border-white/15'
                }`}>
                  <Timer size={18} className={timeLeft < 300 ? 'text-rose-400' : 'text-blue-400'} />
                  <span>
                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Question & Question Palette Grid */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

              {/* Left Column: Question Answering (8 Cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
                {/* Top Progress Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-100">
                  <div
                    className="h-full bg-blue-900 transition-all duration-300"
                    style={{
                      width: `${((currentQIndex + 1) / (selectedExam.questions.length || 1)) * 100}%`
                    }}
                  />
                </div>

                {/* Question Info Strip */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-black uppercase tracking-wider">
                      Question {currentQIndex + 1} of {selectedExam.questions.length}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">1 Mark Each</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Read Aloud TTS */}
                    <button
                      onClick={() => {
                        const q = selectedExam.questions[currentQIndex];
                        speakQuestion(isExamLanguageHindi ? q.textHindi : q.textEnglish);
                      }}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                      title="Read question aloud"
                    >
                      <Volume2 size={16} className="text-blue-900" />
                      <span className="hidden sm:inline">Listen</span>
                    </button>

                    {/* Bookmark Question */}
                    <button
                      onClick={() => toggleBookmark(selectedExam.questions[currentQIndex]?.id)}
                      className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                        bookmarked[selectedExam.questions[currentQIndex]?.id]
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                      title="Bookmark to review later"
                    >
                      <Bookmark size={16} />
                      <span className="hidden sm:inline">Review Later</span>
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-2">
                  <h2 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
                    {isExamLanguageHindi
                      ? selectedExam.questions[currentQIndex]?.textHindi
                      : selectedExam.questions[currentQIndex]?.textEnglish}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {isExamLanguageHindi
                      ? selectedExam.questions[currentQIndex]?.textEnglish
                      : selectedExam.questions[currentQIndex]?.textHindi}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                {selectedExam.questions[currentQIndex]?.type === 'mcq' && (
                  <div className="space-y-3">
                    {selectedExam.questions[currentQIndex].options.map((opt, idx) => {
                      const qId = selectedExam.questions[currentQIndex].id;
                      const isSelected = answers[qId] === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(qId, idx)}
                          className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-900 bg-blue-50/70 shadow-sm'
                              : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 bg-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-blue-900 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>

                          <div className="flex-1 text-xs sm:text-sm font-semibold text-slate-800">
                            {isExamLanguageHindi ? opt.hi : opt.en}
                          </div>

                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-blue-900 bg-blue-900 text-white'
                              : 'border-slate-300'
                          }`}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Speaking Assessment Mode */}
                {selectedExam.questions[currentQIndex]?.type === 'voice' && (
                  <div className="p-8 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center text-center space-y-4">
                    <button
                      onClick={() => setIsSpeakingActive(!isSpeakingActive)}
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                        isSpeakingActive
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-blue-900 text-white hover:bg-blue-800'
                      }`}
                    >
                      <Mic size={32} />
                    </button>
                    <div className="space-y-1">
                      <div className="text-sm font-black text-slate-900 uppercase">
                        {isSpeakingActive ? 'Recording Audio Response...' : 'Click Microphone to Speak'}
                      </div>
                      <p className="text-xs text-slate-500 max-w-sm">
                        AI speech recognizer is analyzing pronunciation cadence, tone, and grammatical accuracy against standard NCERT rubrics.
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom Navigation Buttons */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => prev - 1)}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {currentQIndex < selectedExam.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQIndex((prev) => prev + 1)}
                        className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next Question</span>
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitExam}
                        className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 size={16} />
                        <span>Submit & Finish Exam</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Question Palette & Instructions (4 Cols) */}
              <div className="lg:col-span-4 space-y-6">

                {/* Question Palette Grid */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <LayoutGrid size={15} />
                      <span>Question Palette</span>
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400">
                      {Object.keys(answers).length} / {selectedExam.questions.length} Answered
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2.5">
                    {selectedExam.questions.map((q, idx) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isCurrent = currentQIndex === idx;
                      const isMarked = bookmarked[q.id];

                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentQIndex(idx)}
                          className={`aspect-square rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                            isCurrent
                              ? 'ring-2 ring-blue-900 ring-offset-2 bg-blue-900 text-white shadow-md'
                              : isAnswered
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : isMarked
                              ? 'bg-amber-50 text-amber-900 border border-amber-300'
                              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          <span>{idx + 1}</span>
                          {isMarked && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-emerald-50 border border-emerald-300" /> Answered
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-amber-50 border border-amber-300" /> Review Later
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-blue-900" /> Current
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-slate-50" /> Not Visited
                    </span>
                  </div>
                </div>

                {/* AI Proctoring & Safe Exam Guidelines */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                    <ShieldAlert size={16} className="text-blue-900" />
                    <span>Safe Exam Protocol</span>
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-1.5 leading-relaxed font-medium">
                    <li>• Do not switch browser tabs or minimize your screen.</li>
                    <li>• Keep your webcam focused on your face at all times.</li>
                    <li>• Web Speech audio assistance is permitted for accessibility.</li>
                  </ul>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* ── VIEW 3: RESULTS & DIGITAL CERTIFICATION ── */}
        {activeTab === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto py-10 space-y-10 animate-fade-in pb-20"
          >
            {/* Success Celebration Card */}
            <div className="p-8 sm:p-12 rounded-[32px] bg-white border border-slate-100 shadow-xl text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 border-4 border-emerald-200 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 size={48} />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
                  EVALUATION COMPLETED SUCCESSFULLY
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {selectedExam?.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {activeUser.name} · Enrollment ID: {activeUser.details.enrollmentNo || 'ENR-2025-001'} · Score officially recorded
                </p>
              </div>

              {/* 4 Score Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <div className="text-2xl sm:text-3xl font-black text-blue-900">{finalScore}%</div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">Final Score</div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700">100%</div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">Integrity Score</div>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="text-2xl sm:text-3xl font-black text-purple-700">96th</div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">Percentile</div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="text-2xl sm:text-3xl font-black text-amber-700">Pass</div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">Grade A</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setShowCertificate(true)}
                  className="px-8 py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xl shadow-blue-900/20 flex items-center gap-2 cursor-pointer"
                >
                  <Award size={16} />
                  <span>View & Download Certificate</span>
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  Return to Assessments List
                </button>
              </div>
            </div>

            {/* Answer Explanations Review */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">
                Question Review & Scientific Explanations
              </h3>

              <div className="space-y-4">
                {selectedExam?.questions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase">
                          Question {idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                            <Check size={12} /> Correct (+1)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider border border-rose-200 flex items-center gap-1">
                            <X size={12} /> Incorrect (0)
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">
                        {q.textEnglish}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {q.textHindi}
                      </p>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-wider text-blue-900">
                          Curriculum Reference / Explanation:
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Digital Certificate Modal */}
            <AnimatePresence>
              {showCertificate && (
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                  onClick={() => setShowCertificate(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl p-8 sm:p-12 max-w-2xl w-full border-4 border-amber-600/30 shadow-2xl space-y-6 text-center relative"
                  >
                    <button
                      onClick={() => setShowCertificate(false)}
                      className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 font-black text-xl cursor-pointer"
                    >
                      ×
                    </button>

                    <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 border-2 border-amber-300 flex items-center justify-center mx-auto shadow-md">
                      <GraduationCap size={32} />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest">
                        NATIONAL INSTITUTE OF OPEN SCHOOLING (राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान)
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        CERTIFICATE OF EVALUATION EXCELLENCE
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold">
                        Autonomous Organisation Under Ministry of Education, Govt. of India
                      </p>
                    </div>

                    <div className="py-4 border-y border-slate-100 space-y-2 text-sm text-slate-700">
                      <p>This is to certify that</p>
                      <div className="text-2xl font-black text-blue-900 tracking-tight">
                        {activeUser.name}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Enrollment Number: <strong className="text-slate-800">{activeUser.details.enrollmentNo || 'ENR-2025-001'}</strong>
                      </p>
                      <p className="pt-2 text-xs leading-relaxed max-w-lg mx-auto">
                        Has successfully passed the modular evaluation in <strong>{selectedExam?.title}</strong> with an outstanding grade score of <strong>{finalScore}%</strong>.
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-4">
                      <div>
                        <div>Issued on: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        <div className="text-[9px] text-emerald-700">✓ Digitally Verified via QR Code</div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif italic font-bold text-slate-800 text-sm">Controller of Examinations</div>
                        <div className="text-[9px]">NIOS Academic Secretariat</div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-800 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Printer size={15} />
                        <span>Print / Save as PDF</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

      </AnimatePresence>
    </DashboardLayout>
  );
}
