"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Share2,
  BookOpen,
  Award,
  Users,
  Calendar,
  ArrowLeft,
  Eye,
  Flag,
  Bookmark,
  RotateCcw
} from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  title: string;
  description: string;
  type: "Single Choice" | "Multiple Choice" | "Integer Type" | "Numerical";
  options?: string[];
  correctAnswer: string | string[] | number;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  marks: number;
  userAnswer?: any;
  isCorrect?: boolean;
  timeTaken?: number;
}

interface PYQResult {
  paperId: string;
  paperName: string;
  exam: string;
  year: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  timeTaken: number;
  totalTime: number;
  questions: Question[];
  subjectWiseAnalysis: {
    subject: string;
    total: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    marks: number;
    totalMarks: number;
  }[];
  difficultyAnalysis: {
    difficulty: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
  rank: number;
  percentile: number;
  submittedAt: Date;
}

export default function PYQResultPage() {
  const params = useParams();
  const router = useRouter();
  const paperId = params.id as string;
  
  const [result, setResult] = useState<PYQResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock result data
  const mockResult: PYQResult = {
    paperId,
    paperName: "JEE Main 25 Jan 2025 Shift 1",
    exam: "JEE Main",
    year: 2025,
    totalMarks: 300,
    obtainedMarks: 248,
    percentage: 82.67,
    timeTaken: 165, // minutes
    totalTime: 180,
    rank: 1247,
    percentile: 94.2,
    submittedAt: new Date(),
    questions: [
      {
        id: "Q1",
        title: "Kinematics Problem",
        description: "A particle moves with constant acceleration of 2 m/s²...",
        type: "Single Choice",
        options: ["11 m/s", "13 m/s", "15 m/s", "17 m/s"],
        correctAnswer: "11 m/s",
        userAnswer: "11 m/s",
        subject: "Physics",
        chapter: "Mechanics",
        topic: "Kinematics",
        difficulty: "Medium",
        marks: 4,
        isCorrect: true,
        timeTaken: 120
      },
      {
        id: "Q2",
        title: "Chemical Equilibrium",
        description: "For the reaction N₂ + 3H₂ ⇌ 2NH₃...",
        type: "Numerical",
        correctAnswer: 1.64,
        userAnswer: 1.60,
        subject: "Chemistry",
        chapter: "Equilibrium",
        topic: "Chemical Equilibrium",
        difficulty: "Hard",
        marks: 4,
        isCorrect: false,
        timeTaken: 180
      },
      {
        id: "Q3",
        title: "Integration Problem",
        description: "Evaluate the definite integral ∫₀¹ x²e^x dx",
        type: "Single Choice",
        options: ["e - 2", "2e - 5", "e - 1", "3e - 7"],
        correctAnswer: "2e - 5",
        userAnswer: "2e - 5",
        subject: "Mathematics",
        chapter: "Calculus",
        topic: "Integration",
        difficulty: "Hard",
        marks: 4,
        isCorrect: true,
        timeTaken: 240
      }
    ],
    subjectWiseAnalysis: [
      {
        subject: "Physics",
        total: 30,
        correct: 24,
        incorrect: 4,
        unattempted: 2,
        marks: 96,
        totalMarks: 120
      },
      {
        subject: "Chemistry",
        total: 30,
        correct: 20,
        incorrect: 8,
        unattempted: 2,
        marks: 80,
        totalMarks: 120
      },
      {
        subject: "Mathematics",
        total: 30,
        correct: 18,
        incorrect: 10,
        unattempted: 2,
        marks: 72,
        totalMarks: 120
      }
    ],
    difficultyAnalysis: [
      {
        difficulty: "Easy",
        total: 30,
        correct: 28,
        percentage: 93.33
      },
      {
        difficulty: "Medium",
        total: 40,
        correct: 32,
        percentage: 80.0
      },
      {
        difficulty: "Hard",
        total: 20,
        correct: 12,
        percentage: 60.0
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 1000);
  }, [paperId]);

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return { text: "Excellent", variant: "default" as const };
    if (percentage >= 80) return { text: "Very Good", variant: "secondary" as const };
    if (percentage >= 70) return { text: "Good", variant: "outline" as const };
    if (percentage >= 60) return { text: "Average", variant: "outline" as const };
    return { text: "Needs Improvement", variant: "destructive" as const };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your performance...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return <div className="flex items-center justify-center min-h-screen">Result not found</div>;
  }

  const performanceBadge = getPerformanceBadge(result.percentage);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/pyq')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to PYQ Papers
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{result.paperName}</h1>
              <p className="text-muted-foreground">{result.exam} • {result.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <Card className="border-2 border-brand/20 bg-gradient-to-r from-brand/5 to-brand/10">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-brand rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-brand mb-2">
              {result.percentage.toFixed(1)}%
            </CardTitle>
            <CardDescription className="text-lg">
              <Badge variant={performanceBadge.variant} className="text-sm">
                {performanceBadge.text}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{result.obtainedMarks}</div>
                <div className="text-sm text-muted-foreground">Marks Scored</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">#{result.rank}</div>
                <div className="text-sm text-muted-foreground">Your Rank</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{result.percentile}%</div>
                <div className="text-sm text-muted-foreground">Percentile</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{result.timeTaken}m</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="questions">Question Review</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Score Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Score</span>
                      <span className="font-medium">{result.obtainedMarks}/{result.totalMarks}</span>
                    </div>
                    <Progress value={result.percentage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {result.questions.filter(q => q.isCorrect).length}
                      </div>
                      <div className="text-xs text-green-600">Correct</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600">
                        {result.questions.filter(q => q.isCorrect === false).length}
                      </div>
                      <div className="text-xs text-red-600">Incorrect</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-600">
                        {result.questions.filter(q => q.userAnswer === undefined).length}
                      </div>
                      <div className="text-xs text-gray-600">Unattempted</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Time Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Time Utilized</span>
                      <span className="font-medium">{result.timeTaken}/{result.totalTime} minutes</span>
                    </div>
                    <Progress value={(result.timeTaken / result.totalTime) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Average per question</span>
                      <span className="text-sm font-medium">
                        {(result.timeTaken / result.questions.length).toFixed(1)}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Time saved</span>
                      <span className="text-sm font-medium text-green-600">
                        {result.totalTime - result.timeTaken}m
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Difficulty Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Difficulty Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.difficultyAnalysis.map((item) => (
                      <div key={item.difficulty}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.difficulty}</span>
                          <span className="font-medium">
                            {item.correct}/{item.total} ({item.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Strengths</p>
                      <p className="text-xs text-green-700">Excellent performance in Physics and easy questions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Areas to Improve</p>
                      <p className="text-xs text-yellow-700">Focus more on Chemistry and hard difficulty questions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Recommendation</p>
                      <p className="text-xs text-blue-700">Practice more numerical problems in Chemistry</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.subjectWiseAnalysis.map((subject) => (
                <Card key={subject.subject}>
                  <CardHeader>
                    <CardTitle className="text-lg">{subject.subject}</CardTitle>
                    <CardDescription>
                      {subject.marks}/{subject.totalMarks} marks ({((subject.marks/subject.totalMarks)*100).toFixed(1)}%)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={(subject.marks/subject.totalMarks)*100} className="h-2" />
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-green-50 rounded">
                        <div className="text-sm font-bold text-green-600">{subject.correct}</div>
                        <div className="text-xs text-green-600">Correct</div>
                      </div>
                      <div className="p-2 bg-red-50 rounded">
                        <div className="text-sm font-bold text-red-600">{subject.incorrect}</div>
                        <div className="text-xs text-red-600">Wrong</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-gray-600">{subject.unattempted}</div>
                        <div className="text-xs text-gray-600">Skipped</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <div className="space-y-4">
              {result.questions.map((question, index) => (
                <Card key={question.id} className={`border-l-4 ${
                  question.isCorrect ? 'border-l-green-500' : 
                  question.isCorrect === false ? 'border-l-red-500' : 'border-l-gray-400'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">Q{index + 1}.</span>
                          <span className="font-medium">{question.title}</span>
                          <div className="flex items-center gap-1">
                            {question.isCorrect ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : question.isCorrect === false ? (
                              <XCircle className="h-4 w-4 text-red-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {question.subject}
                          </Badge>
                          <Badge variant={question.difficulty === 'Hard' ? 'destructive' : question.difficulty === 'Medium' ? 'default' : 'secondary'} className="text-xs">
                            {question.difficulty}
                          </Badge>
                          <span>+{question.marks} marks</span>
                          {question.timeTaken && (
                            <span>• {Math.floor(question.timeTaken / 60)}:{(question.timeTaken % 60).toString().padStart(2, '0')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">{question.description}</p>
                      
                      {question.type === "Single Choice" && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className={`p-2 rounded border text-sm ${
                              option === question.correctAnswer ? 'bg-green-50 border-green-200 text-green-800' :
                              option === question.userAnswer && question.userAnswer !== question.correctAnswer ? 'bg-red-50 border-red-200 text-red-800' :
                              'bg-gray-50 border-gray-200'
                            }`}>
                              <span className="font-medium mr-2">({String.fromCharCode(65 + optionIndex)})</span>
                              {option}
                              {option === question.correctAnswer && (
                                <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                              )}
                              {option === question.userAnswer && question.userAnswer !== question.correctAnswer && (
                                <span className="ml-2 text-red-600 font-medium">✗ Your Answer</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {(question.type === "Numerical" || question.type === "Integer Type") && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-green-50 rounded border border-green-200">
                            <p className="text-sm font-medium text-green-800">Correct Answer</p>
                            <p className="text-lg font-bold text-green-600">{question.correctAnswer}</p>
                          </div>
                          <div className={`p-3 rounded border ${
                            question.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                          }`}>
                            <p className={`text-sm font-medium ${
                              question.isCorrect ? 'text-green-800' : 'text-red-800'
                            }`}>Your Answer</p>
                            <p className={`text-lg font-bold ${
                              question.isCorrect ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {question.userAnswer || 'Not Attempted'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Peer Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-brand/5 rounded-lg">
                    <div className="text-2xl font-bold text-brand mb-1">{result.percentile}%</div>
                    <div className="text-sm text-muted-foreground">You performed better than {result.percentile}% of students</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Your Score</span>
                      <span className="font-medium">{result.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Score</span>
                      <span className="font-medium">68.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Top Score</span>
                      <span className="font-medium">96.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Historical Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-lg font-bold text-green-600">+5.2%</span>
                    </div>
                    <div className="text-sm text-green-600">Improvement from last attempt</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Attempt</span>
                      <span className="font-medium">{result.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Previous Best</span>
                      <span className="font-medium">77.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Performance</span>
                      <span className="font-medium">74.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild>
                <Link href={`/dashboard/pyq/attempt/${paperId}`}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retry Paper
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/pyq">
                  <BookOpen className="h-4 w-4 mr-2" />
                  More Papers
                </Link>
              </Button>
              <Button variant="outline">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark Paper
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Solutions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
