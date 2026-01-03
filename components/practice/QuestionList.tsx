"use client";

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Bookmark, 
  BookmarkPlus, 
  Plus, 
  CheckCircle, 
  XCircle,
  ListPlus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Question {
  id: string
  hash: string
  description: string
  year: string
  difficulty: "Easy" | "Medium" | "Hard"
  attempted: number
  avgAccuracy: number
  tags: {
    subject: string
    topic: string
    exam: string
  }
  status: "correct" | "incorrect" | "unattempted"
  isBookmarked: boolean
}

interface CustomList {
  id: string
  name: string
  questionCount: number
}

interface FilterState {
  subjects: string[]
  chapters: string[]
  topics: string[]
  years: string[]
  difficulty: string[]
  questionType: string[]
  previousYearOnly: boolean
}

interface QuestionListProps {
  activeFilters: FilterState
}

const mockQuestions: Question[] = [
  {
    id: "1",
    hash: "A7B2C",
    description: "A particle moves with constant acceleration. If its velocity changes from 10 m/s to 30 m/s in 4 seconds, find the acceleration.",
    year: "2024",
    difficulty: "Medium",
    attempted: 1247,
    avgAccuracy: 78.5,
    tags: {
      subject: "Physics",
      topic: "Kinematics", 
      exam: "JEE Main"
    },
    status: "correct",
    isBookmarked: false
  },
  {
    id: "2", 
    hash: "X9Y4Z",
    description: "Find the derivative of f(x) = x³ + 2x² - 5x + 7 at x = 2.",
    year: "2023",
    difficulty: "Easy",
    attempted: 892,
    avgAccuracy: 85.2,
    tags: {
      subject: "Mathematics",
      topic: "Derivatives",
      exam: "JEE Advanced"
    },
    status: "incorrect",
    isBookmarked: true
  },
  {
    id: "3",
    hash: "M5N8P", 
    description: "Which of the following compounds will undergo nucleophilic substitution reaction most readily?",
    year: "2024",
    difficulty: "Hard",
    attempted: 654,
    avgAccuracy: 62.1,
    tags: {
      subject: "Chemistry",
      topic: "Organic Chemistry",
      exam: "JEE Main"
    },
    status: "unattempted",
    isBookmarked: false
  },
  {
    id: "4",
    hash: "Q3R7S",
    description: "A uniform rod of length L and mass M is pivoted at one end. Find the moment of inertia about the pivot.",
    year: "2022",
    difficulty: "Medium", 
    attempted: 1156,
    avgAccuracy: 71.8,
    tags: {
      subject: "Physics",
      topic: "Rotational Motion",
      exam: "JEE Advanced"
    },
    status: "correct",
    isBookmarked: true
  }
]

const mockCustomLists: CustomList[] = [
  { id: "1", name: "Revision List", questionCount: 25 },
  { id: "2", name: "Weak Topics", questionCount: 18 },
  { id: "3", name: "Important Questions", questionCount: 42 }
]

type SortField = 'id' | 'description' | 'year' | 'attempted' | 'avgAccuracy' | 'difficulty'
type SortOrder = 'asc' | 'desc'

export default function QuestionList({ activeFilters }: QuestionListProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [customLists] = useState<CustomList[]>(mockCustomLists)
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const questionsPerPage = 10
  const observerTarget = useRef<HTMLDivElement>(null)

  const toggleBookmark = (questionId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, isBookmarked: !q.isBookmarked }
          : q
      )
    )
  }

  const toggleQuestionSelection = (questionId: string) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const selectAllQuestions = () => {
    if (selectedQuestions.length === questions.length) {
      setSelectedQuestions([])
    } else {
      setSelectedQuestions(questions.map(q => q.id))
    }
  }

  const addToCustomList = (listId: string, questionIds: string[]) => {
    console.log(`Adding ${questionIds.length} questions to list ${listId}`)
    // Implementation would add questions to the selected custom list
    setSelectedQuestions([])
  }

  const addAllFilteredToList = () => {
    const allQuestionIds = questions.map(q => q.id)
    console.log(`Adding all ${allQuestionIds.length} filtered questions to list`)
    // Implementation would show list selection modal
  }

  // Mock backend API call for fetching questions with infinite scroll and sorting
  const fetchQuestions = async (page: number = 1, sort?: { field: SortField, order: SortOrder }, search?: string, append: boolean = false) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let allQuestions = [...mockQuestions]
    
    // Apply search filtering
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim()
      allQuestions = allQuestions.filter(question => 
        question.description.toLowerCase().includes(searchLower) ||
        question.id.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply sorting if provided
    if (sort) {
      allQuestions.sort((a, b) => {
        let aValue: any, bValue: any
        
        switch (sort.field) {
          case 'id':
            aValue = parseInt(a.id)
            bValue = parseInt(b.id)
            break
          case 'description':
            aValue = a.description.toLowerCase()
            bValue = b.description.toLowerCase()
            return sort.order === 'asc' 
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue)
          case 'year':
            aValue = parseInt(a.year)
            bValue = parseInt(b.year)
            break
          case 'attempted':
            aValue = a.attempted
            bValue = b.attempted
            break
          case 'avgAccuracy':
            aValue = a.avgAccuracy
            bValue = b.avgAccuracy
            break
          case 'difficulty':
            const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
            aValue = difficultyOrder[a.difficulty]
            bValue = difficultyOrder[b.difficulty]
            break
          default:
            return 0
        }
        
        return sort.order === 'asc' ? aValue - bValue : bValue - aValue
      })
    }
    
    // Calculate pagination
    const total = allQuestions.length
    const startIndex = (page - 1) * questionsPerPage
    const endIndex = startIndex + questionsPerPage
    const paginatedQuestions = allQuestions.slice(startIndex, endIndex)
    
    if (append) {
      setQuestions(prev => [...prev, ...paginatedQuestions])
    } else {
      setQuestions(paginatedQuestions)
    }
    
    setHasMore(endIndex < total)
    setTotalQuestions(total)
    setLoading(false)
  }

  const handleSort = (field: SortField) => {
    const newOrder = sortField === field && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortField(field)
    setSortOrder(newOrder)
    setCurrentPage(1)
    
    // Fetch with new sorting
    fetchQuestions(1, { field, order: newOrder }, searchTerm, false)
  }

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      const sort = sortField ? { field: sortField, order: sortOrder } : undefined
      fetchQuestions(nextPage, sort, searchTerm, true)
    }
  }, [loading, hasMore, currentPage, sortField, sortOrder, searchTerm])

  // Initialize data on component mount
  useEffect(() => {
    fetchQuestions(1, undefined, undefined, false)
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, loading, loadMore])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1) // Reset to first page when searching
      const sort = sortField ? { field: sortField, order: sortOrder } : undefined
      fetchQuestions(1, sort, searchTerm, false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />
    return sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
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
      case "correct": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "incorrect": return <XCircle className="h-4 w-4 text-red-600" />
      default: return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search questions by description or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Mobile Sort Controls */}
        <div className="flex gap-2 w-full sm:hidden">
          <Select value={sortField || ''} onValueChange={(value) => handleSort(value as SortField)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
              <SelectItem value="attempted">Attempts</SelectItem>
              <SelectItem value="avgAccuracy">Avg Accuracy</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (sortField) {
                const newOrder = sortOrder === 'desc' ? 'asc' : 'desc'
                setSortOrder(newOrder)
                fetchQuestions(currentPage, { field: sortField, order: newOrder }, searchTerm)
              }
            }}
            disabled={!sortField}
          >
            {sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">
            Questions ({totalQuestions})
          </h3>
          {selectedQuestions.length > 0 && (
            <Badge variant="secondary">
              {selectedQuestions.length} selected
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addAllFilteredToList}
          >
            <ListPlus className="h-4 w-4 mr-2" />
            Add All to List
          </Button>
          
          {selectedQuestions.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Selected to List
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-medium">Select Custom List</h4>
                  {customLists.map((list) => (
                    <Button
                      key={list.id}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => addToCustomList(list.id, selectedQuestions)}
                    >
                      {list.name} ({list.questionCount})
                    </Button>
                  ))}
                  <Button variant="outline" className="w-full">
                    Create New List
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden sm:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-fit">
              <thead>
                <tr className="bg-muted text-muted-foreground text-sm border-b">
                  <th className="text-left py-3 px-2 font-medium w-8 sm:w-12">
                    <Checkbox
                      checked={selectedQuestions.length === questions.length}
                      onCheckedChange={selectAllQuestions}
                    />
                  </th>
                  <th className="text-left py-3 px-2 font-medium w-16 sm:w-20">
                    <button
                      onClick={() => handleSort('id')}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      ID {getSortIcon('id')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-3 font-medium min-w-0 flex-1">
                    <button
                      onClick={() => handleSort('description')}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      Question {getSortIcon('description')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-3 font-medium w-20">
                    <button
                      onClick={() => handleSort('year')}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      Year {getSortIcon('year')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-3 font-medium w-24">
                    <button
                      onClick={() => handleSort('difficulty')}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      Difficulty {getSortIcon('difficulty')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-3 font-medium w-24">
                    <button
                      onClick={() => handleSort('attempted')}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      Attempts {getSortIcon('attempted')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-2 font-medium w-20 sm:w-28">
                    <button
                      onClick={() => handleSort('avgAccuracy')}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      Avg Accuracy {getSortIcon('avgAccuracy')}
                    </button>
                  </th>
                  <th className="text-left py-3 px-2 font-medium w-32 sm:w-48">Tags</th>
                  <th className="text-left py-3 px-2 font-medium w-16 sm:w-20">Status</th>
                  <th className="text-left py-3 px-2 font-medium w-20 sm:w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-muted-foreground">
                      Loading questions...
                    </td>
                  </tr>
                ) : questions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-muted-foreground">
                      No questions found
                    </td>
                  </tr>
                ) : (
                  questions.map((question) => (
                    <tr key={question.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-3">
                        <Checkbox
                          checked={selectedQuestions.includes(question.id)}
                          onCheckedChange={() => toggleQuestionSelection(question.id)}
                        />
                      </td>
                      <td className="py-3 px-3">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                          {question.hash}
                        </code>
                      </td>
                      <td className="py-3 px-3">
                        <Link 
                          href={`/practice/question/${question.id}`}
                          className="text-primary hover:underline cursor-pointer line-clamp-2"
                          title={question.description}
                        >
                          {question.description}
                        </Link>
                      </td>
                      <td className="py-3 px-3">{question.year}</td>
                      <td className="py-3 px-3">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </td>
                      <td className="py-3 px-3">{question.attempted.toLocaleString()}</td>
                      <td className="py-3 px-3">{question.avgAccuracy}%</td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {question.tags.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.tags.topic}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.tags.exam}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        {getStatusIcon(question.status)}
                      </td>
                      <td className="py-3 px-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(question.id)}
                        >
                          {question.isBookmarked ? (
                            <Bookmark className="h-4 w-4 fill-current text-yellow-500" />
                          ) : (
                            <BookmarkPlus className="h-4 w-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Loading questions...
            </CardContent>
          </Card>
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No questions found
            </CardContent>
          </Card>
        ) : (
          questions.map((question) => (
            <Card key={question.id} className="overflow-hidden">
              <CardContent className="p-3 space-y-2.5">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0 flex-shrink">
                    <Checkbox
                      checked={selectedQuestions.includes(question.id)}
                      onCheckedChange={() => toggleQuestionSelection(question.id)}
                      className="flex-shrink-0"
                    />
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
                      {question.hash}
                    </code>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {getStatusIcon(question.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(question.id)}
                      className="h-7 w-7 p-0"
                    >
                      {question.isBookmarked ? (
                        <Bookmark className="h-3.5 w-3.5 fill-current text-yellow-500" />
                      ) : (
                        <BookmarkPlus className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Question Description */}
                <Link 
                  href={`/practice/question/${question.id}`}
                  className="block"
                >
                  <p className="text-sm text-primary hover:underline line-clamp-2 leading-snug">
                    {question.description}
                  </p>
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                    {question.tags.subject}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                    {question.tags.topic}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                    {question.tags.exam}
                  </Badge>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                    <span className="text-muted-foreground text-[10px]">Year:</span>
                    <span className="font-medium">{question.year}</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded gap-1">
                    <span className="text-muted-foreground text-[10px] whitespace-nowrap">Difficulty:</span>
                    <Badge className={`${getDifficultyColor(question.difficulty)} text-[10px] px-1.5 py-0 h-4`} variant="secondary">
                      {question.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                    <span className="text-muted-foreground text-[10px]">Attempts:</span>
                    <span className="font-medium">{question.attempted.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded gap-1">
                    <span className="text-muted-foreground text-[10px] whitespace-nowrap">Avg Acc:</span>
                    <span className="font-medium">{question.avgAccuracy}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={observerTarget} className="py-4 text-center">
        {loading && (
          <div className="text-sm text-muted-foreground">
            Loading more questions...
          </div>
        )}
        {!loading && !hasMore && questions.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing all {totalQuestions} results
          </div>
        )}
      </div>
    </div>
  )
}
