"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";

// Curated high-quality hostel/interior images from Unsplash
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  // "https://images.unsplash.com/photo-1555854817-5b2147a52d0f?q=80&w=2070&auto=format&fit=crop",
];

const Hero = ({ onSearch }) => {
  const { rooms } = useData();
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [roomType, setRoomType] = useState("Any Type");
  const [gender, setGender] = useState("Any");
  const [rentCycle, setRentCycle] = useState("Any Cycle");

  // Carousel State
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const dynamicLocations = useMemo(() => {
    const locs = rooms.map(r => r.location).filter(Boolean);
    return Array.from(new Set(locs));
  }, [rooms]);

  const filteredLocations = useMemo(() => {
    return dynamicLocations.filter(loc =>
      loc.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [dynamicLocations, locationSearch]);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ location, roomType, gender, rentCycle });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 flex items-center overflow-hidden bg-white md:bg-black">
      {/* BACKGROUND IMAGE CAROUSEL */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }} // 0.6 opacity keeps text readable
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentImg]})` }}
          />
        </AnimatePresence>
        {/* Overlay to ensure UI remains readable */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/40 to-transparent z-1 hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 space-y-10 text-center lg:text-left">
            <div>
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em]">Premium Living Reimagined</span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-[#111111] leading-[0.95] italic tracking-tighter">
                YOUR HOME <br /><span className="text-[#2563EB] relative">BEYOND <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} className="absolute -bottom-2 left-0 w-full h-3 text-[#DC2626]/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" /></motion.svg></span> <br />BOUNDARIES.
              </motion.h1>
            </div>
            <motion.p variants={itemVariants} className="text-xl text-slate-800 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Ditch the basic. Join a community that inspires. Modern hostels with high-end security, ultra-fast WiFi, and curated spaces.
            </motion.p>
          </motion.div>

          {/* Right Content - Search Widget */}
          <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} className="lg:col-span-5 relative">
            <div className="bg-white md:bg-white/80 md:backdrop-blur-3xl p-5 md:p-8 sm:p-10 rounded-3xl md:rounded-[40px] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] md:border md:border-white/50 relative z-10 group overflow-visible">
              <div className="space-y-8 relative z-10">
                <div className="text-center lg:text-left mb-2">
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] italic">Quick Search</h3>
                </div>
                
                {/* Location Input */}
                <div className="relative">
                  <div className={`flex items-center p-3 md:p-5 rounded-[20px] md:rounded-3xl border transition-all duration-500 cursor-pointer ${showDropdown ? 'border-[#2563EB] bg-white ring-4 md:ring-8 ring-blue-50/50' : 'border-slate-200 bg-slate-50 md:bg-white/50 hover:bg-white hover:border-slate-300'}`} onClick={() => setShowDropdown(!showDropdown)}>
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mr-3 md:mr-4"><MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#2563EB]" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
                      <p className={`font-bold text-xs md:text-sm truncate ${location ? 'text-[#111111]' : 'text-slate-400'}`}>{location || "All Locations"}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-500 text-slate-300 ${showDropdown ? 'rotate-180 text-[#2563EB]' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-[110%] left-0 right-0 bg-white border border-slate-100 rounded-3xl shadow-2xl z-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
                          <Search size={15} className="text-slate-400" />
                          <input type="text" autoFocus placeholder="Search area..." value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} onClick={(e) => e.stopPropagation()} className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-700" />
                        </div>
                        <div className="max-h-56 overflow-y-auto">
                           <div className="px-6 py-4 hover:bg-blue-50 cursor-pointer font-bold text-sm text-slate-600 transition-all" onClick={() => { setLocation(""); setShowDropdown(false); }}>All Locations</div>
                           {filteredLocations.map((loc) => (
                             <div key={loc} className="px-6 py-4 hover:bg-blue-50 cursor-pointer font-bold text-sm text-slate-600 transition-all flex justify-between items-center group" onClick={() => { setLocation(loc); setShowDropdown(false); }}>
                               <span>{loc}</span>
                               <ArrowRight size={13} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                             </div>
                           ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  <div className="flex flex-col p-3 md:p-5 rounded-[20px] md:rounded-3xl border border-slate-200 bg-slate-50 md:bg-white/50 hover:bg-white transition-all">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2">Room Type</p>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="bg-transparent font-bold text-[#111111] outline-none appearance-none cursor-pointer text-xs md:text-sm">
                      <option value="Any Type">Any Type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Triple">Triple</option>
                    </select>
                  </div>
                  <div className="flex flex-col p-3 md:p-5 rounded-[20px] md:rounded-3xl border border-slate-200 bg-slate-50 md:bg-white/50 hover:bg-white transition-all">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2">Residing</p>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="bg-transparent font-bold text-[#111111] outline-none appearance-none cursor-pointer text-xs md:text-sm">
                      <option value="Any">Any</option>
                      <option value="Male Only">Male</option>
                      <option value="Female Only">Female</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex flex-col p-3 md:p-5 rounded-[20px] md:rounded-3xl border border-slate-200 bg-slate-50 md:bg-white/50 hover:bg-white transition-all">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2">Rent Cycle</p>
                    <select value={rentCycle} onChange={(e) => setRentCycle(e.target.value)} className="bg-transparent font-bold text-[#111111] outline-none appearance-none cursor-pointer text-xs md:text-sm">
                      <option value="Any Cycle">Any Cycle</option>
                      <option value="Day">Daily</option>
                      <option value="Week">Weekly</option>
                      <option value="Month">Monthly</option>
                      <option value="Year">Yearly</option>
                    </select>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSearchClick} className="w-full relative group overflow-hidden bg-[#111111] text-white py-4 md:py-6 rounded-2xl md:rounded-[30px] font-black text-xs md:text-sm uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <span className="relative z-10 flex items-center justify-center space-x-3"><span>Search Available Stays</span><ArrowRight size={20} className="translate-x-0 group-hover:translate-x-2 transition-transform" /></span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;