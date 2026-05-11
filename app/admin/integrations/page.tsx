'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Server, ShieldAlert, CheckCircle2, QrCode, Image as ImageIcon, Briefcase, RefreshCw, Layers } from 'lucide-react';
import { useState } from 'react';

const integrations = [
  { id: 'abc', name: 'Academic Bank of Credits (ABC)', desc: 'Credit storage and transfer across institutions.', status: 'connected', uptime: '99.9%' },
  { id: 'digilocker', name: 'DigiLocker Gateway', desc: 'Secure document wallet integration and sync.', status: 'connected', uptime: '100%' },
  { id: 'udise', name: 'UDISE+', desc: 'Unified District Information System for Education.', status: 'syncing', uptime: '98.5%' },
  { id: 'diksha', name: 'DIKSHA Sync', desc: 'National Teacher Platform content federation.', status: 'error', uptime: '89.2%' },
  { id: 'swayam', name: 'SWAYAM MOOCs', desc: 'Course catalog sync and enrollment federation.', status: 'connected', uptime: '99.5%' },
];

export default function IntegrationsPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return null;

  return (
    <DashboardLayout
      title="Platform Integrations"
      subtitle="National APIs & Certificate Generation Engine"
    >
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* API Gateways */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">National Gateways</h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg">All Systems Nominal</span>
          </div>

          <div className="grid gap-4">
            {integrations.map((api) => (
              <div key={api.id} className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-between group hover:border-slate-300 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${api.status === 'connected' ? 'bg-emerald-50 text-emerald-500' :
                    api.status === 'syncing' ? 'bg-blue-50 text-blue-500 animate-pulse' :
                      'bg-blue-50 text-blue-500'
                    }`}>
                    {api.status === 'syncing' ? <RefreshCw size={24} className="animate-spin" /> : <Server size={24} />}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 tracking-tight">{api.name}</div>
                    <div className="text-xs text-slate-500">{api.desc}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</div>
                  {api.status === 'connected' && <span className="inline-flex text-emerald-600 font-bold text-xs"><CheckCircle2 size={14} className="mr-1" /> Active</span>}
                  {api.status === 'error' && <span className="inline-flex text-blue-600 font-bold text-xs"><ShieldAlert size={14} className="mr-1" /> Failed</span>}
                  {api.status === 'syncing' && <span className="inline-flex text-blue-600 font-bold text-xs hover:underline cursor-pointer">Syncing...</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Engine */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Certificate Engine</h3>
          </div>

          <div className="p-8 rounded-xl bg-gradient-to-br from-blue-500 to-red-600 text-white relative overflow-hidden shadow-lg border border-blue-400/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10" />
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-blue-100 mb-1">QR Verification System</h4>
                <div className="text-3xl font-black">2.4M+</div>
                <div className="text-xs font-semibold text-blue-200">Certificates Generated</div>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <QrCode size={32} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <button className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl border border-white/20 text-sm font-bold backdrop-blur-md">
                <ImageIcon size={18} /> Update blueing
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl border border-white/20 text-sm font-bold backdrop-blur-md">
                <Layers size={18} /> Manage Templates
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all">
              <Briefcase size={28} className="text-indigo-500 mb-3" />
              <div className="font-bold text-sm text-slate-900">Batch Minting</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Issue to Cohort</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-200 hover:shadow-md transition-all">
              <ShieldAlert size={28} className="text-emerald-500 mb-3" />
              <div className="font-bold text-sm text-slate-900">Revocation List</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Manage invalid certs</div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
