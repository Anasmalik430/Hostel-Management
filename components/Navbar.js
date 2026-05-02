"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Properties", href: "#properties" },
    { name: "Amenities", href: "#amenities" },
    { name: "Locations", href: "#locations" },
    { name: "About Us", href: "#about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className={`relative flex justify-between items-center px-4 sm:px-8 rounded-full transition-all duration-500 ${
              isScrolled
                ? "bg-white/90 py-12 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-slate-200/50 h-16"
                : "bg-white/50 py-15 backdrop-blur-sm h-20 border border-transparent"
            }`}
          >
            {/* Logo Section */}
            <motion.div
              layout
              className="flex items-center group cursor-pointer"
            >
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="ml-3 flex flex-col justify-center leading-none">
                <span className="text-xl font-black tracking-tighter text-[#111111] uppercase italic">
                  COMFORT<span className="text-[#2563EB]">HUB</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.3em] text -slate-400 uppercase mt-0.5">
                  The Elite Stay
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-5 py-2.5 text-[13px] font-bold text-slate-600 hover:text-[#111111] transition-all group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-x-2 bottom-1.5 h-[2px] bg-[#2563EB] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/auth/login")}
                className="hidden cursor-pointer xl:block text-[13px] font-bold text-[#111111] hover:text-[#2563EB] px-4 transition-colors"
              >
                List Property
              </button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/+919690170502?text=Hello!%20I%20need%20your%20service"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden cursor-pointer lg:flex relative group bg-[#111111] text-white px-8 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-widest overflow-hidden shadow-lg"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-[#2563EB] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
              </motion.a>

              {/* Hamburger Icon */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-3 bg-[#111111] text-white rounded-2xl active:scale-95 transition-all shadow-lg"
              >
                <div className="space-y-1.5 w-6">
                  <div className="h-0.5 w-6 bg-white rounded-full" />
                  <div className="h-0.5 w-4 bg-white rounded-full" />
                  <div className="h-0.5 w-6 bg-white rounded-full" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Modern Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[90%] max-w-sm bg-white z-[201] lg:hidden shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center">
                  <img src="/logo.png" alt="logo" className="h-10 w-auto" />
                  <span className="ml-2 text-xl font-black italic uppercase">
                    COMFORT<span className="text-[#2563EB]">HUB</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-[#111111]"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-5 text-3xl font-black text-[#111111] italic border-b border-slate-50 flex justify-between items-center group uppercase tracking-tighter"
                  >
                    {link.name}
                    <span className="text-[#2563EB] transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#111111] text-white py-6 rounded-[28px] font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3"
                >
                  <span>Contact Us Now</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </motion.button>
                <button className="w-full bg-slate-50 text-[#111111] py-6 rounded-[28px] font-black text-xs uppercase tracking-widest border border-slate-200">
                  Book Virtual Tour
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
