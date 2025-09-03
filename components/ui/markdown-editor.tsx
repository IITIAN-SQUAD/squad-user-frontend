"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bold, 
  Italic, 
  Code, 
  List, 
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
  Eye,
  Edit,
  Upload,
  Minus,
  Plus
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onImageUpload?: (file: File) => void;
  selectedImage?: File | null;
  onImageRemove?: () => void;
  imageSize?: number;
  onImageSizeChange?: (size: number) => void;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "300px",
  onImageUpload,
  selectedImage,
  onImageRemove,
  imageSize = 400,
  onImageSizeChange
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    const newText = beforeText + before + textToInsert + after + afterText;
    onChange(newText);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Code
      .replace(/`([^`\n]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600">$1</code>')
      
      // Code blocks with language support
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
        const language = lang ? ` data-language="${lang}"` : '';
        return `<pre class="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto my-4"${language}><code class="font-mono text-sm whitespace-pre">${code}</code></pre>`;
      })
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded border my-2" />')
      
      // Lists
      .replace(/^\* (.+)$/gm, '<li class="ml-4">• $1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$1. $2</li>')
      
      // Blockquotes
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>')
      
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-2">')
      .replace(/\n/g, '<br>');
  };

  const toolbarButtons = [
    {
      icon: Bold,
      title: "Bold",
      action: () => insertText('**', '**', 'bold text')
    },
    {
      icon: Italic,
      title: "Italic", 
      action: () => insertText('*', '*', 'italic text')
    },
    {
      icon: Code,
      title: "Inline Code",
      action: () => insertText('`', '`', 'code')
    },
    {
      icon: Quote,
      title: "Blockquote",
      action: () => insertText('\n> ', '', 'quote text')
    },
    {
      icon: List,
      title: "Bullet List",
      action: () => insertText('\n* ', '', 'list item')
    },
    {
      icon: ListOrdered,
      title: "Numbered List", 
      action: () => insertText('\n1. ', '', 'list item')
    },
    {
      icon: Link,
      title: "Link",
      action: () => insertText('[', '](url)', 'link text')
    }
  ];

  return (
    <div className="space-y-4 w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg border overflow-x-auto">
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('**', '**', 'bold text')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <Bold className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('*', '*', 'italic text')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <Italic className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('`', '`', 'code')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <Code className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div className="w-px h-4 sm:h-6 bg-gray-300 flex-shrink-0" />

        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('- ', '', 'list item')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <List className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('1. ', '', 'numbered item')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <ListOrdered className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('> ', '', 'quote')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <Quote className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div className="w-px h-4 sm:h-6 bg-gray-300 flex-shrink-0" />

        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText('[', '](url)', 'link text')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <Link className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          >
            <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div className="flex-1 min-w-0" />

        <Button
          type="button"
          variant={isPreview ? "default" : "ghost"}
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 flex-shrink-0"
        >
          {isPreview ? <Edit className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
          <span className="hidden sm:inline">{isPreview ? 'Write' : 'Preview'}</span>
        </Button>
      </div>

      {/* Editor/Preview Area */}
      <div className="border rounded-md flex flex-col w-full overflow-hidden" style={{ minHeight, maxHeight: "none" }}>
        {!isPreview ? (
          <>
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 resize-none border-0 focus:ring-0 rounded-b-none w-full"
              style={{ minHeight: `calc(${minHeight} - 2rem)` }}
            />
            
            {/* Image Upload Area */}
            {selectedImage && (
              <div className="border-t p-2 sm:p-4 bg-gray-50 max-h-48 sm:max-h-64 overflow-y-auto">
                <div className="flex flex-col gap-2 sm:gap-4">
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <span className="text-sm font-medium text-gray-700">Uploaded Image</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Size:</span>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onImageSizeChange?.(Math.max(200, imageSize - 50))}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs text-gray-600 min-w-[3rem] text-center">{imageSize}px</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onImageSizeChange?.(Math.min(600, imageSize + 50))}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={onImageRemove}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-2 bg-white overflow-hidden">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded preview"
                        style={{ width: `${Math.min(imageSize, 300)}px`, maxWidth: '100%' }}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div 
            className="flex-1 p-2 sm:p-4 prose prose-sm max-w-none overflow-y-auto w-full"
            style={{ minHeight: `calc(${minHeight} - 2rem)`, maxHeight: "400px" }}
          >
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
          </div>
        )}
      </div>

      {/* Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Image Controls */}
      {selectedImage && (
        <div className="space-y-2 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <ImageIcon className="h-4 w-4" />
              <span>Image: {selectedImage.name}</span>
            </div>
            {onImageRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onImageRemove}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            )}
          </div>
          
          {onImageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm">Size:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onImageSizeChange(Math.max(100, imageSize - 50))}
                className="h-6 w-6 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm w-16 text-center">{imageSize}px</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onImageSizeChange(Math.min(800, imageSize + 50))}
                className="h-6 w-6 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Markdown Help */}
      {!isPreview && (
        <div className="text-xs text-gray-500 space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Formatting:</strong> **bold**, *italic*, `code`
            </div>
            <div>
              <strong>Headers:</strong> # H1, ## H2, ### H3
            </div>
            <div>
              <strong>Lists:</strong> * bullet, 1. numbered
            </div>
            <div>
              <strong>Links:</strong> [text](url), ![alt](image-url)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
