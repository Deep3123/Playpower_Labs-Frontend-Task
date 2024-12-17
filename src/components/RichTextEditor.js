import React, { useRef, useEffect, useState } from "react";
import "./editor.css";

const RichTextEditor = ({ onChange, content }) => {
  const editorRef = useRef(null); // Ref for contentEditable div
  const [editorContent, setEditorContent] = useState(content || "");

  const previousContent = useRef(content);

  // Update editor content only when prop content changes
  useEffect(() => {
    if (content !== previousContent.current) {
      setEditorContent(content || ""); // Set new content
      previousContent.current = content;
    }
  }, [content]);

  // Preserve cursor position during updates
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    return {
      range: selection.rangeCount > 0 ? selection.getRangeAt(0) : null,
      selection,
    };
  };

  const restoreCursorPosition = ({ range, selection }) => {
    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleInput = () => {
    const newContent = editorRef.current.innerHTML;
    setEditorContent(newContent); // Update state with new content
    onChange(newContent); // Notify parent component
  };

  const handleStyle = (command, value = null) => {
    const cursorState = saveCursorPosition();
    document.execCommand(command, false, value);
    restoreCursorPosition(cursorState);
    setEditorContent(editorRef.current.innerHTML); // Update state after style change
  };

  // Handle key events to prevent content reset
  const handleKeyUp = (e) => {
    const newContent = editorRef.current.innerHTML;
    setEditorContent(newContent); // Update state after key input
    onChange(newContent); // Notify parent component
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar">
        <button title="Bold (B)" onClick={() => handleStyle("bold")}>
          <strong>B</strong>
        </button>
        <button title="Italic (I)" onClick={() => handleStyle("italic")}>
          <em>I</em>
        </button>
        <button title="Underline (U)" onClick={() => handleStyle("underline")}>
          <u>U</u>
        </button>
        <button
          title="Strikethrough (S)"
          onClick={() => handleStyle("strikeThrough")}
        >
          <s>S</s>
        </button>
        <button title="Superscript" onClick={() => handleStyle("superscript")}>
          x<sup>2</sup>
        </button>
        <button title="Subscript" onClick={() => handleStyle("subscript")}>
          x<sub>2</sub>
        </button>
        <button title="Align Left" onClick={() => handleStyle("justifyLeft")}>
          🡸
        </button>
        <button
          title="Align Center"
          onClick={() => handleStyle("justifyCenter")}
        >
          ⬛
        </button>
        <button title="Align Right" onClick={() => handleStyle("justifyRight")}>
          🡺
        </button>
        <button title="Align Justify" onClick={() => handleStyle("justifyFull")}>
          ☰
        </button>
        <button
          title="Ordered List"
          onClick={() => handleStyle("insertOrderedList")}
        >
          1.
        </button>
        <button
          title="Unordered List"
          onClick={() => handleStyle("insertUnorderedList")}
        >
          •
        </button>
        <button title="Increase Indent" onClick={() => handleStyle("indent")}>
          ➡
        </button>
        <button title="Decrease Indent" onClick={() => handleStyle("outdent")}>
          ⬅
        </button>
        <button
          title="Insert Horizontal Line"
          onClick={() => handleStyle("insertHorizontalRule")}
        >
          ─
        </button>
        <button
          title="Clear Formatting"
          onClick={() => handleStyle("removeFormat")}
        >
          ✖
        </button>
      </div>

      {/* Content Editable Area */}
      <div
        className="editor"
        contentEditable
        ref={editorRef}
        onInput={handleInput}
        onKeyUp={handleKeyUp} // Preserve content on key up (after input)
        spellCheck="True" // Optional: Disable browser spell-checking
        dangerouslySetInnerHTML={{ __html: editorContent }} // Bind content to state
      ></div>
    </div>
  );
};

export default RichTextEditor;
