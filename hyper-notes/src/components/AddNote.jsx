import { useState } from 'react';

const AddNote = ( {handleAddNote} ) => {
    const [noteText, setNoteText] = useState('');

    //CHARACTER COUNT - display remaining characters
    const characterLimit = 200;

    const handleChange = (event) => {
        //CHARACTER COUNT - restrict the number of characters
        if(characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
        
    };

    const handleSaveClick = () => {
        if(noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    };

    return (
        <>
        <div className="note new rounded-lg p-4 bg-purple-50 shadow-md">
        <textarea
            rows="8"
            cols="10" 
            className="w-full resize-none outline-none bg-transparent"
            placeholder="Type to add a note..."
            value={noteText}
            onChange={handleChange}
        ></textarea>
        <div className="note-footer flex justify-between items-center mt-2">
            <small className="remaining-count text-gray-600">
            {characterLimit - noteText.length} Remaining
            </small>
            <button 
            className="save bg-purple-500 text-white px-4 py-2 rounded-md"
            onClick={handleSaveClick}
            >
            Save
            </button>
        </div>
        </div>
        </>
    );
};

export default AddNote;