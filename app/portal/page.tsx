'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Zap, ChevronLeft, Fingerprint, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type Role = 'learner' | 'teacher' | 'parent' | 'admin' | 'guest';

const roleConfig: Record<Role, { label: string; email: string; id: string; redirect: string }> = {
  learner: { label: 'LEARNER', email: 'student@school.com', id: 'L10023', redirect: '/dashboard/learner' },
  teacher: { label: 'TEACHER', email: 'teacher@school.com', id: 'T5001', redirect: '/dashboard/teacher' },
  parent: { label: 'PARENT', email: 'parent@school.com', id: 'P7001', redirect: '/dashboard/parent' },
  admin: { label: 'ADMIN', email: 'principal@school.com', id: 'A9001', redirect: '/dashboard/admin' },
  guest: { label: 'GUEST', email: 'guest@school.com', id: 'G1001', redirect: '/dashboard/guest' },
};

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<Role>('learner');
  const [email, setEmail] = useState(roleConfig.learner.email);
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const { login } = useAuth();

  const handleRoleSelect = (role: Role) => {
    setActiveRole(role);
    setEmail(roleConfig[role].email);
  };

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(roleConfig[activeRole].id);
      window.location.href = roleConfig[activeRole].redirect;
    }, 1500);
  };

  const handleBiometric = () => {
    setShowBiometric(true);
    setTimeout(() => {
      handleSignIn();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="absolute -top-1/4 -right-1/4 w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 flex flex-col justify-between p-8 lg:p-20 lg:border-r border-neutral-300/80">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className=" flex items-center gap-4">
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="flex items-center gap-6 justify-center">
                <Image
                  src="/NIOS.png"
                  alt="NIOS Logo"
                  width={70}
                  height={70}
                  className="drop-shadow-2xl brightness-110"
                />
                <div className="flex flex-col text-left">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Government of India</div>
                  <div className="text-xl font-black text-slate-900 leading-tight">National Institute of Open Schooling</div>
                  <div className="text-sm font-bold text-blue-600 uppercase tracking-widest">Digital Learning Ecosystem</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full mb-6">
              <Zap className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Aligned with NEP 2020</span>
            </motion.div>

            <div className="max-w-lg">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Welcome to the Future of Learning.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg lg:text-xl text-neutral-600 font-medium leading-relaxed mb-10">
                Experience personalized education powered by AI. Join millions of learners and educators in a transformative journey.
              </motion.p>
            </div>
            <div className="max-w-xl">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] 
            font-black uppercase mt-5  tracking-[0.2em] text-blue-500 mb-6 
            hover:translate-x-1 transition-transform">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
              </Link>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
            <span>MINISTRY OF EDUCATION</span>
            <div className="w-1 h-1 bg-neutral-300 rounded-full" />
            <span>GOVERNMENT OF INDIA</span>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-full max-w-xl bg-white/80 border-slate-200 border-2 rounded-md p-10 lg:p-14 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <AnimatePresence>
              {(isLoading || showBiometric) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-12 text-center">
                  <div className="relative mb-8">
                    {showBiometric ? (
                      <div className="relative">
                        <Fingerprint className="w-20 h-20 text-blue-500 animate-pulse" />
                        <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 border-b-2 border-blue-400 opacity-50 pointer-events-none" />
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-xl animate-spin" />
                        <ShieldCheck className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{showBiometric ? 'Verifying Identity' : 'Authenticating Node'}</h3>
                  <p className="text-neutral-500 text-sm">{showBiometric ? 'Scanning Biometric signature...' : 'Securing your learning environment...'}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <header className="mb-10">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 hover:translate-x-1 transition-transform">
                <ChevronLeft className="w-4 h-4" /> BACK TO WEBSITE
              </Link>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">Welcome Back</h1>
              <p className="text-neutral-600 font-medium">Continue your adaptive learning journey.</p>
            </header>

            <div className="mb-10 p-1.5 rounded-xl bg-slate-100 border-slate-200 border relative">
              <div className="absolute top-0 left-8 -translate-y-1/2 px-4 py-1.5 bg-white border border-slate-200 rounded-full flex items-center gap-2 shadow-xl">
                <Zap className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">SECURE QUICK-AUTH</span>
              </div>
              <div className="flex flex-wrap gap-2 p-4 pt-6">
                {(Object.keys(roleConfig) as Role[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`px-3 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex-grow lg:flex-grow-0 ${activeRole === role
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 active:scale-95'
                      : 'bg-white text-slate-500 hover:bg-slate-200 border border-transparent'
                      }`}
                  >
                    {roleConfig[role].label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">ENROLLMENT ID / EMAIL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 text-slate-900 rounded-xl py-5 pl-16 pr-6 outline-none transition-all font-medium placeholder:text-neutral-400"
                    placeholder="Enter Enrollment ID"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">PASSWORD</label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">FORGOT?</button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 text-slate-900 rounded-xl py-5 pl-16 pr-6 outline-none transition-all font-medium placeholder:text-neutral-400"
                    placeholder="••••••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="flex-[2] py-5.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 transition-all"
                >
                  SIGN IN <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleBiometric}
                  type="button"
                  className="flex-1 py-5.5 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-xl flex items-center justify-center transition-all"
                >
                  <Fingerprint className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="text-center">
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
                  New Learner? <a href="#" className="text-blue-500 hover:text-blue-400 ml-1">Register Now →</a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
