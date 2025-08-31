"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import PerformanceGraphs from "../practice/PerformanceGraphs";
import PracticeFilters from "../practice/PracticeFilters";
import QuestionList from "../practice/QuestionList";

export default function PracticeTab() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full max-w-none">
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Practice Section</h2>
          <p className="text-muted-foreground mb-6">
            Practice questions without any timer or accuracy pressure. Focus on learning and understanding concepts.
          </p>
        </div>

        {/* Performance Analytics */}
        <PerformanceGraphs />

        {/* Practice Interface */}
        <div className="relative">
          {/* Filter Toggle Button */}
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="w-full overflow-hidden min-w-0">
            {/* Question List - Full Width */}
            <div className="w-full">
              <QuestionList />
            </div>
          </div>
          
          {/* Filters - Overlay Panel */}
          {showFilters && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/20 z-40" 
                onClick={() => setShowFilters(false)}
              />
              
              {/* Filter Panel - Always Fixed Overlay */}
              <div className="fixed right-4 top-20 bottom-4 w-96 max-w-[calc(100vw-2rem)] bg-white border rounded-lg shadow-xl z-50 flex flex-col">
                <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <PracticeFilters />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
