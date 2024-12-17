# Shareable Notes

**Shareable Notes** is a React-based web application that allows users to create, manage, and share notes. It provides an intuitive platform with features like a rich text editor, note categorization, auto-save, and shareable links for easy collaboration.

## Features

- **Rich Text Editor**: Supports text formatting (bold, italic, underline, strikethrough), alignment, lists, and indentation.
- **Note Management**: Create, edit, delete, and categorize notes. Auto-save and live content updates.
- **Shareable Links**: Generate unique links for sharing notes. Secure access with link expiration options.
- **User-Friendly Design**: Responsive layout and browser spell-check integration.

## Folder Structure

```plaintext
src/
├── components/
│   ├── RichTextEditor.js  # The editor component
│   ├── NotesList.js      # Note creation and listing
│   └── NoteEditor.js     # Generate and display shareable links
├── styles/
│   └── editor.css        # Styling for the editor and toolbar
├── App.js                # Root component
└── index.js              # Entry point
```

## Setup and Installation
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/Deep3123/Playpower_Labs-Frontend-Task.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the app:
```bash
npm start
# or
yarn start
```

## Key Files and Functions

### `RichTextEditor.js`
- Handles text formatting and state synchronization.
- Key methods:
  - `handleInput`: Updates content on user input.
  - `handleStyle`: Applies text formatting styles (bold, italic, underline, etc.).

### `App.js`
- Manages routing and layout.
- Integrates `NotesList` and `NoteEditor` components.

### `NotesList.js`
- Displays and manages created notes.
- Allows deleting notes and selecting notes for editing.

### `NoteEditor.js`
- Provides a rich text editor for creating and editing notes.

## Testing

### Manual Testing:
1. Launch the app locally.
2. Test features like note creation, text formatting, and link sharing.

## Future Enhancements
- Add user authentication for secure access.
- Cloud synchronization for notes.
- Advanced link sharing with permissions (view/edit).
