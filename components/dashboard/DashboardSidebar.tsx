
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  BarChart2, 
  Trophy, 
  BookOpen, 
  Swords, 
  FileText, 
  LogOut,
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );

  // Sidebar content component
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6">
        <Link href="/" className="flex items-center justify-center hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-black font-bold text-lg">
            IS
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-2">
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
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">User Name</p>
            <p className="text-sm text-sidebar-foreground/70">user@example.com</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground/80"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );

  // Return desktop sidebar for larger screens, mobile sidebar for smaller screens
  return (
    <>
      <aside className="hidden md:flex w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex-col h-screen flex-shrink-0">
        <SidebarContent />
      </aside>
      <div className="md:hidden">
        <MobileSidebar />
      </div>
    </>
  );
}
