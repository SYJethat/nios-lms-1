"use client";

import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Video,
  FileText,
  Calendar,
  MessageCircle,
  Cpu,
  BarChart2,
  Award,
  User,
  Settings,
  CreditCard,
  LogOut,
  Users,
  ClipboardList,
  Shield,
  UserPlus,
  Globe,
  Headphones,
  BookCheck,
  Server,
  Zap,
  AlertCircle,
  GraduationCap,
  Bell,
  Megaphone,
  Gamepad2,
  Compass,
  Radio,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  labelHindi?: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const activeUser = user || MOCK_USERS[0];
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = activeUser.role;

  // ── Learner Navigation ──
  const learnerMain: NavItem[] = [
    { icon: <Home size={18} />, label: "Dashboard", labelHindi: "डैशबोर्ड", href: "/dashboard/learner" },
    { icon: <Compass size={18} />, label: "Explore Courses", labelHindi: "पाठ्यक्रम खोजें", href: "/student/explore-courses" },
    { icon: <Video size={18} />, label: "22-Language Learning", labelHindi: "22 भाषा वीडियो", href: "/language",  badgeColor: "bg-emerald-100 text-emerald-800" },
    { icon: <GraduationCap size={18} />, label: "My Enrolled Courses", labelHindi: "मेरे पाठ्यक्रम", href: "/student/my-courses", badgeColor: "bg-blue-100 text-blue-900" },

    { icon: <Radio size={18} />, label: "Live Classroom", labelHindi: "लाइव कक्षा", href: "/live", badge: "LIVE", badgeColor: "bg-rose-100 text-rose-700 animate-pulse" },
  ];

  const learnerAcademic: NavItem[] = [
    { icon: <FileText size={18} />, label: "Assessments & TMA", labelHindi: "मूल्यांकन एवं टीएमए", href: "/assessments", badge: "Due", badgeColor: "bg-amber-100 text-amber-900" },
    { icon: <BarChart2 size={18} />, label: "Learning Analytics", labelHindi: "प्रगति रिपोर्ट", href: "/analytics" },
    // { icon: <Globe size={18} />, label: "Language Lab", labelHindi: "भाषा प्रयोगशाला", href: "/student/learn-language" },
    { icon: <Gamepad2 size={18} />, label: "Gamified Knowledge", labelHindi: "ज्ञान अखाड़ा", href: "/gamification", badge: "XP", badgeColor: "bg-purple-100 text-purple-800" },
    { icon: <BookOpen size={18} />, label: "Digital Library", labelHindi: "डिजिटल पुस्तकालय", href: "/student/library" },
  ];

  const learnerTools: NavItem[] = [
    { icon: <Cpu size={18} />, label: "AI Academic Tutor", labelHindi: "एआई ट्यूटर", href: "/ai-tutor", badge: "AI", badgeColor: "bg-indigo-100 text-indigo-800" },
    { icon: <MessageCircle size={18} />, label: "Discussion Forum", labelHindi: "चर्चा मंच", href: "/discussion", badge: "5", badgeColor: "bg-slate-100 text-slate-700" },
    { icon: <Calendar size={18} />, label: "Academic Schedule", labelHindi: "समय सारिणी", href: "/schedule" },
    { icon: <Award size={18} />, label: "Verified Certificates", labelHindi: "प्रमाण पत्र", href: "/student/certificates" },
  ];

  // ── Teacher Navigation ──
  const teacherMain: NavItem[] = [
    { icon: <Home size={18} />, label: "Teacher Dashboard", href: "/dashboard/teacher" },
    { icon: <Users size={18} />, label: "My Students", href: "/teacher/students" },
    { icon: <BookOpen size={18} />, label: "My Classes", href: "/teacher/classes" },
    { icon: <ClipboardList size={18} />, label: "Gradebook & TMA", href: "/teacher/grades", badge: "38", badgeColor: "bg-blue-100 text-blue-900" },
    { icon: <Shield size={18} />, label: "Examinations", href: "/teacher/exams", badge: "4", badgeColor: "bg-amber-100 text-amber-900" },
    { icon: <FileText size={18} />, label: "Faculty Reports", href: "/teacher/reports" },
    { icon: <Cpu size={18} />, label: "Faculty Hub", href: "/teacher/content" },
    { icon: <Zap size={18} />, label: "Announcements", href: "/teacher/announcements", badge: "New", badgeColor: "bg-emerald-100 text-emerald-800" },
    { icon: <Headphones size={18} />, label: "Support Tickets", href: "/teacher/tickets" },
  ];

  // ── Admin Navigation ──
  const adminMain: NavItem[] = [
    { icon: <Home size={18} />, label: "Admin Console", href: "/dashboard/admin" },
    { icon: <Users size={18} />, label: "Faculty Management", href: "/admin/teachers" },
    { icon: <GraduationCap size={18} />, label: "Student Registry", href: "/admin/students" },
    { icon: <BookOpen size={18} />, label: "Course Curriculum", href: "/admin/content" },
    { icon: <BookCheck size={18} />, label: "Course Setup", href: "/admin/create-course" },
    { icon: <UserPlus size={18} />, label: "Admissions Ops", href: "/admin/admissions" },
    { icon: <CreditCard size={18} />, label: "Financial Ops", href: "/admin/finance" },
    { icon: <Headphones size={18} />, label: "Support & SLA", href: "/admin/support", badge: "12", badgeColor: "bg-rose-100 text-rose-700" },
    { icon: <Server size={18} />, label: "System & Security", href: "/admin/system" },
    { icon: <Settings size={18} />, label: "Portal Settings", href: "/admin/settings" },
  ];

  // ── Parent Navigation ──
  const parentMain: NavItem[] = [
    { icon: <Home size={18} />, label: "Parent Overview", href: "/dashboard/parent" },
    { icon: <Users size={18} />, label: "Ward Profile", href: "/profile" },
    { icon: <FileText size={18} />, label: "Academic Reports", href: "/dashboard/parent/reports", badge: "3", badgeColor: "bg-blue-100 text-blue-900" },
    { icon: <AlertCircle size={18} />, label: "Attendance & Alerts", href: "/dashboard/parent/alerts" },
    { icon: <Calendar size={18} />, label: "PTM Meetings", href: "/dashboard/parent/ptm" },
    { icon: <CreditCard size={18} />, label: "Fee & Invoices", href: "/dashboard/parent/fees" },
  ];

  // ── Guest Navigation ──
  const guestMain: NavItem[] = [
    { icon: <Home size={18} />, label: "Guest Portal", href: "/dashboard/guest" },
    { icon: <BookOpen size={18} />, label: "Public Courses", href: "/courses" },
    { icon: <Compass size={18} />, label: "Explore All", href: "/student/explore-courses" },
  ];

  // Common Account Navigation
  const accountNav: NavItem[] = [
    { icon: <User size={18} />, label: "My Profile", labelHindi: "मेरी प्रोफ़ाइल", href: "/profile" },
    ...(role === "learner"
      ? [{ icon: <CreditCard size={18} />, label: "Fee & Receipts", labelHindi: "शुल्क एवं रसीदें", href: "/student/finance" }]
      : []),
    { icon: <Settings size={18} />, label: "Settings", labelHindi: "सेटिंग्स", href: "/settings" },
  ];

  // Build Sections dynamically based on active role
  const sections =
    role === "learner"
      ? [
        { label: "Core Learning", labelHindi: "मुख्य अध्ययन", items: learnerMain },
        { label: "Evaluations & Academics", labelHindi: "मूल्यांकन एवं परीक्षा", items: learnerAcademic },
        { label: "Tools & Resources", labelHindi: "संसाधन", items: learnerTools },
        { label: "Account & Profile", labelHindi: "खाता", items: accountNav },
      ]
      : role === "teacher"
        ? [
          { label: "Teacher Ops", items: teacherMain },
          { label: "Account", items: accountNav },
        ]
        : role === "admin"
          ? [
            { label: "Administration", items: adminMain },
            { label: "Account", items: accountNav },
          ]
          : role === "guest"
            ? [
              { label: "Guest Portal", items: guestMain },
              { label: "Account", items: accountNav },
            ]
            : [
              { label: "Ward Performance", items: parentMain },
              { label: "Account", items: accountNav },
            ];

  const handleLogout = () => {
    logout();
    router.push("/portal");
  };

  const roleTitleMap: Record<string, { label: string; badge: string; color: string }> = {
    learner: { label: "STUDENT PORTAL", badge: "शिक्षार्थी", color: "bg-blue-900 text-white" },
    teacher: { label: "FACULTY PORTAL", badge: "शिक्षक", color: "bg-emerald-800 text-white" },
    admin: { label: "ADMIN CONSOLE", badge: "प्रशासन", color: "bg-purple-900 text-white" },
    parent: { label: "PARENT ACCESS", badge: "अभिभावक", color: "bg-amber-800 text-white" },
    guest: { label: "GUEST ACCESS", badge: "अतिथि", color: "bg-slate-800 text-white" },
  };

  const currentRoleInfo = roleTitleMap[role] || roleTitleMap.learner;

  return (
    <>
      {/* ── Mobile Hamburger Header (Visible only on < md) ── */}
      <div className="md:hidden fixed top-0 inset-x-0 h-16 bg-white border-b border-slate-200 z-50 px-4 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/NIOS.png"
            alt="NIOS Logo"
            width={34}
            height={34}
            className="object-contain h-8 w-8 shrink-0"
          />
          <div>
            <div className="text-[10px] font-black text-blue-900 leading-tight">
              NIOS LMS
            </div>
            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-tight">
              National Portal
            </div>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer Backdrop & Slide-over ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[300px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/NIOS.png"
                    alt="NIOS Logo"
                    width={36}
                    height={36}
                    className="object-contain h-9 w-9 shrink-0"
                  />
                  <div>
                    <div className="text-[10px] font-bold text-blue-900">
                      राष्ट्रीय मुक्त विद्यालय
                    </div>
                    <div className="text-[10px] font-black text-slate-900">
                      NIOS AI Portal
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {sections.map((section) => (
                  <div key={section.label} className="space-y-1">
                    <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                      {section.label}
                    </div>
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all",
                            isActive
                              ? "bg-[#0d1322] text-white shadow-md font-black"
                              : "text-slate-700 hover:bg-slate-100"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className={isActive ? "text-amber-400" : "text-slate-500"}>
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded-full", item.badgeColor || "bg-blue-100 text-blue-900")}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Mobile Drawer User Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {activeUser.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{activeUser.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{activeUser.role}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Desktop Permanent Sidebar (w-[280px] fixed) ── */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-slate-200 z-40 flex-col justify-between shadow-sm">

        {/* Top Header & Brand */}
        <div className="p-5 border-b border-slate-100 bg-white shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/NIOS.png"
                alt="NIOS Emblem"
                width={42}
                height={42}
                className="object-contain h-11 w-11 shrink-0 drop-shadow-sm group-hover:scale-105 transition-transform"
                priority
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold text-blue-900 leading-tight truncate">
                राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान
              </div>
              <div className="text-[11px] font-black text-slate-900 leading-snug tracking-tight truncate">
                National Institute of Open Schooling
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  AI LMS · NEP 2020
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[8px] font-black border border-emerald-200">
                  ONLINE
                </span>
              </div>
            </div>
          </Link>

          {/* Role Pill Strip */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-xs", currentRoleInfo.color)}>
              {currentRoleInfo.label}
            </span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {currentRoleInfo.badge}
            </span>
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
          {sections.map((section) => (
            <div key={section.label} className="space-y-1">
              <div className="px-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 mb-2">
                <span>{section.label}</span>
                {section.labelHindi && (
                  <span className="text-[9px] font-semibold text-slate-400 normal-case">{section.labelHindi}</span>
                )}
              </div>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group relative",
                        isActive
                          ? "bg-[#0d1322] text-white shadow-md font-black"
                          : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "shrink-0 transition-transform duration-200 group-hover:scale-110",
                            isActive ? "text-amber-400" : "text-slate-500 group-hover:text-blue-900"
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 shadow-xs",
                            isActive
                              ? "bg-white/20 text-white border border-white/20"
                              : item.badgeColor || "bg-blue-100 text-blue-900"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Active Indicator Bar on Left */}
                      {isActive && (
                        <span className="absolute left-0 inset-y-1.5 w-1 bg-amber-400 rounded-r-md" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile & Quick Logout Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50/70 shrink-0">
          <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm border border-blue-900/40">
                {activeUser.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-slate-900 truncate">
                  {activeUser.name}
                </div>
                <div className="text-[10px] font-semibold text-slate-400 truncate">
                  {activeUser.details.enrollmentNo || "ENR-2025-001"} · {activeUser.details.class || "Class 10"}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer shrink-0"
              title="Logout from NIOS LMS"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}