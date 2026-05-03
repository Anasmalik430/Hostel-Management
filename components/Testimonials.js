"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Kinza Sheikh",
    role: "BCA Student",
    text: "The high-speed WiFi and quiet study zones are a lifesaver. Best hostel experience in Roorkee so far.",
    avatar: "https://i.pravatar.cc/150?u=anas"
  },
  {
    name: "Afzala Khan",
    role: "Medical Intern",
    text: "Security was my main concern. With biometric entry and 24/7 CCTV, I feel completely safe here.",
    avatar: "https://i.pravatar.cc/150?u=areeba"
  },
  {
    name: "Tanni Begum",
    role: "Graphic Designer",
    text: "The community vibes are amazing. Met so many like-minded people in the gaming zone!",
    avatar: "https://i.pravatar.cc/150?u=tanni"
  },
  {
    name: "Samiur Rahman",
    role: "Architecture Student",
    text: "The room design is so ergonomic. It's the first time I've found a hostel that actually feels like home.",
    avatar: "https://i.pravatar.cc/150?u=sami"
  },
  {
    name: "Zoya Malik",
    role: "CS Student",
    text: "Food is the best part. 3-course nutritious meals that actually taste good. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=zoya"
  },
  {
    name: "Ishaan Gupta",
    role: "MBA Aspirant",
    text: "Premium amenities and a very professional management team. They handle everything smoothly.",
    avatar: "https://i.pravatar.cc/150?u=ishaan"
  }
];

const TestimonialCard = ({ t }) => (
  <div className="flex-shrink-0 w-[350px] sm:w-[450px] p-8 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 group mx-4">
    <div className="flex items-center space-x-1 mb-6 text-[#2563EB]">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-xs">★</span>
      ))}
    </div>
    <p className="text-slate-600 font-medium leading-relaxed mb-8 text-lg italic">"{t.text}"</p>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img src={t.avatar} className="h-14 w-14 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 object-cover" alt={t.name} />
        <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white" />
      </div>
      <div>
        <h4 className="text-sm font-black text-[#111111] uppercase italic tracking-tight">{t.name}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role} • Verified Resident</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  // Triple the items to ensure seamless loop
  const row1 = [...testimonials, ...testimonials, ...testimonials];
  const row2 = [[...testimonials].reverse(), ...testimonials, ...testimonials].flat();

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-block bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">Community Reviews</span>
          </motion.div>
          <h3 className="text-5xl md:text-7xl font-black text-[#111111] italic tracking-tighter leading-none uppercase">
            REAL <span className="text-[#DC2626]">VOICES.</span> <br />
            REAL <span className="text-[#2563EB]">HOMES.</span>
          </h3>
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs max-w-xs lg:text-right">
          Join 500+ residents who have found their comfort zone with us.
        </p>
      </div>

      {/* Infinite Marquee Rows */}
      <div className="space-y-8">
        {/* Row 1: Left Moving */}
        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex hover:[animation-play-state:paused]"
          >
            {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </motion.div>
        </div>

        {/* Row 2: Right Moving */}
        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: [-1920, 0] }}
            transition={{ 
              duration: 50, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex hover:[animation-play-state:paused]"
          >
            {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </motion.div>
        </div>
      </div>

      <div className="mt-20 flex justify-center">
         <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-slate-50 px-8 py-3 rounded-full border border-slate-100 flex items-center space-x-3 cursor-pointer hover:bg-white transition-colors"
         >
           <span className="text-[11px] font-black uppercase tracking-widest text-[#111111]">Scroll to explore more stories</span>
           <span className="text-[#2563EB]">↓</span>
         </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;