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
        <div className="note new">
            <textarea
                rows="8"
                cols="10" 
                placeholder="Type to add a note..."
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className="note-footer">
                <small className='remaining-count'>{characterLimit - noteText.length} Remaining</small>
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
        </>
    );
};

export default AddNote;