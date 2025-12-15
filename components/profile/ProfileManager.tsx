"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/lib/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, LogOut } from "lucide-react";

export function ProfileManager() {
  const {
    loading,
    error,
    getProfile,
    handleLogout,
    handleUpdateProfile,
    handleUploadProfileImage,
    requestEmailOtp,
  } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();
    if (data) {
      setProfile(data);
      setName(data.name);
      setEmail(data.email);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRequestOtp = async () => {
    if (email === profile?.email) {
      alert("Email is the same as current email");
      return;
    }
    const success = await requestEmailOtp(email);
    if (success) {
      setShowOtpInput(true);
      alert("OTP sent to " + email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = profile?.image_url;

    // Upload image first if selected
    if (imageFile) {
      const uploadedUrl = await handleUploadProfileImage(imageFile, profile?.id);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert("Failed to upload image");
        return;
      }
    }

    // Check if email changed
    const emailChanged = email !== profile?.email;

    if (emailChanged && !otp) {
      alert("Please request OTP to change email");
      return;
    }

    // Update profile
    const payload: any = {};
    if (name !== profile?.name) payload.name = name;
    if (imageUrl !== profile?.image_url) payload.image_url = imageUrl;
    if (emailChanged) {
      payload.email = email;
      payload.otp = otp;
    }

    const updated = await handleUpdateProfile(payload);
    if (updated) {
      setProfile(updated);
      setImageFile(null);
      setImagePreview(null);
      setOtp("");
      setShowOtpInput(false);
      alert("Profile updated successfully!");
    }
  };

  const handleLogoutClick = async () => {
    const success = await handleLogout();
    if (success) {
      window.location.href = "/login";
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <Button
          variant="outline"
          onClick={handleLogoutClick}
          disabled={loading}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={imagePreview || profile.image_url || undefined}
              alt={profile.name}
            />
            <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            {email !== profile.email && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRequestOtp}
                disabled={loading}
              >
                Request OTP
              </Button>
            )}
          </div>
        </div>

        {/* OTP Input */}
        {showOtpInput && (
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP sent to your email"
              disabled={loading}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </div>
  );
}
