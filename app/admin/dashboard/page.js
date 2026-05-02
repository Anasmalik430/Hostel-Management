"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  LayoutDashboard,
  Home,
  Settings,
  LogOut,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DoorOpen,
  Bed,
  MapPin,
  Menu,
  Clock,
  Users2,
} from "lucide-react";
import { useData } from "@/context/DataContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { hostels, rooms, isLoading, refreshData } = useData();
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [hostelFormData, setHostelFormData] = useState({
    name: "",
    location: "",
    image: "",
    isAvailable: true,
    tags: "",
    amenities: "",
  });

  const [roomFormData, setRoomFormData] = useState({
    name: "",
    hostelId: "",
    type: "Single",
    price: "",
    isAvailable: true,
    location: "",
    image: "",
    rentUntil: null,
    rentMonths: 0,
    gender: "Male Only",
  });

  // No local fetchData — we use context's refreshData instead

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
        "unsigned_upload_portfolio",
    );
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );
      const fileData = await res.json();
      if (type === "hostel") {
        setHostelFormData((prev) => ({ ...prev, image: fileData.secure_url }));
      } else {
        setRoomFormData((prev) => ({ ...prev, image: fileData.secure_url }));
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleHostelSubmit = async (e) => {
    e.preventDefault();
    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `/api/hostels/${editingItem._id}`
      : "/api/hostels";
    const processedData = {
      ...hostelFormData,
      price: 0,
      tags:
        typeof hostelFormData.tags === "string"
          ? hostelFormData.tags.split(",").map((t) => t.trim())
          : hostelFormData.tags,
      amenities:
        typeof hostelFormData.amenities === "string"
          ? hostelFormData.amenities.split(",").map((a) => a.trim())
          : hostelFormData.amenities,
    };
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        await refreshData();
      } else {
        const errData = await res.json();
        alert("Error: " + errData.error);
      }
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    const method = editingItem ? "PUT" : "POST";
    const url = editingItem ? `/api/rooms/${editingItem._id}` : "/api/rooms";
    let finalRentUntil = roomFormData.rentUntil;
    if (!roomFormData.isAvailable && roomFormData.rentMonths > 0) {
      const date = new Date();
      date.setMonth(date.getMonth() + parseInt(roomFormData.rentMonths));
      finalRentUntil = date;
    } else if (roomFormData.isAvailable) {
      finalRentUntil = null;
    }
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...roomFormData, rentUntil: finalRentUntil }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        await refreshData();
      } else {
        const errData = await res.json();
        alert("Error: " + errData.error);
      }
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`/api/${type}s/${id}`, { method: "DELETE" });
      if (res.ok) {
        await refreshData();
      } else {
        alert("Failed to delete " + type);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openHostelModal = (hostel = null) => {
    setEditingItem(hostel);
    setHostelFormData(
      hostel
        ? {
            ...hostel,
            tags: Array.isArray(hostel.tags) ? hostel.tags.join(", ") : "",
            amenities: Array.isArray(hostel.amenities)
              ? hostel.amenities.join(", ")
              : "",
          }
        : {
            name: "",
            location: "",
            image: "",
            isAvailable: true,
            tags: "",
            amenities: "",
          },
    );
    setActiveTab("hostels");
    setIsModalOpen(true);
  };

  const openRoomModal = (room = null) => {
    setEditingItem(room);
    setRoomFormData(
      room
        ? {
            ...room,
            hostelId:
              typeof room.hostelId === "object"
                ? room.hostelId._id
                : room.hostelId,
            rentMonths: 0,
          }
        : {
            name: "",
            hostelId: "",
            type: "Single",
            price: "",
            isAvailable: true,
            location: "",
            image: "",
            rentUntil: null,
            rentMonths: 0,
            gender: "Male Only",
          },
    );
    setActiveTab("rooms");
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    router.push("/auth/login");
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === id ? "bg-blue-600 text-white shadow-xl shadow-blue-600/10" : "text-slate-500 hover:text-white hover:bg-white/5"}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex font-sans">
      <aside className="w-72 bg-[#111111] border-r border-white/5 flex flex-col p-8 hidden lg:flex">
        <div className="flex items-center space-x-3 mb-16">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <span className="text-lg font-black italic uppercase tracking-tighter">
            ELITE<span className="text-blue-500">ADMIN</span>
          </span>
        </div>
        <nav className="flex-1 space-y-2">
          <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
          <NavItem id="hostels" icon={Home} label="Hostels" />
          <NavItem id="rooms" icon={DoorOpen} label="Rooms" />
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center space-x-4 px-6 py-4 text-red-500 font-bold text-sm hover:bg-red-500/5 rounded-2xl transition-all"
        >
          <LogOut size={18} />
          <span>Logout System</span>
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen p-6 lg:p-12 pt-24 lg:pt-12">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black italic uppercase tracking-tighter mb-2">
              {activeTab === "overview"
                ? "Dashboard Overview"
                : activeTab === "hostels"
                  ? "Hostel Management"
                  : "Room Management"}
            </h1>
            <p className="text-slate-500 text-sm font-medium italic">
              Protocol Status: {isLoading ? "Synchronizing..." : "Active"}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openHostelModal()}
              className="bg-white/5 cursor-pointer border border-white/10 hover:bg-white/10 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 transition-all"
            >
              <Home size={18} className="text-blue-500" />
              <span>Add Hostel</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openRoomModal()}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 shadow-xl shadow-blue-600/20 transition-all"
            >
              <Plus size={18} />
              <span>Add Room</span>
            </motion.button>
          </div>
        </header>

        {activeTab === "overview" ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Hostels", value: hostels.length, color: "blue" },
                { label: "Total Rooms", value: rooms.length, color: "purple" },
                {
                  label: "Available",
                  value: rooms.filter((r) => r.isAvailable).length,
                  color: "green",
                },
                {
                  label: "Occupied",
                  value: rooms.filter((r) => !r.isAvailable).length,
                  color: "red",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#111111] p-6 rounded-[32px] border border-white/5 space-y-4"
                >
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <h3 className="text-4xl font-black italic">{stat.value}</h3>
                  <div
                    className={`h-1 w-12 bg-${stat.color}-500 rounded-full`}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-[#111111] rounded-[40px] border border-white/5 overflow-hidden flex flex-col h-[500px]">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-lg font-black italic uppercase tracking-tight">
                    Recent Hostels
                  </h3>
                  <button
                    onClick={() => setActiveTab("hostels")}
                    className="text-blue-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    View All
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {hostels.slice(0, 5).map((h) => (
                    <div
                      key={h._id}
                      className="p-6 border-b border-white/5 flex items-center justify-between hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 font-black italic">
                          H
                        </div>
                        <div>
                          <p className="font-bold text-sm uppercase italic">
                            {h.name}
                          </p>
                          <p className="text-xs text-slate-500">{h.location}</p>
                        </div>
                      </div>
                      <CheckCircle size={16} className="text-green-500/50" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#111111] rounded-[40px] border border-white/5 overflow-hidden flex flex-col h-[500px]">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-lg font-black italic uppercase tracking-tight">
                    Latest Rooms
                  </h3>
                  <button
                    onClick={() => setActiveTab("rooms")}
                    className="text-blue-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    View All
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {rooms.slice(0, 5).map((r) => (
                    <div
                      key={r._id}
                      className="p-6 border-b border-white/5 flex items-center justify-between hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center space-x-4">
                        {r.image ? (
                          <img
                            src={r.image}
                            className="h-10 w-10 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-500 font-black italic text-xs">
                            RM
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-sm uppercase italic">
                            {r.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {r.hostelId?.name || "No Hostel"} • {r.gender}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase ${r.isAvailable ? "text-green-500" : "text-red-500"}`}
                      >
                        {r.isAvailable ? "FREE" : "RENTED"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#111111] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 lg:p-8 border-b border-white/5 flex items-center space-x-4 bg-white/2">
              <Search className="text-slate-500" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white font-medium w-full"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <th className="px-8 py-6">
                      {activeTab === "hostels" ? "Hostel Name" : "Room Unit"}
                    </th>
                    <th className="px-8 py-6">
                      {activeTab === "hostels" ? "Location" : "Hostel"}
                    </th>
                    <th className="px-8 py-6">
                      {activeTab === "hostels" ? "Status" : "Price"}
                    </th>
                    <th className="px-8 py-6">Availability</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeTab === "hostels"
                    ? hostels
                        .filter((h) =>
                          h.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        )
                        .map((hostel) => (
                          <tr
                            key={hostel._id}
                            className="hover:bg-white/[0.02] transition-all group"
                          >
                            <td className="px-8 py-6 font-bold text-sm uppercase italic tracking-tight">
                              {hostel.name}
                            </td>
                            <td className="px-8 py-6 text-slate-400 text-sm">
                              {hostel.location}
                            </td>
                            <td className="px-8 py-6 font-black text-blue-500 text-xs">
                              ACTIVE
                            </td>
                            <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-green-500">
                              MANAGED
                            </td>
                            <td className="px-8 py-6 text-right space-x-2">
                              <button
                                onClick={() => openHostelModal(hostel)}
                                className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-all text-slate-400 hover:text-white"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(hostel._id, "hostel")
                                }
                                className="p-3 bg-white/5 rounded-xl hover:bg-red-600 transition-all text-slate-400 hover:text-white"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                    : rooms
                        .filter((r) =>
                          r.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        )
                        .map((room) => (
                          <tr
                            key={room._id}
                            className="hover:bg-white/[0.02] transition-all group"
                          >
                            <td className="px-8 py-6 flex items-center space-x-4">
                              {room.image && (
                                <img
                                  src={room.image}
                                  className="h-10 w-10 rounded-lg object-cover"
                                />
                              )}
                              <span className="font-bold text-sm uppercase italic tracking-tight">
                                {room.name}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-slate-400 text-sm">
                              {room.hostelId?.name || "N/A"} • {room.gender}
                            </td>
                            <td className="px-8 py-6 font-black text-blue-500">
                              ৳{room.price}
                            </td>
                            <td className="px-8 py-6">
                              <span
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${room.isAvailable ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                              >
                                {room.isAvailable ? "Available" : "Rented"}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right space-x-2">
                              <button
                                onClick={() => openRoomModal(room)}
                                className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-all text-slate-400 hover:text-white"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(room._id, "room")}
                                className="p-3 bg-white/5 rounded-xl hover:bg-red-600 transition-all text-slate-400 hover:text-white"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111111] w-full max-w-4xl rounded-[48px] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 lg:p-10 border-b border-white/5 flex justify-between items-center bg-white/2">
                <h2 className="text-2xl lg:text-3xl font-black italic uppercase tracking-tighter">
                  {editingItem ? "Edit" : "Add"}{" "}
                  <span className="text-blue-500">
                    {activeTab === "rooms" ? "Room" : "Hostel"}
                  </span>
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 lg:h-12 w-10 lg:w-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              {activeTab === "hostels" ? (
                <form
                  onSubmit={handleHostelSubmit}
                  className="p-6 lg:p-10 overflow-y-auto space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Building Image
                      </label>
                      <div className="relative h-48 w-full bg-white/5 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center group overflow-hidden">
                        {hostelFormData.image ? (
                          <img
                            src={hostelFormData.image}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload className="text-slate-500" />
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(e, "hostel")}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {uploading && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <input
                        type="text"
                        required
                        placeholder="Hostel Name"
                        value={hostelFormData.name}
                        onChange={(e) =>
                          setHostelFormData({
                            ...hostelFormData,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Location"
                        value={hostelFormData.location}
                        onChange={(e) =>
                          setHostelFormData({
                            ...hostelFormData,
                            location: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20"
                  >
                    {editingItem ? "Update Hostel" : "Create Hostel"}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleRoomSubmit}
                  className="p-6 lg:p-10 overflow-y-auto space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Room Image
                      </label>
                      <div className="relative h-48 w-full bg-white/5 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center group overflow-hidden">
                        {roomFormData.image ? (
                          <img
                            src={roomFormData.image}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload className="text-slate-500" />
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(e, "room")}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {uploading && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="pt-4 flex items-center justify-between bg-white/2 p-4 rounded-2xl">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Status
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setRoomFormData({
                              ...roomFormData,
                              isAvailable: !roomFormData.isAvailable,
                              rentMonths: 0,
                            })
                          }
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${roomFormData.isAvailable ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {roomFormData.isAvailable
                            ? "Available"
                            : "Rented Out"}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                            Room Type
                          </label>
                          <select
                            value={roomFormData.type}
                            onChange={(e) =>
                              setRoomFormData({
                                ...roomFormData,
                                type: e.target.value,
                              })
                            }
                            className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl outline-none font-bold appearance-none"
                          >
                            <option value="Single" className="bg-[#111111]">
                              Single
                            </option>
                            <option value="Double" className="bg-[#111111]">
                              Double
                            </option>
                            <option value="Triple" className="bg-[#111111]">
                              Triple
                            </option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                            Residing
                          </label>
                          <select
                            value={roomFormData.gender}
                            onChange={(e) =>
                              setRoomFormData({
                                ...roomFormData,
                                gender: e.target.value,
                              })
                            }
                            className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl outline-none font-bold appearance-none"
                          >
                            <option value="Male Only" className="bg-[#111111]">
                              Male Only
                            </option>
                            <option
                              value="Female Only"
                              className="bg-[#111111]"
                            >
                              Female Only
                            </option>
                          </select>
                        </div>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Room Number"
                        value={roomFormData.name}
                        onChange={(e) =>
                          setRoomFormData({
                            ...roomFormData,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl outline-none font-bold"
                      />
                      <select
                        required
                        value={roomFormData.hostelId}
                        onChange={(e) => {
                          const selectedHostel = hostels.find(
                            (h) => h._id === e.target.value,
                          );
                          setRoomFormData({
                            ...roomFormData,
                            hostelId: e.target.value,
                            location: selectedHostel?.location || "",
                          });
                        }}
                        className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl outline-none font-bold appearance-none"
                      >
                        <option value="">Select Hostel...</option>
                        {hostels.map((h) => (
                          <option
                            key={h._id}
                            value={h._id}
                            className="bg-[#111111]"
                          >
                            {h.name}
                          </option>
                        ))}
                      </select>
                      {roomFormData.location && (
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 text-slate-400 font-bold italic text-xs">
                          <MapPin size={14} className="text-blue-500" />
                          <span>{roomFormData.location}</span>
                        </div>
                      )}
                      <input
                        type="number"
                        required
                        placeholder="Price"
                        value={roomFormData.price}
                        onChange={(e) =>
                          setRoomFormData({
                            ...roomFormData,
                            price: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl outline-none font-bold"
                      />
                      {!roomFormData.isAvailable && (
                        <select
                          value={roomFormData.rentMonths}
                          onChange={(e) =>
                            setRoomFormData({
                              ...roomFormData,
                              rentMonths: e.target.value,
                            })
                          }
                          className="w-full bg-blue-600/10 border border-blue-600/20 p-5 rounded-2xl font-black uppercase text-[10px]"
                        >
                          <option value="0">Duration...</option>
                          <option value="1">1 Month</option>
                          <option value="3">3 Months</option>
                          <option value="6">6 Months</option>
                          <option value="12">1 Year</option>
                        </select>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20"
                  >
                    {editingItem ? "Update" : "Save Room"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
