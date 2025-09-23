"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Download, 
  FileText, 
  Lightbulb, 
  MessageSquare, 
  Plus, 
  Save, 
  Sparkles,
  Star,
  Timer,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/editor/RichTextEditor'), { ssr: false });

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
  content: string;
}

interface AIQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const mockMaterial: StudyMaterial = {
  id: '1',
  title: 'Electromagnetic Induction - Complete Notes',
  subject: 'Physics',
  type: 'notes',
  uploadedAt: '2024-01-17T14:30:00Z',
  uploadedBy: 'Dr. Sharma',
  fileSize: '2.4 MB',
  downloads: 23,
  isNew: true,
  content: `
# Electromagnetic Induction

## Introduction
Electromagnetic induction is the process by which a changing magnetic field produces an electric field. This phenomenon was discovered by Michael Faraday in 1831 and forms the basis for many electrical devices including generators, transformers, and inductors.

## Faraday's Laws of Electromagnetic Induction

### First Law
Whenever there is a change in the magnetic flux linked with a closed circuit, an EMF is induced in the circuit.

### Second Law (Faraday-Neumann Law)
The magnitude of the induced EMF is directly proportional to the rate of change of magnetic flux.

**Mathematical Expression:**
ε = -dΦ/dt

Where:
- ε = induced EMF
- Φ = magnetic flux
- t = time

## Lenz's Law
The direction of the induced current is such that it opposes the change that produced it. This is represented by the negative sign in Faraday's law.

## Applications
1. **Electric Generators**: Convert mechanical energy to electrical energy
2. **Transformers**: Change voltage levels in AC circuits  
3. **Induction Motors**: Convert electrical energy to mechanical energy
4. **Eddy Current Brakes**: Used in trains and roller coasters

## Key Formulas
- Magnetic Flux: Φ = B·A·cos(θ)
- Induced EMF: ε = -N(dΦ/dt)
- Motional EMF: ε = Blv (for conductor moving perpendicular to magnetic field)

## Practice Problems
1. A coil of 100 turns has an area of 0.1 m². If the magnetic field changes from 0.2 T to 0.8 T in 0.5 seconds, calculate the induced EMF.
2. A rod of length 0.5 m moves with velocity 10 m/s perpendicular to a magnetic field of 0.3 T. Find the motional EMF.
  `
};

export default function MaterialViewerPage() {
  const params = useParams();
  const router = useRouter();
  const [material] = useState<StudyMaterial>(mockMaterial);
  const [aiSummary, setAiSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<AIQuizQuestion[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateAISummary = async () => {
    setIsGeneratingSummary(true);
    // Simulate AI processing
    setTimeout(() => {
      setAiSummary(`
**Key Concepts Summary:**

• **Electromagnetic Induction**: Process where changing magnetic fields create electric fields
• **Faraday's Laws**: Quantify the relationship between changing magnetic flux and induced EMF
• **Lenz's Law**: Determines the direction of induced current (opposes the change)
• **Applications**: Generators, transformers, motors, and braking systems

**Important Formulas:**
- EMF = -dΦ/dt (Faraday's Law)
- Φ = B·A·cos(θ) (Magnetic Flux)
- EMF = Blv (Motional EMF)

**Study Tips:**
- Focus on understanding the direction of induced current using Lenz's law
- Practice calculating EMF in different scenarios
- Understand real-world applications to grasp practical significance
      `);
      setIsGeneratingSummary(false);
    }, 2000);
  };

  const generateAIQuiz = async () => {
    setIsGeneratingQuiz(true);
    // Simulate AI processing
    setTimeout(() => {
      setQuizQuestions([
        {
          id: '1',
          question: 'According to Faraday\'s law, the induced EMF is proportional to:',
          options: [
            'The magnetic field strength',
            'The rate of change of magnetic flux',
            'The area of the coil',
            'The number of turns in the coil'
          ],
          correctAnswer: 1,
          explanation: 'Faraday\'s law states that EMF = -dΦ/dt, showing it\'s proportional to the rate of change of magnetic flux.'
        },
        {
          id: '2',
          question: 'Lenz\'s law is represented by which part of Faraday\'s equation?',
          options: [
            'The flux term Φ',
            'The time derivative dt',
            'The negative sign (-)',
            'The EMF term ε'
          ],
          correctAnswer: 2,
          explanation: 'The negative sign in Faraday\'s law represents Lenz\'s law, indicating that induced current opposes the change.'
        },
        {
          id: '3',
          question: 'A rod moves perpendicular to a magnetic field. The motional EMF depends on:',
          options: [
            'B, l, and v',
            'Only the magnetic field B',
            'Only the velocity v',
            'B and l only'
          ],
          correctAnswer: 0,
          explanation: 'Motional EMF = Blv, where B is magnetic field, l is length of conductor, and v is velocity.'
        }
      ]);
      setIsGeneratingQuiz(false);
    }, 2500);
  };

  const startQuiz = () => {
    setShowQuizDialog(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const createNoteFromSelection = () => {
    if (selectedText) {
      setNoteTitle(`Notes from ${material.title}`);
      setNoteContent(`<h3>Selected Content:</h3><blockquote>${selectedText}</blockquote><h3>My Notes:</h3><p></p>`);
      setShowNoteDialog(true);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
    }
  };

  const saveNote = () => {
    // In a real app, this would save to the backend
    console.log('Saving note:', { title: noteTitle, content: noteContent });
    setShowNoteDialog(false);
    setNoteTitle('');
    setNoteContent('');
    setSelectedText('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCorrectAnswers = () => {
    return userAnswers.filter((answer, index) => answer === quizQuestions[index]?.correctAnswer).length;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
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
              <h1 className="text-2xl font-bold text-brand-navy">{material.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{material.subject}</span>
                <span>•</span>
                <span>By {material.uploadedBy}</span>
                <span>•</span>
                <span>{formatDate(material.uploadedAt)}</span>
                <span>•</span>
                <span>{material.fileSize}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Bookmark
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Study Material</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose max-w-none"
                  onMouseUp={handleTextSelection}
                  dangerouslySetInnerHTML={{ __html: material.content.replace(/\n/g, '<br>').replace(/#{1,3}\s/g, '<h3>').replace(/<h3>/g, '</p><h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
                {selectedText && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-2">Selected text: "{selectedText}"</p>
                    <Button size="sm" onClick={createNoteFromSelection}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Note from Selection
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Features Sidebar */}
          <div className="space-y-6">
            {/* AI Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>AI Summary</span>
                </CardTitle>
                <CardDescription>
                  Get a concise summary of key concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {aiSummary ? (
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/•/g, '•') }} />
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Generate an AI-powered summary of this material</p>
                    <Button 
                      onClick={generateAISummary} 
                      disabled={isGeneratingSummary}
                      className="w-full"
                    >
                      {isGeneratingSummary ? (
                        <>
                          <Timer className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Generate Summary
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Quiz Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-orange-600" />
                  <span>AI Quiz</span>
                </CardTitle>
                <CardDescription>
                  Test your understanding with AI-generated questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {quizQuestions.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{quizQuestions.length} questions ready</span>
                      <Badge variant="secondary">Ready</Badge>
                    </div>
                    <Button onClick={startQuiz} className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={generateAIQuiz} 
                      disabled={isGeneratingQuiz}
                      className="w-full"
                    >
                      {isGeneratingQuiz ? (
                        <>
                          <Timer className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Regenerate Quiz
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Lightbulb className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Create practice questions from this material</p>
                    <Button 
                      onClick={generateAIQuiz} 
                      disabled={isGeneratingQuiz}
                      className="w-full"
                    >
                      {isGeneratingQuiz ? (
                        <>
                          <Timer className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Generate Quiz
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Quick Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => {
                    setNoteTitle(`Notes: ${material.title}`);
                    setNoteContent('');
                    setShowNoteDialog(true);
                  }}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Note
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quiz Dialog */}
        <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>AI Generated Quiz</DialogTitle>
              <DialogDescription>
                {showResults ? 'Quiz Results' : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
              </DialogDescription>
            </DialogHeader>

            {!showResults && quizQuestions[currentQuestionIndex] && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">{quizQuestions[currentQuestionIndex].question}</h3>
                  <div className="space-y-2">
                    {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start"
                        onClick={() => handleQuizAnswer(index)}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showResults && (
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {getCorrectAnswers()}/{quizQuestions.length}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                  <div className="text-lg font-medium text-blue-800 mt-2">
                    {Math.round((getCorrectAnswers() / quizQuestions.length) * 100)}% Score
                  </div>
                </div>
                
                <div className="space-y-3">
                  {quizQuestions.map((question, index) => (
                    <div key={question.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium">Q{index + 1}</span>
                        {userAnswers[index] === question.correctAnswer ? (
                          <Badge className="bg-green-100 text-green-800">Correct</Badge>
                        ) : (
                          <Badge variant="destructive">Incorrect</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{question.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowQuizDialog(false)}>
                Close
              </Button>
              {showResults && (
                <Button onClick={() => {
                  setCurrentQuestionIndex(0);
                  setUserAnswers([]);
                  setShowResults(false);
                }}>
                  Retake Quiz
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Note Creation Dialog */}
        <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Note</DialogTitle>
              <DialogDescription>
                Add your personal notes and insights
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Note Title</label>
                <Input
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Enter note title..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content</label>
                {isClient && (
                  <RichTextEditor
                    content={noteContent}
                    onChange={setNoteContent}
                  />
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveNote}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
