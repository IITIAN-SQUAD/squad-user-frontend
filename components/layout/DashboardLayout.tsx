import { ReactNode } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import Footer from "../ui/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-background h-screen flex flex-col">
      <DashboardHeader />

        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-[23.04px] overflow-y-auto">
            {children}
          </main>
        </div>

      <Footer />
    </div>
  );
}
