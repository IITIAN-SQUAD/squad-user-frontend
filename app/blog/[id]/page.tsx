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
  AlertTriangle,
  Brain,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Loader2,
  X as CloseIcon
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
  },
  {
    id: '4',
    author: {
      name: 'Priya Sharma',
      avatar: '/avatars/priya.jpg'
    },
    content: 'The subject-wise strategy is really helpful. I was focusing too much on my strong subjects. This balanced approach makes more sense.',
    timestamp: '2024-01-17T09:30:00Z',
    likes: 7
  },
  {
    id: '5',
    author: {
      name: 'Amit Kumar',
      avatar: '/avatars/amit.jpg'
    },
    content: 'Great article! The section on dealing with exam pressure is what I needed. Mental preparation is as important as academic preparation.',
    timestamp: '2024-01-17T11:00:00Z',
    likes: 10
  },
  {
    id: '6',
    author: {
      name: 'Neha Reddy',
      avatar: '/avatars/neha.jpg'
    },
    content: 'This is my third time reading this article. Each time I find something new to implement. Thank you for sharing your experience!',
    timestamp: '2024-01-17T14:20:00Z',
    likes: 18
  },
  {
    id: '7',
    author: {
      name: 'Vikram Joshi',
      avatar: '/avatars/vikram.jpg'
    },
    content: 'The revision strategy in the last month is spot on. I followed similar approach and it worked wonders for me.',
    timestamp: '2024-01-17T16:45:00Z',
    likes: 9
  },
  {
    id: '8',
    author: {
      name: 'Anjali Verma',
      avatar: '/avatars/anjali.jpg'
    },
    content: 'Could you please elaborate more on the negative marking strategy? How do we decide when to attempt and when to skip?',
    timestamp: '2024-01-18T08:15:00Z',
    likes: 14
  },
  {
    id: '9',
    author: {
      name: 'Rohan Mehta',
      avatar: '/avatars/rohan.jpg'
    },
    content: 'Excellent breakdown of the preparation timeline. The 2-year plan is very detailed and practical.',
    timestamp: '2024-01-18T10:30:00Z',
    likes: 6
  },
  {
    id: '10',
    author: {
      name: 'Divya Nair',
      avatar: '/avatars/divya.jpg'
    },
    content: 'This article should be pinned! Every JEE aspirant should read this. Sharing with my study group.',
    timestamp: '2024-01-18T13:00:00Z',
    likes: 22
  },
  {
    id: '11',
    author: {
      name: 'Siddharth Rao',
      avatar: '/avatars/siddharth.jpg'
    },
    content: 'The importance of NCERT is often underestimated. Thanks for highlighting it. Going back to basics now!',
    timestamp: '2024-01-18T15:45:00Z',
    likes: 11
  },
  {
    id: '12',
    author: {
      name: 'Kavya Iyer',
      avatar: '/avatars/kavya.jpg'
    },
    content: 'Love the practical examples and real experiences shared. Makes the strategy more relatable and achievable.',
    timestamp: '2024-01-19T09:00:00Z',
    likes: 8
  },
  {
    id: '13',
    author: {
      name: 'Aditya Desai',
      avatar: '/avatars/aditya.jpg'
    },
    content: 'The chapter-wise weightage analysis is very useful. Will prioritize my preparation accordingly. Thank you!',
    timestamp: '2024-01-19T11:30:00Z',
    likes: 13
  },
  {
    id: '14',
    author: {
      name: 'Riya Kapoor',
      avatar: '/avatars/riya.jpg'
    },
    content: 'Finally, an article that talks about work-life balance during preparation. Mental health matters!',
    timestamp: '2024-01-19T14:15:00Z',
    likes: 16
  },
  {
    id: '15',
    author: {
      name: 'Harsh Agarwal',
      avatar: '/avatars/harsh.jpg'
    },
    content: 'The problem-solving approach section is brilliant. Will start implementing from today. Fingers crossed!',
    timestamp: '2024-01-19T16:00:00Z',
    likes: 9
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
  const [commentsPage, setCommentsPage] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  
  const COMMENTS_PER_PAGE = 10;

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

  const getPaginatedComments = () => {
    const sorted = getSortedComments();
    const startIndex = (commentsPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    return sorted.slice(startIndex, endIndex);
  };

  const totalCommentPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  // Quiz data based on article content
  const articleQuiz = [
    {
      question: "What is the most important factor in cracking JEE Advanced according to the article?",
      options: [
        "Rote learning",
        "Analytical thinking and conceptual understanding",
        "Solving maximum number of problems",
        "Studying 18 hours daily"
      ],
      correctAnswer: 1
    },
    {
      question: "How many hours are allocated for each JEE Advanced paper?",
      options: ["2 hours", "2.5 hours", "3 hours", "4 hours"],
      correctAnswer: 2
    },
    {
      question: "What is mentioned as a key characteristic of JEE Advanced?",
      options: [
        "Fixed pattern every year",
        "No negative marking",
        "Unpredictable pattern",
        "Easy questions"
      ],
      correctAnswer: 2
    },
    {
      question: "According to the article, what should be the focus while preparing?",
      options: [
        "Memorizing formulas",
        "Deep understanding of fundamental concepts",
        "Speed solving",
        "Guessing techniques"
      ],
      correctAnswer: 1
    }
  ];

  // Initialize quiz with default questions
  const initializeQuiz = () => {
    setQuizQuestions(articleQuiz);
    setShowQuiz(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Generate more questions using LLM (simulated)
  const generateMoreQuestions = async () => {
    setIsGeneratingQuestions(true);
    
    // If quiz was submitted, reset to continue with new questions
    if (quizSubmitted) {
      setQuizSubmitted(false);
    }
    
    // Simulate API call to LLM
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get the current question count to generate unique questions
    const currentCount = quizQuestions.length;
    
    // Mock generated questions (in real implementation, these would be from LLM)
    const questionBank = [
      {
        question: "What is the recommended approach for solving numerical problems in JEE Advanced?",
        options: [
          "Skip all numerical questions",
          "Guess the answer quickly",
          "Practice dimensional analysis and approximation techniques",
          "Only attempt if 100% sure"
        ],
        correctAnswer: 2
      },
      {
        question: "How should you prioritize chapters during revision?",
        options: [
          "Focus only on easy chapters",
          "Based on weightage and personal weakness",
          "Study in alphabetical order",
          "Skip difficult chapters"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the ideal time to start JEE Advanced preparation?",
        options: [
          "One month before exam",
          "After JEE Main results",
          "Class 11 onwards with consistent effort",
          "Only in Class 12"
        ],
        correctAnswer: 2
      },
      {
        question: "Which resource is emphasized as most important for conceptual clarity?",
        options: [
          "Coaching material only",
          "NCERT textbooks",
          "YouTube videos",
          "Previous year papers only"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the recommended strategy for attempting the exam?",
        options: [
          "Attempt all questions quickly",
          "Start with difficult questions",
          "Solve easy questions first, then moderate, then difficult",
          "Random order"
        ],
        correctAnswer: 2
      },
      {
        question: "How important is solving previous year papers?",
        options: [
          "Not important at all",
          "Only solve in the last week",
          "Extremely important for understanding exam pattern",
          "Optional if you know concepts"
        ],
        correctAnswer: 2
      },
      {
        question: "What should be the approach for weak topics?",
        options: [
          "Skip them completely",
          "Focus extra time and practice more problems",
          "Only read theory once",
          "Memorize formulas only"
        ],
        correctAnswer: 1
      },
      {
        question: "How to handle exam day stress?",
        options: [
          "Panic and rush through questions",
          "Skip breakfast and arrive early",
          "Stay calm, follow your strategy, and manage time",
          "Attempt all questions randomly"
        ],
        correctAnswer: 2
      },
      {
        question: "What is the role of coaching in JEE preparation?",
        options: [
          "Completely unnecessary",
          "Guidance and structured approach, but self-study is crucial",
          "Only coaching is enough",
          "Only for weak students"
        ],
        correctAnswer: 1
      },
      {
        question: "How to maintain consistency in preparation?",
        options: [
          "Study only when motivated",
          "Set daily targets and follow a routine",
          "Study 24 hours before exam",
          "No need for consistency"
        ],
        correctAnswer: 1
      }
    ];
    
    // Select next 5 questions from the bank (cycling through)
    const startIndex = (currentCount - 4) % questionBank.length;
    const newQuestions = [];
    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % questionBank.length;
      newQuestions.push(questionBank[index]);
    }
    
    setQuizQuestions(prev => [...prev, ...newQuestions]);
    setIsGeneratingQuestions(false);
  };

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex.toString()
    }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleCancelQuiz = () => {
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizQuestions([]);
  };

  const getQuizScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correctAnswer.toString()) {
        correct++;
      }
    });
    return correct;
  };

  const getAnsweredCount = () => {
    return Object.keys(quizAnswers).length;
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
              {getPaginatedComments().map((comment) => (
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
            
            {/* Comments Pagination */}
            {comments.length > 0 && totalCommentPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCommentsPage(prev => Math.max(prev - 1, 1))}
                  disabled={commentsPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalCommentPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={commentsPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCommentsPage(page)}
                      className={commentsPage === page ? "bg-brand text-brand-navy hover:bg-brand/90" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCommentsPage(prev => Math.min(prev + 1, totalCommentPages))}
                  disabled={commentsPage === totalCommentPages}
                >
                  Next
                </Button>
              </div>
            )}
            
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

      {/* Knowledge Quiz Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-2 border-brand/20 bg-gradient-to-br from-brand/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand rounded-lg">
                  <Brain className="h-6 w-6 text-brand-navy" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-brand-navy">Test Your Understanding</CardTitle>
                  <p className="text-gray-600 mt-1">Quick quiz based on this article</p>
                </div>
              </div>
              {!showQuiz && (
                <Button 
                  onClick={initializeQuiz}
                  className="bg-brand text-brand-navy hover:bg-brand/90"
                >
                  Start Quiz
                </Button>
              )}
              {showQuiz && !quizSubmitted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelQuiz}
                  className="text-gray-600 hover:text-red-600"
                >
                  <CloseIcon className="h-4 w-4 mr-1" />
                  Cancel Quiz
                </Button>
              )}
            </div>
          </CardHeader>
          
          {showQuiz && (
            <CardContent className="space-y-6">
              {!quizSubmitted ? (
                <>
                  {/* Quiz Progress */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-brand/20">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-brand" />
                        <span className="font-semibold text-brand-navy">
                          Questions: {quizQuestions.length}
                        </span>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          Answered: {getAnsweredCount()}/{quizQuestions.length}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={generateMoreQuestions}
                      disabled={isGeneratingQuestions}
                      variant="outline"
                      size="sm"
                      className="border-brand text-brand-navy hover:bg-brand/10"
                    >
                      {isGeneratingQuestions ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate 5 More
                        </>
                      )}
                    </Button>
                  </div>

                  {quizQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-white p-6 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-brand-navy mb-4">
                        {qIndex + 1}. {q.question}
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => handleQuizAnswer(qIndex, oIndex)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              quizAnswers[qIndex] === oIndex.toString()
                                ? 'border-brand bg-brand/10 text-brand-navy font-medium'
                                : 'border-gray-200 hover:border-brand/50 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                quizAnswers[qIndex] === oIndex.toString()
                                  ? 'border-brand bg-brand'
                                  : 'border-gray-300'
                              }`}>
                                {quizAnswers[qIndex] === oIndex.toString() && (
                                  <div className="w-2 h-2 rounded-full bg-brand-navy" />
                                )}
                              </div>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex flex-col items-center gap-3 pt-4">
                    {getAnsweredCount() < quizQuestions.length && (
                      <p className="text-sm text-gray-600">
                        Please answer all {quizQuestions.length} questions to submit
                      </p>
                    )}
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={getAnsweredCount() < quizQuestions.length}
                      className="bg-brand text-brand-navy hover:bg-brand/90 px-8"
                      size="lg"
                    >
                      Submit Quiz ({getAnsweredCount()}/{quizQuestions.length})
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand/20 mb-4">
                    <Award className="h-10 w-10 text-brand" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-2">
                    Quiz Completed!
                  </h3>
                  <p className="text-xl text-gray-700 mb-6">
                    You scored <span className="font-bold text-brand">{getQuizScore()}</span> out of <span className="font-bold">{quizQuestions.length}</span>
                  </p>
                  
                  {/* Show answers */}
                  <div className="space-y-4 mt-8 text-left">
                    {quizQuestions.map((q, qIndex) => {
                      const userAnswer = parseInt(quizAnswers[qIndex] || '-1');
                      const isCorrect = userAnswer === q.correctAnswer;
                      
                      return (
                        <div key={qIndex} className="bg-white p-6 rounded-lg border-2 border-gray-200">
                          <div className="flex items-start gap-3 mb-3">
                            {isCorrect ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold text-brand-navy mb-3">
                                {qIndex + 1}. {q.question}
                              </h4>
                              <div className="space-y-2">
                                {q.options.map((option, oIndex) => {
                                  const isUserAnswer = userAnswer === oIndex;
                                  const isCorrectAnswer = q.correctAnswer === oIndex;
                                  
                                  return (
                                    <div
                                      key={oIndex}
                                      className={`p-3 rounded-lg border-2 ${
                                        isCorrectAnswer
                                          ? 'border-green-500 bg-green-50'
                                          : isUserAnswer
                                          ? 'border-red-500 bg-red-50'
                                          : 'border-gray-200'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        {isCorrectAnswer && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                                        {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-red-600" />}
                                        <span className={isCorrectAnswer ? 'font-medium text-green-900' : ''}>{option}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button
                      onClick={generateMoreQuestions}
                      disabled={isGeneratingQuestions}
                      variant="outline"
                      className="border-brand text-brand-navy hover:bg-brand/10"
                    >
                      {isGeneratingQuestions ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate 5 More Questions
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                      variant="outline"
                      className="border-brand text-brand-navy hover:bg-brand/10"
                    >
                      Retake Quiz
                    </Button>
                    <Button
                      onClick={() => setShowQuiz(false)}
                      className="bg-brand text-brand-navy hover:bg-brand/90"
                    >
                      Close Quiz
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </section>

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
