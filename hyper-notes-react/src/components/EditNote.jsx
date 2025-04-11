import React, { useState } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditNote = ({ isOpen, onClose, onSave, noteId, initialText }) => {
    const [text, setText] = useState(initialText);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Note"
            className="modal"
            overlayClassName="modal-overlay" 
        >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-48 p-4 border rounded"
            />

            <div className="flex justify-end space-x-4 mt-4">
                <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button
                    onClick={() => {
                        if (text.trim()) onSave(noteId, text);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>

        </Modal>
    );
}

export default EditNote;