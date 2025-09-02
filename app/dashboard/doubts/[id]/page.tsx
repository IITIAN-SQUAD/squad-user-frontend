"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SideBySideEditor from "@/components/ui/side-by-side-editor";
import { 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Share, 
  Flag,
  Clock,
  CheckCircle,
  User,
  Upload,
  Bold,
  Italic,
  Code,
  Image as ImageIcon,
  ArrowLeft
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Solution {
  id: string;
  author: {
    name: string;
    avatar?: string;
    xp: number;
  };
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  hasImage?: boolean;
  imageUrl?: string;
}

interface Doubt {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  author: {
    name: string;
    avatar?: string;
    xp: number;
  };
  createdAt: Date;
  upvotes: number;
  solutionCount: number;
  isResolved: boolean;
  tags: string[];
  hasImage?: boolean;
  imageUrl?: string;
}

const mockDoubt: Doubt = {
  id: "1",
  title: "How to solve projectile motion problems with air resistance?",
  content: "I'm struggling with projectile motion when air resistance is considered. The equations become too complex. Can someone explain a systematic approach?\n\nSpecifically, I need help with:\n- Setting up the differential equations\n- Choosing appropriate approximation methods\n- Understanding when to use numerical vs analytical solutions\n\nI've attached a sample problem that I'm working on.",
  subject: "Physics",
  topic: "Mechanics",
  author: {
    name: "Rahul Kumar",
    xp: 1250
  },
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  upvotes: 15,
  solutionCount: 3,
  isResolved: false,
  tags: ["projectile", "mechanics", "air-resistance"],
  hasImage: true,
  imageUrl: "/api/placeholder/600/400"
};

const mockSolutions: Solution[] = [
  {
    id: "1",
    author: {
      name: "Dr. Ankit Sharma",
      xp: 3500
    },
    content: "Great question! Air resistance makes projectile motion significantly more complex. Here's a systematic approach:\n\n**Step 1: Set up the equations**\nFor air resistance proportional to velocity:\n```\nm(dv_x/dt) = -bv_x\nm(dv_y/dt) = -mg - bv_y\n```\n\n**Step 2: Choose your method**\n- For small air resistance: Perturbation methods\n- For moderate resistance: Numerical integration (Runge-Kutta)\n- For terminal velocity cases: Analytical approximations\n\n**Step 3: Implementation**\nI'll show you the numerical approach using Python...",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    upvotes: 28,
    downvotes: 2,
    isAccepted: true,
    hasImage: true,
    imageUrl: "/api/placeholder/500/300"
  },
  {
    id: "2",
    author: {
      name: "Vikash Singh",
      xp: 2100
    },
    content: "I faced the same problem! Here's what helped me understand:\n\nThe key insight is that air resistance creates **non-linear differential equations**. You can't solve them analytically in most cases.\n\n**Quick approximation method:**\nFor small angles and moderate air resistance, you can use:\n- Range ≈ (v₀²sin(2θ)/g) × (1 - 2bv₀cos(θ)/mg)\n- This gives you a good first approximation\n\n**For exact solutions:** Use numerical methods like Euler's method or RK4.",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    upvotes: 12,
    downvotes: 0,
    isAccepted: false
  },
  {
    id: "3",
    author: {
      name: "Priya Reddy",
      xp: 1800
    },
    content: "Adding to the previous answers - here are some **practical tips**:\n\n1. **Start simple**: Begin with horizontal motion only\n2. **Check units**: Always verify your drag coefficient units\n3. **Use dimensionless variables**: Makes the math cleaner\n4. **Validate**: Compare with no-drag case as a sanity check\n\nFor your specific problem, I'd recommend starting with the quadratic drag model since it's more realistic for higher velocities.",
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    upvotes: 8,
    downvotes: 1,
    isAccepted: false
  }
];

export default function DoubtDetailPage() {
  const params = useParams();
  const [doubt] = useState<Doubt>(mockDoubt);
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions);
  const [newSolution, setNewSolution] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSize, setImageSize] = useState(400);
  const [votes, setVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleVote = (solutionId: string, type: 'up' | 'down') => {
    const currentVote = votes[solutionId];
    const newVote = currentVote === type ? null : type;
    
    setVotes(prev => ({
      ...prev,
      [solutionId]: newVote
    }));

    setSolutions(prev => prev.map(solution => {
      if (solution.id === solutionId) {
        let upvotes = solution.upvotes;
        let downvotes = solution.downvotes;

        // Remove previous vote
        if (currentVote === 'up') upvotes--;
        if (currentVote === 'down') downvotes--;

        // Add new vote
        if (newVote === 'up') upvotes++;
        if (newVote === 'down') downvotes++;

        return { ...solution, upvotes, downvotes };
      }
      return solution;
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const adjustImageSize = (delta: number) => {
    setImageSize(prev => Math.max(100, Math.min(600, prev + delta)));
  };

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('solution-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = newSolution.substring(start, end);
    const beforeText = newSolution.substring(0, start);
    const afterText = newSolution.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    setNewSolution(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const renderPreview = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm whitespace-pre">$1</code></pre>')
      .replace(/\n/g, '<br>');
  };

  const handleSubmitSolution = () => {
    if (!newSolution.trim()) return;

    const solution: Solution = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        xp: 1500
      },
      content: newSolution,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
      hasImage: !!selectedImage,
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined
    };

    setSolutions(prev => [solution, ...prev]);
    setNewSolution("");
    setSelectedImage(null);
    setShowEditor(false);
    setIsPreview(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard/doubts">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Doubts
            </Button>
          </Link>
        </div>

        {/* Doubt Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{doubt.subject}</Badge>
                  <Badge variant="outline">{doubt.topic}</Badge>
                  {doubt.isResolved && (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolved
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold mb-4">{doubt.title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {doubt.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{doubt.author.name}</span>
                <span>{doubt.author.xp} XP</span>
              </div>
              <span>•</span>
              <span>{formatDistanceToNow(doubt.createdAt, { addSuffix: true })}</span>
              <span>•</span>
              <span>{doubt.upvotes} upvotes</span>
              <span>•</span>
              <span>{solutions.length} solutions</span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose prose-sm max-w-none mb-4">
              <div dangerouslySetInnerHTML={{ __html: renderPreview(doubt.content) }} />
            </div>

            {doubt.hasImage && (
              <div className="mb-4">
                <img 
                  src={doubt.imageUrl} 
                  alt="Doubt illustration" 
                  className="rounded border max-w-full h-auto"
                />
              </div>
            )}

            <div className="flex gap-1 mb-4">
              {doubt.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                Upvote
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4 mr-1" />
                Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Solutions Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {solutions.length} Solution{solutions.length !== 1 ? 's' : ''}
          </h2>
          
          <Dialog open={showEditor} onOpenChange={setShowEditor}>
            <DialogTrigger asChild>
              <Button className="bg-brand text-gray-900 hover:bg-brand/90">
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Solution
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[90vh] p-0">
              <SideBySideEditor
                question={{
                  id: doubt.id,
                  title: doubt.title,
                  content: doubt.content,
                  subject: doubt.subject,
                  topic: doubt.topic,
                  author: doubt.author,
                  createdAt: doubt.createdAt,
                  tags: doubt.tags,
                  hasImage: doubt.hasImage,
                  imageUrl: doubt.imageUrl
                }}
                value={newSolution}
                onChange={setNewSolution}
                onSubmit={handleSubmitSolution}
                onCancel={() => setShowEditor(false)}
                placeholder="Explain your solution step by step...\n\nYou can use markdown formatting:\n- **bold text**\n- *italic text*\n- `inline code`\n- Code blocks\n- Lists and more!"
                submitLabel="Submit Solution"
                title="Share Your Solution"
                isSubmitting={false}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Solutions List */}
        <div className="space-y-4">
          {solutions.map((solution) => (
            <Card key={solution.id} className={`${solution.isAccepted ? 'ring-2 ring-green-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(solution.id, 'up')}
                      className={`h-8 w-8 p-0 ${votes[solution.id] === 'up' ? 'text-green-600' : ''}`}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <span className="font-medium text-sm">
                      {solution.upvotes - solution.downvotes}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(solution.id, 'down')}
                      className={`h-8 w-8 p-0 ${votes[solution.id] === 'down' ? 'text-red-600' : ''}`}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {solution.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{solution.author.name}</span>
                      <span className="text-sm text-muted-foreground">{solution.author.xp} XP</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(solution.createdAt, { addSuffix: true })}
                      </span>
                      {solution.isAccepted && (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accepted
                        </Badge>
                      )}
                    </div>

                    <div className="prose prose-sm max-w-none mb-4">
                      <div dangerouslySetInnerHTML={{ __html: renderPreview(solution.content) }} />
                    </div>

                    {solution.hasImage && (
                      <div className="mb-4">
                        <img 
                          src={solution.imageUrl} 
                          alt="Solution illustration" 
                          className="rounded border max-w-full h-auto"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                      {!solution.isAccepted && (
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark as Answer
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
