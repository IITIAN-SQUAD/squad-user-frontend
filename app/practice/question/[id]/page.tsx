"use client";

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { 
  Bookmark, 
  BookmarkPlus, 
  ListPlus, 
  ChevronLeft, 
  ChevronRight,
  Lock,
  AlertTriangle,
  Flag,
  ArrowLeft
} from "lucide-react"

import QuestionSidebar from "@/components/practice/QuestionSidebar"
import QuestionContent from "@/components/practice/QuestionContent"
import CommentsTab from "@/components/practice/CommentsTab"
import CommunitySolutionTab from "@/components/practice/CommunitySolutionTab"
import AttemptHistoryTab from "@/components/practice/AttemptHistoryTab"

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

const mockQuestion: Question = {
  id: "1",
  hash: "A7B2C",
  description: "A particle moves with constant acceleration. If its velocity changes from 10 m/s to 30 m/s in 4 seconds, find the acceleration.",
  year: "2024",
  difficulty: "Medium",
  attempted: 1247,
  avgAccuracy: 78.5,
  tags: {
    subject: "Physics",
    topic: "Kinematics",
    exam: "JEE Main"
  },
  status: "unattempted",
  isBookmarked: false,
  options: [
    "2.5 m/s²",
    "5.0 m/s²", 
    "7.5 m/s²",
    "10.0 m/s²"
  ],
  correctAnswer: "5.0 m/s²",
  explanation: "Using the formula a = (v - u)/t, where v = 30 m/s, u = 10 m/s, t = 4 s. Therefore, a = (30 - 10)/4 = 20/4 = 5.0 m/s²"
}

export default function QuestionPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const questionId = params.id as string
  const source = searchParams.get('source')
  
  const [question, setQuestion] = useState<Question>(mockQuestion)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showBookmarkDialog, setShowBookmarkDialog] = useState(false)
  const [showListDialog, setShowListDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("question")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state - user is logged in
  const [hasAttempted, setHasAttempted] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const isTabLocked = (tab: string) => {
    if (tab === "question") return false
    if (!isLoggedIn) return true
    // Allow access to comments and community solutions for logged-in users
    if (tab === "comments" || tab === "community") return false
    return !hasAttempted && !showAnswer
  }

  const handleAttempt = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true)
      return
    }
    if (!selectedAnswer) return
    
    setHasAttempted(true)
    setAttemptCount(prev => prev + 1)
    const isCorrect = selectedAnswer === question.correctAnswer
    setQuestion(prev => ({
      ...prev,
      status: isCorrect ? "correct" : "incorrect"
    }))
  }

  const handleRetry = () => {
    setSelectedAnswer("")
    setHasAttempted(false)
    // Keep the question status as is for tracking
  }

  const handleShowAnswer = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true)
      return
    }
    // Always show warning before revealing answer
    setShowWarning(true)
  }

  const confirmShowAnswer = () => {
    setShowAnswer(true)
    setShowWarning(false)
    // Record 0% accuracy for this attempt
    setQuestion(prev => ({
      ...prev,
      status: "incorrect"
    }))
  }

  const toggleBookmark = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true)
      return
    }
    setQuestion(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked
    }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar - Question Navigation */}
        <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
          <QuestionSidebar currentQuestionId={questionId} />
        </div>

        <div className="flex-1 p-6">
          <div className="bg-white border rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-b bg-white">
              {/* Top Row - Navigation and Actions */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      if (source === 'revision') {
                        router.push('/dashboard/revision')
                      } else {
                        router.push('/dashboard')
                      }
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Questions
                  </Button>
                  
                  <Badge variant="outline" className="font-mono text-xs">
                    {question.hash}
                  </Badge>
                  <Badge 
                    variant={question.difficulty === 'Easy' ? 'secondary' : question.difficulty === 'Medium' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {question.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {question.year}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  
                  <div className="h-6 w-px bg-border mx-1" />
                  
                  <Button 
                    variant={question.isBookmarked ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleBookmark}
                  >
                    {question.isBookmarked ? <Bookmark className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => !isLoggedIn ? setShowLoginDialog(true) : setShowListDialog(true)}
                  >
                    <ListPlus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => !isLoggedIn ? setShowLoginDialog(true) : setShowReportDialog(true)}
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Question Meta Row */}
              <div className="flex items-center gap-6 px-4 py-3 text-sm text-gray-600 bg-gray-50">
                <span className="font-medium text-gray-900">{question.year}</span>
                <span className="font-medium text-gray-900">{question.difficulty}</span>
                <span>{question.attempted.toLocaleString()} attempts</span>
                <span>{question.avgAccuracy}% avg accuracy</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{question.tags.subject}</Badge>
                  <Badge variant="secondary" className="text-xs">{question.tags.topic}</Badge>
                  <Badge variant="secondary" className="text-xs">{question.tags.exam}</Badge>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-4 pb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="question">Question</TabsTrigger>
                  <TabsTrigger 
                    value="comments" 
                    disabled={isTabLocked("comments")}
                    className="relative"
                  >
                    Comments
                    {isTabLocked("comments") && (
                      <Lock className="h-3 w-3 ml-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="community" 
                    disabled={isTabLocked("community")}
                    className="relative"
                  >
                    Community Solutions
                    {isTabLocked("community") && (
                      <Lock className="h-3 w-3 ml-1" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    disabled={isTabLocked("history")}
                    className="relative"
                  >
                    Attempt History
                    {isTabLocked("history") && (
                      <Lock className="h-3 w-3 ml-1" />
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="question" className="space-y-0">
                  <QuestionContent
                    question={question}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    hasAttempted={hasAttempted}
                    showAnswer={showAnswer}
                    onAttempt={handleAttempt}
                    onShowAnswer={handleShowAnswer}
                    onRetry={handleRetry}
                  />
                </TabsContent>

                <TabsContent value="comments" className="space-y-0">
                  {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Lock className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Required</h3>
                      <p className="text-gray-600 mb-4">Please log in to view and post comments</p>
                      <Button onClick={() => setShowLoginDialog(true)} className="bg-brand text-gray-900 hover:bg-brand/90">
                        Login to Continue
                      </Button>
                    </div>
                  ) : (
                    <CommentsTab questionId={params.id as string} />
                  )}
                </TabsContent>

                <TabsContent value="community" className="space-y-0">
                  {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Lock className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Required</h3>
                      <p className="text-gray-600 mb-4">Please log in to view community solutions</p>
                      <Button onClick={() => setShowLoginDialog(true)} className="bg-brand text-gray-900 hover:bg-brand/90">
                        Login to Continue
                      </Button>
                    </div>
                  ) : (
                    <CommunitySolutionTab questionId={params.id as string} />
                  )}
                </TabsContent>

                <TabsContent value="history" className="space-y-0">
                  {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Lock className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Required</h3>
                      <p className="text-gray-600 mb-4">Please log in to view your attempt history</p>
                      <Button onClick={() => setShowLoginDialog(true)} className="bg-brand text-gray-900 hover:bg-brand/90">
                        Login to Continue
                      </Button>
                    </div>
                  ) : (
                    <AttemptHistoryTab questionId={params.id as string} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Warning Modal */}
          <Dialog open={showWarning} onOpenChange={setShowWarning}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Show Answer Warning
                </DialogTitle>
                <DialogDescription>
                  Showing the answer without attempting will record 0% accuracy for this question. 
                  This will affect your performance statistics. Are you sure you want to continue?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline"
                  onClick={() => setShowWarning(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmShowAnswer}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Show Answer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Login Required Modal */}
          <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-brand" />
                  Login Required
                </DialogTitle>
                <DialogDescription>
                  You need to be logged in to access this feature. Please log in or create an account to continue.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowLoginDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => window.location.href = '/signup'}
                  variant="outline"
                >
                  Sign Up
                </Button>
                <Button 
                  onClick={() => window.location.href = '/login'}
                  className="bg-brand text-gray-900 hover:bg-brand/90"
                >
                  Login
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
