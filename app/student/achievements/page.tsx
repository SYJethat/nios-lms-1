'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Award, Star, Crown, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { MOCK_BADGES, MOCK_ACHIEVEMENTS, MOCK_STREAKS, MOCK_CHALLENGES } from '@/lib/mock-data';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const rarityColors = {
  Bronze: 'from-blue-500 to-red-600',
  Silver: 'from-slate-400 to-slate-500',
  Gold: 'from-yellow-500 to-yellow-600',
  Platinum: 'from-purple-500 to-purple-600',
  Diamond: 'from-blue-400 to-indigo-500'
};

export default function AchievementsPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Achievements & Badges" subtitle="Your journey of excellence">
      <div className="space-y-12">
        {/* Stats Header */}
        <div className="grid lg:grid-cols-4 gap-6 p-12 rounded-xl bg-gradient-to-br from-purple-50 to-emerald-50 border border-purple-100 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-emerald-500 bg-clip-text text-transparent mb-3">
              Lv. 12
            </div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Player Level</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-3">4,250</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-500 mb-3">18</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-500 mb-3">21 days</div>
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Longest Streak</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Badges */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <Award className="text-yellow-500" size={36} />
                Badge Collection
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_BADGES.map((badge) => (
                  <div key={badge.id} className="group p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10 transition-all text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${rarityColors[badge.rarity as keyof typeof rarityColors]} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                      <badge.icon size={24} className="text-white drop-shadow-md" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">{badge.name}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{badge.description}</p>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                      Earned: {badge.earnedAt}
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${badge.rarity === 'Diamond' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700' :
                        badge.rarity === 'Platinum' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' :
                          'bg-slate-100 text-slate-700'
                      }`}>
                      {badge.rarity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <Star className="text-yellow-400" size={36} />
                Recent Achievements
              </h2>
              <div className="space-y-4">
                {MOCK_ACHIEVEMENTS.map((ach) => (
                  <div key={ach.id} className="flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-50 to-red-50 rounded-2xl border border-emerald-100 hover:shadow-md transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <ach.icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-lg text-slate-900 mb-1">{ach.title}</h3>
                      <p className="text-sm text-slate-600">{ach.subtitle}</p>
                    </div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-auto text-right">
                      {ach.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Streaks */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <TrendingUp className="text-blue-500" size={28} />
                Current Streaks
              </h2>
              <div className="space-y-4">
                {MOCK_STREAKS.map((streak, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-100 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-black text-slate-900">{streak.subject}</span>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        {streak.days} days
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full shadow-inner transition-all"
                        style={{ width: `${Math.min(streak.days * 5, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 font-black uppercase tracking-wider">
                      <span>Last: {streak.lastActive}</span>
                      <span>+{streak.bonusPoints} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-lg font-black text-slate-900 mb-6">Next Challenges</h3>
              <div className="space-y-3">
                {MOCK_CHALLENGES.slice(0, 3).map((challenge, i) => (
                  <Link key={i} href="/challenges" className="block p-4 bg-white rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-emerald-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                        <Crown size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">{challenge.title}</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{challenge.status}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-emerald-600">{challenge.points}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">pts</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

