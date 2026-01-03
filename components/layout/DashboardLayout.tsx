import { ReactNode } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import Footer from "../ui/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-background h-screen">
      <DashboardHeader />

        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 overflow-x-hidden p-[23.04px]">
            {children}
          </main>
        </div>

      <Footer />
    </div>
  );
}
