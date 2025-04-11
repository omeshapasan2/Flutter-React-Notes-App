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
            style={customStyles}
            contentLabel="Edit Note"
        >
            <h2 className="text-xl font-bold mb-4">Edit Note</h2>
            <textarea
                value={editedText}
                onChange={handleTextChange}
                rows="8"
                className="w-full p-3 border rounded resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Edit your note..."
            />
            <div className="flex justify-end space-x-3">
                <button 
                    onClick={onClose} 
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </Modal>
    );
};

export default EditNote;