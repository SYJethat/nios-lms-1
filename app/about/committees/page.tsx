'use client';

import {
  Compass,
  Users,
  BookOpen,
  BarChart3,
  Building2,
  ShieldCheck,
  Megaphone,
  Gavel,
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

/* ─── Committee Data ─── */
const governingCommittees = [
  {
    icon: Gavel,
    title: 'General Body of NOS',
    shortName: 'General Body',
    desc: 'The supreme governing authority of the National Open School Society (NOS). It sets overall policy direction, approves budgets, and oversees the functioning of NIOS at the highest level.',
    accent: 'bg-blue-900',
    light: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-900',
    badge: 'Supreme Authority',
    docHref: '/generalbody_nos.pdf',
    docLabel: 'View Members ',
  },
  {
    icon: Users,
    title: 'Executive Board of NOS',
    shortName: 'Executive Board',
    desc: 'Responsible for the executive management of NIOS. The Board oversees day-to-day governance, ratifies key administrative decisions, and ensures institutional compliance with the Ministry of Education.',
    accent: 'bg-sky-600',
    light: 'bg-sky-50',
    border: 'border-sky-100',
    text: 'text-sky-700',
    badge: 'Governing Board',
    docHref: '/executiveboard_nos.pdf',
    docLabel: 'View Members',
  },
  {
    icon: BarChart3,
    title: 'Finance Committee of NOS',
    shortName: 'Finance Committee',
    desc: 'Scrutinises and recommends annual budgets, financial statements and expenditure proposals before they are placed before the Executive Board for approval. Ensures fiscal accountability and transparency.',
    accent: 'bg-emerald-600',
    light: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
    badge: 'Financial Oversight',
    docHref: '#',
    docLabel: 'View Members',
  },
  {
    icon: BookOpen,
    title: 'Academic Council of NOS',
    shortName: 'Academic Council',
    desc: 'The principal academic body of NIOS. It recommends academic programmes, approves course curriculum, regulates examinations, and ensures the quality and relevance of all learning content offered by the institution.',
    accent: 'bg-purple-600',
    light: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-700',
    badge: 'Academic Authority',
    docHref: '#',
    docLabel: 'View Members ',
  },
];

const advisoryCommittees = [
  {
    icon: Megaphone,
    title: 'Media Advisory Committee',
    shortName: 'Media Advisory',
    desc: 'Advises NIOS on media strategy, broadcast content, and the development of audio-visual learning materials. Guides Mukta Vidya Vani and other media-based outreach programmes.',
    accent: 'bg-amber-500',
    light: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    badge: 'Advisory',
    docHref: '#',
    docLabel: 'View Members ',
    note: 'Updated 08.11.2018',
  },
  {
    icon: ShieldCheck,
    title: 'Accreditation Advisory Committee',
    shortName: 'AAC',
    desc: 'Oversees the accreditation of Study Centres (AIs/AVIs/AAs) across India. Sets standards for infrastructure, faculty, and learner support, and reviews compliance by accredited institutions.',
    accent: 'bg-rose-500',
    light: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-700',
    badge: 'Advisory',
    docHref: '#',
    docLabel: 'View Notification ',
    note: 'Reconstituted Nov 2022',
  },
  {
    icon: FileText,
    title: 'Evaluation Committee',
    shortName: 'Evaluation',
    desc: 'Responsible for framing the examination and evaluation framework of NIOS. Ensures fair, transparent and rigorous assessment across Secondary, Senior Secondary and Vocational programmes.',
    accent: 'bg-teal-600',
    light: 'bg-teal-50',
    border: 'border-teal-100',
    text: 'text-teal-700',
    badge: 'Functional',
    docHref: '#',
    docLabel: 'View Constitution ',
  },
  {
    icon: Building2,
    title: 'Building & Works Committee',
    shortName: 'B&W Committee',
    desc: 'Manages construction, renovation, and maintenance of NIOS infrastructure — including its Headquarters in Noida, Regional Centres, and Guest Houses across India.',
    accent: 'bg-indigo-600',
    light: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-700',
    badge: 'Infrastructure',
    docHref: '#',
    docLabel: 'View Committee Details',
  },
];

const specialCommittees = [
  {
    icon: Users,
    title: 'Departmental Advisory Committee',
    desc: 'Advises individual departments of NIOS on academic, administrative and operational matters to improve departmental performance and alignment with institutional goals.',
    docHref: '#',
    docLabel: 'View Details',
    note: null,
  },
  {
    icon: ShieldCheck,
    title: 'Gender Sensitization & Internal Complaints Committee',
    desc: 'Constituted under the Sexual Harassment of Women at Workplace Act, 2013. Ensures a safe, respectful and inclusive work environment for all NIOS employees.',
    docHref: '#',
    docLabel: 'View Notification (42/2021)',
    note: 'Notification dated Nov 2021',
  },
  {
    icon: Info,
    title: 'Sexual Harassment Prevention Committee',
    desc: 'Implements the provisions of the POSH Act, 2013. Handles complaints, conducts inquiries, and recommends action to prevent and redress cases of sexual harassment at the workplace.',
    docHref: '#',
    docLabel: 'View Notification (25/2018)',
    note: 'Notification dt. 26.09.2018',
  },
];

/* ─── Stat Strip ─── */
const stats = [
  { val: '4', label: 'Governing Bodies', sub: 'General Body, Executive Board, Finance & Academic Council' },
  { val: '4', label: 'Advisory Committees', sub: 'Media, Accreditation, Evaluation & Building Works' },
  { val: '3', label: 'Special Committees', sub: 'Departmental, Gender Sensitization & POSH' },
  { val: '11', label: 'Total Committees', sub: 'Ensuring transparent institutional governance' },
];

export default function CommitteesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandingBanner />
      <OfficialNav />

      <div className="space-y-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* ── Page Hero ── */}
        <section className="pt-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[12px] font-black text-blue-900 uppercase tracking-[0.3em]">
            <Compass size={13} /> About NIOS
          </div>
          <div className="grid lg:grid-cols-2 gap-4 items-end">
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
              Committees &<br />
              <span className="text-blue-900">Governing Bodies.</span>
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
              <p className="text-sm font-black text-slate-800 uppercase tracking-wide">{s.label}</p>
              <p className="text-md text-slate-400 leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Governing Bodies ── */}
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
                Tier I
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Governing Bodies
              </h2>
            </div>
            <p className="hidden lg:block text-base text-slate-400 max-w-sm text-right leading-relaxed">
              The four statutory bodies that collectively govern NIOS - from policy to finance to academic affairs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {governingCommittees.map((c, i) => (
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

        {/* ── Advisory & Functional Committees ── */}
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[12px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
                Tier II
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Advisory & Functional Committees
              </h2>
            </div>
            <p className="hidden lg:block text-base text-slate-400 max-w-md text-right leading-relaxed">
              Specialised committees that advise on media, accreditation, evaluation and infrastructure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advisoryCommittees.map((c, i) => (
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
                  {c.note && (
                    <p className="text-[12px] text-slate-400 italic">{c.note}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Special Committees Dark Banner ── */}
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
                  Special Purpose<br />
                  <span className="text-blue-400">Committees.</span>
                </h2>
              </div>
              <p className="hidden lg:block text-md text-slate-300 max-w-xs text-right leading-relaxed">
                Committees constituted to address specific statutory and compliance requirements.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {specialCommittees.map((c, i) => (
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
                    {c.note && (
                      <p className="text-[10px] text-slate-600 italic">{c.note}</p>
                    )}
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

        {/* ── Minutes & Documents Section ── */}
        <section className="space-y-8">
          <div>
            <div className="text-[14px] font-black text-blue-900 uppercase tracking-[0.4em] mb-3">
              Records & Minutes
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Meeting Minutes & Official Documents
            </h2>
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            {[
              { title: 'Minutes of General Body Meetings', desc: 'Official records of decisions and resolutions passed by the General Body of NOS.', href: '#' },
              { title: 'Minutes of Executive Board Meetings', desc: 'Detailed minutes from Executive Board sittings including policy decisions and administrative approvals.', href: '#' },
              { title: 'Minutes of Finance Committee Meetings', desc: 'Records of financial approvals, budget discussions and expenditure reviews.', href: '#' },
              { title: 'Reconstitution of AAC — Notification 52/2022', desc: 'Official notification dated 24.11.2022 regarding reconstitution of the Accreditation Advisory Committee.', href: '#' },
              { title: 'Gender Sensitization Committee — Notification 42/2021', desc: 'Notification dated November 2021 regarding constitution of the Gender Sensitization & Internal Complaints Committee.', href: '#' },
              { title: 'POSH Committee — Notification 25/2018', desc: 'Notification dated 26.09.2018 regarding the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.', href: '#' },
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

        {/* ── Governance Note ── */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-white/5" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-[14px] font-bold uppercase tracking-widest text-blue-300">
                Governance & Transparency
              </p>
              <h3 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                NIOS is committed to open, accountable and participatory governance.
              </h3>
              <p className="text-lg font-medium text-blue-200 leading-relaxed">
                All committee compositions, meeting minutes and official notifications are made available in the public domain under RTI disclosure norms. NIOS invites feedback and grievances from learners, study centres and the public through its Grievance Portal.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'RTI Disclosure', sub: 'Public disclosure under Right to Information Act', href: '#' },
                { label: 'Grievance Portal', sub: 'Submit and track complaints or feedback', href: '#' },
                { label: 'Office Orders', sub: 'Notifications and administrative orders', href: '#' },
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