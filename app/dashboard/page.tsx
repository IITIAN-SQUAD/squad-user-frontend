import PracticeTab from "@/components/dashboard/PracticeTab";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  // In a real app, you would check if the user is authenticated
  // const isAuthenticated = useAuth();
  // if (!isAuthenticated) redirect('/login');
  
  return (
    <DashboardLayout>
      <PracticeTab />
    </DashboardLayout>
  );
}
