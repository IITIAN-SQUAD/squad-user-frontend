import DashboardLayout from "@/components/layout/DashboardLayout";
import { Trophy, Medal, TrendingUp, Star, Zap, Target, Award, Crown, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  // Motivational XP Rating System - Achievement-Based Theme
  const getRating = (xp: number) => {
    if (xp >= 5000) return { name: "Legend", icon: Crown, color: "text-purple-600", bgColor: "bg-purple-100", desc: "Elite performer, inspiring others" };
    if (xp >= 3000) return { name: "Champion", icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-100", desc: "Consistent top performer" };
    if (xp >= 2000) return { name: "Master", icon: Award, color: "text-orange-600", bgColor: "bg-orange-100", desc: "Mastering advanced concepts" };
    if (xp >= 1200) return { name: "Warrior", icon: Shield, color: "text-blue-600", bgColor: "bg-blue-100", desc: "Strong problem solver" };
    if (xp >= 600) return { name: "Rising Star", icon: Target, color: "text-green-600", bgColor: "bg-green-100", desc: "Building momentum" };
    if (xp >= 200) return { name: "Determined", icon: Zap, color: "text-indigo-600", bgColor: "bg-indigo-100", desc: "Making steady progress" };
    return { name: "Aspiring", icon: Medal, color: "text-brand", bgColor: "bg-brand/10", desc: "Starting the journey" };
  };

  // Enhanced leaderboard data with updated XP system
  const leaderboardData = [
    { rank: 1, name: "Rahul Sharma", xp: 2340, dailyStreak: 45, scheduledWins: 12, publicWins: 8, avatar: "RS" },
    { rank: 2, name: "Priya Patel", xp: 2120, dailyStreak: 38, scheduledWins: 9, publicWins: 6, avatar: "PP" },
    { rank: 3, name: "Amit Kumar", xp: 1950, dailyStreak: 32, scheduledWins: 8, publicWins: 5, avatar: "AK" },
    { rank: 4, name: "Sneha Gupta", xp: 1780, dailyStreak: 28, scheduledWins: 6, publicWins: 4, avatar: "SG" },
    { rank: 5, name: "Vikram Singh", xp: 1610, dailyStreak: 25, scheduledWins: 5, publicWins: 3, avatar: "VS" },
    { rank: 6, name: "Ananya Reddy", xp: 1480, dailyStreak: 22, scheduledWins: 4, publicWins: 2, avatar: "AR" },
    { rank: 7, name: "Karthik Nair", xp: 1320, dailyStreak: 18, scheduledWins: 3, publicWins: 2, avatar: "KN" },
    { rank: 8, name: "Neha Verma", xp: 1150, dailyStreak: 15, scheduledWins: 2, publicWins: 1, avatar: "NV" },
    { rank: 9, name: "Rajesh Tiwari", xp: 990, dailyStreak: 12, scheduledWins: 1, publicWins: 1, avatar: "RT" },
    { rank: 10, name: "Meera Joshi", xp: 840, dailyStreak: 8, scheduledWins: 1, publicWins: 0, avatar: "MJ" },
  ];

  // Current user's data
  const currentUser = { rank: 24, xp: 420, dailyStreak: 5, scheduledWins: 0, publicWins: 0 };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
        
        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overall" className="space-y-6">
            {/* XP System Info */}
            <Card className="bg-gradient-to-r from-brand/10 to-brand-navy/10">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold">XP System</h2>
                  <p className="text-sm text-muted-foreground">Earn XP through daily activities and challenges</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                  <div>
                    <div className="font-bold text-lg text-green-600">+1 XP</div>
                    <div className="text-xs">Daily Login</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-blue-600">+5 XP</div>
                    <div className="text-xs">Weekly Streak</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-teal-600">+10 XP</div>
                    <div className="text-xs">10+ Questions Daily</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-purple-600">+100 XP</div>
                    <div className="text-xs">Scheduled Challenge Win</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-orange-600">+50 XP*</div>
                    <div className="text-xs">Public Challenge Top Rank</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    *Public challenge XP can be lost if someone else takes the top position
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Top 3 users with special styling */}
              <Card className="order-2 lg:order-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-500"></div>
                <CardContent className="pt-8 pb-6 flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      2nd
                    </div>
                    <Avatar className="w-20 h-20 border-4 border-gray-400 shadow-lg">
                      <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-xl font-bold text-gray-700">{leaderboardData[1].avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-gray-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                      <Medal className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-gray-800">{leaderboardData[1].name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {(() => {
                      const rating = getRating(leaderboardData[1].xp);
                      const RatingIcon = rating.icon;
                      return (
                        <Badge variant="secondary" className={`${rating.bgColor} ${rating.color} shadow-sm`}>
                          <RatingIcon className="w-3 h-3 mr-1" />
                          {rating.name}
                        </Badge>
                      );
                    })()}
                  </div>
                  <Badge variant="outline" className="mt-2 bg-white shadow-sm font-semibold">{leaderboardData[1].xp.toLocaleString()} XP</Badge>
                  <div className="flex gap-3 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">🔥 {leaderboardData[1].dailyStreak}d</span>
                    <span className="flex items-center gap-1">📅 {leaderboardData[1].scheduledWins}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="order-1 lg:order-2 relative overflow-hidden bg-gradient-to-br from-brand/10 via-yellow-50 to-brand/20 border-brand shadow-2xl transform lg:scale-105">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand to-yellow-500"></div>
                <div className="absolute top-2 right-2">
                  <Crown className="w-6 h-6 text-brand animate-pulse" />
                </div>
                <CardContent className="pt-8 pb-6 flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      🏆 CHAMPION
                    </div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-brand/20 to-yellow-200 rounded-full blur-xl opacity-60"></div>
                    <Avatar className="w-28 h-28 border-4 border-brand shadow-2xl relative z-10">
                      <AvatarFallback className="bg-gradient-to-br from-brand/30 to-yellow-100 text-3xl font-bold text-brand">{leaderboardData[0].avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-brand to-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      1
                    </div>
                  </div>
                  <h3 className="mt-6 font-bold text-xl text-brand">{leaderboardData[0].name}</h3>
                  <div className="flex items-center gap-2 mt-3">
                    {(() => {
                      const rating = getRating(leaderboardData[0].xp);
                      const RatingIcon = rating.icon;
                      return (
                        <Badge className={`${rating.bgColor} ${rating.color} shadow-md font-semibold`}>
                          <RatingIcon className="w-4 h-4 mr-1" />
                          {rating.name}
                        </Badge>
                      );
                    })()}
                  </div>
                  <Badge variant="outline" className="mt-2 bg-white shadow-md font-bold text-lg px-4 py-1">{leaderboardData[0].xp.toLocaleString()} XP</Badge>
                  <div className="flex gap-4 mt-4 text-sm font-medium">
                    <span className="flex items-center gap-1 text-orange-600">🔥 {leaderboardData[0].dailyStreak}d</span>
                    <span className="flex items-center gap-1 text-blue-600">📅 {leaderboardData[0].scheduledWins}</span>
                    <span className="flex items-center gap-1 text-purple-600">🌟 {leaderboardData[0].publicWins}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="order-3 relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 border-orange-400 shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-500"></div>
                <CardContent className="pt-8 pb-6 flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      3rd
                    </div>
                    <Avatar className="w-20 h-20 border-4 border-orange-500 shadow-lg">
                      <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-200 text-xl font-bold text-orange-700">{leaderboardData[2].avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-orange-500 to-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                      3
                    </div>
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-orange-800">{leaderboardData[2].name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {(() => {
                      const rating = getRating(leaderboardData[2].xp);
                      const RatingIcon = rating.icon;
                      return (
                        <Badge variant="secondary" className={`${rating.bgColor} ${rating.color} shadow-sm`}>
                          <RatingIcon className="w-3 h-3 mr-1" />
                          {rating.name}
                        </Badge>
                      );
                    })()}
                  </div>
                  <Badge variant="outline" className="mt-2 bg-white shadow-sm font-semibold">{leaderboardData[2].xp.toLocaleString()} XP</Badge>
                  <div className="flex gap-3 mt-3 text-sm text-orange-700">
                    <span className="flex items-center gap-1">🔥 {leaderboardData[2].dailyStreak}d</span>
                    <span className="flex items-center gap-1">📅 {leaderboardData[2].scheduledWins}</span>
                  </div>
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
                  {leaderboardData.slice(3).map((user) => {
                    const rating = getRating(user.xp);
                    const RatingIcon = rating.icon;
                    return (
                      <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center">
                            <span className="font-semibold text-muted-foreground">{user.rank}</span>
                          </div>
                          <Avatar>
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={`text-xs ${rating.color}`}>
                                <RatingIcon className="w-3 h-3 mr-1" />
                                {rating.name}
                              </Badge>
                              <span className="text-xs text-muted-foreground">🔥 {user.dailyStreak}d</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{user.xp.toLocaleString()} XP</Badge>
                          <div className="text-xs text-muted-foreground mt-1 flex gap-2">
                            <span>📅 {user.scheduledWins}</span>
                            <span>🌟 {user.publicWins}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                  <Badge>{currentUser.rank}</Badge>
                </CardTitle>
                <CardDescription>Keep practicing to improve your rank and earn more XP</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20">US</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">You</div>
                      <div className="flex items-center gap-2 mt-1">
                        {(() => {
                          const rating = getRating(currentUser.xp);
                          const RatingIcon = rating.icon;
                          return (
                            <Badge variant="outline" className={`text-xs ${rating.color}`}>
                              <RatingIcon className="w-3 h-3 mr-1" />
                              {rating.name}
                            </Badge>
                          );
                        })()}
                        <span className="text-xs text-muted-foreground">🔥 {currentUser.dailyStreak}d</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{currentUser.xp.toLocaleString()} XP</div>
                    </div>
                  </div>
                  <TrendingUp className="text-green-500" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">To next rating</span>
                    <span className="font-medium">{(() => {
                      const nextThreshold = currentUser.xp >= 50000 ? 50000 : 
                                          currentUser.xp >= 25000 ? 50000 :
                                          currentUser.xp >= 15000 ? 25000 :
                                          currentUser.xp >= 8000 ? 15000 :
                                          currentUser.xp >= 4000 ? 8000 :
                                          currentUser.xp >= 1500 ? 4000 : 1500;
                      return `${(nextThreshold - currentUser.xp).toLocaleString()} XP`;
                    })()} more</span>
                  </div>
                  <Progress value={(() => {
                    const currentThreshold = currentUser.xp >= 25000 ? 25000 :
                                           currentUser.xp >= 15000 ? 15000 :
                                           currentUser.xp >= 8000 ? 8000 :
                                           currentUser.xp >= 4000 ? 4000 :
                                           currentUser.xp >= 1500 ? 1500 : 0;
                    const nextThreshold = currentUser.xp >= 50000 ? 50000 : 
                                        currentUser.xp >= 25000 ? 50000 :
                                        currentUser.xp >= 15000 ? 25000 :
                                        currentUser.xp >= 8000 ? 15000 :
                                        currentUser.xp >= 4000 ? 8000 :
                                        currentUser.xp >= 1500 ? 4000 : 1500;
                    return ((currentUser.xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
                  })()} className="h-2" />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full">Practice to Earn More XP</Button>
              </CardFooter>
            </Card>

            {/* Metrics Explanation Section */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Understanding the Metrics</CardTitle>
                <CardDescription>What the icons and numbers mean</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-2xl">🔥</div>
                    <h4 className="font-semibold">Daily Streak</h4>
                    <p className="text-sm text-muted-foreground">
                      Consecutive days of platform activity. Earn +1 XP for daily login and +5 XP for weekly streaks.
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl">📅</div>
                    <h4 className="font-semibold">Scheduled Wins</h4>
                    <p className="text-sm text-muted-foreground">
                      Victories in scheduled challenges. Each win awards permanent +100 XP that cannot be lost.
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl">🌟</div>
                    <h4 className="font-semibold">Public Wins</h4>
                    <p className="text-sm text-muted-foreground">
                      Current top positions in public challenges. Awards +50 XP but can be lost if someone else takes the lead.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-3">Rating Progression</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                    <div className="text-center p-2 rounded bg-brand/10">
                      <div className="font-medium text-brand">Aspiring</div>
                      <div className="text-muted-foreground">0-199 XP</div>
                    </div>
                    <div className="text-center p-2 rounded bg-indigo-100">
                      <div className="font-medium text-indigo-600">Determined</div>
                      <div className="text-muted-foreground">200-599 XP</div>
                    </div>
                    <div className="text-center p-2 rounded bg-green-100">
                      <div className="font-medium text-green-600">Rising Star</div>
                      <div className="text-muted-foreground">600-1,199 XP</div>
                    </div>
                    <div className="text-center p-2 rounded bg-blue-100">
                      <div className="font-medium text-blue-600">Warrior</div>
                      <div className="text-muted-foreground">1,200-1,999 XP</div>
                    </div>
                    <div className="text-center p-2 rounded bg-orange-100">
                      <div className="font-medium text-orange-600">Master</div>
                      <div className="text-muted-foreground">2,000-2,999 XP</div>
                    </div>
                    <div className="text-center p-2 rounded bg-yellow-100">
                      <div className="font-medium text-yellow-600">Champion</div>
                      <div className="text-muted-foreground">3,000-4,999 XP</div>
                    </div>
                    <div className="text-center p-2 rounded bg-purple-100">
                      <div className="font-medium text-purple-600">Legend</div>
                      <div className="text-muted-foreground">5,000+ XP</div>
                    </div>
                  </div>
                </div>
              </CardContent>
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
