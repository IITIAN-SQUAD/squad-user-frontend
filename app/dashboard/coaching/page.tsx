"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Zap, 
  Star, 
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  Calendar,
  Trophy,
  Lightbulb,
  BarChart3,
  Timer,
  Flame,
  Crown,
  Lock
} from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";
import { isFeatureEnabled } from "@/lib/features";

interface WeakArea {
  subject: string;
  chapter: string;
  topic: string;
  weaknessScore: number; // 0-100, higher = weaker
  questionsAttempted: number;
  accuracy: number;
  lastAttempted: Date;
  daysSinceLastAttempt: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  improvementPotential: number;
}

interface CoachingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  estimatedImprovement: number;
  isPremium: boolean;
}

interface StudySession {
  id: string;
  title: string;
  type: "Concept Review" | "Practice Questions" | "Mock Test" | "Revision";
  duration: number;
  questions: number;
  difficulty: string;
  topics: string[];
  isCompleted: boolean;
  score?: number;
}

export default function CoachingPage() {
  if (!isFeatureEnabled('coaching')) {
    return (
      <ComingSoon 
        variant="page"
        title="AI Coaching Coming Soon"
        message="We're developing an advanced AI coaching system that will provide personalized study plans, identify your weak areas, and offer strategic guidance to help you excel. This feature will be available soon!"
      />
    );
  }

  const [selectedWeakArea, setSelectedWeakArea] = useState<WeakArea | null>(null);
  const [activeTab, setActiveTab] = useState("analysis");

  // Mock data based on user performance analysis
  const weakAreas: WeakArea[] = [
    {
      subject: "Physics",
      chapter: "Thermodynamics",
      topic: "Heat Engines",
      weaknessScore: 85,
      questionsAttempted: 12,
      accuracy: 33,
      lastAttempted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      daysSinceLastAttempt: 15,
      priority: "Critical",
      improvementPotential: 92
    },
    {
      subject: "Mathematics",
      chapter: "Calculus",
      topic: "Integration by Parts",
      weaknessScore: 78,
      questionsAttempted: 8,
      accuracy: 25,
      lastAttempted: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
      daysSinceLastAttempt: 22,
      priority: "Critical",
      improvementPotential: 88
    },
    {
      subject: "Chemistry",
      chapter: "Organic Chemistry",
      topic: "Reaction Mechanisms",
      weaknessScore: 72,
      questionsAttempted: 15,
      accuracy: 40,
      lastAttempted: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      daysSinceLastAttempt: 8,
      priority: "High",
      improvementPotential: 75
    },
    {
      subject: "Physics",
      chapter: "Optics",
      topic: "Wave Optics",
      weaknessScore: 65,
      questionsAttempted: 20,
      accuracy: 55,
      lastAttempted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      daysSinceLastAttempt: 5,
      priority: "Medium",
      improvementPotential: 68
    }
  ];

  const coachingPlans: CoachingPlan[] = [
    {
      id: "thermodynamics-mastery",
      title: "Thermodynamics Mastery Program",
      description: "Comprehensive program to master heat engines, entropy, and thermodynamic cycles",
      duration: "2 weeks",
      difficulty: "Advanced",
      topics: ["Heat Engines", "Carnot Cycle", "Entropy", "Second Law"],
      estimatedImprovement: 65,
      isPremium: true
    },
    {
      id: "integration-bootcamp",
      title: "Integration Techniques Bootcamp",
      description: "Master all integration methods with step-by-step guidance",
      duration: "10 days",
      difficulty: "Intermediate",
      topics: ["Integration by Parts", "Substitution", "Partial Fractions"],
      estimatedImprovement: 58,
      isPremium: true
    },
    {
      id: "organic-reactions",
      title: "Organic Reaction Mechanisms",
      description: "Understand and predict organic reaction pathways",
      duration: "1 week",
      difficulty: "Advanced",
      topics: ["SN1/SN2", "E1/E2", "Electrophilic Addition"],
      estimatedImprovement: 45,
      isPremium: false
    }
  ];

  const todaysSessions: StudySession[] = [
    {
      id: "session1",
      title: "Heat Engines Concept Review",
      type: "Concept Review",
      duration: 25,
      questions: 0,
      difficulty: "Medium",
      topics: ["Heat Engines", "Efficiency"],
      isCompleted: false
    },
    {
      id: "session2",
      title: "Integration Practice Set",
      type: "Practice Questions",
      duration: 45,
      questions: 15,
      difficulty: "Hard",
      topics: ["Integration by Parts"],
      isCompleted: true,
      score: 73
    },
    {
      id: "session3",
      title: "Organic Mechanisms Quiz",
      type: "Mock Test",
      duration: 30,
      questions: 10,
      difficulty: "Medium",
      topics: ["SN1", "SN2", "E1", "E2"],
      isCompleted: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getWeaknessColor = (score: number) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-orange-600";
    if (score >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="w-7 h-7 text-brand" />
              AI Coaching
            </h1>
            <p className="text-muted-foreground">Personalized learning path based on your performance analysis</p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Crown className="w-4 h-4 mr-1" />
            Premium Feature
          </Badge>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weak Areas</p>
                  <p className="text-2xl font-bold text-red-600">{weakAreas.filter(w => w.priority === "Critical").length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Improvement Potential</p>
                  <p className="text-2xl font-bold text-brand">+42%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-brand" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold text-orange-600">7 days</p>
                </div>
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sessions Today</p>
                  <p className="text-2xl font-bold text-green-600">1/3</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Weakness Analysis</TabsTrigger>
            <TabsTrigger value="plans">Coaching Plans</TabsTrigger>
            <TabsTrigger value="sessions">Today's Sessions</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  AI-Powered Weakness Analysis
                </CardTitle>
                <CardDescription>
                  Based on your challenge attempts, practice sessions, and time gaps between topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakAreas.map((area, index) => (
                    <Card key={index} className="border-l-4 border-l-red-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <h4 className="font-semibold">{area.subject} - {area.topic}</h4>
                              <p className="text-sm text-muted-foreground">{area.chapter}</p>
                            </div>
                            <Badge className={getPriorityColor(area.priority)}>
                              {area.priority}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getWeaknessColor(area.weaknessScore)}`}>
                              {area.weaknessScore}%
                            </div>
                            <p className="text-xs text-muted-foreground">Weakness Score</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Questions Attempted</p>
                            <p className="font-medium">{area.questionsAttempted}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Current Accuracy</p>
                            <p className="font-medium">{area.accuracy}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Days Since Last Attempt</p>
                            <p className="font-medium text-orange-600">{area.daysSinceLastAttempt} days</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Improvement Potential</p>
                            <p className="font-medium text-green-600">+{area.improvementPotential}%</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" className="bg-brand hover:bg-brand/90">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Start Coaching
                          </Button>
                          <Button variant="outline" size="sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Review Concepts
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coachingPlans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.isPremium ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' : ''}`}>
                  {plan.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <Badge variant="outline">{plan.duration}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant={
                        plan.difficulty === "Beginner" ? "default" :
                        plan.difficulty === "Intermediate" ? "secondary" : "destructive"
                      }>
                        {plan.difficulty}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Topics Covered:</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Expected Improvement</span>
                        <span className="font-medium text-green-600">+{plan.estimatedImprovement}%</span>
                      </div>
                      <Progress value={plan.estimatedImprovement} className="h-2" />
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.isPremium ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-brand hover:bg-brand/90'}`}
                      disabled={plan.isPremium}
                    >
                      {plan.isPremium ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Upgrade to Access
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Plan
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Personalized Sessions
                </CardTitle>
                <CardDescription>
                  AI-curated study sessions based on your weak areas and learning patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysSessions.map((session) => (
                    <Card key={session.id} className={`border-l-4 ${session.isCompleted ? 'border-l-green-500 bg-green-50/50' : 'border-l-blue-500'}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              session.isCompleted ? 'bg-green-100' : 'bg-blue-100'
                            }`}>
                              {session.isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <PlayCircle className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                            
                            <div>
                              <h4 className="font-semibold">{session.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  {session.duration} min
                                </span>
                                {session.questions > 0 && (
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    {session.questions} questions
                                  </span>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {session.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {session.isCompleted && session.score && (
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">{session.score}%</div>
                                <div className="text-xs text-muted-foreground">Score</div>
                              </div>
                            )}
                            
                            <Button 
                              variant={session.isCompleted ? "outline" : "default"}
                              size="sm"
                              disabled={session.isCompleted}
                            >
                              {session.isCompleted ? (
                                <>
                                  <Trophy className="w-4 h-4 mr-2" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="w-4 h-4 mr-2" />
                                  Start Session
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap gap-1">
                          {session.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sessions Completed</span>
                      <span className="font-medium">12/15</span>
                    </div>
                    <Progress value={80} />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weak Areas Improved</span>
                      <span className="font-medium">3/7</span>
                    </div>
                    <Progress value={43} />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Accuracy</span>
                      <span className="font-medium text-green-600">+12%</span>
                    </div>
                    <Progress value={67} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium text-sm">Consistency Master</p>
                        <p className="text-xs text-muted-foreground">7-day study streak</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                      <Trophy className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-sm">Weakness Warrior</p>
                        <p className="text-xs text-muted-foreground">Improved 3 weak areas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm">Quick Learner</p>
                        <p className="text-xs text-muted-foreground">Completed 5 concept reviews</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Alert className="border-purple-200 bg-purple-50">
              <Crown className="h-4 w-4" />
              <AlertDescription>
                <strong>Upgrade to Premium</strong> to unlock advanced analytics, personalized study plans, and 1-on-1 AI tutoring sessions.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
