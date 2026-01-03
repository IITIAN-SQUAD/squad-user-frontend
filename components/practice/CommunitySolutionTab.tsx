"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ThumbsUp, ThumbsDown, Flag, Upload, Image as ImageIcon, Bold, Italic, Code, Share, Eye, ZoomIn, ZoomOut, X, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Reply {
  id: string
  author: {
    name: string
    avatar?: string
    xp: number
  }
  content: string
  createdAt: Date
  upvotes: number
  downvotes: number
  isUpvoted?: boolean
  isDownvoted?: boolean
}

interface Solution {
  id: string
  author: {
    name: string
    avatar?: string
    xp: number
  }
  content: string
  imageUrl?: string
  imageSize?: number
  createdAt: Date
  upvotes: number
  downvotes: number
  replies: Reply[]
  isUpvoted?: boolean
  isDownvoted?: boolean
}

const mockSolutions: Solution[] = [
  {
    id: "1",
    author: {
      name: "Dr. Rajesh Kumar",
      xp: 3500
    },
    content: "Here's a step-by-step solution:\n\n1. Given: Initial velocity (u) = 10 m/s, Final velocity (v) = 30 m/s, Time (t) = 4 s\n\n2. We need to find acceleration (a)\n\n3. Using the kinematic equation: v = u + at\n   30 = 10 + a(4)\n   20 = 4a\n   a = 5 m/s²\n\nAlternatively, we can use: a = (v - u)/t = (30 - 10)/4 = 20/4 = 5 m/s²",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    upvotes: 25,
    downvotes: 1,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Vikash Singh",
          xp: 750
        },
        content: "Great explanation! The step-by-step approach makes it very clear. Thanks for showing both methods.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        upvotes: 5,
        downvotes: 0
      },
      {
        id: "1-2",
        author: {
          name: "Ananya Reddy",
          xp: 920
        },
        content: "Could you explain when we should use v² = u² + 2as instead of this formula?",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        upvotes: 3,
        downvotes: 0
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Sneha Gupta",
      xp: 1800
    },
    content: "Visual approach with graph method:\n\nSince acceleration is constant, we can draw a velocity-time graph. The slope of this graph gives us the acceleration.\n\nSlope = (Change in velocity) / (Change in time)\nSlope = (30 - 10) / (4 - 0) = 20/4 = 5 m/s²",
    imageUrl: "/placeholder-graph.png",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    upvotes: 18,
    downvotes: 2,
    replies: []
  }
]

interface CommunitySolutionTabProps {
  questionId: string
}

export default function CommunitySolutionTab({ questionId }: CommunitySolutionTabProps) {
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions)
  const [newSolution, setNewSolution] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [imageSize, setImageSize] = useState(300) // Default image width in pixels
  const [sortBy, setSortBy] = useState<"upvotes" | "date">("upvotes")
  const [editorSelection, setEditorSelection] = useState({ start: 0, end: 0 })
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleAddSolution = () => {
    if (!newSolution.trim()) return

    const solution: Solution = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        xp: 500
      },
      content: newSolution,
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      imageSize: selectedImage ? imageSize : undefined,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    }

    setSolutions(prev => [solution, ...prev])
    setNewSolution("")
    setSelectedImage(null)
    setImageSize(300)
    setShowPreview(false)
    setShowEditor(false)
  }

  const handleVote = (solutionId: string, type: 'up' | 'down', replyId?: string) => {
    setSolutions(prev => prev.map(solution => {
      if (replyId) {
        // Voting on a reply
        if (solution.id === solutionId) {
          return {
            ...solution,
            replies: solution.replies.map(reply => {
              if (reply.id === replyId) {
                if (type === 'up') {
                  return {
                    ...reply,
                    upvotes: reply.isUpvoted ? reply.upvotes - 1 : reply.upvotes + 1,
                    downvotes: reply.isDownvoted ? reply.downvotes - 1 : reply.downvotes,
                    isUpvoted: !reply.isUpvoted,
                    isDownvoted: false
                  }
                } else {
                  return {
                    ...reply,
                    downvotes: reply.isDownvoted ? reply.downvotes - 1 : reply.downvotes + 1,
                    upvotes: reply.isUpvoted ? reply.upvotes - 1 : reply.upvotes,
                    isDownvoted: !reply.isDownvoted,
                    isUpvoted: false
                  }
                }
              }
              return reply
            })
          }
        }
        return solution
      } else {
        // Voting on a solution
        if (solution.id === solutionId) {
          if (type === 'up') {
            return {
              ...solution,
              upvotes: solution.isUpvoted ? solution.upvotes - 1 : solution.upvotes + 1,
              downvotes: solution.isDownvoted ? solution.downvotes - 1 : solution.downvotes,
              isUpvoted: !solution.isUpvoted,
              isDownvoted: false
            }
          } else {
            return {
              ...solution,
              downvotes: solution.isDownvoted ? solution.downvotes - 1 : solution.downvotes + 1,
              upvotes: solution.isUpvoted ? solution.upvotes - 1 : solution.upvotes,
              isDownvoted: !solution.isDownvoted,
              isUpvoted: false
            }
          }
        }
        return solution
      }
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const renderPreview = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm whitespace-pre">$1</code></pre>')
      .replace(/\n/g, '<br>')
  }

  const handleAddReply = (solutionId: string) => {
    if (!replyText.trim()) return

    const reply: Reply = {
      id: `${solutionId}-${Date.now()}`,
      author: {
        name: "Current User",
        xp: 500
      },
      content: replyText,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0
    }

    setSolutions(prev => prev.map(solution => 
      solution.id === solutionId 
        ? { ...solution, replies: [...solution.replies, reply] }
        : solution
    ))
    
    setReplyText("")
    setReplyingTo(null)
  }

  const adjustImageSize = (delta: number) => {
    setImageSize(prev => Math.max(100, Math.min(600, prev + delta)))
  }

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('solution-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = newSolution.substring(start, end)
    const beforeText = newSolution.substring(0, start)
    const afterText = newSolution.substring(end)

    const newText = beforeText + before + selectedText + after + afterText
    setNewSolution(newText)

    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const sortedSolutions = [...solutions].sort((a, b) => {
    if (sortBy === "upvotes") {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
    } else {
      return b.createdAt.getTime() - a.createdAt.getTime()
    }
  })

  return (
    <div className="space-y-6">
      {/* Share Your Answer Button */}
      <div className="flex justify-center">
        <Dialog open={showEditor} onOpenChange={setShowEditor}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Share className="h-4 w-4 mr-2" />
              Share Your Answer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Share Your Solution</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Editor/Preview Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={!showPreview ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowPreview(false)}
                >
                  Edit
                </Button>
                <Button
                  variant={showPreview ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  disabled={!newSolution.trim()}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>

              <div>
                <Label htmlFor="solution-editor">Solution</Label>
                
                {!showPreview ? (
                  <>
                    {/* Rich Text Toolbar */}
                    <div className="flex items-center gap-2 mt-2 mb-2 p-2 border rounded-t-md bg-gray-50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting('**', '**')}
                        title="Bold"
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting('*', '*')}
                        title="Italic"
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting('`', '`')}
                        title="Inline Code"
                      >
                        <Code className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting('```\n', '\n```')}
                        title="Code Block"
                      >
                        Code Block
                      </Button>
                      <div className="h-4 w-px bg-gray-300 mx-2" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => document.getElementById('solution-image')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Image
                      </Button>
                    </div>
                    
                    <Textarea
                      id="solution-editor"
                      placeholder="Explain your approach step by step...\n\nYou can use:\n**bold text**\n*italic text*\n`inline code`\n\n```\nfunction solve() {\n  // Your code here\n}\n```"
                      value={newSolution}
                      onChange={(e) => setNewSolution(e.target.value)}
                      className="min-h-[200px] rounded-t-none font-mono text-sm"
                    />
                  </>
                ) : (
                  <div className="min-h-[200px] p-4 border rounded-md bg-white">
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: renderPreview(newSolution) }}
                    />
                    {selectedImage && (
                      <div className="mt-4">
                        <img 
                          src={URL.createObjectURL(selectedImage)} 
                          alt="Preview" 
                          style={{ width: `${imageSize}px`, height: 'auto' }}
                          className="rounded border"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <Input
                  id="solution-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {selectedImage && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground flex-1">
                        {selectedImage.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Image Size Controls */}
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                      <span className="text-sm font-medium">Image Size:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustImageSize(-50)}
                        disabled={imageSize <= 100}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                        {imageSize}px
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustImageSize(50)}
                        disabled={imageSize >= 600}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Image Preview */}
                    <div className="p-3 bg-gray-50 rounded-md">
                      <img 
                        src={URL.createObjectURL(selectedImage)} 
                        alt="Preview" 
                        style={{ width: `${imageSize}px`, height: 'auto' }}
                        className="rounded border"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditor(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSolution} disabled={!newSolution.trim()}>
                  Post Solution
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Solutions List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold">
            Community Solutions ({solutions.length})
          </h3>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-xs sm:text-sm">Sort by:</Label>
            <Select value={sortBy} onValueChange={(value: "upvotes" | "date") => setSortBy(value)}>
              <SelectTrigger className="w-32 h-9 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upvotes">Most Upvoted</SelectItem>
                <SelectItem value="date">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {sortedSolutions.map(solution => (
          <Card key={solution.id}>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 flex-shrink-0">
                  <AvatarImage src={solution.author.avatar} />
                  <AvatarFallback className="text-[10px] sm:text-xs">
                    {solution.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="font-medium text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">{solution.author.name}</span>
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1 sm:px-2 py-0">
                      {solution.author.xp} XP
                    </Badge>
                    <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {formatDistanceToNow(solution.createdAt, { addSuffix: true })}
                    </span>
                    {solution.replies.length > 0 && (
                      <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                        • {solution.replies.length} {solution.replies.length === 1 ? 'reply' : 'replies'}
                      </span>
                    )}
                  </div>
                  
                  <div className="prose prose-sm max-w-none mb-3 sm:mb-4">
                    <div 
                      className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed break-words"
                      dangerouslySetInnerHTML={{
                        __html: solution.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs">$1</code>')
                          .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code>$1</code></pre>')
                      }}
                    />
                  </div>
                  
                  {solution.imageUrl && (
                    <div className="mb-3 sm:mb-4">
                      <img
                        src={solution.imageUrl}
                        alt="Solution diagram"
                        style={{ width: solution.imageSize ? `${solution.imageSize}px` : '300px', height: 'auto', maxWidth: '100%' }}
                        className="rounded-lg border"
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-0.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-7 px-1.5 sm:h-8 sm:px-2 text-[10px] sm:text-xs ${solution.isUpvoted ? 'text-green-600 bg-green-50' : ''}`}
                        onClick={() => handleVote(solution.id, 'up')}
                      >
                        <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                        <span className="text-[10px] sm:text-xs">{solution.upvotes}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-7 px-1.5 sm:h-8 sm:px-2 text-[10px] sm:text-xs ${solution.isDownvoted ? 'text-red-600 bg-red-50' : ''}`}
                        onClick={() => handleVote(solution.id, 'down')}
                      >
                        <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                        <span className="text-[10px] sm:text-xs">{solution.downvotes}</span>
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 px-1.5 sm:h-8 sm:px-2 text-[10px] sm:text-xs"
                      onClick={() => setReplyingTo(solution.id)}
                    >
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                      <span className="hidden sm:inline">Reply</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="h-7 px-1.5 sm:h-8 sm:px-2 text-[10px] sm:text-xs">
                      <Flag className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                      <span className="hidden sm:inline">Report</span>
                    </Button>
                  </div>
                  
                  {/* Reply Form */}
                  {replyingTo === solution.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <Textarea
                        placeholder="Add a thoughtful reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="mb-3 min-h-[80px] text-sm"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleAddReply(solution.id)}
                          disabled={!replyText.trim()}
                          className="h-7 text-xs"
                        >
                          Reply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            setReplyingTo(null)
                            setReplyText("")
                          }}
                          className="h-7 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {solution.replies.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {solution.replies.map(reply => (
                        <div key={reply.id} className="ml-4 pl-4 border-l-2 border-gray-200">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.author.avatar} />
                              <AvatarFallback className="text-xs">
                                {reply.author.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-sm">{reply.author.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {reply.author.xp} XP
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(reply.createdAt, { addSuffix: true })}
                                </span>
                              </div>
                              
                              <div className="text-sm text-gray-800 mb-3 leading-relaxed">
                                {reply.content}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-6 px-2 text-xs ${reply.isUpvoted ? 'text-green-600 bg-green-50' : 'text-gray-500'}`}
                                  onClick={() => handleVote(solution.id, 'up', reply.id)}
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {reply.upvotes}
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-6 px-2 text-xs ${reply.isDownvoted ? 'text-red-600 bg-red-50' : 'text-gray-500'}`}
                                  onClick={() => handleVote(solution.id, 'down', reply.id)}
                                >
                                  <ThumbsDown className="h-3 w-3 mr-1" />
                                  {reply.downvotes}
                                </Button>
                                
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-500">
                                  <Flag className="h-3 w-3 mr-1" />
                                  Report
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {solutions.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No solutions yet. Be the first to share your approach!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
