"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import MarkdownEditor from "@/components/ui/markdown-editor";
import { 
  ArrowLeft,
  MessageSquare,
  Users,
  Tag,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";

const discussionTypes = [
  { id: "question", name: "Question & Help", description: "Ask for help with specific problems", color: "bg-blue-100 text-blue-800" },
  { id: "concept", name: "Concept Discussion", description: "Discuss theoretical concepts and ideas", color: "bg-green-100 text-green-800" },
  { id: "study-group", name: "Study Group", description: "Organize group study sessions", color: "bg-purple-100 text-purple-800" },
  { id: "exam-prep", name: "Exam Preparation", description: "Share exam strategies and tips", color: "bg-orange-100 text-orange-800" },
  { id: "general", name: "General Discussion", description: "Open discussion about the subject", color: "bg-gray-100 text-gray-800" }
];

const priorities = [
  { id: "low", name: "Low Priority", color: "bg-gray-100 text-gray-800" },
  { id: "medium", name: "Medium Priority", color: "bg-yellow-100 text-yellow-800" },
  { id: "high", name: "High Priority", color: "bg-red-100 text-red-800" },
  { id: "urgent", name: "Urgent", color: "bg-red-200 text-red-900" }
];

export default function CreateDiscussionPage() {
  const params = useParams();
  const router = useRouter();
  const subject = params.subject as string;
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [discussionType, setDiscussionType] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSize, setImageSize] = useState(400);
  const [isCreating, setIsCreating] = useState(false);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleImageSizeChange = (size: number) => {
    setImageSize(size);
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

  const handleCreateDiscussion = async () => {
    if (!title.trim() || !content.trim() || !discussionType) {
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect back to study room
    router.push(`/dashboard/doubts/rooms/${subject}`);
  };

  const isFormValid = title.trim() && content.trim() && discussionType;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/dashboard/doubts/rooms/${subject}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {subject.charAt(0).toUpperCase() + subject.slice(1)} Room
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Start New Discussion</h1>
          <p className="text-muted-foreground">
            Initiate a conversation with your study community. Ask questions, share insights, or organize study sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Discussion Details */}
            <Card>
              <CardHeader>
                <CardTitle>Discussion Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="What would you like to discuss?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {title.length}/100 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Discussion Type <span className="text-red-500">*</span>
                    </label>
                    <Select value={discussionType} onValueChange={setDiscussionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {discussionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Priority Level
                    </label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((prio) => (
                          <SelectItem key={prio.id} value={prio.id}>
                            {prio.name}
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
                    Add up to 5 tags to help others find your discussion
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Content */}
            <Card>
              <CardHeader>
                <CardTitle>Discussion Content</CardTitle>
              </CardHeader>
              <CardContent>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Share your thoughts, questions, or ideas...\n\nYou can:\n- Ask specific questions\n- Share study resources\n- Propose study group sessions\n- Discuss challenging concepts\n- Share exam experiences\n\nUse markdown formatting for better presentation!"
                  minHeight="300px"
                  onImageUpload={handleImageUpload}
                  selectedImage={selectedImage}
                  onImageRemove={handleImageRemove}
                  imageSize={imageSize}
                  onImageSizeChange={handleImageSizeChange}
                />
              </CardContent>
            </Card>

            {/* Create Button */}
            <div className="flex justify-end gap-4">
              <Link href={`/dashboard/doubts/rooms/${subject}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button 
                onClick={handleCreateDiscussion}
                disabled={!isFormValid || isCreating}
                className="bg-brand text-gray-900 hover:bg-brand/90"
              >
                {isCreating ? "Creating..." : "Start Discussion"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Discussion Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Discussion Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {title && (
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  {discussionType && (
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <Badge className={discussionTypes.find(t => t.id === discussionType)?.color}>
                        {discussionTypes.find(t => t.id === discussionType)?.name}
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <Badge className={priorities.find(p => p.id === priority)?.color}>
                      {priorities.find(p => p.id === priority)?.name}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Tags:</span>
                    <span className="font-medium">{tags.length}/5</span>
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Discussion Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Be Respectful</h4>
                  <p className="text-muted-foreground">
                    Treat all community members with respect and kindness.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Stay On Topic</h4>
                  <p className="text-muted-foreground">
                    Keep discussions relevant to the subject and educational goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Share Knowledge</h4>
                  <p className="text-muted-foreground">
                    Help others learn by sharing your insights and experiences.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Use Clear Titles</h4>
                  <p className="text-muted-foreground">
                    Make your discussion easy to find with descriptive titles.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Ask open-ended questions to encourage participation</p>
                <p>• Share personal study experiences and challenges</p>
                <p>• Use images and diagrams to illustrate concepts</p>
                <p>• Respond to comments to keep the discussion active</p>
                <p>• Tag relevant topics to reach the right audience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
