"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
  { 
    q: "How does the booking process work?", 
    a: "It's entirely digital. Select your property, choose a sub-plan, and pay the token amount. Our onboarding team will contact you within 2 hours for digital KYC and move-in scheduling." 
  },
  { 
    q: "What is included in the monthly rent?", 
    a: "Your rent covers the stay, high-speed WiFi, 3-course nutritious meals, daily housekeeping, and utility electricity (up to certain units). No hidden maintenance charges." 
  },
  { 
    q: "Can I visit the property before booking?", 
    a: "Absolutely. You can schedule a 'Physical Tour' or a 'VR Video Tour' directly from the hostel detail page. Our site managers are available 10 AM - 7 PM." 
  },
  { 
    q: "Is the security deposit refundable?", 
    a: "Yes, the security deposit is 100% refundable. It is returned to your bank account within 7 working days of your move-out date after a basic room audit." 
  },
  { 
    q: "Are there any guest restrictions?", 
    a: "We allow guests during daytime (10 AM - 8 PM) in the common lounges. Overnight stay for guests requires prior management approval for security reasons." 
  }
];

const AccordionItem = ({ faq, isOpen, toggle }) => {
  return (
    <motion.div 
      initial={false}
      className={`mb-4 rounded-[24px] md:rounded-[32px] overflow-hidden border transition-all duration-500 ${
        isOpen ? 'bg-white border-[#2563EB] shadow-[0_15px_30px_rgba(37,99,235,0.06)]' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
      }`}
    >
      <button 
        onClick={toggle}
        className="w-full px-5 py-6 md:px-8 md:py-7 text-left flex justify-between items-center group gap-4"
      >
        <span className={`text-base md:text-lg font-black italic tracking-tight transition-colors duration-500 ${isOpen ? 'text-[#2563EB]' : 'text-[#111111]'}`}>
          {faq.q}
        </span>
        <div className={`shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#2563EB] text-white rotate-45' : 'bg-white text-slate-400 group-hover:text-[#111111]'}`}>
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-6 md:px-8 md:pb-8">
              <div className="h-px w-full bg-slate-100 mb-4 md:mb-6" />
              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 md:gap-20">
          
          {/* Left Column: Context & Support */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-block bg-blue-50 px-5 py-2 rounded-full border border-blue-100"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">Support Center</span>
            </motion.div>
            
            <h3 className="text-4xl md:text-7xl font-black text-[#111111] italic tracking-tighter leading-[1] md:leading-[0.95] uppercase">
              HAVE ANY <br className="hidden md:block" />
              <span className="text-[#DC2626]">DOUBTS?</span>
            </h3>
            
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
              We believe in 100% transparency. If your question isn't listed here, our team is ready to help.
            </p>

            <div className="pt-4 md:pt-8">
              <div className="bg-slate-50 p-6 md:p-8 rounded-[30px] md:rounded-[40px] border border-slate-100 space-y-6">
                <div className="text-center lg:text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Direct Contact</p>
                  <Link href="tel:+8801833376299" className="text-lg md:text-xl font-black text-[#111111] hover:text-[#2563EB] transition-colors break-words">
                    +8801833376299
                  </Link>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Email Inquiry</p>
                  <Link href="mailto:comforthostel.bd2020@gmail.com" className="text-base md:text-xl font-black text-[#111111] hover:text-[#2563EB] transition-colors break-all">
                    comforthostel.bd2020@gmail.com
                  </Link>
                </div>
                <button className="w-full bg-[#111111] text-white py-4 md:py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2563EB] transition-all shadow-xl active:scale-95">
                  Get Support
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                faq={faq} 
                isOpen={openIndex === i} 
                toggle={() => setOpenIndex(openIndex === i ? -1 : i)} 
              />
            ))}
          </div>

        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 -z-10 blur-[100px] opacity-60" />
    </section>
  );
};

export default FAQ;