'use client';

import {
   Target,
   MapPin,
   Globe,
   Award,
   Users,
   ExternalLink,
   ChevronRight,
   ShieldCheck,
   BookOpen,
   PieChart,
   Sparkles,
   GraduationCap,
   Building2,
   FileCheck,
   Lightbulb,
   Network,
   BadgeCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BrandingBanner from '@/components/BrandingBanner';
import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';

const stats = [
   {
      label: 'Cumulative Enrolment',
      value: '4.13M+',
      desc: "World's Largest Open School",
      color: 'text-blue-900',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
   },
   {
      label: 'Regional Centres',
      value: '23',
      desc: 'Across India & Abroad',
      color: 'text-blue-600',
      bg: 'bg-sky-50',
      border: 'border-sky-100',
   },
   {
      label: 'Study Centres',
      value: '7,400+',
      desc: 'Accredited Institutions (AIs/AVIs)',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
   },
   {
      label: 'Courses Offered',
      value: '100+',
      desc: 'Academic & Vocational',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
   },
];

const timeline = [
   {
      year: '1979',
      event: 'Open School project launched by CBSE with built-in flexibilities for learners',
      icon: '🌱',
   },
   {
      year: '1986',
      event: 'National Policy on Education recommends a full-fledged open school system with its own curriculum, examinations and certification',
      icon: '📜',
   },
   {
      year: '1989',
      event: 'Ministry of Education establishes National Open School (NOS) as an autonomous organisation under National Policy on Education 1986',
      icon: '🏛️',
   },
   {
      year: '1990',
      event: 'Government Gazette Notification vests NOS with authority to register, examine and certify students up to pre-degree level',
      icon: '📋',
   },
   {
      year: '2002',
      event: 'Ministry of Education renames NOS to National Institute of Open Schooling (NIOS), reflecting its expanding mission',
      icon: '🔖',
   },
   {
      year: '2020',
      event: 'NIOS aligns programmes with the National Education Policy (NEP) 2020 for holistic and flexible learning',
      icon: '🚀',
   },
   {
      year: '2026',
      event: 'AI-Native LMS Integration — Pioneering the next generation of open schooling in India',
      icon: '✨',
   },
];

const programmes = [
   {
      title: 'Open Basic Education (OBE)',
      desc: 'For learners aged 14+ at A, B and C levels equivalent to Classes III, V and VIII of formal schools.',
      icon: BookOpen,
      accent: 'bg-blue-900',
   },
   {
      title: 'Secondary & Sr. Secondary',
      desc: 'Flexible subject choice, self-paced learning, and credit transfer from CBSE and State Boards.',
      icon: GraduationCap,
      accent: 'bg-blue-600',
   },
   {
      title: 'Vocational Education',
      desc: 'Need-based vocational programmes for livelihood, entrepreneurship and lifelong learning.',
      icon: Lightbulb,
      accent: 'bg-emerald-600',
   },
   {
      title: 'D.El.Ed. Programme',
      desc: 'Teacher education for untrained elementary teachers as mandated by the RTE Act, 2009.',
      icon: Users,
      accent: 'bg-purple-600',
   },
   {
      title: 'Life Enrichment Courses',
      desc: 'Community-oriented and life enrichment programmes for personal and social development.',
      icon: Sparkles,
      accent: 'bg-rose-500',
   },
   {
      title: 'On-Demand Examination',
      desc: 'ODES system at Secondary & Sr. Secondary stage; learners get up to 9 chances over 5 years.',
      icon: FileCheck,
      accent: 'bg-amber-500',
   },
];

const objectives = [
   'Provide relevant, continuing and holistic education up to pre-degree level through Open & Distance Learning',
   'Contribute to the Universalisation of School Education across India',
   'Cater to the educational needs of prioritized target groups for equity and social justice',
   'Develop need-based vocational education for entrepreneurship and lifelong learning',
   'Promote open schooling at national and global level through networking and capacity building',
   'Strengthen Open & Distance Learning through Research & Development activities',
];

const learningStrategies = [
   'Printed Self-Instructional Material (SIM)',
   'Audio & Video Programmes',
   'Personal Contact Programme (PCP)',
   'Tutor Marked Assignments (TMA)',
   'Half-Yearly Magazine "Open Learning"',
   'Available in English, Hindi & Urdu',
];

export default function AboutPage() {
   return (
      <div className="min-h-screen bg-background text-foreground">
         <BrandingBanner />
         <OfficialNav />

         <div className="space-y-20 animate-fade-in pb-20 px-4 md:px-8 max-w-7xl mx-auto">

            {/* ── Vision & Mission Hero ── */}
            <section className="grid lg:grid-cols-2 gap-12 items-center pt-10">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[10px] font-black text-blue-900 uppercase tracking-[0.3em]">
                     <Target size={14} /> About NIOS
                  </div>

                  <h2 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
                     Education for <span className="text-blue-900 relative">
                        Everyone.
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-900/20 rounded-full" />
                     </span>
                  </h2>

                  <p className="text-lg font-medium text-slate-500 leading-relaxed max-w-xl">
                     The <strong className="text-slate-700">National Institute of Open Schooling (NIOS)</strong> is an autonomous organisation under the Ministry of Education, Government of India — established in November 1989 to make quality education accessible to every learner, regardless of age, location, or circumstance.
                  </p>

                  {/* Vision & Mission Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="p-7 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 text-blue-900">
                           <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                              <Sparkles size={14} />
                           </div>
                           <h4 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Vision</h4>
                        </div>
                        <p className="text-md text-slate-500 leading-relaxed">
                           Sustainable inclusive learning with universal and flexible access to quality school education and skill development.
                        </p>
                     </div>

                     <div className="p-7 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                              <Target size={14} className="text-blue-400" />
                           </div>
                           <h4 className="text-[14px] font-black uppercase tracking-widest text-white">Mission</h4>
                        </div>
                        <p className="text-md text-slate-400 leading-relaxed">
                           Providing relevant, continuing and holistic education up to pre-degree level through Open & Distance Learning — reaching the unreached.
                        </p>
                     </div>
                  </div>

                  {/* Headquarters badge */}
                  <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl w-fit">
                     <MapPin size={14} className="text-blue-900 shrink-0" />
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        HQ: A-24/25, Industrial Area, Sector-62, NOIDA, Uttar Pradesh — 201 309
                     </span>
                  </div>
               </div>

               {/* Right: key facts panel */}
               <div className="space-y-5">
                  {/* Main info card */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-950 to-red-800 text-white shadow-xl relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1e3a5f 0%, transparent 50%)' }} />
                     <div className="relative z-10 space-y-6">
                        <div className="text-[12px] font-black uppercase tracking-[0.35em] text-blue-300">At a Glance</div>
                        <div className="grid grid-cols-2 gap-5">
                           {[
                              { val: '1989', lbl: 'Year Founded' },
                              { val: 'NEP 2020', lbl: 'Policy Aligned' },
                              { val: 'ODL Mode', lbl: 'Delivery Mode' },
                              { val: '3 Languages', lbl: 'English · Hindi · Urdu' },
                           ].map((item, i) => (
                              <div key={i} className="p-4 rounded-xl bg-white/10 border border-white/10">
                                 <div className="text-lg font-black text-white tracking-tight">{item.val}</div>
                                 <div className="text-[12px] font-bold text-blue-200 uppercase tracking-widest mt-0.5">{item.lbl}</div>
                              </div>
                           ))}
                        </div>
                        <div className="pt-1 border-t border-white/10">
                           <div className="text-[20px] font-semibold text-blue-200 leading-relaxed">
                              Registered under the Societies' Registration Act (1860) · Headed by the Union Minister of Education
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Recognition badge */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <BadgeCheck size={22} className="text-blue-900" />
                     </div>
                     <div>
                        <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Recognised by</div>
                        <div className="text-md font-black text-slate-900">AIU · UGC · Ministry of Education</div>
                        <div className="text-[14px] font-medium text-slate-700 mt-0.5">Ministry of Labour & Employment</div>
                     </div>
                  </div>

                  {/* Examinations info */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                     <div className="flex items-center gap-2">
                        <FileCheck size={16} className="text-blue-900" />
                        <span className="text-[13px] font-black uppercase tracking-widest text-slate-700">Public Examinations</span>
                     </div>
                     <p className="text-[15px] font-semibold text-slate-500 leading-relaxed"> A learner is extended as many as nine chances to appear in public examinations spread over a period of five years.
                        The On-Demand Examination System (ODES) is in operation at Secondary and Senior Secondary stage.
                     </p>
                  </div>
               </div>
            </section>

            {/* ── Impact Stats ── */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
               {stats.map((s, i) => (
                  <motion.div
                     key={i}
                     whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                     className={`p-8 rounded-2xl ${s.bg} border ${s.border} text-center relative overflow-hidden`}
                  >
                     <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/40 blur-2xl" />
                     <div className={`text-4xl lg:text-5xl font-black mb-2 tracking-tighter ${s.color}`}>{s.value}</div>
                     <div className="text-[9px] font-black text-slate-800 uppercase tracking-widest mb-1">{s.label}</div>
                     <div className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest">{s.desc}</div>
                  </motion.div>
               ))}
            </section>

            {/* ── Profile / Background ── */}
            <section className="grid lg:grid-cols-5 gap-8">
               <div className="lg:col-span-3 p-10 lg:p-14 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-7">
                  <div>
                     <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">Our Profile</div>
                     <h3 className="text-3xl font-black text-slate-900 tracking-tight">A Legacy of Open Learning</h3>
                  </div>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">
                     NIOS is an <strong className="text-slate-700">"Open School"</strong> catering to a heterogeneous group of learners up to pre-degree level. Originally started as a CBSE project in 1979, it evolved into the National Open School (NOS) in 1989 under the National Policy on Education 1986, before being renamed NIOS in July 2002.
                  </p>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">
                     NIOS operates through a network of <strong className="text-slate-700">five Departments</strong>, <strong className="text-slate-700">23 Regional Centres</strong>, two Sub-Regional Centres, two NIOS Cells, and over <strong className="text-slate-700">7,400 Study Centres (AIs/AVIs)</strong> spread all over India and abroad — making it the <em>largest open schooling system in the world</em>.
                  </p>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">
                     Anybody irrespective of caste, creed and location can seek enrolment. NIOS collaborates with the <strong className="text-slate-700">Commonwealth of Learning (COL)</strong> and <strong className="text-slate-700">UNESCO</strong>, and maintains international study centres in Bahrain, UAE, Oman, Kuwait, Nepal, Canada, Saudi Arabia, Australia, UK, New Zealand, Malaysia, Singapore and the USA.
                  </p>
               </div>

               <div className="lg:col-span-2 space-y-5">
                  {/* Learning Strategies */}
                  <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl space-y-5 relative overflow-hidden">
                     <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                     <div>
                        <div className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-400 mb-2">Learning Strategies</div>
                        <h4 className="text-lg font-black leading-tight">How Students Learn with NIOS</h4>
                     </div>
                     <ul className="space-y-3">
                        {learningStrategies.map((s, i) => (
                           <li key={i} className="flex items-start gap-3 text-md font-semibold text-slate-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                              {s}
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Accreditation */}
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-3">
                     <div className="flex items-center gap-3">
                        <ShieldCheck size={22} className="text-emerald-600" />
                        <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Accreditation & Recognition</h4>
                     </div>
                     <p className="text-md    font-medium text-slate-500 leading-relaxed">
                        Autonomous institution under the Societies' Registration Act (1860). Senior Secondary Certificate recognized by AIU, UGC, multiple universities, and Ministries of Education & Labour.
                     </p>
                  </div>
               </div>
            </section>

            {/* ── Objectives ── */}
            <section className="p-10 lg:p-16 rounded-2xl bg-blue-900 text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: 'radial-gradient(circle at 10% 90%, white 0%, transparent 60%), radial-gradient(circle at 90% 10%, white 0%, transparent 60%)' }} />
               <div className="relative z-10">
                  <div className="max-w-5xl mx-auto space-y-10">
                     <div className="text-center">
                        <div className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-300 mb-3">Core Objectives</div>
                        <h2 className="text-3xl lg:text-4xl font-black tracking-tight">What NIOS Stands For</h2>
                     </div>
                     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {objectives.map((obj, i) => (
                           <motion.div
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              className="p-6 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm hover:bg-white/15 transition-all"
                           >
                              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-4 text-xs font-black text-white">
                                 {String(i + 1).padStart(2, '0')}
                              </div>
                              <p className="text-md font-semibold text-white/80 leading-relaxed">{obj}</p>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* ── Programmes ── */}
            <section className="space-y-8">
               <div className="flex items-end justify-between">
                  <div>
                     <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">Courses & Programmes</div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">What We Offer</h2>
                  </div>
                  <p className="hidden lg:block text-md font-medium text-slate-400 max-w-s text-right leading-relaxed">
                     Available in English, Hindi & Urdu mediums through open and distance learning mode.
                  </p>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {programmes.map((prog, i) => (
                     <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all group space-y-4"
                     >
                        <div className={`w-10 h-10 rounded-xl ${prog.accent} flex items-center justify-center shadow-sm`}>
                           <prog.icon size={18} className="text-white" />
                        </div>
                        <div>
                           <h4 className="text-base font-black text-slate-900 mb-2">{prog.title}</h4>
                           <p className="text-md font-medium text-slate-500 leading-relaxed">{prog.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* ── Heritage Timeline ── */}
            <section className="p-10 lg:p-16 rounded-2xl bg-slate-50 border border-slate-100">
               <div className="max-w-4xl mx-auto space-y-12">
                  <div className="text-center">
                     <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">Our Legacy</div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">Decades of Educational Innovation</h2>
                  </div>

                  <div className="space-y-0">
                     {timeline.map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           {/* Year */}
                           <div className="w-16 shrink-0 text-right pt-1">
                              <div className="text-base font-black text-slate-400 group-hover:text-blue-900 transition-colors">{item.year}</div>
                           </div>

                           {/* Spine */}
                           <div className="relative flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-900 relative z-10 mt-1.5 group-hover:bg-blue-900 transition-all shadow-md" />
                              {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-1 min-h-[2.5rem]" />}
                           </div>

                           {/* Content */}
                           <div className="pb-8 flex-1">
                              <div className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm group-hover:border-blue-100 group-hover:shadow-md transition-all flex items-start gap-4">
                                 <span className="text-xl">{item.icon}</span>
                                 <p className="text-base font-semibold text-slate-600 leading-relaxed">{item.event}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── Regional Outreach + Innovation Hub ── */}
            <section className="grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 p-10 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-10">
                  <div className="flex items-start justify-between">
                     <div>
                        <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-2">Network</div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Regional Outreach</h3>
                        <p className="text-md font-medium text-slate-400 mt-1">23 Regional Centres • 2 Sub-Regional Centres • International Presence</p>
                     </div>
                     <Globe className="text-blue-900 opacity-10 shrink-0" size={48} />
                  </div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                     {['North Zone', 'South Zone', 'East Zone', 'West Zone', 'North-East Zone', 'International'].map((zone) => (
                        <motion.div
                           key={zone}
                           whileHover={{ scale: 1.02 }}
                           className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group"
                        >
                           <MapPin size={14} className="text-blue-900 mb-3 group-hover:scale-110 transition-transform" />
                           <div className="text-[12px] font-black text-slate-700 uppercase tracking-widest">{zone}</div>
                        </motion.div>
                     ))}
                  </div>

                  {/* International centres */}
                  <div className="p-6 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
                     <div className="flex items-center gap-2 mb-3">
                        <Network size={14} className="text-blue-900" />
                        <span className="text-[12px] font-black text-blue-900 uppercase tracking-widest">International Study Centres</span>
                     </div>
                     <p className="text-md font-semibold text-slate-500 leading-relaxed">
                        Bahrain · UAE · Oman · Kuwait · Nepal · Canada · Saudi Arabia · Australia · United Kingdom · New Zealand · Malaysia · Singapore · United States
                     </p>
                  </div>
                  {/* 
                  <button className="w-full py-5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center justify-center gap-2">
                     Locate Your Regional Centre <ChevronRight size={14} />
                  </button> */}
               </div>

               <div className="space-y-6">
                  {/* Innovation */}
                  <div className="p-10 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white shadow-xl relative overflow-hidden">
                     <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                     <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                     <div className="relative z-10 space-y-5">
                        <Sparkles className="opacity-30" size={28} />
                        <div>
                           <div className="text-[12px] font-black uppercase tracking-widest text-blue-300 mb-3">Innovation Hub</div>
                           <h3 className="text-2xl font-black leading-tight">Pioneering AI-Integrated Learning in India.</h3>
                        </div>
                        <p className="text-sm text-blue-200 leading-relaxed uppercase tracking-widest">
                           Collaborating with COL & UNESCO to lead the digital transformation of open schooling.
                        </p>
                        <button className="px-6 py-3.5 bg-white text-blue-900 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-lg hover:bg-blue-50 transition-all">
                           Learn More
                        </button>
                     </div>
                  </div>

                  {/* NEP 2020 */}
                  <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                           <Award size={16} className="text-amber-500" />
                        </div>
                        <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-tight">NEP 2020 Aligned</h4>
                     </div>
                     <p className="text-md font-medium text-slate-500 leading-relaxed">
                        NIOS programmes are fully aligned with the National Education Policy 2020, ensuring holistic, flexible and inclusive education for all learners.
                     </p>
                  </div>
               </div>
            </section>

            {/* ── Documents & Portal Links ── */}
            <section className="space-y-6">
               <div className="text-center">
                  <div className="text-[15px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">Resources</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Official Documents & Portals</h2>
               </div>

               <div className="flex flex-wrap gap-4 justify-center">
                  {[
                     { label: "ISO Certificate", icon: BookOpen, click: '/ISO9001-2015.jpeg' },
                     { label: 'Official Gazette', icon: Award, click: '/gazettefornos.pdf' },
                     { label: 'Accreditation/E-Accreditation', icon: BadgeCheck, click: 'https://eaccr.nios.ac.in/' },
                  ].map((link, i) => (
                     <motion.a
                        key={i}
                        href={link.click}
                        target={link.click.startsWith('http') ? "_blank" : "_blank"}
                        rel={link.click.startsWith('http') ? "noopener noreferrer" : "noopener noreferrer"}
                        whileHover={{ scale: 1.02 }}
                        className="px-7 py-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex items-center gap-3 group cursor-pointer"
                     >
                        <link.icon size={16} className="text-blue-900 group-hover:scale-110 transition-normal" />
                        <span className="text-[12px] font-black text-slate-800 uppercase tracking-widest">{link.label}</span>
                        <ExternalLink size={10} className="text-slate-300" />
                     </motion.a>
                  ))}
               </div>
            </section>

         </div>
         <OfficialFooter />
      </div>
   );
}