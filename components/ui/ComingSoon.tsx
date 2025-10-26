"use client";

import { Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from './card';

interface ComingSoonProps {
  title?: string;
  message?: string;
  variant?: 'card' | 'inline' | 'page';
  className?: string;
}

export default function ComingSoon({ 
  title = "Coming Soon",
  message = "This feature is currently under development and will be available soon. Stay tuned!",
  variant = 'card',
  className = ''
}: ComingSoonProps) {
  
  if (variant === 'page') {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy/5 to-brand/5 ${className}`}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-brand/20">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-brand/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-brand to-brand-navy rounded-full p-6">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-brand-navy mb-4">{title}</h1>
            <p className="text-xl text-gray-600 mb-8">{message}</p>
            
            <div className="flex items-center justify-center gap-2 text-brand-navy">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Development in Progress</span>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                We're working hard to bring you this feature. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}>
        <Clock className="h-4 w-4" />
        <span>Coming Soon</span>
      </div>
    );
  }
  
  // Default: card variant
  return (
    <Card className={`border-brand/20 bg-gradient-to-br from-brand/5 to-brand-navy/5 ${className}`}>
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-brand/10 rounded-full p-4">
            <Sparkles className="h-8 w-8 text-brand-navy" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-brand-navy mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-brand-navy">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Development in Progress</span>
        </div>
      </CardContent>
    </Card>
  );
}
