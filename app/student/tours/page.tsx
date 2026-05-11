'use client';

import React, { useState } from 'react';
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
    Layout
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const lessons = [
    { sno: 1, name: 'Introduction to Medical Astrology', length: '19.14 min', section: 1, views: 2, date: '25-08-2025' },
    { sno: 2, name: 'Ayurvedic medicine and medical astrology', length: '28.9 min', section: 1, views: 1, date: '30-04-2026' },
    { sno: 3, name: 'General Introduction to Astrology', length: '23.39 min', section: 1, views: 1, date: '30-04-2026' },
    { sno: 4, name: 'Introduction of Birth Chart', length: '29.21 min', section: 2, views: 1, date: '30-04-2026' },
    { sno: 5, name: 'Human Anatomy', length: '17.87 min', section: 2, views: 1, date: '30-04-2026' },
];

const studyMaterials = [
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
];

export default function ReportsPage() {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState<'report' | 'guided'>('report');

    if (!user) return null;

    return (
        <DashboardLayout
            title="Academic Performance & Resources"
            subtitle="Track your progress and access guided learning materials for your electives"
        >
            <div className="space-y-8 pb-20">

                {/* Header & Toggle */}


                <AnimatePresence mode="wait">

                    <motion.div
                        key="guided"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="grid lg:grid-cols-[400px_1fr] gap-10 px-4"
                    >
                        {/* Left: Course Card */}
                        <div className="space-y-8">
                            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 text-center">
                                <div className="relative aspect-square w-full rounded-[32px] overflow-hidden mb-8 border-4 border-slate-50 shadow-inner bg-slate-900 flex items-center justify-center">
                                    {/* Logo & Content Simulation */}
                                    <div className="relative text-center p-8 space-y-6">
                                        <img src="/NIOS.png" alt="NIOS" className="h-16 mx-auto" />
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">Introduction to Medical Astrology</h3>
                                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Digital Learning Module</p>
                                        </div>
                                        <div className="pt-6 border-t border-white/10 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                            Prepared by: Samskrit Promotion Foundation
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
                                    <BookOpen className="text-blue-900" size={24} />
                                    <h4 className="font-black uppercase tracking-tight">Reading Guide</h4>
                                </div>
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed mb-8">
                                    Complete all materials to unlock your Final Examination and earn 4 Academic Credits.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase">
                                        <span>Completed</span>
                                        <span>10 / 10</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-blue-900" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Material List */}
                        <div className="space-y-4">
                            {studyMaterials.map((material) => (
                                <div
                                    key={material.id}
                                    className="group p-6 rounded-3xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Module {material.id}</span>
                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-tight">
                                                {material.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <button className="px-8 py-3.5 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                                        Study Material <Download size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </AnimatePresence>

            </div>
        </DashboardLayout>
    );
}
