"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppWidget = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "919690170502";
  const message = encodeURIComponent("Hello ComfortHub Team! I'm interested in your services.");
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
      className="fixed bottom-8 right-8 z-[9999]"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        // Recurring Micro-Animation every 5 seconds
        animate={{
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.15, rotate: 0 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] group overflow-hidden border-2 border-white/20"
      >
        {/* Constant Subtle Pulse Aura */}
        <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-10" />
        
        {/* Internal Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <FaWhatsapp size={32} className="relative z-10" />
        
        {/* Premium Tooltip */}
        <div className="absolute right-full mr-5 bg-[#111111] text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none border border-white/5">
          Elite Support Active
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-8 border-transparent border-l-[#111111]" />
        </div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppWidget;
