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
import { ThumbsUp, ThumbsDown, Flag, Upload, Image as ImageIcon, Bold, Italic, Code, Share, Eye, ZoomIn, ZoomOut, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Solution {
  id: string
  author: {
    name: string
    avatar?: string
    reputation: number
  }
  content: string
  imageUrl?: string
  imageSize?: number
  createdAt: Date
  upvotes: number
  downvotes: number
  isUpvoted?: boolean
  isDownvoted?: boolean
}

const mockSolutions: Solution[] = [
  {
    id: "1",
    author: {
      name: "Dr. Rajesh Kumar",
      reputation: 3500
    },
    content: "Here's a step-by-step solution:\n\n1. Given: Initial velocity (u) = 10 m/s, Final velocity (v) = 30 m/s, Time (t) = 4 s\n\n2. We need to find acceleration (a)\n\n3. Using the kinematic equation: v = u + at\n   30 = 10 + a(4)\n   20 = 4a\n   a = 5 m/s²\n\nAlternatively, we can use: a = (v - u)/t = (30 - 10)/4 = 20/4 = 5 m/s²",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    upvotes: 25,
    downvotes: 1
  },
  {
    id: "2",
    author: {
      name: "Priya Sharma",
      reputation: 1800
    },
    content: "Visual approach with graph method:\n\nSince acceleration is constant, we can draw a velocity-time graph. The slope of this graph gives us the acceleration.\n\nSlope = (Change in velocity) / (Change in time)\nSlope = (30 - 10) / (4 - 0) = 20/4 = 5 m/s²",
    imageUrl: "/placeholder-graph.png",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    upvotes: 18,
    downvotes: 2
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

  const handleAddSolution = () => {
    if (!newSolution.trim()) return

    const solution: Solution = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        reputation: 500
      },
      content: newSolution,
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      imageSize: selectedImage ? imageSize : undefined,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0
    }

    setSolutions(prev => [solution, ...prev])
    setNewSolution("")
    setSelectedImage(null)
    setImageSize(300)
    setShowPreview(false)
    setShowEditor(false)
  }

  const handleVote = (solutionId: string, type: 'up' | 'down') => {
    setSolutions(prev => prev.map(solution => {
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
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code>$1</code></pre>')
      .replace(/\n/g, '<br>')
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
                        onClick={() => insertFormatting('\n```\n', '\n```\n')}
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
                      placeholder="Explain your approach step by step...\n\nYou can use:\n**bold text**\n*italic text*\n`inline code`\n\n```\ncode blocks\n```"
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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Community Solutions ({solutions.length})
          </h3>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-sm">Sort by:</Label>
            <Select value={sortBy} onValueChange={(value: "upvotes" | "date") => setSortBy(value)}>
              <SelectTrigger className="w-32">
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
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={solution.author.avatar} />
                  <AvatarFallback>
                    {solution.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-medium">{solution.author.name}</span>
                    <Badge variant="outline">
                      {solution.author.reputation} rep
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(solution.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="prose prose-sm max-w-none mb-4">
                    <div 
                      className="whitespace-pre-wrap text-sm leading-relaxed"
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
                    <div className="mb-4">
                      <img
                        src={solution.imageUrl}
                        alt="Solution diagram"
                        style={{ width: solution.imageSize ? `${solution.imageSize}px` : '300px', height: 'auto' }}
                        className="rounded-lg border"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${solution.isUpvoted ? 'text-green-600 bg-green-50' : ''}`}
                        onClick={() => handleVote(solution.id, 'up')}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {solution.upvotes}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${solution.isDownvoted ? 'text-red-600 bg-red-50' : ''}`}
                        onClick={() => handleVote(solution.id, 'down')}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        {solution.downvotes}
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
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
