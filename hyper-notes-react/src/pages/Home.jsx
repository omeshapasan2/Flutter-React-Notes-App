import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainImage from '../assets/main.png';
import { 
  FaCloud, 
  FaFolder, 
  FaImage, 
  FaSearch, 
  FaLink, 
  FaCheckSquare, 
  FaShareAlt,
  FaReact,
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { SiFlutter, SiFirebase } from 'react-icons/si';
import { Download } from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false); 
  const [latestRelease, setLatestRelease] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest release from GitHub API
  useEffect(() => {
    fetch('https://api.github.com/repos/omeshapasan2/Flutter-React-Notes-App/releases/latest')
      .then(response => response.json())
      .then(data => {
        setLatestRelease(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching latest release:', error);
        setLoading(false);
      });
  }, []);
  
  // Splash screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const features = [
    { icon: <FaCloud className="text-3xl text-purple-500" />, title: "Sync Across Devices", description: "Seamless sync between mobile and web versions" },
    { icon: <FaFolder className="text-3xl text-purple-500" />, title: "Folder Notes", description: "Organize notes with custom labels - Coming soon..." },
    { icon: <FaImage className="text-3xl text-purple-500" />, title: "Picture Support", description: ("Embed and attach images to your notes - Coming soon...") },
    { icon: <FaSearch className="text-3xl text-purple-500" />, title: "Advanced Search", description: "Quickly find notes with powerful search" },
    { icon: <FaLink className="text-3xl text-purple-500" />, title: "Link Support", description: "Add and track links within your notes - Coming soon..." },
    { icon: <FaCheckSquare className="text-3xl text-purple-500" />, title: "To-Do Lists", description: "Create and manage task lists - Coming soon..." },
    { icon: <FaShareAlt className="text-3xl text-purple-500" />, title: "Note Sharing", description: "Export notes as .txt or .pdf - Coming soon..." }
  ];

  // Splash Screen Component
  const SplashScreen = () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center animate-pulse">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">HyperNotes</h1>
        <p className="text-xl text-amber-50">Your Note-Taking Companion</p>
      </div>
    </div>
  );

  // Navigation Bar Component
  const NavBar = () => {
    return (
      <nav className="bg-zinc-800 border-b border-purple-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-500">HyperNotes</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-amber-50 focus:outline-none"
              >
                {isMenuOpen ? 
                  <FaTimes className="h-6 w-6" /> : 
                  <FaBars className="h-6 w-6" />
                }
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-amber-50 hover:text-purple-400 transition-colors">
                Home
              </Link>
              <a href="#about" className="text-amber-50 hover:text-purple-400 transition-colors">
                About
              </a>
              <Link to="/login" className="text-amber-50 hover:text-purple-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-amber-50 hover:text-purple-400 transition-colors">
                Register
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="flex flex-col space-y-3 pb-4">
                <Link 
                  to="/" 
                  className="text-amber-50 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <a 
                  href="#about" 
                  className="text-amber-50 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <Link 
                  to="/login" 
                  className="text-amber-50 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-amber-50 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  // About Section Component 
  const AboutSection = () => {
    return (
      <div id="about" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">About the Developer</h2>
        <div className="bg-zinc-800 rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4">Omesha Pasan</h3>
          <p className="text-gray-300 mb-6">
            Full-stack developer passionate about creating intuitive applications 
            that enhance productivity and organization. HyperNotes represents my 
            vision for a seamless note-taking experience across all platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://cv.omeshapasan.site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-amber-50 hover:text-purple-400 transition-colors"
            >
              <FaLink className="text-xl" />
              <span>Portfolio</span>
            </a>
            
            <a 
              href="https://github.com/omeshapasan2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-amber-50 hover:text-purple-400 transition-colors"
            >
              <FaGithub className="text-xl" />
              <span>GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/omesha-pasan-1503a5292" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-amber-50 hover:text-purple-400 transition-colors"
            >
              <FaLinkedin className="text-xl" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-amber-50">
      {showSplash && <SplashScreen />}
      
      <NavBar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              HyperNotes: Your Intelligent
              <br />
              Note-Taking Companion
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Capture, organize, and sync your thoughts across all devices.
              Powerful, intuitive, and always with you.
            </p>

            <div className="flex space-x-4">
              <Link to="/login" className="transform transition-transform hover:-translate-y-1">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-md font-semibold 
                                   hover:bg-purple-700 focus:outline-none focus:ring-2 
                                   focus:ring-purple-500 focus:ring-opacity-50">
                  Get Started
                </button>
              </Link>
              
              {!loading && latestRelease && latestRelease.assets && latestRelease.assets[0] && (
                <a 
                  href={latestRelease.assets[0].browser_download_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transform transition-transform hover:-translate-y-1"
                >
                  <button className="flex items-center gap-2 border-2 border-purple-600 
                                  text-purple-600 px-8 py-3 rounded-md font-semibold 
                                  hover:bg-purple-600 hover:text-amber-50 
                                  focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <Download className="w-5 h-5" />
                    Download Android App {latestRelease.tag_name && `(${latestRelease.tag_name})`}
                  </button>
                </a>
              )}
              
              {loading && (
                <div className="flex items-center gap-2 border-2 border-purple-600 
                              text-purple-600 px-8 py-3 rounded-md font-semibold">
                  <span>Loading app version...</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              <img
                src={mainImage}
                alt="NoteSync App"
                className="w-full h-auto object-contain shadow-2xl 
                           transform transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features That Empower Your Productivity
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-zinc-800 p-6 rounded-lg text-center 
                           transform transition-transform hover:-translate-y-2 
                           hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Technology Stack</h2>
          <div className="flex justify-center space-x-12">
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <FaReact className="text-5xl text-blue-500 mb-2" />
              <span>React</span>
            </div>
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <SiFlutter className="text-5xl text-blue-600 mb-2" />
              <span>Flutter</span>
            </div>
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <SiFirebase className="text-5xl text-orange-500 mb-2" />
              <span>Firebase</span>
            </div>
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <SiFirebase className="text-5xl text-green-500 mb-2" />
              <span>Firestore</span>
            </div>
          </div>
        </div>
        
        {/* About Section */}
        <AboutSection />
      </div>
      
      {/* Add animations using Tailwind classes instead of inline styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .animate-slideIn {
            animation: slideIn 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Home;