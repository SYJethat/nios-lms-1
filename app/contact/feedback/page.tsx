'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { Star, Send, MessageCircle, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeedbackPage() {
  return (
    <>
      <BrandingBanner />
      <OfficialNav />

      {/* Hero */}
      <section className="min-h-[60vh] bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(147,51,234,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full mb-8 mx-auto w-fit">
            <ThumbsUp className="w-6 h-6" />
            <span className="font-black uppercase tracking-wider">Feedback Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            Your Feedback Matters
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            Help us improve NIOS services - share your experience with courses, exams, support and portal usability
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-200 mb-16">
              <div className="text-center mb-12">
                <Star className="w-20 h-20 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-black text-slate-900 mb-4">Share Your Experience</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">Anonymous feedback welcome. Specific details help us improve faster.</p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Enrollment No (Optional)</label>
                    <input type="text" className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm" placeholder="ENR-2025-00123" />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Service Category *</label>
                    <select className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm">
                      <option>Website/Portal</option>
                      <option>Admission Process</option>
                      <option>Study Material</option>
                      <option>TMA Service</option>
                      <option>Examination Process</option>
                      <option>Customer Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">What did you like? (Optional)</label>
                  <textarea rows={4} className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm" placeholder="Share positive aspects..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Suggestions for improvement *</label>
                  <textarea rows={6} className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm resize-vertical" placeholder="Tell us how we can serve you better..."></textarea>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Overall Rating</label>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="w-8 h-8 text-amber-400 cursor-pointer fill-current hover:text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Anonymous</label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                      <span className="text-sm font-medium text-slate-700">Yes, keep anonymous</span>
                    </label>
                  </div>
                  <div className="flex items-end">
                    <label className="block text-sm text-slate-500">Contact for follow-up (optional)</label>
                    <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 mt-1" placeholder="email@example.com" />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6 px-8 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-3 mx-auto max-w-md"
                >
                  <Send className="w-6 h-6" />
                  Submit Feedback
                </motion.button>
              </form>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <motion.div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-10 rounded-3xl text-center shadow-2xl">
                <div className="text-5xl font-black mb-4">12K+</div>
                <div className="text-xl font-bold uppercase tracking-wide">Feedbacks Received</div>
              </motion.div>
              <motion.div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-10 rounded-3xl text-center shadow-2xl">
                <div className="text-5xl font-black mb-4">87%</div>
                <div className="text-xl font-bold uppercase tracking-wide">Action Taken</div>
              </motion.div>
              <motion.div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-10 rounded-3xl text-center shadow-2xl">
                <div className="text-5xl font-black mb-4">4.2</div>
                <div className="text-xl font-bold uppercase tracking-wide">Avg Rating</div>
              </motion.div>
            </div>

            {/* Categories */}
            <div className="text-center">
              <h3 className="text-3xl font-black text-slate-900 mb-12">Common Feedback Categories</h3>
              <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  'Portal Speed', 'Admission', 'SLM Delivery', 'TMA', 'Results', 'Mobile App', 'Support Response'
                ].map((category, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group bg-white p-6 rounded-xl shadow-lg border border-slate-200 cursor-pointer hover:shadow-xl hover:border-indigo-200 transition-all"
                  >
                    <div className="text-2xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {category}
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 w-[78%] rounded-full" />
                    </div>
                    <div className="text-xs text-slate-500 mt-2">342 feedbacks</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

