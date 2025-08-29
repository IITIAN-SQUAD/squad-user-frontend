import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <h3 className="text-sm font-medium text-muted-foreground">Total Questions Attempted</h3>
            <p className="text-3xl font-bold mt-2">1,248</p>
            <p className="text-sm text-muted-foreground mt-1">+12% from last month</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <h3 className="text-sm font-medium text-muted-foreground">Average Accuracy</h3>
            <p className="text-3xl font-bold mt-2">76%</p>
            <p className="text-sm text-muted-foreground mt-1">+3% from last month</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <h3 className="text-sm font-medium text-muted-foreground">Study Time</h3>
            <p className="text-3xl font-bold mt-2">42h 18m</p>
            <p className="text-sm text-muted-foreground mt-1">+5h from last month</p>
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Performance by Subject</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Physics</span>
                <span>72%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-1" style={{ width: "72%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Chemistry</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-2" style={{ width: "85%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Mathematics</span>
                <span>68%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-3" style={{ width: "68%" }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
            <div className="h-64 flex items-end justify-between">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-brand rounded-t-md" 
                    style={{ 
                      height: `${[30, 45, 25, 60, 80, 65, 40][i]}%` 
                    }}
                  ></div>
                  <span className="text-xs mt-2 text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
            <h2 className="text-xl font-semibold mb-4">Weak Areas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-background rounded-md">
                <span>Thermodynamics</span>
                <span className="text-sm text-destructive font-medium">42% Accuracy</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-md">
                <span>Organic Chemistry</span>
                <span className="text-sm text-destructive font-medium">48% Accuracy</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-md">
                <span>Calculus</span>
                <span className="text-sm text-destructive font-medium">51% Accuracy</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-md">
                <span>Electromagnetism</span>
                <span className="text-sm text-destructive font-medium">54% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
