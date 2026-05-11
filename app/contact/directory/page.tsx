'use client';

import OfficialNav from '@/components/OfficialNav';
import OfficialFooter from '@/components/OfficialFooter';
import BrandingBanner from '@/components/BrandingBanner';
import { Phone, Mail, MapPin, User, Clock } from 'lucide-react';

const contacts = [
  { name: 'Chairman NIOS', designation: 'Chief Executive', phone: '+91-120-2404915', email: 'chairman@nios.ac.in', location: 'HQ Noida' },
  { name: 'Dr. Director (Academic)', designation: 'Sr. Secondary', phone: '+91-120-2404916', email: 'director.academic@nios.ac.in', location: 'HQ Noida' },
  { name: 'Regional Centre Delhi', designation: 'Regional Director', phone: '+91-11-23232184', email: 'rc-delhi@nios.ac.in', location: 'Delhi' },
  { name: 'Grievance Officer', designation: 'Student Support', phone: '+91-120-2404918', email: 'grievance@nios.ac.in', location: 'HQ Noida' },
];

export default function DirectoryPage() {
  return (
    <>
      <BrandingBanner />
      <OfficialNav />

      {/* Hero */}
      <section className="min-h-[50vh] bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full mb-6 mx-auto w-fit">
            <Phone className="w-6 h-6" />
            <span className="font-black uppercase tracking-wider">Contact Directory</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            NIOS Staff Directory
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">Direct contact numbers for Chairman, Directors, Regional Centres and support departments</p>
        </div>
      </section>

      {/* Directory Table */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
              <h2 className="text-3xl font-black text-white mb-1">Key Contacts</h2>
              <p className="text-emerald-100">Direct lines to NIOS leadership and regional offices</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Designation</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contacts.map((contact, i) => (
                    <tr key={i} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="px-6 py-5 font-semibold text-slate-900">{contact.name}</td>
                      <td className="px-6 py-5 text-sm text-slate-700">{contact.designation}</td>
                      <td className="px-6 py-5">
                        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </a>
                      </td>
                      <td className="px-6 py-5">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium break-all">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-6 py-5">
                        <span className="flex items-center gap-2 text-slate-600">
                          <MapPin className="w-4 h-4" />
                          {contact.location}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
              <Phone className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-900 mb-3">Call Us</h3>
              <p className="text-slate-600 mb-6">Mon-Sat 9:30 AM - 5:30 PM</p>
              <div className="space-y-2 text-lg font-semibold text-emerald-600">
                <a href="tel:+911202404915" className="block hover:text-emerald-700">+91-120-2404915</a>
                <a href="tel:+911802424165" className="block hover:text-emerald-700">Toll Free: 1800-180-9393</a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
              <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-900 mb-3">Email Us</h3>
              <p className="text-slate-600 mb-6">Response within 48 hours</p>
              <div className="space-y-1 text-lg font-semibold">
                <a href="mailto:info@nios.ac.in" className="block text-blue-600 hover:text-blue-700">info@nios.ac.in</a>
                <a href="mailto:admission@nios.ac.in" className="block text-blue-600 hover:text-blue-700">admission@nios.ac.in</a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center md:col-span-1">
              <Clock className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-900 mb-3">Office Hours</h3>
              <div className="text-left space-y-2 text-slate-700">
                <div>HQ Noida: 9:30 AM - 5:30 PM</div>
                <div>Regional Centres: 10:00 AM - 5:00 PM</div>
                <div className="text-emerald-600 font-semibold">Open: Mon-Sat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OfficialFooter />
    </>
  );
}

