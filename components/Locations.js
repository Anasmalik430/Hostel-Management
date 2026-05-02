"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const locationData = [
  {
    name: "Uttara, Dhaka",
    hostels: 4,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800",
    desc: "The educational hub with serene surroundings and premium connectivity."
  },
  {
    name: "Banani, Dhaka",
    hostels: 3,
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=800",
    desc: "Upscale living with vibrant nightlife and corporate proximity."
  },
  {
    name: "Dhanmondi, Dhaka",
    hostels: 2,
    image: "https://images.unsplash.com/photo-1503174971373-b1f69850bbd6?auto=format&fit=crop&q=80&w=800",
    desc: "Traditional charm meets modern cafes and lakeside tranquility."
  },
  {
    name: "Gulshan, Dhaka",
    hostels: 5,
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=800",
    desc: "The diplomat zone. Absolute security and international standards."
  }
];

const Locations = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden" id="locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">Our Presence</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-[#111111] italic tracking-tighter leading-none uppercase">
            ELITE <span className="text-[#DC2626]">NEIGHBORHOODS</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            We've carefully selected the most premium and secure zones in the city to ensure your lifestyle never compromises.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {locationData.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-[48px] overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-700"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <motion.img 
                  src={loc.image} 
                  alt={loc.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.5 }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
                <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-2 text-[#2563EB]">
                    <FaMapMarkerAlt size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{loc.hostels} Available Stays</span>
                  </div>
                  <h4 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                    {loc.name.split(',')[0]} <br />
                    <span className="text-[#2563EB]">{loc.name.split(',')[1]}</span>
                  </h4>
                  <p className="text-sm text-white/60 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {loc.desc}
                  </p>
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-2 text-white font-black text-[10px] uppercase tracking-widest pt-4"
                  >
                    <span>View Hostels</span>
                    <FaArrowRight className="text-[#2563EB]" />
                  </motion.button>
                </div>
              </div>

              {/* Dynamic Number */}
              <div className="absolute top-8 right-8 h-12 w-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="text-sm font-black italic">0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Locations;
