"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("Any Type");
  const [gender, setGender] = useState("Male Only");
  const [showDropdown, setShowDropdown] = useState(false);

  const locations = ["Uttara, Dhaka", "Banani, Dhaka", "Dhanmondi, Dhaka", "Gulshan, Dhaka"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ location, roomType, gender });
    }
  };
  

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]" 
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-50/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-10 text-center lg:text-left"
          >
            <div>
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Premium Living Reimagined
                </span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-[#111111] leading-[0.95] italic tracking-tighter">
                YOUR HOME <br />
                <span className="text-[#2563EB] relative">
                  BEYOND
                  <motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#DC2626]/20" viewBox="0 0 100 10" preserveAspectRatio="none"
                  >
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </motion.svg>
                </span> <br />
                BOUNDARIES.
              </motion.h1>
            </div>

            <motion.p variants={itemVariants} className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Ditch the basic. Join a community that inspires. Modern hostels with 
              high-end security, ultra-fast WiFi, and curated spaces.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-8 items-center pt-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5, zIndex: 10 }}
                    className="h-14 w-14 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm flex-shrink-0 cursor-pointer"
                  >
                    <img src={`https://i.pravatar.cc/150?u=res${i}`} alt="user" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              <div className="text-left border-l border-slate-100 pl-8">
                <p className="text-xl font-black text-[#111111] italic">2.5K+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Verified Residents</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Search Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="lg:col-span-5 relative"
          >
            {/* The Widget */}
            <div className="bg-white/70 backdrop-blur-3xl p-8 sm:p-10 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-white relative z-10 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all duration-700" />
              
              <div className="space-y-8 relative z-10">
                <div className="text-center lg:text-left mb-2">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] italic">Quick Search</h3>
                </div>
                
                {/* Location Selection */}
                <div className="relative">
                  <div 
                    className={`group relative flex items-center p-5 rounded-3xl border transition-all duration-500 cursor-pointer ${
                      showDropdown ? 'border-[#2563EB] bg-white ring-8 ring-blue-50/50' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200'
                    }`}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
                      <p className={`font-bold text-sm ${location ? 'text-[#111111]' : 'text-slate-400'}`}>
                        {location || "Select your area..."}
                      </p>
                    </div>
                    <svg className={`w-4 h-4 transition-transform duration-500 text-slate-300 ${showDropdown ? 'rotate-180 text-[#2563EB]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* High-end Dropdown */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-[110%] left-0 right-0 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-2xl z-50 py-3 overflow-hidden"
                      >
                        {locations.map((loc) => (
                          <motion.div 
                            key={loc}
                            whileHover={{ x: 5 }}
                            className="px-6 py-4 hover:bg-blue-50/50 cursor-pointer transition-all flex justify-between items-center group/item"
                            onClick={() => {
                              setLocation(loc);
                              setShowDropdown(false);
                            }}
                          >
                            <span className="font-bold text-slate-600 group-hover/item:text-[#2563EB]">{loc}</span>
                            <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all">
                              <span className="text-[#2563EB] text-[10px]">→</span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group relative">
                    <div className="flex flex-col p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Room Type</p>
                      <select 
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="bg-transparent font-bold text-[#111111] outline-none appearance-none cursor-pointer"
                      >
                        <option>Any Type</option>
                        <option>Single Bed</option>
                        <option>2-Bed Shared</option>
                      </select>
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="flex flex-col p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Residing</p>
                      <select 
                         value={gender}
                         onChange={(e) => setGender(e.target.value)}
                        className="bg-transparent font-bold text-[#111111] outline-none appearance-none cursor-pointer"
                      >
                        <option>Male Only</option>
                        <option>Female Only</option>
                        <option>Mixed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSearchClick}
                  className="w-full relative group overflow-hidden bg-[#111111] text-white py-6 rounded-[30px] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:shadow-inner"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Search Available Stays</span>
                    <svg className="w-5 h-5 translate-x-0 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.button>
              </div>
            </div>

            {/* Decorative Elements around Widget */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 h-20 w-20 bg-red-50 rounded-3xl border border-red-100 flex items-center justify-center z-0 rotate-12"
            >
              <div className="h-10 w-10 bg-red-100 rounded-2xl flex items-center justify-center text-[#DC2626]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15l-2 5L9 9l11 4-5 2zm0 0l4 4" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;