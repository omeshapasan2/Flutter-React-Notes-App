import NotesList from "../components/NotesList";
import { nanoid } from "nanoid";
import { useState } from "react";

// src/pages/Notes.jsx
const Notes = () => {
    const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is 1st note...",
      date: "03/04/2000"  
    },
    {
      id: nanoid(),
      text: "This is 2nd note...",
      date: "03/04/2000"  
    },
    {
      id: nanoid(),
      text: "This is 3rd note...",
      date: "03/04/2000"  
    },
    {
      id: nanoid(),
      text: "This is 4th note...",
      date: "03/04/2000"  
    },
    {
      id: nanoid(),
      text: "This is 5th note...",
      date: "03/04/2000"  
    },
  ]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString()
        };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    }

    return (
      <div className="notes-bg">
          <NotesList notes={notes} handleAddNote={addNote}/>
      </div>
    );
  };
  
export default Notes;