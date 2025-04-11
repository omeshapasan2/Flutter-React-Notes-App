import Note from './Note'
import AddNote from './AddNote';
import EditNote from './EditNote';
import { useState } from 'react';

const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleCopyNote}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const onEditNote = (note) => {
        setSelectedNote(note);
        setIsEditModalOpen(true);
    };

    const handleSaveClick = () => {
        if(noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
        }
    }

    return (
        <>
            <div className="notes-list">
                {notes.map((note) => (
                    <Note 
                        id={note.id} 
                        text={note.text} 
                        date={note.date}
                        handleDeleteNote={handleDeleteNote}
                        handleCopyNote={handleCopyNote}
                        handleEditNote={onEditNote}
                        handleSaveClick={handleSaveClick}
                    />
                ))}
                <AddNote handleAddNote={handleAddNote}/>
            </div>

            {isEditModalOpen && (
                <EditNote
                note={selectedNote}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveEdit}
                />
            )}
        </>
    );
}

export default NotesList;