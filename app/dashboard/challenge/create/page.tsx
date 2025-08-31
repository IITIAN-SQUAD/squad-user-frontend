"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Filter, 
  Search, 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  Trophy, 
  Target,
  BookOpen,
  Zap,
  X,
  Eye,
  Trash2,
  Import,
  Hash
} from "lucide-react";

interface Question {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  year: number;
  type: "Single Choice" | "Multiple Choice" | "Integer Type" | "Numerical";
  avgAccuracy: number;
}

interface ChallengeFilters {
  subjects: string[];
  chapters: string[];
  topics: string[];
  years: (string | number)[];
  difficulty: string[];
  questionType: string[];
}

export default function CreateChallengePage() {
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [duration, setDuration] = useState(60); // minutes
  const [isScheduled, setIsScheduled] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [challengeType, setChallengeType] = useState<'personal' | 'public' | 'scheduled'>('personal');
  const [instructions, setInstructions] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("18:00");
  const [maxParticipants, setMaxParticipants] = useState(100);
  
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionIdInput, setQuestionIdInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<ChallengeFilters>({
    subjects: [],
    chapters: [],
    topics: [],
    years: [],
    difficulty: [],
    questionType: []
  });

  // Mock data
  const mockSubjects = [
    { name: "Physics", chapters: ["Mechanics", "Thermodynamics", "Optics"] },
    { name: "Chemistry", chapters: ["Organic", "Inorganic", "Physical"] },
    { name: "Mathematics", chapters: ["Algebra", "Calculus", "Geometry"] }
  ];

  const mockQuestions: Question[] = [
    {
      id: "PHY01",
      title: "A particle moves with constant acceleration. Find the velocity after 5 seconds.",
      subject: "Physics",
      chapter: "Mechanics",
      topic: "Kinematics",
      difficulty: "Medium",
      year: 2023,
      type: "Single Choice",
      avgAccuracy: 78
    },
    {
      id: "CHE02", 
      title: "Calculate the pH of a 0.1M HCl solution.",
      subject: "Chemistry",
      chapter: "Physical",
      topic: "Acids and Bases",
      difficulty: "Easy",
      year: 2022,
      type: "Numerical",
      avgAccuracy: 85
    }
  ];

  // Mock data for hierarchical filtering
  const mockData = {
    subjects: [
      {
        name: "Physics",
        chapters: [
          {
            name: "Mechanics",
            topics: ["Kinematics", "Dynamics", "Work & Energy", "Rotational Motion"]
          },
          {
            name: "Thermodynamics", 
            topics: ["Laws of Thermodynamics", "Heat Engines", "Entropy"]
          },
          {
            name: "Electromagnetism",
            topics: ["Electric Fields", "Magnetic Fields", "Electromagnetic Induction"]
          }
        ]
      },
      {
        name: "Chemistry",
        chapters: [
          {
            name: "Organic Chemistry",
            topics: ["Hydrocarbons", "Alcohols", "Aldehydes & Ketones", "Carboxylic Acids"]
          },
          {
            name: "Inorganic Chemistry",
            topics: ["Periodic Table", "Chemical Bonding", "Coordination Compounds"]
          },
          {
            name: "Physical Chemistry",
            topics: ["Thermodynamics", "Kinetics", "Equilibrium"]
          }
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          {
            name: "Calculus",
            topics: ["Limits", "Derivatives", "Integrals", "Differential Equations"]
          },
          {
            name: "Algebra",
            topics: ["Complex Numbers", "Quadratic Equations", "Sequences & Series"]
          },
          {
            name: "Coordinate Geometry",
            topics: ["Straight Lines", "Circles", "Parabola", "Ellipse", "Hyperbola"]
          }
        ]
      }
    ]
  };

  // Get available chapters based on selected subjects
  const getAvailableChapters = () => {
    if (filters.subjects.length === 0) return []
    
    const chapters: string[] = []
    filters.subjects.forEach(subjectName => {
      const subject = mockData.subjects.find(s => s.name === subjectName)
      if (subject) {
        chapters.push(...subject.chapters.map(c => c.name))
      }
    })
    return [...new Set(chapters)] // Remove duplicates
  }

  // Get available topics based on selected subjects and chapters
  const getAvailableTopics = () => {
    if (filters.subjects.length === 0) return []
    
    const topics: string[] = []
    filters.subjects.forEach(subjectName => {
      const subject = mockData.subjects.find(s => s.name === subjectName)
      if (subject) {
        subject.chapters.forEach(chapter => {
          // If no chapters selected, show all topics from selected subjects
          // If chapters selected, only show topics from selected chapters
          if (filters.chapters.length === 0 || filters.chapters.includes(chapter.name)) {
            topics.push(...chapter.topics)
          }
        })
      }
    })
    return [...new Set(topics)] // Remove duplicates
  }

  const handleFilterChange = (filterType: keyof ChallengeFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: (prev[filterType] as (string | number)[]).includes(value)
        ? (prev[filterType] as (string | number)[]).filter(item => item !== value)
        : [...(prev[filterType] as (string | number)[]), value]
    }));
  };

  const addQuestionById = () => {
    if (questionIdInput.trim()) {
      const question = mockQuestions.find(q => q.id === questionIdInput.trim());
      if (question && !selectedQuestions.find(q => q.id === question.id)) {
        setSelectedQuestions(prev => [...prev, question]);
      }
      setQuestionIdInput("");
    }
  };

  const removeQuestion = (questionId: string) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const addFilteredQuestions = () => {
    // Mock filtered questions based on current filters
    const filteredQuestions = mockQuestions.filter(q => 
      !selectedQuestions.find(sq => sq.id === q.id)
    );
    setSelectedQuestions(prev => [...prev, ...filteredQuestions]);
  };

  const createChallenge = () => {
    const challengeData = {
      title: challengeTitle,
      description: challengeDescription,
      duration,
      isScheduled,
      isPublic,
      scheduledDate,
      scheduledTime,
      maxParticipants,
      questions: selectedQuestions,
      createdAt: new Date()
    };
    
    console.log("Creating challenge:", challengeData);
    // Here you would send to API
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create Challenge</h1>
            <p className="text-muted-foreground">Design a custom challenge for yourself or the community</p>
          </div>
          <Button onClick={createChallenge} className="bg-brand hover:bg-brand/90">
            <Trophy className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge Settings */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Challenge Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Challenge Title</Label>
                  <Input
                    id="title"
                    value={challengeTitle}
                    onChange={(e) => setChallengeTitle(e.target.value)}
                    placeholder="Enter challenge title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={challengeDescription}
                    onChange={(e) => setChallengeDescription(e.target.value)}
                    placeholder="Describe your challenge..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="180">3 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Challenge Type</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="personal"
                        checked={challengeType === 'personal'}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setChallengeType('personal');
                            setIsPublic(false);
                            setIsScheduled(false);
                          }
                        }}
                      />
                      <Label htmlFor="personal">Personal Challenge (Only for me)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="public"
                        checked={challengeType === 'public'}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setChallengeType('public');
                            setIsPublic(true);
                            setIsScheduled(false);
                          }
                        }}
                      />
                      <Label htmlFor="public">Public Challenge (Open to all)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="scheduled"
                        checked={challengeType === 'scheduled'}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setChallengeType('scheduled');
                            setIsPublic(true);
                            setIsScheduled(true);
                          }
                        }}
                      />
                      <Label htmlFor="scheduled">Scheduled Challenge (Starts at specific time)</Label>
                    </div>
                  </div>
                </div>

                {(challengeType === 'public' || challengeType === 'scheduled') && (
                  <div>
                    <Label htmlFor="instructions">Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Add any special instructions for participants..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}

                {challengeType === 'scheduled' && (
                  <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                    <div>
                      <Label htmlFor="scheduledDate">Start Date</Label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        min={(() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          return tomorrow.toISOString().split('T')[0];
                        })()}
                        value={scheduledDate ? scheduledDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setScheduledDate(e.target.value ? new Date(e.target.value) : undefined)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Start Time</Label>
                      <Input
                        id="time"
                        type="time"
                        min={scheduledDate && scheduledDate.toDateString() === new Date().toDateString() 
                          ? (() => {
                              const now = new Date();
                              const hours = now.getHours().toString().padStart(2, '0');
                              const minutes = (now.getMinutes() + 1).toString().padStart(2, '0'); // Add 1 minute buffer
                              return `${hours}:${minutes}`;
                            })()
                          : undefined}
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {challengeType === 'public' && (
                  <div>
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={maxParticipants}
                      onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                      min="1"
                      max="1000"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Challenge Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="font-medium">{selectedQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant={isScheduled ? "default" : "secondary"}>
                      {isScheduled ? "Scheduled" : "Instant"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Visibility:</span>
                    <Badge variant={isPublic ? "default" : "outline"}>
                      {isPublic ? "Public" : "Private"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Question Selection ({selectedQuestions.length})
                </CardTitle>
                <CardDescription>
                  Add questions to your challenge using filters, question IDs, or import from lists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="filters" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="filters">Filters</TabsTrigger>
                    <TabsTrigger value="id">Question ID</TabsTrigger>
                    <TabsTrigger value="import">Import List</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="filters" className="space-y-4">
                    {/* Filter Toggle Button */}
                    <div className="flex justify-between items-center mb-4">
                      <div></div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2"
                      >
                        <Filter className="h-4 w-4" />
                        Filters
                      </Button>
                    </div>

                    {/* Filters - Overlay Panel */}
                    {showFilters && (
                      <>
                        {/* Backdrop */}
                        <div 
                          className="fixed inset-0 bg-black/20 z-40" 
                          onClick={() => setShowFilters(false)}
                        />
                        
                        {/* Filter Panel - Always Fixed Overlay */}
                        <div className="fixed right-4 top-20 bottom-4 w-96 max-w-[calc(100vw-2rem)] bg-white border rounded-lg shadow-xl z-50 flex flex-col">
                          <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                            <h3 className="font-semibold">Filters</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowFilters(false)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-6">
                            {/* Subject Filter */}
                            <div>
                              <h4 className="font-medium mb-3">Subject</h4>
                              <div className="grid grid-cols-1 gap-2">
                                {["Physics", "Chemistry", "Mathematics"].map((subject) => (
                                  <div key={subject} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`subject-${subject}`}
                                      checked={filters.subjects.includes(subject)}
                                      onCheckedChange={() => handleFilterChange('subjects', subject)}
                                    />
                                    <label htmlFor={`subject-${subject}`} className="text-sm font-medium">
                                      {subject}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Chapter Filter - Only show if subjects are selected */}
                            {filters.subjects.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-3">Chapter</h4>
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                                  {getAvailableChapters().map((chapter) => (
                                    <div key={chapter} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`chapter-${chapter}`}
                                        checked={filters.chapters.includes(chapter)}
                                        onCheckedChange={() => handleFilterChange('chapters', chapter)}
                                      />
                                      <label htmlFor={`chapter-${chapter}`} className="text-sm">
                                        {chapter}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Topic Filter - Only show if subjects are selected */}
                            {filters.subjects.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-3">Topic</h4>
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                                  {getAvailableTopics().map((topic) => (
                                    <div key={topic} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`topic-${topic}`}
                                        checked={filters.topics.includes(topic)}
                                        onCheckedChange={() => handleFilterChange('topics', topic)}
                                      />
                                      <label htmlFor={`topic-${topic}`} className="text-sm">
                                        {topic}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Year Filter */}
                            <div>
                              <h4 className="font-medium mb-3">Year</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {[2024, 2023, 2022, 2021, 2020].map((year) => (
                                  <div key={year} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`year-${year}`}
                                      checked={filters.years.includes(year)}
                                      onCheckedChange={() => handleFilterChange('years', year)}
                                    />
                                    <label htmlFor={`year-${year}`} className="text-sm">
                                      {year}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Difficulty Filter */}
                            <div>
                              <h4 className="font-medium mb-3">Difficulty</h4>
                              <div className="space-y-2">
                                {["Easy", "Medium", "Hard"].map((level) => (
                                  <div key={level} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`difficulty-${level}`}
                                      checked={filters.difficulty.includes(level)}
                                      onCheckedChange={() => handleFilterChange('difficulty', level)}
                                    />
                                    <label htmlFor={`difficulty-${level}`} className="text-sm">
                                      {level}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Question Type Filter */}
                            <div>
                              <h4 className="font-medium mb-3">Question Type</h4>
                              <div className="space-y-2">
                                {["Single Choice", "Multiple Choice", "Integer Type", "Numerical"].map((type) => (
                                  <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`type-${type}`}
                                      checked={filters.questionType.includes(type)}
                                      onCheckedChange={() => handleFilterChange('questionType', type)}
                                    />
                                    <label htmlFor={`type-${type}`} className="text-sm">
                                      {type}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex gap-2 pt-4 border-t">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setFilters({
                                  subjects: [],
                                  chapters: [],
                                  topics: [],
                                  years: [],
                                  difficulty: [],
                                  questionType: []
                                })} 
                                className="flex-1"
                              >
                                Clear All
                              </Button>
                              <Button size="sm" className="flex-1" onClick={() => setShowFilters(false)}>
                                Apply Filters
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                  </TabsContent>
                  
                  <TabsContent value="id" className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Enter question ID (e.g., PHY01, CHE02)"
                          value={questionIdInput}
                          onChange={(e) => setQuestionIdInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addQuestionById()}
                        />
                      </div>
                      <Button onClick={addQuestionById}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="import" className="space-y-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <Import className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Import questions from saved lists</p>
                      <p className="text-sm">Feature coming soon...</p>
                    </div>
                  </TabsContent>
                </Tabs>

                {selectedQuestions.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Selected Questions ({selectedQuestions.length})</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedQuestions([])}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedQuestions.map((question) => (
                            <TableRow key={question.id}>
                              <TableCell className="font-mono text-sm">{question.id}</TableCell>
                              <TableCell className="max-w-xs truncate">{question.title}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{question.subject}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={question.difficulty === "Hard" ? "destructive" : 
                                          question.difficulty === "Medium" ? "default" : "secondary"}
                                >
                                  {question.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell>{question.year}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedQuestions(prev => 
                                    prev.filter(q => q.id !== question.id)
                                  )}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
              <div className="p-6 border-t">
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!challengeTitle || selectedQuestions.length === 0}
                >
                  Create Challenge
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
