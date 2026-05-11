'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { AlertTriangle, FileText, Send, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GrievancePage() {
  return (
    <>
      <BrandingBanner />
      <OfficialNav />

      {/* Hero */}
      <section className="min-h-[60vh] bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full mb-8 mx-auto w-fit">
            <Shield className="w-6 h-6" />
            <span className="font-black uppercase tracking-wider">Grievance Redressal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent drop-shadow-2xl">
            Student Grievance Portal
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            Centralized platform for admission, exam, result, study material and technical grievances - Resolution within 30 days
          </p>
        </div>
      </section>

      {/* Grievance Form */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-200 mb-16">
              <div className="text-center mb-12">
                <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-4xl font-black text-slate-900 mb-4">File Your Grievance</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">Complete the form below. Attach enrollment proof and relevant documents. Response within 7 working days.</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Enrollment No / Name *</label>
                  <input type="text" className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all" placeholder="ENR-2025-00123 / Arjun Sharma" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Category *</label>
                    <select className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm">
                      <option>Admission Process</option>
                      <option>Examination / Result</option>
                      <option>Study Material Delivery</option>
                      <option>TMA Evaluation</option>
                      <option>Technical Issue</option>
                      <option>Fee Refund</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Urgency</label>
                    <select className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm">
                      <option>Normal (30 days)</option>
                      <option>Urgent (7 days)</option>
                      <option>Critical (48 hours)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Description *</label>
                  <textarea rows={6} className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm resize-vertical" placeholder="Detailed description of your grievance..."></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Upload Documents</label>
                    <input type="file" multiple className="w-full px-5 py-4 border-2 border-dashed border-slate-300 rounded-2xl hover:border-emerald-400 transition-colors cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Contact Details</label>
                    <input type="tel" className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm mb-3" placeholder="+91-XXXXXXXXXX" />
                    <input type="email" className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm" placeholder="your.email@example.com" />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 px-8 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  Submit Grievance
                </motion.button>
              </form>
            </div>

            {/* Process Timeline */}
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Acknowledgement</h3>
                <p className="text-slate-600 mb-4">Instant confirmation + tracking ID</p>
                <div className="font-mono text-emerald-600 font-black text-lg tracking-wider">GRV-2026-00123</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center"
              >
                <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Investigation</h3>
                <p className="text-slate-600 mb-4">Assigned to concerned department</p>
                <div className="text-blue-600 font-black text-lg">48 Hours</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Resolution</h3>
                <p className="text-slate-600 mb-4">Final decision + action taken</p>
                <div className="text-emerald-600 font-black text-lg">30 Days Max</div>
              </motion.div>
            </div>

            {/* Escalation */}
            <div className="mt-20 p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl text-center">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-3xl font-black mb-4">Not Satisfied?</h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Escalate to Appellate Authority or file with NIOS Grievance Committee
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#appellate" className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-yellow-500 shadow-xl transition-all">
                  Appellate Authority
                </a>
                <a href="#committee" className="bg-slate-700 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-600 transition-all">
                  Grievance Committee
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

