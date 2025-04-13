import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import RichTextEditor from './RichTextEditor';

const EditNote = ({ isOpen, onClose, onSave, noteId, initialText }) => {
    const [editedText, setEditedText] = useState('');
    
    // Update the local state whenever the modal opens with new content
    useEffect(() => {
        if (isOpen && initialText) {
            setEditedText(initialText);
        }
    }, [isOpen, initialText, noteId]);

    const handleTextChange = (html) => {
        setEditedText(html);
    };

    const handleSave = () => {
        // Check if the HTML content has any text after stripping tags
        const textContent = editedText.replace(/<[^>]*>/g, '').trim();
        if (textContent.length > 0) {
            onSave(noteId, editedText);
        }
    };

    // Function to strip HTML tags for character count
    const getTextLength = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html || '';
        return tempDiv.textContent.length;
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
            ariaHideApp={false} // Prevents accessibility warnings
        >
            {isOpen && (
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        <RichTextEditor 
                            key={`editor-${noteId}`} // Key only by noteId to prevent rerendering during typing
                            initialContent={initialText} 
                            onUpdate={handleTextChange}
                            showToolbar={true}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
                        <div className="flex space-x-3">
                            <small className="text-gray-500 self-center">
                                {getTextLength(editedText)} Characters
                            </small>
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
            )}
        </Modal>
    );
};

export default EditNote;