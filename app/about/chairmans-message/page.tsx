'use client';

import {
  Quote,
  Compass,
  GraduationCap,
  Globe2,
  BookOpen,
  Lightbulb,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Mail,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BrandingBanner from '@/components/BrandingBanner';
import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';

/* ─── Key Initiatives mentioned in the message ─── */
const initiatives = [
  {
    icon: Globe2,
    title: 'NEP 2020 Alignment',
    desc: 'Inclusive, accessible and equitable education for all, supporting UN SDG 4 (Quality Education).',
    accent: 'bg-blue-900',
    light: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-900',
  },
  {
    icon: BookOpen,
    title: 'Multilingual SLMs',
    desc: 'Self-learning materials in 14 mediums at Secondary level and 8 mediums at Senior Secondary level.',
    accent: 'bg-sky-600',
    light: 'bg-sky-50',
    border: 'border-sky-100',
    text: 'text-sky-700',
  },
  {
    icon: Lightbulb,
    title: 'On-Demand Examinations',
    desc: 'Learners can appear for examinations as per their level of preparation and personal convenience.',
    accent: 'bg-amber-500',
    light: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
  },
  {
    icon: Users,
    title: 'UL-LAS Scheme',
    desc: 'Empowering lifelong learners from all sections — school dropouts, tribal populations, PWDs and more.',
    accent: 'bg-emerald-600',
    light: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
  },
  {
    icon: GraduationCap,
    title: 'Natya Kala SLMs',
    desc: "Integrating India's classical dance and theatre traditions into mainstream open schooling curriculum.",
    accent: 'bg-purple-600',
    light: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-700',
  },
  {
    icon: Sparkles,
    title: 'Technology & Innovation',
    desc: 'Overall vision rooted in transparency, accountability, technology integration and innovation in education.',
    accent: 'bg-rose-500',
    light: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-700',
  },
];

const messageParagraphs = [
  {
    highlight: 'NEP 2020',
    text: 'Welcome to the National Institute of Open Schooling (NIOS), an institution dedicated to empowering individuals through flexible, accessible, and quality education. As the Chairperson, my overall vision thrives on transparency, accountability, technology integration and innovation into education. In a landmark move towards inclusive education, NIOS has launched several initiatives aligned to the NEP 2020 for inclusive, accessible, and equitable education for all and supports the vision of the UN Sustainable Development Goal 4 (Quality Education).',
  },
  {
    highlight: null,
    text: 'Building on our philosophy to support multilingualism, we have launched self-learning materials (SLMs) in 14 mediums at Secondary Level and 8 mediums in Senior Secondary Level with 20 Languages at Secondary Level and 14 Languages at Senior Secondary Level offered as Academic subjects. By offering SLMs in regional languages, NIOS addresses the linguistic barriers that many learners face, particularly those from remote and marginalized communities.',
  },
  {
    highlight: 'On-Demand Examination System',
    text: 'We are proud to foster an educational environment that encourages learners to explore, discover, and grow at their own pace, through the On-Demand Examination System - a special provision that helps students take up examinations as per their level of preparation and convenience, whenever they feel ready.',
  },
  {
    highlight: 'UL-LAS',
    text: 'We aim to foster an inclusive, lifelong learning ecosystem with UL-LAS (Understanding Lifelong Learning for All in Society), to empower learners from all sections of society. Our target groups include school dropouts, women and girls, tribal and rural populations, persons with disabilities, and workers in the unorganized sector.',
  },
  {
    highlight: null,
    text: 'NIOS has launched Self-Learning Materials (SLM) in Natya Kala, the classical art of dance and theatre. This initiative is committed to integration of India\'s traditional knowledge systems into mainstream education, providing in-depth understanding of both theoretical and practical aspects. Designed to be user-friendly and accessible, these resources cater to learners across diverse age groups and backgrounds.',
  },
  {
    highlight: null,
    text: 'As the Chairperson, I encourage you to explore the many opportunities from school education to vocational training and adult education. We are committed to providing flexible and holistic educational opportunities to empower individuals to learn at their own pace and pursue their unique dreams.',
  },
];

export default function ChairpersonMessagePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandingBanner />
      <OfficialNav />

      <div className="space-y-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* ── Page Hero ── */}
        <section className="pt-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[12px] font-black text-blue-900 uppercase tracking-[0.3em]">
            <Compass size={13} /> Chairperson's Message
          </div>
          <div className="grid lg:grid-cols-2 gap-4 items-end">
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
              A Message from<br />
              <span className="text-blue-900">Our Chairman.</span>
            </h1>
          </div>
        </section>

        {/* ── Profile + Message ── */}
        <section className="grid lg:grid-cols-3 gap-6 items-start">

          {/* Sticky Profile Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-4">

            {/* Photo Card */}
            <div className="relative rounded-2xl overflow-hidden bg-blue-900 shadow-2xl">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1e3a8a 0%, transparent 60%)',
                }}
              />
              <img
                src="https://cdn.nios.ac.in/cms/documents/2025/Aug/07/1754551262_Dr_AkhileshM_CP.jpeg"
                alt="Prof. Akhilesh Mishra – Chairman, NIOS"
                className="relative z-10 w-full object-cover object-top"
                style={{ maxHeight: '420px' }}
              />
              {/* Name overlay at bottom */}
              <div className="relative z-10 px-7 py-6 bg-gradient-to-t from-blue-950 to-transparent">
                <p className="text-[14px] font-extrabold uppercase tracking-widest text-blue-300 mb-1">Chairman</p>
                <h3 className="text-xl font-black text-white leading-tight tracking-tight">
                  Prof. Akhilesh Mishra
                </h3>
                <p className="text-md text-blue-200 mt-1">National Institute of Open Schooling</p>
              </div>
            </div>

            {/* Quick Bio Card */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 space-y-5">
              <p className="text-[14px] font-extrabold uppercase tracking-widest text-blue-900">About the Chairman</p>
              <p className="text-md text-slate-500 leading-relaxed">
                Prof. Akhilesh Mishra assumed charge as Chairman, NIOS on <strong className="text-slate-700">July 22, 2025</strong>. He brings extensive academic and administrative expertise, with a mandate to enhance quality, accessibility and inclusion across NIOS's programmes nationwide.
              </p>
              <div className="space-y-2">
                {[
                  'NEP 2020 implementation at scale',
                  'Inclusive & multilingual education',
                  'Technology integration in ODL',
                  'Teacher training & capacity building',
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-blue-900 mt-0.5 shrink-0" />
                    <span className="text-md font-semibold text-slate-600">{pt}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:chairperson@nios.ac.in"
                className="flex items-center gap-2 text-md font-bold text-blue-900 hover:text-blue-700 transition-colors"
              >
                <Mail size={14} />
                chairperson@nios.ac.in
              </a>
            </div>
          </div>

          {/* Message Body */}
          <div className="lg:col-span-2 space-y-6">

            {/* Opening quote */}
            <div
              className="relative rounded-2xl p-8 lg:p-10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
              }}
            >
              <div className="absolute -top-8 -left-4 opacity-10">
                <Quote size={120} className="text-white" strokeWidth={1} />
              </div>
              <div className="relative z-10 space-y-3">
                <p className="text-[14px]  uppercase tracking-widest text-blue-300">
                  Dear Learners,
                </p>
                <blockquote className="text-xl lg:text-2xl font-black text-white leading-snug tracking-tight">
                  "Welcome to NIOS — an institution dedicated to empowering individuals through flexible, accessible, and quality education."
                </blockquote>
                <p className="text-md font-semibold text-blue-200">
                  - Prof. Akhilesh Mishra, Chairman
                </p>
              </div>
            </div>

            {/* Message paragraphs */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8 lg:p-10 space-y-5">
              {messageParagraphs.map((para, i) => (
                <p key={i} className="text-base font-medium text-slate-600 leading-relaxed">
                  {para.highlight
                    ? para.text.split(para.highlight).map((part, j, arr) =>
                        j < arr.length - 1 ? (
                          <span key={j}>
                            {part}
                            <strong className="text-slate-900 font-black">{para.highlight}</strong>
                          </span>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )
                    : para.text}
                </p>
              ))}

              {/* Signature */}
              <div
                className="pt-6 mt-4 space-y-1"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
              >
                <p className="text-md font-bold text-slate-700">Best wishes to each learner.</p>
                <p className="text-2xl font-black text-slate-900">Prof. Akhilesh Mishra</p>
                <p className="text-md font-semibold text-blue-900">Chairman</p>
                <p className="text-md text-slate-500">National Institute of Open Schooling</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Initiatives Banner ── */}
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-10 lg:p-16">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 85%, #3b82f6 0%, transparent 55%), radial-gradient(circle at 85% 15%, #1e3a8a 0%, transparent 55%)',
            }}
          />
          <div className="relative z-10 space-y-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-400 mb-3">
                  Key Initiatives
                </div>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Driving Change Through<br />
                  <span className="text-blue-400">Innovation & Inclusion.</span>
                </h2>
              </div>
              <p className="hidden lg:block text-md text-slate-400 max-w-sm text-right leading-relaxed">
                Six transformative programmes highlighted by the Chairman as central to NIOS's current mission.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {initiatives.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${item.accent} flex items-center justify-center shrink-0`}
                  >
                    <item.icon size={18} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-md font-black text-white">{item.title}</h4>
                    <p className="text-md font-medium text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Mission Cards (reprise from VisionMission style) ── */}
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
                Our Commitment
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                What NIOS Promises Every Learner
              </h2>
            </div>
            <p className="hidden lg:block text-base text-slate-400 max-w-xs text-right leading-relaxed">
              Four guiding principles that underpin the Chairman's vision for NIOS.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                val: '4M+',
                unit: 'Active Learners',
                desc: 'Cumulative enrolment over the last five years across India and abroad.',
                color: 'text-blue-900',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                icon: Users,
              },
              {
                val: '14',
                unit: 'Language Mediums',
                desc: 'Self-learning materials available in 14 mediums at the Secondary level.',
                color: 'text-emerald-700',
                bg: 'bg-emerald-50',
                border: 'border-emerald-100',
                icon: Globe2,
              },
              {
                val: '1000+',
                unit: 'Courses Offered',
                desc: 'Vocational, academic, skill-based and traditional knowledge programmes.',
                color: 'text-amber-700',
                bg: 'bg-amber-50',
                border: 'border-amber-100',
                icon: BookOpen,
              },
              {
                val: '7400+',
                unit: 'Study Centres',
                desc: 'Accredited study centres across India and in multiple countries worldwide.',
                color: 'text-purple-700',
                bg: 'bg-purple-50',
                border: 'border-purple-100',
                icon: GraduationCap,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`p-8 rounded-2xl ${item.bg} border ${item.border} space-y-3 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/50 blur-2xl" />
                <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <div>
                  <div className={`text-3xl font-black tracking-tighter ${item.color}`}>{item.val}</div>
                  <div className="text-[13px] font-black text-slate-700 uppercase tracking-widest mt-0.5">
                    {item.unit}
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA Strip ── */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-white/5" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-[14px] font-extrabold uppercase tracking-widest text-blue-300">
                Begin Your Journey
              </p>
              <h3 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                Explore NIOS Programmes<br />Designed for Every Learner.
              </h3>
              <p className="text-md font-medium text-blue-200 leading-relaxed max-w-md">
                Secondary, Senior Secondary, Vocational and Life Enrichment programmes - flexible, affordable and nationally recognised.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://sdmis.nios.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 text-sm font-black hover:bg-blue-50 transition-colors shadow-lg"
              >
                Apply for Admission <ArrowRight size={15} />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-black hover:bg-white/20 transition-colors"
              >
                Explore Programmes
              </a>
            </div>
          </div>
        </section>

      </div>

      <OfficialFooter />
    </div>
  );
}