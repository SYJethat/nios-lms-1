'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { HelpCircle, FileText, Send, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I apply for admission?',
      answer: 'Visit the Admission page under Student Support for detailed instructions and online application form.'
    },
    {
      question: 'What is the exam schedule?',
      answer: 'Exam schedules are published on the Examination / Result page. Check regularly for updates.'
    },
    {
      question: 'How can I access study materials?',
      answer: 'Study materials are available for download on the Study Material page under Student Support.'
    },
    {
      question: 'What is the TMA submission process?',
      answer: 'Submit your TMA assignments      online through the TMA page. Follow the guidelines for formatting and deadlines.'
    },
    {
      question: 'How do I check my results?',
      answer: 'Results are published on the Examination / Result page. Use your enrollment number to access your scorecard.'
    },
  ];

  return (
    <>
      <BrandingBanner />
      <OfficialNav />

      {/* Hero */}
      <section className="min-h-[50vh] bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full mb-6 mx-auto w-fit">
            <HelpCircle className="w-6 h-6" />
            <span className="font-black uppercase tracking-wider">Frequently Asked Questions</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            NIOS FAQ
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">Common questions about admissions, exams, study materials and support services</p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, i) => (
              <motion.div key={i} className="bg-white rounded-2xl shadow-md p-6 border border-slate-200" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0    }} transition={{ delay      :   i * 0.1 }}>
                <h3 className="font-black text-lg text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}