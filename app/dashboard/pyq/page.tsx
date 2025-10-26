"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FileText, Search, Filter, Download, BookOpen, BarChart, TrendingUp, Calendar, CheckCircle, Clock, Users, Trophy, Bookmark, BookmarkCheck, Play, Award, Target, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";
import ComingSoon from "@/components/ui/ComingSoon";
import { isFeatureEnabled } from "@/lib/features";

export default function PYQPage() {
  if (!isFeatureEnabled('pyq')) {
    return (
      <ComingSoon 
        variant="page"
        title="PYQ Papers Coming Soon"
        message="We're preparing a comprehensive collection of previous year question papers with exam-like interface, detailed solutions, and performance analysis. This feature will be live soon!"
      />
    );
  }

  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);
  
  // Example PYQ data - would come from API in real app
  const pyqData = [
    {
      id: "pyq1",
      name: "JEE Main 25 Jan 2025 Shift 1",
      exam: "JEE Main",
      year: 2025,
      date: "25 Jan 2025",
      shift: "Shift 1",
      questions: 90,
      totalMarks: 300,
      duration: 180,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Medium",
      isBookmarked: false,
      attempts: 1247,
      avgScore: 68.5
    },
    {
      id: "pyq2",
      name: "JEE Advanced 2025 Paper 1",
      exam: "JEE Advanced",
      year: 2025,
      date: "26 May 2025",
      paper: "Paper 1",
      questions: 54,
      totalMarks: 198,
      duration: 180,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard",
      isBookmarked: true,
      attempts: 892,
      avgScore: 45.2
    },
    {
      id: "pyq3",
      name: "JEE Advanced 2025 Paper 2",
      exam: "JEE Advanced",
      year: 2025,
      date: "26 May 2025",
      paper: "Paper 2",
      questions: 54,
      totalMarks: 198,
      duration: 180,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Hard",
      isBookmarked: false,
      attempts: 756,
      avgScore: 42.8
    },
    {
      id: "pyq4",
      name: "NEET 2025 Paper",
      exam: "NEET",
      year: 2025,
      date: "5 May 2025",
      paper: "Single Paper",
      questions: 200,
      totalMarks: 720,
      duration: 200,
      subjects: ["Physics", "Chemistry", "Biology"],
      difficulty: "Medium",
      isBookmarked: true,
      attempts: 2156,
      avgScore: 72.3
    },
    {
      id: "pyq5",
      name: "JEE Main 30 Jan 2024 Shift 2",
      exam: "JEE Main",
      year: 2024,
      date: "30 Jan 2024",
      shift: "Shift 2",
      questions: 90,
      totalMarks: 300,
      duration: 180,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Medium",
      isBookmarked: false,
      attempts: 1834,
      avgScore: 71.2
    },
    {
      id: "pyq6",
      name: "GATE 2025 Computer Science",
      exam: "GATE",
      year: 2025,
      date: "15 Feb 2025",
      paper: "CS Paper",
      questions: 65,
      totalMarks: 100,
      duration: 180,
      subjects: ["Computer Science"],
      difficulty: "Hard",
      isBookmarked: false,
      attempts: 567,
      avgScore: 58.9
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

  // Sort function
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig) return pyqData;
    
    return [...pyqData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  };

  // Get sort icon
  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">PYQ Papers</h1>
            <p className="text-muted-foreground mt-1">Practice with previous year question papers</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <FileText className="h-3 w-3 mr-1" />
              {pyqData.length} Papers Available
            </Badge>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search papers by name, exam, or subject..." 
                  className="pl-9"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="all-years">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-years">All Years</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
                
                
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Button>
                  Search Papers
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-sm">Papers Attempted</h3>
              </div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-muted-foreground">This month: +6</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-sm">Average Score</h3>
              </div>
              <p className="text-2xl font-bold">68.4%</p>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <h3 className="font-medium text-sm">Best Performance</h3>
              </div>
              <p className="text-2xl font-bold">94.2%</p>
              <p className="text-xs text-muted-foreground">JEE Main 2024</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <h3 className="font-medium text-sm">Time Saved</h3>
              </div>
              <p className="text-2xl font-bold">2.5h</p>
              <p className="text-xs text-muted-foreground">Avg per paper</p>
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
                <CardTitle>Available PYQ Papers</CardTitle>
                <CardDescription>Click column headers to sort</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]"></TableHead>
                        <TableHead className="min-w-[200px]">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleSort('name')}
                            className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                          >
                            Paper Name
                            {getSortIcon('name')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[60px]">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleSort('year')}
                            className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                          >
                            Year
                            {getSortIcon('year')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[70px]">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleSort('questions')}
                            className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                          >
                            Ques
                            {getSortIcon('questions')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[70px]">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleSort('totalMarks')}
                            className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                          >
                            Marks
                            {getSortIcon('totalMarks')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[70px]">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleSort('duration')}
                            className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                          >
                            Time
                            {getSortIcon('duration')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[80px]">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleSort('avgScore')}
                            className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                          >
                            Score
                            {getSortIcon('avgScore')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {getSortedData().map((paper) => (
                      <TableRow key={paper.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 hover:bg-yellow-100"
                          >
                            {paper.isBookmarked ? (
                              <BookmarkCheck className="h-4 w-4 text-yellow-600" />
                            ) : (
                              <Bookmark className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold text-sm leading-tight">{paper.name}</div>
                            <div className="text-xs text-muted-foreground">{paper.date}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs px-1 py-0">{paper.year}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-sm">{paper.questions}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-sm">{paper.totalMarks}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-sm">{paper.duration}m</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="text-sm font-medium">{paper.avgScore}%</div>
                            <Progress value={paper.avgScore} className="h-1 w-12 mx-auto" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button asChild size="sm" className="h-7 w-7 p-0">
                              <Link href={`/dashboard/pyq/attempt/${paper.id}`}>
                                <Play className="h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
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
