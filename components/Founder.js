"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebookF, FaWhatsapp, FaQuoteLeft, FaAward, FaUserCheck, FaLightbulb } from "react-icons/fa";

const Founder = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const milestones = [
    { icon: <FaAward />, text: "Visionary Leader" },
    { icon: <FaUserCheck />, text: "1000+ Residents" },
    { icon: <FaLightbulb />, text: "Elite Innovation" },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-600/5 -z-10 skew-x-[-15deg] transform translate-x-1/4" />
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-40 left-10 w-64 h-64 border border-blue-100 rounded-full -z-10 opacity-50"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-40 right-20 w-96 h-96 bg-slate-50 rounded-full -z-10 blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Image Side with Parallax & Floating Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.2)] group">
              <img 
                src="/founder.png" 
                alt="Faysal Rahman Jony" 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Floating Milestones */}
            <div className="absolute -right-8 top-1/4 space-y-4 z-20 hidden md:block">
              {milestones.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  key={i}
                  className="bg-white/90 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-xl flex items-center space-x-3"
                >
                  <div className="text-blue-600">{m.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]">{m.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-[16px] border-blue-600/10 rounded-[48px] -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-[2px] w-12 bg-blue-600" />
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em] italic">The Architect of Comfort</span>
              </div>
              <h2 className="text-6xl sm:text-7xl font-black italic uppercase tracking-tighter text-[#111111] leading-[0.9]">
                FAYSAL RAHMAN <br />
                <span className="text-blue-600 underline decoration-slate-100 decoration-8 underline-offset-8">JONY</span>
              </h2>
              <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center">
                Founder & CEO <span className="mx-4 h-1 w-1 bg-slate-300 rounded-full" /> ComfortHostelBD
              </p>
            </div>

            <div className="relative group">
              <FaQuoteLeft className="text-blue-600/10 text-8xl absolute -top-10 -left-10 -z-10 transition-transform group-hover:scale-110 duration-500" />
              <p className="text-2xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8">
                "We are not just changing addresses; we are elevating lifestyles. ComfortHostelBD is built on the pillars of safety, luxury, and community."
              </p>
            </div>

            {/* Premium Social Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <motion.a 
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.facebook.com/jhon.jony.585"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group bg-[#111111] px-8 py-5 rounded-[28px] flex items-center justify-between shadow-2xl transition-all"
              >
                <div className="relative z-10">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-blue-200 transition-colors">Facebook Profile</p>
                  <p className="text-sm font-black text-white uppercase italic">Connect Now</p>
                </div>
                <div className="relative z-10 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                  <FaFacebookF />
                </div>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/8801833376299"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group bg-white border-2 border-slate-100 px-8 py-5 rounded-[28px] flex items-center justify-between shadow-lg hover:border-[#25D366] transition-all"
              >
                <div className="relative z-10">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Chat</p>
                  <p className="text-sm font-black text-[#111111] uppercase italic">Send Message</p>
                </div>
                <div className="relative z-10 w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <FaWhatsapp />
                </div>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Founder;
