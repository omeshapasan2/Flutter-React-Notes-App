import Note from './Notes';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map((note) => (
        <Note 
          key={note.id}
          id={note.id} 
          text={note.text} 
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote 
        handleAddNote={handleAddNote} 
      />
    </div>
        </>
    )
}

export default NotesList;