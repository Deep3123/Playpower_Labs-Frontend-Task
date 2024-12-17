import React from "react";
import "./notes.css";

const NotesList = ({ notes, onSelect, onDelete, onPin }) => {
  const pinnedNotes = notes.filter((note) => note.pinned);
  const unpinnedNotes = notes.filter((note) => !note.pinned);

  const renderNotes = (notes) =>
    notes.map((note) => (
      <div key={note.id} className="note-item" onClick={() => onSelect(note)}>      
        {/* Pin Button */}
        <button
          style={{
            width: "30px",
            padding: "5px",
            margin: "5px",
            backgroundColor: "#404040",
            float: "inline-end",
          }}
          className="button-note"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent onClick
            onPin(note.id);
          }}
        >
          📌
        </button>

        {/* Delete Button */}
        <button
          style={{
            width: "30px",
            padding: "5px",
            margin: "5px",
            backgroundColor: "#404040",
            float: "right",
          }}
          className="button-note"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent onClick
            onDelete(note.id);
          }}
        >
          ❌
        </button>

        {/* Display the Note Title in a larger font */}
        <h2 className="note-title">{note.title}</h2>

        {/* Note Content Preview */}
        <p>{note.content?.substring(0, 50) || "No content available"}...</p>

        {/* Display the Date and Time with opacity */}
        <p className="note-timestamp">
          {note.timestamp ? `Last updated: ${note.timestamp}` : ""}
        </p>

      </div>
    ));

  return (
    <div className="notes-list">
      <h3>Pinned Notes</h3>
      {pinnedNotes.length > 0 ? renderNotes(pinnedNotes) : <p>No pinned notes</p>}
      <h3>Other Notes</h3>
      {unpinnedNotes.length > 0 ? renderNotes(unpinnedNotes) : <p>No other notes</p>}
    </div>
  );
};

export default NotesList;