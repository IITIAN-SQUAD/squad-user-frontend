"use client";
import Link from 'next/link';
import { Menu, X, ChevronDown, User, BarChart2, Trophy, BookOpen, Swords, FileText, RotateCcw, Brain, MessageSquare, GraduationCap, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isFeatureEnabled } from '@/lib/features';
import { getUserProfile, logout as logoutApi } from '@/lib/authApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

// Icon mapping for features
const featureIcons = {
  practice: BookOpen,
  analytics: BarChart2,
  revision: RotateCcw,
  challenge: Swords,
  pyq: FileText,
  coaching: Brain,
  doubts: MessageSquare,
  blog: FileText
};

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile = await getUserProfile();
        if (profile && profile.id) {
          setIsAuthenticated(true);
          setUserName(profile.name);
          setUserEmail(profile.email);
          setUserImage(profile.image_url || null);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/login');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-brand-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="IITian Squad Logo" className="h-16" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 items-center">
            {isFeatureEnabled('practice') && (
              <Link href="/dashboard" className="text-white hover:text-brand font-medium transition-colors">
                Practice
              </Link>
            )}
            {isFeatureEnabled('analytics') && (
              <Link href="/dashboard/analytics" className="text-white hover:text-brand font-medium transition-colors">
                Analytics
              </Link>
            )}
            {isFeatureEnabled('revision') && (
              <Link href="/dashboard/revision" className="text-white hover:text-brand font-medium transition-colors">
                Revision
              </Link>
            )}
            {isFeatureEnabled('challenge') && (
              <Link href="/dashboard/challenge" className="text-white hover:text-brand font-medium transition-colors">
                Challenge
              </Link>
            )}
            {isFeatureEnabled('pyq') && (
              <Link href="/dashboard/pyq" className="text-white hover:text-brand font-medium transition-colors">
                PYQ Papers
              </Link>
            )}
            {isFeatureEnabled('coaching') && (
              <Link href="/dashboard/coaching" className="text-white hover:text-brand font-medium transition-colors">
                AI Coaching
              </Link>
            )}
            {isFeatureEnabled('doubts') && (
              <Link href="/dashboard/doubts" className="text-white hover:text-brand font-medium transition-colors">
                Doubts
              </Link>
            )}
            {isFeatureEnabled('blog') && (
              <Link href="/blog" className="text-white hover:text-brand font-medium transition-colors">
                Blog
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons / User Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={userImage || undefined} alt={userName} />
                      <AvatarFallback className="bg-brand text-gray-900">{getInitials(userName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-brand font-medium transition-colors">
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-brand text-black px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-brand transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-600">
              {isFeatureEnabled('practice') && (
                <Link 
                  href="/dashboard" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="mr-3 h-4 w-4" />
                  Practice
                </Link>
              )}
              {isFeatureEnabled('analytics') && (
                <Link 
                  href="/dashboard/analytics" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart2 className="mr-3 h-4 w-4" />
                  Analytics
                </Link>
              )}
              {isFeatureEnabled('revision') && (
                <Link 
                  href="/dashboard/revision" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RotateCcw className="mr-3 h-4 w-4" />
                  Revision
                </Link>
              )}
              {isFeatureEnabled('challenge') && (
                <Link 
                  href="/dashboard/challenge" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Swords className="mr-3 h-4 w-4" />
                  Challenge
                </Link>
              )}
              {isFeatureEnabled('pyq') && (
                <Link 
                  href="/dashboard/pyq" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="mr-3 h-4 w-4" />
                  PYQ Papers
                </Link>
              )}
              {isFeatureEnabled('coaching') && (
                <Link 
                  href="/dashboard/coaching" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Brain className="mr-3 h-4 w-4" />
                  AI Coaching
                </Link>
              )}
              {isFeatureEnabled('doubts') && (
                <Link 
                  href="/dashboard/doubts" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="mr-3 h-4 w-4" />
                  Doubts
                </Link>
              )}
              {isFeatureEnabled('blog') && (
                <Link 
                  href="/blog" 
                  className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="mr-3 h-4 w-4" />
                  Blog
                </Link>
              )}
              
              {/* Auth Links / User Profile */}
              <div className="border-t border-gray-600 pt-3 mt-3">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={userImage || undefined} alt={userName} />
                          <AvatarFallback className="bg-brand text-gray-900 text-sm">{getInitials(userName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-white truncate">{userName}</p>
                          <p className="text-xs text-gray-300 truncate">{userEmail}</p>
                        </div>
                      </div>
                    </div>
                    <Link 
                      href="/dashboard" 
                      className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/dashboard/profile" 
                      className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-white hover:text-brand font-medium transition-colors flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block mx-3 mt-2 bg-brand text-black px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
