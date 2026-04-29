"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import React, { useState } from "react";
import HostelCards from "@/components/HostelCards";
import Amenities from "@/components/Amenities";
import Footer from "@/components/Footer";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const Home = () => {
  const [filters, setFilters] = useState({
    location: "",
    roomType: "Any Type",
    gender: "Any"
  });

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero onSearch={handleSearch} />
      <HostelCards filters={filters} />
      <Amenities />
      <TrustStats />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Home;
