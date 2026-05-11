'use client';

import {
  Compass,
  BookOpen,
  GraduationCap,
  Users,
  Layers,
  Globe2,
  PenTool,
  Library,
  LayoutGrid,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BrandingBanner from '@/components/BrandingBanner';
import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';

/* ─── Unit Data ─── */
const coreUnits = [
  {
    icon: BookOpen,
    title: 'Open Basic Education (OBE)',
    shortName: 'OBE',
    desc: 'Provides foundational education equivalent to primary and middle school level. Initiated in 1994, OBE targets adult neo-literates and school drop-outs aged 14 and above who could not access the formal education system. NIOS partners with approximately 853 agencies for implementation.',
    accent: 'bg-blue-900',
    light: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-900',
    badge: 'Foundational Level',
    docHref: '#',
    docLabel: 'View OBE Details',
  },
  {
    icon: GraduationCap,
    title: 'Secondary & Senior Secondary Education',
    shortName: 'Sec & Sr. Sec',
    desc: 'Offers Secondary (Class X equivalent) and Senior Secondary (Class XII equivalent) courses with flexibility in subject choice, pace of learning, and transfer of credits from CBSE and State Boards. Study Material is available in English, Hindi, and Urdu mediums.',
    accent: 'bg-sky-600',
    light: 'bg-sky-50',
    border: 'border-sky-100',
    text: 'text-sky-700',
    badge: 'School Education',
    docHref: '#',
    docLabel: 'View Courses',
  },
  {
    icon: Users,
    title: 'Capacity Building Cell (CBC)',
    shortName: 'CBC',
    desc: 'Strengthens the capacity of Open and Distance Learning (ODL) functionaries through training packages and orientation programmes. Develops training resources to improve the quality of delivery and learner support across Regional Centres and Accredited Institutions.',
    accent: 'bg-emerald-600',
    light: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
    badge: 'Capacity Development',
    docHref: '#',
    docLabel: 'View Cell Details',
  },
  {
    icon: Globe2,
    title: 'NCOS & COMOSA Secretariat',
    shortName: 'NCOS / COMOSA',
    desc: 'Serves as the Secretariat for the National Consortium of Open Schooling (NCOS) and Commonwealth Open Schooling Association (COMOSA). Promotes open schooling at national and global levels through networking, capacity building, and sharing of resources and quality assurance.',
    accent: 'bg-purple-600',
    light: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-700',
    badge: 'International Outreach',
    docHref: '#',
    docLabel: 'View Secretariat Info',
  },
];

const supportUnits = [
  {
    icon: PenTool,
    title: 'Graphic Unit',
    shortName: 'Graphic Unit',
    desc: 'Handles design, layout and production of self-learning materials, publications and promotional content for the Academic Department and NIOS at large.',
    accent: 'bg-amber-500',
    light: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    badge: 'Support Unit',
    docHref: '#',
    docLabel: 'View Unit Details',
  },
  {
    icon: Library,
    title: 'Library & Documentation Services',
    shortName: 'Library',
    desc: 'Maintains a comprehensive collection of academic resources, research publications and open learning materials. Supports research and development activities undertaken by the Academic Department.',
    accent: 'bg-rose-500',
    light: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-700',
    badge: 'Support Unit',
    docHref: '#',
    docLabel: 'View Library Info',
  },
  {
    icon: LayoutGrid,
    title: 'Academic Departmental Advisory Board',
    shortName: 'DAB',
    desc: 'Advises the Academic Department on curriculum direction, material development and academic quality. Ensures the department remains aligned with national education policy and the needs of learners.',
    accent: 'bg-teal-600',
    light: 'bg-teal-50',
    border: 'border-teal-100',
    text: 'text-teal-700',
    badge: 'Advisory',
    docHref: '#',
    docLabel: 'View Board Details',
  },
  {
    icon: BookOpen,
    title: 'Academic Council',
    shortName: 'Academic Council',
    desc: 'The principal academic body that recommends programmes, approves curriculum and regulates examinations. Minutes of the 11th, 18th and 19th Meetings of the Academic Council are available for reference.',
    accent: 'bg-indigo-600',
    light: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-700',
    badge: 'Governing Body',
    docHref: '#',
    docLabel: 'View Meeting Minutes',
  },
];

const keyFunctions = [
  {
    icon: FileText,
    title: 'Curriculum Development',
    desc: 'Develops need-based curricula and self-learning materials for OBE, Secondary, Senior Secondary and Vocational Education programmes with a focus on skill development.',
    docHref: '#',
    docLabel: 'View Curriculum',
  },
  {
    icon: Info,
    title: 'Material Revision & R&D',
    desc: 'Undertakes periodic revision of learning materials and research & development activities to maintain quality and relevance in open and distance learning delivery.',
    docHref: '#',
    docLabel: 'View R&D Cell',
  },
  {
    icon: GraduationCap,
    title: 'Learner Evaluation Support',
    desc: 'Provides academic support in the area of evaluation of learners, including Tutor Marked Assignments (TMA) and the On-Demand Examination System (ODES) at Secondary and Senior Secondary stage.',
    docHref: '#',
    docLabel: 'View Evaluation Details',
  },
];

/* ─── Stat Strip ─── */
const stats = [
  { val: '4', label: 'Core Academic Units', sub: 'OBE, Secondary & Sr. Secondary, CBC, NCOS/COMOSA' },
  { val: '4', label: 'Support Units', sub: 'Graphic, Library, Advisory Board & Academic Council' },
  { val: '28', label: 'Subjects Offered', sub: 'Across Secondary & Senior Secondary in multiple mediums' },
  { val: '853+', label: 'Partner Agencies', sub: 'Implementing OBE programme across India' },
];

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <BrandingBanner />
        <OfficialNav />

      <div className="space-y-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* ── Page Hero ── */}
        <section className="pt-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[12px] font-black text-blue-900 uppercase tracking-[0.3em]">
            <Compass size={13} /> Departments / Units
          </div>
          <div className="grid lg:grid-cols-2 gap-4 items-end">
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
              Academic<br />
              <span className="text-blue-900">Department.</span>
            </h1>
          </div>
          <p className="text-lg text-slate-500 max-w-3xl leading-relaxed">
            The Academic Department and the Vocational Education Department can be said to be the two most important departments of NIOS. Together they develop education programmes and courses to give learners the opportunity to pursue the course of learning of their choice, collaborating to develop functional and need-based courses.
          </p>
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
              <p className="text-sm font-black text-slate-800 uppercase tracking-wide">{s.label}</p>
              <p className="text-md text-slate-400 leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Core Academic Units ── */}
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
                Tier I
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Core Academic Units
              </h2>
            </div>
            <p className="hidden lg:block text-base text-slate-400 max-w-sm text-right leading-relaxed">
              The primary units through which the Academic Department delivers its education programmes across India and abroad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {coreUnits.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={`p-8 rounded-2xl bg-white border ${c.border} shadow-sm hover:shadow-lg transition-all group space-y-5`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl ${c.accent} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                      <c.icon size={19} className="text-white" />
                    </div>
                    <div>
                      <span className={`text-[12px] font-extrabold uppercase tracking-widest ${c.text} block mb-0.5`}>
                        {c.badge}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 leading-tight">{c.title}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-md font-medium text-slate-500 leading-relaxed">{c.desc}</p>
                <a
                  href={c.docHref}
                  className={`inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest ${c.text} hover:underline underline-offset-4 transition-colors`}
                >
                  <Download size={12} />
                  {c.docLabel}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Support Units ── */}
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
                Tier II
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Support & Advisory Units
              </h2>
            </div>
            <p className="hidden lg:block text-base text-slate-400 max-w-md text-right leading-relaxed">
              Specialised units that support curriculum design, documentation, advisory functions and academic governance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {supportUnits.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`p-7 rounded-2xl ${c.light} border ${c.border} space-y-4 relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/50 blur-2xl" />
                <div className={`w-10 h-10 rounded-xl ${c.accent} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                  <c.icon size={18} className="text-white" />
                </div>
                <div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest ${c.text} block mb-1`}>
                    {c.badge}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">{c.title}</h3>
                </div>
                <p className="text-[16px] font-medium text-slate-500 leading-relaxed">{c.desc}</p>
                <div className="space-y-1">
                  <a
                    href={c.docHref}
                    className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest ${c.text} hover:underline underline-offset-4`}
                  >
                    <Download size={11} />
                    {c.docLabel}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Key Functions Dark Banner ── */}
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
                  Tier III
                </div>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Key Departmental<br />
                  <span className="text-blue-400">Functions.</span>
                </h2>
              </div>
              <p className="hidden lg:block text-md text-slate-300 max-w-xs text-right leading-relaxed">
                Core academic activities that define the purpose and output of the Academic Department.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {keyFunctions.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col gap-4 p-6 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-700/40 flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-blue-300" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-lg font-black text-white leading-snug">{c.title}</h4>
                    <p className="text-md font-medium text-slate-300 leading-relaxed">{c.desc}</p>
                  </div>
                  <a
                    href={c.docHref}
                    className="inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink size={11} />
                    {c.docLabel}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Academic Council Minutes & Documents ── */}
        <section className="space-y-8">
          <div>
            <div className="text-[14px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
              Records & Minutes
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Academic Council Minutes & Official Documents
            </h2>
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            {[
              { title: 'Minutes of 19th Meeting of the Academic Council', desc: 'Official record of the 19th Academic Council meeting — decisions on programmes, curriculum approvals and examination regulations.', href: '#' },
              { title: 'Minutes of 18th Meeting of the Academic Council', desc: 'Record of the 18th Academic Council sitting covering academic quality, course revisions and learner support recommendations.', href: '#' },
              { title: 'Minutes of 11th Meeting of the Academic Council', desc: 'Early reference minutes from the 11th Academic Council meeting, covering foundational academic policy decisions of NIOS.', href: '#' },
              { title: 'Office Order 117/2020 — Media Unit & CBC under Academic Dept.', desc: 'Office Order dated 26.06.2020 regarding the Media Unit and Capacity Building Cell functioning under the Academic Department.', href: '#' },
              { title: 'OBE Study Centre Address Book', desc: 'Directory of OBE Study Centres across India for Academic (Secondary & Sr. Secondary), Vocational and Open Basic Education programmes.', href: '#' },
              { title: 'Secondary & Senior Secondary Course Details', desc: 'Full listing of subjects offered at Secondary and Senior Secondary levels including language groups and elective subjects.', href: '#' },
            ].map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-6 px-8 py-5 border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={14} className="text-blue-900" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-md font-black text-slate-900 truncate">{doc.title}</p>
                    <p className="text-md font-medium text-slate-400 mt-0.5 leading-relaxed line-clamp-2">{doc.desc}</p>
                  </div>
                </div>
                <a
                  href={doc.href}
                  className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-blue-900 hover:text-blue-700 transition-colors shrink-0 group-hover:gap-2"
                >
                  <Download size={12} />
                  <span className="hidden sm:inline">Download</span>
                  <ChevronRight size={12} className="sm:hidden" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── About Academic Dept Note ── */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-white/5" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-[14px] font-bold uppercase tracking-widest text-blue-300">
                Academic Programmes & Delivery
              </p>
              <h3 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                The Academic Department covers the entire school education continuum from primary to pre-degree level.
              </h3>
              <p className="text-lg font-medium text-blue-200 leading-relaxed">
                The department is engaged in development of curriculum and self-learning materials, revision of learning materials, research and development activities, and provides support in the area of evaluation of learners. Study Material is available in English, Hindi and Urdu mediums.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Online Course Material', sub: 'Access self-learning materials for all subjects', href: '#' },
                { label: 'Study Centre Corner', sub: 'Resources and information for AI/AVI/OBE centres', href: '#' },
                { label: 'Ask Your Teacher', sub: 'Learner support via NIOS\'s teacher helpdesk', href: '#' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition-all group"
                >
                  <div>
                    <p className="text-md font-black text-white">{item.label}</p>
                    <p className="text-[16px] text-blue-200 mt-0.5">{item.sub}</p>
                  </div>
                  <ChevronRight size={16} className="text-blue-300 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
      <OfficialFooter />
    </div>
  );
}