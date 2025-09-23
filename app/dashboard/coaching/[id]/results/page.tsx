"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import { 
  ArrowLeft,
  Trophy,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Calendar,
  Clock,
  Users,
  Target,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface TestResult {
  id: string;
  testName: string;
  subject: string;
  testDate: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  rank: number;
  totalStudents: number;
  duration: number;
  status: 'completed' | 'absent' | 'pending';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  testType: 'Mock Test' | 'Chapter Test' | 'Unit Test' | 'Final Test';
}

const mockTestResults: TestResult[] = [
  {
    id: '1',
    testName: 'JEE Advanced Mock Test - 3',
    subject: 'All Subjects',
    testDate: '2024-01-20T10:00:00Z',
    totalMarks: 300,
    obtainedMarks: 245,
    percentage: 81.67,
    rank: 12,
    totalStudents: 45,
    duration: 180,
    status: 'completed',
    difficulty: 'Hard',
    testType: 'Mock Test'
  },
  {
    id: '2',
    testName: 'Physics Chapter Test - Waves',
    subject: 'Physics',
    testDate: '2024-01-18T14:00:00Z',
    totalMarks: 100,
    obtainedMarks: 92,
    percentage: 92,
    rank: 3,
    totalStudents: 45,
    duration: 90,
    status: 'completed',
    difficulty: 'Medium',
    testType: 'Chapter Test'
  },
  {
    id: '3',
    testName: 'Chemistry Unit Test - Organic',
    subject: 'Chemistry',
    testDate: '2024-01-15T10:00:00Z',
    totalMarks: 150,
    obtainedMarks: 128,
    percentage: 85.33,
    rank: 5,
    totalStudents: 45,
    duration: 120,
    status: 'completed',
    difficulty: 'Medium',
    testType: 'Unit Test'
  },
  {
    id: '4',
    testName: 'Mathematics Weekly Test',
    subject: 'Mathematics',
    testDate: '2024-01-12T09:00:00Z',
    totalMarks: 80,
    obtainedMarks: 0,
    percentage: 0,
    rank: 0,
    totalStudents: 45,
    duration: 60,
    status: 'absent',
    difficulty: 'Easy',
    testType: 'Chapter Test'
  },
  {
    id: '5',
    testName: 'JEE Advanced Mock Test - 2',
    subject: 'All Subjects',
    testDate: '2024-01-10T10:00:00Z',
    totalMarks: 300,
    obtainedMarks: 198,
    percentage: 66,
    rank: 28,
    totalStudents: 45,
    duration: 180,
    status: 'completed',
    difficulty: 'Hard',
    testType: 'Mock Test'
  },
  {
    id: '6',
    testName: 'Physics Unit Test - Mechanics',
    subject: 'Physics',
    testDate: '2024-01-08T14:00:00Z',
    totalMarks: 100,
    obtainedMarks: 87,
    percentage: 87,
    rank: 8,
    totalStudents: 45,
    duration: 90,
    status: 'completed',
    difficulty: 'Medium',
    testType: 'Unit Test'
  },
  {
    id: '7',
    testName: 'Chemistry Chapter Test - Inorganic',
    subject: 'Chemistry',
    testDate: '2024-01-05T10:00:00Z',
    totalMarks: 120,
    obtainedMarks: 95,
    percentage: 79.17,
    rank: 15,
    totalStudents: 45,
    duration: 100,
    status: 'completed',
    difficulty: 'Medium',
    testType: 'Chapter Test'
  },
  {
    id: '8',
    testName: 'JEE Advanced Mock Test - 1',
    subject: 'All Subjects',
    testDate: '2024-01-03T10:00:00Z',
    totalMarks: 300,
    obtainedMarks: 156,
    percentage: 52,
    rank: 35,
    totalStudents: 45,
    duration: 180,
    status: 'completed',
    difficulty: 'Hard',
    testType: 'Mock Test'
  }
];

export default function TestResultsPage() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [testTypeFilter, setTestTypeFilter] = useState('all');
  
  const resultsPerPage = 5;

  // Filter results
  const filteredResults = mockTestResults.filter(result => {
    const matchesSearch = result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || result.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    const matchesTestType = testTypeFilter === 'all' || result.testType === testTypeFilter;
    
    return matchesSearch && matchesSubject && matchesStatus && matchesTestType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, startIndex + resultsPerPage);

  // Statistics
  const completedTests = mockTestResults.filter(r => r.status === 'completed');
  const averagePercentage = completedTests.length > 0 
    ? completedTests.reduce((sum, r) => sum + r.percentage, 0) / completedTests.length 
    : 0;
  const bestRank = completedTests.length > 0 
    ? Math.min(...completedTests.map(r => r.rank)) 
    : 0;
  const totalTests = mockTestResults.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      'Easy': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Hard': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[difficulty as keyof typeof colors]}>{difficulty}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/dashboard/coaching/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-brand-navy">Test Results</h1>
              <p className="text-gray-600">Aakash Institute • JEE Advanced Batch A</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Tests</p>
                  <p className="text-2xl font-bold text-brand-navy">{totalTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-green-600">{averagePercentage.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Best Rank</p>
                  <p className="text-2xl font-bold text-purple-600">#{bestRank}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-yellow-600">{completedTests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="All Subjects">All Subjects</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={testTypeFilter} onValueChange={setTestTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Test Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Mock Test">Mock Test</SelectItem>
                  <SelectItem value="Chapter Test">Chapter Test</SelectItem>
                  <SelectItem value="Unit Test">Unit Test</SelectItem>
                  <SelectItem value="Final Test">Final Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results ({filteredResults.length} results)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Rank</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-brand-navy">{result.testName}</div>
                          <div className="text-sm text-gray-500">{result.testType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{result.subject}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatDate(result.testDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {result.status === 'completed' ? (
                          <span className="font-medium">
                            {result.obtainedMarks}/{result.totalMarks}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {result.status === 'completed' ? (
                          <span className={`font-bold ${getPerformanceColor(result.percentage)}`}>
                            {result.percentage.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {result.status === 'completed' ? (
                          <div className="flex items-center space-x-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">#{result.rank}</span>
                            <span className="text-sm text-gray-500">/{result.totalStudents}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(result.status)}</TableCell>
                      <TableCell>{getDifficultyBadge(result.difficulty)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {result.status === 'completed' && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Report
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + resultsPerPage, filteredResults.length)} of {filteredResults.length} results
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-brand text-brand-navy" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
