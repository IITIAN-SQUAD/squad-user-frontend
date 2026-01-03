import { ReactNode } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import Footer from "../ui/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-background relative overflow-auto">
      <>
        <DashboardHeader />
      </>
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden max-h-full">{children}</main>
        </div>
      </div>
      {/* Footer spans full width at the bottom */}
      <Footer />
    </div>
  );
}
