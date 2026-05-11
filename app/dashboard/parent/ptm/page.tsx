'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { MessageCircle, Calendar, Video, CheckCircle2, Clock, User, MapPin, BookOpen } from 'lucide-react';
import { MOCK_PTM_SCHEDULE } from '@/lib/mock-data';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ParentPTM() {
  const { user } = useAuth();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!user) return null;

  const applyForMeeting = (slotId: string) => {
    setSelectedSlot(slotId);
    // Mock API call
    setTimeout(() => {
      alert(`✅ Application submitted for ${MOCK_PTM_SCHEDULE.find(s => s.id === slotId)?.teacher}! Check your email for confirmation.`);
      setSelectedSlot(null);
    }, 1500);
  };

  return (
    <DashboardLayout
      title="Parent-Teacher Meetings"
      subtitle="Schedule one-on-one discussions with subject teachers"
    >
      <div className="space-y-12 pb-20">
        {/* Hero Section */}
        <div className="p-12 rounded-xl] bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 border border-blue-100/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-600 to-emerald-600 bg-clip-text text-transparent tracking-tight mb-6 leading-tight">
                Connect with Teachers
              </h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg mb-8">
                Personalized 1:1 sessions to discuss progress, challenges and next steps.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-white/50">
                  <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                  <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Blockchain Recorded</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-white/50">
                  <Video className="text-blue-500 w-6 h-6" />
                  <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Video/Online Option</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-2xl mx-auto mb-6">
                {MOCK_PTM_SCHEDULE.filter(s => s.status === 'Available').length}
              </div>
              <div className="text-2xl font-black text-slate-900 mb-2">Open Slots</div>
              <div className="text-lg font-semibold text-emerald-600">Next: April 20th</div>
            </div>
          </div>
        </div>

        {/* Available Slots */}
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
            <Calendar className="text-blue-500" size={32} />
            Available Sessions ({MOCK_PTM_SCHEDULE.filter(s => s.status === 'Available').length})
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_PTM_SCHEDULE.map((slot) => (
              <div key={slot.id} className={`group p-8 rounded-2xl border-2 transition-all overflow-hidden h-full ${slot.status === 'Available'
                ? 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer'
                : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <User size={20} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${slot.status === 'Available' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {slot.status}
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {slot.teacher}
                </h3>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen size={16} /> {slot.subject}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={16} /> {slot.date}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} /> {slot.time}
                  </div>
                </div>

                {slot.status === 'Available' ? (
                  <button
                    onClick={() => applyForMeeting(slot.id)}
                    disabled={selectedSlot === slot.id}
                    className="w-full py-5 px-8 bg-gradient-to-r from-emerald-500 to-red-500 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-600 hover:to-red-600"
                  >
                    {selectedSlot === slot.id ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Applying...
                      </>
                    ) : (
                      'Book This Slot'
                    )}
                  </button>
                ) : (
                  <div className="w-full py-5 px-8 bg-slate-100 text-slate-500 rounded-2xl font-black text-[12px] uppercase tracking-widest text-center flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    Already Booked
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <MessageCircle className="w-20 h-20 mx-auto mb-8 text-blue-300 opacity-75" />
            <h3 className="text-2xl font-black mb-6">What Happens Next?</h3>
            <div className="space-y-4 text-lg font-medium leading-relaxed">
              <p>✅ <strong>Confirmation Email:</strong> Within 24 hours with Zoom/Google Meet link</p>
              <p>✅ <strong>Blockchain Record:</strong> Meeting logged permanently on-chain</p>
              <p>✅ <strong>Automated Summary:</strong> AI-generated minutes delivered post-meeting</p>
              <p>📅 <strong>Reschedule:</strong> 48 hours notice required for changes</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

