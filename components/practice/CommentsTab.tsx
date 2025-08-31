"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ThumbsUp, ThumbsDown, MessageCircle, Flag, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
    reputation: number
  }
  content: string
  createdAt: Date
  upvotes: number
  downvotes: number
  replies: Comment[]
  isUpvoted?: boolean
  isDownvoted?: boolean
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Rahul Sharma",
      reputation: 1250
    },
    content: "This is a classic kinematics problem. The key is to identify that we have constant acceleration and use the appropriate equation. Remember that acceleration is the rate of change of velocity.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    upvotes: 15,
    downvotes: 2,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Priya Singh",
          reputation: 890
        },
        content: "Thanks for the explanation! I was confused about which formula to use.",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        upvotes: 3,
        downvotes: 0,
        replies: []
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Amit Kumar",
      reputation: 2100
    },
    content: "Alternative approach: You can also solve this using v² = u² + 2as if you know the displacement. But since displacement is not given, the formula a = (v-u)/t is the most direct approach.",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    upvotes: 8,
    downvotes: 1,
    replies: []
  }
]

interface CommentsTabProps {
  questionId: string
}

export default function CommentsTab({ questionId }: CommentsTabProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [sortBy, setSortBy] = useState<"likes" | "recent">("likes")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        reputation: 500
      },
      content: newComment,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    }

    setComments(prev => [comment, ...prev])
    setNewComment("")
  }

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: {
        name: "Current User",
        reputation: 500
      },
      content: replyText,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    }

    setComments(prev => prev.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ))
    
    setReplyText("")
    setReplyingTo(null)
  }

  const handleVote = (commentId: string, type: 'up' | 'down') => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        if (type === 'up') {
          return {
            ...comment,
            upvotes: comment.isUpvoted ? comment.upvotes - 1 : comment.upvotes + 1,
            downvotes: comment.isDownvoted ? comment.downvotes - 1 : comment.downvotes,
            isUpvoted: !comment.isUpvoted,
            isDownvoted: false
          }
        } else {
          return {
            ...comment,
            downvotes: comment.isDownvoted ? comment.downvotes - 1 : comment.downvotes + 1,
            upvotes: comment.isUpvoted ? comment.upvotes - 1 : comment.upvotes,
            isDownvoted: !comment.isDownvoted,
            isUpvoted: false
          }
        }
      }
      return comment
    }))
  }

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 mt-2' : 'mb-4'}`}>
      <div className={`border-l-2 ${isReply ? 'border-gray-200 pl-4' : 'border-transparent'} ${!isReply ? 'border-b border-gray-100 pb-4' : ''}`}>
        <div className="flex gap-3">
          {/* Voting Column */}
          <div className="flex flex-col items-center gap-1 pt-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 ${comment.isUpvoted ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-orange-500'}`}
              onClick={() => handleVote(comment.id, 'up')}
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <span className={`text-xs font-medium ${comment.upvotes - comment.downvotes > 0 ? 'text-orange-500' : comment.upvotes - comment.downvotes < 0 ? 'text-blue-500' : 'text-gray-500'}`}>
              {comment.upvotes - comment.downvotes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 ${comment.isDownvoted ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-blue-500'}`}
              onClick={() => handleVote(comment.id, 'down')}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>

          {/* Content Column */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback className="text-xs">
                  {comment.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm text-gray-900">{comment.author.name}</span>
              <span className="text-xs text-gray-500">{comment.author.reputation} rep</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
            </div>
            
            <div className="text-sm text-gray-800 mb-3 leading-relaxed">
              {comment.content}
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
              >
                <Flag className="h-3 w-3 mr-1" />
                Report
              </Button>
            </div>
            
            {replyingTo === comment.id && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <Textarea
                  placeholder="What are your thoughts?"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="mb-3 min-h-[80px] text-sm"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleAddReply(comment.id)}
                    disabled={!replyText.trim()}
                    className="h-7 text-xs"
                  >
                    Comment
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
          </div>
        </div>
      </div>
      
      {comment.replies.map(reply => (
        <CommentComponent key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  )

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "likes") {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
    } else {
      return b.createdAt.getTime() - a.createdAt.getTime()
    }
  })

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Comments ({comments.length})
        </h3>
        
        <Select value={sortBy} onValueChange={(value: "likes" | "recent") => setSortBy(value)}>
          <SelectTrigger className="w-36 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="likes">Most Liked</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add Comment */}
      <div className="mb-6 p-4 bg-white border rounded-lg">
        <Textarea
          placeholder="What are your thoughts?"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px] border-gray-200 text-sm"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleAddComment} 
            disabled={!newComment.trim()}
            size="sm"
            className="h-8"
          >
            Comment
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-0">
        {sortedComments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No comments yet</p>
            <p className="text-sm">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  )
}
