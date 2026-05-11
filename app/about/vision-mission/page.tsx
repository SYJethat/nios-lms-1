'use client';

import {
   Target,
   Eye,
   Compass,
   BookOpen,
   Users,
   Globe,
   GraduationCap,
   Lightbulb,
   TrendingUp,
   HeartHandshake,
   FlaskConical,
   Network,
   ArrowRight,
   CheckCircle2,
   Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BrandingBanner from '@/components/BrandingBanner';
import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';

const missionPoints = [
   {
      icon: BookOpen,
      title: 'Holistic Education',
      desc: 'Provide relevant, continuing and holistic education up to pre-degree level through Open & Distance Learning (ODL) mode.',
      accent: 'bg-blue-900',
      light: 'bg-blue-50',
      text: 'text-blue-900',
   },
   {
      icon: Globe,
      title: 'Universalisation',
      desc: 'Contribute to the Universalisation of School Education, ensuring every citizen has access to quality schooling.',
      accent: 'bg-sky-600',
      light: 'bg-sky-50',
      text: 'text-sky-700',
   },
   {
      icon: HeartHandshake,
      title: 'Equity & Social Justice',
      desc: 'Cater to the educational needs of prioritized target groups - rural youth, urban poor, girls & women, SC/ST, minorities, and differently-abled.',
      accent: 'bg-emerald-600',
      light: 'bg-emerald-50',
      text: 'text-emerald-700',
   },
   {
      icon: Lightbulb,
      title: 'Vocational & Lifelong Learning',
      desc: 'Develop need-based vocational education programmes for livelihood, entrepreneurship and lifelong learning up to pre-degree level.',
      accent: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-700',
   },
   {
      icon: FlaskConical,
      title: 'Research & Development',
      desc: 'Strengthen Open & Distance Learning through sustained Research & Development activities and continuous quality improvement.',
      accent: 'bg-purple-600',
      light: 'bg-purple-50',
      text: 'text-purple-700',
   },
   {
      icon: Network,
      title: 'Global Networking',
      desc: 'Promote open schooling at national and global level through networking, capacity building, sharing of resources and quality assurance.',
      accent: 'bg-rose-500',
      light: 'bg-rose-50',
      text: 'text-rose-700',
   },
];

const qualityCommitments = [
   'Excellent, Sustainable, Inclusive and Flexible Education up to Pre-Degree level',
   'Compliance of requirements to ensure satisfaction of Learners',
   'Continual improvement of our Quality Management System',
   'Professional advice to Government of India and State Governments on ODL development',
   'Accreditation of institutions for effective learner support systems',
   'Evolution of a learning-oriented society across India',
];

const targetGroups = [
   { label: 'School Dropouts', icon: '📚' },
   { label: 'Rural Youth', icon: '🌾' },
   { label: 'Urban Poor', icon: '🏙️' },
   { label: 'Girls & Women', icon: '👩‍🎓' },
   { label: 'SC / ST Communities', icon: '🤝' },
   { label: 'Persons with Disabilities', icon: '♿' },
   { label: 'Minorities', icon: '🌍' },
   { label: 'Ex-Servicemen', icon: '🎖️' },
];

export default function VisionMissionPage() {
   return (
      <div className="min-h-screen bg-background text-foreground">
         <BrandingBanner />
         <OfficialNav />

         <div className="space-y-20 animate-fade-in pb-20 px-4 md:px-8 max-w-7xl mx-auto">

            {/* ── Page Hero ── */}
            <section className="pt-10 space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[12px] font-black text-blue-900 uppercase tracking-[0.3em]">
                  <Compass size={13} /> Vision & Mission
               </div>
               <div className="grid lg:grid-cols-2 gap-4 items-end">
                  <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
                     Our Purpose &<br />
                     <span className="text-blue-900">Direction.</span>
                  </h1>
               </div>
            </section>

            {/* ── Vision & Mission Split ── */}
            <section className="grid lg:grid-cols-2 gap-6">

               {/* Vision */}
               <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="relative overflow-hidden rounded-2xl bg-blue-900 text-white p-10 lg:p-14 shadow-2xl"
               >
                  {/* Background decoration */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent" />

                  <div className="relative z-10 space-y-5 h-full flex flex-col">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                           <Eye size={22} className="text-blue-200" />
                        </div>
                        <div>
                           <div className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-300">Our</div>
                           <h2 className="text-2xl font-black tracking-tight">Vision</h2>
                        </div>
                     </div>

                     <blockquote className="text-2xl lg:text-3xl font-black leading-snug tracking-tight text-white">
                        "Sustainable inclusive learning with universal and flexible access to quality school education and skill development."
                     </blockquote>

                     <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
                        {[
                           'Universal access regardless of age or location',
                           'Flexible pathways for every type of learner',
                           'Skill development alongside academic education',
                        ].map((pt, i) => (
                           <div key={i} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2 shrink-0" />
                              <span className="text-lg font-medium text-blue-100">{pt}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>

               {/* Mission */}
               <motion.div
                  whileHover={{ y: -4 }} >
                  <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-10 lg:p-14 space-y-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                           <Target size={22} className="text-blue-900" />
                        </div>
                        <div>
                           <div className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">Our</div>
                           <h2 className="text-2xl font-black tracking-tight text-slate-900">Mission</h2>
                        </div>
                     </div>


                     <div className="space-y-3">
                        {[
                           'Contributing to the universalisation of school education',
                           'Catering to prioritized target groups for equity and social justice',
                           'Developing need-based academic and vocational programmes',
                           'Ensuring continual improvement of our quality management system',
                        ].map((pt, i) => (
                           <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors group">
                              <CheckCircle2 size={16} className="text-blue-900 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                              <span className="text-md font-semibold text-slate-600 leading-relaxed">{pt}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            </section>

            {/* ── Quality Policy Banner ── */}
            <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-10 lg:p-16">
               <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: 'radial-gradient(circle at 15% 85%, #3b82f6 0%, transparent 55%), radial-gradient(circle at 85% 15%, #1e3a8a 0%, transparent 55%)' }} />
               <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                     <div>
                        <div className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-400 mb-3">Quality Policy</div>
                        <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                           Our Commitment to<br />
                           <span className="text-blue-400">Excellence.</span>
                        </h2>
                     </div>
                     <p className="text-[19px]  text-slate-400 leading-relaxed">
                        We at NIOS are committed to providing excellent, sustainable, inclusive and flexible education up to pre-degree level; continuously improving our systems in response to learner needs.
                     </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                     {qualityCommitments.map((item, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, x: 20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.07 }}
                           className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all"
                        >
                           <div className="w-6 h-6 rounded-lg bg-blue-900/60 border border-blue-700/40 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[9px] font-black text-blue-300">{String(i + 1).padStart(2, '0')}</span>
                           </div>
                           <span className="text-sm font-semibold text-slate-300 leading-relaxed">{item}</span>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── Mission Points Grid ── */}
            <section className="space-y-8">
               <div className="flex items-end justify-between gap-6">
                  <div>
                     <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">Core Mission Areas</div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">How We Serve Every Learner</h2>
                  </div>
                  <p className="hidden lg:block text-md  text-slate-400 max-w-md text-right leading-relaxed">
                     Six pillars that define how NIOS fulfils its national mandate.
                  </p>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {missionPoints.map((pt, i) => (
                     <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all group space-y-5"
                     >
                        <div className="flex items-center gap-4">
                           <div className={`w-11 h-11 rounded-xl ${pt.accent} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                              <pt.icon size={19} className="text-white" />
                           </div>
                           <h4 className="text-lg font-black text-slate-900">{pt.title}</h4>
                        </div>
                        <p className="text-md font-medium text-slate-500 leading-relaxed">{pt.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* ── Target Groups ── */}
            <section className="grid lg:grid-cols-3 gap-6">
               <div className="lg:col-span-1 p-10 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white shadow-xl relative overflow-hidden flex flex-col justify-between gap-8">
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
                  <div className="relative z-10 space-y-4">
                     <Sparkles size={26} className="opacity-40" />
                     <div>
                        <div className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-300 mb-3">Who We Reach</div>
                        <h3 className="text-2xl font-black leading-tight">Prioritized Target Groups</h3>
                     </div>
                     <p className="text-[18px] font-medium text-blue-200 leading-relaxed">
                        NIOS identifies and reaches out to marginalized communities to universalize secondary education across India.
                     </p>
                  </div>
                  <div className="relative z-10 p-5 rounded-xl bg-white/10 border border-white/10">
                     <div className="text-3xl font-black text-white tracking-tighter">350,000+</div>
                     <div className="text-[12px] font-black uppercase tracking-widest text-blue-300 mt-1">New Learners Enrolled Annually</div>
                  </div>
               </div>

               <div className="lg:col-span-2 p-10 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-7">
                  <div>
                     <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-2">Inclusive by Design</div>
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight">Education for the Unreached</h3>
                  </div>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">
                     Anybody irrespective of <strong className="text-slate-700">caste, creed or location</strong> can seek enrolment in NIOS courses. The institution specially focuses on those who cannot access conventional schooling.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                     {targetGroups.map((group, i) => (
                        <motion.div
                           key={i}
                           whileHover={{ scale: 1.04 }}
                           transition={{ type: 'spring', stiffness: 350 }}
                           className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all text-center space-y-2 cursor-default"
                        >
                           <div className="text-2xl">{group.icon}</div>
                           <div className="text-[12px] font-black text-slate-700 uppercase tracking-wide leading-tight">{group.label}</div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── ODL Approach ── */}
            <section className="p-10 lg:p-16 rounded-2xl bg-slate-50 border border-slate-100 space-y-10">
               <div className="text-center space-y-3">
                  <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em]">Open & Distance Learning</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">The ODL Advantage</h2>
                  <p className="text-base font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
                     The ODL mode removes traditional barriers to education - no fixed timetables, no mandatory daily attendance, and full flexibility to learn at one's own pace and place.
                  </p>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                     { val: '9', unit: 'Exam Chances', desc: 'Spread over 5 years - credits accumulate until certification', icon: GraduationCap, color: 'text-blue-900', bg: 'bg-blue-50', border: 'border-blue-100' },
                     { val: '3', unit: 'Medium Options', desc: 'Study Material available in English, Hindi and Urdu', icon: BookOpen, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                     { val: '2×', unit: 'Yearly Exams', desc: 'Public exams held in April-May and October-November', icon: TrendingUp, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-100' },
                     { val: 'ODL', unit: 'Mode of Study', desc: 'Self-instructional material, PCPs, TMAs, audio-video content', icon: Lightbulb, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' },
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
                           <div className="text-[16px] font-black text-slate-700 uppercase tracking-widest mt-0.5">{item.unit}</div>
                        </div>
                        <p className="text-md font-semibold text-slate-500 leading-relaxed">{item.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </section>

         </div>
         <OfficialFooter />
      </div>
   );
}