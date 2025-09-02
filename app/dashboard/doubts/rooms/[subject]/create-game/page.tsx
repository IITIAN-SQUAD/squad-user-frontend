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
  Gamepad2,
  Users,
  Clock,
  Trophy,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";

interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const gameTypes = [
  { id: "quiz", name: "Quiz Battle", description: "Multiple choice questions with time limits" },
  { id: "flashcards", name: "Flash Cards", description: "Quick concept matching game" },
  { id: "concept-match", name: "Concept Connections", description: "Link related concepts together" },
  { id: "speed-solve", name: "Speed Solve", description: "Fast problem solving competition" }
];

const difficulties = [
  { id: "easy", name: "Easy", color: "bg-green-100 text-green-800" },
  { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { id: "hard", name: "Hard", color: "bg-red-100 text-red-800" }
];

export default function CreateGamePage() {
  const params = useParams();
  const router = useRouter();
  const subject = params.subject as string;
  
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameType, setGameType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("10");
  const [duration, setDuration] = useState("15");
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: ""
  });
  const [isCreating, setIsCreating] = useState(false);

  const addQuestion = () => {
    if (!currentQuestion.question.trim() || currentQuestion.options.some(opt => !opt.trim())) {
      return;
    }

    const newQuestion: GameQuestion = {
      id: Date.now().toString(),
      question: currentQuestion.question,
      options: [...currentQuestion.options],
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: ""
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

  const handleCreateGame = async () => {
    if (!gameName.trim() || !gameType || !difficulty || questions.length === 0) {
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect back to study room
    router.push(`/dashboard/doubts/rooms/${subject}`);
  };

  const isFormValid = gameName.trim() && gameType && difficulty && questions.length > 0;

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
          <h1 className="text-3xl font-bold mb-2">Create Study Game</h1>
          <p className="text-muted-foreground">
            Design an interactive game for your fellow students to learn and compete.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Details */}
            <Card>
              <CardHeader>
                <CardTitle>Game Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Game Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter an engaging game name..."
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe what players will learn and how the game works..."
                    value={gameDescription}
                    onChange={(e) => setGameDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Game Type <span className="text-red-500">*</span>
                    </label>
                    <Select value={gameType} onValueChange={setGameType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select game type" />
                      </SelectTrigger>
                      <SelectContent>
                        {gameTypes.map((type) => (
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Max Participants
                    </label>
                    <Select value={maxParticipants} onValueChange={setMaxParticipants}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 players</SelectItem>
                        <SelectItem value="10">10 players</SelectItem>
                        <SelectItem value="15">15 players</SelectItem>
                        <SelectItem value="20">20 players</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Duration (minutes)
                    </label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
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
                            <div className="font-medium mb-1">
                              Q{index + 1}: {question.question}
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
                onClick={handleCreateGame}
                disabled={!isFormValid || isCreating}
                className="bg-brand text-gray-900 hover:bg-brand/90"
              >
                {isCreating ? "Creating..." : "Create Game"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Game Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gameName && (
                  <div>
                    <h3 className="font-semibold">{gameName}</h3>
                    {gameDescription && (
                      <p className="text-sm text-muted-foreground mt-1">{gameDescription}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  {gameType && (
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{gameTypes.find(t => t.id === gameType)?.name}</span>
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
                    <span>Players:</span>
                    <span className="font-medium">{maxParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{questions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Great Games</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Engaging Questions</h4>
                  <p className="text-muted-foreground">
                    Create questions that test understanding, not just memorization.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Clear Explanations</h4>
                  <p className="text-muted-foreground">
                    Help players learn by explaining why answers are correct.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Balanced Difficulty</h4>
                  <p className="text-muted-foreground">
                    Mix easy and challenging questions to keep everyone engaged.
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
