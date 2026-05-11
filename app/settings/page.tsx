'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import {
   Paintbrush,
   Accessibility,
   ShieldCheck,
   Bell,
   Globe,
   Download,
   Trash2,
   User,
   Lock,
   Eye,
   LifeBuoy,
   Monitor,
   Zap,
   Sparkles,
   ChevronRight,
   Fingerprint,
   Mail,
   Shield,
   Palette,
   CheckCircle,
   Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { div } from 'framer-motion/client';

export default function SettingsPage() {
   const { user } = useAuth();
   const [activeTab, setActiveTab] = useState('General');

   if (!user) return null;

   return (
      <DashboardLayout
         title="Advanced Platform Configuration"
         subtitle="Customize your regional, security, and accessibility preferences for a personalized NIOS experience"
      >
         <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start animate-fade-in pb-20 max-w-8xl mx-auto">

            {/* Sidebar Tabs */}
            <div className="space-y-4">
               {['General', 'Security', 'Accessibility', 'Privacy', 'Support'].map((tab) => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`w-full p-4 rounded-xl flex items-center justify-between transition-all group ${activeTab === tab ? 'bg-slate-900 text-white shadow-xl translate-x-2' : 'bg-white border border-slate-100 text-slate-400 hover:border-blue-900/20 hover:text-slate-900'
                        }`}
                  >
                     <div className="flex items-center gap-3">
                        {tab === 'General' && <Paintbrush size={18} />}
                        {tab === 'Security' && <ShieldCheck size={18} />}
                        {tab === 'Accessibility' && <Accessibility size={18} />}
                        {tab === 'Privacy' && <Eye size={18} />}
                        {tab === 'Support' && <LifeBuoy size={18} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{tab}</span>
                     </div>
                     <ChevronRight size={14} className={activeTab === tab ? 'text-blue-900' : 'opacity-0'} />
                  </button>
               ))}

               <div className="p-8 rounded-xl bg-blue-50 border border-blue-100 mt-10">
                  <Sparkles className="text-blue-900 mb-4" size={24} />
                  <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2">Alpha Participation</h4>
                  <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
                     You are currently enrolled in our early-access learning node. Features may update frequently.
                  </p>
               </div>
            </div>

            {/* Settings Content Area */}
            <div className="space-y-8">

               {/* Section 1: Appearance */}
               {activeTab === 'General' && (
                  <div className="space-y-8 animate-fade-in">
                     <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-10">
                           <Palette className="text-blue-900" size={24} />
                           <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Theme & Visuals</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                           {[
                              { name: 'NIOS Dark', desc: 'High end contrast (Default)', active: true },
                              { name: 'National Blue', desc: 'Standard clarity', active: false },
                              { name: 'Monochrome', desc: 'Classic accessibility', active: false },
                           ].map((t) => (
                              <div key={t.name} className={`p-6 rounded-xl border transition-all cursor-pointer ${t.active ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-blue-900/20'
                                 }`}>
                                 <div className="text-[10px] font-black uppercase tracking-widest mb-1">{t.name}</div>
                                 <p className="text-[8px] font-black uppercase tracking-widest opacity-50">{t.desc}</p>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-10">
                           <Globe className="text-blue-900" size={24} />
                           <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Regional Settings</h3>
                        </div>
                        <div className="space-y-6">
                           {[
                              { label: 'Language Preference', value: 'Hindi (Native)', btn: 'Change Language' },
                              { label: 'Timezone Cluster', value: 'India (GMT+5:30)', btn: 'Sync Time' },
                           ].map((s, i) => (
                              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-xl gap-6">
                                 <div className="text-center md:text-left">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</div>
                                    <div className="text-sm font-black text-slate-900">{s.value}</div>
                                 </div>
                                 <button className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-blue-900 transition-all">
                                    {s.btn}
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'Security' && (
                  <div className="space-y-8 animate-fade-in">
                     <div className="p-10 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/5 rounded-xl blur-3xl group-hover:scale-150 transition-all duration-1000" />
                        <div className="flex items-center gap-4 mb-10">
                           <Shield className="text-blue-900" size={24} />
                           <h3 className="text-lg font-black uppercase tracking-tight text-white">Trust & Authentication</h3>
                        </div>
                        <div className="space-y-4">
                           {[
                              { label: '2-Factor Authentication', status: 'Enforced', icon: <CheckCircle className="text-emerald-500" size={14} /> },
                              { label: 'Biometric Gateway', status: 'Active (FaceID)', icon: <Fingerprint className="text-blue-900" size={14} /> },
                              { label: 'External Node Access', status: 'Restricted', icon: <Lock className="text-slate-500" size={14} /> },
                           ].map((s, i) => (
                              <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-xl group cursor-default">
                                 <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{s.label}</span>
                                 </div>
                                 <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest">
                                    {s.icon} {s.status}
                                 </div>
                              </div>
                           ))}
                        </div>
                        <button className="w-full mt-10 py-5 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                           Refresh Security Audit
                        </button>
                     </div>
                  </div>
               )}

               {activeTab === 'Accessibility' && (
                  <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm space-y-10 animate-fade-in">
                     <div className="flex items-center gap-3 mb-10">
                        <Accessibility className="text-blue-900" size={24} />
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Inclusive Learning</h3>
                     </div>
                     <div className="space-y-6">
                        {[
                           { label: 'Text Size Calibration', value: '18px (Personalized)', icon: <Zap size={14} /> },
                           { label: 'Sign Language Aids (ISL)', value: 'Disabled', icon: <Users size={14} /> },
                           { label: 'Dyslexic Friendly Font', value: 'Active', icon: <Sparkles size={14} /> },
                        ].map((s, i) => (
                           <div key={i} className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-xl group">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-900">
                                    {s.icon}
                                 </div>
                                 <div className="text-left font-black tracking-tight">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{s.label}</div>
                                    <div className="text-sm text-slate-900">{s.value}</div>
                                 </div>
                              </div>
                              <button className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-blue-900 transition-all">
                                 Calibrate
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
               {activeTab === 'Privacy' && (
                  <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm space-y-10 animate-fade-in">
                     <div className="flex items-center gap-3 mb-10">
                        <Shield className="text-blue-900" size={24} />
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Privacy & Data Control</h3>
                     </div>
                     <div className="space-y-6">
                        {[
                           { label: 'Data Sharing Preferences', value: 'Minimal Sharing', icon: <Users size={14} />, btn: 'Review' },
                           { label: 'Learning Progress Visibility', value: 'Private (Default)', icon: <Lock size={14} />, btn: 'Manage' },
                           { label: 'Data Export & Deletion', value: 'Available Anytime', icon: <CheckCircle size={14} />, btn: 'Request' },
                        ].map((s, i) => (
                           <div key={i} className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-xl group">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-900">
                                    {s.icon}
                                 </div>
                                 <div className="text-left font-black tracking-tight">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{s.label}</div>
                                    <div className="text-sm text-slate-900">{s.value}</div>
                                 </div>
                              </div>
                              <button className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-blue-900 transition-all">
                                 {s.btn}
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'Support' && (
                  <div className="p-10 rounded-xl bg-white border border-slate-100 shadow-sm space-y-10 animate-fade-in">
                     <div className="flex items-center gap-3 mb-10">
                        <Shield className="text-blue-900" size={24} /> {/* You can replace with HelpCircle if imported */}
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Help & Support</h3>
                     </div>
                     <div className="space-y-6">
                        {[
                           { label: 'Contact Support Team', value: 'Response < 4 hrs', icon: <Users size={14} />, btn: 'Contact' },
                           { label: 'Knowledge Base / FAQs', value: 'Full Access', icon: <CheckCircle size={14} />, btn: 'Browse' },
                           { label: 'Submit Feedback / Ticket', value: 'Open 24×7', icon: <Sparkles size={14} />, btn: 'Submit' },
                        ].map((s, i) => (
                           <div key={i} className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-xl group">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-900">
                                    {s.icon}
                                 </div>
                                 <div className="text-left font-black tracking-tight">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{s.label}</div>
                                    <div className="text-sm text-slate-900">{s.value}</div>
                                 </div>
                              </div>
                              <button className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-blue-900 transition-all">
                                 {s.btn}
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               )}




               {/* Data Zone */}
               <div className="p-12 rounded-xl bg-blue-50/50 border-2 border-dashed border-blue-200/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="flex flex-col lg:flex-row items-center gap-10">
                     <div className="w-16 h-16 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/20">
                        <Trash2 size={24} />
                     </div>
                     <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-2xl font-black text-blue-600 mb-2 uppercase tracking-tight">Sovereign Data Storage</h3>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed max-w-2xl">
                           Full control over your academic footprint. Download your complete platform telemetry or request a secure registry purge. These actions are irreversible.
                        </p>
                     </div>
                     <div className="flex gap-3">
                        <button className="px-10 py-5 bg-white border border-blue-100 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-blue-200/50">
                           Request Purge
                        </button>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </DashboardLayout>
   );
}
