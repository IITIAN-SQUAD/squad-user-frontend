import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../components/layout/MainLayout';
import { BookOpen, Users, Trophy, Clock, ArrowRight, Play, FileText, BarChart2, Swords, RotateCcw, Brain, MessageSquare, Target, Award, Zap, CheckCircle } from 'lucide-react';
import { isFeatureEnabled } from '@/lib/features';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Crack Your Dream Exam with <span className="text-brand">IITian Squad</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Join thousands of successful students who achieved their goals with expert guidance from India's top IITians. Your success story starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard" 
                  className="bg-brand text-brand-navy px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center text-lg"
                >
                  Start Learning Now
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-transparent border-2 border-brand text-brand px-8 py-4 rounded-lg font-semibold hover:bg-brand hover:text-brand-navy transition-colors text-center text-lg"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-96 w-full">
                {/* Platform Preview Mockup */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 h-full overflow-hidden border border-brand/20">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <img src="/isq-logo-white.svg" alt="Logo" className="h-6" />
                      {/* <span className="font-semibold text-brand-navy">IITian Squad</span> */}
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-brand rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="space-y-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-brand/10 to-brand/20 p-3 rounded-lg border border-brand/30">
                        <div className="text-xs text-brand-navy font-medium">Total Questions</div>
                        <div className="text-lg font-bold text-brand-navy">15,000+</div>
                      </div>
                      <div className="bg-gradient-to-r from-brand-navy/10 to-brand-navy/20 p-3 rounded-lg border border-brand-navy/30">
                        <div className="text-xs text-brand-navy font-medium">All Exams</div>
                        <div className="text-lg font-bold text-brand-navy">6 Types</div>
                      </div>
                    </div>
                    
                    {/* Expert Section */}
                    <div className="bg-gradient-to-r from-brand/20 to-brand/30 p-4 rounded-lg border border-brand/40">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-brand-navy">IIT</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-brand-navy">Expert Solutions</div>
                          <div className="text-xs text-brand-navy/70">By IIT Alumni</div>
                        </div>
                      </div>
                      <div className="text-xs text-brand-navy">✓ Step-by-step explanations</div>
                      <div className="text-xs text-brand-navy">✓ Multiple approaches</div>
                    </div>
                    
                    {/* Question Preview */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-brand-navy">Mathematics • Competitive</span>
                        <span className="text-xs bg-brand text-brand-navy px-2 py-1 rounded">Hard</span>
                      </div>
                      <div className="text-xs text-gray-800 mb-2">Find the value of the integral...</div>
                      <div className="flex space-x-2">
                        <div className="w-4 h-2 bg-brand/40 rounded"></div>
                        <div className="w-6 h-2 bg-brand/40 rounded"></div>
                        <div className="w-5 h-2 bg-brand/40 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Performance Graph */}
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-xs font-medium text-brand-navy mb-2">Weekly Progress</div>
                      <div className="flex items-end space-x-1 h-12">
                        <div className="w-3 bg-brand h-6 rounded-t"></div>
                        <div className="w-3 bg-brand h-8 rounded-t"></div>
                        <div className="w-3 bg-brand h-10 rounded-t"></div>
                        <div className="w-3 bg-brand h-7 rounded-t"></div>
                        <div className="w-3 bg-brand h-12 rounded-t"></div>
                        <div className="w-3 bg-brand h-9 rounded-t"></div>
                        <div className="w-3 bg-brand h-11 rounded-t"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 bg-brand text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Live Platform
                </div>
                <div className="absolute -bottom-2 -left-2 bg-brand-navy text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  IIT Experts
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and features designed by IIT experts to accelerate your exam preparation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Practice Questions */}
            <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-2xl p-8 border border-brand/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-brand rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Smart Practice</h3>
              <p className="text-gray-600 mb-4">15,000+ curated questions with detailed solutions from IIT experts. Practice by topic, difficulty, or exam pattern.</p>
              {isFeatureEnabled('practice') ? (
                <Link href="/dashboard" className="text-brand-navy font-semibold hover:text-brand transition-colors">
                  Start Practicing →
                </Link>
              ) : (
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Coming Soon - Development in Progress
                </span>
              )}
            </div>

            {/* Analytics */}
            <div className="bg-gradient-to-br from-brand-navy/5 to-brand-navy/10 rounded-2xl p-8 border border-brand-navy/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-navy rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BarChart2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Performance Analytics</h3>
              <p className="text-gray-600 mb-4">Track your progress with detailed analytics, identify weak areas, and get personalized recommendations.</p>
              {isFeatureEnabled('analytics') ? (
                <Link href="/dashboard/analytics" className="text-brand-navy font-semibold hover:text-brand transition-colors">
                  View Analytics →
                </Link>
              ) : (
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Coming Soon - Development in Progress
                </span>
              )}
            </div>

            {/* Challenges */}
            <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-2xl p-8 border border-brand/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-brand rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Swords className="h-8 w-8 text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Live Challenges</h3>
              <p className="text-gray-600 mb-4">Compete with peers in timed challenges, mock tests, and leaderboard competitions.</p>
              {isFeatureEnabled('challenge') ? (
                <Link href="/dashboard/challenge" className="text-brand-navy font-semibold hover:text-brand transition-colors">
                  Join Challenge →
                </Link>
              ) : (
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Coming Soon - Development in Progress
                </span>
              )}
            </div>

            {/* PYQ Papers */}
            <div className="bg-gradient-to-br from-brand-navy/5 to-brand-navy/10 rounded-2xl p-8 border border-brand-navy/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-navy rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">PYQ Papers</h3>
              <p className="text-gray-600 mb-4">Complete previous year question papers with exam-like interface and detailed analysis.</p>
              {isFeatureEnabled('pyq') ? (
                <Link href="/dashboard/pyq" className="text-brand-navy font-semibold hover:text-brand transition-colors">
                  Attempt Papers →
                </Link>
              ) : (
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Coming Soon - Development in Progress
                </span>
              )}
            </div>

            {/* AI Coaching */}
            <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-2xl p-8 border border-brand/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-brand rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">AI Coaching</h3>
              <p className="text-gray-600 mb-4">Get personalized study plans, doubt resolution, and strategic guidance powered by AI.</p>
              {isFeatureEnabled('coaching') ? (
                <Link href="/dashboard/coaching" className="text-brand-navy font-semibold hover:text-brand transition-colors">
                  Get Coaching →
                </Link>
              ) : (
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Coming Soon - Development in Progress
                </span>
              )}
            </div>

            {/* Doubt Resolution */}
            <div className="bg-gradient-to-br from-brand-navy/5 to-brand-navy/10 rounded-2xl p-8 border border-brand-navy/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-navy rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Instant Doubts</h3>
              <p className="text-gray-600 mb-4">Get your doubts resolved instantly by IIT experts and connect with study groups.</p>
              {isFeatureEnabled('doubts') ? (
                <Link href="/dashboard/doubts" className="text-brand-navy font-semibold hover:text-brand transition-colors">
                  Ask Doubts →
                </Link>
              ) : (
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Coming Soon - Development in Progress
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About IITian Squad</h2>
              <p className="text-xl text-gray-200 mb-6">
                Founded by IIT alumni with a mission to democratize quality education and make expert guidance accessible to every aspiring student across India.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand flex-shrink-0" />
                  <span className="text-gray-200">Expert content created by IIT alumni and top educators</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand flex-shrink-0" />
                  <span className="text-gray-200">Comprehensive coverage of JEE, NEET, and other competitive exams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand flex-shrink-0" />
                  <span className="text-gray-200">AI-powered personalized learning experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand flex-shrink-0" />
                  <span className="text-gray-200">24/7 doubt resolution and community support</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand">50K+</div>
                  <div className="text-sm text-gray-300">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand">15K+</div>
                  <div className="text-sm text-gray-300">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand">95%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-brand/20 to-brand/10 rounded-2xl p-8 border border-brand/30">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand rounded-full w-12 h-12 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-brand-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Expert Mentorship</h4>
                      <p className="text-gray-300 text-sm">Learn from IIT toppers and industry experts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand rounded-full w-12 h-12 flex items-center justify-center">
                      <Target className="h-6 w-6 text-brand-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Focused Preparation</h4>
                      <p className="text-gray-300 text-sm">Structured curriculum aligned with exam patterns</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand rounded-full w-12 h-12 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-brand-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Fast Results</h4>
                      <p className="text-gray-300 text-sm">See improvement in your scores within weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Exam</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start practicing with previous year questions from India's top competitive exams
            </p>
          </div>
          
          {/* Mobile: Grid Layout, Desktop: Scrolling Cards */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/practice" className="group">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">JEE</div>
                      <div className="text-xs text-gray-500">Main & Advanced</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Joint Entrance Examination</h3>
                  <p className="text-gray-600 text-sm mb-3">Practice with 5000+ JEE questions covering Physics, Chemistry, and Mathematics</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">2000+ Questions</span>
                    <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">NEET</div>
                      <div className="text-xs text-gray-500">UG</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">National Eligibility Entrance Test</h3>
                  <p className="text-gray-600 text-sm mb-3">Master Biology, Physics, and Chemistry with comprehensive question bank</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">3000+ Questions</span>
                    <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-full">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">GATE</div>
                      <div className="text-xs text-gray-500">All Branches</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Graduate Aptitude Test</h3>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive preparation for all GATE branches with expert solutions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">4000+ Questions</span>
                    <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-orange-600">CAT</div>
                      <div className="text-xs text-gray-500">MBA Entrance</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Admission Test</h3>
                  <p className="text-gray-600 text-sm mb-3">Excel in Quantitative Aptitude, Verbal Ability, and Logical Reasoning</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">2500+ Questions</span>
                    <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-600">UPSC</div>
                      <div className="text-xs text-gray-500">Civil Services</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Union Public Service Commission</h3>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive preparation for Prelims and Mains with current affairs</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">3500+ Questions</span>
                    <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-indigo-600">SSC</div>
                      <div className="text-xs text-gray-500">All Exams</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Staff Selection Commission</h3>
                  <p className="text-gray-600 text-sm mb-3">Practice for CGL, CHSL, MTS and other SSC examinations</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">2800+ Questions</span>
                    <ArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop: Scrolling Animation */}
          <div className="hidden md:block relative overflow-hidden rounded-2xl">
            <div className="flex gap-8 animate-scroll">
              {/* First set of cards */}
              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">JEE</div>
                      <div className="text-sm text-gray-500">Main & Advanced</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Joint Entrance Examination</h3>
                  <p className="text-gray-600 mb-4">Practice with 5000+ JEE questions covering Physics, Chemistry, and Mathematics</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">2000+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">NEET</div>
                      <div className="text-sm text-gray-500">UG</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">National Eligibility Entrance Test</h3>
                  <p className="text-gray-600 mb-4">Master Biology, Physics, and Chemistry with comprehensive question bank</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">3000+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">GATE</div>
                      <div className="text-sm text-gray-500">All Branches</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Graduate Aptitude Test</h3>
                  <p className="text-gray-600 mb-4">Comprehensive preparation for all GATE branches with expert solutions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">4000+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">CAT</div>
                      <div className="text-sm text-gray-500">MBA Entrance</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Admission Test</h3>
                  <p className="text-gray-600 mb-4">Excel in Quantitative Aptitude, Verbal Ability, and Logical Reasoning</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">2500+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">UPSC</div>
                      <div className="text-sm text-gray-500">Civil Services</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Union Public Service Commission</h3>
                  <p className="text-gray-600 mb-4">Comprehensive preparation for Prelims and Mains with current affairs</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">3500+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-full">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">SSC</div>
                      <div className="text-sm text-gray-500">All Exams</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Staff Selection Commission</h3>
                  <p className="text-gray-600 mb-4">Practice for CGL, CHSL, MTS and other SSC examinations</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">2800+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Duplicate set for seamless loop */}
              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">JEE</div>
                      <div className="text-sm text-gray-500">Main & Advanced</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Joint Entrance Examination</h3>
                  <p className="text-gray-600 mb-4">Practice with 5000+ JEE questions covering Physics, Chemistry, and Mathematics</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">2000+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">NEET</div>
                      <div className="text-sm text-gray-500">UG</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">National Eligibility Entrance Test</h3>
                  <p className="text-gray-600 mb-4">Master Biology, Physics, and Chemistry with comprehensive question bank</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">3000+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">GATE</div>
                      <div className="text-sm text-gray-500">All Branches</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Graduate Aptitude Test</h3>
                  <p className="text-gray-600 mb-4">Comprehensive preparation for all GATE branches with expert solutions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">4000+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">CAT</div>
                      <div className="text-sm text-gray-500">MBA Entrance</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Admission Test</h3>
                  <p className="text-gray-600 mb-4">Excel in Quantitative Aptitude, Verbal Ability, and Logical Reasoning</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">2500+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">UPSC</div>
                      <div className="text-sm text-gray-500">Civil Services</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Union Public Service Commission</h3>
                  <p className="text-gray-600 mb-4">Comprehensive preparation for Prelims and Mains with current affairs</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">3500+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="group flex-shrink-0 w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-full">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">SSC</div>
                      <div className="text-sm text-gray-500">All Exams</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Staff Selection Commission</h3>
                  <p className="text-gray-600 mb-4">Practice for CGL, CHSL, MTS and other SSC examinations</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">2800+ Questions</span>
                    <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IITian Squad?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive learning resources designed by top IITians
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-brand bg-opacity-10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced IITians who have excelled in their fields and know exactly what it takes to succeed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-brand bg-opacity-10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Resources</h3>
              <p className="text-gray-600">
                Access a wide range of study materials, practice tests, and video lectures designed to help you master every concept.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-brand bg-opacity-10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Learning</h3>
              <p className="text-gray-600">
                Get personalized attention and feedback to address your specific learning needs and help you progress faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Question Practice Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master concepts with our extensive question bank covering all major competitive exams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">15K+</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Total Questions</h3>
              <p className="text-sm text-gray-600">Across all subjects and exams</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-green-600">50K+</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Active Students</h3>
              <p className="text-sm text-gray-600">Learning with us daily</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">95%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Success Rate</h3>
              <p className="text-sm text-gray-600">Students clearing exams</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">24/7</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 bg-brand text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Start Practicing Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Insights & Tips</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with exam strategies, study tips, and success stories from our expert team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <FileText className="h-12 w-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>Study Tips</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Top 10 JEE Preparation Strategies for 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover proven strategies used by JEE toppers to crack the exam with confidence and achieve your dream rank.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Play className="h-12 w-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>Success Story</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  From AIR 50,000 to AIR 150: A NEET Success Story
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how Priya transformed her NEET preparation and achieved her dream of getting into a top medical college.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>Exam Guide</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Complete GATE 2024 Preparation Roadmap
                </h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide covering all aspects of GATE preparation, from syllabus analysis to time management.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
          
          <div className="text-center">
            {isFeatureEnabled('blog') ? (
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-gray-500 px-8 py-4">
                <Clock className="h-5 w-5" />
                Blog Coming Soon
              </span>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand bg-opacity-10 rounded-2xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Learning Journey?</h2>
              <p className="text-xl text-gray-700 mb-8">
                Join thousands of students who have transformed their academic performance with IITian Squad.
              </p>
              <Link 
                href="/signup" 
                className="bg-brand text-gray-900 px-8 py-4 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
