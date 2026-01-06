"use client";

import { useState } from "react";
import {
  getUserProfile,
  logout,
  updateProfile,
  requestOtp,
  type UserProfile,
  type UpdateProfilePayload,
} from "@/lib/authApi";
import { uploadProfileImage as uploadToS3 } from "@/lib/s3Client";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async (): Promise<UserProfile | null> => {
    setLoading(true);
    setError(null);
    try {
      const profile = await getUserProfile();
      return profile;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (
    payload: UpdateProfilePayload
  ): Promise<UserProfile | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedProfile = await updateProfile(payload);
      return updatedProfile;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUploadProfileImage = async (
    file: File,
    userId?: string
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await uploadToS3(file, userId);
      return imageUrl;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const requestEmailOtp = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await requestOtp(email, 'EMAIL_UPDATE');
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getProfile,
    handleLogout,
    handleUpdateProfile,
    handleUploadProfileImage,
    requestEmailOtp,
  };
}
