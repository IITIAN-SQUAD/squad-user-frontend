import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityHeatmap from "@/components/analytics/ActivityHeatmap";
import CoverageAnalysis from "@/components/analytics/CoverageAnalysis";
import PerformanceAnalytics from "@/components/analytics/PerformanceAnalytics";
import RecallAnalytics from "@/components/analytics/RecallAnalytics";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
        
        {/* Activity Heatmap - Codeforces inspired */}
        <ActivityHeatmap />
        
        <Tabs defaultValue="coverage" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="coverage">Coverage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="recall">Recall</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="coverage" className="mt-6">
            <CoverageAnalysis />
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <PerformanceAnalytics />
          </TabsContent>
          
          <TabsContent value="recall" className="mt-6">
            <RecallAnalytics />
          </TabsContent>
          
          <TabsContent value="insights" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <h3 className="text-lg font-medium mb-2">AI-Powered Insights</h3>
              <p>Personalized recommendations and insights coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
