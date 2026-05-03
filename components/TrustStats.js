"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const Counter = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/,/g, ""));
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

const TrustStats = () => {
  const stats = [
    { label: "Active Residents", value: "500", suffix: "+" },
    { label: "Verified Hostels", value: "10", suffix: "+" },
    { label: "Cities Covered", value: "4", suffix: "+" },
    { label: "Safety Rating", value: "4.9", suffix: "/5", isFloat: true },
  ];

  return (
    <section className="py-24 bg-[#111111] relative overflow-hidden">
      {/* Premium Background Decor */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group flex flex-col items-center lg:items-start text-center lg:text-left space-y-3"
            >
              {/* Animated Number */}
              <div className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none flex items-baseline">
                {stat.isFloat ? (
                  <span className="flex">
                    <Counter value="4" />
                    <span>.9</span>
                    <span className="text-[#2563EB] ml-1">{stat.suffix}</span>
                  </span>
                ) : (
                  <span className="text-white group-hover:text-[#2563EB] transition-colors duration-500">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="flex items-center space-x-3">
                <div className="h-px w-6 bg-slate-700 group-hover:w-10 group-hover:bg-[#2563EB] transition-all duration-500 hidden sm:block" />
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-slate-200 transition-colors">
                  {stat.label}
                </p>
              </div>

              {/* Glowing Indicator Overlay (Mobile only) */}
              <div className="absolute -inset-4 bg-white/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700 lg:hidden" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;