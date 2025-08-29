import DashboardLayout from "@/components/layout/DashboardLayout";
import { Trophy, Medal, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  // Example leaderboard data - would come from API in real app
  const leaderboardData = [
    { rank: 1, name: "Rahul Sharma", score: 9845, avatar: "RS" },
    { rank: 2, name: "Priya Patel", score: 9720, avatar: "PP" },
    { rank: 3, name: "Amit Kumar", score: 9650, avatar: "AK" },
    { rank: 4, name: "Sneha Gupta", score: 9580, avatar: "SG" },
    { rank: 5, name: "Vikram Singh", score: 9510, avatar: "VS" },
    { rank: 6, name: "Ananya Reddy", score: 9480, avatar: "AR" },
    { rank: 7, name: "Karthik Nair", score: 9420, avatar: "KN" },
    { rank: 8, name: "Neha Verma", score: 9350, avatar: "NV" },
    { rank: 9, name: "Rajesh Tiwari", score: 9290, avatar: "RT" },
    { rank: 10, name: "Meera Joshi", score: 9240, avatar: "MJ" },
  ];

  // Current user's rank
  const currentUserRank = 24;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
        
        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overall" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top 3 users with special styling */}
              <Card className="order-2 md:order-1">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-2 border-silver">
                      <AvatarFallback className="bg-silver/20 text-xl font-bold">{leaderboardData[1].avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-silver text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <Medal className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold">{leaderboardData[1].name}</h3>
                  <Badge variant="secondary" className="mt-1">{leaderboardData[1].score} pts</Badge>
                </CardContent>
              </Card>
              
              <Card className="order-1 md:order-2 border-primary">
                <CardContent className="pt-6 flex flex-col items-center">
                  <Trophy className="w-8 h-8 text-primary mb-2" />
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-2 border-primary">
                      <AvatarFallback className="bg-primary/20 text-2xl font-bold">{leaderboardData[0].avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{leaderboardData[0].name}</h3>
                  <Badge className="mt-1">{leaderboardData[0].score} pts</Badge>
                </CardContent>
              </Card>
              
              <Card className="order-3">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-2 border-bronze">
                      <AvatarFallback className="bg-bronze/20 text-xl font-bold">{leaderboardData[2].avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-bronze text-white w-8 h-8 rounded-full flex items-center justify-center">
                      3
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold">{leaderboardData[2].name}</h3>
                  <Badge variant="outline" className="mt-1">{leaderboardData[2].score} pts</Badge>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with the highest scores</CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {leaderboardData.slice(3).map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <span className="font-semibold text-muted-foreground">{user.rank}</span>
                        </div>
                        <Avatar>
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <Badge variant="secondary">{user.score} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pt-2 pb-4">
                <Button variant="outline" size="sm">View All Rankings</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Your Ranking</span>
                  <Badge>{currentUserRank}</Badge>
                </CardTitle>
                <CardDescription>Keep practicing to improve your rank</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20">US</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">You</div>
                      <div className="text-sm text-muted-foreground">8420 pts</div>
                    </div>
                  </div>
                  <TrendingUp className="text-green-500" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">To next rank</span>
                    <span className="font-medium">120 pts more</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full">Practice to Improve Rank</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Leaderboard</CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Monthly leaderboard data will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Leaderboard</CardTitle>
                <CardDescription>Top performers this week</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Weekly leaderboard data will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
