'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Calendar,
  Search,
  X,
  Flame,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Award,
  Globe,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ExternalLink,
  Video,
  Radio,
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import { INDIAN_LANGUAGES_22 } from '@/lib/courses-data';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, updateLinguisticProfile } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const selectedLang = activeUser.motherLang || 'Hindi';

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowCalendar(false);
        setShowProfileDropdown(false);
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/student/explore-courses?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleLanguageSelect = (langName: string) => {
    if (updateLinguisticProfile) {
      updateLinguisticProfile(langName);
    }
    setShowLangDropdown(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out from NIOS LMS?')) {
      logout?.();
      router.push('/portal');
    }
  };

  const notifications = [
    {
      id: 1,
      title: '22 Regional Dubs Synchronized',
      message: 'Watch "Importance of Animals, Birds & Plants" in Hindi, English, Sindhi & 20 more languages.',
      time: 'Just now',
      unread: true,
      href: '/student/my-courses/course-env-001',
      icon: Video,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      title: 'Live Virtual Classroom Active',
      message: 'Dr. Vikram Mehta is broadcasting live in Science Laboratory Studio.',
      time: '15 mins ago',
      unread: true,
      href: '/live',
      icon: Radio,
      color: 'text-rose-600 bg-rose-50'
    },
    {
      id: 3,
      title: 'Evaluation Reminder',
      message: 'TMA 2026 Environmental Science portfolio submission window is now open.',
      time: '2 hours ago',
      unread: false,
      href: '/assessments',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="px-6 sm:px-8 py-3.5 flex items-center justify-between gap-4">

        {/* ── Left Side: Page Title & Breadcrumb ── */}
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* ── Center: Search Bar ── */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full group">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-900 transition-colors pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 22-lang lectures, subjects, modules..."
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-blue-900 focus:ring-3 focus:ring-blue-900/10 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 transition-all shadow-xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>

        {/* ── Right Side Controls & Profile ── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0" ref={dropdownRef}>

          {/* 23 Languages Quick Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangDropdown(!showLangDropdown);
                setShowNotifications(false);
                setShowCalendar(false);
                setShowProfileDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-white text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-xs"
              title="Change your preferred primary language"
            >
              <Globe size={14} className="text-blue-900 shrink-0" />
              <span className="hidden sm:inline font-black">{selectedLang}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    22 Indian Languages (NEP 2020)
                  </span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-0.5 p-1 scrollbar-thin">
                  {INDIAN_LANGUAGES_22.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageSelect(l.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedLang.toLowerCase() === l.name.toLowerCase()
                          ? 'bg-blue-50 text-blue-900 font-black'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{l.native}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Learning Streak Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-xs">
            <Flame size={15} className="text-amber-500 fill-amber-500" />
            <span className="font-black">12 Days</span>
          </div>

          {/* Academic Calendar Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCalendar(!showCalendar);
                setShowNotifications(false);
                setShowProfileDropdown(false);
                setShowLangDropdown(false);
              }}
              className="w-9 h-9 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-xs"
              title="Academic Calendar"
            >
              <Calendar size={16} />
            </button>

            {showCalendar && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-black text-slate-900 uppercase">
                    Academic Term 2026
                  </span>
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    Today
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700">
                  <div className="font-bold text-blue-900">• Tomorrow 10:00 AM: Science MCQ Quiz</div>
                  <div className="text-[11px] text-slate-500">• 15 May: TMA 2026 Submission Deadline</div>
                </div>
                <Link
                  href="/schedule"
                  onClick={() => setShowCalendar(false)}
                  className="block text-center text-xs font-black text-blue-900 hover:underline pt-1"
                >
                  View Full Academic Schedule →
                </Link>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowCalendar(false);
                setShowProfileDropdown(false);
                setShowLangDropdown(false);
              }}
              className="relative w-9 h-9 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-xs"
              title="Notifications"
            >
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[10px] font-black text-blue-900 hover:underline cursor-pointer">
                    Mark All Read
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <Link
                      key={n.id}
                      href={n.href}
                      onClick={() => setShowNotifications(false)}
                      className={`p-3.5 hover:bg-slate-50 flex items-start gap-3 transition-colors block ${
                        n.unread ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${n.color}`}>
                        <n.icon size={15} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 truncate">{n.title}</div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="p-3 text-center border-t border-slate-100 bg-slate-50/50">
                  <Link
                    href="/dashboard/learner"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-black text-blue-900 hover:underline"
                  >
                    View All Academic Activity →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative pl-1 border-l border-slate-200">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
                setShowCalendar(false);
                setShowLangDropdown(false);
              }}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center font-black text-xs shadow-xs border border-blue-900/30">
                {activeUser.name.charAt(0)}
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                {/* User info header */}
                <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                  <div className="font-black text-xs text-slate-900 truncate">{activeUser.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {activeUser.details.enrollmentNo || 'ENR-2025-001'} · {activeUser.details.class || 'Class 10'}
                  </div>
                  <span className="inline-block px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 text-[8px] font-black uppercase">
                    {activeUser.role}
                  </span>
                </div>

                {/* Dropdown navigation */}
                <Link
                  href="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition-colors block"
                >
                  <User size={15} className="text-slate-400" />
                  <span>My Profile & Bio</span>
                </Link>

                <Link
                  href="/student/certificates"
                  onClick={() => setShowProfileDropdown(false)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition-colors block"
                >
                  <Award size={15} className="text-amber-500" />
                  <span>Verified Certificates</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setShowProfileDropdown(false)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition-colors block"
                >
                  <Settings size={15} className="text-slate-400" />
                  <span>Account Settings</span>
                </Link>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 rounded-xl text-xs font-black text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}