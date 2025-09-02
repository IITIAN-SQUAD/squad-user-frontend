"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MarkdownEditor from "@/components/ui/markdown-editor";
import { Clock, User, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Question {
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
  tags: string[];
  hasImage?: boolean;
  imageUrl?: string;
}

interface SideBySideEditorProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  placeholder?: string;
  submitLabel?: string;
  title?: string;
  isSubmitting?: boolean;
}

export default function SideBySideEditor({
  question,
  value,
  onChange,
  onSubmit,
  onCancel,
  placeholder = "Write your solution here...",
  submitLabel = "Submit Solution",
  title = "Share Your Solution",
  isSubmitting = false
}: SideBySideEditorProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSize, setImageSize] = useState(400);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleImageSizeChange = (size: number) => {
    setImageSize(size);
  };

  const renderQuestionContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`\n]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm whitespace-pre">$1</code></pre>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="h-[80vh] flex gap-6 p-6">
      {/* Left Side - Question */}
      <div className="w-1/2 flex flex-col">
        <Card className="flex-1 flex flex-col max-h-full">
          <CardHeader className="pb-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{question.subject}</Badge>
              <Badge variant="outline">{question.topic}</Badge>
            </div>
            <CardTitle className="text-xl leading-tight">{question.title}</CardTitle>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={question.author.avatar} />
                  <AvatarFallback className="text-xs">
                    {question.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{question.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{question.author.xp} XP</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto min-h-0">
            <div className="prose prose-sm max-w-none mb-4">
              <div dangerouslySetInnerHTML={{ __html: renderQuestionContent(question.content) }} />
            </div>

            {question.hasImage && question.imageUrl && (
              <div className="mb-4">
                <img 
                  src={question.imageUrl} 
                  alt="Question illustration" 
                  className="rounded border max-w-full h-auto"
                />
              </div>
            )}

            {question.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-1 flex-wrap">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Editor */}
      <div className="w-1/2 flex flex-col">
        <Card className="flex-1 flex flex-col max-h-full">
          <CardHeader className="pb-4 flex-shrink-0">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="flex-1">
              <MarkdownEditor
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                minHeight="300px"
                onImageUpload={handleImageUpload}
                selectedImage={selectedImage}
                onImageRemove={handleImageRemove}
                imageSize={imageSize}
                onImageSizeChange={handleImageSizeChange}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t flex-shrink-0">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button 
                onClick={onSubmit}
                disabled={!value.trim() || isSubmitting}
                className="bg-brand text-gray-900 hover:bg-brand/90"
              >
                {isSubmitting ? "Submitting..." : submitLabel}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
