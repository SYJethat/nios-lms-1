'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck, UserCheck, FileText, CheckCircle2, Clock, XCircle, Search, Fingerprint, UploadCloud, FolderOpen } from 'lucide-react';
import { useState } from 'react';

const mockApplications = [
  { id: 'APP-001', name: 'Aarav Sharma', type: 'Class 10', status: 'pending', aadhaar: 'Verified', docs: 'Pending Scan', date: '2026-04-06' },
  { id: 'APP-002', name: 'Diya Patel', type: 'Class 12', status: 'approved', aadhaar: 'Verified', docs: 'Verified', date: '2026-04-05' },
  { id: 'APP-003', name: 'Rohan Gupta', type: 'Vocational', status: 'rejected', aadhaar: 'Mismatch', docs: 'Invalid', date: '2026-04-04' },
  { id: 'APP-004', name: 'Sanya Singh', type: 'Class 10', status: 'pending', aadhaar: 'Pending', docs: 'Uploaded', date: '2026-04-06' },
];

export default function AdmissionsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || user.role !== 'admin') return null;

  return (
    <DashboardLayout
      title="Admissions & Enrolment"
      subtitle="Automated KYC, Aadhaar Verification & Digital Workflows"
    >
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Enrolment Workflows</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search Application ID..."
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="px-4 py-2 bg-blue-900 text-white text-xs font-black uppercase rounded-xl hover:bg-blue-600 transition-all">Bulk Process</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden auto-rows-max">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Application</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aadhaar (UIDAI)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Documents</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockApplications.filter(a => a.id.toLowerCase().includes(searchTerm.toLowerCase())).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{app.name}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{app.id} · {app.type}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${app.aadhaar === 'Verified' ? 'bg-emerald-50 text-emerald-600' :
                        app.aadhaar === 'Mismatch' ? 'bg-blue-50 text-blue-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                        <Fingerprint size={12} /> {app.aadhaar}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${app.docs === 'Verified' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                        <FileText size={12} /> {app.docs}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {app.status === 'pending' && <button className="text-blue-900 hover:text-blue-600 font-bold text-xs">Review</button>}
                        {app.status === 'approved' && <CheckCircle2 className="text-emerald-500" size={18} />}
                        {app.status === 'rejected' && <XCircle className="text-blue-500" size={18} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
            <h3 className="font-black uppercase tracking-tight mb-2">Aadhaar E-KYC Live</h3>
            <p className="text-xs text-indigo-200 mb-6 font-medium">UIDAI Gateway cluster is fully operational and processing 42 verifications/min.</p>

            <div className="space-y-3">
              <div className="bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Auto-Verified</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-widest">Today</div>
                  </div>
                </div>
                <div className="text-2xl font-black">1,402</div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Manual Review</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-widest">Pending queue</div>
                  </div>
                </div>
                <div className="text-2xl font-black">84</div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-6">Document Intelligence</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-900 hover:bg-blue-50 transition-colors text-center cursor-pointer group">
                <UploadCloud className="mx-auto text-slate-400 group-hover:text-blue-900 mb-2" size={24} />
                <div className="text-xs font-bold text-slate-900">Upload Scans</div>
                <div className="text-[9px] text-slate-400 uppercase mt-1">Batch OCR</div>
              </div>
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center cursor-pointer group">
                <FolderOpen className="mx-auto text-slate-400 group-hover:text-blue-500 mb-2" size={24} />
                <div className="text-xs font-bold text-slate-900">DigiLocker Sync</div>
                <div className="text-[9px] text-slate-400 uppercase mt-1">Fetch Records</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
