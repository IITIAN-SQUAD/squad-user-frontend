"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  Search,
  Plus,
  Filter,
  BookOpen,
  Beaker,
  Calculator,
  Atom,
  Globe,
  History
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import ComingSoon from "@/components/ui/ComingSoon";
import { isFeatureEnabled } from "@/lib/features";

interface Doubt {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  author: {
    name: string;
    avatar?: string;
    xp: number;
  };
  createdAt: Date;
  upvotes: number;
  solutionCount: number;
  isResolved: boolean;
  tags: string[];
}

const subjects = [
  { id: "physics", name: "Physics", icon: Atom, color: "bg-blue-500", activeUsers: 234 },
  { id: "chemistry", name: "Chemistry", icon: Beaker, color: "bg-green-500", activeUsers: 189 },
  { id: "mathematics", name: "Mathematics", icon: Calculator, color: "bg-purple-500", activeUsers: 312 },
  { id: "biology", name: "Biology", icon: BookOpen, color: "bg-emerald-500", activeUsers: 156 },
  { id: "english", name: "English", icon: Globe, color: "bg-orange-500", activeUsers: 98 }
];

const mockDoubts: Doubt[] = [
  {
    id: "1",
    title: "How to solve projectile motion problems with air resistance?",
    content: "I'm struggling with projectile motion when air resistance is considered. The equations become too complex. Can someone explain a systematic approach?",
    subject: "Physics",
    topic: "Mechanics",
    author: {
      name: "Rahul Kumar",
      xp: 1250
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    upvotes: 15,
    solutionCount: 3,
    isResolved: false,
    tags: ["projectile", "mechanics", "air-resistance"]
  },
  {
    id: "2",
    title: "Organic Chemistry: SN1 vs SN2 reaction mechanisms",
    content: "I keep getting confused between SN1 and SN2 mechanisms. What are the key factors that determine which pathway a reaction will follow?",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    author: {
      name: "Priya Singh",
      xp: 890
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    upvotes: 22,
    solutionCount: 5,
    isResolved: true,
    tags: ["organic", "mechanisms", "substitution"]
  },
  {
    id: "3",
    title: "Integration by parts - when to use which method?",
    content: "I understand the formula for integration by parts, but I struggle to identify which function to choose as 'u' and which as 'dv'. Any tips?",
    subject: "Mathematics",
    topic: "Calculus",
    author: {
      name: "Arjun Patel",
      xp: 2100
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    upvotes: 18,
    solutionCount: 4,
    isResolved: false,
    tags: ["calculus", "integration", "methods"]
  }
];

export default function DoubtsPage() {
  if (!isFeatureEnabled('doubts')) {
    return (
      <ComingSoon 
        variant="page"
        title="Doubt Resolution Platform Coming Soon"
        message="We're creating a collaborative doubt resolution platform where you can get instant help from IIT experts, connect with study groups, and participate in interactive learning sessions. Stay tuned!"
      />
    );
  }

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "unsolved">("recent");
  const [doubts] = useState<Doubt[]>(mockDoubts);

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSubject = !selectedSubject || doubt.subject.toLowerCase() === selectedSubject;
    const matchesSearch = !searchTerm || 
      doubt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doubt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doubt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const sortedDoubts = [...filteredDoubts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.upvotes - a.upvotes;
      case "unsolved":
        return Number(a.isResolved) - Number(b.isResolved);
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Doubt Solving Platform</h1>
          <p className="text-muted-foreground">
            Get help from the community. Ask doubts, share solutions, and learn together.
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="browse">Browse Doubts</TabsTrigger>
            <TabsTrigger value="rooms">Study Rooms</TabsTrigger>
            <TabsTrigger value="my-doubts">My Doubts</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="space-y-6">
              {/* Header Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-1 gap-4 items-center">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search doubts, topics, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={sortBy === "recent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy("recent")}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Recent
                    </Button>
                    <Button
                      variant={sortBy === "popular" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy("popular")}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Popular
                    </Button>
                    <Button
                      variant={sortBy === "unsolved" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy("unsolved")}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Unsolved
                    </Button>
                  </div>
                </div>

                <Link href="/dashboard/doubts/ask">
                  <Button size="lg" className="bg-brand text-gray-900 hover:bg-brand/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask Doubt
                  </Button>
                </Link>
              </div>

              {/* Subject Filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedSubject === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(null)}
                >
                  All Subjects
                </Button>
                {subjects.map((subject) => (
                  <Button
                    key={subject.id}
                    variant={selectedSubject === subject.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    <subject.icon className="h-4 w-4 mr-1" />
                    {subject.name}
                  </Button>
                ))}
              </div>

              {/* Doubts List */}
              <div className="space-y-4">
                {sortedDoubts.map((doubt) => (
                  <Card key={doubt.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={doubt.author.avatar} />
                          <AvatarFallback>
                            {doubt.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <Link 
                                href={`/dashboard/doubts/${doubt.id}`}
                                className="text-lg font-semibold hover:text-brand transition-colors"
                              >
                                {doubt.title}
                              </Link>
                              {doubt.isResolved && (
                                <Badge variant="default" className="ml-2 bg-green-600">
                                  Resolved
                                </Badge>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {doubt.content}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="font-medium">{doubt.author.name}</span>
                            <span>{doubt.author.xp} XP</span>
                            <span>•</span>
                            <span>{formatDistanceToNow(doubt.createdAt, { addSuffix: true })}</span>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              {doubt.subject}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {doubt.topic}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <TrendingUp className="h-4 w-4" />
                              <span>{doubt.upvotes} upvotes</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MessageSquare className="h-4 w-4" />
                              <span>{doubt.solutionCount} solutions</span>
                            </div>
                            <div className="flex gap-1">
                              {doubt.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {sortedDoubts.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-2">No doubts found</h3>
                      <p>Try adjusting your search or filters, or be the first to ask a question!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rooms">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Subject Study Rooms</h2>
                <p className="text-muted-foreground">
                  Join live study sessions and collaborate with peers in real-time
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => {
                  const IconComponent = subject.icon;
                  return (
                    <Card key={subject.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl">{subject.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{subject.activeUsers} active users</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Active Discussions</span>
                              <span className="font-medium">12</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Solved Today</span>
                              <span className="font-medium text-green-600">8</span>
                            </div>
                          </div>

                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => window.location.href = `/dashboard/doubts/rooms/${subject.id}`}
                          >
                            Join Study Room
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-doubts">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Doubts</h2>
                <Link href="/dashboard/doubts/ask">
                  <Button className="bg-brand text-gray-900 hover:bg-brand/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask New Doubt
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">5</div>
                    <div className="text-sm text-muted-foreground">Total Asked</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">No doubts yet</h3>
                  <p>Start by asking your first question to get help from the community!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
