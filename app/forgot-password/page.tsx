"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { requestOtp } from '@/lib/authApi';

type ForgotPasswordStep = 'email-entry' | 'otp-verification' | 'new-password';

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email-entry');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    const email = formData.email.trim();
    if (!email) {
      setOtpError('Please enter a valid email address');
      return;
    }

    try {
      setIsRequestingOtp(true);
      await requestOtp(email);
      setCurrentStep('otp-verification');
    } catch (error: any) {
      const message = error?.message || 'Failed to send reset code. Please try again.';
      setOtpError(message);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('OTP submitted:', formData.otp);
    setCurrentStep('new-password');
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset completed:', formData);
    // Mock successful password reset - redirect to login
    window.location.href = '/login';
  };

  const renderEmailEntry = () => (
    <>
      <CardHeader className="space-y-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => window.location.href = '/login'}
          className="self-start p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Login
        </Button>
        <div className="flex justify-center mb-4">
          <Link 
            href="/" 
            onClick={(e) => {
              console.log('Logo clicked, redirecting to landing page');
              window.location.href = '/';
            }}
          >
            <img src="/logo.svg" alt="IITian Squad" className="h-12 cursor-pointer" />
          </Link>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we'll send you a code to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {otpError && (
              <p className="text-sm text-red-600 mt-1">{otpError}</p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full bg-brand text-gray-900 hover:bg-brand/90"
            disabled={isRequestingOtp}
          >
            {isRequestingOtp ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </form>
      </CardContent>
    </>
  );

  const renderOtpVerification = () => (
    <>
      <CardHeader className="space-y-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentStep('email-entry')}
          className="self-start p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold text-center">Verify Code</CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to {formData.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={formData.otp}
              onChange={handleInputChange}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-brand text-gray-900 hover:bg-brand/90">
            Verify Code
          </Button>
          
          <div className="text-center text-sm">
            Didn't receive the code?{' '}
            <button 
              type="button" 
              className="text-brand hover:underline font-medium"
              onClick={async () => {
                try {
                  setIsRequestingOtp(true);
                  setOtpError(null);
                  await requestOtp(formData.email);
                } catch (error: any) {
                  const message = error?.message || 'Failed to resend reset code.';
                  setOtpError(message);
                } finally {
                  setIsRequestingOtp(false);
                }
              }}
            >
              Resend
            </button>
          </div>
        </form>
      </CardContent>
    </>
  );

  const renderNewPassword = () => (
    <>
      <CardHeader className="space-y-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentStep('otp-verification')}
          className="self-start p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Create a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-brand text-gray-900 hover:bg-brand/90">
            Reset Password
          </Button>
        </form>
      </CardContent>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="w-full">
            {currentStep === 'email-entry' && renderEmailEntry()}
            {currentStep === 'otp-verification' && renderOtpVerification()}
            {currentStep === 'new-password' && renderNewPassword()}
          </Card>
          
          {/* Spacer to push footer down */}
          <div className="h-32"></div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
