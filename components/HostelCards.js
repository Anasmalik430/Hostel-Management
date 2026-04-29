"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hostels } from "./card_data";
import { FaStar, FaStarHalf } from "react-icons/fa";

const HostelCards = ({ filters }) => {
  // Logic: 
  // 1. If filters are at default (initial load), show all AVAILABLE hostels.
  // 2. If user has performed a search (filters modified), show all hostels matching criteria (including sold out).
  
  const filteredHostels = useMemo(() => {
    const isDefaultFilter = filters.location === "" && filters.roomType === "Any Type" && filters.gender === "Any";
    
    return hostels.filter((hostel) => {
      // Default view: Show only available
      if (isDefaultFilter) {
        return hostel.isAvailable;
      }

      // Search view: Match criteria
      const matchLocation = filters.location === "" || hostel.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchGender = filters.gender === "Any" || hostel.tags.some(tag => tag.includes(filters.gender));
      const matchRoom = filters.roomType === "Any Type" || hostel.amenities.some(a => a.includes(filters.roomType));
      
      return matchLocation && matchGender && matchRoom;
    });
  }, [filters]);

  return (
    <section className="py-20 md:py-32 bg-white" id="properties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-5 py-2 rounded-full border border-blue-100 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">Properties for you</span>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#111111] italic tracking-tighter leading-[0.9] uppercase">
              DISCOVER <br />
              <span className="text-[#DC2626]">ELITE</span> STAYS
            </h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-right hidden sm:block"
          >
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 italic">Showing {filteredHostels.length} Results</p>
            <div className="h-1 w-24 bg-slate-100 ml-auto rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="h-full bg-[#2563EB]" 
               />
            </div>
          </motion.div>
        </div>

        {/* Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredHostels.length > 0 ? (
              filteredHostels.map((hostel, index) => (
                <motion.div 
                  key={hostel.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer relative bg-white rounded-[48px] overflow-hidden border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500"
                >
                  {/* Image Section */}
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <motion.img 
                      src={hostel.image} 
                      alt={hostel.name}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 1 }}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Status Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                      {!hostel.isAvailable && (
                        <motion.span 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="bg-black/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/10"
                        >
                          Sold Out
                        </motion.span>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {hostel.tags.map((tag) => (
                          <span key={tag} className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider text-[#111111] shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-6 right-6 bg-[#2563EB] text-white px-6 py-3 rounded-3xl shadow-2xl font-black text-base z-10 border border-white/20">
                      ৳{hostel.price}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-[#2563EB] space-x-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em]">{hostel.location}</p>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black text-[#111111] leading-none italic uppercase tracking-tighter">
                          {hostel.name}
                        </h4>
                      </div>
                      <div className="flex justify-center items-center bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 flex-shrink-0">
                        <FaStar className="text-[#2563EB] mr-1.5 h-fit text-xs"/>
                        <span className="text-[10px] font-black text-[#111111]">{hostel.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hostel.amenities.map((item) => (
                        <div key={item} className="bg-slate-50 px-3 py-0.5 grid place-items-center rounded-2xl text-slate-500 border border-slate-100 hover:bg-white hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-default">
                          <span className="text-[10px] font-bold uppercase tracking-tight">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-50">
                      <motion.button 
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-5 rounded-[28px] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 shadow-xl flex items-center justify-center space-x-3 
                          ${hostel.isAvailable 
                            ? 'bg-[#111111] text-white hover:bg-[#2563EB] shadow-blue-500/5' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200'}`}
                        disabled={!hostel.isAvailable}
                      >
                        <span>{hostel.isAvailable ? 'Claim Your Space' : 'Join Waitlist'}</span>
                        {hostel.isAvailable && (
                          <svg className="w-5 h-5 translate-x-0 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full py-32 text-center"
              >
                <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                  <span className="text-4xl text-slate-300">🔍</span>
                </div>
                <h3 className="text-3xl font-black text-[#111111] italic uppercase tracking-tighter">No Elite Space Found</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto mt-4">We couldn't find a stay matching those exact elite criteria. Try adjusting your search.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.location.reload()}
                  className="mt-10 px-8 py-4 bg-[#111111] text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl"
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HostelCards;