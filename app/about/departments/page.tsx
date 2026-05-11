'use client';

import {
  Compass,
  BookOpen,
  Wrench,
  Users,
  ShieldCheck,
  ClipboardList,
  Tv2,
  MonitorDot,
  HeartHandshake,
  Package,
  GraduationCap,
  Lightbulb,
  ChevronRight,
  ExternalLink,
  Network,
  Building2,
  FlaskConical,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BrandingBanner from '@/components/BrandingBanner';
import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const coreDepartments = [
  {
    id: 'academic',
    icon: BookOpen,
    title: 'Academic Department',
    shortTitle: 'Academic',
    head: 'Director (Academic)',
    badge: 'Core Department',
    accent: 'bg-blue-900',
    light: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-900',
    href: './departments/academic',
    desc: 'The Academic Department is one of the two most important departments of NIOS. It oversees the entire school education continuum from primary to pre-degree level and is responsible for developing curricula, self-learning materials and research & development activities.',
    functions: [
      'Curriculum design for Secondary, Sr. Secondary & OBE levels',
      'Development and revision of Self-Learning Materials (SLMs)',
      'Research & Development in Open & Distance Learning',
      'Support in evaluation and assessment of learners',
      'Multilingual SLMs in 14 mediums at Secondary & 8 at Sr. Secondary level',
      'Media Unit & Capacity Building Cell function under this department',
    ],
    units: ['Open Basic Education (OBE)', 'Secondary Education', 'Senior Secondary Education', 'Media Unit / Telecast', 'Capacity Building Cell (CBC)'],
  },
  {
    id: 'vocational',
    icon: Wrench,
    title: 'Vocational Education Department',
    shortTitle: 'Vocational',
    head: 'Director (Vocational Education)',
    badge: 'Core Department',
    accent: 'bg-emerald-700',
    light: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
    href: '#vocational-education',
    desc: 'The Vocational Education Department develops and manages need-based vocational programmes to provide learners with job-ready skills. It covers both urban and rural sectors and collaborates with industry to align courses with market demands.',
    functions: [
      'Design and delivery of vocational education & training (VET) programmes',
      'Catering to the need for skilled and middle-level manpower',
      'Courses in Agriculture, IT, Health, Engineering, Commerce and more',
      'Practical examination guidelines for vocational learners',
      'New courses in Coding, AI and Data Science (introduced 2022)',
      'Collaboration with Accredited Vocational Institutions (AVIs)',
    ],
    units: ['Agriculture & Animal Husbandry', 'IT & Computer Courses', 'Health & Paramedical', 'Yoga Teacher Training', 'Community Health', 'Natya Kala & Arts'],
  },
  {
    id: 'sss',
    icon: Users,
    title: 'Student Support Services',
    shortTitle: 'SSS',
    head: 'Director (Student Support Services)',
    badge: 'Core Department',
    accent: 'bg-sky-600',
    light: 'bg-sky-50',
    border: 'border-sky-100',
    text: 'text-sky-700',
    href: '#student-support-services',
    desc: 'Under Open & Distance Learning, learner support is of paramount importance. The SSS Department provides end-to-end support to learners — from enrolment and accreditation of study centres to Tutor Marked Assignments and grievance redressal.',
    functions: [
      'Formulation of policy for student enrolment and registration',
      'Identification and accreditation of Study Centres (AIs/AVIs/AAs)',
      'Enrolment of Secondary & Senior Secondary learners',
      'Monitoring of Personal Contact Programmes (PCPs)',
      'Development of Tutor Marked Assignment (TMA) policy',
      'Coordination with Regional Centres for learner support',
      'Redressal of learner problems and grievances',
      'E-Accreditation system for online institution registration',
    ],
    units: ['Accreditation (AI/AVI/AA)', 'Personal Contact Programmes', 'TMA Administration', 'E-Accreditation Portal', 'Learner Grievance Cell'],
  },
  {
    id: 'evaluation',
    icon: ClipboardList,
    title: 'Evaluation Department',
    shortTitle: 'Evaluation',
    head: 'Director (Evaluation)',
    badge: 'Core Department',
    accent: 'bg-purple-700',
    light: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-700',
    href: '#evaluation',
    desc: 'The Evaluation Department is responsible for conducting public examinations, processing results and issuing certificates. It manages the On-Demand Examination System (ODES) and ensures fairness, transparency and rigour across all NIOS assessments.',
    functions: [
      'Conduct of public examinations twice yearly (Apr–May & Oct–Nov)',
      'Management of On-Demand Examination System (ODES)',
      'Processing, printing and dispatch of mark sheets and certificates',
      'Paper setting, moderation and evaluation of answer scripts',
      'Coordination with exam centres across India and abroad',
      'Handling of re-evaluation and grievance-related exam matters',
      'Migration certificates and document verification services',
    ],
    units: ['Public Examination Unit', 'On-Demand Examination (ODES)', 'Results Processing', 'Certificate Dispatch', 'Document Verification'],
  },
  {
    id: 'administration',
    icon: Building2,
    title: 'Administration Department',
    shortTitle: 'Administration',
    head: 'Secretary, NIOS',
    badge: 'Core Department',
    accent: 'bg-slate-700',
    light: 'bg-slate-50',
    border: 'border-slate-100',
    text: 'text-slate-700',
    href: '#administration',
    desc: 'Headed by the Secretary, NIOS, the Administration Department manages all institutional, HR, legal and compliance matters. It handles Parliament Questions, recruitment, transfers, financial delegation and the Rules & Regulations of NOSS.',
    functions: [
      'HR management — recruitment, seniority, promotions and transfers',
      'Institutional compliance and legal matters',
      'Handling of Parliament Questions and RTI requests',
      'Delegation of financial powers to officers of NIOS',
      'Implementation of NIOS Transfer Policy',
      'Maintenance of Memorandum of Association & Rules of NOSS',
      'General Rules of Recruitment & Promotion of staff (2024)',
    ],
    units: ['Establishment & HR', 'Finance & Accounts', 'Legal & Compliance', 'RTI Cell', 'Parliament Cell'],
  },
];

const supportUnits = [
  {
    icon: Tv2,
    title: 'Media Unit / Telecast',
    badge: 'Support Unit',
    accent: 'bg-amber-500',
    light: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    href: '#media-unit',
    desc: 'Produces audio and video educational programmes that are broadcast on national television and radio. These form a key part of NIOS\'s multi-channel delivery system for learners who cannot attend regular classes. Audio cassettes and VCDs are also available for purchase.',
  },
  {
    icon: MonitorDot,
    title: 'Computer Unit',
    badge: 'Support Unit',
    accent: 'bg-indigo-600',
    light: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-700',
    href: '#computer-unit',
    desc: 'Provides all ICT infrastructure, internet services, LAN, database management and student information systems. Manages the Student Information System (SIS) covering admission to certificate dispatch, all fully automated. Contains five internal units including the EDP and On-Demand Examination Unit.',
  },
  {
    icon: HeartHandshake,
    title: 'Minority Cell',
    badge: 'Support Unit',
    accent: 'bg-rose-500',
    light: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-700',
    href: '#minority-cell',
    desc: 'Focuses on outreach to minority communities across India to ensure they have equitable access to NIOS programmes. Works in tandem with the Ministry of Minority Affairs to implement targeted education schemes and enrolment drives.',
  },
  {
    icon: Package,
    title: 'Material Production, Dispatch & Distribution',
    badge: 'Support Unit',
    accent: 'bg-teal-600',
    light: 'bg-teal-50',
    border: 'border-teal-100',
    text: 'text-teal-700',
    href: '#material-production',
    desc: 'Manages procurement, printing, packaging and door-delivery of all Self-Learning Materials (SLMs) and promotional printed materials to learners across India. Also tracks the Study Material Distribution Information System (SMDIS) for timely dispatch.',
  },
  {
    icon: FlaskConical,
    title: 'Capacity Building Cell (CBC)',
    badge: 'Support Unit',
    accent: 'bg-cyan-700',
    light: 'bg-cyan-50',
    border: 'border-cyan-100',
    text: 'text-cyan-700',
    href: '/departments/capacity-building',
    desc: 'Responsible for training and professional development of NIOS staff and partner institutions. Works to strengthen the institutional capacity of State Open Schools and Accredited Institutions through workshops, orientation programmes and resource sharing.',
  },
  {
    icon: Network,
    title: 'Research & Development Cell',
    badge: 'Support Unit',
    accent: 'bg-violet-600',
    light: 'bg-violet-50',
    border: 'border-violet-100',
    text: 'text-violet-700',
    href: '#research-development',
    desc: 'Undertakes and facilitates research on Open and Distance Learning pedagogy, learner behaviour, curriculum quality and educational innovation. Collaborates with NCERT, IGNOU, UNESCO and Commonwealth of Learning (COL) on research initiatives.',
  },
];

const stats = [
  { val: '5', label: 'Core Departments', sub: 'Academic, Vocational, SSS, Evaluation & Administration' },
  { val: '6', label: 'Support Units', sub: 'Media, Computer, Minority Cell, M&D, CBC & R&D' },
  { val: '23', label: 'Regional Centres', sub: 'Including 2 sub-regional centres & 2 NIOS cells' },
  { val: '7,400+', label: 'Study Centres', sub: 'Accredited Institutions across India and abroad' },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandingBanner />
      <OfficialNav />

      <div className="space-y-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* ── Hero ── */}
        <section className="pt-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[12px] font-black text-blue-900 uppercase tracking-[0.3em]">
            <Compass size={13} /> About NIOS
          </div>
          <div className="grid lg:grid-cols-2 gap-4 items-end">
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
              Departments<br />
              <span className="text-blue-900">& Units.</span>
            </h1>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-7 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden space-y-2"
            >
              <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-blue-50 blur-2xl" />
              <p className="text-4xl font-black text-blue-900 tracking-tighter">{s.val}</p>
              <p className="text-md font-black text-slate-800 uppercase tracking-wide">{s.label}</p>
              <p className="text-[16px] text-slate-400 leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Intro Banner ── */}
        <section className="relative overflow-hidden rounded-2xl bg-blue-900 text-white p-10 lg:p-14">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="text-[14px] font-extrabold uppercase tracking-widest text-blue-300">
                Organisational Structure
              </div>
              <h2 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                How NIOS is Organised to Serve Every Learner.
              </h2>
              <p className="text-base font-medium text-blue-200 leading-relaxed">
                NIOS functions through five core departments - each headed by a Director and overseen by the Chairman and Executive Board. These are supported by six specialised units covering technology, media, materials, capacity building and outreach.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Chairman, NIOS', sub: 'Overall institutional leadership', icon: GraduationCap },
                { label: '5 Director-level Departments', sub: 'Academic · Vocational · SSS · Evaluation · Administration', icon: Building2 },
                { label: '6 Support Units & Cells', sub: 'Media · Computer · Minority Cell · M&D · CBC · R&D', icon: Network },
                { label: '23 Regional Centres', sub: 'Covering all states & UTs of India', icon: Lightbulb },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-blue-800/60 border border-blue-600/30 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-md font-black text-white">{item.label}</p>
                    <p className="text-[16px] text-blue-300 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Departments ── */}
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
                Core Departments
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                The Five Principal Departments
              </h2>
            </div>
            <p className="hidden lg:block text-base text-slate-400 max-w-sm text-right leading-relaxed">
              Each headed by a Director and responsible for a distinct pillar of NIOS's institutional mandate.
            </p>
          </div>

          <div className="space-y-5">
            {coreDepartments.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-2xl bg-white border ${dept.border} shadow-sm hover:shadow-lg transition-all overflow-hidden group`}
              >
                <div className="p-8 lg:p-10">
                  <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left: Title block */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-13 h-13 rounded-xl ${dept.accent} flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                          <dept.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <span className={`text-[14px] font-extrabold uppercase tracking-widest ${dept.text} block mb-1`}>
                            {dept.badge}
                          </span>
                          <h3 className="text-xl font-black text-slate-900 leading-snug">{dept.title}</h3>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${dept.light} border ${dept.border}`}>
                        <span className={`text-[12px] font-extrabold uppercase tracking-widest ${dept.text}`}>
                          Head: {dept.head}
                        </span>
                      </div>
                      <p className="text-md font-medium text-slate-500 leading-relaxed">{dept.desc}</p>
                      <a
                        href={dept.href}
                        className={`inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-widest ${dept.text} hover:underline underline-offset-4 transition-colors`}
                      >
                        View Department <ExternalLink size={11} />
                      </a>
                    </div>

                    {/* Middle: Functions */}
                    <div className="lg:col-span-1 space-y-3">
                      <p className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-3 hover:text-slate-900">
                        Key Functions
                      </p>
                      {dept.functions.map((fn, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <ChevronRight size={13} className={`${dept.text} mt-0.5 shrink-0`} />
                          <span className="text-md font-medium text-slate-600 leading-relaxed">{fn}</span>
                        </div>
                      ))}
                    </div>

                    {/* Right: Units */}
                    <div className="lg:col-span-1 space-y-3">
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-slate-900 mb-3">
                        Units / Sections
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {dept.units.map((unit, j) => (
                          <span
                            key={j}
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-extrabold uppercase tracking-wide ${dept.light} ${dept.text} border ${dept.border}`}
                          >
                            {unit}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className={`h-1 w-full ${dept.accent} opacity-60`} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Support Units ── */}
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
                Support Units & Cells
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Specialised Units & Cells
              </h2>
            </div>
            <p className="hidden lg:block text-base text-slate-400 max-w-sm text-right leading-relaxed">
              Six specialised units that support NIOS's core departments in technology, media, outreach and operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportUnits.map((unit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`p-8 rounded-2xl bg-white border ${unit.border} shadow-sm hover:shadow-lg transition-all group space-y-5`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${unit.accent} flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                    <unit.icon size={19} className="text-white" />
                  </div>
                  <div>
                    <span className={`text-[12px] font-black tracking-[0.2em] uppercase ${unit.text} block mb-0.5`}>
                      {unit.badge}
                    </span>
                    <h3 className="text-base font-black text-slate-900 leading-snug">{unit.title}</h3>
                  </div>
                </div>
                <p className="text-md font-medium text-slate-500 leading-relaxed">{unit.desc}</p>
                <a
                  href={unit.href}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest ${unit.text} hover:underline underline-offset-4 transition-colors`}
                >
                  Learn More <ExternalLink size={11} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Regional Network Banner ── */}
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-10 lg:p-16">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 85%, #3b82f6 0%, transparent 55%), radial-gradient(circle at 85% 15%, #1e3a8a 0%, transparent 55%)',
            }}
          />
          <div className="relative z-10 space-y-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-400 mb-3">
                  Regional Network
                </div>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  23 Regional Centres<br />
                  <span className="text-blue-400">Across India.</span>
                </h2>
              </div>
              <p className="hidden lg:block text-sm text-slate-400 max-w-xs text-right leading-relaxed">
                Each Regional Centre supports Accredited Institutions, monitors study centres and provides localised learner support.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'Allahabad', 'Bhopal', 'Chandigarh', 'Delhi', 'Guwahati', 'Hyderabad',
                'Jaipur', 'Kolkata', 'Kochi', 'Patna', 'Pune', 'Dehradun',
                'Bhubaneswar', 'Bengaluru', 'Gandhinagar', 'Raipur', 'Chennai', 'Ranchi',
                'Dharamshala', 'Visakhapatnam', 'Sikkim', 'Amethi', 'Mumbai',
              ].map((city, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all text-center cursor-default"
                >
                  <span className="text-[11px] font-bold text-slate-300">{city}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {[
                { val: '7,400+', label: 'Accredited Study Centres', sub: 'AIs, AVIs and AAs across India & abroad' },
                { val: '14+', label: 'Countries', sub: 'Study centres for Indian diaspora worldwide' },
                { val: '350,000+', label: 'New Enrolments / Year', sub: 'Annually across all programmes' },
              ].map((s, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/8 space-y-1">
                  <p className="text-2xl font-black text-white tracking-tighter">{s.val}</p>
                  <p className="text-xs font-black text-blue-300 uppercase tracking-widest">{s.label}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Links Table ── */}
        <section className="space-y-8">
          <div>
            <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
              Quick Access
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              All Departments at a Glance
            </h2>
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            {[
              { title: 'Academic Department', sub: 'Curriculum · SLMs · OBE · Research & Development', href: '/departments/academic', tag: 'Core' },
              { title: 'Vocational Education Department', sub: 'VET Programmes · Agriculture · IT · Health · Arts', href: '/departments/vocational-education', tag: 'Core' },
              { title: 'Student Support Services', sub: 'Enrolment · Accreditation · TMA · PCPs · Grievance', href: '/departments/student-support-services', tag: 'Core' },
              { title: 'Evaluation Department', sub: 'Public Exams · ODES · Results · Certificates', href: '/departments/evaluation', tag: 'Core' },
              { title: 'Administration Department', sub: 'HR · Finance · Legal · RTI · Parliament Questions', href: '/departments/administration', tag: 'Core' },
              { title: 'Media Unit / Telecast', sub: 'Audio-Visual Production · TV & Radio Broadcast', href: '/departments/media-unit', tag: 'Unit' },
              { title: 'Computer Unit', sub: 'ICT Infrastructure · Student Information System · EDP', href: '/departments/computer-unit', tag: 'Unit' },
              { title: 'Minority Cell', sub: 'Outreach · Minority Scholarships · Targeted Enrolment', href: '/departments/minority-cell', tag: 'Unit' },
              { title: 'Material Production, Dispatch & Distribution', sub: 'Printing · Packaging · Door Delivery of SLMs', href: '/departments/material-production', tag: 'Unit' },
              { title: 'Capacity Building Cell (CBC)', sub: 'Staff Training · State Open School Support · Workshops', href: '/departments/capacity-building', tag: 'Unit' },
              { title: 'Research & Development Cell', sub: 'ODL Research · Quality Improvement · International Collaboration', href: '/departments/research-development', tag: 'Unit' },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-6 px-8 py-4 border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md shrink-0 ${row.tag === 'Core'
                        ? 'bg-blue-50 text-blue-900 border border-blue-100'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                  >
                    {row.tag}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate">{row.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{row.sub}</p>
                  </div>
                </div>
                <a
                  href={row.href}
                  className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-blue-900 hover:text-blue-700 transition-colors shrink-0 group-hover:gap-2"
                >
                  <span className="hidden sm:inline">Visit</span>
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-white/5" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300">
                Connect with NIOS
              </p>
              <h3 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                Need help from a specific<br />department?
              </h3>
              <p className="text-sm font-medium text-blue-200 leading-relaxed max-w-md">
                Reach out to the relevant department directly, find your nearest Regional Centre or contact the Student Helpline for guidance on admissions, examinations and support services.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/contact/directory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 text-sm font-black hover:bg-blue-50 transition-colors shadow-lg"
              >
                Staff Directory <ChevronRight size={15} />
              </a>
              <a
                href="/contact/regional-centres"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-black hover:bg-white/20 transition-colors"
              >
                Regional Centres
              </a>
            </div>
          </div>
        </section>

      </div>

      <OfficialFooter />
    </div>
  );
}