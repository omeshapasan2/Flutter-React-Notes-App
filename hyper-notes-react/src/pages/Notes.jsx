import NotesList from "../components/NotesList";

// src/pages/Notes.jsx
const Notes = () => {
    return (
      <div className="animated-background h-screen bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-500 text-white">
        <div className="">
          <NotesList />
        </div>
      </div>
    );
  };
  
export default Notes;