import { ReactNode } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import Footer from "../ui/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">{children}</main>
        </div>
      </div>
      {/* Footer spans full width at the bottom */}
      <Footer />
    </div>
  );
}
