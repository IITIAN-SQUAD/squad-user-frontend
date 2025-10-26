"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  Share2, 
  Bookmark, 
  ArrowLeft, 
  MessageCircle, 
  TrendingUp,
  Tag,
  ChevronRight,
  ThumbsUp,
  Eye,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Send,
  MoreVertical,
  FileText,
  Headphones,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc,
  Flag,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    credentials: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  coverImage: string;
}

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  readTime: number;
  category: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const mockBlogPost: BlogPost = {
  id: '1',
  title: 'How to Crack JEE Advanced: A Complete Strategy Guide by IIT Toppers',
  content: `
# Introduction

Cracking JEE Advanced is one of the most challenging academic pursuits in India. With over 2.5 lakh students competing for just 17,000 seats across all IITs, the competition is fierce. However, with the right strategy, dedication, and guidance, you can join the ranks of successful IIT students.

## Understanding JEE Advanced

JEE Advanced is not just about solving problems; it's about thinking analytically, managing time effectively, and staying calm under pressure. The exam tests your conceptual understanding rather than rote learning.

### Key Characteristics:
- **Conceptual Depth**: Questions require deep understanding of fundamental concepts
- **Time Pressure**: 3 hours for each paper with complex multi-step problems
- **Negative Marking**: Incorrect answers can significantly impact your score
- **Unpredictable Pattern**: The exam pattern can vary from year to year

## Subject-wise Strategy

### Physics
Physics in JEE Advanced requires a strong foundation in concepts and mathematical skills.

**Key Topics to Focus:**
- Mechanics (25-30% weightage)
- Electromagnetism (20-25% weightage)
- Modern Physics (15-20% weightage)
- Thermodynamics (10-15% weightage)

**Preparation Tips:**
1. **Conceptual Clarity**: Start with NCERT and understand every concept thoroughly
2. **Problem Solving**: Practice numerical problems from HC Verma and IE Irodov
3. **Visualization**: Use diagrams and graphs to understand physical phenomena
4. **Formula Derivation**: Don't just memorize formulas; understand their derivations

### Chemistry
Chemistry can be your scoring subject if prepared systematically.

**Organic Chemistry:**
- Focus on reaction mechanisms rather than rote learning
- Practice name reactions and their applications
- Understand stereochemistry concepts thoroughly

**Inorganic Chemistry:**
- Create mind maps for periodic trends
- Focus on coordination compounds and metallurgy
- Practice qualitative analysis regularly

**Physical Chemistry:**
- Master numerical problems in thermodynamics and kinetics
- Understand equilibrium concepts deeply
- Practice electrochemistry calculations

### Mathematics
Mathematics requires consistent practice and pattern recognition.

**High-Weightage Topics:**
- Coordinate Geometry (20-25%)
- Calculus (25-30%)
- Algebra (20-25%)
- Trigonometry (15-20%)

**Preparation Strategy:**
1. **Concept Building**: Start with basic concepts and gradually move to advanced topics
2. **Problem Variety**: Solve problems of varying difficulty levels
3. **Speed and Accuracy**: Practice timed tests regularly
4. **Shortcut Techniques**: Learn time-saving methods for calculations

## Time Management Strategy

### Phase 1: Foundation Building (6-8 months)
- Complete NCERT thoroughly for all subjects
- Solve basic problems from standard textbooks
- Focus on concept clarity over speed

### Phase 2: Advanced Preparation (4-6 months)
- Solve previous year questions
- Take regular mock tests
- Identify and work on weak areas

### Phase 3: Final Revision (2-3 months)
- Revise important formulas and concepts
- Solve mock tests under exam conditions
- Focus on time management and accuracy

## Mock Test Strategy

Regular mock tests are crucial for JEE Advanced preparation:

1. **Frequency**: Take 2-3 mock tests per week
2. **Analysis**: Spend equal time analyzing mistakes as taking the test
3. **Time Management**: Practice completing papers within the time limit
4. **Stress Management**: Simulate exam conditions to build mental stamina

## Common Mistakes to Avoid

### During Preparation:
- **Over-reliance on coaching**: Develop self-study habits
- **Ignoring NCERT**: Don't skip basic concepts
- **Lack of revision**: Regular revision is more important than covering new topics
- **Comparing with others**: Focus on your own progress

### During Exam:
- **Rushing through questions**: Read questions carefully
- **Not managing time**: Allocate time for each section
- **Attempting all questions**: Skip difficult questions initially
- **Panic**: Stay calm and composed throughout the exam

## Mental Health and Motivation

Preparing for JEE Advanced can be mentally exhausting. Here's how to stay motivated:

1. **Set realistic goals**: Break down your preparation into smaller, achievable targets
2. **Take breaks**: Regular breaks prevent burnout
3. **Stay positive**: Maintain a positive mindset even during difficult times
4. **Seek support**: Don't hesitate to ask for help from teachers, friends, or family

## Success Stories from IIT Toppers

### Rahul Sharma (AIR 23, IIT Delhi)
*"The key to my success was consistent daily practice and never giving up on difficult topics. I made sure to solve at least 50 problems daily across all subjects."*

### Priya Patel (AIR 45, IIT Bombay)
*"Time management was crucial for me. I practiced solving papers in 2.5 hours instead of 3 hours to build speed and accuracy."*

## Final Tips for Success

1. **Stay Consistent**: Regular study is more effective than intensive cramming
2. **Focus on Weak Areas**: Spend more time on subjects/topics you find difficult
3. **Practice Regularly**: Solve problems daily to maintain problem-solving skills
4. **Stay Updated**: Keep track of any changes in exam pattern or syllabus
5. **Believe in Yourself**: Confidence plays a crucial role in exam performance

## Conclusion

Cracking JEE Advanced requires dedication, smart preparation, and the right mindset. Remember that success is not just about getting into an IIT; it's about developing problem-solving skills and analytical thinking that will serve you throughout your career.

Start your preparation early, stay consistent, and don't lose hope during difficult times. With the right approach and determination, you can achieve your dream of studying at an IIT.

*Good luck with your preparation!*
  `,
  author: {
    name: 'Rahul Sharma',
    avatar: '/avatars/rahul.jpg',
    bio: 'IIT Delhi Alumnus with expertise in competitive exam preparation. Has mentored over 1000 students to crack JEE Advanced.',
    credentials: 'B.Tech IIT Delhi, AIR 23 JEE Advanced'
  },
  publishedAt: '2024-01-15',
  readTime: 12,
  category: 'JEE Strategy',
  tags: ['JEE Advanced', 'Strategy', 'IIT', 'Preparation', 'Study Tips', 'Time Management'],
  views: 15420,
  likes: 892,
  comments: 156,
  coverImage: '/blog/jee-strategy.jpg'
};

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Arjun Patel',
      avatar: '/avatars/arjun.jpg'
    },
    content: 'This is exactly what I needed! The time management tips are really practical. I\'ve been struggling with balancing all three subjects, but this strategy makes sense.',
    timestamp: '2024-01-16T10:30:00Z',
    likes: 12,
    replies: [
      {
        id: '1-1',
        author: {
          name: 'Rahul Sharma',
          avatar: '/avatars/rahul.jpg'
        },
        content: 'Glad it helped! The key is consistency. Start with small daily targets and gradually increase.',
        timestamp: '2024-01-16T11:15:00Z',
        likes: 5
      }
    ]
  },
  {
    id: '2',
    author: {
      name: 'Sneha Gupta',
      avatar: '/avatars/sneha.jpg'
    },
    content: 'The mock test strategy section is gold! I never thought about analyzing mistakes for equal time as taking the test. Will definitely implement this.',
    timestamp: '2024-01-16T14:20:00Z',
    likes: 8
  },
  {
    id: '3',
    author: {
      name: 'Karan Singh',
      avatar: '/avatars/karan.jpg'
    },
    content: 'Can you write a detailed article on Physics problem-solving techniques? Your approach seems very systematic.',
    timestamp: '2024-01-16T16:45:00Z',
    likes: 15
  }
];

const relatedPosts: RelatedPost[] = [
  {
    id: '2',
    title: 'JEE Main vs JEE Advanced: Key Differences and Preparation Strategy',
    excerpt: 'Understand the fundamental differences between JEE Main and Advanced, and how to prepare for both effectively.',
    readTime: 8,
    category: 'JEE Strategy'
  },
  {
    id: '3',
    title: 'Mathematics Problem Solving: Advanced Techniques for Competitive Exams',
    excerpt: 'Master advanced mathematical techniques and shortcuts to solve complex problems quickly and accurately.',
    readTime: 15,
    category: 'Mathematics'
  },
  {
    id: '4',
    title: 'Physics Concepts Made Simple: Understanding Complex Topics',
    excerpt: 'Break down complex physics concepts into simple, understandable parts with practical examples.',
    readTime: 10,
    category: 'Physics'
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(mockBlogPost.likes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showComments, setShowComments] = useState(false); // Collapsed by default
  const [commentSort, setCommentSort] = useState<'recent' | 'likes'>('recent');
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportTarget, setReportTarget] = useState<'post' | 'comment'>('post');
  const [reportCommentId, setReportCommentId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockBlogPost.title,
          text: mockBlogPost.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause text-to-speech
      window.speechSynthesis.pause();
    } else {
      // Start text-to-speech
      const utterance = new SpeechSynthesisUtterance(mockBlogPost.content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = isMuted ? 0 : 1;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleReportPost = () => {
    setReportTarget('post');
    setReportCommentId(null);
    setShowReportDialog(true);
  };

  const handleReportComment = (commentId: string) => {
    setReportTarget('comment');
    setReportCommentId(commentId);
    setShowReportDialog(true);
  };

  const handleSubmitReport = () => {
    // Handle report submission
    console.log('Report submitted:', {
      target: reportTarget,
      commentId: reportCommentId,
      type: reportType,
      reason: reportReason
    });
    
    // Reset and close
    setShowReportDialog(false);
    setReportType('');
    setReportReason('');
    setReportTarget('post');
    setReportCommentId(null);
    
    // Show success message (you can add a toast notification here)
    alert('Report submitted successfully. We will review it shortly.');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User',
        avatar: '/avatars/user.jpg'
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: {
        name: 'Current User',
        avatar: '/avatars/user.jpg'
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));
    
    setReplyContent('');
    setReplyTo(null);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const generateSummary = () => {
    return [
      '🎯 **Key Strategy**: Focus on conceptual understanding over rote learning',
      '⏰ **Time Management**: Allocate 6-8 months for foundation, 4-6 months for advanced prep, 2-3 months for revision',
      '📚 **Subject Focus**: Physics (25-30%), Chemistry (balanced across all three branches), Mathematics (coordinate geometry & calculus)',
      '🧪 **Mock Tests**: Take 2-3 tests weekly, spend equal time analyzing mistakes',
      '💡 **Success Tips**: Stay consistent, focus on weak areas, maintain positive mindset',
      '🚫 **Avoid**: Over-reliance on coaching, ignoring NCERT, comparing with others'
    ];
  };

  const getSortedComments = () => {
    const sortedComments = [...comments];
    if (commentSort === 'likes') {
      return sortedComments.sort((a, b) => b.likes - a.likes);
    } else {
      return sortedComments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
  };

  // Convert markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactElement[] = [];
    let currentIndex = 0;

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold text-brand-navy mb-6 mt-8">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-brand-navy mb-4 mt-8">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-brand-navy mb-3 mt-6">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <h4 key={index} className="text-lg font-semibold text-gray-800 mb-2 mt-4">
            {line.substring(2, line.length - 2)}
          </h4>
        );
      } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        elements.push(
          <p key={index} className="text-gray-600 italic mb-4 pl-4 border-l-4 border-brand">
            {line.substring(1, line.length - 1)}
          </p>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="text-gray-700 mb-2 ml-6">
            {line.substring(2)}
          </li>
        );
      } else if (line.match(/^\d+\./)) {
        elements.push(
          <li key={index} className="text-gray-700 mb-2 ml-6 list-decimal">
            {line.substring(line.indexOf('.') + 2)}
          </li>
        );
      } else if (line.trim() === '') {
        // Skip empty lines
      } else {
        elements.push(
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/blog" className="hover:text-brand-navy transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand-navy font-medium">{mockBlogPost.category}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="mb-4">
            <Badge className="bg-brand text-brand-navy mb-4">
              {mockBlogPost.category}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6 leading-tight">
            {mockBlogPost.title}
          </h1>
          
          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockBlogPost.author.avatar} alt={mockBlogPost.author.name} />
                <AvatarFallback>{mockBlogPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-brand-navy">{mockBlogPost.author.name}</div>
                <div className="text-sm text-gray-600">{mockBlogPost.author.credentials}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(mockBlogPost.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {mockBlogPost.readTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {formatViews(mockBlogPost.views)} views
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-600"
                onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{comments.length}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="flex items-center space-x-2 text-gray-600 hover:text-brand-navy"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isPlaying ? 'Pause' : 'Listen'}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center space-x-2 text-gray-600 hover:text-brand-navy"
              >
                <FileText className="h-5 w-5" />
                <span>Summary</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              {isPlaying && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMute}
                  className={`${isMuted ? 'text-red-500' : 'text-gray-600'}`}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`${isBookmarked ? 'text-brand' : 'text-gray-600'}`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-600"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReportPost}
                className="text-gray-600 hover:text-red-600"
              >
                <Flag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

      {/* Article Summary */}
      {showSummary && (
        <Card className="mb-8 border-brand/20 bg-brand/5">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-navy">
              <FileText className="h-5 w-5 mr-2" />
              Article Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {generateSummary().map((point, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-brand-navy font-medium text-sm">{point.split(' ')[0]}</span>
                  <span className="text-gray-700 text-sm">{point.substring(point.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audio Player Info */}
      {isPlaying && (
        <Card className="mb-8 border-brand/20 bg-brand/5">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Headphones className="h-5 w-5 text-brand" />
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-navy">Audio Playback Active</p>
                <p className="text-xs text-gray-600">Article is being read aloud. Use controls to pause or adjust volume.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={handleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="aspect-video bg-gradient-to-br from-brand/20 to-brand-navy/20 rounded-2xl mb-12 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-brand-navy mx-auto mb-4" />
              <p className="text-brand-navy font-semibold">Featured Article Cover</p>
            </div>
          </div>
          
          {/* Medium-style article content */}
          <div className="article-content text-gray-800 leading-[1.8]" style={{
            fontSize: '20px',
            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            lineHeight: '32px',
            letterSpacing: '-0.003em'
          }}>
            {renderContent(mockBlogPost.content)}
          </div>
        </div>
        
        <style jsx global>{`
          .article-content h1 {
            font-size: 32px;
            line-height: 40px;
            font-weight: 700;
            margin-top: 48px;
            margin-bottom: 16px;
            color: #1a202c;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          
          .article-content h2 {
            font-size: 28px;
            line-height: 36px;
            font-weight: 700;
            margin-top: 40px;
            margin-bottom: 12px;
            color: #1a202c;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          
          .article-content h3 {
            font-size: 24px;
            line-height: 32px;
            font-weight: 600;
            margin-top: 32px;
            margin-bottom: 8px;
            color: #2d3748;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          
          .article-content p {
            margin-bottom: 24px;
            color: #374151;
          }
          
          .article-content ul, .article-content ol {
            margin-bottom: 24px;
            padding-left: 28px;
          }
          
          .article-content li {
            margin-bottom: 12px;
            padding-left: 8px;
          }
          
          .article-content strong {
            font-weight: 600;
            color: #1f2937;
          }
          
          .article-content a {
            color: #FFBF00;
            text-decoration: underline;
            text-decoration-color: rgba(255, 191, 0, 0.4);
            text-underline-offset: 2px;
          }
          
          .article-content a:hover {
            text-decoration-color: #FFBF00;
          }
          
          .article-content code {
            background-color: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 18px;
            font-family: "Monaco", "Courier New", monospace;
          }
          
          .article-content blockquote {
            border-left: 4px solid #FFBF00;
            padding-left: 20px;
            margin: 32px 0;
            font-style: italic;
            color: #4b5563;
          }
        `}</style>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockBlogPost.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="hover:bg-brand hover:text-brand-navy transition-colors cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockBlogPost.author.avatar} alt={mockBlogPost.author.name} />
              <AvatarFallback>{mockBlogPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-brand-navy mb-2">About {mockBlogPost.author.name}</h3>
              <p className="text-gray-600 mb-3">{mockBlogPost.author.bio}</p>
              <p className="text-sm text-gray-500">{mockBlogPost.author.credentials}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments-section" className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold text-brand-navy">Comments ({comments.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-gray-600 hover:text-brand-navy p-1"
              >
                {showComments ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Button
                  variant={commentSort === 'recent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCommentSort('recent')}
                  className={commentSort === 'recent' ? 'bg-brand text-brand-navy' : ''}
                >
                  <SortDesc className="h-4 w-4 mr-1" />
                  Recent
                </Button>
                <Button
                  variant={commentSort === 'likes' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCommentSort('likes')}
                  className={commentSort === 'likes' ? 'bg-brand text-brand-navy' : ''}
                >
                  <SortAsc className="h-4 w-4 mr-1" />
                  Most Liked
                </Button>
              </div>
          </div>
          
          {showComments && (
            <>
              {/* Add Comment Form */}
              <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleCommentSubmit}>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/user.jpg" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts about this article..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px] resize-none border-gray-200 focus:border-brand focus:ring-brand"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-500">Be respectful and constructive in your comments.</p>
                      <Button 
                        type="submit" 
                        disabled={!newComment.trim()}
                        className="bg-brand text-brand-navy hover:bg-brand/90"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
            {/* Comments List */}
            <div className="space-y-6">
              {getSortedComments().map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-brand-navy">{comment.author.name}</h4>
                        <span className="text-sm text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                            <Flag className="h-4 w-4 mr-2" />
                            Report Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                    
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-500 hover:text-brand"
                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                    
                    {/* Reply Form */}
                    {replyTo === comment.id && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/user.jpg" alt="You" />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder={`Reply to ${comment.author.name}...`}
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="min-h-[80px] resize-none text-sm"
                            />
                            <div className="flex items-center space-x-2 mt-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={!replyContent.trim()}
                                className="bg-brand text-brand-navy hover:bg-brand/90"
                              >
                                Reply
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => {
                                  setReplyTo(null);
                                  setReplyContent('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                              <AvatarFallback>{reply.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h5 className="font-medium text-brand-navy text-sm">{reply.author.name}</h5>
                                <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">{reply.content}</p>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand mt-1">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              ))}
            </div>
            
              {comments.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">No comments yet</h4>
                  <p className="text-gray-500">Be the first to share your thoughts about this article!</p>
                </div>
              )}
            </>
          )}
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video bg-gradient-to-br from-brand/10 to-brand-navy/10 relative">
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-brand-navy">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-navy mb-3 line-clamp-2 group-hover:text-brand transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.readTime} min read</span>
                      <span className="text-brand group-hover:translate-x-1 transition-transform">Read more →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/blog" className="inline-flex items-center text-brand-navy hover:text-brand transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to all articles
        </Link>
      </div>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Report {reportTarget === 'post' ? 'Article' : 'Comment'}
            </DialogTitle>
            <DialogDescription>
              Help us maintain a safe and respectful community. Please select the reason for reporting this {reportTarget}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label htmlFor="report-type" className="text-base font-semibold">
                Report Type *
              </Label>
              <RadioGroup value={reportType} onValueChange={setReportType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spam" id="spam" />
                  <Label htmlFor="spam" className="font-normal cursor-pointer">
                    Spam or misleading content
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate" className="font-normal cursor-pointer">
                    Inappropriate or offensive content
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="harassment" id="harassment" />
                  <Label htmlFor="harassment" className="font-normal cursor-pointer">
                    Harassment or bullying
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="misinformation" id="misinformation" />
                  <Label htmlFor="misinformation" className="font-normal cursor-pointer">
                    False or misleading information
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="copyright" id="copyright" />
                  <Label htmlFor="copyright" className="font-normal cursor-pointer">
                    Copyright violation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal cursor-pointer">
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-reason" className="text-base font-semibold">
                Additional Details (Optional)
              </Label>
              <Textarea
                id="report-reason"
                placeholder="Please provide any additional context that might help us understand the issue..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <p className="text-xs text-gray-500">
                Your report will be reviewed by our moderation team within 24 hours.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReportDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReport}
              disabled={!reportType}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Flag className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
