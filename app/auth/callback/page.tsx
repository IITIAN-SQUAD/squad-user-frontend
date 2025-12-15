"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { handleOAuthCallback } from '@/lib/authApi';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get the authorization code and state from URL params
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const errorParam = searchParams.get('error');

        // Check if user denied access
        if (errorParam) {
          setError('Authentication was cancelled');
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // Check if we have the authorization code
        if (!code) {
          setError('No authorization code received');
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        console.log('Processing OAuth callback with code:', code);

        // Send the code to backend for token exchange
        const response = await handleOAuthCallback({
          code,
          state: state || undefined,
        });

        if (response.success) {
          console.log('OAuth login successful:', response.user);
          // Redirect to dashboard after successful authentication
          router.push('/dashboard');
        } else {
          throw new Error(response.message || 'Authentication failed');
        }
      } catch (err: any) {
        console.error('OAuth callback error:', err);
        setError(err.message || 'Failed to complete authentication');
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    processCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        {error ? (
          <>
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        ) : (
          <>
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-brand mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In</h2>
            <p className="text-gray-600">Please wait while we authenticate your account...</p>
          </>
        )}
      </div>
    </div>
  );
}
