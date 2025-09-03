"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Target,
  Lock,
  Save,
  Flag,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Calculator,
  BookOpen,
  FileText,
  Maximize,
  Menu,
  MoreVertical
} from "lucide-react";

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
  negativeMarks: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  questions: Question[];
  isPublic: boolean;
  createdBy: string;
  participants: number;
}

interface AttemptData {
  challengeId: string;
  answers: Record<string, any>;
  startTime: Date;
  timeRemaining: number;
  currentQuestion: number;
  isSubmitted: boolean;
  flaggedQuestions: string[];
  visitedQuestions: string[];
}

export default function ChallengeAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [attemptData, setAttemptData] = useState<AttemptData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hasAcceptedMonitoring, setHasAcceptedMonitoring] = useState(false);
  const [showViolationOverlay, setShowViolationOverlay] = useState(false);
  const [violationType, setViolationType] = useState<'tab-switch' | 'fullscreen-exit' | 'window-switch'>('tab-switch');
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<Date>(new Date());

  // Mock challenge data
  const mockChallenge: Challenge = {
    id: challengeId,
    title: "JEE Physics Challenge",
    description: "Test your physics knowledge with these challenging questions",
    duration: 60,
    questions: [
      {
        id: "Q1",
        title: "Kinematics Problem",
        description: "A particle moves with constant acceleration of 2 m/s². If initial velocity is 5 m/s, what is the velocity after 3 seconds?",
        type: "Single Choice",
        options: ["11 m/s", "13 m/s", "15 m/s", "17 m/s"],
        correctAnswer: "11 m/s",
        subject: "Physics",
        chapter: "Mechanics",
        topic: "Kinematics",
        difficulty: "Medium",
        marks: 4,
        negativeMarks: 1
      },
      {
        id: "Q2",
        title: "Numerical Problem",
        description: "Calculate the pH of a 0.01 M HCl solution. (Round to 2 decimal places)",
        type: "Numerical",
        correctAnswer: 2.00,
        subject: "Chemistry",
        chapter: "Acids and Bases",
        topic: "pH Calculation",
        difficulty: "Easy",
        marks: 4,
        negativeMarks: 0
      }
    ],
    isPublic: true,
    createdBy: "Admin",
    participants: 156
  };

  // Initialize challenge and attempt data
  useEffect(() => {
    setChallenge(mockChallenge);
    
    // Load existing attempt or create new one
    const savedAttempt = localStorage.getItem(`attempt_${challengeId}`);
    if (savedAttempt) {
      const parsed = JSON.parse(savedAttempt);
      parsed.startTime = new Date(parsed.startTime);
      // Ensure visitedQuestions exists for backward compatibility
      if (!parsed.visitedQuestions) {
        parsed.visitedQuestions = [];
      }
      setAttemptData(parsed);
      setCurrentQuestionIndex(parsed.currentQuestion);
      setTimeRemaining(parsed.timeRemaining);
    } else {
      const newAttempt: AttemptData = {
        challengeId,
        answers: {},
        startTime: new Date(),
        timeRemaining: mockChallenge.duration * 60, // convert to seconds
        currentQuestion: 0,
        isSubmitted: false,
        flaggedQuestions: [],
        visitedQuestions: []
      };
      setAttemptData(newAttempt);
      setTimeRemaining(newAttempt.timeRemaining);
    }

    // Setup monitoring only after user accepts
    if (hasAcceptedMonitoring) {
      // Enter fullscreen
      enterFullscreen();
      
      // Prevent tab switching
      setupTabSwitchPrevention();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      exitFullscreen();
    };
  }, [challengeId, hasAcceptedMonitoring]);

  // Timer
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            submitChallenge();
            return 0;
          }
          
          // Auto-save every 30 seconds
          if (newTime % 30 === 0) {
            autoSave();
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeRemaining, isSubmitted]);

  const enterFullscreen = () => {
    if (document?.documentElement?.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Ignore errors if fullscreen request fails
        console.warn('Fullscreen request failed');
      });
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document?.exitFullscreen && document?.fullscreenElement) {
      document.exitFullscreen().catch(() => {
        // Ignore errors if fullscreen exit fails
        console.warn('Fullscreen exit failed');
      });
    }
    setIsFullscreen(false);
  };

  const showViolationWarning = (type: 'tab-switch' | 'fullscreen-exit' | 'window-switch') => {
    setViolationType(type);
    setShowViolationOverlay(true);
  };

  const setupTabSwitchPrevention = () => {
    const handleVisibilityChange = () => {
      if (document?.hidden && !isSubmitted && hasAcceptedMonitoring) {
        setTabSwitchCount(prev => prev + 1);
        showViolationWarning('tab-switch');
        
        // Auto-submit after 3 tab switches
        if (tabSwitchCount >= 2) {
          submitChallenge();
        }
      }
    };

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document?.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      if (!isCurrentlyFullscreen && hasAcceptedMonitoring && !isSubmitted) {
        showViolationWarning('fullscreen-exit');
      }
    };

    const handleWindowFocus = () => {
      if (hasAcceptedMonitoring && !isSubmitted) {
        // Window regained focus - could indicate window switching
        showViolationWarning('window-switch');
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      if (hasAcceptedMonitoring) {
        e.preventDefault();
      }
    };

    // Prevent common keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasAcceptedMonitoring && !isSubmitted) {
        // Prevent Alt+Tab, Ctrl+Tab, Cmd+Tab, F11, etc.
        if (
          (e.altKey && e.key === 'Tab') ||
          (e.ctrlKey && e.key === 'Tab') ||
          (e.metaKey && e.key === 'Tab') ||
          e.key === 'F11' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') || // Dev tools
          (e.ctrlKey && e.shiftKey && e.key === 'J') || // Console
          (e.ctrlKey && e.key === 'u') || // View source
          (e.metaKey && e.altKey && e.key === 'I') // Mac dev tools
        ) {
          e.preventDefault();
          showViolationWarning('tab-switch');
        }
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleWindowFocus);
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      }
      
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', handleWindowFocus);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    };
  };

  const autoSave = () => {
    if (attemptData) {
      const updatedAttempt = {
        ...attemptData,
        timeRemaining,
        currentQuestion: currentQuestionIndex,
        lastSaved: new Date()
      };
      localStorage.setItem(`attempt_${challengeId}`, JSON.stringify(updatedAttempt));
      lastSaveRef.current = new Date();
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    if (attemptData) {
      const updatedAttempt = {
        ...attemptData,
        answers: {
          ...attemptData.answers,
          [questionId]: answer
        }
      };
      setAttemptData(updatedAttempt);
      
      // Save immediately when answer changes
      localStorage.setItem(`attempt_${challengeId}`, JSON.stringify(updatedAttempt));
    }
  };

  const toggleFlag = (questionId: string) => {
    if (attemptData) {
      const flagged = attemptData.flaggedQuestions.includes(questionId);
      const updatedAttempt = {
        ...attemptData,
        flaggedQuestions: flagged 
          ? attemptData.flaggedQuestions.filter(id => id !== questionId)
          : [...attemptData.flaggedQuestions, questionId]
      };
      setAttemptData(updatedAttempt);
    }
  };

  const submitChallenge = () => {
    if (attemptData) {
      const finalAttempt = {
        ...attemptData,
        isSubmitted: true,
        submittedAt: new Date()
      };
      setAttemptData(finalAttempt);
      setIsSubmitted(true);
      localStorage.setItem(`attempt_${challengeId}`, JSON.stringify(finalAttempt));
      
      // Exit fullscreen and redirect to results page
      exitFullscreen();
      router.push(`/dashboard/challenge/result/${challengeId}`);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    if (!challenge || !attemptData) return { score: 0, total: 0, percentage: 0 };
    
    let score = 0;
    let total = 0;
    
    challenge.questions.forEach(question => {
      total += question.marks;
      const userAnswer = attemptData.answers[question.id];
      
      if (question.type === "Single Choice" && userAnswer === question.correctAnswer) {
        score += question.marks;
      } else if (question.type === "Multiple Choice") {
        const correct = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
        const user = Array.isArray(userAnswer) ? userAnswer : [];
        if (JSON.stringify(correct.sort()) === JSON.stringify(user.sort())) {
          score += question.marks;
        }
      } else if ((question.type === "Numerical" || question.type === "Integer Type") && 
                 Math.abs(parseFloat(userAnswer) - (question.correctAnswer as number)) < 0.01) {
        score += question.marks;
      }
    });
    
    return { score, total, percentage: Math.round((score / total) * 100) };
  };

  // Track current question visits
  useEffect(() => {
    if (attemptData && challenge?.questions[currentQuestionIndex]) {
      const currentQuestionId = challenge.questions[currentQuestionIndex].id;
      setAttemptData(prev => {
        if (!prev) return null;
        const visitedQuestions = prev.visitedQuestions || [];
        const updatedVisited = visitedQuestions.includes(currentQuestionId) 
          ? visitedQuestions 
          : [...visitedQuestions, currentQuestionId];
        
        return {
          ...prev,
          currentQuestion: currentQuestionIndex,
          visitedQuestions: updatedVisited
        };
      });
    }
  }, [currentQuestionIndex, challenge]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (attemptData && !isSubmitted) {
      const saveInterval = setInterval(() => {
        localStorage.setItem(`attempt_${challengeId}`, JSON.stringify(attemptData));
        lastSaveRef.current = new Date();
      }, 30000);
      
      return () => clearInterval(saveInterval);
    }
  }, [attemptData, challengeId, isSubmitted]);

  // Show monitoring warning before starting challenge
  if (!challenge || !attemptData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Show activity monitoring warning
  if (!hasAcceptedMonitoring) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl mb-2">Activity Monitoring Notice</CardTitle>
            <CardDescription className="text-base">
              This challenge requires strict monitoring to ensure fair assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Important:</strong> Your activity will be monitored during this challenge
              </AlertDescription>
            </Alert>
            

            {!isFullscreen && hasAcceptedMonitoring && (
              <Alert className="mb-4 border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Notice:</strong> You have exited fullscreen mode. Please return to fullscreen for proper monitoring.
                  <Button 
                    size="sm" 
                    className="ml-2" 
                    onClick={enterFullscreen}
                  >
                    Enter Fullscreen
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Challenge Rules & Monitoring:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Fullscreen Mode:</strong> The challenge will run in fullscreen mode. Exiting fullscreen will be detected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Tab Switching:</strong> Switching tabs or windows is strictly prohibited and will be tracked.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Auto-Submission:</strong> After 3 tab switches, your challenge will be automatically submitted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Time Limit:</strong> You have {Math.floor(challenge.duration)} minutes to complete this challenge.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Auto-Save:</strong> Your answers will be automatically saved every 30 seconds.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-800 mb-1">Please Avoid Tab Switching</p>
                  <p className="text-sm text-yellow-700">
                    Any attempt to switch tabs, open new windows, or exit fullscreen will be recorded. 
                    Multiple violations may result in automatic submission of your challenge.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard/challenge')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setHasAcceptedMonitoring(true);
                  enterFullscreen();
                }}
                className="flex-1"
              >
                I Understand, Start Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const results = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-brand rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Challenge Complete!</CardTitle>
              <CardDescription>
                You scored {results.score} out of {results.total} marks ({results.percentage}%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-brand mb-2">{results.percentage}%</p>
                  <p className="text-muted-foreground">Overall Score</p>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button onClick={() => router.push('/dashboard/challenge')} className="flex-1">
                    Back to Challenges
                  </Button>
                  <Button variant="outline" onClick={() => window.print()} className="flex-1">
                    Download Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = challenge?.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / (challenge?.questions.length || 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Violation Overlay Warning */}
      {showViolationOverlay && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4 border-red-500 border-2">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-600 mb-2">
                {violationType === 'tab-switch' && 'Tab Switching Detected!'}
                {violationType === 'fullscreen-exit' && 'Fullscreen Mode Exited!'}
                {violationType === 'window-switch' && 'Window Switching Detected!'}
              </CardTitle>
              <CardDescription className="text-red-700">
                {violationType === 'tab-switch' && 'You attempted to switch tabs or use keyboard shortcuts. This action has been recorded.'}
                {violationType === 'fullscreen-exit' && 'You have exited fullscreen mode. Please return to fullscreen immediately.'}
                {violationType === 'window-switch' && 'Window switching has been detected. This action has been recorded.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>Warning Count: {tabSwitchCount}/3</strong>
                </p>
                {tabSwitchCount >= 2 && (
                  <p className="text-sm text-red-800 mt-1">
                    <strong>Final Warning!</strong> One more violation will auto-submit your challenge.
                  </p>
                )}
              </div>
              
              <div className="flex gap-3">
                {violationType === 'fullscreen-exit' ? (
                  <>
                    <Button 
                      onClick={() => {
                        enterFullscreen();
                        setShowViolationOverlay(false);
                      }}
                      className="flex-1"
                    >
                      Return to Fullscreen
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        submitChallenge();
                        setShowViolationOverlay(false);
                      }}
                      className="flex-1"
                    >
                      Submit Challenge
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => setShowViolationOverlay(false)}
                    className="w-full"
                  >
                    Continue Challenge
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Exam Header - Real exam interface style */}
      <div className="bg-slate-900 text-white border-b shadow-lg sticky top-0 z-20">
        <div className="px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Left section */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                  IIT
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-lg font-semibold truncate">{challenge?.title}</h1>
                  <p className="text-xs text-slate-300 hidden sm:block">Computer Based Test</p>
                </div>
              </div>
            </div>
            
            {/* Center section - Timer */}
            <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
              <div className="bg-slate-800 px-2 sm:px-4 py-1 sm:py-2 rounded-lg border border-slate-700">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                  <div className="text-center">
                    <div className={`font-mono text-sm sm:text-lg font-bold ${
                      timeRemaining <= 300 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {Math.floor(timeRemaining / 3600)}:{Math.floor((timeRemaining % 3600) / 60).toString().padStart(2, '0')}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-slate-400 hidden sm:block">Time Left</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right section */}
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 px-2 sm:px-3"
                onClick={autoSave}
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm"
                onClick={submitChallenge}
                disabled={isSubmitted}
                className="bg-red-600 hover:bg-red-700 px-2 sm:px-3"
              >
                <span className="text-xs sm:text-sm">Submit</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-slate-800 p-1 sm:p-2"
              >
                <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Question Navigation Panel */}
      <div className="bg-slate-50 border-b px-2 sm:px-4 py-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestionIndex + 1} of {challenge?.questions.length || 0}
            </span>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <Badge variant="outline" className="text-xs">
                {currentQuestion?.subject}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {currentQuestion?.type === "Single Choice" ? "Single" : 
                 currentQuestion?.type === "Multiple Choice" ? "Multi" : 
                 currentQuestion?.type === "Integer Type" ? "Integer" : 
                 currentQuestion?.type === "Numerical" ? "Numerical" : currentQuestion?.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                +{currentQuestion?.marks} -{currentQuestion?.negativeMarks}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-2 sm:px-3"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline ml-1">Prev</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentQuestionIndex(Math.min((challenge?.questions.length || 1) - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === (challenge?.questions.length || 1) - 1}
              className="px-2 sm:px-3"
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Panel - Question Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-6">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="space-y-6">
                  {/* Question Header */}
                  <div className="flex items-start gap-2 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-xs sm:text-sm">
                        Q{currentQuestionIndex + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-slate-600 mb-2">
                        Ques. Type: {currentQuestion?.type === "Single Choice" ? "MCQ Single" : currentQuestion?.type === "Multiple Choice" ? "MCQ Multiple" : currentQuestion?.type === "Integer Type" ? "Integer" : "Numerical"}
                      </div>
                      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 break-words">
                        {currentQuestion?.title}
                      </h2>
                      <div className="text-sm sm:text-base text-slate-600 leading-relaxed break-words">
                        {currentQuestion?.description}
                      </div>
                    </div>
                  </div>

                  {/* Answer Options */}
                  {currentQuestion?.type === "Single Choice" && (
                    <div className="space-y-3">
                      <h3 className="font-medium text-slate-700 mb-3">Select one option:</h3>
                      <RadioGroup
                        value={attemptData?.answers[currentQuestion.id] || ""}
                        onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                        className="space-y-3"
                      >
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                            <RadioGroupItem value={option} id={`option-${index}`} className="mt-0.5 flex-shrink-0" />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-slate-700 min-w-0">
                              <span className="font-medium text-slate-600 mr-2">({String.fromCharCode(65 + index)})</span>
                              <span className="break-words">{option}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {currentQuestion?.type === "Multiple Choice" && (
                    <div className="space-y-3">
                      <h3 className="font-medium text-slate-700 mb-3">Select all correct options:</h3>
                      <div className="space-y-3">
                        {currentQuestion.options?.map((option, index) => {
                          const currentAnswers = attemptData?.answers[currentQuestion.id] || [];
                          const isChecked = currentAnswers.includes(option);
                          
                          return (
                            <div key={index} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                              <Checkbox
                                id={`option-${index}`}
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  const newAnswers = checked
                                    ? [...currentAnswers, option]
                                    : currentAnswers.filter((a: string) => a !== option);
                                  handleAnswerChange(currentQuestion.id, newAnswers);
                                }}
                                className="mt-0.5 flex-shrink-0"
                              />
                              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-slate-700 min-w-0">
                                <span className="font-medium text-slate-600 mr-2">({String.fromCharCode(65 + index)})</span>
                                <span className="break-words">{option}</span>
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(currentQuestion?.type === "Integer Type" || currentQuestion?.type === "Numerical") && (
                    <div className="space-y-4">
                      <h3 className="font-medium text-slate-700 mb-3">
                        Enter your answer:
                      </h3>
                      <div className="w-full max-w-md">
                        <Input
                          type="text"
                          placeholder={currentQuestion.type === "Integer Type" ? "Enter integer" : "Enter number"}
                          value={attemptData?.answers[currentQuestion.id] || ""}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="text-lg sm:text-2xl p-3 sm:p-4 text-center font-mono mb-4 w-full"
                          readOnly
                        />
                        <p className="text-xs text-slate-500 mb-4 text-center">
                          {currentQuestion.type === "Integer Type" ? "Answer should be an integer" : "Answer can be a decimal number"}
                        </p>
                        
                        {/* On-Screen Keyboard */}
                        <div className="bg-slate-50 p-3 sm:p-4 rounded-lg border">
                          <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-2 sm:mb-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                              <Button
                                key={num}
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                  const currentValue = attemptData?.answers[currentQuestion.id] || "";
                                  handleAnswerChange(currentQuestion.id, currentValue + num.toString());
                                }}
                                className="h-10 sm:h-12 text-sm sm:text-lg font-mono hover:bg-blue-50"
                              >
                                {num}
                              </Button>
                            ))}
                          </div>
                          <div className="grid grid-cols-3 gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={() => {
                                const currentValue = attemptData?.answers[currentQuestion.id] || "";
                                if (currentValue === "" || currentValue === "0") {
                                  handleAnswerChange(currentQuestion.id, "-");
                                } else if (!currentValue.startsWith("-")) {
                                  handleAnswerChange(currentQuestion.id, "-" + currentValue);
                                } else {
                                  handleAnswerChange(currentQuestion.id, currentValue.substring(1));
                                }
                              }}
                              className="h-10 sm:h-12 text-sm sm:text-lg font-mono hover:bg-red-50"
                            >
                              +/-
                            </Button>
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={() => {
                                const currentValue = attemptData?.answers[currentQuestion.id] || "";
                                handleAnswerChange(currentQuestion.id, currentValue + "0");
                              }}
                              className="h-10 sm:h-12 text-sm sm:text-lg font-mono hover:bg-blue-50"
                            >
                              0
                            </Button>
                            {currentQuestion.type === "Numerical" && (
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                  const currentValue = attemptData?.answers[currentQuestion.id] || "";
                                  if (!currentValue.includes(".")) {
                                    handleAnswerChange(currentQuestion.id, currentValue + ".");
                                  }
                                }}
                                className="h-10 sm:h-12 text-sm sm:text-lg font-mono hover:bg-green-50"
                              >
                                .
                              </Button>
                            )}
                            {currentQuestion.type === "Integer Type" && (
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                  const currentValue = attemptData?.answers[currentQuestion.id] || "";
                                  handleAnswerChange(currentQuestion.id, currentValue.slice(0, -1));
                                }}
                                className="h-10 sm:h-12 text-sm sm:text-lg font-mono hover:bg-orange-50"
                              >
                                ⌫
                              </Button>
                            )}
                          </div>
                          {currentQuestion.type === "Numerical" && (
                            <div className="mt-2">
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                  const currentValue = attemptData?.answers[currentQuestion.id] || "";
                                  handleAnswerChange(currentQuestion.id, currentValue.slice(0, -1));
                                }}
                                className="w-full h-10 sm:h-12 text-sm sm:text-lg font-mono hover:bg-orange-50"
                              >
                                ⌫ Backspace
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 sm:pt-6 mt-6 sm:mt-8 border-t border-slate-200 gap-3 sm:gap-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Mark for Review
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAnswerChange(currentQuestion?.id || "", "")}
                  className="text-slate-600 hover:bg-slate-50"
                >
                  Clear Response
                </Button>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button 
                  onClick={() => setCurrentQuestionIndex(Math.min((challenge?.questions.length || 1) - 1, currentQuestionIndex + 1))}
                  disabled={currentQuestionIndex === (challenge?.questions.length || 1) - 1}
                  className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
                >
                  {currentQuestionIndex === (challenge?.questions.length || 1) - 1 ? 'Review' : 'Save & Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Question Palette */}
        <div className="hidden lg:block w-80 bg-white border-l border-slate-200 overflow-y-auto">
          <div className="p-4">
            {/* Summary Panel */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Test Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{challenge?.questions.length || 0}</div>
                    <div className="text-xs text-blue-600 font-medium">Total</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.keys(attemptData?.answers || {}).length}
                    </div>
                    <div className="text-xs text-green-600 font-medium">Answered</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-slate-600">
                      {(challenge?.questions.length || 0) - Object.keys(attemptData?.answers || {}).length}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">Not Answered</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    onClick={submitChallenge}
                    disabled={isSubmitted}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                    size="lg"
                  >
                    Submit Test
                  </Button>
                  <p className="text-xs text-slate-500 text-center mt-2">
                    Make sure to review all questions before submitting
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Question Palette */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Question Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {challenge?.questions.map((question, index) => {
                    const isAnswered = attemptData?.answers[question.id] && attemptData.answers[question.id] !== "";
                    const isMarked = attemptData?.flaggedQuestions.includes(question.id);
                    const isCurrent = index === currentQuestionIndex;
                    const isVisited = attemptData?.visitedQuestions?.includes(question.id) || isCurrent;
                    
                    let buttonClass = "h-10 w-10 text-sm font-medium border-2 transition-all ";
                    
                    if (isCurrent) {
                      buttonClass += "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200 ";
                    } else if (isAnswered && isMarked) {
                      buttonClass += "bg-purple-500 text-white border-purple-500 hover:bg-purple-600 ";
                    } else if (isAnswered) {
                      buttonClass += "bg-green-500 text-white border-green-500 hover:bg-green-600 ";
                    } else if (isMarked) {
                      buttonClass += "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 ";
                    } else if (isVisited) {
                      buttonClass += "bg-red-500 text-white border-red-500 hover:bg-red-600 ";
                    } else {
                      buttonClass += "bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300 ";
                    }
                    
                    return (
                      <Button
                        key={question.id}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={buttonClass}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>
                
                {/* Legend - Matching NEET format */}
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span>Marked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span>Not Visited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span>Answered & Marked for Review (will be considered for evaluation)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
