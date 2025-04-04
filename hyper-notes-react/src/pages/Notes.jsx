import NotesList from "../components/NotesList";
import { useState } from "react";

// src/pages/Notes.jsx
const Notes = () => {
    const [notes, setNotes] = useState([]);
    
    return (
      <div className="notes-bg">
          <NotesList />
      </div>
    );
  };
  
export default Notes;