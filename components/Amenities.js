"use client";
import React from "react";
import { motion } from "framer-motion";

const amenities = [
  {
    title: "Always Online",
    desc: "100Mbps dedicated fiber-optics for your late-night research.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    size: "large",
  },
  {
    title: "Security",
    desc: "Biometric entry and 24/7 AI monitoring.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    size: "small",
  },
  {
    title: "Chef Meals",
    desc: "Nutrition-focused 3-course meals.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    size: "small",
  },
  {
    title: "Community",
    desc: "A vibrant ecosystem of ambitious students.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    size: "large",
  },
];

const Amenities = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden" id="amenities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row mb-16 gap-8 items-end">
          <div className="md:w-2/3 space-y-6">
            <motion.div className="inline-block bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">The Lifestyle Upgrade</span>
            </motion.div>
            <h2 className="text-4xl md:text-8xl font-black text-[#111111] italic tracking-tighter leading-[0.9] uppercase">
              NOT JUST A ROOM, <br />
              <span className="text-[#2563EB]">AN EXPERIENCE.</span>
            </h2>
          </div>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {amenities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`relative group rounded-[32px] md:rounded-[48px] overflow-hidden bg-white border border-slate-100 shadow-sm transition-all duration-500
                ${index === 0 || index === 3 ? 'col-span-2' : 'col-span-1'} 
                ${item.size === 'large' ? 'lg:col-span-2 h-[300px] md:h-[450px]' : 'h-[300px] md:h-[450px]'}`}
            >
              <div className="absolute inset-0 z-0">
                <motion.img 
                  src={item.image} 
                  alt={item.title}
                  whileHover={{ scale: 1.1 }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/40 to-transparent" />
              </div>

              <div className="absolute inset-0 z-10 p-6 md:p-10 flex flex-col justify-end text-white">
                <div className="space-y-2 md:space-y-4">
                  <h4 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">{item.title}</h4>
                  <p className="text-white/70 font-medium text-[11px] md:text-sm leading-relaxed max-w-sm line-clamp-2 md:line-clamp-none">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;