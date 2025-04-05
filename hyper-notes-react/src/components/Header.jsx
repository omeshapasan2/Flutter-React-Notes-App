import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Header = ({ handleToggleDarkMode }) => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const auth = getAuth();
        try {
          await signOut(auth); // Signs out the current user
          console.log("User signed out");
          navigate('/login'); // Redirect to the login page after signing out
        } catch (error) {
          console.error("Error signing out: ", error);
        }
      };

    return(
        <div className="header">
            <h1>HyperNotes</h1>

            <div className="header-icons">
                <button 
                    className="save"
                    onClick={() => 
                        handleToggleDarkMode(
                            (previousDarkMode) => !previousDarkMode
                        )
                    }
                >Toggle Mode</button>
                <FaSignOutAlt 
                        onClick={handleSignOut}
                        className="copy-icon text-white hover:text-blue-700 cursor-pointer transition duration-200 active:scale-90" 
                        size="1.3em"
                />
            </div>
        </div>
    )
}

export default Header;