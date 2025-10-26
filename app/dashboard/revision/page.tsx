aimport RevisionTab from "@/components/dashboard/RevisionTab";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";
import { isFeatureEnabled } from "@/lib/features";

export default function RevisionPage() {
  if (!isFeatureEnabled('revision')) {
    return (
      <ComingSoon 
        variant="page"
        title="Revision Tools Coming Soon"
        message="We're creating smart revision tools with spaced repetition, flashcards, and quick review sessions to help you retain concepts better. Stay tuned!"
      />
    );
  }

  return (
    <DashboardLayout>
      <RevisionTab />
    </DashboardLayout>
  );
}
