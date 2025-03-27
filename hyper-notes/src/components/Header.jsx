import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/logo.png';

const Header = ({ handleToggleDarkMode }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return(
        <nav className="bg-black flex items-center justify-between px-4 py-3 w-full">
      <div className="w-16 h-16 flex-shrink-0">
        <img 
          src={logo} 
          alt="HyperNotes Logo"
          className="w-full h-full object-contain"
        /> 
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-amber-50 hover:text-sky-500 
                                transition-colors duration-300 
                                font-semibold">
          Home
        </Link>
        <Link to="/login" className="text-amber-50 hover:text-sky-500 
                                     transition-colors duration-300 
                                     font-semibold">
          Login
        </Link>
        <Link to="/register" className="text-amber-50 hover:text-sky-500 
                                        transition-colors duration-300 
                                        font-semibold">
          Register
        </Link>
        <Link to="#" className="text-amber-50 hover:text-sky-500 
                                 transition-colors duration-300 
                                 font-semibold">
          About
        </Link>
      </div>
    </nav>
    )
}

export default Header;