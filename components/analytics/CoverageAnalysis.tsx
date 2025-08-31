"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface CoverageData {
  name: string;
  attempted: number;
  total: number;
  accuracy: number;
  chapters?: CoverageData[];
  topics?: CoverageData[];
}

export default function CoverageAnalysis() {
  const subjectData: CoverageData[] = [
    {
      name: "Physics",
      attempted: 245,
      total: 320,
      accuracy: 72,
      chapters: [
        {
          name: "Mechanics",
          attempted: 85,
          total: 100,
          accuracy: 78,
          topics: [
            { name: "Kinematics", attempted: 25, total: 30, accuracy: 82 },
            { name: "Dynamics", attempted: 30, total: 35, accuracy: 75 },
            { name: "Work & Energy", attempted: 20, total: 25, accuracy: 68 },
            { name: "Rotational Motion", attempted: 10, total: 10, accuracy: 90 }
          ]
        },
        {
          name: "Thermodynamics",
          attempted: 35,
          total: 50,
          accuracy: 58,
          topics: [
            { name: "Laws of Thermodynamics", attempted: 15, total: 20, accuracy: 60 },
            { name: "Heat Engines", attempted: 12, total: 18, accuracy: 55 },
            { name: "Kinetic Theory", attempted: 8, total: 12, accuracy: 62 }
          ]
        },
        {
          name: "Electromagnetism",
          attempted: 65,
          total: 80,
          accuracy: 69,
          topics: [
            { name: "Electric Field", attempted: 20, total: 25, accuracy: 75 },
            { name: "Magnetic Field", attempted: 25, total: 30, accuracy: 68 },
            { name: "Electromagnetic Induction", attempted: 20, total: 25, accuracy: 65 }
          ]
        },
        {
          name: "Optics",
          attempted: 40,
          total: 60,
          accuracy: 85,
          topics: [
            { name: "Ray Optics", attempted: 25, total: 35, accuracy: 88 },
            { name: "Wave Optics", attempted: 15, total: 25, accuracy: 80 }
          ]
        },
        {
          name: "Modern Physics",
          attempted: 20,
          total: 30,
          accuracy: 75,
          topics: [
            { name: "Atomic Structure", attempted: 12, total: 18, accuracy: 78 },
            { name: "Nuclear Physics", attempted: 8, total: 12, accuracy: 70 }
          ]
        }
      ]
    },
    {
      name: "Chemistry",
      attempted: 198,
      total: 280,
      accuracy: 81,
      chapters: [
        {
          name: "Physical Chemistry",
          attempted: 75,
          total: 100,
          accuracy: 78,
          topics: [
            { name: "Chemical Kinetics", attempted: 20, total: 25, accuracy: 85 },
            { name: "Thermodynamics", attempted: 25, total: 35, accuracy: 75 },
            { name: "Electrochemistry", attempted: 18, total: 25, accuracy: 72 },
            { name: "Solutions", attempted: 12, total: 15, accuracy: 88 }
          ]
        },
        {
          name: "Organic Chemistry",
          attempted: 68,
          total: 90,
          accuracy: 72,
          topics: [
            { name: "Hydrocarbons", attempted: 25, total: 30, accuracy: 78 },
            { name: "Functional Groups", attempted: 20, total: 25, accuracy: 68 },
            { name: "Biomolecules", attempted: 15, total: 20, accuracy: 70 },
            { name: "Polymers", attempted: 8, total: 15, accuracy: 65 }
          ]
        },
        {
          name: "Inorganic Chemistry",
          attempted: 55,
          total: 90,
          accuracy: 89,
          topics: [
            { name: "Periodic Table", attempted: 20, total: 25, accuracy: 92 },
            { name: "Chemical Bonding", attempted: 18, total: 25, accuracy: 88 },
            { name: "Coordination Compounds", attempted: 12, total: 20, accuracy: 85 },
            { name: "Metallurgy", attempted: 5, total: 20, accuracy: 90 }
          ]
        }
      ]
    },
    {
      name: "Mathematics",
      attempted: 312,
      total: 400,
      accuracy: 68,
      chapters: [
        {
          name: "Algebra",
          attempted: 85,
          total: 100,
          accuracy: 75,
          topics: [
            { name: "Complex Numbers", attempted: 25, total: 30, accuracy: 80 },
            { name: "Quadratic Equations", attempted: 30, total: 35, accuracy: 78 },
            { name: "Sequences & Series", attempted: 20, total: 25, accuracy: 68 },
            { name: "Permutations & Combinations", attempted: 10, total: 10, accuracy: 85 }
          ]
        },
        {
          name: "Calculus",
          attempted: 95,
          total: 120,
          accuracy: 62,
          topics: [
            { name: "Limits", attempted: 25, total: 30, accuracy: 70 },
            { name: "Derivatives", attempted: 35, total: 45, accuracy: 65 },
            { name: "Integrals", attempted: 25, total: 35, accuracy: 55 },
            { name: "Differential Equations", attempted: 10, total: 10, accuracy: 60 }
          ]
        },
        {
          name: "Coordinate Geometry",
          attempted: 72,
          total: 90,
          accuracy: 78,
          topics: [
            { name: "Straight Lines", attempted: 25, total: 30, accuracy: 82 },
            { name: "Circles", attempted: 20, total: 25, accuracy: 75 },
            { name: "Parabola", attempted: 15, total: 20, accuracy: 70 },
            { name: "Ellipse & Hyperbola", attempted: 12, total: 15, accuracy: 85 }
          ]
        },
        {
          name: "Trigonometry",
          attempted: 40,
          total: 60,
          accuracy: 72,
          topics: [
            { name: "Trigonometric Functions", attempted: 25, total: 35, accuracy: 75 },
            { name: "Inverse Trigonometry", attempted: 15, total: 25, accuracy: 68 }
          ]
        },
        {
          name: "Statistics & Probability",
          attempted: 20,
          total: 30,
          accuracy: 85,
          topics: [
            { name: "Probability", attempted: 12, total: 18, accuracy: 88 },
            { name: "Statistics", attempted: 8, total: 12, accuracy: 80 }
          ]
        }
      ]
    }
  ];

  const getCompletionStatus = (attempted: number, total: number) => {
    const percentage = (attempted / total) * 100;
    if (percentage === 100) return { icon: CheckCircle, color: "text-green-600", status: "Complete" };
    if (percentage >= 70) return { icon: AlertCircle, color: "text-yellow-600", status: "In Progress" };
    return { icon: Circle, color: "text-gray-400", status: "Not Started" };
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-green-600";
    if (accuracy >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Coverage Analysis</CardTitle>
        <CardDescription>
          Comprehensive breakdown of your progress across subjects, chapters, and topics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="subjects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {subjectData.map((subject) => {
                const completionPercentage = (subject.attempted / subject.total) * 100;
                const status = getCompletionStatus(subject.attempted, subject.total);
                const StatusIcon = status.icon;

                return (
                  <div key={subject.name} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`h-5 w-5 ${status.color}`} />
                        <h3 className="font-semibold text-lg">{subject.name}</h3>
                        <Badge variant="outline" className={status.color}>
                          {status.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getAccuracyColor(subject.accuracy)}`}>
                          {subject.accuracy}%
                        </div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {subject.attempted}/{subject.total} questions</span>
                        <span>{Math.round(completionPercentage)}%</span>
                      </div>
                      <Progress 
                        value={completionPercentage} 
                        className="h-2"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="chapters" className="space-y-4 mt-6">
            {subjectData.map((subject) => (
              <div key={subject.name} className="space-y-3">
                <h3 className="text-lg font-semibold text-brand-navy">{subject.name}</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {subject.chapters?.map((chapter) => {
                    const completionPercentage = (chapter.attempted / chapter.total) * 100;
                    const status = getCompletionStatus(chapter.attempted, chapter.total);
                    const StatusIcon = status.icon;

                    return (
                      <div key={chapter.name} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`h-4 w-4 ${status.color}`} />
                            <span className="font-medium">{chapter.name}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`text-sm font-medium ${getAccuracyColor(chapter.accuracy)}`}>
                              {chapter.accuracy}%
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {chapter.attempted}/{chapter.total}
                            </span>
                          </div>
                        </div>
                        <Progress value={completionPercentage} className="h-1" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="topics" className="space-y-4 mt-6">
            {subjectData.map((subject) => (
              <div key={subject.name} className="space-y-3">
                <h3 className="text-lg font-semibold text-brand-navy">{subject.name}</h3>
                {subject.chapters?.map((chapter) => (
                  <div key={chapter.name} className="ml-4 space-y-2">
                    <h4 className="font-medium text-gray-700">{chapter.name}</h4>
                    <div className="grid gap-2 ml-4">
                      {chapter.topics?.map((topic) => {
                        const completionPercentage = (topic.attempted / topic.total) * 100;
                        const status = getCompletionStatus(topic.attempted, topic.total);
                        const StatusIcon = status.icon;

                        return (
                          <div key={topic.name} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <StatusIcon className={`h-3 w-3 ${status.color}`} />
                              <span className="text-sm">{topic.name}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`text-xs font-medium ${getAccuracyColor(topic.accuracy)}`}>
                                {topic.accuracy}%
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {topic.attempted}/{topic.total}
                              </span>
                              <div className="w-16">
                                <Progress value={completionPercentage} className="h-1" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
