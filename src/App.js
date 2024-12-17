import React, { useState, useEffect } from "react";
import RichTextEditor from "./components/RichTextEditor";
import NotesList from "./components/NotesList";
import GlossaryHighlight from "./components/GlossaryHighlight";
import "./App.css";

// Utility function to sanitize HTML
const sanitizeText = (text) => {
  const div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent || div.innerText || ""; // Plain text
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // Load notes from local storage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to local storage
  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Open editor for a new note
  const addNote = () => {
    setIsEditorOpen(true);
    setNoteTitle("");
    setNoteContent("");
    setCurrentNote(null); // Clear the current note
  };

  // Close editor without saving
  const closeEditor = () => {
    setIsEditorOpen(false);
    setNoteTitle("");
    setNoteContent("");
    setCurrentNote(null); // Clear the current note
  };

  // Save a new note
  const saveNewNote = () => {
    if (noteTitle.trim() && noteContent.trim()) {
      const sanitizedContent = sanitizeText(noteContent);
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        content: sanitizedContent,
        timestamp: new Date().toLocaleString(),
        pinned: false,
      };
      const updatedNotes = [newNote, ...notes];
      saveNotes(updatedNotes);
      setIsEditorOpen(false);
    }
  };

  // Open editor for an existing note
  const editNote = (note) => {
    setIsEditorOpen(true);
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  // Save updates to the current note
  const saveUpdatedNote = () => {
    if (currentNote && noteTitle.trim() && noteContent.trim()) {
      const updatedNotes = notes.map((note) =>
        note.id === currentNote.id
          ? {
              ...note,
              title: noteTitle,
              content: sanitizeText(noteContent),
              timestamp: new Date().toLocaleString(),
            }
          : note
      );
      saveNotes(updatedNotes);
      setIsEditorOpen(false);
      setCurrentNote(null);
    }
  };

  // Delete a note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
  };

  // Pin a note
  const pinNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    saveNotes(updatedNotes);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <button onClick={addNote}>New Note</button>
        <NotesList
          notes={notes}
          onSelect={editNote}
          onDelete={deleteNote}
          onPin={pinNote}
        />
      </div>

      <div className="editor-container">
        {isEditorOpen ? (
          <div>
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <RichTextEditor content={noteContent} onChange={setNoteContent} />
            <div className="editor-buttons">
              <button
                className="button save-button"
                onClick={currentNote ? saveUpdatedNote : saveNewNote}
              >
                {currentNote ? "Update Note" : "Save Note"}
              </button>
              <button className="button close-button" onClick={closeEditor}>
                Close
              </button>
            </div>
          </div>
        ) : currentNote ? (
          <>
            <h2>{currentNote.title}</h2>
            <p className="note-timestamp">Last updated: {currentNote.timestamp}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: currentNote.content,
              }}
            />
            <GlossaryHighlight content={currentNote.content} />
          </>
        ) : (
          <p>Select a note to edit or create a new one!</p>
        )}
      </div>
    </div>
  );
};

export default App;
