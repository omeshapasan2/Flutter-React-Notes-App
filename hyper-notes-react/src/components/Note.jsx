import { MdDeleteForever } from "react-icons/md";

const Note = () => {
    return(
        <div className="note">
            <span>Note Text</span>
            <div className="note-footer">
                <small>Date</small>
                <MdDeleteForever 
                    onClick={() => console.log("Delete Note")} 
                    className="delete-icon" 
                    size="1.3em"
                />
            </div>
        </div>
    )
}

export default Note;