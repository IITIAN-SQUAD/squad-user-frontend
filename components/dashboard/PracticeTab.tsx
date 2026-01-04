"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Filter, X } from "lucide-react";
import PerformanceGraphs from "../practice/PerformanceGraphs";
import PracticeFilters from "../practice/PracticeFilters";
import QuestionList from "../practice/QuestionList";

interface FilterState {
  subjects: string[]
  chapters: string[]
  topics: string[]
  years: string[]
  difficulty: string[]
  questionType: string[]
  previousYearOnly: boolean
}

export default function PracticeTab() {
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    subjects: [],
    chapters: [],
    topics: [],
    years: [],
    difficulty: [],
    questionType: [],
    previousYearOnly: true
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    subjects: [],
    chapters: [],
    topics: [],
    years: [],
    difficulty: [],
    questionType: [],
    previousYearOnly: true
  });

  const removeFilter = (type: keyof FilterState, value: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const updatedFilters = {
      ...appliedFilters,
      [type]: (appliedFilters[type] as string[]).filter(item => item !== value)
    };
    setAppliedFilters(updatedFilters);
    setSelectedFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(selectedFilters);
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      subjects: [],
      chapters: [],
      topics: [],
      years: [],
      difficulty: [],
      questionType: [],
      previousYearOnly: true
    };
    setAppliedFilters(emptyFilters);
    setSelectedFilters(emptyFilters);
  };

  const getActiveFilterCount = () => {
    return appliedFilters.subjects.length + 
           appliedFilters.chapters.length + 
           appliedFilters.topics.length + 
           appliedFilters.years.length + 
           appliedFilters.difficulty.length + 
           appliedFilters.questionType.length;
  };

  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Practice Section</h2>
          <p className="text-muted-foreground mb-6 hidden md:block">
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
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-7 text-xs"
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {appliedFilters.subjects.map(subject => (
                  <Badge key={subject} variant="secondary" className="gap-1 pr-1 cursor-pointer">
                    Subject: {subject}
                    <X className="h-3 w-3 hover:text-red-600" onClick={(e) => removeFilter('subjects', subject, e)} />
                  </Badge>
                ))}
                {appliedFilters.chapters.map(chapter => (
                  <Badge key={chapter} variant="secondary" className="gap-1 pr-1 cursor-pointer">
                    Chapter: {chapter}
                    <X className="h-3 w-3 hover:text-red-600" onClick={(e) => removeFilter('chapters', chapter, e)} />
                  </Badge>
                ))}
                {appliedFilters.topics.map(topic => (
                  <Badge key={topic} variant="secondary" className="gap-1 pr-1 cursor-pointer">
                    Topic: {topic}
                    <X className="h-3 w-3 hover:text-red-600" onClick={(e) => removeFilter('topics', topic, e)} />
                  </Badge>
                ))}
                {appliedFilters.years.map(year => (
                  <Badge key={year} variant="secondary" className="gap-1 pr-1 cursor-pointer">
                    Year: {year}
                    <X className="h-3 w-3 hover:text-red-600" onClick={(e) => removeFilter('years', year, e)} />
                  </Badge>
                ))}
                {appliedFilters.difficulty.map(diff => (
                  <Badge key={diff} variant="secondary" className="gap-1 pr-1 cursor-pointer">
                    Difficulty: {diff}
                    <X className="h-3 w-3 hover:text-red-600" onClick={(e) => removeFilter('difficulty', diff, e)} />
                  </Badge>
                ))}
                {appliedFilters.questionType.map(type => (
                  <Badge key={type} variant="secondary" className="gap-1 pr-1 cursor-pointer">
                    Type: {type}
                    <X className="h-3 w-3 hover:text-red-600" onClick={(e) => removeFilter('questionType', type, e)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="w-full overflow-hidden min-w-0">
            {/* Question List - Full Width */}
            <div className="w-full">
              <QuestionList activeFilters={appliedFilters} />
            </div>
          </div>
          
          {/* Filters - Mobile: Bottom Sheet, Desktop: Overlay Panel */}
          {isMobile ? (
            <Drawer open={showFilters} onOpenChange={setShowFilters}>
              <DrawerContent className="max-h-[85vh]">
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-4">
                  <PracticeFilters 
                    filters={selectedFilters}
                    onFiltersChange={setSelectedFilters}
                    onApplyFilters={handleApplyFilters}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            showFilters && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/20 z-40" 
                  onClick={() => setShowFilters(false)}
                />
                
                {/* Filter Panel - Desktop Fixed Overlay */}
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
                    <PracticeFilters 
                      filters={selectedFilters}
                      onFiltersChange={setSelectedFilters}
                      onApplyFilters={handleApplyFilters}
                    />
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
