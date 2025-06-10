"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import FroalaEditor
const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/js/plugins/image.min"),
      import("froala-editor/js/plugins/link.min"),
      import("froala-editor/js/plugins/lists.min"),
      import("froala-editor/js/plugins/table.min"),
      import("froala-editor/js/plugins/code_view.min"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
    ]);
    return values[0];
  },
  {
    loading: () => <p>Loading editor...</p>,
    ssr: false,
  }
);

interface FroalaEditorWrapperProps {
  model: string;
  onModelChange: (model: string) => void;
}

const FroalaEditorWrapper: React.FC<FroalaEditorWrapperProps> = ({
  model,
  onModelChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [editorConfig] = useState({
    placeholderText: "Start typing your content here...",
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "clearFormatting",
        ],
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertTable",
          "specialCharacters",
          "insertHR",
          "selectAll",
          "clearFormatting",
        ],
      },
      moreMisc: {
        buttons: ["undo", "redo", "help"],
        align: "right",
        buttonsVisible: 2,
      },
    },
    attribution: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-[300px] bg-muted/20 rounded-md p-4">Loading editor...</div>;
  }

  return (
    <FroalaEditor
      tag="textarea"
      config={editorConfig}
      model={model}
      onModelChange={onModelChange}
    />
  );
};

export default FroalaEditorWrapper;
