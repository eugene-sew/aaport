'use client';

import React, { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

export default function SafeFroalaEditor({ content, onContentChange }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [FroalaEditor, setFroalaEditor] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    // Only load Froala and styles after mount
    async function loadFroala() {
      try {
        await import('froala-editor/css/froala_style.min.css');
        await import('froala-editor/css/froala_editor.pkgd.min.css');
        const { default: ReactFroalaEditor } = await import('react-froala-wysiwyg');
        setFroalaEditor(() => ReactFroalaEditor);
      } catch (err) {
        setHasError(true);
      }
    }
    loadFroala();
  }, []);

  const editorConfig = {
    placeholderText: 'Start writing your blog post...',
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          'bold', 'italic', 'underline', 'strikeThrough', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting',
        ],
      },
      moreParagraph: {
        buttons: [
          'alignLeft', 'alignCenter', 'alignRight', 'formatOL', 'formatUL', 'paragraphFormat', 'lineHeight', 'quote',
        ],
      },
      moreRich: {
        buttons: [
          'insertLink', 'insertImage', 'insertTable', 'emoticons', 'insertHR',
        ],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'html'],
        align: 'right',
        buttonsVisible: 2,
      },
    },
    events: {
      'image.beforeUpload': function() { return false; }
    }
  };

  // Fallback: textarea if error or not mounted
  if (!isMounted || hasError || !FroalaEditor) {
    return (
      <div className="froala-editor-fallback">
        {hasError && <p className="text-amber-600 mb-2">Rich text editor couldn't load. Using simple editor instead.</p>}
        <Textarea
          value={content}
          onChange={e => onContentChange(e.target.value)}
          className="min-h-[300px] w-full"
          placeholder="Start writing your blog post..."
        />
      </div>
    );
  }

  // Only render Froala after mount and after loaded
  return (
    <div className="froala-editor-wrapper">
      <FroalaEditor
        tag="textarea"
        config={editorConfig}
        model={content}
        onModelChange={onContentChange}
      />
    </div>
  );
}

