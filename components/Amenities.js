"use client";
import React from "react";
import { motion } from "framer-motion";

const amenities = [
  {
    title: "Always Online",
    desc: "100Mbps dedicated fiber-optics for your late-night research and gaming marathons.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    size: "large",
  },
  {
    title: "Fortress Security",
    desc: "Biometric entry and 24/7 AI-monitored surveillance.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    size: "small",
  },
  {
    title: "Chef-Curated Meals",
    desc: "Nutrition-focused 3-course meals served fresh every day.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    size: "small",
  },
  {
    title: "Elite Community",
    desc: "A vibrant ecosystem of ambitious students and professionals.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    size: "large",
  },
];

const Amenities = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden" id="amenities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row mb-20 gap-12 items-end">
          <div className="md:w-2/3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-block bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">The Lifestyle Upgrade</span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-[#111111] italic tracking-tighter leading-[0.9] uppercase">
              NOT JUST A ROOM, <br />
              <span className="text-[#2563EB]">AN EXPERIENCE.</span>
            </h2>
          </div>
          <div className="md:w-1/3">
            <p className="text-lg text-slate-500 font-medium leading-relaxed italic border-l-4 border-[#DC2626] pl-6">
              We've replaced standard services with world-class hospitality, ensuring you focus on what truly matters.
            </p>
          </div>
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {amenities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group rounded-[48px] overflow-hidden bg-white border border-slate-100 shadow-sm 
                ${item.size === 'large' ? 'lg:col-span-2 h-[450px]' : 'h-[450px]'}`}
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0">
                <motion.img 
                  src={item.image} 
                  alt={item.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.5 }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
                <motion.div
                   whileHover={{ x: 10 }}
                   className="space-y-4"
                >
                  <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 group-hover:bg-[#2563EB] transition-colors duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-black italic tracking-tighter uppercase">{item.title}</h4>
                  <p className="text-white/70 font-medium text-sm leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </motion.div>
                
                {/* Visual Accent */}
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="text-[60px] font-black text-white/5 italic select-none">0{index + 1}</div>
                </div>
              </div>

              {/* Interactive Corner */}
              <div className="absolute top-0 right-0 p-8">
                <motion.div 
                  className="h-2 w-2 rounded-full bg-white group-hover:w-12 transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
          
        </div>

        {/* Bottom CTA Overlay */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <button className="group relative px-12 py-6 bg-[#111111] text-white rounded-[32px] font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
            <span className="relative z-10">Discover Full Catalogue</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div> */}

      </div>
    </section>
  );
};

export default Amenities;