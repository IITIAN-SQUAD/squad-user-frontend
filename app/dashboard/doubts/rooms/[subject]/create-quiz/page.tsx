"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Brain,
  Clock,
  Trophy,
  Plus,
  X,
  Zap
} from "lucide-react";
import Link from "next/link";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

const quizTypes = [
  { id: "speed", name: "Speed Quiz", description: "Fast-paced questions with time pressure" },
  { id: "challenge", name: "Challenge Quiz", description: "Difficult questions for advanced learners" },
  { id: "practice", name: "Practice Quiz", description: "Casual quiz for concept reinforcement" },
  { id: "competitive", name: "Competitive Quiz", description: "Ranked quiz with leaderboards" }
];

const difficulties = [
  { id: "beginner", name: "Beginner", color: "bg-green-100 text-green-800" },
  { id: "intermediate", name: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
  { id: "advanced", name: "Advanced", color: "bg-red-100 text-red-800" },
  { id: "expert", name: "Expert", color: "bg-purple-100 text-purple-800" }
];

export default function CreateQuizPage() {
  const params = useParams();
  const router = useRouter();
  const subject = params.subject as string;
  
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizType, setQuizType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [timeLimit, setTimeLimit] = useState("30");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    points: 10
  });
  const [isCreating, setIsCreating] = useState(false);

  const addQuestion = () => {
    if (!currentQuestion.question.trim() || currentQuestion.options.some(opt => !opt.trim())) {
      return;
    }

    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: currentQuestion.question,
      options: [...currentQuestion.options],
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      points: currentQuestion.points
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      points: 10
    });
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleCreateQuiz = async () => {
    if (!quizName.trim() || !quizType || !difficulty || questions.length === 0) {
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect back to study room
    router.push(`/dashboard/doubts/rooms/${subject}`);
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const isFormValid = quizName.trim() && quizType && difficulty && questions.length > 0;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/dashboard/doubts/rooms/${subject}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {subject.charAt(0).toUpperCase() + subject.slice(1)} Room
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create Community Quiz</h1>
          <p className="text-muted-foreground">
            Design an engaging quiz for your study community to test knowledge and compete.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quiz Details */}
            <Card>
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Quiz Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter an engaging quiz name..."
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe what this quiz covers and its learning objectives..."
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Quiz Type <span className="text-red-500">*</span>
                    </label>
                    <Select value={quizType} onValueChange={setQuizType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {quizTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Difficulty <span className="text-red-500">*</span>
                    </label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff.id} value={diff.id}>
                            {diff.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Time Limit (seconds)
                    </label>
                    <Select value={timeLimit} onValueChange={setTimeLimit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="45">45 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Add Questions ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Enter your question..."
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Options <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Button
                          variant={currentQuestion.correctAnswer === index ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                          className="w-8 h-8 p-0 flex-shrink-0"
                        >
                          {String.fromCharCode(65 + index)}
                        </Button>
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click the letter button to mark the correct answer
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Points for this question
                    </label>
                    <Select 
                      value={currentQuestion.points.toString()} 
                      onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, points: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 points</SelectItem>
                        <SelectItem value="10">10 points</SelectItem>
                        <SelectItem value="15">15 points</SelectItem>
                        <SelectItem value="20">20 points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Explanation (Optional)
                  </label>
                  <Textarea
                    placeholder="Explain why this is the correct answer..."
                    value={currentQuestion.explanation}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                    className="min-h-[60px]"
                  />
                </div>

                <Button 
                  onClick={addQuestion}
                  disabled={!currentQuestion.question.trim() || currentQuestion.options.some(opt => !opt.trim())}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardContent>
            </Card>

            {/* Questions List */}
            {questions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Added Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {questions.map((question, index) => (
                      <div key={question.id} className="p-3 border rounded-md">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">Q{index + 1}: {question.question}</span>
                              <Badge variant="secondary" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                {question.points} pts
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Correct: {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Create Button */}
            <div className="flex justify-end gap-4">
              <Link href={`/dashboard/doubts/rooms/${subject}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button 
                onClick={handleCreateQuiz}
                disabled={!isFormValid || isCreating}
                className="bg-brand text-gray-900 hover:bg-brand/90"
              >
                {isCreating ? "Creating..." : "Create Quiz"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quiz Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quizName && (
                  <div>
                    <h3 className="font-semibold">{quizName}</h3>
                    {quizDescription && (
                      <p className="text-sm text-muted-foreground mt-1">{quizDescription}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  {quizType && (
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{quizTypes.find(t => t.id === quizType)?.name}</span>
                    </div>
                  )}
                  {difficulty && (
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <Badge className={difficulties.find(d => d.id === difficulty)?.color}>
                        {difficulties.find(d => d.id === difficulty)?.name}
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-medium">{timeLimit}s per question</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Points:</span>
                    <span className="font-medium text-brand">{totalPoints}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quiz Creation Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Balanced Difficulty</h4>
                  <p className="text-muted-foreground">
                    Mix easy and challenging questions to engage all skill levels.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Clear Questions</h4>
                  <p className="text-muted-foreground">
                    Write questions that are unambiguous and test specific concepts.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Helpful Explanations</h4>
                  <p className="text-muted-foreground">
                    Provide explanations to help participants learn from mistakes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Fair Timing</h4>
                  <p className="text-muted-foreground">
                    Set appropriate time limits based on question complexity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
