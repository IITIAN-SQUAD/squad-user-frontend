"use client";

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useAuthStatus } from "@/hooks/useAuthStatus"
import { logout } from "@/lib/authApi"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { 
  Bookmark, 
  BookmarkPlus, 
  ListPlus, 
  ChevronLeft, 
  ChevronRight,
  Lock,
  AlertTriangle,
  Flag,
  ArrowLeft,
  Menu,
  Lightbulb,
  User,
  LogOut,
  Plus,
  Check
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
  const { isAuthenticated, user, loading: authLoading } = useAuthStatus()
  const [hasAttempted, setHasAttempted] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [selectedLists, setSelectedLists] = useState<string[]>([])
  
  // Mock custom lists
  const mockLists = [
    { id: "1", name: "Important Questions", count: 45 },
    { id: "2", name: "Revision List", count: 23 },
    { id: "3", name: "Weak Topics", count: 12 }
  ]

  const isTabLocked = (tab: string) => {
    if (tab === "question") return false
    if (!isAuthenticated) return true
    // Allow access to comments and community solutions for logged-in users
    if (tab === "comments" || tab === "community") return false
    return !hasAttempted && !showAnswer
  }

  const handleAttempt = () => {
    if (!isAuthenticated) {
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
    setShowAnswer(false)
    setQuestion(prev => ({ ...prev, status: "unattempted" }))
  }

  const handleShowAnswer = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true)
      return
    }
    // Always show warning before revealing answer
    setShowWarning(true)
  }
  
  const handleLogout = async () => {
    try {
      await logout()
      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error)
    }
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

  const handleAddToList = () => {
    console.log("Adding to lists:", selectedLists)
    setShowListDialog(false)
    setSelectedLists([])
  }
  
  const handleCreateList = () => {
    if (newListName.trim()) {
      console.log("Creating new list:", newListName)
      setNewListName("")
    }
  }
  
  const toggleListSelection = (listId: string) => {
    setSelectedLists(prev => 
      prev.includes(listId) 
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Question Navigation - Desktop */}
        <div className="hidden md:block md:w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
          <QuestionSidebar currentQuestionId={questionId} />
        </div>

        {/* Mobile Navigation Sheet */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="md:hidden fixed bottom-4 right-4 z-50 shadow-lg"
            >
              <Menu className="h-4 w-4 mr-2" />
              Questions
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Question Navigation</SheetTitle>
            </SheetHeader>
            <QuestionSidebar currentQuestionId={questionId} />
          </SheetContent>
        </Sheet>

        <div className="flex-1 p-3 sm:p-6">
          <div className="bg-white border rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-b bg-white">
              {/* Top Row - Navigation and Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => !isAuthenticated ? setShowLoginDialog(true) : setQuestion(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }))}
                  >
                    {question.isBookmarked ? (
                      <Bookmark className="h-4 w-4 fill-current text-yellow-500" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => !isAuthenticated ? setShowLoginDialog(true) : setShowListDialog(true)}
                  >
                    <ListPlus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowReportDialog(true)}
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                  
                  {/* Login/Signup/Profile */}
                  {!isAuthenticated ? (
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = '/login'}
                        className="text-xs sm:text-sm px-2 sm:px-3"
                      >
                        Login
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-brand text-gray-900 hover:bg-brand/90 text-xs sm:text-sm px-2 sm:px-3"
                        onClick={() => window.location.href = '/signup'}
                      >
                        Sign Up
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
                          <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                            <AvatarImage src={user?.image_url || ''} />
                            <AvatarFallback className="text-xs">
                              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="hidden md:inline text-sm">{user?.name || 'User'}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              {/* Question Meta Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">{question.year}</span>
                  <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span>{question.attempted.toLocaleString()} attempts</span>
                  <span>{question.avgAccuracy}% avg accuracy</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{question.tags.subject}</Badge>
                  <Badge variant="secondary" className="text-xs">{question.tags.topic}</Badge>
                  <Badge variant="secondary" className="text-xs">{question.tags.exam}</Badge>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-3 sm:px-6 pt-4 pb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4 h-auto grid grid-cols-2 md:grid-cols-4 gap-1">
                  <TabsTrigger value="question" className="text-xs sm:text-sm">
                    Question
                  </TabsTrigger>
                  <TabsTrigger 
                    value="comments" 
                    disabled={isTabLocked("comments")}
                    className="relative text-xs sm:text-sm"
                  >
                    <span className="truncate">Comments</span>
                    {isTabLocked("comments") && (
                      <Lock className="h-3 w-3 ml-1 flex-shrink-0" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="community" 
                    disabled={isTabLocked("community")}
                    className="relative text-xs sm:text-sm"
                  >
                    <span className="truncate">Community</span>
                    <span className="hidden lg:inline ml-1">Solutions</span>
                    {isTabLocked("community") && (
                      <Lock className="h-3 w-3 ml-1 flex-shrink-0" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    disabled={isTabLocked("history")}
                    className="relative text-xs sm:text-sm"
                  >
                    <span className="truncate">Attempt</span>
                    <span className="hidden lg:inline ml-1">History</span>
                    {isTabLocked("history") && (
                      <Lock className="h-3 w-3 ml-1 flex-shrink-0" />
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="question" className="space-y-0">
                  <div className="space-y-4">
                    {/* Show Hint Button */}
                    {!hasAttempted && !showAnswer && (
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowHint(!showHint)}
                          className="gap-2"
                        >
                          <Lightbulb className="h-4 w-4" />
                          {showHint ? 'Hide Hint' : 'Show Hint'}
                        </Button>
                      </div>
                    )}
                    
                    {/* Hint Card */}
                    {showHint && (
                      <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-yellow-900 mb-1">Hint</h4>
                              <p className="text-sm text-yellow-800">
                                Use the kinematic equation v = u + at to find acceleration. Remember to identify the given values first.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
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
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-0">
                  {!isAuthenticated ? (
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
                  {!isAuthenticated ? (
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
                  {!isAuthenticated ? (
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
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowLoginDialog(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => window.location.href = '/signup'}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Sign Up
                </Button>
                <Button 
                  onClick={() => window.location.href = '/login'}
                  className="bg-brand text-gray-900 hover:bg-brand/90 w-full sm:w-auto"
                >
                  Login
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Add to List Dialog */}
          <Dialog open={showListDialog} onOpenChange={setShowListDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add to List</DialogTitle>
                <DialogDescription>
                  Add this question to your custom lists for easy access later.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {/* Existing Lists */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Your Lists</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mockLists.map(list => (
                      <div 
                        key={list.id}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleListSelection(list.id)}
                      >
                        <Checkbox 
                          checked={selectedLists.includes(list.id)}
                          onCheckedChange={() => toggleListSelection(list.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{list.name}</p>
                          <p className="text-xs text-muted-foreground">{list.count} questions</p>
                        </div>
                        {selectedLists.includes(list.id) && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Create New List */}
                <div className="space-y-2">
                  <Label htmlFor="new-list" className="text-sm font-medium">Create New List</Label>
                  <div className="flex gap-2">
                    <Input
                      id="new-list"
                      placeholder="Enter list name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
                    />
                    <Button 
                      size="sm" 
                      onClick={handleCreateList}
                      disabled={!newListName.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowListDialog(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddToList}
                  disabled={selectedLists.length === 0}
                  className="w-full sm:w-auto"
                >
                  Add to {selectedLists.length} {selectedLists.length === 1 ? 'List' : 'Lists'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
