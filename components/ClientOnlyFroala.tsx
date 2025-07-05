'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Textarea } from "@/components/ui/textarea";
import { useContent } from '@/hooks/useContent';

// Dynamically import Froala Editor with strict client-side only rendering
const FroalaEditor = dynamic(
  async () => {
    // Import styles when the component is loaded
    await import('froala-editor/css/froala_style.min.css');
    await import('froala-editor/css/froala_editor.pkgd.min.css');
    
    // Import the actual editor component
    const { default: RealFroalaEditor } = await import('react-froala-wysiwyg');
    return RealFroalaEditor;
  },
  {
    ssr: false,
    loading: () => <div className="min-h-[300px] border rounded p-4 bg-gray-50">Loading editor...</div>
  }
);

interface ClientOnlyFroalaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export default function ClientOnlyFroala({ content, onContentChange }: ClientOnlyFroalaProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [editorFailed, setEditorFailed] = useState(false);
  const { uploadAsset } = useContent();

  // Make sure we're only rendering on client side
  useEffect(() => {
    setIsMounted(true);
    
    // Set a failsafe timer for editor initialization
    const failsafeTimer = setTimeout(() => {
      if (!document.querySelector('.fr-element')) {
        console.warn('Froala editor failed to initialize properly');
        setEditorFailed(true);
      }
    }, 3000);
    
    return () => clearTimeout(failsafeTimer);
  }, []);

  // Handle image upload
  const handleImageUpload = async (images: File[]) => {
    if (!images.length) return false;
    
    try {
      const image = images[0];
      console.log('Uploading image to blog folder:', image.name);
      const imageUrl = await uploadAsset(image, 'blog');
      
      return imageUrl || false;
    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    }
  };

  // Froala editor configuration
  const editorConfig = {
    placeholderText: 'Start writing your blog post...',
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'subscript',
          'superscript',
          'fontFamily',
          'fontSize',
          'textColor',
          'backgroundColor',
          'clearFormatting',
        ],
      },
      moreParagraph: {
        buttons: [
          'alignLeft',
          'alignCenter',
          'alignRight',
          'alignJustify',
          'formatOL',
          'formatUL',
          'paragraphFormat',
          'lineHeight',
          'outdent',
          'indent',
          'quote',
        ],
      },
      moreRich: {
        buttons: [
          'insertLink',
          'insertImage',
          'insertTable',
          'emoticons',
          'specialCharacters',
          'insertHR',
        ],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'html'],
        align: 'right',
        buttonsVisible: 2,
      },
    },
    events: {
      'image.beforeUpload': async function (images: File[]) {
        // Custom upload handler
        const imageUrl = await handleImageUpload(images);
        if (imageUrl) {
          // Use the editor instance to insert the image
          // @ts-ignore - Froala editor types are not complete
          this.image && this.image.insert(imageUrl, null, null, this.image.get());
        }
        return false; // Stop default upload
      },
      'image.error': function (error: any) {
        console.error('Froala image error:', error);
      },
    },
    imageUploadParam: 'file',
    imageUploadURL: false,
    imageUploadMethod: 'POST',
    imageUploadParams: {},
    imageUploadToS3: false,
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
  };

  if (editorFailed) {
    return (
      <div className="froala-editor-fallback">
        <p className="text-amber-600 mb-2">Rich text editor couldn't load. Using simple editor instead.</p>
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-[300px] w-full"
          placeholder="Start writing your blog post..."
        />
      </div>
    );
  }
  
  return (
    <div className="froala-editor-container">
      <FroalaEditor
        tag="textarea"
        config={editorConfig}
        model={content}
        onModelChange={onContentChange}
      />
    </div>
  );
}
