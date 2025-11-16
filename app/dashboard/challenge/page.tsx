"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Clock, 
  Users, 
  Trophy, 
  Target,
  Calendar,
  TrendingUp,
  Award,
  Zap,
  ArrowUpDown,
  Play,
  CheckCircle,
  XCircle,
  Pause,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import ComingSoon from "@/components/ui/ComingSoon";
import { isFeatureEnabled } from "@/lib/features";

export default function ChallengePage() {
  if (!isFeatureEnabled('challenge')) {
    return (
      <ComingSoon 
        variant="page"
        title="Live Challenges Coming Soon"
        message="We're building an exciting challenge platform where you can compete with peers in timed tests, mock exams, and leaderboard competitions. Get ready for an amazing competitive learning experience!"
      />
    );
  }

  const [upcomingSort, setUpcomingSort] = useState('startTime');
  const [publicSort, setPublicSort] = useState('participants');
  
  // Pagination states
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [publicPage, setPublicPage] = useState(1);
  const [createdPage, setCreatedPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const itemsPerPage = 6;

  // Mock data for different challenge types - expanded for pagination testing
  const upcomingChallenges = [
    {
      id: "c1",
      title: "JEE Physics Weekly Challenge",
      description: "Mechanics and Thermodynamics focus",
      participants: 256,
      maxParticipants: 500,
      startTime: "2025-09-02T10:00:00",
      duration: 60,
      difficulty: "Hard",
      creator: "IITian Squad",
      subjects: ["Physics"]
    },
    {
      id: "c2",
      title: "NEET Chemistry Mock Test",
      description: "Organic Chemistry comprehensive test",
      participants: 189,
      maxParticipants: 300,
      startTime: "2025-09-03T14:00:00",
      duration: 90,
      difficulty: "Medium",
      creator: "ChemMaster",
      subjects: ["Chemistry"]
    },
    {
      id: "c3",
      title: "Math Olympiad Prep",
      description: "Advanced calculus and algebra",
      participants: 78,
      maxParticipants: 150,
      startTime: "2025-09-04T16:00:00",
      duration: 120,
      difficulty: "Hard",
      creator: "MathGuru",
      subjects: ["Mathematics"]
    },
    {
      id: "c4",
      title: "JEE Advanced Mock Test",
      description: "Full syllabus comprehensive test",
      participants: 445,
      maxParticipants: 600,
      startTime: "2025-09-05T09:00:00",
      duration: 180,
      difficulty: "Hard",
      creator: "IITian Squad",
      subjects: ["Physics", "Chemistry", "Mathematics"]
    },
    {
      id: "c5",
      title: "NEET Biology Challenge",
      description: "Human physiology and genetics",
      participants: 234,
      maxParticipants: 400,
      startTime: "2025-09-06T11:00:00",
      duration: 75,
      difficulty: "Medium",
      creator: "BioExpert",
      subjects: ["Biology"]
    },
    {
      id: "c6",
      title: "Quick Math Sprint",
      description: "Speed mathematics challenge",
      participants: 156,
      maxParticipants: 200,
      startTime: "2025-09-07T17:00:00",
      duration: 30,
      difficulty: "Easy",
      creator: "MathSprint",
      subjects: ["Mathematics"]
    },
    {
      id: "c7",
      title: "Chemistry Organic Reactions",
      description: "Named reactions and mechanisms",
      participants: 89,
      maxParticipants: 250,
      startTime: "2025-09-08T13:00:00",
      duration: 90,
      difficulty: "Hard",
      creator: "OrganicChem",
      subjects: ["Chemistry"]
    }
  ];

  const publicChallenges = [
    {
      id: "p1",
      title: "Daily Physics Practice",
      description: "Mixed topics from all chapters",
      participants: 1250,
      attempts: 3420,
      createdAt: "2025-08-25T09:00:00",
      difficulty: "Medium",
      creator: "PhysicsHub",
      subjects: ["Physics"],
      status: "completed", // completed, in-progress, not-attempted
      score: 85,
      rank: 45
    },
    {
      id: "p2",
      title: "Chemistry Bonding Challenge",
      description: "Chemical bonding and molecular structure",
      participants: 890,
      attempts: 2150,
      createdAt: "2025-08-28T11:30:00",
      difficulty: "Easy",
      creator: "ChemExpert",
      subjects: ["Chemistry"],
      status: "in-progress",
      score: null,
      rank: null
    },
    {
      id: "p3",
      title: "Calculus Mastery Test",
      description: "Limits, derivatives, and integrals",
      participants: 567,
      attempts: 1890,
      createdAt: "2025-08-30T15:45:00",
      difficulty: "Hard",
      creator: "CalcPro",
      subjects: ["Mathematics"],
      status: "not-attempted",
      score: null,
      rank: null
    }
  ];

  const myCreatedChallenges = [
    {
      id: "m1",
      title: "My Physics Practice Set",
      description: "Personal practice for mechanics",
      type: "personal",
      participants: 1, // just me
      createdAt: "2025-08-29T12:00:00",
      status: "completed",
      score: 92
    },
    {
      id: "m2",
      title: "Friends Chemistry Quiz",
      description: "Quiz for study group",
      type: "public",
      participants: 12,
      createdAt: "2025-08-30T18:00:00",
      status: "active",
      totalAttempts: 28
    }
  ];

  // Pagination utility component
  const PaginationControls = ({ 
    currentPage, 
    totalItems, 
    onPageChange, 
    itemsPerPage = 6 
  }: {
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  // Pagination logic
  const paginateItems = (items: any[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // Sorting functions
  const sortUpcoming = (challenges: typeof upcomingChallenges) => {
    return [...challenges].sort((a, b) => {
      if (upcomingSort === 'participants') {
        return b.participants - a.participants;
      } else if (upcomingSort === 'startTime') {
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      }
      return 0;
    });
  };

  const sortPublic = (challenges: typeof publicChallenges) => {
    return [...challenges].sort((a, b) => {
      if (publicSort === 'participants') {
        return b.participants - a.participants;
      } else if (publicSort === 'attempts') {
        return b.attempts - a.attempts;
      } else if (publicSort === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'not-attempted': return <XCircle className="h-4 w-4 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress': return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'not-attempted': return <Badge variant="outline">Not Attempted</Badge>;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        <h1 className="text-2xl font-bold tracking-tight">Challenges</h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <Card className="p-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-2xl font-bold">24th</p>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                </div>
              </div>
            </Card>
            <Link href="/dashboard/challenge/create" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Challenge
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="upcoming" className="text-xs sm:text-sm">Upcoming</TabsTrigger>
                <TabsTrigger value="public" className="text-xs sm:text-sm">Public</TabsTrigger>
                <TabsTrigger value="created" className="text-xs sm:text-sm">Created by Me</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-6">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-lg font-semibold">Scheduled Challenges</h3>
                  <Select value={upcomingSort} onValueChange={setUpcomingSort}>
                    <SelectTrigger className="w-full sm:w-48">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startTime">Sort by Start Time</SelectItem>
                      <SelectItem value="participants">Sort by Participants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-dashed border-2 hover:border-brand transition-colors cursor-pointer">
                    <Link href="/dashboard/challenge/create">
                      <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 text-center min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                          <Plus className="h-6 w-6 text-brand" />
                        </div>
                        <h3 className="font-semibold mb-2">Create New Challenge</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Design your own challenge with custom questions and settings
                        </p>
                        <Button className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Challenge
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>

                  {paginateItems(sortUpcoming(upcomingChallenges), upcomingPage).map((challenge) => (
                    <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            <CardDescription className="mt-1">{challenge.description}</CardDescription>
                            <CardDescription className="flex items-center gap-2 mt-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(challenge.startTime).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              })} at{" "}
                              {new Date(challenge.startTime).toLocaleTimeString('en-US', {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                              })}
                            </CardDescription>
                          </div>
                          <Badge 
                            variant={challenge.difficulty === "Hard" ? "destructive" : 
                                    challenge.difficulty === "Medium" ? "default" : "secondary"}
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {challenge.participants}/{challenge.maxParticipants}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {challenge.duration} min
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>By {challenge.creator}</span>
                            <div className="flex gap-1">
                              {challenge.subjects.map((subject: string) => (
                                <Badge key={subject} variant="outline" className="text-xs">{subject}</Badge>
                              ))}
                            </div>
                          </div>

                          <Button className="w-full" size="sm">
                            <Target className="h-4 w-4 mr-2" />
                            Join Challenge
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <PaginationControls
                  currentPage={upcomingPage}
                  totalItems={upcomingChallenges.length}
                  onPageChange={setUpcomingPage}
                />
              </TabsContent>
              
              <TabsContent value="public" className="space-y-6">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-lg font-semibold">Public Challenges</h3>
                  <Select value={publicSort} onValueChange={setPublicSort}>
                    <SelectTrigger className="w-full sm:w-48">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participants">Sort by Participants</SelectItem>
                      <SelectItem value="attempts">Sort by Attempts</SelectItem>
                      <SelectItem value="createdAt">Sort by Creation Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {paginateItems(sortPublic(publicChallenges), publicPage).map((challenge) => (
                    <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {challenge.title}
                              {getStatusIcon(challenge.status)}
                            </CardTitle>
                            <CardDescription className="mt-1">{challenge.description}</CardDescription>
                            <CardDescription className="mt-2">
                              Created by {challenge.creator} • {new Date(challenge.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              })}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge 
                              variant={challenge.difficulty === "Hard" ? "destructive" : 
                                      challenge.difficulty === "Medium" ? "default" : "secondary"}
                            >
                              {challenge.difficulty}
                            </Badge>
                            {getStatusBadge(challenge.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {challenge.participants} participants
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {challenge.attempts} attempts
                            </span>
                          </div>
                          
                          {challenge.status === 'completed' && (
                            <div className="flex items-center justify-between text-sm bg-green-50 p-2 rounded">
                              <span className="flex items-center gap-1">
                                <Trophy className="h-4 w-4 text-green-600" />
                                Score: {challenge.score}%
                              </span>
                              <span className="text-green-600">Rank: #{challenge.rank}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex gap-1">
                              {challenge.subjects.map((subject: string) => (
                                <Badge key={subject} variant="outline" className="text-xs">{subject}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {challenge.status === 'not-attempted' && (
                              <Link href={`/dashboard/challenge/attempt/${challenge.id}`} className="flex-1">
                                <Button className="w-full" size="sm">
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Challenge
                                </Button>
                              </Link>
                            )}
                            {challenge.status === 'in-progress' && (
                              <Link href={`/dashboard/challenge/attempt/${challenge.id}`} className="flex-1">
                                <Button className="w-full" size="sm" variant="outline">
                                  <Pause className="h-4 w-4 mr-2" />
                                  Continue
                                </Button>
                              </Link>
                            )}
                            {challenge.status === 'completed' && (
                              <>
                                <Link href={`/dashboard/challenge/result/${challenge.id}`} className="flex-1">
                                  <Button className="w-full" size="sm" variant="outline">
                                    <Trophy className="h-4 w-4 mr-2" />
                                    View Results
                                  </Button>
                                </Link>
                                <Link href={`/dashboard/challenge/attempt/${challenge.id}`} className="flex-1">
                                  <Button className="w-full" size="sm">
                                    <Play className="h-4 w-4 mr-2" />
                                    Retry
                                  </Button>
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <PaginationControls
                  currentPage={publicPage}
                  totalItems={publicChallenges.length}
                  onPageChange={setPublicPage}
                />
              </TabsContent>
          
          <TabsContent value="created">
            <Card>
              <CardHeader>
                <CardTitle>Challenges Created by You</CardTitle>
                <CardDescription>Manage challenges you've created for your peers</CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="text-center space-y-3">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="font-medium text-lg">No challenges created yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Create your own challenge for your peers. Set questions, time limits, and topics to test your friends.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/dashboard/challenge/create">Create Your First Challenge</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Challenges</CardTitle>
                <CardDescription>View your past challenge results and performance</CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="text-center space-y-3">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="font-medium text-lg">No completed challenges yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Complete some challenges to see your results and track your progress over time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
