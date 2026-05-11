"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Globe, Shield, Zap, X, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

const LMSPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has already been shown in this session
    // const hasBeenShown = sessionStorage.getItem("lms_popup_shown");
    
    if (true) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // sessionStorage.setItem("lms_popup_shown", "true");
      }, 100); // 1 second delay for better UX

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-white/20"
          >
            {/* Top Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Side - Visual/Hero Area */}
              <div className="md:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse delay-700" />
                </div>
                
                <div className="z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-[10px] font-bold uppercase tracking-wider mb-6">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    New Launch
                  </div>
                  <h2 className="text-3xl font-black leading-tight mb-4">
                    The Next-Gen <br />
                    <span className="text-blue-200">AI Learning</span>
                  </h2>
                </div>

                <div className="z-10 mt-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className=" bg-white/10 rounded-lg backdrop-blur-sm">
                      <img src="/NIOS.png" alt="" className="h-10 w-auto rounded-full" />
                    </div>
                    <span className="text-sm font-medium"> NIOS Official</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Content Area */}
              <div className="md:w-7/12 p-8 md:p-10 bg-white">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome to NIOS AI LMS</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Experience a personalized, adaptive, and inclusive learning journey designed with the latest AI technology to empower every learner.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Brain, label: "AI Tutoring", color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: Globe, label: "22 Languages", color: "text-emerald-600", bg: "bg-emerald-50" },
                    { icon: Shield, label: "Verified", color: "text-amber-600", bg: "bg-amber-50" },
                    { icon: Zap, label: "Personalized", color: "text-indigo-600", bg: "bg-indigo-50" },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all group">
                      <div className={`p-2 rounded-lg ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{feature.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/portal" onClick={closePopup} className="flex-1">
                    <button className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
                      Explore LMS Platform
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <button 
                    onClick={closePopup}
                    className="py-4 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-xs transition-all"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LMSPopup;
