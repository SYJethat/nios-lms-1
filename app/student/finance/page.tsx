'use client';

import { useState } from 'react';
import { Bell, Flame, IndianRupeeIcon } from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <DashboardLayout
            title="Finance Dashboard"
            subtitle="Track your payments, view transactions, and manage your budget"
        >
            <div className="p-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-2">
                            Student Finance
                        </p>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Keep your money moving with clarity
                        </h1>
                        <p className="mt-3 max-w-2xl text-slate-600">
                            Review your latest payments, monitor spending habits, and stay on top of your budget with easy-to-read insights.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
                            <Flame className="h-5 w-5" />
                        </div>
                        <div className="rounded-xl bg-slate-50 p-4 text-slate-700">
                            <Bell className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-500">Total Paid</p>
                        <p className="mt-3 text-3xl font-bold text-slate-900 flex "><IndianRupeeIcon />8,750</p>
                        <p className="mt-2 text-sm text-slate-500">This semester</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-500">Outstanding Balance</p>
                        <p className="mt-3 text-3xl font-bold text-blue-600 flex"><IndianRupeeIcon /> 1,250</p>
                        <p className="mt-2 text-sm text-slate-500">Due next 30 days</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-500">Budget Health</p>
                        <p className="mt-3 text-3xl font-bold text-slate-900">Good</p>
                        <p className="mt-2 text-sm text-slate-500">3 expense categories under control</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'overview'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'transactions'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab('budget')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'budget'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        Budget
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                                <h2 className="text-xl font-semibold text-slate-900">Welcome back!</h2>
                                <p className="mt-2 text-slate-600">
                                    Your next tuition payment is due in 12 days. Keep an eye on spending and make sure your budget stays balanced.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-xl bg-white p-5 shadow-sm">
                                    <p className="text-sm text-slate-500">Recent payment</p>
                                    <p className="mt-3 text-lg font-semibold text-slate-900">$450 - Cafeteria card top-up</p>
                                    <p className="mt-2 text-sm text-slate-500">Completed 2 days ago</p>
                                </div>
                                <div className="rounded-xl bg-white p-5 shadow-sm">
                                    <p className="text-sm text-slate-500">Next due</p>
                                    <p className="mt-3 text-lg font-semibold text-slate-900">Library subscription - $75</p>
                                    <p className="mt-2 text-sm text-slate-500">Due in 7 days</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'transactions' && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-slate-900">Latest transactions</h2>
                            <div className="space-y-3">
                                <div className="rounded-xl border border-slate-200 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-900">Course Material</p>
                                            <p className="text-sm text-slate-500">May 2 · Purchased books</p>
                                        </div>
                                        <p className="font-semibold text-blue-600">-$120.00</p>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-900">Campus Dining</p>
                                            <p className="text-sm text-slate-500">May 1 · Meal plan top-up</p>
                                        </div>
                                        <p className="font-semibold text-blue-600">-$45.00</p>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-900">Scholarship Credit</p>
                                            <p className="text-sm text-slate-500">Apr 28 · Received support</p>
                                        </div>
                                        <p className="font-semibold text-emerald-600">+$500.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'budget' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-slate-900">Budget overview</h2>
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">Monthly budget</p>
                                        <p className="mt-2 text-2xl font-bold text-slate-900">$1,200</p>
                                    </div>
                                    <p className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                        72% used
                                    </p>
                                </div>
                                <div className="mt-4 h-3 rounded-full bg-slate-200">
                                    <div className="h-3 rounded-full bg-blue-600" style={{ width: '72%' }} />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl bg-white p-5 shadow-sm">
                                    <p className="text-sm text-slate-500">Housing</p>
                                    <p className="mt-3 text-lg font-semibold text-slate-900">$430</p>
                                </div>
                                <div className="rounded-xl bg-white p-5 shadow-sm">
                                    <p className="text-sm text-slate-500">Food</p>
                                    <p className="mt-3 text-lg font-semibold text-slate-900">$220</p>
                                </div>
                                <div className="rounded-xl bg-white p-5 shadow-sm">
                                    <p className="text-sm text-slate-500">Transport</p>
                                    <p className="mt-3 text-lg font-semibold text-slate-900">$110</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}   