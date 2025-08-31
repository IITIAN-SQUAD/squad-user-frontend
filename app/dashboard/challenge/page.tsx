import DashboardLayout from "@/components/layout/DashboardLayout";
import { Swords, Users, Trophy, Calendar, Timer, Award, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChallengePage() {
  // Example challenge data - would come from API in real app
  const upcomingChallenges = [
    {
      id: "c1",
      title: "JEE Physics Weekly Challenge",
      participants: 256,
      startTime: "2025-08-31T10:00:00",
      duration: 60, // minutes
      topics: ["Mechanics", "Thermodynamics", "Electromagnetism"],
      difficulty: "Medium"
    },
    {
      id: "c2",
      title: "Chemistry Mastery Challenge",
      participants: 189,
      startTime: "2025-09-02T15:30:00",
      duration: 45, // minutes
      topics: ["Organic Chemistry", "Inorganic Chemistry"],
      difficulty: "Hard"
    },
    {
      id: "c3",
      title: "Mathematics Sprint",
      participants: 312,
      startTime: "2025-09-05T18:00:00",
      duration: 30, // minutes
      topics: ["Calculus", "Algebra", "Coordinate Geometry"],
      difficulty: "Medium"
    }
  ];

  // Example past challenges
  const pastChallenges = [
    {
      id: "pc1",
      title: "JEE Full Mock Test",
      date: "2025-08-25",
      participants: 423,
      yourRank: 42,
      percentile: 90.1
    },
    {
      id: "pc2",
      title: "Physics Concept Challenge",
      date: "2025-08-20",
      participants: 287,
      yourRank: 18,
      percentile: 93.7
    },
    {
      id: "pc3",
      title: "Mathematics Problem Solving",
      date: "2025-08-15",
      participants: 356,
      yourRank: 29,
      percentile: 91.9
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Get difficulty badge variant
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "secondary";
      case "medium": return "default";
      case "hard": return "destructive";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Challenges</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Your Rank</h3>
              </div>
              <p className="text-3xl font-bold">24th</p>
              <p className="text-sm text-muted-foreground">Top 5% of all participants</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Swords className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Challenges Completed</h3>
              </div>
              <p className="text-3xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Win Rate</h3>
              </div>
              <p className="text-3xl font-bold">72%</p>
              <p className="text-sm text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Challenges</TabsTrigger>
            <TabsTrigger value="created">Created by You</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Upcoming Challenges</CardTitle>
                  <CardDescription>Register for upcoming challenges</CardDescription>
                </div>
                <Button>Create Challenge</Button>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {upcomingChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 hover:bg-muted/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{challenge.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(challenge.startTime)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{challenge.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Timer className="h-4 w-4" />
                              <span>{challenge.duration} min</span>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant={getDifficultyVariant(challenge.difficulty)}>
                              {challenge.difficulty}
                            </Badge>
                            {challenge.topics.map((topic) => (
                              <Badge key={topic} variant="outline">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button>Register</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Challenges</CardTitle>
                <CardDescription>Review your performance in previous challenges</CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {pastChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 hover:bg-muted/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">{challenge.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{challenge.date}</Badge>
                            <span className="text-sm text-muted-foreground">{challenge.participants} participants</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Your Rank</p>
                            <p className="font-medium">{challenge.yourRank}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Percentile</p>
                            <p className="font-medium">{challenge.percentile}%</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Results
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pt-2 pb-4">
                <Button variant="outline">View All Past Challenges</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="created">
            <Card>
              <CardHeader>
                <CardTitle>Challenges Created by You</CardTitle>
                <CardDescription>Manage challenges you've created for your peers</CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="text-center space-y-3">
                  <Swords className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="font-medium text-lg">No challenges created yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Create your own challenge for your peers. Set questions, time limits, and topics to test your friends.
                  </p>
                  <Button className="mt-4">Create Your First Challenge</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
