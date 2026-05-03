"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebookF, FaWhatsapp, FaQuoteLeft, FaAward, FaUserCheck, FaLightbulb } from "react-icons/fa";

const Founder = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const milestones = [
    { icon: <FaAward />, text: "Visionary Leader" },
    { icon: <FaUserCheck />, text: "1000+ Residents" },
    { icon: <FaLightbulb />, text: "Elite Innovation" },
  ];

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden" id="founder">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[70%] lg:w-[45%] h-full bg-slate-50/50 -z-10 skew-x-[-12deg] transform translate-x-1/4" />
      
      <motion.div 
        style={{ y: y1 }}
        className="hidden lg:block absolute top-20 left-10 w-72 h-72 border border-blue-50 rounded-full -z-10"
      />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
          
          {/* Left: Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="relative z-10 rounded-[40px] md:rounded-[60px] overflow-hidden bg-slate-100 shadow-2xl">
              <img 
                src="/founder.png" 
                alt="Faysal Rahman Jony" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Desktop Floating Chips */}
            <div className="absolute -right-10 top-1/4 space-y-4 z-20 hidden lg:block">
              {milestones.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  key={i}
                  className="bg-white p-4 rounded-2xl shadow-lg border border-slate-50 flex items-center space-x-3"
                >
                  <span className="text-blue-600 text-lg">{m.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-slate-800">{m.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Mobile Milestones - Compact Row */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 lg:hidden">
              {milestones.map((m, i) => (
                <div key={i} className="bg-slate-50 px-4 py-2 rounded-full flex items-center space-x-2 border border-slate-100">
                  <span className="text-blue-600 text-xs">{m.icon}</span>
                  <span className="text-[9px] font-bold uppercase text-slate-700">{m.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content Side */}
          <div className="w-full lg:w-[55%] space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">The Architect</span>
              </div>
              
              <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                FAYSAL RAHMAN <br />
                <span className="text-blue-600">JONY</span>
              </h2>
              
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                Founder & CEO <span className="mx-2 text-slate-200">|</span> ComfortHostelBD
              </p>
            </div>

            <div className="relative group max-w-2xl mx-auto lg:mx-0">
              <FaQuoteLeft className="text-blue-600/5 text-7xl absolute -top-8 -left-4 lg:-left-10 -z-10" />
              <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-6 md:pl-10">
                "We are not just changing addresses; we are elevating lifestyles. ComfortHostelBD is built on the pillars of safety, luxury, and community."
              </p>
            </div>

            {/* Action Buttons: Perfect Mobile/Desktop Hybrid */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a 
                whileTap={{ scale: 0.97 }}
                href="https://www.facebook.com/jhon.jony.585"
                className="flex-1 bg-slate-900 hover:bg-blue-600 text-white p-5 rounded-3xl flex items-center justify-between transition-colors shadow-xl group"
              >
                <div className="text-left">
                  <p className="text-[8px] uppercase opacity-50 font-bold tracking-widest">Connect</p>
                  <p className="text-sm font-black italic uppercase">Facebook</p>
                </div>
                <FaFacebookF className="group-hover:rotate-12 transition-transform" />
              </motion.a>

              <motion.a 
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/8801833376299"
                className="flex-1 bg-white border border-slate-200 p-5 rounded-3xl flex items-center justify-between shadow-md hover:border-green-500 transition-all group"
              >
                <div className="text-left">
                  <p className="text-[8px] uppercase text-slate-400 font-bold tracking-widest">Inquiry</p>
                  <p className="text-sm font-black italic uppercase text-slate-900">WhatsApp</p>
                </div>
                <FaWhatsapp className="text-green-500 group-hover:scale-125 transition-transform" />
              </motion.a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Founder;