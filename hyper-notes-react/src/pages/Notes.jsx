import NotesList from "../components/NotesList";
import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from 'react-toastify';
import Search from "../components/Search";

// src/pages/Notes.jsx
const Notes = () => {
    const [notes, setNotes] = useState([

    // Sample notes for initial state. Delete or modify as needed.
    {
      id: nanoid(),
      text: "Welcome to Hyper Notes! \n       This is a sample note. \n\n✅ You can add, delete, and copy notes. \n😎Enjoy your note-taking experience!",
      date: "03/04/2000"  
    },
    // ----------------------------------------------------------


  ]);

    const [searchText, setSearchText] = useState("");

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
          <Search handleSearchNote={setSearchText}/>
          <NotesList 
            notes={notes.filter((note)=> 
                note.text.toLowerCase().includes(searchText)
            )} 
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            handleCopyNote={handleCopyNote}
          />
      </div>
    );
  };
  
export default Notes;