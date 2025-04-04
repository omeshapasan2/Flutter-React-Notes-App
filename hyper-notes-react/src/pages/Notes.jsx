import NotesList from "../components/NotesList";
import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from 'react-toastify';

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
    };

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    
        toast.error("Note deleted", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            pauseOnHover: false,
            closeOnClick: true
        });
    };
  

    const handleCopyNote = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Note copied to clipboard!", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    pauseOnHover: false,
                    closeOnClick: true
                });
            })
            .catch((err) => {
                toast.error("Failed to copy note");
                console.error("Failed to copy: ", err);
            });
    };
  

    return (
      <div className="notes-bg">
          <NotesList 
            notes={notes} 
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            handleCopyNote={handleCopyNote}
          />
      </div>
    );
  };
  
export default Notes;