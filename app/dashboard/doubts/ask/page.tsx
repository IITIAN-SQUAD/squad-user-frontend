"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MarkdownEditor from "@/components/ui/markdown-editor";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Bold, 
  Italic, 
  Code, 
  Image as ImageIcon,
  X,
  Plus,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

const subjects = [
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "mathematics", name: "Mathematics" },
  { id: "biology", name: "Biology" },
  { id: "english", name: "English" }
];

const topicsBySubject = {
  physics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
  chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"],
  mathematics: ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics", "Probability"],
  biology: ["Cell Biology", "Genetics", "Ecology", "Human Physiology", "Plant Biology"],
  english: ["Grammar", "Literature", "Comprehension", "Writing Skills", "Vocabulary"]
};

export default function AskDoubtPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSize, setImageSize] = useState(400);
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleImageSizeChange = (size: number) => {
    setImageSize(size);
  };

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('doubt-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm whitespace-pre">$1</code></pre>')
      .replace(/\n/g, '<br>');
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !subject || !topic) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to doubt detail page (mock ID)
    router.push('/dashboard/doubts/1');
  };

  const isFormValid = title.trim() && content.trim() && subject && topic;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/doubts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Doubts
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">Ask a Doubt</h1>
          <p className="text-muted-foreground">
            Get help from the community by asking a clear, detailed question.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="What's your question? Be specific and clear..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {title.length}/150 characters
                  </p>
                </div>

                {/* Subject and Topic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Select value={subject} onValueChange={(value) => {
                      setSubject(value);
                      setTopic(""); // Reset topic when subject changes
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subj) => (
                          <SelectItem key={subj.id} value={subj.id}>
                            {subj.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Topic <span className="text-red-500">*</span>
                    </label>
                    <Select value={topic} onValueChange={setTopic} disabled={!subject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {subject && topicsBySubject[subject as keyof typeof topicsBySubject]?.map((topicName) => (
                          <SelectItem key={topicName} value={topicName}>
                            {topicName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Tags (Optional)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1"
                      maxLength={20}
                    />
                    <Button 
                      onClick={addTag} 
                      disabled={!newTag.trim() || tags.length >= 5}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add up to 5 tags to help others find your question
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Description</CardTitle>
              </CardHeader>
              <CardContent>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Describe your problem in detail...\n\nInclude:\n- What you've tried so far\n- Where you're getting stuck\n- Any specific concepts you need help with\n\nYou can use markdown formatting:\n- **bold text**\n- *italic text*\n- `inline code`\n- Code blocks\n- Lists and more!"
                  minHeight="300px"
                  onImageUpload={handleImageUpload}
                  selectedImage={selectedImage}
                  onImageRemove={handleImageRemove}
                  imageSize={imageSize}
                  onImageSizeChange={handleImageSizeChange}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/dashboard/doubts">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="bg-brand text-gray-900 hover:bg-brand/90"
              >
                {isSubmitting ? "Posting..." : "Post Question"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Great Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Be Specific</h4>
                  <p className="text-muted-foreground">
                    Include the exact problem you're facing and what you've tried.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Show Your Work</h4>
                  <p className="text-muted-foreground">
                    Share your approach and where you got stuck.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Use Formatting</h4>
                  <p className="text-muted-foreground">
                    Format equations, code, and important points clearly.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Add Context</h4>
                  <p className="text-muted-foreground">
                    Mention the source, difficulty level, or exam relevance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Be respectful and constructive</p>
                <p>• Don't ask for direct answers to homework</p>
                <p>• Search existing questions first</p>
                <p>• Accept helpful answers</p>
                <p>• Give back by helping others</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
