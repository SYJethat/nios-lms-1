'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building2,
  MapPin,
  User,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Lock,
  Play,
  IndianRupee,
  Layers,
  Award
} from 'lucide-react';
import { Course, saveEnrolledCourseId, saveEnrollmentOrder } from '@/lib/courses-data';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface CourseEnrollModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (courseId: string) => void;
}

export default function CourseEnrollModal({
  course,
  isOpen,
  onClose,
  onSuccess
}: CourseEnrollModalProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address form fields
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Arjun Sharma',
    email: user?.email || 'student@nios.edu.in',
    phone: '9876543210',
    streetAddress: 'B-42, Shanti Kunj, Sector 62',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201309',
    paymentMethod: 'upi' as 'upi' | 'card' | 'netbanking',
    upiId: 'student@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/29',
    cardCvv: '•••',
    bankName: 'State Bank of India'
  });

  const [txnId, setTxnId] = useState('');

  if (!isOpen || !course) return null;

  const discount = 150;
  const platformFee = 25;
  const finalAmount = Math.max(0, course.price - discount + platformFee);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedTxn = `TXN-NIOS-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      setTxnId(generatedTxn);

      // Save to persistence
      saveEnrolledCourseId(course.id);
      saveEnrollmentOrder({
        transactionId: generatedTxn,
        courseId: course.id,
        courseTitle: course.titleEnglish,
        courseTitleHindi: course.titleHindi,
        amount: finalAmount,
        date: new Date().toISOString(),
        studentName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.streetAddress}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod: formData.paymentMethod.toUpperCase(),
        status: 'SUCCESS'
      });

      setIsProcessing(false);
      setStep(3);
      onSuccess(course.id);
    }, 1800);
  };

  const handleGoToMyCourses = () => {
    onClose();
    router.push('/student/my-courses');
  };

  const handleWatchVideoNow = () => {
    onClose();
    router.push(`/student/my-courses/${course.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 my-8"
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={course.thumbnail}
              alt={course.titleEnglish}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg shrink-0"
            />
            <div className="space-y-1 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 text-blue-300 text-[10px] font-black uppercase tracking-wider">
                <Sparkles size={12} /> NIOS Verified Enrollment
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {course.titleHindi}
              </h3>
              <p className="text-sm font-medium text-slate-300 line-clamp-1">
                {course.titleEnglish}
              </p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step >= 1 ? 'bg-white text-blue-900' : 'bg-white/20 text-white'}`}>
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Address Details</span>
            </div>
            <div className="w-12 h-0.5 bg-white/20" />
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step >= 2 ? 'bg-white text-blue-900' : 'bg-white/20 text-white'}`}>
                2
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-white/20" />
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step === 3 ? 'bg-emerald-400 text-slate-900' : 'bg-white/20 text-white'}`}>
                ✓
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Confirmed</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: ADDRESS DETAILS ── */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleAddressSubmit}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <MapPin size={20} className="text-blue-900" />
                  <div>
                    <h4 className="text-base font-black text-slate-900">Student & Shipping Address (छात्र एवं पता विवरण)</h4>
                    <p className="text-xs text-slate-500 font-medium">For dispatching official NIOS physical SLM books and verified certificates</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name (पूरा नाम) *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all"
                        placeholder="Arjun Sharma"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address (ईमेल) *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all"
                        placeholder="student@nios.edu.in"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number (मोबाइल नंबर) *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Pin Code (पिन कोड) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all"
                      placeholder="201309"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Complete House / Street Address (मकान एवं गली का पता) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all"
                      placeholder="Flat No, Building Name, Street / Road"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      City / District (शहर / जिला) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all"
                      placeholder="Noida"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      State (राज्य) *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all"
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
                      <option value="Delhi NCR">Delhi NCR (दिल्ली)</option>
                      <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                      <option value="Bihar">Bihar (बिहार)</option>
                      <option value="West Bengal">West Bengal (पश्चिम बंगाल)</option>
                      <option value="Rajasthan">Rajasthan (राजस्थान)</option>
                      <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                      <option value="Tamil Nadu">Tamil Nadu (தமிழ்நாடு)</option>
                      <option value="Karnataka">Karnataka (ಕರ್ನಾಟಕ)</option>
                      <option value="Gujarat">Gujarat (ગુજરાત)</option>
                      <option value="Punjab">Punjab (ਪੰਜਾਬ)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-blue-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-800 shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Proceed to Payment <ArrowRight size={16} />
                  </button>
                </div>
              </motion.form>
            )}

            {/* ── STEP 2: PAYMENT ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-blue-900" />
                    <div>
                      <h4 className="text-base font-black text-slate-900">Payment Gateway (भुगतान विवरण)</h4>
                      <p className="text-xs text-slate-500 font-medium">Select your preferred payment method</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-900 hover:underline cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Edit Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left: Payment Method Selection */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${formData.paymentMethod === 'upi'
                            ? 'border-blue-900 bg-blue-50/60 text-blue-900 font-black shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                      >
                        <QrCode size={24} className={formData.paymentMethod === 'upi' ? 'text-blue-900' : 'text-slate-400'} />
                        <span className="text-xs uppercase tracking-wider">UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${formData.paymentMethod === 'card'
                            ? 'border-blue-900 bg-blue-50/60 text-blue-900 font-black shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                      >
                        <CreditCard size={24} className={formData.paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-400'} />
                        <span className="text-xs uppercase tracking-wider">Cards</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${formData.paymentMethod === 'netbanking'
                            ? 'border-blue-900 bg-blue-50/60 text-blue-900 font-black shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                      >
                        <Building2 size={24} className={formData.paymentMethod === 'netbanking' ? 'text-blue-900' : 'text-slate-400'} />
                        <span className="text-xs uppercase tracking-wider">NetBanking</span>
                      </button>
                    </div>

                    {/* Method details */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                      {formData.paymentMethod === 'upi' && (
                        <div className="space-y-3">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Enter UPI ID (Google Pay / PhonePe / Paytm / BHIM)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={formData.upiId}
                              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                              placeholder="username@okhdfcbank"
                              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-900"
                            />
                            <button
                              type="button"
                              className="px-4 py-3 bg-blue-900/10 text-blue-900 font-bold text-xs uppercase tracking-wider rounded-xl"
                            >
                              Verify
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Instant auto-debit notification will be sent to your mobile UPI application.
                          </p>
                        </div>
                      )}

                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Card Number (डेबिट / क्रेडिट कार्ड)
                            </label>
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Expiry (MM/YY)
                              </label>
                              <input
                                type="text"
                                value={formData.cardExpiry}
                                onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                CVV
                              </label>
                              <input
                                type="password"
                                value={formData.cardCvv}
                                onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.paymentMethod === 'netbanking' && (
                        <div className="space-y-3">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Choose Your Bank (बैंक का चयन करें)
                          </label>
                          <select
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                          >
                            <option value="State Bank of India">State Bank of India (SBI)</option>
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="ICICI Bank">ICICI Bank</option>
                            <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                            <option value="Bank of Baroda">Bank of Baroda</option>
                            <option value="Axis Bank">Axis Bank</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Bill Summary Card */}
                  <div className="p-5 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                        <IndianRupee size={16} className="text-blue-900" />
                        <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Fee Summary</h5>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Course Enrollment Fee</span>
                          <span className="font-bold">₹{course.price}</span>
                        </div>
                        <div className="flex justify-between text-emerald-600">
                          <span>Govt NIOS Subsidy</span>
                          <span className="font-bold">-₹{discount}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Digital Study Materials</span>
                          <span className="font-bold">₹{platformFee}</span>
                        </div>
                        <div className="pt-3 border-t border-slate-200 flex justify-between text-slate-900 font-black text-sm">
                          <span>Total Payable</span>
                          <span className="text-blue-900 text-lg">₹{finalAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                        <Lock size={12} className="text-emerald-600" /> 256-bit Encrypted Government Payment Node
                      </div>

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={handlePaymentSubmit}
                        className="w-full py-4 rounded-xl bg-blue-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-800 shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>Pay & Complete Enrollment</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: SUCCESS CONFIRMATION ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
                  <CheckCircle2 size={44} />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                    🎉 Payment Successful & Course Enrolled
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    बधाई! आपका नामांकन सफलतापूर्वक पूर्ण हुआ
                  </h3>
                  <p className="text-sm text-slate-600 font-medium max-w-lg mx-auto">
                    You have successfully enrolled in <strong>{course.titleEnglish}</strong>. The course has been added to your <strong>My Courses</strong> library.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-lg mx-auto space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-semibold">Transaction ID:</span>
                    <span className="font-mono font-bold text-slate-900">{txnId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-semibold">Course:</span>
                    <span className="font-bold text-blue-900 truncate max-w-[260px]">{course.titleHindi}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-semibold">Amount Paid:</span>
                    <span className="font-bold text-emerald-700">₹{finalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-semibold">Dispatched To:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[260px]">{formData.city}, {formData.state}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handleGoToMyCourses}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Layers size={16} /> View in My Courses
                  </button>
                  <button
                    onClick={handleWatchVideoNow}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play size={16} /> Start Watching Video Now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
