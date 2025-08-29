import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand">IITian Squad</span>
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-brand font-medium">
              Courses
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-brand font-medium">
              Resources
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-brand font-medium">
              Community
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-brand font-medium">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-brand text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
