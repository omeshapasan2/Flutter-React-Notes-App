import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';  // Make sure to have the logo in the src folder

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <img 
          src={logo} 
          alt="NoteSync Logo" 
          className="home-logo"
        />
        
        <div className="home-description">
          <h2>NoteSync</h2>
          <p>
            Cross-platform note-taking application designed for seamless synchronization 
            between mobile and web. Capture ideas, organize thoughts, and access notes 
            anytime, anywhere with an intuitive and consistent experience.
          </p>
        </div>
        
        <div className="home-actions">
          <div className="android-download">
            <button disabled>
              Android App (Coming Soon)
            </button>
          </div>
          
          <div className="web-auth-links">
            <Link to="/login" className="login-button">
              Web App Login
            </Link>
            <Link to="/register" className="register-button">
              Web App Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;