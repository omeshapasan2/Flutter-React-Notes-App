import { MdDeleteForever } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";

const Note = ({ id, text, date, handleDeleteNote, handleCopyNote, handleEditNote }) => {
    // Function to safely copy text content from HTML
    const copyTextContent = () => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = text;
        handleCopyNote(tempDiv.textContent);
    };

    return(
        <div className="note">
            <div 
                className="note-content cursor-pointer" 
                onClick={() => handleEditNote(id, text)}
                dangerouslySetInnerHTML={{ __html: text }}
            />

            <div className="note-footer">
                <small>{date}</small>
                
                <div className="note-footer-icons flex justify-start space-x-4">
                    <MdContentCopy 
                        onClick={copyTextContent} 
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
    );
};

export default Note;