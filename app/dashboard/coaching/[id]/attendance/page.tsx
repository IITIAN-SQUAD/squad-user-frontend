"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import { 
  ArrowLeft,
  Calendar,
  CheckCircle,
  X,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'holiday';
  subject: string;
  duration: string;
  notes?: string;
}

// Mock attendance data with holidays
const mockAttendanceData: AttendanceRecord[] = [
  { id: '1', date: '2024-01-15', status: 'present', subject: 'Mathematics', duration: '2h', notes: 'Active participation' },
  { id: '2', date: '2024-01-14', status: 'present', subject: 'Physics', duration: '1.5h' },
  { id: '3', date: '2024-01-13', status: 'late', subject: 'Chemistry', duration: '2h', notes: '15 min late' },
  { id: '4', date: '2024-01-12', status: 'absent', subject: 'Mathematics', duration: '2h', notes: 'Medical leave' },
  { id: '5', date: '2024-01-11', status: 'present', subject: 'Physics', duration: '1.5h' },
  { id: '6', date: '2024-01-10', status: 'present', subject: 'Chemistry', duration: '2h' },
  { id: '7', date: '2024-01-09', status: 'present', subject: 'Mathematics', duration: '2h' },
  { id: '8', date: '2024-01-08', status: 'present', subject: 'Physics', duration: '1.5h' },
  { id: '9', date: '2024-01-26', status: 'holiday', subject: 'Republic Day', duration: '0h', notes: 'National Holiday' },
  { id: '10', date: '2024-02-14', status: 'holiday', subject: 'Valentine\'s Day', duration: '0h', notes: 'Institute Holiday' },
  { id: '11', date: '2024-03-08', status: 'holiday', subject: 'Holi', duration: '0h', notes: 'Festival Holiday' },
  { id: '12', date: '2024-03-29', status: 'holiday', subject: 'Good Friday', duration: '0h', notes: 'Religious Holiday' },
  { id: '13', date: '2024-04-14', status: 'holiday', subject: 'Baisakhi', duration: '0h', notes: 'Festival Holiday' },
  { id: '14', date: '2024-05-01', status: 'holiday', subject: 'Labour Day', duration: '0h', notes: 'National Holiday' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'present':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'absent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'late':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'holiday':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCalendarDayColor = (status: string) => {
  switch (status) {
    case 'present':
      return 'bg-green-500 text-white';
    case 'absent':
      return 'bg-red-500 text-white';
    case 'late':
      return 'bg-yellow-500 text-white';
    case 'holiday':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'present':
      return <CheckCircle className="h-4 w-4" />;
    case 'absent':
      return <X className="h-4 w-4" />;
    case 'late':
      return <Clock className="h-4 w-4" />;
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function AttendancePage() {
  const params = useParams();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<AttendanceRecord | null>(null);

  const coachingId = params.id as string;

  // Calculate attendance statistics
  const totalClasses = mockAttendanceData.filter(record => record.status !== 'holiday').length;
  const presentCount = mockAttendanceData.filter(record => record.status === 'present').length;
  const lateCount = mockAttendanceData.filter(record => record.status === 'late').length;
  const absentCount = mockAttendanceData.filter(record => record.status === 'absent').length;
  const holidayCount = mockAttendanceData.filter(record => record.status === 'holiday').length;
  const attendancePercentage = Math.round(((presentCount + lateCount) / totalClasses) * 100);

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getAttendanceForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockAttendanceData.find(record => record.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const attendance = getAttendanceForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      
      days.push(
        <div
          key={day}
          className={`h-12 w-12 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium
            ${attendance ? getCalendarDayColor(attendance.status) : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
            ${isToday ? 'ring-2 ring-brand ring-offset-2' : ''}
          `}
          onClick={() => attendance && setSelectedDay(attendance)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-brand-navy">Attendance Calendar</h1>
              <p className="text-gray-600">Track your class attendance and participation</p>
            </div>
          </div>
        </div>

        {/* Attendance Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Overall</p>
                  <p className="text-lg font-bold text-brand-navy">{attendancePercentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Present</p>
                  <p className="text-lg font-bold text-brand-navy">{presentCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Late</p>
                  <p className="text-lg font-bold text-brand-navy">{lateCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <X className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Absent</p>
                  <p className="text-lg font-bold text-brand-navy">{absentCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Holidays</p>
                  <p className="text-lg font-bold text-brand-navy">{holidayCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Attendance Calendar</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium min-w-[120px] text-center">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {renderCalendar()}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Present</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Late</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Holiday</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Day Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Day Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDay ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-brand-navy">
                        {formatDate(selectedDay.date)}
                      </p>
                      <Badge className={`${getStatusColor(selectedDay.status)} border mt-2`}>
                        {selectedDay.status.charAt(0).toUpperCase() + selectedDay.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Subject:</p>
                        <p className="text-brand-navy">{selectedDay.subject}</p>
                      </div>
                      
                      {selectedDay.duration !== '0h' && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Duration:</p>
                          <p className="text-brand-navy">{selectedDay.duration}</p>
                        </div>
                      )}
                      
                      {selectedDay.notes && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Notes:</p>
                          <p className="text-gray-600 text-sm">{selectedDay.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Click on a calendar day to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Holidays */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Holidays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAttendanceData
                    .filter(record => record.status === 'holiday' && new Date(record.date) > new Date())
                    .slice(0, 5)
                    .map((holiday) => (
                      <div key={holiday.id} className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-brand-navy">{holiday.subject}</p>
                          <p className="text-xs text-gray-600">{formatDate(holiday.date)}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
