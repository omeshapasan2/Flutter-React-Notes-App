import { useState } from "react";
import Modal from 'react-modal';
import { FaExpand } from "react-icons/fa";

const AddNote = ({ handleAddNote }) => {
    // Function to handle the addition of a new note
    const [noteText, setNoteText] = useState('');
    //character limit .1
    const characterLimit = 200;
    // Modal Related
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (event) => {
            setNoteText(event.target.value);
    };

    const handleSaveClick = () => {
        if(noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
            setIsModalOpen(false);
        }
    };

    // Modal Related
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    // -------------------------

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
                <div className="flex justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <small className="text-gray-500 text-md">
                            {noteText.length} Characters
                        </small>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaExpand 
                            onClick={openModal} 
                            className="expand-icon text-white hover:text-blue-500 active:scale-90 cursor-pointer transition duration-200"
                            size="1.3em"
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
                    <textarea
                        value={noteText}
                        onChange={handleChange}
                        className="w-full h-full p-4 border-none resize-none mb-6 focus:outline-none text-gray-700 font-normal text-lg flex-grow"
                        placeholder="Type to add a note..."
                    />

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
                        <div className="flex space-x-3">
                                <button className="p-3 text-gray-500 rounded-full hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
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