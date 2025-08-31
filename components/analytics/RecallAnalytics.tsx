"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCw, Clock, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";

interface RecallItem {
  id: string;
  question: string;
  topic: string;
  subject: string;
  lastAttempted: string;
  nextReview: string;
  interval: number; // days
  easeFactor: number;
  repetitions: number;
  accuracy: number;
  status: 'due' | 'upcoming' | 'mastered' | 'learning';
}

export default function RecallAnalytics() {
  const recallData: RecallItem[] = [
    {
      id: '1',
      question: 'Newton\'s Second Law Applications',
      topic: 'Dynamics',
      subject: 'Physics',
      lastAttempted: '2024-08-25',
      nextReview: '2024-09-01',
      interval: 7,
      easeFactor: 2.5,
      repetitions: 3,
      accuracy: 85,
      status: 'due'
    },
    {
      id: '2',
      question: 'Organic Reaction Mechanisms',
      topic: 'Organic Chemistry',
      subject: 'Chemistry',
      lastAttempted: '2024-08-28',
      nextReview: '2024-09-02',
      interval: 5,
      easeFactor: 2.2,
      repetitions: 2,
      accuracy: 72,
      status: 'upcoming'
    },
    {
      id: '3',
      question: 'Integration by Parts',
      topic: 'Calculus',
      subject: 'Mathematics',
      lastAttempted: '2024-08-20',
      nextReview: '2024-08-31',
      interval: 11,
      easeFactor: 2.8,
      repetitions: 5,
      accuracy: 95,
      status: 'due'
    },
    {
      id: '4',
      question: 'Electromagnetic Induction',
      topic: 'Electromagnetism',
      subject: 'Physics',
      lastAttempted: '2024-08-30',
      nextReview: '2024-09-15',
      interval: 16,
      easeFactor: 3.1,
      repetitions: 6,
      accuracy: 98,
      status: 'mastered'
    },
    {
      id: '5',
      question: 'Thermodynamic Cycles',
      topic: 'Thermodynamics',
      subject: 'Physics',
      lastAttempted: '2024-08-29',
      nextReview: '2024-09-01',
      interval: 3,
      easeFactor: 1.8,
      repetitions: 1,
      accuracy: 45,
      status: 'learning'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'due':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'mastered':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'learning':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return <Brain className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'mastered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'learning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntilReview = (nextReview: string) => {
    const today = new Date();
    const reviewDate = new Date(nextReview);
    const diffTime = reviewDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRetentionStrength = (easeFactor: number, repetitions: number) => {
    const strength = Math.min(100, (easeFactor * repetitions * 10));
    return Math.round(strength);
  };

  const dueItems = recallData.filter(item => item.status === 'due');
  const upcomingItems = recallData.filter(item => item.status === 'upcoming');
  const masteredItems = recallData.filter(item => item.status === 'mastered');
  const learningItems = recallData.filter(item => item.status === 'learning');

  const totalRetention = Math.round(
    recallData.reduce((sum, item) => sum + getRetentionStrength(item.easeFactor, item.repetitions), 0) / recallData.length
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due for Review</p>
                <p className="text-2xl font-bold text-red-600">{dueItems.length}</p>
                <p className="text-xs text-muted-foreground">Needs immediate attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Reviews</p>
                <p className="text-2xl font-bold text-yellow-600">{upcomingItems.length}</p>
                <p className="text-xs text-muted-foreground">Next 7 days</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mastered Topics</p>
                <p className="text-2xl font-bold text-green-600">{masteredItems.length}</p>
                <p className="text-xs text-muted-foreground">Well retained</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retention Score</p>
                <p className="text-2xl font-bold text-purple-600">{totalRetention}%</p>
                <p className="text-xs text-muted-foreground">Overall memory strength</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Due Items */}
      {dueItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Items Due for Review</span>
              <Badge variant="destructive">{dueItems.length}</Badge>
            </CardTitle>
            <CardDescription>
              These topics need immediate review to maintain retention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dueItems.map((item) => (
              <div key={item.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status)}
                    <span className="font-medium">{item.question}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.subject} • {item.topic}
                    </Badge>
                  </div>
                  <Button size="sm" variant="destructive">
                    Review Now
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Last Attempt:</span> {item.lastAttempted}
                  </div>
                  <div>
                    <span className="font-medium">Accuracy:</span> {item.accuracy}%
                  </div>
                  <div>
                    <span className="font-medium">Repetitions:</span> {item.repetitions}
                  </div>
                  <div>
                    <span className="font-medium">Overdue:</span> {Math.abs(getDaysUntilReview(item.nextReview))} days
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* All Items Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Spaced Repetition Schedule</span>
          </CardTitle>
          <CardDescription>
            All topics in your spaced repetition system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recallData.map((item) => {
            const daysUntil = getDaysUntilReview(item.nextReview);
            const retentionStrength = getRetentionStrength(item.easeFactor, item.repetitions);

            return (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <h4 className="font-medium">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.subject} • {item.topic}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                    {item.status !== 'due' && (
                      <Badge variant="outline">
                        {daysUntil > 0 ? `${daysUntil} days` : 'Today'}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Accuracy:</span>
                    <div className="font-medium">{item.accuracy}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Retention:</span>
                    <div className="font-medium">{retentionStrength}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Repetitions:</span>
                    <div className="font-medium">{item.repetitions}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Interval:</span>
                    <div className="font-medium">{item.interval} days</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ease Factor:</span>
                    <div className="font-medium">{item.easeFactor.toFixed(1)}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Memory Strength</span>
                    <span>{retentionStrength}%</span>
                  </div>
                  <Progress value={retentionStrength} className="h-2" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Learning Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Review Schedule</span>
          </CardTitle>
          <CardDescription>
            Plan your study sessions based on spaced repetition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Today', 'Tomorrow', 'Next 3 days', 'Next week'].map((period, index) => {
              const count = index === 0 ? dueItems.length : 
                           index === 1 ? 2 : 
                           index === 2 ? 3 : 5;
              
              return (
                <div key={period} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{period}</h4>
                    <p className="text-sm text-muted-foreground">
                      {count} topic{count !== 1 ? 's' : ''} to review
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Schedule Review
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
