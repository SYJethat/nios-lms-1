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
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
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
    title: "Bilingual Language Learning Pathway - Hindi & Tamil",
    type: "Course",
    issueDate: "March 20, 2026",
    rollNumber: "NIOS/2026/103001",
    certificateNumber: "NIOS/LANG/HI-TA/2026/01",
    status: "Verified",
    image: "/xx.jpg",
  },
];

export default function CertificatesPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);
  const [sharingCert, setSharingCert] = useState<Certificate | null>(null);
  const [showVerifyTool, setShowVerifyTool] = useState(false);
  const [verifyingHash, setVerifyingHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const filteredCerts = mockCertificates.filter((cert) => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || cert.type === selectedType;
    return matchesSearch && matchesType;
  });

  const openCertificateModal = (cert: Certificate) => {
    setViewingCert(cert);
  };

  const closeCertificateModal = () => {
    setViewingCert(null);
  };

  const downloadCertificate = (cert: Certificate) => {
    alert(`Downloading verified certificate ${cert.certificateNumber}...`);
  };

  const shareToSocial = (cert: Certificate, platform: string) => {
    const shareUrl = `${window.location.origin}/student/certificates`;
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
      title="Verified Credentials & Certificates"
      subtitle="Official NIOS digital certificates, DigiLocker sync, and cryptographic credentials"
    >
      <div className="p-4 sm:p-6 max-w-8xl mx-auto space-y-8 animate-fade-in pb-16">
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/80 via-white to-amber-50/40 p-6 rounded-2xl border border-blue-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                GOVERNMENT OF INDIA • NIOS CREDENTIAL REGISTRY
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" /> DigiLocker Synced
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Verified Academic Credentials
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Candidate: <strong className="text-slate-800">{activeUser.name}</strong> • Enrollment: <strong className="text-slate-800">{activeUser.details?.enrollmentNo || 'NIOS/2026/SEC/10492'}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowVerifyTool(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-blue-900/20"
            >
              <Cpu size={15} /> Verify Hash / ID
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search certificates by title, roll or registry ID..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm font-medium text-slate-800 placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
                {['All', 'Secondary', 'TMA', 'Course'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedType === type
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                        <GraduationCap size={22} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1 bg-emerald-50 text-emerald-700 border-emerald-200">
                          <BadgeCheck size={12} /> {cert.status}
                        </div>
                        <div className="text-[9px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                          <LinkIcon size={9} /> National Ledger
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug mb-4">
                      {cert.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <div className="text-slate-400 font-bold uppercase text-[10px]">Issued On</div>
                        <div className="text-slate-800 font-bold mt-0.5">{cert.issueDate}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-bold uppercase text-[10px]">Roll Number</div>
                        <div className="text-slate-800 font-bold mt-0.5">{cert.rollNumber}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 mb-5 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                      <QrCode size={32} className="text-blue-900 flex-shrink-0" />
                      <div className="text-[10px] font-bold text-slate-700 leading-tight">
                        <p className="text-slate-400 uppercase">Registry ID</p>
                        <p className="font-mono text-blue-950 mt-0.5">{cert.certificateNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => openCertificateModal(cert)}
                      className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      View <ChevronRight size={14} />
                    </button>

                    <button
                      onClick={() => downloadCertificate(cert)}
                      className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 rounded-xl transition-all"
                      title="Download Certificate"
                    >
                      <Download size={16} />
                    </button>

                    <button
                      onClick={() => openShareModal(cert)}
                      className="p-2.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 rounded-xl transition-all"
                      title="Share Certificate"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Candidate Summary Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-900 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                {activeUser.name.charAt(0)}
              </div>
              <h4 className="text-base font-bold text-slate-900">{activeUser.name}</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{activeUser.role} • ID: {activeUser.id}</p>

              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mt-4">
                <div>
                  <div className="text-xl font-black text-slate-900">{mockCertificates.length}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Issued</div>
                </div>
                <div>
                  <div className="text-xl font-black text-emerald-600">100%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Verified</div>
                </div>
                <div>
                  <button
                    onClick={() => alert('Downloading cumulative academic transcript...')}
                    className="flex flex-col items-center mx-auto"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors">
                      <FileSpreadsheet size={13} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 mt-1">Transcript</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sync DigiLocker Card (Light Theme) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-blue-900" size={20} />
                <h3 className="font-bold text-slate-900 text-sm">DigiLocker Integration</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Seamlessly pull and verify your secondary and senior secondary mark sheets directly inside your DigiLocker citizen locker.
              </p>
              <button
                onClick={() => alert('DigiLocker account verified and connected!')}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                Sync with DigiLocker
              </button>
            </div>

            {/* National Academic Depository (NAD) Info */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-amber-500" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">ABC & NAD Network</h4>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                All credits earned are stored in the Academic Bank of Credits (ABC) under the Ministry of Education.
              </p>
              <button
                onClick={() => alert('Viewing Academic Bank of Credits ID: ABC-981-204-12')}
                className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-xs"
              >
                View ABC ID
              </button>
            </div>
          </div>
        </div>

        {/* View Modal */}
        {viewingCert && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <div>
                  <h2 className="font-bold text-lg text-slate-900">{viewingCert.title}</h2>
                  <p className="text-xs text-slate-500">Registry ID: {viewingCert.certificateNumber}</p>
                </div>
                <button
                  onClick={closeCertificateModal}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Certificate Preview Card */}
              <div className="p-6 bg-slate-50">
                <div className="bg-white border-2 border-blue-900/30 rounded-xl p-8 shadow-md text-center space-y-4">
                  <p className="text-xs font-bold text-blue-900 tracking-widest uppercase">
                    NATIONAL INSTITUTE OF OPEN SCHOOLING
                  </p>
                  <h3 className="text-xl font-extrabold text-slate-900">{viewingCert.title}</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    This certifies that <strong className="text-slate-900">{activeUser.name}</strong> (Roll: {viewingCert.rollNumber}) has successfully completed the required curriculum and demonstrated academic proficiency.
                  </p>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Date: {viewingCert.issueDate}</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <BadgeCheck size={14} /> Digitals Certified
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-4 border-t border-slate-200 bg-white justify-end">
                <button
                  onClick={() => downloadCertificate(viewingCert)}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Download size={14} /> Download PDF
                </button>
                <button
                  onClick={() => {
                    closeCertificateModal();
                    openShareModal(viewingCert);
                  }}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Share2 size={14} /> Share
                </button>
                <button
                  onClick={closeCertificateModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {sharingCert && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-200">
                <h3 className="font-bold text-base text-slate-900">Share Your Achievement</h3>
                <button onClick={closeShareModal} className="text-slate-400 hover:text-slate-800">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-center text-xs text-slate-600 mb-6">
                  Share <strong className="text-slate-900">{sharingCert.title}</strong> to professional and social networks.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { platform: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
                    { platform: 'twitter', label: 'X (Twitter)', color: '#000000' },
                    { platform: 'facebook', label: 'Facebook', color: '#1877F2' },
                    { platform: 'whatsapp', label: 'WhatsApp', color: '#25D366' }
                  ].map(({ platform, label, color }) => (
                    <button
                      key={platform}
                      onClick={() => shareToSocial(sharingCert, platform)}
                      className="flex items-center gap-2 p-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-xs text-slate-700 transition-colors"
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                <button
                  onClick={closeShareModal}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blockchain Verification Tool Modal */}
        <AnimatePresence>
          {showVerifyTool && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[120] p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">National Registry Audit</h3>
                  <p className="text-xs text-slate-500 mb-6">Cross-reference certificate hash with NIOS Government Registry</p>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Paste Certificate Hash or Registry ID..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 text-center"
                      value={verifyingHash}
                      onChange={(e) => setVerifyingHash(e.target.value)}
                    />

                    <button
                      disabled={isVerifying}
                      onClick={() => {
                        setIsVerifying(true);
                        setTimeout(() => setIsVerifying(false), 1200);
                      }}
                      className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      {isVerifying ? 'Auditing Ledger...' : 'Run Verification Audit'}
                    </button>
                  </div>

                  {verifyingHash && !isVerifying && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-left text-xs"
                    >
                      <div className="flex items-center gap-2 font-bold text-emerald-800 mb-1">
                        <BadgeCheck size={16} /> Credential Valid & Authentic
                      </div>
                      <p className="text-emerald-700 text-[11px]">
                        Verified on NIOS National Ledger. Registry entry matches student record.
                      </p>
                    </motion.div>
                  )}
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
                  <button
                    onClick={() => setShowVerifyTool(false)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Close Tool
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}