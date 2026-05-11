"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const HardwareSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background Rings
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.4]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 0.8, 0.7, 0.2]);

  // 3D Card
  const cardScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.7, 1.08, 1.1, 0.82]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [72, 35]);
  const cardRotateY = useTransform(scrollYProgress, [0, 1], [-28, 15]);
  const cardRotateZ = useTransform(scrollYProgress, [0, 1], [-48, -25]);
  const cardY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [220, 0, 0, -100]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.15]);

  // Content 1
  const content1Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const content1Y = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [50, 0, 0, -40]);

  // Content 2
  const content2Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const content2Y = useTransform(scrollYProgress, [0.55, 0.65, 0.85, 0.95], [50, 0, 0, -40]);

  // Final Content
  const finalOpacity = useTransform(scrollYProgress, [0.88, 0.96, 1], [0, 1, 1]);
  const finalY = useTransform(scrollYProgress, [0.88, 0.96, 1], [80, 0, 0]);

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-b from-black via-slate-900 to-red-950 min-h-[300vh] md:min-h-[420vh]"
      role="region"
      aria-label="AI Infrastructure Capabilities"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">

        {/* Top Label - refined with better blue */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
          className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-500/60 bg-black/40 backdrop-blur-xl text-xs md:text-sm font-semibold tracking-widest uppercase text-blue-300 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI-POWERED HARDWARE INFRASTRUCTURE
          </div>
        </motion.div>

        {/* Background Rings - with blue glow */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <div className="relative w-[1400px] max-w-[90vw] aspect-square">
            {[35, 60, 85].map((size, i) => (
              <motion.div
                key={i}
                style={{
                  scale: ringScale,
                  opacity: ringOpacity,
                  rotate: ringRotate,
                  width: `${size}%`,
                  height: `${size}%`,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

          {/* Left: 3D Card - more dramatic styling */}
          <div className="flex justify-center lg:justify-end perspective-1200">
            <motion.div
              style={{
                scale: cardScale,
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                rotateZ: cardRotateZ,
                y: cardY,
                opacity: cardOpacity,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-black" />
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-1000"
                style={{ backgroundImage: "url('/book.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent" />

              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-blue-500/30 shadow-[inset_0_0_30px_rgba(249,115,22,0.2)]" />

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/60 rounded-tl-3xl z-10" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-400/60 rounded-br-3xl z-10" />

              <div className="absolute top-8 left-8 z-30 flex items-center gap-3">
                <div className="w-14 h-1.5 bg-gradient-to-r from-blue-400 to-red-600 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_blue] animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Right: Contents - improved typography and accents */}
          <div className="relative h-full flex flex-col justify-center">

            {/* Content 1 */}
            <motion.div
              style={{ opacity: content1Opacity, y: content1Y }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center mb-8 backdrop-blur-sm">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6 leading-tight">
                Scales Seamlessly<br />for <span className="text-blue-400">Millions</span>
              </h3>
              <p className="text-slate-300 text-lg max-w-lg leading-relaxed">
                Handles peak exam seasons and live classes with real-time scaling and zero interruptions.
              </p>
              <div className="mt-8 flex gap-2">
                <div className="w-8 h-0.5 bg-blue-500/60" />
                <div className="w-12 h-0.5 bg-blue-500" />
              </div>
            </motion.div>

            {/* Content 2 */}
            <motion.div
              style={{ opacity: content2Opacity, y: content2Y }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center mb-8 backdrop-blur-sm">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c-1.17-1.17-1.17-3.069 0-4.238 1.17-1.17 3.07-1.17 4.24 0M16.95 8.692c1.17 1.17 1.17 3.07 0 4.24" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6 leading-tight">
                Smart Adaptive<br /><span className="text-blue-400">Networking</span>
              </h3>
              <p className="text-slate-300 text-lg max-w-lg leading-relaxed">
                Low-latency connections for real-time AI tutoring across India’s diverse networks.
              </p>
              <div className="mt-8 flex gap-2">
                <div className="w-8 h-0.5 bg-blue-500/60" />
                <div className="w-12 h-0.5 bg-blue-500" />
              </div>
            </motion.div>

            {/* Final Content - refined with better blue accents */}
            <motion.div
              style={{ opacity: finalOpacity, y: finalY }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto z-20"
            >
              <div className="max-w-md">
                <div className="inline-block text-blue-400 text-sm font-medium mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                  READY FOR NATIONAL SCALE
                </div>
                <h2 className="text-5xl font-bold text-white tracking-tighter leading-tight mb-6">
                  Powerful AI <br /><span className="text-blue-400">Infrastructure</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  From massive GPU clusters to intelligent networking — built to deliver personalized learning at millions of users.
                </p>
                <div className="flex items-center gap-3 text-blue-400 font-medium">
                  <span>Scroll complete</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span>Next section</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade transition - using slate */}
      <div className="h-32 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

      {/* Mobile safety */}
      <style jsx>{`
        @media (max-width: 768px) {
          .perspective-1200 * {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};