import PracticeTab from "@/components/dashboard/PracticeTab";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";
import { isFeatureEnabled } from "@/lib/features";

export default function DashboardPage() {
  // Check if practice feature is enabled
  if (!isFeatureEnabled('practice')) {
    return (
      <ComingSoon 
        variant="page"
        title="Practice Platform Coming Soon"
        message="We're working hard to bring you an amazing practice experience with 15,000+ curated questions, detailed solutions, and personalized learning paths. This feature will be live soon!"
      />
    );
  }
  
  return (
    <DashboardLayout>
      <PracticeTab />
    </DashboardLayout>
  );
}
