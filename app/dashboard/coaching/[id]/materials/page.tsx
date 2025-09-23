"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import { 
  ArrowLeft,
  FileText,
  Video,
  Download,
  Eye,
  Calendar,
  User,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  BookOpen,
  FileImage,
  Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

interface StudyMaterial {
  id: string;
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'All Subjects';
  type: 'pdf' | 'video' | 'youtube' | 'notes' | 'assignment' | 'reference';
  uploadedAt: string;
  uploadedBy: string;
  fileSize?: string;
  duration?: string;
  downloads: number;
  views: number;
  isNew: boolean;
  description: string;
  tags: string[];
  url?: string;
  youtubeId?: string;
  thumbnailUrl?: string;
}

const mockMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Electromagnetic Induction - Complete Theory',
    subject: 'Physics',
    type: 'pdf',
    uploadedAt: '2024-01-20T14:30:00Z',
    uploadedBy: 'Dr. Sharma',
    fileSize: '2.4 MB',
    downloads: 156,
    views: 234,
    isNew: true,
    description: 'Comprehensive notes covering Faraday\'s law, Lenz\'s law, and applications of electromagnetic induction.',
    tags: ['Theory', 'JEE Advanced', 'Important'],
    url: '/materials/physics/electromagnetic-induction.pdf'
  },
  {
    id: '2',
    title: 'Organic Chemistry Reaction Mechanisms',
    subject: 'Chemistry',
    type: 'video',
    uploadedAt: '2024-01-19T16:00:00Z',
    uploadedBy: 'Prof. Gupta',
    duration: '45:30',
    downloads: 0,
    views: 189,
    isNew: true,
    description: 'Detailed explanation of organic reaction mechanisms with step-by-step examples.',
    tags: ['Video Lecture', 'Mechanisms', 'NEET'],
    url: '/materials/chemistry/organic-mechanisms.mp4',
    thumbnailUrl: '/thumbnails/organic-mechanisms.jpg'
  },
  {
    id: '3',
    title: 'Coordinate Geometry - JEE Masterclass',
    subject: 'Mathematics',
    type: 'youtube',
    uploadedAt: '2024-01-18T10:00:00Z',
    uploadedBy: 'Mr. Patel',
    duration: '1:20:45',
    downloads: 0,
    views: 312,
    isNew: false,
    description: 'Complete coordinate geometry concepts with solved examples and practice problems.',
    tags: ['YouTube', 'JEE Main', 'Problem Solving'],
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
  },
  {
    id: '4',
    title: 'Thermodynamics Practice Problems',
    subject: 'Physics',
    type: 'assignment',
    uploadedAt: '2024-01-17T11:30:00Z',
    uploadedBy: 'Dr. Sharma',
    fileSize: '1.8 MB',
    downloads: 98,
    views: 145,
    isNew: false,
    description: '50 practice problems on thermodynamics with detailed solutions.',
    tags: ['Practice', 'Problems', 'Solutions'],
    url: '/materials/physics/thermodynamics-problems.pdf'
  },
  {
    id: '5',
    title: 'Chemical Bonding Visual Guide',
    subject: 'Chemistry',
    type: 'pdf',
    uploadedAt: '2024-01-16T09:15:00Z',
    uploadedBy: 'Prof. Gupta',
    fileSize: '3.2 MB',
    downloads: 203,
    views: 287,
    isNew: false,
    description: 'Visual representation of chemical bonding concepts with diagrams and examples.',
    tags: ['Visual', 'Bonding', 'Diagrams'],
    url: '/materials/chemistry/chemical-bonding.pdf'
  },
  {
    id: '6',
    title: 'Calculus Integration Techniques',
    subject: 'Mathematics',
    type: 'video',
    uploadedAt: '2024-01-15T14:45:00Z',
    uploadedBy: 'Mr. Patel',
    duration: '38:20',
    downloads: 0,
    views: 167,
    isNew: false,
    description: 'Advanced integration techniques including substitution, parts, and partial fractions.',
    tags: ['Calculus', 'Integration', 'Advanced'],
    url: '/materials/mathematics/integration-techniques.mp4',
    thumbnailUrl: '/thumbnails/integration.jpg'
  },
  {
    id: '7',
    title: 'Modern Physics - Quantum Mechanics Basics',
    subject: 'Physics',
    type: 'youtube',
    uploadedAt: '2024-01-14T16:20:00Z',
    uploadedBy: 'Dr. Sharma',
    duration: '55:10',
    downloads: 0,
    views: 89,
    isNew: false,
    description: 'Introduction to quantum mechanics concepts for JEE Advanced preparation.',
    tags: ['Modern Physics', 'Quantum', 'JEE Advanced'],
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
  },
  {
    id: '8',
    title: 'Organic Chemistry Nomenclature Rules',
    subject: 'Chemistry',
    type: 'notes',
    uploadedAt: '2024-01-13T12:00:00Z',
    uploadedBy: 'Prof. Gupta',
    fileSize: '1.5 MB',
    downloads: 134,
    views: 198,
    isNew: false,
    description: 'Complete IUPAC nomenclature rules with examples and practice exercises.',
    tags: ['Nomenclature', 'IUPAC', 'Rules'],
    url: '/materials/chemistry/nomenclature.pdf'
  }
];

export default function StudyMaterialsPage() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const materialsPerPage = 6;

  // Filter and sort materials
  let filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = subjectFilter === 'all' || material.subject === subjectFilter;
    const matchesType = typeFilter === 'all' || material.type === typeFilter;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  // Sort materials
  filteredMaterials = filteredMaterials.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case 'oldest':
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      case 'most-viewed':
        return b.views - a.views;
      case 'most-downloaded':
        return b.downloads - a.downloads;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredMaterials.length / materialsPerPage);
  const startIndex = (currentPage - 1) * materialsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, startIndex + materialsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'notes':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'youtube':
        return <Play className="h-5 w-5" />;
      case 'assignment':
        return <BookOpen className="h-5 w-5" />;
      case 'reference':
        return <FileImage className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'notes':
        return 'bg-red-100 text-red-600';
      case 'video':
        return 'bg-blue-100 text-blue-600';
      case 'youtube':
        return 'bg-red-100 text-red-600';
      case 'assignment':
        return 'bg-green-100 text-green-600';
      case 'reference':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleViewMaterial = (material: StudyMaterial) => {
    if (material.type === 'youtube') {
      window.open(`https://www.youtube.com/watch?v=${material.youtubeId}`, '_blank');
    } else {
      // Navigate to material viewer
      window.open(`/dashboard/coaching/${params.id}/materials/${material.id}/view`, '_blank');
    }
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
              <h1 className="text-3xl font-bold text-brand-navy">Study Materials</h1>
              <p className="text-gray-600">Aakash Institute • JEE Advanced Batch A</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Materials</p>
                  <p className="text-2xl font-bold text-brand-navy">{mockMaterials.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Video Content</p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockMaterials.filter(m => m.type === 'video' || m.type === 'youtube').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {mockMaterials.reduce((sum, m) => sum + m.downloads, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Eye className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {mockMaterials.reduce((sum, m) => sum + m.views, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search materials, descriptions, tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full lg:w-48">
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

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF Documents</SelectItem>
                  <SelectItem value="video">Video Files</SelectItem>
                  <SelectItem value="youtube">YouTube Videos</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="assignment">Assignments</SelectItem>
                  <SelectItem value="reference">References</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  <SelectItem value="most-downloaded">Most Downloaded</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>
                      {getTypeIcon(material.type)}
                    </div>
                    {material.isNew && (
                      <Badge className="bg-green-100 text-green-800">New</Badge>
                    )}
                  </div>

                  {/* Thumbnail for videos */}
                  {(material.type === 'video' || material.type === 'youtube') && material.thumbnailUrl && (
                    <div className="relative">
                      <img 
                        src={material.thumbnailUrl} 
                        alt={material.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-brand-navy mb-2 line-clamp-2">
                      {material.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {material.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {material.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{material.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Subject: {material.subject}</span>
                      <Badge variant="outline">{material.type.toUpperCase()}</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{material.uploadedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(material.uploadedAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{material.views}</span>
                        </div>
                        {material.downloads > 0 && (
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{material.downloads}</span>
                          </div>
                        )}
                      </div>
                      {material.fileSize && (
                        <span className="text-xs">{material.fileSize}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        if (material.type === 'youtube') {
                          window.open(material.url, '_blank');
                        } else {
                          // Navigate to viewer - all materials can be viewed online
                          window.location.href = `/dashboard/coaching/${params.id}/materials/${material.id}/view`;
                        }
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Online
                    </Button>
                    
                    {material.type !== 'youtube' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    
                    {material.type === 'youtube' && (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + materialsPerPage, filteredMaterials.length)} of {filteredMaterials.length} materials
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
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={currentPage === pageNum ? "bg-brand text-brand-navy" : ""}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
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
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
