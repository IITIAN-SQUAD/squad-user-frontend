"use client";

import { useState, useEffect } from "react";
import { getUserProfile, type UserProfile } from "@/lib/authApi";

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const profile = await getUserProfile();
      if (profile && profile.id) {
        setIsAuthenticated(true);
        setUser(profile);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // User is not authenticated
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuth = () => {
    setLoading(true);
    checkAuth();
  };

  return {
    isAuthenticated,
    user,
    loading,
    refreshAuth,
  };
}
