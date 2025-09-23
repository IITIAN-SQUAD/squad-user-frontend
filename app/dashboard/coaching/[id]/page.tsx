"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { 
  ArrowLeft,
  Bell,
  Bookmark,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  MapPin,
  PlusCircle,
  Search,
  Star,
  TrendingUp,
  Users,
  Video,
  Wallet,
  X,
  Save,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/editor/RichTextEditor'), { ssr: false });

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'global' | 'batch';
  priority: 'low' | 'medium' | 'high';
  publishedAt: string;
  isRead: boolean;
  attachments?: string[];
}

interface TestResult {
  id: string;
  testName: string;
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  rank: number;
  totalStudents: number;
  conductedAt: string;
  status: 'completed' | 'pending_result';
}

interface UpcomingTest {
  id: string;
  testName: string;
  subject: string;
  scheduledAt: string;
  duration: number;
  totalMarks: number;
  syllabus: string[];
  type: 'online' | 'centre';
  location?: string;
}

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'notes' | 'assignment' | 'reference' | 'video';
  uploadedAt: string;
  uploadedBy: string;
  fileSize: string;
  downloads: number;
  isNew: boolean;
  notes?: string;
  isBookmarked?: boolean;
}


interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  method: 'Online' | 'Cash';
  status: 'Success' | 'Pending' | 'Failed';
  transactionId?: string;
}

interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  userAnswer?: number;
  isCorrect?: boolean;
}

const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Important: Mock Test Schedule Updated',
    content: 'The mock test scheduled for January 25th has been rescheduled to January 27th due to technical maintenance. Please note the new timing: 10:00 AM - 1:00 PM.',
    type: 'batch',
    priority: 'high',
    publishedAt: '2024-01-18T09:00:00Z',
    isRead: false,
    attachments: ['revised_schedule.pdf']
  },
  {
    id: '2',
    title: 'New Study Material Available',
    content: 'Physics chapter on Electromagnetic Induction notes and practice problems have been uploaded. Please download and complete the assignments before next class.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-17T14:30:00Z',
    isRead: true
  },
  {
    id: '3',
    title: 'Holiday Notice - Republic Day',
    content: 'All classes will remain closed on January 26th in observance of Republic Day. Regular classes will resume from January 27th.',
    type: 'global',
    priority: 'low',
    publishedAt: '2024-01-15T10:00:00Z',
    isRead: true
  },
  {
    id: '4',
    title: 'Weekend Doubt Clearing Session',
    content: 'A special doubt clearing session for Physics and Chemistry will be held this Saturday from 10 AM to 1 PM.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-14T11:00:00Z',
    isRead: false
  },
  {
    id: '5',
    title: 'Parent-Teacher Meeting Scheduled',
    content: 'The quarterly Parent-Teacher meeting is scheduled for Saturday, February 3rd. Please inform your parents.',
    type: 'global',
    priority: 'high',
    publishedAt: '2024-01-13T15:00:00Z',
    isRead: true
  },
  {
    id: '6',
    title: 'Fee Payment Reminder',
    content: 'The last date for payment of the next installment is January 31st. Please pay on time to avoid late fees.',
    type: 'batch',
    priority: 'high',
    publishedAt: '2024-01-12T10:00:00Z',
    isRead: false
  },
  {
    id: '7',
    title: 'Library Books Return Reminder',
    content: 'Please return all borrowed library books by January 25th for the annual stock verification.',
    type: 'global',
    priority: 'low',
    publishedAt: '2024-01-11T13:00:00Z',
    isRead: true
  },
  {
    id: '8',
    title: 'Special Class on Calculus',
    content: 'A special class on advanced topics in Calculus will be conducted by Mr. Sharma on Sunday at 9 AM.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-10T18:00:00Z',
    isRead: false
  },
  {
    id: '9',
    title: 'New Timetable for Evening Batch',
    content: 'The evening batch timings have been revised. The new timetable is available in the study materials section.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-09T12:00:00Z',
    isRead: true,
    attachments: ['new_timetable.pdf']
  },
  {
    id: '10',
    title: 'Guest Lecture on AI',
    content: 'A guest lecture on the future of Artificial Intelligence is scheduled for all students on February 1st.',
    type: 'global',
    priority: 'low',
    publishedAt: '2024-01-08T16:00:00Z',
    isRead: true
  },
  {
    id: '11',
    title: 'Results for Weekly Test 3 Declared',
    content: 'The results for the weekly test conducted on January 7th have been declared. Check the Tests & Results tab for your score.',
    type: 'batch',
    priority: 'medium',
    publishedAt: '2024-01-07T14:00:00Z',
    isRead: false
  },
    {
    id: '12',
    title: 'Additional Practice Sheets for Chemistry',
    content: 'Additional practice sheets for Organic Chemistry have been uploaded. Please solve them before the next class.',
    type: 'batch',
    priority: 'low',
    publishedAt: '2024-01-06T17:00:00Z',
    isRead: true
  }
];

const mockTestResults: TestResult[] = [
  {
    id: '1',
    testName: 'Physics Unit Test - Mechanics',
    subject: 'Physics',
    totalMarks: 100,
    obtainedMarks: 87,
    percentage: 87,
    rank: 3,
    totalStudents: 45,
    conductedAt: '2024-01-15T10:00:00Z',
    status: 'completed'
  },
  {
    id: '2',
    testName: 'Chemistry Mock Test - Organic',
    subject: 'Chemistry',
    totalMarks: 150,
    obtainedMarks: 128,
    percentage: 85.3,
    rank: 5,
    totalStudents: 45,
    conductedAt: '2024-01-10T14:00:00Z',
    status: 'completed'
  },
  {
    id: '3',
    testName: 'Mathematics Weekly Test',
    subject: 'Mathematics',
    totalMarks: 80,
    obtainedMarks: 68,
    percentage: 85,
    rank: 7,
    totalStudents: 45,
    conductedAt: '2024-01-12T09:00:00Z',
    status: 'completed'
  }
];

const mockUpcomingTests: UpcomingTest[] = [
  {
    id: '1',
    testName: 'JEE Advanced Mock Test - 1',
    subject: 'All Subjects',
    scheduledAt: '2024-01-27T10:00:00Z',
    duration: 180,
    totalMarks: 300,
    syllabus: ['Mechanics', 'Thermodynamics', 'Organic Chemistry', 'Coordinate Geometry'],
    type: 'centre',
    location: 'Aakash Institute, Sector 14, Gurgaon'
  },
  {
    id: '2',
    testName: 'Physics Chapter Test - Waves',
    subject: 'Physics',
    scheduledAt: '2024-01-30T14:00:00Z',
    duration: 90,
    totalMarks: 100,
    syllabus: ['Wave Motion', 'Sound Waves', 'Doppler Effect'],
    type: 'online'
  }
];

const mockStudyMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Electromagnetic Induction - Complete Notes',
    subject: 'Physics',
    type: 'notes',
    uploadedAt: '2024-01-17T14:30:00Z',
    uploadedBy: 'Dr. Sharma',
    fileSize: '2.4 MB',
    downloads: 23,
    isNew: true,
    notes: 'Initial notes on electromagnetic induction.',
    isBookmarked: true
  },
  {
    id: '2',
    title: 'Organic Chemistry Practice Problems',
    subject: 'Chemistry',
    type: 'assignment',
    uploadedAt: '2024-01-16T11:00:00Z',
    uploadedBy: 'Prof. Gupta',
    fileSize: '1.8 MB',
    downloads: 31,
    isNew: false,
    isBookmarked: false
  },
  {
    id: '3',
    title: 'Coordinate Geometry Video Lecture',
    subject: 'Mathematics',
    type: 'video',
    uploadedAt: '2024-01-15T16:00:00Z',
    uploadedBy: 'Mr. Patel',
    fileSize: '45.2 MB',
    downloads: 18,
    isNew: false,
    isBookmarked: true
  }
];


const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Physics - Kinematics Formulas',
    content: '<h2>Key Formulas</h2><p>1. v = u + at</p><p>2. s = ut + 0.5at^2</p><p>3. v^2 = u^2 + 2as</p>',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T11:30:00Z',
  },
  {
    id: '2',
    title: 'Chemistry - Organic Reactions to Memorize',
    content: '<h3>Important Reactions</h3><ul><li>Wurtz Reaction</li><li>Friedel-Crafts Acylation</li><li>Cannizzaro Reaction</li></ul>',
    createdAt: '2024-01-17T15:20:00Z',
    updatedAt: '2024-01-17T15:20:00Z',
  },
  {
    id: '3',
    title: 'Maths - Integration by Parts',
    content: '<p>The formula for integration by parts is: ∫u dv = uv - ∫v du. Remember to choose <b>u</b> using the LIATE rule (Logarithmic, Inverse, Algebraic, Trigonometric, Exponential).</p>',
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-16T12:00:00Z',
  },
];

const mockPayments: Payment[] = [
  {
    id: 'pay1',
    amount: 15000,
    date: '2024-07-10T10:30:00Z',
    method: 'Online',
    status: 'Success',
    transactionId: 'TXN123456789',
  },
  {
    id: 'pay2',
    amount: 5000,
    date: '2024-06-20T14:00:00Z',
    method: 'Cash',
    status: 'Success',
  },
];

const mockTestQuestions: { [key: string]: TestQuestion[] } = {
  '1': [
    {
      id: 'q1',
      question: 'A particle moves in a straight line with constant acceleration. If its initial velocity is 10 m/s and it travels 100 m in 5 seconds, what is its acceleration?',
      options: ['2 m/s²', '4 m/s²', '6 m/s²', '8 m/s²'],
      correctAnswer: 2,
      explanation: 'Using s = ut + ½at², where s = 100m, u = 10m/s, t = 5s. Solving: 100 = 10(5) + ½a(25), so a = 6 m/s²',
      subject: 'Physics',
      difficulty: 'medium',
      userAnswer: 2,
      isCorrect: true
    },
    {
      id: 'q2',
      question: 'What is the derivative of sin(x²)?',
      options: ['cos(x²)', '2x cos(x²)', 'sin(2x)', '2x sin(x²)'],
      correctAnswer: 1,
      explanation: 'Using chain rule: d/dx[sin(x²)] = cos(x²) × d/dx[x²] = cos(x²) × 2x = 2x cos(x²)',
      subject: 'Mathematics',
      difficulty: 'medium',
      userAnswer: 1,
      isCorrect: true
    }
  ],
  '2': [
    {
      id: 'q3',
      question: 'Which of the following is an example of nucleophilic substitution?',
      options: ['CH₃Cl + OH⁻ → CH₃OH + Cl⁻', 'C₂H₄ + Br₂ → C₂H₄Br₂', 'CH₄ + Cl₂ → CH₃Cl + HCl', 'C₆H₆ + Br₂ → C₆H₅Br + HBr'],
      correctAnswer: 0,
      explanation: 'Nucleophilic substitution involves a nucleophile (OH⁻) attacking and replacing a leaving group (Cl⁻)',
      subject: 'Chemistry',
      difficulty: 'medium',
      userAnswer: 0,
      isCorrect: true
    }
  ]
};

export default function CoachingDashboard() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentNoticePage, setCurrentNoticePage] = useState(1);
  const noticesPerPage = 10;
  const [materialSort, setMaterialSort] = useState('newest');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [showMaterialViewer, setShowMaterialViewer] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [notices, setNotices] = useState(mockNotices);
  const [studyMaterials, setStudyMaterials] = useState(mockStudyMaterials);
  const [activeNote, setActiveNote] = useState('');
  const [notes, setNotes] = useState(mockNotes);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);
  const [showBookmarkedMaterials, setShowBookmarkedMaterials] = useState(false);
  const [noticeFilter, setNoticeFilter] = useState('all');
  const [testFilter, setTestFilter] = useState('all');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddNewNote = () => {
    setEditingNote(null);
    setNoteTitle('');
    setNoteContent('');
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  const coachingInfo = {
    name: 'Aakash Institute',
    batchName: 'JEE Advanced Batch A',
    standard: 'Class 12',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    totalStudents: 45,
    myRank: 12,
    attendance: 92,
    avgScore: 85,
    studyHours: 42,
    nextClass: '2024-08-15T10:00:00Z'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes': return <FileText className="h-4 w-4" />;
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Eye className="h-4 w-4" />;
      case 'reference': return <Star className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };



  const handleSaveStudyMaterialNote = (materialId: string) => {
    setStudyMaterials(studyMaterials.map(m => m.id === materialId ? { ...m, notes: activeNote } : m));
    alert('Note saved!');
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert('Title and content cannot be empty.');
      return;
    }

    if (editingNote) {
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? { ...note, title: noteTitle, content: noteContent, updatedAt: new Date().toISOString() }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteTitle,
        content: noteContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }
    
    // Clear the form after saving
    setEditingNote(null);
    setNoteTitle('');
    setNoteContent('');
  };

  const toggleMaterialBookmark = (materialId: string) => {
    setStudyMaterials(studyMaterials.map(material => 
      material.id === materialId 
        ? { ...material, isBookmarked: !material.isBookmarked }
        : material
    ));
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleMarkAsRead = (noticeId: string) => {
    setNotices(notices.map(n => n.id === noticeId ? { ...n, isRead: true } : n));
  };

  const openMaterialViewer = (material: StudyMaterial) => {
    setSelectedMaterial(material);
    setActiveNote(material.notes || '');
    setShowMaterialViewer(true);
  };

  const openTestDetails = (test: TestResult) => {
    setSelectedTest(test);
    setShowTestDetails(true);
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy">{coachingInfo.name}</h1>
            <p className="text-gray-600">{coachingInfo.batchName} • {coachingInfo.standard}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-500">My Rank</p>
              <p className="text-xl sm:text-2xl font-bold text-brand-navy">#{coachingInfo.myRank}</p>
            </div>
            <Link href={`/dashboard/coaching/${params.id}/fees`} className="w-full sm:w-auto">
              <Button className="bg-brand text-brand-navy hover:bg-brand/90 px-4 sm:px-6 py-2 w-full sm:w-auto">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Fee Management</span>
                <span className="sm:hidden">Fees</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1 sm:p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Attendance</p>
                  <p className="text-lg sm:text-2xl font-bold text-brand-navy">{coachingInfo.attendance}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1 sm:p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Avg Score</p>
                  <p className="text-lg sm:text-2xl font-bold text-brand-navy">{coachingInfo.avgScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1 sm:p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Study Hours</p>
                  <p className="text-lg sm:text-2xl font-bold text-brand-navy">{coachingInfo.studyHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1 sm:p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">Next Test</p>
                  <p className="text-sm sm:text-lg font-bold text-brand-navy">{formatDate(mockUpcomingTests[0].scheduledAt)}</p>
                  <Badge variant={mockUpcomingTests[0].type === 'online' ? 'secondary' : 'default'} className="text-xs">{mockUpcomingTests[0].type}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm px-1 sm:px-3">Overview</TabsTrigger>
            <TabsTrigger value="notices" className="text-xs sm:text-sm px-1 sm:px-3">Notices</TabsTrigger>
            <TabsTrigger value="tests" className="text-xs sm:text-sm px-1 sm:px-3">Tests</TabsTrigger>
            <TabsTrigger value="materials" className="text-xs sm:text-sm px-1 sm:px-3">Materials</TabsTrigger>
            <TabsTrigger value="notes" className="text-xs sm:text-sm px-1 sm:px-3">Notes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Notices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Notices</span>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('notices')}>
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {notices.slice(0, 3).map((notice) => (
                    <div key={notice.id} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className={`p-1 rounded-full ${notice.isRead ? 'bg-gray-200' : 'bg-brand'}`}>
                        <Bell className={`h-3 w-3 ${notice.isRead ? 'text-gray-500' : 'text-brand-navy'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-brand-navy text-sm sm:text-base truncate">{notice.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{notice.content}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-2">
                          <Badge className={`${getPriorityColor(notice.priority)} text-xs w-fit`}>
                            {notice.priority}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatDate(notice.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Test Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Test Results</span>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('tests')}>
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTestResults.slice(0, 3).map((test) => (
                    <div key={test.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-brand-navy">{test.testName}</h4>
                        {test.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      {test.status === 'completed' ? (
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-xs text-gray-500">Score</p>
                            <p className={`font-bold ${getPerformanceColor(test.percentage)}`}>
                              {test.percentage}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Rank</p>
                            <p className="font-bold text-brand-navy">#{test.rank}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Marks</p>
                            <p className="font-bold text-brand-navy">{test.obtainedMarks}/{test.totalMarks}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 text-center">Result pending...</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Tests */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockUpcomingTests.map((test) => (
                    <div key={test.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-brand-navy">{test.testName}</h4>
                        <Badge variant={test.type === 'online' ? 'secondary' : 'default'}>{test.type}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{formatDate(test.scheduledAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{test.duration} minutes • {test.totalMarks} marks</span>
                        </div>
                        {test.type === 'centre' && test.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{test.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">All Notices</h2>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Select value={noticeFilter} onValueChange={setNoticeFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {notices.slice((currentNoticePage - 1) * noticesPerPage, currentNoticePage * noticesPerPage).map((notice) => (
                <Card key={notice.id} className={`transition-all ${!notice.isRead ? 'bg-white' : 'bg-gray-50'}`}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`p-2 rounded-full mt-1 ${!notice.isRead ? 'bg-brand/10' : 'bg-gray-200'}`}>
                      <Bell className={`h-5 w-5 ${!notice.isRead ? 'text-brand' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${!notice.isRead ? 'text-brand-navy' : 'text-gray-600'}`}>{notice.title}</h3>
                        {!notice.isRead && (
                          <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notice.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Read
                          </Button>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${!notice.isRead ? 'text-gray-700' : 'text-gray-500'}`}>{notice.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notice.priority)}>{notice.priority}</Badge>
                          <Badge variant="outline">{notice.type === 'global' ? 'Global' : 'Batch'}</Badge>
                          {notice.attachments && (
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              <Download className="h-4 w-4 mr-1" />
                              {notice.attachments.join(', ')}
                            </Button>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(notice.publishedAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-600">
                Page {currentNoticePage} of {Math.ceil(notices.length / noticesPerPage)}
              </span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentNoticePage(prev => Math.max(prev - 1, 1))}
                  disabled={currentNoticePage === 1}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentNoticePage(prev => Math.min(prev + 1, Math.ceil(notices.length / noticesPerPage)))}
                  disabled={currentNoticePage === Math.ceil(notices.length / noticesPerPage)}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Track your progress across all tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Score Progress Line Chart */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-brand-navy">Score Progress (Last 6 Months)</h3>
                    <div className="h-64 w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        <defs>
                          <linearGradient id="scoreTestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Grid */}
                        {[0, 1, 2, 3, 4].map(i => (
                          <line key={i} x1="50" y1={40 + i * 30} x2="350" y2={40 + i * 30} stroke="#e5e7eb" strokeWidth="1"/>
                        ))}
                        {[0, 1, 2, 3, 4, 5].map(i => (
                          <line key={i} x1={50 + i * 60} y1="40" x2={50 + i * 60} y2="160" stroke="#e5e7eb" strokeWidth="1"/>
                        ))}
                        
                        {/* Score line */}
                        <path
                          d="M50,120 L110,100 L170,90 L230,85 L290,80 L350,75"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M50,120 L110,100 L170,90 L230,85 L290,80 L350,75 L350,160 L50,160 Z"
                          fill="url(#scoreTestGradient)"
                        />
                        
                        {/* Data points */}
                        {[
                          {x: 50, y: 120, score: 65},
                          {x: 110, y: 100, score: 72},
                          {x: 170, y: 90, score: 78},
                          {x: 230, y: 85, score: 82},
                          {x: 290, y: 80, score: 85},
                          {x: 350, y: 75, score: 91}
                        ].map((point, i) => (
                          <g key={i}>
                            <circle cx={point.x} cy={point.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2"/>
                            <text x={point.x} y={point.y - 10} fontSize="10" fill="#3b82f6" textAnchor="middle" fontWeight="bold">{point.score}%</text>
                          </g>
                        ))}
                        
                        {/* Labels */}
                        <text x="25" y="45" fontSize="12" fill="#6b7280" textAnchor="middle">100</text>
                        <text x="25" y="75" fontSize="12" fill="#6b7280" textAnchor="middle">75</text>
                        <text x="25" y="105" fontSize="12" fill="#6b7280" textAnchor="middle">50</text>
                        <text x="25" y="135" fontSize="12" fill="#6b7280" textAnchor="middle">25</text>
                        <text x="25" y="165" fontSize="12" fill="#6b7280" textAnchor="middle">0</text>
                        
                        {/* Month labels */}
                        {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((month, i) => (
                          <text key={i} x={50 + i * 60} y="180" fontSize="11" fill="#6b7280" textAnchor="middle">{month}</text>
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Rank Progress Line Chart */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-brand-navy">Rank Progress (Last 6 Months)</h3>
                    <div className="h-64 w-full bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        <defs>
                          <linearGradient id="rankTestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Grid */}
                        {[0, 1, 2, 3, 4].map(i => (
                          <line key={i} x1="50" y1={40 + i * 30} x2="350" y2={40 + i * 30} stroke="#e5e7eb" strokeWidth="1"/>
                        ))}
                        {[0, 1, 2, 3, 4, 5].map(i => (
                          <line key={i} x1={50 + i * 60} y1="40" x2={50 + i * 60} y2="160" stroke="#e5e7eb" strokeWidth="1"/>
                        ))}
                        
                        {/* Rank line (inverted - lower rank is better) */}
                        <path
                          d="M50,140 L110,130 L170,115 L230,105 L290,95 L350,85"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M50,140 L110,130 L170,115 L230,105 L290,95 L350,85 L350,160 L50,160 Z"
                          fill="url(#rankTestGradient)"
                        />
                        
                        {/* Data points */}
                        {[
                          {x: 50, y: 140, rank: 25},
                          {x: 110, y: 130, rank: 20},
                          {x: 170, y: 115, rank: 15},
                          {x: 230, y: 105, rank: 12},
                          {x: 290, y: 95, rank: 9},
                          {x: 350, y: 85, rank: 7}
                        ].map((point, i) => (
                          <g key={i}>
                            <circle cx={point.x} cy={point.y} r="4" fill="#10b981" stroke="white" strokeWidth="2"/>
                            <text x={point.x} y={point.y - 10} fontSize="10" fill="#10b981" textAnchor="middle" fontWeight="bold">#{point.rank}</text>
                          </g>
                        ))}
                        
                        {/* Labels */}
                        <text x="25" y="45" fontSize="12" fill="#6b7280" textAnchor="middle">1</text>
                        <text x="25" y="75" fontSize="12" fill="#6b7280" textAnchor="middle">10</text>
                        <text x="25" y="105" fontSize="12" fill="#6b7280" textAnchor="middle">20</text>
                        <text x="25" y="135" fontSize="12" fill="#6b7280" textAnchor="middle">30</text>
                        <text x="25" y="165" fontSize="12" fill="#6b7280" textAnchor="middle">40</text>
                        
                        {/* Month labels */}
                        {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((month, i) => (
                          <text key={i} x={50 + i * 60} y="180" fontSize="11" fill="#6b7280" textAnchor="middle">{month}</text>
                        ))}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(mockTestResults.reduce((acc, test) => acc + test.percentage, 0) / mockTestResults.length)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      #{Math.round(mockTestResults.reduce((acc, test) => acc + test.rank, 0) / mockTestResults.length)}
                    </div>
                    <div className="text-sm text-gray-600">Average Rank</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{mockTestResults.length}</div>
                    <div className="text-sm text-gray-600">Tests Taken</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {mockTestResults.filter(test => test.percentage >= 75).length}
                    </div>
                    <div className="text-sm text-gray-600">Above 75%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Test Results Table */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Test Name</th>
                        <th scope="col" className="px-6 py-3">Subject</th>
                        <th scope="col" className="px-6 py-3">Marks</th>
                        <th scope="col" className="px-6 py-3">Rank</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTestResults.map((test) => (
                        <tr key={test.id} className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{test.testName}</td>
                          <td className="px-6 py-4">{test.subject}</td>
                          <td className="px-6 py-4">{test.status === 'completed' ? `${test.obtainedMarks}/${test.totalMarks}` : '-'}</td>
                          <td className="px-6 py-4">{test.status === 'completed' ? `#${test.rank}` : '-'}</td>
                          <td className="px-6 py-4">{formatDate(test.conductedAt)}</td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              disabled={test.status !== 'completed' && new Date(test.conductedAt) > new Date()}
                              onClick={() => openTestDetails(test)}
                            >
                              {test.status === 'completed' || new Date(test.conductedAt) <= new Date() ? 'View Details' : 'Not Available'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Study Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
                <Input
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={materialFilter} onValueChange={setMaterialFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={materialSort} onValueChange={setMaterialSort}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="downloads">Downloads</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant={showBookmarkedMaterials ? "default" : "outline"}
                  onClick={() => setShowBookmarkedMaterials(!showBookmarkedMaterials)}
                  className="flex items-center space-x-2 w-full sm:w-auto"
                >
                  <Bookmark className={`h-4 w-4 ${showBookmarkedMaterials ? 'fill-current' : ''}`} />
                  <span>Bookmarked</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyMaterials
                .filter(material => showBookmarkedMaterials ? material.isBookmarked : true)
                .filter(material => materialFilter === 'all' || material.subject === materialFilter)
                .filter(material => searchTerm === '' || material.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-brand/10 rounded-lg">
                          {getTypeIcon(material.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-brand-navy">{material.title}</h4>
                          <p className="text-sm text-gray-600">{material.subject}</p>
                        </div>
                      </div>
                      {material.isNew && (
                        <Badge className="bg-green-100 text-green-800">New</Badge>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center justify-between">
                        <span>Uploaded by: {material.uploadedBy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Size: {material.fileSize}</span>
                        <span>{material.downloads} downloads</span>
                      </div>
                      <div>
                        <span>Date: {formatDate(material.uploadedAt)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-brand text-brand-navy hover:bg-brand/90">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Link href={`/dashboard/coaching/${params.id}/materials/${material.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => toggleMaterialBookmark(material.id)}
                        className="p-2"
                      >
                        <Bookmark className={`h-4 w-4 ${material.isBookmarked ? 'fill-current text-brand' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

            
          {/* My Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Notes List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-brand-navy">My Notes</h2>
                  <Button onClick={handleAddNewNote} size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </div>
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {notes.map(note => (
                    <Card 
                      key={note.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        editingNote?.id === note.id ? 'ring-2 ring-brand border-brand' : ''
                      }`}
                      onClick={() => handleEditNote(note)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium text-brand-navy truncate mb-2">{note.title}</h4>
                        <div
                          className="text-sm text-gray-600 line-clamp-2 prose prose-sm"
                          dangerouslySetInnerHTML={{ __html: note.content }}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">
                            {formatDate(note.updatedAt)}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNote(note.id);
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Note Editor */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {editingNote ? 'Edit Note' : 'Create New Note'}
                      </CardTitle>
                      {editingNote && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingNote(null);
                            setNoteTitle('');
                            setNoteContent('');
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 h-[calc(100%-120px)]">
                    <div>
                      <Input
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        placeholder="Note title..."
                        className="text-lg font-medium"
                      />
                    </div>
                    <div className="h-[calc(100%-60px)]">
                      {isClient && (
                        <div className="h-full border rounded-md">
                          <RichTextEditor
                            content={noteContent}
                            onChange={setNoteContent}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingNote(null);
                        setNoteTitle('');
                        setNoteContent('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveNote}
                      disabled={!noteTitle.trim() || !noteContent.trim()}
                      className="bg-brand text-brand-navy hover:bg-brand/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Note
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Material Viewer Dialog */}
        <Dialog open={showMaterialViewer} onOpenChange={setShowMaterialViewer}>
          <DialogContent className="max-w-4xl p-0">
            {selectedMaterial && (
              <div className="max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
                  <DialogHeader>
                    <DialogTitle className="text-lg">{selectedMaterial.title}</DialogTitle>
                    <DialogDescription className="text-sm">
                      {selectedMaterial.subject} • {selectedMaterial.uploadedBy} • {formatDate(selectedMaterial.uploadedAt)}
                    </DialogDescription>
                  </DialogHeader>
                  <Button variant="ghost" size="icon" onClick={() => setShowMaterialViewer(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-6">
                  {selectedMaterial.type === 'video' ? (
                    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                      <video className="w-full h-full" controls autoPlay>
                        <source src="/videos/sample.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="prose max-w-none">
                        {/* PDF or other content would be rendered here */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">My Notes</h3>
                        {isClient && <RichTextEditor 
                          content={activeNote}
                          onChange={setActiveNote}
                        />}
                        <Button 
                          className="mt-2"
                          onClick={() => handleSaveStudyMaterialNote(selectedMaterial.id)}
                        >
                          Save Note
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Test Details Dialog */}
        <Dialog open={showTestDetails} onOpenChange={setShowTestDetails}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            {selectedTest && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-brand-navy">
                    {selectedTest.testName} - Detailed Analysis
                  </DialogTitle>
                  <DialogDescription>
                    {selectedTest.subject} • Conducted on {formatDate(selectedTest.conductedAt)}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Test Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedTest.obtainedMarks}/{selectedTest.totalMarks}</div>
                      <div className="text-sm text-gray-600">Marks Obtained</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getPerformanceColor(selectedTest.percentage)}`}>
                        {selectedTest.percentage}%
                      </div>
                      <div className="text-sm text-gray-600">Percentage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">#{selectedTest.rank}</div>
                      <div className="text-sm text-gray-600">Your Rank</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedTest.totalStudents}</div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                  </div>

                  {/* Questions and Solutions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-brand-navy">Questions & Solutions</h3>
                    {mockTestQuestions[selectedTest.id]?.map((question, index) => (
                      <Card key={question.id} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base">
                              Question {index + 1} - {question.subject}
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                              <Badge variant={question.difficulty === 'easy' ? 'secondary' : question.difficulty === 'medium' ? 'default' : 'destructive'}>
                                {question.difficulty}
                              </Badge>
                              {question.isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="font-medium mb-3">{question.question}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {question.options.map((option, optIndex) => (
                                <div 
                                  key={optIndex}
                                  className={`p-2 rounded border ${
                                    optIndex === question.correctAnswer 
                                      ? 'bg-green-100 border-green-300 text-green-800' 
                                      : optIndex === question.userAnswer && optIndex !== question.correctAnswer
                                      ? 'bg-red-100 border-red-300 text-red-800'
                                      : 'bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                                  {optIndex === question.correctAnswer && <span className="ml-2 text-green-600">✓ Correct</span>}
                                  {optIndex === question.userAnswer && optIndex !== question.correctAnswer && <span className="ml-2 text-red-600">✗ Your Answer</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                            <p className="text-blue-700">{question.explanation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )) || (
                      <div className="text-center py-8 text-gray-500">
                        <p>Questions and solutions will be available after the test is completed.</p>
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowTestDetails(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Note Editor Dialog */}
        <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNote ? 'Edit Note' : 'Add New Note'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input 
                placeholder="Note title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
              {isClient && <RichTextEditor
                content={noteContent}
                onChange={setNoteContent}
              />}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNoteDialog(false)}>Cancel</Button>
              <Button onClick={handleSaveNote}>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </DashboardLayout>
  );
}
