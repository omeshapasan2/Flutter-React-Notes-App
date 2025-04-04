import { MdDeleteForever } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";

const Note = ( { id, text, date, handleDeleteNote, handleCopyNote } ) => {
    return(
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <MdDeleteForever 
                    onClick={() => handleDeleteNote(id)} 
                    className="delete-icon" 
                    size="1.3em"
                />
                <MdContentCopy 
                    onClick={() => handleCopyNote(text)} 
                    className="copy-icon" 
                    size="1.3em"
                />
            </div>
        </div>
    )
}

export default Note;