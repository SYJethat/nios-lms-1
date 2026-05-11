'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
  Download,
  Search,
  Filter,
  GraduationCap,
  QrCode,
  ChevronRight,
  MoreVertical,
  Share2,
  X,
  Sparkles,
  ShieldCheck,
  Cpu,
  Link as LinkIcon,
  BadgeCheck,
  FileSpreadsheet
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Certificate {
  id: string;
  title: string;
  type: "Secondary" | "Senior Secondary" | "TMA" | "Course" | "Diploma";
  issueDate: string;
  rollNumber: string;
  certificateNumber: string;
  status: "Verified" | "Active";
  image: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    title: "Secondary School Certificate - Science Stream",
    type: "Secondary",
    issueDate: "April 15, 2026",
    rollNumber: "NIOS/2026/100001",
    certificateNumber: "NIOS/SSC/2026/0001",
    status: "Verified",
    image: "/xx.jpg",
  },
  {
    id: "cert-002",
    title: "Tutor Marked Assignment - Mathematics (Class 10)",
    type: "TMA",
    issueDate: "March 20, 2026",
    rollNumber: "NIOS/2026/100001",
    certificateNumber: "NIOS/TMA/MATH10/2026/01",
    status: "Verified",
    image: "/xx.jpg",
  },
  {
    id: "cert-003",
    title: "Tutor Marked Assignment - English (Class 10)",
    type: "TMA",
    issueDate: "April 20, 2026",
    rollNumber: "NIOS/2026/102001",
    certificateNumber: "NIOS/TMA/ENG10/2026/01",
    status: "Verified",
    image: "/xx.jpg",
  },
  {
    id: "cert-004",
    title: "Tutor Marked Assignment - Social Science (Class 10)",
    type: "TMA",
    issueDate: "March 20, 2026",
    rollNumber: "NIOS/2026/103001",
    certificateNumber: "NIOS/TMA/SS10/2026/01",
    status: "Verified",
    image: "/xx.jpg",
  },
];

export default function CertificatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);   // For View Modal
  const [sharingCert, setSharingCert] = useState<Certificate | null>(null);   // For Share Modal
  const [showVerifyTool, setShowVerifyTool] = useState(false);
  const [verifyingHash, setVerifyingHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!user) return null;

  if (user.role === 'guest') {
    router.push('/dashboard/guest');
    return null;
  }

  // Open Certificate in Modal
  const openCertificateModal = (cert: Certificate) => {
    setViewingCert(cert);
  };

  // Close Certificate Modal
  const closeCertificateModal = () => {
    setViewingCert(null);
  };

  // Download Certificate
  const downloadCertificate = (cert: Certificate) => {
    const link = document.createElement('a');
    link.href = cert.image;
    link.download = `${cert.certificateNumber || cert.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share Certificate
  const shareToSocial = (cert: Certificate, platform: string) => {
    const shareUrl = `${window.location.origin}/certificate/${cert.id}`;
    const shareText = `Proud to share my ${cert.title} from NIOS! 🎓 Blockchain verified.`;

    let url = '';
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openShareModal = (cert: Certificate) => {
    setSharingCert(cert);
  };

  const closeShareModal = () => {
    setSharingCert(null);
  };

  return (
    <DashboardLayout
      title="Credentials & Certification"
      subtitle="Official NIOS digital certificates and blockchain-verified academic transcripts"
    >
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start animate-fade-in pb-20">

        {/* Main Content */}
        <div className="space-y-10">
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4">
            <div className="relative w-full max-w-lg">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search certificates by title or ID..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 transition-all font-medium text-slate-600 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button className="px-6 py-4 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2">
                <Filter size={16} /> Filter Types
              </button>
              <button
                onClick={() => setShowVerifyTool(true)}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl flex items-center gap-2"
              >
                <Cpu size={14} /> Blockchain Verify
              </button>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {mockCertificates.map((cert) => (
              <div
                key={cert.id}
                className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border flex items-center gap-1 ${cert.status === 'Verified' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-blue-50 text-blue-500 border-blue-100'
                      }`}>
                      <BadgeCheck size={10} /> {cert.status}
                    </div>
                    <div className="text-[7px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1">
                      <LinkIcon size={8} /> On-Chain
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-tight mb-8 h-12 flex items-center group-hover:text-blue-900 transition-colors">
                  {cert.title}
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div>
                    <div className="mb-1 opacity-50">Issued On</div>
                    <div className="text-slate-900">{cert.issueDate}</div>
                  </div>
                  <div>
                    <div className="mb-1 opacity-50">Roll Number</div>
                    <div className="text-slate-900">{cert.rollNumber}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-8 p-4 bg-blue-50 rounded-xl border border-slate-100 border-dashed">
                  <QrCode size={42} className="text-slate-400 opacity-50" />
                  <div className="flex-1 text-[8px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">
                    Blockchain Registry ID: {cert.certificateNumber}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openCertificateModal(cert)}
                    className="flex-[2] py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                  >
                    View Certificate <ChevronRight size={14} />
                  </button>

                  <button
                    onClick={() => downloadCertificate(cert)}
                    className="p-4 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>

                  <button
                    onClick={() => openShareModal(cert)}
                    className="p-4 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="Share"
                  >
                    <Share2 size={18} />
                  </button>

                  <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Profile Summary Card */}
          <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm text-center group">
            <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-blue-900 to-red-500 text-white font-black text-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              {user.name.charAt(0)}
            </div>
            <h4 className="text-lg font-black text-slate-900">{user.name}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-8">{user.role} · ID: {user.id}</p>
            <div className="grid grid-cols-3 gap-4 border-t border-slate-50 pt-8">
              <div className="text-center">
                <div className="text-[20px] font-black text-slate-900 tracking-tighter">02</div>
                <div className="text-[8px] font-black text-slate-400 uppercase">Issued</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-black text-emerald-500 tracking-tighter">100%</div>
                <div className="text-[8px] font-black text-slate-400 uppercase">Verified</div>
              </div>
              <div className="text-center">
                <button className="flex flex-col items-center gap-1 group/btn">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center group-hover/btn:bg-blue-900 group-hover/btn:text-white transition-all">
                    <FileSpreadsheet size={14} />
                  </div>
                  <div className="text-[7px] font-black text-slate-400 uppercase">Transcript</div>
                </button>
              </div>
            </div>
          </div>

          {/* Sync DigiLocker CTA */}
          <div className="p-10 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-xl blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="text-blue-900" size={24} />
              <h3 className="font-black uppercase tracking-tight text-white">Trust Network</h3>
            </div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed mb-8">
              Automatically sync your NIOS credentials with DigiLocker, ABC Bank, and SWAYAM platforms.
            </p>
            <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all shadow-xl">
              Connect DigiLocker
            </button>
          </div>

          {/* Quick Verify */}
          <div className="p-10 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm text-center group">
            <Sparkles className="w-10 h-10 mx-auto mb-6 text-blue-500 opacity-50 group-hover:rotate-12 transition-transform" />
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">QR Authentication</h4>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed mb-8">Verification for employers and educational institutions nationwide.</p>
            <button className="w-full py-4 bg-white border border-blue-100 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg shadow-blue-500/10">
              Platform Registry
            </button>
          </div>
        </div>
      </div>

      {/* ==================== CERTIFICATE VIEW MODAL ==================== */}
      {viewingCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 overflow-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b">
              <div>
                <h2 className="font-black text-xl text-slate-900">{viewingCert.title}</h2>
                <p className="text-sm text-slate-500">Certificate No: {viewingCert.certificateNumber}</p>
              </div>
              <button
                onClick={closeCertificateModal}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={28} className="text-slate-500" />
              </button>
            </div>

            {/* Certificate Image Display */}
            <div className="p-8 bg-slate-50 flex justify-center">
              <div className="relative shadow-2xl rounded-xl overflow-hidden border border-slate-200 max-h-[50vh] overflow-y-auto">
                <Image
                  src={viewingCert.image}
                  alt={viewingCert.title}
                  width={800}
                  height={600}
                  className="max-w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-3 p-6 border-t bg-white">
              <button
                onClick={() => downloadCertificate(viewingCert)}
                className="flex-1 py-4 bg-slate-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Certificate
              </button>

              <button
                onClick={() => {
                  closeCertificateModal();
                  openShareModal(viewingCert);
                }}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                Share Certificate
              </button>

              <button
                onClick={closeCertificateModal}
                className="px-8 py-4 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SHARE MODAL ==================== */}
      {sharingCert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-black text-xl">Share Your Achievement</h3>
              <button onClick={closeShareModal} className="text-slate-400 hover:text-slate-900">
                <X size={28} />
              </button>
            </div>

            <div className="p-8">
              <p className="text-center text-slate-600 mb-8">
                Share <span className="font-semibold">{sharingCert.title}</span>
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { platform: 'linkedin', label: 'LinkedIn', color: '#0A66C2', icon: 'in' },
                  { platform: 'twitter', label: 'X / Twitter', color: '#000000', icon: '𝕏' },
                  { platform: 'facebook', label: 'Facebook', color: '#1877F2', icon: 'f' },
                  { platform: 'whatsapp', label: 'WhatsApp', color: '#25D366', icon: '💬' }
                ].map(({ platform, label, color, icon }) => (
                  <button
                    key={platform}
                    onClick={() => shareToSocial(sharingCert, platform)}
                    className="flex flex-col items-center gap-4 p-6 border-2 border-transparent hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all group"
                  >
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: color, color: 'white' }}
                    >
                      {icon}
                    </div>
                    <span className="font-semibold text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 border-t bg-slate-50 flex justify-end">
              <button
                onClick={closeShareModal}
                className="px-10 py-3.5 font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ==================== BLOCKCHAIN VERIFY TOOL MODAL ==================== */}
      <AnimatePresence>
        {showVerifyTool && (
          <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-[120] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-xl mx-auto mb-8 flex items-center justify-center text-slate-400">
                  <Cpu size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Blockchain Verification</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Cross-reference with National Education Ledger</p>

                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Paste Certificate Hash or ID..."
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-900/20 transition-all text-center"
                      value={verifyingHash}
                      onChange={(e) => setVerifyingHash(e.target.value)}
                    />
                  </div>

                  <button
                    disabled={isVerifying}
                    onClick={() => {
                      setIsVerifying(true);
                      setTimeout(() => setIsVerifying(false), 2000);
                    }}
                    className="w-full py-5 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl disabled:opacity-50"
                  >
                    {isVerifying ? 'Scanning Ledger...' : 'Run Cryptographic Audit'}
                  </button>
                </div>

                {verifyingHash && !isVerifying && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-xl text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <BadgeCheck size={18} className="text-emerald-500" />
                      <span className="text-xs font-black text-emerald-600 uppercase">Verification Successful</span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 leading-relaxed uppercase tracking-tighter">
                      Block #412,982 confirmed. This credential is valid, un-tampered, and recognized by NIOS National Registry.
                    </p>
                  </motion.div>
                )}
              </div>
              <div className="p-6 border-t bg-slate-50 flex justify-center">
                <button onClick={() => setShowVerifyTool(false)} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">Close Tool</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}