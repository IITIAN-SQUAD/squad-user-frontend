"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { getUserProfile, updateProfile, requestOtp } from "@/lib/authApi";
import { uploadProfileImage } from "@/lib/s3Client";

interface ProfileUpdateProps {
  onProfileUpdated?: () => void;
}

export default function ProfileUpdate({ onProfileUpdated }: ProfileUpdateProps) {
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // OTP state
  const [otp, setOtp] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profile = await getUserProfile();
      setUserId(profile.id);
      setName(profile.name);
      setEmail(profile.email);
      setOriginalEmail(profile.email);
      setImageUrl(profile.image_url || null);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !userId) return;

    try {
      setUploading(true);
      setError(null);

      console.log('📤 Uploading image to S3...');
      const s3Url = await uploadProfileImage(selectedFile, userId);
      console.log('✅ Image uploaded:', s3Url);

      // Update profile with new image URL
      const updatedProfile = await updateProfile({ image_url: s3Url });
      setImageUrl(updatedProfile.image_url || null);
      setSelectedFile(null);
      setPreviewUrl(null);
      setSuccess('Profile image updated successfully!');
      
      // Notify parent component
      if (onProfileUpdated) onProfileUpdated();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('❌ Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSendOtp = async () => {
    if (email === originalEmail) {
      setError('Email is the same as current email');
      return;
    }

    try {
      setOtpSending(true);
      setError(null);
      
      console.log('📧 Sending OTP to:', email);
      await requestOtp(email, 'EMAIL_UPDATE');
      setOtpSent(true);
      setSuccess('OTP sent to your new email address');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setOtpSending(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      setError(null);

      const payload: any = {};
      
      // Check if name changed
      if (name !== originalEmail) {
        payload.name = name;
      }

      // Check if email changed
      if (email !== originalEmail) {
        if (!otp || otp.length !== 6) {
          setError('Please enter the 6-digit OTP sent to your new email');
          setUpdating(false);
          return;
        }
        payload.email = email;
        payload.otp = otp;
      }

      // If nothing changed
      if (Object.keys(payload).length === 0) {
        setError('No changes to update');
        setUpdating(false);
        return;
      }

      console.log('📝 Updating profile:', payload);
      const updatedProfile = await updateProfile(payload);
      
      // Update local state
      setName(updatedProfile.name);
      setEmail(updatedProfile.email);
      setOriginalEmail(updatedProfile.email);
      setImageUrl(updatedProfile.image_url || null);
      
      // Reset OTP state
      setOtp('');
      setOtpSent(false);
      
      setSuccess('Profile updated successfully!');
      
      // Notify parent component to refresh
      if (onProfileUpdated) onProfileUpdated();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Directly update profile (OTP field is inline now)
    handleUpdateProfile();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile picture, name, and email
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Error/Success Messages */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800 mb-6">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Left-Right Layout */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Profile Image */}
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={previewUrl || imageUrl || undefined} alt={name} />
                  <AvatarFallback className="text-2xl bg-brand text-gray-900">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>

                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photo
                    </span>
                  </Button>
                </Label>
                
                {selectedFile && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleImageUpload}
                    disabled={uploading}
                    className="bg-brand text-gray-900 hover:bg-brand/90 mt-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload Photo'
                    )}
                  </Button>
                )}

                <p className="text-xs text-muted-foreground mt-2 text-center">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>

            {/* Right Side - Form Fields */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1"
                    />
                    {email !== originalEmail && !otpSent && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSendOtp}
                        disabled={otpSending}
                      >
                        {otpSending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send OTP'
                        )}
                      </Button>
                    )}
                  </div>
                  {email !== originalEmail && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Changing email will require OTP verification
                    </p>
                  )}
                </div>

                {/* OTP Field - Shows when email changed and OTP sent */}
                {email !== originalEmail && otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP Code</Label>
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      OTP sent to {email}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={updating || (name === originalEmail && email === originalEmail) || (email !== originalEmail && (!otpSent || otp.length !== 6))}
                    className="bg-brand text-gray-900 hover:bg-brand/90"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
