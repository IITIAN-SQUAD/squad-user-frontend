import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Total Questions Attempted</div>
              <div className="text-3xl font-bold mt-2">1,248</div>
              <p className="text-sm text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Average Accuracy</div>
              <div className="text-3xl font-bold mt-2">76%</div>
              <p className="text-sm text-muted-foreground mt-1">+3% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Study Time</div>
              <div className="text-3xl font-bold mt-2">42h 18m</div>
              <p className="text-sm text-muted-foreground mt-1">+5h from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance by Subject</CardTitle>
            <CardDescription>Your accuracy across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Physics</span>
                <Badge variant="outline">72%</Badge>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Chemistry</span>
                <Badge variant="outline">85%</Badge>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Mathematics</span>
                <Badge variant="outline">68%</Badge>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Hours spent studying per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-primary rounded-t-md" 
                      style={{ 
                        height: `${[30, 45, 25, 60, 80, 65, 40][i]}%` 
                      }}
                    ></div>
                    <span className="text-xs mt-2 text-muted-foreground">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Detailed Report</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weak Areas</CardTitle>
              <CardDescription>Topics that need improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span>Thermodynamics</span>
                  <Badge variant="destructive">42% Accuracy</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span>Organic Chemistry</span>
                  <Badge variant="destructive">48% Accuracy</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span>Calculus</span>
                  <Badge variant="destructive">51% Accuracy</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span>Electromagnetism</span>
                  <Badge variant="destructive">54% Accuracy</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Generate Practice Questions</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your performance over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Weekly progress data visualization will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Your performance over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Monthly progress data visualization will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yearly">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Progress</CardTitle>
                <CardDescription>Your performance over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yearly progress data visualization will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
