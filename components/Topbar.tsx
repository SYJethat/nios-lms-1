'use client';

import { useState, useEffect, useRef } from 'react';
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
  Award
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { user, logout } = useAuth();   // Make sure logout function exists in your AuthContext

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Role mappings
  const roleTitles: Record<string, string> = {
    learner: 'Student',
    teacher: 'Teacher',
    admin: 'Admin',
    parent: 'Parent',
    guest: 'Guest'
  };

  const roleGradients: Record<string, string> = {
    learner: 'from-blue-500 to-indigo-500',
    teacher: 'from-green-500 to-emerald-500',
    admin: 'from-purple-500 to-violet-500',
    parent: 'from-blue-500 to-red-500',
    guest: 'from-slate-500 to-slate-700'
  };

  const displayName = user?.name || 'Guest User';
  const displayRole = user ? (roleTitles[user.role] || 'User') : 'Guest';

  let userSubtitle = '';
  if (user?.details) {
    switch (user.role) {
      case 'learner':
        userSubtitle = user.details.class || 'Student';
        break;
      case 'teacher':
        userSubtitle = user.details.subjects?.[0] || 'Faculty';
        break;
      case 'admin':
        userSubtitle = user.details.designation || 'Administrator';
        break;
      case 'parent':
        userSubtitle = user.details.studentName || 'Parent';
        break;
      default:
        userSubtitle = 'User';
    }
  }

  const avatarInitial = displayName[0]?.toUpperCase() || 'G';
  const gradientClass = user
    ? (roleGradients[user.role] || 'from-slate-500 to-slate-700')
    : 'from-slate-500 to-slate-700';

  const notifications = [
    { id: 1, message: "New Sanskrit Pronunciation module added", time: "Just now", unread: true },
    { id: 2, message: "Your quiz score is ready - Vedic Math", time: "1 hour ago", unread: true },
    { id: 3, message: "Live session: Bhagavad Gita Chapter 2 starts soon", time: "3 hours ago", unread: false },
  ];

  const clearSearch = () => setSearchTerm('');

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowCalendar(false);
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout?.(); // Call the logout function from context, optionally redirecting to login
      redirect('/login');
      // Optional: Show a logout confirmation
      setShowProfileDropdown(false);
    }
  };

  const handleViewProfile = () => {
    // alert("redirecting to Profile Page..."); // Replace with router.push('/profile')
    redirect('/profile');

    // setShowProfileDropdown(false);
  };

  const handleSettings = () => {
    // alert("Opening Settings..."); // Replace with router.push('/settings')
    redirect('/settings');
    setShowProfileDropdown(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="px-8 py-10 flex items-center justify-between">

        {/* Left: Title */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tighter">
            {title}
          </h1>
          {(subtitle || userSubtitle) && (
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {subtitle || userSubtitle}
            </p>
          )}
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl mx-12">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses, shlokas, materials..."
              className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl pl-12 pr-12 py-3.5 text-base transition-all duration-200 shadow-sm placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3" ref={dropdownRef}>

          {/* Calendar */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCalendar(!showCalendar);
                setShowNotifications(false);
                setShowProfileDropdown(false);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl hover:bg-slate-100 transition-all text-slate-700 hover:text-slate-900"
            >
              <Calendar size={20} />
              <span className="text-sm font-medium hidden md:block">Calendar</span>
            </button>

            {showCalendar && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50">
                <div className="text-lg font-semibold text-slate-800 mb-4">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-xl p-5 text-center">
                  <p className="text-blue-600 font-medium">No classes scheduled today</p>
                  <p className="text-xs text-slate-500 mt-1">Enjoy your learning journey ✨</p>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowCalendar(false);
                setShowProfileDropdown(false);
              }}
              className="relative flex items-center justify-center w-12 h-12 rounded-2xl hover:bg-slate-100 transition-all"
            >
              <Bell size={22} className="text-slate-700" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                3
              </div>
            </button>

            {showNotifications && (
              <div className="absolute -right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                <div className="px-6 py-5 border-b flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                  <div className="font-medium text-lg ">Notifications</div>
                  <button className="text-blue-600 text-sm font-medium hover:underline">Mark all read</button>
                </div>

                <div className="max-h-[420px] overflow-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-6 py-4 hover:bg-slate-50 border-b border-slate-200 last:border-none ${notif.unread ? 'bg-blue-50/70' : ''}`}
                    >
                      <div className="text-slate-700 text-sm">{notif.message}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{notif.time}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 text-center text-blue-600 text-sm font-medium border-t hover:bg-slate-50 cursor-pointer">
                  View all activity
                </div>
              </div>
            )}
          </div>
          <div className={`w-[20vh] h-8 rounded-xl border border-slate-500  flex items-center justify-center text-left   text-sm`}
          >
            <select name="Language" id="1" className='text-left text-slate-800'>

              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="sa">Sanskrit</option>
              <option value="bn">Bengali</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="kn">Kannada</option>
              <option value="ml">Malayalam</option>
              <option value="mr">Marathi</option>
              <option value="gu">Gujarati</option>
              <option value="pa">Punjabi</option>



            </select>
          </div>
          {/* </div> */}
          {/* Streak */}
          <div className="flex items-center gap-1.5 border    border-slate-200 rounded-2xl px-4 py-2 text-sm font-semibold text-blue-700">
            <Flame className="text-blue-500" size={18} />
            <span>12 Day Streak</span>
          </div>

          {/* Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
                setShowCalendar(false);
              }}
              className="flex items-center gap-3 pl-4   rounded-full py-1 pr-2 transition-all"
            >
              <div
                className={`w-11 h-11 rounded-full border-2 border-slate-500 animate-pulse bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold text-xl shadow-md ring-2 ring-white hover:scale-105 transition-transform`}
              >
                {avatarInitial}
              </div>
              <ChevronDown size={18} className="text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden">
                {/* User Info */}
                <div className="px-6 py-5 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold text-3xl shadow`}>
                      {avatarInitial}
                    </div>
                    <div>
                      <div className="font-semibold text-md text-slate-900">{displayName}</div>
                      <div className="text-xs text-slate-500">{displayRole} • {userSubtitle}</div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={handleViewProfile}
                    className="w-full px-6 py-2 flex items-center gap-2 hover:bg-slate-50 text-left transition-colors"
                  >
                    <User size={20} className="text-slate-500" />
                    <span className="font-medium text-slate-700 text-sm">View Profile</span>
                  </button>

                  <button
                    onClick={handleSettings}
                    className="w-full px-6 py-2 flex items-center gap-2 hover:bg-slate-50 text-left transition-colors"
                  >
                    <Settings size={20} className="text-slate-500" />
                    <span className="font-medium text-slate-700 text-sm">Settings</span>
                  </button>

                  <button
                    onClick={handleViewProfile => {
                      redirect('/achievements');
                    }}
                    className="w-full px-6 py-2 flex items-center gap-2 hover:bg-slate-50 text-left transition-colors"
                  >
                    <Award size={20} className="text-slate-500" />
                    <span className="font-medium text-slate-700 text-sm">My Achievements</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 my-1"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-2 flex items-center gap-2 hover:bg-blue-50 text-left transition-colors text-blue-600"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Overlay */}
      {(showNotifications || showCalendar || showProfileDropdown) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setShowNotifications(false);
            setShowCalendar(false);
            setShowProfileDropdown(false);
          }}
        />
      )}
    </div>
  );
}