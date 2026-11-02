'use client';

import { useState } from 'react';
import {
  Bell,
  Flame,
  IndianRupee,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  QrCode,
  ShieldCheck,
  ArrowUpRight,
  Printer,
  Calendar,
  Building2,
  ChevronRight,
  Filter
} from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  receiptNo: string;
  description: string;
  category: 'Registration' | 'Exam Fee' | 'TMA' | 'Study Material' | 'ODE' | 'Verification';
  date: string;
  amount: number;
  mode: 'UPI (PhonePe/GPay)' | 'Net Banking (SBI)' | 'RuPay Debit Card' | 'Bharat QR';
  status: 'Completed' | 'Pending' | 'Exempted';
  referenceNo: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-001',
    receiptNo: 'NIOS/2026/FEE/98210',
    description: 'Senior Secondary Admission & Registration (Stream 1)',
    category: 'Registration',
    date: '12 Jan 2026',
    amount: 2500,
    mode: 'UPI (PhonePe/GPay)',
    status: 'Completed',
    referenceNo: 'UPI98421049281'
  },
  {
    id: 'tx-002',
    receiptNo: 'NIOS/2026/FEE/98432',
    description: 'Public Examination Fee - April/May 2026 (5 Subjects)',
    category: 'Exam Fee',
    date: '15 Feb 2026',
    amount: 1250,
    mode: 'Net Banking (SBI)',
    status: 'Completed',
    referenceNo: 'SBIN002941824'
  },
  {
    id: 'tx-003',
    receiptNo: 'NIOS/2026/FEE/98670',
    description: 'Science Practical Lab Examination Fee (Physics & Chem)',
    category: 'Exam Fee',
    date: '28 Feb 2026',
    amount: 360,
    mode: 'RuPay Debit Card',
    status: 'Completed',
    referenceNo: 'RUPAY7810294'
  },
  {
    id: 'tx-004',
    receiptNo: 'NIOS/2026/FEE/98901',
    description: 'Tutor Marked Assignment (TMA) Digital Submission & Verification',
    category: 'TMA',
    date: '10 Mar 2026',
    amount: 500,
    mode: 'Bharat QR',
    status: 'Completed',
    referenceNo: 'BQR194820149'
  },
  {
    id: 'tx-005',
    receiptNo: 'NIOS/2026/FEE/99120',
    description: 'Printed Self-Learning Material (SLM) Courier Delivery',
    category: 'Study Material',
    date: '25 Mar 2026',
    amount: 500,
    mode: 'UPI (PhonePe/GPay)',
    status: 'Pending',
    referenceNo: 'UPIPending774'
  },
  {
    id: 'tx-006',
    receiptNo: 'NIOS/2026/FEE/99340',
    description: 'On-Demand Examination (ODE) Slot Booking (Mathematics)',
    category: 'ODE',
    date: '02 Apr 2026',
    amount: 750,
    mode: 'Net Banking (SBI)',
    status: 'Pending',
    referenceNo: 'PendingGate441'
  }
];

export default function FinancePage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'calculator'>('overview');
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTransactions = filterCategory === 'all'
    ? MOCK_TRANSACTIONS
    : MOCK_TRANSACTIONS.filter(t => t.category === filterCategory);

  const totalPaid = MOCK_TRANSACTIONS.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
  const totalPending = MOCK_TRANSACTIONS.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);

  // Fee calculator state
  const [calcStream, setCalcStream] = useState<'secondary' | 'sr_secondary'>('sr_secondary');
  const [subjectCount, setSubjectCount] = useState<number>(5);
  const [practicalCount, setPracticalCount] = useState<number>(2);
  const [hasTOC, setHasTOC] = useState<boolean>(false);
  const [wantsHardCopyBooks, setWantsHardCopyBooks] = useState<boolean>(true);

  const calculatedFee = (
    (calcStream === 'secondary' ? 1800 : 2000) +
    (Math.max(0, subjectCount - 5) * 350) +
    (practicalCount * 120) +
    (hasTOC ? 360 : 0) +
    (wantsHardCopyBooks ? 500 : 0)
  );

  return (
    <DashboardLayout
      title="Student Finance & Receipts"
      subtitle="Track your NIOS fee breakdown, download verified receipts, and pay academic dues"
    >
      <div className="p-4 sm:p-6 space-y-6 max-w-8xl mx-auto">
        {/* Header Banner */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 tracking-wide">
                GOVERNMENT OF INDIA • NIOS OFFICIAL FEE PORTAL
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" /> 80G Tax Exempt
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Fee Receipts & Account Ledger
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Student Enrollment: <span className="font-semibold text-slate-800">{activeUser.details?.enrollmentNo || 'NIOS/2026/SEC/10492'}</span> •
              Stream: <span className="font-semibold text-slate-800">Stream-1 Block-1 (Session 2025-2026)</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('calculator')}
              className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-sm shadow-blue-900/20"
            >
              <CreditCard className="h-4 w-4" /> Calculate / Pay Fees
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Fees Paid</p>
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-black text-slate-900 flex items-center">
              <IndianRupee className="h-6 w-6 stroke-[2.5]" />
              {totalPaid.toLocaleString('en-IN')}
            </p>
            <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
              ✓ All exam & admission receipts cleared
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Upcoming Dues</p>
              <div className="h-9 w-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-black text-amber-600 flex items-center">
              <IndianRupee className="h-6 w-6 stroke-[2.5]" />
              {totalPending.toLocaleString('en-IN')}
            </p>
            <p className="mt-2 text-xs text-slate-500">Due before 15 April 2026 (ODE + SLM)</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Fee Concession / Waiver</p>
              <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Flame className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-black text-blue-900 flex items-center">
              <IndianRupee className="h-6 w-6 stroke-[2.5]" />
              1,500
            </p>
            <p className="mt-2 text-xs text-blue-600 font-medium">Applied under Beti Bachao / PwD subsidy</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Study Center</p>
              <div className="h-9 w-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-lg font-bold text-slate-900 truncate">AI No. 270104</p>
            <p className="mt-2 text-xs text-slate-500 truncate">Govt Model Sr Sec School, New Delhi</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            Fee Structure & Status
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'transactions'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            Official Receipts ({MOCK_TRANSACTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'calculator'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            Fee Calculator & Payment Gateway
          </button>
        </div>

        {/* Tab 1: Fee Structure & Status */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50/80 via-white to-amber-50/50 rounded-2xl border border-blue-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-900 mb-2">
                  Academic Year 2025-2026
                </span>
                <h3 className="text-xl font-bold text-slate-900">NIOS Secondary / Sr. Secondary Fee Schedule</h3>
                <p className="mt-1 text-sm text-slate-600">
                  All fees are strictly regulated as per the Gazette of India notification. Fees once paid are non-refundable.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('transactions')}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-blue-600" /> View All Receipts
                </button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left 2 Cols: Itemized Breakdown */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Itemized Fee Ledger
                </h3>

                <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
                  {MOCK_TRANSACTIONS.map((item) => (
                    <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                      <div className="flex items-start gap-3.5">
                        <div className={`mt-0.5 p-2.5 rounded-xl ${item.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                          {item.status === 'Completed' ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.description}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                            <span>Receipt: <strong className="text-slate-700">{item.receiptNo}</strong></span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <span className="font-medium text-slate-600">{item.mode}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="text-lg font-extrabold text-slate-900 flex items-center">
                          <IndianRupee className="h-4 w-4 stroke-[2.5]" />
                          {item.amount.toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                            }`}>
                            {item.status}
                          </span>
                          <button
                            onClick={() => setSelectedReceipt(item)}
                            className="p-1 rounded-lg text-blue-600 hover:bg-blue-50 text-xs font-semibold flex items-center gap-1"
                            title="View / Print Receipt"
                          >
                            <FileText className="h-3.5 w-3.5" /> Receipt
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Important Guidelines & Quick Action */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  Official NIOS Guidelines
                </h3>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p>
                      <strong className="text-slate-800">Exam Fee Submission:</strong> Exam fees for October-November session open 60 days in advance without late charges.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p>
                      <strong className="text-slate-800">TMA Exemption:</strong> Only students who submit assignments on the student portal before deadlines are marked for internal awards.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p>
                      <strong className="text-slate-800">DigiLocker Integration:</strong> All official paid receipts are cryptographically signed and synched to the DigiLocker repository.
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 bg-blue-50/50 -mx-5 -mb-5 p-5 rounded-b-2xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
                      <CreditCard className="h-4 w-4" /> ACCEPTED PAYMENT GATEWAYS
                    </div>
                    <p className="text-xs text-slate-500">
                      SBI e-Pay, Bharat BillPay (BBPS), HDFC PayZapp, Paytm UPI, and RuPay Debit Card. Zero convenience charges for RuPay cards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Transactions & Receipts */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">Filter By Category:</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Registration">Admission & Registration</option>
                  <option value="Exam Fee">Public & Practical Exam</option>
                  <option value="TMA">TMA Submission</option>
                  <option value="Study Material">Study Material (SLM)</option>
                  <option value="ODE">On-Demand Examination (ODE)</option>
                </select>
              </div>

              <span className="text-xs text-slate-500">
                Showing <strong>{filteredTransactions.length}</strong> transactions
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Receipt No & Date</th>
                      <th className="py-3.5 px-4">Description</th>
                      <th className="py-3.5 px-4">Payment Mode</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <p className="font-bold text-blue-900">{tx.receiptNo}</p>
                          <p className="text-xs text-slate-500">{tx.date}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-slate-800">{tx.description}</p>
                          <p className="text-xs text-slate-400">Ref: {tx.referenceNo}</p>
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-600 whitespace-nowrap">
                          {tx.mode}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap font-extrabold text-slate-900">
                          <span className="flex items-center">
                            <IndianRupee className="h-3.5 w-3.5 stroke-[2.5]" />
                            {tx.amount.toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${tx.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                            }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedReceipt(tx)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-blue-900 text-xs font-bold transition-all inline-flex items-center gap-1.5"
                          >
                            <Download className="h-3.5 w-3.5" /> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Fee Calculator & Payment Gateway */}
        {activeTab === 'calculator' && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Calculator Options */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">NIOS Fee Estimator & Calculator</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Configure your courses, practicals, and credit transfer to calculate exact official fees.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Course Level / Stream
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCalcStream('secondary')}
                      className={`p-3.5 rounded-xl border text-left font-semibold text-sm transition-all ${calcStream === 'secondary'
                          ? 'border-blue-900 bg-blue-50 text-blue-950 ring-2 ring-blue-900/10'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      <p className="font-bold">Secondary (Class 10)</p>
                      <p className="text-xs text-slate-500 mt-0.5">Base Fee: ₹1,800 (5 subjects)</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcStream('sr_secondary')}
                      className={`p-3.5 rounded-xl border text-left font-semibold text-sm transition-all ${calcStream === 'sr_secondary'
                          ? 'border-blue-900 bg-blue-50 text-blue-950 ring-2 ring-blue-900/10'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      <p className="font-bold">Senior Secondary (Class 12)</p>
                      <p className="text-xs text-slate-500 mt-0.5">Base Fee: ₹2,000 (5 subjects)</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Total Number of Subjects: <strong className="text-blue-900 text-sm">{subjectCount}</strong>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="7"
                    value={subjectCount}
                    onChange={(e) => setSubjectCount(Number(e.target.value))}
                    className="w-full accent-blue-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>5 Subjects (Standard)</span>
                    <span>6 Subjects (+₹350)</span>
                    <span>7 Subjects (+₹700)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Subjects with Practical Lab Components: <strong className="text-blue-900 text-sm">{practicalCount}</strong>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={practicalCount}
                    onChange={(e) => setPracticalCount(Number(e.target.value))}
                    className="w-full accent-blue-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0 Practicals</span>
                    <span>1 (₹120)</span>
                    <span>2 (₹240)</span>
                    <span>3 (₹360)</span>
                    <span>4 (₹480)</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3 border-t border-slate-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasTOC}
                      onChange={(e) => setHasTOC(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      Include Transfer of Credit (TOC) from Recognized Board (+₹360)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wantsHardCopyBooks}
                      onChange={(e) => setWantsHardCopyBooks(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      Printed Self-Learning Material (Books delivered via India Post Speed Post) (+₹500)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Total Fee & Instant Payment Gateway */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-blue-800/80">
                  <span className="text-xs uppercase tracking-widest text-blue-300 font-bold">
                    Official Fee Breakdown
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Calculated in Real-Time
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-blue-200">
                    <span>Base Course Fee ({calcStream === 'secondary' ? 'Secondary' : 'Sr. Secondary'})</span>
                    <span className="font-semibold text-white">₹{calcStream === 'secondary' ? '1,800' : '2,000'}</span>
                  </div>
                  {subjectCount > 5 && (
                    <div className="flex justify-between text-blue-200">
                      <span>Additional Subjects ({subjectCount - 5} × ₹350)</span>
                      <span className="font-semibold text-white">₹{(subjectCount - 5) * 350}</span>
                    </div>
                  )}
                  {practicalCount > 0 && (
                    <div className="flex justify-between text-blue-200">
                      <span>Practical Examination Labs ({practicalCount} × ₹120)</span>
                      <span className="font-semibold text-white">₹{practicalCount * 120}</span>
                    </div>
                  )}
                  {hasTOC && (
                    <div className="flex justify-between text-blue-200">
                      <span>Transfer of Credit (TOC) Fee</span>
                      <span className="font-semibold text-white">₹360</span>
                    </div>
                  )}
                  {wantsHardCopyBooks && (
                    <div className="flex justify-between text-blue-200">
                      <span>Printed SLM Study Material & Postal Dispatch</span>
                      <span className="font-semibold text-white">₹500</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-blue-800/80 flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Total Payable Amount</p>
                    <p className="text-3xl sm:text-4xl font-black text-white mt-1 flex items-center">
                      <IndianRupee className="h-7 w-7 stroke-[2.5]" />
                      {calculatedFee.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span className="text-xs text-blue-300">Inclusive of all taxes</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => alert(`Redirecting to secure NIOS Payment Gateway for amount ₹${calculatedFee}...`)}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" /> Proceed to Secure Payment Gateway
                </button>
                <div className="flex items-center justify-center gap-4 text-xs text-blue-300">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 256-Bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Instant Receipt Generation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Printable Receipt Modal */}
        <AnimatePresence>
          {selectedReceipt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedReceipt(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                {/* Receipt Header */}
                <div className="text-center pb-4 border-b border-slate-200">
                  <p className="text-xs font-bold text-blue-900 uppercase tracking-widest">
                    राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्थान
                  </p>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    NATIONAL INSTITUTE OF OPEN SCHOOLING
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    (An Autonomous Organisation Under Ministry of Education, Govt. of India)
                  </p>
                  <div className="mt-3 inline-block px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    OFFICIAL E-FEE RECEIPT (ACKNOWLEDGEMENT)
                  </div>
                </div>

                {/* Receipt Content */}
                <div className="mt-6 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <p className="text-slate-500 text-xs">Receipt Number</p>
                      <p className="font-bold text-slate-900">{selectedReceipt.receiptNo}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Payment Date & Time</p>
                      <p className="font-bold text-slate-900">{selectedReceipt.date}, 11:42 AM IST</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Student Enrollment No</p>
                      <p className="font-bold text-slate-900">{activeUser.details?.enrollmentNo || 'NIOS/2026/SEC/10492'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Student Full Name</p>
                      <p className="font-bold text-slate-900">{activeUser.name}</p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-xs font-bold text-slate-700">
                        <tr>
                          <th className="p-3">Fee Particulars</th>
                          <th className="p-3 text-right">Amount (INR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        <tr>
                          <td className="p-3">{selectedReceipt.description}</td>
                          <td className="p-3 text-right font-bold">₹{selectedReceipt.amount.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr className="bg-slate-50 font-extrabold text-slate-900">
                          <td className="p-3">Total Paid</td>
                          <td className="p-3 text-right text-emerald-700">₹{selectedReceipt.amount.toLocaleString('en-IN')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-500 pt-2">
                    <div>
                      <span>Payment Method: </span>
                      <strong className="text-slate-800">{selectedReceipt.mode}</strong>
                    </div>
                    <div>
                      <span>Bank Ref / UTR: </span>
                      <strong className="text-slate-800">{selectedReceipt.referenceNo}</strong>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 flex-shrink-0 text-amber-700 mt-0.5" />
                    <p>
                      This is a computer-generated electronic receipt certified by the Controller of Examinations, NIOS. No physical signature is required.
                    </p>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-2"
                  >
                    <Printer className="h-4 w-4" /> Print Receipt
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Downloaded receipt ${selectedReceipt.receiptNo}.pdf`)}
                      className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      <Download className="h-4 w-4" /> Download PDF
                    </button>
                    <button
                      onClick={() => setSelectedReceipt(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}