import NotesList from "../components/NotesList";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Search from "../components/Search";
import Header from "../components/Header";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase"; // adjust the path to your firebase.js
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

// src/pages/Notes.jsx
const Notes = () => {

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('react-notes-app-data');
        if (savedNotes) {
          return JSON.parse(savedNotes);
        } else {
          return [
            {
              id: nanoid(),
              text: "Welcome to Hyper Notes! \n       This is a sample note. \n\n✅ You can add, delete, and copy notes. \n😎Enjoy your note-taking experience!",
              date: "03/04/2000"
            }
          ];
        }
    });
  

    const [searchText, setSearchText] = useState("");

    // Dark mode toggle state
    const [darkMode, setDarkMode] = useState(false);

    // // Firebase User ID  Logging
    // const auth = getAuth();
    // const user = auth.currentUser;

    // if (user) {
    //     const uid = user.uid;
    //     console.log("User ID:", user.uid);
    // }

    // //------------------------------

    // Firestore - Load notes from Firestore
    useEffect(() => {
      const auth = getAuth();
    
      const unsubscribeAuth = auth.onAuthStateChanged((user) => {
        if (user) {
          const notesRef = collection(db, "users", user.uid, "notes");
    
          const unsubscribeNotes = onSnapshot(notesRef, (snapshot) => {
            const userNotes = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            setNotes(userNotes);
          });
    
          // Clean up both listeners
          return () => {
            unsubscribeNotes();
            unsubscribeAuth();
          };
        }
      });
    
      // Clean up auth listener if component unmounts early
      return () => unsubscribeAuth();
    }, []);
    
    

    // Firestore - Save notes to Firestore
    useEffect(() => {
        localStorage.setItem(
            'react-notes-app-data', 
            JSON.stringify(notes)
        );
    }, [notes]);

    

    const addNote = async (text) => {
        const auth = getAuth();
        const user = auth.currentUser;
        const date = new Date().toLocaleDateString();
      
        if (user) {
          await addDoc(collection(db, "users", user.uid, "notes"), {
            text,
            date
          });
        }
    };
    

    const deleteNote = async (id) => {
        const auth = getAuth();
        const user = auth.currentUser;
      
        if (user) {
          await deleteDoc(doc(db, "users", user.uid, "notes", id));
        }
      
        toast.error("Note deleted", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
          closeOnClick: true
        });
    };
    
  

    const handleCopyNote = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Note copied to clipboard!", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    pauseOnHover: false,
                    closeOnClick: true
                });
            })
            .catch((err) => {
                toast.error("Failed to copy note");
                console.error("Failed to copy: ", err);
            });
    };
  

    return (
      <div className={`${darkMode && 'dark-mode'}`}>
        <div className="notes-bg">
            <Header handleToggleDarkMode={setDarkMode}/>
            <Search handleSearchNote={setSearchText}/>
            <NotesList 
              notes={notes.filter((note)=> 
                  note.text.toLowerCase().includes(searchText)
              )} 
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
              handleCopyNote={handleCopyNote}
            />
        </div>
      </div>
    );
  };
  
export default Notes;