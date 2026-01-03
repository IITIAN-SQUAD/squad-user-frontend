"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: string
  hash: string
  description: string
  year: string
  difficulty: "Easy" | "Medium" | "Hard"
  attempted: number
  avgAccuracy: number
  tags: {
    subject: string
    topic: string
    exam: string
  }
  status: "correct" | "incorrect" | "unattempted"
  isBookmarked: boolean
  options?: string[]
  correctAnswer?: string
  explanation?: string
}

interface QuestionContentProps {
  question: Question
  selectedAnswer: string
  setSelectedAnswer: (answer: string) => void
  hasAttempted: boolean
  showAnswer: boolean
  onAttempt: () => void
  onShowAnswer: () => void
  onRetry?: () => void
}

export default function QuestionContent({
  question,
  selectedAnswer,
  setSelectedAnswer,
  hasAttempted,
  showAnswer,
  onAttempt,
  onShowAnswer,
  onRetry
}: QuestionContentProps) {
  
  const getOptionStyle = (option: string) => {
    if (!showAnswer && !hasAttempted) return ""
    
    if (showAnswer && option === question.correctAnswer) {
      return "border-green-500 bg-green-50"
    }
    
    if (hasAttempted && option === selectedAnswer && option !== question.correctAnswer && showAnswer) {
      return "border-red-500 bg-red-50"
    }
    
    return ""
  }

  const getOptionIcon = (option: string) => {
    if (!showAnswer) return null
    
    if (option === question.correctAnswer) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }
    
    if (hasAttempted && option === selectedAnswer && option !== question.correctAnswer) {
      return <XCircle className="h-4 w-4 text-red-600" />
    }
    
    return null
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle>Question</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-6">
            {question.description}
          </p>
          
          {question.options && (
            <RadioGroup 
              value={selectedAnswer} 
              onValueChange={setSelectedAnswer}
              disabled={hasAttempted && question.status === "correct"}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${getOptionStyle(option)}`}
                >
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    disabled={hasAttempted && question.status === "correct"}
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-base"
                  >
                    <span className="font-medium mr-2">({String.fromCharCode(65 + index)})</span>
                    {option}
                  </Label>
                  {getOptionIcon(option)}
                </div>
              ))}
            </RadioGroup>
          )}
          
          <div className="flex flex-wrap gap-3 mt-6">
            {!hasAttempted ? (
              <>
                <Button 
                  onClick={onAttempt}
                  disabled={!selectedAnswer}
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  Submit Answer
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onShowAnswer}
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  Show Answer
                </Button>
              </>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {question.status === "correct" ? (
                  <Badge className="bg-green-100 text-green-800 px-3 py-1.5 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Correct Answer!
                  </Badge>
                ) : (
                  <>
                    <Badge className="bg-red-100 text-red-800 px-3 py-1.5 text-sm">
                      <XCircle className="h-4 w-4 mr-2" />
                      Incorrect Answer
                    </Badge>
                    {!showAnswer && onRetry && (
                      <Button 
                        onClick={onRetry}
                        variant="outline"
                        size="sm"
                      >
                        Try Again
                      </Button>
                    )}
                    {!showAnswer && (
                      <Button 
                        variant="outline" 
                        onClick={onShowAnswer}
                        size="sm"
                      >
                        Show Answer
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      {(showAnswer || (hasAttempted && question.status === "correct")) && question.explanation && (
        <Card>
          <CardHeader>
            <CardTitle>Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              {question.explanation}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
