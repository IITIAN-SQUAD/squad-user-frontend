"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, ChevronRight, Filter, Save, Trash2, BookmarkPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterState {
  subjects: string[]
  chapters: string[]
  topics: string[]
  years: string[]
  difficulty: string[]
  questionType: string[]
}

interface SavedFilter {
  id: string
  name: string
  filters: FilterState
}

const mockData = {
  subjects: [
    {
      name: "Physics",
      chapters: [
        {
          name: "Mechanics",
          topics: ["Kinematics", "Dynamics", "Work & Energy", "Rotational Motion"]
        },
        {
          name: "Thermodynamics", 
          topics: ["Laws of Thermodynamics", "Heat Engines", "Entropy"]
        },
        {
          name: "Electromagnetism",
          topics: ["Electric Fields", "Magnetic Fields", "Electromagnetic Induction"]
        }
      ]
    },
    {
      name: "Chemistry",
      chapters: [
        {
          name: "Organic Chemistry",
          topics: ["Hydrocarbons", "Alcohols", "Aldehydes & Ketones", "Carboxylic Acids"]
        },
        {
          name: "Inorganic Chemistry",
          topics: ["Periodic Table", "Chemical Bonding", "Coordination Compounds"]
        },
        {
          name: "Physical Chemistry",
          topics: ["Thermodynamics", "Kinetics", "Equilibrium"]
        }
      ]
    },
    {
      name: "Mathematics",
      chapters: [
        {
          name: "Calculus",
          topics: ["Limits", "Derivatives", "Integrals", "Differential Equations"]
        },
        {
          name: "Algebra",
          topics: ["Complex Numbers", "Quadratic Equations", "Sequences & Series"]
        },
        {
          name: "Coordinate Geometry",
          topics: ["Straight Lines", "Circles", "Parabola", "Ellipse", "Hyperbola"]
        }
      ]
    }
  ],
  years: ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
  difficulty: ["Easy", "Medium", "Hard"],
  questionType: ["Single Choice", "Multiple Choice", "Integer Type", "Numerical"]
}

export default function PracticeFilters() {
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    chapters: [],
    topics: [],
    years: [],
    difficulty: [],
    questionType: []
  })
  
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: "1",
      name: "JEE Physics - Mechanics",
      filters: {
        subjects: ["Physics"],
        chapters: ["Mechanics"],
        topics: ["Kinematics", "Dynamics"],
        years: ["2023", "2024"],
        difficulty: ["Medium", "Hard"],
        questionType: ["Single Choice"]
      }
    },
    {
      id: "2",
      name: "NEET Chemistry - Organic",
      filters: {
        subjects: ["Chemistry"],
        chapters: ["Organic Chemistry"],
        topics: ["Hydrocarbons", "Alcohols"],
        years: ["2022", "2023"],
        difficulty: ["Easy", "Medium"],
        questionType: ["Multiple Choice"]
      }
    },
    {
      id: "3",
      name: "Math - Calculus Focus",
      filters: {
        subjects: ["Mathematics"],
        chapters: ["Calculus"],
        topics: ["Derivatives", "Integrals"],
        years: ["2023", "2024"],
        difficulty: ["Hard"],
        questionType: ["Integer Type"]
      }
    }
  ])

  // Get available chapters based on selected subjects
  const getAvailableChapters = () => {
    if (filters.subjects.length === 0) return []
    
    const chapters: string[] = []
    filters.subjects.forEach(subjectName => {
      const subject = mockData.subjects.find(s => s.name === subjectName)
      if (subject) {
        chapters.push(...subject.chapters.map(c => c.name))
      }
    })
    return [...new Set(chapters)] // Remove duplicates
  }

  // Get available topics based on selected subjects and chapters
  const getAvailableTopics = () => {
    if (filters.subjects.length === 0) return []
    
    const topics: string[] = []
    filters.subjects.forEach(subjectName => {
      const subject = mockData.subjects.find(s => s.name === subjectName)
      if (subject) {
        subject.chapters.forEach(chapter => {
          // If no chapters selected, show all topics from selected subjects
          // If chapters selected, only show topics from selected chapters
          if (filters.chapters.length === 0 || filters.chapters.includes(chapter.name)) {
            topics.push(...chapter.topics)
          }
        })
      }
    })
    return [...new Set(topics)] // Remove duplicates
  }

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      subjects: [],
      chapters: [],
      topics: [],
      years: [],
      difficulty: [],
      questionType: []
    })
  }

  const loadSavedFilter = (savedFilter: SavedFilter) => {
    setFilters(savedFilter.filters)
  }

  const deleteSavedFilter = (id: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-6 p-4">
      {/* Saved Filters Section */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <BookmarkPlus className="h-4 w-4" />
          Saved Filters
        </h3>
        <div className="space-y-2">
          {savedFilters.map(savedFilter => (
            <div key={savedFilter.id} className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <button
                  onClick={() => loadSavedFilter(savedFilter)}
                  className="text-left w-full"
                >
                  <div className="font-medium text-sm">{savedFilter.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {savedFilter.filters.subjects.join(", ")} • {savedFilter.filters.difficulty.join(", ")}
                  </div>
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSavedFilters(prev => prev.filter(f => f.id !== savedFilter.id))}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Custom Filters
        </h3>
        <div className="space-y-6">
                {/* Subject Filter */}
                <div>
                  <h4 className="font-medium mb-3">Subject</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {mockData.subjects.map((subject) => (
                      <div key={subject.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject.name}`}
                          checked={filters.subjects.includes(subject.name)}
                          onCheckedChange={() => handleFilterChange('subjects', subject.name)}
                        />
                        <label htmlFor={`subject-${subject.name}`} className="text-sm font-medium">
                          {subject.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chapter Filter - Only show if subjects are selected */}
                {filters.subjects.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Chapter</h4>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                      {getAvailableChapters().map((chapter) => (
                        <div key={chapter} className="flex items-center space-x-2">
                          <Checkbox
                            id={`chapter-${chapter}`}
                            checked={filters.chapters.includes(chapter)}
                            onCheckedChange={() => handleFilterChange('chapters', chapter)}
                          />
                          <label htmlFor={`chapter-${chapter}`} className="text-sm">
                            {chapter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topic Filter - Only show if subjects are selected */}
                {filters.subjects.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Topic</h4>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                      {getAvailableTopics().map((topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox
                            id={`topic-${topic}`}
                            checked={filters.topics.includes(topic)}
                            onCheckedChange={() => handleFilterChange('topics', topic)}
                          />
                          <label htmlFor={`topic-${topic}`} className="text-sm">
                            {topic}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Year Filter */}
                <div>
                  <h4 className="font-medium mb-3">Year</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mockData.years.map((year) => (
                      <div key={year} className="flex items-center space-x-2">
                        <Checkbox
                          id={`year-${year}`}
                          checked={filters.years.includes(year)}
                          onCheckedChange={() => handleFilterChange('years', year)}
                        />
                        <label htmlFor={`year-${year}`} className="text-sm">
                          {year}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h4 className="font-medium mb-3">Difficulty</h4>
                  <div className="space-y-2">
                    {mockData.difficulty.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`difficulty-${level}`}
                          checked={filters.difficulty.includes(level)}
                          onCheckedChange={() => handleFilterChange('difficulty', level)}
                        />
                        <label htmlFor={`difficulty-${level}`} className="text-sm">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question Type Filter */}
                <div>
                  <h4 className="font-medium mb-3">Question Type</h4>
                  <div className="space-y-2">
                    {mockData.questionType.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={filters.questionType.includes(type)}
                          onCheckedChange={() => handleFilterChange('questionType', type)}
                        />
                        <label htmlFor={`type-${type}`} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={clearAllFilters} className="flex-1">
                    Clear All
                  </Button>
                  <Button size="sm" className="flex-1">
                    Apply Filters
                  </Button>
                </div>
        </div>
      </div>
    </div>
  )
}
