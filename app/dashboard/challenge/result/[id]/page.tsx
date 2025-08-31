"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Target, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Minus,
  ArrowRight,
  Share2,
  Download,
  RotateCcw,
  Home
} from "lucide-react";
import Link from "next/link";

export default function ChallengeResultPage() {
  const params = useParams();
  const challengeId = params.id as string;

  // Mock result data - would come from API
  const challengeResult = {
    id: challengeId,
    title: "Daily Physics Practice",
    description: "Mixed topics from all chapters",
    difficulty: "Medium",
    totalQuestions: 25,
    duration: 60, // minutes
    completedAt: "2025-09-01T14:30:00",
    
    // User's performance
    score: 85,
    correctAnswers: 21,
    wrongAnswers: 3,
    unattempted: 1,
    timeTaken: 52, // minutes
    accuracy: 87.5,
    
    // Ranking
    rank: 45,
    totalParticipants: 1250,
    percentile: 96.4,
    
    // Subject-wise breakdown
    subjectPerformance: [
      { subject: "Mechanics", total: 10, correct: 9, accuracy: 90 },
      { subject: "Thermodynamics", total: 8, correct: 7, accuracy: 87.5 },
      { subject: "Electromagnetism", total: 7, correct: 5, accuracy: 71.4 }
    ],
    
    // Detailed question analysis
    questions: [
      {
        id: "PHY001",
        question: "A particle moves with constant acceleration. If its velocity changes from 10 m/s to 30 m/s in 4 seconds, find the acceleration.",
        subject: "Mechanics",
        topic: "Kinematics",
        difficulty: "Easy",
        correctAnswer: "5 m/s²",
        userAnswer: "5 m/s²",
        isCorrect: true,
        explanation: "Using v = u + at, we get a = (v-u)/t = (30-10)/4 = 5 m/s²",
        timeSpent: 45 // seconds
      },
      {
        id: "PHY002", 
        question: "Calculate the work done by a force of 10 N acting on a body that moves 5 m in the direction of force.",
        subject: "Mechanics",
        topic: "Work & Energy",
        difficulty: "Easy",
        correctAnswer: "50 J",
        userAnswer: "50 J",
        isCorrect: true,
        explanation: "Work = Force × Distance = 10 N × 5 m = 50 J",
        timeSpent: 30
      },
      {
        id: "PHY003",
        question: "A gas undergoes an isothermal process. If the initial volume is 2 L and final volume is 8 L, and initial pressure is 4 atm, find final pressure.",
        subject: "Thermodynamics", 
        topic: "Gas Laws",
        difficulty: "Medium",
        correctAnswer: "1 atm",
        userAnswer: "2 atm",
        isCorrect: false,
        explanation: "For isothermal process: P₁V₁ = P₂V₂, so P₂ = P₁V₁/V₂ = 4×2/8 = 1 atm",
        timeSpent: 120
      }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Challenge Results</h1>
            <p className="text-muted-foreground">{challengeResult.title}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Overall Performance Card */}
        <Card className={`${getScoreBgColor(challengeResult.score)} border-2`}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Score */}
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(challengeResult.score)} mb-2`}>
                  {challengeResult.score}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
              
              {/* Rank */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="h-6 w-6 text-brand" />
                  <span className="text-2xl font-bold">#{challengeResult.rank}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rank out of {challengeResult.totalParticipants.toLocaleString()}
                </p>
              </div>
              
              {/* Percentile */}
              <div className="text-center">
                <div className="text-2xl font-bold text-brand mb-2">
                  {challengeResult.percentile}%
                </div>
                <p className="text-sm text-muted-foreground">Percentile</p>
              </div>
              
              {/* Time */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold">{challengeResult.timeTaken}m</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Time Taken (of {challengeResult.duration}m)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{challengeResult.correctAnswers}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
              </div>
              <Progress value={(challengeResult.correctAnswers / challengeResult.totalQuestions) * 100} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{challengeResult.wrongAnswers}</p>
                  <p className="text-sm text-muted-foreground">Wrong</p>
                </div>
              </div>
              <Progress value={(challengeResult.wrongAnswers / challengeResult.totalQuestions) * 100} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Minus className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">{challengeResult.unattempted}</p>
                  <p className="text-sm text-muted-foreground">Unattempted</p>
                </div>
              </div>
              <Progress value={(challengeResult.unattempted / challengeResult.totalQuestions) * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
            <CardDescription>Your performance breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {challengeResult.subjectPerformance.map((subject) => (
                <div key={subject.subject} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{subject.subject}</h4>
                      <span className="text-sm text-muted-foreground">
                        {subject.correct}/{subject.total} correct
                      </span>
                    </div>
                    <Progress value={subject.accuracy} className="h-2" />
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-lg font-bold">{subject.accuracy}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Time Analysis</CardTitle>
              <CardDescription>How you spent your time during the challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Time Used</span>
                  <span className="text-sm">{challengeResult.timeTaken} minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Time Remaining</span>
                  <span className="text-sm">{challengeResult.duration - challengeResult.timeTaken} minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average per Question</span>
                  <span className="text-sm">{Math.round((challengeResult.timeTaken * 60) / challengeResult.totalQuestions)} seconds</span>
                </div>
                <Progress value={(challengeResult.timeTaken / challengeResult.duration) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  You used {Math.round((challengeResult.timeTaken / challengeResult.duration) * 100)}% of the allocated time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accuracy Insights</CardTitle>
              <CardDescription>Your performance compared to averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Your Accuracy</span>
                  <span className="text-sm font-bold text-brand">{challengeResult.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Platform Average</span>
                  <span className="text-sm">73.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Top 10% Average</span>
                  <span className="text-sm">91.5%</span>
                </div>
                <Progress value={challengeResult.accuracy} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {challengeResult.accuracy > 73.2 ? 'Above' : 'Below'} platform average
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Question Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Question-wise Detailed Report</CardTitle>
            <CardDescription>Complete breakdown of each question with explanations</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Questions ({challengeResult.totalQuestions})</TabsTrigger>
                <TabsTrigger value="correct">Correct ({challengeResult.correctAnswers})</TabsTrigger>
                <TabsTrigger value="wrong">Wrong ({challengeResult.wrongAnswers})</TabsTrigger>
                <TabsTrigger value="unattempted">Unattempted ({challengeResult.unattempted})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4 mt-6">
                {challengeResult.questions.map((question, index) => (
                  <Card key={question.id} className={`border-l-4 ${
                    question.isCorrect ? 'border-l-green-500' : question.userAnswer ? 'border-l-red-500' : 'border-l-gray-400'
                  }`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">Q{index + 1}. {question.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={question.isCorrect ? "default" : "destructive"} className="text-xs">
                              {question.isCorrect ? "Correct" : question.userAnswer ? "Wrong" : "Unattempted"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
                            <Badge variant="outline" className="text-xs">{question.subject}</Badge>
                            <span className="text-xs text-muted-foreground">4 marks</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {question.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : question.userAnswer ? (
                            <XCircle className="h-5 w-5 text-red-600" />
                          ) : (
                            <Minus className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        {question.question}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="font-medium mb-1">Your Answer:</p>
                          <p className={question.isCorrect ? "text-green-600" : question.userAnswer ? "text-red-600" : "text-gray-500"}>
                            {question.userAnswer || "Not attempted"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Correct Answer:</p>
                          <p className="text-green-600 font-medium">{question.correctAnswer}</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">Detailed Explanation</h5>
                        <p className="text-sm text-blue-800 mb-3">
                          {question.explanation || "This question tests your understanding of fundamental concepts. The correct approach involves analyzing the given information systematically and applying the relevant formulas or principles."}
                        </p>
                        
                        <div className="mb-3">
                          <p className="font-medium text-blue-900 text-xs mb-1">Key Concepts:</p>
                          <div className="flex flex-wrap gap-1">
                            {(question.concepts || ['Problem Solving', 'Analytical Thinking']).map((concept, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                                {concept}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="font-medium text-blue-900">Time Spent:</p>
                            <p className="text-blue-800">{question.timeSpent || Math.floor(Math.random() * 120 + 30)} seconds</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-900">Difficulty Level:</p>
                            <p className="text-blue-800">{question.difficulty}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="correct" className="space-y-4 mt-6">
                {challengeResult.questions.filter(q => q.isCorrect).map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">Q{challengeResult.questions.indexOf(question) + 1}. {question.question}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="default" className="text-xs">Correct</Badge>
                            <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
                            <Badge variant="outline" className="text-xs">{question.subject}</Badge>
                            <span className="text-xs text-muted-foreground">4 marks</span>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">{question.question}</div>
                      <div className="text-sm">
                        <p className="font-medium mb-1">Your Answer:</p>
                        <p className="text-green-600">{question.userAnswer}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="wrong" className="space-y-4 mt-6">
                {challengeResult.questions.filter(q => !q.isCorrect && q.userAnswer).map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-l-red-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">Q{challengeResult.questions.indexOf(question) + 1}. {question.question}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="destructive" className="text-xs">Wrong</Badge>
                            <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
                            <Badge variant="outline" className="text-xs">{question.subject}</Badge>
                            <span className="text-xs text-muted-foreground">4 marks</span>
                          </div>
                        </div>
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">{question.question}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium mb-1">Your Answer:</p>
                          <p className="text-red-600 bg-red-50 p-2 rounded">{question.userAnswer}</p>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Correct Answer:</p>
                          <p className="text-green-600 bg-green-50 p-2 rounded font-medium">{question.correctAnswer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="unattempted" className="space-y-4 mt-6">
                {challengeResult.questions.filter(q => !q.userAnswer).map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-l-gray-400">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">Q{challengeResult.questions.indexOf(question) + 1}. {question.question}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">Unattempted</Badge>
                            <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
                            <Badge variant="outline" className="text-xs">{question.subject}</Badge>
                            <span className="text-xs text-muted-foreground">4 marks</span>
                          </div>
                        </div>
                        <Minus className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">{question.question}</div>
                      <div className="text-sm">
                        <p className="font-medium mb-1">Correct Answer:</p>
                        <p className="text-green-600 bg-green-50 p-2 rounded font-medium">{question.correctAnswer}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/dashboard/challenge/attempt/${challengeId}`}>
            <Button size="lg" className="w-full sm:w-auto">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry Challenge
            </Button>
          </Link>
          <Link href="/dashboard/challenge">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Back to Challenges
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
