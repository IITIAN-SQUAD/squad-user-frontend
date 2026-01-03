"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Circle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  hash: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "correct" | "incorrect" | "unattempted"
}

const mockQuestions: Question[] = [
  {
    id: "1",
    hash: "A7B2C",
    description: "A particle moves with constant acceleration...",
    difficulty: "Medium",
    status: "unattempted"
  },
  {
    id: "2",
    hash: "X9Y4Z",
    description: "Find the derivative of f(x) = x³ + 2x²...",
    difficulty: "Easy",
    status: "correct"
  },
  {
    id: "3",
    hash: "M5N8P",
    description: "Which compound undergoes nucleophilic substitution...",
    difficulty: "Hard",
    status: "incorrect"
  },
  {
    id: "4",
    hash: "Q3R7S",
    description: "A uniform rod of length L and mass M...",
    difficulty: "Medium",
    status: "correct"
  },
  {
    id: "5",
    hash: "B8K1L",
    description: "Calculate the integral of sin(x)cos(x)...",
    difficulty: "Easy",
    status: "unattempted"
  }
]

interface QuestionSidebarProps {
  currentQuestionId: string
}

export default function QuestionSidebar({ currentQuestionId }: QuestionSidebarProps) {
  const [questions] = useState<Question[]>(mockQuestions)
  const [activeFilter, setActiveFilter] = useState<"all" | "attempted" | "unattempted">("all")
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "correct": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "incorrect": return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
  
  // Filter questions based on active tab
  const filteredQuestions = questions.filter(q => {
    if (activeFilter === "all") return true
    if (activeFilter === "attempted") return q.status === "correct" || q.status === "incorrect"
    if (activeFilter === "unattempted") return q.status === "unattempted"
    return true
  })
  
  const attemptedCount = questions.filter(q => q.status === "correct" || q.status === "incorrect").length
  const unattemptedCount = questions.filter(q => q.status === "unattempted").length

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Question Navigation</CardTitle>
        
        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as typeof activeFilter)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="text-xs">
              All ({questions.length})
            </TabsTrigger>
            <TabsTrigger value="attempted" className="text-xs">
              Attempted ({attemptedCount})
            </TabsTrigger>
            <TabsTrigger value="unattempted" className="text-xs">
              Unattempted ({unattemptedCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No questions in this category
              </div>
            ) : (
              filteredQuestions.map((question) => (
              <Link
                key={question.id}
                href={`/practice/question/${question.id}`}
                className={cn(
                  "block p-3 rounded-lg border transition-colors hover:bg-gray-50",
                  currentQuestionId === question.id 
                    ? "bg-blue-50 border-blue-200" 
                    : "bg-white border-gray-200"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(question.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                        {question.hash}
                      </code>
                      <Badge 
                        className={cn("text-xs", getDifficultyColor(question.difficulty))}
                      >
                        {question.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {question.description}
                    </p>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      Question {questions.findIndex(q => q.id === question.id) + 1} of {questions.length}
                    </div>
                  </div>
                </div>
              </Link>
            ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </div>
  )
}
