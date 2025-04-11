import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Set the app element for accessibility
// Modal.setAppElement('/');

const EditNote = ({ isOpen, onClose, onSave, noteId, initialText }) => {
    const [editedText, setEditedText] = useState('');
    
    useEffect(() => {
        if (isOpen) {
            setEditedText(initialText);
        }
    }, [isOpen, initialText]);

    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleSave = () => {
        if (editedText.trim().length > 0) {
            onSave(noteId, editedText);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
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
            contentLabel="Edit Note"
        >
            <div className="flex flex-col h-full">
                <textarea
                    value={editedText}
                    onChange={handleTextChange}
                    className="w-full p-4 border-none resize-none mb-6 focus:outline-none text-gray-700 font-normal text-lg flex-grow"
                    placeholder="Edit your note..."
                />
                
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
                    <div className="flex space-x-3">
                        {/* Keep-style formatting icons could go here */}
                        <button className="p-3 text-gray-500 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex space-x-3">
                        <button 
                            onClick={onClose} 
                            className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-md text-md font-medium"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave} 
                            className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-md font-medium transition duration-150"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditNote;