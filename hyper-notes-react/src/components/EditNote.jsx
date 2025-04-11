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

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px',
            padding: '20px'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
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
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                    border: 'none',
                    maxWidth: '550px',
                    width: '95%'
                }
            }}
            contentLabel="Edit Note"
        >
            <div className="flex flex-col h-full">
                <textarea
                    value={editedText}
                    onChange={handleTextChange}
                    rows="8"
                    className="w-full p-3 border-none resize-none mb-4 focus:outline-none text-gray-700 font-normal text-base"
                    placeholder="Edit your note..."
                    autoFocus
                />
                
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
                    <div className="flex space-x-2">
                        {/* Keep-style formatting icons could go here */}
                        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button 
                            onClick={onClose} 
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave} 
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm font-medium transition duration-150"
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