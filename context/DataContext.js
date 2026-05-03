"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [guestRooms, setGuestRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [hostelsRes, roomsRes, guestRoomsRes] = await Promise.all([
        fetch("/api/hostels", { cache: 'no-store' }),
        fetch("/api/rooms", { cache: 'no-store' }),
        fetch("/api/guestrooms", { cache: 'no-store' })
      ]);
      const hData = await hostelsRes.json();
      const rData = await roomsRes.json();
      const grData = await guestRoomsRes.json();

      const hostelsList = Array.isArray(hData) ? hData : [];
      const roomsList = Array.isArray(rData) ? rData : [];
      const guestRoomsList = Array.isArray(grData) ? grData : [];

      setHostels(hostelsList);
      setRooms(roomsList);
      setGuestRooms(guestRoomsList);
      
      // Persist to LocalStorage for instant UX on reload
      if (typeof window !== "undefined") {
        localStorage.setItem("elite_hostels_cache", JSON.stringify(hostelsList));
        localStorage.setItem("elite_rooms_cache", JSON.stringify(roomsList));
        localStorage.setItem("elite_guestrooms_cache", JSON.stringify(guestRoomsList));
      }
    } catch (err) {
      console.error("DataContext fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial Load: Try cache first
    if (typeof window !== "undefined") {
      const cHostels = localStorage.getItem("elite_hostels_cache");
      const cRooms = localStorage.getItem("elite_rooms_cache");
      const cGuestRooms = localStorage.getItem("elite_guestrooms_cache");
      if (cHostels && cRooms) {
        try {
          setHostels(JSON.parse(cHostels));
          setRooms(JSON.parse(cRooms));
          if (cGuestRooms) setGuestRooms(JSON.parse(cGuestRooms));
          setIsLoading(false);
        } catch (e) {
          console.error("Cache parse error", e);
        }
      }
    }
    // Always fetch fresh data immediately after loading cache
    fetchData();
  }, [fetchData]);

  // Sync on window focus or visibility change to ensure real-time feel
  useEffect(() => {
    const sync = () => fetchData();
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") sync();
    });
    return () => {
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [fetchData]);

  const value = useMemo(() => ({
    hostels,
    rooms,
    guestRooms,
    isLoading,
    refreshData: fetchData,
  }), [hostels, rooms, guestRooms, isLoading, fetchData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
