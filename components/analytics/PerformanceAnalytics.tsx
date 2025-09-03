"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus, Target, Clock, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function PerformanceAnalytics() {
  const performanceData = [
    { date: '2024-01', accuracy: 65, speed: 45, questions: 120 },
    { date: '2024-02', accuracy: 68, speed: 48, questions: 135 },
    { date: '2024-03', accuracy: 72, speed: 52, questions: 148 },
    { date: '2024-04', accuracy: 69, speed: 55, questions: 162 },
    { date: '2024-05', accuracy: 74, speed: 58, questions: 175 },
    { date: '2024-06', accuracy: 76, speed: 61, questions: 189 },
    { date: '2024-07', accuracy: 78, speed: 63, questions: 201 },
    { date: '2024-08', accuracy: 81, speed: 65, questions: 218 }
  ];

  const difficultyData = [
    { name: 'Easy', attempted: 145, correct: 132, accuracy: 91, color: '#10b981' },
    { name: 'Medium', attempted: 298, correct: 223, accuracy: 75, color: '#f59e0b' },
    { name: 'Hard', attempted: 187, correct: 112, accuracy: 60, color: '#ef4444' }
  ];

  const timeData = [
    { timeRange: '0-30s', count: 89, accuracy: 85 },
    { timeRange: '30s-1m', count: 156, accuracy: 78 },
    { timeRange: '1-2m', count: 234, accuracy: 72 },
    { timeRange: '2-3m', count: 98, accuracy: 68 },
    { timeRange: '3m+', count: 53, accuracy: 62 }
  ];

  const weeklyData = [
    { day: 'Mon', questions: 12, accuracy: 75, time: 45 },
    { day: 'Tue', questions: 18, accuracy: 82, time: 62 },
    { day: 'Wed', questions: 15, accuracy: 78, time: 48 },
    { day: 'Thu', questions: 22, accuracy: 85, time: 71 },
    { day: 'Fri', questions: 20, accuracy: 79, time: 58 },
    { day: 'Sat', questions: 25, accuracy: 88, time: 89 },
    { day: 'Sun', questions: 16, accuracy: 73, time: 52 }
  ];

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return "text-green-600";
    if (current < previous) return "text-red-600";
    return "text-gray-400";
  };

  const currentMonth = performanceData[performanceData.length - 1];
  const previousMonth = performanceData[performanceData.length - 2];

  return (
    <div className="space-y-6 w-full">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">Overall Accuracy</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl sm:text-2xl font-bold">{currentMonth.accuracy}%</p>
                  {getTrendIcon(currentMonth.accuracy, previousMonth.accuracy)}
                </div>
              </div>
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0" />
            </div>
            <Progress value={currentMonth.accuracy} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">Avg Speed</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl sm:text-2xl font-bold">{currentMonth.speed}s</p>
                  {getTrendIcon(previousMonth.speed, currentMonth.speed)} {/* Reverse for speed */}
                </div>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Per question
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">Questions Solved</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl sm:text-2xl font-bold">{currentMonth.questions}</p>
                  {getTrendIcon(currentMonth.questions, previousMonth.questions)}
                </div>
              </div>
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Total attempts
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">Consistency Score</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl sm:text-2xl font-bold">8.4</p>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">C</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Current streak
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your accuracy and speed over the past 8 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Accuracy (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="speed" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Speed (seconds)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="difficulty" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Difficulty</CardTitle>
                <CardDescription>How you perform across different difficulty levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {difficultyData.map((level) => (
                  <div key={level.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: level.color }}
                        />
                        <span className="font-medium">{level.name}</span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold">{level.accuracy}%</div>
                        <div className="text-xs text-muted-foreground">
                          {level.correct}/{level.attempted}
                        </div>
                      </div>
                    </div>
                    <Progress value={level.accuracy} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Difficulty Distribution</CardTitle>
                <CardDescription>Questions attempted by difficulty</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="attempted"
                        label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      >
                        {difficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Time Taken</CardTitle>
              <CardDescription>Accuracy vs time spent per question</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeRange" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Questions" />
                    <Bar dataKey="accuracy" fill="#10b981" name="Accuracy %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Pattern</CardTitle>
              <CardDescription>Your performance across different days of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="questions" fill="#8884d8" name="Questions" />
                    <Bar dataKey="accuracy" fill="#82ca9d" name="Accuracy %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
