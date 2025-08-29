import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PracticeTab() {
  // Example practice categories
  const categories = [
    {
      name: "Physics",
      progress: 65,
      topics: 24,
      completed: 16,
    },
    {
      name: "Chemistry",
      progress: 42,
      topics: 20,
      completed: 8,
    },
    {
      name: "Mathematics",
      progress: 78,
      topics: 30,
      completed: 23,
    },
  ];

  // Example recent activity
  const recentActivity = [
    {
      id: 1,
      topic: "Kinematics",
      category: "Physics",
      score: "8/10",
      date: "Today",
    },
    {
      id: 2,
      topic: "Organic Chemistry",
      category: "Chemistry",
      score: "7/10",
      date: "Yesterday",
    },
    {
      id: 3,
      topic: "Calculus",
      category: "Mathematics",
      score: "9/10",
      date: "2 days ago",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Practice</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.name}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{category.name}</CardTitle>
                  <Badge variant="outline">
                    {category.completed}/{category.topics} topics
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={category.progress} className="h-2 mb-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{category.progress}% complete</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Continue Practice</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent practice sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted text-muted-foreground text-sm">
                    <th className="text-left py-3 px-4 font-medium">Topic</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Score</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="border-t border-border">
                      <td className="py-3 px-4">{activity.topic}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{activity.category}</Badge>
                      </td>
                      <td className="py-3 px-4">{activity.score}</td>
                      <td className="py-3 px-4 text-muted-foreground">{activity.date}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Activity</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
