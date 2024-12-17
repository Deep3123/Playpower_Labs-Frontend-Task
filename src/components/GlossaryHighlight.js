import React from "react";
import "./editor.css";

const glossary = {
  React: "A JavaScript library for building user interfaces.",
  JavaScript: "A programming language used to create dynamic web pages.",
  CSS: "A style sheet language used for describing the presentation of a document.",
};

const GlossaryHighlight = ({ content }) => {
  // Ensure content is defined and a string
  if (typeof content !== "string") {
    console.error("Invalid content provided to GlossaryHighlight");
    return <div>Error: Invalid content.</div>;
  }

  // Generate a dynamic regex pattern from the glossary terms
  const termsPattern = Object.keys(glossary).join("|"); // "React|JavaScript|CSS"
  const regex = new RegExp(`\\b(${termsPattern})\\b`, "gi"); // Match terms dynamically

  const highlightedContent = content.replace(
    regex,
    (match) =>
      `<span class="highlight" title="${glossary[match]}">${match}</span>`
  );

  return (
    <div
      className="glossary-highlight"
      dangerouslySetInnerHTML={{ __html: highlightedContent }}
    ></div>
  );
};

export default GlossaryHighlight;