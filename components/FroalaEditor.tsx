'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useContent } from "@/hooks/useContent";
import { Textarea } from "@/components/ui/textarea";

// Import Froala Editor styles
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Dynamically import Froala Editor with SSR disabled
const FroalaEditorComponent = dynamic(
  async () => {
    const { default: RealFroalaEditor } = await import('react-froala-wysiwyg');
    return ({ config, model, onModelChange }: any) => (
      <RealFroalaEditor 
        tag="textarea"
        config={config}
        model={model}
        onModelChange={onModelChange}
      />
    );
  },
  { ssr: false }
);

interface FroalaEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

export default function FroalaEditor({ content, onContentChange }: FroalaEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorFailed, setEditorFailed] = useState(false);
  const { uploadAsset } = useContent();
  
  useEffect(() => {
    setIsMounted(true);
    
    // Set a timeout to detect if the editor fails to initialize
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
    if (!images.length) return;
    
    setUploading(true);
    try {
      const image = images[0];
      console.log('Uploading image to blog folder:', image.name);
      const imageUrl = await uploadAsset(image, 'blog');
      
      if (imageUrl) {
        console.log('Image uploaded successfully:', imageUrl);
        return imageUrl;
      } else {
        console.error('Failed to upload image');
        return false;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    } finally {
      setUploading(false);
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
      'image.uploaded': function (response: any) {
        return response;
      },
      'image.inserted': function (img: HTMLImageElement) {
        console.log('Image inserted successfully', img.src);
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

  // Only render the editor when the component is mounted on the client
  if (!isMounted) {
    return <div className="min-h-[300px] border rounded p-4 bg-gray-50">Loading editor...</div>;
  }
  
  // Show loading state when uploading images
  if (uploading) {
    return (
      <div className="min-h-[300px] border rounded p-4 bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p>Uploading image...</p>
        </div>
      </div>
    );
  }
  
  // If the editor failed to initialize, show a fallback textarea
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
      <FroalaEditorComponent
        config={editorConfig}
        model={content}
        onModelChange={onContentChange}
      />
    </div>
  );
}
