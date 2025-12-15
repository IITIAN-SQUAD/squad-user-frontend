"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

interface LoginPromptProps {
  title?: string;
  description?: string;
  action?: string;
}

export default function LoginPrompt({ 
  title = "Login Required",
  description = "Please login to access this feature",
  action = "continue"
}: LoginPromptProps) {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-4">
          <LogIn className="h-6 w-6 text-brand" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/login" className="block">
          <Button className="w-full bg-brand text-gray-900 hover:bg-brand/90">
            <LogIn className="h-4 w-4 mr-2" />
            Login to {action}
          </Button>
        </Link>
        <Link href="/signup" className="block">
          <Button variant="outline" className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Create Account
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
