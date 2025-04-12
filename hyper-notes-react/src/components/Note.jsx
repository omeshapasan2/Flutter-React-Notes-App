import { MdDeleteForever } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
  

const Note = ( { id, text, date, handleDeleteNote, handleCopyNote, handleEditNote } ) => {
    return(
        <div className="note" >
            <div className="note-content cursor-pointer" onClick ={() => handleEditNote(id, text)} >
                <span>{text}</span>
            </div>

            <div className="note-footer">
                <small>{date}</small>
                {/* <small className="text-gray-500 text-md">
                        {noteText.length} Characters
                </small> */}
                
                <div className="note-footer-icons flex justify-start space-x-4">
                    <MdContentCopy 
                        onClick={() => handleCopyNote(text)} 
                        className="copy-icon text-blue-500 hover:text-blue-700 cursor-pointer transition duration-200" 
                        size="1.3em"
                    />
                    <MdDeleteForever 
                        onClick={() => handleDeleteNote(id)} 
                        className="delete-icon text-black hover:text-red-500 active:scale-90 cursor-pointer transition duration-200"
                        size="1.3em"
                    />
                </div>
                
            </div>
        </div>
    )
}

export default Note;