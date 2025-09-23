"use client";
import Link from 'next/link';
import { Menu, X, ChevronDown, User, BarChart2, Trophy, BookOpen, Swords, FileText, RotateCcw, Brain, MessageSquare, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

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
            <Link href="/dashboard" className="text-white hover:text-brand font-medium transition-colors">
              Practice
            </Link>
            <Link href="/dashboard/analytics" className="text-white hover:text-brand font-medium transition-colors">
              Analytics
            </Link>
            <Link href="/dashboard/revision" className="text-white hover:text-brand font-medium transition-colors">
              Revision
            </Link>
            <Link href="/dashboard/challenge" className="text-white hover:text-brand font-medium transition-colors">
              Challenge
            </Link>
            <Link href="/dashboard/pyq" className="text-white hover:text-brand font-medium transition-colors">
              PYQ Papers
            </Link>
            <Link href="/dashboard/coaching" className="text-white hover:text-brand font-medium transition-colors">
              AI Coaching
            </Link>
            <Link href="/dashboard/doubts" className="text-white hover:text-brand font-medium transition-colors">
              Doubts
            </Link>
            <Link href="/blog" className="text-white hover:text-brand font-medium transition-colors">
              Blog
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-brand font-medium transition-colors">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-brand text-black px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            >
              Sign Up
            </Link>
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
              <Link 
                href="/dashboard" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="mr-3 h-4 w-4" />
                Practice
              </Link>
              <Link 
                href="/dashboard/analytics" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart2 className="mr-3 h-4 w-4" />
                Analytics
              </Link>
              <Link 
                href="/dashboard/revision" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <RotateCcw className="mr-3 h-4 w-4" />
                Revision
              </Link>
              <Link 
                href="/dashboard/challenge" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Swords className="mr-3 h-4 w-4" />
                Challenge
              </Link>
              <Link 
                href="/dashboard/pyq" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="mr-3 h-4 w-4" />
                PYQ Papers
              </Link>
              <Link 
                href="/dashboard/coaching" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Brain className="mr-3 h-4 w-4" />
                AI Coaching
              </Link>
              <Link 
                href="/dashboard/doubts" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="mr-3 h-4 w-4" />
                Doubts
              </Link>
              <Link 
                href="/blog" 
                className="flex items-center px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              {/* Auth Links */}
              <div className="border-t border-gray-600 pt-3 mt-3">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
