"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Search, Filter, X, Save, Trash2, BookmarkPlus, CheckCircle, XCircle, Clock, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface AttemptedQuestion {
  id: string
  title: string
  subject: string
  chapter: string
  topic: string
  year: number
  difficulty: "Easy" | "Medium" | "Hard"
  status: "Correct" | "Incorrect" | "Partial"
  lastAttemptedAt: Date
  userAccuracy: number
  totalAttempts: number
}

interface FilterState {
  subjects: string[]
  chapters: string[]
  topics: string[]
  years: string[]
  difficulty: string[]
  questionType: string[]
  status: string[]
  previousYearOnly: boolean
}

interface SavedFilter {
  id: string
  name: string
  filters: FilterState
}

// Mock data for attempted questions
const mockAttemptedQuestions: AttemptedQuestion[] = [
  {
    id: "Q001A",
    title: "A particle moves in a straight line with constant acceleration...",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Kinematics",
    year: 2023,
    difficulty: "Medium",
    status: "Correct",
    lastAttemptedAt: new Date(2024, 0, 15),
    userAccuracy: 85,
    totalAttempts: 2
  },
  {
    id: "Q002B",
    title: "Find the derivative of the function f(x) = x³ + 2x² - 5x + 1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Derivatives",
    year: 2024,
    difficulty: "Easy",
    status: "Correct",
    lastAttemptedAt: new Date(2024, 0, 20),
    userAccuracy: 100,
    totalAttempts: 1
  },
  {
    id: "Q003C",
    title: "Identify the product formed when benzene reacts with...",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    topic: "Hydrocarbons",
    year: 2022,
    difficulty: "Hard",
    status: "Incorrect",
    lastAttemptedAt: new Date(2024, 0, 10),
    userAccuracy: 33,
    totalAttempts: 3
  },
  {
    id: "Q004D",
    title: "A block of mass 5 kg is placed on a rough inclined plane...",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Dynamics",
    year: 2023,
    difficulty: "Hard",
    status: "Partial",
    lastAttemptedAt: new Date(2024, 0, 18),
    userAccuracy: 67,
    totalAttempts: 2
  },
  {
    id: "Q005E",
    title: "Solve the quadratic equation 2x² - 7x + 3 = 0",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    year: 2024,
    difficulty: "Easy",
    status: "Correct",
    lastAttemptedAt: new Date(2024, 0, 22),
    userAccuracy: 100,
    totalAttempts: 1
  }
]

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
  questionType: ["Single Choice", "Multiple Choice", "Integer Type", "Numerical"],
  status: ["Correct", "Incorrect", "Partial"]
}

type SortField = "id" | "title" | "year" | "difficulty" | "lastAttemptedAt" | "userAccuracy" | "status"
type SortDirection = "asc" | "desc"

export default function RevisionTab() {
  const [questions, setQuestions] = useState<AttemptedQuestion[]>(mockAttemptedQuestions)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("lastAttemptedAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [showFilterCard, setShowFilterCard] = useState(false)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [loading, setLoading] = useState(false)
  const questionsPerPage = 10
  
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    chapters: [],
    topics: [],
    years: [],
    difficulty: [],
    questionType: [],
    status: [],
    previousYearOnly: true
  })
  
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: "1",
      name: "Physics - Incorrect Only",
      filters: {
        subjects: ["Physics"],
        chapters: [],
        topics: [],
        years: [],
        difficulty: [],
        questionType: [],
        status: ["Incorrect"],
        previousYearOnly: true
      }
    },
    {
      id: "2",
      name: "Hard Questions - All Subjects",
      filters: {
        subjects: [],
        chapters: [],
        topics: [],
        years: [],
        difficulty: ["Hard"],
        questionType: [],
        status: [],
        previousYearOnly: true
      }
    }
  ])

  // Fetch questions from backend
  const fetchQuestions = async (page: number = 1, appliedFilters?: FilterState) => {
    setLoading(true)
    try {
      // In real implementation, this would be an API call
      // const response = await fetch('/api/revision/questions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     page,
      //     limit: itemsPerPage,
      //     search: searchTerm,
      //     filters: appliedFilters || filters,
      //     sortField,
      //     sortDirection
      //   })
      // })
      // const data = await response.json()
      
      // Mock implementation - simulate backend filtering and pagination
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      
      let filteredData = [...mockAttemptedQuestions]
      const activeFilters = appliedFilters || filters
      
      // Backend would handle this filtering
      if (searchTerm) {
        filteredData = filteredData.filter(q => 
          q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      const total = filteredData.length
      const totalPagesCalc = Math.ceil(total / questionsPerPage)
      const startIndex = (page - 1) * questionsPerPage
      const endIndex = startIndex + questionsPerPage
      const paginatedData = filteredData.slice(startIndex, endIndex)
      
      setQuestions(paginatedData)
      setTotalQuestions(filteredData.length)
      setTotalPages(totalPagesCalc)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

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
    return [...new Set(chapters)]
  }

  // Get available topics based on selected subjects and chapters
  const getAvailableTopics = () => {
    if (filters.subjects.length === 0) return []
    
    const topics: string[] = []
    filters.subjects.forEach(subjectName => {
      const subject = mockData.subjects.find(s => s.name === subjectName)
      if (subject) {
        subject.chapters.forEach(chapter => {
          if (filters.chapters.length === 0 || filters.chapters.includes(chapter.name)) {
            topics.push(...chapter.topics)
          }
        })
      }
    })
    return [...new Set(topics)]
  }

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentValue = prev[type];
      
      // Handle boolean type separately
      if (typeof currentValue === 'boolean') {
        return prev;
      }
      
      // Handle array types
      return {
        ...prev,
        [type]: currentValue.includes(value)
          ? currentValue.filter(item => item !== value)
          : [...currentValue, value]
      };
    });
  }

  // Apply filters - fetch from backend
  const applyFilters = () => {
    setCurrentPage(1)
    fetchQuestions(1, filters)
    setShowFilterCard(false)
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchQuestions(page)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />
    return sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800" 
      case "Hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Correct": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Incorrect": return <XCircle className="h-4 w-4 text-red-600" />
      case "Partial": return <Clock className="h-4 w-4 text-yellow-600" />
      default: return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "correct": return "bg-green-100 text-green-800";
      case "incorrect": return "bg-red-100 text-red-800";
      case "partial": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("")
    setFilters({
      subjects: [],
      chapters: [],
      topics: [],
      years: [],
      difficulty: [],
      questionType: [],
      status: [],
      previousYearOnly: true
    })
    fetchQuestions(1, {
      subjects: [],
      chapters: [],
      topics: [],
      years: [],
      difficulty: [],
      questionType: [],
      status: [],
      previousYearOnly: true
    })
  }

  const loadSavedFilter = (savedFilter: SavedFilter) => {
    setFilters(savedFilter.filters)
  }

  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [newFilterName, setNewFilterName] = useState("")

  const saveCurrentFilter = () => {
    if (!newFilterName.trim()) return
    
    if (savedFilters.length >= 5) {
      alert("You can save maximum 5 filters. Please delete an existing filter to save a new one.")
      return
    }

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: newFilterName.trim(),
      filters: { ...filters }
    }

    setSavedFilters(prev => [...prev, newFilter])
    setNewFilterName("")
    setShowSaveDialog(false)
  }

  const deleteSavedFilter = (id: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== id))
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (searchTerm) count++
    Object.values(filters).forEach(filterArray => {
      if (filterArray.length > 0) count++
    })
    return count
  }

  // Calculate statistics from total data (not just current page)
  const totalAttempted = totalQuestions
  const correctAnswers = Math.floor(totalQuestions * 0.6) // Mock calculation
  const incorrectAnswers = Math.floor(totalQuestions * 0.3) // Mock calculation
  const averageAccuracy = 72 // Mock average

  // Initialize data on component mount
  useEffect(() => {
    fetchQuestions(1)
  }, [])

  // Pagination component
  const Pagination = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-white border-t border-gray-200 gap-2">
        <div className="flex items-center text-sm text-gray-700">
          <span>
            Showing {((currentPage - 1) * questionsPerPage) + 1} to {Math.min(currentPage * questionsPerPage, totalQuestions)} of {totalQuestions} results
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          {pages.map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              disabled={loading}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalAttempted}</div>
            <div className="text-sm text-muted-foreground">Total Attempted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
            <div className="text-sm text-muted-foreground">Incorrect</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{averageAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Average Accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <div className="relative">
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search questions by title or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getActiveFilterCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear ({getActiveFilterCount()})
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterCard(!showFilterCard)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Filters - Overlay Panel */}
        {showFilterCard && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 z-40" 
              onClick={() => setShowFilterCard(false)}
            />
            
            {/* Filter Panel - Always Fixed Overlay */}
            <div className="fixed right-4 top-20 bottom-4 w-96 max-w-[calc(100vw-2rem)] bg-white border rounded-lg shadow-xl z-50 flex flex-col">
              <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilterCard(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                {/* Saved Filters Section */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookmarkPlus className="h-4 w-4" />
                    Saved Filters
                  </h3>
                  <div className="space-y-2">
                    {savedFilters.map(savedFilter => (
                      <div key={savedFilter.id} className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1 min-w-0">
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
                          onClick={() => deleteSavedFilter(savedFilter.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    {/* Save New Filter Button */}
                    <Popover open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-dashed"
                          disabled={savedFilters.length >= 5}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Save Current Filter ({savedFilters.length}/5)
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-3">
                          <h4 className="font-medium">Save Filter</h4>
                          <input
                            type="text"
                            placeholder="Enter filter name..."
                            value={newFilterName}
                            onChange={(e) => setNewFilterName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm"
                            onKeyDown={(e) => e.key === 'Enter' && saveCurrentFilter()}
                          />
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={saveCurrentFilter}
                              disabled={!newFilterName.trim()}
                              className="flex-1"
                            >
                              <Save className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setShowSaveDialog(false)
                                setNewFilterName("")
                              }}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
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
                      <h4 className="font-medium mb-2">Year</h4>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
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
                      <h4 className="font-medium mb-2">Difficulty</h4>
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
                      <h4 className="font-medium mb-2">Question Type</h4>
                      <div className="space-y-2">
                        {mockData.questionType.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`questionType-${type}`}
                              checked={filters.questionType.includes(type)}
                              onCheckedChange={() => handleFilterChange('questionType', type)}
                            />
                            <label htmlFor={`questionType-${type}`} className="text-sm">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <h4 className="font-medium mb-2">Status</h4>
                      <div className="space-y-2">
                        {mockData.status.map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.status.includes(status)}
                              onCheckedChange={() => handleFilterChange('status', status)}
                            />
                            <label htmlFor={`status-${status}`} className="text-sm">
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Previous Year Questions Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Question Source</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="previous-year-only"
                            checked={filters.previousYearOnly}
                            disabled={true}
                            className="opacity-60"
                          />
                          <label htmlFor="previous-year-only" className="text-sm text-muted-foreground">
                            Previous Year Questions Only (Default)
                          </label>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">
                          This filter is always enabled to ensure you practice with authentic exam questions.
                        </p>
                      </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm" onClick={clearAllFilters} className="flex-1">
                        Clear All
                      </Button>
                      <Button size="sm" onClick={applyFilters} className="flex-1">
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Questions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attempted Questions ({questions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-1">
                      ID {getSortIcon("id")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center gap-1">
                      Question {getSortIcon("title")}
                    </div>
                  </TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("year")}
                  >
                    <div className="flex items-center gap-1">
                      Year {getSortIcon("year")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("difficulty")}
                  >
                    <div className="flex items-center gap-2">
                      Difficulty
                      {getSortIcon("difficulty")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-2">
                      Status
                      {getSortIcon("status")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("lastAttemptedAt")}
                  >
                    <div className="flex items-center gap-2">
                      Last Attempted
                      {getSortIcon("lastAttemptedAt")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("userAccuracy")}
                  >
                    <div className="flex items-center gap-2">
                      Accuracy
                      {getSortIcon("userAccuracy")}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Loading questions...
                    </TableCell>
                  </TableRow>
                ) : questions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No questions match your current filters
                    </TableCell>
                  </TableRow>
                ) : (
                  questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                          {question.id}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Link 
                          href={`/practice/question/${question.id}?source=revision`}
                          className="text-primary hover:underline cursor-pointer line-clamp-2"
                          title={question.title}
                        >
                          {question.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            {question.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.topic}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.chapter}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{question.year}</TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusIcon(question.status)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDistanceToNow(question.lastAttemptedAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${
                            question.userAccuracy >= 80 ? 'text-green-600' :
                            question.userAccuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {question.userAccuracy}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({question.totalAttempts} attempts)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`/practice/question/${question.id}?source=revision`}>
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Retry
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination />
        </CardContent>
      </Card>
    </div>
  );
}
