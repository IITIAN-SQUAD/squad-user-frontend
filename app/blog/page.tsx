"use client";

import Link from 'next/link';
import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, TrendingUp, Star, Filter, ChevronLeft, ChevronRight, Play, Volume2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ComingSoon from '@/components/ui/ComingSoon';
import { isFeatureEnabled } from '@/lib/features';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  coverImage: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Crack JEE Advanced: A Complete Strategy Guide by IIT Toppers',
    excerpt: 'Discover the proven strategies and techniques used by IIT toppers to crack JEE Advanced. Learn about time management, subject-wise preparation, and common mistakes to avoid.',
    content: '',
    author: {
      name: 'Rahul Sharma',
      avatar: '/avatars/rahul.jpg',
      bio: 'IIT Delhi Alumnus, AIR 23 JEE Advanced'
    },
    publishedAt: '2024-01-15',
    readTime: 12,
    category: 'JEE Strategy',
    tags: ['JEE Advanced', 'Strategy', 'IIT', 'Preparation'],
    featured: true,
    views: 15420,
    likes: 892,
    coverImage: '/blog/jee-strategy.jpg'
  },
  {
    id: '2',
    title: 'NEET 2024: Biology Preparation Tips from Medical College Toppers',
    excerpt: 'Master NEET Biology with expert tips from medical college toppers. Learn effective memorization techniques, important topics, and revision strategies.',
    content: '',
    author: {
      name: 'Dr. Priya Patel',
      avatar: '/avatars/priya.jpg',
      bio: 'AIIMS Delhi, NEET AIR 15'
    },
    publishedAt: '2024-01-12',
    readTime: 8,
    category: 'NEET Strategy',
    tags: ['NEET', 'Biology', 'Medical', 'Tips'],
    featured: true,
    views: 12350,
    likes: 654,
    coverImage: '/blog/neet-biology.jpg'
  },
  {
    id: '3',
    title: 'Mathematics Problem Solving: Advanced Techniques for Competitive Exams',
    excerpt: 'Enhance your mathematical problem-solving skills with advanced techniques. Learn shortcuts, pattern recognition, and efficient calculation methods.',
    content: '',
    author: {
      name: 'Amit Kumar',
      avatar: '/avatars/amit.jpg',
      bio: 'IIT Bombay, Mathematics Olympiad Gold Medalist'
    },
    publishedAt: '2024-01-10',
    readTime: 15,
    category: 'Mathematics',
    tags: ['Mathematics', 'Problem Solving', 'Techniques', 'Competitive Exams'],
    featured: false,
    views: 8920,
    likes: 423,
    coverImage: '/blog/math-techniques.jpg'
  },
  {
    id: '4',
    title: 'Physics Concepts Made Simple: Understanding Complex Topics',
    excerpt: 'Break down complex physics concepts into simple, understandable parts. Learn visualization techniques and practical applications.',
    content: '',
    author: {
      name: 'Sneha Gupta',
      avatar: '/avatars/sneha.jpg',
      bio: 'IIT Kanpur, Physics Research Scholar'
    },
    publishedAt: '2024-01-08',
    readTime: 10,
    category: 'Physics',
    tags: ['Physics', 'Concepts', 'Learning', 'Visualization'],
    featured: false,
    views: 7650,
    likes: 312,
    coverImage: '/blog/physics-concepts.jpg'
  },
  {
    id: '5',
    title: 'Chemistry Organic Reactions: Master the Mechanisms',
    excerpt: 'Understand organic chemistry reactions through mechanism-based learning. Discover patterns and shortcuts for faster problem solving.',
    content: '',
    author: {
      name: 'Vikash Singh',
      avatar: '/avatars/vikash.jpg',
      bio: 'IIT Kharagpur, Organic Chemistry Expert'
    },
    publishedAt: '2024-01-05',
    readTime: 11,
    category: 'Chemistry',
    tags: ['Chemistry', 'Organic', 'Reactions', 'Mechanisms'],
    featured: false,
    views: 6890,
    likes: 287,
    coverImage: '/blog/organic-chemistry.jpg'
  },
  {
    id: '6',
    title: 'Time Management Secrets: How to Study 12 Hours Effectively',
    excerpt: 'Learn proven time management techniques to maximize your study efficiency. Create sustainable study schedules and maintain peak performance.',
    content: '',
    author: {
      name: 'Ananya Sharma',
      avatar: '/avatars/ananya.jpg',
      bio: 'IIT Madras, Productivity Coach'
    },
    publishedAt: '2024-01-03',
    readTime: 7,
    category: 'Study Tips',
    tags: ['Time Management', 'Productivity', 'Study Tips', 'Efficiency'],
    featured: true,
    views: 11200,
    likes: 567,
    coverImage: '/blog/time-management.jpg'
  },
  {
    id: '7',
    title: 'JEE Main 2024: Last Month Revision Strategy',
    excerpt: 'Expert tips for the final month before JEE Main. Focus areas, revision techniques, and mock test strategies to maximize your score.',
    content: '',
    author: {
      name: 'Rajesh Kumar',
      avatar: '/avatars/rajesh.jpg',
      bio: 'IIT Roorkee, JEE Mentor'
    },
    publishedAt: '2024-01-20',
    readTime: 9,
    category: 'JEE Strategy',
    tags: ['JEE Main', 'Revision', 'Last Month', 'Strategy'],
    featured: true,
    views: 13500,
    likes: 720,
    coverImage: '/blog/jee-revision.jpg'
  },
  {
    id: '8',
    title: 'NEET Physics: Common Mistakes and How to Avoid Them',
    excerpt: 'Identify and eliminate common mistakes in NEET Physics. Learn from toppers about calculation errors, concept gaps, and time management.',
    content: '',
    author: {
      name: 'Dr. Meera Singh',
      avatar: '/avatars/meera.jpg',
      bio: 'JIPMER, Physics Expert'
    },
    publishedAt: '2024-01-18',
    readTime: 10,
    category: 'NEET Strategy',
    tags: ['NEET', 'Physics', 'Mistakes', 'Tips'],
    featured: true,
    views: 9800,
    likes: 445,
    coverImage: '/blog/neet-physics.jpg'
  },
  {
    id: '9',
    title: 'Calculus Mastery: From Basics to Advanced',
    excerpt: 'Complete guide to mastering calculus for JEE. Limits, derivatives, integration, and differential equations explained with examples.',
    content: '',
    author: {
      name: 'Prof. Arun Verma',
      avatar: '/avatars/arun.jpg',
      bio: 'IIT Delhi, Mathematics Professor'
    },
    publishedAt: '2024-01-16',
    readTime: 18,
    category: 'Mathematics',
    tags: ['Calculus', 'Mathematics', 'JEE', 'Advanced'],
    featured: false,
    views: 7200,
    likes: 380,
    coverImage: '/blog/calculus.jpg'
  },
  {
    id: '10',
    title: 'Chemistry Inorganic: Periodic Table Trends Simplified',
    excerpt: 'Master periodic table trends and inorganic chemistry concepts. Visual learning techniques and memory tricks for better retention.',
    content: '',
    author: {
      name: 'Kavita Reddy',
      avatar: '/avatars/kavita.jpg',
      bio: 'IIT Hyderabad, Chemistry Researcher'
    },
    publishedAt: '2024-01-14',
    readTime: 12,
    category: 'Chemistry',
    tags: ['Inorganic', 'Periodic Table', 'Chemistry', 'Trends'],
    featured: false,
    views: 6500,
    likes: 295,
    coverImage: '/blog/inorganic.jpg'
  },
  {
    id: '11',
    title: 'Study Motivation: Staying Consistent for 2 Years',
    excerpt: 'Psychological strategies to maintain motivation throughout your JEE/NEET preparation journey. Deal with burnout and stay focused.',
    content: '',
    author: {
      name: 'Dr. Sanjay Mehta',
      avatar: '/avatars/sanjay.jpg',
      bio: 'Educational Psychologist'
    },
    publishedAt: '2024-01-11',
    readTime: 8,
    category: 'Study Tips',
    tags: ['Motivation', 'Psychology', 'Consistency', 'Mental Health'],
    featured: false,
    views: 10500,
    likes: 612,
    coverImage: '/blog/motivation.jpg'
  },
  {
    id: '12',
    title: 'Physics Mechanics: Problem-Solving Approach',
    excerpt: 'Step-by-step approach to solving mechanics problems. Free body diagrams, equations of motion, and energy conservation principles.',
    content: '',
    author: {
      name: 'Arjun Nair',
      avatar: '/avatars/arjun.jpg',
      bio: 'IIT Bombay, Mechanical Engineering'
    },
    publishedAt: '2024-01-09',
    readTime: 14,
    category: 'Physics',
    tags: ['Mechanics', 'Physics', 'Problem Solving', 'JEE'],
    featured: false,
    views: 8100,
    likes: 390,
    coverImage: '/blog/mechanics.jpg'
  },
  {
    id: '13',
    title: 'NEET Biology: High-Yield Topics for 2024',
    excerpt: 'Focus on high-yield biology topics that frequently appear in NEET. Chapter-wise weightage analysis and preparation strategy.',
    content: '',
    author: {
      name: 'Dr. Neha Kapoor',
      avatar: '/avatars/neha.jpg',
      bio: 'AIIMS Delhi, Biology Faculty'
    },
    publishedAt: '2024-01-07',
    readTime: 11,
    category: 'NEET Strategy',
    tags: ['NEET', 'Biology', 'High Yield', 'Strategy'],
    featured: false,
    views: 9200,
    likes: 478,
    coverImage: '/blog/biology-topics.jpg'
  },
  {
    id: '14',
    title: 'Mathematics Coordinate Geometry: Complete Guide',
    excerpt: 'Master coordinate geometry with comprehensive coverage of straight lines, circles, parabola, ellipse, and hyperbola.',
    content: '',
    author: {
      name: 'Suresh Iyer',
      avatar: '/avatars/suresh.jpg',
      bio: 'IIT Madras, Mathematics Expert'
    },
    publishedAt: '2024-01-06',
    readTime: 16,
    category: 'Mathematics',
    tags: ['Coordinate Geometry', 'Mathematics', 'JEE', 'Conic Sections'],
    featured: false,
    views: 7800,
    likes: 365,
    coverImage: '/blog/coordinate-geometry.jpg'
  },
  {
    id: '15',
    title: 'Chemistry Physical: Thermodynamics Made Easy',
    excerpt: 'Understand thermodynamics concepts with real-world examples. Laws, processes, and numerical problem-solving techniques.',
    content: '',
    author: {
      name: 'Pooja Desai',
      avatar: '/avatars/pooja.jpg',
      bio: 'IIT Kanpur, Physical Chemistry'
    },
    publishedAt: '2024-01-04',
    readTime: 13,
    category: 'Chemistry',
    tags: ['Thermodynamics', 'Physical Chemistry', 'JEE', 'Concepts'],
    featured: false,
    views: 6200,
    likes: 278,
    coverImage: '/blog/thermodynamics.jpg'
  },
  {
    id: '16',
    title: 'Exam Day Strategy: What to Do and What to Avoid',
    excerpt: 'Complete guide for exam day preparation. From morning routine to paper-solving strategy, learn what works best.',
    content: '',
    author: {
      name: 'Ravi Shankar',
      avatar: '/avatars/ravi.jpg',
      bio: 'IIT Delhi, Career Counselor'
    },
    publishedAt: '2024-01-02',
    readTime: 6,
    category: 'Study Tips',
    tags: ['Exam Day', 'Strategy', 'Tips', 'Preparation'],
    featured: false,
    views: 12800,
    likes: 695,
    coverImage: '/blog/exam-day.jpg'
  },
  {
    id: '17',
    title: 'JEE Advanced Mathematics: Tough Problems Decoded',
    excerpt: 'Learn to tackle the toughest JEE Advanced mathematics problems. Pattern recognition and advanced problem-solving techniques.',
    content: '',
    author: {
      name: 'Karthik Subramanian',
      avatar: '/avatars/karthik.jpg',
      bio: 'IIT Bombay, AIR 12 JEE Advanced'
    },
    publishedAt: '2024-01-01',
    readTime: 20,
    category: 'Mathematics',
    tags: ['JEE Advanced', 'Mathematics', 'Tough Problems', 'Solutions'],
    featured: false,
    views: 9500,
    likes: 512,
    coverImage: '/blog/tough-math.jpg'
  },
  {
    id: '18',
    title: 'NEET Chemistry: Organic Reactions Flowchart',
    excerpt: 'Visual flowcharts for all important organic reactions. Quick revision tool for NEET chemistry preparation.',
    content: '',
    author: {
      name: 'Dr. Anjali Rao',
      avatar: '/avatars/anjali.jpg',
      bio: 'CMC Vellore, Organic Chemistry'
    },
    publishedAt: '2023-12-30',
    readTime: 9,
    category: 'Chemistry',
    tags: ['NEET', 'Organic Chemistry', 'Flowchart', 'Revision'],
    featured: false,
    views: 8700,
    likes: 425,
    coverImage: '/blog/organic-flowchart.jpg'
  },
  {
    id: '19',
    title: 'Physics Electromagnetism: Concept Building',
    excerpt: 'Build strong foundation in electromagnetism. From basic concepts to advanced applications with solved examples.',
    content: '',
    author: {
      name: 'Deepak Sharma',
      avatar: '/avatars/deepak.jpg',
      bio: 'IIT Roorkee, Physics Faculty'
    },
    publishedAt: '2023-12-28',
    readTime: 15,
    category: 'Physics',
    tags: ['Electromagnetism', 'Physics', 'Concepts', 'JEE'],
    featured: false,
    views: 7400,
    likes: 348,
    coverImage: '/blog/electromagnetism.jpg'
  },
  {
    id: '20',
    title: 'Mock Test Analysis: How to Learn from Mistakes',
    excerpt: 'Effective mock test analysis techniques. Identify patterns in mistakes and create targeted improvement plans.',
    content: '',
    author: {
      name: 'Priyanka Joshi',
      avatar: '/avatars/priyanka.jpg',
      bio: 'IIT Kharagpur, Test Prep Expert'
    },
    publishedAt: '2023-12-26',
    readTime: 10,
    category: 'Study Tips',
    tags: ['Mock Tests', 'Analysis', 'Improvement', 'Strategy'],
    featured: false,
    views: 11500,
    likes: 638,
    coverImage: '/blog/mock-analysis.jpg'
  },
  {
    id: '21',
    title: 'JEE Chemistry: Important Name Reactions',
    excerpt: 'Complete list of important name reactions for JEE. Mechanisms, conditions, and applications explained clearly.',
    content: '',
    author: {
      name: 'Vivek Agarwal',
      avatar: '/avatars/vivek.jpg',
      bio: 'IIT Delhi, Organic Chemistry Expert'
    },
    publishedAt: '2023-12-24',
    readTime: 14,
    category: 'Chemistry',
    tags: ['Name Reactions', 'JEE', 'Chemistry', 'Organic'],
    featured: false,
    views: 6900,
    likes: 315,
    coverImage: '/blog/name-reactions.jpg'
  }
];

const categories = ['All', 'JEE Strategy', 'NEET Strategy', 'Mathematics', 'Physics', 'Chemistry', 'Study Tips'];

const topBlogs = [
  { id: '1', title: 'How to Crack JEE Advanced: Complete Guide', views: 15420, category: 'JEE Strategy' },
  { id: '6', title: 'Time Management Secrets for 12-Hour Study', views: 11200, category: 'Study Tips' },
  { id: '2', title: 'NEET Biology Preparation Tips', views: 12350, category: 'NEET Strategy' },
  { id: '3', title: 'Advanced Mathematics Techniques', views: 8920, category: 'Mathematics' },
  { id: '4', title: 'Physics Concepts Made Simple', views: 7650, category: 'Physics' }
];

const POSTS_PER_PAGE = 10;

export default function BlogPage() {
  if (!isFeatureEnabled('blog')) {
    return (
      <ComingSoon 
        variant="page"
        title="Blog Coming Soon"
        message="We're preparing insightful articles, exam strategies, study tips, and success stories from top performers. Our blog will be your go-to resource for exam preparation guidance!"
      />
    );
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(mockBlogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'mostLiked' | 'mostCommented' | 'mostViewed'>('latest');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterPosts(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterPosts(searchQuery, category);
  };

  const filterPosts = (query: string, category: string) => {
    let filtered = mockBlogPosts;

    if (category !== 'All') {
      filtered = filtered.filter(post => post.category === category);
    }

    if (query) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleNextFeatured = () => {
    const featuredPosts = filteredPosts.filter(post => post.featured);
    setFeaturedIndex(prev => (prev + 2 >= featuredPosts.length ? 0 : prev + 2));
  };

  const handlePrevFeatured = () => {
    const featuredPosts = filteredPosts.filter(post => post.featured);
    setFeaturedIndex(prev => (prev - 2 < 0 ? Math.max(0, featuredPosts.length - 2) : prev - 2));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
    // Show success message
  };

  const featuredPosts = filteredPosts.filter(post => post.featured);
  let regularPosts = filteredPosts.filter(post => !post.featured);
  
  // Sort posts based on selected filter
  regularPosts = [...regularPosts].sort((a, b) => {
    switch (sortBy) {
      case 'mostLiked':
        return b.likes - a.likes;
      case 'mostCommented':
        return 0; // Will implement when comments are added
      case 'mostViewed':
        return b.views - a.views;
      case 'latest':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });
  
  // Pagination logic
  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = regularPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  
  const displayedFeaturedPosts = featuredPosts.slice(featuredIndex, featuredIndex + 2);

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

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-brand-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Expert Insights & Study Tips
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Learn from IIT toppers and medical college experts. Get the latest strategies, tips, and insights to excel in your competitive exams.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white border-0 rounded-full shadow-lg focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-brand text-brand-navy hover:bg-brand/90'
                      : 'text-gray-600 hover:text-brand-navy hover:bg-gray-100'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="hidden md:flex items-center text-sm text-gray-500">
              <Filter className="h-4 w-4 mr-2" />
              {filteredPosts.length} articles
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-brand mr-2" />
                    <h2 className="text-2xl font-bold text-brand-navy">Featured Articles</h2>
                  </div>
                  {featuredPosts.length > 2 && (
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={handlePrevFeatured}
                        variant="outline" 
                        size="sm"
                        className="border-brand text-brand hover:bg-brand hover:text-brand-navy"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={handleNextFeatured}
                        variant="outline" 
                        size="sm"
                        className="border-brand text-brand hover:bg-brand hover:text-brand-navy"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedFeaturedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className="group">
                      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                        <div className="aspect-[16/9] bg-gradient-to-br from-brand/20 to-brand-navy/20 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <Badge className="bg-brand text-brand-navy mb-2 text-xs">
                              {post.category}
                            </Badge>
                            <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-brand transition-colors">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-3">
                              <span>{post.author.name}</span>
                              <span>•</span>
                              <span>{post.readTime} min</span>
                              <span>•</span>
                              <span>{formatViews(post.views)} views</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Posts */}
            <section>
              {paginatedPosts.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <BookOpen className="h-6 w-6 text-brand-navy mr-2" />
                      <h2 className="text-2xl font-bold text-brand-navy">Latest Articles</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>
                      <div className="flex gap-1">
                        <Button
                          variant={sortBy === 'latest' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setSortBy('latest')}
                          className={sortBy === 'latest' ? 'bg-brand text-brand-navy hover:bg-brand/90' : 'text-gray-600'}
                        >
                          Latest
                        </Button>
                        <Button
                          variant={sortBy === 'mostViewed' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setSortBy('mostViewed')}
                          className={sortBy === 'mostViewed' ? 'bg-brand text-brand-navy hover:bg-brand/90' : 'text-gray-600'}
                        >
                          Most Viewed
                        </Button>
                        <Button
                          variant={sortBy === 'mostLiked' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setSortBy('mostLiked')}
                          className={sortBy === 'mostLiked' ? 'bg-brand text-brand-navy hover:bg-brand/90' : 'text-gray-600'}
                        >
                          Most Liked
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`} className="group">
                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                          <div className="flex">
                            <div className="w-32 h-24 bg-gradient-to-br from-brand/10 to-brand-navy/10 flex-shrink-0 relative">
                              <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="bg-white/90 text-brand-navy text-xs">
                                  {post.category}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="p-4 flex-1">
                              <h3 className="text-base font-bold text-brand-navy mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                                {post.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center space-x-2">
                                  <span>{post.author.name}</span>
                                  <span>•</span>
                                  <span>{post.readTime} min</span>
                                  <span>•</span>
                                  <span>{formatViews(post.views)} views</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col items-center gap-4 mt-8">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="flex items-center"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        
                        <div className="flex items-center space-x-1">
                          {/* Show first page */}
                          {currentPage > 3 && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(1)}
                              >
                                1
                              </Button>
                              {currentPage > 4 && <span className="px-2">...</span>}
                            </>
                          )}
                          
                          {/* Show pages around current page */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => page >= currentPage - 2 && page <= currentPage + 2)
                            .map((page) => (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={currentPage === page ? "bg-brand text-brand-navy hover:bg-brand/90" : ""}
                              >
                                {page}
                              </Button>
                            ))}
                          
                          {/* Show last page */}
                          {currentPage < totalPages - 2 && (
                            <>
                              {currentPage < totalPages - 3 && <span className="px-2">...</span>}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(totalPages)}
                              >
                                {totalPages}
                              </Button>
                            </>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="flex items-center"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Top Blogs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-brand-navy">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Top Blogs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topBlogs.map((blog, index) => (
                  <Link key={blog.id} href={`/blog/${blog.id}`} className="group block">
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 bg-brand text-brand-navy rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-brand-navy group-hover:text-brand transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">{blog.category}</Badge>
                          <span>•</span>
                          <span>{formatViews(blog.views)} views</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            
            {/* Newsletter Subscription */}
            <Card className="bg-brand-navy text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200 mb-4 text-sm">
                  Get the latest study tips and strategies delivered to your inbox weekly.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-gray-900 border-0"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-brand text-brand-navy hover:bg-brand/90 font-semibold"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-gray-300 mt-2">
                  No spam. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
            
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-brand-navy">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(1).map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCategoryFilter(category)}
                    className="w-full justify-start text-left text-gray-600 hover:text-brand-navy hover:bg-gray-50"
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </MainLayout>
  );
}
