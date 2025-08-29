import DashboardLayout from "@/components/layout/DashboardLayout";
import { FileText, Search, Filter, Download, BookOpen, BarChart, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function PYQPage() {
  // Example PYQ data - would come from API in real app
  const pyqData = [
    {
      id: "pyq1",
      exam: "JEE Advanced",
      year: 2024,
      paper: "Paper 1",
      questions: 54,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard"
    },
    {
      id: "pyq2",
      exam: "JEE Advanced",
      year: 2023,
      paper: "Paper 2",
      questions: 54,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard"
    },
    {
      id: "pyq3",
      exam: "JEE Advanced",
      year: 2023,
      paper: "Paper 1",
      questions: 54,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard"
    },
    {
      id: "pyq4",
      exam: "JEE Main",
      year: 2024,
      paper: "February Session",
      questions: 90,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Medium"
    },
    {
      id: "pyq5",
      exam: "JEE Main",
      year: 2023,
      paper: "April Session",
      questions: 90,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Medium"
    }
  ];

  // Example recent attempts
  const recentAttempts = [
    {
      id: "ra1",
      exam: "JEE Advanced 2023",
      paper: "Paper 1",
      date: "2025-08-20",
      score: "68/108",
      percentile: 92.4
    },
    {
      id: "ra2",
      exam: "JEE Main 2024",
      paper: "February Session",
      date: "2025-08-15",
      score: "76/90",
      percentile: 94.7
    }
  ];

  // Get difficulty badge variant
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "secondary";
      case "medium": return "default";
      case "hard": return "destructive";
      default: return "outline";
    }
  };

  // Get subject badge variant
  const getSubjectVariant = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "physics": return "default";
      case "chemistry": return "secondary";
      case "mathematics": return "outline";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Previous Year Questions</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search PYQs by exam, year, subject..." 
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Select defaultValue="jee-advanced">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                <SelectItem value="jee-main">JEE Main</SelectItem>
                <SelectItem value="neet">NEET</SelectItem>
              </SelectContent>
            </Select>
            <Button>Find PYQs</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Total PYQs Solved</h3>
              </div>
              <p className="text-3xl font-bold">248</p>
              <p className="text-sm text-muted-foreground">Across 12 papers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Average Score</h3>
              </div>
              <p className="text-3xl font-bold">72%</p>
              <p className="text-sm text-muted-foreground">+4% from last month</p>
              <Progress value={72} className="mt-2 h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Most Attempted</h3>
              </div>
              <p className="text-3xl font-bold">JEE Adv.</p>
              <p className="text-sm text-muted-foreground">8 papers attempted</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="available">Available Papers</TabsTrigger>
            <TabsTrigger value="recent">Recent Attempts</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            <Card>
              <CardHeader>
                <CardTitle>Available Papers</CardTitle>
                <CardDescription>Practice with previous year question papers</CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {pyqData.map((paper) => (
                    <div key={paper.id} className="p-4 hover:bg-muted/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{paper.exam} {paper.year}</h3>
                            <Badge variant={getDifficultyVariant(paper.difficulty)}>
                              {paper.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{paper.paper} • {paper.questions} questions</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {paper.subjects.map((subject) => (
                              <Badge key={subject} variant={getSubjectVariant(subject)}>
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button>Solve Now</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pt-2 pb-4">
                <Button variant="outline">Load More Papers</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Attempts</CardTitle>
                <CardDescription>Review your recent practice sessions</CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentAttempts.map((attempt) => (
                    <div key={attempt.id} className="p-4 hover:bg-muted/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{attempt.exam}</h3>
                            <Badge variant="outline">
                              <Calendar className="h-3 w-3 mr-1" />
                              {attempt.date}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{attempt.paper}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Score</p>
                            <p className="font-medium">{attempt.score}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Percentile</p>
                            <p className="font-medium">{attempt.percentile}%</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Analysis
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookmarked">
            <Card>
              <CardHeader>
                <CardTitle>Bookmarked Papers</CardTitle>
                <CardDescription>Papers you've saved for later</CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="text-center space-y-3">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="font-medium text-lg">No bookmarked papers yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Bookmark papers you want to solve later for quick access
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
