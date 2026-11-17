'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  Award,
  Filter,
  Search,
  Eye,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Printer,
  Share2,
  Sparkles,
  X,
  ChevronRight,
  Check,
  AlertCircle,
  ArrowUpRight,
  GraduationCap,
  BookOpen,
  Layers,
  Info,
  SlidersHorizontal,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface SubjectMark {
  code: string;
  name: string;
  faculty: string;
  theory: number;
  theoryMax: number;
  practical: number;
  practicalMax: number;
  tma: number;
  tmaMax: number;
  total: number;
  grade: string;
  remarks: string;
  classAvg: number;
}

interface AcademicReport {
  id: string;
  title: string;
  category: 'term' | 'subject' | 'tma' | 'exam';
  period: string;
  term: 'Term 1' | 'Term 2' | 'Midterm' | 'Annual';
  generatedAt: string;
  overallGrade: string;
  percentage: number;
  size: string;
  subjects: string[];
  attendanceRate: string;
  verifiedHash: string;
  isVerified: boolean;
  marksBreakdown: SubjectMark[];
  summary: string;
}

const ACADEMIC_REPORTS: AcademicReport[] = [
  {
    id: 'REP-2026-001',
    title: 'Term 1 Comprehensive Academic Evaluation',
    category: 'term',
    period: 'Oct - Nov 2026',
    term: 'Term 1',
    generatedAt: '15 Nov 2026',
    overallGrade: 'A+',
    percentage: 92.4,
    size: '2.4 MB',
    subjects: ['Physics', 'Mathematics', 'English', 'Social Science', 'Vocational IT'],
    attendanceRate: '95.2%',
    verifiedHash: '0x8f9b2d71e4a305c6d812',
    isVerified: true,
    summary: 'Outstanding academic excellence across STEM and vocational coursework. Demonstrates exceptional conceptual mastery and active participation.',
    marksBreakdown: [
      { code: 'PHY-312', name: 'Advanced Physics', faculty: 'Dr. Priya Mehta', theory: 76, theoryMax: 80, practical: 48, practicalMax: 50, tma: 19, tmaMax: 20, total: 95, grade: 'A+', classAvg: 78, remarks: 'Exceptional problem solving in mechanics & wave optics.' },
      { code: 'MTH-311', name: 'Modern Mathematics', faculty: 'Dr. Anjali Patel', theory: 72, theoryMax: 80, practical: 0, practicalMax: 0, tma: 18, tmaMax: 20, total: 90, grade: 'A+', classAvg: 74, remarks: 'Strong analytical skills in matrices and calculus.' },
      { code: 'ENG-301', name: 'English Literature', faculty: 'Kavita Iyer', theory: 73, theoryMax: 80, practical: 19, practicalMax: 20, tma: 18, tmaMax: 20, total: 91, grade: 'A+', classAvg: 80, remarks: 'Fluent written expressions and thoughtful essay compositions.' },
      { code: 'SOC-315', name: 'Social Science & Civics', faculty: 'Vishal Bhardwaj', theory: 69, theoryMax: 80, practical: 18, practicalMax: 20, tma: 19, tmaMax: 20, total: 88, grade: 'A', classAvg: 76, remarks: 'Well-researched project work and consistent assignment submissions.' },
      { code: 'VOC-320', name: 'Vocational IT & Computing', faculty: 'Dr. Srinivasan', theory: 78, theoryMax: 80, practical: 50, practicalMax: 50, tma: 19, tmaMax: 20, total: 98, grade: 'A+', classAvg: 82, remarks: 'Flawless practical circuit simulation and code assignments.' }
    ]
  },
  {
    id: 'REP-2026-002',
    title: 'Midterm Science & Mathematics Diagnostic Report',
    category: 'subject',
    period: 'September 2026',
    term: 'Midterm',
    generatedAt: '30 Sep 2026',
    overallGrade: 'A',
    percentage: 89.2,
    size: '1.8 MB',
    subjects: ['Physics', 'Mathematics'],
    attendanceRate: '96.0%',
    verifiedHash: '0x3c2a9f18d7b4e601c592',
    isVerified: true,
    summary: 'Mid-session benchmark assessing foundational competencies. Student scored in the 94th percentile in numerical reasoning.',
    marksBreakdown: [
      { code: 'PHY-312', name: 'Advanced Physics', faculty: 'Dr. Priya Mehta', theory: 72, theoryMax: 80, practical: 45, practicalMax: 50, tma: 18, tmaMax: 20, total: 90, grade: 'A+', classAvg: 75, remarks: 'Solid conceptual understanding of Newton laws.' },
      { code: 'MTH-311', name: 'Modern Mathematics', faculty: 'Dr. Anjali Patel', theory: 70, theoryMax: 80, practical: 0, practicalMax: 0, tma: 18, tmaMax: 20, total: 88, grade: 'A', classAvg: 72, remarks: 'Good accuracy in trigonometry and algebraic simplifications.' }
    ]
  },
  {
    id: 'REP-2026-003',
    title: 'Tutor Marked Assignment (TMA) Cumulative Assessment',
    category: 'tma',
    period: 'July - Oct 2026',
    term: 'Term 1',
    generatedAt: '25 Oct 2026',
    overallGrade: 'A+',
    percentage: 94.0,
    size: '3.1 MB',
    subjects: ['All 5 Subjects'],
    attendanceRate: '100%',
    verifiedHash: '0x17d9a3b8c2e40f5a9172',
    isVerified: true,
    summary: 'All 5 mandatory NIOS Tutor Marked Assignments submitted ahead of deadlines with high evaluation marks.',
    marksBreakdown: [
      { code: 'TMA-PHY', name: 'Physics TMA-1', faculty: 'Dr. Priya Mehta', theory: 19, theoryMax: 20, practical: 0, practicalMax: 0, tma: 19, tmaMax: 20, total: 95, grade: 'A+', classAvg: 80, remarks: 'Neat derivations and clear step-by-step calculations.' },
      { code: 'TMA-MTH', name: 'Math TMA-1', faculty: 'Dr. Anjali Patel', theory: 18, theoryMax: 20, practical: 0, practicalMax: 0, tma: 18, tmaMax: 20, total: 90, grade: 'A+', classAvg: 78, remarks: 'Complete proofs and accurate coordinate geometry graphs.' },
      { code: 'TMA-ENG', name: 'English TMA-1', faculty: 'Kavita Iyer', theory: 19, theoryMax: 20, practical: 0, practicalMax: 0, tma: 19, tmaMax: 20, total: 95, grade: 'A+', classAvg: 82, remarks: 'Original literary critique with zero plagiarism detected.' },
      { code: 'TMA-SOC', name: 'Social Science TMA-1', faculty: 'Vishal Bhardwaj', theory: 18, theoryMax: 20, practical: 0, practicalMax: 0, tma: 18, tmaMax: 20, total: 90, grade: 'A+', classAvg: 75, remarks: 'Insightful map work and historical chronology.' },
      { code: 'TMA-VOC', name: 'Vocational IT TMA-1', faculty: 'Dr. Srinivasan', theory: 20, theoryMax: 20, practical: 0, practicalMax: 0, tma: 20, tmaMax: 20, total: 100, grade: 'A+', classAvg: 85, remarks: 'Full marks awarded for exemplary coding portfolio.' }
    ]
  },
  {
    id: 'REP-2026-004',
    title: 'Quarter 1 Formative Skills & Viva Voce Summary',
    category: 'exam',
    period: 'July - Aug 2026',
    term: 'Term 1',
    generatedAt: '28 Aug 2026',
    overallGrade: 'A',
    percentage: 88.5,
    size: '1.5 MB',
    subjects: ['English', 'Vocational IT'],
    attendanceRate: '93.5%',
    verifiedHash: '0x9924ba7c31d8e5200f41',
    isVerified: true,
    summary: 'Oral communication, practical laboratory safety, and digital tool literacy evaluation conducted via virtual viva voce.',
    marksBreakdown: [
      { code: 'ENG-301', name: 'English Viva', faculty: 'Kavita Iyer', theory: 45, theoryMax: 50, practical: 20, practicalMax: 20, tma: 0, tmaMax: 0, total: 90, grade: 'A+', classAvg: 76, remarks: 'Confident verbal presentation with clear pronunciation.' },
      { code: 'VOC-320', name: 'Vocational Lab Viva', faculty: 'Dr. Srinivasan', theory: 43, theoryMax: 50, practical: 20, practicalMax: 20, tma: 0, tmaMax: 0, total: 87, grade: 'A', classAvg: 78, remarks: 'Quick answers during circuit debugging oral questioning.' }
    ]
  }
];

export default function ParentReportsPage() {
  const { user } = useAuth();

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'term' | 'subject' | 'tma' | 'exam'>('all');
  const [selectedTerm, setSelectedTerm] = useState<'All' | 'Term 1' | 'Midterm' | 'Term 2'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'grade' | 'size'>('date');

  // Modals
  const [viewingReport, setViewingReport] = useState<AcademicReport | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isBulkDownloadOpen, setIsBulkDownloadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Active Ward info
  const wardInfo = {
    name: 'Arjun Sharma',
    rollNo: 'ENR-2025-001',
    grade: 'Class 10 (Secondary)',
    stream: 'Science & Vocational IT',
    admissionYear: '2025 - 2026',
    studyCenter: 'AI # 270042 - Delhi Central NIOS Center',
    overallRank: '#8 in Regional Cohort (Top 4%)',
    gpa: '9.2 / 10.0',
    attendance: '94.6%'
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownload = (report: AcademicReport) => {
    showToast(`Downloading ${report.title.slice(0, 28)}... [PDF ready]`);
    // Simulated PDF download trigger
    const element = document.createElement('a');
    const file = new Blob([
      `NIOS ACADEMIC REPORT CARD\nStudent: ${wardInfo.name}\nRoll No: ${wardInfo.rollNo}\nReport: ${report.title}\nOverall Percentage: ${report.percentage}%\nOverall Grade: ${report.overallGrade}\nBlockchain Hash: ${report.verifiedHash}\nGenerated: ${report.generatedAt}\nStatus: Verified by NIOS Academic Board`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `NIOS-Report-${report.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBulkDownload = () => {
    setIsBulkDownloadOpen(false);
    showToast('Downloading all 4 semester academic transcripts as a single ZIP package...');
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    showToast('Blockchain cryptographic hash copied to clipboard!');
    setTimeout(() => setCopiedHash(null), 2500);
  };

  // Filtered reports
  const filteredReports = ACADEMIC_REPORTS.filter((rep) => {
    if (selectedCategory !== 'all' && rep.category !== selectedCategory) return false;
    if (selectedTerm !== 'All' && rep.term !== selectedTerm) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rep.title.toLowerCase().includes(q);
      const matchSubjects = rep.subjects.some(s => s.toLowerCase().includes(q));
      const matchSummary = rep.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchSubjects && !matchSummary) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'grade') return b.percentage - a.percentage;
    if (sortBy === 'size') return parseFloat(b.size) - parseFloat(a.size);
    return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime();
  });

  return (
    <DashboardLayout
      title="Academic Progress & Reports"
      subtitle={`Official evaluations & progress analytics for ${wardInfo.name} (${wardInfo.rollNo})`}
    >
      <div className="space-y-8 pb-16 animate-fade-in relative">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-bold">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
              <X size={15} />
            </button>
          </div>
        )}

        {/* ── SECTION 1: WARD OVERVIEW & CREDENTIAL BADGE ── */}
        <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: Ward Profile Identity */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl lg:text-3xl font-black shadow-lg ring-4 ring-white/10 shrink-0">
                {wardInfo.name.charAt(0)}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl lg:text-2xl font-black tracking-tight">{wardInfo.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <UserCheck size={11} /> Active Scholar
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                    <ShieldCheck size={11} /> NIOS DigiLocker Synced
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium">
                  {wardInfo.grade} • <span className="text-white font-bold">{wardInfo.rollNo}</span> • {wardInfo.studyCenter}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-400">
                  <span>Class Standing: <strong className="text-emerald-400">{wardInfo.overallRank}</strong></span>
                  <span>•</span>
                  <span>Cumulative GPA: <strong className="text-white">{wardInfo.gpa}</strong></span>
                  <span>•</span>
                  <span>Attendance: <strong className="text-emerald-400">{wardInfo.attendance}</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
              <button
                id="bulk-download-reports-btn"
                onClick={() => setIsBulkDownloadOpen(true)}
                className="px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Download size={14} /> Bulk Download All (ZIP)
              </button>

              <Link
                href="/dashboard/parent/ptm"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center gap-2 cursor-pointer"
              >
                <Calendar size={14} /> Schedule Faculty PTM
              </Link>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: KEY ANALYTICS KPI CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Cumulative Score */}
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Overall Score</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-900">
                <Award size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">92.4%</span>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp size={11} /> +4.2%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Grade Distinction <strong className="text-slate-900">(A+)</strong> • Term 1 Certified
            </p>
          </div>

          {/* Card 2: Attendance Rate */}
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Live Attendance</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Calendar size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-600">94.6%</span>
              <span className="text-xs font-bold text-slate-400">118 / 125 Sessions</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Regular & Punctual • <span className="text-emerald-600 font-bold">Zero Unexcused Absences</span>
            </p>
          </div>

          {/* Card 3: TMA Completion */}
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">TMA Assignments</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <FileText size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-purple-700">100%</span>
              <span className="text-xs font-bold text-slate-400">5 of 5 Evaluated</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Avg Score: <strong className="text-slate-900">18.8 / 20</strong> across all subjects
            </p>
          </div>

          {/* Card 4: Verified Reports */}
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Verified Reports</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{ACADEMIC_REPORTS.length}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                All Verified
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Cryptographically signed with SHA-256
            </p>
          </div>
        </div>

        {/* ── SECTION 3: SUBJECT-WISE PERFORMANCE & PROGRESS ANALYTICS ── */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Subject Progress Visual Bars */}
          <div className="lg:col-span-2 p-6 lg:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-900" />
                  Subject-Wise Performance & Grade Breakdown
                </h3>
                <p className="text-xs text-slate-500">Student score vs Class Average in active Class 10 subjects</p>
              </div>
              <span className="text-xs font-black px-3 py-1 bg-blue-50 text-blue-900 rounded-full w-fit">
                Term 1 Active Evaluation
              </span>
            </div>

            {/* Subject Bars */}
            <div className="space-y-5">
              {[
                { name: 'Advanced Physics (PHY-312)', faculty: 'Dr. Priya Mehta', score: 95, avg: 78, color: 'bg-blue-600', grade: 'A+' },
                { name: 'Vocational IT & Computing (VOC-320)', faculty: 'Dr. Srinivasan', score: 98, avg: 82, color: 'bg-emerald-600', grade: 'A+' },
                { name: 'English Literature (ENG-301)', faculty: 'Kavita Iyer', score: 91, avg: 80, color: 'bg-indigo-600', grade: 'A+' },
                { name: 'Modern Mathematics (MTH-311)', faculty: 'Dr. Anjali Patel', score: 90, avg: 74, color: 'bg-purple-600', grade: 'A+' },
                { name: 'Social Science & Civics (SOC-315)', faculty: 'Vishal Bhardwaj', score: 88, avg: 76, color: 'bg-amber-600', grade: 'A' },
              ].map((sub, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-black text-slate-900 block">{sub.name}</span>
                      <span className="text-[10px] text-slate-400">Faculty: {sub.faculty}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 text-sm">{sub.score}%</span>
                      <span className="text-[10px] text-emerald-600 font-bold ml-1.5">Grade {sub.grade}</span>
                      <div className="text-[10px] text-slate-400">Class Avg: {sub.avg}%</div>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    {/* Class Avg tick */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-slate-300 z-10"
                      style={{ left: `${sub.avg}%` }}
                      title={`Class Average: ${sub.avg}%`}
                    />
                    {/* Student Fill */}
                    <div
                      className={`h-full ${sub.color} rounded-full transition-all duration-700`}
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 pt-3 text-[11px] text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="font-bold">Student Score</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-3 bg-slate-400" />
                <span className="font-bold">Cohort Average Line</span>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Learning Trajectory & Faculty Remarks */}
          <div className="p-6 lg:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" />
                  Academic Trajectory
                </h3>
                <p className="text-xs text-slate-500">Monthly progress and learning growth</p>
              </div>

              {/* Month-by-month trajectory milestones */}
              <div className="space-y-3">
                {[
                  { month: 'August 2026', score: '84.0%', status: 'Baseline Formative' },
                  { month: 'September 2026', score: '88.5%', status: '+4.5% Midterm Progress' },
                  { month: 'October 2026', score: '91.0%', status: '+2.5% TMA Full Submission' },
                  { month: 'November 2026', score: '92.4%', status: 'Current Evaluation (Peak)' },
                ].map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="font-black text-slate-800 block">{m.month}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{m.status}</span>
                    </div>
                    <span className="font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {m.score}
                    </span>
                  </div>
                ))}
              </div>

              {/* Faculty Advisory Callout */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-wider">
                  <Info size={14} /> Faculty Coordinator Remark
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  &ldquo;Arjun exhibits consistent diligence and proactive participation in both theory lectures and virtual lab experiments. On track for board distinction.&rdquo;
                </p>
                <div className="text-[10px] text-slate-500 font-bold pt-1">
                  — Dr. Priya Mehta (Senior Faculty Mentor)
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/parent/ptm"
              className="w-full py-3 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Request 1-on-1 Faculty Consultation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* ── SECTION 4: OFFICIAL REPORT CARDS & DOWNLOADABLE ARCHIVES ── */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Reports', count: ACADEMIC_REPORTS.length },
                  { id: 'term', label: 'Term Evaluations', count: ACADEMIC_REPORTS.filter(r => r.category === 'term').length },
                  { id: 'subject', label: 'Subject Diagnostics', count: ACADEMIC_REPORTS.filter(r => r.category === 'subject').length },
                  { id: 'tma', label: 'TMA Assessments', count: ACADEMIC_REPORTS.filter(r => r.category === 'tma').length },
                  { id: 'exam', label: 'Formative / Viva', count: ACADEMIC_REPORTS.filter(r => r.category === 'exam').length },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right: Search & Sort Controls */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex-1 sm:w-60">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="date">Sort: Newest</option>
                  <option value="grade">Sort: Highest Grade</option>
                  <option value="size">Sort: File Size</option>
                </select>

                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  title="More Filter Options"
                  className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
                <FileText size={28} />
              </div>
              <h4 className="text-base font-black text-slate-900">No reports matched your filters</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing search terms or changing selected category to view published records.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTerm('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm inline-block mt-2"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-900/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col justify-between space-y-4"
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                          <FileText size={22} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                              {report.term}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">• {report.period}</span>
                          </div>
                          <h4 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-1 mt-0.5">
                            {report.title}
                          </h4>
                        </div>
                      </div>

                      {/* Grade Badge */}
                      <div className="text-right shrink-0">
                        <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                          report.overallGrade.includes('A')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-900 border border-blue-200'
                        }`}>
                          {report.overallGrade} ({report.percentage}%)
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {report.summary}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-slate-400" /> Generated: {report.generatedAt}
                      </span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <ShieldCheck size={12} /> Blockchain Verified
                      </span>
                    </div>

                    {/* Subjects included pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {report.subjects.map((sub, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleCopyHash(report.verifiedHash)}
                      title="Copy Blockchain SHA-256 Hash"
                      className="text-[10px] font-mono text-slate-400 hover:text-slate-700 flex items-center gap-1 truncate max-w-[140px] cursor-pointer"
                    >
                      {copiedHash === report.verifiedHash ? <Check size={12} className="text-emerald-600" /> : <ShieldCheck size={12} />}
                      <span className="truncate">{report.verifiedHash}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewingReport(report)}
                        className="px-4 py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200/80"
                      >
                        <Eye size={14} />
                        <span>View Mark Sheet</span>
                      </button>

                      <button
                        onClick={() => handleDownload(report)}
                        className="px-4 py-2.5 bg-blue-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── SECTION 5: GUARDIAN FAQ & VERIFICATION NOTICE ── */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 text-blue-900 shrink-0 shadow-xs">
              <ShieldCheck size={28} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                NIOS DigiLocker & Government Portal Verification
              </h4>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                All term evaluation transcripts generated through this guardian portal are digitally signed under Section 5 of the Information Technology Act. Transcripts can be officially exported directly to student DigiLocker accounts for board exam registrations.
              </p>
            </div>
          </div>
          <button
            onClick={() => showToast('Connecting to National DigiLocker API... Sync verified!')}
            className="px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-900 transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Sync to DigiLocker
          </button>
        </div>

        {/* ── MODAL 1: OFFICIAL NIOS REPORT CARD / MARK SHEET VIEWER ── */}
        {viewingReport && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-10 space-y-6 max-h-[92vh] overflow-y-auto border border-slate-200">
              {/* Report Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-900 text-[10px] font-black uppercase">
                    Official Transcript
                  </span>
                  <span className="text-xs font-mono text-slate-400">{viewingReport.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(viewingReport)}
                    className="p-2 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    title="Download Transcript"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    title="Print Mark Sheet"
                  >
                    <Printer size={18} />
                  </button>
                  <button
                    onClick={() => setViewingReport(null)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Printable Mark Sheet Container */}
              <div className="p-6 sm:p-8 bg-slate-50/50 rounded-2xl border-2 border-slate-200 space-y-6">
                {/* Board Emblem Header */}
                <div className="text-center space-y-1 border-b-2 border-slate-200 pb-5">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-900">
                    National Institute of Open Schooling (NIOS)
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Ministry of Education • Government of India
                  </div>
                  <h3 className="text-xl font-black text-slate-900 pt-1 tracking-tight">
                    {viewingReport.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-600">
                    Academic Session 2025 - 2026 • {viewingReport.period}
                  </div>
                </div>

                {/* Candidate Information Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name</span>
                    <strong className="text-slate-900">{wardInfo.name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Enrollment No</span>
                    <strong className="text-slate-900">{wardInfo.rollNo}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Class / Stream</span>
                    <strong className="text-slate-900">{wardInfo.grade}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Attendance</span>
                    <strong className="text-emerald-600">{viewingReport.attendanceRate}</strong>
                  </div>
                </div>

                {/* Mark Sheet Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-[10px] uppercase font-black text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-3">Subject / Module</th>
                        <th className="p-3 text-center">Theory</th>
                        <th className="p-3 text-center">Practical</th>
                        <th className="p-3 text-center">TMA</th>
                        <th className="p-3 text-center">Total</th>
                        <th className="p-3 text-center">Grade</th>
                        <th className="p-3">Faculty Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {viewingReport.marksBreakdown.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/70">
                          <td className="p-3 font-bold text-slate-900">
                            <div>{row.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{row.code} • {row.faculty}</div>
                          </td>
                          <td className="p-3 text-center font-mono">
                            {row.theoryMax > 0 ? `${row.theory}/${row.theoryMax}` : '—'}
                          </td>
                          <td className="p-3 text-center font-mono">
                            {row.practicalMax > 0 ? `${row.practical}/${row.practicalMax}` : '—'}
                          </td>
                          <td className="p-3 text-center font-mono">
                            {row.tmaMax > 0 ? `${row.tma}/${row.tmaMax}` : '—'}
                          </td>
                          <td className="p-3 text-center font-mono font-black text-slate-900">
                            {row.total}/100
                          </td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-900">
                              {row.grade}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 text-[11px] leading-tight max-w-[200px]">
                            {row.remarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cumulative Result Box */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-slate-200 gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Result</span>
                    <div className="text-lg font-black text-emerald-600 flex items-center gap-2">
                      <span>PASSED WITH DISTINCTION</span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">
                        {viewingReport.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Cumulative Grade</span>
                    <span className="text-2xl font-black text-blue-900">{viewingReport.overallGrade}</span>
                  </div>
                </div>

                {/* Signatures & Blockchain validation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-slate-200 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-black text-slate-400 block">
                      Cryptographic Blockchain Verification
                    </span>
                    <div className="font-mono text-[10px] text-slate-600 break-all bg-white p-2 rounded-lg border border-slate-200">
                      SHA-256: {viewingReport.verifiedHash}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> Validated by NIOS Open Schooling Consortium
                    </span>
                  </div>

                  <div className="flex flex-col items-start sm:items-end justify-center space-y-1">
                    <div className="font-serif italic text-base text-slate-800 font-bold">Dr. Priya Mehta</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Authorized Academic Controller & Coordinator
                    </div>
                    <div className="text-[10px] text-slate-400">Date: {viewingReport.generatedAt}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setViewingReport(null)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(viewingReport)}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} /> Download Official PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL 2: FILTER CRITERIA DRAWER ── */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-slate-100 rounded-xl text-slate-800">
                    <SlidersHorizontal size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Filter Academic Reports</h3>
                    <p className="text-xs text-slate-500">Refine by term, grade bracket, or subject</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Academic Term
                  </label>
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="All">All Terms</option>
                    <option value="Term 1">Term 1 (First Half)</option>
                    <option value="Midterm">Midterm Diagnostic</option>
                    <option value="Term 2">Term 2 (Pre-Board)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Report Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="term">Term Evaluation</option>
                    <option value="subject">Subject Diagnostic</option>
                    <option value="tma">TMA Cumulative</option>
                    <option value="exam">Formative / Viva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Sort Order
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="date">Newest First</option>
                    <option value="grade">Highest Overall Grade</option>
                    <option value="size">File Size (Largest)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTerm('All');
                    setSelectedCategory('all');
                    setSortBy('date');
                    setIsFilterModalOpen(false);
                    showToast('Filters reset.');
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFilterModalOpen(false);
                    showToast('Filter criteria applied!');
                  }}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL 3: BULK DOWNLOAD TRANSCRIPTS ── */}
        {isBulkDownloadOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto shadow-inner">
                <Download size={28} />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Bulk Download Academic Package</h3>
                <p className="text-xs text-slate-500">
                  Export all {ACADEMIC_REPORTS.length} official term transcripts, TMA evaluations, and attendance records as an encrypted archive.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Package Size:</span>
                  <span className="font-mono">8.8 MB (ZIP)</span>
                </div>
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Files Included:</span>
                  <span>4 Signed PDF Transcripts</span>
                </div>
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Verification:</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <ShieldCheck size={13} /> SHA-256 Validated
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={handleBulkDownload}
                  className="w-full py-3.5 bg-blue-900 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={16} /> Confirm & Download ZIP
                </button>

                <button
                  onClick={() => setIsBulkDownloadOpen(false)}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
