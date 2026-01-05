"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { requestOtp, signUp, getUserProfile, initiateGoogleOAuth } from '@/lib/authApi';

type SignUpStep = 'initial' | 'email-entry' | 'user-details';

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<SignUpStep>('initial');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const profile = await getUserProfile();
        if (profile && profile.id) {
          // User is already logged in, redirect to dashboard
          console.log('User already authenticated, redirecting to dashboard');
          router.push('/dashboard');
        }
      } catch (error) {
        // User is not authenticated, stay on signup page
        console.log('User not authenticated, showing signup form');
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsSubmitting(true);
      console.log('Initiating Google OAuth signup...');
      
      const response = await initiateGoogleOAuth();
      
      if (response.authorization_url) {
        // Redirect to Google OAuth authorization URL
        window.location.href = response.authorization_url;
      } else {
        throw new Error('No authorization URL received');
      }
    } catch (err: any) {
      console.error('Google OAuth error:', err);
      setSignupError(err.message || 'Failed to initiate Google signup');
      setIsSubmitting(false);
    }
  };

  const handleEmailSignUp = () => {
    console.log('Email signup clicked');
    setCurrentStep('email-entry');
  };

  const handleSignInClick = () => {
    console.log('Sign in clicked');
    router.push('/login');
  };

  const handleLogoClick = () => {
    console.log('Logo clicked');
    router.push('/');
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
      setOtpSent(true);
      setCurrentStep('user-details');
    } catch (error: any) {
      const message = error?.message || 'Failed to send verification code. Please try again.';
      setOtpError(message);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    // Validation
    if (!formData.name.trim()) {
      setSignupError('Please enter your name');
      return;
    }
    if (!formData.otp.trim() || formData.otp.length !== 6) {
      setSignupError('Please enter a valid 6-digit OTP');
      return;
    }
    if (formData.password.length < 4) {
      setSignupError('Password must be at least 4 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp({
        name: formData.name.trim(),
        email: formData.email.trim(),
        otp: formData.otp.trim(),
        password: formData.password,
      });

      // Redirect to login page - backend will set cookies during login
      router.push('/login?registered=true');
    } catch (error: any) {
      const message = error?.message || 'Failed to create account. Please try again.';
      setSignupError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInitialStep = () => (
    <>
      <CardHeader className="space-y-1">

        <CardTitle className="text-2xl font-bold text-center">Join IITian Squad</CardTitle>
        <CardDescription className="text-center">
          Create your account to start your exam preparation journey
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button 
          onClick={handleGoogleSignUp}
          variant="outline" 
          className="w-full"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <Button 
          onClick={handleEmailSignUp}
          className="w-full bg-brand text-gray-900 hover:bg-brand/90"
        >
          Sign up with Email
        </Button>
        
        <div className="text-center text-sm">
          Already have an account?{' '}
          <button 
            onClick={handleSignInClick}
            className="text-brand hover:underline font-medium cursor-pointer bg-transparent border-none p-0"
          >
            Sign in
          </button>
        </div>
      </CardContent>
    </>
  );

  const renderEmailEntry = () => (
    <>
      <CardHeader className="space-y-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentStep('initial')}
          className="self-start p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold text-center">Enter Your Email</CardTitle>
        <CardDescription className="text-center">
          We'll send you a verification code
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
            {isRequestingOtp ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </form>
      </CardContent>
    </>
  );

  const renderUserDetails = () => (
    <>
      <CardHeader className="space-y-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            setCurrentStep('email-entry');
            setOtpSent(false);
          }}
          className="self-start p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
        <CardDescription className="text-center">
          {otpSent && (
            <span className="text-green-600 block mb-1">
              ✓ Verification code sent to {formData.email}
            </span>
          )}
          Enter the code and set up your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFinalSubmit} className="space-y-4">
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
            <div className="text-center text-sm">
              Didn't receive the code?{' '}
              <button 
                type="button" 
                className="text-brand hover:underline font-medium"
                disabled={isRequestingOtp}
                onClick={async () => {
                  try {
                    setIsRequestingOtp(true);
                    setSignupError(null);
                    await requestOtp(formData.email);
                    setOtpSent(true);
                  } catch (error: any) {
                    const message = error?.message || 'Failed to resend verification code.';
                    setSignupError(message);
                  } finally {
                    setIsRequestingOtp(false);
                  }
                }}
              >
                {isRequestingOtp ? 'Sending...' : 'Resend'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password (min 4 characters)"
                value={formData.password}
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={
                  formData.confirmPassword && formData.password !== formData.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
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
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span>✗</span> Passwords do not match
              </p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 4 && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <span>✓</span> Passwords match
              </p>
            )}
          </div>

          {signupError && (
            <p className="text-sm text-red-600 text-center">{signupError}</p>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-brand text-gray-900 hover:bg-brand/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </>
  );

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-brand" />
            <p className="mt-4 text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 min-h-[75vh]">
        <div className="max-w-md w-full">
          <Card className="w-full">
            {currentStep === 'initial' && renderInitialStep()}
            {currentStep === 'email-entry' && renderEmailEntry()}
            {currentStep === 'user-details' && renderUserDetails()}
          </Card>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
