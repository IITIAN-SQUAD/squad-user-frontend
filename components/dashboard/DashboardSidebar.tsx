
"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUserProfile, logout as logoutApi } from "@/lib/authApi";
import { 
  User, 
  BarChart2, 
  Trophy, 
  BookOpen, 
  Swords, 
  FileText, 
  LogOut,
  LogIn,
  UserPlus,
  ChevronRight,
  RotateCcw,
  Brain,
  MessageSquare,
  GraduationCap
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardSidebar() {
  const pathname = usePathname();
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
        console.log('🔄 DashboardSidebar: Fetching user profile...');
        const profile = await getUserProfile();
        console.log('✅ DashboardSidebar: Profile fetched:', profile);
        
        if (profile && profile.name && profile.email) {
          setIsAuthenticated(true);
          setUserName(profile.name);
          setUserEmail(profile.email);
          setUserImage(profile.image_url || null);
          console.log('✅ Profile data set:', { name: profile.name, email: profile.email, image: profile.image_url });
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        console.log('ℹ️ User not authenticated');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API fails, redirect to login
      router.push('/login');
    }
  };
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  const navItems = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart2,
    },
    {
      name: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: Trophy,
    },
    {
      name: "Practice",
      href: "/dashboard",
      icon: BookOpen,
    },
    {
      name: "Revision",
      href: "/dashboard/revision",
      icon: RotateCcw,
    },
    {
      name: "Challenge",
      href: "/dashboard/challenge",
      icon: Swords,
    },
    {
      name: "AI Coaching",
      href: "/dashboard/coaching",
      icon: Brain,
    },
    {
      name: "PYQ Paper",
      href: "/dashboard/pyq",
      icon: FileText,
    },
    {
      name: "Doubts",
      href: "/dashboard/doubts",
      icon: MessageSquare,
    },
  ];

  // Mobile sidebar with Sheet component
  const MobileSidebar = () => (
    <>

      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </>
  );

  // Sidebar content component
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      
      {/* Navigation Section - Takes remaining space */}
      <nav className="flex-1 px-4 py-[19.2px] overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Button
                asChild
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Profile/Login section - Fixed at bottom, above footer */}
      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userImage || undefined} alt={userName} />
                <AvatarFallback className="bg-brand text-gray-900 text-sm">{getInitials(userName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{userName}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{userEmail}</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </>
        ) : (
          <div className="space-y-2">
            <Button 
              variant="default" 
              className="w-full bg-brand text-gray-900 hover:bg-brand/90"
              onClick={() => router.push('/login')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/signup')}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>
        )}
      </div>
      
      {/* Sidebar footer area - Fixed at very bottom */}
      <div className="p-4 border-t border-sidebar-border bg-gray-50 flex-shrink-0">
        <p className="text-xs text-center text-muted-foreground">
          © 2024 IITian Squad
        </p>
      </div>
    </div>
  );

  // Return desktop sidebar for larger screens, mobile sidebar for smaller screens
  return (
    <>
      <aside className="hidden md:flex w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex-col h-screen flex-shrink-0 sticky top-0">
        <SidebarContent />
      </aside>
      <div className="md:hidden">
        <MobileSidebar />
      </div>
    </>
  );
}
