"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, LogIn, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserProfile, logout as logoutApi } from "@/lib/authApi";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function DashboardHeader() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        console.log("🔄 DashboardHeader: Fetching user profile...");
        const profile = await getUserProfile();
        console.log("✅ DashboardHeader: Profile fetched:", profile);

        if (profile && profile.name && profile.email) {
          setIsAuthenticated(true);
          setUserName(profile.name);
          setUserEmail(profile.email);
          setUserImage(profile.image_url || null);
          console.log("✅ Header profile data set:", {
            name: profile.name,
            email: profile.email,
            image: profile.image_url,
          });
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("ℹ️ User not authenticated");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API fails, redirect to login
      router.push("/login");
    }
  };

  // Example exam options - these would come from your API in a real app
  const examOptions = [
    { id: "jee", name: "JEE Main & Advanced" },
    { id: "neet", name: "NEET" },
    { id: "gate", name: "GATE" },
    { id: "upsc", name: "UPSC" },
  ];

  const dropDown = 
            <Select defaultValue="jee">
              <SelectTrigger className="text-xs h-fit">
                <SelectValue placeholder="Select exam" className="text-xs" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                {examOptions.map((exam) => (
                  <SelectItem 
                    key={exam.id} 
                    value={exam.id} 
                    className="text-xs hover:bg-stone-100"
                  >
                    {exam.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          

  return (
    <header className="flex-col items-center justify-between">
      <div className="py-[7.71px] px-6 w-full flex items-center justify-between border-b border-border">
        <img src="/isq-logo-white.svg" alt="Logo" className="w-32 h-auto" />

        <div className="flex gap-3">
          
          <div className="hidden md:block">
            {dropDown}
          </div>
          

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative bg-stone-100">
                <Bell className="h-5 w-5" />
                <Badge
                  className="absolute top-0 right-0 h-2 w-2 p-0"
                  variant="destructive"
                />
              </Button>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 px-2 rounded-full flex items-center gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userImage || undefined}
                        alt={userName}
                      />
                      <AvatarFallback className="bg-brand text-gray-900">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                    {/* <div className="flex flex-col items-start leading-none">
                      <span className="text-xs font-medium max-w-[120px] truncate">
                        {userName}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Logged in
                      </span>
                    </div> */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push("/dashboard/profile?tab=account")
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-fit p-1.5 rounded-full flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-brand text-gray-900">
                        {getInitials("Guest")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-xs font-medium">Guest</span>
                      <span className="text-[11px] text-muted-foreground">
                        Not logged in
                      </span>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>You’re not logged in</DialogTitle>
                    <DialogDescription>
                      Please log in to access your dashboard and save your
                      progress.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full bg-brand text-gray-900 hover:bg-brand/90">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden py-[7.71px] px-6 border-b ">
        <div className="w-full">
          {dropDown}
        </div>
      </div>
    </header>
  );
}
