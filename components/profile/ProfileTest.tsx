"use client";

import { useState } from "react";
import { uploadProfileImage } from "@/lib/s3Client";
import { getUserProfile, updateProfile, logout } from "@/lib/authApi";
import { Button } from "@/components/ui/button";

/**
 * Simple test component to verify S3 and profile API integration
 * Use this to test the functionality before using the full ProfileManager
 */
export function ProfileTest() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testGetProfile = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();
      setResult(JSON.stringify(profile, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testUploadImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      setLoading(true);
      try {
        const url = await uploadProfileImage(file, "test-user-123");
        setResult(`Image uploaded successfully!\n\nURL: ${url}`);
      } catch (error: any) {
        setResult(`Upload failed: ${error.message}`);
      }
      setLoading(false);
    };
    input.click();
  };

  const testUpdateProfile = async () => {
    setLoading(true);
    try {
      const updated = await updateProfile({
        name: "Test User " + Date.now(),
      });
      setResult(JSON.stringify(updated, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setResult("Logged out successfully!");
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Profile API Test</h1>

      <div className="flex flex-wrap gap-2">
        <Button onClick={testGetProfile} disabled={loading}>
          Test Get Profile
        </Button>
        <Button onClick={testUploadImage} disabled={loading}>
          Test Upload Image
        </Button>
        <Button onClick={testUpdateProfile} disabled={loading}>
          Test Update Profile
        </Button>
        <Button onClick={testLogout} disabled={loading} variant="destructive">
          Test Logout
        </Button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Result:</h3>
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Make sure you're logged in (have a valid JWT cookie)</li>
          <li>Click "Test Get Profile" to fetch your profile</li>
          <li>Click "Test Upload Image" to upload an image to S3</li>
          <li>Click "Test Update Profile" to update your name</li>
          <li>Click "Test Logout" to clear your session</li>
        </ol>
      </div>
    </div>
  );
}
