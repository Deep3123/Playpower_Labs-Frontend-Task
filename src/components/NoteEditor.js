import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import "./notes.css";

const NoteEditor = ({ notes, onSaveNote }) => {
  const { id } = useParams();
  const history = useHistory();
  
  const [note, setNote] = useState(null);

  useEffect(() => {
    const existingNote = notes.find((note) => note.id === id);
    if (existingNote) {
      setNote(existingNote);
    } else {
      history.push('/');
    }
  }, [id, notes, history]);

  const handleSaveNote = (content) => {
    if (!content.trim()) {
      alert("Note content cannot be empty!");
      return;
    }
    onSaveNote({ ...note, content });
    history.push("/");
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="note-editor">
      <h2>Edit Note</h2>
      <RichTextEditor content={note.content} onSave={handleSaveNote} />
    </div>
  );
};

export default NoteEditor;