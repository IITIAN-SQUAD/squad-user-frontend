"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import { 
  ArrowLeft,
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Calendar,
  User,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'global' | 'batch';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  publishedAt: string;
  publishedBy: string;
  isRead: boolean;
  attachments?: string[];
  category: 'announcement' | 'schedule' | 'exam' | 'fee' | 'general';
  expiresAt?: string;
}

const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Important: Mock Test Schedule Updated for February',
    content: 'Due to the upcoming board exam schedule, we have revised the mock test dates for February. The JEE Advanced Mock Test - 4 originally scheduled for February 25th has been moved to February 27th. All other tests remain as per the original schedule. Students are advised to update their preparation timeline accordingly. The revised schedule has been uploaded to the study materials section.',
    type: 'batch',
    priority: 'high',
    publishedAt: '2024-01-22T09:00:00Z',
    publishedBy: 'Dr. Sharma',
    isRead: false,
    attachments: ['revised_test_schedule_feb.pdf', 'preparation_guidelines.pdf'],
    category: 'schedule',
    expiresAt: '2024-02-28T23:59:59Z'
  },
  {
    id: '2',
    title: 'New Study Material: Organic Chemistry Reaction Mechanisms',
    content: 'We have uploaded comprehensive video lectures on organic chemistry reaction mechanisms. This includes detailed explanations of SN1, SN2, E1, and E2 reactions with solved examples. The material is particularly important for the upcoming unit test on organic chemistry scheduled for February 5th. Students are encouraged to watch the videos and attempt the practice problems provided.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-21T14:30:00Z',
    publishedBy: 'Prof. Gupta',
    isRead: true,
    category: 'announcement'
  },
  {
    id: '3',
    title: 'Fee Payment Reminder - Third Installment Due',
    content: 'This is a friendly reminder that the third installment of your course fees (₹15,000) is due on February 15th, 2024. You can pay online through the fee management section or visit the accounts office during working hours (9 AM - 5 PM). Late payment charges of ₹500 will be applicable after the due date. For any queries regarding fee payment, please contact the accounts department.',
    type: 'batch',
    priority: 'high',
    publishedAt: '2024-01-20T11:00:00Z',
    publishedBy: 'Accounts Department',
    isRead: false,
    category: 'fee',
    expiresAt: '2024-02-15T23:59:59Z'
  },
  {
    id: '4',
    title: 'Holiday Notice - Republic Day',
    content: 'All classes and administrative offices will remain closed on January 26th, 2024, in observance of Republic Day. Regular classes will resume from January 27th as per the normal schedule. The online doubt clearing session scheduled for January 26th has been rescheduled to January 28th at 4:00 PM. We wish all students and faculty a Happy Republic Day!',
    type: 'global',
    priority: 'low',
    publishedAt: '2024-01-19T10:00:00Z',
    publishedBy: 'Administration',
    isRead: true,
    category: 'announcement'
  },
  {
    id: '5',
    title: 'Physics Lab Session - Electromagnetic Induction Experiment',
    content: 'A special physics lab session on electromagnetic induction experiments has been scheduled for January 30th from 2:00 PM to 4:00 PM in Lab-2. This hands-on session will cover Faraday\'s law verification, Lenz\'s law demonstration, and transformer working principles. Students must bring their lab manuals and safety equipment. Attendance is mandatory as this will be part of your internal assessment.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-18T16:45:00Z',
    publishedBy: 'Dr. Sharma',
    isRead: true,
    category: 'schedule'
  },
  {
    id: '6',
    title: 'JEE Advanced Mock Test - 3 Results Declared',
    content: 'The results for JEE Advanced Mock Test - 3 conducted on January 15th have been declared. Students can view their detailed performance analysis, rank, and subject-wise breakdown in the test results section. The average score for this test was 68.5% with the highest score being 94.2%. Individual feedback sessions with subject teachers can be scheduled through the student portal.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-17T12:30:00Z',
    publishedBy: 'Examination Cell',
    isRead: false,
    category: 'exam'
  },
  {
    id: '7',
    title: 'Parent-Teacher Meeting Scheduled',
    content: 'A parent-teacher meeting has been scheduled for February 10th, 2024, from 10:00 AM to 4:00 PM. Parents can discuss their ward\'s academic progress, performance in tests, and future preparation strategy with subject teachers. Prior appointment booking is required through the parent portal or by calling the reception. Meeting slots are available in 30-minute intervals.',
    type: 'global',
    priority: 'medium',
    publishedAt: '2024-01-16T09:15:00Z',
    publishedBy: 'Academic Coordinator',
    isRead: true,
    category: 'general'
  },
  {
    id: '8',
    title: 'Mathematics Doubt Clearing Session - Calculus',
    content: 'A special doubt clearing session on calculus topics (differentiation and integration) will be conducted on January 25th from 6:00 PM to 8:00 PM. Students can submit their doubts in advance through the doubt portal or bring their questions to the session. This session is particularly recommended for students who found difficulty in the recent mathematics unit test.',
    type: 'batch',
    priority: 'low',
    publishedAt: '2024-01-15T14:20:00Z',
    publishedBy: 'Mr. Patel',
    isRead: true,
    category: 'general'
  }
];

export default function NoticesPage() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showNoticeDialog, setShowNoticeDialog] = useState(false);
  
  const noticesPerPage = 10;

  // Filter notices
  const filteredNotices = mockNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.publishedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notice.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || notice.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || notice.category === categoryFilter;
    const matchesRead = readFilter === 'all' || 
                       (readFilter === 'read' && notice.isRead) ||
                       (readFilter === 'unread' && !notice.isRead);
    
    return matchesSearch && matchesType && matchesPriority && matchesCategory && matchesRead;
  });

  // Sort by newest first
  const sortedNotices = filteredNotices.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Pagination
  const totalPages = Math.ceil(sortedNotices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const paginatedNotices = sortedNotices.slice(startIndex, startIndex + noticesPerPage);

  // Statistics
  const totalNotices = mockNotices.length;
  const unreadNotices = mockNotices.filter(n => !n.isRead).length;
  const urgentNotices = mockNotices.filter(n => n.priority === 'urgent' || n.priority === 'high').length;
  const expiringSoon = mockNotices.filter(n => {
    if (!n.expiresAt) return false;
    const expiryDate = new Date(n.expiresAt);
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    return expiryDate <= threeDaysFromNow;
  }).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Info className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'announcement': 'bg-blue-100 text-blue-800',
      'schedule': 'bg-purple-100 text-purple-800',
      'exam': 'bg-orange-100 text-orange-800',
      'fee': 'bg-green-100 text-green-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return <Badge className={`text-xs px-1.5 py-0.5 ${colors[category as keyof typeof colors]}`}>{category.charAt(0).toUpperCase()}</Badge>;
  };

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setShowNoticeDialog(true);
    // Mark as read if not already read
    if (!notice.isRead) {
      notice.isRead = true;
    }
  };

  const isExpiringSoon = (notice: Notice) => {
    if (!notice.expiresAt) return false;
    const expiryDate = new Date(notice.expiresAt);
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    return expiryDate <= threeDaysFromNow;
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
              <h1 className="text-3xl font-bold text-brand-navy">Notices</h1>
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
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Notices</p>
                  <p className="text-2xl font-bold text-brand-navy">{totalNotices}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-red-600">{unreadNotices}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Urgent/High Priority</p>
                  <p className="text-2xl font-bold text-yellow-600">{urgentNotices}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-purple-600">{expiringSoon}</p>
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
                    placeholder="Search notices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="batch">Batch</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="schedule">Schedule</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="fee">Fee</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>

              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notices List */}
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {paginatedNotices.map((notice) => (
                <li 
                  key={notice.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50/80 transition-colors ${
                    !notice.isRead ? 'bg-yellow-50/50' : ''
                  }`}
                  onClick={() => handleNoticeClick(notice)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getPriorityColor(notice.priority)}`}>
                        {getPriorityIcon(notice.priority)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          {!notice.isRead && <div className="w-2 h-2 bg-brand rounded-full mr-2 flex-shrink-0"></div>}
                          <p className={`text-sm truncate ${!notice.isRead ? 'font-semibold text-brand-navy' : 'font-medium text-gray-800'}`}>
                            {notice.title}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span className="flex items-center"><User className="h-3 w-3 mr-1" />{notice.publishedBy}</span>
                          <span>•</span>
                          <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{new Date(notice.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                      {notice.attachments && notice.attachments.length > 0 && (
                        <Download className="h-4 w-4 text-gray-400" />
                      )}
                      <Badge variant={notice.priority === 'high' || notice.priority === 'urgent' ? 'destructive' : 'secondary'} className="capitalize">
                        {notice.priority}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border">
              Showing <span className="font-medium text-brand-navy">{startIndex + 1}</span> to <span className="font-medium text-brand-navy">{Math.min(startIndex + noticesPerPage, sortedNotices.length)}</span> of <span className="font-medium text-brand-navy">{sortedNotices.length}</span> notices
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="hover:bg-brand hover:text-brand-navy transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum 
                        ? "bg-brand text-brand-navy hover:bg-brand/90 min-w-[2.5rem]" 
                        : "hover:bg-brand hover:text-brand-navy transition-colors min-w-[2.5rem]"}
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
                className="hover:bg-brand hover:text-brand-navy transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Notice Detail Dialog */}
        <Dialog open={showNoticeDialog} onOpenChange={setShowNoticeDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedNotice?.title}</span>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(selectedNotice?.priority || 'low')}>
                    {selectedNotice?.priority}
                  </Badge>
                  <Badge variant="outline">
                    {selectedNotice?.type === 'global' ? 'Global' : 'Batch'}
                  </Badge>
                  {selectedNotice && getCategoryBadge(selectedNotice.category)}
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{selectedNotice?.publishedBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedNotice && formatDate(selectedNotice.publishedAt)}</span>
                  </div>
                  {selectedNotice?.expiresAt && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Expires: {formatDate(selectedNotice.expiresAt)}</span>
                    </div>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedNotice?.content}
                </p>
              </div>

              {selectedNotice?.attachments && selectedNotice.attachments.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Attachments:</h4>
                  <div className="space-y-2">
                    {selectedNotice.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Download className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{attachment}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
