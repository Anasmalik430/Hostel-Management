"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { useData } from "@/context/DataContext";

const SkeletonCard = () => (
  <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 animate-pulse">
    <div className="h-64 bg-slate-50 w-full" />
    <div className="p-8 space-y-4">
      <div className="h-6 bg-slate-50 w-3/4 rounded-lg" />
      <div className="h-4 bg-slate-50 w-1/2 rounded-lg" />
      <div className="pt-6"><div className="h-10 bg-slate-50 w-full rounded-xl" /></div>
    </div>
  </div>
);

const HostelCards = ({ filters }) => {
  const { rooms, guestRooms, isLoading } = useData();
  const [activeStayType, setActiveStayType] = React.useState("hostel"); // "hostel" or "guest"

  // Filter logic: Case-insensitive location match and type/gender match
  const displayRooms = useMemo(() => {
    const currentList = activeStayType === "hostel" ? rooms : guestRooms;
    
    return currentList.filter((room) => {
      // Basic availability check
      if (!room.isAvailable) return false;

      // Location match: Case-insensitive (Hostels have location, GuestRooms don't explicitly in schema but we can assume they are at the main property or show all)
      // Note: GuestRoom doesn't have a 'location' field in schema currently. 
      // I'll skip location filter for guest rooms unless added, or treat as always matching if empty.
      const matchesLocation = activeStayType === "guest" || !filters?.location || 
        (room.location && room.location.toLowerCase().includes(filters.location.toLowerCase()));

      // Type match (Single/Double for Hostel, AC/Luxury for Guest)
      const matchesType = !filters?.roomType || filters.roomType === "Any Type" || 
        room.type === filters.roomType;

      // Gender match (Only for Hostel)
      const matchesGender = activeStayType === "guest" || !filters?.gender || filters.gender === "Any" || 
        room.gender === filters.gender;

      // Rent Cycle match
      const matchesCycle = !filters?.rentCycle || filters.rentCycle === "Any Cycle" || 
        room.rentCycle === filters.rentCycle;

      return matchesLocation && matchesType && matchesGender && matchesCycle;
    });
  }, [rooms, guestRooms, filters, activeStayType]);

  const handleRequestViewing = (room) => {
    const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "8801833376299";
    const typeLabel = activeStayType === "hostel" ? "HOSTEL ROOM" : "GUEST ROOM";
    const message = `*ELITE STAYS - VIEWING REQUEST*\n\n` +
      `Hello! I'm interested in viewing a ${typeLabel}.\n\n` +
      `*Unit Name:* ${room.name}\n` +
      (room.location ? `*Location:* ${room.location}\n` : "") +
      (room.roomNumber ? `*Room No:* ${room.roomNumber}\n` : "") +
      `*Price:* ৳${room.price}/${room.rentCycle || (activeStayType === 'hostel' ? 'month' : 'day')}\n` +
      `*Unit Type:* ${room.type}\n` +
      (room.gender ? `*Category:* ${room.gender}\n\n` : "\n") +
      `Please let me know when I can visit. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
        </div>
      </div>
    );
  }

  return (
    <div id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/30">
      {/* Header Section */}
      <div className="mb-16 flex flex-col lg:flex-row justify-between items-center gap-10 relative">
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-[#111111] leading-none">
            DISCOVER <br /><span className="text-blue-600">ELITE</span> STAYS
          </h2>
          
          {/* Toggle Switch */}
          <div className="inline-flex p-1.5 bg-white rounded-full border border-slate-200 shadow-xl shadow-blue-500/5">
            <button 
              onClick={() => setActiveStayType("hostel")}
              className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${activeStayType === "hostel" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-slate-600"}`}
            >
              Hostel Rooms
            </button>
            <button 
              onClick={() => setActiveStayType("guest")}
              className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${activeStayType === "guest" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-slate-600"}`}
            >
              Guest Rooms
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-black italic text-[#8EABDC] uppercase tracking-widest mb-1">
            Showing {displayRooms.length} {activeStayType === "hostel" ? "Hostel" : "Guest"} Results
          </p>
          <div className="h-1.5 w-24 bg-[#4F86F7] ml-auto rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {displayRooms.map((room) => (
            <motion.div
              layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              key={room._id}
              className="group cursor-pointer relative bg-white rounded-[48px] overflow-hidden border border-slate-100 hover:border-blue-500/20 transition-all duration-700 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.11)]"
            >
              <div className="relative h-[320px] overflow-hidden">
                <img src={room.image || "https://images.unsplash.com/photo-1555854817-40e098ee7f5d?q=80&w=2070&auto=format&fit=crop"} alt={room.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-40" />
                <div className="absolute top-5 left-5 flex flex-row *:text-[10px] gap-2 *:px-4 *:py-2 *:font-mono">
                  {activeStayType === "hostel" ? (
                    <>
                      <span className="bg-white/90 backdrop-blur-md text-[#111111] rounded-2xl font-black uppercase tracking-widest shadow-xl border border-white/20">{room.type}</span>
                      <span className="bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">{room.gender}</span>
                    </>
                  ) : (
                    <>
                      <span className="bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">{room?.gender}</span>
                      <span className="bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">{room.sharing}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#111111] group-hover:text-blue-600 transition-colors">{room.name}</h3>
                    <div className="flex items-center text-slate-400 text-xs font-bold italic"><MapPin size={14} className="mr-2 text-blue-500" />{room.location || "Elite Guest Stay"}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{room.rentCycle || (activeStayType === 'hostel' ? 'Monthly' : 'Daily')}</p>
                    <p className="text-3xl font-black text-blue-600 italic leading-none mt-1">৳{room.price}</p>
                  </div>
                </div>

                {/* Amenities Display */}
                {room.amenities && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:border-blue-100 transition-all duration-500"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
                <motion.button 
                  onClick={() => handleRequestViewing(room)}
                  whileHover={{ gap: "24px" }} 
                  className="w-full cursor-pointer bg-[#111111] text-white p-6 rounded-[30px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-xl hover:bg-blue-600"
                >
                  <span>Request Viewing</span><ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {displayRooms.length === 0 && !isLoading && (
          <div className="col-span-full py-32 text-center bg-white rounded-[48px] border border-dashed border-slate-200">
            <p className="text-slate-300 font-black italic uppercase tracking-[0.3em] text-sm">No elite {activeStayType} units match your search protocol.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelCards;