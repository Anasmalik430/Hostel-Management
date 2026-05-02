"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check session on mount
    const storedSession = localStorage.getItem("elite_session");
    if (storedSession) {
      const session = JSON.parse(storedSession);
      const now = new Date().getTime();
      
      // Check if session is still valid (within 3 months)
      if (now < session.expiresAt) {
        setUser(session.user);
      } else {
        localStorage.removeItem("elite_session");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        const expiresAt = new Date().getTime() + (90 * 24 * 60 * 60 * 1000); // 3 months
        const sessionData = {
          user: data.user,
          token: data.token,
          expiresAt
        };
        localStorage.setItem("elite_session", JSON.stringify(sessionData));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("elite_session");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
