import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import NotesList from "./NotesList";

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("react-notes-app-data");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode} />
        <Search handleSearchNote={setSearchText} darkMode={darkMode} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Notes;