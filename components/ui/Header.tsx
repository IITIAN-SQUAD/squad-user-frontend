"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="IITian Squad Logo" className="h-18" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/practice" className="text-white hover:text-brand font-medium transition-colors">
              Practice
            </Link>
            <Link href="/dashboard/revision" className="text-white hover:text-brand font-medium transition-colors">
              Revision
            </Link>
            <Link href="/dashboard/challenge" className="text-white hover:text-brand font-medium transition-colors">
              Challenge
            </Link>
            <Link href="/blog" className="text-white hover:text-brand font-medium transition-colors">
              Blog
            </Link>
            <Link href="/store" className="text-white hover:text-brand font-medium transition-colors">
              Store
            </Link>
            <Link href="/about" className="text-white hover:text-brand font-medium transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
          <div className="md:hidden">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-600">
              <Link 
                href="/practice" 
                className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice
              </Link>
              <Link 
                href="/dashboard/revision" 
                className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Revision
              </Link>
              <Link 
                href="/dashboard/challenge" 
                className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Challenge
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/store" 
                className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Store
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-white hover:text-brand font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
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
