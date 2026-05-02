"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Phone, MessageSquare, ArrowRight } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "919690170502";
    const text = `*NEW CONTACT INQUIRY*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Message:* ${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/50">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] italic mb-4 block">Get In Touch</span>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-[#111111] leading-none">
                READY TO <br />
                <span className="text-blue-600">UPGRADE</span> YOUR <br />
                LIVING?
              </h2>
            </div>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
              Send us a quick message. Our elite support team will guide you to the perfect residency in minutes.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-4 group">
                <div className="h-14 w-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Protocol</p>
                  <p className="text-lg font-bold text-[#111111]">+91 96901 70502</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 sm:p-12 rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50/50 border border-slate-100 py-5 pl-14 pr-6 rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      type="tel" 
                      required
                      placeholder="+88 017********"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50/50 border border-slate-100 py-5 pl-14 pr-6 rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                  <div className="relative group">
                    <MessageSquare size={18} className="absolute left-5 top-6 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <textarea 
                      required
                      rows="4"
                      placeholder="Tell us what you're looking for..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-50/50 border border-slate-100 py-5 pl-14 pr-6 rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700 resize-none"
                    />
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#111111] text-white py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-4 shadow-2xl hover:bg-blue-600 transition-all duration-500"
              >
                <span>Initiate Contact</span>
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
