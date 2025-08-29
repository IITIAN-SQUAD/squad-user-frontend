import { ChevronDown, Bell } from "lucide-react";

export default function DashboardHeader() {
  // Example exam options - these would come from your API in a real app
  const examOptions = [
    { id: "jee", name: "JEE Main & Advanced" },
    { id: "neet", name: "NEET" },
    { id: "gate", name: "GATE" },
    { id: "upsc", name: "UPSC" }
  ];

  return (
    <header className="border-b border-border h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <span>JEE Main & Advanced</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          {/* Dropdown would be implemented with shadcn/ui dropdown-menu component */}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
            US
          </div>
        </div>
      </div>
    </header>
  );
}
