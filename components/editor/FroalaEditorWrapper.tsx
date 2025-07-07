'use client';

import React, { useState, useEffect } from 'react';

// Import Froala styles and plugins dynamically to avoid SSR issues
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';

import { supabase } from '@/lib/supabase'; // Corrected import path

// Define a type for the Froala editor instance to help with 'this' context
interface FroalaEditorInstance {
  image: {
    insert: (url: string, a: null, b: null, c: any) => void;
    get: () => any;
  };
  html: {
    set: (html: string) => void;
  };
}

// Define props for the component
interface FroalaEditorProps {
  onModelChange: (model: string) => void;
  model: string | null | undefined;
}

const FroalaEditorWrapper = ({ onModelChange, model }: FroalaEditorProps) => {
  const [Editor, setEditor] = useState<React.ComponentType<any> | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, ensuring no SSR issues.
    setIsMounted(true);
    const loadFroala = async () => {
      try {
        // Dynamically import JS plugins
        await import('froala-editor/js/plugins.pkgd.min.js');
        await import('froala-editor/js/third_party/image_tui.min.js');
        await import('froala-editor/js/third_party/font_awesome.min.js');

        // Dynamically import the main React component
        const FroalaEditorComponent = (await import('react-froala-wysiwyg')).default;
        setEditor(() => FroalaEditorComponent);
      } catch (error) {
        console.error('Failed to load Froala Editor:', error);
      }
    };

    loadFroala();
  }, []);

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('blogs') // As per your working example
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('blogs')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const config = {
    heightMin: 400,
    placeholderText: 'Start writing your content here!',
    charCounterCount: true,
    imageUpload: true,
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
    imageUploadMethod: 'PUT', // To match your working example
    imageUploadToS3: false, // Disable default S3 uploader

    events: {
      'image.beforeUpload': async function (files: FileList) {
        if (files.length) {
          const editorInstance = (this as unknown) as FroalaEditorInstance; // Correct cast

          const imageUrl = await uploadImageToSupabase(files[0]);

          if (imageUrl) {
            editorInstance.image.insert(imageUrl, null, null, editorInstance.image.get());
          }
        }
        return false; // Prevent default Froala upload
      },
      initialized: function () {
        if (model) {
          ((this as unknown) as FroalaEditorInstance).html.set(model);
        }
      },
    },
  };

  // Render a fallback/loading state until the editor is ready on the client
  if (!isMounted || !Editor) {
    return (
      <div className="min-h-[400px] border rounded-md p-4 bg-gray-50 flex items-center justify-center">
        <p>Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="froala-editor-container">
      <Editor
        tag="textarea"
        config={config}
        model={model}
        onModelChange={onModelChange}
      />
    </div>
  );
};

export default FroalaEditorWrapper;
