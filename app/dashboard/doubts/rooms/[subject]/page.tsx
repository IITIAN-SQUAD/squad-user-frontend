"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  Clock, 
  Send,
  Gamepad2,
  Brain,
  Target,
  Zap,
  ArrowLeft,
  Crown,
  Timer,
  CheckCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ActiveUser {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  status: "online" | "studying" | "away";
  currentActivity?: string;
}

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
    xp: number;
  };
  createdAt: Date;
  messageCount: number;
  lastActivity: Date;
  isActive: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface StudyGame {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  type: "quiz" | "flashcards" | "concept-match" | "speed-solve";
}

const subjectData = {
  physics: {
    name: "Physics",
    color: "bg-blue-500",
    activeUsers: 234,
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"]
  },
  chemistry: {
    name: "Chemistry", 
    color: "bg-green-500",
    activeUsers: 189,
    topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"]
  },
  mathematics: {
    name: "Mathematics",
    color: "bg-purple-500", 
    activeUsers: 312,
    topics: ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics"]
  }
};

const mockActiveUsers: ActiveUser[] = [
  {
    id: "1",
    name: "Rahul Kumar",
    xp: 2500,
    status: "studying",
    currentActivity: "Solving Mechanics problems"
  },
  {
    id: "2", 
    name: "Priya Singh",
    xp: 1800,
    status: "online",
    currentActivity: "In Quiz Battle"
  },
  {
    id: "3",
    name: "Arjun Patel", 
    xp: 3200,
    status: "online",
    currentActivity: "Helping others"
  },
  {
    id: "4",
    name: "Sneha Reddy",
    xp: 1500,
    status: "studying",
    currentActivity: "Reading concepts"
  }
];

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Projectile Motion with Air Resistance - Need Help!",
    author: {
      name: "Vikash Singh",
      xp: 1200
    },
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    messageCount: 12,
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    isActive: true
  },
  {
    id: "2",
    title: "Quick doubt: Energy conservation in collisions",
    author: {
      name: "Ananya Sharma",
      xp: 900
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messageCount: 8,
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    isActive: true
  }
];

const mockGames: StudyGame[] = [
  {
    id: "1",
    name: "Physics Quiz Battle",
    description: "Fast-paced multiple choice questions on Mechanics",
    participants: 8,
    maxParticipants: 12,
    difficulty: "medium",
    duration: "15 min",
    type: "quiz"
  },
  {
    id: "2",
    name: "Formula Flash Cards",
    description: "Match physics formulas with their applications",
    participants: 4,
    maxParticipants: 8,
    difficulty: "easy",
    duration: "10 min", 
    type: "flashcards"
  },
  {
    id: "3",
    name: "Concept Connections",
    description: "Link related physics concepts together",
    participants: 6,
    maxParticipants: 10,
    difficulty: "hard",
    duration: "20 min",
    type: "concept-match"
  }
];

const mockQuizQuestion: QuizQuestion = {
  id: "1",
  question: "A ball is thrown horizontally from a height of 20m with initial velocity 15 m/s. What is the time of flight? (g = 10 m/s²)",
  options: ["1 s", "2 s", "3 s", "4 s"],
  correctAnswer: 1,
  explanation: "Using h = ½gt², we get t = √(2h/g) = √(2×20/10) = 2 seconds",
  difficulty: "medium"
};

export default function StudyRoomPage() {
  const params = useParams();
  const subject = params.subject as string;
  const [message, setMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  const subjectInfo = subjectData[subject as keyof typeof subjectData];
  
  if (!subjectInfo) {
    return <div>Subject not found</div>;
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      setMessage("");
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "studying": return "bg-blue-500"; 
      case "away": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/doubts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Doubts
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${subjectInfo.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
              {subjectInfo.name[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{subjectInfo.name} Study Room</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{subjectInfo.activeUsers} active users</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{mockDiscussions.length} active discussions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="discussions">Live Discussions</TabsTrigger>
                <TabsTrigger value="games">Study Games</TabsTrigger>
                <TabsTrigger value="quiz">Quick Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Active Discussions</h2>
                    <Button 
                      className="bg-brand text-gray-900 hover:bg-brand/90"
                      onClick={() => window.location.href = `/dashboard/doubts/rooms/${subject}/create-discussion`}
                    >
                      Start New Discussion
                    </Button>
                  </div>

                  {mockDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{discussion.title}</h3>
                              {discussion.isActive && (
                                <Badge variant="default" className="bg-green-600">
                                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                                  Live
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {discussion.author.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{discussion.author.name}</span>
                                <span>{discussion.author.xp} XP</span>
                              </div>
                              <span>•</span>
                              <span>{formatDistanceToNow(discussion.createdAt, { addSuffix: true })}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{discussion.messageCount} messages</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>Last activity {formatDistanceToNow(discussion.lastActivity, { addSuffix: true })}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="games">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Quick Quiz</h2>
                    <Button 
                      className="bg-brand text-gray-900 hover:bg-brand/90"
                      onClick={() => window.location.href = `/dashboard/doubts/rooms/${subject}/create-quiz`}
                    >
                      Create Quiz
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockGames.map((game) => (
                      <Card key={game.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{game.name}</CardTitle>
                            <Badge className={getDifficultyColor(game.difficulty)}>
                              {game.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{game.description}</p>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{game.participants}/{game.maxParticipants} players</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Timer className="h-4 w-4" />
                                <span>{game.duration}</span>
                              </div>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-brand h-2 rounded-full" 
                                style={{ width: `${(game.participants / game.maxParticipants) * 100}%` }}
                              />
                            </div>

                            <Button 
                              className="w-full" 
                              variant={game.participants === game.maxParticipants ? "outline" : "default"}
                              disabled={game.participants === game.maxParticipants}
                            >
                              <Gamepad2 className="h-4 w-4 mr-2" />
                              {game.participants === game.maxParticipants ? "Room Full" : "Join Game"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quiz">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Quick Quiz Challenge</h2>
                    <Button 
                      className="bg-brand text-gray-900 hover:bg-brand/90"
                      onClick={() => window.location.href = `/dashboard/doubts/rooms/${subject}/create-quiz`}
                    >
                      Create Quiz
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Question 1 of 5
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-lg font-medium">{mockQuizQuestion.question}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {mockQuizQuestion.options.map((option, index) => (
                            <Button
                              key={index}
                              variant={selectedAnswer === index ? "default" : "outline"}
                              className={`p-4 h-auto text-left justify-start ${
                                showQuizResult && index === mockQuizQuestion.correctAnswer 
                                  ? "bg-green-100 border-green-500 text-green-800" 
                                  : showQuizResult && selectedAnswer === index && index !== mockQuizQuestion.correctAnswer
                                  ? "bg-red-100 border-red-500 text-red-800"
                                  : ""
                              }`}
                              onClick={() => !showQuizResult && handleQuizAnswer(index)}
                              disabled={showQuizResult}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                                <span>{option}</span>
                                {showQuizResult && index === mockQuizQuestion.correctAnswer && (
                                  <CheckCircle className="h-4 w-4 ml-auto" />
                                )}
                              </div>
                            </Button>
                          ))}
                        </div>

                        {showQuizResult && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-md">
                            <h4 className="font-semibold mb-2">Explanation:</h4>
                            <p className="text-sm">{mockQuizQuestion.explanation}</p>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="h-4 w-4" />
                            <span>+10 XP for correct answer</span>
                          </div>
                          
                          {showQuizResult ? (
                            <Button className="bg-brand text-gray-900 hover:bg-brand/90">
                              Next Question
                            </Button>
                          ) : (
                            <Button variant="outline" disabled>
                              Select an answer
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Users ({mockActiveUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockActiveUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm truncate">{user.name}</span>
                          {user.xp > 3000 && <Crown className="h-3 w-3 text-yellow-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{user.currentActivity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Quick Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-32 bg-gray-50 rounded-md p-3 text-sm text-muted-foreground">
                    Chat messages will appear here...
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Today's Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockActiveUsers.slice(0, 3).map((user, index) => (
                    <div key={user.id} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium flex-1">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.xp} XP</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
