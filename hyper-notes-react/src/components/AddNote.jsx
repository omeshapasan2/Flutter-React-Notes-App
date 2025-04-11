import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
    // Function to handle the addition of a new note
    const [noteText, setNoteText] = useState('');
    //character limit .1
    const characterLimit = 200;

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
                className="textarea"
                rows="5" 
                cols="10" 
                placeholder="Type to add a note..."
                value={noteText}
                onChange={handleChange}>
            </textarea>
            <div className="note-footer">
                <small className="text-gray-500 text-md">
                    {noteText.length} Characters
                </small>
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default AddNote;