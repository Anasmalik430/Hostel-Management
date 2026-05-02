"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-32 bg-white overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Content */}
          <div className="space-y-10 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-block bg-blue-50 px-5 py-2 rounded-full border border-blue-100"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">The Comfort Story</span>
            </motion.div>
            
            <h3 className="text-5xl md:text-7xl font-black text-[#111111] italic tracking-tighter leading-[0.95] uppercase">
              WE ARE NOT JUST <br />
              <span className="text-[#DC2626]">HOSTELS.</span> <br />
              WE ARE <span className="text-[#2563EB]">COMMUNITY.</span>
            </h3>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              Founded in 2021, Comfort Hub was born from a simple realization: students deserve better than just four walls. They deserve an ecosystem that nurtures ambition.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <div className="h-1 w-12 bg-[#2563EB] rounded-full" />
                <h4 className="text-lg font-black italic uppercase tracking-tight">Our Mission</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  To provide a seamless, secure, and inspiring living experience for the next generation of leaders.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-1 w-12 bg-[#DC2626] rounded-full" />
                <h4 className="text-lg font-black italic uppercase tracking-tight">Our Vision</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Scaling to 50+ cities across the country, making elite hospitality accessible to every student.
                </p>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="pt-6"
            >
              <button className="bg-[#111111] text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-[#2563EB] transition-all shadow-2xl">
                Read Our Full Story
              </button>
            </motion.div>
          </div>

          {/* Right: Visual Experience */}
          <div className="relative order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="About us team" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
            </motion.div>
            
            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl z-0" 
            />
            <motion.div 
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[32px] shadow-2xl z-20 hidden sm:block border border-slate-50"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2563EB]">
                   <span className="text-xl font-black italic">5+</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of</p>
                  <p className="text-sm font-black text-[#111111] uppercase italic">Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
