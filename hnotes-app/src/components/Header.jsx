import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ handleToggleDarkMode }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return(
        <div className="header">
            <h1>Notes</h1>
            <button 
                onClick={goToHome}
                className="home-button"
            >
                Home
            </button>
            <button 
                onClick={()=> 
                    handleToggleDarkMode(
                        (previousDarkMode)=> !previousDarkMode
                    )
                } 
                className="mode-toggle-button"
            >
                Toggle Mode
            </button>
        </div>
    )
}

export default Header;