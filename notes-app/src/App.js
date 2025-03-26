import NotesList from "./components/NotesList";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('react-notes-app-data');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
        localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
        // Use saved notes instead of initial hardcoded notes
        setNotes(savedNotes);
    }
}, [])

useEffect(() => {
    console.log('Notes being saved:', notes);
    localStorage.setItem(
        'react-notes-app-data', 
        JSON.stringify(notes)
    );
}, [notes])

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

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText}/>
        <NotesList 
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;