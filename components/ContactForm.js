"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "8801833376299";
    const text = `*NEW CONTACT INQUIRY*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Message:* ${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-slate-50/50">
      {/* Dynamic Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-red-500/5 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div>
              <span className="text-[10px] md:text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] italic mb-3 md:mb-4 block">Get In Touch</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter text-[#111111] leading-[0.95]">
                READY TO <br />
                <span className="text-blue-600">UPGRADE</span> YOUR <br />
                LIVING?
              </h2>
            </div>
            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
              Send us a quick message. Our elite support team will guide you to the perfect residency in minutes.
            </p>
            
            <div className="flex justify-center lg:justify-start pt-4">
              <div className="flex items-center space-x-4 group">
                <div className="h-12 w-12 md:h-14 md:w-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Call Protocol</p>
                  <Link href="tel:+8801833376299" className="text-base md:text-lg font-bold text-[#111111] hover:text-blue-600 transition-colors tracking-tight">
                    +880 1833376299
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Optimized Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[48px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-5 md:space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50/50 border border-slate-100 py-4 md:py-5 pl-12 md:pl-14 pr-6 rounded-2xl md:rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700 text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      type="tel" 
                      required
                      placeholder="+880 17..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50/50 border border-slate-100 py-4 md:py-5 pl-12 md:pl-14 pr-6 rounded-2xl md:rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700 text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                  <div className="relative group">
                    <MessageSquare size={16} className="absolute left-5 top-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <textarea 
                      required
                      rows="3"
                      placeholder="What are you looking for?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-50/50 border border-slate-100 py-4 md:py-5 pl-12 md:pl-14 pr-6 rounded-2xl md:rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700 resize-none text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#111111] text-white py-5 md:py-6 rounded-2xl md:rounded-[30px] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 shadow-xl hover:bg-blue-600 transition-all duration-500"
              >
                <span>Initiate Contact</span>
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;