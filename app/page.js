"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import React, { useState } from "react";
import HostelCards from "@/components/HostelCards";
import Locations from "@/components/Locations";
import AboutUs from "@/components/AboutUs";
import Amenities from "@/components/Amenities";
import Footer from "@/components/Footer";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const Home = () => {
  // Default: no filters active → show ALL available rooms
  const [filters, setFilters] = useState({
    location: "",       // "" = all locations
    roomType: "Any Type", // "Any Type" = show all types
    gender: "Any",      // "Any" = show all genders
  });

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    const el = document.getElementById("properties");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero onSearch={handleSearch} />
      <HostelCards filters={filters} />
      <Locations />
      <AboutUs />
      <Amenities />
      <TrustStats />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Home;
