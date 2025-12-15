"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, LogIn, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface GuestSubmitWarningProps {
  onContinueAsGuest?: () => void;
  onClose?: () => void;
}

export default function GuestSubmitWarning({ 
  onContinueAsGuest,
  onClose 
}: GuestSubmitWarningProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleContinue = () => {
    setDismissed(true);
    if (onContinueAsGuest) onContinueAsGuest();
  };

  const handleClose = () => {
    setDismissed(true);
    if (onClose) onClose();
  };

  return (
    <Alert className="border-amber-200 bg-amber-50 relative">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <AlertTitle className="text-amber-900">Submitting as Guest</AlertTitle>
      <AlertDescription className="text-amber-800">
        <div className="space-y-2 mt-2">
          <p className="text-sm">
            You can submit your solution, but without login:
          </p>
          <ul className="text-sm space-y-1 ml-4 list-disc">
            <li>Your attempt history won't be saved</li>
            <li>You won't see personalized analytics</li>
            <li>Your progress won't be tracked</li>
          </ul>
          <div className="flex gap-2 mt-4">
            <Link href="/login" className="flex-1">
              <Button size="sm" className="w-full bg-brand text-gray-900 hover:bg-brand/90">
                <LogIn className="h-4 w-4 mr-2" />
                Login to Track Progress
              </Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button size="sm" variant="outline" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-full text-amber-700 hover:text-amber-900"
            onClick={handleContinue}
          >
            Continue as Guest
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
