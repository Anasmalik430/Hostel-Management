"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Find a Room", href: "#properties" },
        { name: "Amenities", href: "#amenities" },
        { name: "Locations", href: "#locations" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "List Property", href: "/auth/me" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Story", href: "#about" },
        { name: "Contact", href: "#faq" },
      ],
    },
  ];

  return (
    <footer className="bg-[#111111] border-t border-white/5 relative overflow-hidden text-white">
      {/* Visual Decor */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-red-600/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Identity - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center group cursor-pointer"
            >
              <img src="/logo.png" alt="logo" className="h-11 w-auto brightness-0 invert" />
              <div className="ml-3 flex flex-col justify-center leading-none">
                <span className="text-2xl font-black italic tracking-tighter text-white uppercase">
                  COMFORT<span className="text-[#2563EB]">HUB</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mt-1">
                  The Elite Stay
                </span>
              </div>
            </motion.div>
            
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              Redefining student living with premium spaces, absolute security, and a community built for the future.
            </p>

            <div className="flex items-center space-x-5">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#2563EB' }}
                  className="text-slate-500 transition-all duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links - Each takes 2 columns */}
          {footerLinks.map((column, i) => (
            <div key={i} className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-8 italic">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-[14px] font-bold text-slate-400 hover:text-white transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-[2px] bg-[#2563EB] mr-0 group-hover:mr-2 transition-all opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter - Takes 2 columns (or remaining) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-8 italic">Stay Ahead</h4>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email Portal" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#2563EB] focus:bg-white/10 transition-all text-white"
                />
              </div>
              <button className="w-full bg-white text-[#111111] py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#2563EB] hover:text-white transition-all shadow-xl flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <FaArrowRight />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              © 2026 COMFORT HUB. DIGITAL EXPERIENCE
            </p>
          </div>
          
          <div className="flex items-center">
             
             <Link href={"https://nodeskdeveloper.in"} className="flex items-center space-x-2 opacity-60 hover:opacity-100 transition-all cursor-pointer group">
               <span className="text-[10px] font-black text-white italic tracking-tighter">DESIGNED & BUILD BY <span className="text-[#2563EB]">NODESKDEVELOPER</span></span>
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;