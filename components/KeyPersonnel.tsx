'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';

const personnel = [
  {
    role: "Hon'ble President of India",
    name: "Smt. Droupadi Murmu",
    image: "https://www.presidentofindia.gov.in/sites/default/files/2025-04/president_of_india.jpg",
    links: ["Official Profile", "Speeches"]
  },
  {
    role: "Hon'ble Prime Minister",
    name: "Shri Narendra Modi",
    image: "https://www.pmindia.gov.in/wp-content/uploads/2025/12/01.jpg",
    links: ["Official Website", "Mann Ki Baat"]
  },
  {
    role: "Union Minister of Education",
    name: "Shri Dharmendra Pradhan",
    image: "https://nitm.ac.in/convocation2021/assets/img/portfolio/1.png",
    links: ["Profile", "Initiatives"]
  },
  {
    role: "Chairperson, NIOS",
    name: "Prof. Akhilesh Mishra",
    image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202507/professor-akhilesh-mishra-takes-charge-at-national-institute-of-open-schooling-232640593-16x9_0.jpg", // Placeholder for actual Chairperson's official photo
    links: ["Message", "Profile"]
  }
];

export default function KeyPersonnel() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="w-1.5 h-8 bg-blue-700 rounded-full" />
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Key Personalities</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {personnel.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-100 transition-colors">
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 right-2 bg-blue-700 text-white p-2 rounded-full shadow-lg border-2 border-white">
                    <ExternalLink size={12} />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 mb-1">
                    {person.role}
                  </h4>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {person.name}
                  </h3>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {person.links.map(link => (
                    <button 
                      key={link}
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Chairperson Message Brief */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Quote size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-24 h-24 rounded-full border-4 border-blue-400 overflow-hidden shrink-0 shadow-xl">
               <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202507/professor-akhilesh-mishra-takes-charge-at-national-institute-of-open-schooling-232640593-16x9_0.jpg" alt="Chairperson" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xl italic font-serif leading-relaxed mb-4">
                "Our mission at NIOS is to 'reach the unreached'. Through AI-powered adaptive learning, we are bringing world-class education to every corner of India, ensuring that no learner is left behind."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-blue-400" />
                <span className="font-bold uppercase tracking-widest text-blue-200">Prof. Akhilesh Mishra, Chairperson NIOS</span>
              </div>
            </div>
            <button className="md:ml-auto px-8 py-3 bg-white text-blue-900 font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-50 transition-colors shrink-0">
              Read Chairperson's Message
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
