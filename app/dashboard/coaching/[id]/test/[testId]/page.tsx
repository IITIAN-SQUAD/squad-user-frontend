"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../../../../../components/layout/DashboardLayout';
import { 
  ArrowLeft,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Flag,
  RotateCcw,
  Send,
  BookOpen,
  Calculator,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface Question {
  id: string;
  questionNumber: number;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  type: 'single' | 'multiple' | 'numerical' | 'integer';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  marks: number;
  negativeMarks: number;
}

interface TestAttempt {
  questionId: string;
  selectedAnswer?: string | string[];
  numericalAnswer?: number;
  isMarkedForReview: boolean;
  timeSpent: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    questionNumber: 1,
    subject: 'Physics',
    type: 'single',
    question: 'A particle moves in a straight line with constant acceleration. If it covers 10m in the first 2 seconds and 20m in the next 2 seconds, what is its acceleration?',
    options: ['2.5 m/s²', '5 m/s²', '7.5 m/s²', '10 m/s²'],
    correctAnswer: '2.5 m/s²',
    explanation: 'Using kinematic equations: s = ut + (1/2)at². From the given data, we can calculate the acceleration as 2.5 m/s².',
    marks: 4,
    negativeMarks: 1
  },
  {
    id: '2',
    questionNumber: 2,
    subject: 'Chemistry',
    type: 'multiple',
    question: 'Which of the following are characteristics of ionic compounds? (Select all that apply)',
    options: ['High melting point', 'Conduct electricity in solid state', 'Soluble in polar solvents', 'Form crystal lattices'],
    correctAnswer: ['High melting point', 'Soluble in polar solvents', 'Form crystal lattices'],
    explanation: 'Ionic compounds have high melting points, are soluble in polar solvents, and form crystal lattices. They do not conduct electricity in solid state.',
    marks: 4,
    negativeMarks: 2
  },
  {
    id: '3',
    questionNumber: 3,
    subject: 'Mathematics',
    type: 'numerical',
    question: 'Find the value of ∫₀¹ x²dx (Round to 2 decimal places)',
    correctAnswer: '0.33',
    explanation: '∫₀¹ x²dx = [x³/3]₀¹ = 1/3 - 0 = 0.33',
    marks: 4,
    negativeMarks: 0
  }
];

export default function TestAttemptPage() {
  const params = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 3 hours in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [attempts, setAttempts] = useState<Record<string, TestAttempt>>({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isAbsent, setIsAbsent] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const testInfo = {
    name: 'JEE Advanced Mock Test - 1',
    duration: 180,
    totalQuestions: mockQuestions.length,
    totalMarks: mockQuestions.reduce((sum, q) => sum + q.marks, 0),
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && !testEnded && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setTestEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, testEnded, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string | string[] | number) => {
    setAttempts(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        selectedAnswer: typeof answer === 'number' ? undefined : answer,
        numericalAnswer: typeof answer === 'number' ? answer : undefined,
        isMarkedForReview: prev[questionId]?.isMarkedForReview || false,
        timeSpent: prev[questionId]?.timeSpent || 0
      }
    }));
  };

  const toggleReviewFlag = (questionId: string) => {
    setAttempts(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        isMarkedForReview: !prev[questionId]?.isMarkedForReview,
        selectedAnswer: prev[questionId]?.selectedAnswer,
        numericalAnswer: prev[questionId]?.numericalAnswer,
        timeSpent: prev[questionId]?.timeSpent || 0
      }
    }));
  };

  const getQuestionStatus = (questionId: string) => {
    const attempt = attempts[questionId];
    if (!attempt) return 'not-visited';
    if (attempt.isMarkedForReview) return 'marked-for-review';
    if (attempt.selectedAnswer || attempt.numericalAnswer !== undefined) return 'answered';
    return 'not-answered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-500';
      case 'not-answered': return 'bg-red-500';
      case 'marked-for-review': return 'bg-purple-500';
      case 'answered-marked': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const startTest = () => {
    setTestStarted(true);
    setShowInstructions(false);
  };

  const markAbsent = () => {
    setIsAbsent(true);
    setShowInstructions(false);
    setShowAnswers(true);
  };

  const submitTest = () => {
    setTestEnded(true);
    setShowSubmitDialog(false);
  };

  const currentQ = mockQuestions[currentQuestion];
  const currentAttempt = attempts[currentQ?.id];

  if (showInstructions) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Link href={`/dashboard/coaching/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-brand-navy">{testInfo.name}</h1>
              <p className="text-gray-600">Automatic Registration • Mandatory Attendance</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Test Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{testInfo.duration} min</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{testInfo.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{testInfo.totalMarks}</div>
                  <div className="text-sm text-gray-600">Total Marks</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Important Instructions:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span><strong>Automatic Registration:</strong> You are automatically registered for this test. Attendance is mandatory.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span><strong>Time Limit:</strong> You have {testInfo.duration} minutes to complete the test.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span><strong>Marking Scheme:</strong> +4 for correct answers, negative marking applies for wrong answers.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Eye className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span><strong>Post-Test Access:</strong> You can view questions and answers after the test ends, even if marked absent.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Flag className="h-4 w-4 text-red-500 mt-0.5" />
                    <span><strong>Absence Policy:</strong> If you don't attempt the test, you'll be marked absent but can still review the paper.</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={startTest}
                  className="bg-brand text-brand-navy hover:bg-brand/90"
                  size="lg"
                >
                  Start Test
                </Button>
                <Button 
                  onClick={markAbsent}
                  variant="outline"
                  size="lg"
                >
                  Mark as Absent & View Paper
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (showInstructions) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Link href={`/dashboard/coaching/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-brand-navy">{testInfo.name}</h1>
              <p className="text-gray-600">Automatic Registration • Mandatory Attendance</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Test Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{testInfo.duration} min</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{testInfo.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{testInfo.totalMarks}</div>
                  <div className="text-sm text-gray-600">Total Marks</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Important Instructions:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span><strong>Automatic Registration:</strong> You are automatically registered for this test. Attendance is mandatory.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span><strong>Time Limit:</strong> You have {testInfo.duration} minutes to complete the test.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span><strong>Marking Scheme:</strong> +4 for correct answers, negative marking applies for wrong answers.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Eye className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span><strong>Post-Test Access:</strong> You can view questions and answers after the test ends, even if marked absent.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Flag className="h-4 w-4 text-red-500 mt-0.5" />
                    <span><strong>Absence Policy:</strong> If you don't attempt the test, you'll be marked absent but can still review the paper.</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={startTest}
                  className="bg-brand text-brand-navy hover:bg-brand/90"
                  size="lg"
                >
                  Start Test
                </Button>
                <Button 
                  onClick={markAbsent}
                  variant="outline"
                  size="lg"
                >
                  Mark as Absent & View Paper
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (showAnswers || (testEnded && isAbsent)) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/dashboard/coaching/${params.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-brand-navy">{testInfo.name}</h1>
                <p className="text-gray-600">
                  {isAbsent ? 'Marked as Absent' : 'Test Completed'} • Answer Key
                </p>
              </div>
            </div>
            {isAbsent && (
              <Badge variant="destructive">Absent</Badge>
            )}
          </div>

          <div className="space-y-6">
            {mockQuestions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Question {question.questionNumber}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{question.subject}</Badge>
                      <Badge variant="outline">{question.marks} marks</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-800">{question.question}</p>
                  
                  {question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isCorrect = Array.isArray(question.correctAnswer) 
                          ? question.correctAnswer.includes(option)
                          : question.correctAnswer === option;
                        
                        return (
                          <div 
                            key={optIndex}
                            className={`p-3 rounded-lg border ${
                              isCorrect ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {isCorrect && <CheckCircle className="h-4 w-4 text-green-600" />}
                              <span className={isCorrect ? 'text-green-800 font-medium' : 'text-gray-700'}>
                                {option}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {question.type === 'numerical' && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 font-medium">
                          Correct Answer: {question.correctAnswer}
                        </span>
                      </div>
                    </div>
                  )}

                  {question.explanation && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                      <p className="text-blue-700">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex h-screen">
        {/* Question Panel */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-brand-navy">{testInfo.name}</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {mockQuestions.length}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Time Remaining</p>
                  <p className="text-xl font-bold text-red-600">{formatTime(timeRemaining)}</p>
                </div>
              </div>
            </div>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Question {currentQ.questionNumber}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{currentQ.subject}</Badge>
                    <Badge variant="outline">+{currentQ.marks} / -{currentQ.negativeMarks}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-800">{currentQ.question}</p>

                {/* Single Choice */}
                {currentQ.type === 'single' && currentQ.options && (
                  <RadioGroup 
                    value={currentAttempt?.selectedAnswer as string || ''} 
                    onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                  >
                    {currentQ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Multiple Choice */}
                {currentQ.type === 'multiple' && currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`multi-${index}`}
                          checked={(currentAttempt?.selectedAnswer as string[] || []).includes(option)}
                          onChange={(e) => {
                            const current = (currentAttempt?.selectedAnswer as string[]) || [];
                            const updated = e.target.checked 
                              ? [...current, option]
                              : current.filter(item => item !== option);
                            handleAnswerChange(currentQ.id, updated);
                          }}
                          className="rounded"
                        />
                        <Label htmlFor={`multi-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Numerical */}
                {currentQ.type === 'numerical' && (
                  <div className="space-y-2">
                    <Label htmlFor="numerical">Enter your answer:</Label>
                    <Input
                      id="numerical"
                      type="number"
                      step="0.01"
                      placeholder="Enter numerical value"
                      value={currentAttempt?.numericalAnswer || ''}
                      onChange={(e) => handleAnswerChange(currentQ.id, parseFloat(e.target.value) || 0)}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleReviewFlag(currentQ.id)}
                      className={currentAttempt?.isMarkedForReview ? 'bg-purple-100' : ''}
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      {currentAttempt?.isMarkedForReview ? 'Unmark' : 'Mark for Review'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleAnswerChange(currentQ.id, currentQ.type === 'numerical' ? 0 : '')}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    {currentQuestion === mockQuestions.length - 1 ? (
                      <Button
                        onClick={() => setShowSubmitDialog(true)}
                        className="bg-brand text-brand-navy hover:bg-brand/90"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Test
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
                        className="bg-brand text-brand-navy hover:bg-brand/90"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Question Palette */}
        <div className="w-80 bg-gray-50 border-l p-4 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Question Palette</h3>
            
            {/* Legend */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-5 gap-2">
              {mockQuestions.map((question, index) => {
                const status = getQuestionStatus(question.id);
                return (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`
                      w-10 h-10 rounded text-white font-medium text-sm
                      ${getStatusColor(status)}
                      ${currentQuestion === index ? 'ring-2 ring-blue-500' : ''}
                      hover:opacity-80 transition-opacity
                    `}
                  >
                    {question.questionNumber}
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            <Button
              onClick={() => setShowSubmitDialog(true)}
              className="w-full bg-brand text-brand-navy hover:bg-brand/90"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Test
            </Button>
          </div>
        </div>

        {/* Submit Dialog */}
        <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Test</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit the test? You won't be able to make changes after submission.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
                Cancel
              </Button>
              <Button onClick={submitTest} className="bg-brand text-brand-navy hover:bg-brand/90">
                Submit Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
