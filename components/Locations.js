"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const locationData = [
  {
    name: "Gazipur, Dhaka",
    hostels: 3,
    image: "/gazipur.webp",
      // "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=800",
    desc: "Upscale living with vibrant nightlife.",
  },
  {
    name: "Dhanmondi, Dhaka",
    hostels: 2,
    image: "/dhanmondi.webp",
      // "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=800",
    desc: "Traditional charm meets modern cafes.",
  },
  // {
  //   name: "Gazipur, Dhaka",
  //   hostels: 4,
  //   image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800",
  //   desc: "The educational hub with serene surroundings and premium connectivity."
  // },
  // {
  //   name: "Dhanmondi, Dhaka",
  //   hostels: 5,
  //   image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=800",
  //   desc: "The diplomat zone. Absolute security and international standards."
  // }
];

const Locations = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden" id="locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB]">
              Our Presence
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-[#111111] italic tracking-tighter leading-none uppercase">
            ELITE <span className="text-[#DC2626]">NEIGHBORHOODS</span>
          </h2>
        </div>

        {/* Bento Grid Logic */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
          {locationData.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group cursor-pointer relative h-[350px] md:h-[500px] rounded-[32px] md:rounded-[48px] overflow-hidden bg-white shadow-sm border border-slate-100 transition-all duration-700
                ${index === 0 || index === 3 ? "col-span-2" : "col-span-2"} 
                lg:col-span-1`} // Back to 1 column on large screens
            >
              <div className="absolute inset-0 z-0">
                <motion.img
                  src={loc.image}
                  alt={loc.name}
                  whileHover={{ scale: 1.1 }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent" />
              </div>

              <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end text-white">
                <div className="space-y-2 md:space-y-4">
                  <div className="flex items-center space-x-2 text-[#2563EB]">
                    <FaMapMarkerAlt size={12} />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                      {loc.hostels} Stays
                    </span>
                  </div>
                  <h4 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">
                    {loc.name.split(",")[0]}
                  </h4>
                  <p className="hidden md:block text-sm text-white/60 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {loc.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
