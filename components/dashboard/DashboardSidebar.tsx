
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
  LogOut 
} from "lucide-react";

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
      name: "Challenge",
      href: "/dashboard/challenge",
      icon: Swords,
    },
    {
      name: "PYQ",
      href: "/dashboard/pyq",
      icon: FileText,
    },
  ];

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-black font-bold">
            IS
          </div>
          <h1 className="text-xl font-bold">IITian Squad</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground">
            US
          </div>
          <div>
            <p className="font-medium">User Name</p>
            <p className="text-sm text-sidebar-foreground/70">user@example.com</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 w-full px-3 py-2 text-sidebar-foreground/80 hover:bg-sidebar-accent/50 rounded-md transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
