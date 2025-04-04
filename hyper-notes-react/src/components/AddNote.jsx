import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
    // Function to handle the addition of a new note
    const [noteText, setNoteText] = useState('');

    const handleChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSaveClick = () => {
        if(noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
        }
    }


    return(
        <div className="note new">
            <textarea 
                rows="5" 
                cols="10" 
                placeholder="Type to add a note..."
                value={noteText}
                onChange={handleChange}>
            </textarea>
            <div className="note-footer">
                <small>200 Characters</small>
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default AddNote;