"use client";

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '../../../../../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, FileText, Video, StickyNote, Plus, X, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('../../../../../../../components/editor/RichTextEditor'), { ssr: false });

interface Material {
  id: string;
  title: string;
  subject: string;
  type: 'pdf' | 'video' | 'notes';
  uploadedBy: string;
  uploadedAt: string;
  description: string;
  tags: string[];
  url?: string;
  content?: string;
}

const mockMaterials: Material[] = [
  {
    id: 'mat-001',
    title: 'Organic Chemistry - Reaction Mechanisms',
    subject: 'Chemistry',
    type: 'pdf',
    uploadedAt: '2024-01-15T10:30:00Z',
    uploadedBy: 'Dr. Sharma',
    tags: ['organic', 'reactions', 'mechanisms', 'jee'],
    description: 'Comprehensive guide to organic chemistry reaction mechanisms including SN1, SN2, E1, and E2 reactions.',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'mat-002',
    title: 'Introduction to Electromagnetism',
    subject: 'Physics',
    type: 'video',
    uploadedAt: '2024-01-14T11:00:00Z',
    uploadedBy: 'Prof. Verma',
    tags: ['physics', 'electromagnetism', 'video-lecture'],
    description: 'An introductory video lecture on the core concepts of electromagnetism, including Maxwell\'s equations.',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'mat-003',
    title: 'Quick Notes on Integral Calculus',
    subject: 'Mathematics',
    type: 'notes',
    uploadedAt: '2024-01-13T09:00:00Z',
    uploadedBy: 'Mr. Singh',
    tags: ['math', 'calculus', 'quick-notes', 'formulas'],
    description: 'A summary of important formulas and concepts in integral calculus for quick revision.',
    content: `<h2>Key Formulas for Integral Calculus</h2>\n\n<p><strong>1. Power Rule:</strong><br/>∫xⁿ dx = (xⁿ⁺¹ / (n+1)) + C, for n ≠ -1</p>\n\n<p><strong>2. Integration by Parts:</strong><br/>∫u dv = uv - ∫v du</p>\n\n<p><strong>3. Trigonometric Integrals:</strong><br/>- ∫sin(x) dx = -cos(x) + C<br/>- ∫cos(x) dx = sin(x) + C<br/>- ∫tan(x) dx = ln|sec(x)| + C</p>\n\n<p>This is a placeholder for rich text notes. It can include markdown, code blocks, and images.</p>`
  }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const PdfViewer = ({ material }: { material: Material }) => {
  const [zoom, setZoom] = useState(100);
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between py-3'>
        <CardTitle className='text-lg'>Document Viewer</CardTitle>
        <div className="flex items-center justify-center space-x-1">
          <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.max(50, z - 10))}><ZoomOut className="h-4 w-4" /></Button>
          <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.min(200, z + 10))}><ZoomIn className="h-4 w-4" /></Button>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <Button variant="ghost" size="icon" onClick={() => window.open(material.url, '_blank')}><Maximize className="h-4 w-4" /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 border-t">
        <div className="w-full h-[75vh] bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          <iframe src={material.url} title={material.title} className="w-full h-full" style={{ transform: `scale(${zoom/100})`, transformOrigin: 'center' }} />
        </div>
      </CardContent>
    </Card>
  );
};

const VideoPlayer = ({ material }: { material: Material }) => (
  <Card>
    <CardContent className="p-0 aspect-video">
        <video src={material.url} controls className="w-full h-full rounded-lg" />
    </CardContent>
  </Card>
);

const NotesViewer = ({ material }: { material: Material }) => (
  <Card>
    <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
    <CardContent>
      <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: material.content?.replace(/\\n/g, '') || '' }} />
    </CardContent>
  </Card>
);

export default function MaterialViewerPage() {
  const params = useParams();
  const [isClient, setIsClient] = useState(false);
  const [showFloatingNote, setShowFloatingNote] = useState(false);
  const [floatingNotePosition, setFloatingNotePosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [existingNotes, setExistingNotes] = useState([
    { id: '1', title: 'Physics Notes', content: 'Key concepts from electromagnetic induction...' },
    { id: '2', title: 'Chemistry Notes', content: 'Important organic reactions...' },
    { id: '3', title: 'Math Formulas', content: 'Integration formulas and techniques...' },
    { id: '4', title: 'Thermodynamics', content: 'Laws of thermodynamics and applications...' },
    { id: '5', title: 'Organic Reactions', content: 'Mechanism and stereochemistry...' }
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const material = useMemo(() => {
    return mockMaterials.find(m => m.id === params.materialId) || mockMaterials[0];
  }, [params.materialId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - floatingNotePosition.x,
      y: e.clientY - floatingNotePosition.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setFloatingNotePosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const saveNote = () => {
    if (noteTitle.trim()) {
      if (selectedNoteId) {
        // Update existing note
        setExistingNotes(prev => prev.map(note => 
          note.id === selectedNoteId 
            ? { ...note, title: noteTitle, content: noteContent }
            : note
        ));
      } else {
        // Create new note
        const newNote = {
          id: Date.now().toString(),
          title: noteTitle,
          content: noteContent
        };
        setExistingNotes(prev => [...prev, newNote]);
      }
      
      setNoteTitle('');
      setNoteContent('');
      setSelectedNoteId('');
      setShowFloatingNote(false);
    }
  };

  const clearNote = () => {
    setNoteTitle('');
    setNoteContent('');
    setSelectedNoteId('');
  };

  const selectExistingNote = (note: any) => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setSelectedNoteId(note.id);
    setShowFloatingNote(true);
  };

  const renderContent = () => {
    switch (material.type) {
      case 'pdf':
        return <PdfViewer material={material} />;
      case 'video':
        return <VideoPlayer material={material} />;
      case 'notes':
        return <NotesViewer material={material} />;
      default:
        return <Card><CardContent><p>Unsupported material type.</p></CardContent></Card>;
    }
  };

  const getIcon = () => {
    switch (material.type) {
      case 'pdf': return <FileText className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'notes': return <StickyNote className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Link href={`/dashboard/coaching/${params.id}/materials`}>
            <Button variant="ghost" size="sm" className="mb-4 text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Materials
            </Button>
          </Link>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <div className="text-brand-navy">{getIcon()}</div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-navy truncate">{material.title}</h1>
              </div>
              <p className="text-sm sm:text-base text-gray-500 ml-6 sm:ml-8">{material.subject} • Uploaded by {material.uploadedBy} on {formatDate(material.uploadedAt)}</p>
            </div>
            <div className="flex items-center gap-2">
              {material.url &&
                <Button asChild variant="outline">
                  <a href={material.url} download target="_blank">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              }
            </div>
          </div>
        </div>

        <div className="min-h-[60vh] sm:min-h-[75vh]">{renderContent()}</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Material Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>{material.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {material.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="capitalize">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Notes Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-brand" />
                  Quick Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setShowFloatingNote(true)}
                  className="w-full bg-brand text-brand-navy hover:bg-brand/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Note
                </Button>
                
                {existingNotes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Notes ({existingNotes.length}):</p>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {existingNotes.map((note) => (
                        <div 
                          key={note.id}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-brand/10 dark:hover:bg-brand/20 transition-colors border border-transparent hover:border-brand/20"
                          onClick={() => selectExistingNote(note)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-brand-navy dark:text-gray-200 truncate">{note.title}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">{note.content.replace(/<[^>]*>/g, '')}</p>
                            </div>
                            <FileText className="h-4 w-4 text-brand ml-2 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {existingNotes.length === 0 && (
                  <div className="text-center py-4">
                    <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No notes yet</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Create your first note to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Note Card */}
        {showFloatingNote && (
          <div 
            className="fixed bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 w-80 sm:w-96"
            style={{ 
              left: `${Math.min(floatingNotePosition.x, window.innerWidth - 320)}px`, 
              top: `${Math.min(floatingNotePosition.y, window.innerHeight - 400)}px`,
              maxHeight: '400px'
            }}
          >
            {/* Draggable Header */}
            <div 
              className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 p-2 sm:p-3 cursor-move flex items-center justify-between rounded-t-lg"
              onMouseDown={handleMouseDown}
            >
              <h3 className="font-medium text-brand-navy dark:text-gray-200 text-sm sm:text-base">
                {selectedNoteId ? 'Edit Note' : 'Add Note'}
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFloatingNote(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            {/* Note Content */}
            <div className="p-3 sm:p-4 space-y-3">
              <Input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title..."
                className="text-sm"
              />
              
              <div className="h-24 sm:h-32 overflow-y-auto">
                {isClient && (
                  <RichTextEditor
                    content={noteContent}
                    onChange={setNoteContent}
                  />
                )}
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="border-t border-gray-200 dark:border-gray-600 p-2 sm:p-3 flex justify-end space-x-2 rounded-b-lg bg-gray-50 dark:bg-gray-800">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearNote}
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                Clear
              </Button>
              <Button 
                size="sm" 
                onClick={saveNote} 
                disabled={!noteTitle.trim()}
                className="bg-brand text-brand-navy hover:bg-brand/90 text-xs sm:text-sm px-2 sm:px-3"
              >
                Save
              </Button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
