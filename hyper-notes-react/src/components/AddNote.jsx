import { useState } from "react";
import Modal from 'react-modal';
import { FaExpand } from "react-icons/fa";
import RichTextEditor from "./RichTextEditor";

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (html) => {
        setNoteText(html);
    };

    const handleSaveClick = () => {
        // Check if the HTML content has any text after stripping tags
        const textContent = noteText.replace(/<[^>]*>/g, '').trim();
        if(textContent.length > 0){
            handleAddNote(noteText);
            setNoteText('');
            setIsModalOpen(false);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    // Function to strip HTML tags for character count
    const getTextLength = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent.length;
    };

    return(
        <div className="note new">
            <div className="textarea">
                <RichTextEditor 
                    initialContent={noteText}
                    onUpdate={handleChange}
                    showToolbar={false} // Hide toolbar in compact view
                />
            </div>
            <div className="note-footer">
                <div className="flex justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <small className="text-gray-500 text-md">
                            {getTextLength(noteText)} Characters
                        </small>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaExpand 
                            onClick={openModal} 
                            className="expand-icon text-white hover:text-blue-500 active:scale-90 cursor-pointer transition duration-200"
                            size="1.3em"
                            title="Expand to use rich text editor"
                        />
                        <button className="save" onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '32px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                        border: 'none',
                        maxWidth: '800px',
                        width: '90%',
                        maxHeight: '90vh',
                        height: '90%'
                    }
                }}
                contentLabel="Add Note"
            >
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        <RichTextEditor 
                            initialContent={noteText}
                            onUpdate={handleChange}
                            showToolbar={true} // Show toolbar in expanded view
                        />
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
                        <div className="flex space-x-3">
                            <small className="text-gray-500 self-center">
                                {getTextLength(noteText)} Characters
                            </small>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-md text-md font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveClick}
                                className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-md font-medium transition duration-150"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddNote;